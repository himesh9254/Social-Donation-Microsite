# Gmail Setup Guide for Donation System

This guide will help you set up Gmail to send automated thank you emails from your donation system.

## Prerequisites

- A Gmail account
- 2-Factor Authentication enabled on your Google account

## Step-by-Step Setup

### 1. Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click on "2-Step Verification"
3. Follow the prompts to enable it

### 2. Generate an App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click on "2-Step Verification"
3. Scroll down and click on "App passwords"
4. Select "Mail" as the app
5. Select "Other (Custom name)" as the device
6. Enter "Donation System" as the name
7. Click "Generate"
8. **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)

### 3. Configure Environment Variables

1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Edit `.env.local` and add your Gmail credentials:
   ```env
   GMAIL_USER=your_email@gmail.com
   GMAIL_APP_PASSWORD=your_16_character_app_password
   ```

3. Replace the placeholders:
   - `your_email@gmail.com` with your actual Gmail address
   - `your_16_character_app_password` with the app password you generated

### 4. Test the Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Submit a test donation through the form
3. Check your email for the thank you message
4. Check the console logs for any errors

## Troubleshooting

### Common Issues

1. **"Invalid login" error**
   - Make sure you're using the app password, not your regular Gmail password
   - Ensure 2-Factor Authentication is enabled

2. **"Less secure app access" error**
   - App passwords bypass this restriction, so this shouldn't happen
   - Double-check that you're using the app password

3. **"Username and Password not accepted"**
   - Verify your Gmail address is correct
   - Make sure the app password is copied correctly (no extra spaces)

4. **Emails not sending**
   - Check the console logs for error messages
   - Verify your `.env.local` file is in the project root
   - Restart the development server after changing environment variables

### Security Notes

- ✅ **App passwords are secure** - They only work for the specific app
- ✅ **Environment variables are safe** - `.env.local` is gitignored
- ✅ **2FA remains active** - App passwords don't disable 2FA
- ❌ **Never share your app password** - Keep it private

## Alternative: Test Mode

If you don't want to set up Gmail right now, the system will work in test mode:
- Emails are logged to the console instead of being sent
- Perfect for development and testing
- No email credentials required

## Next Steps

Once Gmail is configured:
1. Test with a small donation
2. Check your email for the thank you message
3. Verify the email content and styling
4. Consider setting up Gemini API for AI-powered personalization

## Support

If you encounter issues:
1. Check the console logs for error messages
2. Verify your Gmail credentials
3. Ensure 2FA is enabled
4. Try generating a new app password

