import { ref, set, get, update, remove, onValue } from 'firebase/database';
import { db } from './firebase';

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price?: number;
  description?: string;
  image: string;
  sizes?: {
    [size: string]: number;
  };
  toppings?: {
    name: string;
    price: number;
  }[];
  sellerId: string;
  isAvailable: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface FoodCategory {
  category: string;
  items: MenuItem[];
}

// Get menu items for a seller (real-time)
export const subscribeToSellerMenu = (
  sellerId: string,
  callback: (items: MenuItem[]) => void
) => {
  const menuRef = ref(db, `foodMenu/${sellerId}`);
  
  const unsubscribe = onValue(menuRef, (snapshot) => {
    if (snapshot.exists()) {
      const menuData = snapshot.val();
      const itemsList = Object.values(menuData) as MenuItem[];
      callback(itemsList);
    } else {
      callback([]);
    }
  });

  return unsubscribe;
};

// Get all menu items by category (real-time)
export const subscribeToFoodByCategory = (
  category: string,
  callback: (items: MenuItem[]) => void
) => {
  const menuRef = ref(db, 'foodMenu');
  
  const unsubscribe = onValue(menuRef, (snapshot) => {
    if (snapshot.exists()) {
      const allSellerMenus = snapshot.val();
      const items: MenuItem[] = [];

      // Iterate through all sellers
      Object.keys(allSellerMenus).forEach((sellerId) => {
        const sellerMenu = allSellerMenus[sellerId];
        Object.keys(sellerMenu).forEach((itemId) => {
          const item = sellerMenu[itemId];
          if (item.category.toLowerCase() === category.toLowerCase()) {
            items.push(item);
          }
        });
      });

      callback(items);
    } else {
      callback([]);
    }
  });

  return unsubscribe;
};

// Add menu item
export const addMenuItem = async (sellerId: string, item: Omit<MenuItem, 'id' | 'sellerId' | 'createdAt' | 'updatedAt'>) => {
  try {
    const itemId = `item_${Date.now()}`;
    const now = Date.now();
    const menuItem: MenuItem = {
      ...item,
      id: itemId,
      sellerId,
      createdAt: now,
      updatedAt: now,
    };

    const itemRef = ref(db, `foodMenu/${sellerId}/${itemId}`);
    await set(itemRef, menuItem);
    return itemId;
  } catch (error) {
    console.error('Error adding menu item:', error);
    throw error;
  }
};

// Update menu item
export const updateMenuItem = async (
  sellerId: string,
  itemId: string,
  updates: Partial<MenuItem>
) => {
  try {
    const itemRef = ref(db, `foodMenu/${sellerId}/${itemId}`);
    await update(itemRef, { ...updates, updatedAt: Date.now() });
  } catch (error) {
    console.error('Error updating menu item:', error);
    throw error;
  }
};

// Delete menu item
export const deleteMenuItem = async (sellerId: string, itemId: string) => {
  try {
    const itemRef = ref(db, `foodMenu/${sellerId}/${itemId}`);
    await remove(itemRef);
  } catch (error) {
    console.error('Error deleting menu item:', error);
    throw error;
  }
};

// Bulk add menu items
export const bulkAddMenuItems = async (sellerId: string, items: Omit<MenuItem, 'id' | 'sellerId' | 'createdAt' | 'updatedAt'>[]) => {
  try {
    const now = Date.now();
    const updates: { [key: string]: MenuItem } = {};

    items.forEach((item, index) => {
      const itemId = `item_${Date.now()}_${index}`;
      const menuItem: MenuItem = {
        ...item,
        id: itemId,
        sellerId,
        createdAt: now,
        updatedAt: now,
      };
      updates[`foodMenu/${sellerId}/${itemId}`] = menuItem;
    });

    // Use update instead of set for bulk operations
    await update(ref(db), updates);
  } catch (error) {
    console.error('Error bulk adding menu items:', error);
    throw error;
  }
};
