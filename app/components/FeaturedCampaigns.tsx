import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';

import { faHandHoldingHeart, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import FaIcon from '@/app/components/FaIcon';
import  { campaigns } from "@/data/dummyData"


function formatKES(amount: number): string {
  if (amount >= 1000000) return `KES ${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `KES ${(amount / 1000).toFixed(0)}K`;
  return `KES ${amount.toLocaleString()}`;
}

export default function FeaturedCampaigns() {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm tracking-wider uppercase mb-3">
            <span className="w-8 h-0.5 bg-primary rounded" />
            Our Campaigns
            <span className="w-8 h-0.5 bg-primary rounded" />
          </div>
          <h2 className="text-section-title text-foreground">Featured Projects</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Each campaign represents a real need in our community. Your gift goes directly to the field.
          </p>
        </div>

        {/* Campaign Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
            {campaigns.map((campaign) => {
              const pct = Math.round(campaign.raised / campaign.goal * 100);
              return (
                <div
                  key={campaign.id}
                  className="campaign-card-hover bg-card rounded-sm overflow-hidden border border-border shadow-card group">
                  
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <AppImage
                      src={ campaign.image?.[0] || null }
                      alt={campaign.alt}
                      width={400}
                      height={220}
                      className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105" />
                    
                    <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold ${campaign.badgeColor}`}>
                      {campaign.badge}
                    </div>
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-card/90 text-xs font-semibold text-primary border border-border">
                      {campaign.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-sm text-foreground leading-snug mb-2 line-clamp-2">
                      {campaign.title}
                    </h3>

                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) =>
                      <Star
                        key={`star-${campaign.id}-${star}`}
                        size={12}
                        className={star <= Math.floor(campaign.rating) ? 'fill-gold text-gold' : 'text-border'} />

                      )}
                      <span className="text-xs text-muted-foreground ml-1">({campaign.reviews})</span>
                    </div>

                    {/* Progress */}
                    <div className="mb-1.5">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full progress-bar-fill"
                          style={{ width: `${pct}%` }} />
                        
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-3">
                      <span className="font-semibold text-primary stat-number">{formatKES(campaign.raised)}</span>
                      <span>{pct}% of {formatKES(campaign.goal)}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span>{campaign.donors} donors</span>
                    </div>

                    {/* CTA */}
                    <Link
                      href="/donate"
                      className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary transition-all duration-150 active:scale-95">
                      
                      <FaIcon icon={faHandHoldingHeart} size={22} className="white" />
                      Donate Now
                    </Link>
                  </div>
                </div>);

            })}
          </div>

          {/* Nav arrows — decorative on desktop */}
          <button
            aria-label="Previous campaigns"
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border shadow-card flex items-center justify-center hover:bg-muted transition-colors hidden xl:flex">
            
            <ChevronLeft size={18} className="text-foreground" />
          </button>
          <button
            aria-label="Next campaigns"
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border shadow-card flex items-center justify-center hover:bg-muted transition-colors hidden xl:flex">
            
            <ChevronRight size={18} className="text-foreground" />
          </button>
        </div>

        {/* View all */}
        <div className="text-center mt-8">
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
            
            View All Campaigns
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>);

}
