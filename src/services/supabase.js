import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://vkbpldtqubazsrcbvsvz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrYnBsZHRxdWJhenNyY2J2c3Z6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM0MTE1NDIsImV4cCI6MjAzODk4NzU0Mn0.hUbPRl_7sn9Sy_GLQgGtthvfs_zJyMz9aNmj-bTIpyY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
