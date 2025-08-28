# PayPal Integration Setup

## Prerequisites

1. **PayPal Developer Account**: Sign up at [developer.paypal.com](https://developer.paypal.com)
2. **PayPal Business Account**: Required for receiving payments

## Setup Steps

### 1. Get PayPal API Credentials

1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Navigate to **Apps & Credentials**
3. Create a new app or use the default app
4. Copy your **Client ID** and **Client Secret**

### 2. Configure Environment Variables

1. Copy `env.example` to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Update `.env.local` with your PayPal credentials:
   ```env
   PAYPAL_CLIENT_ID=your_actual_client_id
   PAYPAL_CLIENT_SECRET=your_actual_client_secret
   PAYPAL_MODE=sandbox
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_actual_client_id
   ```

**Important Notes:**
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID` is required for the frontend PayPal SDK
- `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` are used for server-side API calls
- Both should use the same client ID value
- The `NEXT_PUBLIC_` prefix makes the variable available in the browser

### 3. Common Issues and Solutions

#### PayPal SDK Script Fails to Load
If you see an error like "Failed to load the PayPal JS SDK script", check:

1. **Missing Environment Variable**: Ensure `NEXT_PUBLIC_PAYPAL_CLIENT_ID` is set
2. **Invalid Client ID**: Verify your client ID is correct and active
3. **Network Issues**: Check if PayPal's CDN is accessible
4. **CORS Issues**: Ensure your domain is registered with PayPal

#### Environment Variable Not Loading
- Restart your development server after adding environment variables
- Check that `.env.local` exists in the project root
- Verify the file format (no spaces around `=`)
- Use `console.log(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID)` to debug

### 3. Test the Integration

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3001`
3. Fill out the donation form
4. Click the PayPal button to test the payment flow

## Testing

### Sandbox Mode (Recommended for Development)
- Use PayPal's sandbox environment for testing
- Create sandbox accounts at [developer.paypal.com](https://developer.paypal.com)
- Use sandbox buyer accounts to test payments

### Live Mode (Production)
- Change `PAYPAL_MODE=live` in your environment variables
- Use real PayPal credentials
- Test thoroughly before going live

## Features

✅ **PayPal Smart Buttons** - Modern, responsive payment buttons  
✅ **Order Creation** - Server-side order creation via PayPal API  
✅ **Payment Capture** - Automatic payment capture on approval  
✅ **Form Validation** - Client-side validation for all fields  
✅ **Error Handling** - Comprehensive error handling and user feedback  
✅ **Security** - Server-side payment processing for security  

## API Endpoints

- `POST /api/paypal/create-order` - Creates a new PayPal order
- `POST /api/paypal/capture-order` - Captures payment after approval

## Next Steps

After PayPal integration, consider adding:
- Database storage for donation records
- Email notifications
- AI-powered thank you messages
- Analytics and reporting


