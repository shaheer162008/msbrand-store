'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useCart } from '@/lib/cart-context';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { ArrowLeft, MapPin, CreditCard, Phone } from 'lucide-react';
import Link from 'next/link';
import { ref, set } from 'firebase/database';
import { db } from '@/lib/firebase';

interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

export default function CheckoutPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const { cart, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderPlacing, setOrderPlacing] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>(user?.addresses || []);
  const [newAddress, setNewAddress] = useState({
    label: '',
    street: '',
    city: '',
    zipCode: '',
    phone: '',
    isDefault: false,
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login?redirect=/checkout');
    }
  }, [isAuthenticated, loading, router]);

  // Update addresses when user changes
  useEffect(() => {
    if (user?.addresses) {
      setAddresses(user.addresses);
      // Auto-select first address if none selected
      if (!selectedAddress && user.addresses.length > 0) {
        setSelectedAddress(user.addresses[0].id);
      }
    }
  }, [user?.addresses, selectedAddress]);

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newAddress.label || !newAddress.street || !newAddress.city || !newAddress.zipCode || !newAddress.phone) {
      alert('Please fill all fields');
      return;
    }

    const addressId = `ADDR-${Date.now()}`;
    const addressToAdd: Address = {
      id: addressId,
      ...newAddress,
    };

    // Add to local state
    const updatedAddresses = [...addresses, addressToAdd];
    setAddresses(updatedAddresses);
    setSelectedAddress(addressId);

    // Save to Firebase (would be done in auth context in real app)
    if (user?.uid) {
      try {
        const response = await fetch('/api/update-user-addresses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            uid: user.uid,
            addresses: updatedAddresses,
          }),
        });
        if (!response.ok) throw new Error('Failed to save address');
      } catch (err) {
        console.error('Error saving address:', err);
        alert('Failed to save address');
        return;
      }
    }

    // Reset form
    setNewAddress({ label: '', street: '', city: '', zipCode: '', phone: '', isDefault: false });
    setShowAddressModal(false);
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = Math.round(subtotal * 0.17);
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    if (!selectedAddress || !agreeTerms) {
      alert('Please select address and accept terms');
      return;
    }

    setOrderPlacing(true);
    try {
      // Create order object
      const orderId = `ORD-${Date.now()}`;
      const order = {
        id: orderId,
        userId: user?.uid,
        items: cart,
        subtotal,
        shipping,
        tax,
        total,
        addressId: selectedAddress,
        paymentMethod,
        status: 'pending', // Order is pending until admin accepts
        createdAt: Date.now(),
        userEmail: user?.email,
        userPhone: user?.phone,
        deliveryAddress: addresses.find(a => a.id === selectedAddress),
      };

      // Save order to Firebase - in real-time database under /orders/{orderId}
      const orderRef = ref(db, `orders/${orderId}`);
      await set(orderRef, order);

      // Also save to localStorage for backwards compatibility
      localStorage.setItem('lastOrder', JSON.stringify(order));

      // Clear cart
      clearCart();

      // Redirect to success page
      router.push(`/order-confirmation?orderId=${orderId}`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setOrderPlacing(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center animate-pulse overflow-hidden">
          <img src="/logo.jpeg" alt="MS Brand Store" className="w-full h-full object-cover rounded-xl" />
        </div>
      </div>
    );
  }

  // Redirect if not authenticated (this will be caught by useEffect above)
  if (!isAuthenticated) {
    return null;
  }

  // Empty cart
  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center py-16">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Cart is Empty</h1>
              <p className="text-gray-600 mb-8">Add items to checkout</p>
              <Link
                href="/food-hub"
                className="inline-block bg-brand hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg"
              >
                Continue Shopping
              </Link>
            </div>
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
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link href="/cart" className="inline-flex items-center text-brand hover:text-yellow-500 mb-4">
              <ArrowLeft size={20} className="mr-2" />
              Back to Cart
            </Link>
            <h1 className="text-4xl font-bold text-gray-800">Checkout</h1>
            <p className="text-gray-600 mt-2">Complete your order</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address */}
              <div className="bg-white rounded-lg border-2 border-yellow-400 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin size={24} className="text-yellow-400" />
                  <h2 className="text-2xl font-black text-black">Delivery Address</h2>
                </div>

                {addresses && addresses.length > 0 ? (
                  <div className="space-y-3">
                    {addresses.map((addr: Address) => (
                      <label key={addr.id} className="flex items-start p-4 border-2 border-gray-200 rounded-lg hover:border-yellow-400 cursor-pointer">
                        <input
                          type="radio"
                          name="address"
                          value={addr.id}
                          checked={selectedAddress === addr.id}
                          onChange={() => setSelectedAddress(addr.id)}
                          className="mt-1"
                        />
                        <div className="ml-4 flex-1">
                          <p className="font-bold text-black">
                            {addr.label} {addr.isDefault && <span className="text-xs bg-yellow-400 px-2 py-1 rounded ml-2">Default</span>}
                          </p>
                          <p className="text-gray-600 text-sm">{addr.street}</p>
                          <p className="text-gray-600 text-sm">{addr.city}, {addr.zipCode}</p>
                          <p className="text-gray-600 text-sm flex items-center gap-1 mt-1">
                            <Phone size={14} /> {addr.phone}
                          </p>
                        </div>
                      </label>
                    ))}
                    <button 
                      onClick={() => setShowAddressModal(true)}
                      className="w-full mt-4 border-2 border-dashed border-yellow-400 hover:bg-yellow-50 text-black font-bold py-2 px-6 rounded-lg transition"
                    >
                      + Add New Address
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">No addresses saved</p>
                    <button 
                      onClick={() => setShowAddressModal(true)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg"
                    >
                      Add New Address
                    </button>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg border-2 border-yellow-400 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard size={24} className="text-yellow-400" />
                  <h2 className="text-2xl font-black text-black">Payment Method</h2>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-yellow-400 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <span className="ml-4 font-bold text-black">Cash on Delivery (COD)</span>
                  </label>

                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg opacity-50 cursor-not-allowed">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      disabled
                    />
                    <span className="ml-4 font-bold text-gray-500">Credit Card (Coming Soon)</span>
                  </label>
                </div>
              </div>

              {/* Terms */}
              <div className="bg-white rounded-lg border-2 border-yellow-400 p-6">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={() => setAgreeTerms(!agreeTerms)}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the <span className="text-yellow-600 font-bold">Terms & Conditions</span> and <span className="text-yellow-600 font-bold">Privacy Policy</span>
                  </span>
                </label>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border-2 border-yellow-400 p-6 sticky top-24">
                <h2 className="text-2xl font-black text-black mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-3 mb-6 pb-6 border-b-2 border-gray-200">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div>
                        <p className="font-bold text-black">{item.name}</p>
                        <p className="text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-yellow-400">Rs {item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-bold text-black">Rs {subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-bold text-black">{shipping === 0 ? 'FREE' : `Rs ${shipping}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (17%)</span>
                    <span className="font-bold text-black">Rs {tax}</span>
                  </div>
                  <div className="flex justify-between text-lg border-t-2 border-gray-200 pt-3">
                    <span className="font-black text-black">Total</span>
                    <span className="font-black text-yellow-400">Rs {total}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={orderPlacing || !selectedAddress || !agreeTerms}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black py-3 rounded-lg transition-all"
                >
                  {orderPlacing ? 'Placing Order...' : 'Place Order'}
                </button>

                <p className="text-xs text-gray-600 text-center mt-4">
                  Your order is secure with us. No charges until order is confirmed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <h3 className="text-2xl font-black text-black mb-4">Add New Address</h3>
            
            <form onSubmit={handleAddAddress} className="space-y-4">
              {/* Label */}
              <div>
                <label className="block text-xs font-black text-gray-700 mb-2">Address Label</label>
                <input
                  type="text"
                  value={newAddress.label}
                  onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                  placeholder="e.g., Home, Office"
                  className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:border-yellow-400 outline-none"
                  required
                />
              </div>

              {/* Street */}
              <div>
                <label className="block text-xs font-black text-gray-700 mb-2">Street Address</label>
                <input
                  type="text"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                  placeholder="Street address"
                  className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:border-yellow-400 outline-none"
                  required
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-black text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  placeholder="City"
                  className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:border-yellow-400 outline-none"
                  required
                />
              </div>

              {/* Zip Code */}
              <div>
                <label className="block text-xs font-black text-gray-700 mb-2">Zip Code</label>
                <input
                  type="text"
                  value={newAddress.zipCode}
                  onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                  placeholder="Zip code"
                  className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:border-yellow-400 outline-none"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-black text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                  placeholder="Phone number"
                  className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:border-yellow-400 outline-none"
                  required
                />
              </div>

              {/* Default Address */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newAddress.isDefault}
                  onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                />
                <span className="text-xs font-bold text-gray-700">Set as default address</span>
              </label>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="flex-1 border-2 border-gray-300 text-black font-bold py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded-lg"
                >
                  Add Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
