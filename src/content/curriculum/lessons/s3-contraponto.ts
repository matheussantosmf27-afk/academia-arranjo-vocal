import { EXC } from "../examples-cp";
import type { Lesson } from "../types";

/**
 * CTP301 — Contraponto Vocal. Das espécies ao contracanto, ao descant e ao
 * quodlibet. Cantus firmus, melodias e exemplos são originais e conferidos pelo motor.
 */

export const lessonCpPrimeira: Lesson = {
  id: "cp-primeira-especie",
  title: "Nota contra nota: consonâncias e movimento (1ª espécie)",
  summary: "O cantus firmus, as consonâncias perfeitas e imperfeitas, os quatro movimentos e as regras que mantêm duas vozes independentes.",
  levelId: "s3",
  unitId: "s3-ctp",
  status: "disponivel",
  prerequisites: ["contraponto-aplicado"],
  estimatedMinutes: 60,
  competencies: ["contraponto", "conducao-de-vozes", "intervalos"],
  objectives: [
    "Classificar intervalos harmônicos em consonância perfeita, imperfeita e dissonância.",
    "Escrever uma linha nota contra nota sobre um cantus firmus.",
    "Evitar quintas e oitavas paralelas e diretas entre as duas vozes.",
  ],
  sections: [
    {
      title: "1. Cantus firmus e consonâncias",
      blocks: [
        { type: "paragraph", text: "O contraponto de espécies é o treino clássico da independência entre vozes. Uma melodia dada (o cantus firmus, aqui no baixo) recebe outra linha, primeiro nota contra nota. Na 1ª espécie todo intervalo é consonante: o começo e o fim em consonância perfeita, o meio de preferência em terças e sextas." },
        {
          type: "table",
          caption: "Intervalos harmônicos no contraponto a duas vozes",
          headers: ["Classe", "Intervalos", "Uso"],
          rows: [
            ["Consonância perfeita", "Uníssono, 5ª e 8ª justas (e 12ª, 15ª)", "Início e fim; nunca em paralelo"],
            ["Consonância imperfeita", "3ªs e 6ªs (e 10ªs, 13ªs)", "Meio da frase; podem andar em paralelo (até três seguidas)"],
            ["Dissonância", "2ªs, 7ªs, 9ªs, trítono e a 4ª justa", "Proibida na 1ª espécie; nas outras, só como passagem, bordadura ou retardo"],
          ],
        },
        { type: "example", score: EXC.especie1, verdict: "correto", caption: "1ª espécie sobre o cantus firmus", commentary: "12ª no início, 10ªs e 13ªs no meio, oitava e 12ª alcançadas por movimento contrário e 15ª no fim, com a sensível (Si) subindo para Dó." },
        { type: "listening", title: "Duas linhas", score: EXC.especie1, instructions: ["Cante o cantus firmus (baixo).", "Ouça as duas vozes e acompanhe o soprano."], focus: [["B"], ["S", "B"]] },
      ],
    },
    {
      title: "2. Os quatro movimentos",
      blocks: [
        {
          type: "table",
          caption: "Movimentos entre duas vozes",
          headers: ["Movimento", "O que acontece", "Para chegar a consonância perfeita"],
          rows: [["Contrário", "Uma sobe, a outra desce", "Ideal"], ["Oblíquo", "Uma fica, a outra anda", "Bom"], ["Direto (semelhante)", "As duas na mesma direção", "Evite (quinta/oitava direta)"], ["Paralelo", "Mesma direção e mesmo intervalo", "Proibido (quintas e oitavas paralelas)"]],
        },
        { type: "example", score: EXC.especie1Paralelas, verdict: "incorreto", caption: "Quinta direta e quintas paralelas", commentary: "No compasso 3, soprano e baixo sobem juntos até uma 12ª (quinta direta com salto) e depois descem juntos para outra 12ª: quintas paralelas. As duas linhas viram uma só." },
      ],
    },
  ],
  exercises: {
    id: "ex-cp-primeira",
    title: "Verificação: 1ª espécie",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["cp1-paralelas"],
    staticItems: [
      { id: "cp1-paralelas", kind: "choice", skill: "contraponto", prompt: "Quais intervalos não podem andar em paralelo entre duas vozes?", options: [{ id: "a", label: "Quintas e oitavas justas" }, { id: "b", label: "Terças e sextas" }, { id: "c", label: "Décimas" }], correctOptionId: "a", explanation: "Consonâncias perfeitas em paralelo fundem as vozes." },
      { id: "cp1-quarta", kind: "choice", skill: "contraponto", prompt: "No contraponto a duas vozes, a quarta justa é…", options: [{ id: "a", label: "Dissonância" }, { id: "b", label: "Consonância perfeita" }, { id: "c", label: "Consonância imperfeita" }], correctOptionId: "a", explanation: "Acima do baixo, a quarta soa instável e pede resolução." },
      { id: "cp1-fim", kind: "choice", skill: "contraponto", prompt: "Como termina um exercício de 1ª espécie?", options: [{ id: "a", label: "Em consonância perfeita (uníssono ou oitava), por movimento contrário" }, { id: "b", label: "Em terça" }, { id: "c", label: "Em quinta paralela" }], correctOptionId: "a", explanation: "O fim pede estabilidade; o movimento contrário evita a oitava direta." },
    ],
    generators: [{ type: "counterpoint-interval", count: 4 }, { type: "motion-type", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo os intervalos que não podem andar em paralelo.",
  application: { title: "Aplicação no Estúdio", steps: ["Escreva o cantus firmus (Dó – Ré – Fá – Mi – Lá – Sol – Ré – Dó) no baixo, em mínimas.", "Escreva um soprano nota contra nota, só com consonâncias.", "Revise: nenhuma quinta ou oitava paralela ou direta."] },
};

export const lessonCpSegundaTerceira: Lesson = {
  id: "cp-segunda-terceira",
  title: "Duas e quatro notas contra uma: passagem e bordadura (2ª e 3ª espécies)",
  summary: "Notas de passagem e bordaduras nos tempos fracos, consonância nos tempos fortes e as paralelas escondidas entre notas vizinhas.",
  levelId: "s3",
  unitId: "s3-ctp",
  status: "disponivel",
  prerequisites: ["cp-primeira-especie"],
  estimatedMinutes: 55,
  competencies: ["contraponto", "conducao-de-vozes"],
  objectives: [
    "Escrever duas e quatro notas contra uma com dissonâncias de passagem.",
    "Usar bordaduras e a cambiata com consciência.",
    "Encontrar paralelas entre notas consecutivas, não só entre tempos fortes.",
  ],
  sections: [
    {
      title: "1. Duas contra uma",
      blocks: [
        { type: "paragraph", text: "Na 2ª espécie, o contraponto anda duas vezes mais rápido que o cantus firmus. O tempo forte continua consonante; o fraco pode ser dissonante desde que seja nota de passagem (chega e sai por grau na mesma direção)." },
        { type: "example", score: EXC.especie2, verdict: "correto", caption: "2ª espécie", commentary: "Tempos fortes consonantes (12ª, 10ª, 13ª…); os fracos ligam as notas por grau ou por salto consonante. O ponto mais agudo (Mi5) aparece uma vez só." },
        { type: "example", score: EXC.especie2Paralelas, verdict: "incorreto", caption: "Paralelas entre notas vizinhas", commentary: "Do tempo fraco do compasso 2 para o seguinte (Dó/Fá → Si/Mi) há quintas paralelas, e no fim Ré/Ré → Dó/Dó dá oitavas. O ouvido percebe paralelas entre quaisquer notas seguidas, não só nos tempos fortes." },
      ],
    },
    {
      title: "2. Quatro contra uma",
      blocks: [
        { type: "paragraph", text: "Na 3ª espécie, quatro notas por nota do cantus firmus: a primeira consonante; as outras podem ser passagem, bordadura (sai e volta por grau) ou a cambiata, figura de cinco notas em que a dissonância salta uma terça para baixo e a linha volta por grau." },
        { type: "example", score: EXC.especie3, verdict: "correto", caption: "3ª espécie", commentary: "Mi – Ré – Dó – Ré sobre Dó: passagem e bordadura; Dó – Si – Lá – Dó sobre Fá: o Si (trítono) é passagem entre Dó e Lá." },
        { type: "listening", title: "A linha ágil", score: EXC.especie3, instructions: ["Ouça o soprano e marque as notas do tempo forte.", "Ouça com o baixo."], focus: [["S"], ["S", "B"]] },
      ],
    },
  ],
  exercises: {
    id: "ex-cp-segunda",
    title: "Verificação: 2ª e 3ª espécies",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["cp2-fraco"],
    staticItems: [
      { id: "cp2-fraco", kind: "choice", skill: "contraponto", prompt: "Na 2ª espécie, uma dissonância no tempo fraco é aceita quando…", options: [{ id: "a", label: "É nota de passagem: chega e sai por grau na mesma direção" }, { id: "b", label: "Chega por salto" }, { id: "c", label: "Nunca" }], correctOptionId: "a", explanation: "A passagem liga duas consonâncias por grau." },
      { id: "cp2-bordadura", kind: "choice", skill: "contraponto", prompt: "O que é uma bordadura?", options: [{ id: "a", label: "Nota vizinha que sai e volta para a mesma nota por grau" }, { id: "b", label: "Nota que salta para longe" }, { id: "c", label: "Nota sustentada de um acorde para o outro" }], correctOptionId: "a", explanation: "Ex.: Dó – Ré – Dó, com o Ré como bordadura superior." },
      { id: "cp2-escondidas", kind: "choice", skill: "conducao-de-vozes", prompt: "Paralelas entre um tempo fraco e o tempo forte seguinte…", options: [{ id: "a", label: "Também contam e devem ser evitadas" }, { id: "b", label: "Não importam" }, { id: "c", label: "São obrigatórias" }], correctOptionId: "a", explanation: "O ouvido percebe qualquer par de notas consecutivas." },
    ],
    generators: [{ type: "nct-identification", count: 3 }, { type: "counterpoint-interval", count: 2, earOnly: true }, { type: "voice-leading-error", count: 1, ruleIds: ["conducao.paralelas"] }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo quando a dissonância do tempo fraco é aceita.",
  application: { title: "Aplicação no Estúdio", steps: ["Sobre o mesmo cantus firmus, escreva uma linha em semínimas (2ª espécie).", "Depois, uma em colcheias ou com quatro notas por nota do baixo.", "Marque cada nota fraca como passagem, bordadura ou consonância."] },
};

export const lessonCpQuarta: Lesson = {
  id: "cp-quarta-especie",
  title: "Retardos: preparação, dissonância e resolução (4ª espécie)",
  summary: "A síncope que transforma consonância em dissonância e a resolve por grau: 7–6, 4–3, 9–8 e a cadeia de retardos.",
  levelId: "s3",
  unitId: "s3-ctp",
  status: "disponivel",
  prerequisites: ["cp-segunda-terceira"],
  estimatedMinutes: 55,
  competencies: ["contraponto", "conducao-de-vozes"],
  objectives: [
    "Escrever retardos com preparação, dissonância e resolução.",
    "Usar a cadeia de retardos 7–6 sobre um baixo descendente.",
    "Reconhecer o retardo abandonado por salto como erro.",
  ],
  sections: [
    {
      title: "1. Três tempos de um retardo",
      blocks: [
        {
          type: "table",
          caption: "Os retardos mais comuns (voz superior)",
          headers: ["Retardo", "Dissonância", "Resolve em", "Onde aparece"],
          rows: [["7–6", "7ª", "6ª, descendo", "Cadeias sobre baixo descendente"], ["4–3", "4ª", "3ª, descendo", "Cadência (V⁴₃ → V)"], ["9–8", "9ª", "8ª, descendo", "Chegada na tônica"], ["2–3 (no baixo)", "2ª", "3ª, baixo descendo", "Linha do baixo"]],
        },
        { type: "paragraph", text: "Preparação: a nota é consonante no acorde anterior. Dissonância: ela fica (ligada) enquanto o baixo muda. Resolução: desce por grau para uma consonância. Os três momentos precisam estar lá." },
        { type: "example", score: EXC.especie4, verdict: "correto", caption: "Cadeia de retardos 7–6", commentary: "Sobre Sol – Fá – Mi – Ré – Dó, o soprano chega sempre atrasado: cada nota preparada vira sétima e desce para a sexta." },
        { type: "example", score: EXC.retardo43, verdict: "correto", caption: "Retardo 4–3 a quatro vozes", commentary: "O Dó do soprano, preparado no I, fica sobre o Sol (4ª) e resolve em Si (3ª) antes da tônica." },
        { type: "listening", title: "Ouça a síncope", score: EXC.especie4, instructions: ["Ouça só o soprano e repare nas ligaduras.", "Ouça com o baixo e sinta a tensão em cada tempo forte."], focus: [["S"], ["S", "B"]] },
      ],
    },
    {
      title: "2. Resolver por grau",
      blocks: [
        { type: "example", score: EXC.retardo98, verdict: "correto", caption: "Retardo 9–8", commentary: "O Ré do soprano, preparado no V, fica sobre o Dó do baixo (9ª) e desce para Dó (8ª)." },
        { type: "example", score: EXC.retardoSalto, verdict: "incorreto", caption: "Retardo abandonado por salto", commentary: "O mesmo Ré salta para Sol em vez de descer por grau: a dissonância fica sem resolução e o motor aponta." },
      ],
    },
  ],
  exercises: {
    id: "ex-cp-quarta",
    title: "Verificação: retardos",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["cp4-tres"],
    staticItems: [
      { id: "cp4-tres", kind: "choice", skill: "contraponto", prompt: "Quais são os três momentos de um retardo?", options: [{ id: "a", label: "Preparação, dissonância e resolução" }, { id: "b", label: "Salto, nota longa e pausa" }, { id: "c", label: "Introdução, refrão e coda" }], correctOptionId: "a", explanation: "Consonante antes, dissonante ligada, resolve por grau." },
      { id: "cp4-direcao", kind: "choice", skill: "contraponto", prompt: "Em geral, um retardo na voz superior resolve…", options: [{ id: "a", label: "Descendo por grau" }, { id: "b", label: "Subindo por salto" }, { id: "c", label: "Ficando parado" }], correctOptionId: "a", explanation: "7–6, 4–3 e 9–8 descem por grau." },
      { id: "cp4-cadeia", kind: "choice", skill: "contraponto", prompt: "A cadeia de retardos 7–6 funciona sobre um baixo que…", options: [{ id: "a", label: "Desce por grau" }, { id: "b", label: "Sobe por quintas" }, { id: "c", label: "Fica parado" }], correctOptionId: "a", explanation: "Cada baixo novo transforma a sexta anterior em sétima." },
    ],
    generators: [{ type: "nct-identification", count: 3 }, { type: "counterpoint-interval", count: 2, earOnly: true }, { type: "voice-leading-error", count: 1, ruleIds: ["harmonia.resolucao-da-setima"] }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo os três momentos do retardo.",
  application: { title: "Aplicação no Estúdio", steps: ["Escreva um baixo descendente de cinco notas e uma cadeia de retardos 7–6 por cima.", "Numa cadência a quatro vozes, escreva um retardo 4–3.", "Confira no motor que cada retardo resolve por grau."] },
};

export const lessonCpFlorida: Lesson = {
  id: "cp-florida",
  title: "Contraponto florido e a linha cantável (5ª espécie)",
  summary: "Misturar as espécies numa linha com ritmo próprio, ponto culminante único e saltos compensados.",
  levelId: "s3",
  unitId: "s3-ctp",
  status: "disponivel",
  prerequisites: ["cp-quarta-especie"],
  estimatedMinutes: 50,
  competencies: ["contraponto", "texto-e-prosodia"],
  objectives: [
    "Combinar mínimas, semínimas, colcheias e síncopes numa mesma linha.",
    "Construir a linha com um único ponto culminante.",
    "Compensar saltos grandes com movimento contrário por grau.",
  ],
  sections: [
    {
      title: "1. Ritmo próprio",
      blocks: [
        { type: "paragraph", text: "O contraponto florido junta tudo: notas longas, passagens, bordaduras, retardos e pequenos ornamentos. O resultado é uma linha com ritmo próprio, que não anda no mesmo passo do cantus firmus. É o modelo para qualquer voz interna cantável de um arranjo." },
        { type: "example", score: EXC.especie5, verdict: "correto", caption: "5ª espécie", commentary: "Mínima, semínimas e colcheias; a linha sobe por grau até Mi5 (ponto culminante, uma vez só) e desce para a cadência Si – Lá – Si – Dó." },
        { type: "listening", title: "A curva da linha", score: EXC.especie5, instructions: ["Ouça o soprano e desenhe a curva no ar.", "Ouça com o baixo."], focus: [["S"], ["S", "B"]] },
      ],
    },
    {
      title: "2. Saltos e compensação",
      blocks: [
        { type: "list", items: ["Depois de um salto maior que uma terça, volte por grau na direção contrária.", "Evite dois saltos grandes seguidos na mesma direção.", "Saltos de sétima e de trítono são difíceis de cantar: reserve para efeitos.", "Um único ponto culminante por frase."] },
        { type: "example", score: EXC.especie5Saltos, verdict: "observacao", caption: "Saltos sem compensação", commentary: "Sol – Fá (sétima) e Fá – Lá (sexta descendente) seguidos: o motor aponta o salto grande e o Fá5 fora da tessitura. A linha perde o desenho e fica difícil de cantar." },
      ],
    },
  ],
  exercises: {
    id: "ex-cp-florida",
    title: "Verificação: contraponto florido",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["cp5-salto"],
    staticItems: [
      { id: "cp5-salto", kind: "choice", skill: "contraponto", prompt: "Depois de um salto de sexta para cima, a linha deve…", options: [{ id: "a", label: "Voltar por grau, descendo" }, { id: "b", label: "Saltar de novo para cima" }, { id: "c", label: "Repetir a nota várias vezes" }], correctOptionId: "a", explanation: "A compensação equilibra a linha e facilita a afinação." },
      { id: "cp5-culminante", kind: "choice", skill: "contraponto", prompt: "Quantos pontos culminantes uma frase bem construída costuma ter?", options: [{ id: "a", label: "Um" }, { id: "b", label: "Um a cada compasso" }, { id: "c", label: "Nenhum" }], correctOptionId: "a", explanation: "O ponto mais agudo, uma vez só, dá direção à frase." },
      { id: "cp5-ritmo", kind: "choice", skill: "contraponto", prompt: "O que caracteriza o contraponto florido?", options: [{ id: "a", label: "Ritmos variados e independentes do cantus firmus" }, { id: "b", label: "Só notas longas" }, { id: "c", label: "Todas as vozes no mesmo ritmo" }], correctOptionId: "a", explanation: "A 5ª espécie mistura as anteriores." },
    ],
    generators: [{ type: "interval-identification", count: 3, maxNumber: 8 }, { type: "nct-identification", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a compensação de saltos.",
  application: { title: "Aplicação no Estúdio", steps: ["Escreva uma linha florida de quatro compassos sobre o cantus firmus.", "Marque o ponto culminante e confira que ele aparece uma vez.", "Cante a linha antes de revisar no motor."] },
};

export const lessonCpImitacao: Lesson = {
  id: "cp-imitacao",
  title: "Imitação, cânone e contraponto invertível",
  summary: "Uma voz repete a outra: entradas imitativas, cânone (round) e duetos que funcionam com as vozes trocadas.",
  levelId: "s3",
  unitId: "s3-ctp",
  status: "disponivel",
  prerequisites: ["cp-florida"],
  estimatedMinutes: 55,
  competencies: ["contraponto", "arranjo"],
  objectives: [
    "Escrever uma entrada imitativa à oitava ou à quinta.",
    "Construir um cânone simples sobre harmonia estática.",
    "Prever o que acontece com cada intervalo quando duas vozes trocam de lugar (contraponto invertível à oitava) e apontar as quintas que viram quartas.",
  ],
  sections: [
    {
      title: "1. Cânone",
      blocks: [
        { type: "paragraph", text: "No cânone, uma voz canta a melodia e outra a repete, igual, alguns tempos depois. Para funcionar, cada trecho da melodia precisa soar bem contra o trecho anterior. O jeito mais simples: todos os trechos sobre o mesmo acorde (como nos rounds infantis) ou sobre uma progressão que se repete." },
        { type: "example", score: EXC.canone, verdict: "correto", caption: "Cânone à oitava sobre pedal", commentary: "O tenor canta a mesma melodia do soprano, uma oitava abaixo e um compasso depois. Os tempos fortes cabem no acorde de Sol, com terças, sextas e décimas entre as vozes. O Dó dos dois (2º tempo dos compassos 2 e 3) é nota de passagem: soa como quarta sobre o pedal e, no compasso 3, como sétima contra o Si do soprano, mas chega e sai por grau e resolve logo no Ré." },
        { type: "listening", title: "Siga as entradas", score: EXC.canone, instructions: ["Ouça o soprano.", "Ouça o tenor e perceba que é a mesma melodia, atrasada.", "Ouça os dois juntos."], focus: [["S"], ["T"], ["S", "T", "B"]] },
        { type: "example", score: EXC.canoneParalelo, verdict: "incorreto", caption: "Imitação sem defasagem", commentary: "Se a segunda voz canta a mesma melodia ao mesmo tempo, só que uma quinta abaixo, não há imitação: há quintas paralelas do começo ao fim." },
      ],
    },
    {
      title: "2. Imitação e inversão",
      blocks: [
        { type: "list", items: ["Imitação à oitava: a resposta é idêntica, uma oitava acima ou abaixo.", "Imitação à quinta: a resposta começa uma quinta abaixo (ou quarta acima), como numa fuga.", "Imitação livre: só o começo do motivo é imitado; depois cada voz segue seu caminho.", "Entradas sucessivas num arranjo: baixo, tenor, contralto e soprano entram com o mesmo motivo."] },
        {
          type: "table",
          caption: "Contraponto invertível à oitava: o que vira o quê quando as vozes trocam de lugar",
          headers: ["Intervalo original", "Depois da inversão", "Consequência"],
          rows: [["3ª", "6ª", "Continua imperfeita"], ["6ª", "3ª", "Continua imperfeita"], ["5ª", "4ª", "Vira dissonância: evite quintas no original"], ["8ª", "uníssono", "Continua perfeita"]],
        },
        { type: "callout", tone: "dica", title: "Para que serve", text: "Num arranjo, um dueto em contraponto invertível pode ser cantado por sopranos e tenores numa estrofe e trocado na outra (tenores em cima): material novo sem escrever nada novo." },
      ],
    },
  ],
  exercises: {
    id: "ex-cp-imitacao",
    title: "Verificação: imitação e cânone",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["cpi-canone"],
    staticItems: [
      { id: "cpi-canone", kind: "choice", skill: "contraponto", prompt: "O que é um cânone?", options: [{ id: "a", label: "Uma voz repete exatamente a melodia de outra, alguns tempos depois" }, { id: "b", label: "Duas vozes em oitavas ao mesmo tempo" }, { id: "c", label: "Uma melodia com acompanhamento de acordes" }], correctOptionId: "a", explanation: "A defasagem é o que transforma a repetição em contraponto." },
      { id: "cpi-quinta", kind: "choice", skill: "contraponto", prompt: "No contraponto invertível à oitava, uma quinta vira…", options: [{ id: "a", label: "Quarta (dissonância a duas vozes)" }, { id: "b", label: "Sexta" }, { id: "c", label: "Terça" }], correctOptionId: "a", explanation: "Por isso se evitam quintas num dueto que será invertido." },
      { id: "cpi-entradas", kind: "choice", skill: "arranjo", prompt: "Num arranjo, entradas imitativas servem para…", options: [{ id: "a", label: "Apresentar as vozes uma a uma com o mesmo motivo" }, { id: "b", label: "Esconder a melodia" }, { id: "c", label: "Evitar que o baixo cante" }], correctOptionId: "a", explanation: "É uma forma clássica de introdução ou de ponte." },
    ],
    generators: [{ type: "counterpoint-interval", count: 3 }, { type: "motion-type", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a definição de cânone.",
  application: { title: "Aplicação no Estúdio", steps: ["Escreva três compassos de melodia sobre um único acorde.", "Copie a melodia para o tenor, uma oitava abaixo e um compasso depois.", "Ouça e ajuste os trechos que chocam."] },
};

export const lessonCpQuatroVozes: Lesson = {
  id: "cp-quatro-vozes",
  title: "Contraponto a três e quatro vozes: independência real",
  summary: "Direção, ritmo e registro diferentes em cada voz, sem perder a harmonia, e a voz que só copia outra.",
  levelId: "s3",
  unitId: "s3-ctp",
  status: "disponivel",
  prerequisites: ["cp-quarta-especie"],
  estimatedMinutes: 55,
  competencies: ["contraponto", "conducao-de-vozes", "escrita-satb"],
  objectives: [
    "Dar a cada voz direção e ritmo próprios sobre uma progressão.",
    "Distribuir o movimento: quando uma voz anda, outra segura.",
    "Reconhecer a falsa independência (vozes dobradas em oitava).",
  ],
  sections: [
    {
      title: "1. Quatro linhas, uma harmonia",
      blocks: [
        { type: "paragraph", text: "A quatro vozes, independência não é cada voz fazer tudo diferente: é cada uma ter um desenho reconhecível. Uma regra prática: quando uma voz se move, pelo menos uma outra segura ou vai na direção contrária. O ritmo também se divide: uma voz em semínimas, outra em mínimas, outra com uma ligadura." },
        { type: "example", score: EXC.quatroVozes, verdict: "correto", caption: "C – Am – G7 – C com quatro desenhos", commentary: "O soprano desce Mi – Ré – Dó – Si – Dó; o contralto sobe Sol – Lá e desce Fá – Mi (a sétima resolve); o tenor sobe Dó – Mi e salta para Sol; o baixo desce Dó – Lá – Sol e volta a Dó." },
        { type: "listening", title: "Quatro desenhos", score: EXC.quatroVozes, instructions: ["Ouça cada voz sozinha e cante.", "Ouça as quatro e tente seguir o contralto."], focus: [["S"], ["A"], ["T"], ["B"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "2. Falsa independência",
      blocks: [
        { type: "example", score: EXC.quatroVozesOitavas, verdict: "incorreto", caption: "Tenor copiando o soprano", commentary: "O tenor canta Mi – Ré – Dó junto com o soprano, uma oitava abaixo: oitavas paralelas. São quatro cantores, mas só três linhas." },
        { type: "list", items: ["Contraponto a três vozes (SAB, TTB) é o melhor treino: não sobra voz para dobrar.", "Divida o grupo em pares: duas vozes em contraponto, duas em apoio.", "Num tutti, deixe o contraponto para as vozes internas e mantenha os extremos claros."] },
      ],
    },
  ],
  exercises: {
    id: "ex-cp-quatro",
    title: "Verificação: contraponto a várias vozes",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["cpq-regra"],
    staticItems: [
      { id: "cpq-regra", kind: "choice", skill: "contraponto", prompt: "Qual é uma regra prática de independência a quatro vozes?", options: [{ id: "a", label: "Quando uma voz se move, outra segura ou vai na direção contrária" }, { id: "b", label: "Todas as vozes se movem juntas" }, { id: "c", label: "Duas vozes sempre em oitavas" }], correctOptionId: "a", explanation: "O equilíbrio entre movimento e repouso deixa cada linha audível." },
      { id: "cpq-falsa", kind: "choice", skill: "conducao-de-vozes", prompt: "Tenor e soprano em oitavas o tempo todo significam…", options: [{ id: "a", label: "Uma linha a menos (falsa independência)" }, { id: "b", label: "Mais riqueza harmônica" }, { id: "c", label: "Contraponto invertível" }], correctOptionId: "a", explanation: "Dobramento é textura, não contraponto." },
      { id: "cpq-ritmo", kind: "choice", skill: "contraponto", prompt: "Como dividir o ritmo entre quatro vozes independentes?", options: [{ id: "a", label: "Cada voz com valores diferentes em cada momento" }, { id: "b", label: "Todas em semínimas" }, { id: "c", label: "Todas em notas longas" }], correctOptionId: "a", explanation: "Ritmos complementares deixam as entradas audíveis." },
    ],
    generators: [{ type: "voice-leading-error", count: 3, ruleIds: ["conducao.paralelas", "vozes.cruzamento", "vozes.espacamento"] }, { type: "motion-type", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a regra de independência.",
  application: { title: "Aplicação no Estúdio", steps: ["Escreva I – vi – V7 – I a quatro vozes com ritmos diferentes em cada voz.", "Cante cada voz sozinha.", "Confira no motor que nenhuma voz dobra outra em oitavas seguidas."] },
};

export const lessonCpContracanto: Lesson = {
  id: "cp-contracanto",
  title: "Contracanto na canção: responder, complementar, não dobrar",
  summary: "Aplicar o contraponto ao arranjo de canções: o contracanto que preenche as pausas da melodia, contrasta em ritmo e direção e nunca a dobra.",
  levelId: "s3",
  unitId: "s3-ctp",
  status: "disponivel",
  prerequisites: ["cp-quatro-vozes", "contracanto-ativo-passivo"],
  estimatedMinutes: 50,
  competencies: ["contraponto", "arranjo"],
  objectives: [
    "Escrever um contracanto que se move quando a melodia para.",
    "Contrastar ritmo e direção com a melodia.",
    "Distinguir contracanto de dobramento.",
  ],
  sections: [
    {
      title: "1. Complementar",
      blocks: [
        { type: "paragraph", text: "O contracanto é contraponto aplicado: uma segunda melodia, mais discreta que a principal. A regra de ouro é a complementaridade: quando a melodia sustenta ou pausa, o contracanto anda; quando a melodia anda, ele segura. Assim o ouvido não precisa escolher qual seguir." },
        { type: "example", score: EXC.contracanto, verdict: "correto", caption: "O contralto responde nas pausas", commentary: "Compasso 1: melodia em movimento, contracanto parado (Sol). Compasso 2: a melodia pausa e o contracanto anda (Lá – Sol). Compasso 3: a melodia sustenta Ré e pausa; o contracanto sobe Lá – Si para entregar a frase." },
        { type: "listening", title: "Pergunta e resposta", score: EXC.contracanto, instructions: ["Ouça só o soprano e repare nas pausas.", "Ouça soprano e contralto: quem anda em cada momento?"], focus: [["S"], ["S", "A"]] },
      ],
    },
    {
      title: "2. Não é dobrar",
      blocks: [
        { type: "example", score: EXC.contracantoOitavas, verdict: "observacao", caption: "Dobrar não é contracanto", commentary: "O contralto canta a melodia uma oitava abaixo, inclusive as pausas: o motor sugere evitar as oitavas paralelas. É um dobramento útil para dar peso, mas não acrescenta uma segunda ideia." },
        { type: "callout", tone: "dica", title: "Ligação com o 2º semestre", text: "A aula 'Contracanto ativo e passivo' mostrou os tipos de contracanto. Aqui o foco é a técnica de contraponto por trás deles: complementaridade de ritmo, movimento contrário e consonâncias imperfeitas." },
      ],
    },
  ],
  exercises: {
    id: "ex-cp-contracanto",
    title: "Verificação: contracanto",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["cpc-complementar"],
    staticItems: [
      { id: "cpc-complementar", kind: "choice", skill: "arranjo", prompt: "Quando o contracanto deve se mover mais?", options: [{ id: "a", label: "Quando a melodia sustenta uma nota ou pausa" }, { id: "b", label: "Junto com cada nota da melodia" }, { id: "c", label: "Nunca; ele só sustenta" }], correctOptionId: "a", explanation: "Complementaridade rítmica: um anda, o outro segura." },
      { id: "cpc-dobrar", kind: "choice", skill: "contraponto", prompt: "Uma voz que canta a melodia uma oitava abaixo é…", options: [{ id: "a", label: "Dobramento, não contracanto" }, { id: "b", label: "Contracanto ativo" }, { id: "c", label: "Cânone" }], correctOptionId: "a", explanation: "Contracanto é outra melodia." },
      { id: "cpc-intervalos", kind: "choice", skill: "contraponto", prompt: "Que intervalos o contracanto deve preferir com a melodia?", options: [{ id: "a", label: "Terças e sextas" }, { id: "b", label: "Oitavas e quintas" }, { id: "c", label: "Segundas" }], correctOptionId: "a", explanation: "Consonâncias imperfeitas dão cor sem fundir as vozes." },
    ],
    generators: [{ type: "counterpoint-interval", count: 3 }, { type: "motion-type", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo quando o contracanto se move.",
  application: { title: "Aplicação no Estúdio", steps: ["Escolha uma melodia com pausas.", "Escreva um contracanto que se move só nas pausas e notas longas.", "Ouça os dois juntos e confira se a melodia continua em primeiro plano."] },
};

export const lessonCpDescant: Lesson = {
  id: "cp-descant-quodlibet",
  title: "Descant, quodlibet e melodias combinadas",
  summary: "A linha aguda sobre a melodia do hino, duas melodias diferentes cantadas ao mesmo tempo e como planejar esses momentos no arranjo.",
  levelId: "s3",
  unitId: "s3-ctp",
  status: "disponivel",
  prerequisites: ["cp-contracanto", "cp-imitacao"],
  estimatedMinutes: 55,
  competencies: ["contraponto", "arranjo", "escrita-satb"],
  objectives: [
    "Escrever um descant em movimento contrário à melodia.",
    "Combinar duas melodias sobre a mesma harmonia (quodlibet).",
    "Planejar o descant e o quodlibet como clímax do arranjo.",
  ],
  sections: [
    {
      title: "1. Descant",
      blocks: [
        { type: "paragraph", text: "O descant é uma linha nova, acima da melodia, típica da última estrofe de hinos: a congregação (ou parte do coro) canta a melodia e os sopranos, livres dela, cantam por cima. Funciona quando anda em movimento contrário à melodia e repousa nas notas comuns." },
        { type: "example", score: EXC.descant, verdict: "correto", caption: "Melodia no tenor, descant no soprano", commentary: "Quando a melodia desce (Mi – Ré – Dó), o descant sobe (Dó – Ré – Mi), e vice-versa. As duas terminam em Dó, uma oitava de distância, por movimento contrário." },
        { type: "listening", title: "Duas linhas, um hino", score: EXC.descant, instructions: ["Ouça o tenor (a melodia).", "Ouça o soprano (o descant).", "Ouça os quatro."], focus: [["T"], ["S"], ["S", "A", "T", "B"]] },
        { type: "example", score: EXC.descantOitavas, verdict: "incorreto", caption: "'Descant' que só repete a melodia", commentary: "O soprano cantando a melodia uma oitava acima do tenor dá oitavas paralelas o tempo todo: não é descant, é dobramento." },
      ],
    },
    {
      title: "2. Quodlibet",
      blocks: [
        { type: "paragraph", text: "No quodlibet, duas melodias diferentes (às vezes de canções diferentes) são cantadas juntas porque cabem na mesma harmonia. O arranjador apresenta cada uma sozinha e depois as combina, de preferência com ritmos contrastantes." },
        { type: "example", score: EXC.quodlibet, verdict: "correto", caption: "Luz da manhã + Sol vai nascer", commentary: "O soprano canta 'Luz da manhã' em mínimas; o tenor canta outra melodia, com semínimas onde o soprano sustenta. As duas cabem na harmonia C – G – C – G7 – C." },
        { type: "list", items: ["Confira acorde por acorde: as notas das duas melodias pertencem ao acorde ou são passagem.", "Dê ritmos diferentes às melodias para o ouvido separá-las.", "Apresente cada melodia sozinha antes de combinar.", "Use como clímax: é o momento em que o arranjo 'amarra' o que veio antes."] },
      ],
    },
  ],
  exercises: {
    id: "ex-cp-descant",
    title: "Verificação: descant e quodlibet",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["cpd-movimento"],
    staticItems: [
      { id: "cpd-movimento", kind: "choice", skill: "contraponto", prompt: "Qual movimento o descant deve preferir em relação à melodia?", options: [{ id: "a", label: "Contrário" }, { id: "b", label: "Paralelo em oitavas" }, { id: "c", label: "Paralelo em quintas" }], correctOptionId: "a", explanation: "O movimento contrário mantém as duas linhas independentes." },
      { id: "cpd-quodlibet", kind: "choice", skill: "arranjo", prompt: "O que é um quodlibet?", options: [{ id: "a", label: "Duas melodias diferentes cantadas ao mesmo tempo sobre a mesma harmonia" }, { id: "b", label: "Uma melodia dobrada em oitavas" }, { id: "c", label: "Um cânone em uníssono" }], correctOptionId: "a", explanation: "As melodias se combinam porque cabem nos mesmos acordes." },
      { id: "cpd-onde", kind: "choice", skill: "arranjo", prompt: "Onde o descant costuma aparecer num hino?", options: [{ id: "a", label: "Na última estrofe" }, { id: "b", label: "Na introdução" }, { id: "c", label: "Em todas as estrofes" }], correctOptionId: "a", explanation: "É o clímax: a melodia já é conhecida e a linha nova a ilumina." },
    ],
    generators: [{ type: "counterpoint-interval", count: 2 }, { type: "realization", count: 2, mode: "canto-dado" }, { type: "motion-type", count: 1 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o movimento do descant.",
  application: {
    title: "Projeto: descant para um hino",
    steps: ["Abra Projetos → 'Descant para um hino (SATB)'.", "Escreva o descant no soprano em movimento contrário à melodia do tenor.", "Complete o contralto, revise no motor e avalie com a rubrica."],
  },
};
