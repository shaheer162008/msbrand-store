'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { sendOTP, verifyOTP } = useAuth();
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!email) {
        setError('Please enter your email');
        return;
      }

      await sendOTP(email);
      setSuccessMessage('OTP sent to your email!');
      setStep('otp');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!otp || otp.length !== 6) {
        setError('Please enter a valid 6-digit OTP');
        return;
      }

      await verifyOTP(email, otp);
      setSuccessMessage('OTP verified! Now set your new password.');
      setStep('reset');
    } catch (err: any) {
      setError(err.message || 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newPassword || !confirmPassword) {
      setError('Please fill in all password fields');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement actual password reset API call
      // For now, show success and redirect
      setSuccessMessage('Password reset successfully! Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-50 via-white to-slate-50">
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
          {step === 'email' && (
            <div className="bg-white border-2 border-yellow-400 rounded-3xl p-10 md:p-14 shadow-xl">
              <div className="mb-10 text-center">
                <div className="w-20 h-20 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-yellow-600">
                  <i className="fa-solid fa-key text-3xl"></i>
                </div>
                <h1 className="text-3xl font-black text-black uppercase tracking-tight">Forgot Password?</h1>
                <p className="text-slate-600 font-medium mt-3">No worries, we'll help you reset it.</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                  <p className="text-red-700 font-bold flex items-center gap-2">
                    <AlertCircle size={18} />
                    {error}
                  </p>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSendOTP}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-700 tracking-widest ml-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className="w-full bg-white border-2 border-slate-300 p-4 rounded-xl font-bold text-sm outline-none transition-all focus:border-yellow-400 text-black placeholder-slate-400"
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black hover:bg-slate-900 disabled:opacity-50 text-yellow-400 py-4 rounded-xl font-black uppercase text-sm tracking-wide transition-all"
                >
                  {isLoading ? (
                    <>
                      <i className="fa-solid fa-circle-notch animate-spin mr-2"></i>
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      Send OTP
                      <i className="fa-solid fa-paper-plane text-xs ml-2"></i>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Step 2: OTP Verification */}
          {step === 'otp' && (
            <div className="bg-white border-2 border-yellow-400 rounded-3xl p-10 md:p-14 shadow-xl">
              <div className="mb-10 text-center">
                <div className="w-20 h-20 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-yellow-600">
                  <i className="fa-solid fa-envelope-open-text text-3xl"></i>
                </div>
                <h1 className="text-3xl font-black text-black uppercase tracking-tight">Enter OTP</h1>
                <p className="text-slate-600 font-medium mt-3">We've sent a 6-digit code to {email}</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                  <p className="text-red-700 font-bold flex items-center gap-2">
                    <AlertCircle size={18} />
                    {error}
                  </p>
                </div>
              )}

              {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                  <p className="text-green-700 font-bold flex items-center gap-2">
                    <CheckCircle size={18} />
                    {successMessage}
                  </p>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleVerifyOTP}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-700 tracking-widest ml-1">6-Digit OTP</label>
                  <input
                    type="text"
                    required
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                      setError('');
                    }}
                    maxLength={6}
                    className="w-full bg-white border-2 border-slate-300 p-4 rounded-xl font-bold text-center text-2xl font-mono outline-none transition-all focus:border-yellow-400 text-black"
                    disabled={isLoading}
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black hover:bg-slate-900 disabled:opacity-50 text-yellow-400 py-4 rounded-xl font-black uppercase text-sm tracking-wide transition-all"
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep('email');
                    setOtp('');
                    setError('');
                    setSuccessMessage('');
                  }}
                  className="w-full border-2 border-slate-300 hover:border-yellow-400 text-slate-700 py-2 rounded-xl font-bold transition-all"
                >
                  Back to Email
                </button>
              </form>
            </div>
          )}

          {/* Step 3: Reset Password */}
          {step === 'reset' && (
            <div className="bg-white border-2 border-yellow-400 rounded-3xl p-10 md:p-14 shadow-xl">
              <div className="mb-10 text-center">
                <div className="w-20 h-20 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-yellow-600">
                  <i className="fa-solid fa-lock text-3xl"></i>
                </div>
                <h1 className="text-3xl font-black text-black uppercase tracking-tight">Set New Password</h1>
                <p className="text-slate-600 font-medium mt-3">Create a strong password for your account</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                  <p className="text-red-700 font-bold flex items-center gap-2">
                    <AlertCircle size={18} />
                    {error}
                  </p>
                </div>
              )}

              {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                  <p className="text-green-700 font-bold flex items-center gap-2">
                    <CheckCircle size={18} />
                    {successMessage}
                  </p>
                </div>
              )}

              <form className="space-y-4" onSubmit={handleResetPassword}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-700 tracking-widest ml-1">New Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setError('');
                    }}
                    className="w-full bg-white border-2 border-slate-300 p-4 rounded-xl font-bold text-sm outline-none transition-all focus:border-yellow-400 text-black placeholder-slate-400"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-700 tracking-widest ml-1">Confirm Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError('');
                    }}
                    className="w-full bg-white border-2 border-slate-300 p-4 rounded-xl font-bold text-sm outline-none transition-all focus:border-yellow-400 text-black placeholder-slate-400"
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black hover:bg-slate-900 disabled:opacity-50 text-yellow-400 py-4 rounded-xl font-black uppercase text-sm tracking-wide transition-all mt-6"
                >
                  {isLoading ? 'Resetting Password...' : 'Reset Password'}
                </button>
              </form>
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
