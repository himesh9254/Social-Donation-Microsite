'use client';

import { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export default function DonationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    frequency: 'One-time',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showPayPal, setShowPayPal] = useState(false);
  const [paypalError, setPaypalError] = useState<string | null>(null);
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  // Debug environment variables
  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    console.log('PayPal Client ID:', clientId ? 'Available' : 'Missing');
    console.log('Environment variables loaded:', !!clientId);
    
    if (!clientId) {
      console.warn('PayPal Client ID is not configured. Please set NEXT_PUBLIC_PAYPAL_CLIENT_ID in your .env.local file');
    }
  }, []);

  // Check if PayPal is properly configured
  const isPayPalConfigured = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID && 
                            process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID !== 'your_paypal_client_id_here' &&
                            process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID !== 'your_paypal_client_id';

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.amount || parseFloat(formData.amount) < 1) {
      newErrors.amount = 'Please enter a valid amount (minimum $1)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Show PayPal buttons after form validation
    setShowPayPal(true);
    setPaypalError(null);
  };

  const handlePayPalApprove = async (data: any, actions: any) => {
    try {
      setIsProcessing(true);
      
      // Capture the payment
      const response = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID: data.orderID,
          donorName: formData.name,
          donorEmail: formData.email,
          frequency: formData.frequency,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setPaymentStatus('success');
        console.log('PayPal payment successful:', result);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          amount: '',
          frequency: 'One-time',
          message: '',
        });
        setShowPayPal(false);
      } else {
        setPaymentStatus('error');
        console.error('PayPal payment failed:', result.error);
      }
    } catch (error) {
      setPaymentStatus('error');
      console.error('Error processing PayPal payment:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayPalError = (err: any) => {
    console.error('PayPal error:', err);
    setPaypalError('PayPal encountered an error. Please try again or contact support.');
    setPaymentStatus('error');
    setIsProcessing(false);
  };

  const handlePayPalScriptError = (err: any) => {
    console.error('PayPal script error:', err);
    setPaypalError('PayPal failed to load. Please try the direct processing option.');
    setPaymentStatus('error');
    setIsProcessing(false);
  };

  const handlePayPalCancel = () => {
    console.log('PayPal payment cancelled');
    setShowPayPal(false);
    setIsProcessing(false);
  };



  const handleDirectDonation = async () => {
    try {
      setIsProcessing(true);
      setPaymentStatus('idle');
      setPaypalError(null);
      
      console.log('Starting donation submission...');
      
      const donationData = {
        donorName: formData.name,
        donorEmail: formData.email,
        amount: parseFloat(formData.amount),
        frequency: formData.frequency,
        message: formData.message,
      };
      
      console.log('Donation data:', donationData);
      
      const response = await fetch('/api/donations/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donationData),
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Server returned non-JSON response:', contentType);
        const textResponse = await response.text();
        console.error('Response text:', textResponse);
        setPaypalError('Server error: Expected JSON response but got HTML. Please check server logs.');
        setPaymentStatus('error');
        return;
      }
      
      const result = await response.json();
      console.log('Response data:', result);
      
      if (response.ok && result.success) {
        console.log('Donation successful:', result);
        setPaymentStatus('success');
        setFormData({ name: '', email: '', amount: '', frequency: 'One-time', message: '' });
        setShowPayPal(false);
      } else {
        console.error('Donation failed:', result);
        setPaypalError(result.error || 'Donation processing failed');
        setPaymentStatus('error');
      }
    } catch (error) {
      console.error('Error processing donation:', error);
      if (error instanceof Error) {
        if (error.message.includes('JSON')) {
          setPaypalError('Server returned invalid response. Please try again or contact support.');
        } else {
          setPaypalError(`Network error: ${error.message}`);
        }
      } else {
        setPaypalError('An unexpected error occurred. Please try again.');
      }
      setPaymentStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const isFormValid = formData.name && formData.email && parseFloat(formData.amount) >= 1;

  return (
    <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold sm:text-4xl mb-4 text-gray-900">Make a Donation</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
          Your contribution makes a real difference. Every dollar helps us provide education, healthcare, 
          and clean water to communities in need.
        </p>
      </div>

      {paymentStatus === 'success' && (
        <div className="mb-8 rounded-xl bg-green-50 border border-green-200 p-6">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <span className="text-2xl">✅</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800">Thank you for your donation!</h3>
              <p className="text-green-700">You will receive a personalized thank you email shortly.</p>
            </div>
          </div>
        </div>
      )}

      {paymentStatus === 'error' && (
        <div className="mb-8 rounded-xl bg-red-50 border border-red-200 p-6">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <span className="text-2xl">❌</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-800">Donation failed</h3>
              <p className="text-red-700">Please try again or contact support if the problem persists.</p>
              {paypalError && (
                <p className="text-sm text-red-600 mt-2">{paypalError}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                <span className="mr-2">👤</span>Full Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full rounded-xl border bg-white px-4 py-3 text-sm shadow-sm outline-none ring-0 focus:border-blue-500 focus:bg-blue-50 transition-colors placeholder:text-gray-500 text-gray-900 font-medium ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                <span className="mr-2">📧</span>Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="jane@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full rounded-xl border bg-white px-4 py-3 text-sm shadow-sm outline-none ring-0 focus:border-blue-500 focus:bg-blue-50 transition-colors placeholder:text-gray-500 text-gray-900 font-medium ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="amount" className="block text-sm font-semibold text-gray-900 mb-2">
                <span className="mr-2">💰</span>Amount (USD) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="25"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className={`w-full rounded-xl border bg-white pl-8 pr-4 py-3 text-sm shadow-sm outline-none ring-0 focus:border-blue-500 focus:bg-blue-50 transition-colors placeholder:text-gray-500 text-gray-900 font-medium ${
                    errors.amount ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.amount && <p className="mt-2 text-sm text-red-600">{errors.amount}</p>}
            </div>
            <div>
              <label htmlFor="frequency" className="block text-sm font-semibold text-gray-900 mb-2">
                <span className="mr-2">🔄</span>Frequency
              </label>
              <select
                id="frequency"
                name="frequency"
                value={formData.frequency}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm outline-none ring-0 focus:border-blue-500 focus:bg-blue-50 transition-colors text-gray-900 font-medium"
              >
                <option className="text-gray-900 font-medium">One-time</option>
                <option className="text-gray-900 font-medium">Monthly</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
              <span className="mr-2">💬</span>Message (optional)
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Leave a note about why you're donating or any specific cause you'd like to support..."
              value={formData.message}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm outline-none ring-0 focus:border-blue-500 focus:bg-blue-50 transition-colors placeholder:text-gray-500 text-gray-900 font-medium"
            />
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <span className="text-xl">ℹ️</span>
              </div>
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">What happens next?</p>
                <ul className="space-y-1 text-blue-700">
                  <li>• Fill out the form above with your details</li>
                  <li>• Choose your preferred payment method</li>
                  <li>• Complete your donation securely</li>
                  <li>• Receive a personalized thank you email</li>
                  <li>• Get impact updates on how your donation is making a difference</li>
                </ul>
              </div>
            </div>
          </div>

          {!showPayPal ? (
            <button
              type="submit"
              disabled={!isFormValid || isProcessing}
              className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg ring-1 ring-inset ring-white/10 transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Processing...
                </>
              ) : (
                <>
                  <span className="mr-2">💝</span>
                  Continue to Payment
                </>
              )}
            </button>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Your Payment Method</h3>
                <p className="text-sm text-gray-600">Select how you'd like to complete your donation</p>
              </div>
              
              {/* PayPal Option */}
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">P</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">PayPal</h4>
                      <p className="text-sm text-gray-600">Secure payment with PayPal</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">${formData.amount}</p>
                    <p className="text-xs text-gray-500">{formData.frequency}</p>
                  </div>
                </div>
                
                {isPayPalConfigured ? (
                  <PayPalScriptProvider 
                    options={{
                      clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                      currency: "USD",
                      intent: "capture"
                    }}
                  >
                    <PayPalButtons
                      createOrder={async (data, actions) => {
                        try {
                          // Create order through our backend API
                          const response = await fetch('/api/paypal/create-order', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              amount: parseFloat(formData.amount),
                              currency: 'USD',
                              donorName: formData.name,
                              donorEmail: formData.email,
                            }),
                          });

                          if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(errorData.error || 'Failed to create order');
                          }

                          const orderData = await response.json();
                          return orderData.orderID;
                        } catch (error) {
                          console.error('Error creating PayPal order:', error);
                          setPaypalError(`Failed to create PayPal order: ${error.message}`);
                          throw error;
                        }
                      }}
                      onApprove={handlePayPalApprove}
                      onError={handlePayPalError}
                      onCancel={handlePayPalCancel}
                      style={{
                        layout: "vertical",
                        color: "blue",
                        shape: "rect",
                        label: "pay"
                      }}
                    />
                  </PayPalScriptProvider>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-600">⚠️</span>
                      <p className="text-sm text-yellow-800">
                        PayPal is not configured. Please set up your PayPal credentials in the environment variables.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Payment Option */}
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 font-bold text-lg">💳</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Direct Processing</h4>
                      <p className="text-sm text-gray-600">Process donation directly (no payment processing)</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">${formData.amount}</p>
                    <p className="text-xs text-gray-500">{formData.frequency}</p>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={handleDirectDonation}
                  disabled={isProcessing}
                  className="w-full inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">💳</span>
                      Process Donation Directly
                    </>
                  )}
                </button>
              </div>
              
              <button
                type="button"
                onClick={() => setShowPayPal(false)}
                className="w-full inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-8 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
              >
                ← Back to Form
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
