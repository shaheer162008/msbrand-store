'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import ProductCard from '@/components/marketplace/ProductCard';

const SHOP_ITEMS = [
  {
    id: 1,
    name: 'Double Wagyu Smash',
    category: 'Food',
    price: 16.0,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Organic Blueberries',
    category: 'Grocery',
    price: 4.5,
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Pepperoni Inferno',
    category: 'Food',
    price: 21.0,
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Avocado Hass',
    category: 'Grocery',
    price: 1.25,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Dragon Roll Sushi',
    category: 'Food',
    price: 18.0,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Whole Milk 2L',
    category: 'Grocery',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1563636619-e9107da5a1bb?q=80&w=500&auto=format&fit=crop',
  },
];

export default function ShopPage() {
  const [filteredItems, setFilteredItems] = useState(SHOP_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartCount, setCartCount] = useState(0);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category.toLowerCase());
    if (category.toLowerCase() === 'all') {
      setFilteredItems(SHOP_ITEMS);
    } else {
      setFilteredItems(SHOP_ITEMS.filter((item) => item.category.toLowerCase() === category.toLowerCase()));
    }
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <MarketplaceHeader
        title="Our <span>Catalog</span>"
        subtitle="Premium essentials & meals"
        categories={['All', 'Grocery', 'Food Hub']}
        onCategoryChange={handleCategoryChange}
        cartCount={cartCount}
      />

      <main className="flex-grow max-w-[1440px] mx-auto px-6 sm:px-8 py-8 sm:py-12 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
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
