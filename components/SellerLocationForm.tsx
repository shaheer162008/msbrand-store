'use client';

import { useState } from 'react';
import LocationSelector from './LocationSelector';
import { Location } from '@/lib/location-service';

interface SellerLocationFormProps {
  onLocationSelect: (location: Location) => void;
  value?: Location;
}

export default function SellerLocationForm({ onLocationSelect, value }: SellerLocationFormProps) {
  const [restaurantLocation, setRestaurantLocation] = useState<Location | undefined>(value);

  const handleLocationChange = (location: Location) => {
    setRestaurantLocation(location);
    onLocationSelect(location);
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          <strong>Set Your Restaurant Location</strong>
          <br />
          Select your restaurant location for accurate delivery calculations and customer distance visibility.
        </p>
      </div>

      <LocationSelector
        value={restaurantLocation}
        onChange={handleLocationChange}
        label="Restaurant Location"
        placeholder="Search or select your restaurant location"
      />

      <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600">
        <p className="font-medium mb-2">Why location matters:</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>Accurate distance calculation for delivery fees</li>
          <li>Estimated delivery time for customers</li>
          <li>Show "distance from customer" in your restaurant</li>
          <li>Better local discovery for customers</li>
        </ul>
      </div>
    </div>
  );
}
