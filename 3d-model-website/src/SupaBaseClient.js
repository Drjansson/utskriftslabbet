import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://fllpuuljzvxpsofbwqhi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsbHB1dWxqenZ4cHNvZmJ3cWhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NTk1OTgsImV4cCI6MjA3NzAzNTU5OH0.LBZYqcPn4AHyXiMs4hTo-pnmcoH1W2EWkE0WrDqGATk'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;