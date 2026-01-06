/**
 * Delivery Zones Service
 * Manages which cities/areas have delivery enabled
 */

export interface DeliveryZone {
  id: string;
  city: string;
  enabled: boolean;
  center?: {
    latitude: number;
    longitude: number;
  };
  radiusKm?: number;
  description?: string;
}

// Default delivery zones for Food Hub
export const DEFAULT_ZONES: DeliveryZone[] = [
  {
    id: 'zone_karachi',
    city: 'Karachi',
    enabled: true,
    center: { latitude: 24.8615, longitude: 67.0099 },
    radiusKm: 30,
    description: 'Karachi metropolitan area',
  },
  {
    id: 'zone_lahore',
    city: 'Lahore',
    enabled: false,
    center: { latitude: 31.5497, longitude: 74.3436 },
    radiusKm: 30,
    description: 'Lahore metropolitan area',
  },
  {
    id: 'zone_islamabad',
    city: 'Islamabad',
    enabled: false,
    center: { latitude: 33.7298, longitude: 73.1786 },
    radiusKm: 30,
    description: 'Islamabad metropolitan area',
  },
];

/**
 * Check if an address is within a delivery zone
 */
export function isAddressInZone(city: string, zones: DeliveryZone[]): boolean {
  const zone = zones.find(z => z.city.toLowerCase() === city.toLowerCase());
  return zone ? zone.enabled : false;
}

/**
 * Get enabled delivery zones
 */
export function getEnabledZones(zones: DeliveryZone[]): DeliveryZone[] {
  return zones.filter(z => z.enabled);
}

/**
 * Check if city is available for delivery
 */
export function isCityDeliveryAvailable(city: string, zones: DeliveryZone[]): boolean {
  const zone = zones.find(z => z.city.toLowerCase() === city.toLowerCase());
  return zone?.enabled ?? false;
}

/**
 * Get zone error message
 */
export function getZoneErrorMessage(city: string, zones: DeliveryZone[]): string {
  const enabledCities = zones.filter(z => z.enabled).map(z => z.city);
  
  if (enabledCities.length === 0) {
    return 'Delivery service is not available at this moment.';
  }
  
  return `Delivery is only available in: ${enabledCities.join(', ')}`;
}
