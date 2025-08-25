import { NextRequest, NextResponse } from 'next/server';
import paypal from '@paypal/paypal-server-sdk';
import { saveDonation } from '@/lib/database';
import { generateThankYouEmail } from '@/lib/gemini';
import { sendThankYouEmail, sendFallbackEmail } from '@/lib/email';

// Configure PayPal environment
const environment = process.env.PAYPAL_MODE === 'live'
  ? new paypal.core.LiveEnvironment(process.env.PAYPAL_CLIENT_ID!, process.env.PAYPAL_CLIENT_SECRET!)
  : new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID!, process.env.PAYPAL_CLIENT_SECRET!);

const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(request: NextRequest) {
  try {
    const { orderID, donorName, donorEmail, frequency = 'One-time', message = '' } = await request.json();

    if (!orderID) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    // Step 1: Capture the PayPal payment
    const request_paypal = new paypal.orders.OrdersCaptureRequest(orderID);
    request_paypal.prefer("return=representation");

    const capture = await client.execute(request_paypal);

    // Extract payment details
    const payment = capture.result;
    const captureId = payment.purchase_units[0].payments.captures[0].id;
    const amount = parseFloat(payment.purchase_units[0].payments.captures[0].amount.value);
    const currency = payment.purchase_units[0].payments.captures[0].amount.currency_code;
    const status = payment.status;

    // Step 2: Save donation to database
    let savedDonation;
    try {
      savedDonation = saveDonation({
        donorName: donorName || 'Anonymous',
        donorEmail: donorEmail || 'anonymous@example.com',
        amount,
        currency,
        frequency,
        message,
        paymentId: captureId,
        status,
      });
      console.log('Donation saved to database:', savedDonation.id);
    } catch (dbError) {
      console.error('Error saving donation to database:', dbError);
      // Continue with email sending even if database save fails
    }

    // Step 3: Generate personalized thank you email using Gemini API
    let emailBody: string;
    try {
      emailBody = await generateThankYouEmail(donorName || 'Anonymous', amount, currency);
      console.log('AI-generated email content created');
    } catch (aiError) {
      console.error('Error generating AI email:', aiError);
      // Use fallback email content
      emailBody = `Dear ${donorName || 'Anonymous'},

Thank you so much for your generous donation of ${currency} ${amount}! Your contribution means the world to us and will make a real difference in the lives of those we serve.

Your donation helps us provide clean water, education, and healthcare to communities in need. Every dollar you give brings us closer to our mission of creating lasting positive change.

We're incredibly grateful for supporters like you who make our work possible.

Thank you again for your support!

Warm regards,
The Social Good Fund Team`;
    }

    // Step 4: Send thank you email
    let emailSent = false;
    try {
      if (process.env.RESEND_API_KEY) {
        emailSent = await sendThankYouEmail(donorEmail || 'anonymous@example.com', donorName || 'Anonymous', emailBody);
      } else {
        // Use fallback email method
        emailSent = await sendFallbackEmail(donorEmail || 'anonymous@example.com', donorName || 'Anonymous', amount, currency);
      }
      
      if (emailSent) {
        console.log('Thank you email sent successfully');
      } else {
        console.error('Failed to send thank you email');
      }
    } catch (emailError) {
      console.error('Error sending thank you email:', emailError);
    }

    // Return success response
    return NextResponse.json({
      captureID: captureId,
      amount,
      currency,
      status,
      donorEmail: donorEmail || 'anonymous@example.com',
      orderID: payment.id,
      donationId: savedDonation?.id,
      emailSent,
      message: 'Payment captured successfully. Thank you email sent.',
    });

  } catch (error) {
    console.error('PayPal capture order error:', error);
    
    return NextResponse.json(
      { error: 'Failed to capture PayPal payment' },
      { status: 500 }
    );
  }
}
