import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const supabaseUrl = 'https://wvkqszxifmvvuiqrnsqm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2a3FzenhpZm12dnVpcXJuc3FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5NDAwOTEsImV4cCI6MjA1MTUxNjA5MX0.5iY9QqzOmwBZdGgfvQp49vGE6QHWVljbhb3oCwnCnTE';

if (!supabaseUrl) throw new Error('Missing SUPABASE_URL');
if (!supabaseAnonKey) throw new Error('Missing SUPABASE_ANON_KEY');

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);