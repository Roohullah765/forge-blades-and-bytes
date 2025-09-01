-- Fix function search path security issue by updating existing functions
-- This addresses the WARN 1: Function Search Path Mutable security warning

-- Update the is_admin function to have secure search_path
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid uuid DEFAULT auth.uid())
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = user_uuid AND role = 'admin'
  );
$function$;

-- Update the generate_order_number function to have secure search_path
CREATE OR REPLACE FUNCTION public.generate_order_number()
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
DECLARE
    order_num TEXT;
BEGIN
    order_num := 'ORD-' || EXTRACT(YEAR FROM NOW()) || '-' || LPAD(EXTRACT(DOY FROM NOW())::TEXT, 3, '0') || '-' || LPAD((RANDOM() * 9999)::INTEGER::TEXT, 4, '0');
    RETURN order_num;
END;
$function$;

-- Update the update_updated_at_column function to have secure search_path
-- This function already has search_path set, but let's ensure it's consistent
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$;