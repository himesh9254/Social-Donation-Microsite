import nodemailer from 'nodemailer';

// Create Gmail transporter
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER || process.env.GMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD || process.env.GMAIL_APP_PASSWORD;
  
  console.log('Gmail Configuration Debug:');
  console.log('- EMAIL_USER:', process.env.EMAIL_USER ? 'SET' : 'NOT SET');
  console.log('- EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'SET' : 'NOT SET');
  console.log('- GMAIL_USER:', process.env.GMAIL_USER ? 'SET' : 'NOT SET');
  console.log('- GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? 'SET' : 'NOT SET');
  console.log('- Using email user:', emailUser);
  console.log('- Using email password:', emailPassword ? 'SET' : 'NOT SET');
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });
};

export async function sendThankYouEmail(
  toEmail: string,
  donorName: string,
  emailBody: string
): Promise<boolean> {
  try {
    console.log('Attempting to send Gmail...');
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Social Good Fund" <${process.env.EMAIL_USER || process.env.GMAIL_USER}>`,
      to: toEmail,
      subject: 'Thank you for your generous donation!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Your Donation</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #0ea5e9, #6366f1, #22c55e);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f8fafc;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
              color: #64748b;
              font-size: 14px;
            }
            .amount {
              font-size: 24px;
              font-weight: bold;
              color: #059669;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Thank You!</h1>
            <p>Your generosity makes a difference</p>
          </div>
          <div class="content">
            ${emailBody.replace(/\n/g, '<br>')}
            <div class="footer">
              <p>Social Good Fund</p>
              <p>Making the world a better place, one donation at a time.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    console.log('Sending email to:', toEmail);
    const info = await transporter.sendMail(mailOptions);
    console.log('Thank you email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending thank you email:', error);
    return false;
  }
}

// Fallback function for when Gmail is not configured
export async function sendFallbackEmail(
  toEmail: string,
  donorName: string,
  amount: number,
  currency: string = 'USD'
): Promise<boolean> {
  try {
    // Log the email details for testing
    console.log('Fallback email would be sent:', {
      to: toEmail,
      subject: 'Thank you for your generous donation!',
      body: `Dear ${donorName},\n\nThank you for your donation of ${currency} ${amount}!`,
    });
    
    return true;
  } catch (error) {
    console.error('Error sending fallback email:', error);
    return false;
  }
}
