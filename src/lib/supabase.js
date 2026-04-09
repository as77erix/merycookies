import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://kjlsmgnzziseiabtssds.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqbHNtZ256emlzZWlhYnRzc2RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MjA5NDIsImV4cCI6MjA5MTI5Njk0Mn0.pja4v07gPwL92TD6IWUAQAvLQgMz7Re7mjvFFHTqves'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
