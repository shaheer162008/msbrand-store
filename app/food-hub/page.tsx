'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import ProductCard from '@/components/marketplace/ProductCard';

const FOOD_ITEMS = [
  {
    id: 1,
    name: 'Double Smash Burger',
    category: 'Burgers',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop',
    description: 'Two 4oz Wagyu patties, secret MS sauce, and caramelized onions on a brioche bun.',
  },
  {
    id: 2,
    name: 'Truffle Mushroom Pizza',
    category: 'Pizza',
    price: 22.5,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&auto=format&fit=crop',
    description: 'Wild mushrooms, truffle oil, and fresh mozzarella on a 48-hour fermented crust.',
  },
  {
    id: 3,
    name: 'Dragon Signature Roll',
    category: 'Sushi',
    price: 18.0,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=500&auto=format&fit=crop',
    description: 'Tempura shrimp, avocado, topped with unagi and house-made spicy mayo.',
  },
  {
    id: 4,
    name: 'Spicy Pepperoni',
    category: 'Pizza',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=500&auto=format&fit=crop',
    description: 'Our signature spicy pepperoni with honey drizzle and fresh basil.',
  },
];

export default function FoodHubPage() {
  const [filteredItems, setFilteredItems] = useState(FOOD_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartCount, setCartCount] = useState(0);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category.toLowerCase());
    if (category.toLowerCase() === 'all') {
      setFilteredItems(FOOD_ITEMS);
    } else {
      setFilteredItems(FOOD_ITEMS.filter((item) => item.category.toLowerCase() === category.toLowerCase()));
    }
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar cartCount={cartCount} />

      <MarketplaceHeader
        title="What's on the <span>Menu Today?</span>"
        subtitle="Premium curated local flavors"
        categories={['All Items', 'Burgers', 'Pizza', 'Sushi']}
        onCategoryChange={handleCategoryChange}
        cartCount={cartCount}
      />

      {/* Products Grid */}
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
