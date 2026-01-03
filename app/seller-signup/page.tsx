'use client';

import SellerHeader from '@/components/seller-signup/SellerHeader';
import SellerHero from '@/components/seller-signup/SellerHero';
import SellerForm from '@/components/seller-signup/SellerForm';

export default function SellerSignupPage() {
  return (
    <>
      <SellerHeader />
      
      <main className="max-w-[1200px] mx-auto py-16 px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <SellerHero />
          <SellerForm />
        </div>
      </main>
    </>
  );
}