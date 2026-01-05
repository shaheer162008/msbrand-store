'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { ref, onValue, update } from 'firebase/database';
import { db } from '@/lib/firebase';
import { Bell, X, Package } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  addressId: string;
  paymentMethod: string;
  status: 'pending' | 'accepted' | 'rejected' | 'delivered';
  createdAt: number;
  userEmail?: string;
  userPhone?: string;
  deliveryAddress?: any;
  adminNotes?: string;
}

export default function AdminDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [processing, setProcessing] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [stats, setStats] = useState({
    pending: 0,
    accepted: 0,
    rejected: 0,
    delivered: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.userType !== 'admin')) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, user, router]);

  useEffect(() => {
    if (!user?.uid) return;

    const ordersRef = ref(db, 'orders');
    
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      if (snapshot.exists()) {
        const ordersData = snapshot.val();
        const ordersList: Order[] = (Object.values(ordersData) as any[]).sort(
          (a: any, b: any) => b.createdAt - a.createdAt
        );

        setOrders(ordersList);

        const newStats = {
          pending: 0,
          accepted: 0,
          rejected: 0,
          delivered: 0,
          totalRevenue: 0,
        };

        ordersList.forEach((order: Order) => {
          const status = order.status as keyof typeof newStats;
          if (status in newStats && status !== 'totalRevenue') {
            newStats[status]++;
          }
          if (order.status !== 'rejected') {
            newStats.totalRevenue += order.total;
          }
        });

        setStats(newStats);
        const unread = ordersList.filter((o: Order) => o.status === 'pending').length;
        setUnreadCount(unread);

        if (unread > 0) {
          playNotificationSound();
        }
      }
    });

    return () => unsubscribe();
  }, [user?.uid]);

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const playNotificationSound = () => {
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBg==');
      audio.play().catch(() => {});
    } catch (e) {
      console.error('Could not play sound:', e);
    }
  };

  const handleAcceptOrder = async () => {
    if (!selectedOrder) return;
    setProcessing(true);

    try {
      const orderRef = ref(db, `orders/${selectedOrder.id}`);
      await update(orderRef, {
        status: 'accepted',
        adminNotes,
        acceptedAt: Date.now(),
      });

      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Order Accepted! ✅', {
          body: `Order #${selectedOrder.id} has been accepted.`,
          icon: '/logo.jpeg',
        });
      }

      setShowModal(false);
      setAdminNotes('');
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error accepting order:', error);
      alert('Failed to accept order');
    } finally {
      setProcessing(false);
    }
  };

  const handleRejectOrder = async () => {
    if (!selectedOrder) return;
    setProcessing(true);

    try {
      const orderRef = ref(db, `orders/${selectedOrder.id}`);
      await update(orderRef, {
        status: 'rejected',
        adminNotes,
        rejectedAt: Date.now(),
      });

      setShowModal(false);
      setAdminNotes('');
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error rejecting order:', error);
      alert('Failed to reject order');
    } finally {
      setProcessing(false);
    }
  };

  const handleDeliverOrder = async (order: Order) => {
    try {
      const orderRef = ref(db, `orders/${order.id}`);
      await update(orderRef, {
        status: 'delivered',
        deliveredAt: Date.now(),
      });
    } catch (error) {
      console.error('Error marking as delivered:', error);
      alert('Failed to update order status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center animate-pulse overflow-hidden">
          <img src="/logo.jpeg" alt="MS Brand Store" className="w-full h-full object-cover rounded-xl" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.userType !== 'admin') {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-600 mt-2">Manage orders and monitor business</p>
              </div>
              <div className="relative">
                <Bell size={32} className="text-yellow-400 cursor-pointer" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white rounded-lg border-2 border-yellow-400 p-6">
                <p className="text-gray-600 text-sm font-bold mb-2">PENDING</p>
                <p className="text-3xl font-black text-black">{stats.pending}</p>
                <p className="text-xs text-gray-500 mt-2">Awaiting approval</p>
              </div>

              <div className="bg-white rounded-lg border-2 border-green-500 p-6">
                <p className="text-gray-600 text-sm font-bold mb-2">ACCEPTED</p>
                <p className="text-3xl font-black text-green-600">{stats.accepted}</p>
                <p className="text-xs text-gray-500 mt-2">Processing</p>
              </div>

              <div className="bg-white rounded-lg border-2 border-blue-500 p-6">
                <p className="text-gray-600 text-sm font-bold mb-2">DELIVERED</p>
                <p className="text-3xl font-black text-blue-600">{stats.delivered}</p>
                <p className="text-xs text-gray-500 mt-2">Completed</p>
              </div>

              <div className="bg-white rounded-lg border-2 border-red-500 p-6">
                <p className="text-gray-600 text-sm font-bold mb-2">REJECTED</p>
                <p className="text-3xl font-black text-red-600">{stats.rejected}</p>
                <p className="text-xs text-gray-500 mt-2">Cancelled</p>
              </div>

              <div className="bg-white rounded-lg border-2 border-purple-500 p-6">
                <p className="text-gray-600 text-sm font-bold mb-2">REVENUE</p>
                <p className="text-3xl font-black text-purple-600">Rs {stats.totalRevenue}</p>
                <p className="text-xs text-gray-500 mt-2">Total earned</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border-2 border-yellow-400 overflow-hidden">
            <div className="p-6 border-b-2 border-gray-200">
              <h2 className="text-2xl font-black text-black">Orders</h2>
            </div>

            {orders.length === 0 ? (
              <div className="p-12 text-center">
                <Package size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No orders yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 border-b-2 border-gray-200">
                      <th className="px-6 py-3 text-left text-xs font-black text-gray-700">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-black text-gray-700">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-black text-gray-700">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-black text-gray-700">Items</th>
                      <th className="px-6 py-3 text-left text-xs font-black text-gray-700">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-black text-gray-700">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-black text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 font-bold text-black">{order.id}</td>
                        <td className="px-6 py-4 text-gray-600">
                          <p className="text-sm font-bold">{order.userEmail}</p>
                          <p className="text-xs">{order.userPhone}</p>
                        </td>
                        <td className="px-6 py-4 font-black text-yellow-600">Rs {order.total}</td>
                        <td className="px-6 py-4 text-gray-600">
                          <p className="text-sm">{order.items.length} items</p>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              order.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : order.status === 'accepted'
                                ? 'bg-green-100 text-green-700'
                                : order.status === 'delivered'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {order.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          {order.status === 'pending' && (
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowModal(true);
                              }}
                              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg text-sm"
                            >
                              Review
                            </button>
                          )}
                          {order.status === 'accepted' && (
                            <button
                              onClick={() => handleDeliverOrder(order)}
                              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-sm"
                            >
                              Deliver
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full my-8 shadow-xl">
            <div className="p-6 border-b-2 border-gray-200 flex justify-between items-center">
              <h3 className="text-2xl font-black text-black">Order #{selectedOrder.id}</h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setAdminNotes('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-black text-gray-700 mb-2">CUSTOMER EMAIL</p>
                  <p className="font-bold text-black">{selectedOrder.userEmail}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-700 mb-2">CUSTOMER PHONE</p>
                  <p className="font-bold text-black">{selectedOrder.userPhone}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-black text-gray-700 mb-3">ORDER ITEMS</p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-bold text-black">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-yellow-600">Rs {item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t-2 border-gray-200 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-bold text-black">Rs {selectedOrder.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-bold text-black">Rs {selectedOrder.shipping}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-bold text-black">Rs {selectedOrder.tax}</span>
                  </div>
                  <div className="flex justify-between text-lg border-t pt-2">
                    <span className="font-black text-black">Total</span>
                    <span className="font-black text-yellow-600">Rs {selectedOrder.total}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-black text-gray-700 mb-2">ADMIN NOTES</p>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes for internal use..."
                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-yellow-400 outline-none resize-none h-24"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleRejectOrder}
                  disabled={processing}
                  className="flex-1 border-2 border-red-500 text-red-600 font-bold py-3 rounded-lg hover:bg-red-50 disabled:opacity-50"
                >
                  Reject Order
                </button>
                <button
                  onClick={handleAcceptOrder}
                  disabled={processing}
                  className="flex-1 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-bold py-3 rounded-lg"
                >
                  {processing ? 'Processing...' : 'Accept Order'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
