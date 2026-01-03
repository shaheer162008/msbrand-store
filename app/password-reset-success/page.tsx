'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function PasswordResetSuccessPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 overflow-hidden">
      <main className="max-w-[480px] w-full text-center">
        {/* Checkmark Animation */}
        <div className="mb-10" style={{ animation: isVisible ? 'bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)' : 'none' }}>
          <div
            className="w-[100px] h-[100px] bg-yellow-400 rounded-[35px] flex items-center justify-center mx-auto shadow-lg"
            style={{
              backgroundColor: '#FFD600',
              boxShadow: '0 20px 40px -10px rgba(255, 214, 0, 0.4)',
            }}
          >
            <i className="fa-solid fa-check text-4xl text-black" style={{ animation: isVisible ? 'checkGrow 0.4s 0.5s both' : 'none' }}></i>
          </div>
        </div>

        {/* Content */}
        <div style={{ animation: isVisible ? 'fadeIn 0.8s ease forwards' : 'none', opacity: isVisible ? 1 : 0 }}>
          <h1 className="text-4xl font-black uppercase tracking-tight mb-4">Security Verified</h1>
          <p className="text-slate-400 font-medium text-lg leading-relaxed">
            Your account is now fully secured. You have been granted access to the MS Brand Store ecosystem.
          </p>
        </div>

        {/* Info Card */}
        <div
          className="mt-12 bg-white border border-slate-200 rounded-[2.5rem] p-8"
          style={{ animation: isVisible ? 'fadeIn 0.8s ease 0.2s forwards' : 'none', opacity: isVisible ? 1 : 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="text-left">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Logged in as</p>
              <p className="font-bold">Alex Johnson</p>
            </div>
            <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-green-500">
              <i className="fa-solid fa-circle-check"></i>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              href="/"
              className="block w-full bg-black py-4 rounded-2xl font-bold text-sm text-center shadow-xl hover:shadow-lg transition-all"
              style={{ color: '#FFD600' }}
            >
              Back to Home
            </Link>
            <button
              onClick={() => window.print()}
              className="w-full text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-black transition"
            >
              Print Confirmation
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black rounded-full"
              style={{ animation: isVisible ? 'loadingBar 5s linear forwards' : 'none' }}
            ></div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes bounceIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          60% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes checkGrow {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes loadingBar {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
