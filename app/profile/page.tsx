'use client';

import { useAuth, Address } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LogOut, Plus, Edit2, Trash2, Phone, MapPin } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout, addAddress, deleteAddress, updateAddress } = useAuth();
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    label: '',
    address: '',
    city: '',
    zipCode: '',
  });

  useEffect(() => {
    if (!user || user.userType !== 'client') {
      router.push('/login');
      return;
    }
    if (user.addresses && Array.isArray(user.addresses)) {
      setAddresses(user.addresses);
    }
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleAddAddress = () => {
    if (!formData.label || !formData.address || !formData.city || !formData.zipCode) {
      alert('Please fill all fields');
      return;
    }

    const newAddress: Address = {
      id: Date.now().toString(),
      label: formData.label,
      street: formData.address,
      city: formData.city,
      zipCode: formData.zipCode,
      phone: '',
      isDefault: addresses.length === 0,
    };

    addAddress(newAddress);
    setAddresses([...addresses, newAddress]);
    setFormData({ label: '', address: '', city: '', zipCode: '' });
    setShowAddressForm(false);
  };

  const handleUpdateAddress = () => {
    if (!editingAddress) return;
    if (!formData.label || !formData.address || !formData.city || !formData.zipCode) {
      alert('Please fill all fields');
      return;
    }

    const updatedAddress: Address = {
      ...editingAddress,
      label: formData.label,
      street: formData.address,
      city: formData.city,
      zipCode: formData.zipCode,
    };

    updateAddress(editingAddress.id, updatedAddress);
    setAddresses(addresses.map(a => a.id === editingAddress.id ? updatedAddress : a));
    setFormData({ label: '', address: '', city: '', zipCode: '' });
    setEditingAddress(null);
  };

  const handleDeleteAddress = (id: string) => {
    if (confirm('Are you sure you want to delete this address?')) {
      deleteAddress(id);
      setAddresses(addresses.filter(a => a.id !== id));
    }
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      label: address.label,
      address: address.street,
      city: address.city,
      zipCode: address.zipCode,
    });
    setShowAddressForm(true);
  };

  const handleSetDefault = (id: string) => {
    const updatedAddresses = addresses.map(a => ({
      ...a,
      isDefault: a.id === id,
    }));
    setAddresses(updatedAddresses);
    updatedAddresses.forEach(a => {
      updateAddress(a.id, a);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Profile Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <p className="text-lg font-semibold text-gray-900">{user?.name}</p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Email Address</label>
                <p className="text-lg font-semibold text-gray-900">{user?.email}</p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Account Type</label>
                <p className="text-lg font-semibold text-gray-900 capitalize">{user?.userType}</p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Member Since</label>
                <p className="text-lg font-semibold text-gray-900">January 2024</p>
              </div>
            </div>

            <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Phone Number Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Phone size={24} className="text-orange-500" />
            <h2 className="text-xl font-bold text-gray-900">Phone Number</h2>
          </div>

          {user?.phone ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Registered Phone</p>
                <p className="text-lg font-semibold text-gray-900">{user.phone}</p>
                <p className="text-xs text-green-600 mt-1">✓ Verified</p>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold">
                Change Phone
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-4">No phone number added yet</p>
              <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold">
                Add Phone Number
              </button>
            </div>
          )}
        </div>

        {/* Saved Addresses */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <MapPin size={24} className="text-orange-500" />
              <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
            </div>
            <button
              onClick={() => {
                setEditingAddress(null);
                setFormData({ label: '', address: '', city: '', zipCode: '' });
                setShowAddressForm(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold"
            >
              <Plus size={18} />
              Add Address
            </button>
          </div>

          {/* Address Form */}
          {showAddressForm && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6 border-2 border-orange-500">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {editingAddress ? 'Edit Address' : 'New Address'}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Label (e.g., Home, Office)
                  </label>
                  <input
                    type="text"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    placeholder="Home"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="123 Main Street, Apt 4B"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Karachi"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      placeholder="75500"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={editingAddress ? handleUpdateAddress : handleAddAddress}
                    className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold"
                  >
                    {editingAddress ? 'Update Address' : 'Add Address'}
                  </button>
                  <button
                    onClick={() => {
                      setShowAddressForm(false);
                      setEditingAddress(null);
                      setFormData({ label: '', address: '', city: '', zipCode: '' });
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Addresses List */}
          <div className="space-y-4">
            {addresses.length > 0 ? (
              addresses.map(address => (
                <div key={address.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div>
                        <h3 className="font-bold text-gray-900">{address.label}</h3>
                        {address.isDefault && (
                          <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                            Default
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditAddress(address)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-2">{address.street}</p>
                  <p className="text-sm text-gray-600 mb-3">{address.city}, {address.zipCode}</p>

                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="text-orange-500 hover:text-orange-600 text-sm font-semibold"
                    >
                      Set as Default
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No saved addresses yet</p>
            )}
          </div>
        </div>

        {/* Delete Account */}
        <div className="bg-red-50 rounded-lg border border-red-200 p-6 mt-6">
          <h3 className="text-lg font-bold text-red-900 mb-2">Danger Zone</h3>
          <p className="text-red-700 mb-4">Permanently delete your account and all data</p>
          <button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
