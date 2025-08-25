import { NextRequest, NextResponse } from 'next/server';
import paypal from '@paypal/paypal-server-sdk';

// Configure PayPal environment
const environment = process.env.PAYPAL_MODE === 'live' 
  ? new paypal.core.LiveEnvironment(process.env.PAYPAL_CLIENT_ID!, process.env.PAYPAL_CLIENT_SECRET!)
  : new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID!, process.env.PAYPAL_CLIENT_SECRET!);

const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'USD', donorName, donorEmail } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const request_paypal = new paypal.orders.OrdersCreateRequest();
    request_paypal.prefer("return=representation");
    request_paypal.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: currency,
          value: amount.toString(),
        },
        description: `Donation from ${donorName || 'Anonymous'}`,
        custom_id: donorEmail || 'anonymous@example.com',
      }],
      application_context: {
        return_url: `${request.nextUrl.origin}/donation/success`,
        cancel_url: `${request.nextUrl.origin}/donation/cancel`,
      },
    });

    const order = await client.execute(request_paypal);
    
    return NextResponse.json({ 
      orderID: order.result.id,
      status: order.result.status 
    });

  } catch (error) {
    console.error('PayPal create order error:', error);
    return NextResponse.json(
      { error: 'Failed to create PayPal order' }, 
      { status: 500 }
    );
  }
}

