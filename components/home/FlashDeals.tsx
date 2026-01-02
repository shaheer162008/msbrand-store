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
    <section className="mt-28 max-w-[1440px] mx-auto px-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
        <div className="flex items-center gap-8">
          <h2 className="text-4xl font-900 uppercase italic tracking-tighter">
            <i className="fa-solid fa-bolt-lightning text-brand mr-4"></i>Flash Deals
          </h2>
          <div className="flex gap-3">
            <div className="bg-black text-brand px-4 py-2 rounded-xl font-black text-xl">
              {String(time.hours).padStart(2, '0')}
            </div>
            <span className="text-2xl font-black">:</span>
            <div className="bg-black text-brand px-4 py-2 rounded-xl font-black text-xl">
              {String(time.minutes).padStart(2, '0')}
            </div>
            <span className="text-2xl font-black">:</span>
            <div className="bg-black text-brand px-4 py-2 rounded-xl font-black text-xl">
              {String(time.seconds).padStart(2, '0')}
            </div>
          </div>
        </div>
        <button className="text-xs font-black uppercase tracking-[0.3em] bg-slate-100 px-8 py-3 rounded-full hover:bg-brand transition">
          View All Drops
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
}
