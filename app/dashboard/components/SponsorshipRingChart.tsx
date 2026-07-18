'use client';

import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Awaiting', value: 100, fill: 'var(--border)' },
  { name: 'Sponsored', value: 93, fill: 'var(--primary)' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl shadow-card px-3 py-2 text-xs">
      <p className="font-bold text-foreground">{payload[0].name}</p>
      <p className="text-muted-foreground">{payload[0].value}%</p>
    </div>
  );
};

export default function SponsorshipRingChart() {
  return (
    <div className="relative h-44">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="90%"
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar dataKey="value" cornerRadius={6} background={{ fill: 'var(--muted)' }} />
          <Tooltip content={<CustomTooltip />} />
        </RadialBarChart>
      </ResponsiveContainer>
      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-2xl font-extrabold text-foreground stat-number">93%</span>
        <span className="text-xs text-muted-foreground font-medium">Sponsored</span>
      </div>
    </div>
  );
}
