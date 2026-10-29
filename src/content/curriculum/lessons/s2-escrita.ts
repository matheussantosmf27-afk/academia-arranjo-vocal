import { EX } from "../examples";
import { EXA } from "../examples-arranjo";
import { EXD } from "../examples-didatica";
import type { Lesson } from "../types";

/* 2º semestre — HMZ201 (três vozes) e TEX201 Texturas e Distribuição Vocal. */

export const lessonTresVozes: Lesson = {
  id: "tres-vozes",
  title: "Escrita a três vozes (SAB, SSA e TTB)",
  summary: "Quando o grupo tem só três naipes: que nota do acorde omitir, como manter a harmonia clara e como distribuir as vozes.",
  levelId: "s2",
  unitId: "s2-hmz",
  status: "disponivel",
  prerequisites: ["harmonizacao-satb"],
  estimatedMinutes: 50,
  competencies: ["escrita-satb", "conducao-de-vozes"],
  objectives: [
    "Escolher a formação de três vozes adequada ao grupo (SAB, SSA, TTB).",
    "Decidir que nota do acorde omitir sem perder a identidade harmônica.",
    "Escrever cadências claras a três vozes.",
  ],
  sections: [
    {
      title: "1. Por que três vozes",
      blocks: [
        {
          type: "paragraph",
          text: "Muitos grupos reais não têm quatro naipes equilibrados: coros de igreja com poucos homens (SAB — soprano, contralto e uma voz masculina que canta o baixo), grupos femininos (SSA), conjuntos masculinos pequenos (TTB) e o trio vocal de apoio de uma banda. Escrever bem a três vozes é uma habilidade central do arranjador — e, em muitos contextos, mais útil que a escrita a quatro.",
        },
        {
          type: "table",
          caption: "Formações de três vozes",
          headers: ["Formação", "Quem canta", "Onde aparece"],
          rows: [
            ["SAB", "Soprano, contralto, baixo (ou barítono)", "Coros de igreja e escolares com poucos homens"],
            ["SSA", "Soprano I, soprano II, contralto", "Coros femininos e infantis"],
            ["TTB", "Tenor I, tenor II, baixo", "Grupos masculinos pequenos"],
            ["Trio de apoio", "Três vozes em bloco sobre a banda", "Louvor, pop, gravações"],
          ],
        },
      ],
    },
    {
      title: "2. Que nota omitir",
      blocks: [
        {
          type: "list",
          items: [
            "Nunca omita a terça: é ela que diz se o acorde é maior ou menor.",
            "Em tríades, omita a quinta: fundamental, terça e fundamental (ou fundamental, terça e quinta, sem dobrar nada).",
            "Em acordes de sétima, mantenha fundamental (no baixo), terça e sétima; a quinta sai.",
            "Na cadência final, o acorde de tônica pode ter fundamental dobrada e terça — sem quinta.",
          ],
        },
        { type: "example", score: EXA.tresVozes, verdict: "correto", caption: "Cadência V – I a três vozes", commentary: "I com fundamental, terça e fundamental; V com fundamental, quinta e terça (a sensível B4 no soprano sobe para a tônica). Harmonia completa e clara com apenas três notas." },
        {
          type: "example",
          score: EXA.tresVozesSemTerca,
          verdict: "incorreto",
          caption: "Três vozes só em quintas e oitavas",
          commentary: "Sem terças, os acordes ficam 'ocos' e ambíguos — e as vozes andam em quintas e oitavas paralelas, que o motor aponta como erro no coral tradicional.",
        },
      ],
    },
    {
      title: "3. Distribuição e espaçamento",
      blocks: [
        {
          type: "paragraph",
          text: "Com três vozes, o 'buraco' entre a voz masculina e as femininas pode ficar grande. Mantenha soprano e contralto a no máximo uma oitava de distância e deixe o baixo livre para fazer a linha de baixo. Em SSA, as três vozes ficam próximas: use acordes fechados e cuidado com cruzamentos entre soprano II e contralto.",
        },
        { type: "listening", title: "Ouça a cadência a três", score: EXA.tresVozes, instructions: ["Ouça só soprano e baixo: o esqueleto.", "Acrescente o contralto: ele completa a terça do acorde."], focus: [["S", "B"], ["S", "A", "B"]] },
      ],
    },
    {
      title: "4. Demonstração: de quatro para três vozes",
      blocks: [
        { type: "paragraph", text: "Problema: o coro só tem soprano, contralto e uma voz masculina (SAB). Como reduzir uma cadência V → I escrita para SATB (soprano B4 → C5, contralto G4 → G4, tenor D4 → E4, baixo G2 → C3)?" },
        { type: "list", ordered: true, items: [
          "O soprano (melodia) e o baixo (fundamentais) ficam: B4 → C5 e G2 → C3.",
          "Liste o que sobra em cada acorde: no V, G (já no baixo) e D; no I, C (já no soprano e no baixo), E e G.",
          "Prioridade: a terça de cada acorde precisa estar em alguma voz. No V, a terça é B (no soprano); no I, é E — que só o contralto pode cantar.",
          "Contralto: D4 no V (quinta, completa o acorde) → E4 no I (terça). Movimento por grau.",
          "Confira: V = G2, D4, B4 (completo); I = C3, E4, C5 (sem quinta, com terça). Nenhuma paralela; espaçamento S–A dentro de uma 8ª. É a versão de três vozes da seção 2.",
        ] },
        { type: "callout", tone: "dica", title: "Decisão do arranjador: SAB, SSA ou TTB", text: "Em SAB, o 'buraco' entre o contralto e a voz masculina é normal: mantenha soprano e contralto próximos. Em SSA, as três vozes ficam numa mesma região: acordes fechados, cuidado com cruzamentos. Em TTB, o baixo faz as fundamentais e os tenores se dividem entre terça e quinta (ou sétima)." },
      ],
    },
    {
      title: "5. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Omitir a terça", "acorde oco e ambíguo", "a terça sempre; a quinta sai"], ["Contralto colado ao soprano em 8ªs", "três vozes viram duas", "3ªs e 6ªs entre soprano e contralto"], ["Baixo que só dobra a melodia", "falta de fundamento harmônico", "baixo nas fundamentais e inversões, em contraponto"], ["Sétima sem terça em acorde de sétima", "função perdida", "fundamental, terça e sétima; sem quinta"]] },
        { type: "list", items: ["Três vozes: fundamental, terça e mais uma nota (fundamental dobrada, quinta ou sétima).", "Nunca omita a terça.", "Escolha a formação pelo grupo real (SAB, SSA, TTB)."] },
        {
          type: "challenge",
          title: "Uma terça em cada acorde (SAB)",
          task: "Soprano e baixo estão dados para I – V | I⁶ – V | I em Dó maior. Escreva o contralto de modo que todos os acordes tenham terça.",
          start: EXD.sabStart,
          constraints: ["Não altere soprano nem baixo; não use o tenor.", "Contralto entre A3 e B4.", "Só notas dos acordes indicados."],
          criteria: ["Cada acorde tem terça (no soprano, no contralto ou, no I⁶, no baixo).", "Nenhuma 5ª ou 8ª paralela entre qualquer par.", "O motor não aponta erros nem alertas."],
          hints: ["No primeiro I, o soprano já tem E5 (terça). O contralto pode cantar G4.", "No primeiro V, o soprano tem D5 (quinta) e o baixo G2 (fundamental): quem canta a terça B?", "No I⁶, a terça já está no baixo (E3); no V seguinte, o soprano B4 é a terça. No I final, o contralto precisa buscar E4."],
          solution: {
            score: EXD.sabSol,
            commentary: "Contralto G4 – B4 | G4 – G4 | E4. No primeiro V, o contralto canta a terça B4 (o soprano está na quinta). Depois, a sensível do contralto desce para G4 no I⁶ — em voz interna, aceitável — porque a terça do I⁶ já está no baixo. No último V, o soprano tem a terça; o contralto mantém G4 (fundamental, nota comum) e desce para E4, a terça do I final.",
            alternatives: ["Contralto B4 → C5 no I⁶ (sensível resolvendo) forma uníssono com o soprano: correto, mas apaga uma das três vozes; em SAB, cada voz conta."],
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-tres-vozes",
    title: "Verificação: três vozes",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["tv-omitir"],
    staticItems: [
      {
        id: "tv-omitir",
        kind: "choice",
        skill: "escrita-satb",
        prompt: "Numa tríade a três vozes, qual nota pode ser omitida?",
        options: [
          { id: "a", label: "A quinta" },
          { id: "b", label: "A terça" },
          { id: "c", label: "A fundamental, se estiver no baixo" },
        ],
        correctOptionId: "a",
        explanation: "A terça define o modo e a fundamental define o acorde; a quinta é a nota menos necessária.",
      },
      {
        id: "tv-setima",
        kind: "choice",
        skill: "escrita-satb",
        prompt: "G7 a três vozes: quais notas manter?",
        options: [
          { id: "a", label: "G (baixo), B e F" },
          { id: "b", label: "G, D e F" },
          { id: "c", label: "B, D e F" },
        ],
        correctOptionId: "a",
        explanation: "Fundamental, terça (sensível) e sétima: o trítono B–F é o que dá ao acorde sua função de dominante.",
      },
      {
        id: "tv-sab",
        kind: "choice",
        skill: "arranjo",
        prompt: "Um coro de igreja tem 12 sopranos, 8 contraltos e 3 homens. Que formação usar?",
        options: [
          { id: "a", label: "SAB" },
          { id: "b", label: "SATB com tenores e baixos" },
          { id: "c", label: "TTBB" },
        ],
        correctOptionId: "a",
        explanation: "Três homens não sustentam dois naipes masculinos: juntos, cantam a voz de baixo do SAB.",
      },
    ],
    generators: [{ type: "chord-identification", count: 3 }, { type: "cadence-identification", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a nota a omitir.",
  application: {
    title: "Prática no laboratório de escrita",
    steps: [
      "Abra o coral SATB de exemplo e apague o tenor (transforme as notas em pausas).",
      "Reescreva o contralto para que nenhum acorde fique sem terça.",
      "Revise com o motor até não haver erros.",
    ],
  },
};

export const lessonTexturas: Lesson = {
  id: "texturas-vocais",
  title: "Texturas vocais: uníssono, homofonia, melodia com acompanhamento e contracanto",
  summary: "O cardápio de texturas do arranjador: o que cada uma comunica, quando usar e como alternar entre elas para dar forma ao arranjo.",
  levelId: "s2",
  unitId: "s2-tex",
  status: "disponivel",
  prerequisites: ["harmonizacao-satb"],
  estimatedMinutes: 65,
  competencies: ["arranjo", "escrita-satb"],
  objectives: [
    "Reconhecer e escrever as cinco texturas básicas do arranjo vocal.",
    "Escolher a textura de cada seção conforme a intensidade e a letra.",
    "Passar a melodia entre naipes sem perder clareza.",
  ],
  sections: [
    {
      title: "1. O cardápio de texturas",
      blocks: [
        {
          type: "table",
          caption: "Texturas básicas",
          headers: ["Textura", "Como é", "Efeito", "Uso típico"],
          rows: [
            ["Uníssono / oitavas", "Todos cantam a mesma melodia", "Força, unidade, clareza do texto", "Início, refrão final, frases de impacto"],
            ["Homofonia", "Todas as vozes cantam a letra no mesmo ritmo, em acordes", "Solenidade, clareza harmônica", "Hinos, refrões, finais"],
            ["Melodia + pad", "Uma voz canta a letra; as outras sustentam acordes em 'uh', 'mm'", "Intimidade, foco no solista", "Versos, introduções"],
            ["Melodia + acompanhamento rítmico", "Uma voz canta; as outras fazem ritmos com sílabas", "Movimento, energia", "Pop, MPB, gospel"],
            ["Contracanto / polifonia", "Duas ou mais linhas melódicas independentes", "Riqueza, diálogo", "Segundo verso, pontes, desenvolvimento"],
          ],
        },
        {
          type: "callout",
          tone: "dica",
          title: "Variar é dar forma",
          text: "Um arranjo que usa a mesma textura do início ao fim cansa, por mais bem escrito que seja. Mudar de textura entre seções é a ferramenta mais simples e eficaz para mostrar ao ouvinte que algo novo começou.",
        },
      ],
    },
    {
      title: "2. Homofonia e melodia com pad",
      blocks: [
        { type: "example", score: EXA.melodiaHarmonizada, verdict: "correto", caption: "Homofonia", commentary: "Todas as vozes cantam o texto juntas. A harmonia muda a cada meio compasso e o ouvinte entende cada palavra." },
        {
          type: "example",
          score: EXA.melodiaPad,
          verdict: "correto",
          caption: "Melodia com pad",
          commentary: "Só o soprano canta a letra; contralto, tenor e baixo sustentam os acordes em 'uh', mudando de nota apenas quando a harmonia muda. A melodia ganha destaque e o clima fica mais íntimo.",
        },
        {
          type: "listening",
          title: "Homofonia × pad",
          score: EXA.melodiaPad,
          instructions: ["Ouça o pad sem o soprano: são só acordes longos.", "Ouça tudo: o soprano 'flutua' sobre o pad.", "Compare com o exemplo homofônico acima."],
          focus: [["A", "T", "B"], ["S", "A", "T", "B"]],
        },
      ],
    },
    {
      title: "3. Passar a melodia para outro naipe",
      blocks: [
        {
          type: "paragraph",
          text: "Dar a melodia aos tenores (ou aos contraltos) num segundo verso é uma das maneiras mais eficazes de renovar o arranjo. Cuidados: a melodia precisa caber na tessitura do novo naipe (às vezes uma oitava abaixo), e as outras vozes devem ficar mais leves e afastadas para não encobri-la. Vozes acima da melodia devem cantar mais piano e em notas longas.",
        },
        {
          type: "example",
          score: EXA.melodiaNoTenor,
          verdict: "correto",
          caption: "A melodia no tenor",
          commentary: "O tenor canta a melodia uma oitava abaixo; soprano e contralto sustentam notas longas acima, e o baixo dá a fundamental. O acorde final ganha o soprano no Dó5 como 'teto' brilhante.",
        },
        { type: "example", score: EXA.ttbbMelodiaT2, verdict: "correto", caption: "Em TTBB: a melodia no Tenor II", commentary: "No coro masculino, a melodia no Tenor II fica no centro do acorde, com o Tenor I fazendo uma 'harmonia de cima'. É a distribuição clássica do barbershop e do coro masculino." },
      ],
    },
    {
      title: "4. Oitavas e uníssono",
      blocks: [
        {
          type: "paragraph",
          text: "Uníssono é poderoso exatamente porque é raro. Use-o para o primeiro verso de um hino (todos juntos), para uma frase de impacto no meio do arranjo ou para o refrão final. No estilo coral tradicional, lembre-se de que as oitavas paralelas entre vozes que deveriam ser independentes são consideradas erro — mas quando TODAS as vozes cantam a melodia em uníssono ou oitavas por uma frase inteira, não é condução de vozes, é textura.",
        },
        { type: "example", score: EXA.unissonoOitavasPop, verdict: "observacao", caption: "Melodia em oitavas no estilo popular", commentary: "O motor registra as oitavas apenas como sugestão: no estilo popular, é escolha de textura legítima." },
      ],
    },
    {
      title: "5. Demonstração: escolher a textura de cada estrofe",
      blocks: [
        { type: "paragraph", text: "Problema: um hino de três estrofes iguais (mesma melodia, textos diferentes), para SATB amador. Se as três forem em homofonia, a terceira soa igual à primeira. Como planejar?" },
        { type: "table", caption: "Plano de texturas e o motivo de cada escolha", headers: ["Estrofe", "Texto", "Textura", "Por quê"], rows: [["1", "apresenta o tema", "uníssono (todos), depois homofonia na última frase", "o público ouve a melodia sem distração; a harmonia entra como surpresa"], ["2", "mais íntima", "melodia nos tenores, sopranos e contraltos em pad 'uh'", "mudança de cor sem aumentar a intensidade"], ["3", "conclusão, clímax", "homofonia completa com o soprano no topo e final em posição aberta", "a textura mais cheia é guardada para o fim"]] },
        { type: "paragraph", text: "Repare que a escolha segue a curva de energia (p → mp → f) e o conteúdo do texto, e que cada estrofe muda pelo menos uma coisa em relação à anterior. A dificuldade para o coro também é dosada: só a estrofe 2 traz algo novo para ensaiar." },
        { type: "callout", tone: "atencao", title: "Melodia sempre audível", text: "Ao passar a melodia para um naipe médio ou grave, as vozes acima dela precisam ficar mais leves (notas longas, dinâmica menor, sílaba neutra). Se a melodia sumir, a textura falhou — confira ouvindo só a voz da melodia e depois o conjunto." },
      ],
    },
    {
      title: "6. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Mesma textura do início ao fim", "arranjo monótono", "mude a textura a cada seção"], ["Melodia num naipe médio coberta por vozes agudas fortes", "melodia inaudível", "vozes acima em p e notas longas"], ["Contracanto ativo junto com melodia muito movimentada", "duas linhas disputando a atenção", "o contracanto anda quando a melodia para"], ["Uníssono usado o tempo todo", "perde o impacto", "guarde-o para momentos especiais"]] },
        { type: "list", items: ["Cinco texturas: uníssono/oitavas, homofonia, melodia + pad, melodia + ritmo, contracanto.", "A textura segue a intensidade e o texto de cada seção.", "Ao trocar a melodia de naipe, alivie as vozes acima dela."] },
        {
          type: "challenge",
          title: "Texturas para uma canção com refrão",
          task: "Uma canção para SATB a cappella tem a forma: Verso 1 – Refrão – Verso 2 – Refrão – Refrão final. Escolha a textura de cada seção, quem canta a melodia e a sílaba das vozes de apoio, justificando cada escolha em uma frase.",
          constraints: ["Use pelo menos quatro texturas diferentes.", "A melodia deve estar sempre audível.", "O refrão final deve ser a seção mais cheia."],
          criteria: ["Seções vizinhas mudam pelo menos um parâmetro.", "A sílaba de apoio combina com a função (pad em 'uh'/'mm', ritmo em 'dum'/'ba').", "Se a melodia sai do soprano em alguma seção, você disse como as vozes acima dela ficam mais leves."],
          hints: ["Comece pelo refrão final e trabalhe para trás: o que sobra para os versos?", "Os dois refrões do meio podem ser diferentes entre si: um em homofonia, outro com melodia + ritmo.", "Para o verso 2, pense em mudar a cor (melodia em outro naipe) em vez de aumentar a intensidade."],
          solution: {
            commentary: "Um plano possível: Verso 1 — melodia nos sopranos com pad em 'uh' (contraltos, tenores e baixos), mp: apresenta a canção sem competir com o texto. Refrão 1 — homofonia com a letra, mf: o texto principal fica claro em todas as vozes. Verso 2 — melodia nos tenores; sopranos e contraltos em 'mm' agudo e leve, baixos em notas longas, mp: mesma melodia, cor nova. Refrão 2 — melodia nos sopranos, contraltos e tenores em ritmo com 'dum' nos contratempos, baixo com fundamentais nos tempos fortes, mf/f: energia sem acrescentar harmonia. Refrão final — homofonia completa com a melodia em oitavas (sopranos + tenores), f: a textura mais cheia, com o uníssono de oitava como recurso guardado para o fim.",
            alternatives: ["Verso 2 com contracanto ativo dos contraltos (letra própria ou eco) em vez de trocar a melodia de naipe: acrescenta uma camada em vez de mudar a cor."],
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-texturas",
    title: "Verificação: texturas",
    instructions: "Domínio: 80% e os itens essenciais.",
    minScore: 0.8,
    requiredItemIds: ["tx-pad", "tx-variar"],
    staticItems: [
      {
        id: "tx-pad",
        kind: "choice",
        skill: "arranjo",
        prompt: "Numa textura de melodia com pad, o que as vozes de acompanhamento fazem?",
        options: [
          { id: "a", label: "Sustentam os acordes em sílabas neutras, mudando de nota quando a harmonia muda" },
          { id: "b", label: "Cantam a letra junto com a melodia" },
          { id: "c", label: "Fazem uma segunda melodia independente" },
        ],
        correctOptionId: "a",
        explanation: "Pad é 'tapete': acordes longos e discretos que sustentam a melodia.",
      },
      {
        id: "tx-variar",
        kind: "choice",
        skill: "arranjo",
        prompt: "Por que alternar texturas entre as seções?",
        options: [
          { id: "a", label: "Para dar forma ao arranjo e mostrar ao ouvinte que uma nova seção começou" },
          { id: "b", label: "Porque o motor exige" },
          { id: "c", label: "Para dificultar o ensaio" },
        ],
        correctOptionId: "a",
        explanation: "A mudança de textura é o sinal mais claro de forma que o arranjador tem.",
      },
      {
        id: "tx-texto",
        kind: "choice",
        skill: "texto-e-prosodia",
        prompt: "Qual textura deixa a letra mais clara para o ouvinte?",
        options: [
          { id: "a", label: "Uníssono ou homofonia" },
          { id: "b", label: "Polifonia com quatro linhas independentes" },
          { id: "c", label: "Pad em 'uh'" },
        ],
        correctOptionId: "a",
        explanation: "Quando todos dizem a mesma sílaba ao mesmo tempo, o texto é inteligível. Na polifonia, as palavras se sobrepõem.",
      },
      {
        id: "tx-tenor",
        kind: "choice",
        skill: "arranjo",
        prompt: "A melodia passou para os tenores. Como escrever as vozes femininas?",
        options: [
          { id: "a", label: "Mais leves: notas longas, dinâmica mais suave, sem competir com a melodia" },
          { id: "b", label: "Mais fortes e mais agudas, para brilhar" },
          { id: "c", label: "Na mesma melodia, uma oitava acima" },
        ],
        correctOptionId: "a",
        explanation: "Vozes acima da melodia tendem a encobri-la; precisam ser discretas.",
      },
    ],
    generators: [{ type: "motion-type", count: 3 }, { type: "voice-leading-error", count: 2, ruleIds: ["conducao.paralelas"] }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo pad e variação de textura.",
  application: {
    title: "Prática no laboratório de escrita",
    steps: [
      "Abra o exemplo 'Melodia com pad' (no laboratório, use 'Abrir exemplo').",
      "Duplique o trecho: na segunda vez, transforme o pad em homofonia, dando a letra a todas as vozes.",
      "Ouça as duas versões em sequência e descreva a diferença de efeito.",
    ],
  },
};

export const lessonVoicings: Lesson = {
  id: "voicings-posicoes",
  title: "Distribuição dos acordes: posição fechada, aberta e blocos",
  summary: "Como espalhar as notas do acorde entre as vozes: posição fechada e aberta, blocos paralelos, e o que cada uma faz com o timbre do coro.",
  levelId: "s2",
  unitId: "s2-tex",
  status: "disponivel",
  prerequisites: ["texturas-vocais", "espacamento-cruzamento"],
  estimatedMinutes: 55,
  competencies: ["escrita-satb", "conducao-de-vozes", "arranjo"],
  objectives: [
    "Escrever o mesmo acorde em posição fechada e aberta.",
    "Escolher a posição segundo o registro e a sonoridade desejada.",
    "Reconhecer a escrita em blocos paralelos e quando ela é estilo, não erro.",
  ],
  sections: [
    {
      title: "1. Fechada e aberta",
      blocks: [
        {
          type: "paragraph",
          text: "Em posição fechada, soprano, contralto e tenor ficam dentro de uma oitava: não cabe outra nota do acorde entre eles. O som é compacto, brilhante e 'junto' — bom para passagens rápidas e grupos pequenos. Em posição aberta, as vozes se espalham por mais de uma oitava, com uma nota do acorde 'pulada' entre vozes vizinhas. O som é amplo, ressonante e solene — bom para finais, hinos e coros grandes.",
        },
        { type: "example", score: EXA.fechado, verdict: "correto", caption: "Posição fechada", commentary: "Soprano, contralto e tenor dentro de uma oitava (C4–G4/A4). O baixo fica livre embaixo." },
        { type: "example", score: EXA.aberto, verdict: "correto", caption: "Posição aberta", commentary: "Entre o tenor (C4) e o soprano (E5) há mais de uma oitava; o contralto fica no meio. O acorde soa mais 'largo'." },
        {
          type: "listening",
          title: "Fechada × aberta",
          score: EXA.aberto,
          instructions: ["Ouça a posição aberta e depois volte ao exemplo fechado.", "Qual soa mais ampla? Qual soa mais compacta?"],
          focus: [["S", "A", "T", "B"]],
        },
      ],
    },
    {
      title: "2. Regras de espaçamento",
      blocks: [
        {
          type: "list",
          items: [
            "Entre soprano e contralto, e entre contralto e tenor: no máximo uma oitava.",
            "Entre tenor e baixo, a distância pode ser maior (até duas oitavas).",
            "No grave, intervalos pequenos (terças) soam 'embolados': deixe intervalos maiores entre as vozes graves.",
            "Ao mudar de posição fechada para aberta, faça-o num salto de uma única voz ou numa nova frase.",
          ],
        },
        { type: "example", score: EX.espacamento, verdict: "incorreto", caption: "Buraco entre soprano e contralto", commentary: "Mais de uma oitava entre as duas vozes de cima: o acorde 'se separa' em duas camadas." },
      ],
    },
    {
      title: "3. Blocos paralelos (estilo popular)",
      blocks: [
        {
          type: "paragraph",
          text: "No jazz vocal, no gospel e no pop, é comum mover as vozes em bloco: todas sobem e descem juntas, mantendo o mesmo desenho do acorde. O efeito é o de um 'naipe de metais' vocal. No estilo tradicional, isso gera quintas e oitavas paralelas e sétimas que não resolvem; no estilo popular, é uma sonoridade característica.",
        },
        {
          type: "example",
          score: EXA.dropTradicional,
          verdict: "incorreto",
          caption: "Tétrades em bloco, no coral tradicional",
          commentary: "O motor acusa quintas paralelas e sétimas que não resolvem para baixo: no estilo tradicional, é escrita incorreta.",
        },
        {
          type: "example",
          score: EXA.dropPop,
          verdict: "observacao",
          caption: "As mesmas tétrades no estilo popular",
          commentary: "No estilo popular, as paralelas viram apenas sugestões e as sétimas podem permanecer: é a sonoridade de grupos vocais de jazz e gospel. Saber em que estilo se está escrevendo muda o julgamento.",
        },
      ],
    },
    {
      title: "4. Demonstração: o mesmo acorde em duas posições",
      blocks: [
        { type: "paragraph", text: "Problema: Sol maior, soprano em B4, baixo em G2. Escreva contralto e tenor em posição fechada e depois em posição aberta." },
        { type: "list", ordered: true, items: [
          "Notas do acorde: G, B, D. O soprano tem B (terça), o baixo tem G. Faltam D e mais um G (dobrando a fundamental).",
          "Posição fechada: as três vozes de cima dentro de uma 8ª, sem nota do acorde 'pulada'. Abaixo de B4, as notas mais próximas são G4 e D4: contralto G4, tenor D4.",
          "Posição aberta: entre vozes superiores vizinhas fica uma nota do acorde de fora. Abaixo de B4, pule G4 e use D4 no contralto; abaixo de D4, pule B3 e use G3 no tenor.",
          "Confira o espaçamento: fechada (D4–G4–B4) e aberta (G3–D4–B4) respeitam o limite de uma 8ª entre vozes vizinhas.",
          "Decida pelo contexto: a fechada soa compacta e é ágil em passagens rápidas; a aberta soa ampla, ideal para finais e para coros grandes.",
        ] },
        { type: "callout", tone: "dica", title: "Atalho para abrir um acorde fechado", text: "Em SATB, a posição aberta costuma nascer da fechada trocando o contralto e o tenor de lugar, com o tenor uma oitava abaixo. No pop, a mesma ideia se chama drop 2: a segunda voz de cima desce uma oitava." },
      ],
    },
    {
      title: "5. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Mudar de posição com todas as vozes saltando", "quebra das linhas", "mude a posição com uma voz só, ou numa nova frase"], ["Posição aberta com terça no grave", "acorde turvo", "abra em cima, mantenha 5ª/8ª embaixo"], ["Blocos paralelos no estilo tradicional", "paralelas e sétimas sem resolução", "use blocos só no estilo popular, conscientemente"], ["Fechada muito grave em TTBB", "embolado", "feche os tenores, abra o grave"]] },
        { type: "list", items: ["Fechada: vozes de cima dentro de uma 8ª; aberta: uma nota do acorde pulada entre vizinhas.", "Escolha pela sonoridade e pela condução.", "Blocos paralelos são estilo popular, não erro — no estilo certo."] },
        {
          type: "challenge",
          title: "Fechada e aberta no mesmo acorde",
          task: "Em Sol maior, com o soprano em B4 e o baixo em G2 nos dois compassos, escreva o acorde em posição fechada no 1º compasso e em posição aberta no 2º.",
          start: EXD.vozStart,
          constraints: ["Não altere soprano nem baixo.", "Só notas do acorde de Sol maior.", "Fundamental dobrada nos dois acordes."],
          criteria: ["1º compasso: contralto e tenor dentro da 8ª abaixo do soprano.", "2º compasso: uma nota do acorde pulada entre tenor–contralto e entre contralto–soprano.", "O motor não aponta problemas de espaçamento."],
          hints: ["Quais notas do acorde estão logo abaixo de B4?", "Para abrir, pule uma nota do acorde entre cada par de vozes vizinhas.", "No 2º compasso, o tenor fica abaixo de D4."],
          solution: {
            score: EXD.vozSol,
            commentary: "Fechada: G2 | D4, G4, B4 (as três vozes de cima dentro de uma 6ª). Aberta: G2 | G3, D4, B4 (entre G3 e D4 fica de fora o B; entre D4 e B4, o G). A troca de posição se faz com contralto e tenor trocando de nota, o tenor uma 8ª abaixo — o atalho da seção 4.",
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-voicings",
    title: "Verificação: distribuição dos acordes",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["vo-fechada"],
    staticItems: [
      {
        id: "vo-fechada",
        kind: "choice",
        skill: "escrita-satb",
        prompt: "O que caracteriza a posição fechada?",
        options: [
          { id: "a", label: "Soprano, contralto e tenor dentro de uma oitava" },
          { id: "b", label: "Todas as vozes em uníssono" },
          { id: "c", label: "Baixo e tenor a mais de duas oitavas" },
        ],
        correctOptionId: "a",
        explanation: "Não cabe nenhuma outra nota do acorde entre as três vozes superiores.",
      },
      {
        id: "vo-final",
        kind: "choice",
        skill: "arranjo",
        prompt: "Para o acorde final de um hino com coro grande, qual posição tende a soar mais ampla?",
        options: [
          { id: "a", label: "Aberta" },
          { id: "b", label: "Fechada" },
          { id: "c", label: "Tanto faz" },
        ],
        correctOptionId: "a",
        explanation: "Espalhar o acorde aproveita a ressonância de cada registro.",
      },
      {
        id: "vo-blocos",
        kind: "choice",
        skill: "arranjo",
        prompt: "Tétrades movendo-se em bloco paralelo são:",
        options: [
          { id: "a", label: "Característica do estilo popular/jazz vocal; incorretas no coral tradicional" },
          { id: "b", label: "Incorretas em qualquer estilo" },
          { id: "c", label: "Obrigatórias no coral tradicional" },
        ],
        correctOptionId: "a",
        explanation: "A mesma escrita recebe julgamentos diferentes conforme o estilo.",
      },
    ],
    generators: [{ type: "voice-leading-error", count: 3, ruleIds: ["vozes.espacamento", "vozes.cruzamento", "conducao.paralelas"] }, { type: "chord-identification", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a definição de posição fechada.",
  application: {
    title: "Prática no laboratório de escrita",
    steps: [
      "Abra o coral SATB de exemplo.",
      "Reescreva o último acorde em posição aberta (soprano mais agudo, contralto no meio).",
      "Ouça antes e depois e confira se o motor não aponta problemas de espaçamento.",
    ],
  },
};

export const lessonSilabas: Lesson = {
  id: "silabas-de-apoio",
  title: "Sílabas de apoio: 'uh', 'mm', 'dum' e companhia",
  summary: "O que as vozes de acompanhamento cantam quando não cantam a letra: sílabas para pad, para ritmo e para imitar instrumentos.",
  levelId: "s2",
  unitId: "s2-tex",
  status: "disponivel",
  prerequisites: ["texturas-vocais", "voz-cantada"],
  estimatedMinutes: 45,
  competencies: ["arranjo", "texto-e-prosodia"],
  objectives: [
    "Escolher sílabas de apoio adequadas à função (pad, ritmo, imitação).",
    "Escrever sílabas de forma consistente na partitura.",
    "Evitar sílabas que atrapalham a afinação ou encobrem a letra.",
  ],
  sections: [
    {
      title: "1. Três famílias de sílabas",
      blocks: [
        {
          type: "table",
          caption: "Sílabas e funções",
          headers: ["Família", "Exemplos", "Som", "Uso"],
          rows: [
            ["Pad (sustentação)", "uh, oh, ah, mm, nn", "Contínuo, macio", "Acordes longos sob a melodia"],
            ["Rítmica", "dum, dm, ba, da, doo, dit", "Ataque claro, curto", "Acompanhamento rítmico, imitação de violão/teclado"],
            ["Baixo vocal", "dm, bm, dum, vm", "Grave, com ataque e ressonância", "Linha de baixo no pop a cappella"],
          ],
        },
        {
          type: "paragraph",
          text: "Escolha pela função. Uma sílaba começada por consoante sonora ('d', 'b', 'v') dá ataque; terminada em 'm' ou 'n' prolonga a ressonância. Vogais abertas ('ah') projetam e se misturam com a melodia; vogais fechadas ('uh', 'oo') ficam atrás dela. Por isso o pad sob um solista costuma ser em 'uh' ou 'mm': ele não compete com a letra.",
        },
      ],
    },
    {
      title: "2. Na partitura",
      blocks: [
        {
          type: "list",
          items: [
            "Escreva a sílaba na primeira nota e use linha de continuação nas notas seguintes, em vez de repetir em cada nota.",
            "Seja consistente: a mesma função deve ter a mesma sílaba em todo o arranjo (ou mude de propósito, marcando uma nova seção).",
            "Indique fechamentos quando importam: 'oo → m' no fim de um acorde diz ao coro quando fechar a boca.",
            "Combine com o regente: algumas sílabas têm pronúncia diferente em cada região do país.",
          ],
        },
        { type: "example", score: EXA.melodiaPad, verdict: "correto", caption: "Pad em 'uh'", commentary: "As vozes de apoio cantam 'uh' do início ao fim, mudando de nota só quando a harmonia muda." },
        { type: "example", score: EXA.popLeadBacking, verdict: "correto", caption: "Sílabas rítmicas", commentary: "Contralto e tenor cantam 'dum' nos contratempos; o baixo, 'dm' nos tempos fortes. O resultado imita um violão e um baixo." },
        {
          type: "listening",
          title: "Ouça as funções",
          score: EXA.popLeadBacking,
          instructions: ["Ouça só o baixo: é a 'mão esquerda'.", "Acrescente contralto e tenor: o 'violão' nos contratempos.", "Ouça tudo com a melodia."],
          focus: [["B"], ["A", "T", "B"], ["S", "A", "T", "B"]],
        },
      ],
    },
    {
      title: "3. Armadilhas comuns",
      blocks: [
        {
          type: "list",
          items: [
            "Sílabas com 'i' no grave quase não soam; com 'u' no agudo extremo, desafinam.",
            "Muitas consoantes em andamento rápido viram ruído: simplifique.",
            "Pad em 'ah' forte encobre o solista: guarde 'ah' para os momentos em que o apoio é o protagonista.",
            "Trocar de sílaba a cada compasso confunde o coro e o ouvinte.",
          ],
        },
        { type: "example", score: EX.ttbbGrave, verdict: "observacao", caption: "Pad grave e embolado", commentary: "Terça maior no grave: num pad em 'uh', esse acorde soa abafado. Abra o intervalo entre as vozes graves." },
      ],
    },
    {
      title: "4. Demonstração: escolher a sílaba pela função",
      blocks: [
        { type: "paragraph", text: "Problema: num verso calmo, contralto, tenor e baixo fazem um pad sob a melodia dos sopranos; no refrão, passam a fazer um acompanhamento rítmico. Que sílabas escrever?" },
        { type: "list", ordered: true, items: [
          "Defina a função de cada trecho: verso = sustentação (pad); refrão = ritmo.",
          "Pad sob melodia com letra: vogal fechada, que fica atrás do texto — 'uh' ou 'mm'. 'mm' é o mais discreto; 'uh' projeta um pouco mais.",
          "Ritmo: consoante de ataque + vogal curta — 'dum' ou 'ba'. Em andamento rápido, prefira 'dm' (menos vogal, menos ruído).",
          "Baixo vocal no refrão: 'dm' ou 'bm' nas fundamentais, nos tempos fortes.",
          "Transição: no último compasso do verso, o pad pode fechar em 'mm' e o refrão começar com 'dum' — a mudança de sílaba marca a nova seção.",
        ] },
        { type: "callout", tone: "dica", title: "Decisões do arranjador", text: "Se o pad for o único acompanhamento (a cappella) e o grupo for pequeno, 'oh' aberto dá mais corpo do que 'uh'. Se a melodia estiver num naipe grave, o pad acima dela deve ser em 'mm' e piano, para não cobri-la." },
      ],
    },
    {
      title: "5. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Pad em vogal aberta e forte sob o texto", "o solista é encoberto", "'uh' ou 'mm', em p"], ["Sílabas diferentes para a mesma função", "confusão no coro e no ouvinte", "uma sílaba por função e seção"], ["Consoantes demais em andamento rápido", "ruído", "'dm' em vez de 'dum', ou menos notas"], ["Fechamento ('oo → m') não indicado", "cada cantor fecha num momento", "escreva quando fechar"]] },
        { type: "list", items: ["Três famílias: pad (uh, oh, mm), ritmo (dum, ba, doo), baixo vocal (dm, bm).", "Escolha pela função e pela relação com a letra da melodia.", "Consistência na partitura: a mesma função, a mesma sílaba; mudanças marcam seções."] },
        {
          type: "challenge",
          title: "Sílabas para um arranjo pop a cappella",
          task: "Escreva as sílabas de apoio para cada naipe numa canção com: Introdução (acordes sustentados, p) – Verso (melodia no soprano, acompanhamento rítmico leve) – Refrão (melodia no soprano, apoio cheio e rítmico, f) – Final (acorde longo que se fecha).",
          constraints: ["Contralto, tenor e baixo fazem o apoio; o soprano canta a letra.", "Indique onde cada sílaba se fecha (por exemplo, 'oo → m')."],
          criteria: ["Cada seção tem sílabas coerentes com sua função.", "A sílaba muda quando a função muda, e só então.", "O apoio no verso não encobre a letra."],
          hints: ["Na introdução não há letra: o apoio pode ser mais aberto ('oh') do que no verso.", "No verso, o ritmo é leve: 'doo' ou 'dm' curtos, em p.", "No final, um 'ah' aberto que fecha em 'mm' dá um decrescendo natural."],
          solution: {
            commentary: "Introdução: contralto e tenor em 'oh' (aberto, sem letra para competir), baixo em 'uh' nas fundamentais; fechar em 'm' na última nota antes do verso. Verso: contralto e tenor em 'doo' curto nos contratempos, p; baixo em 'dm' nos tempos 1 e 3. Refrão: contralto e tenor em 'dum' (mais ataque), baixo em 'bm' com notas mais longas; mf/f. Final: todos em 'ah' sustentado, fechando em 'mm' no último tempo para o decrescendo. A lógica: abertura da vogal acompanha a intensidade; a consoante de ataque acompanha o ritmo.",
            alternatives: ["Se o grupo for pequeno e a sala seca, o verso pode usar 'ba' em vez de 'doo', com mais projeção."],
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-silabas",
    title: "Verificação: sílabas de apoio",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["si-pad"],
    staticItems: [
      {
        id: "si-pad",
        kind: "choice",
        skill: "arranjo",
        prompt: "Qual sílaba é mais adequada para um pad suave sob um solista?",
        options: [
          { id: "a", label: "'uh' ou 'mm'" },
          { id: "b", label: "'dit'" },
          { id: "c", label: "'AH' forte" },
        ],
        correctOptionId: "a",
        explanation: "Sílabas fechadas e contínuas ficam atrás da melodia sem competir com a letra.",
      },
      {
        id: "si-ritmo",
        kind: "choice",
        skill: "arranjo",
        prompt: "Para imitar o ataque de um violão nos contratempos, qual sílaba usar?",
        options: [
          { id: "a", label: "'dum' ou 'doo'" },
          { id: "b", label: "'mm'" },
          { id: "c", label: "'uh'" },
        ],
        correctOptionId: "a",
        explanation: "A consoante inicial dá o ataque; a vogal curta dá a altura.",
      },
      {
        id: "si-consistencia",
        kind: "choice",
        skill: "arranjo",
        prompt: "Como escrever as sílabas na partitura?",
        options: [
          { id: "a", label: "Na primeira nota, com linha de continuação; mesma sílaba para a mesma função" },
          { id: "b", label: "Uma sílaba diferente em cada nota, para variar" },
          { id: "c", label: "Não escrever: o coro improvisa" },
        ],
        correctOptionId: "a",
        explanation: "Consistência facilita a leitura e o ensaio.",
      },
      {
        id: "si-grave",
        kind: "choice",
        skill: "leitura-vocal",
        prompt: "Qual sílaba tende a soar MENOS no registro grave dos baixos?",
        options: [
          { id: "a", label: "'i'" },
          { id: "b", label: "'u'" },
          { id: "c", label: "'ô'" },
        ],
        correctOptionId: "a",
        explanation: "Vogais fechadas e claras como 'i' perdem corpo no grave; vogais escuras ressoam melhor.",
      },
      {
        id: "si-fechamento",
        kind: "choice",
        skill: "arranjo",
        prompt: "O que indica 'oo → m' sobre um acorde longo?",
        options: [
          { id: "a", label: "Cantar em 'oo' e fechar a boca em 'm' no ponto indicado" },
          { id: "b", label: "Cantar uma oitava abaixo" },
          { id: "c", label: "Respirar" },
        ],
        correctOptionId: "a",
        explanation: "Indicar o fechamento evita que cada cantor feche num momento diferente.",
      },
    ],
    generators: [{ type: "range-check", count: 3 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a escolha da sílaba de pad.",
  application: {
    title: "Prática no laboratório de escrita",
    steps: [
      "Abra o exemplo 'Pop a cappella: lead, backing em dum e baixo vocal'.",
      "Troque o 'dum' do contralto e do tenor por 'uh' em notas longas.",
      "Ouça as duas versões: qual combina com um verso calmo? E com um refrão animado?",
    ],
  },
};
