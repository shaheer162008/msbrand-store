'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { addMenuItem } from '@/lib/menu-service';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AddItemPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '',
    sizes: {
      Small: '',
      Medium: '',
      Large: '',
      Family: '',
    },
    hasSize: false,
  });

  const [toppings, setToppings] = useState<{ name: string; price: string }[]>([
    { name: '', price: '' },
  ]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated || user?.userType !== 'seller') {
    return null;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    field?: string
  ) => {
    const { name, value, type } = e.target;

    if (field === 'sizes') {
      setFormData((prev) => ({
        ...prev,
        sizes: {
          ...prev.sizes,
          [name]: value,
        },
      }));
    } else if (name === 'hasSize') {
      setFormData((prev) => ({
        ...prev,
        hasSize: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleToppingChange = (
    index: number,
    field: 'name' | 'price',
    value: string
  ) => {
    const newToppings = [...toppings];
    newToppings[index][field] = value;
    setToppings(newToppings);
  };

  const addToppingField = () => {
    setToppings([...toppings, { name: '', price: '' }]);
  };

  const removeToppingField = (index: number) => {
    const newToppings = toppings.filter((_, i) => i !== index);
    setToppings(newToppings);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (!formData.name || !formData.category || !formData.image) {
        throw new Error('Please fill in required fields');
      }

      if (!formData.hasSize && !formData.price) {
        throw new Error('Please enter either a fixed price or sizes');
      }

      // Prepare item data
      const itemData: any = {
        name: formData.name,
        category: formData.category,
        image: formData.image,
        description: formData.description,
        isAvailable: true,
      };

      // Add price or sizes
      if (formData.hasSize) {
        itemData.sizes = {};
        Object.entries(formData.sizes).forEach(([size, price]) => {
          if (price) {
            itemData.sizes[size] = parseInt(price);
          }
        });
      } else {
        itemData.price = parseInt(formData.price);
      }

      // Add toppings if provided
      const filteredToppings = toppings.filter((t) => t.name && t.price);
      if (filteredToppings.length > 0) {
        itemData.toppings = filteredToppings.map((t) => ({
          name: t.name,
          price: parseInt(t.price),
        }));
      }

      await addMenuItem(user!.uid, itemData);
      router.push('/seller-dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to add item');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-8">
        <Link
          href="/seller-dashboard"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-lg p-8 shadow">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Add New Menu Item</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Item Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Item Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Chicken Tikka Pizza"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select category</option>
                <option value="Pizzas">Pizzas</option>
                <option value="Pizzeria Special Pizza">Pizzeria Special Pizza</option>
                <option value="Crust Special">Crust Special</option>
                <option value="Burgers">Burgers</option>
                <option value="Fries">Fries</option>
                <option value="Wraps">Wraps</option>
                <option value="Shawarma">Shawarma</option>
                <option value="Pasta">Pasta</option>
                <option value="Shakes & Ice Cream">Shakes & Ice Cream</option>
                <option value="Deals & Family Boxes">Deals & Family Boxes</option>
              </select>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe this item..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Size vs Price */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="hasSize"
                  checked={formData.hasSize}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="font-medium text-gray-900">
                  This item has different sizes
                </span>
              </label>
            </div>

            {/* Price or Sizes */}
            {!formData.hasSize ? (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (RS) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., 650"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={!formData.hasSize}
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(formData.sizes).map((size) => (
                  <div key={size}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {size} (RS)
                    </label>
                    <input
                      type="number"
                      name={size}
                      value={formData.sizes[size as keyof typeof formData.sizes]}
                      onChange={(e) => handleInputChange(e, 'sizes')}
                      placeholder={`Price for ${size}`}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Toppings */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Optional Add-ons/Toppings
              </h3>

              {toppings.map((topping, index) => (
                <div key={index} className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Topping name (e.g., Extra Cheese)"
                    value={topping.name}
                    onChange={(e) => handleToppingChange(index, 'name', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Price (RS)"
                    value={topping.price}
                    onChange={(e) => handleToppingChange(index, 'price', e.target.value)}
                    className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {toppings.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeToppingField(index)}
                      className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addToppingField}
                className="mt-2 text-blue-600 hover:text-blue-700 font-semibold"
              >
                + Add Another Topping
              </button>
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-6 border-t">
              <Link
                href="/seller-dashboard"
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
              >
                {submitting ? 'Adding Item...' : 'Add Item'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
