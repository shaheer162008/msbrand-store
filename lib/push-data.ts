'use server';

import { ref, set } from 'firebase/database';
import { db } from './firebase';
import productsData from './products.json';

export async function pushProductsToFirebase() {
  try {
    // Push all products
    const productsRef = ref(db, 'products');
    await set(productsRef, productsData.products);

    // Create default categories
    const categoriesRef = ref(db, 'categories');
    const categories = [
      { id: 'food', name: 'Food', icon: 'utensils', active: true },
      { id: 'grocery', name: 'Grocery', icon: 'apple', active: true },
      { id: 'pharmacy', name: 'Pharmacy', icon: 'pills', active: true },
      { id: 'shopping', name: 'Shopping', icon: 'shopping-bag', active: true },
      { id: 'electronics', name: 'Electronics', icon: 'laptop', active: true },
    ];
    
    const categoriesMap: Record<string, unknown> = {};
    categories.forEach(cat => {
      categoriesMap[cat.id] = cat;
    });
    
    await set(categoriesRef, categoriesMap);

    // Create settings
    const settingsRef = ref(db, 'settings');
    await set(settingsRef, {
      storeName: 'MS Brand Store',
      version: '1.0.0',
      lastUpdated: Date.now(),
    });

    return { success: true, message: 'Products pushed to Firebase successfully!' };
  } catch (error) {
    console.error('Error pushing products:', error);
    throw error;
  }
}
