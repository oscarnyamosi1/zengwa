
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Calendar, HandHeart, AlertCircle } from 'lucide-react';

const SponsorshipRingChart = dynamic(
  () => import('./SponsorshipRingChart'),
  { ssr: false, loading: () => <div className="animate-pulse bg-muted rounded-xl h-44" /> }
);

const upcomingEvents = [
  { id: 'evt-001', title: 'Board Meeting — Q3 Review', date: '19 Jul 2026', type: 'Admin', color: 'bg-primary/10 text-primary' },
  { id: 'evt-002', title: 'Volunteer Orientation Day', date: '22 Jul 2026', type: 'Volunteer', color: 'bg-accent/20 text-primary' },
  { id: 'evt-003', title: 'School Block B Site Visit', date: '25 Jul 2026', type: 'Project', color: 'bg-gold/20 text-warning' },
  { id: 'evt-004', title: 'Donor Appreciation Webinar', date: '30 Jul 2026', type: 'Donor', color: 'bg-warning/10 text-warning' },
];

const prayerRequests = [
  { id: 'pr-001', name: 'Grace Wanjiku', request: 'Pray for safe delivery of school materials delayed at port', time: '2h ago', urgent: true },
  { id: 'pr-002', name: 'Pastor Daniel', request: 'Prayers for wisdom as we plan the new church plant in Moyale', time: '5h ago', urgent: false },
  { id: 'pr-003', name: 'Volunteer Team', request: 'Safety and health for all volunteers traveling to Zengwa next week', time: '1d ago', urgent: false },
];

export default function DashboardRightPanel() {
  return (
    <div className="flex flex-col gap-5">
      {/* Sponsorship Ring */}
      <div className="bg-card rounded-md border border-border shadow-card p-5">
        <h3 className="font-bold text-foreground text-base mb-1">Sponsorship Status</h3>
        <p className="text-xs text-muted-foreground mb-4">847 of 910 children sponsored</p>
        <SponsorshipRingChart />
        <div className="grid grid-cols-2 gap-2 mt-4">
          {[
            { label: 'Sponsored', value: '847', color: 'bg-primary' },
            { label: 'Awaiting', value: '63', color: 'bg-border' },
          ]?.map(({ label, value, color }) => (
            <div key={`sring-${label}`} className="flex items-center gap-2 bg-muted rounded-xl p-3">
              <span className={`w-2.5 h-2.5 rounded-full ${color} shrink-0`} />
              <div>
                <p className="text-base font-bold text-foreground stat-number">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Upcoming Events */}
      <div className="bg-card rounded-md border border-border shadow-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-foreground text-base">Upcoming Events</h3>
          <Calendar size={16} className="text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-3">
          {upcomingEvents?.map((evt) => (
            <div key={evt?.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted transition-colors cursor-pointer">
              <div className={`text-xs font-bold px-2 py-1 rounded-lg shrink-0 ${evt?.color}`}>
                {evt?.type}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground leading-tight line-clamp-1">{evt?.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{evt?.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Prayer Requests */}
      <div className="bg-card rounded-md border border-border shadow-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-foreground text-base">Prayer Requests</h3>
            <p className="text-xs text-muted-foreground">3 new requests today</p>
          </div>
          <div className="flex items-center gap-1 bg-warning/10 text-warning border border-warning/30 px-2 py-1 rounded-full">
            <AlertCircle size={11} />
            <span className="text-xs font-semibold">1 urgent</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {prayerRequests?.map((pr) => (
            <div key={pr?.id} className={`p-3 rounded-xl border transition-colors ${pr?.urgent ? 'bg-warning/5 border-warning/20' : 'bg-muted/50 border-border'}`}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold text-foreground">{pr?.name}</p>
                <span className="text-xs text-muted-foreground">{pr?.time}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{pr?.request}</p>
              {pr?.urgent && (
                <span className="text-xs font-bold text-warning mt-1 block">⚡ Urgent</span>
              )}
            </div>
          ))}
        </div>
        <button className="mt-3 w-full flex items-center justify-center gap-2 text-xs font-semibold text-primary border border-primary/30 py-2.5 rounded-xl hover:bg-muted transition-colors">
          <HandHeart size={13} />
          View All Prayer Requests
        </button>
      </div>
    </div>
  );
}