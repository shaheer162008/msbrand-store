'use client';

import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl text-center py-20">
          {/* 404 Illustration */}
          <div className="mb-8 sm:mb-12">
            <div className="relative inline-block">
              {/* Background Circle */}
              <div 
                className="absolute inset-0 rounded-full opacity-10 blur-3xl"
                style={{ backgroundColor: '#FFD600' }}
              ></div>
              
              {/* 404 Text */}
              <h1 className="relative text-8xl sm:text-9xl md:text-[120px] font-black uppercase tracking-tighter">
                <span style={{ color: '#FFD600' }}>4</span>
                <span className="text-black">0</span>
                <span style={{ color: '#FFD600' }}>4</span>
              </h1>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-3 sm:mb-4">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-600 mb-8 sm:mb-12 font-medium leading-relaxed">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          {/* Icon */}
          <div className="mb-12 sm:mb-16">
            <i 
              className="fa-solid fa-magnifying-glass text-6xl sm:text-7xl transition-transform duration-500 hover:scale-110"
              style={{ color: '#FFD600' }}
            ></i>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8">
            {/* Back Home Button */}
            <Link href="/">
              <button
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base uppercase rounded-xl transition-all duration-300 hover:shadow-lg active:scale-95"
                style={{
                  backgroundColor: '#FFD600',
                  color: '#000000',
                }}
              >
                <i className="fa-solid fa-house mr-2"></i>
                Back to Home
              </button>
            </Link>

            {/* Shop Button */}
            <Link href="/shop">
              <button
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base uppercase rounded-xl border-2 transition-all duration-300 hover:shadow-lg active:scale-95"
                style={{
                  borderColor: '#FFD600',
                  color: '#000000',
                  backgroundColor: 'transparent',
                }}
              >
                <i className="fa-solid fa-bag-shopping mr-2"></i>
                Go to Shop
              </button>
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-slate-200">
            <p className="text-xs sm:text-sm text-slate-500 font-black uppercase tracking-widest mb-6">
              Explore MS Store
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Link href="/food-hub">
                <button className="w-full py-3 px-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition font-black text-xs uppercase text-slate-700">
                  <i className="fa-solid fa-utensils mr-2"></i>Food Hub
                </button>
              </Link>
              <Link href="/grocery-hub">
                <button className="w-full py-3 px-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition font-black text-xs uppercase text-slate-700">
                  <i className="fa-solid fa-basket-shopping mr-2"></i>Grocery
                </button>
              </Link>
              <Link href="/pharmacy-hub">
                <button className="w-full py-3 px-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition font-black text-xs uppercase text-slate-700">
                  <i className="fa-solid fa-pills mr-2"></i>Pharmacy
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
