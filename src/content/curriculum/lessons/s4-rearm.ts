import { EXR } from "../examples-rearm";
import type { Lesson } from "../types";

/**
 * HAR402 — Rearmonização para vozes. Uma melodia original ("Luz da manhã")
 * percorre a disciplina com harmonias diferentes; todos os exemplos são
 * originais e conferidos pelo motor.
 */

export const lessonRearmFundamentos: Lesson = {
  id: "rearm-fundamentos",
  title: "Rearmonização: o que pode mudar e o que não pode",
  summary: "Notas estruturais e de passagem, o papel de cada nota da melodia no acorde, a função de cada frase e as cadências que seguram a forma.",
  levelId: "s4",
  unitId: "s4-rea",
  status: "disponivel",
  prerequisites: ["modulacao-reharmonizacao", "harmonia-cromatica-moderna"],
  estimatedMinutes: 60,
  competencies: ["harmonia-funcional", "arranjo"],
  objectives: [
    "Separar as notas estruturais da melodia das notas de passagem.",
    "Listar os acordes em que uma nota da melodia é nota do acorde (fundamental, terça, quinta, sétima, nona).",
    "Decidir o que manter (cadências, ponto culminante) e o que pode mudar numa rearmonização.",
  ],
  sections: [
    {
      title: "1. A melodia manda",
      blocks: [
        { type: "paragraph", text: "Rearmonizar é trocar os acordes de uma melodia que já existe sem mudar uma nota dela. A primeira pergunta é sempre: quais notas da melodia precisam ser apoiadas por um acorde (as estruturais, em tempo forte ou longas) e quais podem passar (notas de passagem, bordaduras)?" },
        { type: "example", score: EXR.original, verdict: "correto", caption: "Luz da manhã, harmonia simples", commentary: "Só tônica e dominante: C – G – C – C – G – G7 – C. Toda nota da melodia é nota do acorde. É o ponto de partida de toda a disciplina." },
        { type: "listening", title: "Ouça a melodia e o baixo", score: EXR.original, instructions: ["Ouça só o soprano e cante a melodia.", "Ouça soprano e baixo: este é o esqueleto que vamos trocar."], focus: [["S"], ["S", "B"]] },
        {
          type: "table",
          caption: "Uma nota, muitos acordes: em Dó maior, o Mi da melodia pode ser…",
          headers: ["Papel do Mi", "Acorde", "Cor"],
          rows: [
            ["Fundamental", "Em, E7", "Escuro / dominante de Lá menor"],
            ["Terça", "C, C7, C6", "Estável"],
            ["Quinta", "Am, A7", "Suave / dominante de Ré menor"],
            ["Sétima", "Fmaj7", "Aberta, 'jazz'"],
            ["Nona", "Dm9, D7(9)", "Tensa, pede resolução"],
            ["Sexta / 13ª", "G6, G13", "Brilhante, sobre a dominante"],
          ],
        },
      ],
    },
    {
      title: "2. O que segura a forma",
      blocks: [
        { type: "list", items: ["Cadências finais: mude a cor (V7(♭9), iv menor), mas mantenha a função de fechamento.", "Ponto culminante da melodia: é o lugar mais forte para a mudança mais ousada.", "Ritmo harmônico: rearmonizar não é pôr mais acordes; é escolher melhor os que já estão.", "Notas longas da melodia precisam ser nota do acorde (ou tensão que resolve)."] },
        { type: "example", score: EXR.conflito, verdict: "incorreto", caption: "Nota da melodia sem apoio", commentary: "No compasso 2, o Dó da melodia cai sobre Sol maior (Sol–Si–Ré) e depois salta para Mi: dissonância sem preparação nem resolução. O motor aponta. Antes de trocar um acorde, confira se a nota longa pertence a ele." },
        { type: "callout", tone: "dica", title: "Método em quatro passos", text: "1) Marque as notas estruturais. 2) Para cada uma, liste os acordes possíveis (tabela acima). 3) Escolha pela função e pelo baixo que você quer. 4) Escreva as vozes pelo menor movimento e ouça." },
      ],
    },
  ],
  exercises: {
    id: "ex-rearm-fundamentos",
    title: "Verificação: fundamentos da rearmonização",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["rf-melodia"],
    staticItems: [
      { id: "rf-melodia", kind: "choice", skill: "harmonia-funcional", prompt: "Numa rearmonização, o que não pode mudar?", options: [{ id: "a", label: "As notas da melodia" }, { id: "b", label: "Os acordes" }, { id: "c", label: "As vozes internas" }], correctOptionId: "a", explanation: "Rearmonizar é trocar a harmonia sob a mesma melodia." },
      { id: "rf-mi", kind: "choice", skill: "acordes", prompt: "Em Dó maior, o Mi da melodia é a quinta de qual acorde?", options: [{ id: "a", label: "Lá menor" }, { id: "b", label: "Dó maior" }, { id: "c", label: "Mi menor" }], correctOptionId: "a", explanation: "Lá – Dó – Mi: o Mi é a quinta." },
      { id: "rf-longa", kind: "choice", skill: "harmonia-funcional", prompt: "Uma nota longa da melodia, em tempo forte, deve ser…", options: [{ id: "a", label: "Nota do acorde (ou tensão que resolve)" }, { id: "b", label: "Sempre a fundamental do acorde" }, { id: "c", label: "Uma nota estranha ao acorde" }], correctOptionId: "a", explanation: "Notas longas definem a harmonia; notas de passagem podem ser estranhas." },
    ],
    generators: [{ type: "reharm-choice", count: 2 }, { type: "chord-identification", count: 3 }, { type: "nct-identification", count: 1 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o que não muda numa rearmonização.",
  application: { title: "Aplicação no Estúdio", steps: ["Escreva a melodia 'Luz da manhã' no soprano.", "Para cada nota estrutural, anote três acordes possíveis.", "Harmonize com tônica e dominante e guarde como versão de partida."] },
};

export const lessonRearmDiatonica: Lesson = {
  id: "rearm-diatonica",
  title: "Substituições diatônicas e inversões",
  summary: "Acordes da mesma função (I, vi, iii; IV, ii; V, vii°), inversões para o baixo andar por grau e as paralelas que aparecem quando se troca acorde sem cuidar das vozes.",
  levelId: "s4",
  unitId: "s4-rea",
  status: "disponivel",
  prerequisites: ["rearm-fundamentos"],
  estimatedMinutes: 55,
  competencies: ["harmonia-funcional", "conducao-de-vozes"],
  objectives: [
    "Trocar acordes por outros da mesma função.",
    "Usar inversões para criar uma linha de baixo por grau.",
    "Evitar paralelas ao substituir acordes no estado fundamental.",
  ],
  sections: [
    {
      title: "1. Famílias de função",
      blocks: [
        {
          type: "table",
          caption: "Substitutos diatônicos em Dó maior",
          headers: ["Função", "Acorde original", "Substitutos (notas em comum)"],
          rows: [
            ["Tônica", "C", "Am (Dó, Mi), Em (Mi, Sol)"],
            ["Subdominante", "F", "Dm (Fá, Lá), Am (Lá, Dó)"],
            ["Dominante", "G", "Bm7(♭5) (Si, Ré, Fá), Em (Sol, Si)"],
          ],
        },
        { type: "paragraph", text: "Acordes a uma terça de distância têm duas notas em comum: por isso substituem um ao outro sem chocar com a melodia. Junte isso às inversões (G/B, C/G) e o baixo passa a descer por grau, uma das marcas da canção popular." },
        { type: "example", score: EXR.diatonica, verdict: "correto", caption: "C – G/B – Am – C/G – Dm – G7 – C", commentary: "O baixo desce Dó – Si – Lá – Sol e cadencia em Ré – Sol – Dó; a melodia é a mesma. No estilo popular, o motor só informa que o Si do baixo desce." },
        { type: "listening", title: "A linha do baixo", score: EXR.diatonica, instructions: ["Ouça só o baixo.", "Compare com o baixo da harmonia simples."], focus: [["B"], ["S", "B"]] },
      ],
    },
    {
      title: "2. O preço da troca",
      blocks: [
        { type: "example", score: EXR.diatonicaTradicional, verdict: "incorreto", caption: "A mesma linha no coral tradicional", commentary: "No estilo tradicional, o Si no baixo é sensível e deveria subir para Dó; o motor também comenta o C/G sem contexto cadencial. É a mesma partitura: a régua do estilo é que muda." },
        { type: "example", score: EXR.paralelasRearm, verdict: "incorreto", caption: "C – Dm – C, todos juntos", commentary: "Trocar o Sol por Ré menor com todas as vozes subindo e descendo juntas gera quintas e oitavas paralelas. Mantenha notas comuns e mova o baixo em sentido contrário." },
      ],
    },
  ],
  exercises: {
    id: "ex-rearm-diatonica",
    title: "Verificação: substituições diatônicas",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["rd-tonica"],
    staticItems: [
      { id: "rd-tonica", kind: "choice", skill: "harmonia-funcional", prompt: "Qual acorde substitui Dó maior (tônica) mantendo duas notas em comum?", options: [{ id: "a", label: "Lá menor" }, { id: "b", label: "Ré menor" }, { id: "c", label: "Sol maior" }], correctOptionId: "a", explanation: "Lá – Dó – Mi tem Dó e Mi em comum com Dó maior." },
      { id: "rd-baixo", kind: "choice", skill: "harmonia-funcional", prompt: "Para o baixo descer de Dó a Lá por grau, que acorde cabe no meio (sobre Ré na melodia)?", options: [{ id: "a", label: "G/B" }, { id: "b", label: "G no estado fundamental" }, { id: "c", label: "D maior" }], correctOptionId: "a", explanation: "A inversão põe o Si no baixo: Dó – Si – Lá." },
      { id: "rd-paralelas", kind: "choice", skill: "conducao-de-vozes", prompt: "Trocar C por Dm com todas as vozes no estado fundamental e se movendo juntas causa…", options: [{ id: "a", label: "Quintas e oitavas paralelas" }, { id: "b", label: "Cruzamento de vozes" }, { id: "c", label: "Nada; é sempre seguro" }], correctOptionId: "a", explanation: "Acordes vizinhos em movimento paralelo produzem paralelas; use notas comuns e movimento contrário." },
    ],
    generators: [{ type: "reharm-choice", count: 2 }, { type: "function-identification", count: 3 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o substituto da tônica.",
  application: { title: "Aplicação no Estúdio", steps: ["Rearmonize 'Luz da manhã' só com acordes diatônicos e inversões.", "Faça o baixo descer por grau pelo menos quatro notas.", "Revise nos estilos tradicional e popular e compare."] },
};

export const lessonRearmDominantes: Lesson = {
  id: "rearm-dominantes",
  title: "Dominantes secundárias, ii–V e dominantes em cadeia",
  summary: "Preceder qualquer acorde com a dominante dele, o ii–V secundário e a cadeia de dominantes, sempre resolvendo sensível e sétima.",
  levelId: "s4",
  unitId: "s4-rea",
  status: "disponivel",
  prerequisites: ["rearm-diatonica"],
  estimatedMinutes: 60,
  competencies: ["harmonia-funcional", "conducao-de-vozes"],
  objectives: [
    "Inserir a dominante secundária de um acorde da melodia.",
    "Ampliar para ii–V secundário e cadeia de dominantes.",
    "Resolver a sensível e a sétima de cada dominante.",
  ],
  sections: [
    {
      title: "1. A dominante de cada acorde",
      blocks: [
        { type: "paragraph", text: "Qualquer acorde maior ou menor da tonalidade pode ser precedido pela própria dominante: E7 antes de Am, A7 antes de Dm, D7 antes de G. A melodia aceita quando a nota dela é nota da dominante: em 'Luz da manhã', o Ré é a sétima do E7 e o Mi é a quinta do A7." },
        { type: "example", score: EXR.dominantes, verdict: "correto", caption: "C – E7/G♯ – Am – A7/C♯ – Dm – G7 – C", commentary: "O baixo sobe por semitom (Sol♯ → Lá, Dó♯ → Ré): cada dominante secundária está invertida e a sensível dela está no baixo. A sétima do E7 é a própria melodia (Ré → Dó); a do A7 (Sol, no contralto) desce para Fá." },
        { type: "listening", title: "O baixo cromático", score: EXR.dominantes, instructions: ["Ouça o baixo: Dó – Sol♯ – Lá – Dó♯ – Ré – Sol – Dó.", "Ouça o contralto resolvendo Sol → Fá."], focus: [["B"], ["A"]] },
        {
          type: "table",
          caption: "Dominantes secundárias em Dó maior",
          headers: ["Alvo", "Dominante", "ii–V secundário"],
          rows: [
            ["Dm (ii)", "A7", "Em7(♭5) – A7"],
            ["Em (iii)", "B7", "F♯m7(♭5) – B7"],
            ["F (IV)", "C7", "Gm7 – C7"],
            ["G (V)", "D7", "Am7 – D7"],
            ["Am (vi)", "E7", "Bm7(♭5) – E7"],
          ],
        },
      ],
    },
    {
      title: "2. Cadeia de dominantes e o cuidado com a sétima",
      blocks: [
        { type: "paragraph", text: "Na cadeia, cada dominante resolve em outra dominante (E7 – A7 – D7 – G7 – C): o baixo anda em quartas e as sétimas descem, uma depois da outra, nas vozes internas. Funciona quando a melodia tem notas comuns ou desce por grau." },
        { type: "example", score: EXR.setimaSobe, verdict: "incorreto", caption: "A sétima do A7 subindo", commentary: "Se o contralto sobe Sol → Lá em vez de descer para Fá, o motor aponta quintas desiguais com o baixo e dissonâncias sem resolução. Toda sétima de dominante desce por grau." },
      ],
    },
  ],
  exercises: {
    id: "ex-rearm-dominantes",
    title: "Verificação: dominantes secundárias",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["rdo-v-vi"],
    staticItems: [
      { id: "rdo-v-vi", kind: "choice", skill: "harmonia-funcional", prompt: "Em Dó maior, qual é a dominante secundária de Lá menor?", options: [{ id: "a", label: "E7" }, { id: "b", label: "A7" }, { id: "c", label: "D7" }], correctOptionId: "a", explanation: "Mi – Sol♯ – Si – Ré: o Sol♯ é a sensível de Lá." },
      { id: "rdo-setima", kind: "choice", skill: "conducao-de-vozes", prompt: "Em A7 → Dm, para onde vai o Sol (sétima do A7)?", options: [{ id: "a", label: "Desce para Fá" }, { id: "b", label: "Sobe para Lá" }, { id: "c", label: "Fica parado" }], correctOptionId: "a", explanation: "A sétima desce por grau." },
      { id: "rdo-cadeia", kind: "choice", skill: "harmonia-funcional", prompt: "Numa cadeia de dominantes E7 – A7 – D7 – G7 – C, o baixo anda em…", options: [{ id: "a", label: "Quartas ascendentes (ou quintas descendentes)" }, { id: "b", label: "Semitons" }, { id: "c", label: "Terças" }], correctOptionId: "a", explanation: "Cada dominante resolve uma quinta abaixo." },
    ],
    generators: [{ type: "reharm-choice", count: 2 }, { type: "seventh-identification", count: 2 }, { type: "realization", count: 1, mode: "canto-dado" }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a dominante de Lá menor.",
  application: { title: "Aplicação no Estúdio", steps: ["Rearmonize 'Luz da manhã' com duas dominantes secundárias.", "Ponha a sensível de cada dominante no baixo (inversão) e confira a resolução.", "Experimente um ii–V secundário antes do Ré menor."] },
};

export const lessonRearmSubV: Lesson = {
  id: "rearm-subv",
  title: "Substituto de trítono e dominantes estendidas",
  summary: "Trocar uma dominante pela que está a um trítono (D♭7 no lugar de G7), o baixo cromático que resulta e as tensões das dominantes no estilo popular.",
  levelId: "s4",
  unitId: "s4-rea",
  status: "disponivel",
  prerequisites: ["rearm-dominantes", "tensoes-e-extensoes"],
  estimatedMinutes: 55,
  competencies: ["harmonia-funcional", "acordes"],
  objectives: [
    "Encontrar o substituto de trítono de qualquer dominante.",
    "Criar um baixo cromático descendente com SubV.",
    "Dizer em que estilos o SubV cabe e explicar o diagnóstico que o coral tradicional dá para a mesma passagem.",
  ],
  sections: [
    {
      title: "1. O trítono compartilhado",
      blocks: [
        { type: "paragraph", text: "G7 e D♭7 têm o mesmo trítono: Si (Dó♭) e Fá. Por isso um pode ocupar o lugar do outro antes de Dó. O baixo, em vez de saltar Sol → Dó, desce por semitom: Ré♭ → Dó. A melodia Si funciona como a sétima do D♭7 (Dó♭)." },
        {
          type: "table",
          caption: "Dominantes e seus substitutos de trítono",
          headers: ["Alvo", "Dominante", "SubV"],
          rows: [["C", "G7", "D♭7"], ["Am", "E7", "B♭7"], ["Dm", "A7", "E♭7"], ["G", "D7", "A♭7"]],
        },
        { type: "example", score: EXR.subV, verdict: "correto", caption: "C – B♭7 – Am7 – A7 – Dm7 – D♭7 – C", commentary: "B♭7 no lugar de E7 (antes de Lá menor) e D♭7 no lugar de G7 (antes de Dó): o baixo faz Dó – Si♭ – Lá e Ré – Ré♭ – Dó. No estilo popular, o motor só comenta o Si da melodia sobre o D♭7." },
        { type: "listening", title: "Ouça o baixo descer por semitom", score: EXR.subV, instructions: ["Ouça só o baixo.", "Ouça os quatro e compare com a versão com E7 e G7."], focus: [["B"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "2. Estilo e tensões",
      blocks: [
        { type: "paragraph", text: "O SubV é linguagem de jazz, bossa nova e gospel contemporâneo. No coral tradicional, as sétimas dos acordes menores com sétima (Am7, Dm7) são tratadas como dissonâncias que precisam descer por grau, e o motor cobra isso." },
        { type: "example", score: EXR.subVTradicional, verdict: "incorreto", caption: "A mesma harmonia no coral tradicional", commentary: "O motor aponta a sétima do Am7 (Sol) parada e a sétima do Dm7 (Dó) indo para Lá♭ por salto. Em repertório tradicional, prefira dominantes secundárias comuns." },
        { type: "callout", tone: "dica", title: "Tensões da dominante", text: "Sobre G7 cabem 9 (Lá), ♭9 (Lá♭), 13 (Mi) e ♭13 (Mi♭). Em vozes, ponha a tensão no soprano ou no contralto e resolva por grau no acorde seguinte." },
      ],
    },
  ],
  exercises: {
    id: "ex-rearm-subv",
    title: "Verificação: substituto de trítono",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["rs-subv"],
    staticItems: [
      { id: "rs-subv", kind: "choice", skill: "harmonia-funcional", prompt: "Qual é o substituto de trítono de G7?", options: [{ id: "a", label: "D♭7" }, { id: "b", label: "D7" }, { id: "c", label: "C♯m7" }], correctOptionId: "a", explanation: "D♭7 tem o mesmo trítono (Fá e Dó♭/Si)." },
      { id: "rs-baixo", kind: "choice", skill: "harmonia-funcional", prompt: "Com SubV antes de Dó, o baixo vai de…", options: [{ id: "a", label: "Ré♭ para Dó, por semitom" }, { id: "b", label: "Sol para Dó, por quarta" }, { id: "c", label: "Si para Dó" }], correctOptionId: "a", explanation: "É o baixo cromático característico do SubV." },
      { id: "rs-estilo", kind: "choice", skill: "arranjo", prompt: "Em que repertório o SubV soa natural?", options: [{ id: "a", label: "Jazz, bossa nova e gospel contemporâneo" }, { id: "b", label: "Corais de Bach" }, { id: "c", label: "Canto gregoriano" }], correctOptionId: "a", explanation: "Na harmonia tradicional, a dominante comum é a regra." },
    ],
    generators: [{ type: "seventh-identification", count: 3 }, { type: "chord-identification", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o SubV de G7.",
  application: { title: "Aplicação no Estúdio", steps: ["No estilo popular, troque o G7 da cadência final por D♭7.", "Troque o E7 antes de Lá menor por B♭7.", "Ouça o baixo e confira as resoluções."] },
};

export const lessonRearmModal: Lesson = {
  id: "rearm-modal",
  title: "Empréstimo modal: iv menor, ♭VI, ♭VII e a picardia",
  summary: "Acordes do modo menor dentro do maior, a linha cromática que eles criam e o planing de acordes maiores paralelos.",
  levelId: "s4",
  unitId: "s4-rea",
  status: "disponivel",
  prerequisites: ["rearm-diatonica"],
  estimatedMinutes: 55,
  competencies: ["harmonia-funcional", "acordes"],
  objectives: [
    "Usar iv, ♭VI e ♭VII emprestados do modo menor.",
    "Conferir se a nota da melodia pertence ao acorde emprestado.",
    "Distinguir empréstimo funcional de planing (cor).",
  ],
  sections: [
    {
      title: "1. Acordes do 'lado escuro'",
      blocks: [
        {
          type: "table",
          caption: "Empréstimos de Dó menor em Dó maior",
          headers: ["Acorde", "Notas", "Melodia que aceita", "Uso típico"],
          rows: [
            ["Fm (iv)", "Fá – Lá♭ – Dó", "Fá, Lá♭, Dó (e Ré como sexta)", "Antes da tônica, 'amém' melancólico"],
            ["A♭ (♭VI)", "Lá♭ – Dó – Mi♭", "Dó, Mi♭", "Surpresa no meio da frase"],
            ["B♭ (♭VII)", "Si♭ – Ré – Fá", "Ré, Fá", "Cadência 'rock' e gospel (♭VII – I)"],
            ["Dm7(♭5) (iiø)", "Ré – Fá – Lá♭ – Dó", "Ré, Fá, Dó", "Antes do V"],
          ],
        },
        { type: "example", score: EXR.modal, verdict: "correto", caption: "C – G – A♭ – C – Fm6/A♭ – G – C", commentary: "O Dó da melodia vira terça de Lá♭ maior; o Ré vira sexta de Fá menor (com Lá♭ no baixo). O motor lê o Fm6/A♭ como ii° com Lá♭ no baixo: são as mesmas notas, Ré – Fá – Lá♭." },
        { type: "listening", title: "A sombra do menor", score: EXR.modal, instructions: ["Ouça o contralto: Sol – Mi♭ – Mi e Fá – Sol.", "Ouça os quatro e note a mudança de cor no compasso 2."], focus: [["A"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "2. Empréstimo ou planing?",
      blocks: [
        { type: "paragraph", text: "Acordes maiores descendo por tom (C – B♭ – A♭) soam modais e épicos, mas em blocos paralelos são cor, não função: as quintas paralelas fazem parte do efeito. Use em introduções, interlúdios ou finais, não no meio de um hino tradicional." },
        { type: "example", score: EXR.modalPlaning, verdict: "observacao", caption: "C – B♭ – A♭ em blocos", commentary: "O motor sugere evitar as quintas e oitavas paralelas: aqui são o efeito. Num coral tradicional, reescreva com movimento contrário." },
        { type: "callout", tone: "dica", title: "Terça de picardia", text: "O caminho inverso também vale: uma canção em menor que termina no acorde maior da tônica. É o empréstimo do modo maior no último acorde." },
      ],
    },
  ],
  exercises: {
    id: "ex-rearm-modal",
    title: "Verificação: empréstimo modal",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["rm-iv"],
    staticItems: [
      { id: "rm-iv", kind: "choice", skill: "harmonia-funcional", prompt: "Em Dó maior, o acorde de Fá menor é…", options: [{ id: "a", label: "Um empréstimo do modo menor (iv)" }, { id: "b", label: "Uma modulação para Fá" }, { id: "c", label: "Um erro de harmonia" }], correctOptionId: "a", explanation: "Fá – Lá♭ – Dó vem de Dó menor." },
      { id: "rm-lab", kind: "choice", skill: "acordes", prompt: "Qual nota da melodia combina com A♭ maior em Dó maior?", options: [{ id: "a", label: "Dó" }, { id: "b", label: "Ré" }, { id: "c", label: "Si" }], correctOptionId: "a", explanation: "Lá♭ – Dó – Mi♭: o Dó é a terça." },
      { id: "rm-planing", kind: "choice", skill: "conducao-de-vozes", prompt: "C – B♭ – A♭ em blocos paralelos gera quintas paralelas. Isso é…", options: [{ id: "a", label: "Efeito de cor aceitável no estilo popular, em trechos curtos" }, { id: "b", label: "Sempre proibido" }, { id: "c", label: "Obrigatório em hinos" }], correctOptionId: "a", explanation: "Planing é cor; no coral tradicional, reescreva com movimento contrário." },
    ],
    generators: [{ type: "chord-identification", count: 3 }, { type: "function-identification", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o iv emprestado.",
  application: { title: "Aplicação no Estúdio", steps: ["Ponha um Fm6 antes da última tônica de 'Luz da manhã'.", "Experimente um A♭ maior sob o Dó da melodia.", "Escreva dois compassos de planing numa introdução."] },
};

export const lessonRearmDiminutos: Lesson = {
  id: "rearm-diminutos",
  title: "Diminutos: de passagem, auxiliar e como dominante",
  summary: "O diminuto entre dois acordes vizinhos, o diminuto auxiliar sobre a tônica e o vii°7 como dominante sem fundamental, com a sétima sempre descendo.",
  levelId: "s4",
  unitId: "s4-rea",
  status: "disponivel",
  prerequisites: ["rearm-dominantes"],
  estimatedMinutes: 50,
  competencies: ["harmonia-funcional", "conducao-de-vozes"],
  objectives: [
    "Inserir um diminuto de passagem com baixo cromático.",
    "Usar o diminuto auxiliar (I – I°7 – I).",
    "Resolver a sétima diminuta por grau descendente.",
  ],
  sections: [
    {
      title: "1. O diminuto que liga",
      blocks: [
        { type: "paragraph", text: "Quando o baixo pode chegar ao acorde seguinte por semitom ascendente (Dó♯ → Ré, Fá♯ → Sol), o diminuto construído sobre essa nota liga os dois acordes. C♯°7 entre Am e Dm funciona como A7(♭9) sem fundamental: é uma dominante disfarçada." },
        { type: "example", score: EXR.diminuto, verdict: "correto", caption: "C – G – Am – C♯°7 – Dm – G7 – C", commentary: "O baixo sobe Lá – Dó♯ – Ré; o Mi da melodia é a terça do C♯°7 e o tenor resolve Si♭ → Lá (a sétima diminuta desce)." },
        { type: "listening", title: "Ouça o tenor", score: EXR.diminuto, instructions: ["Ouça o tenor: Dó – Si♭ – Lá.", "Ouça os quatro."], focus: [["T"], ["S", "A", "T", "B"]] },
        {
          type: "table",
          caption: "Diminutos úteis em Dó maior",
          headers: ["Tipo", "Exemplo", "Função"],
          rows: [["De passagem ascendente", "C – C♯°7 – Dm", "Dominante de Dm sem fundamental"], ["De passagem descendente", "Em – E♭°7 – Dm", "Cor cromática"], ["Auxiliar", "C – C°7 – C", "Bordadura sobre a tônica"], ["Antes do V", "F – F♯°7 – C/G", "Leva ao 6/4 cadencial"]],
        },
      ],
    },
    {
      title: "2. A sétima diminuta desce",
      blocks: [
        { type: "example", score: EXR.diminutoSetimaSobe, verdict: "incorreto", caption: "Si♭ subindo para Si", commentary: "Se o tenor sobe Si♭ → Si, a sétima do diminuto não resolve: o motor aponta. Ela desce por grau (Si♭ → Lá), como a de qualquer dominante." },
        { type: "callout", tone: "dica", title: "Os quatro nomes do diminuto", text: "C♯°7, E°7, G°7 e B♭°7 têm as mesmas notas. Escolha o nome pela nota que está no baixo e pelo acorde para onde ele resolve." },
      ],
    },
  ],
  exercises: {
    id: "ex-rearm-diminutos",
    title: "Verificação: diminutos",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["rdi-passagem"],
    staticItems: [
      { id: "rdi-passagem", kind: "choice", skill: "harmonia-funcional", prompt: "Entre Lá menor e Ré menor, qual diminuto faz o baixo andar por semitom até Ré?", options: [{ id: "a", label: "C♯°7" }, { id: "b", label: "B°7" }, { id: "c", label: "F°7" }], correctOptionId: "a", explanation: "Dó♯ é a sensível de Ré." },
      { id: "rdi-setima", kind: "choice", skill: "conducao-de-vozes", prompt: "Em C♯°7 → Dm, para onde vai o Si♭?", options: [{ id: "a", label: "Desce para Lá" }, { id: "b", label: "Sobe para Si" }, { id: "c", label: "Salta para Ré" }], correctOptionId: "a", explanation: "A sétima diminuta desce por grau." },
      { id: "rdi-nomes", kind: "choice", skill: "acordes", prompt: "Quantos diminutos com sétima diferentes existem (pelas notas)?", options: [{ id: "a", label: "Três" }, { id: "b", label: "Doze" }, { id: "c", label: "Sete" }], correctOptionId: "a", explanation: "Cada diminuto divide a oitava em terças menores; só há três conjuntos diferentes." },
    ],
    generators: [{ type: "seventh-identification", count: 3 }, { type: "reharm-choice", count: 1 }, { type: "voice-leading-error", count: 1, ruleIds: ["harmonia.resolucao-da-setima", "harmonia.resolucao-da-sensivel"] }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o diminuto de passagem.",
  application: { title: "Aplicação no Estúdio", steps: ["Ponha um C♯°7 entre Am e Dm em 'Luz da manhã'.", "Experimente um diminuto auxiliar sobre a tônica do primeiro compasso.", "Confira a resolução da sétima no motor."] },
};

export const lessonRearmBaixo: Lesson = {
  id: "rearm-baixo",
  title: "Rearmonizar a partir do baixo: linhas, pedal e contracanto",
  summary: "Desenhar primeiro a linha do baixo (ascendente, descendente, pedal) e depois escolher os acordes que acomodam melodia e baixo.",
  levelId: "s4",
  unitId: "s4-rea",
  status: "disponivel",
  prerequisites: ["rearm-diatonica"],
  estimatedMinutes: 55,
  competencies: ["harmonia-funcional", "contraponto"],
  objectives: [
    "Escrever uma linha de baixo em contraponto com a melodia e harmonizar a partir dela.",
    "Usar pedal com acordes por cima.",
    "Escolher o estilo de referência adequado para linhas com sensível no baixo.",
  ],
  sections: [
    {
      title: "1. Primeiro o baixo",
      blocks: [
        { type: "paragraph", text: "Em vez de escolher acordes nota a nota, desenhe primeiro uma linha de baixo que faça bom contraponto com a melodia (movimento contrário, terças e sextas). Depois, para cada par baixo + melodia, procure o acorde que contém as duas notas. É assim que nascem progressões como C – G/D – Am/E – Fmaj7." },
        { type: "example", score: EXR.baixoAscendente, verdict: "correto", caption: "Baixo subindo enquanto a melodia desce", commentary: "Dó – Ré – Mi – Fá – Fá♯ – Sol no baixo contra Mi – Ré – Dó – Mi – Ré – Si na melodia: movimento contrário quase o tempo todo. Os acordes (G/D, Am/E, Fmaj7, D7/F♯) saíram da linha." },
        { type: "listening", title: "Contraponto entre os extremos", score: EXR.baixoAscendente, instructions: ["Ouça soprano e baixo juntos.", "Ouça os quatro."], focus: [["S", "B"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "2. Pedal e a sensível no baixo",
      blocks: [
        { type: "example", score: EXR.pedal, verdict: "correto", caption: "Pedal de tônica", commentary: "O baixo fica em Dó do começo ao fim; por cima, Dm7/C, F/C e G7/C. O pedal deixa a harmonia andar sem perder o chão." },
        { type: "paragraph", text: "Linhas descendentes que passam pela sensível (Dó – Si – Lá) são naturais no estilo popular, mas no coral tradicional a sensível no baixo precisa subir. Escolha o estilo de referência antes de julgar o resultado." },
        { type: "example", score: EXR.diatonicaTradicional, verdict: "incorreto", caption: "Linha descendente no coral tradicional", commentary: "O motor aponta o Si do baixo descendo para Lá. No estilo popular, a mesma linha passa (veja a aula de substituições diatônicas)." },
      ],
    },
  ],
  exercises: {
    id: "ex-rearm-baixo",
    title: "Verificação: rearmonizar a partir do baixo",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["rb-acorde"],
    staticItems: [
      { id: "rb-acorde", kind: "choice", skill: "harmonia-funcional", prompt: "Baixo em Mi e melodia em Dó: qual acorde contém as duas notas?", options: [{ id: "a", label: "Am/E (ou C/E)" }, { id: "b", label: "Em" }, { id: "c", label: "G/B" }], correctOptionId: "a", explanation: "Lá – Dó – Mi e Dó – Mi – Sol contêm Mi e Dó." },
      { id: "rb-contraponto", kind: "choice", skill: "contraponto", prompt: "Qual movimento entre baixo e melodia dá mais independência à rearmonização?", options: [{ id: "a", label: "Contrário" }, { id: "b", label: "Paralelo em oitavas" }, { id: "c", label: "Direto em quintas" }], correctOptionId: "a", explanation: "Movimento contrário mantém as vozes extremas independentes." },
      { id: "rb-pedal", kind: "choice", skill: "harmonia-funcional", prompt: "O que caracteriza o pedal?", options: [{ id: "a", label: "O baixo sustenta uma nota enquanto os acordes mudam por cima" }, { id: "b", label: "Todas as vozes sustentam a mesma nota" }, { id: "c", label: "O baixo canta a melodia" }], correctOptionId: "a", explanation: "O chão fica parado e a harmonia anda." },
    ],
    generators: [{ type: "motion-type", count: 3 }, { type: "realization", count: 2, mode: "baixo-dado" }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o acorde que contém baixo e melodia.",
  application: { title: "Aplicação no Estúdio", steps: ["Escreva primeiro uma linha de baixo em movimento contrário à melodia.", "Para cada par baixo + melodia, escolha o acorde.", "Escreva uma introdução com pedal de tônica."] },
};

export const lessonRearmNoArranjo: Lesson = {
  id: "rearm-no-arranjo",
  title: "Rearmonizar no arranjo vocal: onde, quanto e como escrever as vozes",
  summary: "Rearmonizar a repetição e não a primeira vez, guardar a ousadia para o clímax, manter notas comuns e vozes cantáveis e não exagerar.",
  levelId: "s4",
  unitId: "s4-rea",
  status: "disponivel",
  prerequisites: ["rearm-subv", "rearm-modal", "rearm-diminutos", "rearm-baixo"],
  estimatedMinutes: 60,
  competencies: ["arranjo", "conducao-de-vozes", "harmonia-funcional"],
  objectives: [
    "Planejar onde rearmonizar num arranjo (repetições, ponte, final).",
    "Escrever as vozes da rearmonização com notas comuns e graus conjuntos.",
    "Reconhecer o excesso: acordes demais e vozes impossíveis de cantar.",
  ],
  sections: [
    {
      title: "1. Onde rearmonizar",
      blocks: [
        { type: "paragraph", text: "A primeira vez que o ouvinte escuta a melodia, a harmonia simples ajuda a reconhecê-la. Na repetição, a rearmonização renova sem confundir. O mesmo vale para o último refrão e para a tag final: é ali que cabe a mudança mais ousada." },
        { type: "example", score: EXR.segundaVez, verdict: "correto", caption: "A primeira vez simples, a segunda rearmonizada", commentary: "Compassos 1–4: tônica e dominante. Compassos 5–8: a mesma melodia com dominantes secundárias (E7/G♯, A7/C♯) e baixo cromático. A respiração no compasso 4 separa as duas versões." },
        { type: "listening", title: "Compare as duas vezes", score: EXR.segundaVez, instructions: ["Ouça o baixo nas duas metades.", "Ouça os quatro e note onde a cor muda."], focus: [["B"], ["S", "A", "T", "B"]] },
        {
          type: "table",
          caption: "Plano de rearmonização numa canção",
          headers: ["Seção", "Quanto rearmonizar", "Técnicas"],
          rows: [
            ["1ª estrofe e refrão", "Nada ou pouco", "Harmonia da canção"],
            ["2ª estrofe", "Pouco", "Substituições diatônicas, inversões"],
            ["2º refrão", "Médio", "Dominantes secundárias, empréstimo modal"],
            ["Ponte / clímax", "Mais", "SubV, diminutos, modulação"],
            ["Final / tag", "Cor máxima", "iv menor, V7(♭9), pedal"],
          ],
        },
      ],
    },
    {
      title: "2. Como escrever as vozes (e quando parar)",
      blocks: [
        { type: "list", items: ["Mantenha as notas comuns entre os acordes na mesma voz.", "Mova as outras vozes por grau; deixe os saltos para o baixo.", "Resolva sensíveis e sétimas, também nos acordes emprestados.", "Um acorde novo por tempo forte já é muito em andamento rápido: o coro precisa ouvir para afinar.", "Rearmonize uma seção por vez e cante as vozes internas antes de seguir."] },
        { type: "example", score: EXR.excesso, verdict: "incorreto", caption: "Acordes demais", commentary: "Um acorde por tempo, com saltos nas vozes internas: o motor aponta paralelas, um trítono melódico no contralto e notas fora da tessitura. Mais acordes não é mais música; é mais difícil de cantar." },
        { type: "callout", tone: "atencao", title: "Antes de entregar", text: "Cante (ou toque) cada voz interna sozinha. Se uma voz não faz sentido melódico, a rearmonização ainda não está pronta para o coro." },
      ],
    },
  ],
  exercises: {
    id: "ex-rearm-arranjo",
    title: "Verificação: rearmonização no arranjo",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["ra-onde"],
    staticItems: [
      { id: "ra-onde", kind: "choice", skill: "arranjo", prompt: "Onde a rearmonização costuma funcionar melhor num arranjo?", options: [{ id: "a", label: "Nas repetições, na ponte e no final" }, { id: "b", label: "Na primeira apresentação da melodia" }, { id: "c", label: "Em todos os compassos" }], correctOptionId: "a", explanation: "A primeira vez apresenta a canção; as seguintes renovam." },
      { id: "ra-comuns", kind: "choice", skill: "conducao-de-vozes", prompt: "Ao trocar um acorde, o que fazer com as notas em comum?", options: [{ id: "a", label: "Mantê-las na mesma voz" }, { id: "b", label: "Trocá-las de voz" }, { id: "c", label: "Omiti-las" }], correctOptionId: "a", explanation: "Notas comuns paradas dão estabilidade e facilitam a afinação." },
      { id: "ra-excesso", kind: "choice", skill: "arranjo", prompt: "Qual é o sinal de rearmonização exagerada?", options: [{ id: "a", label: "Vozes internas com saltos e acordes demais para o andamento" }, { id: "b", label: "Uma dominante secundária no segundo refrão" }, { id: "c", label: "Um iv menor no final" }], correctOptionId: "a", explanation: "Se o coro não consegue cantar e afinar, a harmonia virou obstáculo." },
    ],
    generators: [{ type: "reharm-choice", count: 3 }, { type: "voice-leading-error", count: 2, ruleIds: ["conducao.paralelas", "harmonia.resolucao-da-setima"] }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo onde rearmonizar.",
  application: {
    title: "Projeto: rearmonizar o segundo refrão",
    steps: ["Abra Projetos → 'Rearmonização do segundo refrão'.", "Mantenha a primeira vez como está e rearmonize a repetição com pelo menos três técnicas da disciplina.", "Cante as vozes internas, revise no motor e avalie com a rubrica."],
  },
};
