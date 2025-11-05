import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://hdtmynerdmhxaugzxsou.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkdG15bmVyZG1oeGF1Z3p4c291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MzA4OTcsImV4cCI6MjA3NzQwNjg5N30.L9mF-LCM4wQ85raWNj5-_tzgmwygjYRAimw1v2q01K4";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;