import "server-only";
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { supabasePublicEnv } from "./config";

/**
 * Cliente de servidor com a sessão do usuário (cookies). Usa a chave publicável:
 * toda leitura/escrita passa pelo RLS como o próprio usuário. A service role NÃO é usada aqui.
 */
export async function getServerSupabase(): Promise<SupabaseClient | null> {
  const env = supabasePublicEnv();
  if (!env) return null;
  const store = await cookies();
  return createServerClient(env.url, env.key, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          for (const { name, value, options } of list) store.set(name, value, options);
        } catch {
          /* chamado de um Server Component: o proxy renova os cookies */
        }
      },
    },
  });
}

/** Usuário autenticado verificado no servidor de Auth (getUser valida o JWT). */
export async function requireUser(): Promise<{ supabase: SupabaseClient; user: User } | { error: string }> {
  const supabase = await getServerSupabase();
  if (!supabase) return { error: "Persistência na conta indisponível: Supabase não configurado." };
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return { error: "É preciso entrar na sua conta." };
  return { supabase, user: data.user };
}
