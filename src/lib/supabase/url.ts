/**
 * Normaliza a URL do projeto Supabase vinda do ambiente: remove espaços e
 * aspas, acrescenta https:// quando falta o esquema e descarta barra final.
 * Retorna null se o valor não for uma URL http(s) válida.
 */
export function normalizeSupabaseUrl(raw: string | undefined): string | null {
  if (!raw) return null;
  let v = raw.trim().replace(/^["']|["']$/g, "").trim();
  if (!v) return null;
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(v)) v = `https://${v}`;
  try {
    const u = new URL(v);
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    // nome de host DNS válido (pega, por exemplo, a chave colada no lugar da URL)
    if (!/^[a-z0-9.-]+$/i.test(u.hostname) || (!u.hostname.includes(".") && u.hostname !== "localhost")) return null;
    return u.origin;
  } catch {
    return null;
  }
}
