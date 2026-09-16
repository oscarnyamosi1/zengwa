'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const DonationTrendChart = dynamic(
  () => import('./DonationTrendChart'),
  { ssr: false, loading: () => <div className="animate-pulse bg-muted rounded-2xl h-72" /> }
);

const CampaignProgressChart = dynamic(
  () => import('./CampaignProgressChart'),
  { ssr: false, loading: () => <div className="animate-pulse bg-muted rounded-2xl h-72" /> }
);

export default function ChartsRow() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
      <div className="xl:col-span-3">
        <DonationTrendChart />
      </div>
      <div className="xl:col-span-2">
        <CampaignProgressChart />
      </div>
    </div>
  );
}
