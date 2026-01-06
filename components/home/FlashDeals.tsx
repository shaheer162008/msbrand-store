'use client';

import { Zap, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useState } from 'react';
import { useFlashDeals } from '@/lib/use-flash-deals';

export default function FlashDeals() {
  const { addToCart } = useCart();
  const { deals, loading } = useFlashDeals();
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const handleAddToCart = (deal: any) => {
    addToCart({
      id: deal.itemId,
      name: deal.itemName,
      price: deal.price || Object.values(deal.sizes || {})[0],
      discountedPrice: deal.price || Object.values(deal.sizes || {})[0],
      quantity: 1,
      image: deal.image,
      category: 'Flash Deal',
    });
    setJustAdded(deal.id);
    setTimeout(() => setJustAdded(null), 1500);
  };

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="text-yellow-400 w-7 h-7" />
            <h2 className="text-3xl lg:text-4xl font-black text-black">Flash Deals</h2>
          </div>
          <div className="text-center text-gray-600">Loading flash deals...</div>
        </div>
      </section>
    );
  }

  if (!deals || deals.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Zap className="text-yellow-400 w-7 h-7" />
          <h2 className="text-3xl lg:text-4xl font-black text-black">Flash Deals</h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {deals.map((deal) => {
            const price = deal.price || (deal.sizes ? Object.values(deal.sizes)[0] : 0);
            
            return (
              <div
                key={deal.id}
                className="bg-white border-2 border-yellow-400 rounded-lg overflow-hidden hover:shadow-lg transition-all group"
              >
                {/* Image */}
                <div className="relative bg-gray-100 h-32 sm:h-40 overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.itemName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {deal.discount && (
                    <div className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded font-bold text-xs">
                      -{deal.discount}%
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-2 sm:p-3">
                  <h3 className="text-xs sm:text-sm font-bold text-black line-clamp-2 mb-2">
                    {deal.itemName}
                  </h3>

                  {/* Price */}
                  <p className="text-yellow-400 font-black text-sm">Rs {price}</p>

                  {/* Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(deal);
                    }}
                    className={`w-full font-bold text-xs py-1.5 rounded mt-2 transition-all flex items-center justify-center gap-1 ${
                      justAdded === deal.id
                        ? 'bg-green-500 text-white'
                        : 'bg-yellow-400 hover:bg-yellow-500 text-black'
                    }`}
                  >
                    <ShoppingCart size={12} />
                    {justAdded === deal.id ? '✓' : 'Add'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
