import { scoreFromText } from "@/domain/music/text-notation";
import type { StyleProfileId } from "@/domain/music/score";

/**
 * Exemplos da disciplina de rearmonização. A mesma melodia — a 1ª frase de "Santo! Santo!
 * Santo!" (Nicaea, John B. Dykes, 1861; texto de Reginald Heber, 1826; domínio público) —
 * aparece com harmonias diferentes para comparar voz por voz. As harmonizações são do
 * curso (a de Dykes está no Repertório). Cada veredito usado nas aulas é conferido pelo
 * motor no teste de integridade do currículo.
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

/** "Santo! Santo! Santo!" (Nicaea), 1ª frase, em Sol maior; melodia conferida na partitura de Dykes. */
export const NICAEA = 'G4:q"Ho- G4:q"ly, B4:q"ho- B4:q"ly, | D5:h"ho- D5:h"ly! | E5:h"Lord E5:q"God E5:q"Al- | D5:h"migh- B4:h"ty!';
const CURTA = 'G4:q"Ho- G4:q"ly, B4:q"ho- B4:q"ly, | D5:h"ho- D5:h"ly!';
const G = { key: "G" } as const;
const POP = { key: "G", style: "popular-a-cappella" } as const;
const CONT = { key: "G", style: "coral-contemporaneo" } as const;

/** Vozes da harmonia simples, reaproveitadas na comparação "primeira vez / segunda vez". */
const ORIGINAL = { A: "D4:h G4:h | F#4:h G4:h | G4:h G4:h | D4:h D4:h", T: "B3:h D4:h | D4:h B3:h | G3:h G3:h | F#3:h G3:h", B: "G2:h G3:h | D3:h G2:h | C3:h C3:h | D3:h G2:h" };
const DOMINANTES = { A: "D4:h E4:h | F#4:h G4:h | G4:h G4:h | F#4:h G4:h", T: "B3:h B3:h | A3:h B3:h | C4:h C#4:h | D4:h D4:h", B: "G2:h G3:h | D3:h F3:h | E3:h A2:h | D3:h G2:h" };
const DIATONICA = { A: "D4:h F#4:h | G4:h F#4:h | E4:h E4:h | F#4:h G4:h", T: "B3:h D4:h | G3:h A3:h | C4:h C4:h | C4:h B3:h", B: "G3:h F#3:h | E3:h D3:h | C3:h A2:h | D3:h G2:h" };
const SUBV = { A: "D4:h G4:h | F#4:h Ab4:h | A4:h A4:h | A4:h G4:h", T: "B3:h D4:h | D4:h D4:h | C4:h C#4:h | D4:h D4:h", B: "G2:h E3:h | D3:h Bb2:h | A2:h A2:h | D3:h G2:h" };
const DIMINUTO = { A: "D4:h E4:h | F#4:h G4:h | G4:h G4:h | F#4:h G4:h", B: "G2:h G3:h | D3:h B2:h | C3:h C#3:h | D3:h G2:h" };

export const EXR = {
  // ── A melodia e a harmonia de partida ──────────────────────────────
  original: satb("exr-original", "Santo! Santo! Santo! — harmonia simples: G – G | D – G | C – C | D – G", { S: NICAEA, ...ORIGINAL }, G),
  conflito: satb(
    "exr-conflito",
    "Mi da melodia sobre Ré maior, sem preparação nem resolução",
    { S: NICAEA, A: "D4:h G4:h | F#4:h G4:h | F#4:h G4:h | D4:h D4:h", T: "B3:h D4:h | D4:h B3:h | A3:h C4:h | A3:h G3:h", B: "G2:h G3:h | D3:h G2:h | D3:h C3:h | D3:h G2:h" },
    G,
  ),

  // ── Diatônica ──────────────────────────────────────────────────────
  diatonica: satb("exr-diatonica", "Substituições diatônicas com baixo descendente: G – Bm/F♯ – Em7 – D – C – Am – D7 – G", { S: NICAEA, ...DIATONICA }, POP),
  diatonicaTradicional: satb("exr-diatonica-tradicional", "A mesma linha de baixo avaliada no coral tradicional", { S: NICAEA, ...DIATONICA }, G),
  paralelasRearm: satb("exr-paralelas-rearm", "G – Bm no estado fundamental, todas as vozes juntas", { S: CURTA, A: "D4:h G4:h | B4:w", T: "B3:h D4:h | F#4:w", B: "G2:h G2:h | B2:w" }, G),

  // ── Dominantes secundárias ─────────────────────────────────────────
  dominantes: satb("exr-dominantes", "Dominantes secundárias: G – Em/G – D – G7/F – C/E – A7 – D – G", { S: NICAEA, ...DOMINANTES }, G),
  setimaSobe: satb("exr-setima-sobe", "A7 → D com a sétima (Sol) subindo", { S: NICAEA, ...DOMINANTES, A: "D4:h E4:h | F#4:h G4:h | G4:h G4:h | A4:h G4:h" }, G),

  // ── Substituto de trítono ──────────────────────────────────────────
  subV: satb("exr-subv", "Substituto de trítono: G – Em7 – D – B♭7 – Am – A – D – G", { S: NICAEA, ...SUBV }, POP),
  subVTradicional: satb("exr-subv-tradicional", "Os mesmos acordes avaliados no coral tradicional", { S: NICAEA, ...SUBV }, G),

  // ── Empréstimo modal ───────────────────────────────────────────────
  modal: satb(
    "exr-modal",
    "Empréstimo modal: G – G – B♭ – D – C – Am – B♭ – G",
    { S: NICAEA, A: "D4:h G4:h | F4:h F#4:h | G4:h A4:h | F4:h G4:h", T: "B3:h B3:h | Bb3:h A3:h | C4:h C4:h | D4:h D4:h", B: "G2:h G3:h | Bb2:h D3:h | C3:h A2:h | Bb2:h G2:h" },
    CONT,
  ),
  modalPlaning: satb("exr-modal-planing", "E♭ – G – B♭ em blocos paralelos", { S: CURTA, A: "Eb4:h D4:h | F4:w", T: "Bb3:h B3:h | D4:w", B: "Eb3:h G2:h | Bb2:w" }, POP),

  // ── Diminutos ──────────────────────────────────────────────────────
  diminuto: satb("exr-diminuto", "Diminuto de passagem: G – Em/G – D – G/B – C – C♯°7 – D – G", { S: NICAEA, ...DIMINUTO, T: "B3:h B3:h | A3:h G3:h | C4:h Bb3:h | A3:h G3:h" }, G),
  diminutoSetimaSobe: satb("exr-diminuto-setima-sobe", "C♯°7 com a sétima (Si♭) subindo", { S: NICAEA, ...DIMINUTO, T: "B3:h B3:h | A3:h G3:h | C4:h Bb3:h | B3:h G3:h" }, G),

  // ── Baixo ──────────────────────────────────────────────────────────
  pedal: satb(
    "exr-pedal",
    "Pedal de tônica: G – G | D/G – G | C/G – C/G | D7/G – G",
    { S: NICAEA, A: "D4:h G4:h | F#4:h G4:h | G4:h G4:h | F#4:h G4:h", T: "B3:h B3:h | A3:h B3:h | C4:h C4:h | C4:h B3:h", B: "G2:w~ | G2:w~ | G2:w~ | G2:w" },
    POP,
  ),
  baixoAscendente: satb(
    "exr-baixo-ascendente",
    "Baixo ascendente: G – Bm7/A – G/B – Csus2 – A/C♯ – Dsus2 – D – G",
    { S: NICAEA, A: "D4:h F#4:h | G4:h G4:h | E4:h E4:h | F#4:h G4:h", T: "B3:h D4:h | D4:h D4:h | A3:h A3:h | A3:h B3:h", B: "G2:h A2:h | B2:h C3:h | C#3:h D3:h | D3:h G2:h" },
    POP,
  ),

  // ── No arranjo ─────────────────────────────────────────────────────
  excesso: satb(
    "exr-excesso",
    "Um acorde por tempo, com saltos nas vozes internas",
    { S: CURTA, A: "D4:q E4:q G4:q D4:q | A4:q C5:q F#4:q B4:q", T: "B3:q G3:q D4:q F#3:q | D4:q E4:q A3:q D4:q", B: "G2:q C3:q G2:q B2:q | F#2:q A2:q D3:q G2:q" },
    G,
  ),
  segundaVez: satb(
    "exr-segunda-vez",
    "Santo! Santo! Santo! duas vezes: harmonia simples e, na repetição, dominantes secundárias",
    {
      S: `${NICAEA.replace('B4:h"ty!', 'B4:q"ty! r:q')} | ${NICAEA}`,
      A: `${ORIGINAL.A.replace(/D4:h$/, "D4:q r:q")} | ${DOMINANTES.A}`,
      T: `${ORIGINAL.T.replace(/G3:h$/, "G3:q r:q")} | ${DOMINANTES.T}`,
      B: `${ORIGINAL.B.replace(/G2:h$/, "G2:q r:q")} | ${DOMINANTES.B}`,
    },
    G,
  ),
} as const;
