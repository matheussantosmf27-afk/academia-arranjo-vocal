import { CHORALE_SATB_C } from "@/domain/music/examples";
import { EX } from "../examples";
import { EXA } from "../examples-arranjo";
import { EXD } from "../examples-didatica";
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
    {
      title: "4. Demonstração: desenhar a curva antes de escrever",
      blocks: [
        { type: "paragraph", text: "Problema: uma canção com forma A B A B C B (verso, refrão, verso, refrão, ponte, refrão), 3 minutos, coro SATB. Onde fica o clímax e como cada seção contribui?" },
        { type: "list", ordered: true, items: [
          "Marque o ponto culminante da melodia em cada seção. Se o refrão tem a nota mais aguda, ele é o candidato natural a clímax — mas qual dos três refrões?",
          "Escolha o último refrão como clímax e o primeiro verso como ponto mais baixo. A ponte (C) é o 'vale' antes da subida final.",
          "Para cada seção, decida qual dos cinco controles muda (dinâmica, densidade, registro, ritmo, harmonia). Mude um ou dois por vez, não todos.",
          "Desenhe a curva com números de 1 a 5: A=1, B=3, A=2, B=4, C=2, B=5. Ela sobe em ondas, recua antes de cada subida e termina no máximo.",
          "Confira o fim: depois do clímax, o arranjo termina forte (no tempo) ou pousa (ritardando, acorde longo)? A decisão depende da letra.",
        ] },
        { type: "table", caption: "A curva traduzida em recursos", headers: ["Seção", "Energia (1–5)", "O que muda em relação à anterior"], rows: [["A (verso 1)", "1", "uníssono ou pad; p"], ["B (refrão 1)", "3", "homofonia (densidade) e mf"], ["A (verso 2)", "2", "melodia nos tenores (cor nova), mp"], ["B (refrão 2)", "4", "baixo rítmico (ritmo) e f"], ["C (ponte)", "2", "só três vozes, harmonia nova (ii, vi), p"], ["B (refrão final)", "5", "meio tom acima, melodia em oitavas, ff"]] },
      ],
    },
    {
      title: "5. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Clímax no primeiro refrão", "o resto do arranjo soa como declínio", "reserve os recursos mais fortes para o fim"], ["Mudar todos os parâmetros a cada seção", "o ouvinte perde a referência", "mude um ou dois por vez"], ["Sem recuo antes do clímax", "o clímax não se destaca", "uma seção mais leve logo antes"], ["Repetir o refrão igual três vezes", "monotonia", "o mesmo, mas diferente: textura, naipe, registro"]] },
        { type: "list", items: ["Forma = repetição + contraste.", "A curva de energia cresce em ondas e tem um único clímax.", "Controles: dinâmica, densidade, registro, ritmo e harmonia."] },
        {
          type: "challenge",
          title: "Curva de energia de um hino estrófico",
          task: "Um hino tem quatro estrofes iguais (forma A A A A) e será cantado por SATB a cappella. Desenhe a curva de energia (1 a 5) e diga, para cada estrofe, qual controle muda e por quê.",
          constraints: ["A melodia é a mesma nas quatro estrofes.", "Use pelo menos três controles diferentes ao longo do arranjo.", "Um único clímax."],
          criteria: ["A curva não é uma reta: há pelo menos um recuo.", "Cada estrofe muda um ou dois controles em relação à anterior.", "O clímax coincide com a estrofe de texto mais intenso (ou com a última)."],
          hints: ["Numa forma estrófica, a única fonte de contraste é o arranjo: textura, naipe da melodia, dinâmica, harmonia, modulação.", "Uma estrofe em uníssono no começo deixa espaço para crescer depois.", "Muitos hinos guardam um descant para a última estrofe."],
          solution: {
            commentary: "Uma curva possível: 2 – 3 – 1 – 5. Estrofe 1 (2): uníssono de todo o coro, mf — apresenta a melodia. Estrofe 2 (3): homofonia a quatro vozes (densidade) — a harmonia aparece. Estrofe 3 (1): melodia nos contraltos com pad leve em 'uh', p (densidade e registro diminuem) — o recuo, ideal se o texto for mais introspectivo. Estrofe 4 (5): homofonia com descant dos sopranos e, se o grupo sustenta, meio tom acima (registro e harmonia), f. O clímax fica no fim e é preparado pelo recuo da estrofe 3.",
            alternatives: ["Se o texto mais intenso for o da estrofe 3, o clímax pode estar ali, e a estrofe 4 'pousa' em p, com final em fermata."],
          },
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
    {
      title: "5. Demonstração: o mesmo refrão em três versões",
      blocks: [
        { type: "paragraph", text: "O 'Hino à Alegria' aparece três vezes como refrão. Veja como cada técnica da seção 1 vira uma decisão concreta — e por que a ordem importa." },
        { type: "table", caption: "Três versões e o que cada uma acrescenta", headers: ["Versão", "Técnica", "Partitura do curso", "O que o ouvinte percebe"], rows: [["1", "homofonia simples", "harmonização em bloco (exemplo da aula de texturas)", "a canção, clara"], ["2", "troca de naipe + contracanto", "melodia no tenor com sopranos em notas longas", "a mesma canção, com outra cor"], ["3", "oitavas + modulação", "melodia em sopranos e tenores, meio tom acima", "o ponto mais alto do arranjo"]] },
        { type: "paragraph", text: "Repare que cada versão mantém a melodia reconhecível e muda só um ou dois parâmetros. A ordem segue a curva de energia: da versão mais simples para a mais cheia." },
        { type: "example", score: EXA.melodiaNoTenor, verdict: "correto", caption: "Versão 2: a melodia no tenor", commentary: "Mesmo material, cor diferente. Sopranos e contraltos ficam em notas longas, acima e mais suaves, para não cobrir a melodia." },
      ],
    },
    {
      title: "6. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Variar tanto que a melodia some", "o refrão deixa de ser reconhecido", "a melodia é intocável; varie o que está em volta"], ["Contracanto que se move junto com a melodia", "duas linhas competindo", "mova-o nas pausas e notas longas"], ["Modulação sem preparação", "o coro desafina na entrada", "interlúdio curto terminando na nova dominante"], ["Final sem relação com a curva", "o arranjo 'para' em vez de terminar", "escolha o final pela energia acumulada"]] },
        { type: "list", items: ["O mesmo, mas diferente: varie textura, naipe, harmonia, registro, densidade.", "Contracanto se move quando a melodia para.", "O final confirma a curva: forte se o arranjo cresceu até o fim; pousado se o clímax veio antes."] },
        {
          type: "challenge",
          title: "Três refrões, cinco técnicas",
          task: "Planeje três versões de um refrão de oito compassos para SATB, usando ao todo pelo menos cinco técnicas diferentes da caixa de ferramentas, e escolha o final.",
          constraints: ["A melodia continua reconhecível nas três versões.", "Cada versão acrescenta algo em relação à anterior.", "Indique o tipo de final (repetição lenta, tag, suspenso ou abrupto)."],
          criteria: ["Cinco técnicas diferentes, cada uma nomeada.", "A energia cresce de uma versão para a outra (ou há um recuo justificado).", "O final combina com a curva."],
          hints: ["Comece pela versão 3 (a mais cheia) e tire recursos para chegar às versões 1 e 2.", "Rearmonização e redução também contam como técnicas.", "Um tag (a frase final repetida com harmonia mais rica) combina com um arranjo que cresceu até o fim."],
          solution: {
            commentary: "Uma solução: Versão 1 — homofonia simples, mf (técnica: nova textura em relação ao verso). Versão 2 — redução nos quatro primeiros compassos (só contraltos e tenores), depois melodia nos tenores com contracanto dos sopranos em 'uh' (redução, troca de naipe, contracanto); dois acordes rearmonizados (vi no lugar de I, ii no lugar de IV). Versão 3 — modulação meio tom acima, melodia em oitavas (sopranos + tenores), baixo rítmico, f. Final: tag — a última frase repetida duas vezes, a segunda com o IV trocado por ii7 e a cadência alargada (ritardando). Técnicas: nova textura, redução, troca de naipe, contracanto, rearmonização, modulação.",
            alternatives: ["Se o clímax do arranjo estiver numa ponte antes do último refrão, a versão 3 pode ser mais contida e o final, suspenso em pp."],
          },
        },
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
    generators: [{ type: "ear-comparison", count: 2, topics: ["melodia-interna", "contracanto"] }, { type: "motion-type", count: 3 }, { type: "voice-leading-error", count: 2 }],
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
    {
      title: "3. Demonstração: de tríades a acordes com cor",
      blocks: [
        { type: "paragraph", text: "Problema: uma progressão I – vi – ii – V – I em tríades (estilo popular) soa 'escolar'. Como acrescentar sétimas e nonas sem tornar o trecho difícil de afinar?" },
        { type: "list", ordered: true, items: [
          "Identifique as notas comuns entre acordes vizinhos: elas são as candidatas a virar tensão sem que ninguém precise saltar.",
          "Transforme uma nota que se repete em sétima: no I → vi (C → Am), o G do soprano continua e passa a ser a sétima de Am7.",
          "Leve as vozes internas por grau até as notas de cor: B (sétima maior do I) a partir de C, F (sétima do V7) mantida do ii.",
          "Mantenha fundamental no baixo e terça presente em todos os acordes; omita a quinta se faltar voz.",
          "Ouça no estilo popular e confira que nenhuma tensão chega por salto grande.",
        ] },
        { type: "callout", tone: "dica", title: "Decisões do arranjador", text: "Uma nota que 'muda de função' sem se mover (fundamental → sétima → nona) é o recurso mais afinável do arranjo popular: o cantor mantém a nota e o acorde muda por baixo. Se o seu coro for inseguro, use só esse tipo de tensão." },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Nona a um semitom de outra voz no grave", "soa como erro", "nona no agudo, longe de clusters graves"], ["Tensão alcançada por salto", "desafina", "chegue por grau ou nota comum"], ["Omitir a terça para caber a tensão", "acorde ambíguo", "omita a quinta"], ["Tensões no estilo tradicional sem tratamento", "dissonância sem preparação", "no coral tradicional, sétimas preparadas e resolvidas"]] },
        { type: "list", items: ["No popular, sétimas e nonas são cor.", "Fundamental no baixo, terça e sétima nas vozes internas, tensão no agudo.", "Notas comuns e graus conjuntos tornam as tensões afináveis."] },
        {
          type: "challenge",
          title: "Acrescente a cor sem saltos",
          task: "A progressão C – Am – Dm – G – C está escrita em tríades (estilo popular). Reescreva-a como Cmaj7 – Am7 – Dm7 – G7 – Cmaj7, mantendo o baixo e o soprano G4 sempre que possível e movendo as vozes internas só por grau ou nota comum.",
          start: EXD.tensStart,
          revises: true,
          constraints: ["Baixo igual ao da partitura dada.", "Cada voz se move no máximo um grau por acorde.", "Estilo popular a cappella."],
          criteria: ["Cada acorde tem fundamental, terça e sétima.", "Nenhuma voz salta.", "O motor, no estilo popular, só registra observações informativas."],
          hints: ["No Cmaj7, a sétima é B: o tenor pode começar em B3.", "No Am7, a sétima é G — já está no soprano. O tenor sobe B3 → C4 (terça de Am).", "No Dm7, a sétima é C: o tenor mantém C4. No G7, a sétima F fica no contralto, que já cantava F4 no Dm7."],
          solution: {
            score: EXD.tensSol,
            commentary: "Soprano G4 – G4 | A4 – G4 | G4; contralto E4 – E4 | F4 – F4 | E4; tenor B3 – C4 | C4 – B3 | B3; baixo C3 – A2 | D3 – G2 | C3. O G4 do soprano é quinta do Cmaj7 e sétima do Am7; o C4 do tenor é terça do Am7 e sétima do Dm7; o F4 do contralto é terça do Dm7 e sétima do G7, e desce para E4. Ninguém salta: as cores vêm de notas que ficam paradas enquanto o baixo anda. O B3 final (sétima maior do I) não 'resolve' — no estilo popular, é cor; o motor registra só uma informação sobre a sensível.",
            alternatives: ["Terminar em C6 (tenor B3 → A3) dá um final mais 'nostálgico'; o motor cifra esse acorde como Am7/C (vi⁶₅), que tem as mesmas notas."],
          },
        },
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
    generators: [{ type: "ear-comparison", count: 1, topics: ["cores"] }, { type: "seventh-identification", count: 1, earOnly: true }, { type: "seventh-identification", count: 3 }, { type: "chord-identification", count: 2 }],
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
