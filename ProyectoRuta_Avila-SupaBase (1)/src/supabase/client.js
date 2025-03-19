import { createClient } from '@supabase/supabase-js';

// Reemplaza estas variables con las de tu proyecto de Supabase
const supabaseUrl = 'https://wclzzggsrknmthttxxep.supabase.co'; // URL de tu proyecto Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjbHp6Z2dzcmtubXRodHR4eGVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwMDEzNDAsImV4cCI6MjA1NzU3NzM0MH0.ediDMW8WSyKfc3go83irnBPrZxo_Nom7ADSFqoai2Ms'; // Clave pública (anon) de Supabase

// Crea y exporta el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);