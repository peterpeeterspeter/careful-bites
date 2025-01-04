import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const supabaseUrl = 'https://wvkqszxifmvvuiqrnsqm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2a3FzenhpZm12dnVpcXJuc3FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NjY5NzAsImV4cCI6MjAyNTI0Mjk3MH0.Rl5Zf6YV4QRd6CCfzpkpWMiPVFHvD3Pm8UXl-s0oQQo';

if (!supabaseUrl) throw new Error('Missing SUPABASE_URL');
if (!supabaseAnonKey) throw new Error('Missing SUPABASE_ANON_KEY');

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});