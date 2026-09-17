import React from 'react';
import { Leaf, FlaskConical, Truck, RotateCcw, Headphones } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const badges = [
  { icon: Leaf, title: '100% Faith-Based', subtitle: 'Ministry-driven programs' },
  // { icon: FlaskConical, title: 'No Overhead Waste', subtitle: 'Funds go to the field' },
  { icon: Truck, title: 'Free Impact Reports', subtitle: 'On all donations' },
  // { icon: RotateCcw, title: 'Easy Refunds', subtitle: 'Hassle-free guarantee' },
  { icon: Headphones, title: '24/7 Support', subtitle: 'We are here to help' },
];

export default function TrustBadgeStrip() {
  return (
    <section className="bg-card border-y border-border shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {badges?.map(({ icon: Icon, title, subtitle }) => (
            <div
              key={`badge-${title}`}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-muted transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-muted group-hover:bg-accent/20 flex items-center justify-center shrink-0 transition-colors">
                <Icon size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">{title}</p>
                <p className="text-xs text-muted-foreground leading-tight">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
