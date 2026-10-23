import { CHORALE_SATB_C } from "@/domain/music/examples";
import { EX } from "../examples";
import { EXA } from "../examples-arranjo";
import type { Lesson } from "../types";

/* 1º semestre — ARV101 Introdução ao Arranjo Vocal e VOZ101 A Voz como Instrumento. */

export const lessonOficio: Lesson = {
  id: "oficio-do-arranjador",
  title: "O ofício do arranjador vocal",
  summary: "O que é arranjar, o que o arranjador decide, o que pode e o que não pode mudar numa canção, e as três camadas de qualquer arranjo.",
  levelId: "s1",
  unitId: "s1-arv",
  status: "disponivel",
  prerequisites: [],
  estimatedMinutes: 45,
  competencies: ["arranjo"],
  objectives: [
    "Distinguir composição, arranjo, harmonização e orquestração vocal.",
    "Listar as decisões que o arranjador toma antes de escrever a primeira nota.",
    "Reconhecer as três camadas de um arranjo (melodia, harmonia e ritmo/textura) e quem as canta.",
    "Explicar por que o mesmo arranjo pode estar 'certo' num estilo e 'errado' em outro.",
  ],
  sections: [
    {
      title: "1. Compor, harmonizar, arranjar",
      blocks: [
        {
          type: "paragraph",
          text: "O compositor cria a canção: melodia, letra e, quase sempre, uma harmonia básica (a cifra). O arranjador recebe essa canção pronta e decide COMO ela vai soar para um grupo específico de vozes. Harmonizar é uma parte do arranjo — escolher acordes e distribuí-los entre as vozes —, mas arranjar vai além: inclui a forma (o que acontece do começo ao fim), a textura (quem canta o quê em cada momento), o ritmo do acompanhamento vocal, as sílabas usadas por quem não canta a letra, a tonalidade e até onde o coro respira.",
        },
        {
          type: "table",
          caption: "Quem decide o quê",
          headers: ["Elemento", "Compositor", "Arranjador"],
          rows: [
            ["Melodia e letra", "Cria", "Preserva (pode variar ritmo, ornamentar, trocar de voz)"],
            ["Harmonia", "Sugere (cifra)", "Confirma, enriquece ou rearmoniza"],
            ["Tonalidade", "Escolhe a original", "Escolhe a que serve ao grupo"],
            ["Forma", "Define as partes (verso, refrão…)", "Define a ordem, repetições, introdução, ponte, final"],
            ["Textura e distribuição", "—", "Decide tudo: uníssono, homofonia, melodia com acompanhamento, contraponto"],
          ],
        },
        {
          type: "callout",
          tone: "dica",
          title: "A regra de ouro",
          text: "Um bom arranjo faz a canção soar MAIS ela mesma, não menos. Se o ouvinte não reconhece a melodia ou não entende a letra, o arranjo falhou — por mais sofisticada que seja a harmonia.",
        },
      ],
    },
    {
      title: "2. As três camadas de qualquer arranjo",
      blocks: [
        {
          type: "paragraph",
          text: "Todo arranjo vocal, do hino ao pop a cappella, pode ser lido em três camadas. Pense nelas como 'trabalhos' que alguém precisa fazer. Num coral tradicional, as quatro vozes fazem os três trabalhos ao mesmo tempo (todos cantam a letra, em acordes). Num arranjo pop, cada camada costuma ter dono: uma voz solista, um grupo de apoio e um baixo vocal.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Melodia — o que o ouvinte vai cantarolar depois. Precisa estar sempre audível.",
            "Harmonia — os acordes que dão cor e direção. Podem estar em notas longas, em blocos com a letra ou em arpejos.",
            "Ritmo e textura — o 'motor' do arranjo: o baixo, as sílabas rítmicas, a percussão vocal, as entradas e pausas.",
          ],
        },
        { type: "example", score: EXA.melodiaSo, verdict: "correto", caption: "Ponto de partida: só a melodia", commentary: "É o material que o arranjador recebe. Uma frase de quatro compassos que sobe ao Dó5 no compasso 2 e termina na tônica. Tudo o que vem depois é decisão do arranjo." },
        {
          type: "example",
          score: EXA.melodiaHarmonizada,
          verdict: "correto",
          caption: "Uma decisão possível: harmonização em bloco",
          commentary: "As quatro vozes cantam a letra juntas (homofonia). A melodia continua no soprano; contralto, tenor e baixo dão os acordes I – IV⁶ – I – vi⁶ – V – I. É a textura do hino e do coral de igreja.",
        },
        {
          type: "listening",
          title: "Compare as duas versões",
          score: EXA.melodiaHarmonizada,
          instructions: ["Ouça só o soprano: é a melodia original.", "Ouça as quatro vozes: a melodia continua reconhecível, agora com harmonia.", "Ouça contralto e tenor: percebem que mudam pouco de nota? Isso é condução de vozes econômica."],
          focus: [["S"], ["S", "A", "T", "B"], ["A", "T"]],
        },
      ],
    },
    {
      title: "3. O mesmo recurso, estilos diferentes",
      blocks: [
        {
          type: "paragraph",
          text: "Dobrar a melodia em oitavas (sopranos e tenores cantando a mesma linha, uma oitava de distância) é um recurso clássico de arranjo para dar força a um refrão. No estilo coral tradicional, porém, oitavas consecutivas entre duas vozes são proibidas, porque fazem duas vozes 'virarem uma' e empobrecem a polifonia. No pop e no gospel, é exatamente esse efeito de unidade que se procura.",
        },
        {
          type: "example",
          score: EXA.unissonoOitavas,
          verdict: "incorreto",
          caption: "Melodia em oitavas, avaliada como coral tradicional",
          commentary: "O motor aponta oitavas paralelas entre soprano e tenor em cada mudança de nota. Para um coral no estilo de Bach, é erro: as vozes perdem a independência.",
        },
        {
          type: "example",
          score: EXA.unissonoOitavasPop,
          verdict: "observacao",
          caption: "A mesma escrita, avaliada no estilo popular a cappella",
          commentary: "Agora o motor só registra sugestões: no estilo popular o dobramento em oitavas é recurso legítimo. A partitura é idêntica — o que mudou foi a convenção do estilo. Por isso todo arranjo começa pela pergunta: para que estilo estou escrevendo?",
        },
        {
          type: "callout",
          tone: "atencao",
          title: "Erro objetivo × convenção × escolha",
          text: "Uma nota fora da extensão do cantor é erro objetivo em qualquer estilo. Quintas paralelas são convenção estilística (proibidas no coral tradicional, comuns no pop). Usar ou não uma introdução é escolha estética. O motor de validação marca a categoria de cada diagnóstico — aprenda a lê-la.",
        },
      ],
    },
    {
      title: "4. As perguntas antes da primeira nota",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Para quem? Formação (SATB, TTBB, SSA, SAB…), número de cantores por naipe, nível técnico, idade.",
            "Para quê? Culto, concerto, festival, gravação, apresentação escolar — define duração, dificuldade e estilo.",
            "Com ou sem instrumentos? A cappella exige que as vozes façam o baixo e o ritmo.",
            "Em que estilo? Coral tradicional, MPB, pop, gospel — muda as regras de condução e os recursos permitidos.",
            "Quanto tempo de ensaio o grupo terá? Um arranjo genial que o coro não consegue aprender em três ensaios não serve.",
          ],
        },
        { type: "paragraph", text: "Anote as respostas no topo do seu rascunho. Elas são o 'briefing' do arranjo e vão orientar todas as escolhas das próximas aulas." },
      ],
    },
  ],
  exercises: {
    id: "ex-oficio",
    title: "Verificação: o ofício do arranjador",
    instructions: "Domínio: 80% e os itens essenciais.",
    minScore: 0.8,
    requiredItemIds: ["of-papel", "of-estilo"],
    staticItems: [
      {
        id: "of-papel",
        kind: "choice",
        skill: "arranjo",
        prompt: "Qual destas decisões é tipicamente do ARRANJADOR, e não do compositor?",
        options: [
          { id: "a", label: "Fazer a melodia passar do soprano para o tenor no segundo verso" },
          { id: "b", label: "Trocar a letra do refrão" },
          { id: "c", label: "Criar uma nova melodia para o verso" },
        ],
        correctOptionId: "a",
        explanation: "Distribuir a melodia entre as vozes é decisão de textura — trabalho do arranjador. Letra e melodia pertencem à composição e são preservadas.",
      },
      {
        id: "of-estilo",
        kind: "choice",
        skill: "arranjo",
        prompt: "Sopranos e tenores cantam a melodia em oitavas no refrão. Isso é:",
        options: [
          { id: "a", label: "Erro no coral tradicional; recurso comum no pop e no gospel" },
          { id: "b", label: "Erro em qualquer estilo" },
          { id: "c", label: "Correto em qualquer estilo" },
        ],
        correctOptionId: "a",
        explanation: "Oitavas paralelas são convenção estilística: evitadas no coral tradicional, usadas de propósito no estilo popular para dar unidade e força.",
      },
      {
        id: "of-camadas",
        kind: "choice",
        skill: "arranjo",
        prompt: "Num arranjo pop a cappella, quem normalmente faz a camada de RITMO?",
        options: [
          { id: "a", label: "O baixo vocal e a percussão vocal, com sílabas rítmicas do grupo de apoio" },
          { id: "b", label: "Apenas o solista" },
          { id: "c", label: "Ninguém: a cappella não tem ritmo" },
        ],
        correctOptionId: "a",
        explanation: "Sem instrumentos, as vozes assumem o papel da bateria e do baixo.",
      },
      {
        id: "of-objetivo",
        kind: "choice",
        skill: "arranjo",
        prompt: "Qual destes é um ERRO OBJETIVO, independente do estilo?",
        options: [
          { id: "a", label: "Uma nota do baixo abaixo da extensão do cantor" },
          { id: "b", label: "Quintas paralelas" },
          { id: "c", label: "Começar sem introdução" },
        ],
        correctOptionId: "a",
        explanation: "Se o cantor não alcança a nota, ela não vai soar — em nenhum estilo. Paralelas são convenção; introdução é escolha estética.",
      },
      {
        id: "of-briefing",
        kind: "choice",
        skill: "arranjo",
        prompt: "Qual informação é MAIS importante antes de começar a escrever?",
        options: [
          { id: "a", label: "A formação e o nível do grupo que vai cantar" },
          { id: "b", label: "A fonte que será usada na partitura" },
          { id: "c", label: "Quantos acordes diferentes cabem na música" },
        ],
        correctOptionId: "a",
        explanation: "Extensões, dificuldade, número de vozes e estilo dependem de quem vai cantar.",
      },
    ],
    generators: [{ type: "range-check", count: 2 }, { type: "voice-leading-error", count: 1, ruleIds: ["conducao.paralelas"] }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o papel do arranjador e a diferença entre estilos.",
  application: {
    title: "Prática no laboratório de escrita",
    steps: [
      "Abra o laboratório de escrita e carregue o exemplo 'Coral em Dó maior (SATB)'.",
      "Em 'Estilo', alterne entre coral tradicional e popular a cappella e observe como mudam os diagnósticos sem mudar nenhuma nota.",
      "Escreva o 'briefing' de um arranjo que você gostaria de fazer: formação, finalidade, estilo e tempo de ensaio.",
    ],
  },
};

export const lessonProcesso: Lesson = {
  id: "processo-de-arranjo",
  title: "O processo de arranjo, passo a passo",
  summary: "Um método em sete etapas, do ouvir a canção à partitura revisada — e por que esboçar antes de escrever nota por nota.",
  levelId: "s1",
  unitId: "s1-arv",
  status: "disponivel",
  prerequisites: ["oficio-do-arranjador"],
  estimatedMinutes: 55,
  competencies: ["arranjo"],
  objectives: [
    "Seguir um método de sete etapas para construir um arranjo do zero.",
    "Explicar por que se escreve primeiro a melodia e o baixo (o 'esqueleto').",
    "Usar a revisão com o motor como etapa do processo, não como correção final.",
  ],
  sections: [
    {
      title: "1. Por que um método",
      blocks: [
        {
          type: "paragraph",
          text: "Quem começa a arranjar costuma abrir o editor e escrever o primeiro compasso nas quatro vozes, depois o segundo, e assim por diante. O resultado é previsível: o arranjo fica igual do começo ao fim, as vozes internas 'pulam' sem rumo e o final chega sem preparação. Arranjadores experientes trabalham do geral para o particular: primeiro decidem a forma e a textura de cada trecho; só depois escrevem notas.",
        },
      ],
    },
    {
      title: "2. As sete etapas",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Ouvir e transcrever: aprenda a melodia de cor e escreva-a com a cifra (lead sheet). Confira a letra sílaba por sílaba.",
            "Analisar: marque frases, ponto culminante, cadências e a forma (verso, refrão, ponte).",
            "Decidir o briefing: formação, tonalidade que serve ao grupo, estilo, duração.",
            "Planejar (mapa): para cada trecho, defina a textura, quem canta a melodia e a intensidade (p, mf, f).",
            "Esqueleto: escreva a melodia e o baixo do arranjo inteiro. Corrija aqui as paralelas e as cadências.",
            "Preenchimento: complete as vozes internas pelo menor movimento; acrescente sílabas, ritmos, introdução e final.",
            "Revisão: valide com o motor, cante cada voz sozinha, toque o arranjo em andamento real e ajuste respirações e letra.",
          ],
        },
        {
          type: "callout",
          tone: "dica",
          title: "O esqueleto primeiro",
          text: "Soprano e baixo são as vozes que o ouvinte mais percebe. Se o contorno entre elas estiver bom — movimento contrário, cadências claras, sem paralelas — as vozes internas quase se escrevem sozinhas. Se estiver ruim, nenhuma voz interna salva o arranjo.",
        },
        { type: "example", score: EX.duasVozes, verdict: "correto", caption: "Esqueleto: soprano e baixo", commentary: "Movimento predominantemente contrário e cadência clara. Com isso pronto, contralto e tenor só precisam completar os acordes." },
        { type: "example", score: EX.paralelas, verdict: "incorreto", caption: "O que acontece sem esqueleto", commentary: "Escrever acorde por acorde, movendo todas as vozes juntas, gera quintas e oitavas paralelas — o motor aponta exatamente quais pares de vozes." },
      ],
    },
    {
      title: "3. Escrever, ouvir, revisar",
      blocks: [
        {
          type: "paragraph",
          text: "A revisão não é a última etapa: é um ciclo. Depois de cada trecho, ouça as vozes isoladas. Uma voz interna que você não consegue cantar com prazer provavelmente não será bem cantada pelo coro. O motor de validação ajuda a achar problemas objetivos (extensão, paralelas, resolução de sensíveis), mas só o ouvido decide se a linha é bonita.",
        },
        {
          type: "listening",
          title: "Ouça como o ouvido revisa",
          score: CHORALE_SATB_C,
          instructions: ["Ouça o contralto sozinho e cante junto: é uma linha com sentido?", "Ouça soprano + baixo: o esqueleto se sustenta sozinho?", "Ouça o conjunto em andamento real."],
          focus: [["A"], ["S", "B"], ["S", "A", "T", "B"]],
        },
      ],
    },
  ],
  exercises: {
    id: "ex-processo",
    title: "Verificação: o processo",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["pr-esqueleto"],
    staticItems: [
      {
        id: "pr-esqueleto",
        kind: "choice",
        skill: "arranjo",
        prompt: "Depois de planejar a forma e a textura, o que se escreve primeiro?",
        options: [
          { id: "a", label: "A melodia e o baixo do arranjo inteiro" },
          { id: "b", label: "O primeiro compasso completo nas quatro vozes" },
          { id: "c", label: "A introdução" },
        ],
        correctOptionId: "a",
        explanation: "O esqueleto (melodia + baixo) define a harmonia e o contorno; corrigir problemas nele é muito mais fácil do que depois de preencher as vozes internas.",
      },
      {
        id: "pr-ordem",
        kind: "choice",
        skill: "arranjo",
        prompt: "Qual é a ordem correta?",
        options: [
          { id: "a", label: "Transcrever → analisar → briefing → mapa → esqueleto → preenchimento → revisão" },
          { id: "b", label: "Preenchimento → esqueleto → análise → revisão" },
          { id: "c", label: "Revisão → transcrição → mapa" },
        ],
        correctOptionId: "a",
        explanation: "Do geral para o particular: entender a canção, decidir o plano e só então escrever notas.",
      },
      {
        id: "pr-intro",
        kind: "choice",
        skill: "arranjo",
        prompt: "Quando é melhor escrever a introdução?",
        options: [
          { id: "a", label: "Depois do corpo do arranjo, quando você já conhece os motivos e a textura que vai usar" },
          { id: "b", label: "Sempre antes de tudo" },
          { id: "c", label: "Nunca: arranjos vocais não têm introdução" },
        ],
        correctOptionId: "a",
        explanation: "A introdução costuma apresentar material do próprio arranjo; fica mais coerente quando esse material já existe.",
      },
      {
        id: "pr-revisao",
        kind: "choice",
        skill: "arranjo",
        prompt: "O motor não aponta nenhum problema, mas o contralto parece 'sem graça' ao ser cantado sozinho. O que fazer?",
        options: [
          { id: "a", label: "Revisar a linha: o motor acha erros objetivos, mas a beleza da linha depende do ouvido" },
          { id: "b", label: "Nada: sem diagnósticos, o arranjo está pronto" },
          { id: "c", label: "Apagar o contralto" },
        ],
        correctOptionId: "a",
        explanation: "Ausência de erros não é sinônimo de boa música. Cantar cada voz sozinha é parte do método.",
      },
      {
        id: "pr-briefing",
        kind: "choice",
        skill: "arranjo",
        prompt: "Em que etapa se decide a tonalidade em que o grupo vai cantar?",
        options: [
          { id: "a", label: "No briefing, antes do mapa e do esqueleto" },
          { id: "b", label: "Na revisão final" },
          { id: "c", label: "Depois de escrever as vozes internas" },
        ],
        correctOptionId: "a",
        explanation: "A tonalidade depende das tessituras do grupo; mudá-la depois obriga a reescrever.",
      },
    ],
    generators: [{ type: "voice-leading-error", count: 2, ruleIds: ["conducao.paralelas"] }, { type: "cadence-identification", count: 2 }, { type: "motion-type", count: 1 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a etapa do esqueleto.",
  application: {
    title: "Prática no laboratório de escrita",
    steps: [
      "Crie um arranjo novo SATB de 4 compassos.",
      "Escreva primeiro só o soprano (uma melodia simples sua) e o baixo, revisando com o motor até não haver erros.",
      "Depois complete contralto e tenor e compare quantos diagnósticos surgem.",
    ],
  },
};

export const lessonLeadSheet: Lesson = {
  id: "lead-sheet-e-mapa",
  title: "Lead sheet, análise da canção e mapa do arranjo",
  summary: "Como ler e escrever a 'partitura de bolso' (melodia + cifra + letra), analisar a forma da canção e desenhar o mapa que guia todo o arranjo.",
  levelId: "s1",
  unitId: "s1-arv",
  status: "disponivel",
  prerequisites: ["processo-de-arranjo"],
  estimatedMinutes: 60,
  competencies: ["arranjo", "harmonia-funcional"],
  objectives: [
    "Escrever uma lead sheet completa: melodia, cifra, letra, forma e andamento.",
    "Identificar as partes de uma canção (introdução, verso, pré-refrão, refrão, ponte, final).",
    "Desenhar um mapa de arranjo com textura, melodia e intensidade por seção.",
  ],
  sections: [
    {
      title: "1. A lead sheet",
      blocks: [
        {
          type: "paragraph",
          text: "Lead sheet é a forma mais enxuta de registrar uma canção: uma pauta com a melodia, a letra embaixo e a cifra em cima. É o documento de trabalho do arranjador. Antes de arranjar, confira três coisas: a melodia está exatamente como se canta (e não como alguém 'acha' que é)? A cifra faz sentido com a melodia em cada tempo forte? A letra está separada em sílabas sob as notas certas?",
        },
        {
          type: "table",
          caption: "Cifra: leitura rápida",
          headers: ["Cifra", "Acorde", "Notas (em Dó)"],
          rows: [
            ["C", "Dó maior", "C E G"],
            ["Am", "Lá menor", "A C E"],
            ["G7", "Sol com sétima (dominante)", "G B D F"],
            ["Cmaj7 (C7M)", "Dó com sétima maior", "C E G B"],
            ["Dm7", "Ré menor com sétima", "D F A C"],
            ["C/E", "Dó com Mi no baixo (1ª inversão)", "E no baixo, C e G acima"],
            ["Csus4", "Dó com quarta suspensa", "C F G"],
            ["Cadd9 (C9)", "Dó com nona acrescentada", "C E G D"],
          ],
        },
      ],
    },
    {
      title: "2. Análise da canção",
      blocks: [
        {
          type: "paragraph",
          text: "Com a lead sheet pronta, marque a forma. Canções populares costumam alternar versos (mesma melodia, letras diferentes) e refrões (mesma melodia e mesma letra). Hinos usam estrofes iguais. Identifique onde a melodia atinge o ponto mais agudo, onde as frases terminam em suspensão (pedindo continuação) e onde terminam em conclusão.",
        },
        { type: "example", score: EX.melodiaFrase, verdict: "correto", caption: "Duas frases: pergunta e resposta", commentary: "A primeira frase termina no 5º grau (suspensiva); a segunda sobe ao Ré5 e conclui na tônica. Essa relação pergunta–resposta é o menor 'mapa' possível." },
        { type: "example", score: EX.melodiaSalto, verdict: "observacao", caption: "Um salto que pede atenção", commentary: "Um salto de 6ª sem compensação: anote-o na análise. No arranjo, as outras vozes podem preencher o salto ou dar apoio harmônico para o cantor afinar." },
      ],
    },
    {
      title: "3. O mapa do arranjo",
      blocks: [
        {
          type: "paragraph",
          text: "O mapa é uma tabela simples, feita antes de escrever qualquer nota. Para cada seção, decida: quem canta a melodia, que textura as outras vozes fazem, qual a intensidade e se há algo especial (modulação, pausa geral, solo). O mapa garante que o arranjo tenha uma curva — começa contido, cresce e chega ao clímax no lugar certo.",
        },
        {
          type: "table",
          caption: "Exemplo de mapa (canção com dois versos e refrão)",
          headers: ["Seção", "Melodia", "Textura das outras vozes", "Intensidade"],
          rows: [
            ["Introdução (4 comp.)", "—", "Contraltos e tenores em 'uh', acordes do refrão", "p"],
            ["Verso 1", "Sopranos", "Pad em 'uh'", "mp"],
            ["Refrão 1", "Sopranos", "Homofonia com a letra", "mf"],
            ["Verso 2", "Tenores", "Sopranos e contraltos em contracanto", "mf"],
            ["Refrão 2 (+½ tom)", "Sopranos + tenores (oitavas)", "Homofonia, baixo rítmico", "f"],
            ["Final", "Todos", "Acorde longo, fermata", "p → pp"],
          ],
        },
        { type: "listening", title: "Ouça a forma em miniatura", score: EX.melodiaFrase, instructions: ["Identifique a respiração entre as frases.", "Onde está o ponto culminante?"], focus: [["S"]] },
      ],
    },
  ],
  exercises: {
    id: "ex-lead-sheet",
    title: "Verificação: lead sheet e mapa",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["ls-mapa"],
    staticItems: [
      {
        id: "ls-mapa",
        kind: "choice",
        skill: "arranjo",
        prompt: "Para que serve o mapa do arranjo?",
        options: [
          { id: "a", label: "Planejar, antes de escrever notas, quem canta a melodia, a textura e a intensidade de cada seção" },
          { id: "b", label: "Substituir a partitura no ensaio" },
          { id: "c", label: "Listar os acordes da música" },
        ],
        correctOptionId: "a",
        explanation: "O mapa dá ao arranjo uma curva de intensidade e evita que tudo soe igual do início ao fim.",
      },
      {
        id: "ls-cifra",
        kind: "choice",
        skill: "harmonia-funcional",
        prompt: "O que significa a cifra C/E?",
        options: [
          { id: "a", label: "Acorde de Dó maior com Mi no baixo (1ª inversão)" },
          { id: "b", label: "Dó maior seguido de Mi maior" },
          { id: "c", label: "Dó com nona" },
        ],
        correctOptionId: "a",
        explanation: "A barra indica a nota do baixo.",
      },
      {
        id: "ls-refrao",
        kind: "choice",
        skill: "arranjo",
        prompt: "Qual é a diferença típica entre verso e refrão?",
        options: [
          { id: "a", label: "O verso repete a melodia com letras diferentes; o refrão repete melodia e letra" },
          { id: "b", label: "O refrão é sempre instrumental" },
          { id: "c", label: "Não há diferença" },
        ],
        correctOptionId: "a",
        explanation: "Por isso o refrão costuma receber a textura mais cheia e a maior intensidade do arranjo.",
      },
      {
        id: "ls-cifra7",
        kind: "choice",
        skill: "acordes",
        prompt: "Quais são as notas de G7?",
        options: [
          { id: "a", label: "G B D F" },
          { id: "b", label: "G B D F♯" },
          { id: "c", label: "G B♭ D F" },
        ],
        correctOptionId: "a",
        explanation: "G7 é a tétrade de dominante: tríade maior com sétima menor.",
      },
    ],
    generators: [{ type: "cadence-identification", count: 2 }, { type: "function-identification", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a função do mapa.",
  application: {
    title: "Trabalho da disciplina (início)",
    steps: [
      "Escolha uma canção de domínio público ou de sua autoria.",
      "Escreva a lead sheet: melodia no soprano do laboratório de escrita, com a letra sílaba por sílaba e a cifra nas notas do arranjo.",
      "Faça o mapa do arranjo (seções, melodia, textura, intensidade). Ele será usado nos trabalhos dos próximos semestres.",
    ],
  },
};

export const lessonVozCantada: Lesson = {
  id: "voz-cantada",
  title: "A voz cantada: registros, vogais, respiração e cansaço",
  summary: "O que o arranjador precisa saber de técnica vocal: tessitura × extensão, registros e passagem, vogais no agudo, respiração e fadiga.",
  levelId: "s1",
  unitId: "s1-voz",
  status: "disponivel",
  prerequisites: ["vozes-claves-extensoes"],
  estimatedMinutes: 55,
  competencies: ["leitura-vocal", "escrita-satb", "escrita-ttbb"],
  objectives: [
    "Diferenciar extensão (o que a voz alcança) de tessitura (onde ela canta com conforto).",
    "Evitar notas sustentadas na região de passagem e no extremo agudo de coros amadores.",
    "Escolher vogais e sílabas adequadas ao registro de cada naipe.",
    "Planejar respirações e o tempo de permanência no agudo.",
  ],
  sections: [
    {
      title: "1. Extensão não é tessitura",
      blocks: [
        {
          type: "paragraph",
          text: "A extensão é o limite: a nota mais grave e a mais aguda que um cantor consegue emitir. A tessitura é a região em que ele canta bem, com afinação, timbre e por tempo prolongado. Escrever na extensão é possível; escrever o tempo todo nela é cruel. Em coros amadores, mantenha a maior parte do arranjo na tessitura e reserve os extremos para momentos curtos e preparados (um clímax, um final).",
        },
        {
          type: "table",
          caption: "Tessituras de trabalho para coro amador",
          headers: ["Voz", "Tessitura confortável", "Use com cuidado"],
          rows: [
            ["Soprano", "E4 – E5", "F5 – G5: curto, em vogal aberta; acima de G5, evite"],
            ["Contralto", "A3 – B4", "C5 – D5 no agudo; abaixo de A3 perde volume"],
            ["Tenor", "E3 – E4", "F4 – G4: só em clímax, preparado"],
            ["Baixo", "G2 – C4", "E2 – F2: só com baixos profundos"],
          ],
        },
        {
          type: "example",
          score: EXA.tessituraAlta,
          verdict: "incorreto",
          caption: "Soprano sustentado em Lá5",
          commentary: "Para coro amador, o motor acusa nota fora da extensão configurada e fora da tessitura. Mesmo que um soprano treinado alcance, oito tempos sustentados no extremo cansam e desafinam o naipe inteiro.",
        },
        { type: "example", score: CHORALE_SATB_C, verdict: "correto", caption: "Todas as vozes na tessitura", commentary: "Nenhuma voz sai da sua região confortável: o coro pode cantar isso por muito tempo sem fadiga." },
      ],
    },
    {
      title: "2. Registros e passagem",
      blocks: [
        {
          type: "paragraph",
          text: "Toda voz tem uma região de mudança de registro (a 'passagem'), onde o mecanismo vocal se reorganiza. Em vozes masculinas, ela fica em torno de D4–F4; em vozes femininas, em torno de E4–F♯4 (primeira passagem) e C5–F5 (segunda). Notas longas e muito expostas bem na passagem são difíceis para amadores. Prefira passar por essa região em movimento, ou escrevê-la com vogais que ajudam (o 'u' e o 'o' são mais estáveis do que o 'i').",
        },
        {
          type: "callout",
          tone: "ttbb",
          title: "Tenores e falsete",
          text: "Acima de G4, muitos tenores amadores passam para voz mista ou falsete. Isso pode ser um efeito lindo (um acorde suave e aéreo), mas não uma escolha para um refrão forte. Escreva tenor agudo e forte apenas se souber que o grupo tem quem cante.",
        },
      ],
    },
    {
      title: "3. Vogais e sílabas",
      blocks: [
        {
          type: "list",
          items: [
            "No agudo, vogais abertas ('a', 'ó') soam e afinam melhor do que fechadas ('i', 'u').",
            "No grave, vogais escuras ('u', 'ô') dão corpo; 'i' no grave quase não se ouve.",
            "Consoantes interrompem o som: 'mmm' e 'nnn' funcionam como pad suave; 'dum', 'dm', 'bm' dão ataque rítmico.",
            "Mudanças de sílaba muito rápidas em notas rápidas são difíceis: cantores precisam de tempo para articular.",
          ],
        },
      ],
    },
    {
      title: "4. Respiração e cansaço",
      blocks: [
        {
          type: "paragraph",
          text: "Cantor precisa respirar. Em andamento moderado, uma frase de 8 a 10 segundos é confortável; acima de 15 segundos sem pausa, o naipe vai respirar onde puder — e geralmente no meio de uma palavra. Escreva pausas nos finais de frase, ou indique respiração escalonada (cada cantor respira num momento diferente) quando precisar de uma nota muito longa.",
        },
        { type: "example", score: EX.semRespiracao, verdict: "observacao", caption: "20 segundos sem respirar", commentary: "A ♩ = 60, cinco semibreves seguidas dão 20 segundos. O motor sugere inserir uma respiração ou indicar respiração escalonada." },
        { type: "listening", title: "Cante junto e sinta o fôlego", score: EX.semRespiracao, instructions: ["Tente cantar a linha inteira sem respirar.", "Onde você respiraria naturalmente?"], focus: [["S"]] },
      ],
    },
  ],
  exercises: {
    id: "ex-voz-cantada",
    title: "Verificação: a voz cantada",
    instructions: "Domínio: 80% e os itens essenciais.",
    minScore: 0.8,
    requiredItemIds: ["vc-tessitura", "vc-respiracao"],
    staticItems: [
      {
        id: "vc-tessitura",
        kind: "choice",
        skill: "leitura-vocal",
        prompt: "O que é tessitura?",
        options: [
          { id: "a", label: "A região em que a voz canta com conforto e qualidade por tempo prolongado" },
          { id: "b", label: "A nota mais aguda que o cantor alcança" },
          { id: "c", label: "O timbre da voz" },
        ],
        correctOptionId: "a",
        explanation: "Extensão é o limite; tessitura é onde se deve escrever a maior parte do arranjo.",
      },
      {
        id: "vc-respiracao",
        kind: "choice",
        skill: "texto-e-prosodia",
        prompt: "Você precisa de um acorde sustentado por 24 segundos no final. O que fazer?",
        options: [
          { id: "a", label: "Indicar respiração escalonada no naipe" },
          { id: "b", label: "Nada: os cantores dão um jeito" },
          { id: "c", label: "Cortar o acorde pela metade" },
        ],
        correctOptionId: "a",
        explanation: "Com respiração escalonada, cada cantor respira num momento diferente e o som do naipe não se interrompe.",
      },
      {
        id: "vc-vogal",
        kind: "choice",
        skill: "leitura-vocal",
        prompt: "Qual vogal é mais fácil para sopranos sustentarem um Sol5?",
        options: [
          { id: "a", label: "'a' (aberta)" },
          { id: "b", label: "'i' (fechada)" },
          { id: "c", label: "'u' (fechada)" },
        ],
        correctOptionId: "a",
        explanation: "No agudo, as vogais abertas permitem que a voz soe e afine com menos esforço.",
      },
      {
        id: "vc-falsete",
        kind: "choice",
        skill: "escrita-ttbb",
        prompt: "Tenores amadores cantando A4 forte num refrão costumam:",
        options: [
          { id: "a", label: "Ter dificuldade: acima de G4 muitos passam ao falsete ou à voz mista" },
          { id: "b", label: "Cantar com facilidade" },
          { id: "c", label: "Cantar uma oitava abaixo automaticamente" },
        ],
        correctOptionId: "a",
        explanation: "Reserve o agudo forte dos tenores para grupos que você conhece.",
      },
    ],
    generators: [{ type: "range-check", count: 4 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo tessitura e respiração.",
  application: {
    title: "Prática no laboratório de escrita",
    steps: [
      "Abra o coral SATB de exemplo e transponha para Lá maior em Propriedades → Tonalidade.",
      "Observe os diagnósticos de tessitura que aparecem em cada voz.",
      "Volte para uma tonalidade em que nenhuma voz saia da tessitura e anote qual foi.",
    ],
  },
};
