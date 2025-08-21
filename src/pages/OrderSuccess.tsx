// Order success page after completing checkout
// This shows order confirmation with fake order details

import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Mail, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('order') || `EBC${Date.now().toString().slice(-6)}`;
  const [estimatedDelivery, setEstimatedDelivery] = useState<string>('');

  useEffect(() => {
    // Calculate estimated delivery date (3-7 business days from now)
    const today = new Date();
    const deliveryDays = Math.floor(Math.random() * 5) + 3; // 3-7 days
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + deliveryDays);
    
    setEstimatedDelivery(deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
  }, []);

  // Mock order details
  const orderDetails = {
    orderNumber,
    orderDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    email: 'customer@example.com', // In real app, this would come from checkout form
    trackingNumber: `1Z${Math.random().toString(36).substring(2, 15).toUpperCase()}`,
    estimatedDelivery
  };

  return (
    <div className="min-h-screen py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-green-600 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-xl text-muted-foreground">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </motion.div>

          {/* Order Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 shadow-elegant">
              <div className="space-y-6">
                {/* Order Number */}
                <div className="text-center">
                  <h2 className="font-display text-2xl font-semibold mb-2">Order #{orderNumber}</h2>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Confirmed
                  </Badge>
                </div>

                <Separator />

                {/* Order Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Order Date</h3>
                        <p className="text-muted-foreground">{orderDetails.orderDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Confirmation Email</h3>
                        <p className="text-muted-foreground">Sent to {orderDetails.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Package className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Tracking Number</h3>
                        <p className="text-muted-foreground font-mono text-sm">{orderDetails.trackingNumber}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Estimated Delivery</h3>
                        <p className="text-muted-foreground">{orderDetails.estimatedDelivery}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Important Information */}
                <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                  <h3 className="font-display font-semibold text-lg">What happens next?</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                      <span>You'll receive a confirmation email with your order details</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                      <span>We'll send tracking information when your order ships</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                      <span>Adult signature will be required upon delivery</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                      <span>Your knives will be carefully packaged and insured</span>
                    </li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="flex-1 bg-primary hover:bg-primary-glow">
                    <Link to="/catalog">
                      Continue Shopping
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="flex-1">
                    <Link to="/contact">
                      Contact Support
                    </Link>
                  </Button>
                </div>

                {/* Social Sharing */}
                <div className="text-center pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">
                    Share your new knives with the community!
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button variant="outline" size="sm">
                      Share on Facebook
                    </Button>
                    <Button variant="outline" size="sm">
                      Share on Instagram
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center"
          >
            <Card className="p-6">
              <h3 className="font-display font-semibold text-lg mb-4">Need Help?</h3>
              <p className="text-muted-foreground mb-4">
                Our customer service team is here to help with any questions about your order.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link to="/contact">Contact Us</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/policies">Shipping & Returns</Link>
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-8"
          >
            <Button asChild variant="ghost">
              <Link to="/">
                ← Back to Home
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;