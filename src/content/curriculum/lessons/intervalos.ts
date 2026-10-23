import { scoreFromText } from "@/domain/music/text-notation";
import type { Lesson } from "../types";

const INTERVALOS_MELODICOS = scoreFromText({
  id: "licao2-melodicos",
  title: "Intervalos melódicos fáceis e difíceis (contralto, lá menor)",
  formation: "SATB",
  key: "Am",
  time: "4/4",
  voices: {
    S: "r:w | r:w",
    A: "A3:q C4:q E4:q D4:q | C4:q F4:q G#4:q A4:q",
    T: "r:w | r:w",
    B: "r:w | r:w",
  },
});

const INTERVALOS_HARMONICOS = scoreFromText({
  id: "licao2-harmonicos",
  title: "Consonâncias perfeitas e imperfeitas entre soprano e baixo",
  formation: "SATB",
  key: "C",
  time: "4/4",
  voices: {
    S: "C5:h E5:h | D5:h C5:h",
    A: "r:w | r:w",
    T: "r:w | r:w",
    B: "C3:h C3:h | B2:h C3:h",
  },
});

export const lessonIntervalos: Lesson = {
  id: "intervalos",
  title: "Intervalos: classificação, enarmonia e escuta",
  summary:
    "Número e qualidade, intervalos compostos, inversão, enarmonia e o que cada intervalo significa para quem canta — o vocabulário mínimo de toda análise de condução.",
  levelId: "n1",
  unitId: "n1-u1",
  status: "disponivel",
  prerequisites: ["vozes-claves-extensoes"],
  estimatedMinutes: 60,
  competencies: ["intervalos", "percepcao", "leitura-vocal"],
  objectives: [
    "Classificar intervalos simples e compostos (número e qualidade) a partir da partitura, com pelo menos 80% de acerto.",
    "Distinguir intervalos enarmônicos (por exemplo, 4ª aumentada × 5ª diminuta) pela grafia.",
    "Calcular a inversão de um intervalo (número complementar a 9 e qualidade invertida).",
    "Explicar por que consonâncias perfeitas e intervalos aumentados exigem atenção especial na escrita vocal.",
  ],
  sections: [
    {
      title: "1. Número: conte as letras, não as teclas",
      blocks: [
        {
          type: "paragraph",
          text: "O número do intervalo é a quantidade de nomes de notas envolvidos, contando a primeira e a última. De C a E: C, D, E — três letras, portanto uma terça. Os acidentes não mudam o número: C–E♭, C–E e C♯–E são todos terças.",
        },
        {
          type: "paragraph",
          text: "Isso não é burocracia de nomenclatura. A grafia diz ao cantor qual é a função da nota: E♭ é a terça menor de C; D♯ é uma segunda aumentada, que pede resolução para E. Mesmo som no piano, função diferente na harmonia.",
        },
      ],
    },
    {
      title: "2. Qualidade: justos, maiores, menores, aumentados e diminutos",
      blocks: [
        {
          type: "table",
          caption: "Intervalos simples a partir de Dó",
          headers: ["Intervalo", "Exemplo", "Semitons", "Família"],
          rows: [
            ["Uníssono justo", "C–C", "0", "Justo"],
            ["2ª menor / 2ª maior", "C–D♭ / C–D", "1 / 2", "Maior/menor"],
            ["3ª menor / 3ª maior", "C–E♭ / C–E", "3 / 4", "Maior/menor"],
            ["4ª justa / 4ª aumentada", "C–F / C–F♯", "5 / 6", "Justo"],
            ["5ª diminuta / 5ª justa", "C–G♭ / C–G", "6 / 7", "Justo"],
            ["6ª menor / 6ª maior", "C–A♭ / C–A", "8 / 9", "Maior/menor"],
            ["7ª menor / 7ª maior", "C–B♭ / C–B", "10 / 11", "Maior/menor"],
            ["8ª justa", "C–C", "12", "Justo"],
          ],
        },
        {
          type: "list",
          items: [
            "Uníssono, 4ª, 5ª e 8ª pertencem à família dos justos: justo → aumentado (+1 semitom) ou diminuto (−1).",
            "2ª, 3ª, 6ª e 7ª pertencem à família maior/menor: maior → aumentado (+1); menor → diminuto (−1).",
            "Método rápido: imagine a escala maior da nota inferior. Se a nota superior pertence a ela, o intervalo é maior (2, 3, 6, 7) ou justo (1, 4, 5, 8). Depois ajuste pelo acidente.",
          ],
        },
        {
          type: "callout",
          tone: "atencao",
          title: "Enarmonia",
          text: "F–B (4ª aumentada) e F–C♭ (5ª diminuta) têm 6 semitons, mas são intervalos diferentes. O motor desta plataforma classifica pela grafia: escrever errado o acidente muda a análise harmônica e pode esconder ou criar 'quintas paralelas'.",
        },
      ],
    },
    {
      title: "3. Intervalos compostos e inversão",
      blocks: [
        {
          type: "paragraph",
          text: "Intervalos maiores que a oitava são compostos: 9ª = 8ª + 2ª, 10ª = 8ª + 3ª, 12ª = 8ª + 5ª. Para a condução de vozes, uma 12ª justa entre soprano e baixo se comporta como uma 5ª justa: duas 12ªs seguidas em movimento paralelo são quintas paralelas.",
        },
        {
          type: "paragraph",
          text: "Inverter um intervalo é levar a nota inferior uma oitava acima. O número da inversão é o complemento para 9 (3ª ↔ 6ª, 2ª ↔ 7ª, 4ª ↔ 5ª) e a qualidade se inverte (maior ↔ menor, aumentado ↔ diminuto; justo continua justo). Em escrita a quatro vozes, isso explica por que trocar duas vozes de lugar transforma uma 3ª numa 6ª — ambas consonâncias imperfeitas.",
        },
      ],
    },
    {
      title: "4. O que o intervalo significa para o coro",
      blocks: [
        {
          type: "list",
          items: [
            "Consonâncias perfeitas (uníssono, 5ª, 8ª): máxima fusão. Ótimas para estabilidade; perigosas em paralelo, porque duas vozes viram uma.",
            "Consonâncias imperfeitas (3ª, 6ª): dão cor e permitem movimento paralelo sem perda de independência — terças e sextas paralelas são a base da escrita a duas vozes.",
            "Dissonâncias (2ª, 7ª, intervalos aumentados e diminutos): criam tensão e pedem tratamento — preparação e resolução, assunto do Nível 2.",
            "Melodicamente, 2ªs e 3ªs são fáceis de cantar; 4ªs, 5ªs, 6ªs e 8ªs exigem ouvido; 7ªs e intervalos aumentados são difíceis e, no estilo coral tradicional, evitados.",
          ],
        },
        {
          type: "example",
          score: INTERVALOS_MELODICOS,
          verdict: "incorreto",
          caption: "Linha de contralto em lá menor com 2ª aumentada (F → G♯)",
          commentary:
            "O primeiro compasso é cantável: arpejo consonante e grau conjunto. No segundo, F4 → G♯4 é uma 2ª aumentada (3 semitons, grafada como segunda), difícil de afinar sem apoio. A correção usual é a escala menor melódica ascendente: F♯4 → G♯4.",
        },
        {
          type: "example",
          score: INTERVALOS_HARMONICOS,
          verdict: "correto",
          caption: "Soprano e baixo: 15ª, 17ª, 13ª, 15ª",
          commentary:
            "C5/C3 é uma 15ª (duas oitavas, consonância perfeita); E5/C3 uma 17ª (3ª composta); D5/B2 uma 13ª maior (6ª composta); C5/C3 de novo duas oitavas. Entre as duas consonâncias perfeitas há consonâncias imperfeitas, e a chegada à última 15ª é por movimento contrário: não há paralelismo.",
        },
        {
          type: "listening",
          title: "Escute os intervalos dentro de uma linha",
          score: INTERVALOS_MELODICOS,
          instructions: ["Cante a linha do contralto junto com o áudio.", "Repare na dificuldade de afinar o G♯4 depois do F4."],
          focus: [["A"]],
        },
      ],
    },
  ],
  exercises: {
    id: "ex-intervalos",
    title: "Verificação: intervalos",
    instructions:
      "Classifique os intervalos. Você pode ouvir cada um. O domínio exige 80% de acerto e os dois itens conceituais essenciais.",
    minScore: 0.8,
    requiredItemIds: ["int-enarmonia", "int-inversao"],
    staticItems: [
      {
        id: "int-enarmonia",
        kind: "choice",
        skill: "intervalos",
        prompt: "C–F♯ e C–G♭ soam iguais no piano. Como se classificam?",
        options: [
          { id: "a", label: "Ambos são 4ª aumentada" },
          { id: "b", label: "C–F♯ é 4ª aumentada; C–G♭ é 5ª diminuta" },
          { id: "c", label: "Ambos são trítonos e a grafia não importa" },
        ],
        correctOptionId: "b",
        explanation: "O número depende das letras: C–F são 4 letras (4ª), C–G são 5 (5ª). Mesmo número de semitons (6), funções diferentes.",
        optionFeedback: { c: "'Trítono' descreve o som (três tons), mas a análise harmônica e a condução dependem da grafia." },
      },
      {
        id: "int-inversao",
        kind: "choice",
        skill: "intervalos",
        prompt: "Qual é a inversão de uma 3ª maior?",
        options: [
          { id: "a", label: "6ª menor" },
          { id: "b", label: "6ª maior" },
          { id: "c", label: "5ª justa" },
        ],
        correctOptionId: "a",
        explanation: "Número complementar a 9 (3 → 6) e qualidade invertida (maior → menor). Ex.: C–E (3ª M) → E–C (6ª m).",
      },
      {
        id: "int-composto",
        kind: "choice",
        skill: "intervalos",
        prompt: "Soprano em G4 e baixo em C3 formam uma 12ª justa. Para a regra de paralelismo, isso equivale a…",
        options: [
          { id: "a", label: "Uma 5ª justa" },
          { id: "b", label: "Uma 3ª" },
          { id: "c", label: "Nada: intervalos compostos não contam" },
        ],
        correctOptionId: "a",
        explanation: "12ª = 8ª + 5ª. Duas 12ªs justas consecutivas em movimento paralelo são quintas paralelas.",
      },
    ],
    generators: [
      { type: "interval-identification", count: 8 },
      { type: "interval-identification", count: 3, earOnly: true, maxNumber: 8 },
    ],
  },
  masteryDescription: "≥ 80% de acertos, incluindo enarmonia e inversão.",
  application: {
    title: "Aplicação no Estúdio",
    steps: [
      "No coral SATB de exemplo, abra a análise e identifique, compasso a compasso, o intervalo entre soprano e baixo em cada acorde.",
      "Marque onde aparecem consonâncias perfeitas (5ª, 8ª e compostas) e verifique se alguma delas é alcançada em movimento paralelo.",
      "Mova o baixo do 2º acorde (D3) para C3 com ↓ e veja o motor apontar a mudança: que intervalos foram criados com o soprano?",
    ],
  },
};
