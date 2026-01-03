'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setStep(2);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="p-8">
        <Link href="/login" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black transition">
          <i className="fa-solid fa-arrow-left"></i> Back to Login
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-6 pb-20">
        <div className="max-w-[480px] w-full">
          {/* Step 1: Email Input */}
          {step === 1 && (
            <div className="bg-white border border-slate-200 rounded-[3rem] p-10 md:p-14 shadow-sm" style={{ animation: 'slideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
              <div className="mb-10 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-slate-300">
                  <i className="fa-solid fa-key text-3xl"></i>
                </div>
                <h1 className="text-3xl font-black uppercase tracking-tight">Forgot Password?</h1>
                <p className="text-slate-400 font-medium mt-3">No worries, we'll send you recovery instructions.</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold text-sm outline-none transition-all"
                    style={{ borderColor: '#e2e8f0' }}
                    onFocus={(e) => (e.target.style.borderColor = '#FFD600')}
                    onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black text-white py-5 rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <i className="fa-solid fa-circle-notch animate-spin mr-2"></i>
                      Processing...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <i className="fa-solid fa-paper-plane text-[10px] ml-2"></i>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Confirmation */}
          {step === 2 && (
            <div className="bg-white border border-slate-200 rounded-[3rem] p-10 md:p-14 shadow-sm text-center" style={{ animation: 'slideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
              <div className="w-24 h-24 bg-yellow-400 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-lg" style={{ backgroundColor: '#FFD600', boxShadow: '0 20px 25px -5px rgba(255, 214, 0, 0.2)' }}>
                <i className="fa-solid fa-envelope-open-text text-3xl text-black"></i>
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tight">Check your inbox</h2>
              <p className="text-slate-400 font-medium mt-4 leading-relaxed">
                We've sent a recovery link to your email. Please follow the instructions to reset your password.
              </p>

              <div className="mt-10 pt-8 border-t border-slate-50">
                <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-4">Didn't receive it?</p>
                <button onClick={() => { setStep(1); setEmail(''); }} className="text-xs font-black uppercase tracking-widest text-black hover:text-yellow-500 transition">
                  Resend Link
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-8 text-center">
        <p className="text-[10px] font-black uppercase text-slate-300 tracking-[0.4em]">MS Secure Access System</p>
      </footer>

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
    </div>
  );
}
