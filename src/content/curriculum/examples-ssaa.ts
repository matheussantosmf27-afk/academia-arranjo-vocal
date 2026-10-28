import { scoreFromText } from "@/domain/music/text-notation";
import type { StyleProfileId } from "@/domain/music/score";

/**
 * Exemplos (originais) da disciplina de vozes iguais agudas (SSA/SSAA). Em SSA,
 * a linha do Contralto II fica em pausa. Cada veredito usado nas aulas é
 * conferido pelo motor no teste de integridade do currículo.
 */
type V = Record<"S1" | "S2" | "A1" | "A2", string>;
type Opts = { key?: string; time?: string; tempo?: number; style?: StyleProfileId };
const ssaa = (id: string, title: string, voices: V, o: Opts = {}) =>
  scoreFromText({
    id,
    title,
    formation: "SSAA",
    key: o.key ?? "C",
    time: o.time ?? "4/4",
    voices,
    ...(o.tempo ? { tempo: o.tempo } : {}),
    ...(o.style ? { style: o.style } : {}),
  });

const R = (n: number) => Array.from({ length: n }, () => "r:w").join(" | ");

/** Melodia original do curso: "Luz da manhã", em Dó maior. */
const LUZ = 'E5:h"Luz D5:h"da | C5:h"ma- E5:h"nhã | D5:h"vem B4:h"che- | C5:w"gar';
/** A mesma melodia em Lá maior, para cantar no Soprano II. */
const MEL_A = 'C#5:h"Luz B4:h"da | A4:h"ma- C#5:h"nhã | B4:h"vem G#4:h"che- | A4:w"gar';
const PLANING: V = {
  S1: 'C5:q"u D5:q"u E5:q"u D5:q"u | C5:w"u',
  S2: "G4:q A4:q B4:q A4:q | G4:w",
  A1: "E4:q F4:q G4:q F4:q | E4:w",
  A2: "C4:q D4:q E4:q D4:q | C4:w",
};
const CORES: V = {
  S1: "E5:w | E5:w | F5:w | F5:w | E5:w",
  S2: "D5:w | C5:w | C5:w | B4:w | C5:w",
  A1: "G4:w | G4:w | F4:w | G4:w | G4:w",
  A2: "C4:w | A3:w | D4:w | G3:w | C4:w",
};

export const EXS = {
  // ── A formação ─────────────────────────────────────────────────────
  hino: ssaa("exs-hino", "Luz da manhã em SSAA: C – G – C – C – G – G7 – C", {
    S1: LUZ,
    S2: "C5:h B4:h | G4:h C5:h | B4:h G4:h | G4:w",
    A1: "G4:h G4:h | E4:h G4:h | G4:h F4:h | E4:w",
    A2: "C4:h G3:h | C4:h C4:h | G3:h G3:h | C4:w",
  }),
  graveDemais: ssaa("exs-grave-demais", "Contralto II escrito como baixo de coro misto", {
    S1: LUZ,
    S2: "C5:h B4:h | G4:h C5:h | B4:h G4:h | G4:w",
    A1: "G4:h G4:h | E4:h G4:h | G4:h F4:h | E4:w",
    A2: "C3:h G3:h | C3:h C3:h | G3:h G3:h | C3:w",
  }),

  // ── SSA: três vozes ────────────────────────────────────────────────
  ssa: ssaa("exs-ssa", "Luz da manhã em SSA: a contralto como baixo, só fundamentais e terças", {
    S1: LUZ,
    S2: "G4:h G4:h | G4:h G4:h | G4:h F4:h | E4:w",
    A1: "C4:h B3:h | C4:h C4:h | B3:h D4:h | C4:w",
    A2: R(4),
  }),
  ssaQuintas: ssaa("exs-ssa-quintas", "SSA com a contralto saltando para as quintas dos acordes", {
    S1: LUZ,
    S2: "C5:h B4:h | G4:h C5:h | B4:h G4:h | E4:w",
    A1: "G4:h D4:h | E4:h G4:h | D4:h F4:h | C4:w",
    A2: R(4),
  }),

  // ── SSAA: espaçamento ──────────────────────────────────────────────
  buraco: ssaa("exs-buraco", "Sopranos longe das contraltos: um buraco no meio do acorde", {
    S1: "G5:h F5:h | E5:w",
    S2: "E4:h D4:h | C4:w",
    A1: "C4:h B3:h | C4:w",
    A2: "C4:h G3:h | C4:w",
  }),

  // ── O baixo sem baixo ──────────────────────────────────────────────
  baixoLinha: ssaa("exs-baixo-linha", "Contralto II com linha de baixo: C – G/B – C – Am – G/B – G7 – C", {
    S1: LUZ,
    S2: "C5:h G4:h | G4:h C5:h | G4:h G4:h | G4:w",
    A1: "G4:h G4:h | E4:h E4:h | G4:h F4:h | E4:w",
    A2: "C4:h B3:h | C4:h A3:h | B3:h G3:h | C4:w",
  }),
  baixoOitavas: ssaa("exs-baixo-oitavas", "Contralto II dobrando a melodia uma oitava abaixo", {
    S1: LUZ,
    S2: "C5:h B4:h | G4:h C5:h | B4:h G4:h | G4:w",
    A1: "G4:h G4:h | E4:h G4:h | G4:h F4:h | E4:w",
    A2: "E4:h D4:h | C4:h E4:h | D4:h B3:h | C4:w",
  }),

  // ── Coro infantil ──────────────────────────────────────────────────
  infantil: ssaa(
    "exs-infantil",
    "Canção a duas vozes para coro infantil, em Sol maior",
    {
      S1: 'G4:q"Pas- B4:q"sa- D5:h"ri- | E5:q"nho D5:q"can- B4:h"ta | C5:q"no A4:q"meu B4:q"quin- A4:q"tal | G4:w"_',
      S2: "G4:q G4:q B4:h | C5:q B4:q G4:h | A4:q F#4:q G4:q F#4:q | G4:w",
      A1: R(4),
      A2: R(4),
    },
    { key: "G" },
  ),
  infantilAgudo: ssaa(
    "exs-infantil-agudo",
    "A mesma canção em Lá maior: o ponto mais agudo sai da região confortável",
    {
      S1: 'A4:q"Pas- C#5:q"sa- E5:h"ri- | F#5:q"nho E5:q"can- C#5:h"ta | D5:q"no B4:q"meu C#5:q"quin- B4:q"tal | A4:w"_',
      S2: "A4:q A4:q C#5:h | D5:q C#5:q A4:h | B4:q G#4:q A4:q G#4:q | A4:w",
      A1: R(4),
      A2: R(4),
    },
    { key: "A" },
  ),

  // ── Texturas ───────────────────────────────────────────────────────
  melodiaInterna: ssaa(
    "exs-melodia-interna",
    "Melodia no Soprano II, com o Soprano I sustentando por cima",
    {
      S1: "E5:h E5:h | E5:h E5:h | E5:h D5:h | C#5:w",
      S2: MEL_A,
      A1: "E4:h E4:h | C#4:h E4:h | E4:h E4:h | E4:w",
      A2: "A3:h G#3:h | A3:h A3:h | G#3:h B3:h | A3:w",
    },
    { key: "A" },
  ),
  melodiaCruzada: ssaa(
    "exs-melodia-cruzada",
    "Melodia no Soprano II com o Contralto I passando por cima dela",
    {
      S1: "E5:h E5:h | E5:h E5:h | E5:h D5:h | C#5:w",
      S2: MEL_A,
      A1: "E4:h E4:h | C#5:h E4:h | E4:h E4:h | E4:w",
      A2: "A3:h G#3:h | A3:h A3:h | G#3:h B3:h | A3:w",
    },
    { key: "A" },
  ),

  // ── Adaptação de SATB ──────────────────────────────────────────────
  adaptacaoDireta: ssaa("exs-adaptacao-direta", "Coro misto copiado: tenor uma oitava acima no Soprano II", {
    S1: LUZ,
    S2: "C5:h B4:h | C5:h C5:h | B4:h D5:h | C5:w",
    A1: "G4:h G4:h | E4:h G4:h | G4:h F4:h | E4:w",
    A2: "C4:h G3:h | C4:h C4:h | G3:h G3:h | C4:w",
  }),

  // ── Cores ──────────────────────────────────────────────────────────
  cores: ssaa("exs-cores", "Cadd9 – Am7 – Dm7 – G7 – C em vozes iguais", CORES, { style: "coral-contemporaneo", tempo: 90 }),
  planing: ssaa("exs-planing", "Tríades paralelas em bloco (planing): C – Dm – Em – Dm – C", PLANING, { style: "popular-a-cappella" }),
  planingTradicional: ssaa("exs-planing-tradicional", "O mesmo bloco paralelo avaliado no coral tradicional", PLANING),
} as const;
