// Shopping cart page with localStorage persistence
// This shows items in cart and allows quantity updates

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { getCartFromStorage, updateCartItemQuantity, removeFromCart, type Cart } from '@/utils/cart';
import { getProductById, getCategoryDisplayName } from '@/data/products';

const CartPage = () => {
  const [cart, setCart] = useState<Cart>({ items: [], updatedAt: new Date() });
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from storage on component mount
  useEffect(() => {
    const loadCart = () => {
      const cartData = getCartFromStorage();
      setCart(cartData);
      setIsLoading(false);
    };

    loadCart();
    
    // Listen for storage changes (in case cart is updated from another tab)
    const handleStorageChange = () => {
      loadCart();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Get product details for cart items
  const cartItemsWithProducts = cart.items.map(item => {
    const product = getProductById(item.productId);
    return {
      cartItem: item,
      product
    };
  }).filter(item => item.product !== undefined);

  // Calculate totals
  const subtotal = cartItemsWithProducts.reduce((total, item) => 
    total + (item.product!.price * item.cartItem.quantity), 0
  );
  const shipping = subtotal >= 150 ? 0 : 15.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    const updatedCart = updateCartItemQuantity(productId, newQuantity);
    setCart(updatedCart);
    
    if (newQuantity === 0) {
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    } else {
      toast({
        title: "Quantity updated",
        description: "Cart has been updated.",
      });
    }
  };

  const handleRemoveItem = (productId: string) => {
    const updatedCart = removeFromCart(productId);
    setCart(updatedCart);
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              <h1 className="font-display text-3xl md:text-4xl font-bold">Your Cart is Empty</h1>
              <p className="text-xl text-muted-foreground max-w-md mx-auto">
                Looks like you haven't added any knives to your cart yet.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary-glow">
                <Link to="/catalog">
                  Explore Collection
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/">
                  Back to Home
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItemsWithProducts.map((item, index) => (
              <motion.div
                key={item.cartItem.productId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="w-full md:w-32 h-32 bg-gradient-subtle rounded-lg overflow-hidden">
                      <div className="w-full h-full bg-gradient-primary opacity-10 flex items-center justify-center">
                        <span className="text-2xl font-display font-bold text-primary/40">
                          {item.product!.name.charAt(0)}
                        </span>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <Badge variant="outline" className="text-xs mb-2">
                          {getCategoryDisplayName(item.product!.category)}
                        </Badge>
                        <h3 className="font-display font-semibold text-lg">
                          <Link 
                            to={`/product/${item.product!.id}`}
                            className="hover:text-primary transition-colors"
                          >
                            {item.product!.name}
                          </Link>
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {item.product!.description}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                        {/* Price */}
                        <div className="text-xl font-bold text-primary">
                          ${item.product!.price}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-8 h-8"
                              onClick={() => handleUpdateQuantity(
                                item.cartItem.productId, 
                                item.cartItem.quantity - 1
                              )}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center font-semibold">
                              {item.cartItem.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-8 h-8"
                              onClick={() => handleUpdateQuantity(
                                item.cartItem.productId, 
                                item.cartItem.quantity + 1
                              )}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-destructive hover:text-destructive"
                            onClick={() => handleRemoveItem(item.cartItem.productId)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="p-6 space-y-6 sticky top-8">
              <h2 className="font-display font-semibold text-xl">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="flex items-center">
                    Shipping
                    {shipping === 0 && (
                      <Badge className="ml-2 text-xs bg-green-100 text-green-800">
                        FREE
                      </Badge>
                    )}
                  </span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Add ${(150 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <Button asChild size="lg" className="w-full bg-primary hover:bg-primary-glow">
                  <Link to="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link to="/catalog">
                    Continue Shopping
                  </Link>
                </Button>
              </div>

              {/* Security Badge */}
              <div className="text-center pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  🔒 Secure checkout with 256-bit SSL encryption
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;