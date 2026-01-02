'use client';

import Search from './search';

export default function Navbar() {
  return (
    <>
      <div className="bg-black text-white py-2.5 text-[10px] font-black uppercase tracking-[0.2em]">
        <div className="max-w-[1440px] mx-auto px-8 flex justify-between items-center">
          <div className="flex gap-6">
            <span>
              <i className="fa-solid fa-location-dot mr-2" style={{ color: '#FFD600' }}></i>Global Dispatch
            </span>
            <span>
              <i className="fa-solid fa-headset mr-2" style={{ color: '#FFD600' }}></i>24/7 Support
            </span>
          </div>
          <div className="hidden md:block">
            Exclusive: Get <span style={{ color: '#FFD600' }}>Free Delivery</span> on your first 3 orders!
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand transition">
              <i className="fa-solid fa-truck-fast mr-2"></i>Track Order
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-[100] bg-white/95 backdrop-blur-md border-b-2" style={{ borderColor: '#FFD600' }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-20 sm:h-24 flex items-center justify-between gap-4 sm:gap-12">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-black flex items-center justify-center text-brand font-black text-lg sm:text-xl italic rounded-xl">
              <img src="/logo.jpeg" alt="logo" />
            </div>
            <span className="text-lg sm:text-2xl font-[900] kerning-tight tracking-tighter uppercase hidden sm:inline">
              MS Brand Store
            </span>
          </div>
          <Search />
          <div className="flex items-center gap-3 sm:gap-8 shrink-0">
            <div className="hidden xl:flex gap-6 text-[11px] font-black uppercase tracking-widest text-slate-400">
              <a href="/seller-signup" className="hover:text-black transition">
                <i className="fa-solid fa-store mr-2"></i>Sell
              </a>
              <a href="/coming-soon" className="hover:text-black transition">
                <i className="fa-solid fa-car-side mr-2"></i>Drive
              </a>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <a href="/login">
                <button className="hidden sm:block font-black text-xs uppercase px-4 py-2 hover:bg-slate-50 rounded-lg transition">
                  Sign In
                </button>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}