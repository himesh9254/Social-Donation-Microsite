'use client';

import { useState } from 'react';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('idle');
    
    try {
      const response = await fetch('/api/donations/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donorName: formData.name,
          donorEmail: formData.email,
          amount: parseFloat(formData.amount),
          frequency: formData.frequency,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPaymentStatus('success');
        console.log('Donation processed successfully:', data);
        
        setFormData({
          name: '',
          email: '',
          amount: '',
          frequency: 'One-time',
          message: '',
        });
      } else {
        setPaymentStatus('error');
        console.error('Donation failed:', data.error);
      }
    } catch (error) {
      setPaymentStatus('error');
      console.error('Error submitting donation:', error);
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
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
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
                className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm shadow-sm outline-none ring-0 focus:border-blue-500 focus:bg-white transition-colors placeholder:text-gray-600 placeholder:font-medium ${
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
                className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm shadow-sm outline-none ring-0 focus:border-blue-500 focus:bg-white transition-colors placeholder:text-gray-600 placeholder:font-medium ${
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
                  className={`w-full rounded-xl border bg-gray-50 pl-8 pr-4 py-3 text-sm shadow-sm outline-none ring-0 focus:border-blue-500 focus:bg-white transition-colors placeholder:text-gray-600 placeholder:font-medium ${
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
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm shadow-sm outline-none ring-0 focus:border-blue-500 focus:bg-white transition-colors text-gray-900 font-medium"
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
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm shadow-sm outline-none ring-0 focus:border-blue-500 focus:bg-white transition-colors placeholder:text-gray-600 placeholder:font-medium"
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
                  <li>• Your donation will be processed securely</li>
                  <li>• You'll receive a personalized AI-generated thank you email</li>
                  <li>• Your contribution will be allocated to our programs</li>
                  <li>• We'll send you impact updates on how your donation is making a difference</li>
                </ul>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isProcessing}
            className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg ring-1 ring-inset ring-white/10 transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Processing Donation...
              </>
            ) : (
              <>
                <span className="mr-2">💝</span>
                Submit Donation
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
