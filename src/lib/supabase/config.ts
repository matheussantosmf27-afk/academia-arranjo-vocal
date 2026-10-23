import { normalizeSupabaseUrl } from "./url";

/** Configuração pública do Supabase. Sem estas variáveis (ou com URL inválida), o app funciona no modo local (navegador). */
export function supabasePublicEnv(): { url: string; key: string } | null {
  const url = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url || !key || isSecretKey(key)) return null;
  return { url, key };
}

export const isSupabaseConfigured = (): boolean => supabasePublicEnv() !== null;

/**
 * Chaves secretas (sb_secret_… ou JWT com role service_role) ignoram o RLS e
 * nunca podem ir para o navegador: são recusadas.
 */
export function isSecretKey(key: string): boolean {
  if (key.startsWith("sb_secret_")) return true;
  const payload = key.split(".")[1];
  if (!payload) return false;
  try {
    const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))) as { role?: unknown };
    return json.role === "service_role";
  } catch {
    return false;
  }
}
