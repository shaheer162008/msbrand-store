'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Menu, LogOut, Edit2, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { subscribeToSellerMenu, MenuItem, deleteMenuItem } from '@/lib/menu-service';

export default function SellerDashboardPage() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'menu' | 'profile' | 'orders'>('menu');

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/seller-login');
    }
  }, [isAuthenticated, loading, router]);

  // Subscribe to menu items
  useEffect(() => {
    if (!user || user.userType !== 'seller') return;

    const unsubscribe = subscribeToSellerMenu(user.uid, (items) => {
      setMenuItems(items);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!user || user.userType !== 'seller') return;

    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      await deleteMenuItem(user.uid, itemId);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated || user?.userType !== 'seller') {
    return null;
  }

  const sellerProfile = user?.sellerProfile;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? 'w-64' : 'w-20'
          } bg-gray-900 text-white transition-all duration-300 flex flex-col`}
        >
          <div className="p-6 flex items-center justify-between">
            {sidebarOpen && <h2 className="text-xl font-bold">Seller Hub</h2>}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:bg-gray-800 p-2 rounded"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            <button
              onClick={() => setActiveTab('menu')}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                activeTab === 'menu'
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-800'
              }`}
            >
              {sidebarOpen && 'Menu Items'}
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                activeTab === 'profile'
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-800'
              }`}
            >
              {sidebarOpen && 'Restaurant Profile'}
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                activeTab === 'orders'
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-800'
              }`}
            >
              {sidebarOpen && 'Orders'}
            </button>
          </nav>

          <button
            onClick={handleLogout}
            className="m-4 flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && 'Logout'}
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome, {user?.name}!
              </h1>
              {sellerProfile && (
                <p className="text-gray-600">
                  {sellerProfile.restaurantName} • {sellerProfile.cuisineType}
                </p>
              )}
            </div>

            {activeTab === 'menu' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Menu Items</h2>
                  <Link
                    href="/seller-dashboard/add-item"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    <Plus className="w-5 h-5" />
                    Add Item
                  </Link>
                </div>

                {menuItems.length === 0 ? (
                  <div className="bg-white rounded-lg p-8 text-center">
                    <p className="text-gray-500 mb-4">No menu items yet</p>
                    <Link
                      href="/seller-dashboard/add-item"
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      Add Your First Item
                    </Link>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {menuItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-lg p-4 flex items-center justify-between hover:shadow-lg transition"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          )}
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {item.category}
                            </p>
                            <p className="text-sm font-medium text-gray-900 mt-1">
                              {item.price && `RS ${item.price}`}
                              {item.sizes && `(${Object.keys(item.sizes).join(', ')})`}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              item.isAvailable
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {item.isAvailable ? 'Available' : 'Unavailable'}
                          </span>
                          <Link
                            href={`/seller-dashboard/edit-item/${item.id}`}
                            className="p-2 hover:bg-gray-100 rounded-lg transition"
                          >
                            <Edit2 className="w-5 h-5 text-blue-600" />
                          </Link>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition"
                          >
                            <Trash2 className="w-5 h-5 text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Restaurant Profile
                </h2>
                {sellerProfile ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Restaurant Name</p>
                      <p className="font-semibold text-gray-900">
                        {sellerProfile.restaurantName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Cuisine Type</p>
                      <p className="font-semibold text-gray-900">
                        {sellerProfile.cuisineType}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-semibold text-gray-900">
                        {sellerProfile.address}, {sellerProfile.city}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-semibold text-gray-900">
                        {sellerProfile.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          sellerProfile.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {sellerProfile.isActive ? 'Active' : 'Pending Approval'}
                      </span>
                    </div>
                    <Link
                      href="/seller-dashboard/edit-profile"
                      className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      Edit Profile
                    </Link>
                  </div>
                ) : (
                  <p className="text-gray-500">No profile information</p>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Orders</h2>
                <p className="text-gray-500">Order management coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
