'use client';

import React, { useState } from 'react';

import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import AppImage from '@/components/ui/AppImage';
import { MapPin, Clock, Users, CheckCircle, ChevronRight, Send } from 'lucide-react';
import { volunteerRoles, volunteers } from '@/data/dummyData';

const categoryColors: Record<string, string> = {
  Health: 'bg-danger/10 text-danger border-danger/20',
  Construction: 'bg-warning/10 text-warning border-warning/20',
  Education: 'bg-primary/10 text-primary border-primary/20',
  Communications: 'bg-accent/20 text-primary border-accent/30',
  Administration: 'bg-muted text-muted-foreground border-border',
  Fundraising: 'bg-gold/10 text-warning border-gold/20',
};

export default function VolunteerPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main>
        {/* Hero */}
        <section className="relative bg-primary overflow-hidden py-16 lg:py-24">
          <div className="herosection absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent blur-3xl" />
          </div>
          <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16 text-center">
           
            <h1 className="inline-flex items-center gap-2 bg-primary-foreground/10 border-primary-foreground/20 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
              <Users size={40} className="shrink-0" />
              Volunteer Program
            </h1>

            <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Give Your Time.<br />Transform Lives.
            </h1>
            <p className="text-primary-foreground/75 text-lg max-w-2xl mx-auto mb-8">
              Join 312+ volunteers from 24 countries who have served in Zengwa. Whether for 2 weeks or 12 months — your skills are needed.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { value: '312+', label: 'Volunteers Served' },
                { value: '24', label: 'Countries' },
                { value: '1,248', label: 'Hours This Month' },
                { value: '38', label: 'Open Roles' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-black text-accent">{stat.value}</p>
                  <p className="text-primary-foreground/70 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Roles */}
        <section className="py-12 lg:py-16">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">Open Volunteer Roles</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Find a role that matches your skills and availability.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {volunteerRoles.map((role) => (
                <div key={role.id} className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[role.category] || 'bg-muted text-muted-foreground border-border'}`}>
                      {role.category}
                    </span>
                    <span className="text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
                      {role.openings} openings
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-2">{role.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{role.description}</p>
                  <div className="space-y-2 mb-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-primary shrink-0" />
                      <span>{role.commitment}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={12} className="text-primary shrink-0" />
                      <span>{role.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {role.skills.map((skill) => (
                      <span key={skill} className="bg-muted text-muted-foreground text-xs px-2.5 py-1 rounded-full">{skill}</span>
                    ))}
                  </div>
                  <button
                    onClick={() => setFormData(f => ({ ...f, role: role.title }))}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary transition-colors"
                  >
                    Apply for This Role <ChevronRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Volunteer Spotlights */}
        <section className="py-12 bg-muted/30 border-t border-border">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Volunteer Spotlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {volunteers.map((vol) => (
                <div key={vol.id} className="bg-card border border-border rounded-2xl p-6 shadow-card">
                  <div className="flex items-center gap-4 mb-4">
                    <AppImage src={vol.image} alt={vol.alt} width={56} height={56} className="w-14 h-14 rounded-full object-cover" />
                    <div>
                      <h3 className="font-bold text-foreground">{vol.name}</h3>
                      <p className="text-primary text-sm font-semibold">{vol.role}</p>
                      <p className="text-xs text-muted-foreground">{vol.location}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm italic leading-relaxed mb-4">&ldquo;{vol.testimonial}&rdquo;</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock size={11} /> {vol.hours} hours served</span>
                    <span>Since {vol.joined}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-12 lg:py-16">
          <div className="max-w-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-3">Apply to Volunteer</h2>
              <p className="text-muted-foreground">Fill in the form below and our team will contact you within 48 hours.</p>
            </div>
            {submitted ? (
              <div className="bg-accent/10 border border-accent/30 rounded-2xl p-8 text-center">
                <CheckCircle size={48} className="text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Application Received!</h3>
                <p className="text-muted-foreground">Thank you for your interest in volunteering. Our team will contact you within 48 hours.</p>
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
                    <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
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
                  <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(f => ({ ...f, phone: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="+254 700 000 000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Role of Interest *</label>
                  <select
                    required
                    value={formData.role}
                    onChange={(e) => setFormData(f => ({ ...f, role: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    <option value="">Select a role...</option>
                    {volunteerRoles.map((r) => (
                      <option key={r.id} value={r.title}>{r.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Why do you want to volunteer?</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    placeholder="Tell us about your skills and motivation..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold hover:bg-secondary transition-colors active:scale-95"
                >
                  <Send size={16} />
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
