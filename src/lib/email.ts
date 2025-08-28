import nodemailer from 'nodemailer';

// Create Gmail transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
};

// Send thank you email using Gmail
export const sendThankYouEmail = async (
  to: string,
  donorName: string,
  emailBody: string
): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject: 'Thank You for Your Generous Donation! 💝',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Thank You! 🙏</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Your donation is making a difference</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              ${emailBody.replace(/\n/g, '<br>')}
            </div>
            
            <div style="text-align: center; padding: 20px; background: #e8f5e8; border-radius: 8px; border-left: 4px solid #28a745;">
              <h3 style="margin: 0 0 15px 0; color: #155724;">What Your Donation Accomplishes</h3>
              <ul style="text-align: left; margin: 0; padding-left: 20px; color: #155724;">
                <li>Provides clean drinking water to families</li>
                <li>Supports education programs for children</li>
                <li>Funds healthcare initiatives in communities</li>
                <li>Creates sustainable development projects</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f0f8ff; border-radius: 8px;">
              <p style="margin: 0; color: #0066cc; font-weight: 600;">
                Questions? Contact us at <a href="mailto:support@socialgoodfund.org" style="color: #0066cc;">support@socialgoodfund.org</a>
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6c757d; font-size: 14px;">
            <p>© 2024 Social Good Fund. All rights reserved.</p>
            <p>This email was sent to ${to}</p>
          </div>
        </div>
      `,
    };
    await transporter.sendMail(mailOptions);
    console.log('Thank you email sent successfully to:', to);
    return true;
  } catch (error) {
    console.error('Error sending thank you email:', error);
    return false;
  }
};

// Fallback email method
export const sendFallbackEmail = async (
  to: string,
  donorName: string,
  amount: number,
  currency: string
): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject: 'Thank You for Your Donation! 💝',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Thank You! 🙏</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Your donation is making a difference</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <p>Dear ${donorName},</p>
              
              <p>Thank you so much for your generous donation of ${currency} ${amount}! Your contribution means the world to us and will make a real difference in the lives of those we serve.</p>
              
              <p>Your donation helps us provide clean water, education, and healthcare to communities in need. Every dollar you give brings us closer to our mission of creating lasting positive change.</p>
              
              <p>We're incredibly grateful for supporters like you who make our work possible.</p>
              
              <p>Thank you again for your support!</p>
              
              <p>Warm regards,<br>The Social Good Fund Team</p>
            </div>
            
            <div style="text-align: center; padding: 20px; background: #e8f5e8; border-radius: 8px; border-left: 4px solid #28a745;">
              <h3 style="margin: 0 0 15px 0; color: #155724;">What Your Donation Accomplishes</h3>
              <ul style="text-align: left; margin: 0; padding-left: 20px; color: #155724;">
                <li>Provides clean drinking water to families</li>
                <li>Supports education programs for children</li>
                <li>Funds healthcare initiatives in communities</li>
                <li>Creates sustainable development projects</li>
              </ul>
            </div>
          </div>
        </div>
      `,
    };
    await transporter.sendMail(mailOptions);
    console.log('Fallback email sent successfully to:', to);
    return true;
  } catch (error) {
    console.error('Error sending fallback email:', error);
    return false;
  }
};
