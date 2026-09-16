import React from 'react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import DonateHero from '@/app/donate/components/DonateHero';
import DonateForm from '@/app/donate/components/DonateForm';
import DonateSidebar from '@/app/donate/components/DonateSidebar';
import RecentDonorsTicker from '@/app/donate/components/RecentDonorsTicker';

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main>
        <DonateHero />
        <section className="py-12 lg:py-16">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <DonateForm />
              </div>
              <div>
                <DonateSidebar />
              </div>
            </div>
          </div>
        </section>
        <RecentDonorsTicker />
      </main>
      <PublicFooter />
    </div>
  );
}
