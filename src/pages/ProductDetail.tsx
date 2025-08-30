import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
} from 'lucide-react';
import { products } from '../data/products';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import toast from 'react-hot-toast';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Product Not Found
          </h2>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isInWishlist = state.wishlist.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (product.colors && !selectedColor) {
      toast.error('Please select a color');
      return;
    }

    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        quantity,
        selectedSize,
        selectedColor,
      },
    });
    toast.success('Added to cart!');
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
      toast.success('Removed from wishlist');
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
      toast.success('Added to wishlist!');
    }
  };

  const handleBuyNow = () => {
    if (product.sizes && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (product.colors && !selectedColor) {
      toast.error('Please select a color');
      return;
    }
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        quantity,
        selectedSize,
        selectedColor,
      },
    });
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/shop"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex space-x-4 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? 'border-blue-500'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                  {product.category}
                </span>
                <button
                  onClick={handleToggleWishlist}
                  className={`p-2 rounded-full transition-colors ${
                    isInWishlist
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`}
                  />
                </button>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {product.title}
              </h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Options */}
            {(product.sizes || product.colors) && (
              <div className="space-y-4">
                {product.sizes && (
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Size
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border rounded-lg transition-colors ${
                            selectedSize === size
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                              : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.colors && (
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Color
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 border rounded-lg transition-colors ${
                            selectedColor === color
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                              : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart & Buy Now */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleAddToCart} className="flex-1" size="lg">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="sm:w-auto"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                <Truck className="w-5 h-5 text-green-500" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                <RotateCcw className="w-5 h-5 text-blue-500" />
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                <Shield className="w-5 h-5 text-purple-500" />
                <span>1-year warranty included</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
