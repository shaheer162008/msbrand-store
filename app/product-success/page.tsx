'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProductSuccessPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Confetti pieces
  const confettiPieces = [
    { left: '10%', delay: '0s', bg: '#FFD600' },
    { left: '30%', delay: '1s', bg: '#000' },
    { left: '50%', delay: '0.5s', bg: '#FFD600' },
    { left: '70%', delay: '1.5s', bg: '#000' },
    { left: '90%', delay: '0.2s', bg: '#FFD600' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
      {/* Confetti */}
      {confettiPieces.map((piece, idx) => (
        <div
          key={idx}
          className="absolute w-2 h-2 top-[-20px] opacity-0"
          style={{
            left: piece.left,
            backgroundColor: piece.bg,
            animation: `drop 3s infinite`,
            animationDelay: piece.delay,
          }}
        ></div>
      ))}

      <main
        className="max-w-[550px] w-full text-center relative z-10"
        style={{ animation: isVisible ? 'slideUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none' }}
      >
        {/* Icon */}
        <div className="mb-10">
          <div
            className="w-28 h-28 bg-black rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-lg"
            style={{
              boxShadow: '0 0 50px rgba(255, 214, 0, 0.3)',
            }}
          >
            <i className="fa-solid fa-store text-white text-4xl"></i>
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tight">Your Product is Live!</h1>
          <p className="text-slate-400 font-medium mt-3 text-lg">
            Congratulations! Your first product is now pending verification and your payouts are connected.
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-white border border-slate-200 rounded-[3rem] p-8 md:p-10 shadow-sm text-left space-y-6">
          {/* Product Status */}
          <div className="flex items-center justify-between border-b border-slate-50 pb-4">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Product Status</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-[10px] font-black uppercase">Pending Review</span>
          </div>

          {/* Payout Method */}
          <div className="flex items-center justify-between border-b border-slate-50 pb-4">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Payout Method</span>
            <div className="text-right">
              <p className="text-sm font-black">EasyPaisa</p>
              <p className="text-[10px] text-slate-400 font-bold">Verified Account Title</p>
            </div>
          </div>

          {/* Commission Policy */}
          <div className="flex items-center justify-between pb-2">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Commission Policy</span>
            <span className="text-sm font-black">10% Platform Fee</span>
          </div>

          {/* Actions */}
          <div className="pt-4">
            <Link
              href="/seller-dashboard"
              className="block w-full bg-black py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:shadow-lg transition-all text-center"
              style={{ color: '#FFD600' }}
            >
              Enter Seller Dashboard
            </Link>
            <button
              onClick={() => window.print()}
              className="w-full mt-4 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-black transition"
            >
              Print Onboarding Summary
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-12 text-[10px] font-black uppercase text-slate-300 tracking-[0.5em]">MS Brand Store | Global Seller Network</p>
      </main>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes drop {
          0% {
            top: -20px;
            opacity: 1;
            transform: translateX(0) rotate(0deg);
          }
          100% {
            top: 100vh;
            opacity: 0;
            transform: translateX(100px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
