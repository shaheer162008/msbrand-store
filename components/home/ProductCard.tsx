'use client';

import Image from 'next/image';

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  badge?: string;
  rating?: number;
}

export default function ProductCard({ image, title, price, badge, rating }: ProductCardProps) {
  return (
    <div className="product-card group relative bg-white border-2 border-yellow-400 rounded-lg overflow-hidden hover:shadow-lg transition-all">
      {/* Image */}
      <div className="relative bg-gray-100 h-40 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-3">
        <h4 className="font-black text-sm text-black line-clamp-2 mb-2">{title}</h4>

        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-1 mb-2">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-sm font-bold text-black">{rating}</span>
          </div>
        )}

        {/* Price */}
        <p className="text-yellow-400 font-black text-base">{price}</p>
        {badge && <span className="text-xs text-emerald-500 font-bold uppercase">{badge}</span>}
      </div>

      {/* Add Button */}
      <button className="add-to-cart w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 font-black text-xs uppercase transition-colors">
        <i className="fa-solid fa-cart-plus mr-2"></i>Add
      </button>
    </div>
  );
}
