"use client";

import { useEffect } from "react";
import { listAttemptsRemote } from "@/app/actions/progress";
import { useAuth } from "@/lib/auth/useAuth";
import { localProgressRepository } from "@/lib/progress/store";

/** Ao entrar na conta, traz as tentativas registradas no banco para o progresso exibido. */
export function AccountSync() {
  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;
    void listAttemptsRemote().then((r) => {
      if (r.ok) localProgressRepository.mergeAttempts(r.attempts);
    });
  }, [user]);
  return null;
}
