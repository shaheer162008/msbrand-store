'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import ProductCard from '@/components/marketplace/ProductCard';
import { subscribeToFoodByCategory } from '@/lib/menu-service';
import { useCart } from '@/lib/cart-context';
import { MenuItem } from '@/lib/menu-service';

interface Product extends MenuItem {
  quantity?: number;
}

export default function FoodHubPage() {
  const [products, setProducts] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(['All Items']);
  const { cart, addToCart } = useCart();

  // Subscribe to Food menu items by category
  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToFoodByCategory('Pizzas', (productsData) => {
      setProducts(productsData);
      setFilteredItems(productsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Update categories from products
  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = ['All Items', ...new Set(products.map((p) => p.category))];
      setCategories(uniqueCategories);
    }
  }, [products]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category.toLowerCase());
    if (category.toLowerCase() === 'all items') {
      setFilteredItems(products);
    } else {
      setFilteredItems(
        products.filter((item) => item.category.toLowerCase() === category.toLowerCase())
      );
    }
  };

  const handleAddToCart = (product: MenuItem) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price || 0,
      discountedPrice: product.price || 0,
      image: product.image,
      category: product.category,
      quantity: 1,
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <MarketplaceHeader
        title="What's on the <span>Menu Today?</span>"
        subtitle="Premium curated local flavors"
        categories={categories}
        onCategoryChange={handleCategoryChange}
        cartCount={cart.length}
      />

      {/* Products Grid */}
      <main className="flex-grow max-w-[1440px] mx-auto px-6 sm:px-8 py-8 sm:py-12 w-full">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-slate-600 font-medium">Loading menu...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No items available</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {filteredItems.map((item) => (
              <ProductCard
                key={item.id}
                id={parseInt(item.id) || 0}
                name={item.name}
                price={item.price || 0}
                image={item.image}
                category={item.category}
                onAddToCart={() => handleAddToCart(item)}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
