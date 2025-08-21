import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const CheckoutCancel = () => {
  return (
    <div className="min-h-screen py-16 bg-muted/20 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Card className="p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 mx-auto mb-6 bg-destructive/10 rounded-full flex items-center justify-center"
            >
              <XCircle className="w-8 h-8 text-destructive" />
            </motion.div>
            
            <h1 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Payment Cancelled
            </h1>
            
            <p className="text-muted-foreground mb-8">
              Your payment was cancelled. Don't worry, no charges were made to your account. 
              Your cart items are still saved and waiting for you.
            </p>
            
            <div className="space-y-4">
              <Button asChild size="lg" className="w-full">
                <Link to="/cart">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Return to Cart
                </Link>
              </Button>
              
              <Button variant="outline" asChild size="lg" className="w-full">
                <Link to="/catalog">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutCancel;