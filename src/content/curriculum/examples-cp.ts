import { scoreFromText } from "@/domain/music/text-notation";
import type { StyleProfileId } from "@/domain/music/score";

/**
 * Exemplos (originais) da disciplina de contraponto vocal. O cantus firmus e as
 * melodias são escritos para o curso. Cada veredito usado nas aulas é conferido
 * pelo motor no teste de integridade do currículo.
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

const R = (n: number) => Array.from({ length: n }, () => "r:w").join(" | ");

/** Cantus firmus original, no baixo, em mínimas. */
export const CF = "C3:h D3:h | F3:h E3:h | A3:h G3:h | D3:h C3:h";

export const EXC = {
  // ── 1ª espécie ─────────────────────────────────────────────────────
  especie1: satb("exc-especie-1", "1ª espécie: nota contra nota sobre o cantus firmus", {
    S: "G4:h F4:h | A4:h C5:h | A4:h D5:h | B4:h C5:h",
    A: R(4),
    T: R(4),
    B: CF,
  }),
  especie1Paralelas: satb("exc-especie-1-paralelas", "1ª espécie com quinta direta e quintas paralelas", {
    S: "G4:h F4:h | A4:h C5:h | E5:h D5:h | B4:h C5:h",
    A: R(4),
    T: R(4),
    B: CF,
  }),
  // ── 2ª e 3ª espécies ───────────────────────────────────────────────
  especie2: satb("exc-especie-2", "2ª espécie: duas notas contra uma, a do tempo fraco de passagem", {
    S: "G4:q A4:q F4:q A4:q | D5:q E5:q C5:q B4:q | C5:q D5:q E5:q D5:q | B4:q A4:q C5:h",
    A: R(4),
    T: R(4),
    B: CF,
  }),
  especie2Paralelas: satb("exc-especie-2-paralelas", "2ª espécie com quintas e oitavas entre notas vizinhas", {
    S: "G4:q A4:q B4:q C5:q | D5:q C5:q B4:q A4:q | C5:q D5:q E5:q D5:q | B4:q D5:q C5:h",
    A: R(4),
    T: R(4),
    B: CF,
  }),
  especie3: satb("exc-especie-3", "3ª espécie: quatro notas contra uma, com passagem e bordadura", {
    S: "E5:q D5:q C5:q D5:q | C5:q B4:q A4:q C5:q | B4:q C5:q D5:q B4:q | C5:w",
    A: R(4),
    T: R(4),
    B: "C3:w | F3:w | G3:w | C3:w",
  }),

  // ── 4ª espécie ─────────────────────────────────────────────────────
  especie4: satb("exc-especie-4", "4ª espécie: cadeia de retardos 7–6 sobre o baixo descendente", {
    S: "E5:q E5:q~ E5:q D5:q~ | D5:q C5:q~ C5:q B4:q | C5:w",
    A: R(3),
    T: R(3),
    B: "G3:h F3:h | E3:h D3:h | C3:w",
  }),
  retardo43: satb("exc-retardo-43", "Retardo 4–3 a quatro vozes na cadência", {
    S: "C5:h~ C5:q B4:q | C5:w",
    A: "E4:h D4:h | E4:w",
    T: "G3:h G3:h | G3:w",
    B: "C3:h G2:h | C3:w",
  }),
  retardo98: satb("exc-retardo-98", "Retardo 9–8: o Ré preparado no V desce para Dó no I", {
    S: "D5:h~ D5:q C5:q | C5:w",
    A: "G4:h E4:h | E4:w",
    T: "B3:h C4:h | G3:w",
    B: "G2:h C3:h | C3:w",
  }),
  retardoSalto: satb("exc-retardo-salto", "O mesmo retardo abandonado por salto", {
    S: "D5:h~ D5:q G4:q | G4:w",
    A: "G4:h E4:h | E4:w",
    T: "B3:h C4:h | C4:w",
    B: "G2:h C3:h | C3:w",
  }),

  // ── 5ª espécie ─────────────────────────────────────────────────────
  especie5: satb("exc-especie-5", "5ª espécie (florida): ritmos misturados e um ponto culminante", {
    S: "G4:h F4:q G4:q | A4:h G4:q B4:q | C5:q D5:q E5:h | B4:q A4:8 B4:8 C5:h",
    A: R(4),
    T: R(4),
    B: CF,
  }),
  especie5Saltos: satb("exc-especie-5-saltos", "Linha com saltos grandes seguidos, sem compensação", {
    S: "G4:h F5:h | A4:h C5:h | A4:h D5:h | B4:h C5:h",
    A: R(4),
    T: R(4),
    B: CF,
  }),

  // ── Imitação e cânone ──────────────────────────────────────────────
  canone: satb(
    "exc-canone",
    "Cânone à oitava: o tenor repete a melodia do soprano um compasso depois, sobre pedal",
    {
      S: 'G4:q"Can- A4:q"te_o B4:q"po- B4:q"vo | B4:q"can- C5:q"te_a D5:h"voz | D5:q"de B4:q"to- B4:h"dos | G4:w"_',
      A: R(4),
      T: 'r:w | G3:q"Can- A3:q"te_o B3:q"po- B3:q"vo | B3:q"can- C4:q"te_a D4:h"voz | D4:q"de B3:q"to- B3:h"dos',
      B: "G2:w | G2:w | G2:w | G2:w",
    },
    { key: "G" },
  ),
  canoneParalelo: satb("exc-canone-paralelo", "Imitação sem defasagem: o tenor canta junto, uma quinta abaixo", {
    S: 'G4:q"Can- A4:q"te_o B4:q"po- B4:q"vo | B4:q"can- C5:q"te_a D5:h"voz',
    A: R(2),
    T: 'C4:q"Can- D4:q"te_o E4:q"po- E4:q"vo | E4:q"can- F4:q"te_a G4:h"voz',
    B: "G2:w | G2:w",
  }, { key: "G" }),

  // ── A três e quatro vozes ──────────────────────────────────────────
  quatroVozes: satb("exc-quatro-vozes", "Quatro linhas com ritmos diferentes sobre C – Am – G7 – C", {
    S: "E5:q D5:q C5:h | B4:h C5:h",
    A: "G4:h A4:h | F4:h E4:h",
    T: "C4:q E4:q E4:h | G3:h G3:h",
    B: "C3:h A2:h | G2:h C3:h",
  }),
  quatroVozesOitavas: satb("exc-quatro-vozes-oitavas", "O tenor copia o soprano uma oitava abaixo: só três linhas de verdade", {
    S: "E5:q D5:q C5:h | B4:h C5:h",
    A: "G4:h A4:h | F4:h E4:h",
    T: "E4:q D4:q C4:h | G3:h G3:h",
    B: "C3:h A2:h | G2:h C3:h",
  }),

  // ── Contracanto e descant ──────────────────────────────────────────
  contracanto: satb(
    "exc-contracanto",
    "Contracanto que responde nas pausas da melodia",
    {
      S: 'E5:q"Eu D5:q"sei C5:h"bem | r:h B4:q"que C5:q"sim | D5:h"Se- r:h | C5:w"nhor',
      A: "G4:w | A4:q G4:q G4:h | G4:h A4:q B4:q | E4:w",
      T: R(4),
      B: "C3:w | C3:h G2:h | G2:w | C3:w",
    },
    { style: "popular-a-cappella" },
  ),
  contracantoOitavas: satb(
    "exc-contracanto-oitavas",
    "'Contracanto' que só dobra a melodia uma oitava abaixo",
    {
      S: 'E5:q"Eu D5:q"sei C5:h"bem | r:h B4:q"que C5:q"sim | D5:h"Se- r:h | C5:w"nhor',
      A: "E4:q D4:q C4:h | r:h B3:q C4:q | D4:h r:h | C4:w",
      T: R(4),
      B: "C3:w | C3:h G2:h | G2:w | C3:w",
    },
    { style: "popular-a-cappella" },
  ),
  descant: satb("exc-descant", "Descant: a melodia no tenor e uma linha nova acima, no soprano", {
    S: "C5:h D5:h | E5:h C5:h | B4:h D5:h | C5:w",
    A: "G4:h B4:h | G4:h G4:h | G4:h F4:h | E4:w",
    T: 'E4:h"Luz D4:h"da | C4:h"ma- E4:h"nhã | D4:h"vem B3:h"che- | C4:w"gar',
    B: "C3:h G2:h | C3:h C3:h | G2:h G2:h | C3:w",
  }),
  descantOitavas: satb("exc-descant-oitavas", "'Descant' que repete a melodia uma oitava acima", {
    S: "E5:h D5:h | C5:h E5:h | D5:h B4:h | C5:w",
    A: "G4:h B4:h | G4:h G4:h | G4:h F4:h | E4:w",
    T: 'E4:h"Luz D4:h"da | C4:h"ma- E4:h"nhã | D4:h"vem B3:h"che- | C4:w"gar',
    B: "C3:h G2:h | C3:h C3:h | G2:h G2:h | C3:w",
  }),
  quodlibet: satb("exc-quodlibet", "Quodlibet: duas melodias diferentes cantadas ao mesmo tempo sobre a mesma harmonia", {
    S: 'E5:h"Luz D5:h"da | C5:h"ma- E5:h"nhã | D5:h"vem B4:h"che- | C5:w"gar',
    A: "G4:h G4:h | E4:h G4:h | G4:h F4:h | E4:w",
    T: 'G3:q"Sol A3:q"vai B3:h"nas- | C4:h"cer G3:h"de | B3:q"no- A3:q"vo D4:h"pra | C4:w"nós',
    B: "C3:h G2:h | C3:h C3:h | G2:h G2:h | C3:w",
  }),
} as const;
