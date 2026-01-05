'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import Search from './search';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-black text-white py-2 sm:py-2.5 text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-[0.08em] sm:tracking-[0.15em] md:tracking-[0.2em]">
        <div className="w-full px-3 sm:px-6 lg:px-8 flex justify-between items-center gap-2 sm:gap-3 md:gap-6 overflow-hidden">
          <div className="flex gap-1 sm:gap-2 md:gap-6 flex-wrap">
            <span className="whitespace-nowrap flex items-center gap-0.5 sm:gap-1.5">
              <i className="fa-solid fa-location-dot" style={{ color: '#FFD600' }}></i><span className="hidden sm:inline">Global Dispatch</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 whitespace-nowrap">
              <i className="fa-solid fa-headset" style={{ color: '#FFD600' }}></i>24/7 Support
            </span>
          </div>
          <div className="hidden lg:block whitespace-nowrap">
            Exclusive: Get <span style={{ color: '#FFD600' }}>Free Delivery</span> on first 3 orders!
          </div>
          <div className="flex gap-1 sm:gap-2 md:gap-6 ml-auto md:ml-0">
            <a href="#" className="hover:text-brand transition whitespace-nowrap flex items-center gap-0.5 sm:gap-1.5">
              <i className="fa-solid fa-truck-fast"></i><span className="hidden sm:inline">Track</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-[100] bg-white/95 backdrop-blur-md border-b-2 w-full" style={{ borderColor: '#FFD600' }}>
        <div className="w-full px-3 sm:px-6 lg:px-8">
          {/* Header Main Row */}
          <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4 h-14 sm:h-18 md:h-20 max-w-[1440px] mx-auto">
            {/* Logo */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <div className="w-9 sm:w-11 md:w-12 h-9 sm:h-11 md:h-12 bg-black rounded-lg sm:rounded-lg flex items-center justify-center flex-shrink-0">
                <img src="/logo.jpeg" alt="MS Brand Store" className="w-full h-full object-cover rounded-lg" />
              </div>
              <span className="text-xs sm:text-sm md:text-lg lg:text-2xl font-900 uppercase hidden md:inline truncate">
                MS Store
              </span>
            </div>

            {/* Desktop Search - Only visible on lg+ */}
            <div className="hidden lg:flex flex-grow max-w-xl mx-4 justify-center">
              <Search />
            </div>

            {/* Flex spacer for alignment */}
            <div className="flex-grow lg:flex-grow-0"></div>

            {/* Desktop Navigation - Only visible on xl+ */}
            <nav className="hidden xl:flex items-center gap-2 lg:gap-4 flex-shrink-0">
              <div className="flex items-center gap-2 lg:gap-4">
                <a
                  href="/seller-signup"
                  className="flex items-center gap-1 text-[8px] lg:text-[11px] font-black uppercase text-slate-600 hover:text-black transition"
                >
                  <i className="fa-solid fa-store text-sm"></i>
                  <span className="hidden lg:inline">Sell</span>
                </a>
                <a
                  href="/coming-soon"
                  className="flex items-center gap-1 text-[8px] lg:text-[11px] font-black uppercase text-slate-600 hover:text-black transition"
                >
                  <i className="fa-solid fa-car-side text-sm"></i>
                  <span className="hidden lg:inline">Drive</span>
                </a>
                <button className="relative flex items-center justify-center gap-1 text-[8px] lg:text-[11px] font-black uppercase text-slate-600 hover:text-black transition">
                  <i className="fa-solid fa-shopping-cart text-sm"></i>
                  {cartCount > 0 && (
                    <span className="absolute -top-2.5 -right-1 bg-brand text-black w-4 h-4 rounded-full flex items-center justify-center text-[6px] font-black">{cartCount}</span>
                  )}
                </button>
              </div>

              {/* Sign In Button */}
              <a href="/login">
                <button
                  className="font-black text-[9px] lg:text-xs uppercase px-2.5 lg:px-4 py-1.5 lg:py-2 border-2 rounded-lg transition hover:opacity-90"
                  style={{
                    borderColor: '#FFD600',
                    color: '#000000',
                    backgroundColor: 'transparent',
                  }}
                >
                  Sign In
                </button>
              </a>
            </nav>

            {/* Mobile Cart - Only visible on sm to lg */}
            <button className="flex lg:hidden relative items-center justify-center w-8 sm:w-9 h-8 sm:h-9 rounded-lg hover:bg-slate-100 transition flex-shrink-0">
              <i className="fa-solid fa-shopping-cart text-base sm:text-lg"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-1.5 bg-brand text-black w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-black">{cartCount}</span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-8 sm:w-9 h-8 sm:h-9 rounded-lg hover:bg-slate-100 transition flex-shrink-0"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg sm:text-xl`}></i>
            </button>
          </div>

          {/* Mobile Search Bar - Below logo */}
          <div className="block lg:hidden px-0 py-2 border-t border-slate-100">
            <Search />
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-slate-50">
            <nav className="max-w-[1440px] mx-auto px-2.5 sm:px-6 py-2.5 sm:py-3">
              <div className="flex flex-col gap-1.5 sm:gap-2">
                <a
                  href="/seller-signup"
                  className="flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-black uppercase text-slate-600 hover:text-black rounded-lg hover:bg-white transition"
                >
                  <i className="fa-solid fa-store text-base"></i>Sell
                </a>
                <a
                  href="/coming-soon"
                  className="flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-black uppercase text-slate-600 hover:text-black rounded-lg hover:bg-white transition"
                >
                  <i className="fa-solid fa-car-side text-base"></i>Drive
                </a>
                
                <div className="h-px bg-slate-200 my-1"></div>

                <a href="/login" className="w-full">
                  <button
                    className="w-full font-black text-xs uppercase px-3 py-2 sm:py-2.5 border-2 rounded-lg transition hover:opacity-90"
                    style={{
                      borderColor: '#FFD600',
                      color: '#000000',
                      backgroundColor: 'transparent',
                    }}
                  >
                    Sign In
                  </button>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}