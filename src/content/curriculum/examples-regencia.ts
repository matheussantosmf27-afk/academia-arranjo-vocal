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

/**
 * Hino curto em 3/4 que começa em anacruse no terceiro tempo: a 1ª frase de "Amazing Grace"
 * (melodia New Britain, 1829; texto de John Newton, 1779; domínio público), em Lá maior.
 * Melodia conferida na transcrição da Wikipédia; a harmonização é do curso.
 */
const HINO_3: S = {
  S: 'r:h E4:q"A- | A4:h"ma- C#5:8"zing A4:8 | C#5:h"grace! B4:q"How | A4:h"sweet F#4:q"the | E4:h."sound',
  A: "r:h E4:q | E4:h E4:q | E4:h E4:q | F#4:h D4:q | E4:h.",
  T: "r:h C#4:q | C#4:h C#4:q | C#4:h C#4:q | A3:h A3:q | A3:h.",
  B: "r:h A2:q | C#3:h C#3:q | C#3:h C#3:q | D3:h D3:q | C#3:h.",
};

/**
 * Frase de seis compassos sem pausa (e a mesma com uma respiração no fim da 1ª frase):
 * as duas primeiras frases da "Doxologia" (Old 100th, Louis Bourgeois, Saltério de Genebra,
 * 1551; texto de William Kethe, 1561; domínio público), em Lá maior.
 */
const DOX_S = 'A4:h"All A4:q"peo- G#4:q"ple | F#4:q"that E4:q"on A4:h"earth | B4:h"do C#5:h"dwell, | C#5:h"Sing C#5:q"to C#5:q"the | B4:q"Lord A4:q"with D5:h"cheer- | C#5:h"ful B4:h"voice;';
const FRASE = {
  S: DOX_S,
  A: "E4:h E4:h | D4:h E4:h | E4:h E4:h | F#4:h E4:h | D4:h D4:h | E4:h E4:h",
  T: "A3:h A3:h | A3:h C#4:h | B3:h A3:h | A3:h A3:h | F#3:h F#3:h | E3:h E3:h",
  B: "C#3:h C#3:h | D3:h C#3:h | G#2:h A2:h | A2:h A2:h | D3:h D3:h | A2:h G#2:h",
};

export const EXG = {
  // ── Gesto e andamento ──────────────────────────────────────────────
  hino3: satb("exg-hino-3", "Amazing Grace, em 3/4 com anacruse: o coro entra no terceiro tempo", HINO_3, { key: "A", time: "3/4", tempo: 84 }),
  hinoLento: satb("exg-hino-lento", "O mesmo hino regido a ♩ = 36", HINO_3, { key: "A", time: "3/4", tempo: 36 }),

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
  fraseLonga: satb("exg-frase-longa", "Doxologia: seis compassos sem pausa a ♩ = 72", FRASE, { key: "A", tempo: 72 }),
  fraseRespirada: satb(
    "exg-frase-respirada",
    "A mesma frase com uma respiração escrita no fim do compasso 3",
    {
      S: DOX_S.replace('C#5:h"dwell,', 'C#5:q"dwell, r:q'),
      A: FRASE.A.replace("E4:h E4:h | F#4:h", "E4:h E4:q r:q | F#4:h"),
      T: FRASE.T.replace("B3:h A3:h | A3:h", "B3:h A3:q r:q | A3:h"),
      B: FRASE.B.replace("G#2:h A2:h | A2:h", "G#2:h A2:q r:q | A2:h"),
    },
    { key: "A", tempo: 72 },
  ),

  // ── Equilíbrio ─────────────────────────────────────────────────────
  melodiaDobrada: satb(
    "exg-melodia-dobrada",
    "Tenor dobrando a melodia uma oitava abaixo para 'reforçar'",
    {
      S: 'G4:q"Ho- G4:q"ly, B4:q"ho- B4:q"ly, | D5:h"ho- D5:h"ly! | E5:h"Lord E5:q"God E5:q"Al- | D5:h"migh- B4:h"ty!',
      A: "D4:h G4:h | F#4:h G4:h | G4:h G4:h | D4:h D4:h",
      T: "G3:q G3:q B3:q B3:q | D4:h D4:h | E4:h E4:q E4:q | D4:h B3:h",
      B: "G2:h G3:h | D3:h G2:h | C3:h C3:h | D3:h G2:h",
    },
    { key: "G" },
  ),

  // ── Adaptação ao grupo ─────────────────────────────────────────────
  descantRe: satb(
    "exg-descant-re",
    "Santo! Santo! Santo! com descant, transposto um tom acima (Lá maior)",
    {
      S: "C#5:h E5:h | E5:h E5:h | D5:h D5:h | E5:h E5:h",
      A: "E4:h A4:h | G#4:h A4:h | A4:h A4:h | G#4:h A4:h",
      T: 'A3:q"Ho- A3:q"ly, C#4:q"ho- C#4:q"ly, | E4:h"ho- E4:h"ly! | F#4:h"Lord F#4:q"God F#4:q"Al- | E4:h"migh- C#4:h"ty!',
      B: "A2:h A3:h | E3:h C#3:h | D3:h B2:h | E3:h A2:h",
    },
    { key: "A" },
  ),
} as const;
