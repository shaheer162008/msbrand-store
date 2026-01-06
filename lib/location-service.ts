/**
 * Location and Distance Calculation Service
 * Uses Haversine formula to calculate distance between two coordinates
 */

export interface Location {
  latitude: number;
  longitude: number;
}

/**
 * Calculate distance between two geographic points using Haversine formula
 * @param from - Starting location (lat, lng)
 * @param to - Ending location (lat, lng)
 * @returns Distance in kilometers
 */
export function calculateDistance(from: Location, to: Location): number {
  const R = 6371; // Earth's radius in kilometers
  
  const lat1 = toRadians(from.latitude);
  const lat2 = toRadians(to.latitude);
  const deltaLat = toRadians(to.latitude - from.latitude);
  const deltaLng = toRadians(to.longitude - from.longitude);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km

  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Get delivery fee based on distance
 * @param distanceKm - Distance in kilometers
 * @returns Delivery fee in rupees
 */
export function getDeliveryFeeByDistance(distanceKm: number): number {
  if (distanceKm <= 1) {
    return 0; // Free delivery up to 1km
  } else if (distanceKm <= 10) {
    return 75;
  } else if (distanceKm <= 15) {
    return 80;
  } else if (distanceKm <= 20) {
    return 95;
  } else {
    // 25km or more
    return 250;
  }
}

/**
 * Get estimated delivery time in minutes
 * @param distanceKm - Distance in kilometers
 * @returns Estimated time in minutes
 */
export function getEstimatedDeliveryTime(distanceKm: number): number {
  // Assume average speed of 25 km/h in city + 5 minutes preparation
  const travelTime = Math.ceil((distanceKm / 25) * 60);
  const preparationTime = 5;
  return travelTime + preparationTime;
}

/**
 * Get readable distance string
 * @param distanceKm - Distance in kilometers
 * @returns Formatted string
 */
export function getDistanceString(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m away`;
  } else if (distanceKm < 2) {
    return `${distanceKm.toFixed(1)} km away`;
  } else {
    return `${distanceKm.toFixed(1)} km away`;
  }
}

/**
 * Get readable delivery charge string
 * @param distanceKm - Distance in kilometers
 * @returns Formatted string
 */
export function getDeliveryChargeString(distanceKm: number): string {
  const fee = getDeliveryFeeByDistance(distanceKm);
  
  if (fee === 0) {
    return 'FREE (within 1km)';
  }
  
  if (distanceKm <= 10) {
    return `RS ${fee} (up to 10km)`;
  } else if (distanceKm <= 15) {
    return `RS ${fee} (up to 15km)`;
  } else if (distanceKm <= 20) {
    return `RS ${fee} (up to 20km)`;
  } else {
    return `RS ${fee} (25km+)`;
  }
}

/**
 * Parse address from Google Maps or user input
 * In real app, would use Google Geocoding API
 */
export function parseAddressForLocation(address: string, city: string): Location | null {
  // This is a placeholder - in production use Google Geocoding API
  // For now, return null - will be set via map selection
  return null;
}

/**
 * Validate coordinates are within reasonable bounds
 */
export function isValidLocation(location: Location | undefined): location is Location {
  if (!location) return false;
  return (
    typeof location.latitude === 'number' &&
    typeof location.longitude === 'number' &&
    location.latitude >= -90 &&
    location.latitude <= 90 &&
    location.longitude >= -180 &&
    location.longitude <= 180
  );
}

/**
 * Get delivery summary
 */
export function getDeliverySummary(distanceKm: number, itemCount: number) {
  const taxPerItem = 15;
  const tax = itemCount * taxPerItem;
  const deliveryFee = getDeliveryFeeByDistance(distanceKm);
  const estimatedTime = getEstimatedDeliveryTime(distanceKm);

  return {
    distance: distanceKm,
    distanceString: getDistanceString(distanceKm),
    tax,
    deliveryFee,
    chargesString: getDeliveryChargeString(distanceKm),
    estimatedTimeMinutes: estimatedTime,
    estimatedTimeString: `${estimatedTime} mins`,
    totalCharges: tax + deliveryFee,
  };
}
