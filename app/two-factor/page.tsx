'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function TwoFactorPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(120);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Preloader
  useEffect(() => {
    setTimeout(() => setShowPreloader(false), 600);
  }, []);

  // Timer
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((digit) => !digit)) return;

    setIsLoading(true);
    setTimeout(() => {
      alert('Account verified! Redirecting...');
      // Redirect to dashboard or home
    }, 1500);
  };

  const formatTimer = () => {
    const mins = Math.floor(timer / 60);
    const secs = timer % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Preloader */}
      {showPreloader && (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
          <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center font-black text-black shadow-lg" style={{ backgroundColor: '#FFD600' }}>
            MS
          </div>
          <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Verifying Identity</p>
        </div>
      )}

      <div className={`min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 transition-opacity ${!showPreloader ? 'opacity-100' : 'opacity-0'}`} style={{ animation: !showPreloader ? 'slideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none' }}>
        <main className="max-w-[450px] w-full">
          <div className="bg-white border border-slate-200 rounded-[3rem] p-10 md:p-14 shadow-sm text-center">
            {/* Header */}
            <div className="mb-10">
              <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-shield-check text-3xl text-slate-400"></i>
              </div>
              <h1 className="text-3xl font-black uppercase tracking-tight">Two-Factor Auth</h1>
              <p className="text-slate-400 font-medium mt-3 leading-relaxed">
                We've sent a 6-digit code to <br />
                <span className="text-black font-bold">ale***@example.com</span>
              </p>
            </div>

            {/* OTP Form */}
            <form className="space-y-10" onSubmit={handleSubmit}>
              {/* OTP Inputs */}
              <div className="flex justify-between gap-2" id="otp-container">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    inputMode="numeric"
                    autoComplete={index === 0 ? 'one-time-code' : 'off'}
                    className="w-12 h-16 text-center text-2xl font-black bg-slate-50 border-2 border-slate-100 rounded-xl outline-none transition-all"
                    style={{ borderColor: '#e2e8f0' }}
                    onFocus={(e) => (e.target.style.borderColor = '#FFD600')}
                    onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                  />
                ))}
              </div>

              {/* Submit & Timer */}
              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={isLoading || otp.some((d) => !d)}
                  className="w-full bg-black text-white py-5 rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <i className="fa-solid fa-circle-notch animate-spin mr-2"></i>
                      Verifying...
                    </>
                  ) : (
                    'Verify Account'
                  )}
                </button>

                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  Code expires in <span className="text-black">{formatTimer()}</span>
                </p>
              </div>
            </form>

            {/* Resend Link */}
            <div className="mt-10 pt-8 border-t border-slate-50">
              <button className="text-xs font-black uppercase tracking-widest text-slate-300 hover:text-black transition">
                Didn't Get the Code? Resend Code
              </button>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
