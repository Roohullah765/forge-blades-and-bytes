import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Upload, Loader2 } from 'lucide-react';
import { Product } from '@/hooks/useProducts';
import { useImageUpload } from '@/hooks/useImageUpload';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ProductFormProps {
  product?: Product;
  onSubmit: () => void;
  onCancel: () => void;
}

export const ProductForm = ({ product, onSubmit, onCancel }: ProductFormProps) => {
  const { uploadImage, uploading } = useImageUpload();
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || '',
    price: product?.price || 0,
    description: product?.description || '',
    stock: product?.stock || 0,
    featured: product?.featured || false,
    rating: product?.rating || 0,
    review_count: product?.review_count || 0,
    features: product?.features || [],
    images: product?.images || [],
    specifications: product?.specifications || {}
  });

  const [newFeature, setNewFeature] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      handleInputChange('features', [...formData.features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    handleInputChange('features', formData.features.filter((_, i) => i !== index));
  };

  const addSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      handleInputChange('specifications', {
        ...formData.specifications,
        [newSpecKey.trim()]: newSpecValue.trim()
      });
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const removeSpecification = (key: string) => {
    const { [key]: removed, ...rest } = formData.specifications;
    handleInputChange('specifications', rest);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      handleInputChange('images', [...formData.images, imageUrl]);
    }
  };

  const removeImage = (index: number) => {
    handleInputChange('images', formData.images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || formData.price <= 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);

      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        rating: Number(formData.rating),
        review_count: Number(formData.review_count),
      };

      if (product) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);

        if (error) throw error;

        toast({
          title: "Product updated",
          description: "The product has been updated successfully.",
        });
      } else {
        // Create new product
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;

        toast({
          title: "Product created",
          description: "The new product has been created successfully.",
        });
      }

      onSubmit();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Save failed",
        description: error instanceof Error ? error.message : "Failed to save product",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chef">Chef Knives</SelectItem>
                  <SelectItem value="paring">Paring Knives</SelectItem>
                  <SelectItem value="santoku">Santoku Knives</SelectItem>
                  <SelectItem value="cleaver">Cleaver Knives</SelectItem>
                  <SelectItem value="pocket">Pocket Knives</SelectItem>
                  <SelectItem value="hunting">Hunting Knives</SelectItem>
                  <SelectItem value="fixed-blade">Fixed Blade Knives</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => handleInputChange('rating', parseFloat(e.target.value) || 0)}
                  placeholder="0.0"
                />
              </div>
              <div>
                <Label htmlFor="review_count">Review Count</Label>
                <Input
                  id="review_count"
                  type="number"
                  min="0"
                  value={formData.review_count}
                  onChange={(e) => handleInputChange('review_count', parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => handleInputChange('featured', e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="featured">Featured Product</Label>
            </div>
          </div>
        </Card>

        {/* Images */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Product Images</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="image-upload">Upload Image</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('image-upload')?.click()}
                  disabled={uploading}
                >
                  {uploading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4 mr-2" />
                  )}
                  Upload Image
                </Button>
              </div>
            </div>

            {formData.images.length > 0 && (
              <div className="space-y-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm truncate">{image.split('/').pop()}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeImage(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Description */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Description</h3>
        <Textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Enter product description"
          rows={4}
        />
      </Card>

      {/* Features */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Features</h3>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Add a feature"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
            />
            <Button type="button" onClick={addFeature}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                <span>{feature}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFeature(index)}
                  className="h-auto p-0 ml-1"
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      {/* Specifications */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Specifications</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Input
              value={newSpecKey}
              onChange={(e) => setNewSpecKey(e.target.value)}
              placeholder="Specification name"
            />
            <div className="flex space-x-2">
              <Input
                value={newSpecValue}
                onChange={(e) => setNewSpecValue(e.target.value)}
                placeholder="Specification value"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecification())}
              />
              <Button type="button" onClick={addSpecification}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            {Object.entries(formData.specifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-sm">
                  <strong>{key}:</strong> {String(value)}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSpecification(key)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving || uploading}>
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {product ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            product ? 'Update Product' : 'Create Product'
          )}
        </Button>
      </div>
    </form>
  );
};