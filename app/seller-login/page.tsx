'use client';

import SellerLoginSidebar from '@/components/seller-login/SellerLoginSidebar';
import SellerLoginForm from '@/components/seller-login/SellerLoginForm';

export default function SellerLoginPage() {
  return (
    <div className="flex min-h-screen">
      <SellerLoginSidebar />
      <SellerLoginForm />
    </div>
  );
}
