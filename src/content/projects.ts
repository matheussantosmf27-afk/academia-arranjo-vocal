import type { VoiceId } from "@/domain/music/formations";
import type { Score, StyleProfileId } from "@/domain/music/score";
import { scoreFromText } from "@/domain/music/text-notation";

export interface ProjectSpec {
  readonly id: string;
  readonly title: string;
  readonly level: number;
  readonly lessonId: string;
  readonly summary: string;
  readonly steps: readonly string[];
  readonly starting: Score;
  readonly melodyVoice: VoiceId;
  readonly style: StyleProfileId;
  /** Perguntas que o aluno responde para justificar as decisões. */
  readonly justificationPrompts: readonly string[];
}

const R4 = "r:w | r:w | r:w | r:w";
const R6 = "r:w | r:w | r:w | r:w | r:w | r:w";

export const PROJECTS: readonly ProjectSpec[] = [
  {
    id: "hino-satb",
    title: "Hino a quatro vozes (SATB)",
    level: 3,
    lessonId: "harmonizacao-satb",
    summary: "Harmonize uma melodia original de hino em Sol maior com acordes primários, ii e cadências claras.",
    steps: [
      "Analise a melodia: frases, ponto culminante e cadências implícitas.",
      "Escreva o baixo em contraponto com o soprano (movimento contrário, inversões para linhas por grau).",
      "Complete contralto e tenor pelo menor movimento.",
      "Revise com o motor até não haver erros nem alertas e gere a avaliação.",
    ],
    starting: scoreFromText({
      id: "projeto-hino-satb",
      title: "Hino a quatro vozes",
      formation: "SATB",
      key: "G",
      time: "4/4",
      tempo: 76,
      voices: { S: "G4:q A4:q B4:q G4:q | A4:q B4:q A4:h | B4:q C5:q D5:q B4:q | A4:q F#4:q G4:h", A: R4, T: R4, B: R4 },
    }),
    melodyVoice: "S",
    style: "coral-tradicional",
    justificationPrompts: ["Que cadência você escolheu para o fim de cada frase e por quê?", "Onde você usou inversões no baixo e com que objetivo?", "Que problema de condução você encontrou e como resolveu?"],
  },
  {
    id: "adaptacao-ttbb",
    title: "Adaptação para coro masculino (TTBB)",
    level: 3,
    lessonId: "escrita-ttbb",
    summary: "A melodia do coral de referência está no Tenor II. Reescreva o arranjo para TTBB respeitando extensões e limites graves.",
    steps: [
      "Mantenha a melodia no Tenor II.",
      "Use quinta ou oitava entre baixo e barítono; terças e sétimas nos tenores.",
      "Se necessário, transponha (Propriedades → Tonalidade) para a fundamental do baixo ficar em G2–C3.",
      "Compare com a versão SATB e gere a avaliação.",
    ],
    starting: scoreFromText({
      id: "projeto-adaptacao-ttbb",
      title: "Adaptação TTBB",
      formation: "TTBB",
      key: "C",
      time: "4/4",
      tempo: 72,
      voices: { T1: R4, T2: "G3:q F3:q G3:q G3:q | A3:q A3:q G3:q G3:q | C4:q C4:q C4:q B3:q | C4:w", B1: R4, B2: R4 },
    }),
    melodyVoice: "T2",
    style: "coral-tradicional",
    justificationPrompts: ["Como você distribuiu as notas do acorde entre as quatro vozes masculinas?", "Que cuidados tomou com os limites graves?"],
  },
  {
    id: "arranjo-completo",
    title: "Arranjo completo com introdução",
    level: 5,
    lessonId: "analise-estilistica-revisao",
    summary: "Harmonize a melodia em duas frases, escreva dois compassos de introdução e prepare a partitura final com dinâmicas e respirações.",
    steps: [
      "Os dois primeiros compassos estão vazios: escreva neles a introdução (copiar/colar ajuda a reaproveitar a cadência final).",
      "Harmonize as duas frases (semicadência e cadência autêntica).",
      "Use ao menos uma dominante secundária e uma nota estranha bem tratada.",
      "Marque dinâmicas e respirações; exporte MusicXML, MIDI e PDF.",
    ],
    starting: scoreFromText({
      id: "projeto-arranjo-completo",
      title: "Arranjo completo",
      formation: "SATB",
      key: "C",
      time: "4/4",
      tempo: 80,
      voices: { S: "r:w | r:w | E4:q G4:q C5:q B4:q | A4:h G4:q r:q | A4:q B4:q C5:q D5:q | C5:w", A: R6, T: R6, B: R6 },
    }),
    melodyVoice: "S",
    style: "coral-contemporaneo",
    justificationPrompts: ["Que material da canção você usou na introdução?", "Onde está a dominante secundária e para onde ela resolve?", "Que escolhas estéticas você fez conscientemente (mesmo que o motor as aponte)?"],
  },
];

export function getProject(id: string): ProjectSpec | undefined {
  return PROJECTS.find((p) => p.id === id);
}
