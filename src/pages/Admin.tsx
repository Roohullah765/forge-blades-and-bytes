// Professional Admin Panel for Knife Store Management
// Complete CRUD operations for products, orders, and analytics

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Upload,
  Save,
  X,
  Eye,
  DollarSign,
  Users,
  Star,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  specifications: any;
  features: string[];
  images: string[];
  rating: number;
  review_count: number;
  stock: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  total: number;
  currency: string;
  status: string;
  created_at: string;
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'chef',
    price: 0,
    description: '',
    stock: 0,
    featured: false,
    features: [''],
    specifications: {
      bladeLength: '',
      totalLength: '',
      bladeMaterial: '',
      handleMaterial: '',
      weight: '',
      origin: ''
    }
  });

  const categories = ['chef', 'paring', 'santoku', 'cleaver', 'pocket', 'hunting', 'fixed-blade'];
  const orderStatuses = ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'];

  // Load data
  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading products",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading orders",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleSaveProduct = async () => {
    try {
      const productData = {
        ...productForm,
        features: productForm.features.filter(f => f.trim()),
        specifications: productForm.specifications
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);
        if (error) throw error;
        toast({ title: "Product updated successfully" });
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);
        if (error) throw error;
        toast({ title: "Product created successfully" });
      }

      setIsProductModalOpen(false);
      setEditingProduct(null);
      resetProductForm();
      loadProducts();
    } catch (error: any) {
      toast({
        title: "Error saving product",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;
      toast({ title: "Product deleted successfully" });
      loadProducts();
    } catch (error: any) {
      toast({
        title: "Error deleting product",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      toast({ title: "Order status updated" });
      loadOrders();
    } catch (error: any) {
      toast({
        title: "Error updating order",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      category: 'chef',
      price: 0,
      description: '',
      stock: 0,
      featured: false,
      features: [''],
      specifications: {
        bladeLength: '',
        totalLength: '',
        bladeMaterial: '',
        handleMaterial: '',
        weight: '',
        origin: ''
      }
    });
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description || '',
      stock: product.stock,
      featured: product.featured,
      features: product.features.length ? product.features : [''],
      specifications: productForm.specifications || {
        bladeLength: '',
        totalLength: '',
        bladeMaterial: '',
        handleMaterial: '',
        weight: '',
        origin: ''
      }
    });
    setIsProductModalOpen(true);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate stats
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const lowStockProducts = products.filter(p => p.stock < 10).length;

  const addFeature = () => {
    setProductForm(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setProductForm(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  const removeFeature = (index: number) => {
    setProductForm(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your knife store inventory and orders
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-3xl font-bold text-primary">{totalProducts}</p>
              </div>
              <Package className="w-8 h-8 text-primary/60" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-3xl font-bold text-secondary">{totalOrders}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-secondary/60" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-3xl font-bold text-accent">${totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-accent/60" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="text-3xl font-bold text-destructive">{lowStockProducts}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-destructive/60" />
            </div>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
              </TabsList>

              <TabsContent value="products" className="space-y-6">
                {/* Products Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={() => { resetProductForm(); setEditingProduct(null); }}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>
                          {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Product Name *</Label>
                            <Input
                              value={productForm.name}
                              onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="Enter product name"
                            />
                          </div>
                          <div>
                            <Label>Category *</Label>
                            <Select
                              value={productForm.category}
                              onValueChange={(value) => setProductForm(prev => ({ ...prev, category: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map(cat => (
                                  <SelectItem key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Price (USD) *</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={productForm.price}
                              onChange={(e) => setProductForm(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                              placeholder="0.00"
                            />
                          </div>
                          <div>
                            <Label>Stock *</Label>
                            <Input
                              type="number"
                              value={productForm.stock}
                              onChange={(e) => setProductForm(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                              placeholder="0"
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={productForm.description}
                            onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Product description..."
                            rows={3}
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={productForm.featured}
                            onCheckedChange={(checked) => setProductForm(prev => ({ ...prev, featured: checked }))}
                          />
                          <Label>Featured Product</Label>
                        </div>

                        <Separator />

                        {/* Specifications */}
                        <div>
                          <Label className="text-lg">Specifications</Label>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                              <Label>Blade Length</Label>
                              <Input
                                value={productForm.specifications.bladeLength}
                                onChange={(e) => setProductForm(prev => ({
                                  ...prev,
                                  specifications: { ...prev.specifications, bladeLength: e.target.value }
                                }))}
                                placeholder="e.g., 8 inches (20cm)"
                              />
                            </div>
                            <div>
                              <Label>Total Length</Label>
                              <Input
                                value={productForm.specifications.totalLength}
                                onChange={(e) => setProductForm(prev => ({
                                  ...prev,
                                  specifications: { ...prev.specifications, totalLength: e.target.value }
                                }))}
                                placeholder="e.g., 13 inches (33cm)"
                              />
                            </div>
                            <div>
                              <Label>Blade Material</Label>
                              <Input
                                value={productForm.specifications.bladeMaterial}
                                onChange={(e) => setProductForm(prev => ({
                                  ...prev,
                                  specifications: { ...prev.specifications, bladeMaterial: e.target.value }
                                }))}
                                placeholder="e.g., Damascus Steel"
                              />
                            </div>
                            <div>
                              <Label>Handle Material</Label>
                              <Input
                                value={productForm.specifications.handleMaterial}
                                onChange={(e) => setProductForm(prev => ({
                                  ...prev,
                                  specifications: { ...prev.specifications, handleMaterial: e.target.value }
                                }))}
                                placeholder="e.g., Ebony Wood"
                              />
                            </div>
                            <div>
                              <Label>Weight</Label>
                              <Input
                                value={productForm.specifications.weight}
                                onChange={(e) => setProductForm(prev => ({
                                  ...prev,
                                  specifications: { ...prev.specifications, weight: e.target.value }
                                }))}
                                placeholder="e.g., 7.2 oz (204g)"
                              />
                            </div>
                            <div>
                              <Label>Origin</Label>
                              <Input
                                value={productForm.specifications.origin}
                                onChange={(e) => setProductForm(prev => ({
                                  ...prev,
                                  specifications: { ...prev.specifications, origin: e.target.value }
                                }))}
                                placeholder="e.g., Japan"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Features */}
                        <div>
                          <Label className="text-lg">Features</Label>
                          <div className="space-y-2 mt-2">
                            {productForm.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Input
                                  value={feature}
                                  onChange={(e) => updateFeature(index, e.target.value)}
                                  placeholder="Enter feature"
                                />
                                {productForm.features.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeFeature(index)}
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={addFeature}
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add Feature
                            </Button>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
                          <Button 
                            variant="outline" 
                            onClick={() => setIsProductModalOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleSaveProduct}>
                            <Save className="w-4 h-4 mr-2" />
                            {editingProduct ? 'Update' : 'Create'} Product
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Products Table */}
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{product.name}</h3>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Badge variant="outline">
                                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                              </Badge>
                              <span>${product.price}</span>
                              <span>•</span>
                              <span>Stock: {product.stock}</span>
                              {product.featured && (
                                <>
                                  <span>•</span>
                                  <Badge variant="default">Featured</Badge>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditModal(product)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="orders" className="space-y-6">
                {/* Orders Table */}
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{order.order_number}</h3>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{order.customer_name}</span>
                            <span>•</span>
                            <span>{order.customer_email}</span>
                            <span>•</span>
                            <span>${order.total} {order.currency}</span>
                            <span>•</span>
                            <span>{new Date(order.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Select
                            value={order.status}
                            onValueChange={(value) => handleUpdateOrderStatus(order.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {orderStatuses.map(status => (
                                <SelectItem key={status} value={status}>
                                  {status.charAt(0).toUpperCase() + status.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;