'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Loader2,
  Phone,
  CreditCard,
  Globe,
  User,
  Mail,
  MapPin,
  MessageSquare,
  Heart,
  RefreshCw,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const campaigns = [
  { id: 'camp-001', title: 'School Block Construction', category: 'Education', raised: 1240000, goal: 1800000 },
  { id: 'camp-002', title: 'Clean Water Borehole', category: 'Water', raised: 680000, goal: 900000 },
  { id: 'camp-003', title: 'Child Sponsorship — 50 Students', category: 'Sponsorship', raised: 325000, goal: 500000 },
  { id: 'camp-004', title: 'Community Health Outreach', category: 'Health', raised: 145000, goal: 400000 },
  { id: 'camp-005', title: 'Church Planting — Kwale North', category: 'Church', raised: 92000, goal: 250000 },
  { id: 'camp-general', title: 'General Ministry Fund', category: 'General', raised: 0, goal: 0 },
];

const presetAmounts = [500, 1000, 2500, 5000, 10000, 25000];

const paymentMethods = [
  { id: 'mpesa', label: 'M-Pesa', icon: Phone, desc: 'Lipa na M-Pesa (Kenya)', color: 'text-primary' },
  { id: 'stripe', label: 'Credit/Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, Amex', color: 'text-foreground' },
  { id: 'paypal', label: 'PayPal', icon: Globe, desc: 'PayPal or PayPal Credit', color: 'text-foreground' },
];

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  dedication: string;
  dedicationMessage: string;
  anonymous: boolean;
  receiveReceipt: boolean;
  mpesaPhone: string;
};

const steps = ['Choose Amount', 'Your Details', 'Payment'];

export default function DonateForm() {
  const [step, setStep] = useState(0);
  const [selectedCampaign, setSelectedCampaign] = useState('camp-002');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [currency, setCurrency] = useState('KES');
  const [isRecurring, setIsRecurring] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: 'Kenya',
      dedication: 'none',
      dedicationMessage: '',
      anonymous: false,
      receiveReceipt: true,
      mpesaPhone: '',
    },
  });

  const finalAmount = selectedAmount ?? (customAmount ? parseFloat(customAmount) : 0);
  const selectedCampaignData = campaigns.find((c) => c.id === selectedCampaign);

  const handleAmountSelect = (amt: number) => {
    setSelectedAmount(amt);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (val: string) => {
    setCustomAmount(val);
    setSelectedAmount(null);
  };

  const nextStep = () => {
    if (step === 0 && !finalAmount) {
      toast.error('Please select or enter a donation amount');
      return;
    }
    setStep((s) => Math.min(s + 1, 2));
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    // Backend integration point: POST /api/donations/create
    await new Promise((r) => setTimeout(r, 2000));
    setSubmitting(false);
    setSubmitted(true);
    toast.success('Donation confirmed!', {
      description: `Your ${currency} ${finalAmount.toLocaleString()} donation has been received. A receipt will be sent to ${data.email}.`,
    });
  };

  if (submitted) {
    return (
      <div className="bg-card rounded-2xl border border-border shadow-card p-10 text-center">
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-5">
          <Check size={36} className="text-primary" />
        </div>
        <h2 className="text-2xl font-extrabold text-foreground mb-2">Thank You!</h2>
        <p className="text-muted-foreground mb-1">
          Your donation of <strong className="text-primary">{currency} {finalAmount.toLocaleString()}</strong> has been received.
        </p>
        <p className="text-muted-foreground text-sm mb-6">
          You will receive a confirmation email with your tax receipt within 24 hours.
        </p>
        <div className="bg-muted rounded-xl p-4 mb-6 text-left">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">Donation Summary</p>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Campaign</span>
            <span className="font-medium text-foreground">{selectedCampaignData?.title}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Amount</span>
            <span className="font-bold text-primary stat-number">{currency} {finalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Payment</span>
            <span className="font-medium text-foreground capitalize">{paymentMethod}</span>
          </div>
        </div>
        <button
          onClick={() => { setSubmitted(false); setStep(0); setSelectedAmount(1000); }}
          className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:bg-secondary transition-colors"
        >
          Make Another Donation
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
      {/* Step Indicator */}
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          {steps.map((label, i) => (
            <React.Fragment key={`step-${label}`}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                    i < step
                      ? 'step-indicator-complete'
                      : i === step
                      ? 'step-indicator-active' :'step-indicator-inactive'
                  }`}
                >
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span
                  className={`text-sm font-semibold hidden sm:block ${
                    i === step ? 'text-primary' : i < step ? 'text-accent-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 rounded-full transition-colors ${i < step ? 'bg-accent' : 'bg-border'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* STEP 0: Choose Amount */}
        {step === 0 && (
          <div className="animate-fade-in">
            {/* Campaign Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Select Campaign <span className="text-danger">*</span>
              </label>
              <p className="text-xs text-muted-foreground mb-3">Choose which project your donation supports</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {campaigns.map((c) => {
                  const pct = c.goal > 0 ? Math.round((c.raised / c.goal) * 100) : null;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCampaign(c.id)}
                      className={`text-left p-3 rounded-sm border-2 transition-all ${
                        selectedCampaign === c.id
                          ? 'border-primary bg-muted' :'border-border hover:border-accent hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-foreground leading-tight line-clamp-1">{c.title}</span>
                        {selectedCampaign === c.id && (
                          <Check size={14} className="text-primary shrink-0 ml-1" />
                        )}
                      </div>
                      <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                        c.category === 'Education' ? 'bg-accent/20 text-primary' :
                        c.category === 'Water' ? 'bg-primary/10 text-primary' :
                        c.category === 'Health' ? 'bg-warning/10 text-warning' :
                        c.category === 'Church'? 'bg-gold/20 text-warning' : 'bg-muted text-muted-foreground'
                      }`}>
                        {c.category}
                      </span>
                      {pct !== null && (
                        <div className="mt-2">
                          <div className="w-full bg-border rounded-full h-1">
                            <div className="bg-primary h-1 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground mt-0.5 block">{pct}% funded</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Currency + Recurring */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold text-foreground">Currency:</label>
                {['KES', 'USD', 'EUR', 'GBP'].map((cur) => (
                  <button
                    key={`cur-${cur}`}
                    type="button"
                    onClick={() => setCurrency(cur)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      currency === cur
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                    }`}
                  >
                    {cur}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setIsRecurring(!isRecurring)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  isRecurring
                    ? 'bg-gold/10 text-warning border-gold' :'border-border text-muted-foreground hover:border-gold hover:text-warning'
                }`}
              >
                <RefreshCw size={12} />
                {isRecurring ? 'Monthly Recurring ✓' : 'Make Monthly'}
              </button>
            </div>

            {/* Amount Chips */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Donation Amount ({currency}) <span className="text-danger">*</span>
              </label>
              <p className="text-xs text-muted-foreground mb-3">Select a preset amount or enter your own</p>
              <div className="grid grid-cols-3 gap-2.5 mb-3">
                {presetAmounts.map((amt) => (
                  <button
                    key={`amt-${amt}`}
                    type="button"
                    onClick={() => handleAmountSelect(amt)}
                    className={`donation-amount-chip py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                      selectedAmount === amt
                        ? 'donation-amount-chip selected'
                        : 'border-border text-foreground bg-card'
                    }`}
                  >
                    {currency} {amt.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
                  {currency}
                </span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  placeholder="Enter custom amount"
                  min="50"
                  className="w-full pl-16 pr-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium bg-input transition-all"
                />
              </div>

              {/* Impact Calculator */}
              {finalAmount > 0 && (
                <div className="mt-3 p-3 rounded-xl bg-muted border border-border">
                  <p className="text-xs font-semibold text-primary mb-1.5">Your Impact:</p>
                  <div className="text-xs text-muted-foreground space-y-0.5">
                    {finalAmount >= 30000 && <p><Check style={{display:"inline-flex"}} /> Sponsors 1 child for an entire month</p>}
                    {finalAmount >= 5000 && finalAmount < 30000 && <p><Check style={{display:"inline-flex"}}/> Provides school supplies for 5 children</p>}
                    {finalAmount >= 1000 && finalAmount < 5000 && <p><Check style={{display:"inline-flex"}} /> Coverss a child&apos;s meals for one week</p>}
                    {finalAmount >= 500 && finalAmount < 1000 && <p><Check style={{display:"inline-flex"}} /> Buys learning materials for 2 students</p>}
                    {finalAmount < 500 && <p><Check style={{display:"inline-flex"}} /> Contributes to the general ministry fund</p>}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={nextStep}
              disabled={!finalAmount}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-xl font-bold text-base hover:bg-secondary transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Your Details
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* STEP 1: Donor Details */}
        {step === 1 && (
          <form className="animate-fade-in">
            <h3 className="font-bold text-foreground text-lg mb-5">Your Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  First Name <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    {...register('firstName', { required: 'First name is required' })}
                    placeholder="Grace"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-input transition-all"
                  />
                </div>
                {errors.firstName && (
                  <p className="text-danger text-xs mt-1">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  Last Name <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    {...register('lastName', { required: 'Last name is required' })}
                    placeholder="Wanjiku"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-input transition-all"
                  />
                </div>
                {errors.lastName && (
                  <p className="text-danger text-xs mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  Email Address <span className="text-danger">*</span>
                </label>
                <p className="text-xs text-muted-foreground mb-1.5">Your receipt will be sent here</p>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
                    })}
                    type="email"
                    placeholder="grace@example.co.ke"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-input transition-all"
                  />
                </div>
                {errors.email && (
                  <p className="text-danger text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Phone Number</label>
                <p className="text-xs text-muted-foreground mb-1.5">Required for M-Pesa payments</p>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    {...register('phone')}
                    placeholder="+254 700 000 000"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-input transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground mb-1.5">Country</label>
              <div className="relative">
                <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <select
                  {...register('country')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-input transition-all appearance-none"
                >
                  {['Kenya', 'Uganda', 'Tanzania', 'United Kingdom', 'United States', 'Canada', 'Australia', 'Germany', 'Netherlands', 'Other'].map((c) => (
                    <option key={`country-${c}`} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dedication */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground mb-1.5">Donation Dedication (Optional)</label>
              <p className="text-xs text-muted-foreground mb-2">Dedicate this gift in honor or memory of someone</p>
              <select
                {...register('dedication')}
                className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-input transition-all mb-2"
              >
                <option value="none">No dedication</option>
                <option value="honor">In honor of...</option>
                <option value="memory">In memory of...</option>
              </select>
              {watch('dedication') !== 'none' && (
                <div className="relative">
                  <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-muted-foreground" />
                  <textarea
                    {...register('dedicationMessage')}
                    placeholder="Enter the name and a personal message..."
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-input transition-all resize-none"
                  />
                </div>
              )}
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 mb-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-border text-primary focus:ring-primary/20 accent-primary"
                />
                <div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Make this donation anonymous
                  </span>
                  <p className="text-xs text-muted-foreground">Your name will not appear on public donor lists</p>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  // defaultChecked
                  {...register('receiveReceipt')}
                  className="mt-0.5 w-4 h-4 rounded border-border text-primary focus:ring-primary/20 accent-primary"
                />
                <div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Send me a tax receipt
                  </span>
                  <p className="text-xs text-muted-foreground">Official receipt for tax deduction purposes</p>
                </div>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 border border-border text-foreground px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-muted transition-colors"
              >
                <ChevronLeft size={16} />
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-xl font-bold text-sm hover:bg-secondary transition-all duration-150 active:scale-95"
              >
                Continue to Payment
                <ChevronRight size={18} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Payment */}
        {step === 2 && (
          <form onSubmit={handleSubmit(onSubmit)} className="animate-fade-in">
            <h3 className="font-bold text-foreground text-lg mb-5">Choose Payment Method</h3>

            {/* Payment Method Selection */}
            <div className="flex flex-col gap-3 mb-6">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                      paymentMethod === method.id
                        ? 'border-primary bg-muted' :'border-border hover:border-accent/50 hover:bg-muted/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      paymentMethod === method.id ? 'bg-primary/10' : 'bg-muted'
                    }`}>
                      <Icon size={18} className={paymentMethod === method.id ? 'text-primary' : method.color} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-foreground">{method.label}</p>
                      <p className="text-xs text-muted-foreground">{method.desc}</p>
                    </div>
                    {paymentMethod === method.id && (
                      <Check size={16} className="text-primary shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* M-Pesa Phone Input */}
            {paymentMethod === 'mpesa' && (
              <div className="mb-5 p-4 rounded-xl bg-muted border border-border">
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  M-Pesa Phone Number <span className="text-danger">*</span>
                </label>
                <p className="text-xs text-muted-foreground mb-2">
                  An STK push will be sent to this number to complete payment
                </p>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    {...register('mpesaPhone', {
                      required: paymentMethod === 'mpesa' ? 'M-Pesa phone number is required' : false,
                    })}
                    placeholder="+254 700 000 000"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-card transition-all"
                  />
                </div>
                {errors.mpesaPhone && (
                  <p className="text-danger text-xs mt-1">{errors.mpesaPhone.message}</p>
                )}
              </div>
            )}

            {/* Stripe Card fields */}
            {paymentMethod === 'stripe' && (
              <div className="mb-5 p-4 rounded-xl bg-muted border border-border space-y-3">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Card Details</p>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Cardholder Name</label>
                  <input
                    placeholder="Name on card"
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:outline-none text-sm bg-card transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Card Number</label>
                  <input
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:outline-none text-sm bg-card transition-all"
                  />
                  {/* Backend integration point: Replace with Stripe Elements CardNumberElement */}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Expiry</label>
                    <input
                      placeholder="MM / YY"
                      className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:outline-none text-sm bg-card transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">CVC</label>
                    <input
                      placeholder="•••"
                      type="password"
                      maxLength={4}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:outline-none text-sm bg-card transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Summary */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-5">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Donation Summary</p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Campaign</span>
                  <span className="font-medium text-foreground text-right max-w-40 leading-tight">{selectedCampaignData?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-bold text-primary stat-number">{currency} {finalAmount.toLocaleString()}</span>
                </div>
                {isRecurring && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frequency</span>
                    <span className="font-semibold text-warning">Monthly Recurring</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment via</span>
                  <span className="font-medium text-foreground capitalize">{paymentMethod}</span>
                </div>
                <div className="border-t border-border pt-1.5 flex justify-between font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary stat-number">{currency} {finalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 border border-border text-foreground px-5 py-3.5 rounded-xl font-semibold text-sm hover:bg-muted transition-colors"
              >
                <ChevronLeft size={16} />
                Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-xl font-bold text-sm hover:bg-secondary transition-all duration-150 active:scale-95 disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart size={16} />
                    Complete Donation — {currency} {finalAmount.toLocaleString()}
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-4">
              Secured by 256-bit SSL encryption. Your payment info is never stored on our servers.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
