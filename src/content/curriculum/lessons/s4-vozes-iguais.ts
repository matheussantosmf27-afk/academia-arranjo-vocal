import { EXR } from "../examples-rearm";
import { EXS } from "../examples-ssaa";
import type { Lesson } from "../types";

/**
 * EST407 — Vozes Iguais: Coro Feminino e Infantil (SSA/SSAA). Arranjar sem baixo
 * real, em duas pautas de clave de sol. Melodias e exemplos são originais e
 * conferidos pelo motor; obras de referência são só indicadas para escuta.
 */

export const lessonSsaFormacao: Lesson = {
  id: "ssa-formacao",
  title: "A formação de vozes iguais: SSA, SSAA, extensões e escrita",
  summary: "Soprano I e II, Contralto I e II: extensões, tessituras, as duas pautas em clave de sol e o que muda quando não há baixo real.",
  levelId: "s4",
  unitId: "s4-ssa",
  status: "disponivel",
  prerequisites: ["harmonizacao-satb", "escrita-ttbb"],
  estimatedMinutes: 50,
  competencies: ["escrita-ssaa", "leitura-vocal"],
  objectives: [
    "Classificar uma nota como dentro da tessitura, só na extensão ou fora dela para cada voz do SSAA.",
    "Escrever em duas pautas de clave de sol, com hastes para cima e para baixo.",
    "Corrigir um Contralto II escrito como baixo de coro misto, explicando o problema de extensão e de espaçamento.",
  ],
  sections: [
    {
      title: "1. Quatro vozes em duas oitavas",
      blocks: [
        { type: "paragraph", text: "Coros femininos, coros infantis e grupos de vozes agudas cantam em SSA (três vozes) ou SSAA (quatro). Todas as vozes ficam numa faixa de pouco mais de duas oitavas, de Fá3 a Lá5, quase a mesma região que o soprano e o contralto ocupam num coro misto. Não existe baixo real: a voz mais grave, o Contralto II, faz o papel de baixo." },
        {
          type: "table",
          caption: "Extensões e tessituras usadas pelo motor (SSAA)",
          headers: ["Voz", "Extensão", "Tessitura confortável", "Papel"],
          rows: [
            ["Soprano I", "Ré4–Lá5", "Fá4–Fá5", "Melodia e brilho"],
            ["Soprano II", "Dó4–Fá5", "Ré4–Ré5", "Terças e sextas sob a melodia"],
            ["Contralto I", "Lá3–Ré5", "Si3–Si4", "Centro do acorde; em SSA, a voz grave"],
            ["Contralto II", "Fá3–Dó5", "Sol3–Lá4", "Faz o baixo; abaixo de Sol3 perde volume"],
          ],
        },
        { type: "callout", tone: "satb", title: "Escrita", text: "Duas pautas em clave de sol: sopranos em cima (Soprano I com haste para cima, Soprano II para baixo) e contraltos embaixo, do mesmo jeito. Em SSA, a pauta de baixo tem só o Contralto I; no motor, a linha do Contralto II fica em pausa." },
        { type: "example", score: EXS.hino, verdict: "correto", caption: "Luz da manhã em SSAA", commentary: "Melodia no Soprano I; o Contralto II canta fundamentais (Dó4 e Sol3), o Contralto I e o Soprano II completam o acorde. Nenhuma vizinha fica a mais de uma oitava da outra." },
        { type: "listening", title: "Quatro vozes agudas", score: EXS.hino, instructions: ["Ouça o Contralto II sozinho: é ele que dá o chão.", "Ouça as duas contraltos.", "Ouça as quatro vozes."], focus: [["A2"], ["A1", "A2"], ["S1", "S2", "A1", "A2"]] },
      ],
    },
    {
      title: "2. O erro de quem vem do coro misto",
      blocks: [
        { type: "example", score: EXS.graveDemais, verdict: "incorreto", caption: "Contralto II escrito como baixo", commentary: "A mesma harmonia, com o Contralto II descendo a Dó3, como faria um baixo. A nota está fora da extensão de qualquer contralto e abre um buraco de mais de uma oitava entre as contraltos." },
        { type: "list", items: ["O acorde fica uma oitava mais alto que no coro misto: pense em terças e sextas, não em décimas.", "O Contralto II canta fundamentais e terças; quintas no grave deixam o acorde instável.", "Sem baixo real, o acorde soa mais leve: isso é uma cor, não um defeito.", "Escute coros femininos e infantis antes de escrever (ver bibliografia da disciplina)."] },
      ],
    },
  ],
  exercises: {
    id: "ex-ssa-formacao",
    title: "Verificação: a formação SSAA",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["ssa1-baixo"],
    staticItems: [
      { id: "ssa1-baixo", kind: "choice", skill: "escrita-ssaa", prompt: "Em SSAA, quem faz o papel de baixo?", options: [{ id: "a", label: "O Contralto II, a voz mais grave" }, { id: "b", label: "O Soprano I" }, { id: "c", label: "Ninguém: o acorde fica sem baixo" }], correctOptionId: "a", explanation: "A voz mais grave define o baixo do acorde, mesmo sendo uma voz aguda." },
      { id: "ssa1-claves", kind: "choice", skill: "leitura-vocal", prompt: "Como se escreve um coro SSAA em partitura reduzida?", options: [{ id: "a", label: "Duas pautas em clave de sol" }, { id: "b", label: "Clave de sol e clave de fá" }, { id: "c", label: "Clave de sol oitavada nas duas pautas" }], correctOptionId: "a", explanation: "Todas as vozes são agudas: sopranos na pauta de cima, contraltos na de baixo." },
      { id: "ssa1-grave", kind: "choice", skill: "escrita-ssaa", prompt: "Por que o Contralto II não deve descer a Dó3?", options: [{ id: "a", label: "Está fora da extensão e abre um buraco no acorde" }, { id: "b", label: "Porque Dó3 é dissonante" }, { id: "c", label: "Porque a clave de sol não tem essa nota" }], correctOptionId: "a", explanation: "Contraltos raramente passam de Fá3; o motor aponta erro de extensão." },
    ],
    generators: [{ type: "range-check", count: 3, formations: ["SSAA"] }, { type: "ssaa-voicing", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo quem faz o baixo em SSAA.",
  application: { title: "Aplicação no Estúdio", steps: ["Crie um arranjo novo em SSAA no Estúdio.", "Escreva um acorde de Dó maior com a fundamental no Contralto II e as vozes a no máximo uma oitava de distância.", "Valide e ouça cada voz."] },
};

export const lessonSsaTresVozes: Lesson = {
  id: "ssa-tres-vozes",
  title: "Escrita a três vozes (SSA): completar o acorde com três notas",
  summary: "Tríades completas sem dobramento, o que omitir nos acordes de sétima e por que a voz mais grave decide a inversão.",
  levelId: "s4",
  unitId: "s4-ssa",
  status: "disponivel",
  prerequisites: ["ssa-formacao", "tres-vozes"],
  estimatedMinutes: 55,
  competencies: ["escrita-ssaa", "conducao-de-vozes"],
  objectives: [
    "Distribuir tríades completas entre três vozes agudas.",
    "Escolher a nota omitida nos acordes de sétima (em geral a quinta).",
    "Manter a contralto em fundamentais e terças para evitar acordes instáveis.",
  ],
  sections: [
    {
      title: "1. Uma nota para cada voz",
      blocks: [
        { type: "paragraph", text: "Em SSA, cada voz canta uma nota da tríade: não sobra nada para dobrar. Quando aparece uma sétima (quatro notas), uma delas sai, e normalmente é a quinta. A contralto é a voz grave, então a nota dela decide a inversão do acorde: fundamental (estado fundamental) ou terça (primeira inversão) funcionam; a quinta (segunda inversão) só em contextos cadenciais ou de passagem." },
        {
          type: "table",
          caption: "O que fica e o que sai em três vozes",
          headers: ["Acorde", "Notas", "Em SSA", "Omissão comum"],
          rows: [["Tríade", "1 – 3 – 5", "Uma nota em cada voz", "Nenhuma (ou a quinta, dobrando a fundamental)"], ["Dominante com sétima", "1 – 3 – 5 – 7", "Fundamental, terça e sétima", "Quinta"], ["Acorde com nona (add9)", "1 – 3 – 5 – 9", "Terça, nona e fundamental", "Quinta"], ["Sus4", "1 – 4 – 5", "Uma nota em cada voz", "Nenhuma"]],
        },
        { type: "example", score: EXS.ssa, verdict: "correto", caption: "Luz da manhã em SSA", commentary: "A contralto canta Dó, Si, Dó, Ré, Dó: fundamentais e terças. No Sol7 (compasso 3), sai a quinta e ficam Si (melodia), Fá (Soprano II) e Ré (contralto); o Fá desce para Mi e o Si sobe para Dó." },
        { type: "listening", title: "Três vozes, três notas", score: EXS.ssa, instructions: ["Ouça a contralto: ela faz o baixo.", "Ouça Soprano II e contralto juntas.", "Ouça as três."], focus: [["A1"], ["S2", "A1"], ["S1", "S2", "A1"]] },
      ],
    },
    {
      title: "2. A contralto nas quintas",
      blocks: [
        { type: "example", score: EXS.ssaQuintas, verdict: "incorreto", caption: "A contralto saltando para as quintas", commentary: "A contralto canta Sol, Ré, Mi, Sol, Ré, Fá: quase sempre a quinta do acorde, o que deixa a harmonia em segunda inversão. No fim, a sétima (Fá) salta para Dó em vez de descer, e o Soprano II é empurrado para baixo da nota anterior da contralto." },
        { type: "callout", tone: "dica", title: "Regra prática", text: "Escreva primeiro a linha da contralto como se fosse um baixo (fundamentais e terças, por grau ou saltos de quarta e quinta) e só depois preencha o Soprano II." },
      ],
    },
  ],
  exercises: {
    id: "ex-ssa-tres",
    title: "Verificação: SSA",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["ssa2-omissao"],
    staticItems: [
      { id: "ssa2-omissao", kind: "choice", skill: "escrita-ssaa", prompt: "Num acorde de dominante com sétima em SSA, qual nota se omite normalmente?", options: [{ id: "a", label: "A quinta" }, { id: "b", label: "A terça" }, { id: "c", label: "A sétima" }], correctOptionId: "a", explanation: "Terça e sétima definem o acorde; a quinta é a nota menos necessária." },
      { id: "ssa2-inversao", kind: "choice", skill: "harmonia-funcional", prompt: "Em SSA, se a contralto canta a quinta do acorde, o acorde fica…", options: [{ id: "a", label: "Em segunda inversão" }, { id: "b", label: "No estado fundamental" }, { id: "c", label: "Em primeira inversão" }], correctOptionId: "a", explanation: "A nota mais grave define a inversão, mesmo numa voz aguda." },
      { id: "ssa2-dobrar", kind: "choice", skill: "escrita-ssaa", prompt: "Numa tríade em SSA, quantas notas ficam dobradas?", options: [{ id: "a", label: "Nenhuma: uma nota em cada voz" }, { id: "b", label: "Duas" }, { id: "c", label: "Todas" }], correctOptionId: "a", explanation: "Três vozes, três notas." },
    ],
    generators: [{ type: "chord-identification", count: 3 }, { type: "voice-leading-error", count: 2, ruleIds: ["conducao.paralelas", "harmonia.resolucao-da-setima", "vozes.cruzamento"] }, { type: "ssaa-voicing", count: 1 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a omissão no acorde de sétima.",
  application: { title: "Aplicação no Estúdio", steps: ["Abra um arranjo SSAA e deixe o Contralto II em pausa.", "Escreva a contralto como linha de baixo para I – IV – V7 – I.", "Complete o Soprano II e valide."] },
};

export const lessonSsaQuatroVozes: Lesson = {
  id: "ssa-quatro-vozes",
  title: "SSAA: dobramentos, posição fechada e espaçamento",
  summary: "O que dobrar com quatro vozes agudas, por que a posição fechada funciona tão bem e o buraco que aparece quando sopranos e contraltos se afastam.",
  levelId: "s4",
  unitId: "s4-ssa",
  status: "disponivel",
  prerequisites: ["ssa-tres-vozes"],
  estimatedMinutes: 50,
  competencies: ["escrita-ssaa", "conducao-de-vozes"],
  objectives: [
    "Dobrar a fundamental (e não a sensível) nas tríades em SSAA.",
    "Manter no máximo uma oitava entre vozes vizinhas.",
    "Usar a posição fechada como textura padrão das vozes iguais.",
  ],
  sections: [
    {
      title: "1. Fechado é o normal",
      blocks: [
        { type: "paragraph", text: "Com quatro vozes numa faixa de duas oitavas, a posição fechada (vozes a uma terça ou quarta umas das outras) é natural e soa cheia. A posição aberta funciona quando a melodia está alta, mas nenhuma vizinha deve passar de uma oitava. Dobre a fundamental; a terça só quando a condução pedir, e nunca a sensível." },
        { type: "example", score: EXS.hino, verdict: "correto", caption: "Dobramentos em SSAA", commentary: "No Dó maior do início, Dó está dobrado (Soprano II e Contralto II); no Sol maior, Sol (Contralto I e Contralto II). As vozes andam pouco e por grau." },
        { type: "listening", title: "Bloco fechado", score: EXS.hino, instructions: ["Ouça Soprano II e Contralto I: o meio do acorde.", "Ouça as quatro."], focus: [["S2", "A1"], ["S1", "S2", "A1", "A2"]] },
      ],
    },
    {
      title: "2. O buraco no meio",
      blocks: [
        { type: "example", score: EXS.buraco, verdict: "incorreto", caption: "Sopranos longe das contraltos", commentary: "O Soprano I fica uma décima acima do Soprano II, e as contraltos se embolam embaixo, uma passando a nota da outra. O acorde soa como uma melodia solta sobre um bloco grave." },
        { type: "list", items: ["Vizinhas a no máximo uma oitava (o motor usa esse limite para SSAA).", "Quando a melodia sobe, suba o Soprano II junto e abra embaixo.", "Uníssonos curtos entre Contralto I e Contralto II são aceitáveis; por muito tempo, viram SSA."] },
      ],
    },
  ],
  exercises: {
    id: "ex-ssa-quatro",
    title: "Verificação: SSAA",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["ssa3-espaco"],
    staticItems: [
      { id: "ssa3-espaco", kind: "choice", skill: "escrita-ssaa", prompt: "Qual é o espaçamento máximo recomendado entre vozes vizinhas em SSAA?", options: [{ id: "a", label: "Uma oitava" }, { id: "b", label: "Uma décima segunda" }, { id: "c", label: "Duas oitavas" }], correctOptionId: "a", explanation: "Vozes iguais soam melhor fechadas; acima de uma oitava o acorde se separa." },
      { id: "ssa3-dobrar", kind: "choice", skill: "escrita-ssaa", prompt: "Numa tríade maior em SSAA, a nota mais indicada para dobrar é…", options: [{ id: "a", label: "A fundamental" }, { id: "b", label: "A sensível" }, { id: "c", label: "A terça, sempre" }], correctOptionId: "a", explanation: "A fundamental reforça o acorde sem pedir resolução." },
      { id: "ssa3-posicao", kind: "choice", skill: "escrita-ssaa", prompt: "Por que a posição fechada é a textura padrão em SSAA?", options: [{ id: "a", label: "As vozes cabem numa faixa estreita e o acorde soa cheio" }, { id: "b", label: "Porque a aberta é proibida" }, { id: "c", label: "Porque só existe uma pauta" }], correctOptionId: "a", explanation: "Duas oitavas de extensão total favorecem acordes fechados." },
    ],
    generators: [{ type: "ssaa-voicing", count: 3 }, { type: "voice-leading-error", count: 2, ruleIds: ["vozes.espacamento", "vozes.cruzamento", "vozes.sobreposicao"] }, { type: "range-check", count: 1, formations: ["SSAA"] }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o espaçamento máximo.",
  application: { title: "Aplicação no Estúdio", steps: ["Harmonize quatro compassos de uma melodia em SSAA, em posição fechada.", "Confira os dobramentos de cada acorde.", "Valide e corrija qualquer espaçamento acima de uma oitava."] },
};

export const lessonSsaBaixo: Lesson = {
  id: "ssa-baixo",
  title: "O baixo sem baixo: a linha do Contralto II",
  summary: "Como escrever a voz mais grave de um coro de vozes iguais: fundamentais, inversões, linhas por grau e o que acontece quando ela só dobra a melodia.",
  levelId: "s4",
  unitId: "s4-ssa",
  status: "disponivel",
  prerequisites: ["ssa-quatro-vozes"],
  estimatedMinutes: 50,
  competencies: ["escrita-ssaa", "harmonia-funcional"],
  objectives: [
    "Escrever o Contralto II como uma linha de baixo cantável.",
    "Usar inversões (primeira inversão) para criar linhas por grau.",
    "Evitar que a voz grave dobre a melodia em oitavas.",
  ],
  sections: [
    {
      title: "1. Uma linha, não só fundamentais",
      blocks: [
        { type: "paragraph", text: "O Contralto II tem pouco espaço no grave: de Sol3 a Dó4 é onde ela soa firme. Por isso, em vez de saltar entre fundamentais, prefira linhas por grau usando acordes em primeira inversão (Sol/Si, Dó/Mi). A linha fica cantável e a harmonia ganha direção." },
        { type: "example", score: EXS.baixoLinha, verdict: "correto", caption: "Contralto II com linha de baixo", commentary: "Dó – Si – Dó – Lá – Si – Sol – Dó: o Sol/Si aparece duas vezes para a linha andar por grau, e o Si (sensível) sempre sobe para Dó ou desce para Sol dentro do mesmo acorde." },
        { type: "listening", title: "A linha grave", score: EXS.baixoLinha, instructions: ["Cante o Contralto II sozinho.", "Ouça Soprano I e Contralto II: as vozes externas.", "Ouça as quatro."], focus: [["A2"], ["S1", "A2"], ["S1", "S2", "A1", "A2"]] },
      ],
    },
    {
      title: "2. Dobrar a melodia não é baixo",
      blocks: [
        { type: "example", score: EXS.baixoOitavas, verdict: "incorreto", caption: "Contralto II dobrando a melodia", commentary: "O Contralto II canta a melodia uma oitava abaixo: oitavas paralelas o tempo todo, um V⁶₄ fora de contexto e a sensível dobrada. A harmonia perde o chão." },
        { type: "callout", tone: "atencao", title: "Vozes externas", text: "Mesmo sem baixo real, Soprano I e Contralto II são as vozes externas: o ouvido escuta a relação entre elas. Movimento contrário entre as duas é o que mais dá firmeza ao arranjo." },
      ],
    },
  ],
  exercises: {
    id: "ex-ssa-baixo",
    title: "Verificação: a voz grave",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["ssa4-inversao"],
    staticItems: [
      { id: "ssa4-inversao", kind: "choice", skill: "escrita-ssaa", prompt: "Para o Contralto II andar por grau entre Dó e Lá, um bom recurso é…", options: [{ id: "a", label: "Usar Sol/Si (primeira inversão) no meio" }, { id: "b", label: "Saltar para Dó3" }, { id: "c", label: "Dobrar a melodia" }], correctOptionId: "a", explanation: "A primeira inversão põe a terça no grave e cria a nota de passagem Si." },
      { id: "ssa4-externas", kind: "choice", skill: "conducao-de-vozes", prompt: "Em SSAA, quais são as vozes externas?", options: [{ id: "a", label: "Soprano I e Contralto II" }, { id: "b", label: "Soprano II e Contralto I" }, { id: "c", label: "Soprano I e Soprano II" }], correctOptionId: "a", explanation: "A mais aguda e a mais grave." },
      { id: "ssa4-oitavas", kind: "choice", skill: "conducao-de-vozes", prompt: "O Contralto II cantando a melodia uma oitava abaixo produz…", options: [{ id: "a", label: "Oitavas paralelas com o Soprano I" }, { id: "b", label: "Contraponto independente" }, { id: "c", label: "Uma linha de baixo funcional" }], correctOptionId: "a", explanation: "É dobramento, não baixo." },
    ],
    generators: [{ type: "motion-type", count: 2 }, { type: "function-identification", count: 2 }, { type: "ssaa-voicing", count: 2 }, { type: "range-check", count: 1, formations: ["SSAA"] }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o uso da primeira inversão na linha grave.",
  application: { title: "Aplicação no Estúdio", steps: ["Escreva só o Contralto II de uma progressão I – V⁶ – vi – IV – V – I.", "Cante a linha antes de completar as outras vozes.", "Valide e confira o movimento entre Soprano I e Contralto II."] },
};

export const lessonSsaInfantil: Lesson = {
  id: "ssa-coro-infantil",
  title: "Coro infantil: tessitura, uníssono e duas vozes",
  summary: "A voz infantil, a tessitura por faixa etária, o uníssono bem escrito e os primeiros passos para duas e três vozes.",
  levelId: "s4",
  unitId: "s4-ssa",
  status: "disponivel",
  prerequisites: ["ssa-tres-vozes"],
  estimatedMinutes: 50,
  competencies: ["escrita-ssaa", "texto-e-prosodia"],
  objectives: [
    "Escolher a tonalidade a partir da tessitura infantil.",
    "Escrever a segunda voz em terças e sextas, com uníssono no início e no fim.",
    "Planejar a progressão uníssono → cânone → duas vozes → três vozes.",
  ],
  sections: [
    {
      title: "1. A voz da criança",
      blocks: [
        { type: "paragraph", text: "A voz infantil é leve, com pouco volume no grave e cansaço rápido no agudo. A extensão confortável é menor que a de um coro feminino adulto: o motor usa as tessituras adultas, então trate qualquer sugestão de tessitura num arranjo infantil como um alerta." },
        {
          type: "table",
          caption: "Tessitura de referência para coros infantis (aproximada)",
          headers: ["Faixa", "Região confortável", "Escrita indicada"],
          rows: [["5 a 7 anos", "Ré4–Si4", "Uníssono, ecos, ostinatos curtos"], ["8 a 10 anos", "Dó4–Ré5", "Uníssono, cânone, duas vozes em terças"], ["11 a 13 anos", "Si3–Mi5 (Fá5 com preparo)", "Duas e três vozes (SSA)"], ["Coro juvenil (muda vocal)", "Varia muito", "Partes flexíveis; meninos podem precisar de linha própria"]],
        },
        { type: "example", score: EXS.infantil, verdict: "correto", caption: "Duas vozes em Sol maior", commentary: "A melodia fica entre Sol4 e Mi5; a segunda voz começa em uníssono, anda em terças paralelas e volta ao uníssono no fim. O texto tem uma sílaba por nota." },
        { type: "listening", title: "Primeira e segunda voz", score: EXS.infantil, instructions: ["Cante a melodia.", "Cante a segunda voz.", "Ouça as duas."], focus: [["S1"], ["S2"], ["S1", "S2"]] },
      ],
    },
    {
      title: "2. A tonalidade certa",
      blocks: [
        { type: "example", score: EXS.infantilAgudo, verdict: "observacao", caption: "Um tom acima: Fá♯5 no ponto culminante", commentary: "Em Lá maior, a nota mais aguda vira Fá♯5. Para sopranos adultos o motor só sugere atenção; para crianças de 8 a 10 anos é aguda demais. A solução é a tonalidade de Sol." },
        { type: "list", ordered: true, items: ["Uníssono bem afinado, com respiração e vogais trabalhadas.", "Ecos e ostinatos: um grupo repete, o outro sustenta.", "Cânone (round): a segunda voz é a mesma melodia, atrasada.", "Duas vozes em terças e sextas, com uníssono nas cadências.", "Três vozes (SSA) a partir dos 11 anos, com a terceira voz simples."] },
      ],
    },
  ],
  exercises: {
    id: "ex-ssa-infantil",
    title: "Verificação: coro infantil",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["ssa5-tonalidade"],
    staticItems: [
      { id: "ssa5-tonalidade", kind: "choice", skill: "escrita-ssaa", prompt: "Uma canção para crianças de 8 a 10 anos chega a Fá♯5. O que fazer primeiro?", options: [{ id: "a", label: "Baixar a tonalidade até o ponto mais agudo caber na região confortável" }, { id: "b", label: "Manter: crianças alcançam qualquer nota" }, { id: "c", label: "Subir mais para dar brilho" }], correctOptionId: "a", explanation: "Para essa idade, até Ré5 é confortável." },
      { id: "ssa5-progressao", kind: "choice", skill: "arranjo", prompt: "Qual é uma ordem natural de aprendizado para um coro infantil?", options: [{ id: "a", label: "Uníssono, cânone, duas vozes, três vozes" }, { id: "b", label: "Quatro vozes desde o início" }, { id: "c", label: "Três vozes e depois uníssono" }], correctOptionId: "a", explanation: "Cada etapa prepara a independência da seguinte." },
      { id: "ssa5-segunda", kind: "choice", skill: "escrita-ssaa", prompt: "Uma segunda voz infantil funciona melhor quando…", options: [{ id: "a", label: "Anda em terças e sextas e volta ao uníssono nas cadências" }, { id: "b", label: "Faz saltos grandes" }, { id: "c", label: "Canta outro texto" }], correctOptionId: "a", explanation: "Intervalos consonantes e pontos de apoio em uníssono facilitam a afinação." },
    ],
    generators: [{ type: "range-check", count: 3, formations: ["SSAA"] }, { type: "interval-identification", count: 2, maxNumber: 6 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a escolha da tonalidade.",
  application: { title: "Aplicação no Estúdio", steps: ["Escreva uma canção de quatro compassos entre Ré4 e Ré5.", "Escreva uma segunda voz em terças e sextas com uníssono no início e no fim.", "Valide e ouça as duas vozes."] },
};

export const lessonSsaTexturas: Lesson = {
  id: "ssa-texturas",
  title: "Texturas para vozes iguais: melodia interna, divisi e eco",
  summary: "Melodia no Soprano II ou no Contralto I, sopranos sustentando por cima, divisi, ecos e chamada e resposta entre sopranos e contraltos.",
  levelId: "s4",
  unitId: "s4-ssa",
  status: "disponivel",
  prerequisites: ["ssa-baixo", "texturas-vocais"],
  estimatedMinutes: 50,
  competencies: ["escrita-ssaa", "arranjo"],
  objectives: [
    "Colocar a melodia numa voz interna sem que ela se perca.",
    "Usar chamada e resposta entre sopranos e contraltos.",
    "Evitar cruzamentos com a voz que tem a melodia.",
  ],
  sections: [
    {
      title: "1. A melodia no meio",
      blocks: [
        { type: "paragraph", text: "Em vozes iguais, todas cantam na mesma região, então a melodia pode morar em qualquer voz. Passar a melodia para o Soprano II ou para o Contralto I numa estrofe dá cor nova; o cuidado é deixar as vozes de cima sustentando notas longas em dinâmica mais suave, para a melodia aparecer." },
        { type: "example", score: EXS.melodiaInterna, verdict: "correto", caption: "Melodia no Soprano II", commentary: "O Soprano I sustenta Mi5 quase o tempo todo (pode ser em 'u'), e a melodia anda no Soprano II, em Lá maior. As contraltos completam o acorde com notas comuns." },
        { type: "listening", title: "Onde está a melodia?", score: EXS.melodiaInterna, instructions: ["Ouça o Soprano II sozinho.", "Ouça as quatro e siga o Soprano II."], focus: [["S2"], ["S1", "S2", "A1", "A2"]] },
        { type: "example", score: EXS.melodiaCruzada, verdict: "incorreto", caption: "Contralto passando por cima da melodia", commentary: "No compasso 2, o Contralto I sobe a Dó♯5, acima do Lá4 da melodia: cruzamento, um buraco de mais de uma oitava entre as contraltos e uma nota acima da tessitura. O ouvido passa a seguir a contralto." },
      ],
    },
    {
      title: "2. Outras texturas",
      blocks: [
        { type: "list", items: ["Chamada e resposta: sopranos cantam a frase, contraltos respondem (ou o contrário).", "Eco: o mesmo motivo, mais suave, em outro naipe.", "Divisi: um naipe se divide por alguns compassos para engrossar um acorde.", "Pedal: contraltos sustentam uma nota enquanto os sopranos se movem.", "Uníssono das quatro vozes num momento de texto importante."] },
        { type: "callout", tone: "dica", title: "Equilíbrio", text: "Num coro feminino, as contraltos costumam ser menos numerosas. Uma melodia no Contralto I pede menos movimento e dinâmica menor nas outras vozes." },
      ],
    },
  ],
  exercises: {
    id: "ex-ssa-texturas",
    title: "Verificação: texturas",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["ssa6-interna"],
    staticItems: [
      { id: "ssa6-interna", kind: "choice", skill: "arranjo", prompt: "Com a melodia no Soprano II, o que o Soprano I deve fazer?", options: [{ id: "a", label: "Sustentar notas longas, mais suave, sem competir" }, { id: "b", label: "Cantar outra melodia ativa" }, { id: "c", label: "Dobrar a melodia uma oitava acima" }], correctOptionId: "a", explanation: "A voz de cima chama atenção; ela precisa ficar em segundo plano." },
      { id: "ssa6-cruz", kind: "choice", skill: "conducao-de-vozes", prompt: "Se uma voz passa por cima da voz que tem a melodia…", options: [{ id: "a", label: "O ouvido tende a seguir a voz mais aguda e a melodia se perde" }, { id: "b", label: "Nada muda" }, { id: "c", label: "A melodia fica mais clara" }], correctOptionId: "a", explanation: "Cruzamentos com a melodia confundem a escuta." },
      { id: "ssa6-resposta", kind: "choice", skill: "arranjo", prompt: "Chamada e resposta em SSAA costuma alternar…", options: [{ id: "a", label: "Sopranos e contraltos" }, { id: "b", label: "Soprano I e Soprano I" }, { id: "c", label: "Coro e piano" }], correctOptionId: "a", explanation: "Os dois naipes têm timbres próprios." },
    ],
    generators: [{ type: "voice-leading-error", count: 2, ruleIds: ["vozes.cruzamento", "vozes.sobreposicao", "vozes.espacamento"] }, { type: "ssaa-voicing", count: 2 }, { type: "range-check", count: 2, formations: ["SSAA"] }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o papel do Soprano I com melodia interna.",
  application: { title: "Aplicação no Estúdio", steps: ["Pegue o arranjo SSAA da aula anterior e passe a melodia para o Soprano II.", "Escreva o Soprano I em notas longas acima dela.", "Valide: nenhuma voz pode cruzar a melodia."] },
};

export const lessonSsaAdaptacao: Lesson = {
  id: "ssa-adaptacao",
  title: "Adaptar um arranjo de coro misto para vozes iguais",
  summary: "Por que não basta subir tenor e baixo uma oitava, como redistribuir o acorde e o que preservar do original.",
  levelId: "s4",
  unitId: "s4-ssa",
  status: "disponivel",
  prerequisites: ["ssa-baixo"],
  estimatedMinutes: 55,
  competencies: ["escrita-ssaa", "arranjo"],
  objectives: [
    "Identificar os problemas de transpor tenor e baixo uma oitava acima.",
    "Reescrever a harmonia de um coral SATB em SSAA, preservando melodia e baixo funcional.",
    "Decidir quando reduzir para SSA.",
  ],
  sections: [
    {
      title: "1. O original e a cópia",
      blocks: [
        { type: "example", score: EXR.original, verdict: "correto", caption: "O original em SATB", commentary: "Luz da manhã com harmonia simples, em coro misto: baixo em Dó3 e Sol2, tenor entre Si3 e Ré4." },
        { type: "example", score: EXS.adaptacaoDireta, verdict: "incorreto", caption: "Tenor uma oitava acima no Soprano II", commentary: "Copiar o tenor uma oitava acima põe o Soprano II em Ré5 enquanto a melodia está em Si4: cruzamento no compasso 3. O baixo uma oitava acima funcionou; o tenor, não." },
        { type: "paragraph", text: "Subir o baixo uma oitava costuma funcionar (vira o Contralto II). O problema é o tenor: uma oitava acima, ele cai na região da melodia. A solução é redistribuir as notas do acorde entre Soprano II e Contralto I, mantendo melodia e baixo." },
        { type: "example", score: EXS.hino, verdict: "correto", caption: "A adaptação redistribuída", commentary: "Melodia e baixo (uma oitava acima) iguais ao original; o contralto do coro misto virou Contralto I e o Soprano II pegou as notas que faltavam, sempre abaixo da melodia." },
        { type: "listening", title: "Compare", score: EXS.hino, instructions: ["Ouça o Soprano II e compare com o tenor do original.", "Ouça as quatro."], focus: [["S2"], ["S1", "S2", "A1", "A2"]] },
      ],
    },
    {
      title: "2. Roteiro de adaptação",
      blocks: [
        { type: "list", ordered: true, items: ["Escolha a tonalidade pela melodia (Soprano I até Fá5, Lá5 em pontos de clímax).", "Copie a linha do baixo uma oitava acima no Contralto II; ajuste notas abaixo de Sol3.", "Mantenha o contralto do original no Contralto I quando couber.", "Redistribua as notas do tenor no Soprano II, abaixo da melodia.", "Valide: cruzamentos, espaçamento e dobramentos.", "Se o resultado ficar apertado demais, reduza para SSA nas estrofes mais leves."] },
        { type: "callout", tone: "atencao", title: "Direitos autorais", text: "Adaptar um arranjo publicado também exige autorização do detentor dos direitos. Pratique com obras em domínio público ou com seus próprios arranjos." },
      ],
    },
  ],
  exercises: {
    id: "ex-ssa-adaptacao",
    title: "Verificação: adaptação",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["ssa7-tenor"],
    staticItems: [
      { id: "ssa7-tenor", kind: "choice", skill: "escrita-ssaa", prompt: "Por que copiar o tenor uma oitava acima costuma dar errado em SSAA?", options: [{ id: "a", label: "Ele cai na região da melodia e cruza com o Soprano I" }, { id: "b", label: "Fica grave demais" }, { id: "c", label: "Porque a clave muda" }], correctOptionId: "a", explanation: "Tenor e soprano estão uma oitava próximos; subindo, o tenor encontra a melodia." },
      { id: "ssa7-baixo", kind: "choice", skill: "escrita-ssaa", prompt: "O que fazer com a linha do baixo do coro misto?", options: [{ id: "a", label: "Passar uma oitava acima para o Contralto II, ajustando notas graves" }, { id: "b", label: "Apagar" }, { id: "c", label: "Dar ao Soprano I" }], correctOptionId: "a", explanation: "Preservar a função do baixo mantém a harmonia." },
      { id: "ssa7-reduzir", kind: "choice", skill: "arranjo", prompt: "Quando reduzir para SSA?", options: [{ id: "a", label: "Quando quatro vozes ficam apertadas ou o grupo tem poucas contraltos" }, { id: "b", label: "Nunca" }, { id: "c", label: "Sempre na última estrofe" }], correctOptionId: "a", explanation: "Três vozes bem escritas soam melhor que quatro embaladas." },
    ],
    generators: [{ type: "voice-leading-error", count: 2, ruleIds: ["vozes.cruzamento", "conducao.paralelas", "vozes.espacamento"] }, { type: "ssaa-voicing", count: 2 }, { type: "range-check", count: 2, formations: ["SSAA"] }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o problema do tenor.",
  application: {
    title: "Projeto: hino para coro feminino",
    steps: ["Abra Projetos → 'Hino para coro feminino (SSAA)'.", "Escreva Soprano II, Contralto I e Contralto II para a melodia dada.", "Valide no motor e avalie com a rubrica."],
  },
};

export const lessonSsaCores: Lesson = {
  id: "ssa-cores",
  title: "Cores, clusters e planing em vozes iguais",
  summary: "Nonas, sétimas e clusters soam claros em vozes agudas; blocos paralelos dependem do estilo.",
  levelId: "s4",
  unitId: "s4-ssa",
  status: "disponivel",
  prerequisites: ["ssa-texturas", "ssa-adaptacao", "tensoes-e-extensoes"],
  estimatedMinutes: 50,
  competencies: ["escrita-ssaa", "harmonia-funcional"],
  objectives: [
    "Usar add9, sétimas e clusters em posição fechada.",
    "Resolver sétimas por grau mesmo em harmonia contemporânea.",
    "Avaliar um bloco paralelo nos estilos popular e tradicional e justificar quando ele é efeito e quando é erro.",
  ],
  sections: [
    {
      title: "1. Tensões no agudo",
      blocks: [
        { type: "paragraph", text: "No registro agudo, segundas e nonas soam claras (não embolam como no grave). Por isso coros femininos e infantis usam muito acordes com nona, sus e clusters de três notas vizinhas. O cuidado é o mesmo de sempre: preparar e resolver as dissonâncias por grau." },
        { type: "example", score: EXS.cores, verdict: "correto", caption: "Cadd9 – Am7 – Dm7 – G7 – C", commentary: "No primeiro acorde, o Ré5 do Soprano II fica colado no Mi5 do Soprano I: uma segunda maior que soa clara no agudo. As sétimas descem por grau (Sol → Fá no Contralto I, Fá → Mi no Soprano I) e a sensível sobe para Dó." },
        { type: "listening", title: "O cluster", score: EXS.cores, instructions: ["Ouça Soprano I e Soprano II no primeiro compasso: segunda maior.", "Ouça as quatro."], focus: [["S1", "S2"], ["S1", "S2", "A1", "A2"]] },
      ],
    },
    {
      title: "2. Blocos paralelos",
      blocks: [
        { type: "example", score: EXS.planing, verdict: "observacao", caption: "Planing no estilo popular a cappella", commentary: "Tríades em posição fechada sobem e descem juntas (C – Dm – Em – Dm – C) em sílaba neutra. No estilo popular, o motor só sugere atenção às quintas e oitavas paralelas: é um efeito de bloco." },
        { type: "example", score: EXS.planingTradicional, verdict: "incorreto", caption: "O mesmo bloco no coral tradicional", commentary: "No estilo tradicional, as mesmas quintas e oitavas paralelas são erros de condução." },
        { type: "callout", tone: "dica", title: "Quando usar", text: "Blocos paralelos funcionam em fundos, introduções e acompanhamento em sílabas neutras. Na harmonização de um hino tradicional, prefira condução independente." },
      ],
    },
  ],
  exercises: {
    id: "ex-ssa-cores",
    title: "Verificação: cores",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["ssa8-agudo"],
    staticItems: [
      { id: "ssa8-agudo", kind: "choice", skill: "escrita-ssaa", prompt: "Por que segundas e nonas soam bem em vozes iguais agudas?", options: [{ id: "a", label: "No agudo, intervalos pequenos não embolam como no grave" }, { id: "b", label: "Porque são consonantes" }, { id: "c", label: "Porque o motor não verifica" }], correctOptionId: "a", explanation: "O limite grave de intervalos pesa no grave, não no agudo." },
      { id: "ssa8-setima", kind: "choice", skill: "harmonia-funcional", prompt: "A sétima de Am7 (Sol) indo para Dm7 deve…", options: [{ id: "a", label: "Descer por grau para Fá" }, { id: "b", label: "Subir para Lá" }, { id: "c", label: "Saltar para Dó" }], correctOptionId: "a", explanation: "Sétimas resolvem descendo por grau." },
      { id: "ssa8-planing", kind: "choice", skill: "arranjo", prompt: "Blocos paralelos (planing) em vozes iguais são…", options: [{ id: "a", label: "Um efeito aceito no estilo popular, mas erro no coral tradicional" }, { id: "b", label: "Sempre proibidos" }, { id: "c", label: "Sempre corretos" }], correctOptionId: "a", explanation: "A regra depende do estilo." },
    ],
    generators: [{ type: "seventh-identification", count: 2 }, { type: "ssaa-voicing", count: 3 }, { type: "voice-leading-error", count: 1, ruleIds: ["conducao.paralelas"] }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o comportamento das nonas no agudo.",
  application: { title: "Aplicação no Estúdio", steps: ["Escreva quatro acordes em SSAA com pelo menos uma nona e um sus.", "Resolva cada sétima por grau.", "Compare a mesma passagem nos estilos tradicional e popular a cappella."] },
};
