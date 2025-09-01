import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from './use-toast';

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File, path?: string): Promise<string | null> => {
    try {
      setUploading(true);

      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = path || `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get the public URL
      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      toast({
        title: "Image uploaded successfully",
        description: "Your product image has been uploaded.",
      });

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (url: string): Promise<boolean> => {
    try {
      // Extract the file path from the URL
      const urlParts = url.split('/');
      const filePath = urlParts[urlParts.length - 1];
      const fullPath = `products/${filePath}`;

      const { error } = await supabase.storage
        .from('product-images')
        .remove([fullPath]);

      if (error) {
        throw error;
      }

      toast({
        title: "Image deleted",
        description: "The image has been removed successfully.",
      });

      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "Failed to delete image",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    uploadImage,
    deleteImage,
    uploading
  };
};