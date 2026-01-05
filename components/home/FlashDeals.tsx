'use client';

import Link from 'next/link';
import { Zap, Star, ShoppingCart } from 'lucide-react';
import productsData from '@/lib/products.json';
import { useCart } from '@/lib/cart-context';
import { useState } from 'react';

export default function FlashDeals() {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState<number | null>(null);

  // Get flash deal products
  const flashProducts = productsData.products.filter((p) => p.deals?.isFlashDeal).slice(0, 6);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      discountedPrice: product.discountedPrice,
      quantity: 1,
      image: product.images[0],
      category: product.category,
    });
    setJustAdded(product.id);
    setTimeout(() => setJustAdded(null), 1500);
  };

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
          {flashProducts.map((product) => {
            const discount = product.discountedPrice ? Math.round(
              ((product.price - product.discountedPrice) / product.price) * 100
            ) : 0;

            return (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="bg-white border-2 border-yellow-400 rounded-lg overflow-hidden hover:shadow-lg transition-all group"
              >
                {/* Image */}
                <div className="relative bg-gray-100 h-32 sm:h-40 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {discount > 0 && (
                    <div className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded font-bold text-xs">
                      -{discount}%
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-2 sm:p-3">
                  <h3 className="text-xs sm:text-sm font-bold text-black line-clamp-2 mb-2">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-yellow-400 text-xs">★</span>
                    <span className="text-xs font-bold text-black">{product.rating}</span>
                  </div>

                  {/* Price */}
                  <p className="text-yellow-400 font-black text-sm">Rs {product.discountedPrice}</p>
                  {product.price !== product.discountedPrice && (
                    <p className="text-gray-400 line-through text-xs">Rs {product.price}</p>
                  )}

                  {/* Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                    className={`w-full font-bold text-xs py-1.5 rounded mt-2 transition-all ${
                      justAdded === product.id
                        ? 'bg-green-500 text-white'
                        : 'bg-yellow-400 hover:bg-yellow-500 text-black'
                    }`}
                  >
                    {justAdded === product.id ? '✓' : 'Add'}
                  </button>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All */}
        <div className="text-center mt-8">
          <Link
            href="/food-hub"
            className="inline-block bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-bold transition-all text-sm sm:text-base"
          >
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
}
