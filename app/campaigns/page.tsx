'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import AppImage from '@/components/ui/AppImage';
import { Heart, Star, Clock, Users, Megaphone, TrendingUp } from 'lucide-react';
import { campaigns } from '@/data/dummyData';

const categories = ['All', 'Education', 'Water & Health', 'Sponsorship', 'Health', 'Church', 'Infrastructure'];
const sortOptions = ['Most Funded', 'Newest', 'Ending Soon', 'Most Donors'];

function formatKES(amount: number): string {
  if (amount >= 1000000) return `KES ${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `KES ${(amount / 1000).toFixed(0)}K`;
  return `KES ${amount.toLocaleString()}`;
}

export default function CampaignsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Most Funded');

  const filtered = (activeCategory === 'All' ? campaigns : campaigns.filter((c) => c.category === activeCategory))
    .slice()
    .sort((a, b) => {
      if (sortBy === 'Most Funded') return (b.raised / b.goal) - (a.raised / a.goal);
      if (sortBy === 'Most Donors') return b.donors - a.donors;
      if (sortBy === 'Ending Soon') return a.daysLeft - b.daysLeft;
      return 0;
    });

  const totalRaised = campaigns.reduce((s, c) => s + c.raised, 0);
  const totalDonors = campaigns.reduce((s, c) => s + c.donors, 0);

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main>
        {/* Hero */}
        <section className="relative bg-primary overflow-hidden py-16 lg:py-24">
          <div className="herosection absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent blur-2xl" />
          </div>
          <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>

               <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 leading-tight flex items-center gap-3 whitespace-nowrap">
                  <Megaphone size={40} className="shrink-0" /> 
                  <span>Active Campaigns</span>
                </h1>



                <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
                  Fund What Matters.<br />Change Lives Forever.
                </h1>
                {/* <p className="text-primary-foreground/75 leading-relaxed max-w-xs text-lg mb-8 "> */}
                <p className="text-white/75 text-md leading-relaxed mb-8 max-w-xs">
                  Every campaign represents a real, urgent need. Your gift — however small — makes an eternal difference.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/donate" className="bg-accent text-primary font-semibold px-6 py-3 rounded-xl hover:bg-accent/90 transition-colors flex items-center gap-2">
                    <Heart size={16} /> Give Now
                  </Link>
                  <Link href="/child-sponsorship" className="border border-primary-foreground/30 text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-primary-foreground/10 transition-colors">
                    Sponsor a Child
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-md p-5 text-center">
                  <p className="text-3xl font-black text-accent mb-1">{formatKES(totalRaised)}</p>
                  <p className="text-primary-foreground/70 text-sm">Total Raised</p>
                </div>
                <div className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-md p-5 text-center">
                  <p className="text-3xl font-black text-accent mb-1">{campaigns.length}</p>
                  <p className="text-primary-foreground/70 text-sm">Active Campaigns</p>
                </div>
                <div className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-md p-5 text-center">
                  <p className="text-3xl font-black text-accent mb-1">{totalDonors.toLocaleString()}</p>
                  <p className="text-primary-foreground/70 text-sm">Total Donors</p>
                </div>
                <div className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-md p-5 text-center">
                  <p className="text-3xl font-black text-accent mb-1">100%</p>
                  <p className="text-primary-foreground/70 text-sm">Goes to Field</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-6 bg-card border-b border-border sticky top-16 z-30">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      activeCategory === cat
                        ? 'bg-primary text-primary-foreground shadow-card'
                        : 'bg-background border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-xl border border-border bg-background text-sm font-medium text-foreground focus:outline-none focus:border-primary"
              >
                {sortOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Campaigns Grid */}
        <section className="py-12 lg:py-16">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <p className="text-muted-foreground text-sm mb-6">{filtered.length} campaigns found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((campaign) => {
                const pct = Math.round((campaign.raised / campaign.goal) * 100);
                return (
                  <div key={campaign.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group">
                    <div className="relative overflow-hidden">
                      <AppImage
                        src={campaign.image}
                        alt={campaign.alt}
                        width={500}
                        height={280}
                        className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold ${campaign.badgeColor}`}>
                        {campaign.badge}
                      </div>
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-semibold text-primary border border-border">
                        {campaign.category}
                      </div>
                      {campaign.daysLeft <= 30 && (
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-danger/90 text-white px-2.5 py-1 rounded-full text-xs font-semibold">
                          <Clock size={11} />
                          {campaign.daysLeft} days left
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-foreground text-base mb-2 leading-snug">{campaign.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">{campaign.description}</p>

                      {/* Progress */}
                      <div className="mb-4">
                        <div className="w-full bg-muted rounded-full h-2.5 mb-2">
                          <div
                            className="bg-primary h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(pct, 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="font-bold text-primary">{formatKES(campaign.raised)}</span>
                          <span className="text-muted-foreground">{pct}% of {formatKES(campaign.goal)}</span>
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-1.5">
                          <Users size={12} className="text-primary" />
                          <span>{campaign.donors} donors</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} className="text-muted-foreground" />
                          <span>{campaign.daysLeft} days left</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={11} className="fill-gold text-gold" />
                          <span>{campaign.updates} updates</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href="/donate"
                          className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary transition-colors active:scale-95"
                        >
                          <Heart size={14} />
                          Donate
                        </Link>
                        <button className="px-3 py-2.5 rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
                          <TrendingUp size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-12 bg-muted/30 border-t border-border">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {[
                { icon: '', title: 'Secure Payments', desc: 'M-Pesa, Stripe & PayPal. All transactions encrypted and secure.' },
                { icon: '', title: 'Full Transparency', desc: 'Monthly financial reports published. Every shilling accounted for.' },
                { icon: '', title: 'Instant Receipts', desc: 'Tax-deductible receipts sent immediately to your email.' },
              ].map((item) => (
                <div key={item.title} className="p-6 bg-card border border-border rounded-sm shadow-card">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
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
