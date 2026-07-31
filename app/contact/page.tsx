'use client';

import React, { useState } from 'react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const faqs = [
  { q: 'How do I know my donation reaches the field?', a: 'We publish monthly financial reports and project updates. 100% of project-designated funds go directly to the field. Our admin costs are covered by a separate operational fund.' },
  { q: 'Can I visit the projects in person?', a: 'Yes! We welcome donor visits. Contact us to arrange a field visit to Zengwa Village. We can arrange accommodation and guided tours of all active projects.' },
  { q: 'How do I get a tax receipt for my donation?', a: 'Tax receipts are sent automatically to your email within 24 hours of your donation. For large donations, we can provide official charity receipts for tax purposes.' },
  { q: 'How can I become a monthly donor?', a: 'You can set up recurring donations via M-Pesa, Stripe, or PayPal on our Donate page. Monthly donors receive exclusive impact reports and early access to project updates.' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main>
        {/* Hero */}
        <section className="relative bg-primary overflow-hidden py-14 lg:py-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent blur-3xl" />
          </div>
          <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16 text-center">
            

            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border-primary-foreground/20 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
                <h1 className="text-4xl text-white lg:text-5xl font-bold text-primary-foreground mb-4 leading-tight flex items-center gap-3 whitespace-nowrap">
                  <MessageCircle size={40} />
                  Get in Touch
                </h1>

            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              We&apos;d Love to Hear From You
            </h1>
            <p className="text-primary-foreground/75 text-lg max-w-xl mx-auto">
              Questions about donating, volunteering, or visiting? Our team responds within 24 hours.
            </p>
          </div>
        </section>

        {/* Contact Info + Form */}
        <section className="py-12 lg:py-16">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Contact Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    {[
                      { icon: MapPin, label: 'Address', value: 'Zengwa Village, Marsabit County, Northern Kenya' },
                      { icon: Phone, label: 'Phone', value: '+254 700 123 456' },
                      { icon: Mail, label: 'Email', value: 'info@zengwaconnect.org' },
                      { icon: Clock, label: 'Office Hours', value: 'Mon–Fri: 8am–5pm EAT' },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className="flex items-start gap-4 p-4 bg-card border border-border rounded-2xl shadow-card">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <Icon size={18} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">{item.label}</p>
                            <p className="text-sm text-foreground font-medium">{item.value}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Nairobi Office */}
                <div className="p-5 bg-primary/5 border border-primary/20 rounded-2xl">
                  <h3 className="font-bold text-foreground mb-2">Nairobi Liaison Office</h3>
                  <p className="text-sm text-muted-foreground">Westlands Business Park, Suite 4B<br />Nairobi, Kenya<br />+254 722 456 789</p>
                </div>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/254700123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl hover:bg-[#25D366]/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0">
                    <MessageCircle size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Chat on WhatsApp</p>
                    <p className="text-xs text-muted-foreground">Typically replies within 1 hour</p>
                  </div>
                </a>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
                {submitted ? (
                  <div className="bg-accent/10 border border-accent/30 rounded-2xl p-10 text-center">
                    <CheckCircle size={52} className="text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">Thank you for reaching out. We&apos;ll respond within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 shadow-card space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData(f => ({ ...f, name: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(f => ({ ...f, email: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Subject *</label>
                      <select
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData(f => ({ ...f, subject: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      >
                        <option value="">Select a subject...</option>
                        <option>Donation Enquiry</option>
                        <option>Child Sponsorship</option>
                        <option>Volunteer Application</option>
                        <option>Partnership Proposal</option>
                        <option>Field Visit Request</option>
                        <option>Media & Press</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Message *</label>
                      <textarea
                        rows={6}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData(f => ({ ...f, message: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold hover:bg-secondary transition-colors active:scale-95"
                    >
                      <Send size={16} />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-muted/30 border-t border-border">
          <div className="max-w-3xl mx-auto px-6 lg:px-10 xl:px-16">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden shadow-card">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-semibold text-foreground text-sm pr-4">{faq.q}</span>
                    <span className={`text-primary text-lg font-bold shrink-0 transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
