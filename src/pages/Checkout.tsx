import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Truck, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { ShippingAddress } from '../types';
import toast from 'react-hot-toast';

export function Checkout() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const subtotal = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create order object
    const order = {
      id: Date.now().toString(),
      items: state.cart,
      total: subtotal + shipping + tax,
      status: 'pending' as const,
      orderDate: new Date().toISOString(),
      shippingAddress,
      trackingNumber: `TRK${Date.now().toString().slice(-8)}`,
    };

    // Save order to localStorage
    const savedOrders = JSON.parse(
      localStorage.getItem(`orders_${state.user?.id}`) || '[]'
    );
    savedOrders.push(order);
    localStorage.setItem(
      `orders_${state.user?.id}`,
      JSON.stringify(savedOrders)
    );

    toast.success('Order placed successfully!');
    dispatch({ type: 'CLEAR_CART' });
    setIsProcessing(false);

    // Redirect to orders page
    navigate('/orders');
  };

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Add some items to your cart before checkout.
            </p>
            <Link to="/shop">
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/cart"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Checkout
          </h1>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Shipping Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Shipping Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.name}
                      onChange={(e) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={shippingAddress.email}
                      onChange={(e) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={shippingAddress.phone}
                      onChange={(e) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.address}
                      onChange={(e) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.city}
                      onChange={(e) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          city: e.target.value,
                        }))
                      }
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.state}
                      onChange={(e) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          state: e.target.value,
                        }))
                      }
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.zipCode}
                      onChange={(e) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          zipCode: e.target.value,
                        }))
                      }
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Country *
                    </label>
                    <select
                      required
                      value={shippingAddress.country}
                      onChange={(e) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          country: e.target.value,
                        }))
                      }
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Japan">Japan</option>
                      <option value="UAE">UAE</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Payment Information
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        CVC *
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <Lock className="w-4 h-4 mr-2" />
                  Your payment information is secure and encrypted
                </div>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {state.cart.map((item) => (
                  <div
                    key={
                      item.id +
                      (item.selectedSize || '') +
                      (item.selectedColor || '')
                    }
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Qty: {item.quantity}
                          {item.selectedSize && ` • Size: ${item.selectedSize}`}
                          {item.selectedColor &&
                            ` • Color: ${item.selectedColor}`}
                        </p>
                      </div>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                  <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                isLoading={isProcessing}
                className="w-full mt-6"
                size="lg"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </Button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                By placing your order, you agree to our Terms of Service and
                Privacy Policy.
              </p>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}
