import React from 'react';
import {
  Heart,
  UserPlus,
  Megaphone,
  HandHeart,
  FileText,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const activities = [
  { id: 'act-001', icon: Heart, color: 'bg-accent/20 text-primary', title: 'New donation received', desc: 'Margaret Wanjiku donated KES 5,000 to School Block via M-Pesa', time: '2 min ago', type: 'donation' },
  { id: 'act-002', icon: UserPlus, color: 'bg-primary/10 text-primary', title: 'New donor registered', desc: 'Michael van der Berg (Netherlands) created an account and made their first donation', time: '18 min ago', type: 'donor' },
  { id: 'act-003', icon: HandHeart, color: 'bg-gold/20 text-warning', title: 'Sponsorship activated', desc: 'Esther Njeri began sponsoring child ID ZEC-2026-084 — Grace Akinyi, age 8', time: '1h ago', type: 'sponsorship' },
  { id: 'act-004', icon: Megaphone, color: 'bg-muted text-muted-foreground', title: 'Campaign milestone reached', desc: 'Clean Water Borehole campaign crossed 75% of KES 900,000 goal', time: '3h ago', type: 'campaign' },
  { id: 'act-005', icon: CheckCircle, color: 'bg-accent/20 text-primary', title: 'Donation confirmed', desc: '14 pending M-Pesa donations confirmed after manual reconciliation by Finance team', time: '4h ago', type: 'system' },
  { id: 'act-006', icon: AlertCircle, color: 'bg-danger/10 text-danger', title: 'Failed payment alert', desc: 'Grace Achieng\'s M-Pesa payment of KES 3,000 failed — insufficient funds. Follow-up needed.', time: '5h ago', type: 'alert' },
  { id: 'act-007', icon: FileText, color: 'bg-muted text-muted-foreground', title: 'Monthly report generated', desc: 'June 2026 financial impact report exported by Pastor Amani and sent to board members', time: '1d ago', type: 'report' },
  { id: 'act-008', icon: UserPlus, color: 'bg-primary/10 text-primary', title: '3 new volunteers registered', desc: 'Naomi Chebet, Samuel Rotich, and Faith Wangari applied for the July volunteer program', time: '1d ago', type: 'volunteer' },
];

export default function ActivityFeed() {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-bold text-foreground text-base">Activity Feed</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Latest ministry actions — last 24 hours</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-accent/10 text-primary border border-accent/30 px-3 py-1.5 rounded-full text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
            Live
          </div>
        </div>
      </div>
      <div className="divide-y divide-border">
        {activities?.map((activity) => {
          const Icon = activity?.icon;
          return (
            <div
              key={activity?.id}
              className="flex items-start gap-4 px-5 py-4 hover:bg-muted/40 transition-colors cursor-pointer"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${activity?.color}`}>
                <Icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground leading-tight">{activity?.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{activity?.desc}</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0 mt-0.5 whitespace-nowrap">{activity?.time}</span>
            </div>
          );
        })}
      </div>
      <div className="px-5 py-3.5 border-t border-border text-center">
        <button className="text-sm font-semibold text-primary hover:text-secondary transition-colors">
          View Full Audit Log →
        </button>
      </div>
    </div>
  );
}