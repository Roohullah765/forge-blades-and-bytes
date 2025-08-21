// Home page with hero section, featured products, and categories
// This is the main landing page showcasing the knife store

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getFeaturedProducts, getAllCategories, getCategoryDisplayName } from '@/data/products';

const Home = () => {
  const featuredProducts = getFeaturedProducts();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-gradient py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/30"></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Hero Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                ⚔️ Premium Knives Since 1892
              </Badge>
            </motion.div>

            {/* Hero Title */}
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Elite Craftsmanship
              <br />
              <span className="text-white/90">Timeless Blades</span>
            </h1>

            {/* Hero Description */}
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover our curated collection of premium knives, from professional chef's tools to rugged outdoor companions. Each blade is crafted with precision and built to last generations.
            </p>

            {/* Hero CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-glow text-lg px-8 py-6"
              >
                <Link to="/catalog">
                  Explore Collection
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-white/50 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-6"
              >
                <Link to="/about">
                  Our Heritage
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute top-10 left-10 hidden lg:block">
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-20 h-20 bg-white/10 rounded-full blur-xl"
            />
          </div>
          <div className="absolute bottom-20 right-20 hidden lg:block">
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="w-32 h-32 bg-white/5 rounded-full blur-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Lifetime Warranty', desc: 'Confidence in every blade' },
              { icon: Award, title: 'Master Crafted', desc: 'By skilled artisans' },
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $150' },
              { icon: Star, title: '5-Star Reviews', desc: 'Trusted by thousands' }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center space-y-3"
              >
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold">Shop by Category</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find the perfect blade for every purpose, from kitchen essentials to outdoor adventures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.slice(0, 4).map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group hover-lift hover:shadow-steel cursor-pointer overflow-hidden">
                  <Link to={`/catalog/${category}`} className="block">
                    <div className="aspect-square bg-gradient-subtle p-8 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity" />
                      <div className="text-4xl font-display font-bold text-primary/20 group-hover:text-primary/30 transition-colors">
                        {getCategoryDisplayName(category).charAt(0)}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {getCategoryDisplayName(category)}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Premium {category} knives for every need
                      </p>
                    </div>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/catalog">
                View All Categories
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold">Featured Blades</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked selections from our master craftsmen collection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 3).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <Card className="group hover-lift hover:shadow-elegant overflow-hidden">
                  <Link to={`/product/${product.id}`}>
                    <div className="aspect-[4/3] bg-gradient-subtle relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-secondary text-secondary-foreground">
                          Featured
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 text-white/80">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-3">
                        <Badge variant="outline" className="text-xs">
                          {getCategoryDisplayName(product.category)}
                        </Badge>
                      </div>
                      <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xl text-primary">
                          ${product.price}
                        </span>
                        <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-primary hover:bg-primary-glow">
              <Link to="/catalog">
                View All Featured
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Join the Elite Blade Community
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Get exclusive access to limited editions, care tips, and special offers from master craftsmen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-secondary hover:bg-white/90"
              >
                <Link to="/contact">
                  Get Started
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-white/50 text-white hover:bg-white/10"
              >
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;