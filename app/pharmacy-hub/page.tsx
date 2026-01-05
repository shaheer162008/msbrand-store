'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import ProductCard from '@/components/marketplace/ProductCard';
import { subscribeToProductsByCategory } from '@/lib/products-service';
import { useCart } from '@/lib/cart-context';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string;
  stock?: number;
}

export default function PharmacyHubPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const { cart, addToCart } = useCart();

  // Subscribe to Pharmacy products from Firebase
  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToProductsByCategory('Pharmacy', (productsData) => {
      setProducts(productsData);
      setFilteredItems(productsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category.toLowerCase());
    if (category.toLowerCase() === 'all') {
      setFilteredItems(products);
    } else {
      setFilteredItems(
        products.filter((item) => item.category.toLowerCase() === category.toLowerCase())
      );
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      discountedPrice: product.price,
      image: product.image,
      category: product.category,
      quantity: 1,
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <MarketplaceHeader
        title="Your Health <span>Matters</span>"
        subtitle="Premium pharmacy products & wellness essentials"
        categories={['All Items', 'Vitamins', 'Pain Relief', 'Medical Devices']}
        onCategoryChange={handleCategoryChange}
        cartCount={cart.length}
      />

      <main className="flex-grow max-w-[1440px] mx-auto px-6 sm:px-8 py-8 sm:py-12 w-full">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-slate-600 font-medium">Loading products...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No products available</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {filteredItems.map((item) => (
              <ProductCard
                key={item.id}
                id={parseInt(item.id) || 0}
                name={item.name}
                price={item.price}
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
