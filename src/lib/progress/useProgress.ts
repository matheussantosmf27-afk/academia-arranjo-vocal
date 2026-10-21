"use client";

import { useCallback, useSyncExternalStore } from "react";
import { EMPTY_PROGRESS, type ProgressState } from "./model";
import { localProgressRepository } from "./store";

let cache: { raw: string | null; state: ProgressState } = { raw: null, state: EMPTY_PROGRESS };

function subscribe(cb: () => void) {
  const handler = () => cb();
  window.addEventListener("aav:progress", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("aav:progress", handler);
    window.removeEventListener("storage", handler);
  };
}

function snapshot(): ProgressState {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem("aav:progress:v1");
  } catch {
    raw = null;
  }
  if (raw !== cache.raw) cache = { raw, state: localProgressRepository.load() };
  return cache.state;
}

/** Estado de progresso reativo. No servidor (SSR) devolve o estado vazio. */
export function useProgress() {
  const state = useSyncExternalStore(subscribe, snapshot, () => EMPTY_PROGRESS);
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const recordAttempt = useCallback((a: Parameters<typeof localProgressRepository.recordAttempt>[0]) => localProgressRepository.recordAttempt(a), []);
  const markRead = useCallback((id: string) => localProgressRepository.markRead(id), []);
  const reset = useCallback(() => localProgressRepository.reset(), []);
  return { state, hydrated, recordAttempt, markRead, reset };
}
