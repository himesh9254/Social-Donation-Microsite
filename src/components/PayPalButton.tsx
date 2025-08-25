'use client';

import { useEffect, useState } from 'react';

interface PayPalButtonProps {
  amount: number;
  donorName: string;
  donorEmail: string;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
  disabled?: boolean;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

export default function PayPalButton({ 
  amount, 
  donorName, 
  donorEmail, 
  onSuccess, 
  onError, 
  disabled = false 
}: PayPalButtonProps) {
  const [loaded, setLoaded] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Check if PayPal script is already loaded
    if (window.paypal) {
      setScriptLoaded(true);
      setLoaded(true);
      return;
    }

    // Load PayPal script
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true);
      setLoaded(true);
    };
    script.onerror = () => {
      console.error('Failed to load PayPal script');
      onError(new Error('Failed to load PayPal'));
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [onError]);

  useEffect(() => {
    if (!scriptLoaded || !window.paypal) return;

    try {
      window.paypal.Buttons({
        createOrder: async () => {
          try {
            const response = await fetch('/api/paypal/create-order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                amount,
                donorName,
                donorEmail,
              }),
            });

            const data = await response.json();
            
            if (!response.ok) {
              throw new Error(data.error || 'Failed to create order');
            }

            return data.orderID;
          } catch (error) {
            console.error('Error creating order:', error);
            onError(error);
            throw error;
          }
        },

        onApprove: async (data: any) => {
          try {
            const response = await fetch('/api/paypal/capture-order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderID: data.orderID,
              }),
            });

            const captureData = await response.json();
            
            if (!response.ok) {
              throw new Error(captureData.error || 'Failed to capture payment');
            }

            onSuccess(captureData);
          } catch (error) {
            console.error('Error capturing payment:', error);
            onError(error);
          }
        },

        onError: (err: any) => {
          console.error('PayPal error:', err);
          onError(err);
        },
      }).render('#paypal-button-container');
    } catch (error) {
      console.error('Error rendering PayPal button:', error);
      onError(error);
    }
  }, [scriptLoaded, amount, donorName, donorEmail, onSuccess, onError]);

  if (!loaded) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#0ea5e9]"></div>
        <span className="ml-2 text-sm text-foreground/70">Loading PayPal...</span>
      </div>
    );
  }

  return (
    <div 
      id="paypal-button-container" 
      className={disabled ? 'opacity-50 pointer-events-none' : ''}
    />
  );
}
