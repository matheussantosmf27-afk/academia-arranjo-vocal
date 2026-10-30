import { EXC } from "../examples-cp";
import { EXD } from "../examples-didatica";
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
    {
      title: "3. Demonstração: escrever a 1ª espécie nota a nota",
      blocks: [
        { type: "list", ordered: true, items: [
          "Primeiro e último intervalos: consonância perfeita. Sobre C3, o soprano pode começar em G4 (12ª) ou C5 (15ª) e terminar em C5.",
          "Penúltima nota: sobre D3 (o 2º grau do cantus firmus), a 6ª maior B4 leva por grau à tônica — a cadência clássica 6–8.",
          "Para cada nota do meio, liste as consonâncias possíveis (3ª, 6ª, 10ª, 13ª, e as perfeitas só se chegarem por movimento contrário).",
          "Escolha preferindo o movimento contrário ao cantus firmus: quando o baixo sobe, o soprano desce.",
          "Cante a linha: ela deve ter um ponto culminante e saltos compensados.",
        ] },
        { type: "callout", tone: "atencao", title: "Regra de estilo", text: "As regras de espécie são um treino deliberadamente rígido (dissonância proibida, perfeitas só por movimento contrário). Em arranjos reais elas se afrouxam — mas a sensibilidade que desenvolvem (preferir imperfeitas, evitar perfeitas em paralelo, buscar o contrário) é a base de toda boa condução." },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Por que é erro", "Correção"], rows: [["4ª justa entre as duas vozes", "na escrita a duas vozes, a 4ª conta como dissonância", "troque por 3ª ou 6ª"], ["Muitas 3ªs paralelas seguidas (mais de três)", "as vozes perdem a independência", "intercale um movimento contrário"], ["Chegar a 5ª ou 8ª por movimento direto", "quinta/oitava direta", "chegue por movimento contrário"], ["Repetir a mesma nota várias vezes", "linha estática", "procure direção e um ponto culminante"]] },
        { type: "list", items: ["Início e fim em consonância perfeita; meio em imperfeitas.", "Movimento contrário sempre que possível.", "Nenhuma dissonância na 1ª espécie."] },
        {
          type: "challenge",
          title: "1ª espécie sobre um cantus firmus novo",
          task: "Escreva um soprano nota contra nota sobre o cantus firmus 2 (C3 – E3 | F3 – G3 | E3 – F3 | D3 – C3).",
          start: EXD.cp1Start,
          constraints: ["Só consonâncias (contando a 4ª como dissonância).", "Começar e terminar em consonância perfeita.", "Soprano entre E4 e E5."],
          criteria: ["Nenhuma 5ª ou 8ª paralela ou direta.", "Pelo menos quatro movimentos contrários.", "O motor não aponta erros nem alertas."],
          hints: ["Comece em G4 (12ª) ou C5 (15ª) e termine com B4 → C5.", "O cantus sobe nos compassos 1 e 2: faça o soprano descer ali.", "Uma possibilidade: G4 – C5 | A4 – G4 | …"],
          solution: {
            score: EXD.cp1Sol,
            commentary: "G4 – C5 | A4 – G4 | C5 – A4 | B4 – C5. Intervalos: 12ª, 13ª menor, 10ª maior, 8ª, 13ª menor, 10ª maior, 13ª maior, 15ª. A única consonância perfeita do meio (G4/G3, 8ª) é alcançada por movimento contrário. Seis das sete trocas são em movimento contrário.",
            alternatives: ["Começar em C5 (15ª) e fazer B4 – A4 sobre E3 – F3 também funciona; confira então que nenhuma 10ª se repete mais de três vezes seguidas."],
          },
        },
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
    generators: [{ type: "ear-comparison", count: 1, topics: ["paralelas"] }, { type: "counterpoint-interval", count: 1, earOnly: true }, { type: "counterpoint-interval", count: 4 }, { type: "motion-type", count: 2 }],
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
    {
      title: "3. Demonstração: do esqueleto à 2ª espécie",
      blocks: [
        { type: "list", ordered: true, items: [
          "Escreva primeiro uma 1ª espécie (uma nota por nota do cantus firmus): ela será o esqueleto dos tempos fortes.",
          "Entre duas notas fortes a uma 3ª de distância, a nota fraca é uma passagem natural (G4 – A4 – B4).",
          "Entre notas fortes iguais ou a um grau, use uma consonância vizinha ou uma bordadura.",
          "Entre notas fortes distantes (4ª ou mais), use uma consonância intermediária que divida o salto.",
          "Confira as paralelas também entre a nota fraca e a forte seguinte — o ouvido as escuta.",
        ] },
        { type: "callout", tone: "dica", title: "Para o arranjador", text: "A 2ª e a 3ª espécies treinam as vozes internas cantáveis: um contralto que anda em semínimas por passagens e bordaduras enquanto a melodia sustenta é exatamente isto. A cambiata aparece em linhas de baixo e de contralto de muitos corais." },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Dissonância no tempo forte", "não é passagem", "tempo forte sempre consonante"], ["Dissonância saltando", "sem tratamento", "dissonância só por grau (passagem/bordadura)"], ["Paralelas de nota fraca para nota forte", "o ouvido percebe", "confira todas as notas consecutivas"], ["Linha que sobe e desce sem rumo", "sem ponto culminante", "planeje o desenho antes"]] },
        { type: "list", items: ["Tempo forte consonante; fraco pode ser passagem.", "3ª espécie: passagem, bordadura e cambiata.", "Paralelas valem entre quaisquer notas seguidas."] },
        {
          type: "challenge",
          title: "2ª espécie sobre o cantus firmus 2",
          task: "Escreva um soprano com duas semínimas para cada mínima do cantus firmus 2, terminando com B4 – C5 em mínimas.",
          start: EXD.cp2Start,
          constraints: ["Tempos fortes consonantes; tempos fracos consonantes ou de passagem.", "Último compasso: B4 (mínima) e C5 (mínima).", "Soprano entre E4 e E5."],
          criteria: ["Nenhuma 5ª ou 8ª entre notas consecutivas.", "Cada dissonância chega e sai por grau na mesma direção.", "O motor não aponta erros nem alertas."],
          hints: ["Use a 1ª espécie que você escreveu como esqueleto dos tempos fortes.", "Cuidado com o compasso 2: A4 – F4 sobre F3 seguido de G4 sobre G3 dá oitavas entre notas vizinhas (F4/F3 → G4/G3).", "Uma saída para o compasso 2: A4 – C5 | G4 – B4."],
          solution: {
            score: EXD.cp2Sol,
            commentary: "G4 A4 C5 B4 | A4 C5 G4 B4 | C5 B4 A4 C5 | B4 C5. Os tempos fracos são consonâncias (A4 sobre C3, B4 sobre E3, C5 sobre F3) ou passagens (B4 entre C5 e A4 no compasso 3). A armadilha evitada está no compasso 2: com F4 no tempo fraco, F4/F3 → G4/G3 seriam oitavas paralelas entre notas vizinhas. Outra, no compasso 3: C5/F3 → A4/D3 seriam quintas — por isso o último compasso começa em B4.",
            alternatives: ["No compasso 1, G4 – E4 (consonância) em vez de G4 – A4 também é correto, mas obriga um salto de 6ª para C5: prefira a passagem."],
          },
        },
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
    {
      title: "3. Demonstração: construir uma cadeia de retardos",
      blocks: [
        { type: "list", ordered: true, items: [
          "Escreva o baixo descendente por grau e, acima dele, uma linha em 6ªs paralelas (consonâncias imperfeitas): é o esqueleto sem retardos.",
          "Atrase a voz superior meia nota: cada nota passa a começar no tempo fraco e é ligada ao tempo forte seguinte.",
          "Confira os três tempos de cada nota: no tempo fraco ela é 6ª (consonante, preparação); ligada, sobre o baixo novo, vira 7ª (dissonância); desce por grau para a 6ª seguinte (resolução).",
          "Na cadência, a última dissonância resolve na sensível, que sobe para a tônica.",
        ] },
        { type: "callout", tone: "dica", title: "Para o arranjador", text: "A cadeia 7–6 é um recurso expressivo de coral: as vozes 'chegam atrasadas' e criam uma série de pequenas tensões resolvidas. Escreva-a numa voz interna (contralto ou tenor) para dar movimento a um trecho homofônico sem cobrir a melodia." },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Retardo sem ligadura (rearticulado)", "vira apojatura, perde a suspensão", "ligue a nota de preparação"], ["Resolução para cima (fora do 7–8 com a sensível)", "a tensão não se resolve", "resolva por grau descendente"], ["Nota de resolução soando em outra voz", "o ouvido ouve a resolução antes", "evite dobrar a nota de resolução"], ["Cadeia de 5–6 confundida com retardo", "5ª e 6ª são consonantes", "retardo exige dissonância no tempo forte"]] },
        { type: "list", items: ["Preparação (consonante) – dissonância (ligada, tempo forte) – resolução (grau descendente).", "Retardos comuns: 7–6, 4–3, 9–8; 2–3 no baixo.", "Cadeia 7–6 sobre baixo descendente."] },
        {
          type: "challenge",
          title: "Retardos sobre F – E – D – C",
          task: "Sobre o baixo F3 – E3 – D3 – C3 (semibreves), escreva um soprano em síncope com dois retardos 7–6 e chegada à tônica.",
          start: EXD.cp4Start,
          constraints: ["Soprano começa depois de uma pausa de mínima.", "Cada dissonância é preparada (nota ligada) e resolve descendo por grau.", "Última nota: C5 sobre C3."],
          criteria: ["Duas 7ªs no tempo forte, cada uma resolvida numa 6ª.", "A sensível B4 sobe para C5 no final.", "O motor não aponta erros nem alertas."],
          hints: ["Que nota forma uma 6ª sobre F3 e uma 7ª sobre E3? É a preparação do primeiro retardo.", "D5 sobre F3 = 6ª; ligado sobre E3 = 7ª; desce para C5 (6ª sobre E3).", "Repita a ideia: C5 ligado sobre D3 = 7ª, desce para B4."],
          solution: {
            score: EXD.cp4Sol,
            commentary: "Pausa – D5 | (D5) C5 | (C5) B4 | C5. D5 entra como 6ª sobre F3, fica ligado sobre E3 (7ª) e resolve em C5 (6ª). C5 fica ligado sobre D3 (7ª) e resolve em B4 (6ª); B4, a sensível, sobe para C5 sobre C3. É a cadeia 7–6 terminando na cadência 6–8 da 1ª espécie.",
          },
        },
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
    {
      title: "3. Demonstração: planejar uma linha florida",
      blocks: [
        { type: "list", ordered: true, items: [
          "Desenhe o contorno antes das notas: onde a linha começa, onde chega ao ponto mais alto (uma vez só) e como desce para a cadência.",
          "Coloque as notas de apoio nos tempos fortes, todas consonantes com o cantus firmus (a 1ª espécie de novo como esqueleto).",
          "Preencha com valores variados: mínimas onde o cantus muda, semínimas para passagens e bordaduras, uma síncope ou retardo para expressão.",
          "Depois de cada salto maior que uma 3ª, volte por grau na direção contrária.",
          "Cante a linha sozinha e depois com o cantus firmus.",
        ] },
        { type: "callout", tone: "dica", title: "Para o arranjador", text: "A 5ª espécie é o modelo de qualquer voz interna bonita num arranjo: ritmo próprio, direção clara, um ponto alto e dissonâncias tratadas. Quando uma linha interna 'não canta', compare-a com estes critérios." },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Dois pontos culminantes", "a linha perde o clímax", "uma nota mais alta, uma vez"], ["Ritmo uniforme", "volta a ser 2ª ou 3ª espécie", "misture mínimas, semínimas e síncopes"], ["Saltos seguidos na mesma direção", "difícil de cantar", "compense por grau"], ["Retrogressão harmônica implícita (V → IV)", "a linha contradiz a direção funcional", "escolha notas que impliquem T–S–D–T"]] },
        { type: "list", items: ["Ritmo próprio, variado.", "Um único ponto culminante.", "Saltos compensados, dissonâncias tratadas."] },
        {
          type: "challenge",
          title: "Uma linha florida sobre o cantus firmus 2",
          task: "Escreva uma linha florida (mínimas e semínimas misturadas) sobre o cantus firmus 2, com um único ponto culminante.",
          start: EXD.cp5Start,
          constraints: ["Tempos 1 e 3 consonantes.", "Pelo menos uma mínima e seis semínimas.", "Ponto culminante no compasso 3; soprano até E5."],
          criteria: ["O E5 (ou outro ponto culminante) aparece uma vez só.", "Cada salto maior que uma 3ª é compensado.", "O motor não aponta erros nem alertas (nem sugestões de retrogressão)."],
          hints: ["Comece com uma mínima (G4 ou C5) e acelere no compasso 2.", "Sobre E3 no compasso 3, E5 forma uma 15ª: um bom lugar para o ponto culminante, alcançado por grau ou por 3ª.", "Cuidado: se o compasso 2 terminar sugerindo V (B4 – D5 sobre G3) e o 3 começar sugerindo ii, o motor aponta retrogressão."],
          solution: {
            score: EXD.cp5Sol,
            commentary: "G4 – C5 B4 | A4 C5 – B4 | C5 E5 D5 C5 | B4 – C5. Mínimas e semínimas se alternam; o E5 aparece uma vez, no 2º tempo do compasso 3, alcançado por 3ª a partir de C5 e abandonado por grau. As implicações harmônicas seguem a direção T – S – D – T. Uma primeira versão com B4 – D5 sobre G3 seguida de E5 – D5 sobre E3/F3 fazia o motor apontar uma retrogressão (V → ii⁶): mudar o compasso 2 resolveu.",
          },
        },
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
    generators: [{ type: "ear-comparison", count: 1, topics: ["retardo"] }, { type: "interval-identification", count: 1, earOnly: true, maxNumber: 8 }, { type: "interval-identification", count: 3, maxNumber: 8 }, { type: "nct-identification", count: 2 }],
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
    {
      title: "3. Demonstração: o que acontece quando as vozes trocam de lugar",
      blocks: [
        { type: "paragraph", text: "Problema: um dueto soprano–tenor vai ser repetido na estrofe seguinte com as vozes trocadas: a linha do tenor passa para o soprano (uma oitava acima) e a do soprano passa para o tenor (uma oitava abaixo). Quais intervalos sobrevivem à troca?" },
        { type: "table", caption: "Inversão à oitava, intervalo por intervalo", headers: ["Intervalo original", "Depois da troca", "Consequência"], rows: [["3ª (C/E)", "6ª (E/C)", "continua consonância imperfeita"], ["6ª (E/C)", "3ª (C/E)", "continua consonância imperfeita"], ["8ª (C/C)", "uníssono", "continua perfeita"], ["5ª (C/G)", "4ª (G/C)", "vira dissonância em duas vozes: precisa ser evitada no original ou tratada como passagem"], ["7ª (C/B, de passagem)", "2ª (B/C)", "continua dissonância: tratamento igual"]] },
        { type: "list", ordered: true, items: ["Antes de escrever o dueto, decida se ele será invertido.", "Se sim, use só 3ªs, 6ªs, 8ªs e dissonâncias de passagem; evite 5ªs nos tempos fortes.", "Confira a versão invertida inteira: os cruzamentos de registro podem criar novos problemas de extensão."] },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Cânone sobre harmonia que muda a cada tempo", "choques nos tempos fortes", "harmonia estática ou progressão que se repete"], ["Imitação à quinta sem ajustar a harmonia", "a resposta cai fora do acorde", "imitação tonal: ajuste um intervalo do motivo"], ["Dueto invertível com 5ªs nos tempos fortes", "viram 4ªs dissonantes", "3ªs e 6ªs"], ["Entradas sucessivas sem respiração", "naipes sem fôlego", "planeje a respiração de cada entrada"]] },
        { type: "list", items: ["Cânone: a mesma melodia defasada; funciona sobre harmonia estática.", "Imitação à 8ª é a mais segura; à 5ª, a mais 'fugada'.", "Invertível à 8ª: 3ª ↔ 6ª, 5ª ↔ 4ª (cuidado)."] },
        {
          type: "challenge",
          title: "Prever a inversão",
          task: "Um dueto soprano–tenor tem, nos tempos fortes, os intervalos: 8ª, 6ª, 5ª, 3ª, 6ª, 8ª. Se as vozes trocarem de lugar (inversão à oitava), que intervalos resultam? Quais pontos precisam ser reescritos antes da troca e como?",
          constraints: ["Considere a escrita a duas vozes (a 4ª conta como dissonância).", "Proponha uma correção que mantenha o dueto invertível."],
          criteria: ["Cada intervalo invertido corretamente (complemento a 9).", "O ponto problemático foi identificado.", "A correção proposta funciona nas duas versões."],
          hints: ["Some o intervalo original e o invertido: o resultado é sempre 9.", "A 5ª vira 4ª. Em duas vozes, a 4ª no tempo forte é dissonância sem tratamento.", "Troque a 5ª por uma 3ª ou 6ª (mudando uma nota de uma das vozes) e confira de novo."],
          solution: {
            commentary: "Inversão: 8ª → uníssono, 6ª → 3ª, 5ª → 4ª, 3ª → 6ª, 6ª → 3ª, 8ª → uníssono. O único problema é a 5ª do terceiro tempo forte, que vira 4ª — dissonante a duas vozes. Correção: mudar uma das notas para que o intervalo seja 3ª ou 6ª (por exemplo, se era C/G, trocar o G por A: C/A = 6ª, que vira 3ª na inversão). Os uníssonos do início e do fim da versão invertida são aceitáveis como consonâncias perfeitas nas extremidades; se o registro deixar as vozes cruzadas, confira a extensão de cada naipe.",
          },
        },
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
    generators: [{ type: "ear-comparison", count: 1, topics: ["imitacao"] }, { type: "counterpoint-interval", count: 1, earOnly: true }, { type: "counterpoint-interval", count: 3 }, { type: "motion-type", count: 2 }],
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
    {
      title: "3. Demonstração: dar desenho próprio a cada voz",
      blocks: [
        { type: "paragraph", text: "Problema: I – IV | V7 – I em Sol, com soprano e baixo em mínimas. Como fazer contralto e tenor serem linhas reconhecíveis, e não 'enchimento'?" },
        { type: "list", ordered: true, items: [
          "Distribua o movimento: se o soprano e o baixo andam em mínimas, uma voz interna pode andar em semínimas (passagens) e a outra segurar notas (ligaduras, retardos).",
          "Procure pontos de tensão expressiva: uma nota mantida de um acorde para o outro vira retardo; uma sétima pode ser preparada como nota comum.",
          "Confira que, a cada momento, pelo menos uma voz se move contra outra (contrário ou oblíquo).",
          "Cante cada voz sozinha: ela tem começo, meio e fim?",
        ] },
        { type: "callout", tone: "dica", title: "Decisões do arranjador", text: "Independência demais num coro amador vira insegurança: cada naipe precisa ouvir algo familiar. Uma regra de bolso: no máximo duas vozes com movimento próprio ao mesmo tempo; as outras sustentam ou acompanham o ritmo da melodia." },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Todas as vozes no mesmo ritmo e direção", "um bloco, não quatro linhas", "alterne quem se move"], ["Voz interna copiando a melodia em 8ª", "falsa independência", "3ªs/6ªs ou movimento próprio"], ["Movimento demais ao mesmo tempo", "textura confusa, difícil de ensaiar", "no máximo duas vozes ativas por vez"], ["Retardo sem preparação na voz interna", "dissonância atacada", "prepare com nota comum"]] },
        { type: "list", items: ["Independência = desenho e ritmo próprios.", "Quando uma voz anda, outra segura.", "Falsa independência: dobras em 8ª."] },
        {
          type: "challenge",
          title: "Quatro ritmos sobre I – IV | V7 – I",
          task: "Soprano e baixo estão dados (mínimas). Escreva contralto e tenor com ritmos diferentes entre si e das vozes externas: uma voz com passagem em semínimas e a outra com um retardo ligado.",
          start: EXD.q4Start,
          constraints: ["Não altere soprano nem baixo.", "O V7 precisa ter a sétima (C) preparada.", "Estilo coral tradicional."],
          criteria: ["Contralto e tenor têm ritmos diferentes.", "A sétima do V7 é preparada e resolve descendo.", "O motor só registra observações informativas."],
          hints: ["O D4 do primeiro acorde pode ficar ligado sobre o IV (vira 9ª) e resolver em C4 — um retardo 9–8.", "Esse mesmo C4 pode continuar no V7: agora ele é a sétima, preparada!", "O contralto pode fazer G4 – F♯4 – E4 (passagem) no compasso 1."],
          solution: {
            score: EXD.q4Sol,
            commentary: "Tenor: D4 ligado (retardo 9–8 sobre o IV) → C4, que permanece no V7 como sétima preparada e desce para B3 no I. Contralto: G4 – F♯4 (passagem) – E4 | F♯4 – D4. A sensível F♯4 do contralto desce para D4 no I, recurso de voz interna aceito e registrado como informação, para que o acorde final tenha a quinta. Cada voz tem um ritmo: soprano e baixo em mínimas, contralto com semínimas, tenor com ligadura.",
            alternatives: ["Contralto F♯4 → G4 no último acorde (sensível resolvendo) forma uníssono com o soprano G4 e deixa o I sem quinta: correto, mas com uma voz a menos no final."],
          },
        },
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
    generators: [{ type: "ear-comparison", count: 2, topics: ["dobra-melodia", "paralelas"] }, { type: "voice-leading-error", count: 3, ruleIds: ["conducao.paralelas", "vozes.cruzamento", "vozes.espacamento"] }, { type: "motion-type", count: 2 }],
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
    {
      title: "3. Demonstração: complementaridade compasso a compasso",
      blocks: [
        { type: "table", caption: "Como ler a melodia antes de escrever o contracanto", headers: ["Compasso", "A melodia…", "O contracanto…"], rows: [["com semínimas", "anda", "segura uma nota do acorde (oblíquo)"], ["com nota longa", "para", "anda por notas do acorde e passagens"], ["com pausa", "respira", "pode 'responder' com um fragmento do motivo"], ["na cadência", "chega", "chega junto, por movimento contrário"]] },
        { type: "list", ordered: true, items: ["Marque na melodia as notas longas e as pausas.", "Escreva primeiro as notas sustentadas do contracanto (onde a melodia anda).", "Preencha os espaços da melodia com movimento por grau, em direção contrária à frase seguinte da melodia.", "Confira com o baixo: nenhuma 5ª ou 8ª paralela; nenhuma sensível dobrada."] },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Contracanto em 8ª com a melodia", "dobramento, não diálogo", "3ªs, 6ªs e movimento contrário"], ["Contracanto ativo junto com melodia ativa", "competição", "alterne"], ["Contracanto acima da melodia num naipe forte", "a melodia some", "contracanto abaixo, ou acima em p"], ["Sensível do contracanto dobrando a da melodia", "oitavas na resolução", "confira as dobras nos V"]] },
        { type: "list", items: ["Complementaridade: quando um anda, o outro segura.", "Contracanto em registro próprio, mais discreto que a melodia.", "Não é dobrar."] },
        {
          type: "challenge",
          title: "Um contralto que responde",
          task: "A melodia (soprano) e o baixo estão dados; a melodia tem notas longas nos compassos 2 e 4. Escreva um contracanto no contralto que se mova nessas notas longas e segure nas outras.",
          start: EXD.ccpStart,
          constraints: ["Não altere soprano nem baixo; tenor em pausa.", "Contralto entre A3 e B4.", "Só notas do acorde e passagens por grau."],
          criteria: ["No compasso 1 o contralto sustenta; nos compassos 2 e 4 ele anda.", "Nenhuma 5ª ou 8ª paralela com a melodia ou com o baixo.", "O motor só registra observações informativas."],
          hints: ["Compasso 1: uma nota comum aos acordes de Dó e Sol.", "Compasso 2 (Lá menor sob C5 longo): suba por grau do E4 até o A4.", "Compasso 3: B4 no V e, no I com E5 no soprano, G4 (não C5: acima da tessitura)."],
          solution: {
            score: EXD.ccpSol,
            commentary: "Contralto: G4 (semibreve, nota comum de I e V) | E4 F4 G4 A4 (sob o C5 longo, subindo por grau) | B4 – G4 | G4 F4 E4 (sob o C5 final, descendo). A melodia e o contracanto alternam o primeiro plano: o ouvido segue um de cada vez. No compasso 3, a sensível B4 do contralto desce para G4 (voz interna) em vez de subir para C5, acima da tessitura do contralto.",
            alternatives: ["No compasso 4, um contracanto que sobe (E4 F4 G4 → …) também funciona se terminar numa consonância com o C5; a descida dá sensação de fim."],
          },
        },
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
    generators: [{ type: "ear-comparison", count: 1, topics: ["contracanto"] }, { type: "counterpoint-interval", count: 1, earOnly: true }, { type: "counterpoint-interval", count: 3 }, { type: "motion-type", count: 2 }],
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
    {
      title: "3. Demonstração: escrever um descant",
      blocks: [
        { type: "list", ordered: true, items: [
          "Escreva a melodia do hino (no tenor ou na congregação) e o baixo. O descant vai acima de tudo, no registro dos sopranos.",
          "Para cada acorde, liste as notas do acorde disponíveis entre C5 e F5 (o registro brilhante do soprano).",
          "Escolha a sequência em movimento contrário à melodia: quando ela sobe, o descant desce.",
          "Prefira notas longas: o descant é uma linha de 'teto', não uma segunda melodia agitada.",
          "Termine numa consonância perfeita com a melodia (8ª ou 15ª) por movimento contrário.",
        ] },
        { type: "callout", tone: "atencao", title: "Quodlibet: conferir acorde por acorde", text: "Para combinar duas melodias existentes, faça uma tabela: compasso, acorde, nota da melodia 1, nota da melodia 2. Cada par precisa pertencer ao acorde ou ser passagem por grau. Se dois ou três pontos falharem, ajuste o ritmo de uma das melodias (adiantar ou atrasar uma nota) antes de mudar notas." },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Descant em 8ªs com a melodia", "dobramento", "movimento contrário"], ["Descant agudo o tempo todo", "cansa e cobre o coro", "agudo só no clímax"], ["Quodlibet com as duas melodias no mesmo ritmo", "o ouvido não separa", "ritmos contrastantes"], ["Combinar melodias sem apresentar cada uma", "o público não reconhece", "cada melodia sozinha antes"]] },
        { type: "list", items: ["Descant: linha nova acima da melodia, em movimento contrário, notas longas.", "Quodlibet: duas melodias na mesma harmonia, ritmos contrastantes.", "Os dois funcionam como clímax."] },
        {
          type: "challenge",
          title: "Descant para um hino",
          task: "A melodia do hino está no tenor (C4 – D4 | E4 – D4 | C4), com contralto e baixo dados. Escreva um descant no soprano em movimento contrário à melodia.",
          start: EXD.descantStart,
          constraints: ["Não altere contralto, tenor e baixo.", "Soprano entre B4 e E5.", "Termine em 8ª com a melodia."],
          criteria: ["Em pelo menos três das quatro trocas, soprano e tenor vão em direções opostas.", "Cada acorde continua completo (ou com a quinta omitida).", "O motor não aponta erros nem alertas."],
          hints: ["A melodia sobe C4 – D4 – E4: o descant desce.", "Sobre o V⁶ (baixo B2), o acorde precisa de G (no contralto) e D: o soprano pode cantar D5.", "Descant possível: E5 – D5 | C5 – B4 | C5."],
          solution: {
            score: EXD.descantSol,
            commentary: "E5 – D5 | C5 – B4 | C5. Quando a melodia sobe (C4 → D4 → E4), o descant desce (E5 → D5 → C5); quando ela desce para D4, o descant desce junto para B4 em 6ªs — o único movimento paralelo, em consonância imperfeita — e depois os dois se encontram em 8ª (C5/C4) por movimento contrário.",
            alternatives: ["Começar em G5 seria brilhante, mas acima do registro confortável dos sopranos amadores: reserve para um coro experiente."],
          },
        },
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
    generators: [{ type: "ear-comparison", count: 1, topics: ["contracanto"] }, { type: "counterpoint-interval", count: 1, earOnly: true }, { type: "counterpoint-interval", count: 2 }, { type: "realization", count: 2, mode: "canto-dado" }, { type: "motion-type", count: 1 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o movimento do descant.",
  application: {
    title: "Projeto: descant para um hino",
    steps: ["Abra Projetos → 'Descant para um hino (SATB)'.", "Escreva o descant no soprano em movimento contrário à melodia do tenor.", "Complete o contralto, revise no motor e avalie com a rubrica."],
  },
};
