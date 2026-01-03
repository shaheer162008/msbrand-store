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
    <div className="product-card group relative bg-white border-2 border-slate-50 rounded-xl sm:rounded-2xl md:rounded-[2.5rem] p-2.5 sm:p-4 md:p-5">
      <div className="aspect-square rounded-lg sm:rounded-xl md:rounded-[2rem] mb-3 sm:mb-4 md:mb-6 overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
      </div>
      <h4 className="font-black text-xs sm:text-sm mb-2 truncate uppercase tracking-tight line-clamp-2">{title}</h4>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-lg sm:text-xl md:text-2xl font-black">{price}</span>
          {badge && <span className="text-[7px] sm:text-xs text-emerald-500 font-bold uppercase whitespace-nowrap">{badge}</span>}
        </div>
        {rating && (
          <div className="flex text-brand text-[8px] sm:text-[10px]">
            {Array.from({ length: rating }).map((_, i) => (
              <i key={i} className="fa-solid fa-star"></i>
            ))}
          </div>
        )}
      </div>
      <button className="add-to-cart absolute -bottom-8 sm:-bottom-10 left-2 right-2 sm:left-4 sm:right-4 bg-black text-brand py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl font-black text-[7px] sm:text-[9px] md:text-[10px] uppercase opacity-0 transition-all shadow-xl">
        <i className="fa-solid fa-cart-plus mr-1 sm:mr-2"></i>Add to Basket
      </button>
    </div>
  );
}
