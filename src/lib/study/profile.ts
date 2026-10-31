"use client";

import { useSyncExternalStore } from "react";

export { PROFILE_QUESTIONS, type ProfileQuestion, type MusicalProfile, profileSchema } from "./profile-schema";
import { type MusicalProfile, profileSchema } from "./profile-schema";

const KEY = "aav:perfil-musical:v1";
const EVENT = "aav:perfil-musical";
let cache: { raw: string | null; value: MusicalProfile | null } = { raw: null, value: null };

function read(): MusicalProfile | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw === cache.raw) return cache.value;
    const p = raw ? profileSchema.safeParse(JSON.parse(raw)) : null;
    cache = { raw, value: p?.success ? p.data : null };
    return cache.value;
  } catch {
    return null;
  }
}

export function saveProfile(p: MusicalProfile): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* indisponível */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useMusicalProfile(): MusicalProfile | null {
  return useSyncExternalStore(subscribe, read, () => null);
}
