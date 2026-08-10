import React from 'react';
import Link from 'next/link';
import { Heart, ArrowRight, CheckCircle, Truck, Shield } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { recentDonations } from '@/data/dummyData';


export default function HeroSection() {
  return (
    <section className="relative overflow-hidden hero-gradient-light">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 blob-green opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 blob-gold opacity-40 pointer-events-none" />
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slide-up">
           
            {/* Headline */}
            <h1 className="text-hero-xl text-foreground mb-4 text-balance">
              Balanced Giving.{' '}
              <span className="text-primary">Pure Impact.</span>
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg">
              Discover how your generosity transforms children's lives through Christian education, clean water, and community development in Coast  region of Kenya.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/donate"
                className="flex items-center gap-2.5 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-semibold text-base hover:bg-secondary transition-all duration-150 active:scale-95 shadow-card-lg">
                
                <Heart size={18} />
                Donate Now
              </Link>
              <Link
                href="/campaigns"
                className="flex items-center gap-2.5 border-2 border-primary text-primary px-7 py-3.5 rounded-xl font-semibold text-base hover:bg-muted transition-all duration-150 active:scale-95">
                
                Explore Campaigns
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6">
              {[
              { icon: CheckCircle, text: '100% Natural Mission' },
              { icon: Truck, text: 'Free Impact Reports' },
              { icon: Shield, text: 'Secure Donation Channels' }]?.
              map(({ icon: Icon, text }) =>
              <div key={`trust-${text}`} className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                  <Icon size={16} className="text-primary" />
                  {text}
                </div>
              )}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end animate-fade-in">
            <div className="relative w-full max-w-lg">
              {/* Main image card */}
              <div className="glass-card rounded-l overflow-hidden shadow-card-lg p-2">
                <AppImage
                  src="https://images.unsplash.com/photo-1567057420215-0afa9aa9253a"
                  alt="African children in school uniforms studying together in a bright classroom, smiling and engaged"
                  width={600}
                  height={450}
                  className="rounded-xl w-full object-cover"
                  priority />
                
              </div>

              {/* Floating badge — 100% Organic */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-primary flex flex-col items-center justify-center shadow-card-lg border-4 border-card">
                <span className="text-primary-foreground font-extrabold text-sm leading-none">100%</span>
                <span className="text-accent text-xs font-semibold leading-none mt-0.5">Faith</span>
              </div>

              {/* Floating donation card */}
              <div className="absolute -bottom-4 -left-4 glass-card rounded-sm p-3 shadow-card-lg border border-border max-w-48">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <Heart size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Latest Donation</p>
                    <p className="text-sm font-bold text-foreground">KES {recentDonations.at(-1)?.amount?.toLocaleString()}</p>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full progress-bar-fill" style={{ width: '72%' }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">72% of goal reached</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}
