import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateThankYouEmail(
  donorName: string,
  amount: number,
  currency: string = 'USD'
): Promise<string> {
  try {
    // Use the correct model name
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Write a warm, personalized thank you email to ${donorName} for their generous donation of ${currency} ${amount}. 

The email should:
- Be warm and personal, addressing them by name
- Thank them specifically for their donation amount
- Explain how their contribution helps our mission (providing clean water, education, and healthcare to communities in need)
- Be encouraging and inspiring
- Keep it under 150 words
- Be written in a friendly, professional tone

Format it as a proper email body (no subject line needed).`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error generating thank you email:', error);
    
    // Fallback email content
    return `Dear ${donorName},

Thank you so much for your generous donation of ${currency} ${amount}! Your contribution means the world to us and will make a real difference in the lives of those we serve.

Your donation helps us provide clean water, education, and healthcare to communities in need. Every dollar you give brings us closer to our mission of creating lasting positive change.

We're incredibly grateful for supporters like you who make our work possible.

Thank you again for your support!

Warm regards,
The Social Good Fund Team`;
  }
}
