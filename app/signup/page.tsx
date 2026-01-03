'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-x-hidden">
      <div className="w-full lg:w-[550px] p-6 sm:p-12 lg:p-20 flex flex-col justify-center bg-white">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-2 sm:mb-3">Create Account</h1>
          <p className="text-slate-500 font-medium text-sm">Join MS Brand Store for premium benefits.</p>
        </div>

        <form className="space-y-3 sm:space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs font-bold text-slate-700 ml-1">First Name</label>
              <input
                type="text"
                placeholder="Jane"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-slate-50 border-2 border-transparent px-4 sm:px-5 py-3 sm:py-4 rounded-lg sm:rounded-2xl outline-none transition-all text-xs sm:text-sm font-medium"
                style={{ borderColor: 'transparent' }}
                onFocus={(e) => (e.target.style.borderColor = '#FFD600')}
                onBlur={(e) => (e.target.style.borderColor = 'transparent')}
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs font-bold text-slate-700 ml-1">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-slate-50 border-2 border-transparent px-4 sm:px-5 py-3 sm:py-4 rounded-lg sm:rounded-2xl outline-none transition-all text-xs sm:text-sm font-medium"
                style={{ borderColor: 'transparent' }}
                onFocus={(e) => (e.target.style.borderColor = '#FFD600')}
                onBlur={(e) => (e.target.style.borderColor = 'transparent')}
              />
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs font-bold text-slate-700 ml-1">Email Address</label>
            <input
              type="email"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border-2 border-transparent px-4 sm:px-5 py-3 sm:py-4 rounded-lg sm:rounded-2xl outline-none transition-all text-xs sm:text-sm font-medium"
              style={{ borderColor: 'transparent' }}
              onFocus={(e) => (e.target.style.borderColor = '#FFD600')}
              onBlur={(e) => (e.target.style.borderColor = 'transparent')}
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs font-bold text-slate-700 ml-1">Password</label>
            <input
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border-2 border-transparent px-4 sm:px-5 py-3 sm:py-4 rounded-lg sm:rounded-2xl outline-none transition-all text-xs sm:text-sm font-medium"
              style={{ borderColor: 'transparent' }}
              onFocus={(e) => (e.target.style.borderColor = '#FFD600')}
              onBlur={(e) => (e.target.style.borderColor = 'transparent')}
            />
          </div>

          <div className="flex items-start gap-2.5 py-3 sm:py-4">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 rounded cursor-pointer flex-shrink-0"
              style={{ accentColor: '#000' }}
            />
            <label htmlFor="terms" className="text-xs font-medium text-slate-500 leading-relaxed cursor-pointer">
              I agree to the{' '}
              <Link href="#" className="text-black font-bold underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="#" className="text-black font-bold underline">
                Privacy Policy
              </Link>
              .
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 sm:py-4 lg:py-5 rounded-lg sm:rounded-2xl font-bold text-xs sm:text-sm shadow-2xl hover:bg-zinc-800 transition-all active:scale-95"
            style={{ color: '#FFD600' }}
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm font-medium text-slate-500">
          Already have an account?{' '}
          <Link href="/login" className="text-black font-bold border-b-2 ml-1" style={{ borderColor: '#FFD600' }}>
            Log in
          </Link>
        </p>
      </div>

      <div className="hidden lg:flex flex-1 bg-zinc-100 m-6 rounded-[3rem] relative overflow-hidden">
        <img
          src="https://i.pinimg.com/1200x/28/85/bd/2885bdefd80677579a3d51c2d07b86bd.jpg"
          alt="Signup"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
