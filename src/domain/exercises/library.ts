import type { Score } from "../music/score";
import { scoreFromText } from "../music/text-notation";
import type { NctKind } from "../validation/rules/nct";

/**
 * Trechos-modelo para exercícios gerados. Cada um declara o fenômeno esperado;
 * os testes conferem com o motor, e o gerador reconfere após cada transposição.
 * Todos são originais, em Dó maior (ou lá menor) e a quatro vozes SATB.
 */
const s = (id: string, voices: Record<"S" | "A" | "T" | "B", string>, key = "C") =>
  scoreFromText({ id, title: id, formation: "SATB", key, time: "4/4", voices });

export interface ErrorSnippet {
  readonly score: Score;
  readonly ruleId: string;
  readonly hint: string;
}

export const ERROR_SNIPPETS: readonly ErrorSnippet[] = [
  { score: s("err-paralelas", { S: "G4:h A4:h", A: "E4:h F4:h", T: "C4:h D4:h", B: "C3:h D3:h" }), ruleId: "conducao.paralelas", hint: "Todas as vozes sobem juntas por grau." },
  { score: s("err-diretas", { S: "E5:h G4:h", A: "G4:h G4:h", T: "E4:h B3:h", B: "C3:h G2:h" }), ruleId: "conducao.quintas-oitavas-diretas", hint: "Observe as vozes extremas e como o soprano chega à última nota." },
  { score: s("err-cruzamento", { S: "E4:w", A: "G4:w", T: "C4:w", B: "C3:w" }), ruleId: "vozes.cruzamento", hint: "Compare a altura do soprano com a do contralto." },
  { score: s("err-espacamento", { S: "E5:w", A: "C4:w", T: "G3:w", B: "C3:w" }), ruleId: "vozes.espacamento", hint: "Meça a distância entre as vozes superiores." },
  { score: s("err-sensivel-dobrada", { S: "B4:w", A: "G4:w", T: "B3:w", B: "G2:w" }), ruleId: "harmonia.sensivel-dobrada", hint: "Qual nota aparece duas vezes neste V?" },
  { score: s("err-segunda-aumentada", { S: "r:h r:h", A: "F4:h G#4:h", T: "r:h r:h", B: "r:h r:h" }, "Am"), ruleId: "melodia.intervalo-aumentado", hint: "Classifique o intervalo melódico do contralto." },
  { score: s("err-sensivel-sem-resolucao", { S: "B4:h G4:h", A: "G4:h E4:h", T: "D4:h C4:h", B: "G2:h C3:h" }), ruleId: "harmonia.resolucao-da-sensivel", hint: "Para onde vai a sensível do soprano?" },
  { score: s("err-setima", { S: "F4:h G4:h", A: "D4:h E4:h", T: "B3:h C4:h", B: "G2:h C3:h" }), ruleId: "harmonia.resolucao-da-setima", hint: "Encontre a sétima do V7 e acompanhe-a." },
];

export interface CadenceSnippet {
  readonly score: Score;
  readonly cadence: "autentica" | "plagal" | "semicadencia" | "engano";
}

export const CADENCE_PT: Record<CadenceSnippet["cadence"], string> = {
  autentica: "Cadência autêntica (V → I)",
  plagal: "Cadência plagal (IV → I)",
  semicadencia: "Semicadência (termina em V)",
  engano: "Cadência de engano (V → vi)",
};

export const CADENCE_SNIPPETS: readonly CadenceSnippet[] = [
  { score: s("cad-autentica", { S: "B4:h C5:h", A: "G4:h G4:h", T: "D4:h E4:h", B: "G2:h C3:h" }), cadence: "autentica" },
  { score: s("cad-plagal", { S: "C5:h C5:h", A: "F4:h E4:h", T: "A3:h G3:h", B: "F3:h C3:h" }), cadence: "plagal" },
  { score: s("cad-semi", { S: "C5:h B4:h", A: "E4:h D4:h", T: "G3:h G3:h", B: "C3:h G2:h" }), cadence: "semicadencia" },
  { score: s("cad-engano", { S: "B4:h C5:h", A: "D4:h C4:h", T: "G3:h E3:h", B: "G2:h A2:h" }), cadence: "engano" },
];

const C_CHORD = { A: "G4:w", T: "E4:w", B: "C3:w" };
const C_CHORD_2 = { A: "E4:w", T: "G3:w", B: "C3:w" };

export interface NctSnippet {
  readonly score: Score;
  readonly kind: NctKind;
}

export const NCT_SNIPPETS: readonly NctSnippet[] = [
  { score: s("nct-passagem", { S: "E5:q D5:q C5:h", A: "G4:w", T: "C4:w", B: "C3:w" }), kind: "passagem" },
  { score: s("nct-bordadura", { S: "C5:q D5:q C5:h", ...C_CHORD_2 }), kind: "bordadura" },
  { score: s("nct-retardo", { S: "D5:h~ D5:q C5:q", A: "G4:h E4:h", T: "B3:h C4:h", B: "G2:h C3:h" }), kind: "retardo" },
  { score: s("nct-apojatura", { S: "G4:h D5:q C5:q", ...C_CHORD }), kind: "apojatura" },
  { score: s("nct-escapada", { S: "C5:q D5:q G4:h", ...C_CHORD_2 }), kind: "escapada" },
  { score: s("nct-antecipacao", { S: "B4:h B4:q C5:q | C5:w", A: "G4:w | G4:w", T: "D4:w | E4:w", B: "G2:w | C3:w" }), kind: "antecipacao" },
];

type Voices = Record<"S" | "A" | "T" | "B", string>;

/**
 * Baixo dado e canto dado: uma voz é dada e o aluno escolhe a realização das
 * outras três. A realização correta não tem erros nem alertas no motor; cada
 * alternativa errada contém um problema de condução que o motor identifica.
 */
export interface RealizationProblem {
  readonly id: string;
  readonly mode: "baixo-dado" | "canto-dado";
  readonly key: string;
  readonly correct: Voices;
  readonly wrong: readonly Voices[];
}

export const REALIZATION_PROBLEMS: readonly RealizationProblem[] = [
  {
    id: "bd-i-v-i",
    mode: "baixo-dado",
    key: "C",
    correct: { S: "E5:h D5:h | C5:w", A: "G4:h G4:h | E4:w", T: "C4:h B3:h | C4:w", B: "C3:h G2:h | C3:w" },
    wrong: [
      { S: "E5:h D5:h | C5:w", A: "G4:h G4:h | E4:w", T: "E4:h D4:h | C4:w", B: "C3:h G2:h | C3:w" },
      { S: "E5:h B4:h | C5:w", A: "G4:h G4:h | E4:w", T: "C4:h B3:h | C4:w", B: "C3:h G2:h | C3:w" },
      { S: "E5:h D5:h | C5:w", A: "C4:h B3:h | E4:w", T: "G4:h G4:h | C4:w", B: "C3:h G2:h | C3:w" },
    ],
  },
  {
    id: "bd-iv-v-i",
    mode: "baixo-dado",
    key: "G",
    correct: { S: "G4:h F#4:h | G4:w", A: "E4:h D4:h | D4:w", T: "C4:h A3:h | B3:w", B: "C3:h D3:h | G2:w" },
    wrong: [
      { S: "G4:h A4:h | G4:w", A: "E4:h F#4:h | G4:w", T: "C4:h D4:h | D4:w", B: "C3:h D3:h | G2:w" },
      { S: "G4:h F#4:h | G4:w", A: "E4:h D4:h | D4:w", T: "C4:h F#3:h | B3:w", B: "C3:h D3:h | G2:w" },
      { S: "G4:h F#4:h | G4:w", A: "E4:h A4:h | D4:w", T: "C4:h D4:h | B3:w", B: "C3:h D3:h | G2:w" },
    ],
  },
  {
    id: "cd-i-v-i",
    mode: "canto-dado",
    key: "C",
    correct: { S: "C5:h B4:h | C5:w", A: "G4:h G4:h | G4:w", T: "E4:h D4:h | E4:w", B: "C3:h G2:h | C3:w" },
    wrong: [
      { S: "C5:h B4:h | C5:w", A: "G4:h G4:h | G4:w", T: "E4:h D4:h | E4:w", B: "C3:h B2:h | C3:w" },
      { S: "C5:h B4:h | C5:w", A: "G4:h G4:h | G4:w", T: "E4:h B3:h | C4:w", B: "C3:h G2:h | C3:w" },
      { S: "C5:h B4:h | C5:w", A: "G4:h D5:h | G4:w", T: "E4:h G4:h | E4:w", B: "C3:h G2:h | C3:w" },
    ],
  },
  {
    id: "cd-i-v-i-fa",
    mode: "canto-dado",
    key: "F",
    correct: { S: "A4:h G4:h | F4:w", A: "F4:h E4:h | F4:w", T: "C4:h C4:h | A3:w", B: "F3:h C3:h | F3:w" },
    wrong: [
      { S: "A4:h G4:h | F4:w", A: "F4:h E4:h | F4:w", T: "C4:h G3:h | A3:w", B: "F3:h C3:h | F3:w" },
      { S: "A4:h G4:h | F4:w", A: "F4:h E4:h | F4:w", T: "C4:h E4:h | A3:w", B: "F3:h C3:h | F3:w" },
      { S: "A4:h G4:h | F4:w", A: "F4:h A4:h | F4:w", T: "C4:h E4:h | A3:w", B: "F3:h C3:h | F3:w" },
    ],
  },
];

export function realizationScore(p: RealizationProblem, voices: Voices): Score {
  return s(`${p.id}-${Object.values(voices).join("").length}`, voices, p.key);
}
