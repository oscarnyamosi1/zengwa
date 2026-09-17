'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import AppImage from '@/components/ui/AppImage';
import { Heart, MapPin, BookOpen, Star, CheckCircle, ChevronRight, HandHeart } from 'lucide-react';
import { children } from '@/data/dummyData';

export default function ChildSponsorshipPage() {
  const [filter, setFilter] = useState<'all' | 'available' | 'sponsored'>('all');

  const filtered = filter === 'all' ? children : filter === 'available' ? children.filter((c) => !c.sponsored) : children.filter((c) => c.sponsored);

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main>
        {/* Hero */}
        <section className="relative bg-primary overflow-hidden py-16 lg:py-24">
          <div className="herosection absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent blur-3xl" />
          </div>
          <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                
               <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 leading-tight flex items-center gap-3 whitespace-nowrap">
                  <HandHeart size={40} className="shrink-0" />
                  Child Sponsorship
                </h1>

                <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
                  Sponsor a Child.<br />Change Their World.
                </h1>
                <p className="text-primary-foreground/75 text-lg mb-6">
                  For as little as KES 3,500/month, you can cover a child&apos;s school fees, meals, healthcare, and uniform — giving them a future they could never have alone.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                  { label: 'School Fees', icon: BookOpen },
                  { label: 'Daily Meals', icon: '🍽️' },
                  { label: 'Healthcare', icon: '🏥' },
                  { label: 'Uniform & Books', icon: '📚' }].
                  map((item) =>
                  <div key={item.label} className="flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl px-3 py-2">
                      <CheckCircle size={14} className="text-accent shrink-0" />
                      <span className="text-primary-foreground/90 text-sm font-medium">{item.label}</span>
                    </div>
                  )}
                </div>
                <Link href="#children" className="inline-flex items-center gap-2 bg-accent text-primary font-semibold px-6 py-3 rounded-xl hover:bg-accent/90 transition-colors">
                  <Heart size={16} /> Meet the Children <ChevronRight size={16} />
                </Link>
              </div>
              <div className="relative">
                <AppImage
                  src="https://images.unsplash.com/photo-1567057420215-0afa9aa9253a"
                  alt="Group of smiling Kenyan school children in green uniforms standing outside a classroom"
                  width={600}
                  height={450}
                  className="w-full h-80 object-cover rounded-3xl shadow-card-lg" />
                
                <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-2xl p-4 shadow-card-lg">
                  <p className="text-2xl font-black text-primary">84</p>
                  <p className="text-xs text-muted-foreground">Children Sponsored</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 bg-card border-b border-border">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">How Sponsorship Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
              { step: '01', title: 'Choose a Child', desc: 'Browse profiles and select a child whose story moves your heart.' },
              { step: '02', title: 'Set Up Monthly Gift', desc: 'Give KES 3,500–4,500/month via M-Pesa, Stripe, or PayPal.' },
              { step: '03', title: 'Receive Updates', desc: 'Get quarterly photo updates, letters, and progress reports.' },
              { step: '04', title: 'Change a Life', desc: 'Watch your sponsored child grow, graduate, and thrive.' }].
              map((item) =>
              <div key={item.step} className="text-center p-5 rounded-2xl bg-background border border-border">
                  <div className="text-4xl font-black text-primary/20 mb-2">{item.step}</div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Children Grid */}
        <section id="children" className="py-12 lg:py-16">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Meet the Children</h2>
                <p className="text-muted-foreground text-sm mt-1">Each child is waiting for someone like you.</p>
              </div>
              <div className="flex gap-2">
                {(['all', 'available', 'sponsored'] as const).map((f) =>
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                  filter === f ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:text-foreground'}`
                  }>
                  
                    {f === 'all' ? 'All Children' : f === 'available' ? 'Needs Sponsor' : 'Sponsored'}
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((child) =>
              <div key={child.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group">
                  <div className="relative overflow-hidden">
                    <AppImage
                    src={child.image}
                    alt={child.alt}
                    width={400}
                    height={300}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
                  
                    {child.sponsored ?
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-accent/90 text-primary px-3 py-1.5 rounded-full text-xs font-bold">
                        <CheckCircle size={12} />
                        Sponsored
                      </div> :

                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold">
                        <Heart size={12} />
                        Needs Sponsor
                      </div>
                  }
                    <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-foreground border border-border">
                      Age {child.age}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-foreground text-base">{child.name}</h3>
                        <p className="text-primary text-sm font-semibold">{child.grade}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-primary">KES {child.monthlyAmount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">per month</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                      <MapPin size={12} className="text-primary shrink-0" />
                      {child.location}
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{child.story}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {child.interests.map((interest) =>
                    <span key={interest} className="bg-accent/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full border border-accent/20">
                          {interest}
                        </span>
                    )}
                    </div>

                    {!child.sponsored ?
                  <Link
                    href="/donate"
                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary transition-colors active:scale-95">
                    
                        <Heart size={14} />
                        Sponsor {child.name.split(' ')[0]}
                      </Link> :

                  <div className="w-full flex items-center justify-center gap-2 bg-accent/10 text-primary border border-accent/30 py-2.5 rounded-xl text-sm font-semibold">
                        <CheckCircle size={14} />
                        Already Sponsored
                      </div>
                  }
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-12 bg-primary">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="flex justify-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={18} className="fill-accent text-accent" />)}
              </div>
              <p className="text-primary-foreground text-xl italic mb-6">
                &ldquo;Sponsoring Amina has been one of the greatest joys of my life. The updates I receive show real transformation — not just in her education but in her entire family.&rdquo;
              </p>
              <p className="text-accent font-semibold">Margaret Thompson — Child Sponsor, United Kingdom 🇬🇧</p>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>);

}