'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import productsData from '@/lib/products.json';
import { useCart } from '@/lib/cart-context';
import { Star, ShoppingCart, Heart, Share2, Check } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const { addToCart } = useCart();
  
  const product = useMemo(() => {
    return productsData.products.find(p => p.id === productId);
  }, [productId]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTopics, setSelectedTopics] = useState<Record<string, string>>({});
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-lg text-gray-500">Product not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = product.discountedPrice 
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100) 
    : 0;

  const handleAddToCart = () => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      discountedPrice: product.discountedPrice || product.price,
      quantity: quantity,
      image: product.images[0],
      category: product.category,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleTopicChange = (topicName: string, value: string) => {
    setSelectedTopics({
      ...selectedTopics,
      [topicName]: value,
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-gray-900">Home</a>
            <span>/</span>
            <a href={`/${product.category}-hub`} className="hover:text-gray-900 capitalize">
              {product.category} Hub
            </a>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <main className="flex-grow max-w-[1440px] mx-auto px-6 sm:px-8 py-8 sm:py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left: Images */}
          <div>
            {/* Main Image */}
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === idx 
                        ? 'border-orange-500' 
                        : 'border-gray-300 hover:border-orange-500'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500 uppercase tracking-wide">
                {product.category}
              </span>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
                <span className="text-sm text-gray-600">({product.rating})</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {product.name}
            </h1>

            {/* Description */}
            <p className="text-gray-600 mb-6">
              {product.description}
            </p>

            {/* Price Section */}
            <div className="mb-6 pb-6 border-b">
              <div className="flex items-baseline gap-3 mb-3">
                {product.discountedPrice ? (
                  <>
                    <span className="text-4xl font-bold text-green-600">
                      Rs {product.discountedPrice}
                    </span>
                    <span className="text-2xl text-gray-400 line-through">
                      Rs {product.price}
                    </span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{discount}%
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-gray-900">
                    Rs {product.price}
                  </span>
                )}
              </div>

              {/* Flash Deal Badge */}
              {product.deals.isFlashDeal && (
                <div className="inline-block bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-4">
                  <p className="text-red-700 font-semibold text-sm">
                    ⚡ Flash Deal - {product.deals.flashDealDiscount} off
                  </p>
                </div>
              )}

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <Check size={20} className="text-green-600" />
                <span className="text-green-600 font-semibold">In Stock</span>
              </div>
            </div>

            {/* Topics/Options */}
            {product.topics && product.topics.length > 0 && (
              <div className="mb-6 pb-6 border-b">
                <h3 className="font-semibold text-lg mb-4">Options</h3>
                {product.topics.map((topic) => (
                  <div key={topic.name} className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      {topic.name}
                    </label>
                    <select
                      value={selectedTopics[topic.name] || ''}
                      onChange={(e) => handleTopicChange(topic.name, e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select {topic.name}</option>
                      {topic.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Quantity
              </label>
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  −
                </button>
                <span className="w-16 text-center text-lg font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-3 transition-colors duration-200 ${
                  addedToCart
                    ? 'bg-green-600 text-white'
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check size={24} />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={24} />
                    Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* Wishlist & Share */}
            <div className="flex gap-3">
              <button className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Heart size={20} />
                Wishlist
              </button>
              <button className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Share2 size={20} />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-6">Product Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-3">Product Information</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-gray-600 text-sm">Category</dt>
                  <dd className="font-semibold capitalize">{product.category}</dd>
                </div>
                <div>
                  <dt className="text-gray-600 text-sm">Rating</dt>
                  <dd className="font-semibold">{product.rating} / 5</dd>
                </div>
                <div>
                  <dt className="text-gray-600 text-sm">Stock</dt>
                  <dd className="font-semibold text-green-600">In Stock</dd>
                </div>
              </dl>
            </div>

            {/* Coupon Info */}
            {product.deals.couponCode && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-lg mb-3">Special Offer</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Use coupon code to get additional discount
                </p>
                <div className="bg-white border-2 border-blue-500 rounded-lg p-3 flex items-center justify-between">
                  <code className="font-bold text-blue-600">{product.deals.couponCode}</code>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm font-semibold hover:bg-blue-600">
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
