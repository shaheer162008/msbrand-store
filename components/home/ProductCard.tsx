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
    <div className="product-card group relative bg-white border-2 border-slate-50 rounded-[2.5rem] p-5">
      <div className="aspect-square rounded-[2rem] mb-6 overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
      </div>
      <h4 className="font-black text-sm mb-2 truncate uppercase tracking-tight">{title}</h4>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-black">{price}</span>
        {badge && <span className="text-xs text-emerald-500 font-bold uppercase">{badge}</span>}
        {rating && (
          <div className="flex text-brand text-[10px]">
            {Array.from({ length: rating }).map((_, i) => (
              <i key={i} className="fa-solid fa-star"></i>
            ))}
          </div>
        )}
      </div>
      <button className="add-to-cart absolute -bottom-10 left-4 right-4 bg-black text-brand py-4 rounded-2xl font-black text-[10px] uppercase opacity-0 transition-all shadow-xl">
        <i className="fa-solid fa-cart-plus mr-2"></i>Add to Basket
      </button>
    </div>
  );
}
