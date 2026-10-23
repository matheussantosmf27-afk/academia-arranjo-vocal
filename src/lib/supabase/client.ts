"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabasePublicEnv } from "./config";

let browserClient: SupabaseClient | null = null;

/** Cliente do navegador (chave publicável; acesso limitado por RLS). null se não configurado. */
export function getBrowserSupabase(): SupabaseClient | null {
  const env = supabasePublicEnv();
  if (!env) return null;
  browserClient ??= createBrowserClient(env.url, env.key);
  return browserClient;
}
