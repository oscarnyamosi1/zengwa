'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Leaf, Users, Award, Globe } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const stats = [
  { id: 'stat-customers', icon: Leaf, value: 10000, suffix: '+', label: 'Lives Transformed', color: 'text-primary' },
  { id: 'stat-snacks', icon: Users, value: 84, suffix: '+', label: 'Children Sponsored', color: 'text-primary' },
  { id: 'stat-quality', icon: Award, value: 100, suffix: '%', label: 'Quality Guarantee', color: 'text-primary' },
  { id: 'stat-rating', icon: Globe, value: 48, suffix: '/5', label: 'Donor Rating', color: 'text-gold' },
];

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

function StatCard({ stat, animate }: { stat: typeof stats[0]; animate: boolean }) {
  const count = useCountUp(stat.value, 1800, animate);
  const Icon = stat.icon;

  return (
    <div className="flex flex-col items-center text-center p-6 bg-card rounded-2xl border border-border shadow-card">
      <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <Icon size={26} className={stat.color} />
      </div>
      <div className={`impact-counter stat-number ${stat.color} mb-1`}>
        {stat.id === 'stat-rating' ? (count / 10).toFixed(1) : count.toLocaleString()}{stat.id === 'stat-rating' ? '' : stat.suffix}
      </div>
      <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
    </div>
  );
}

export default function ImpactStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-muted/50">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
}
