import { CHORALE_SATB_C } from "@/domain/music/examples";
import { EX } from "../examples";
import { EXA } from "../examples-arranjo";
import type { Lesson } from "../types";

/*
 * Aulas que completam a grade com conteúdos recorrentes nos programas de
 * graduação pesquisados (escrita a duas vozes, baixo e canto dado, escrita em
 * bloco, contracanto ativo e passivo, harmonia cromática e moderna, análise de
 * repertório). A posição na grade e os pré-requisitos ficam em curriculum.ts.
 */

export const lessonDuasVozes: Lesson = {
  id: "duas-vozes",
  title: "Escrita a duas vozes: dueto, terças e sextas, independência",
  summary: "O primeiro passo da escrita vocal: como acompanhar uma melodia com uma segunda voz que soa bem, é cantável e não 'cola' na primeira.",
  levelId: "s2",
  unitId: "s2-hmz",
  status: "disponivel",
  prerequisites: [],
  estimatedMinutes: 55,
  competencies: ["contraponto", "conducao-de-vozes", "arranjo"],
  objectives: [
    "Escrever uma segunda voz em terças e sextas sob (ou sobre) uma melodia.",
    "Usar os três tipos de movimento (paralelo, contrário e oblíquo) com intenção.",
    "Evitar quintas e oitavas paralelas e uníssonos que apagam uma das vozes.",
    "Decidir quando a segunda voz deve cantar a letra e quando deve fazer apoio.",
  ],
  sections: [
    {
      title: "1. Por que começar com duas vozes",
      blocks: [
        {
          type: "paragraph",
          text: "Programas de arranjo vocal costumam começar pela escrita a duas vozes antes de chegar a três e quatro: é o menor arranjo possível e já exige todas as decisões importantes — que intervalo usar, quando seguir a melodia e quando se afastar dela, como terminar. É também uma formação real: duplas sertanejas, duos de MPB, o 'segunda voz' do louvor e a abertura de muitos arranjos corais.",
        },
        {
          type: "table",
          caption: "Os intervalos entre as duas vozes",
          headers: ["Intervalo", "Efeito", "Uso"],
          rows: [
            ["Terças e sextas", "Doces, cheias, fundem as vozes", "A base do dueto; podem andar em paralelo"],
            ["Quintas e oitavas", "Ocas, 'abertas'", "Em notas isoladas (inícios, finais); nunca em sequência"],
            ["Uníssono", "Força, as vozes viram uma", "Para destacar uma palavra ou fechar a frase"],
            ["Segundas, quartas, sétimas", "Tensão", "Como notas de passagem ou retardos, resolvendo por grau"],
          ],
        },
      ],
    },
    {
      title: "2. Terças e sextas: o dueto clássico",
      blocks: [
        {
          type: "paragraph",
          text: "A segunda voz mais simples acompanha a melodia uma terça abaixo. Quando a terça abaixo não pertence ao acorde, ou quando a melodia sobe demais, troque para a sexta abaixo (que é a mesma nota uma oitava acima, invertida). Alternar terças e sextas mantém a segunda voz numa região confortável e evita que ela cruze a melodia.",
        },
        {
          type: "example",
          score: EXA.duetoTercas,
          verdict: "correto",
          caption: "Dueto em terças e sextas",
          commentary: "O contralto canta a mesma letra alternando terças e sextas abaixo da melodia (terças no compasso 1; sexta e terça nos compassos 2 e 3), sem nunca ultrapassá-la. O final numa sexta (Mi4 sob Dó5) é mais doce do que um uníssono.",
        },
        { type: "listening", title: "Cante a segunda voz", score: EXA.duetoTercas, instructions: ["Cante o contralto enquanto ouve o soprano.", "Ouça as duas vozes juntas: elas se fundem?"], focus: [["A"], ["S", "A"]] },
      ],
    },
    {
      title: "3. Independência: movimento contrário e oblíquo",
      blocks: [
        {
          type: "paragraph",
          text: "Terças paralelas o tempo todo podem soar como 'uma voz engrossada'. Para dar identidade à segunda voz, use movimento contrário nas cadências e movimento oblíquo (uma voz parada, a outra andando) quando a melodia tem notas rápidas. A regra de ouro do contraponto vale aqui: quintas e oitavas justas nunca em sequência.",
        },
        { type: "example", score: EX.duasVozes, verdict: "correto", caption: "Movimento contrário entre as vozes extremas", commentary: "Quando o soprano sobe, o baixo desce: cada voz tem desenho próprio e as duas juntas definem a harmonia." },
        { type: "example", score: EX.duasVozesParalelas, verdict: "incorreto", caption: "Quintas paralelas", commentary: "Duas vozes em quintas justas consecutivas soam como uma só linha 'oca' — o motor acusa o erro." },
      ],
    },
  ],
  exercises: {
    id: "ex-duas-vozes",
    title: "Verificação: duas vozes",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["dv-paralelas"],
    staticItems: [
      {
        id: "dv-paralelas",
        kind: "choice",
        skill: "contraponto",
        prompt: "Quais intervalos podem andar em paralelo entre duas vozes sem problema no estilo tradicional?",
        options: [
          { id: "a", label: "Terças e sextas" },
          { id: "b", label: "Quintas e oitavas justas" },
          { id: "c", label: "Qualquer intervalo" },
        ],
        correctOptionId: "a",
        explanation: "Consonâncias imperfeitas em paralelo fundem as vozes sem anular a independência; quintas e oitavas paralelas fazem duas vozes soarem como uma.",
      },
      {
        id: "dv-sexta",
        kind: "choice",
        skill: "arranjo",
        prompt: "A terça abaixo da melodia não pertence ao acorde. Qual é a troca mais comum?",
        options: [
          { id: "a", label: "Usar a sexta abaixo" },
          { id: "b", label: "Usar a segunda abaixo" },
          { id: "c", label: "Cantar em uníssono o tempo todo" },
        ],
        correctOptionId: "a",
        explanation: "A sexta abaixo costuma ser nota do acorde e mantém a doçura do dueto.",
      },
      {
        id: "dv-obliquo",
        kind: "choice",
        skill: "contraponto",
        prompt: "O que é movimento oblíquo?",
        options: [
          { id: "a", label: "Uma voz parada enquanto a outra se move" },
          { id: "b", label: "As duas vozes na mesma direção" },
          { id: "c", label: "As duas vozes em direções opostas" },
        ],
        correctOptionId: "a",
        explanation: "É útil quando a melodia tem notas rápidas: a segunda voz sustenta e dá apoio.",
      },
      {
        id: "dv-cruzamento",
        kind: "choice",
        skill: "conducao-de-vozes",
        prompt: "A segunda voz (abaixo) sobe acima da melodia por um tempo. O que acontece?",
        options: [
          { id: "a", label: "O ouvinte perde a melodia: ela deixa de ser a voz mais aguda" },
          { id: "b", label: "Nada muda" },
          { id: "c", label: "A harmonia fica mais clara" },
        ],
        correctOptionId: "a",
        explanation: "O ouvido acompanha a voz mais aguda; cruzar a melodia confunde o ouvinte.",
      },
    ],
    generators: [{ type: "motion-type", count: 3 }, { type: "interval-identification", count: 2, maxNumber: 8 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo os intervalos que podem andar em paralelo.",
  application: {
    title: "Prática no laboratório de escrita",
    steps: [
      "Abra o exercício 'canto dado' no laboratório (Abrir exemplo).",
      "Escreva no contralto uma segunda voz em terças e sextas, com a mesma letra.",
      "Revise com o motor e cante a sua voz enquanto ouve a melodia.",
    ],
  },
};

export const lessonBaixoCantoDado: Lesson = {
  id: "baixo-e-canto-dado",
  title: "Baixo dado e canto dado: o treino clássico de harmonia",
  summary: "Os dois exercícios que formam o ouvido harmônico nas escolas de música: completar as vozes a partir do baixo ou da melodia.",
  levelId: "s2",
  unitId: "s2-hmz",
  status: "disponivel",
  prerequisites: [],
  estimatedMinutes: 60,
  competencies: ["conducao-de-vozes", "harmonia-funcional", "escrita-satb"],
  objectives: [
    "Realizar um baixo dado: deduzir os acordes e escrever soprano, contralto e tenor.",
    "Harmonizar um canto dado: escolher acordes e escrever contralto, tenor e baixo.",
    "Verificar a própria realização: acordes completos, dobras, sensível, paralelas.",
  ],
  sections: [
    {
      title: "1. O que são",
      blocks: [
        {
          type: "paragraph",
          text: "Nos cursos de harmonia, os dois exercícios mais tradicionais são o baixo dado (o professor escreve a linha do baixo, às vezes com cifras numéricas, e o aluno completa as outras vozes) e o canto dado (o professor dá a melodia e o aluno harmoniza). Eles treinam exatamente o que o arranjador faz o tempo todo: a partir de uma linha, decidir acordes e distribuí-los com boa condução.",
        },
        {
          type: "table",
          caption: "Comparação",
          headers: ["Exercício", "O que é dado", "O que se decide", "Principal desafio"],
          rows: [
            ["Baixo dado", "A linha do baixo", "Os acordes (pelo baixo e pela função) e as três vozes de cima", "Escrever um soprano com bom contorno"],
            ["Canto dado", "A melodia", "Os acordes (vários servem para cada nota) e o baixo", "Fazer o baixo em contraponto com a melodia"],
          ],
        },
      ],
    },
    {
      title: "2. Método para o baixo dado",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Identifique o acorde de cada nota do baixo (estado fundamental, salvo cifra indicando inversão).",
            "Marque as cadências e a sensível de cada dominante.",
            "Escreva o soprano: uma linha cantável, de preferência em movimento contrário ao baixo.",
            "Complete contralto e tenor com as notas que faltam, mantendo notas comuns e andando por grau.",
            "Confira: cada acorde tem fundamental, terça (e quinta, se possível)? A sensível não está dobrada e resolve? Há quintas ou oitavas paralelas?",
          ],
        },
        { type: "example", score: CHORALE_SATB_C, verdict: "correto", caption: "Realização completa", commentary: "Leia só o baixo e deduza os acordes; depois confira como soprano, contralto e tenor completam cada acorde com o menor movimento." },
        { type: "example", score: EX.paralelas, verdict: "incorreto", caption: "Realização em bloco", commentary: "Mover as três vozes de cima na mesma direção do baixo produz quintas e oitavas paralelas — o erro mais comum do baixo dado." },
      ],
    },
    {
      title: "3. Método para o canto dado",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Para cada nota da melodia, liste os acordes que a contêm (Dó está em I, IV e vi).",
            "Escolha pela função: as cadências primeiro, depois o caminho T → S → D → T.",
            "Escreva o baixo em contraponto com a melodia, evitando oitavas e quintas paralelas entre os dois.",
            "Complete contralto e tenor, conferindo dobras e a sensível.",
          ],
        },
        {
          type: "listening",
          title: "Ouça o baixo e o soprano",
          score: CHORALE_SATB_C,
          instructions: ["Ouça só o baixo: dá para adivinhar os acordes?", "Ouça só o soprano: que acordes você escolheria?", "Ouça tudo e compare."],
          focus: [["B"], ["S"], ["S", "A", "T", "B"]],
        },
      ],
    },
  ],
  exercises: {
    id: "ex-baixo-canto-dado",
    title: "Verificação: baixo dado e canto dado",
    instructions: "Escolha a realização sem erros. Cada alternativa errada mostra o diagnóstico do motor. Domínio: 75% e o item essencial.",
    minScore: 0.75,
    requiredItemIds: ["bcd-conferir"],
    staticItems: [
      {
        id: "bcd-conferir",
        kind: "choice",
        skill: "conducao-de-vozes",
        prompt: "Ao revisar um baixo dado, qual destes NÃO é um item de conferência?",
        options: [
          { id: "a", label: "Se o soprano canta a letra" },
          { id: "b", label: "Se a sensível do V está dobrada" },
          { id: "c", label: "Se há quintas ou oitavas paralelas" },
        ],
        correctOptionId: "a",
        explanation: "O exercício avalia harmonia e condução: acordes completos, dobras, sensível e paralelas.",
      },
      {
        id: "bcd-acordes",
        kind: "choice",
        skill: "harmonia-funcional",
        prompt: "No canto dado em Dó maior, a melodia tem Dó. Quais acordes contêm essa nota?",
        options: [
          { id: "a", label: "I, IV e vi" },
          { id: "b", label: "V e vii°" },
          { id: "c", label: "Só o I" },
        ],
        correctOptionId: "a",
        explanation: "Dó é fundamental de I, quinta de IV e terça de vi.",
      },
      {
        id: "bcd-primeiro",
        kind: "choice",
        skill: "harmonia-funcional",
        prompt: "No canto dado, o que se harmoniza primeiro?",
        options: [
          { id: "a", label: "As cadências (finais de frase)" },
          { id: "b", label: "A primeira nota" },
          { id: "c", label: "As notas mais agudas" },
        ],
        correctOptionId: "a",
        explanation: "As cadências estruturam a frase; o resto se encaixa a partir delas.",
      },
      {
        id: "bcd-baixo",
        kind: "choice",
        skill: "conducao-de-vozes",
        prompt: "No canto dado, como escrever o baixo em relação à melodia?",
        options: [
          { id: "a", label: "Em contraponto: de preferência movimento contrário, sem quintas ou oitavas paralelas" },
          { id: "b", label: "Sempre na mesma direção da melodia" },
          { id: "c", label: "Repetindo a melodia uma oitava abaixo" },
        ],
        correctOptionId: "a",
        explanation: "Melodia e baixo formam o esqueleto: precisam ser independentes.",
      },
    ],
    generators: [
      { type: "realization", count: 2, mode: "baixo-dado" },
      { type: "realization", count: 2, mode: "canto-dado" },
    ],
  },
  masteryDescription: "≥ 75% de acertos, incluindo o item de conferência.",
  application: {
    title: "Prática no laboratório de escrita",
    steps: [
      "Abra o exercício 'baixo dado' no laboratório (Abrir exemplo) e escreva soprano, contralto e tenor.",
      "Abra o exercício 'canto dado' e escreva contralto, tenor e baixo.",
      "Revise os dois com o motor no estilo coral tradicional até não haver erros nem alertas.",
    ],
  },
};

export const lessonEscritaBloco: Lesson = {
  id: "escrita-em-bloco",
  title: "Escrita em bloco: técnicas da música popular",
  summary: "Bloco fechado, drop 2, estruturas em quartas e em segundas, tríades de estrutura superior, aproximação e técnica linear — o 'soli' vocal do jazz, do gospel e da MPB.",
  levelId: "s2",
  unitId: "s2-tex",
  status: "disponivel",
  prerequisites: [],
  estimatedMinutes: 70,
  competencies: ["arranjo", "acordes", "escrita-satb"],
  objectives: [
    "Harmonizar uma melodia em bloco fechado (as vozes logo abaixo da melodia).",
    "Abrir o bloco com a técnica drop 2 para vozes.",
    "Reconhecer estruturas em quartas, em segundas e tríades de estrutura superior.",
    "Harmonizar notas de passagem da melodia com acordes de aproximação.",
  ],
  sections: [
    {
      title: "1. Bloco: a melodia arrasta o acorde",
      blocks: [
        {
          type: "paragraph",
          text: "Na escrita em bloco (ou 'soli'), as vozes de acompanhamento cantam o mesmo ritmo e a mesma letra da melodia, cada uma numa nota do acorde logo abaixo dela. O resultado é um único 'corpo sonoro' que se move junto — a sonoridade de grupos vocais de jazz, de muitos corais gospel e de arranjos de MPB. Diferente da homofonia tradicional, aqui o paralelismo é desejado: o bloco sobe e desce com a melodia.",
        },
        {
          type: "table",
          caption: "Técnicas de bloco",
          headers: ["Técnica", "Como se faz", "Som"],
          rows: [
            ["Bloco fechado (mecânico)", "Melodia no topo; as outras vozes nas notas do acorde imediatamente abaixo, dentro de uma oitava", "Compacto, brilhante"],
            ["Drop 2", "A partir do bloco fechado, a segunda voz de cima desce uma oitava", "Mais aberto, menos 'embolado' no grave"],
            ["Aproximação", "Nota da melodia fora do acorde recebe um acorde de passagem (diminuto ou dominante)", "Movimento cromático suave"],
            ["Estruturas em quartas", "Acordes empilhados em quartas sob a melodia", "Moderno, aberto, sem centro forte"],
            ["Estruturas em segundas", "Duas vozes a um tom ou semitom de distância (cluster)", "Atrito, brilho; exige afinação segura"],
            ["Tríade de estrutura superior", "Uma tríade nas vozes de cima sobre outro acorde no baixo (ex.: Ré maior sobre Dó)", "Tensões ricas soando como tríade simples"],
            ["Técnica linear", "Cada voz pensada como melodia própria, mesmo no ritmo da melodia", "Bloco com vozes internas cantáveis"],
          ],
        },
      ],
    },
    {
      title: "2. Bloco sobre o baixo",
      blocks: [
        {
          type: "paragraph",
          text: "Em coro misto, o bloco costuma ficar nas três vozes de cima (soprano, contralto e tenor), com o baixo livre para fazer as fundamentais ou um pedal. Assim as vozes de cima podem usar inversões e cores sem perder a clareza da harmonia.",
        },
        { type: "example", score: EXA.gospelBloco, verdict: "correto", caption: "Bloco de três vozes sobre baixo pedal", commentary: "Soprano, contralto e tenor movem-se juntos (I – IV/I – I) enquanto o baixo sustenta Dó." },
        {
          type: "example",
          score: EXA.gospelBlocoParalelo,
          verdict: "observacao",
          caption: "Bloco paralelo",
          commentary: "Todas as vozes em tríades paralelas: no estilo popular o motor registra apenas sugestões. É o efeito de 'naipe' que o bloco procura.",
        },
        { type: "example", score: EXA.dropTradicional, verdict: "incorreto", caption: "O mesmo recurso no estilo errado", commentary: "Tétrades em bloco avaliadas como coral tradicional: paralelas e sétimas sem resolução são erros nesse estilo." },
      ],
    },
    {
      title: "3. Quartas, segundas e estruturas superiores",
      blocks: [
        {
          type: "paragraph",
          text: "Empilhar quartas (Mi – Lá – Ré sobre Dó) produz um acorde ambíguo, aberto e moderno, muito usado em introduções e finais de arranjos de jazz e MPB. As segundas (clusters) dão brilho e atrito; escreva-as para vozes seguras, chegando a elas por grau. A tríade de estrutura superior é um truque de afinação: o coro canta uma tríade simples, mas, sobre o baixo, ela vira um acorde com nona, décima primeira aumentada e décima terceira.",
        },
        { type: "example", score: EXA.quartas, verdict: "correto", caption: "Estrutura em quartas sobre Dó", commentary: "Mi4 – Lá4 – Ré5 (quartas empilhadas) sobre o baixo Dó3: terça, sexta e nona de Dó — o acorde soa como C6/9, aberto e sem a quinta. No estilo popular, o motor não aponta problemas." },
        { type: "listening", title: "Ouça a estrutura quartal", score: EXA.quartas, instructions: ["Ouça só as três vozes de cima: quartas empilhadas.", "Acrescente o baixo."], focus: [["S", "A", "T"], ["S", "A", "T", "B"]] },
      ],
    },
  ],
  exercises: {
    id: "ex-escrita-bloco",
    title: "Verificação: escrita em bloco",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["eb-fechado"],
    staticItems: [
      {
        id: "eb-fechado",
        kind: "choice",
        skill: "arranjo",
        prompt: "Na técnica de bloco fechado, onde ficam as vozes de acompanhamento?",
        options: [
          { id: "a", label: "Nas notas do acorde imediatamente abaixo da melodia, dentro de uma oitava" },
          { id: "b", label: "Uma oitava abaixo da melodia, em uníssono" },
          { id: "c", label: "Acima da melodia" },
        ],
        correctOptionId: "a",
        explanation: "O bloco fechado é compacto: cabe numa oitava sob a melodia.",
      },
      {
        id: "eb-drop2",
        kind: "choice",
        skill: "arranjo",
        prompt: "O que é o 'drop 2'?",
        options: [
          { id: "a", label: "Descer uma oitava a segunda voz de cima do bloco fechado" },
          { id: "b", label: "Retirar duas vozes" },
          { id: "c", label: "Transpor o bloco dois tons abaixo" },
        ],
        correctOptionId: "a",
        explanation: "Abre o bloco e distribui melhor as vozes no registro.",
      },
      {
        id: "eb-aproximacao",
        kind: "choice",
        skill: "harmonia-funcional",
        prompt: "A melodia tem uma nota de passagem fora do acorde. O que a técnica de aproximação faz?",
        options: [
          { id: "a", label: "Harmoniza essa nota com um acorde de passagem (diminuto ou dominante)" },
          { id: "b", label: "Coloca todas as outras vozes em pausa" },
          { id: "c", label: "Repete o acorde anterior em todas as vozes" },
        ],
        correctOptionId: "a",
        explanation: "Cada nota da melodia recebe um acorde, e o bloco anda cromaticamente.",
      },
      {
        id: "eb-estilo",
        kind: "choice",
        skill: "arranjo",
        prompt: "Um bloco de tríades paralelas é avaliado como erro pelo motor. O que verificar primeiro?",
        options: [
          { id: "a", label: "Se o estilo do arranjo está configurado como coral tradicional" },
          { id: "b", label: "Se a letra está correta" },
          { id: "c", label: "O andamento" },
        ],
        correctOptionId: "a",
        explanation: "Paralelas são convenção: erro no tradicional, recurso no popular.",
      },
      {
        id: "eb-superior",
        kind: "choice",
        skill: "acordes",
        prompt: "Ré maior cantado pelas vozes de cima sobre Dó no baixo resulta em:",
        options: [
          { id: "a", label: "Dó com nona, décima primeira aumentada e décima terceira (tríade de estrutura superior)" },
          { id: "b", label: "Ré maior em segunda inversão" },
          { id: "c", label: "Um erro de afinação" },
        ],
        correctOptionId: "a",
        explanation: "Ré, Fá♯ e Lá são a 9ª, a 11ª aumentada e a 13ª de Dó.",
      },
    ],
    generators: [{ type: "chord-identification", count: 2 }, { type: "seventh-identification", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a definição de bloco fechado.",
  application: {
    title: "Prática no laboratório de escrita",
    steps: [
      "Abra o exemplo 'Gospel: três vozes em bloco sobre o baixo' e mude o estilo para 'Popular a cappella'.",
      "Harmonize em bloco fechado mais dois compassos de melodia, com o baixo nas fundamentais.",
      "Transforme um acorde em drop 2 e compare o som.",
    ],
  },
};

export const lessonContracantoAtivoPassivo: Lesson = {
  id: "contracanto-ativo-passivo",
  title: "Contracanto ativo e passivo, vocal band, ostinatos e arpejos",
  summary: "As técnicas polifônicas do arranjo vocal: a linha de apoio que só sustenta (passiva), a que dialoga com a melodia (ativa) e as vozes que imitam a banda.",
  levelId: "s2",
  unitId: "s2-tex",
  status: "disponivel",
  prerequisites: [],
  estimatedMinutes: 60,
  competencies: ["contraponto", "arranjo"],
  objectives: [
    "Distinguir contracanto passivo (background) de contracanto ativo.",
    "Escrever um contracanto ativo com ritmo complementar e registro próprio.",
    "Usar ostinatos, arpejos e 'vocal band' como acompanhamento vocal.",
  ],
  sections: [
    {
      title: "1. Passivo e ativo",
      blocks: [
        {
          type: "table",
          caption: "Dois tipos de contracanto",
          headers: ["", "Contracanto passivo (background)", "Contracanto ativo"],
          rows: [
            ["Ritmo", "Notas longas, poucas mudanças", "Movimento próprio, complementar à melodia"],
            ["Texto", "Sílabas neutras ('uh', 'mm') ou palavras-chave", "Pode ter letra própria ou ecos do texto"],
            ["Quando se move", "Quando a harmonia muda", "Quando a melodia para"],
            ["Efeito", "Sustenta, dá cor, deixa a melodia em destaque", "Diálogo, riqueza, interesse"],
          ],
        },
        { type: "example", score: EXA.melodiaPad, verdict: "correto", caption: "Contracanto passivo", commentary: "As três vozes de apoio sustentam os acordes em 'uh' e só mudam de nota com a harmonia." },
        {
          type: "example",
          score: EXA.contracantoAtivo,
          verdict: "correto",
          caption: "Contracanto ativo no tenor",
          commentary: "Quando a melodia sustenta (compassos 2 e 4), o tenor caminha em semínimas pelas notas do acorde; quando a melodia anda, ele sustenta. As duas linhas se alternam no primeiro plano.",
        },
        { type: "listening", title: "Ouça o diálogo", score: EXA.contracantoAtivo, instructions: ["Ouça só soprano e tenor.", "Perceba que um se move enquanto o outro sustenta."], focus: [["S", "T"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "2. Técnicas especiais",
      blocks: [
        {
          type: "list",
          items: [
            "Ostinato: uma figura curta repetida (ex.: 'du-du-dá' em Sol – Lá – Si) que sustenta uma seção inteira.",
            "Arpejo: as vozes de apoio cantam as notas do acorde em sequência, imitando um violão dedilhado.",
            "Base rítmica: sílabas curtas nos contratempos, como uma batida de violão ou teclado.",
            "Vocal band: o grupo inteiro imita a banda — baixo, guitarra, metais e bateria —, cada voz com um papel instrumental.",
          ],
        },
        { type: "example", score: EXA.popLeadBacking, verdict: "correto", caption: "Base rítmica e baixo vocal", commentary: "Contralto e tenor fazem a 'batida' em 'dum' nos contratempos; o baixo, as fundamentais nos tempos fortes." },
        { type: "example", score: EX.duasVozesParalelas, verdict: "incorreto", caption: "Contracanto que não é contracanto", commentary: "Uma segunda linha em quintas paralelas com a primeira não dialoga: soa como a mesma linha engrossada." },
      ],
    },
  ],
  exercises: {
    id: "ex-contracanto",
    title: "Verificação: contracanto",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["cc-ativo"],
    staticItems: [
      {
        id: "cc-ativo",
        kind: "choice",
        skill: "contraponto",
        prompt: "O que caracteriza um contracanto ATIVO?",
        options: [
          { id: "a", label: "Movimento próprio, que acontece principalmente quando a melodia para" },
          { id: "b", label: "Notas longas que só mudam com a harmonia" },
          { id: "c", label: "A melodia dobrada em oitavas" },
        ],
        correctOptionId: "a",
        explanation: "O contracanto ativo dialoga com a melodia, preenchendo os espaços dela.",
      },
      {
        id: "cc-passivo",
        kind: "choice",
        skill: "arranjo",
        prompt: "Um pad em 'uh' sob o solista é um exemplo de:",
        options: [
          { id: "a", label: "Contracanto passivo (background)" },
          { id: "b", label: "Contracanto ativo" },
          { id: "c", label: "Uníssono" },
        ],
        correctOptionId: "a",
        explanation: "Sustenta e colore, sem disputar a atenção.",
      },
      {
        id: "cc-ostinato",
        kind: "choice",
        skill: "arranjo",
        prompt: "O que é um ostinato?",
        options: [
          { id: "a", label: "Uma figura curta repetida que sustenta uma seção" },
          { id: "b", label: "Uma nota longa no final" },
          { id: "c", label: "Uma mudança de tonalidade" },
        ],
        correctOptionId: "a",
        explanation: "Repetição cria um chão rítmico e harmônico para a melodia.",
      },
      {
        id: "cc-vocalband",
        kind: "choice",
        skill: "arranjo",
        prompt: "Num arranjo 'vocal band', o que as vozes fazem?",
        options: [
          { id: "a", label: "Cada voz imita um instrumento da banda (baixo, guitarra, metais, bateria)" },
          { id: "b", label: "Todas cantam a melodia" },
          { id: "c", label: "Só o solista canta" },
        ],
        correctOptionId: "a",
        explanation: "É a técnica mais comum do pop a cappella.",
      },
      {
        id: "cc-registro",
        kind: "choice",
        skill: "contraponto",
        prompt: "Para que o contracanto não encubra a melodia, ele deve ficar:",
        options: [
          { id: "a", label: "Em registro diferente e com ritmo complementar" },
          { id: "b", label: "No mesmo registro e no mesmo ritmo" },
          { id: "c", label: "Sempre mais forte" },
        ],
        correctOptionId: "a",
        explanation: "Separação de registro e ritmo mantém as duas linhas audíveis.",
      },
    ],
    generators: [{ type: "motion-type", count: 3 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a definição de contracanto ativo.",
  application: {
    title: "Prática no laboratório de escrita",
    steps: [
      "Abra o exemplo 'Contracanto ativo no tenor'.",
      "Escreva um contracanto ativo também no contralto do compasso 2, sem cruzar a melodia.",
      "Revise com o motor e ouça soprano + contralto + tenor.",
    ],
  },
};

export const lessonHarmoniaCromatica: Lesson = {
  id: "harmonia-cromatica-moderna",
  title: "Harmonia cromática e moderna para vozes",
  summary: "Empréstimo modal, napolitana, sexta aumentada, mediantes cromáticas, paralelismo, quartas e clusters: a cor harmônica além das funções básicas.",
  levelId: "s3",
  unitId: "s3-har",
  status: "disponivel",
  prerequisites: [],
  estimatedMinutes: 70,
  competencies: ["harmonia-funcional", "acordes", "arranjo"],
  objectives: [
    "Usar acordes de empréstimo modal (iv, ♭VI, ♭VII) em tonalidade maior.",
    "Reconhecer a sexta napolitana e os acordes de sexta aumentada e sua resolução.",
    "Aplicar paralelismo, acordes por quartas e segundas acrescentadas com intenção.",
    "Escrever o cromatismo de modo que o coro consiga afinar.",
  ],
  sections: [
    {
      title: "1. Empréstimo modal",
      blocks: [
        {
          type: "paragraph",
          text: "Uma canção em maior pode 'pegar emprestados' acordes do modo menor homônimo. Os mais comuns são o iv (Fá menor em Dó maior), o ♭VI (Lá♭ maior) e o ♭VII (Si♭ maior). O iv antes do I é a cadência plagal 'melancólica', frequente em hinos, baladas e MPB. Para vozes, o segredo é que a nota emprestada (Lá♭) apareça por semitom a partir da nota vizinha do acorde anterior.",
        },
        { type: "example", score: EXA.emprestimo, verdict: "correto", caption: "I – iv – I", commentary: "O contralto vai de Sol a Lá♭ e volta: um semitom fácil de cantar que muda toda a cor do acorde." },
        { type: "listening", title: "Ouça a cor emprestada", score: EXA.emprestimo, instructions: ["Ouça só o contralto: Sol – Lá♭ – Sol.", "Ouça tudo: o iv soa 'melancólico'."], focus: [["A"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "2. Acordes alterados",
      blocks: [
        {
          type: "table",
          caption: "Acordes cromáticos clássicos (em Dó)",
          headers: ["Acorde", "Notas", "Função e resolução"],
          rows: [
            ["Napolitana (♭II⁶)", "Fá – Lá♭ – Ré♭", "Subdominante; vai para o V (ou I⁶₄ – V), com o Ré♭ descendo"],
            ["Sexta aumentada italiana", "Lá♭ – Dó – Fá♯", "Lá♭ e Fá♯ abrem por semitom para Sol (oitava)"],
            ["Sexta aumentada alemã", "Lá♭ – Dó – Mi♭ – Fá♯", "Idem; cuidado com quintas paralelas ao ir para o V"],
            ["Mediante cromática", "Mi maior ou Lá♭ maior em Dó", "Mudança de cor por terça, com uma nota comum"],
          ],
        },
        {
          type: "callout",
          tone: "dica",
          title: "Cromatismo afinável",
          text: "O coro afina cromatismo quando cada voz se move por semitom ou mantém uma nota comum. Evite saltos para notas alteradas e intervalos aumentados na mesma voz.",
        },
        { type: "example", score: EX.segundaAumentada, verdict: "incorreto", caption: "Intervalo aumentado na mesma voz", commentary: "Fá – Sol♯ é uma segunda aumentada: difícil de afinar e evitada na escrita vocal tradicional." },
      ],
    },
    {
      title: "3. Harmonia do século XX",
      blocks: [
        {
          type: "list",
          items: [
            "Paralelismo (planing): o mesmo acorde deslizando em paralelo; 'real' mantém as qualidades exatas, 'tonal' segue as notas da escala.",
            "Modos: harmonia derivada do dórico, mixolídio ou lídio, sem a cadência V – I tradicional.",
            "Acordes por quartas e quintas: sonoridade aberta, sem centro forte.",
            "Segundas acrescentadas e clusters: brilho e atrito; afinação exige vozes seguras.",
          ],
        },
        { type: "example", score: EXA.quartas, verdict: "correto", caption: "Acorde por quartas (estilo popular)", commentary: "Mi – Lá – Ré sobre Dó: a estrutura quartal soa moderna e aberta." },
        { type: "example", score: EXA.gospelBlocoParalelo, verdict: "observacao", caption: "Paralelismo tonal", commentary: "Tríades deslizando pela escala: no estilo popular, só sugestões. No tradicional, seriam erros." },
      ],
    },
  ],
  exercises: {
    id: "ex-harmonia-cromatica",
    title: "Verificação: harmonia cromática e moderna",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["hc-emprestimo"],
    staticItems: [
      {
        id: "hc-emprestimo",
        kind: "choice",
        skill: "harmonia-funcional",
        prompt: "Em Dó maior, qual acorde é de empréstimo modal?",
        options: [
          { id: "a", label: "Fá menor (iv)" },
          { id: "b", label: "Fá maior (IV)" },
          { id: "c", label: "Sol maior (V)" },
        ],
        correctOptionId: "a",
        explanation: "Fá menor vem de Dó menor, o modo homônimo.",
      },
      {
        id: "hc-napolitana",
        kind: "choice",
        skill: "harmonia-funcional",
        prompt: "Para onde a sexta napolitana costuma ir?",
        options: [
          { id: "a", label: "Para o V (às vezes passando pelo I⁶₄ cadencial)" },
          { id: "b", label: "Para o IV" },
          { id: "c", label: "Para o vi" },
        ],
        correctOptionId: "a",
        explanation: "É um acorde de função subdominante, preparando a dominante.",
      },
      {
        id: "hc-sexta",
        kind: "choice",
        skill: "conducao-de-vozes",
        prompt: "No acorde de sexta aumentada (Lá♭ – Fá♯ em Dó), como as notas do intervalo resolvem?",
        options: [
          { id: "a", label: "Abrem por semitom até a oitava de Sol" },
          { id: "b", label: "Fecham em uníssono em Fá" },
          { id: "c", label: "Ficam paradas" },
        ],
        correctOptionId: "a",
        explanation: "Lá♭ desce para Sol e Fá♯ sobe para Sol.",
      },
      {
        id: "hc-afinavel",
        kind: "choice",
        skill: "arranjo",
        prompt: "Como tornar uma passagem cromática afinável para o coro?",
        options: [
          { id: "a", label: "Movimentos por semitom e notas comuns entre os acordes" },
          { id: "b", label: "Saltos para as notas alteradas" },
          { id: "c", label: "Intervalos aumentados na mesma voz" },
        ],
        correctOptionId: "a",
        explanation: "O cantor ouve e acha a nota a partir da anterior.",
      },
      {
        id: "hc-planing",
        kind: "choice",
        skill: "acordes",
        prompt: "O que é paralelismo 'real'?",
        options: [
          { id: "a", label: "O acorde desliza mantendo exatamente a mesma qualidade (todos maiores, por exemplo)" },
          { id: "b", label: "Os acordes seguem as notas da escala" },
          { id: "c", label: "Só o baixo se move" },
        ],
        correctOptionId: "a",
        explanation: "No paralelismo tonal, as qualidades mudam conforme a escala.",
      },
    ],
    generators: [{ type: "seventh-identification", count: 2 }, { type: "chord-identification", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o empréstimo modal.",
  application: {
    title: "Prática no laboratório de escrita",
    steps: [
      "Abra o coral SATB de exemplo.",
      "Troque o IV do compasso 3 por iv (Fá menor), fazendo a nota alterada chegar por semitom.",
      "Revise no estilo tradicional e ouça a diferença de cor.",
    ],
  },
};

export const lessonAnaliseRepertorio: Lesson = {
  id: "analise-de-repertorio",
  title: "Análise de repertório: aprender com arranjos existentes",
  summary: "Um método de análise para estudar corais, hinos e arranjos de grupos vocais: o que observar, como anotar e como transformar a análise em técnica própria.",
  levelId: "s4",
  unitId: "s4-prf",
  status: "disponivel",
  prerequisites: [],
  estimatedMinutes: 60,
  competencies: ["arranjo", "harmonia-funcional", "percepcao"],
  objectives: [
    "Analisar um arranjo existente com uma ficha de análise padronizada.",
    "Identificar forma, textura, distribuição da melodia, harmonia e recursos de estilo.",
    "Transformar o que foi analisado em escolhas para os próprios arranjos.",
  ],
  sections: [
    {
      title: "1. Por que analisar",
      blocks: [
        {
          type: "paragraph",
          text: "Em todos os cursos de arranjo e regência, a análise de obras existentes ocupa boa parte das aulas: é assim que o estudante aprende soluções que nenhum manual descreve. Analisar não é só dar nome aos acordes — é entender por que o arranjador escolheu cada textura, onde colocou o clímax e como fez a melodia passar de um naipe a outro.",
        },
      ],
    },
    {
      title: "2. A ficha de análise",
      blocks: [
        {
          type: "table",
          caption: "O que anotar",
          headers: ["Item", "Perguntas"],
          rows: [
            ["Formação e tonalidade", "Para quem foi escrito? Em que tonalidade? A tonalidade favorece as tessituras?"],
            ["Forma", "Quais seções? O que se repete e o que muda a cada repetição?"],
            ["Textura por seção", "Uníssono, homofonia, pad, bloco, contracanto?"],
            ["Melodia", "Em que voz está em cada seção? Há dobramentos?"],
            ["Harmonia", "Cadências, acordes de empréstimo, tensões, modulações?"],
            ["Condução", "As vozes internas são cantáveis? Há paralelas intencionais?"],
            ["Texto", "A prosódia é respeitada? Onde estão as respirações?"],
            ["Energia", "Onde está o clímax? Como o arranjo chega a ele?"],
          ],
        },
        { type: "example", score: CHORALE_SATB_C, verdict: "correto", caption: "Exercício de análise", commentary: "Aplique a ficha: formação SATB em Dó maior, homofonia, melodia no soprano, I – ii – V – I e cadência autêntica final; o contralto e o tenor andam quase só por grau." },
        { type: "example", score: EX.retrogressao, verdict: "observacao", caption: "Uma escolha a investigar", commentary: "V → IV é uma retrogressão no estilo tradicional. Ao encontrar algo assim num arranjo publicado, pergunte: é um erro, uma escolha de estilo ou um efeito de texto?" },
        { type: "listening", title: "Analise ouvindo", score: CHORALE_SATB_C, instructions: ["Ouça cada voz sozinha e anote o contorno.", "Ouça tudo e marque as cadências."], focus: [["S"], ["A"], ["T"], ["B"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "3. Repertório para estudar",
      blocks: [
        {
          type: "list",
          items: [
            "Corais de J. S. Bach (domínio público): condução de vozes e cadências em sua forma mais clara.",
            "Hinários tradicionais (domínio público): homofonia funcional e prosódia.",
            "Heitor Villa-Lobos, Guia Prático: canções folclóricas brasileiras arranjadas para coro.",
            "Gravações de grupos vocais de MPB, pop a cappella e gospel: ouça e transcreva trechos para estudar texturas e sílabas.",
          ],
        },
        {
          type: "callout",
          tone: "atencao",
          title: "Direitos autorais",
          text: "Estudar e analisar gravações e partituras é livre; publicar ou apresentar um arranjo de canção protegida exige autorização. Para trabalhos e apresentações, prefira repertório em domínio público ou obras próprias.",
        },
      ],
    },
  ],
  exercises: {
    id: "ex-analise-repertorio",
    title: "Verificação: análise de repertório",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["ar-objetivo"],
    staticItems: [
      {
        id: "ar-objetivo",
        kind: "choice",
        skill: "arranjo",
        prompt: "Qual é o principal objetivo de analisar arranjos existentes?",
        options: [
          { id: "a", label: "Entender as escolhas do arranjador para aplicá-las nos próprios arranjos" },
          { id: "b", label: "Copiar o arranjo para apresentar" },
          { id: "c", label: "Encontrar erros para corrigir" },
        ],
        correctOptionId: "a",
        explanation: "A análise é uma fonte de técnica: soluções reais para problemas reais.",
      },
      {
        id: "ar-forma",
        kind: "choice",
        skill: "arranjo",
        prompt: "Ao analisar a forma, o que é mais revelador?",
        options: [
          { id: "a", label: "O que muda a cada repetição de uma mesma seção" },
          { id: "b", label: "O número total de compassos" },
          { id: "c", label: "A fonte da partitura" },
        ],
        correctOptionId: "a",
        explanation: "As mudanças entre repetições mostram as técnicas de variação.",
      },
      {
        id: "ar-escuta",
        kind: "choice",
        skill: "percepcao",
        prompt: "Qual é a forma mais eficaz de analisar as vozes internas?",
        options: [
          { id: "a", label: "Ouvir e cantar cada voz sozinha, anotando o contorno" },
          { id: "b", label: "Ler só o soprano" },
          { id: "c", label: "Contar as notas" },
        ],
        correctOptionId: "a",
        explanation: "A cantabilidade das vozes internas só aparece quando elas são ouvidas isoladas.",
      },
      {
        id: "ar-direitos",
        kind: "choice",
        skill: "arranjo",
        prompt: "Você quer apresentar publicamente o seu arranjo de uma canção protegida. O que é necessário?",
        options: [
          { id: "a", label: "Autorização do titular dos direitos" },
          { id: "b", label: "Nada, porque o arranjo é seu" },
          { id: "c", label: "Apenas citar o compositor" },
        ],
        correctOptionId: "a",
        explanation: "Arranjo é obra derivada; a apresentação pública de obra protegida depende de autorização.",
      },
      {
        id: "ar-retrogressao",
        kind: "choice",
        skill: "harmonia-funcional",
        prompt: "Um arranjo publicado tem V → IV. Qual a melhor atitude na análise?",
        options: [
          { id: "a", label: "Perguntar se é erro, escolha de estilo ou efeito de texto" },
          { id: "b", label: "Concluir que o arranjador errou" },
          { id: "c", label: "Ignorar" },
        ],
        correctOptionId: "a",
        explanation: "Convenções mudam com o estilo; a análise busca a intenção.",
      },
    ],
    generators: [{ type: "cadence-identification", count: 2 }, { type: "function-identification", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o objetivo da análise.",
  application: {
    title: "Trabalho da disciplina",
    steps: [
      "Escolha um coral de Bach ou um hino em domínio público e preencha a ficha de análise.",
      "Escolha uma gravação de grupo vocal e descreva a textura de cada seção.",
      "Liste três técnicas encontradas que você vai usar no trabalho de conclusão.",
    ],
  },
};
