import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useProducts, Product } from '@/hooks/useProducts';
import { ProductForm } from '@/components/admin/ProductForm';
import AdminAuth from '@/components/AdminAuth';

const Admin = () => {
  console.log('Admin component starting...');
  
  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center">
      <div className="text-white text-4xl font-bold">
        ADMIN TEST - THIS SHOULD BE VISIBLE
      </div>
    </div>
  );
};

export default Admin;