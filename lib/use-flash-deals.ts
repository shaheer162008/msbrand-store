import { useEffect, useState } from 'react';

export interface FlashDeal {
  id: string;
  itemId: string;
  itemName: string;
  image: string;
  price: number | null;
  sizes?: { [size: string]: number };
  discount?: number;
  order: number;
  addedAt: number;
}

export function useFlashDeals() {
  const [deals, setDeals] = useState<FlashDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/flash-deals');
      if (!response.ok) throw new Error('Failed to fetch flash deals');
      
      const data = await response.json();
      setDeals(data.deals || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading flash deals');
      setDeals([]);
    } finally {
      setLoading(false);
    }
  };

  const addDeal = async (deal: Omit<FlashDeal, 'id' | 'addedAt'>): Promise<boolean> => {
    try {
      const response = await fetch('/api/flash-deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', deal }),
      });

      if (!response.ok) throw new Error('Failed to add flash deal');
      
      await fetchDeals();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding flash deal');
      return false;
    }
  };

  const removeDeal = async (dealId: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/flash-deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'remove', dealId }),
      });

      if (!response.ok) throw new Error('Failed to remove flash deal');
      
      setDeals(deals.filter(d => d.id !== dealId));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error removing flash deal');
      return false;
    }
  };

  const reorderDeals = async (orderedDeals: FlashDeal[]): Promise<boolean> => {
    try {
      const dealsObj: { [key: string]: FlashDeal } = {};
      orderedDeals.forEach(deal => {
        dealsObj[deal.id] = deal;
      });

      const response = await fetch('/api/flash-deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reorder', deals: dealsObj }),
      });

      if (!response.ok) throw new Error('Failed to reorder flash deals');
      
      setDeals(orderedDeals);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error reordering flash deals');
      return false;
    }
  };

  return {
    deals,
    loading,
    error,
    addDeal,
    removeDeal,
    reorderDeals,
    refetch: fetchDeals,
  };
}
