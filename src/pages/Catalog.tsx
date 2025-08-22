// Product catalog page with filtering by category
// This shows all products or products filtered by category

import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Filter, Grid, List, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { products, getAllCategories, getCategoryDisplayName, type Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const Catalog = () => {
  const { category } = useParams<{ category?: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'rating'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter products by category if specified
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category if specified in URL
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.features.some(feature => 
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [category, searchTerm, sortBy]);

  // Get page title based on category
  const pageTitle = category 
    ? `${getCategoryDisplayName(category as Product['category'])}` 
    : 'All Knives';

  const pageDescription = category
    ? `Browse our premium ${getCategoryDisplayName(category as Product['category']).toLowerCase()} collection`
    : 'Explore our complete collection of premium knives';

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold">
              {pageTitle}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {pageDescription}
            </p>
          </motion.div>

          {/* Category Navigation */}
          {!category && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-8"
            >
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/catalog">
                  <Button
                    variant="outline"
                    className={!category ? 'bg-primary text-primary-foreground' : ''}
                  >
                    All Categories
                  </Button>
                </Link>
                {getAllCategories().map((cat) => (
                  <Link key={cat} to={`/catalog/${cat}`}>
                    <Button
                      variant="outline"
                      className={category === cat ? 'bg-primary text-primary-foreground' : ''}
                    >
                      {getCategoryDisplayName(cat)}
                    </Button>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 bg-card border border-border rounded-lg p-6"
        >
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search knives..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Rating: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* View Mode */}
              <div className="flex items-center space-x-1 border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} knives
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="font-display text-2xl font-semibold mb-4">No knives found</h3>
              <p className="text-muted-foreground mb-8">Try adjusting your search or browse all categories</p>
              <Button asChild>
                <Link to="/catalog">View All Knives</Link>
              </Button>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
            }>
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Catalog;