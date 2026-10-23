import { lessonIntervalos } from "./lessons/intervalos";
import { lessonCadencias, lessonEscalas, lessonFuncoes, lessonRitmo, lessonTetrades } from "./lessons/nivel1";
import { lessonDuplicacoes, lessonEspacamento, lessonMovimentos, lessonNotasEstranhas, lessonParalelas, lessonSetimas } from "./lessons/nivel2";
import {
  lessonAcompanhamento,
  lessonAnaliseMelodica,
  lessonContraponto,
  lessonEscritaTtbb,
  lessonEstilo,
  lessonHarmonizacao,
  lessonModulacao,
  lessonProsodia,
} from "./lessons/nivel3a5";
import { lessonTriades } from "./lessons/triades-inversoes";
import { lessonVozes } from "./lessons/vozes-claves-extensoes";
import type { CompetencyId, Lesson, Level } from "./types";

export const LESSONS: readonly Lesson[] = [
  // Nível 1 — Fundamentos para o arranjador
  lessonVozes,
  lessonIntervalos,
  lessonEscalas,
  lessonRitmo,
  lessonTriades,
  lessonTetrades,
  lessonFuncoes,
  lessonCadencias,
  // Nível 2 — Condução de vozes
  lessonMovimentos,
  lessonParalelas,
  lessonEspacamento,
  lessonDuplicacoes,
  lessonNotasEstranhas,
  lessonSetimas,
  // Nível 3 — Harmonização de melodias
  lessonAnaliseMelodica,
  lessonHarmonizacao,
  lessonEscritaTtbb,
  // Nível 4 — Linhas, contraponto e texto
  lessonContraponto,
  lessonProsodia,
  // Nível 5 — Arranjo avançado
  lessonAcompanhamento,
  lessonModulacao,
  lessonEstilo,
];

export const LEVELS: readonly Level[] = [
  {
    id: "n1",
    number: 1,
    title: "Fundamentos para o arranjador",
    description: "Vozes reais, leitura, intervalos, acordes e funções — revisados do ponto de vista de quem escreve para coro.",
    units: [
      {
        id: "n1-u1",
        title: "Vozes e materiais",
        description: "Extensões SATB/TTBB, claves, intervalos, escalas e ritmo.",
        lessonIds: ["vozes-claves-extensoes", "intervalos", "escalas-tonalidades", "ritmo-metrica-texto"],
      },
      {
        id: "n1-u2",
        title: "Acordes e funções",
        description: "Tríades, tétrades, graus, funções e cadências a quatro vozes.",
        lessonIds: ["triades-inversoes", "tetrades", "graus-funcoes", "cadencias"],
        project: { title: "Cadências em SATB e TTBB", description: "Escrever as quatro cadências principais nas duas formações, com análise." },
      },
    ],
    finalProject: {
      title: "Projeto 1 — Hino a quatro vozes",
      description: "Harmonizar uma melodia de hino de 8 compassos em SATB com acordes primários e cadências, e adaptá-la para TTBB.",
    },
  },
  {
    id: "n2",
    number: 2,
    title: "Condução de vozes",
    description: "Movimentos, paralelismos, espaçamento, duplicações e tratamento de dissonâncias.",
    units: [
      { id: "n2-u1", title: "Princípios de condução", description: "Como as vozes se movem umas em relação às outras.", lessonIds: ["movimentos", "paralelas", "espacamento-cruzamento", "duplicacoes"] },
      { id: "n2-u2", title: "Dissonância", description: "Notas estranhas e resolução de sétimas.", lessonIds: ["notas-estranhas", "setimas-resolucao"] },
    ],
    finalProject: { title: "Projeto 2 — Coral em estilo tradicional", description: "Coral de 16 compassos sem erros de condução, com notas de passagem e uma cadência de engano." },
  },
  {
    id: "n3",
    number: 3,
    title: "Harmonização de melodias",
    description: "Da melodia ao arranjo: análise, escolha harmônica e escrita para as duas formações.",
    units: [
      { id: "n3-u1", title: "Da melodia ao SATB", description: "Análise melódica e harmonização.", lessonIds: ["analise-melodica", "harmonizacao-satb"] },
      { id: "n3-u2", title: "Escrita masculina", description: "Particularidades do TTBB.", lessonIds: ["escrita-ttbb"] },
    ],
    finalProject: { title: "Projeto 3 — Canção folclórica", description: "Arranjo de uma canção de domínio público em SATB e TTBB, com justificativa das escolhas." },
  },
  {
    id: "n4",
    number: 4,
    title: "Linhas, contraponto e texto",
    description: "Independência melódica, imitação, prosódia e respiração.",
    units: [{ id: "n4-u1", title: "Linhas que cantam", description: "Contraponto e texto.", lessonIds: ["contraponto-aplicado", "prosodia-respiracao"] }],
    finalProject: { title: "Projeto 4 — Moteto breve", description: "Peça curta com entradas imitativas e texto em português." },
  },
  {
    id: "n5",
    number: 5,
    title: "Arranjo avançado",
    description: "Forma, acompanhamento, modulação, reharmonização, estilo e partitura final.",
    units: [{ id: "n5-u1", title: "O arranjo completo", description: "Do esboço à partitura de ensaio.", lessonIds: ["acompanhamento-introducoes", "modulacao-reharmonizacao", "analise-estilistica-revisao"] }],
    finalProject: { title: "Projeto final — Arranjo completo", description: "Arranjo original com introdução, modulação e versões SATB e TTBB, avaliado por rubrica." },
  },
];

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

export function lessonsOfUnit(unitId: string): Lesson[] {
  return LESSONS.filter((l) => l.unitId === unitId);
}

export const COMPETENCIES: Readonly<Record<CompetencyId, string>> = {
  "leitura-vocal": "Leitura e escrita vocal",
  intervalos: "Intervalos",
  acordes: "Acordes",
  "harmonia-funcional": "Harmonia funcional",
  "conducao-de-vozes": "Condução de vozes",
  "escrita-satb": "Escrita SATB",
  "escrita-ttbb": "Escrita TTBB",
  percepcao: "Percepção auditiva",
  contraponto: "Contraponto",
  "texto-e-prosodia": "Texto e prosódia",
  arranjo: "Arranjo",
};
