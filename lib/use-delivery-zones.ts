import { useEffect, useState } from 'react';

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

export function useDeliveryZones() {
  const [zones, setZones] = useState<DeliveryZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchZones();
  }, []);

  const fetchZones = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/delivery-zones');
      if (!response.ok) throw new Error('Failed to fetch zones');
      
      const data = await response.json();
      const zonesArray = Object.values(data.zones || {});
      setZones(zonesArray as DeliveryZone[]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading delivery zones');
      setZones([]);
    } finally {
      setLoading(false);
    }
  };

  const isCityDeliveryAvailable = (city: string): boolean => {
    const zone = zones.find(z => z.city.toLowerCase() === city.toLowerCase());
    return zone?.enabled ?? false;
  };

  const getEnabledCities = (): string[] => {
    return zones.filter(z => z.enabled).map(z => z.city);
  };

  const getZoneErrorMessage = (city: string): string => {
    const enabledCities = getEnabledCities();
    if (enabledCities.length === 0) {
      return 'Delivery service is not available at this moment.';
    }
    return `Delivery is only available in: ${enabledCities.join(', ')}`;
  };

  const toggleZone = async (zoneId: string, enabled: boolean): Promise<boolean> => {
    try {
      const response = await fetch('/api/delivery-zones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle-zone', zoneId, enabled }),
      });

      if (!response.ok) throw new Error('Failed to toggle zone');
      
      const data = await response.json();
      // Update local state
      setZones(zones.map(z => z.id === zoneId ? { ...z, enabled } : z));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating zone');
      return false;
    }
  };

  return {
    zones,
    loading,
    error,
    isCityDeliveryAvailable,
    getEnabledCities,
    getZoneErrorMessage,
    toggleZone,
    refetch: fetchZones,
  };
}
