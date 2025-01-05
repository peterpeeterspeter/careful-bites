import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Create a single instance of the Supabase client
const supabaseUrl = "https://wvkqszxifmvvuiqrnsqm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2a3FzenhpZm12dnVpcXJuc3FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5NDAwOTEsImV4cCI6MjA1MTUxNjA5MX0.5iY9QqzOmwBZdGgfvQp49vGE6QHWVljbhb3oCwnCnTE";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);