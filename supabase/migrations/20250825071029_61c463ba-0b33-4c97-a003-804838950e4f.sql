-- Insert admin user record for xeren765@gmail.com
-- Using the existing user_id from auth logs: 491c9fc1-eec8-47bc-ac61-0a87cc188293
INSERT INTO public.admin_users (user_id, email, role)
VALUES (
  '491c9fc1-eec8-47bc-ac61-0a87cc188293'::uuid,
  'xeren765@gmail.com',
  'admin'
)
ON CONFLICT (user_id) DO NOTHING;