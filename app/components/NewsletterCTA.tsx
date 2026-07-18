'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Mail, Loader2 } from 'lucide-react';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    // Backend integration point: POST /api/newsletter/subscribe
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setEmail('');
    toast.success('You are subscribed!', {
      description: 'Thank you — you will receive ministry updates and impact reports.',
    });
  };

  return (
    <section className="py-16 bg-primary relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/30 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left */}
          <div className="text-center lg:text-left max-w-lg">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
              <Leaf size={18} className="text-accent" />
              <span className="text-accent text-sm font-semibold tracking-wider uppercase">Stay Connected</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-primary-foreground mb-2">
              Get 10% Off Your First Gift!
            </h2>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Subscribe to our newsletter and get exclusive ministry updates, impact stories, health tips, and prayer needs delivered to your inbox.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:min-w-96">
            <div className="flex-1 relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-primary-foreground text-foreground text-sm font-medium placeholder:text-muted-foreground border border-transparent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-accent text-primary px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-accent/90 transition-all duration-150 active:scale-95 disabled:opacity-70 whitespace-nowrap min-w-28"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// Leaf needs to be imported
function Leaf({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}
