'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SellerLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-white">
      <div className="max-w-[400px] w-full">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Seller Central</h1>
          <p className="text-slate-500 font-medium mt-2">Sign in to manage your inventory and orders.</p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 ml-1">Merchant Email</label>
            <input
              type="email"
              placeholder="owner@brandname.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 px-6 py-4 rounded-2xl outline-none focus:bg-white transition-all text-sm font-medium"
              style={{ borderColor: '#e2e8f0' }}
              onFocus={(e) => (e.target.style.borderColor = '#FFD600')}
              onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between px-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <a href="#" className="text-xs font-bold hover:underline" style={{ color: '#FFD600' }}>
                Forgot?
              </a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 px-6 py-4 rounded-2xl outline-none focus:bg-white transition-all text-sm font-medium"
              style={{ borderColor: '#e2e8f0' }}
              onFocus={(e) => (e.target.style.borderColor = '#FFD600')}
              onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black py-5 rounded-2xl font-bold text-sm shadow-xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
            style={{ color: '#FFD600' }}
          >
            Login to Dashboard <i className="fa-solid fa-chart-line"></i>
          </button>
        </form>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm font-medium text-slate-500">
            Want to sell on MS Brand?{' '}
            <Link href="/seller-signup" className="text-black font-bold border-b-2 ml-1" style={{ borderColor: '#FFD600' }}>
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
