'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { signup, verifyOTP } = useAuth();

  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    userType: 'client' as 'client' | 'admin',
  });

  // OTP state
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.name || !formData.phone) {
      setError('All fields are required');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Invalid email format');
      return false;
    }

    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      await signup(
        formData.email,
        formData.password,
        formData.name,
        formData.userType,
        formData.phone
      );

      setSuccessMessage('OTP sent to your email. Please verify to complete signup.');
      setStep('otp');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setOtpError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setOtpError('');

    try {
      await verifyOTP(formData.email, otp);
      setSuccessMessage('Email verified! Account created successfully. Redirecting to login...');

      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      setOtpError(err.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'otp') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg border-2 border-yellow-400 overflow-hidden">
            {/* Header */}
            <div className="bg-black px-6 py-8">
              <h1 className="text-3xl font-black text-yellow-400 mb-2">MS Brand Store</h1>
              <p className="text-white text-sm font-bold">Verify Your Email</p>
            </div>

            {/* Content */}
            <div className="px-6 py-8">
              {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg flex gap-3">
                  <CheckCircle className="text-green-600 shrink-0" size={20} />
                  <p className="text-green-800 text-sm font-bold">{successMessage}</p>
                </div>
              )}

              <p className="text-slate-600 text-center mb-6">
                We&apos;ve sent a 6-digit OTP to <strong className="text-black">{formData.email}</strong>
              </p>

              <form onSubmit={handleVerifyOTP} className="space-y-6">
                {/* OTP Input */}
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-slate-700 mb-2">
                    OTP Code
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
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-yellow-400 focus:outline-none text-center text-2xl font-mono"
                    disabled={loading || successMessage.length > 0}
                  />
                  {otpError && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle size={16} />
                      {otpError}
                    </p>
                  )}
                </div>

                {/* Verify Button */}
                <button
                  type="submit"
                  disabled={loading || successMessage.length > 0}
                  className={`w-full py-3 font-black rounded-lg transition-all ${
                    loading || successMessage.length > 0
                      ? 'bg-gray-400 text-black cursor-not-allowed'
                      : 'bg-yellow-400 hover:bg-yellow-500 text-black'
                  }`}
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>

                {/* Resend OTP */}
                <p className="text-center text-slate-600 text-sm">
                  Didn&apos;t receive OTP?{' '}
                  <button
                    type="button"
                    onClick={() => setStep('form')}
                    className="text-yellow-500 hover:text-orange-500 font-semibold"
                  >
                    Go Back
                  </button>
                </p>
              </form>
            </div>
          </div>

          {/* Footer Links */}
          <div className="text-center mt-6">
            <p className="text-slate-600 text-sm">
              Already have an account?{' '}
              <a href="/login" className="text-yellow-500 hover:text-yellow-600 font-bold">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg border-2 border-yellow-400 overflow-hidden">
          {/* Header */}
          <div className="bg-black px-6 py-8">
            <h1 className="text-3xl font-black text-yellow-400 mb-2">MS Brand Store</h1>
            <p className="text-white text-sm font-bold">Create Your Account</p>
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg flex gap-3">
                <AlertCircle className="text-red-600 shrink-0" size={20} />
                <p className="text-red-800 text-sm font-bold">{error}</p>
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-yellow-400 focus:outline-none"
                  disabled={loading}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-yellow-400 focus:outline-none"
                  disabled={loading}
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="+92-300-1234567"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-yellow-400 focus:outline-none"
                  disabled={loading}
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-yellow-400 focus:outline-none"
                  disabled={loading}
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleFormChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-yellow-400 focus:outline-none"
                  disabled={loading}
                />
              </div>

              {/* User Type */}
              <div>
                <label htmlFor="userType" className="block text-sm font-medium text-slate-700 mb-2">
                  Account Type
                </label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-yellow-400 focus:outline-none bg-white"
                  disabled={loading}
                >
                  <option value="client">Customer</option>
                  <option value="admin">Seller</option>
                </select>
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 font-black rounded-lg transition-all mt-6 ${
                  loading
                    ? 'bg-gray-400 text-black cursor-not-allowed'
                    : 'bg-yellow-400 hover:bg-yellow-500 text-black'
                }`}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-slate-600 text-sm mt-6">
              Already have an account?{' '}
              <a href="/login" className="text-yellow-500 hover:text-yellow-600 font-bold">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
