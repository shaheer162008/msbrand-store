'use client';

import { useCart } from '@/lib/cart-context';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 500 ? 0 : 50; // Free shipping over 500
  const tax = Math.round(subtotal * 0.17); // 17% tax
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <ShoppingCart size={64} className="mx-auto text-gray-300 mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <Link
              href="/food-hub"
              className="inline-block bg-brand hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-brand hover:text-yellow-500 mb-4">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-800">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">{cart.length} item(s) in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm divide-y">
              {cart.map((item) => (
                <div key={item.id} className="p-6 flex gap-4 hover:bg-gray-50 transition">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Remove from cart"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-brand">
                        Rs {item.discountedPrice.toLocaleString()}
                      </span>
                      {item.price !== item.discountedPrice && (
                        <span className="ml-3 text-gray-400 line-through">
                          Rs {item.price.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                      >
                        <Minus size={18} className="text-gray-600" />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-12 text-center border border-gray-300 rounded py-2 font-bold"
                        min="1"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                      >
                        <Plus size={18} className="text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Line Total */}
                  <div className="flex-shrink-0 text-right">
                    <p className="text-xl font-bold text-gray-800">
                      Rs {(item.discountedPrice * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart */}
            <button
              onClick={clearCart}
              className="mt-4 text-red-500 hover:text-red-700 font-semibold flex items-center gap-2"
            >
              <Trash2 size={18} />
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

              {/* Summary Items */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-500 font-semibold">FREE</span>
                    ) : (
                      `Rs ${shipping}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (17%)</span>
                  <span>Rs {tax.toLocaleString()}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-gray-800">Total</span>
                <span className="text-3xl font-bold text-brand">Rs {total.toLocaleString()}</span>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Promo Code
                </label>
                <input
                  type="text"
                  placeholder="Enter code"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-brand"
                />
              </div>

              {/* Checkout Button */}
              <Link href="/checkout">
                <button className="w-full bg-brand hover:bg-yellow-500 text-black font-bold py-4 rounded-lg transition-all mb-3">
                  Proceed to Checkout
                </button>
              </Link>

              {/* Continue Shopping */}
              <Link
                href="/food-hub"
                className="block w-full text-center border-2 border-brand text-brand hover:bg-brand hover:text-black py-3 rounded-lg font-semibold transition-all"
              >
                Continue Shopping
              </Link>

              {/* Delivery Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-gray-600">
                  <span className="font-semibold">💚 Free Delivery</span> on orders over Rs 500
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
