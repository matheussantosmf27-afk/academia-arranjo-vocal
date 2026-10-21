"use client";

import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase/client";

export interface AuthState {
  readonly configured: boolean;
  readonly loading: boolean;
  readonly user: User | null;
}

/** Sessão do usuário no navegador. Se o Supabase não estiver configurado, o app segue em modo local. */
export function useAuth(): AuthState {
  const supabase = getBrowserSupabase();
  const [state, setState] = useState<AuthState>({ configured: supabase !== null, loading: supabase !== null, user: null });
  useEffect(() => {
    if (!supabase) return;
    let active = true;
    supabase.auth.getUser().then(({ data }) => active && setState({ configured: true, loading: false, user: data.user }));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setState({ configured: true, loading: false, user: session?.user ?? null }));
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase]);
  return state;
}
