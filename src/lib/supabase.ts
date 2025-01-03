import { createClient } from '@supabase/supabase-js';

// These values are automatically injected by Lovable's secret management system
declare global {
  interface Window {
    __LOVABLE_SECRETS__?: {
      VITE_SUPABASE_URL: string;
      VITE_SUPABASE_ANON_KEY: string;
    }
  }
}

const supabaseUrl = window.__LOVABLE_SECRETS__?.VITE_SUPABASE_URL;
const supabaseAnonKey = window.__LOVABLE_SECRETS__?.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration. Please ensure you have set up your Supabase secrets in the project settings.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);