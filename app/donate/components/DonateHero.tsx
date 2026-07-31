import React from 'react';
import { Heart, Shield, Users } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


export default function DonateHero() {
  return (
    <section className="hero-gradient py-12 lg:py-16">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16 text-center">

        <h1 className="text-3xl lg:text-5xl font-extrabold text-primary-foreground mb-3 tracking-tight">
          Your Gift Changes Lives
        </h1>
        <p className="text-primary-foreground/75 text-base lg:text-lg max-w-xl mx-auto mb-6">
          100% of every donation goes directly to ministry programs — education, water, health, and church planting in Northern Kenya.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-5">
          {[
            { icon: Shield, text: 'Secure & Encrypted' },
            { icon: Heart, text: '100% to Ministry' },
            { icon: Users, text: '10,000+ Donors Trust Us' },
          ]?.map(({ icon: Icon, text }) => (
            <div key={`dhero-${text}`} className="flex items-center gap-2 text-primary-foreground/80 text-sm font-medium">
              <Icon size={15} className="text-accent" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
