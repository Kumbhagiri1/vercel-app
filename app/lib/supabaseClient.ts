import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabase: SupabaseClient | null = null;

if (typeof window !== 'undefined') {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (supabaseUrl && supabaseAnonKey) {
		supabase = createClient(supabaseUrl, supabaseAnonKey);
	} else {
		// During local builds or missing env this prevents creating an invalid client
		// and avoids failing the prerender step. The runtime client will be created
		// when the browser environment has proper env variables set.
		console.warn('Supabase env not set; supabase client not initialized.');
	}
}

export default supabase;