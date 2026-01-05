'use client';

import Link from 'next/link';
import { Star, ShoppingCart, Tag } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  discountedPrice?: number | null;
  image: string;
  category?: string;
  rating?: number;
  isFlashDeal?: boolean;
  flashDealDiscount?: string;
  onAddToCart?: () => void;
}

export default function ProductCard({
  id,
  name,
  price,
  discountedPrice,
  image,
  category,
  rating = 4.5,
  isFlashDeal = false,
  flashDealDiscount,
  onAddToCart,
}: ProductCardProps) {
  const discount = discountedPrice 
    ? Math.round(((price - discountedPrice) / price) * 100) 
    : 0;

  return (
    <Link href={`/product/${id}`}>
      <div className="group bg-white border-2 border-yellow-400 rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer">
        {/* Image */}
        <div className="relative bg-gray-100 h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded font-bold text-xs">
              -{discount}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Category */}
          {category && (
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              {category}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <span className="text-yellow-400 text-xs">★</span>
            <span className="text-xs font-bold text-black">{rating}</span>
          </div>

          {/* Name */}
          <h3 className="font-bold text-sm mb-2 line-clamp-2 text-black">
            {name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            {discountedPrice ? (
              <>
                <span className="text-lg font-black text-yellow-400">Rs {discountedPrice}</span>
                <span className="text-xs text-gray-500 line-through">Rs {price}</span>
              </>
            ) : (
              <span className="text-lg font-black text-yellow-400">Rs {price}</span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart?.();
            }}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 text-sm font-black"
          >
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </Link>
  );
}
