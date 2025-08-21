// Cart utility functions with localStorage persistence
// This handles all cart operations and saves data locally

export interface CartItem {
  productId: string;
  quantity: number;
  addedAt: Date;
}

export interface Cart {
  items: CartItem[];
  updatedAt: Date;
}

const CART_STORAGE_KEY = 'elite-blade-cart';

// Get cart from localStorage
export const getCartFromStorage = (): Cart => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...parsed,
        items: parsed.items.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        })),
        updatedAt: new Date(parsed.updatedAt)
      };
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  
  return {
    items: [],
    updatedAt: new Date()
  };
};

// Save cart to localStorage
export const saveCartToStorage = (cart: Cart): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// Add item to cart
export const addToCart = (productId: string, quantity: number = 1): Cart => {
  const cart = getCartFromStorage();
  
  // Check if item already exists
  const existingItemIndex = cart.items.findIndex(item => item.productId === productId);
  
  if (existingItemIndex >= 0) {
    // Update quantity if item exists
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.items.push({
      productId,
      quantity,
      addedAt: new Date()
    });
  }
  
  cart.updatedAt = new Date();
  saveCartToStorage(cart);
  return cart;
};

// Update item quantity in cart
export const updateCartItemQuantity = (productId: string, quantity: number): Cart => {
  const cart = getCartFromStorage();
  
  if (quantity <= 0) {
    // Remove item if quantity is 0 or less
    cart.items = cart.items.filter(item => item.productId !== productId);
  } else {
    // Update quantity
    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex >= 0) {
      cart.items[itemIndex].quantity = quantity;
    }
  }
  
  cart.updatedAt = new Date();
  saveCartToStorage(cart);
  return cart;
};

// Remove item from cart
export const removeFromCart = (productId: string): Cart => {
  const cart = getCartFromStorage();
  cart.items = cart.items.filter(item => item.productId !== productId);
  cart.updatedAt = new Date();
  saveCartToStorage(cart);
  return cart;
};

// Clear entire cart
export const clearCart = (): Cart => {
  const cart: Cart = {
    items: [],
    updatedAt: new Date()
  };
  saveCartToStorage(cart);
  return cart;
};

// Get total number of items in cart
export const getCartItemCount = (): number => {
  const cart = getCartFromStorage();
  return cart.items.reduce((total, item) => total + item.quantity, 0);
};

// Get total price of cart (requires products data)
export const calculateCartTotal = (products: any[]): number => {
  const cart = getCartFromStorage();
  return cart.items.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
};