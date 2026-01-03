'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MarketplaceHeaderProps {
  title: string;
  subtitle: string;
  categories: string[];
  onCategoryChange?: (category: string) => void;
  cartCount?: number;
  onCartClick?: () => void;
}

export default function MarketplaceHeader({
  title,
  subtitle,
  categories,
  onCategoryChange,
  cartCount = 0,
  onCartClick,
}: MarketplaceHeaderProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onCategoryChange?.(category);
  };

  return (
    <header className="sticky top-0 z-[100] bg-white/95 backdrop-blur-sm border-b-2" style={{ borderColor: '#FFD600' }}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 lg:h-24 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 text-base sm:text-xl lg:text-2xl font-black uppercase tracking-tighter hover:opacity-80 transition flex-shrink-0">
          <span className="hidden sm:inline">MS Brand</span>
          <span className="sm:hidden">MS</span>
        </Link>

        {/* Cart */}
        <button
          onClick={onCartClick}
          className="relative p-2.5 sm:p-3 lg:p-4 text-black rounded-lg sm:rounded-xl lg:rounded-2xl transition-all hover:shadow-lg active:scale-95 flex-shrink-0"
          style={{ backgroundColor: '#FFD600' }}
        >
          <i className="fa-solid fa-bag-shopping text-base sm:text-lg"></i>
          {cartCount > 0 && (
            <span
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center font-black border-2 text-[9px]"
              style={{ backgroundColor: '#FFD600', color: '#000', borderColor: '#FFD600' }}
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Title & Categories */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="flex flex-col gap-6 sm:gap-8">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black uppercase tracking-tighter leading-tight sm:leading-none mb-2 sm:mb-3">
              {title.includes('span') ? (
                <>
                  {title.split('<br>')[0]} <br />{' '}
                  <span style={{ color: '#FFD600' }}>
                    {title.split('<span>')[1]?.split('</span>')[0]}
                  </span>
                </>
              ) : (
                title
              )}
            </h1>
            <p className="text-slate-400 font-bold text-[9px] sm:text-[10px] uppercase tracking-widest">{subtitle}</p>
          </div>

          {/* Category buttons */}
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3.5 rounded-lg sm:rounded-xl lg:rounded-2xl font-black text-[8px] sm:text-[9px] lg:text-[10px] uppercase tracking-widest whitespace-nowrap transition-all border-2`}
                style={{
                  backgroundColor: activeCategory === cat.toLowerCase() ? '#000' : 'transparent',
                  color: activeCategory === cat.toLowerCase() ? '#FFD600' : '#000',
                  borderColor: activeCategory === cat.toLowerCase() ? '#000' : '#f1f5f9',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
