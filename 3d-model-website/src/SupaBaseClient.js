import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://yyy.supabase.co'
const supabaseKey = 'zzzzz'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;