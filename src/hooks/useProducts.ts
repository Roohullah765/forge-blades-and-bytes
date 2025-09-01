import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from './use-toast';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  specifications: any;
  features: string[];
  images: string[];
  rating: number;
  review_count: number;
  stock: number;
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProducts(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      toast({
        title: "Error loading products",
        description: "There was a problem loading the products. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    // Set up real-time subscription for product changes
    const channel = supabase
      .channel('products-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        () => {
          fetchProducts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { products, loading, error, refetch: fetchProducts };
};

// Helper functions for compatibility with existing code
export const getProductById = (products: Product[], id: string): Product | null => {
  return products.find(product => product.id === id) || null;
};

export const getFeaturedProducts = (products: Product[]): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (products: Product[], category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getAllCategories = (): string[] => {
  return ['chef', 'paring', 'santoku', 'cleaver', 'pocket', 'hunting', 'fixed-blade'];
};

export const getCategoryDisplayName = (category: string): string => {
  const displayNames: Record<string, string> = {
    'chef': 'Chef Knives',
    'paring': 'Paring Knives', 
    'santoku': 'Santoku Knives',
    'cleaver': 'Cleaver Knives',
    'pocket': 'Pocket Knives',
    'hunting': 'Hunting Knives',
    'fixed-blade': 'Fixed Blade Knives'
  };
  
  return displayNames[category] || category.charAt(0).toUpperCase() + category.slice(1);
};