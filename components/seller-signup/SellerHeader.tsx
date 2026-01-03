'use client';

import Link from 'next/link';

export default function SellerHeader() {
  return (
    <header className="py-6 px-6 sm:px-12 border-b border-slate-100 flex justify-between items-center bg-white">
      <Link href="/">
        <div className="text-2xl font-bold tracking-tighter uppercase italic cursor-pointer">
          MS <span style={{ color: '#FFD600' }}>BRAND STORE.</span>
        </div>
      </Link>
      <a href="/seller-login" className="text-sm font-bold text-slate-500 hover:text-black transition">
        Already a seller? Log in
      </a>
    </header>
  );
}
