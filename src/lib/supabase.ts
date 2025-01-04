import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wvkqszxifmvvuiqrnsqm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2a3FzenhpZm12dnVpcXJuc3FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NjY5NzAsImV4cCI6MjAyNTI0Mjk3MH0.Rl5Zf6YV4QRd6CCfzpkpWMiPVFHvD3Pm8UXl-s0oQQo';

if (!supabaseAnonKey) {
  throw new Error('Missing Supabase anon key');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);