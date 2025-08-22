// Enhanced Product Card with real images and modern design
// Professional knife product display with hover effects

import { motion } from 'framer-motion';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { addToCart } from '@/utils/cart';
import { toast } from '@/hooks/use-toast';

// Import all knife images
import chefDamascus from '@/assets/chef-damascus.jpg';
import chefGerman from '@/assets/chef-german.jpg';
import santokuHollowed from '@/assets/santoku-hollowed.jpg';
import paringPrecision from '@/assets/paring-precision.jpg';
import pocketTactical from '@/assets/pocket-tactical.jpg';
import huntingDrop from '@/assets/hunting-drop.jpg';
import fixedBushcraft from '@/assets/fixed-bushcraft.jpg';
import cleaverHeavy from '@/assets/cleaver-heavy.jpg';

const imageMap: Record<string, string> = {
  '/src/assets/chef-damascus.jpg': chefDamascus,
  '/src/assets/chef-german.jpg': chefGerman,
  '/src/assets/santoku-hollowed.jpg': santokuHollowed,
  '/src/assets/paring-precision.jpg': paringPrecision,
  '/src/assets/pocket-tactical.jpg': pocketTactical,
  '/src/assets/hunting-drop.jpg': huntingDrop,
  '/src/assets/fixed-bushcraft.jpg': fixedBushcraft,
  '/src/assets/cleaver-heavy.jpg': cleaverHeavy,
};

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product.id, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const productImage = product.images[0] ? imageMap[product.images[0]] || product.images[0] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50">
          {/* Product Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-subtle">
            {productImage ? (
              <img
                src={productImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-primary opacity-20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-primary/60" />
                  </div>
                  <p className="text-sm text-muted-foreground">Product Image</p>
                </div>
              </div>
            )}
            
            {/* Overlay badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.featured && (
                <Badge className="bg-primary text-primary-foreground">
                  Featured
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="destructive">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Hover actions */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="opacity-90 hover:opacity-100"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-5 space-y-3">
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-sm">
              <Badge variant="outline" className="capitalize">
                {product.category.replace('-', ' ')}
              </Badge>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="font-medium">{product.rating}</span>
                <span>({product.reviewCount})</span>
              </div>
            </div>

            {/* Product Name */}
            <h3 className="font-display font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            {/* Key Features */}
            <div className="text-sm text-muted-foreground line-clamp-2">
              {product.features.slice(0, 2).join(' • ')}
            </div>

            {/* Price & Stock */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-2xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                {product.specifications?.origin && (
                  <div className="text-xs text-muted-foreground">
                    Made in {product.specifications.origin}
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">
                  {product.inStock ? 'In stock' : 'Out of stock'}
                </div>
                {product.specifications?.bladeLength && (
                  <div className="text-xs text-muted-foreground">
                    {product.specifications.bladeLength.split(' ')[0]} blade
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProductCard;