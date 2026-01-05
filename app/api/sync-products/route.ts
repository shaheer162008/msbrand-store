import { db } from '@/lib/firebase';
import { ref, set } from 'firebase/database';
import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_PRODUCTS = [
  {
    id: 'food-1',
    name: 'Fresh Chicken Breast 1kg',
    category: 'Food',
    price: 599,
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    description: 'Premium quality fresh chicken breast',
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
    description: 'Long grain basmati rice',
  },
  {
    id: 'food-3',
    name: 'Fresh Bread 500g',
    category: 'Food',
    price: 99,
    image: 'https://images.unsplash.com/photo-1585518419759-2951fedb0d97?w=400',
    rating: 4.6,
    reviews: 189,
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
    id: 'grocery-3',
    name: 'Butter 500g',
    category: 'Grocery',
    price: 449,
    image: 'https://images.unsplash.com/photo-1589985643817-2db77b48b6b7?w=400',
    rating: 4.8,
    reviews: 234,
    inStock: true,
  },
  {
    id: 'grocery-4',
    name: 'Yogurt 1kg',
    category: 'Grocery',
    price: 199,
    image: 'https://images.unsplash.com/photo-1535949357203-92ab5ebf9bbe?w=400',
    rating: 4.5,
    reviews: 178,
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
  {
    id: 'pharmacy-3',
    name: 'Cough Syrup 200ml',
    category: 'Pharmacy',
    price: 149,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
    rating: 4.4,
    reviews: 123,
    inStock: true,
  },
];

export async function GET(request: NextRequest) {
  try {
    // Initialize products in Firebase
    const productsRef = ref(db, 'products');
    
    const productsObject: { [key: string]: any } = {};
    DEFAULT_PRODUCTS.forEach((product) => {
      productsObject[product.id] = product;
    });

    await set(productsRef, productsObject);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Products initialized successfully',
        productsCount: DEFAULT_PRODUCTS.length 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error initializing products:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to initialize products' },
      { status: 500 }
    );
  }
}
