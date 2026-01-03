'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4" style={{ background: 'radial-gradient(circle at top right, #fffdf2, #ffffff)' }}>
      <div className="max-w-[480px] w-full rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-8 lg:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]" style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 214, 0, 0.2)' }}>
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">Welcome Back</h2>
          <p className="text-slate-500 text-xs sm:text-sm font-medium">Please enter your details to sign in</p>
        </div>

        <form className="space-y-4 sm:space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 ml-1">Email Address</label>
            <div className="relative border-2 border-slate-100 bg-white rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 flex items-center gap-3 transition-all" style={{ borderColor: '#e2e8f0' }} onFocus={(e) => (e.currentTarget.style.borderColor = '#FFD600')} onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}>
              <i className="fa-regular fa-envelope text-slate-400 text-sm sm:text-base"></i>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent w-full outline-none text-xs sm:text-sm font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <Link href="/forgot-password" className="text-xs font-bold transition" style={{ color: '#FFD600' }}>
                Forgot?
              </Link>
            </div>
            <div className="relative border-2 border-slate-100 bg-white rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 flex items-center gap-3 transition-all" style={{ borderColor: '#e2e8f0' }} onFocus={(e) => (e.currentTarget.style.borderColor = '#FFD600')} onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}>
              <i className="fa-solid fa-lock text-slate-400 text-sm sm:text-base"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent w-full outline-none text-xs sm:text-sm font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 text-sm sm:text-base"
              >
                <i className={`fa-solid fa-eye${showPassword ? '-slash' : ''}`}></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm shadow-xl hover:shadow-lg transition-all duration-300"
            style={{ color: '#FFD600' }}
          >
            Sign In
          </button>
        </form>

        <div className="relative my-6 sm:my-8 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <span className="relative bg-white px-4 text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Or continue with</span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <button className="flex items-center justify-center gap-2 border-2 border-slate-100 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:bg-slate-50 transition font-bold text-[9px] sm:text-xs">
            <svg className="w-3 sm:w-4 h-3 sm:h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="hidden sm:inline">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 border-2 border-slate-100 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:bg-slate-50 transition font-bold text-[9px] sm:text-xs">
            <i className="fa-brands fa-apple text-sm sm:text-base"></i>
            <span className="hidden sm:inline">Apple</span>
          </button>
        </div>

        <p className="mt-8 sm:mt-10 text-center text-xs sm:text-sm font-medium text-slate-500">
          Not a member?{' '}
          <Link href="/signup" className="text-black font-bold border-b-2" style={{ borderColor: '#FFD600' }}>
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
