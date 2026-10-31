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

/** 1ª frase de "Santo! Santo! Santo!" (Nicaea), em Sol maior, com o texto de Heber. */
const NICAEA = 'G4:q"Ho- G4:q"ly, B4:q"ho- B4:q"ly, | D5:h"ho- D5:h"ly! | E5:h"Lord E5:q"God E5:q"Al- | D5:h"migh- B4:h"ty!';
const NICAEA_8VB = 'G3:q"Ho- G3:q"ly, B3:q"ho- B3:q"ly, | D4:h"ho- D4:h"ly! | E4:h"Lord E4:q"God E4:q"Al- | D4:h"migh- B3:h"ty!';
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
  // "Frère Jacques" (cânone tradicional francês, séc. XVIII; domínio público), melodia conferida na Wikipédia.
  canone: satb(
    "exc-canone",
    "Cânone à oitava: o tenor entra com 'Frère Jacques' dois compassos depois do soprano, sobre pedal",
    {
      S: 'G4:q"Frè- A4:q"re B4:q"Jac- G4:q"ques, | G4:q"frè- A4:q"re B4:q"Jac- G4:q"ques, | B4:q"dor- C5:q"mez- D5:h"vous? | B4:q"dor- C5:q"mez- D5:h"vous?',
      A: R(4),
      T: 'r:w | r:w | G3:q"Frè- A3:q"re B3:q"Jac- G3:q"ques, | G3:q"frè- A3:q"re B3:q"Jac- G3:q"ques,',
      B: "G2:w | G2:w | G2:w | G2:w",
    },
    { key: "G" },
  ),
  canoneParalelo: satb("exc-canone-paralelo", "Imitação sem defasagem: o tenor canta junto, uma quinta abaixo", {
    S: 'G4:q"Frè- A4:q"re B4:q"Jac- G4:q"ques, | G4:q"frè- A4:q"re B4:q"Jac- G4:q"ques,',
    A: R(2),
    T: 'C4:q"Frè- D4:q"re E4:q"Jac- C4:q"ques, | C4:q"frè- D4:q"re E4:q"Jac- C4:q"ques,',
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
  // Sobre "Santo! Santo! Santo!" (Nicaea, Dykes, 1861; domínio público), como na disciplina de rearmonização.
  contracanto: satb(
    "exc-contracanto",
    "Contracanto que se move nas notas longas da melodia",
    { S: NICAEA, A: 'D4:w"uh | F#4:q A4:q G4:q B4:q | G4:w | F#4:q A4:q G4:q D4:q', T: R(4), B: "G2:h G3:h | D3:h G2:h | C3:h C3:h | D3:h G2:h" },
    { key: "G", style: "popular-a-cappella" },
  ),
  contracantoOitavas: satb(
    "exc-contracanto-oitavas",
    "'Contracanto' que só dobra a melodia uma oitava abaixo",
    { S: NICAEA, A: "G3:q G3:q B3:q B3:q | D4:h D4:h | E4:h E4:q E4:q | D4:h B3:h", T: R(4), B: "G2:h G3:h | D3:h G2:h | C3:h C3:h | D3:h G2:h" },
    { key: "G", style: "popular-a-cappella" },
  ),
  descant: satb(
    "exc-descant",
    "Descant: a melodia no tenor e uma linha nova acima, no soprano",
    { S: "B4:h D5:h | D5:h D5:h | C5:h C5:h | D5:h D5:h", A: "D4:h G4:h | F#4:h G4:h | G4:h G4:h | F#4:h G4:h", T: NICAEA_8VB, B: "G2:h G3:h | D3:h B2:h | C3:h A2:h | D3:h G2:h" },
    { key: "G" },
  ),
  descantOitavas: satb(
    "exc-descant-oitavas",
    "'Descant' que repete a melodia uma oitava acima",
    { S: NICAEA.replace(/"[^ ]*/g, ""), A: "D4:h G4:h | F#4:h G4:h | G4:h G4:h | F#4:h G4:h", T: NICAEA_8VB, B: "G2:h G3:h | D3:h B2:h | C3:h A2:h | D3:h G2:h" },
    { key: "G" },
  ),
} as const;
