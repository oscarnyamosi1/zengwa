'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { week: 'W1 May', donations: 184000, target: 220000 },
  { week: 'W2 May', donations: 212000, target: 220000 },
  { week: 'W3 May', donations: 196000, target: 220000 },
  { week: 'W4 May', donations: 248000, target: 220000 },
  { week: 'W1 Jun', donations: 231000, target: 240000 },
  { week: 'W2 Jun', donations: 198000, target: 240000 },
  { week: 'W3 Jun', donations: 267000, target: 240000 },
  { week: 'W4 Jun', donations: 254000, target: 240000 },
  { week: 'W1 Jul', donations: 289000, target: 260000 },
  { week: 'W2 Jul', donations: 312000, target: 260000 },
  { week: 'W3 Jul', donations: 278000, target: 260000 },
  { week: 'W4 Jul', donations: 341000, target: 260000 },
];

function formatKES(val: number) {
  if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `${(val / 1000).toFixed(0)}K`;
  return String(val);
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl shadow-card-lg px-4 py-3 text-sm">
      <p className="font-bold text-foreground mb-1.5">{label}</p>
      {payload.map((entry: any) => (
        <div key={`tip-${entry.dataKey}`} className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: entry.color }} />
          <span className="text-muted-foreground capitalize">{entry.name}:</span>
          <span className="font-semibold text-foreground">KES {entry.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default function DonationTrendChart() {
  return (
    <div className="bg-card rounded-md border border-border shadow-card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-bold text-foreground text-base">Donation Trend</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Weekly receipts vs weekly target — last 12 weeks</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground font-medium">Donations</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-muted-foreground font-medium">Target</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
            axisLine={false}
            tickLine={false}
            interval={2}
          />
          <YAxis
            tickFormatter={formatKES}
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="target"
            name="Target"
            stroke="var(--accent)"
            strokeWidth={2}
            strokeDasharray="5 3"
            fill="url(#targetGrad)"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="donations"
            name="Donations"
            stroke="var(--primary)"
            strokeWidth={2.5}
            fill="url(#donationGrad)"
            dot={false}
            activeDot={{ r: 5, fill: 'var(--primary)', stroke: 'var(--card)', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
