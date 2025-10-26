import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://hnhrsoedvobrenjgtyjq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuaHJzb2Vkdm9icmVuamd0eWpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1OTg3NzgsImV4cCI6MjA3NjE3NDc3OH0.H-UR3DT1nDAp-aLNnawO46utB-O95UTTSDCN9OY1srI'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;