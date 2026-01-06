/**
 * Flash Deals Service
 * Manages flash deals displayed on homepage (max 12 products)
 */

export interface FlashDeal {
  id: string;
  itemId: string;
  itemName: string;
  image: string;
  price: number | null;
  sizes?: { [size: string]: number };
  discount?: number; // percentage
  order: number; // position on homepage (1-12)
  addedAt: number;
}

/**
 * Maximum products that can be shown as flash deals
 */
export const MAX_FLASH_DEALS = 12;

/**
 * Validate flash deals array
 */
export function validateFlashDeals(deals: FlashDeal[]): boolean {
  if (!Array.isArray(deals)) return false;
  if (deals.length > MAX_FLASH_DEALS) return false;
  
  // Check each deal has required fields
  return deals.every(deal => 
    deal.id && 
    deal.itemId && 
    deal.itemName && 
    typeof deal.order === 'number' &&
    deal.order >= 1 &&
    deal.order <= MAX_FLASH_DEALS
  );
}

/**
 * Sort flash deals by order
 */
export function sortFlashDeals(deals: FlashDeal[]): FlashDeal[] {
  return [...deals].sort((a, b) => a.order - b.order);
}

/**
 * Create flash deal object
 */
export function createFlashDeal(
  itemId: string,
  itemName: string,
  image: string,
  price: number | null,
  order: number,
  sizes?: { [size: string]: number }
): FlashDeal {
  return {
    id: `FD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    itemId,
    itemName,
    image,
    price,
    sizes,
    order,
    addedAt: Date.now(),
  };
}
