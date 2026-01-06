// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Env Variables')
}

export const client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true, // Pastikan ini true
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
})

export default client