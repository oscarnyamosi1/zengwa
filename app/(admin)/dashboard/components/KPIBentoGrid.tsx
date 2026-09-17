import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Heart,
  Megaphone,
  HandHeart,
  Clock,
  Users,
  Activity,
  AlertTriangle,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const kpiCards = [
  {
    id: 'kpi-raised',
    label: 'Total Raised (Jul)',
    value: 'KES 2.84M',
    subValue: '+KES 340K vs Jun',
    trend: 'up',
    trendPct: '+13.6%',
    icon: Heart,
    color: 'text-primary',
    bg: 'bg-accent/10',
    highlight: true,
    description: 'Monthly donation receipts',
  },
  {
    id: 'kpi-campaigns',
    label: 'Active Campaigns',
    value: '5',
    subValue: '2 near goal',
    trend: 'up',
    trendPct: '+1 this month',
    icon: Megaphone,
    color: 'text-primary',
    bg: 'bg-muted',
    highlight: false,
    description: 'Live fundraising campaigns',
  },
  {
    id: 'kpi-children',
    label: 'Children Sponsored',
    value: '84',
    subValue: '93% of 910 target',
    trend: 'up',
    trendPct: '+12 this month',
    icon: HandHeart,
    color: 'text-primary',
    bg: 'bg-muted',
    highlight: false,
    description: 'Active child sponsorships',
  },
  {
    id: 'kpi-pending',
    label: 'Pending Donations',
    value: '23',
    subValue: 'KES 184K awaiting',
    trend: 'alert',
    trendPct: 'Needs review',
    icon: Clock,
    color: 'text-warning',
    bg: 'bg-warning/10',
    highlight: false,
    description: 'Unconfirmed payment receipts',
    alert: true,
  },
  {
    id: 'kpi-volunteers',
    label: 'Volunteer Hours (Jul)',
    value: '1,248',
    subValue: '+186 vs last month',
    trend: 'up',
    trendPct: '+17.5%',
    icon: Activity,
    color: 'text-primary',
    bg: 'bg-muted',
    highlight: false,
    description: 'Total hours logged by volunteers',
  },
  {
    id: 'kpi-donors',
    label: 'New Donors (Jul)',
    value: '142',
    subValue: '38 first-time givers',
    trend: 'down',
    trendPct: '-6.2% vs Jun',
    icon: Users,
    color: 'text-danger',
    bg: 'bg-danger/5',
    highlight: false,
    description: 'Donors acquired this month',
    warn: true,
  },
];

export default function KPIBentoGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 gap-4 mb-6">
      {kpiCards?.map((card) => {
        const Icon = card?.icon;
        return (
          <div
            key={card?.id}
            className={`
              rounded-2xl border shadow-card p-5 flex flex-col gap-3 transition-shadow hover:shadow-card-hover
              ${card?.highlight
                ? 'bg-primary text-primary-foreground border-primary col-span-1 sm:col-span-2 lg:col-span-1 2xl:col-span-2'
                : card?.alert
                ? 'bg-warning/5 border-warning/30'
                : card?.warn
                ? 'bg-danger/5 border-danger/20' :'bg-card border-border'
              }
            `}
          >
            {/* Top Row */}
            <div className="flex items-start justify-between">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card?.highlight ? 'bg-primary-foreground/20' : card?.bg}`}>
                <Icon size={18} className={card?.highlight ? 'text-primary-foreground' : card?.color} />
              </div>
              {card?.alert && (
                <div className="flex items-center gap-1 bg-warning/10 text-warning border border-warning/30 px-2 py-1 rounded-full">
                  <AlertTriangle size={11} />
                  <span className="text-xs font-semibold">Alert</span>
                </div>
              )}
              {card?.warn && (
                <div className="flex items-center gap-1 bg-danger/10 text-danger border border-danger/20 px-2 py-1 rounded-full">
                  <TrendingDown size={11} />
                  <span className="text-xs font-semibold">Down</span>
                </div>
              )}
            </div>
            {/* Value */}
            <div>
              <p className={`kpi-value stat-number leading-none ${card?.highlight ? 'text-primary-foreground' : 'text-foreground'}`}>
                {card?.value}
              </p>
              <p className={`text-xs font-semibold mt-1 uppercase tracking-wider ${card?.highlight ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                {card?.label}
              </p>
            </div>
            {/* Trend */}
            <div className={`flex items-center gap-1.5 text-xs font-semibold ${
              card?.trend === 'up' ? card?.highlight ?'text-accent' : 'text-primary'
                : card?.trend === 'down' ?'text-danger' :'text-warning'
            }`}>
              {card?.trend === 'up' && <TrendingUp size={13} />}
              {card?.trend === 'down' && <TrendingDown size={13} />}
              {card?.trend === 'alert' && <AlertTriangle size={13} />}
              <span>{card?.trendPct}</span>
              <span className={`font-normal ${card?.highlight ? 'text-primary-foreground/50' : 'text-muted-foreground'}`}>
                — {card?.subValue}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
