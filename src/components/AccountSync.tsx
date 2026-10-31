"use client";

import { useEffect } from "react";
import { listProductionAttemptsRemote } from "@/app/actions/production";
import { listAttemptsRemote } from "@/app/actions/progress";
import { useAuth } from "@/lib/auth/useAuth";
import { mergeProductionAttempts } from "@/lib/production/store";
import { localProgressRepository } from "@/lib/progress/store";

/** Ao entrar na conta, traz as tentativas (verificações e produção) registradas no banco para o progresso exibido. */
export function AccountSync() {
  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;
    void listAttemptsRemote().then((r) => {
      if (r.ok) localProgressRepository.mergeAttempts(r.attempts);
    });
    void listProductionAttemptsRemote().then((r) => {
      if (r.ok) mergeProductionAttempts(r.attempts);
    });
  }, [user]);
  return null;
}
