'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Navbar />
      
      <main className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl text-center py-20">
          {/* Error Illustration */}
          <div className="mb-8 sm:mb-12">
            <div className="relative inline-block">
              {/* Background Circle */}
              <div 
                className="absolute inset-0 rounded-full opacity-10 blur-3xl"
                style={{ backgroundColor: '#FFD600' }}
              ></div>
              
              {/* Warning Icon */}
              <i 
                className="relative text-8xl sm:text-9xl fa-solid fa-triangle-exclamation"
                style={{ color: '#FFD600' }}
              ></i>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-3 sm:mb-4">
            Oops! Something Went Wrong
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 font-medium leading-relaxed">
            We encountered an unexpected error. Don't worry, our team has been notified and we're working on fixing it.
          </p>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-8 p-4 sm:p-6 bg-red-50 border-2 border-red-200 rounded-lg text-left">
              <p className="text-xs sm:text-sm font-mono text-red-700 break-words">
                <span className="font-black">Error:</span> {error.message || 'Unknown error'}
              </p>
              {error.digest && (
                <p className="text-xs sm:text-sm font-mono text-red-600 mt-2">
                  <span className="font-black">Digest:</span> {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Support Icon */}
          <div className="mb-12 sm:mb-16">
            <i 
              className="fa-solid fa-headset text-6xl sm:text-7xl transition-transform duration-500 hover:scale-110"
              style={{ color: '#FFD600' }}
            ></i>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8">
            {/* Retry Button */}
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base uppercase rounded-xl transition-all duration-300 hover:shadow-lg active:scale-95"
              style={{
                backgroundColor: '#FFD600',
                color: '#000000',
              }}
            >
              <i className="fa-solid fa-rotate-right mr-2"></i>
              Try Again
            </button>

            {/* Back Home Button */}
            <Link href="/">
              <button
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base uppercase rounded-xl border-2 transition-all duration-300 hover:shadow-lg active:scale-95"
                style={{
                  borderColor: '#FFD600',
                  color: '#000000',
                  backgroundColor: 'transparent',
                }}
              >
                <i className="fa-solid fa-house mr-2"></i>
                Back to Home
              </button>
            </Link>
          </div>

          {/* Contact Support */}
          <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-slate-200">
            <p className="text-xs sm:text-sm text-slate-500 font-black uppercase tracking-widest mb-4">
              Need Help?
            </p>
            <p className="text-base text-slate-600 font-medium mb-6">
              Contact our 24/7 support team
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+1234567890" className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition font-black text-sm uppercase">
                <i className="fa-solid fa-phone"></i>
                Call Us
              </a>
              <a href="mailto:support@msstore.com" className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition font-black text-sm uppercase">
                <i className="fa-solid fa-envelope"></i>
                Email Support
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
