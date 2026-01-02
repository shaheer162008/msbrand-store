'use client';

import React, { useState, useEffect, useRef } from 'react';

interface HeroSlide {
  id: number;
  image: string;
  title: string;
  description: string;
}

const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const slides: HeroSlide[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80',
      title: 'Food Hub',
      description: 'Order from top restaurants and local kitchens with fast delivery and live tracking.',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=80',
      title: 'Grocery Delivery',
      description: 'Fresh groceries and daily essentials delivered directly from trusted local stores.',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1920&q=80',
      title: 'Online Shopping',
      description: 'Shop electronics, fashion, and lifestyle products with secure payments',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1920&q=80',
      title: 'Online Pharmacy',
      description: 'Order prescription and OTC medicines from licensed pharmacies with privacy',
    },
    {
      id: 5,
      image: '/ride.jpg',
      title: 'Taxi Booking',
      description: 'Book reliable rides with professional drivers, transparent pricing, and live tracking.',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1920&q=80',
      title: 'Parcel Service',
      description: 'Send and receive parcels securely with same-day delivery and full shipment',
    },
  ];

  const updateCarousel = (index: number) => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
    updateCarousel(newIndex);
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
    updateCarousel(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative overflow-hidden rounded-xl">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-700 ease-in-out"
        >
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-full">
              <div className="relative aspect-[2/1] sm:aspect-[21/9] overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 p-6">
                    <h2 className="text-3xl font-bold text-white">{slide.title}</h2>
                    <p className="text-gray-200 mt-1 max-w-xl">{slide.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          onClick={handlePrev}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white h-8 w-8 rounded-full shadow-lg items-center justify-center text-black font-bold text-xl"
        >
          ‹
        </button>

        <button
          onClick={handleNext}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white h-8 w-8 rounded-full shadow-lg items-center justify-center text-black font-bold text-xl"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
