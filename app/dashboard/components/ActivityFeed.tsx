import React from 'react';
import DashboardLayout from '@/app/dashboard/components/DashboardLayout';
import KPIBentoGrid from '@/app/dashboard/components/KPIBentoGrid';
import ChartsRow from '@/app/dashboard/components/ChartsRow';
import RecentDonationsTable from '@/app/dashboard/components/RecentDonationsTable';
import DashboardRightPanel from '@/app/dashboard/components/DashboardRightPanel';
import ActivityFeed from '@/app/dashboard/components/ActivityFeed';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-12 py-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Ministry Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              ZengwaConnect — Overview for July 2026
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-accent/10 text-primary border border-accent/30 px-3 py-1.5 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
              Live Data
            </div>
            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:bg-secondary transition-colors active:scale-95">
              Export Report
            </button>
          </div>
        </div>

        {/* KPI Bento Grid */}
        <KPIBentoGrid />

        {/* Charts Row */}
        <ChartsRow />

        {/* Main Content + Right Panel */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
          <div className="xl:col-span-2">
            <RecentDonationsTable />
          </div>
          <div>
            <DashboardRightPanel />
          </div>
        </div>

        {/* Activity Feed */}
        <div className="mt-6">
          <ActivityFeed />
        </div>
      </div>
    </DashboardLayout>
  );
}
