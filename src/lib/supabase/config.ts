/** Configuração pública do Supabase. Sem estas variáveis, o app funciona no modo local (navegador). */
export function supabasePublicEnv(): { url: string; key: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

export const isSupabaseConfigured = (): boolean => supabasePublicEnv() !== null;
