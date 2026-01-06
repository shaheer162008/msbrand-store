'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || null;
  const { login, user, loading, isAuthenticated, verifyOTP } = useAuth();
  
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [otpError, setOtpError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      if (redirectUrl) {
        router.push(redirectUrl);
      } else if (user.userType === 'admin') {
        router.push('/admin-dashboard');
      } else {
        router.push('/');
      }
    }
  }, [loading, isAuthenticated, user, router, redirectUrl]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading2(true);

    try {
      await login(email, password);
      setSuccessMessage('OTP sent to your email. Please verify to complete login.');
      setStep('otp');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading2(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setOtpError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading2(true);
    setOtpError('');

    try {
      await verifyOTP(email, otp);
      setSuccessMessage('Email verified! Logging in...');
      setTimeout(() => {
        // Redirect happens via useEffect above
      }, 1500);
    } catch (err: any) {
      setOtpError(err.message || 'Failed to verify OTP');
    } finally {
      setLoading2(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-black text-center">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-slate-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Decorative gradient blobs */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-8 left-10 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Glass Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-black mb-2">
              {step === 'credentials' ? 'Welcome Back' : 'Verify OTP'}
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              {step === 'credentials' ? 'Sign in to your account' : `Enter the OTP sent to ${email}`}
            </p>
          </div>

          {error && step === 'credentials' && (
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

          {otpError && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <p className="text-red-700 font-bold flex items-center gap-2">
                <AlertCircle size={18} />
                {otpError}
              </p>
            </div>
          )}

          {/* Credentials Form */}
          {step === 'credentials' && (
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 ml-1">Email Address</label>
                <div className="relative transition-all border-2 border-slate-100 hover:border-yellow-400 focus-within:border-yellow-400 focus-within:shadow-lg focus-within:shadow-yellow-200/50 bg-white rounded-2xl px-5 py-4 flex items-center gap-3">
                  <i className="fa-regular fa-envelope text-slate-400"></i>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="bg-transparent w-full outline-none text-sm font-medium text-black placeholder-slate-400"
                    disabled={loading2}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-black text-slate-700">Password</label>
                  <a href="/forgot-password" className="text-xs font-black text-yellow-500 hover:text-yellow-600 transition">
                    Forgot?
                  </a>
                </div>
                <div className="relative transition-all border-2 border-slate-100 hover:border-yellow-400 focus-within:border-yellow-400 focus-within:shadow-lg focus-within:shadow-yellow-200/50 bg-white rounded-2xl px-5 py-4 flex items-center gap-3">
                  <i className="fa-solid fa-lock text-slate-400"></i>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-transparent w-full outline-none text-sm font-medium text-black placeholder-slate-400"
                    disabled={loading2}
                    required
                  />
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading2}
                className="w-full bg-black hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed text-yellow-400 font-black py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm uppercase tracking-wide mt-6"
              >
                {loading2 ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          )}

          {/* OTP Form */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              {/* OTP Input */}
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-slate-700 mb-2">
                  6-Digit OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                    setOtpError('');
                  }}
                  placeholder="000000"
                  maxLength={6}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-yellow-400 focus:outline-none text-center text-2xl font-mono text-black"
                  disabled={loading2 || successMessage.length > 0}
                  autoFocus
                />
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={loading2 || successMessage.length > 0}
                className={`w-full py-3 font-black rounded-lg transition-all ${
                  loading2 || successMessage.length > 0
                    ? 'bg-gray-400 text-black cursor-not-allowed'
                    : 'bg-yellow-400 hover:bg-yellow-500 text-black'
                }`}
              >
                {loading2 ? 'Verifying...' : 'Verify OTP'}
              </button>

              {/* Back Button */}
              <button
                type="button"
                onClick={() => {
                  setStep('credentials');
                  setOtp('');
                  setOtpError('');
                  setSuccessMessage('');
                }}
                className="w-full py-2 border-2 border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition"
              >
                Back to Login
              </button>
            </form>
          )}

          {/* Sign Up Link - Only show on credentials form */}
          {step === 'credentials' && (
            <>
              {/* Divider */}
              <div className="relative my-8 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100"></div>
                </div>
                <span className="relative bg-white px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Or continue with
                </span>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  disabled={loading2}
                  className="flex items-center justify-center gap-2 border-2 border-slate-100 hover:border-yellow-400 disabled:opacity-50 py-3 rounded-xl hover:bg-slate-50 transition font-bold text-xs"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  disabled={loading2}
                  className="flex items-center justify-center gap-2 border-2 border-slate-100 hover:border-yellow-400 disabled:opacity-50 py-3 rounded-xl hover:bg-slate-50 transition font-bold text-xs"
                >
                  <i className="fa-brands fa-apple text-base"></i>
                  Apple
                </button>
              </div>

              {/* Sign Up Link */}
              <p className="mt-10 text-center text-sm font-medium text-slate-600">
                Not a member?{' '}
                <a href="/signup" className="text-black font-black border-b-2 border-yellow-400 hover:text-yellow-600 transition">
                  Create account
                </a>
              </p>

              {/* Test Credentials Box */}
              <div className="mt-8 p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-400 rounded-2xl">
                <p className="text-[10px] font-black text-yellow-700 mb-3 uppercase tracking-widest">🧪 Test Credentials:</p>
                <div className="space-y-3 text-xs">
                  <div>
                    <p className="font-black text-black">👤 Client Account</p>
                    <p className="text-slate-700 text-[11px] mt-1 font-mono bg-white/50 px-2 py-1 rounded mt-2">client@client.com</p>
                    <p className="text-slate-700 text-[11px] font-mono bg-white/50 px-2 py-1 rounded mt-1">Client@123</p>
                  </div>
                  <hr className="border-yellow-300" />
                  <div>
                    <p className="font-black text-black">⚙️ Admin Account</p>
                    <p className="text-slate-700 text-[11px] mt-1 font-mono bg-white/50 px-2 py-1 rounded mt-2">admin@admin.com</p>
                    <p className="text-slate-700 text-[11px] font-mono bg-white/50 px-2 py-1 rounded mt-1">Admin@123</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
