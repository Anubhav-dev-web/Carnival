import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Product, User } from '../types';

interface AppState {
  cart: CartItem[];
  wishlist: Product[];
  user: User | null;
  darkMode: boolean;
}

type AppAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; selectedSize?: string; selectedColor?: string } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'LOGOUT' }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'LOAD_PERSISTED_STATE'; payload: Partial<AppState> };

const initialState: AppState = {
  cart: [],
  wishlist: [],
  user: null,
  darkMode: false
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity, selectedSize, selectedColor } = action.payload;
      const existingItem = state.cart.find(
        item => item.id === product.id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === existingItem.id && 
            item.selectedSize === selectedSize && 
            item.selectedColor === selectedColor
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...product, quantity, selectedSize, selectedColor }]
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => 
          !(item.id === action.payload || 
            (item.id + item.selectedSize + item.selectedColor) === action.payload)
        )
      };

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          (item.id + (item.selectedSize || '') + (item.selectedColor || '')) === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'ADD_TO_WISHLIST':
      if (state.wishlist.find(item => item.id === action.payload.id)) {
        return state;
      }
      return { ...state, wishlist: [...state.wishlist, action.payload] };

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload)
      };

    case 'SET_USER':
      return { ...state, user: action.payload };

    case 'LOGOUT':
      // Clear user data and cart/wishlist on logout
      localStorage.removeItem('currentUser');
      localStorage.removeItem(`ecommerce-cart`);
      localStorage.removeItem(`ecommerce-wishlist`);
      return { 
        ...state, 
        user: null, 
        cart: [], 
        wishlist: [] 
      };

    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };

    case 'LOAD_PERSISTED_STATE':
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => {}
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load persisted state from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('ecommerce-cart');
      const savedWishlist = localStorage.getItem('ecommerce-wishlist');
      const savedDarkMode = localStorage.getItem('ecommerce-darkmode');
      const savedUser = localStorage.getItem('currentUser') || localStorage.getItem('ecommerce-user');

      dispatch({
        type: 'LOAD_PERSISTED_STATE',
        payload: {
          cart: savedCart ? JSON.parse(savedCart) : [],
          wishlist: savedWishlist ? JSON.parse(savedWishlist) : [],
          darkMode: savedDarkMode ? JSON.parse(savedDarkMode) : false,
          user: savedUser ? JSON.parse(savedUser) : null
        }
      });
    } catch (error) {
      console.error('Error loading persisted state:', error);
    }
  }, []);

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem('ecommerce-cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('ecommerce-wishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  useEffect(() => {
    localStorage.setItem('ecommerce-darkmode', JSON.stringify(state.darkMode));
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  useEffect(() => {
    localStorage.setItem('ecommerce-user', JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};