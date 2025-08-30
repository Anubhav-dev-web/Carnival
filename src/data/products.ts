import { Product } from '../types';

export const categories = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Sports',
  'Books',
  'Beauty',
  'Toys',
  'Automotive',
];

export const products: Product[] = [
  {
    id: '1',
    title: 'Wireless Bluetooth Headphones',
    price: 199.99,
    originalPrice: 249.99,
    description:
      'Premium wireless headphones with active noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop',
    ],
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 324,
    colors: ['Black', 'White', 'Blue'],
    inStock: true,
    featured: true,
  },
  {
    id: '2',
    title: 'Premium Cotton T-Shirt',
    price: 29.99,
    description:
      'Soft, breathable cotton t-shirt perfect for everyday wear. Available in multiple colors and sizes.',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
    ],
    category: 'Clothing',
    rating: 4.5,
    reviewCount: 128,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Gray', 'Navy'],
    inStock: true,
    featured: true,
  },
  {
    id: '3',
    title: 'Smart Fitness Watch',
    price: 299.99,
    originalPrice: 399.99,
    description:
      'Advanced fitness tracking with heart rate monitoring, GPS, and 7-day battery life.',
    image:
      'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&h=800&fit=crop',
    ],
    category: 'Electronics',
    rating: 4.7,
    reviewCount: 89,
    colors: ['Black', 'Silver', 'Rose Gold'],
    inStock: true,
    featured: true,
  },
  {
    id: '4',
    title: 'Ergonomic Office Chair',
    price: 449.99,
    description:
      'Professional ergonomic office chair with lumbar support and adjustable height.',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop',
    ],
    category: 'Home & Garden',
    rating: 4.6,
    reviewCount: 156,
    colors: ['Black', 'Gray'],
    inStock: true,
  },
  {
    id: '5',
    title: 'Yoga Mat Premium',
    price: 89.99,
    description:
      'Eco-friendly yoga mat with superior grip and cushioning for all yoga practices.',
    image:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=800&fit=crop',
    ],
    category: 'Sports',
    rating: 4.4,
    reviewCount: 73,
    colors: ['Purple', 'Pink', 'Blue', 'Green'],
    inStock: true,
  },
  {
    id: '6',
    title: 'Leather Backpack',
    price: 159.99,
    description:
      'Handcrafted leather backpack perfect for work or travel. Durable and stylish.',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
    ],
    category: 'Clothing',
    rating: 4.9,
    reviewCount: 201,
    colors: ['Brown', 'Black', 'Tan'],
    inStock: true,
  },
  {
    id: '7',
    title: 'Ceramic Coffee Mug Set',
    price: 39.99,
    description:
      'Set of 4 handmade ceramic coffee mugs. Microwave and dishwasher safe.',
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&h=800&fit=crop',
    ],
    category: 'Home & Garden',
    rating: 4.3,
    reviewCount: 89,
    colors: ['White', 'Blue', 'Green', 'Pink'],
    inStock: true,
  },
  {
    id: '8',
    title: 'Wireless Gaming Mouse',
    price: 79.99,
    description:
      'High-precision wireless gaming mouse with customizable RGB lighting and programmable buttons.',
    image:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop',
    ],
    category: 'Electronics',
    rating: 4.6,
    reviewCount: 156,
    colors: ['Black', 'White'],
    inStock: true,
  },
  {
    id: '9',
    title: 'Organic Face Cream',
    price: 24.99,
    description:
      'Natural organic face cream with anti-aging properties. Suitable for all skin types.',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=800&fit=crop',
    ],
    category: 'Beauty',
    rating: 4.5,
    reviewCount: 203,
    colors: ['White'],
    inStock: true,
  },
  {
    id: '10',
    title: 'Puzzle Board Game',
    price: 19.99,
    description:
      'Family-friendly puzzle board game with 1000 pieces. Perfect for game nights.',
    image:
      'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=800&fit=crop',
    ],
    category: 'Toys',
    rating: 4.2,
    reviewCount: 67,
    colors: ['Multi'],
    inStock: true,
  },
  {
    id: '11',
    title: 'Car Phone Mount',
    price: 34.99,
    description:
      'Universal car phone mount with suction cup. Compatible with all smartphones.',
    image:
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=800&fit=crop',
    ],
    category: 'Automotive',
    rating: 4.4,
    reviewCount: 134,
    colors: ['Black', 'Gray'],
    inStock: true,
  },
  {
    id: '12',
    title: 'Bestseller Novel',
    price: 14.99,
    description:
      'Award-winning novel that has captivated millions of readers worldwide.',
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop',
    ],
    category: 'Books',
    rating: 4.8,
    reviewCount: 892,
    colors: ['Multi'],
    inStock: true,
  },
  {
    id: '13',
    title: 'Running Shoes Pro',
    price: 129.99,
    description:
      'Professional running shoes with advanced cushioning and breathable mesh upper.',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
    ],
    category: 'Sports',
    rating: 4.7,
    reviewCount: 189,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Red', 'Blue'],
    inStock: true,
  },
  {
    id: '14',
    title: 'Denim Jeans Classic',
    price: 59.99,
    description:
      'Classic fit denim jeans with stretch comfort and timeless style.',
    image:
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop',
    ],
    category: 'Clothing',
    rating: 4.6,
    reviewCount: 245,
    sizes: ['30x32', '32x32', '34x32', '36x32', '38x32'],
    colors: ['Blue', 'Black', 'Gray'],
    inStock: true,
  },
  {
    id: '15',
    title: 'Table Lamp Modern',
    price: 89.99,
    description:
      'Contemporary table lamp with adjustable brightness and touch control.',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop',
    ],
    category: 'Home & Garden',
    rating: 4.5,
    reviewCount: 112,
    colors: ['White', 'Black', 'Gold'],
    inStock: true,
  },
  {
    id: '16',
    title: 'Wireless Earbuds Pro',
    price: 149.99,
    originalPrice: 199.99,
    description:
      'Premium wireless earbuds with active noise cancellation and 24-hour battery life. Perfect for workouts and daily use.',
    image:
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop',
    ],
    category: 'Electronics',
    rating: 4.6,
    reviewCount: 178,
    colors: ['Black', 'White', 'Blue'],
    inStock: true,
    featured: true,
  },
];
