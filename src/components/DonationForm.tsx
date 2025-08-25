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
    
    // Clear error when user starts typing
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
        
        // Reset form on success
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
    <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
      <h2 className="text-2xl font-semibold sm:text-3xl">Make a Donation</h2>
      <p className="mt-3 text-foreground/70">
        Your contribution makes a real difference. Complete donation processing with AI-powered thank you emails!
      </p>

      {paymentStatus === 'success' && (
        <div className="mt-6 rounded-lg bg-green-50 border border-green-200 p-4">
          <p className="text-green-800">Thank you for your donation! You will receive a personalized thank you email shortly.</p>
        </div>
      )}

      {paymentStatus === 'error' && (
        <div className="mt-6 rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-red-800">Donation failed. Please try again or contact support if the problem persists.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Jane Doe"
              value={formData.name}
              onChange={handleInputChange}
              className={`mt-2 w-full rounded-lg border bg-background px-4 py-3 text-sm shadow-sm outline-none ring-0 focus:border-[#0ea5e9] ${
                errors.name ? 'border-red-300' : 'border-foreground/15'
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="jane@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className={`mt-2 w-full rounded-lg border bg-background px-4 py-3 text-sm shadow-sm outline-none ring-0 focus:border-[#0ea5e9] ${
                errors.email ? 'border-red-300' : 'border-foreground/15'
              }`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium">
              Amount (USD) *
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              min="1"
              step="1"
              placeholder="25"
              value={formData.amount}
              onChange={handleInputChange}
              className={`mt-2 w-full rounded-lg border bg-background px-4 py-3 text-sm shadow-sm outline-none ring-0 focus:border-[#0ea5e9] ${
                errors.amount ? 'border-red-300' : 'border-foreground/15'
              }`}
            />
            {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
          </div>
          <div>
            <label htmlFor="frequency" className="block text-sm font-medium">
              Frequency
            </label>
            <select
              id="frequency"
              name="frequency"
              value={formData.frequency}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-lg border border-foreground/15 bg-background px-4 py-3 text-sm shadow-sm outline-none ring-0 focus:border-[#0ea5e9]"
            >
              <option>One-time</option>
              <option>Monthly</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message (optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Leave a note…"
            value={formData.message}
            onChange={handleInputChange}
            className="mt-2 w-full rounded-lg border border-foreground/15 bg-background px-4 py-3 text-sm shadow-sm outline-none ring-0 focus:border-[#0ea5e9]"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-foreground/60">
              Your donation will be processed and you'll receive a personalized AI-generated thank you email.
            </p>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isProcessing}
            className="w-full inline-flex items-center justify-center rounded-full bg-[#22c55e] px-6 py-3 text-sm font-medium text-white shadow-sm ring-1 ring-inset ring-white/10 transition hover:bg-[#16a34a] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing Donation...
              </>
            ) : (
              'Submit Donation'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
