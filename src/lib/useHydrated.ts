"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** true somente no cliente após a hidratação (evita divergência SSR × navegador). */
export function useHydrated(): boolean {
  return useSyncExternalStore(noop, () => true, () => false);
}
