import { scoreFromText } from "@/domain/music/text-notation";
import type { StyleProfileId } from "@/domain/music/score";

/**
 * Exemplos (originais) da disciplina de regência e preparação de ensaio: o que o
 * regente decide (andamento, respiração, tonalidade) e o que ele revisa antes de
 * ensaiar. Cada veredito usado nas aulas é conferido pelo motor no teste de
 * integridade do currículo.
 */
type S = Record<"S" | "A" | "T" | "B", string>;
type Opts = { key?: string; time?: string; tempo?: number; style?: StyleProfileId };
const satb = (id: string, title: string, voices: S, o: Opts = {}) =>
  scoreFromText({
    id,
    title,
    formation: "SATB",
    key: o.key ?? "C",
    time: o.time ?? "4/4",
    voices,
    ...(o.tempo ? { tempo: o.tempo } : {}),
    ...(o.style ? { style: o.style } : {}),
  });

/** Hino curto em 3/4 que começa em anacruse no terceiro tempo. */
const HINO_3: S = {
  S: 'r:h A4:q"Vem | B4:h"can- C5:q"tar | A4:h"co- C5:q"mi- | B4:h."go',
  A: "r:h F#4:q | G4:h G4:q | F#4:h F#4:q | G4:h.",
  T: "r:h D4:q | D4:h E4:q | D4:h D4:q | D4:h.",
  B: "r:h D3:q | G3:h C3:q | D3:h D3:q | G2:h.",
}

/** Frase de seis compassos sem pausa (e a mesma com uma respiração no meio). */
const FRASE = {
  S: 'E5:h"Can- D5:h"ta | C5:h"o E5:h"co- | D5:h"ro B4:h"na | C5:h"luz G4:h"da | A4:h"ma- B4:h"nhã | C5:w"_',
  A: "G4:h G4:h | E4:h G4:h | G4:h F4:h | E4:h C4:h | F4:h F4:h | E4:w",
  T: "C4:h B3:h | C4:h C4:h | B3:h D4:h | C4:h C4:h | C4:h D4:h | C4:w",
  B: "C3:h G2:h | C3:h C3:h | G2:h G2:h | C3:h E3:h | A2:h G2:h | C3:w",
};

export const EXG = {
  // ── Gesto e andamento ──────────────────────────────────────────────
  hino3: satb("exg-hino-3", "Hino em 3/4 com anacruse: o coro entra no terceiro tempo", HINO_3, { key: "G", time: "3/4", tempo: 84 }),
  hinoLento: satb("exg-hino-lento", "O mesmo hino regido a ♩ = 36", HINO_3, { key: "G", time: "3/4", tempo: 36 }),

  // ── Aquecimento ────────────────────────────────────────────────────
  cadenciaAquecimento: satb(
    "exg-cadencia-aquecimento",
    "Cadência de aquecimento I – IV – V – I em vogal 'u'",
    { S: 'B4:w"u | C5:w"u | A4:w"u | B4:w"u', A: "G4:w | G4:w | F#4:w | G4:w", T: "D4:w | E4:w | D4:w | D4:w", B: "G2:w | C3:w | D3:w | G2:w" },
    { key: "G" },
  ),
  vocaliseOitavas: satb("exg-vocalise-oitavas", "Vocalise de cinco notas cantado por todos em oitavas", {
    S: 'C5:q"ma D5:q"ma E5:q"ma D5:q"ma | C5:w"ma',
    A: "C4:q D4:q E4:q D4:q | C4:w",
    T: "C4:q D4:q E4:q D4:q | C4:w",
    B: "C3:q D3:q E3:q D3:q | C3:w",
  }),

  // ── Afinação ───────────────────────────────────────────────────────
  acordeEscalonado: satb("exg-acorde-escalonado", "Acorde construído de baixo para cima: baixo, tenor, contralto, soprano", {
    S: 'r:w | r:w | r:w | C5:w"u',
    A: 'r:w | r:w | E4:w"u | E4:w',
    T: 'r:w | G3:w"u | G3:w | G3:w',
    B: 'C3:w"u | C3:w | C3:w | C3:w',
  }),
  acordeTercaDobrada: satb("exg-acorde-terca-dobrada", "Acorde de afinação com a terça dobrada", {
    S: 'E5:w"u | E5:w',
    A: "G4:w | G4:w",
    T: "E4:w | E4:w",
    B: "C3:w | C3:w",
  }),

  // ── Ensaio por naipe ───────────────────────────────────────────────
  contraltoAumentada: satb(
    "exg-contralto-aumentada",
    "Contralto com segunda aumentada (Fá → Sol♯) em Lá menor",
    { S: "C5:h D5:h | B4:h C5:h", A: "A4:h F4:h | G#4:h A4:h", T: "A3:h A3:h | E4:h E4:h", B: "A2:h D3:h | E3:h A2:h" },
    { key: "Am" },
  ),
  contraltoGrau: satb(
    "exg-contralto-grau",
    "A mesma cadência com a sensível no tenor e a contralto por grau (Fá → Mi)",
    { S: "C5:h D5:h | B4:h C5:h", A: "A4:h F4:h | E4:h E4:h", T: "A3:h A3:h | G#3:h A3:h", B: "A2:h D3:h | E3:h A2:h" },
    { key: "Am" },
  ),

  // ── Respiração ─────────────────────────────────────────────────────
  fraseLonga: satb("exg-frase-longa", "Seis compassos sem pausa a ♩ = 72", FRASE, { tempo: 72 }),
  fraseRespirada: satb(
    "exg-frase-respirada",
    "A mesma frase com uma respiração escrita no compasso 3",
    {
      S: 'E5:h"Can- D5:h"ta | C5:h"o E5:h"co- | D5:h"ro B4:q"na r:q | C5:h"luz G4:h"da | A4:h"ma- B4:h"nhã | C5:w"_',
      A: "G4:h G4:h | E4:h G4:h | G4:h F4:q r:q | E4:h C4:h | F4:h F4:h | E4:w",
      T: "C4:h B3:h | C4:h C4:h | B3:h D4:q r:q | C4:h C4:h | C4:h D4:h | C4:w",
      B: "C3:h G2:h | C3:h C3:h | G2:h G2:q r:q | C3:h E3:h | A2:h G2:h | C3:w",
    },
    { tempo: 72 },
  ),

  // ── Equilíbrio ─────────────────────────────────────────────────────
  melodiaDobrada: satb("exg-melodia-dobrada", "Tenor dobrando a melodia uma oitava abaixo para 'reforçar'", {
    S: 'E5:h"Luz D5:h"da | C5:h"ma- E5:h"nhã | D5:h"vem B4:h"che- | C5:w"gar',
    A: "G4:h G4:h | E4:h G4:h | G4:h F4:h | E4:w",
    T: "E4:h D4:h | C4:h E4:h | D4:h B3:h | C4:w",
    B: "C3:h G2:h | C3:h C3:h | G2:h G2:h | C3:w",
  }),

  // ── Adaptação ao grupo ─────────────────────────────────────────────
  descantRe: satb(
    "exg-descant-re",
    "O hino com descant transposto para Ré maior",
    {
      S: "D5:h E5:h | F#5:h D5:h | C#5:h E5:h | D5:w",
      A: "A4:h C#5:h | A4:h A4:h | A4:h G4:h | F#4:w",
      T: 'F#4:h"Luz E4:h"da | D4:h"ma- F#4:h"nhã | E4:h"vem C#4:h"che- | D4:w"gar',
      B: "D3:h A2:h | D3:h D3:h | A2:h A2:h | D3:w",
    },
    { key: "D" },
  ),
} as const;
