import React from 'react';
import Link from 'next/link';
import { Leaf, Heart, Globe } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';


const pillars = [
{
  id: 'pillar-sourced',
  icon: Leaf,
  title: 'Mindfully Sourced',
  desc: 'Every program uses premium, community-tested methods'
},
{
  id: 'pillar-nutrition',
  icon: Heart,
  title: 'Balanced Education',
  desc: 'Diverse range of learning and development programs'
},
{
  id: 'pillar-choices',
  icon: Globe,
  title: 'Conscious Impact',
  desc: 'No corruption, no waste — pure ministry outcomes'
}];


export default function OurStorySection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-card-lg">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1b4d21463-1764671823131.png"
                alt="Volunteers and teachers working together with children in a Kenyan school setting, reviewing educational materials"
                width={600}
                height={500}
                className="w-full object-cover h-[420px]" />
              
            </div>
            {/* Overlay card */}
            <div className="absolute bottom-6 right-6 glass-card rounded-sm p-4 shadow-glass border border-border max-w-52">
              <div className="flex items-center gap-2 mb-2">
                {/* <div className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" /> */}
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Live Impact</span>
              </div>
              <p className="text-2xl font-extrabold text-foreground stat-number">847</p>
              <p className="text-xs text-muted-foreground">Children in school today</p>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm tracking-wider uppercase mb-4">
              <span className="w-8 h-0.5 bg-primary rounded" />
              Our Story
            </div>
            <h2 className="text-section-title text-foreground mb-4">
              Balanced Fuel for{' '}
              <span className="text-primary">an Active Faith</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              At Zengwa Christian Education Centre, we believe that smart investment in children is the key to a transformed community. We curate the finest educational programs and community initiatives that nourish young minds and delight families without compromise. No corruption, no waste — just pure, wholesome impact to keep communities going strong.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Founded in 2019 in the heart of Northern Kenya, we have grown from serving 45 children to over 847 students across 3 schools — with plans to reach 2,000 by 2028.
            </p>

            {/* Pillars */}
            <div className="flex flex-col gap-4 mb-8">
              {pillars?.map(({ id, icon: Icon, title, desc }) =>
              <div key={id} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-muted-foreground text-sm">{desc}</p>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:bg-secondary transition-all duration-150 active:scale-95">
              
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </section>);

}
