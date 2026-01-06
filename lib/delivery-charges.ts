// Delivery charges configuration
export const DELIVERY_CHARGES = {
  TAX_PER_ITEM: 15,
  BASE_DELIVERY_FEE: 75,
  FREE_DELIVERY_KM: 1,
  DISTANCE_BASED: {
    // Up to 10km
    '0-10': 75,
    // Up to 15km
    '10-15': 80,
    // Up to 20km
    '15-20': 95,
    // 25km and above
    '25+': 250,
  },
};

export interface DeliveryCharge {
  itemCount: number;
  tax: number;
  baseFee: number;
  distanceKm: number;
  deliveryFee: number;
  total: number;
}

/**
 * Calculate delivery charges based on items and distance
 * @param itemCount - Number of items in order
 * @param distanceKm - Delivery distance in kilometers
 * @returns Delivery charge breakdown
 */
export function calculateDeliveryCharges(
  itemCount: number,
  distanceKm: number = 0
): DeliveryCharge {
  // Tax per item
  const tax = itemCount * DELIVERY_CHARGES.TAX_PER_ITEM;

  // Base delivery fee
  let deliveryFee = DELIVERY_CHARGES.BASE_DELIVERY_FEE;

  // Check if free delivery applies (only for <= 1km)
  if (distanceKm <= DELIVERY_CHARGES.FREE_DELIVERY_KM) {
    deliveryFee = 0;
  } else if (distanceKm <= 10) {
    deliveryFee = DELIVERY_CHARGES.DISTANCE_BASED['0-10'];
  } else if (distanceKm <= 15) {
    deliveryFee = DELIVERY_CHARGES.DISTANCE_BASED['10-15'];
  } else if (distanceKm <= 20) {
    deliveryFee = DELIVERY_CHARGES.DISTANCE_BASED['15-20'];
  } else {
    // 25km or more
    deliveryFee = DELIVERY_CHARGES.DISTANCE_BASED['25+'];
  }

  return {
    itemCount,
    tax,
    baseFee: DELIVERY_CHARGES.BASE_DELIVERY_FEE,
    distanceKm,
    deliveryFee,
    total: tax + deliveryFee,
  };
}

/**
 * Get delivery fee description
 */
export function getDeliveryFeeDescription(distanceKm: number): string {
  if (distanceKm <= DELIVERY_CHARGES.FREE_DELIVERY_KM) {
    return 'FREE (within 1km)';
  } else if (distanceKm <= 10) {
    return 'RS 75 (up to 10km)';
  } else if (distanceKm <= 15) {
    return 'RS 80 (up to 15km)';
  } else if (distanceKm <= 20) {
    return 'RS 95 (up to 20km)';
  } else {
    return 'RS 250 (25km+)';
  }
}
