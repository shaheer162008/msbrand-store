'use client';

import { useCart } from '@/lib/cart-context';
import Link from 'next/link';
import { MessageCircle, ShoppingCart } from 'lucide-react';

export default function FloatingButtons() {
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-40">
      {/* Cart Button - ABOVE WhatsApp */}
      <Link
        href="/cart"
        className="flex items-center justify-center w-14 h-14 bg-brand hover:bg-yellow-500 text-black rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 relative"
        title="View Cart"
      >
        <ShoppingCart size={24} />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {cartCount > 99 ? '99+' : cartCount}
          </span>
        )}
      </Link>

      {/* WhatsApp Button - BELOW Cart */}
      <a
        href="https://wa.me/923001234567"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle size={24} />
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-300 rounded-full animate-pulse"></span>
      </a>
    </div>
  );
}
