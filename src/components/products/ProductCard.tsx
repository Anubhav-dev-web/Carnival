import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { state, dispatch } = useApp();
  const isInWishlist = state.wishlist.some(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, quantity: 1 }
    });
    toast.success('Added to cart!');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
      toast.success('Removed from wishlist');
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
      toast.success('Added to wishlist!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Wishlist Button OUTSIDE Link */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggleWishlist}
        className={`absolute top-3 right-3 p-2 rounded-full transition-colors z-20 ${
          isInWishlist 
            ? 'bg-red-500 text-white' 
            : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
        }`}
        title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
      </motion.button>

      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.originalPrice && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
          {/* Quick Add to Cart Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Button
              onClick={handleAddToCart}
              className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
              size="sm"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Quick Add
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              {product.category}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-current text-yellow-400" />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {product.rating} ({product.reviewCount})
              </span>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {product.title}
          </h3>

          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}