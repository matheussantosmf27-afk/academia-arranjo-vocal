import { CHORALE_SATB_C } from "@/domain/music/examples";
import { EX } from "../examples";
import { EXA } from "../examples-arranjo";
import type { Lesson } from "../types";

/* 3º semestre — FOR301 Forma e Estrutura do Arranjo e HAR301 Harmonia para Arranjadores II. */

export const lessonFormaEnergia: Lesson = {
  id: "forma-e-energia",
  title: "Forma e curva de energia do arranjo",
  summary: "Como organizar o arranjo no tempo: seções, repetição e contraste, a curva de intensidade e onde colocar o clímax.",
  levelId: "s3",
  unitId: "s3-for",
  status: "disponivel",
  prerequisites: ["texturas-vocais"],
  estimatedMinutes: 60,
  competencies: ["arranjo"],
  objectives: [
    "Descrever a forma de uma canção com letras (A, B, A', C…) e nomes de seção.",
    "Desenhar a curva de energia de um arranjo e posicionar o clímax.",
    "Usar textura, registro, dinâmica e densidade para controlar a intensidade.",
  ],
  sections: [
    {
      title: "1. Repetição e contraste",
      blocks: [
        {
          type: "paragraph",
          text: "Forma musical é o equilíbrio entre repetição (que dá unidade e faz o ouvinte reconhecer) e contraste (que renova o interesse). A canção já traz uma forma — versos e refrões —, mas o arranjo decide como cada repetição soa. Repetir um refrão exatamente igual três vezes é perder a chance de construir; mudar tudo a cada vez é perder a identidade. O arranjador procura 'o mesmo, mas diferente'.",
        },
        {
          type: "table",
          caption: "Formas comuns",
          headers: ["Forma", "Sequência", "Onde aparece"],
          rows: [
            ["Estrófica", "A A A A", "Hinos, canções folclóricas"],
            ["Verso–refrão", "A B A B", "Canções populares, louvor"],
            ["Com ponte", "A B A B C B", "Pop, gospel, MPB"],
            ["Ternária", "A B A", "Canções de concerto, peças corais"],
          ],
        },
      ],
    },
    {
      title: "2. A curva de energia",
      blocks: [
        {
          type: "paragraph",
          text: "Desenhe a intensidade do arranjo como uma linha no tempo. A maioria dos arranjos eficazes cresce em ondas: começa contido, cresce até um primeiro ponto alto (o primeiro refrão), recua um pouco (segundo verso, com textura nova), cresce mais (segundo refrão), e chega ao clímax perto do fim — geralmente no último refrão ou logo antes dele —, terminando com uma resolução mais calma ou num final brilhante.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Dinâmica: p, mp, mf, f — a forma mais óbvia de controlar a intensidade.",
            "Densidade: quantas vozes cantam (solo → duas vozes → tutti).",
            "Registro: vozes mais agudas e acordes mais abertos soam mais intensos.",
            "Ritmo: notas longas acalmam; ritmos repetidos e mais rápidos energizam.",
            "Harmonia: modulação ascendente e acordes com mais tensão elevam a energia.",
          ],
        },
        {
          type: "callout",
          tone: "atencao",
          title: "Um clímax só",
          text: "Se tudo é forte, nada é forte. Escolha UM momento de clímax e guarde para ele o registro mais agudo, a textura mais cheia e a dinâmica mais forte. O ponto culminante da melodia costuma ser o lugar natural.",
        },
      ],
    },
    {
      title: "3. Ouvindo a forma",
      blocks: [
        { type: "example", score: EXA.melodiaPad, verdict: "correto", caption: "Momento contido: pad", commentary: "Densidade baixa (uma voz canta a letra), notas longas, dinâmica suave: ideal para o primeiro verso." },
        { type: "example", score: EXA.melodiaHarmonizada, verdict: "correto", caption: "Momento cheio: homofonia", commentary: "Todas as vozes com a letra, harmonia mudando a cada meio compasso: mais energia, ideal para o refrão." },
        { type: "example", score: EX.semRespiracao, verdict: "observacao", caption: "Energia sem respiro", commentary: "Notas longas sem pausa por 20 segundos: além de cansar, não deixam a música 'respirar' entre seções. A forma precisa de pausas." },
        {
          type: "listening",
          title: "Do contido ao cheio",
          score: EXA.melodiaHarmonizada,
          instructions: ["Ouça primeiro o exemplo com pad, depois este.", "Descreva o que mudou: densidade, ritmo, dinâmica?"],
          focus: [["S", "A", "T", "B"]],
        },
      ],
    },
  ],
  exercises: {
    id: "ex-forma",
    title: "Verificação: forma e energia",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["fe-climax"],
    staticItems: [
      {
        id: "fe-climax",
        kind: "choice",
        skill: "arranjo",
        prompt: "Onde costuma ficar o clímax de um arranjo verso–refrão?",
        options: [
          { id: "a", label: "No último refrão (ou logo antes dele)" },
          { id: "b", label: "No primeiro compasso" },
          { id: "c", label: "No primeiro verso" },
        ],
        correctOptionId: "a",
        explanation: "A energia cresce em ondas até perto do fim.",
      },
      {
        id: "fe-ferramentas",
        kind: "choice",
        skill: "arranjo",
        prompt: "Qual destas NÃO é uma ferramenta para aumentar a energia?",
        options: [
          { id: "a", label: "Reduzir a textura a uma voz em 'mm', piano" },
          { id: "b", label: "Modular meio tom acima" },
          { id: "c", label: "Passar de pad para homofonia" },
        ],
        correctOptionId: "a",
        explanation: "Reduzir densidade e dinâmica diminui a energia — útil para contraste, não para clímax.",
      },
      {
        id: "fe-forma",
        kind: "choice",
        skill: "arranjo",
        prompt: "Uma canção é verso, refrão, verso, refrão, ponte, refrão. Em letras:",
        options: [
          { id: "a", label: "A B A B C B" },
          { id: "b", label: "A A A A A A" },
          { id: "c", label: "A B C D E F" },
        ],
        correctOptionId: "a",
        explanation: "Seções iguais recebem a mesma letra.",
      },
      {
        id: "fe-densidade",
        kind: "choice",
        skill: "arranjo",
        prompt: "O primeiro verso tem só uma voz com a letra e as outras em pad, piano. O que isso representa na curva de energia?",
        options: [
          { id: "a", label: "Um ponto baixo, que deixa espaço para crescer" },
          { id: "b", label: "O clímax" },
          { id: "c", label: "Um erro de forma" },
        ],
        correctOptionId: "a",
        explanation: "Densidade e dinâmica baixas no início permitem que o arranjo cresça.",
      },
      {
        id: "fe-repeticao",
        kind: "choice",
        skill: "arranjo",
        prompt: "Qual é o problema de repetir o refrão três vezes exatamente igual?",
        options: [
          { id: "a", label: "Perde-se a chance de construir energia e o ouvinte se cansa" },
          { id: "b", label: "Nenhum: repetição exata é sempre melhor" },
          { id: "c", label: "O motor acusa erro" },
        ],
        correctOptionId: "a",
        explanation: "O arranjador busca 'o mesmo, mas diferente' a cada repetição.",
      },
    ],
    generators: [{ type: "cadence-identification", count: 3 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a posição do clímax.",
  application: {
    title: "Trabalho da disciplina",
    steps: [
      "Retome o mapa de arranjo feito no 1º semestre.",
      "Desenhe a curva de energia (uma linha de p a f) acima do mapa e marque o clímax.",
      "Revise o mapa para que textura, densidade e registro acompanhem a curva.",
    ],
  },
};

export const lessonVariacao: Lesson = {
  id: "variacao-e-desenvolvimento",
  title: "Variação e desenvolvimento: o mesmo refrão, três vezes diferente",
  summary: "Técnicas para repetir sem cansar: troca de naipe da melodia, nova textura, contracanto, rearmonização leve, modulação e final.",
  levelId: "s3",
  unitId: "s3-for",
  status: "disponivel",
  prerequisites: ["acompanhamento-introducoes"],
  estimatedMinutes: 60,
  competencies: ["arranjo", "contraponto"],
  objectives: [
    "Aplicar ao menos cinco técnicas de variação a uma seção repetida.",
    "Escrever um contracanto que não compete com a melodia.",
    "Planejar um final coerente com a curva de energia.",
  ],
  sections: [
    {
      title: "1. Caixa de ferramentas da variação",
      blocks: [
        {
          type: "table",
          caption: "Técnicas e efeito",
          headers: ["Técnica", "Como", "Efeito"],
          rows: [
            ["Troca de naipe", "A melodia vai para tenores ou contraltos", "Cor nova, mesmo material"],
            ["Nova textura", "Pad → homofonia → rítmico", "Mudança clara de seção"],
            ["Contracanto", "Uma segunda linha melódica em notas longas, nas pausas da melodia", "Riqueza sem perder clareza"],
            ["Rearmonização", "Trocar alguns acordes por substitutos (vi por I, ii por IV…)", "Surpresa, renovação"],
            ["Modulação", "Repetir o refrão meio tom ou um tom acima", "Elevação de energia"],
            ["Redução", "Só uma ou duas vozes", "Intimidade, preparo do clímax"],
          ],
        },
      ],
    },
    {
      title: "2. Contracanto",
      blocks: [
        {
          type: "paragraph",
          text: "Contracanto é uma melodia secundária. A regra prática: ela se move quando a melodia principal para (nas notas longas e pausas) e para quando a melodia se move. Fica em registro diferente da melodia (acima ou abaixo), usa ritmo mais lento e evita cantar a mesma palavra ao mesmo tempo, para não embaralhar o texto. Um contracanto em 'uh' é o mais seguro; com letra, use palavras-chave ou ecos do texto principal.",
        },
        { type: "example", score: EX.duasVozes, verdict: "correto", caption: "Duas linhas independentes", commentary: "As vozes extremas se movem em direções opostas e em ritmos complementares: cada uma tem identidade própria." },
        { type: "example", score: EX.duasVozesParalelas, verdict: "incorreto", caption: "Contracanto que 'cola' na melodia", commentary: "Duas vozes em quintas paralelas soam como uma só linha engrossada, não como diálogo." },
      ],
    },
    {
      title: "3. Três refrões",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "1º refrão: melodia no soprano, homofonia simples, mf.",
            "2º refrão: melodia nos tenores, sopranos com contracanto em 'uh', baixo mais rítmico, mf–f.",
            "3º refrão: modulação meio tom acima, melodia em oitavas (sopranos e tenores), contraltos e baixos em acordes com a letra, f; final com acorde aberto e fermata.",
          ],
        },
        { type: "example", score: EXA.melodiaNoTenor, verdict: "correto", caption: "Refrão 2: melodia nos tenores", commentary: "Mesmo material, cor diferente: o ouvinte reconhece a canção e percebe que o arranjo avançou." },
        { type: "listening", title: "Compare os refrões", score: EXA.melodiaNoTenor, instructions: ["Ouça o exemplo homofônico (refrão 1) e depois este.", "A melodia continua reconhecível?"], focus: [["T"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "4. O final",
      blocks: [
        {
          type: "paragraph",
          text: "Os finais mais comuns: (1) repetir a última frase, mais lenta (ritardando), com acorde longo; (2) um 'tag' — a frase final repetida duas ou três vezes, com harmonia cada vez mais rica; (3) final suspenso, terminando em pianíssimo numa nota longa; (4) final abrupto e forte, no tempo. Escolha conforme a curva de energia: um arranjo que cresceu até o fim pede final forte; um que teve o clímax antes pede um final que 'pousa'.",
        },
        { type: "example", score: CHORALE_SATB_C, verdict: "correto", caption: "Final por cadência autêntica", commentary: "O final mais simples e eficaz: V – I com a sensível subindo à tônica." },
      ],
    },
  ],
  exercises: {
    id: "ex-variacao",
    title: "Verificação: variação",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["va-contracanto"],
    staticItems: [
      {
        id: "va-contracanto",
        kind: "choice",
        skill: "contraponto",
        prompt: "Quando o contracanto deve se mover?",
        options: [
          { id: "a", label: "Principalmente quando a melodia principal está parada (notas longas, pausas)" },
          { id: "b", label: "Sempre junto com a melodia, no mesmo ritmo" },
          { id: "c", label: "Nunca: contracanto é nota única" },
        ],
        correctOptionId: "a",
        explanation: "Ritmos complementares mantêm as duas linhas audíveis.",
      },
      {
        id: "va-modulacao",
        kind: "choice",
        skill: "arranjo",
        prompt: "Qual técnica é mais associada a elevar a energia do último refrão?",
        options: [
          { id: "a", label: "Modular meio tom ou um tom acima" },
          { id: "b", label: "Retirar o baixo" },
          { id: "c", label: "Cantar tudo em 'mm'" },
        ],
        correctOptionId: "a",
        explanation: "A modulação ascendente é o recurso clássico do 'refrão final'.",
      },
      {
        id: "va-tag",
        kind: "choice",
        skill: "arranjo",
        prompt: "O que é um 'tag' de final?",
        options: [
          { id: "a", label: "Repetir a frase final duas ou três vezes, com harmonia cada vez mais rica" },
          { id: "b", label: "Um acorde dissonante sem resolução" },
          { id: "c", label: "Uma introdução" },
        ],
        correctOptionId: "a",
        explanation: "Comum no barbershop, gospel e pop a cappella.",
      },
    ],
    generators: [{ type: "motion-type", count: 3 }, { type: "voice-leading-error", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o contracanto.",
  application: {
    title: "Prática no laboratório de escrita",
    steps: [
      "Abra o exemplo 'A melodia passa para o tenor'.",
      "Escreva para o soprano um contracanto em 'uh' que se mova só nas notas longas da melodia.",
      "Revise com o motor e cante as duas linhas juntas.",
    ],
  },
};

export const lessonTensoes: Lesson = {
  id: "tensoes-e-extensoes",
  title: "Tensões e acordes estendidos para vozes",
  summary: "Sétimas, nonas, sus e add9 no arranjo vocal: como escolher, distribuir e preparar as tensões para que o coro afine.",
  levelId: "s3",
  unitId: "s3-har",
  status: "disponivel",
  prerequisites: ["setimas-resolucao", "voicings-posicoes"],
  estimatedMinutes: 65,
  competencies: ["harmonia-funcional", "acordes", "arranjo"],
  objectives: [
    "Identificar maj7, m7, 7, sus4 e add9 em cifras e em partitura.",
    "Distribuir tensões entre as vozes para que soem e sejam afináveis.",
    "Diferenciar o tratamento das tensões no coral tradicional e no estilo popular.",
  ],
  sections: [
    {
      title: "1. Do acorde de três notas ao acorde com cor",
      blocks: [
        {
          type: "paragraph",
          text: "No estilo tradicional, a sétima é uma dissonância que precisa ser preparada e resolvida. Na música popular — MPB, bossa, jazz vocal, gospel —, sétimas, nonas e suspensões são parte da 'cor' do acorde e podem soar sem resolver. Para o arranjador vocal, a pergunta não é só 'pode?', mas 'o coro consegue afinar?'. Uma nona soa linda quando está numa voz que chega a ela por grau conjunto ou que a mantém de um acorde anterior.",
        },
        {
          type: "table",
          caption: "Acordes com cor (em Dó)",
          headers: ["Cifra", "Notas", "Cor"],
          rows: [
            ["Cmaj7", "C E G B", "Suave, 'bossa'"],
            ["C6", "C E G A", "Doce, nostálgico"],
            ["Cadd9", "C E G D", "Aberto, moderno"],
            ["Csus4", "C F G", "Suspenso, pede resolução"],
            ["Dm7", "D F A C", "Macio, subdominante"],
            ["G7", "G B D F", "Tensão de dominante"],
          ],
        },
      ],
    },
    {
      title: "2. Distribuindo as tensões",
      blocks: [
        {
          type: "list",
          items: [
            "Fundamental no baixo; terça e sétima nas vozes internas (são as notas que definem o acorde).",
            "Com quatro vozes e um acorde de cinco notas, omita a quinta.",
            "Coloque a tensão (nona, sexta) numa voz que chega a ela por grau conjunto ou por nota comum.",
            "Evite tensão no baixo e evite a nona a um semitom de outra voz no grave: soa como erro.",
            "Num pad, mantenha as notas comuns entre acordes: o coro afina melhor quando poucas vozes mudam de cada vez.",
          ],
        },
        { type: "example", score: EXA.add9Sus, verdict: "correto", caption: "Csus4 → C, Cadd9 → Fadd9 (estilo popular)", commentary: "O Fá4 suspenso resolve no Mi4; depois, o Ré4 do contralto entra por grau conjunto (Dó4 → Ré4) e soa como nona de Dó; no último acorde, o Sol4 do soprano, alcançado por um salto pequeno de terça, é a nona de Fá. Tensões alcançadas por movimentos curtos são fáceis de afinar." },
        { type: "example", score: EXA.bossa, verdict: "correto", caption: "Dm7 – G7 – Cmaj7", commentary: "O Dó5 do soprano (sétima de Dm7) desce para Si4 (terça de G7) e permanece como sétima maior de Cmaj7: uma única nota percorre três funções." },
        { type: "example", score: EXA.add9Tradicional, verdict: "incorreto", caption: "Cadd9 no coral tradicional", commentary: "No estilo tradicional, o Ré5 não pertence ao acorde de Dó e não é preparado nem resolvido: o motor o aponta como dissonância sem tratamento." },
        { type: "listening", title: "Ouça a nota que muda de função", score: EXA.bossa, instructions: ["Ouça só o soprano: Dó – Si – Si.", "Ouça tudo: perceba como a mesma nota Si soa diferente sobre G7 e sobre Cmaj7."], focus: [["S"], ["S", "A", "T", "B"]] },
      ],
    },
  ],
  exercises: {
    id: "ex-tensoes",
    title: "Verificação: tensões",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["te-omitir"],
    staticItems: [
      {
        id: "te-omitir",
        kind: "choice",
        skill: "acordes",
        prompt: "Cmaj9 (C E G B D) a quatro vozes: que nota omitir?",
        options: [
          { id: "a", label: "A quinta (G)" },
          { id: "b", label: "A terça (E)" },
          { id: "c", label: "A sétima (B)" },
        ],
        correctOptionId: "a",
        explanation: "Terça e sétima definem o acorde; a nona é a cor desejada; a quinta é dispensável.",
      },
      {
        id: "te-sus",
        kind: "choice",
        skill: "acordes",
        prompt: "Quais as notas de Gsus4?",
        options: [
          { id: "a", label: "G C D" },
          { id: "b", label: "G B D" },
          { id: "c", label: "G B D F" },
        ],
        correctOptionId: "a",
        explanation: "A quarta (C) substitui a terça (B).",
      },
      {
        id: "te-afinacao",
        kind: "choice",
        skill: "arranjo",
        prompt: "Como ajudar o coro a afinar uma nona?",
        options: [
          { id: "a", label: "Fazer a voz chegar a ela por grau conjunto ou mantê-la como nota comum" },
          { id: "b", label: "Colocar a nona no baixo" },
          { id: "c", label: "Chegar a ela por salto de sétima" },
        ],
        correctOptionId: "a",
        explanation: "Movimentos pequenos e notas comuns são a base da afinação coral.",
      },
    ],
    generators: [{ type: "seventh-identification", count: 3 }, { type: "chord-identification", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a nota a omitir.",
  application: {
    title: "Prática no laboratório de escrita",
    steps: [
      "Abra o coral SATB de exemplo e mude o estilo para 'Popular a cappella'.",
      "Acrescente uma nona ao penúltimo acorde de tônica numa voz que chegue a ela por grau conjunto.",
      "Compare o resultado nos estilos tradicional e popular.",
    ],
  },
};
