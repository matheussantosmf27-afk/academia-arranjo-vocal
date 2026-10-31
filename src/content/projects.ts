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
const R7 = `${R6} | r:w`;
const R8 = `${R4} | ${R4}`;

export const PROJECTS: readonly ProjectSpec[] = [
  {
    id: "hino-satb",
    title: "Hino a quatro vozes (SATB)",
    level: 2,
    lessonId: "harmonizacao-satb",
    summary: "Harmonize as duas últimas frases da Doxologia (Old 100th, Saltério de Genebra, 1551; domínio público), em Lá maior, com acordes primários, ii e cadências claras.",
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
      key: "A",
      time: "4/4",
      tempo: 76,
      voices: { S: 'A4:h"Him B4:q"serve C#5:q"with | B4:q"mirth, A4:q"His F#4:h"praise | G#4:h"forth A4:h"tell; | E5:h"Come C#5:h"ye | A4:h"be- B4:q"fore D5:q"Him | C#5:h"and B4:h"re- | A4:w"joice.', A: R7, T: R7, B: R7 },
    }),
    melodyVoice: "S",
    style: "coral-tradicional",
    justificationPrompts: ["Que cadência você escolheu para o fim de cada frase e por quê?", "Onde você usou inversões no baixo e com que objetivo?", "Que problema de condução você encontrou e como resolveu?"],
  },
  {
    id: "adaptacao-ttbb",
    title: "Adaptação para coro masculino (TTBB)",
    level: 2,
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
    level: 4,
    lessonId: "analise-estilistica-revisao",
    summary: "Harmonize 'Ah! vous dirai-je, maman' (a melodia de 'Brilha, brilha, estrelinha'; domínio público), em duas frases, escreva dois compassos de introdução e prepare a partitura final com dinâmicas e respirações.",
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
      key: "G",
      time: "4/4",
      tempo: 80,
      voices: { S: 'r:w | r:w | G4:q"Ah! G4:q"vous D5:q"di- D5:q"rai- | E5:q"je, E5:q"ma- D5:h"man, | C5:q"ce C5:q"qui B4:q"cau- B4:q"se | A4:q"mon A4:q"tour- G4:h"ment?', A: R6, T: R6, B: R6 },
    }),
    melodyVoice: "S",
    style: "coral-contemporaneo",
    justificationPrompts: ["Que material da canção você usou na introdução?", "Onde está a dominante secundária e para onde ela resolve?", "Que escolhas estéticas você fez conscientemente (mesmo que o motor as aponte)?"],
  },
  {
    id: "quarteto-gospel-ttbb",
    title: "Quarteto gospel (TTBB)",
    level: 4,
    lessonId: "ttbb-modulacao-final",
    summary: "A 2ª frase do 'Hino à Alegria' (Beethoven; domínio público) está no lead (Tenor II), em Sol maior. Arranje-a para quarteto masculino com chamada e resposta, uma cor gospel e uma última frase meio tom acima.",
    steps: [
      "Compassos 1–4: harmonize o lead com o tenor acima, barítono e baixo (fundamental e quinta embaixo, terça nos tenores).",
      "Use ao menos uma cor do quarteto gospel (I6, Imaj7, iv6 emprestado ou baixo pedal).",
      "Compassos 5–6: o baixo chama e o trio responde; termine o compasso 6 no V7 de Lá♭ (E♭7).",
      "Compassos 7–8: repita o final da melodia meio tom acima (Lá♭) e escreva uma tag com nota longa do lead.",
      "Revise no estilo popular, confira a resolução da sétima e gere a avaliação.",
    ],
    starting: scoreFromText({
      id: "projeto-quarteto-gospel",
      title: "Quarteto gospel",
      formation: "TTBB",
      key: "G",
      time: "4/4",
      tempo: 76,
      voices: {
        T1: R8,
        T2: 'B3:q"Wir B3:q"be- C4:q"tre- D4:q"ten | D4:q"feu- C4:q"er- B3:q"trun- A3:q"ken, | G3:q"Himm- G3:q"li- A3:q"sche, B3:q"dein | A3:q."Hei- G3:8"lig- G3:h"tum! | r:w | r:w | r:w | r:w',
        B1: R8,
        B2: R8,
      },
    }),
    melodyVoice: "T2",
    style: "popular-a-cappella",
    justificationPrompts: [
      "Onde o tenor ficou acima do lead e onde o barítono cruzou a melodia? Por quê?",
      "Que cor gospel você usou e em que voz está a nota característica?",
      "Como você preparou a modulação e para onde foi a sétima do E♭7?",
    ],
  },
  {
    id: "acappella-gospel-ttbb",
    title: "Grupo a cappella gospel (TTBB)",
    level: 4,
    lessonId: "acappella-modulacoes",
    summary: "A 1ª frase de 'Santo! Santo! Santo!' (Nicaea, Dykes, 1861; domínio público) está no barítono, em Ré maior. Arranje para quarteto a cappella: solo com 'uh', refrão em bloco com eco, baixo em ostinato e a repetição do refrão um tom acima.",
    steps: [
      "Compassos 1–4: solo do barítono; baixo em 'uh' ou em ostinato, tenores em silêncio ou em pad.",
      "Compassos 5–6: refrão em bloco (todos com o texto) e um eco curto de uma voz.",
      "Compasso 6: prepare a modulação com a dominante de Mi maior (B7).",
      "Compassos 7–8: repita o refrão em Mi maior e termine com uma tag.",
      "Revise no estilo popular e gere a avaliação.",
    ],
    starting: scoreFromText({
      id: "projeto-acappella-gospel",
      title: "Grupo a cappella gospel",
      formation: "TTBB",
      key: "D",
      time: "4/4",
      tempo: 84,
      voices: {
        T1: R8,
        T2: R8,
        B1: 'D3:q"Ho- D3:q"ly, F#3:q"ho- F#3:q"ly, | A3:h"ho- A3:h"ly! | B3:h"Lord B3:q"God B3:q"Al- | A3:h"migh- F#3:h"ty! | r:w | r:w | r:w | r:w',
        B2: R8,
      },
    }),
    melodyVoice: "B1",
    style: "popular-a-cappella",
    justificationPrompts: [
      "Como você distribuiu a melodia entre os solistas e o quarteto?",
      "Onde está o eco ou o texto contra 'uh', e por que ali?",
      "Como você preparou a modulação e para onde foi a sétima da dominante?",
    ],
  },
  {
    id: "rearmonizacao-refrao",
    title: "Rearmonização do segundo refrão (SATB)",
    level: 4,
    lessonId: "rearm-no-arranjo",
    summary: "A 1ª frase de 'Santo! Santo! Santo!' (domínio público) aparece duas vezes. A primeira já está harmonizada; rearmonize a repetição com pelo menos três técnicas da disciplina, mantendo a melodia.",
    steps: [
      "Compassos 1–4: ouça a harmonia simples e não altere nada.",
      "Compassos 5–8: rearmonize com ao menos três técnicas (substituição diatônica, dominante secundária, SubV, empréstimo modal, diminuto, pedal ou linha de baixo).",
      "Mantenha notas comuns nas mesmas vozes e resolva sensíveis e sétimas.",
      "Cante cada voz interna, revise no motor e gere a avaliação.",
    ],
    starting: scoreFromText({
      id: "projeto-rearmonizacao",
      title: "Rearmonização do segundo refrão",
      formation: "SATB",
      key: "G",
      time: "4/4",
      tempo: 72,
      voices: {
        S: 'G4:q"Ho- G4:q"ly, B4:q"ho- B4:q"ly, | D5:h"ho- D5:h"ly! | E5:h"Lord E5:q"God E5:q"Al- | D5:h"migh- B4:q"ty! r:q | G4:q"Ho- G4:q"ly, B4:q"ho- B4:q"ly, | D5:h"ho- D5:h"ly! | E5:h"Lord E5:q"God E5:q"Al- | D5:h"migh- B4:h"ty!',
        A: `D4:h G4:h | F#4:h G4:h | G4:h G4:h | D4:h D4:q r:q | ${R4}`,
        T: `B3:h D4:h | D4:h B3:h | G3:h G3:h | F#3:h G3:q r:q | ${R4}`,
        B: `G2:h G3:h | D3:h G2:h | C3:h C3:h | D3:h G2:q r:q | ${R4}`,
      },
    }),
    melodyVoice: "S",
    style: "coral-contemporaneo",
    justificationPrompts: [
      "Quais técnicas de rearmonização você usou e em que compassos?",
      "Que nota da melodia cada acorde novo apoia (fundamental, terça, quinta, sétima, tensão)?",
      "Como você resolveu as sensíveis e sétimas das dominantes novas?",
    ],
  },
  {
    id: "descant-hino",
    title: "Descant para um hino (SATB)",
    level: 3,
    lessonId: "cp-descant-quodlibet",
    summary: "A 1ª frase de 'Santo! Santo! Santo!' (domínio público) está no tenor e o baixo já está escrito. Escreva um descant no soprano, em movimento contrário à melodia, e complete o contralto.",
    steps: [
      "Cante a melodia do tenor e marque onde ela sobe e onde desce.",
      "Escreva o descant no soprano preferindo movimento contrário, terças, sextas e décimas com a melodia.",
      "Complete o contralto com as notas que faltam em cada acorde.",
      "Revise no motor (paralelas, cruzamentos, espaçamento) e gere a avaliação.",
    ],
    starting: scoreFromText({
      id: "projeto-descant",
      title: "Descant para um hino",
      formation: "SATB",
      key: "G",
      time: "4/4",
      tempo: 72,
      voices: {
        S: R4,
        A: R4,
        T: 'G3:q"Ho- G3:q"ly, B3:q"ho- B3:q"ly, | D4:h"ho- D4:h"ly! | E4:h"Lord E4:q"God E4:q"Al- | D4:h"migh- B3:h"ty!',
        B: "G2:h G3:h | D3:h G2:h | C3:h C3:h | D3:h G2:h",
      },
    }),
    melodyVoice: "T",
    style: "coral-tradicional",
    justificationPrompts: [
      "Em que compassos o descant anda em movimento contrário à melodia?",
      "Onde está o ponto culminante do descant e por que ali?",
      "Como você evitou oitavas e quintas paralelas entre descant e melodia?",
    ],
  },
  {
    id: "hino-coro-feminino",
    title: "Hino para coro feminino (SSAA)",
    level: 4,
    lessonId: "ssa-adaptacao",
    summary: "A 2ª frase do 'Hino à Alegria' (Beethoven; domínio público) está no Soprano I, em Sol maior. Escreva Soprano II, Contralto I e Contralto II, com o Contralto II como linha de baixo.",
    steps: [
      "Cante a melodia e escolha um acorde por mínima.",
      "Escreva o Contralto II como linha de baixo (fundamentais e terças, entre Sol3 e Ré4).",
      "Complete Soprano II e Contralto I em posição fechada, sem passar de uma oitava entre vizinhas.",
      "Revise no motor (paralelas, cruzamentos, espaçamento) e gere a avaliação.",
    ],
    starting: scoreFromText({
      id: "projeto-coro-feminino",
      title: "Hino para coro feminino",
      formation: "SSAA",
      key: "G",
      time: "4/4",
      tempo: 72,
      voices: {
        S1: 'B4:q"Wir B4:q"be- C5:q"tre- D5:q"ten | D5:q"feu- C5:q"er- B4:q"trun- A4:q"ken, | G4:q"Himm- G4:q"li- A4:q"sche, B4:q"dein | A4:q."Hei- G4:8"lig- G4:h"tum!',
        S2: R4,
        A1: R4,
        A2: R4,
      },
    }),
    melodyVoice: "S1",
    style: "coral-tradicional",
    justificationPrompts: [
      "Qual é a linha do Contralto II e onde você usou inversões?",
      "Que nota você dobrou em cada acorde e por quê?",
      "Como você evitou paralelas e cruzamentos com a melodia?",
    ],
  },
];

export function getProject(id: string): ProjectSpec | undefined {
  return PROJECTS.find((p) => p.id === id);
}
