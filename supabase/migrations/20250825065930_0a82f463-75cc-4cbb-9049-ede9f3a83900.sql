-- Drop existing problematic policies
DROP POLICY IF EXISTS "admin_users_admin_all" ON public.admin_users;
DROP POLICY IF EXISTS "admin_users_self_read" ON public.admin_users;

-- Create a security definer function to check admin status
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = user_uuid AND role = 'admin'
  );
$$;

-- Create new safe policies using the function
CREATE POLICY "admin_users_insert_policy" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "admin_users_select_policy" 
ON public.admin_users 
FOR SELECT 
USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "admin_users_update_policy" 
ON public.admin_users 
FOR UPDATE 
USING (public.is_admin());

CREATE POLICY "admin_users_delete_policy" 
ON public.admin_users 
FOR DELETE 
USING (public.is_admin());