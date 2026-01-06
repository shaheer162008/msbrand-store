'use client';

import { useState, useEffect } from 'react';
import { MapPin, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { Address, SellerProfile } from '@/lib/auth-context';
import {
  calculateDistance,
  getDeliverySummary,
  isValidLocation,
  Location,
} from '@/lib/location-service';

interface DeliveryConfirmationProps {
  address: Address;
  sellerLocation?: Location;
  itemCount: number;
  onConfirm: (summary: any) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export default function DeliveryConfirmation({
  address,
  sellerLocation,
  itemCount,
  onConfirm,
  onCancel,
  isOpen,
}: DeliveryConfirmationProps) {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Calculate delivery summary when addresses are ready
  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      // Check if address has valid coordinates
      if (address.latitude !== undefined && address.longitude !== undefined && sellerLocation) {
        try {
          const addressLocation: Location = {
            latitude: address.latitude,
            longitude: address.longitude,
          };

          if (isValidLocation(addressLocation)) {
            const distance = calculateDistance(sellerLocation, addressLocation);
            const deliverySummary = getDeliverySummary(distance, itemCount);
            setSummary(deliverySummary);
          }
        } catch (error) {
          console.error('Error calculating delivery:', error);
        }
      }
      setLoading(false);
    }, 300);
  }, [isOpen, address, sellerLocation, itemCount]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Confirm Delivery</h2>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Calculating delivery...</p>
          </div>
        ) : summary ? (
          <div className="space-y-4">
            {/* Delivery Address */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">{address.label}</p>
                  <p className="text-sm text-gray-600">{address.street}</p>
                  <p className="text-sm text-gray-600">
                    {address.city}, {address.zipCode}
                  </p>
                </div>
              </div>
            </div>

            {/* Distance & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {summary.distance}
                  <span className="text-sm">km</span>
                </p>
                <p className="text-xs text-gray-600">Distance</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <p className="text-2xl font-bold text-gray-900">{summary.estimatedTimeMinutes}</p>
                </div>
                <p className="text-xs text-gray-600">Est. time</p>
              </div>
            </div>

            {/* Charges Breakdown */}
            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
              <p className="font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Delivery Charges
              </p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax ({itemCount} items × RS 15)</span>
                  <span className="font-medium text-gray-900">RS {summary.tax}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{summary.chargesString}</span>
                  <span className="font-medium text-gray-900">
                    {summary.deliveryFee === 0 ? 'FREE' : `RS ${summary.deliveryFee}`}
                  </span>
                </div>
                <div className="border-t pt-1 flex justify-between font-semibold">
                  <span className="text-gray-900">Total Charges</span>
                  <span className="text-blue-600">RS {summary.totalCharges}</span>
                </div>
              </div>
            </div>

            {/* Info Message */}
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-green-700">
                These are estimated charges based on your delivery location. Final charges may vary based on traffic and actual route.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
              >
                Change Address
              </button>
              <button
                onClick={() => onConfirm(summary)}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
              >
                Confirm & Continue
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Unable to calculate delivery charges</p>
            <button
              onClick={onCancel}
              className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
