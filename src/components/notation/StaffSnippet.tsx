"use client";

import { useEffect, useRef } from "react";
import { type Clef, writtenPitch } from "@/domain/music/formations";
import type { Pitch } from "@/domain/music/pitch";
import { loadVexFlow, renderStaffSnippet } from "@/lib/notation/render";

/** Pauta única (alturas SONORAS, convertidas para escritas pela clave). */
export function StaffSnippet({ clef, attacks, label }: { clef: Clef; attacks: readonly (readonly Pitch[])[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let cancelled = false;
    loadVexFlow().then((VF) => {
      if (cancelled || !ref.current) return;
      renderStaffSnippet(VF, ref.current, {
        clef,
        attacks: attacks.map((chord) => chord.map((p) => writtenPitch(p, clef))),
        width: Math.max(220, 140 + attacks.length * 70),
      });
    });
    return () => {
      cancelled = true;
    };
  }, [clef, attacks]);
  return <div ref={ref} className="score-surface" style={{ display: "inline-block" }} role="img" aria-label={label} />;
}
