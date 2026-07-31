import React from 'react';
import Link from 'next/link';
import { Heart, Users, TrendingUp, Shield, Award, CheckCircle } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';


const recentDonations = [
{ id: 'rd-001', name: 'Margaret W.', amount: 'KES 5,000', campaign: 'School Block B', time: '2 min ago', avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f5c84a8b-1772712488589.png", alt: 'Profile photo of a Kenyan woman with a warm smile' },
{ id: 'rd-002', name: 'Anonymous', amount: 'USD 50', campaign: 'Clean Water', time: '8 min ago', avatar: null, alt: '' },
{ id: 'rd-003', name: 'David O.', amount: 'KES 2,500', campaign: 'Child Sponsorship', time: '14 min ago', avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10c0dde2e-1772695747551.png", alt: 'Profile photo of a young Kenyan man smiling' },
{ id: 'rd-004', name: 'Sarah T.', amount: 'GBP 30', campaign: 'School Block B', time: '21 min ago', avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16fa53386-1772335404610.png", alt: 'Profile photo of a British woman with blonde hair' }];


export default function DonateSidebar() {
  return (
    <div className="flex flex-col gap-4 sticky top-24">
      {/* Progress Summary */}
      <div className="bg-card rounded-md border border-border shadow-card p-5">
        <h3 className="font-bold text-foreground text-base mb-4">Campaign Progress</h3>
        <div className="space-y-4">
          {[
          { label: 'School Block B', raised: 1240000, goal: 1800000, pct: 69 },
          { label: 'Clean Water', raised: 680000, goal: 900000, pct: 76 },
          { label: 'Child Sponsorship', raised: 325000, goal: 500000, pct: 65 }]?.
          map((c) =>
          <div key={`sidebar-prog-${c?.label}`}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-foreground">{c?.label}</span>
                <span className="text-primary font-bold stat-number">{c?.pct}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                className="bg-primary h-2 rounded-full progress-bar-fill"
                style={{ width: `${c?.pct}%` }} />
              
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                KES {(c?.raised / 1000)?.toFixed(0)}K of KES {(c?.goal / 1000)?.toFixed(0)}K
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Trust Badges */}
      <div className="bg-card rounded-md border border-border shadow-card p-5">
        <h3 className="font-bold text-foreground text-base mb-3">Why Donate Here?</h3>
        <div className="space-y-3">
          {[
          { icon: Shield, text: '100% Secure Payments', sub: 'SSL + PCI compliant' },
          { icon: CheckCircle, text: '100% Goes to Ministry', sub: 'Zero admin overhead taken' },
          { icon: Award, text: 'Registered NGO', sub: 'Kenya Reg. No. 0042/2019' },
          { icon: TrendingUp, text: 'Full Transparency', sub: 'Monthly impact reports' }]?.
          map(({ icon: Icon, text, sub }) =>
          <div key={`trust-${text}`} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
                <Icon size={15} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">{text}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Recent Donors */}
      <div className="bg-card rounded-md border border-border shadow-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-foreground text-base">Recent Donors</h3>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
            <span className="text-xs text-muted-foreground font-medium">Live</span>
          </div>
        </div>
        <div className="space-y-3">
          {recentDonations?.map((d) =>
          <div key={d?.id} className="flex items-center gap-3">
              {d?.avatar ?
            <AppImage
              src={d?.avatar}
              alt={d?.alt}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover border border-border shrink-0" /> :


            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 border border-border">
                  <Users size={14} className="text-muted-foreground" />
                </div>
            }
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground leading-tight truncate">{d?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{d?.campaign}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-bold text-primary stat-number">{d?.amount}</p>
                <p className="text-xs text-muted-foreground">{d?.time}</p>
              </div>
            </div>
          )}
        </div>

        <Link
          href="/donate"
          className="mt-4 w-full flex items-center justify-center gap-2 bg-muted text-primary py-2.5 rounded-xl text-sm font-semibold hover:bg-accent/20 transition-colors">
          
          <Heart size={14} />
          Join {1847} donors today
        </Link>
      </div>
    </div>);

}
