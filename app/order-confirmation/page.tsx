'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';
import { CheckCircle, Home, ShoppingCart, Clock, AlertCircle } from 'lucide-react';
import { ref, onValue } from 'firebase/database';
import { db } from '@/lib/firebase';

interface Order {
  id: string;
  userId: string;
  items: any[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'accepted' | 'rejected' | 'delivered';
  createdAt: number;
  userEmail?: string;
  userPhone?: string;
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<Order | null>(null);
  const [orderStatus, setOrderStatus] = useState<'pending' | 'accepted' | 'rejected' | 'delivered'>('pending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    // Load order from Firebase in real-time
    const orderRef = ref(db, `orders/${orderId}`);
    
    const unsubscribe = onValue(orderRef, (snapshot) => {
      if (snapshot.exists()) {
        const orderData = snapshot.val() as Order;
        setOrder(orderData);
        setOrderStatus(orderData.status);
      } else {
        // Fallback to localStorage if not in Firebase yet
        const lastOrder = localStorage.getItem('lastOrder');
        if (lastOrder) {
          setOrder(JSON.parse(lastOrder));
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [orderId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'accepted':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'delivered':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Awaiting admin confirmation...';
      case 'accepted':
        return 'Order confirmed! Will be shipped soon.';
      case 'rejected':
        return 'Order has been cancelled.';
      case 'delivered':
        return 'Order delivered successfully!';
      default:
        return 'Processing...';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={80} className="text-yellow-500" />;
      case 'accepted':
        return <CheckCircle size={80} className="text-green-500" />;
      case 'rejected':
        return <AlertCircle size={80} className="text-red-500" />;
      case 'delivered':
        return <CheckCircle size={80} className="text-blue-500" />;
      default:
        return <Clock size={80} className="text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-24 pb-20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center animate-pulse overflow-hidden mx-auto mb-4">
              <img src="/logo.jpeg" alt="MS Brand Store" className="w-full h-full object-cover rounded-xl" />
            </div>
            <p className="text-gray-600 font-bold">Loading order...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-4">
          {/* Success Card */}
          <div className="bg-white rounded-lg border-2 border-yellow-400 p-8 text-center mb-8">
            <div className="flex justify-center mb-6">
              {getStatusIcon(orderStatus)}
            </div>

            <h1 className="text-4xl font-black text-black mb-2">
              {orderStatus === 'rejected' ? 'Order Cancelled' : 'Order Placed!'}
            </h1>
            <p className="text-xl text-gray-600 mb-6">{getStatusMessage(orderStatus)}</p>

            {order && (
              <div className="text-left bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Order ID</p>
                    <p className="font-black text-black">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total Amount</p>
                    <p className="font-black text-yellow-400 text-lg">Rs {order.total}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Payment Method</p>
                    <p className="font-bold text-black">Cash on Delivery</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Status</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${getStatusColor(orderStatus)}`}>
                      {orderStatus.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {order && (
              <div className="mb-8">
                <h3 className="font-black text-black mb-4">Order Items ({order.items.length})</h3>
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-black">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-yellow-400">Rs {item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Info Box - Different message based on status */}
            {orderStatus === 'pending' && (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8 text-left rounded">
                <p className="text-sm text-gray-700">
                  <span className="font-black text-yellow-600">⏳ Pending Confirmation</span>
                  <br />
                  Our admin team will review your order shortly. You'll receive an SMS confirmation once approved.
                </p>
              </div>
            )}

            {orderStatus === 'accepted' && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8 text-left rounded">
                <p className="text-sm text-gray-700">
                  <span className="font-black text-green-600">✅ Order Confirmed</span>
                  <br />
                  Your order has been accepted! Tracking details will be sent to your phone shortly.
                </p>
              </div>
            )}

            {orderStatus === 'rejected' && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 text-left rounded">
                <p className="text-sm text-gray-700">
                  <span className="font-black text-red-600">❌ Order Cancelled</span>
                  <br />
                  Your order has been cancelled. Please contact support for more details.
                </p>
              </div>
            )}

            {orderStatus === 'delivered' && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 text-left rounded">
                <p className="text-sm text-gray-700">
                  <span className="font-black text-blue-600">📦 Delivered</span>
                  <br />
                  Your order has been delivered! Thank you for shopping with us.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link href="/" className="flex-1">
                <button className="w-full bg-black hover:bg-gray-800 text-white font-black py-3 rounded-lg flex items-center justify-center gap-2 transition-all">
                  <Home size={20} />
                  Back to Home
                </button>
              </Link>
              <Link href="/food-hub" className="flex-1">
                <button className="w-full bg-brand hover:bg-yellow-500 text-black font-black py-3 rounded-lg flex items-center justify-center gap-2 transition-all">
                  <ShoppingCart size={20} />
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border-2 border-yellow-400 p-4 text-center">
              <p className="text-3xl mb-2">📞</p>
              <p className="font-bold text-black">Support</p>
              <p className="text-sm text-gray-600">24/7 Customer Support</p>
            </div>
            <div className="bg-white rounded-lg border-2 border-yellow-400 p-4 text-center">
              <p className="text-3xl mb-2">🚚</p>
              <p className="font-bold text-black">Fast Delivery</p>
              <p className="text-sm text-gray-600">Quick & Reliable Service</p>
            </div>
            <div className="bg-white rounded-lg border-2 border-yellow-400 p-4 text-center">
              <p className="text-3xl mb-2">✅</p>
              <p className="font-bold text-black">Quality Assured</p>
              <p className="text-sm text-gray-600">100% Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading order...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
