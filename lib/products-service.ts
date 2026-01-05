import { ref, onValue, get } from 'firebase/database';
import { db } from './firebase';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  discountedPrice?: number;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  description?: string;
  features?: string[];
}

// Real-time products listener
export const subscribeToProducts = (callback: (products: Product[]) => void) => {
  const productsRef = ref(db, 'products');
  
  const unsubscribe = onValue(productsRef, (snapshot) => {
    if (snapshot.exists()) {
      const productsData = snapshot.val();
      const productsList = Object.values(productsData) as Product[];
      callback(productsList);
    } else {
      callback([]);
    }
  });

  return unsubscribe;
};

// Get products by category (real-time)
export const subscribeToProductsByCategory = (
  category: string,
  callback: (products: Product[]) => void
) => {
  const productsRef = ref(db, 'products');
  
  const unsubscribe = onValue(productsRef, (snapshot) => {
    if (snapshot.exists()) {
      const productsData = snapshot.val();
      const productsList = (Object.values(productsData) as Product[]).filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
      callback(productsList);
    } else {
      callback([]);
    }
  });

  return unsubscribe;
};

// Get single product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const productRef = ref(db, `products/${id}`);
    const snapshot = await get(productRef);
    
    if (snapshot.exists()) {
      return snapshot.val() as Product;
    }
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

// Fallback: Default products data (in case Firebase is not populated)
export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'food-1',
    name: 'Fresh Chicken Breast',
    category: 'Food',
    price: 599,
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400',
    rating: 4.8,
    reviews: 156,
    inStock: true,
  },
  {
    id: 'food-2',
    name: 'Organic Basmati Rice 5kg',
    category: 'Food',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1586080872867-b0e438db8e5e?w=400',
    rating: 4.9,
    reviews: 234,
    inStock: true,
  },
  {
    id: 'grocery-1',
    name: 'Fresh Milk 1L',
    category: 'Grocery',
    price: 149,
    image: 'https://images.unsplash.com/photo-1554866585-c6f297f1dc3b?w=400',
    rating: 4.7,
    reviews: 345,
    inStock: true,
  },
  {
    id: 'grocery-2',
    name: 'Eggs Pack (12 Pieces)',
    category: 'Grocery',
    price: 249,
    image: 'https://images.unsplash.com/photo-1582722872081-f8119db7aea3?w=400',
    rating: 4.6,
    reviews: 289,
    inStock: true,
  },
  {
    id: 'pharmacy-1',
    name: 'Aspirin 500mg (30 tablets)',
    category: 'Pharmacy',
    price: 199,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
    rating: 4.5,
    reviews: 167,
    inStock: true,
  },
  {
    id: 'pharmacy-2',
    name: 'Vitamin C Supplements (60 tablets)',
    category: 'Pharmacy',
    price: 399,
    image: 'https://images.unsplash.com/photo-1576091160550-112173faf7e7?w=400',
    rating: 4.7,
    reviews: 298,
    inStock: true,
  },
];
