// Policies page with shipping, returns, and legal information
// This covers all important policies and terms for the knife store

import { motion } from 'framer-motion';
import { Truck, RotateCcw, Shield, AlertTriangle, FileText, Scale } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Policies = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Policies & Information
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about shopping with Elite Blade Co., from shipping to warranties.
          </p>
        </motion.div>

        {/* Policy Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="shipping" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="returns">Returns</TabsTrigger>
              <TabsTrigger value="warranty">Warranty</TabsTrigger>
              <TabsTrigger value="age">Age Policy</TabsTrigger>
              <TabsTrigger value="care">Care Guide</TabsTrigger>
              <TabsTrigger value="legal">Legal</TabsTrigger>
            </TabsList>

            {/* Shipping & Delivery */}
            <TabsContent value="shipping" className="space-y-8">
              <Card className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Truck className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">Shipping & Delivery</h2>
                </div>

                <div className="space-y-8">
                  {/* Shipping Options */}
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-4">Shipping Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">Standard Shipping</h4>
                          <Badge>$15.99</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">3-7 business days</p>
                        <p className="text-xs text-muted-foreground">Free on orders over $150</p>
                      </div>
                      <div className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">Express Shipping</h4>
                          <Badge>$29.99</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">1-2 business days</p>
                        <p className="text-xs text-muted-foreground">Available for most locations</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* International Shipping */}
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-4">International Shipping</h3>
                    <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                      <p className="text-muted-foreground">
                        We ship worldwide, but knife laws vary significantly by country and region. 
                        It is the customer's responsibility to ensure compliance with local laws.
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• International shipping rates calculated at checkout</li>
                        <li>• Delivery time: 7-21 business days</li>
                        <li>• Customer responsible for duties, taxes, and customs fees</li>
                        <li>• Some knife types may be restricted in certain countries</li>
                      </ul>
                    </div>
                  </div>

                  <Separator />

                  {/* Delivery Requirements */}
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-4">Delivery Requirements</h3>
                    <div className="bg-destructive/10 border border-destructive/20 p-6 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-destructive mb-2">Adult Signature Required</h4>
                          <p className="text-sm text-muted-foreground">
                            All knife orders require adult signature upon delivery (21+ in some states). 
                            Someone 18 or older must be present to receive the package.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Returns & Exchanges */}
            <TabsContent value="returns" className="space-y-8">
              <Card className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <RotateCcw className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">Returns & Exchanges</h2>
                </div>

                <div className="space-y-8">
                  {/* Return Policy */}
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-4">30-Day Return Policy</h3>
                    <p className="text-muted-foreground mb-4">
                      We want you to be completely satisfied with your purchase. If for any reason you're not happy, 
                      we offer a full 30-day return policy.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-green-600 mb-3">✓ Returnable Items</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Unused knives in original packaging</li>
                          <li>• Items with original tags and documentation</li>
                          <li>• Standard production knives</li>
                          <li>• Accessories and knife care products</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-600 mb-3">✗ Non-Returnable Items</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Used or sharpened knives</li>
                          <li>• Custom or personalized items</li>
                          <li>• Engraved knives</li>
                          <li>• Items damaged by misuse</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Return Process */}
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-4">How to Return</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                        <div>
                          <h4 className="font-semibold">Contact Us</h4>
                          <p className="text-sm text-muted-foreground">Email support@eliteblade.co or call 1-800-KNIVES-1 to initiate return</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                        <div>
                          <h4 className="font-semibold">Receive Return Label</h4>
                          <p className="text-sm text-muted-foreground">We'll email you a prepaid return shipping label</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                        <div>
                          <h4 className="font-semibold">Pack & Ship</h4>
                          <p className="text-sm text-muted-foreground">Pack item in original packaging and ship using our label</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">4</div>
                        <div>
                          <h4 className="font-semibold">Receive Refund</h4>
                          <p className="text-sm text-muted-foreground">Full refund processed within 3-5 business days of receipt</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Warranty */}
            <TabsContent value="warranty" className="space-y-8">
              <Card className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">Lifetime Warranty</h2>
                </div>

                <div className="space-y-8">
                  {/* Warranty Coverage */}
                  <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                    <h3 className="font-display font-semibold text-lg mb-4 text-green-800">
                      What's Covered
                    </h3>
                    <ul className="space-y-2 text-sm text-green-700">
                      <li>• Manufacturing defects in materials and workmanship</li>
                      <li>• Blade defects (chips, cracks from normal use)</li>
                      <li>• Handle defects (loosening, cracking)</li>
                      <li>• Hardware failures (screws, pins, bolsters)</li>
                      <li>• Edge retention issues under normal use</li>
                    </ul>
                  </div>

                  {/* What's Not Covered */}
                  <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                    <h3 className="font-display font-semibold text-lg mb-4 text-red-800">
                      What's Not Covered
                    </h3>
                    <ul className="space-y-2 text-sm text-red-700">
                      <li>• Damage from misuse, abuse, or accidents</li>
                      <li>• Normal wear from regular use</li>
                      <li>• Damage from improper sharpening</li>
                      <li>• Corrosion from improper care</li>
                      <li>• Damage from dishwasher use (if not dishwasher safe)</li>
                    </ul>
                  </div>

                  <Separator />

                  {/* Warranty Service */}
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-4">Warranty Service</h3>
                    <p className="text-muted-foreground mb-4">
                      If your Elite Blade Co. knife develops a defect covered under warranty, we'll repair or replace it at no charge.
                    </p>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>To claim warranty:</strong> Contact our support team with photos of the defect and your order number. 
                        We'll provide a prepaid shipping label for warranty service.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Age Verification */}
            <TabsContent value="age" className="space-y-8">
              <Card className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">Age Verification Policy</h2>
                </div>

                <div className="space-y-8">
                  <div className="bg-destructive/10 border border-destructive/20 p-6 rounded-lg">
                    <h3 className="font-display font-semibold text-lg mb-4 text-destructive">
                      Legal Age Requirements
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Federal and state laws require age verification for knife purchases. We take these requirements seriously 
                      and have implemented strict age verification procedures.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Must be 18+ to purchase any knife</li>
                      <li>• Some states require 21+ for certain knife types</li>
                      <li>• Age verification required at checkout</li>
                      <li>• Adult signature required for delivery</li>
                      <li>• ID may be requested upon delivery</li>
                    </ul>
                  </div>

                  <Separator />

                  {/* State Restrictions */}
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-4">State & Local Restrictions</h3>
                    <p className="text-muted-foreground mb-4">
                      Knife laws vary by state, county, and city. It is the customer's responsibility to know and comply 
                      with all applicable laws in their jurisdiction.
                    </p>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Important:</strong> We cannot ship certain knife types to some locations. 
                        Our checkout system will notify you of any restrictions for your area.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Care Instructions */}
            <TabsContent value="care" className="space-y-8">
              <Card className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">Knife Care Guide</h2>
                </div>

                <div className="space-y-8">
                  {/* General Care */}
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-4">General Care Instructions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-green-600 mb-3">✓ Do</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Hand wash with mild soap</li>
                          <li>• Dry immediately after washing</li>
                          <li>• Store in knife block or magnetic strip</li>
                          <li>• Use cutting boards (wood or plastic)</li>
                          <li>• Sharpen regularly with whetstones</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-600 mb-3">✗ Don't</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Put in dishwasher (unless specified)</li>
                          <li>• Leave wet or soaking</li>
                          <li>• Cut on glass, stone, or metal surfaces</li>
                          <li>• Use for non-food tasks</li>
                          <li>• Store loose in drawers</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Steel-Specific Care */}
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-4">Steel-Specific Care</h3>
                    <div className="space-y-4">
                      <div className="border border-border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Stainless Steel</h4>
                        <p className="text-sm text-muted-foreground">
                          Low maintenance, dishwasher safe (check product specs), resistant to corrosion. 
                          Can be sharpened with whetstones or electric sharpeners.
                        </p>
                      </div>
                      <div className="border border-border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Carbon Steel</h4>
                        <p className="text-sm text-muted-foreground">
                          Requires more care but takes incredible edge. Must be kept dry, may develop patina. 
                          Hand wash only, oil lightly if storing long-term.
                        </p>
                      </div>
                      <div className="border border-border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Damascus Steel</h4>
                        <p className="text-sm text-muted-foreground">
                          Care varies by construction. Follow care instructions for the core steel type. 
                          Avoid abrasive cleaners that can damage the pattern.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Legal Terms */}
            <TabsContent value="legal" className="space-y-8">
              <Card className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Scale className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">Legal Information</h2>
                </div>

                <div className="space-y-8">
                  {/* Terms of Service */}
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-4">Terms of Service</h3>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>
                        By using our website and purchasing our products, you agree to comply with and be bound by these terms. 
                        Elite Blade Co. reserves the right to modify these terms at any time.
                      </p>
                      <p>
                        All products are sold for lawful purposes only. Customers are responsible for compliance with all 
                        applicable federal, state, and local laws regarding knife ownership and carry.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Privacy Policy */}
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-4">Privacy Policy</h3>
                    <div className="space-y-4 text-sm text-muted-foreground">
                      <p>
                        We respect your privacy and are committed to protecting your personal information. We collect only 
                        the information necessary to process your orders and improve our services.
                      </p>
                      <p>
                        Your personal information is never sold to third parties. We use industry-standard security measures 
                        to protect your data and payment information.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Disclaimer */}
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-4">Legal Disclaimer</h3>
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Knives are tools and weapons. Elite Blade Co. is not responsible for injury, damage, or legal issues 
                        resulting from the use, misuse, or possession of our products. Customers assume all responsibility 
                        for safe handling, storage, and legal compliance. This website and its contents are for informational 
                        purposes only and do not constitute legal advice.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Policies;