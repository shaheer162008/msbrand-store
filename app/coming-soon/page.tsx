'use client';

import ComingSoonTopBar from '@/components/coming-soon/ComingSoonTopBar';
import ComingSoonHero from '@/components/coming-soon/ComingSoonHero';
import ComingSoonFooter from '@/components/coming-soon/ComingSoonFooter';

export default function ComingSoonPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ComingSoonTopBar />
      <ComingSoonHero />
      <ComingSoonFooter />
    </div>
  );
}
