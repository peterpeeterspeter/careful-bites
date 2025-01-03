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

const supabaseUrl = window.__LOVABLE_SECRETS__?.VITE_SUPABASE_URL ?? 'https://wvkqszxifmvvuiqrnsqm.supabase.co';
const supabaseAnonKey = window.__LOVABLE_SECRETS__?.VITE_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
  console.error('Missing Supabase anon key. Please check your project settings.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey || '');