import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidUrl = (url: string) => {
    try {
        return new URL(url).protocol.startsWith('http');
    } catch {
        return false;
    }
};

if (!supabaseUrl || !supabaseAnonKey || !isValidUrl(supabaseUrl)) {
    console.warn('Missing or invalid Supabase environment variables. Please check .env.local');
}

// Use a fallback URL if the environment variable is invalid (e.g. placeholder)
// to prevent the app from crashing on startup.
export const isFallbackMode = !isValidUrl(supabaseUrl);
const urlToUse = isValidUrl(supabaseUrl) ? supabaseUrl : 'https://example.com';
const keyToUse = supabaseAnonKey || 'placeholder-key';

export const supabase = createClient(
    urlToUse,
    keyToUse
);
