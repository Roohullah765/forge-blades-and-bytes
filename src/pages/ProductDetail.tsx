// Individual product detail page
// This shows detailed information about a specific knife with add to cart functionality

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Plus, Minus, ShoppingCart, Shield, Truck, ArrowLeft, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { getProductById, getCategoryDisplayName } from '@/data/products';
import { addToCart } from '@/utils/cart';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Find the product
  const product = id ? getProductById(id) : null;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-display text-4xl font-bold">Product Not Found</h1>
          <p className="text-muted-foreground">The knife you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/catalog">Browse All Knives</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    toast({
      title: "Added to cart!",
      description: `${quantity}x ${product.name} added to your cart.`,
    });
  };

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-sm text-muted-foreground mb-8"
        >
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-primary transition-colors">Catalog</Link>
          <span>/</span>
          <Link to={`/catalog/${product.category}`} className="hover:text-primary transition-colors">
            {getCategoryDisplayName(product.category)}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </motion.nav>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" asChild>
            <Link to="/catalog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Catalog
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="aspect-square bg-gradient-subtle rounded-xl overflow-hidden shadow-steel">
              <div className="w-full h-full bg-gradient-primary opacity-5 flex items-center justify-center">
                <div className="text-6xl font-display font-bold text-primary/20">
                  {product.name.charAt(0)}
                </div>
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 bg-gradient-subtle rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-primary opacity-10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary/40">{index + 1}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Category Badge */}
            <div>
              <Badge variant="outline" className="mb-4">
                {getCategoryDisplayName(product.category)}
              </Badge>
              {product.featured && (
                <Badge className="ml-2 bg-secondary text-secondary-foreground">
                  Featured
                </Badge>
              )}
            </div>

            {/* Title and Rating */}
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-primary fill-current'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                  <span className="text-lg font-semibold ml-2">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-primary">
              ${product.price}
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
              </span>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={quantity >= 10}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary-glow"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <Card className="p-6">
              <h3 className="font-display font-semibold text-lg mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
                <Shield className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-semibold text-sm">Lifetime Warranty</h4>
                  <p className="text-xs text-muted-foreground">Guaranteed quality</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
                <Truck className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-semibold text-sm">Free Shipping</h4>
                  <p className="text-xs text-muted-foreground">On orders over $150</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Detailed Information Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <Tabs defaultValue="specifications" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="care">Care Instructions</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="space-y-6">
              <Card className="p-6">
                <h3 className="font-display font-semibold text-xl mb-6">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                      <span className="font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="care" className="space-y-6">
              <Card className="p-6">
                <h3 className="font-display font-semibold text-xl mb-6">Care & Maintenance</h3>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Cleaning</h4>
                    <p>Hand wash with mild soap and warm water. Dry immediately with a soft cloth to prevent water spots and corrosion.</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Sharpening</h4>
                    <p>Use whetstones for best results. Start with coarse grit and progress to fine. Maintain the original bevel angle for optimal performance.</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Storage</h4>
                    <p>Store in a knife block, magnetic strip, or blade guard. Avoid storing loose in drawers to prevent damage to the edge.</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Card className="p-6">
                <h3 className="font-display font-semibold text-xl mb-6">Customer Reviews</h3>
                <div className="text-center py-8 text-muted-foreground">
                  <p>Reviews feature coming soon...</p>
                  <p className="text-sm mt-2">Currently showing {product.reviewCount} reviews with average rating of {product.rating}/5</p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;