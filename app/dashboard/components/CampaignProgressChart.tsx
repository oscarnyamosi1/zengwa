'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const data = [
  { name: 'School B', pct: 69, color: 'var(--primary)' },
  { name: 'Water', pct: 76, color: 'var(--secondary)' },
  { name: 'Sponsorship', pct: 65, color: 'var(--accent)' },
  { name: 'Health', pct: 36, color: 'var(--warning)' },
  { name: 'Church', pct: 37, color: 'var(--gold)' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl shadow-card px-4 py-3 text-sm">
      <p className="font-bold text-foreground mb-1">{label}</p>
      <p className="text-muted-foreground">
        Funded: <span className="font-bold text-primary">{payload[0].value}%</span>
      </p>
    </div>
  );
};

export default function CampaignProgressChart() {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-5 h-full">
      <div className="mb-5">
        <h3 className="font-bold text-foreground text-base">Campaign Funding</h3>
        <p className="text-xs text-muted-foreground mt-0.5">% of goal reached per active campaign</p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
            axisLine={false}
            tickLine={false}
            width={72}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--muted)', opacity: 0.5 }} />
          <Bar dataKey="pct" radius={[0, 6, 6, 0]} maxBarSize={22}>
            {data.map((entry) => (
              <Cell key={`cell-${entry.name}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
