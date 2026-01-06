'use client';

import { useState, useEffect } from 'react';
import { MapPin, Search, AlertCircle } from 'lucide-react';
import { Location, isValidLocation } from '@/lib/location-service';

interface LocationSelectorProps {
  value?: Location;
  onChange: (location: Location) => void;
  label?: string;
  placeholder?: string;
  showMap?: boolean;
}

export default function LocationSelector({
  value,
  onChange,
  label = 'Select Location',
  placeholder = 'Enter address or click on map',
  showMap = true,
}: LocationSelectorProps) {
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(value);

  // Common locations in Pakistan (for demo)
  const PRESET_LOCATIONS: { [key: string]: Location } = {
    'Karachi - Clifton': { latitude: 24.7906, longitude: 67.0081 },
    'Karachi - Defence': { latitude: 24.8065, longitude: 67.0534 },
    'Karachi - Gulberg': { latitude: 24.8189, longitude: 67.0842 },
    'Karachi - DHA': { latitude: 24.8241, longitude: 67.1173 },
    'Karachi - Downtown': { latitude: 24.9256, longitude: 67.0822 },
    'Lahore - Defence': { latitude: 31.5725, longitude: 74.3537 },
    'Lahore - Gulberg': { latitude: 31.5497, longitude: 74.3557 },
    'Lahore - Old City': { latitude: 31.5497, longitude: 74.3244 },
    'Islamabad - F-7': { latitude: 33.7306, longitude: 73.1899 },
    'Islamabad - G-11': { latitude: 33.7686, longitude: 73.1764 },
  };

  const handleSearch = (query: string) => {
    setSearchInput(query);
    setError('');

    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    // Filter preset locations
    const matches = Object.entries(PRESET_LOCATIONS).filter(([key]) =>
      key.toLowerCase().includes(query.toLowerCase())
    );

    setSuggestions(matches.map(([, loc]) => loc));
  };

  const handleSelectLocation = (location: Location) => {
    setSelectedLocation(location);
    onChange(location);
    setSearchInput('');
    setSuggestions([]);
  };

  const handleGetCurrentLocation = () => {
    setLoading(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location: Location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setSelectedLocation(location);
        onChange(location);
        setLoading(false);
      },
      (error) => {
        setError('Unable to get your location. Please enable location access.');
        setLoading(false);
      }
    );
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>

      {/* Search Input */}
      <div className="relative">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={placeholder}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="button"
            onClick={handleGetCurrentLocation}
            disabled={loading}
            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 text-blue-600 rounded-lg transition flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            {loading ? 'Getting...' : 'Current'}
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {suggestions.map((location, index) => {
              const locationName = Object.entries(PRESET_LOCATIONS).find(
                ([, loc]) => loc.latitude === location.latitude && loc.longitude === location.longitude
              )?.[0];

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelectLocation(location)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b last:border-b-0 flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{locationName}</p>
                    <p className="text-xs text-gray-500">
                      {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Selected Location Display */}
      {isValidLocation(selectedLocation) && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800 font-medium">✓ Location Selected</p>
          <p className="text-xs text-green-700 mt-1">
            {selectedLocation.latitude.toFixed(4)}, {selectedLocation.longitude.toFixed(4)}
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="text-xs text-gray-600">
        <p className="font-medium mb-2">Quick select:</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(PRESET_LOCATIONS)
            .slice(0, 6)
            .map(([name, location]) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  handleSelectLocation(location);
                  setSearchInput(name);
                }}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs transition"
              >
                {name.split(' - ')[1]}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
