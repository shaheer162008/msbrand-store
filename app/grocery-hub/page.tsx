'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import ProductCard from '@/components/marketplace/ProductCard';

const GROCERY_ITEMS = [
  {
    id: 1,
    name: 'Organic Blueberries',
    category: 'Fruits',
    price: 4.5,
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Avocado Hass',
    category: 'Fruits',
    price: 1.25,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Whole Milk 2L',
    category: 'Dairy',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1563636619-e9107da5a1bb?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Greek Yogurt',
    category: 'Dairy',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291840?q=80&w=500&auto=format&fit=crop',
  },
];

export default function GroceryHubPage() {
  const [filteredItems, setFilteredItems] = useState(GROCERY_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartCount, setCartCount] = useState(0);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category.toLowerCase());
    if (category.toLowerCase() === 'all') {
      setFilteredItems(GROCERY_ITEMS);
    } else {
      setFilteredItems(GROCERY_ITEMS.filter((item) => item.category.toLowerCase() === category.toLowerCase()));
    }
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar cartCount={cartCount} />

      <MarketplaceHeader
        title="Fresh Essentials <span>Delivered</span>"
        subtitle="Premium quality groceries & essentials"
        categories={['All Items', 'Fruits', 'Dairy', 'Pantry']}
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
