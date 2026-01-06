'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function SellerPendingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected' | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!user || !user.sellerProfile) {
        router.push('/seller-login');
        return;
      }

      setStatus(user.sellerProfile.status || 'pending');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6 py-20">
      <div className="max-w-[600px] w-full">
        {/* Pending Status */}
        {status === 'pending' && (
          <div className="bg-white rounded-[3rem] p-10 text-center border border-slate-50 shadow-sm">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-yellow-600 animate-spin" />
            </div>

            <h1 className="text-3xl font-black uppercase tracking-tight mb-3">Verification Pending</h1>
            <p className="text-slate-600 mb-8 text-lg">
              Thank you for submitting your CNIC for verification. Our admin team is reviewing your information.
            </p>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mb-8">
              <p className="text-sm text-yellow-800 mb-3">
                <strong>What happens next?</strong>
              </p>
              <ul className="text-sm text-yellow-700 space-y-2 text-left">
                <li>✓ Your CNIC images are securely stored</li>
                <li>✓ Admin will verify your identity within 24 hours</li>
                <li>✓ You'll receive an email with approval decision</li>
                <li>✓ Once approved, you can start selling immediately</li>
              </ul>
            </div>

            <p className="text-slate-500 text-sm mb-6">
              Verification usually takes 24 hours. Check your email for updates.
            </p>

            <Link
              href="/"
              className="inline-block bg-black px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:bg-zinc-800"
              style={{ color: '#FFD600' }}
            >
              Return to Home
            </Link>
          </div>
        )}

        {/* Approved Status */}
        {status === 'approved' && (
          <div className="bg-white rounded-[3rem] p-10 text-center border border-slate-50 shadow-sm">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            <h1 className="text-3xl font-black uppercase tracking-tight mb-3">Approved!</h1>
            <p className="text-slate-600 mb-8 text-lg">
              Congratulations! Your seller account has been approved.
            </p>

            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-8">
              <p className="text-sm text-green-800 font-bold mb-3">You can now:</p>
              <ul className="text-sm text-green-700 space-y-2 text-left">
                <li>✓ Add products to your store</li>
                <li>✓ Manage orders and inventory</li>
                <li>✓ View analytics and sales reports</li>
                <li>✓ Process payments</li>
              </ul>
            </div>

            <Link
              href="/seller-dashboard"
              className="inline-block bg-black px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:bg-zinc-800"
              style={{ color: '#FFD600' }}
            >
              Go to Dashboard
            </Link>
          </div>
        )}

        {/* Rejected Status */}
        {status === 'rejected' && (
          <div className="bg-white rounded-[3rem] p-10 text-center border border-slate-50 shadow-sm">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>

            <h1 className="text-3xl font-black uppercase tracking-tight mb-3">Application Rejected</h1>
            <p className="text-slate-600 mb-8 text-lg">
              Unfortunately, your application could not be approved at this time.
            </p>

            {user?.sellerProfile?.rejectionReason && (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8 text-left">
                <p className="text-sm font-bold text-red-800 mb-2">Reason:</p>
                <p className="text-sm text-red-700">
                  {user.sellerProfile.rejectionReason}
                </p>
              </div>
            )}

            <p className="text-slate-600 text-sm mb-6">
              If you believe this is a mistake, please contact our support team.
            </p>

            <div className="flex gap-4 justify-center">
              <Link
                href="/"
                className="inline-block bg-slate-200 px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:bg-slate-300 text-black"
              >
                Go Home
              </Link>
              <a
                href="mailto:support@msbrand.com"
                className="inline-block bg-black px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:bg-zinc-800"
                style={{ color: '#FFD600' }}
              >
                Contact Support
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
