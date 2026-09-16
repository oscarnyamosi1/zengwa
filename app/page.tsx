import React from 'react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import HeroSection from '@/app/components/HeroSection';
import TrustBadgeStrip from '@/app/components/TrustBadgeStrip';
import FeaturedCampaigns from '@/app/components/FeaturedCampaigns';
import ImpactStats from '@/app/components/ImpactStats';
import OurStorySection from '@/app/components/OurStorySection';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import LatestNews from '@/app/components/LatestNews';
import NewsletterCTA from '@/app/components/NewsletterCTA';



export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main>
        <HeroSection />
        <TrustBadgeStrip />
        <FeaturedCampaigns />
        {/* <ImpactStats /> */}
        <OurStorySection />
<<<<<<< HEAD
        {/* <TestimonialsSection /> */}
=======
        <TestimonialsSection />
>>>>>>> 66402661b64dc5c064143c6d6b8bbd8b88dabd3b
        <LatestNews />
        <NewsletterCTA />
      </main>
      <PublicFooter />
    </div>
    // done here
  );
}
