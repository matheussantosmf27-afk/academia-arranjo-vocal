import { lessonIntervalos } from "./lessons/intervalos";
import { lessonTriades } from "./lessons/triades-inversoes";
import { lessonVozes } from "./lessons/vozes-claves-extensoes";
import type { CompetencyId, Lesson, Level } from "./types";

/** Lições previstas (estrutura definida; conteúdo completo nas próximas etapas). */
function planned(
  id: string,
  title: string,
  levelId: string,
  unitId: string,
  prerequisites: string[],
  competencies: CompetencyId[],
  plannedTopics: string[],
): Lesson {
  return {
    id,
    title,
    summary: plannedTopics.slice(0, 3).join(" · "),
    levelId,
    unitId,
    status: "em-preparacao",
    prerequisites,
    estimatedMinutes: 60,
    competencies,
    objectives: [],
    sections: [],
    plannedTopics,
  };
}

export const LESSONS: readonly Lesson[] = [
  // Nível 1 — Fundamentos para o arranjador
  lessonVozes,
  lessonIntervalos,
  planned("escalas-tonalidades", "Escalas, tonalidades e armaduras", "n1", "n1-u1", ["intervalos"], ["leitura-vocal", "intervalos"], [
    "Escalas maiores e as três formas da menor",
    "Ciclo de quintas e armaduras",
    "Tonalidades relativas e homônimas",
    "Escolha de tonalidade conforme a extensão do coro (SATB × TTBB)",
  ]),
  planned("ritmo-metrica-texto", "Ritmo, métrica e acentuação do texto", "n1", "n1-u1", ["vozes-claves-extensoes"], ["leitura-vocal", "texto-e-prosodia"], [
    "Compassos simples e compostos",
    "Figuras, pausas, pontos e ligaduras",
    "Sílaba tônica × tempo forte (prosódia em português)",
    "Ditado rítmico",
  ]),
  lessonTriades,
  planned("tetrades", "Tétrades e acordes de sétima", "n1", "n1-u2", ["triades-inversoes"], ["acordes"], [
    "V7, ii7, viiø7, vii°7 e IV7M",
    "Inversões e cifras ⁶₅, ⁴₃, ⁴₂",
    "Omissões em quatro vozes",
    "Sétimas em TTBB e o acorde de barbershop",
  ]),
  planned("graus-funcoes", "Graus e funções harmônicas", "n1", "n1-u2", ["triades-inversoes"], ["harmonia-funcional"], [
    "Tônica, subdominante e dominante",
    "Acordes relativos e anti-relativos",
    "Progressões típicas e ritmo harmônico",
    "Reconhecimento auditivo de funções",
  ]),
  planned("cadencias", "Cadências", "n1", "n1-u2", ["graus-funcoes"], ["harmonia-funcional", "percepcao"], [
    "Autêntica perfeita e imperfeita",
    "Plagal, à dominante (semicadência) e de engano",
    "I⁶₄ cadencial",
    "Cadências e pontuação do texto",
  ]),
  // Nível 2 — Condução de vozes
  planned("movimentos", "Movimentos entre vozes", "n2", "n2-u1", ["cadencias"], ["conducao-de-vozes"], [
    "Paralelo, semelhante, contrário e oblíquo",
    "Independência melódica",
    "Notas comuns e menor movimento",
  ]),
  planned("paralelas", "Quintas e oitavas paralelas, diretas e por contrário", "n2", "n2-u1", ["movimentos"], ["conducao-de-vozes"], [
    "Por que a prática comum evita paralelismos",
    "Exceções: quintas desiguais, diretas com soprano por grau",
    "Paralelismo como recurso em estilos populares",
  ]),
  planned("espacamento-cruzamento", "Espaçamento, cruzamento e sobreposição", "n2", "n2-u1", ["movimentos"], ["conducao-de-vozes", "escrita-ttbb"], [
    "Limites de espaçamento",
    "Limites graves de intervalo",
    "Cruzamentos intencionais em TTBB",
  ]),
  planned("duplicacoes", "Duplicações e omissões", "n2", "n2-u1", ["paralelas"], ["conducao-de-vozes", "acordes"], [
    "Duplicação por inversão e função",
    "Sensível e sétima",
    "Acordes incompletos",
  ]),
  planned("notas-estranhas", "Notas estranhas ao acorde", "n2", "n2-u2", ["duplicacoes"], ["conducao-de-vozes", "contraponto"], [
    "Passagem e bordadura",
    "Apojatura, retardo e antecipação",
    "Preparação e resolução de dissonâncias",
  ]),
  planned("setimas-resolucao", "Dissonância e resolução das sétimas", "n2", "n2-u2", ["notas-estranhas"], ["conducao-de-vozes"], [
    "Resolução do V7 e do vii°7",
    "Exceções (V⁴₃–I⁶)",
    "Sétimas em cadeias",
  ]),
  // Nível 3 — Harmonização de melodias
  planned("analise-melodica", "Análise melódica e frase", "n3", "n3-u1", ["setimas-resolucao"], ["harmonia-funcional", "texto-e-prosodia"], [
    "Contorno, ponto culminante e notas estruturais",
    "Frases, semifrases e cadências implícitas",
    "Respiração e texto",
  ]),
  planned("harmonizacao-satb", "Harmonização de melodias em SATB", "n3", "n3-u1", ["analise-melodica"], ["escrita-satb", "harmonia-funcional"], [
    "Escolha de acordes a partir da melodia",
    "Escrita do baixo e das vozes internas",
    "Revisão com o motor de validação",
  ]),
  planned("escrita-ttbb", "Escrita para TTBB", "n3", "n3-u2", ["harmonizacao-satb"], ["escrita-ttbb"], [
    "Melodia no Tenor II",
    "Fechamento, limites graves e falsete",
    "Adaptação de SATB para TTBB",
  ]),
  // Nível 4 — Linhas, contraponto e texto
  planned("contraponto-aplicado", "Contraponto aplicado ao coro", "n4", "n4-u1", ["escrita-ttbb"], ["contraponto"], [
    "Espécies como treino de independência",
    "Imitação e entradas",
    "Linhas internas cantáveis",
  ]),
  planned("prosodia-respiracao", "Prosódia, fraseado e respiração", "n4", "n4-u1", ["contraponto-aplicado"], ["texto-e-prosodia"], [
    "Acentos do português e métrica",
    "Melismas e silabação",
    "Pontos de respiração escalonada",
  ]),
  // Nível 5 — Arranjo avançado
  planned("acompanhamento-introducoes", "Acompanhamento, introduções e interlúdios", "n5", "n5-u1", ["prosodia-respiracao"], ["arranjo"], [
    "Funções do acompanhamento",
    "Introduções a partir de motivos",
    "Interlúdios e transições",
  ]),
  planned("modulacao-reharmonizacao", "Modulação e reharmonização", "n5", "n5-u1", ["acompanhamento-introducoes"], ["arranjo", "harmonia-funcional"], [
    "Modulação por acorde comum e cromática",
    "Dominantes secundárias e empréstimos",
    "Reharmonização com coerência de condução",
  ]),
  planned("analise-estilistica-revisao", "Análise estilística, revisão e preparação de partituras", "n5", "n5-u1", ["modulacao-reharmonizacao"], ["arranjo"], [
    "Comparação de estilos (coral tradicional, contemporâneo, popular)",
    "Revisão sistemática com diagnósticos",
    "Partitura de ensaio: letra, dinâmica, respirações",
  ]),
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
