import { NextRequest, NextResponse } from 'next/server';
import { saveDonation } from '@/lib/database';
import { generateThankYouEmail } from '@/lib/gemini';
import { sendThankYouEmail, sendFallbackEmail } from '@/lib/gmail';

export async function POST(request: NextRequest) {
  try {
    // Parse JSON with error handling
    let requestBody;
    try {
      requestBody = await request.json();
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON data in request' },
        { status: 400 }
      );
    }

    const { donorName, donorEmail, amount, currency = 'USD', frequency = 'One-time', message = '' } = requestBody;

    // Validate required fields
    if (!donorName || !donorEmail || !amount) {
      return NextResponse.json({ 
        error: 'Missing required fields: donorName, donorEmail, and amount are required' 
      }, { status: 400 });
    }

    if (amount <= 0) {
      return NextResponse.json({ 
        error: 'Amount must be greater than 0' 
      }, { status: 400 });
    }

    // Step 1: Save donation to database
    let savedDonation;
    try {
      savedDonation = saveDonation({
        donorName,
        donorEmail,
        amount: parseFloat(amount),
        currency,
        frequency,
        message,
        paymentId: `demo-${Date.now()}`, // Demo payment ID
        status: 'completed',
      });
      console.log('Donation saved to database:', savedDonation.id);
    } catch (dbError) {
      console.error('Error saving donation to database:', dbError);
      return NextResponse.json({ 
        error: 'Failed to save donation to database' 
      }, { status: 500 });
    }

    // Step 2: Generate personalized thank you email using Gemini API
    let emailBody: string;
    try {
      // Check if Gemini API key is configured
      if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key') {
        emailBody = await generateThankYouEmail(donorName, parseFloat(amount), currency);
        console.log('AI-generated email content created');
      } else {
        console.log('Gemini API not configured, using fallback email content');
        throw new Error('Gemini API not configured');
      }
    } catch (aiError) {
      console.error('Error generating AI email:', aiError);
      // Use fallback email content
      emailBody = `Dear ${donorName},

Thank you so much for your generous donation of ${currency} ${amount}! Your contribution means the world to us and will make a real difference in the lives of those we serve.

Your donation helps us provide clean water, education, and healthcare to communities in need. Every dollar you give brings us closer to our mission of creating lasting positive change.

We're incredibly grateful for supporters like you who make our work possible.

Thank you again for your support!

Warm regards,
The Social Good Fund Team`;
    }

    // Step 3: Send thank you email
    let emailSent = false;
    try {
      // Check if Gmail credentials are configured
      const hasGmailCredentials = (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) || 
                                 (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
      
      if (hasGmailCredentials) {
        try {
          emailSent = await sendThankYouEmail(donorEmail, donorName, emailBody);
          if (emailSent) {
            console.log('Thank you email sent successfully via Gmail');
          } else {
            console.log('Gmail email failed, using fallback');
            emailSent = await sendFallbackEmail(donorEmail, donorName, parseFloat(amount), currency);
          }
        } catch (gmailError) {
          console.error('Gmail error, using fallback:', gmailError);
          emailSent = await sendFallbackEmail(donorEmail, donorName, parseFloat(amount), currency);
        }
      } else {
        // Use fallback email method when Gmail is not configured
        console.log('Gmail not configured, using fallback email method');
        emailSent = await sendFallbackEmail(donorEmail, donorName, parseFloat(amount), currency);
      }
      
      if (emailSent) {
        console.log('Thank you email sent successfully');
      } else {
        console.error('Failed to send thank you email');
      }
    } catch (emailError) {
      console.error('Error sending thank you email:', emailError);
      // Don't fail the entire request if email fails
      emailSent = false;
    }

    // Return success response
    return NextResponse.json({
      success: true,
      donationId: savedDonation.id,
      amount: parseFloat(amount),
      currency,
      donorEmail,
      emailSent,
      message: 'Donation processed successfully. Thank you email sent.',
    });

  } catch (error) {
    console.error('Donation submission error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    // Ensure we always return proper JSON
    return NextResponse.json(
      { 
        error: 'Failed to process donation',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
