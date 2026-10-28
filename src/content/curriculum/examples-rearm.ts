import { scoreFromText } from "@/domain/music/text-notation";
import type { StyleProfileId } from "@/domain/music/score";

/**
 * Exemplos (originais) da disciplina de rearmonização. A mesma melodia ("Luz da
 * manhã") aparece com harmonias diferentes para comparar voz por voz. Cada
 * veredito usado nas aulas é conferido pelo motor no teste de integridade do currículo.
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

/** Melodia original do curso: "Luz da manhã", em Dó maior. */
export const LUZ = 'E5:h"Luz D5:h"da | C5:h"ma- E5:h"nhã | D5:h"vem B4:h"che- | C5:w"gar';
const CURTA = 'E5:h"Luz D5:h"da | C5:w"manhã';
const POP = { style: "popular-a-cappella" } as const;
const CONT = { style: "coral-contemporaneo" } as const;

export const EXR = {
  // ── A melodia e a harmonia de partida ──────────────────────────────
  original: satb("exr-original", "Luz da manhã — harmonia simples: C – G – C – C – G – G7 – C", {
    S: LUZ,
    A: "G4:h G4:h | E4:h G4:h | G4:h F4:h | E4:w",
    T: "C4:h B3:h | C4:h C4:h | B3:h D4:h | C4:w",
    B: "C3:h G2:h | C3:h C3:h | G2:h G2:h | C3:w",
  }),
  conflito: satb("exr-conflito", "Dó da melodia sobre Sol maior, abandonado por salto", {
    S: LUZ,
    A: "G4:h G4:h | B4:h G4:h | G4:h F4:h | E4:w",
    T: "C4:h B3:h | D4:h C4:h | B3:h D4:h | C4:w",
    B: "C3:h G2:h | G2:h C3:h | G2:h G2:h | C3:w",
  }),

  // ── Diatônica ──────────────────────────────────────────────────────
  diatonica: satb(
    "exr-diatonica",
    "Substituições diatônicas com baixo descendente: C – G/B – Am – C/G – Dm – G7 – C",
    {
      S: LUZ,
      A: "G4:h G4:h | E4:h E4:h | F4:h F4:h | E4:w",
      T: "C4:h D4:h | A3:h C4:h | A3:h G3:h | G3:w",
      B: "C3:h B2:h | A2:h G2:h | D3:h G2:h | C3:w",
    },
    POP,
  ),
  diatonicaTradicional: satb("exr-diatonica-tradicional", "A mesma linha de baixo avaliada no coral tradicional", {
    S: LUZ,
    A: "G4:h G4:h | E4:h E4:h | F4:h F4:h | E4:w",
    T: "C4:h D4:h | A3:h C4:h | A3:h G3:h | G3:w",
    B: "C3:h B2:h | A2:h G2:h | D3:h G2:h | C3:w",
  }),
  paralelasRearm: satb("exr-paralelas-rearm", "C – Dm – C no estado fundamental, todas as vozes juntas", {
    S: CURTA,
    A: "G4:h A4:h | G4:w",
    T: "C4:h D4:h | C4:w",
    B: "C3:h D3:h | C3:w",
  }),

  // ── Dominantes secundárias ─────────────────────────────────────────
  dominantes: satb("exr-dominantes", "Dominantes secundárias: C – E7/G♯ – Am – A7/C♯ – Dm – G7 – C", {
    S: LUZ,
    A: "G4:h E4:h | E4:h G4:h | F4:h F4:h | E4:w",
    T: "C4:h B3:h | A3:h A3:h | A3:h G3:h | G3:w",
    B: "C3:h G#2:h | A2:h C#3:h | D3:h G2:h | C3:w",
  }),
  setimaSobe: satb("exr-setima-sobe", "A7 → Dm com a sétima (Sol) subindo", {
    S: LUZ,
    A: "G4:h E4:h | E4:h G4:h | A4:h F4:h | E4:w",
    T: "C4:h B3:h | A3:h A3:h | A3:h G3:h | G3:w",
    B: "C3:h G#2:h | A2:h C#3:h | D3:h G2:h | C3:w",
  }),

  // ── Substituto de trítono ──────────────────────────────────────────
  subV: satb(
    "exr-subv",
    "Substitutos de trítono: C – B♭7 – Am7 – A7 – Dm7 – D♭7 – C",
    {
      S: LUZ,
      A: "G4:h Ab4:h | G4:h G4:h | F4:h F4:h | E4:w",
      T: "C4:h D4:h | E4:h C#4:h | C4:h Ab3:h | C4:w",
      B: "C3:h Bb2:h | A2:h A2:h | D3:h Db3:h | C3:w",
    },
    POP,
  ),
  subVTradicional: satb("exr-subv-tradicional", "Os mesmos acordes avaliados no coral tradicional", {
    S: LUZ,
    A: "G4:h Ab4:h | G4:h G4:h | F4:h F4:h | E4:w",
    T: "C4:h D4:h | E4:h C#4:h | C4:h Ab3:h | C4:w",
    B: "C3:h Bb2:h | A2:h A2:h | D3:h Db3:h | C3:w",
  }),

  // ── Empréstimo modal ───────────────────────────────────────────────
  modal: satb(
    "exr-modal",
    "Empréstimo modal: C – G – A♭ – C – Fm6/A♭ – G – C",
    {
      S: LUZ,
      A: "G4:h G4:h | Eb4:h E4:h | F4:h G4:h | E4:w",
      T: "C4:h B3:h | C4:h C4:h | D4:h D4:h | C4:w",
      B: "C3:h G2:h | Ab2:h C3:h | Ab2:h G2:h | C3:w",
    },
    CONT,
  ),
  modalPlaning: satb("exr-modal-planing", "C – B♭ – A♭ em blocos paralelos", { S: CURTA, A: "G4:h F4:h | Eb4:w", T: "C4:h Bb3:h | Ab3:w", B: "C3:h Bb2:h | Ab2:w" }, POP),

  // ── Diminutos ──────────────────────────────────────────────────────
  diminuto: satb(
    "exr-diminuto",
    "Diminuto de passagem: C – G – Am – C♯°7 – Dm – G7 – C",
    {
      S: LUZ,
      A: "G4:h G4:h | E4:h G4:h | F4:h F4:h | E4:w",
      T: "C4:h B3:h | C4:h Bb3:h | A3:h G3:h | G3:w",
      B: "C3:h G2:h | A2:h C#3:h | D3:h G2:h | C3:w",
    },
  ),
  diminutoSetimaSobe: satb(
    "exr-diminuto-setima-sobe",
    "C♯°7 com a sétima (Si♭) subindo",
    {
      S: LUZ,
      A: "G4:h G4:h | E4:h G4:h | F4:h F4:h | E4:w",
      T: "C4:h B3:h | C4:h Bb3:h | B3:h G3:h | G3:w",
      B: "C3:h G2:h | A2:h C#3:h | D3:h G2:h | C3:w",
    },
  ),

  // ── Baixo ──────────────────────────────────────────────────────────
  pedal: satb(
    "exr-pedal",
    "Pedal de tônica: C – Dm7/C – F/C – C – Dm7/C – G7/C – C",
    {
      S: LUZ,
      A: "G4:h F4:h | F4:h G4:h | F4:h F4:h | E4:w",
      T: "C4:h A3:h | A3:h C4:h | A3:h G3:h | G3:w",
      B: "C3:w~ | C3:w~ | C3:w~ | C3:w",
    },
    POP,
  ),
  baixoAscendente: satb(
    "exr-baixo-ascendente",
    "Baixo ascendente: C – G/D – Am/E – Fmaj7 – D7/F♯ – G7 – C",
    {
      S: LUZ,
      A: "G4:h G4:h | A4:h A4:h | A4:h F4:h | E4:w",
      T: "C4:h B3:h | E4:h C4:h | C4:h D4:h | C4:w",
      B: "C3:h D3:h | E3:h F3:h | F#3:h G3:h | C3:w",
    },
    POP,
  ),

  // ── No arranjo ─────────────────────────────────────────────────────
  excesso: satb(
    "exr-excesso",
    "Um acorde por tempo, com saltos nas vozes internas",
    {
      S: CURTA,
      A: "G4:q C5:q B4:q F4:q | E4:q A4:q F#4:q G4:q",
      T: "C4:q E4:q D4:q B3:q | G3:q C4:q D4:q E4:q",
      B: "C3:q A2:q G2:q G2:q | C3:q F2:q D3:q C3:q",
    },
    CONT,
  ),
  segundaVez: satb("exr-segunda-vez", "Luz da manhã duas vezes: harmonia simples e, na repetição, rearmonizada", {
    S: `${LUZ.replace('C5:w"gar', 'C5:h"gar r:h')} | ${LUZ}`,
    A: "G4:h G4:h | E4:h G4:h | G4:h F4:h | E4:h r:h | G4:h E4:h | E4:h G4:h | F4:h F4:h | E4:w",
    T: "C4:h B3:h | C4:h C4:h | B3:h D4:h | C4:h r:h | C4:h B3:h | A3:h A3:h | A3:h G3:h | G3:w",
    B: "C3:h G2:h | C3:h C3:h | G2:h G2:h | C3:h r:h | C3:h G#2:h | A2:h C#3:h | D3:h G2:h | C3:w",
  }),
} as const;
