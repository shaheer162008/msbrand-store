'use client';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

export default function FlashDeals() {
  const [time, setTime] = useState({ hours: 9, minutes: 18, seconds: 56 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const products = [
    {
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
      title: 'Noise-Cancel Headphones',
      price: '$199.00',
      rating: 4,
    },
    {
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099&auto=format&fit=crop',
      title: 'Smart Series Watch 8',
      price: '$350.00',
      badge: 'New',
    },
    {
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2080&auto=format&fit=crop',
      title: 'Smartphone Ultra Pro',
      price: '$999.00',
    },
    {
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1904&auto=format&fit=crop',
      title: 'Signature Fragrance',
      price: '$75.00',
    },
  ];

  return (
    <section className="mt-10 sm:mt-14 md:mt-18 lg:mt-28 w-full px-3 sm:px-6 lg:px-8">
      <div className="max-w-[1440px] mx-auto">
        {/* Flash Deals Header - Centered */}
        <div className="flex flex-col items-center gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
          {/* Title and Timer Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-900 uppercase italic tracking-tighter whitespace-nowrap flex items-center gap-2 sm:gap-3 md:gap-4">
              <i className="fa-solid fa-bolt-lightning text-brand text-2xl sm:text-3xl md:text-4xl"></i>Flash Deals
            </h2>
            
            {/* Timer */}
            <div className="flex gap-1.5 sm:gap-2 md:gap-3 items-center">
              <div className="bg-black text-brand px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl font-black text-sm sm:text-base md:text-xl">
                {String(time.hours).padStart(2, '0')}
              </div>
              <span className="text-lg sm:text-2xl md:text-3xl font-black">:</span>
              <div className="bg-black text-brand px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl font-black text-sm sm:text-base md:text-xl">
                {String(time.minutes).padStart(2, '0')}
              </div>
              <span className="text-lg sm:text-2xl md:text-3xl font-black">:</span>
              <div className="bg-black text-brand px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl font-black text-sm sm:text-base md:text-xl">
                {String(time.seconds).padStart(2, '0')}
              </div>
            </div>
          </div>
          
          {/* View All Button */}
          <button className="text-[8px] sm:text-xs md:text-sm font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] bg-slate-100 hover:bg-brand text-black px-6 sm:px-8 md:px-10 py-2 sm:py-2.5 md:py-3 rounded-full transition whitespace-nowrap">
            View All Drops
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3 md:gap-4 lg:gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
