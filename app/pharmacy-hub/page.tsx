'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import ProductCard from '@/components/marketplace/ProductCard';

const PHARMACY_ITEMS = [
  {
    id: 1,
    name: 'Vitamin C 1000mg',
    category: 'Vitamins',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde2d?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Pain Relief Tablets',
    category: 'Pain Relief',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1543318014-198dfe8f2e1f?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Digital Thermometer',
    category: 'Medical Devices',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1600243696313-90218e686b4b?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Cold & Flu Relief',
    category: 'Cold & Cough',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1565299624946-b28974a94ae5?q=80&w=500&auto=format&fit=crop',
  },
];

export default function PharmacyHubPage() {
  const [filteredItems, setFilteredItems] = useState(PHARMACY_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartCount, setCartCount] = useState(0);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category.toLowerCase());
    if (category.toLowerCase() === 'all') {
      setFilteredItems(PHARMACY_ITEMS);
    } else {
      setFilteredItems(PHARMACY_ITEMS.filter((item) => item.category.toLowerCase() === category.toLowerCase()));
    }
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar cartCount={cartCount} />

      <MarketplaceHeader
        title="Your Health <span>Matters</span>"
        subtitle="Premium pharmacy products & wellness essentials"
        categories={['All Items', 'Vitamins', 'Pain Relief', 'Medical Devices']}
        onCategoryChange={handleCategoryChange}
        cartCount={cartCount}
      />

      <main className="flex-grow max-w-[1440px] mx-auto px-6 sm:px-8 py-8 sm:py-12 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {filteredItems.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
              category={item.category}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
