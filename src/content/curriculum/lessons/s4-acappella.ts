import { EXA2 } from "../examples-acappella";
import type { ContentBlock, Lesson } from "../types";

/**
 * EST406 — Grupo vocal a cappella gospel. Técnicas levantadas no estudo de
 * partituras de quartetos e grupos a cappella (gospel brasileiro e
 * norte-americano); todos os exemplos são originais.
 */

const ESTUDO: ContentBlock = {
  type: "callout",
  tone: "dica",
  title: "Para ouvir e estudar",
  text: "Ministério Vox (quarteto masculino; discos Vox Acapella, Acapella Vol. 2, com beatbox, e Acapella Vol. 3, com arranjos de Samuel Lóia), Gaither Vocal Band (álbum A Cappella), GLAD, Take 6, Arautos do Rei e Quarteto Ministry. Há partituras de quartetos para estudo no acervo 4tons.com.br. Analise e transcreva trechos para você, mas não redistribua: os arranjos têm direitos autorais.",
};

export const lessonAcappellaSolistas: Lesson = {
  id: "acappella-solistas-dueto",
  title: "Revezamento de solistas e dueto",
  summary: "A melodia passeia pelo grupo: solo de cada voz com apoio em 'uh', dueto em terças e sextas, melodia dobrada em oitavas e a entrada do quarteto.",
  levelId: "s4",
  unitId: "s4-acp",
  status: "disponivel",
  prerequisites: ["quarteto-masculino"],
  estimatedMinutes: 50,
  competencies: ["arranjo", "escrita-ttbb"],
  objectives: [
    "Planejar quem canta a melodia em cada seção do arranjo.",
    "Escrever um dueto em terças e sextas e uma melodia dobrada em oitavas.",
    "Transpor a melodia para a região confortável de cada solista.",
  ],
  sections: [
    {
      title: "1. Quem canta a melodia?",
      blocks: [
        { type: "paragraph", text: "Num grupo a cappella, a melodia não precisa ficar sempre com o lead. Revezar solistas (barítono na primeira estrofe, tenor na segunda, o quarteto no refrão) muda o timbre a cada seção e dá ao ouvinte a sensação de que a música avança, sem mudar uma nota da harmonia." },
        {
          type: "table",
          caption: "Um plano típico de revezamento",
          headers: ["Seção", "Melodia", "As outras vozes"],
          rows: [
            ["Estrofe 1", "Barítono (solo)", "Baixo em 'uh' ou em silêncio"],
            ["Estrofe 2", "Tenor II, em dueto com o barítono", "Terças e sextas"],
            ["Refrão", "Quarteto em bloco", "Todos com o texto"],
            ["Final", "Tenor I", "Pad em 'uh' e tag"],
          ],
        },
        { type: "example", score: EXA2.soloBaritono, verdict: "correto", caption: "Solo do barítono, quarteto no refrão", commentary: "Compassos 1–2: o barítono canta a melodia em Ré maior, na região dele (Ré3–Lá3), sobre o 'uh' do baixo. Compassos 3–4: o quarteto entra em bloco em 'glória'. O motor só registra a sensível do Tenor II descendo no fim (informação)." },
        { type: "example", score: EXA2.soloAgudoDemais, verdict: "incorreto", caption: "Solo do barítono no registro do tenor", commentary: "A mesma ideia escrita alto demais: o Fá4 passa da extensão do barítono (Mi4). Ao trocar de solista, transponha a melodia ou troque a tonalidade da seção." },
        { type: "listening", title: "Siga a melodia", score: EXA2.soloBaritono, instructions: ["Ouça só o barítono.", "Ouça o quarteto inteiro e note a entrada no compasso 3."], focus: [["B1"], ["T1", "T2", "B1", "B2"]] },
      ],
    },
    {
      title: "2. Dueto e melodia dobrada",
      blocks: [
        { type: "paragraph", text: "Antes de o quarteto inteiro entrar, duas vozes bastam. Em terças e sextas paralelas, o dueto soa cheio e cantável. Dobrada em oitavas, a melodia ganha peso sem virar harmonia: é o 'ten. 2 / bar.' que aparece em partituras de quarteto." },
        { type: "example", score: EXA2.duetoTercas, verdict: "correto", caption: "Lead e barítono em terças", commentary: "O barítono acompanha o lead uma terça abaixo e termina numa sexta (Sol3 sobre Si2): consonâncias imperfeitas o tempo todo." },
        { type: "example", score: EXA2.melodiaEmOitavas, verdict: "observacao", caption: "Melodia em oitavas (lead e baixo)", commentary: "O motor sugere evitar oitavas paralelas: aqui elas são o dobramento intencional da melodia. Use em trechos curtos e registre a intenção." },
        { type: "listening", title: "Terças contra oitavas", score: EXA2.duetoTercas, instructions: ["Ouça o dueto em terças.", "Compare mentalmente com a versão em oitavas: qual soa mais 'harmonia'?"], focus: [["T2", "B1"]] },
        ESTUDO,
      ],
    },
    {
      title: "3. Demonstração: transpor a melodia para cada solista",
      blocks: [
        { type: "list", ordered: true, items: [
          "Meça a melodia: nota mais grave, mais aguda e nota média (por exemplo, D4–B4, média G4, em Sol maior).",
          "Compare com a tessitura de cada solista (TTBB): Tenor I G3–F4, lead (Tenor II) E3–D4, barítono B2–C4, baixo G2–A3.",
          "Para o barítono, uma oitava abaixo em Sol (D3–B3, média G3) cabe bem; para o tenor, uma oitava abaixo em Lá (E3–C♯4) fica mais brilhante.",
          "Se a seção do barítono precisa de outra tonalidade, mude a tonalidade da seção inteira (com uma modulação preparada), não só a melodia.",
          "Revise a harmonia em volta: com a melodia mais grave, as outras vozes sobem ou descem para não cobri-la.",
        ] },
        { type: "callout", tone: "dica", title: "Decisões do arranjador", text: "Um dueto em terças funciona melhor quando a voz de baixo do dueto é a mais estável do grupo: o ouvido segue a de cima (a melodia) e a de baixo dá o chão. Para trocar a melodia de solista sem mudar a tonalidade, escolha um solista cuja tessitura contenha a melodia na mesma oitava ou uma oitava abaixo." },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Trocar o solista sem transpor", "nota fora da extensão", "confira a tessitura de cada solista"], ["Dueto em 5ªs ou 8ªs", "som oco, perda de independência", "3ªs e 6ªs"], ["Melodia em oitavas por trechos longos", "perde-se uma voz da harmonia", "oitavas em trechos curtos e intencionais"], ["Backing cobrindo o solista grave", "melodia inaudível", "backing acima e mais suave"]] },
        { type: "list", items: ["Revezar solistas muda o timbre sem mudar a harmonia.", "Dueto em 3ªs e 6ªs; oitavas como reforço curto.", "Cada solista na sua tessitura."] },
        {
          type: "challenge",
          title: "Plano de solistas",
          task: "Uma canção em Ré maior tem melodia de A3 a F♯4 (sons reais, pensando em vozes masculinas) e forma Estrofe 1 – Refrão – Estrofe 2 – Refrão – Final. Planeje quem canta a melodia em cada seção num quarteto masculino e em que oitava/tonalidade, com o acompanhamento das outras vozes.",
          constraints: ["Tessituras (TTBB): Tenor I G3–F4, lead (Tenor II) E3–D4, barítono B2–C4, baixo G2–A3.", "Pelo menos três solistas diferentes ao longo da canção.", "Se mudar a tonalidade, indique como modula."],
          criteria: ["Cada solista canta dentro da sua tessitura.", "O acompanhamento de cada seção não cobre o solista.", "As mudanças de solista seguem a curva de energia."],
          hints: ["Compare o ponto mais agudo da melodia (F♯4) com o topo das tessituras: nenhum solista masculino amador fica confortável ali.", "Em Lá maior (uma 4ª abaixo), a melodia fica entre E3 e C♯4: boa para o lead e para o tenor.", "Uma oitava abaixo, a melodia sairia da tessitura do barítono; ele pode participar em dueto, uma 3ª abaixo do lead."],
          solution: {
            commentary: "A melodia em Ré (A3–F♯4) passa da tessitura de todos os solistas masculinos amadores no agudo (F♯4 > E4). Solução: arranjo em Lá maior (melodia E3–C♯4). Estrofe 1 — lead, com pad em 'uh' de tenor, barítono e baixo. Refrão — quarteto em bloco, lead na melodia, tenor acima. Estrofe 2 — tenor com a melodia (E3–C♯4 cabe; mais brilhante que o lead), lead e barítono em 'doo' rítmico. Refrão — bloco, com a melodia dobrada pelo tenor uma terça acima nos finais de frase. Final — tag com modulação de meio tom (Lá → Si♭, preparada por F7) e o lead sustentando a nota longa. O barítono não recebe a melodia inteira porque, uma oitava abaixo (E2–C♯3), ela sairia da tessitura dele; ele pode cantar uma frase em dueto com o lead (uma 3ª abaixo).",
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-acappella-solistas",
    title: "Verificação: solistas e dueto",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["as-transpor"],
    staticItems: [
      { id: "as-transpor", kind: "choice", skill: "arranjo", prompt: "A melodia do lead fica aguda demais quando passa para o barítono. O que fazer?", options: [{ id: "a", label: "Transpor a melodia (ou a seção) para a região do barítono" }, { id: "b", label: "Manter: o barítono usa falsete" }, { id: "c", label: "Dar a melodia ao baixo" }], correctOptionId: "a", explanation: "Cada solista tem sua região; o arranjo se adapta à voz, não o contrário." },
      { id: "as-dueto", kind: "choice", skill: "conducao-de-vozes", prompt: "Que intervalos fazem um dueto soar cheio e cantável?", options: [{ id: "a", label: "Terças e sextas" }, { id: "b", label: "Quintas e oitavas paralelas" }, { id: "c", label: "Segundas e sétimas" }], correctOptionId: "a", explanation: "Consonâncias imperfeitas podem andar em paralelo sem perder a independência." },
      { id: "as-revezar", kind: "choice", skill: "arranjo", prompt: "Por que revezar solistas entre as estrofes?", options: [{ id: "a", label: "Muda o timbre a cada seção e faz a música avançar" }, { id: "b", label: "Para cada cantor descansar a voz o arranjo inteiro" }, { id: "c", label: "Porque a harmonia muda" }], correctOptionId: "a", explanation: "A harmonia pode ser a mesma; o que muda é a cor da voz que conduz." },
    ],
    generators: [{ type: "range-check", count: 3 }, { type: "ttbb-voicing", count: 2 }, { type: "interval-identification", count: 2, maxNumber: 8 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a transposição para o solista.",
  application: {
    title: "Aplicação no Estúdio",
    steps: ["Escreva a mesma frase em três versões TTBB: solo do barítono, dueto lead–barítono em terças e quarteto em bloco.", "Ajuste a tonalidade de cada versão para a região do solista.", "Ouça com a mesa de vozes e escolha a ordem das seções."],
  },
};

export const lessonAcappellaTexturas: Lesson = {
  id: "acappella-texturas",
  title: "Texturas do grupo: uníssono, bloco, eco e texto contra 'uh'",
  summary: "Estrofe em uníssono e refrão em bloco, eco entre vozes, texto numa parte e 'uh' na outra, e a antecipação que dá balanço.",
  levelId: "s4",
  unitId: "s4-acp",
  status: "disponivel",
  prerequisites: ["acappella-solistas-dueto"],
  estimatedMinutes: 55,
  competencies: ["arranjo", "texto-e-prosodia"],
  objectives: [
    "Contrastar estrofe em uníssono e refrão em bloco homorrítmico.",
    "Escrever um eco entre duas vozes sem perder o texto.",
    "Dividir o grupo entre texto e sílabas de apoio e usar antecipações.",
  ],
  sections: [
    {
      title: "1. Estrofe em uníssono, refrão em bloco",
      blocks: [
        { type: "paragraph", text: "Muitos arranjos de grupos jovens e corais de igreja seguem um plano simples e eficiente: a estrofe é cantada por todos na melodia (o texto se entende bem) e o refrão abre em quatro vozes no mesmo ritmo e texto (o bloco), em geral com soprano e contralto em terças e tenor e baixo sustentando a harmonia." },
        { type: "example", score: EXA2.estrofeUnissono, verdict: "observacao", caption: "Estrofe: todos na melodia", commentary: "Sopranos e contraltos em uníssono, tenores e baixos uma e duas oitavas abaixo. O motor sugere evitar oitavas e uníssonos paralelos: aqui é a textura escolhida." },
        { type: "example", score: EXA2.refraoBloco, verdict: "correto", caption: "Refrão: o bloco", commentary: "Todas as vozes com o mesmo ritmo e texto; o baixo desce Sol – Mi – Dó, sobe a Ré e cadencia em Sol, quase sempre em movimento contrário ao soprano." },
        { type: "listening", title: "Do uníssono ao bloco", score: EXA2.refraoBloco, instructions: ["Ouça soprano e contralto juntos.", "Ouça as quatro vozes."], focus: [["S", "A"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "2. Eco, texto contra 'uh' e antecipação",
      blocks: [
        { type: "paragraph", text: "O eco é uma imitação curta: uma voz repete a frase da outra um tempo depois. Funciona melhor com frases curtas e harmonia parada, para que as duas camadas de texto não se atrapalhem." },
        { type: "example", score: EXA2.eco, verdict: "correto", caption: "O barítono ecoa o lead", commentary: "O barítono repete 'vem, Senhor' um tempo depois, uma terça ou sexta abaixo; o baixo segura as fundamentais." },
        { type: "example", score: EXA2.textoContraUh, verdict: "correto", caption: "Tenores com texto, barítono e baixo em 'uh'", commentary: "As duas vozes de cima dizem o texto em terças; as de baixo viram 'colchão' em 'uh'. O texto fica claro e o acorde, completo." },
        { type: "example", score: EXA2.antecipacao, verdict: "correto", caption: "Antecipação ('push')", commentary: "O acorde de Dó chega na última colcheia do compasso 1, ligado ao tempo forte do compasso 2: é a síncope que dá balanço ao gospel e ao pop." },
        { type: "listening", title: "Ouça o eco", score: EXA2.eco, instructions: ["Ouça só o lead.", "Ouça lead e barítono juntos."], focus: [["T2"], ["T2", "B1"]] },
        ESTUDO,
      ],
    },
    {
      title: "3. Demonstração: planejar texturas para uma canção de igreja",
      blocks: [
        { type: "list", ordered: true, items: [
          "Estrofe 1: todos na melodia (uníssono e oitavas). O texto se entende, o grupo afina junto, a canção é apresentada.",
          "Refrão 1: bloco homorrítmico a quatro vozes — soprano e contralto em 3ªs, tenor e baixo com a harmonia.",
          "Estrofe 2: texto contra 'uh' — duas vozes de cima com o texto em 3ªs, duas de baixo em pad.",
          "Refrão 2: bloco com eco — o barítono (ou o contralto) repete o fim de cada frase um tempo depois.",
          "Antes do refrão final: uma antecipação (push) no acorde de chegada dá o impulso rítmico.",
        ] },
        { type: "callout", tone: "dica", title: "Decisões do arranjador", text: "O eco funciona com frases curtas e harmonia parada; com texto longo ou harmonia mudando a cada tempo, as duas camadas de palavras se atrapalham. A antecipação precisa estar escrita com ligadura (colcheia ligada ao tempo seguinte): o grupo inteiro antecipa junto." },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Eco sobre frases longas", "texto embaralhado", "eco só no fim da frase"], ["Pad em 'uh' forte sob o texto", "o texto some", "pad p, vogal fechada"], ["Antecipação em uma voz só", "parece erro de ritmo", "antecipação do bloco inteiro"], ["Mesma textura nos dois refrões", "monotonia", "acrescente eco, dinâmica ou registro"]] },
        { type: "list", items: ["Uníssono para apresentar, bloco para afirmar.", "Eco e texto contra 'uh' dividem o grupo em camadas.", "A antecipação dá balanço ao gospel e ao pop."] },
        {
          type: "challenge",
          title: "Texturas para quatro seções",
          task: "Para uma canção com Estrofe 1 – Refrão – Estrofe 2 – Refrão, escolha a textura de cada seção entre as desta aula (uníssono, bloco, eco, texto contra 'uh', antecipação) e escreva, para um refrão, um exemplo de eco: frase do lead, palavra ecoada e voz que ecoa.",
          constraints: ["Quatro texturas diferentes no total.", "O eco usa no máximo três sílabas.", "A melodia sempre audível."],
          criteria: ["Cada seção muda pelo menos uma camada em relação à anterior.", "O eco cai no espaço em que o lead sustenta ou pausa.", "A voz que ecoa está em registro diferente do lead."],
          hints: ["Estrofe 1 em uníssono é a escolha mais segura para começar.", "No refrão 2, o eco pode repetir a última palavra da frase ('Senhor… Senhor').", "O barítono ecoa uma 3ª ou 6ª abaixo do lead."],
          solution: {
            commentary: "Estrofe 1: uníssono e oitavas (todos). Refrão 1: bloco homorrítmico a quatro vozes. Estrofe 2: tenores com o texto em 3ªs, barítono e baixo em 'uh'. Refrão 2: bloco com eco do barítono e antecipação no acorde de chegada da última frase. Exemplo de eco: o lead canta 'Vem, Senhor, me guiar' e sustenta 'guiar'; um tempo depois, o barítono responde 'me guiar' uma 6ª abaixo, enquanto o baixo segura a fundamental.",
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-acappella-texturas",
    title: "Verificação: texturas do grupo",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["at-bloco"],
    staticItems: [
      { id: "at-bloco", kind: "choice", skill: "arranjo", prompt: "O que caracteriza o refrão 'em bloco'?", options: [{ id: "a", label: "Todas as vozes com o mesmo ritmo e o mesmo texto, em harmonia" }, { id: "b", label: "Todas as vozes na mesma nota" }, { id: "c", label: "Cada voz com um texto diferente" }], correctOptionId: "a", explanation: "Bloco é homorritmia: harmonia vertical com o texto junto." },
      { id: "at-eco", kind: "choice", skill: "arranjo", prompt: "Quando o eco entre duas vozes funciona melhor?", options: [{ id: "a", label: "Com frases curtas e harmonia parada" }, { id: "b", label: "Com frases longas e muitas trocas de acorde" }, { id: "c", label: "Quando as vozes cantam textos diferentes" }], correctOptionId: "a", explanation: "Frases curtas evitam que as duas camadas de texto se embaralhem." },
      { id: "at-push", kind: "choice", skill: "arranjo", prompt: "O que é a antecipação ('push')?", options: [{ id: "a", label: "O acorde novo chega um pouco antes do tempo forte, ligado a ele" }, { id: "b", label: "Acelerar o andamento" }, { id: "c", label: "Cantar a nota mais forte" }], correctOptionId: "a", explanation: "É uma síncope harmônica: dá balanço sem mudar o andamento." },
    ],
    generators: [{ type: "motion-type", count: 3 }, { type: "ttbb-voicing", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a definição de bloco.",
  application: {
    title: "Aplicação no Estúdio",
    steps: ["Escreva a estrofe de uma canção em uníssono e o refrão em bloco.", "Acrescente um eco de uma voz num trecho curto.", "Use uma antecipação na troca de acorde mais importante do refrão."],
  },
};

export const lessonAcappellaVocalBand: Lesson = {
  id: "acappella-vocal-band",
  title: "Vocal band: riffs, baixo em ostinato e beatbox",
  summary: "Sílabas rítmicas em terças, o baixo que repete um padrão com swing, a melodia em outra voz e onde entra a percussão vocal.",
  levelId: "s4",
  unitId: "s4-acp",
  status: "disponivel",
  prerequisites: ["acappella-texturas", "baixo-e-percussao-vocal"],
  estimatedMinutes: 55,
  competencies: ["arranjo", "escrita-ttbb"],
  objectives: [
    "Escrever um riff rítmico em duas vozes com sílabas.",
    "Criar um baixo em ostinato que segure a harmonia e o ritmo.",
    "Distribuir melodia, riff, baixo e percussão vocal num grupo de quatro ou cinco.",
  ],
  sections: [
    {
      title: "1. O riff e a melodia",
      blocks: [
        { type: "paragraph", text: "Num arranjo de vocal band, duas vozes fazem o papel da guitarra ou do teclado com um riff curto ('bop bop ba da bop'), o baixo sustenta as fundamentais e a melodia fica numa terceira voz. O riff precisa de consoantes de ataque e de pausas: sem respiro, vira ruído." },
        { type: "example", score: EXA2.riffBop, verdict: "correto", caption: "Riff nos tenores, melodia no barítono", commentary: "Tenores em terças, sempre começando no contratempo; o barítono canta a melodia em notas longas por baixo; o baixo segura Sol e Dó em 'bm'." },
        { type: "example", score: EXA2.riffGrave, verdict: "observacao", caption: "O riff levado para o grave", commentary: "As notas estão dentro das extensões, mas a terça maior Sol2–Si2 fica abaixo do limite grave de intervalo (Si♭2 para a nota de baixo) e embola; além disso, o espaço entre lead e barítono passa de uma oitava. Riffs em terças funcionam no médio e no agudo." },
        { type: "listening", title: "Separe as camadas", score: EXA2.riffBop, instructions: ["Ouça só os tenores (o riff).", "Ouça barítono e baixo (melodia e chão).", "Ouça tudo."], focus: [["T1", "T2"], ["B1", "B2"], ["T1", "T2", "B1", "B2"]] },
      ],
    },
    {
      title: "2. Baixo em ostinato e percussão vocal",
      blocks: [
        { type: "paragraph", text: "O baixo pode carregar o ritmo sozinho: um padrão curto ('do do do') que arpeja o acorde e se repete a cada compasso, mudando só de altura quando a harmonia muda. Sobre ele, o trio sustenta acordes em 'ooo' ou canta o texto em bloco." },
        { type: "example", score: EXA2.baixoOstinato, verdict: "correto", caption: "Ostinato do baixo sob o trio", commentary: "O padrão (fundamental, oitava, quinta e sexta do acorde) se repete em Sol e em Dó. As notas de passagem do baixo aparecem como informação no motor." },
        { type: "paragraph", text: "Em grupos com percussão vocal, como no Acapella Vol. 2 do Ministério Vox, um cantor assume o beatbox (bumbo, caixa, chimbal com a boca) e o baixo fica livre para a linha melódica. O motor não lê percussão: escreva o beatbox numa linha à parte, com sons e ritmo, fora da partitura analisada." },
        { type: "callout", tone: "atencao", title: "Quem respira?", text: "Riff e ostinato cansam: alterne quem faz o padrão entre as seções e deixe o beatbox parar nos pontos de respiração do grupo." },
        ESTUDO,
      ],
    },
    {
      title: "3. Demonstração: montar a banda vocal camada por camada",
      blocks: [
        { type: "list", ordered: true, items: [
          "Defina o groove e o andamento (por exemplo, pop a 96 bpm) e o padrão do baixo: fundamental e oitava, ou um ostinato de quatro notas por compasso.",
          "Escreva o riff em duas vozes, em 3ªs, começando no contratempo e deixando pausas para a melodia respirar.",
          "Coloque a melodia numa voz de registro diferente do riff (abaixo ou acima dele).",
          "Se houver beatbox, escreva-o numa linha à parte (estilo, bumbo/caixa/chimbal, viradas) e deixe o baixo livre para a linha melódica.",
          "Equilibre: o riff mais suave quando a melodia canta; mais presente quando ela para.",
        ] },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Riff sem pausas", "ruído e cansaço", "pausas e consoantes de ataque"], ["Riff em 3ªs no grave", "embola (limite grave)", "riff no registro médio"], ["Ostinato que não muda com a harmonia", "choques", "mesmo desenho, nova altura"], ["Beatbox misturado na partitura harmônica", "leitura confusa", "linha à parte"]] },
        { type: "list", items: ["Riff (guitarra/teclado), baixo (ostinato), melodia e percussão: quatro papéis.", "Cada camada em seu registro.", "Alterne quem faz o padrão para dar respiro."] },
        {
          type: "challenge",
          title: "Uma banda vocal de dois compassos",
          task: "Planeje dois compassos (G – C, 4/4, pop) para quatro vozes: baixo em ostinato, riff em 3ªs em duas vozes e melodia. Escreva as notas e sílabas do baixo e do riff e diga onde a melodia fica.",
          constraints: ["Baixo entre G2 e D3.", "Riff começando no contratempo, com pelo menos uma pausa por compasso.", "Riff no registro médio (acima de C3 na voz de baixo do riff)."],
          criteria: ["O ostinato mantém o desenho e muda de altura com o acorde.", "As 3ªs do riff pertencem ao acorde de cada compasso.", "A melodia fica em registro diferente do riff."],
          hints: ["Para ficar entre G2 e D3, o ostinato em Sol pode ser G2 – B2 – D3 – B2 (fundamental, terça, quinta, terça).", "No acorde de Dó, mantenha a região: C3 – G2 – A2 – G2 (fundamental, quinta abaixo, sexta, quinta).", "Riff sobre G: B3/D4 com uma passagem A3/C4; sobre C: C4/E4 com uma passagem B3/D4."],
          solution: {
            commentary: "Baixo ('dm'): compasso 1 G2 – B2 – D3 – B2; compasso 2 C3 – G2 – A2 – G2 (mesmo ritmo, desenho adaptado ao acorde e à região pedida). Riff ('bop ba-da'), em 3ªs, nos tenores: compasso 1 pausa de colcheia, B3/D4 – B3/D4 – A3/C4 (passagem) – B3/D4 e pausa no 4º tempo; compasso 2 pausa, C4/E4 – C4/E4 – B3/D4 – C4/E4 e pausa. Melodia: no barítono, em notas longas abaixo do riff (G3, depois E3), ou num solista agudo acima dele.",
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-acappella-vocal-band",
    title: "Verificação: vocal band",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["vb-riff"],
    staticItems: [
      { id: "vb-riff", kind: "choice", skill: "arranjo", prompt: "Onde um riff em terças funciona melhor?", options: [{ id: "a", label: "Nas vozes médias e agudas, com pausas e consoantes de ataque" }, { id: "b", label: "Em barítono e baixo, no grave" }, { id: "c", label: "Em todas as vozes ao mesmo tempo" }], correctOptionId: "a", explanation: "Terças no grave embolam; o riff precisa de ar e de ataque." },
      { id: "vb-ostinato", kind: "choice", skill: "arranjo", prompt: "O que é um baixo em ostinato?", options: [{ id: "a", label: "Um padrão curto que se repete, mudando de altura com a harmonia" }, { id: "b", label: "Uma nota longa sem mudança" }, { id: "c", label: "O baixo cantando a melodia" }], correctOptionId: "a", explanation: "O ostinato carrega o ritmo e a harmonia ao mesmo tempo." },
      { id: "vb-beatbox", kind: "choice", skill: "arranjo", prompt: "Num grupo com beatbox, o que muda para o baixo?", options: [{ id: "a", label: "Fica livre para uma linha mais melódica, sem marcar o tempo sozinho" }, { id: "b", label: "Deixa de cantar" }, { id: "c", label: "Passa a cantar a melodia principal" }], correctOptionId: "a", explanation: "Com a percussão vocal marcando o tempo, o baixo pode andar mais." },
    ],
    generators: [{ type: "chord-identification", count: 3 }, { type: "motion-type", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo onde colocar o riff.",
  application: {
    title: "Aplicação no Estúdio",
    steps: ["Escreva dois compassos de riff em terças nos tenores.", "Ponha a melodia no barítono e um ostinato no baixo.", "Toque em loop na mesa de vozes e confira se a melodia continua clara."],
  },
};

export const lessonAcappellaBlocos: Lesson = {
  id: "acappella-blocos-cromaticos",
  title: "Blocos paralelos, diminuto de passagem e clichê de linha",
  summary: "Acordes que deslizam juntos por semitom, o diminuto que liga dois graus e a linha interna que desce por semitons sobre o mesmo acorde.",
  levelId: "s4",
  unitId: "s4-acp",
  status: "disponivel",
  prerequisites: ["acappella-texturas", "harmonia-cromatica-moderna"],
  estimatedMinutes: 55,
  competencies: ["harmonia-funcional", "conducao-de-vozes", "escrita-ttbb"],
  objectives: [
    "Escrever um diminuto de passagem com baixo cromático.",
    "Usar blocos paralelos (planing) como efeito, sabendo o que o motor aponta.",
    "Escrever um clichê de linha numa voz interna sem dobrá-lo no baixo.",
  ],
  sections: [
    {
      title: "1. Diminuto de passagem e planing",
      blocks: [
        { type: "paragraph", text: "Entre dois acordes a um tom de distância (Sol e Lá menor), um diminuto no semitom do meio (Sol♯°7) faz o baixo subir por semitons e as vozes de cima mudarem pouco. É o cromatismo mais usado nos quartetos gospel." },
        { type: "example", score: EXA2.diminutoPassagem, verdict: "correto", caption: "G – G♯°7 – Am – D7 – G", commentary: "Baixo Sol – Sol♯ – Lá – Ré – Sol; o barítono sobe para Fá (a sétima do diminuto) e desce para Mi." },
        { type: "paragraph", text: "No planing, o trio desliza com a mesma forma de acorde por semitons, como um bloco. O efeito é de cor, não de função: as quintas paralelas são a própria ideia. Use em trechos curtos, chegando num acorde funcional." },
        { type: "example", score: EXA2.planing, verdict: "observacao", caption: "Fá – Mi – Mi♭ – Ré, até o Sol", commentary: "O motor sugere evitar as quintas paralelas entre tenor e barítono: aqui são intencionais. O bloco desce até Ré maior (o V) e resolve em Sol com o baixo." },
        { type: "listening", title: "O bloco que desliza", score: EXA2.planing, instructions: ["Ouça o trio sozinho.", "Ouça o acorde final com o baixo."], focus: [["T1", "T2", "B1"], ["T1", "T2", "B1", "B2"]] },
      ],
    },
    {
      title: "2. Clichê de linha",
      blocks: [
        { type: "paragraph", text: "Sobre um acorde menor parado, uma voz interna desce por semitons: Lá – Sol♯ – Sol – Fá♯ (Am, Am(maj7), Am7, Am6). O acorde é o mesmo; a linha dá movimento. Aparece em canções populares, MPB e gospel." },
        { type: "example", score: EXA2.clicheLinha, verdict: "correto", caption: "A linha no barítono", commentary: "Baixo parado em Lá, tenores parados em Dó e Mi; só o barítono desce. O motor registra as notas cromáticas como informação." },
        { type: "example", score: EXA2.clicheDobrado, verdict: "incorreto", caption: "A linha dobrada no baixo", commentary: "Se o baixo também desce, barítono e baixo andam em oitavas paralelas e a fundamental some. Deixe o baixo parado e a linha numa voz só." },
        ESTUDO,
      ],
    },
    {
      title: "3. Demonstração: três cromatismos, três lugares",
      blocks: [
        { type: "table", caption: "Onde cada recurso funciona", headers: ["Recurso", "Onde colocar", "Voz que carrega o cromatismo", "Cuidado"], rows: [["Diminuto de passagem (G – G♯°7 – Am)", "entre dois acordes a um tom", "baixo (G – G♯ – A)", "a sétima diminuta (F) desce"], ["Planing (Fá – Mi – Mi♭ – Ré)", "introdução, interlúdio, chegada ao V", "o trio inteiro", "paralelas intencionais: só no estilo popular"], ["Clichê de linha (Am – Am(maj7) – Am7 – Am6)", "acorde menor longo", "uma voz interna", "não dobrar a linha no baixo"]] },
        { type: "list", ordered: true, items: ["Escolha um recurso por trecho.", "Coloque o cromatismo numa voz só e faça-o andar por semitons.", "Termine sempre num acorde funcional (V ou I) para o ouvido 'pousar'.", "Confira no motor e leia as paralelas do planing como intenção registrada."] },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Clichê dobrado no baixo", "oitavas paralelas, some a fundamental", "baixo parado"], ["Planing longo demais", "perde-se a tonalidade", "dois a quatro acordes, chegando no V"], ["Diminuto sob nota da melodia fora dele", "choque", "confira a melodia"], ["Cromatismo saltando entre vozes", "falsa relação", "uma voz só"]] },
        { type: "list", items: ["Diminuto de passagem: baixo cromático.", "Planing: cor, não função.", "Clichê: uma voz interna desce por semitons sobre o acorde parado."] },
        {
          type: "challenge",
          title: "Um clichê sobre Mi menor",
          task: "Escreva um clichê de linha de quatro tempos sobre Mi menor (Em – Em(maj7) – Em7 – Em6) para quarteto masculino: indique a nota de cada voz em cada tempo.",
          constraints: ["Baixo parado em E3 (E2 fica no limite da extensão).", "Só uma voz se move.", "Estilo popular."],
          criteria: ["A linha desce por semitons: E – D♯ – D – C♯.", "As outras três vozes ficam paradas.", "Nenhuma terça abaixo do limite grave."],
          hints: ["Em = E – G – B. A voz que canta a fundamental E (acima do baixo) é a que desce.", "Se a linha ficasse no barítono em E3, estaria em uníssono com o baixo: coloque-a no lead, em E4.", "Distribuição possível: baixo E3, barítono B3, lead E4 (linha), tenor G4."],
          solution: {
            commentary: "Baixo E3 (parado), barítono B3 (parado), lead E4 → D♯4 → D4 → C♯4 (a linha), tenor G4 (parado). Em, Em(maj7), Em7, Em6: o acorde é o mesmo; a linha do lead dá o movimento. Com o baixo em E3 e o barítono em B3 (5ª), o grave fica aberto.",
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-acappella-blocos",
    title: "Verificação: blocos e clichê",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["bc-cliche"],
    staticItems: [
      { id: "bc-cliche", kind: "choice", skill: "harmonia-funcional", prompt: "Num clichê de linha sobre Lá menor, o que acontece com o baixo?", options: [{ id: "a", label: "Fica parado na fundamental; só uma voz interna desce" }, { id: "b", label: "Desce junto com a linha" }, { id: "c", label: "Sobe por semitons" }], correctOptionId: "a", explanation: "Dobrar a linha no baixo cria oitavas paralelas e tira a fundamental do acorde." },
      { id: "bc-dim", kind: "choice", skill: "acordes", prompt: "Entre Sol e Lá menor, que acorde de passagem faz o baixo subir por semitom?", options: [{ id: "a", label: "Sol♯°7" }, { id: "b", label: "Fá maior" }, { id: "c", label: "Ré menor" }], correctOptionId: "a", explanation: "O diminuto no semitom do meio funciona como dominante de Lá menor." },
      { id: "bc-planing", kind: "choice", skill: "conducao-de-vozes", prompt: "O motor aponta quintas paralelas num trecho de planing. O que fazer?", options: [{ id: "a", label: "Manter se o efeito é intencional e curto, chegando num acorde funcional" }, { id: "b", label: "Sempre reescrever em movimento contrário" }, { id: "c", label: "Trocar o estilo para tradicional" }], correctOptionId: "a", explanation: "No planing as paralelas são a própria ideia; use com intenção e moderação." },
    ],
    generators: [{ type: "seventh-identification", count: 3 }, { type: "chord-identification", count: 1 }, { type: "voice-leading-error", count: 2, ruleIds: ["conducao.paralelas"] }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o papel do baixo no clichê.",
  application: {
    title: "Aplicação no Estúdio",
    steps: ["Escreva I – #I°7 – ii – V7 – I em TTBB.", "Escreva um clichê de linha de dois compassos sobre um acorde menor.", "Experimente dois compassos de planing chegando no V e compare os estilos no motor."],
  },
};

export const lessonAcappellaBaixo: Lesson = {
  id: "acappella-linhas-de-baixo",
  title: "Linhas de baixo: inversões, pedal e oitavas",
  summary: "O baixo que desce por grau com acordes invertidos, o pedal com a harmonia andando por cima e quando dobrar o baixo em oitavas.",
  levelId: "s4",
  unitId: "s4-acp",
  status: "disponivel",
  prerequisites: ["acappella-blocos-cromaticos"],
  estimatedMinutes: 50,
  competencies: ["harmonia-funcional", "conducao-de-vozes", "escrita-ttbb"],
  objectives: [
    "Escrever uma linha de baixo descendente com inversões.",
    "Usar um pedal com acordes por cima.",
    "Reconhecer quando o dobramento do baixo em oitavas vira erro de condução.",
  ],
  sections: [
    {
      title: "1. O baixo que canta",
      blocks: [
        { type: "paragraph", text: "Inverter acordes (A/C♯, Bm/A) transforma o baixo numa linha por grau conjunto, muito mais cantável que saltos de fundamental em fundamental. Em canções gospel e MPB, a linha descendente é uma das marcas do estilo." },
        { type: "example", score: EXA2.baixoDescendente, verdict: "correto", caption: "D – A/C♯ – Bm – Bm/A – G – A7 – D", commentary: "Ré – Dó♯ – Si – Lá – Sol por grau, depois Lá e Ré na cadência. As vozes de cima quase não se mexem." },
        { type: "listening", title: "Cante o baixo", score: EXA2.baixoDescendente, instructions: ["Ouça só o baixo e cante junto.", "Ouça os quatro."], focus: [["B2"], ["T1", "T2", "B1", "B2"]] },
        { type: "example", score: EXA2.pedalAcordes, verdict: "correto", caption: "Pedal em Ré", commentary: "O baixo fica em Ré por três compassos; por cima, D – G/D – Em7/D – A7/D – D. A sétima (Sol) do A7 desce para Fá♯." },
      ],
    },
    {
      title: "2. Dobrar o baixo em oitavas",
      blocks: [
        { type: "paragraph", text: "Em hinos para quarteto, barítono e baixo às vezes cantam a mesma nota em oitavas num acorde de reforço, como o final de uma frase. Numa linha inteira, porém, o dobramento vira oitavas paralelas e tira uma voz da harmonia." },
        { type: "example", score: EXA2.baixoOitavasTradicional, verdict: "incorreto", caption: "A linha toda dobrada em oitavas", commentary: "No coral tradicional, o motor aponta oitavas paralelas entre barítono e baixo, a sensível dobrada no V⁶ e mais paralelas com o tenor. Dobre só um acorde de chegada, não a linha." },
        ESTUDO,
      ],
    },
    {
      title: "3. Demonstração: transformar fundamentais em linha",
      blocks: [
        { type: "list", ordered: true, items: [
          "Escreva as fundamentais da progressão (por exemplo, D – A – Bm – G – A – D).",
          "Procure inversões que aproximem as notas do baixo: A/C♯ entre D e Bm; Bm/A entre Bm e G.",
          "A nova linha (D – C♯ – B – A – G – A – D) desce por grau e só salta na cadência.",
          "Confira as vozes de cima: com o baixo andando por grau, elas podem quase não se mover (notas comuns).",
          "Confira as paralelas entre baixo e soprano: se a melodia também desce por grau, troque uma inversão.",
        ] },
        { type: "callout", tone: "atencao", title: "Dobrar o baixo", text: "Barítono e baixo em oitavas num acorde de chegada dão peso; numa linha inteira, viram oitavas paralelas e tiram uma voz da harmonia. Dobre só a nota final de uma frase." },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Baixo só em fundamentais com saltos grandes", "linha pouco cantável", "inversões para andar por grau"], ["Sensível no baixo dobrada", "oitavas na resolução", "uma vez só"], ["Pedal sem resolução da sétima por cima", "atrito sem destino", "a sétima desce mesmo sobre o pedal"], ["Linha inteira dobrada em oitavas", "paralelas", "dobre só o acorde de chegada"]] },
        { type: "list", items: ["Inversões transformam fundamentais em linha.", "Pedal: harmonia em cima, chão parado embaixo.", "Oitavas no baixo: só como reforço pontual."] },
        {
          type: "challenge",
          title: "Uma linha descendente em Sol",
          task: "Para G – D – Em – Bm – C – D – G (um acorde por mínima), escreva uma linha de baixo que desça por grau usando inversões, e dê a cifra de cada acorde com o baixo.",
          constraints: ["Baixo entre G2 e G3.", "Pelo menos cinco notas seguidas por grau descendente.", "Cadência D – G com fundamentais."],
          criteria: ["Cada nota do baixo pertence ao acorde.", "A linha desce por grau em pelo menos cinco notas.", "A cadência final tem as fundamentais D e G."],
          hints: ["Comece em G3 para ter espaço para descer.", "D com F♯ no baixo (D/F♯) liga G3 a E3.", "O Bm tem D (sua terça): Bm/D continua a descida até C."],
          solution: {
            commentary: "G (G3) – D/F♯ (F♯3) – Em (E3) – Bm/D (D3) – C (C3) – D (D3) – G (G2). A linha desce G3 – F♯3 – E3 – D3 – C3 por grau, sobe um grau para a dominante e cai na tônica grave. As vozes de cima podem quase não se mover: B e D, por exemplo, são comuns a G, Em e Bm.",
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-acappella-baixo",
    title: "Verificação: linhas de baixo",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["lb-inversao"],
    staticItems: [
      { id: "lb-inversao", kind: "choice", skill: "harmonia-funcional", prompt: "Para o baixo descer por grau de Ré até Si, que acorde cabe no meio (em Ré maior)?", options: [{ id: "a", label: "A/C♯ (Lá com Dó♯ no baixo)" }, { id: "b", label: "G maior no estado fundamental" }, { id: "c", label: "E7" }], correctOptionId: "a", explanation: "A inversão põe a terça (Dó♯) no baixo e liga Ré a Si por grau." },
      { id: "lb-pedal", kind: "choice", skill: "harmonia-funcional", prompt: "Em A7/D sobre um pedal de Ré, o que precisa resolver?", options: [{ id: "a", label: "A sétima (Sol) desce para Fá♯ na volta a Ré" }, { id: "b", label: "O baixo sobe para Mi" }, { id: "c", label: "Nada: o pedal anula as resoluções" }], correctOptionId: "a", explanation: "O pedal segura o baixo, mas as dissonâncias das vozes de cima continuam resolvendo." },
      { id: "lb-oitavas", kind: "choice", skill: "conducao-de-vozes", prompt: "Barítono e baixo em oitavas durante uma linha inteira. O que acontece?", options: [{ id: "a", label: "Oitavas paralelas: uma voz deixa de contribuir para a harmonia" }, { id: "b", label: "O acorde fica mais completo" }, { id: "c", label: "Nada; é sempre recomendado" }], correctOptionId: "a", explanation: "Dobre só um acorde de reforço; numa linha, perde-se uma voz." },
    ],
    generators: [{ type: "function-identification", count: 3 }, { type: "chord-identification", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a inversão para a linha do baixo.",
  application: {
    title: "Aplicação no Estúdio",
    steps: ["Escreva uma linha de baixo descendente de quatro compassos com inversões.", "Escreva uma introdução com pedal de tônica e três acordes por cima.", "Revise no coral tradicional e no popular."],
  },
};

export const lessonAcappellaModulacoes: Lesson = {
  id: "acappella-modulacoes",
  title: "Modulações: tom acima, tom abaixo e por terça",
  summary: "Além do meio tom: subir um tom pela dominante, descer um tom e saltar uma terça para dar uma cor nova ao solo.",
  levelId: "s4",
  unitId: "s4-acp",
  status: "disponivel",
  prerequisites: ["acappella-linhas-de-baixo", "ttbb-modulacao-final"],
  estimatedMinutes: 50,
  competencies: ["harmonia-funcional", "arranjo"],
  objectives: [
    "Modular um tom acima e um tom abaixo pela dominante da nova tonalidade.",
    "Usar a modulação por terça com uma nota comum.",
    "Evitar quintas paralelas na passagem para a dominante.",
  ],
  sections: [
    {
      title: "1. Pela dominante",
      blocks: [
        { type: "paragraph", text: "O caminho mais claro para qualquer tonalidade nova é a dominante dela. Para subir um tom (Sol → Lá), use E7; para descer um tom (Lá → Sol), use D7. O baixo cromático (Sol – Sol♯ – Lá) deixa a subida ainda mais suave." },
        { type: "example", score: EXA2.modTomAcima, verdict: "correto", caption: "Sol → Lá por E7/G♯", commentary: "O baixo sobe Sol – Sol♯ – Lá; a sétima do E7 (Ré, no tenor) desce para Dó♯. O motor analisa na armadura de Sol, por isso o final aparece como V/V (informação)." },
        { type: "example", score: EXA2.modTomAbaixo, verdict: "correto", caption: "Lá → Sol por D7", commentary: "Dó♯ desce a Dó (a sétima do D7) e depois a Si; o Fá♯ do barítono sobe a Sol. Descer um tom acalma: bom para a última estrofe mais íntima." },
        { type: "example", score: EXA2.modQuintasParalelas, verdict: "incorreto", caption: "Quintas na passagem", commentary: "Sol – Ré no grave indo para Mi – Si: quintas paralelas entre barítono e baixo. Mude o barítono para a terça (Sol♯) ou use o E7 com baixo em Sol♯." },
      ],
    },
    {
      title: "2. Por terça",
      blocks: [
        { type: "paragraph", text: "A modulação por terça (Sol → Si maior) não usa dominante: aproveita uma nota comum aos dois acordes (Si) e muda o resto. Soa como uma porta que se abre, ótima para começar um solo numa cor nova." },
        { type: "example", score: EXA2.modTerca, verdict: "correto", caption: "Sol → Si maior", commentary: "O tenor segura o Si; o lead desce a Fá♯, o barítono sobe a Ré♯ e o baixo vai a Si. O motor registra o final fora da tônica como informação." },
        { type: "listening", title: "A porta que se abre", score: EXA2.modTerca, instructions: ["Ouça o Tenor I: a nota não muda.", "Ouça os quatro e sinta a cor nova."], focus: [["T1"], ["T1", "T2", "B1", "B2"]] },
        ESTUDO,
      ],
    },
    {
      title: "3. Demonstração: modular um tom acima com baixo cromático",
      blocks: [
        { type: "list", ordered: true, items: [
          "Tonalidade de partida e de chegada: Sol → Lá.",
          "Dominante da chegada: E7 (E – G♯ – B – D).",
          "Baixo cromático: G (último acorde em Sol) – G♯ (E7/G♯) – A (Lá). A sensível nova está no baixo e sobe.",
          "Vozes de cima: o G de Sol não pertence ao E7 (ele vira G♯, no baixo); B fica (quinta do E7); D fica (sétima do E7) e depois desce para C♯.",
          "Confira o grave: evite G – D (5ª) indo para E – B (5ª) entre barítono e baixo — quintas paralelas.",
        ] },
        { type: "table", caption: "Três modulações, três efeitos", headers: ["Caminho", "Exemplo", "Efeito"], rows: [["Tom acima pela dominante", "Sol → (E7) → Lá", "eleva a energia"], ["Tom abaixo pela dominante", "Lá → (D7) → Sol", "acalma, intimidade"], ["Por terça, com nota comum", "Sol → Si maior (B comum)", "cor nova, 'porta que se abre'"]] },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Quintas paralelas na passagem para a dominante", "som oco", "terça no barítono ou baixo na sensível"], ["Modulação por terça sem nota comum", "salto de tonalidade brusco", "mantenha a nota comum numa voz"], ["Sétima da dominante subindo", "sem resolução", "sétima desce"], ["Modular sem respiração", "afinação insegura", "respiro antes da nova tonalidade"]] },
        { type: "list", items: ["Pela dominante: o caminho mais claro.", "Tom acima eleva; tom abaixo acalma.", "Por terça: uma nota comum muda de função."] },
        {
          type: "challenge",
          title: "Modular de Ré para Fá♯ maior",
          task: "Planeje uma modulação por terça de Ré maior para Fá♯ maior num quarteto masculino: o acorde de partida (Ré), o de chegada (Fá♯) e o movimento de cada voz, mantendo uma nota comum.",
          constraints: ["Nenhuma dominante intermediária.", "Uma voz mantém a nota comum.", "As outras se movem no máximo uma 3ª."],
          criteria: ["A nota comum foi identificada corretamente.", "O acorde de chegada está completo.", "Nenhuma 5ª ou 8ª paralela."],
          hints: ["Ré = D – F♯ – A; Fá♯ = F♯ – A♯ – C♯. Que nota é comum?", "A voz com F♯ fica; quem tinha A sobe meio tom para A♯; quem tinha D desce para C♯.", "O baixo pode subir uma 3ª (D3 → F♯3) ou descer uma 6ª (D3 → F♯2, no limite da extensão)."],
          solution: {
            commentary: "Partida (Ré): baixo D3, barítono A3, lead D4, tenor F♯4. Chegada (Fá♯): baixo F♯2 (desce uma 3ª — F♯2 está na extensão, abaixo da tessitura; prefira F♯3 se o grupo não tiver baixo grave), barítono A♯3 (sobe um semitom), lead C♯4 (desce um semitom), tenor F♯4 (fica: a nota comum). O F♯ do tenor era terça de Ré e vira fundamental de Fá♯: a 'porta' que muda a cor. Com o baixo em F♯3 (subindo uma 3ª), confira o espaço com o barítono (F♯3–A♯3, 3ª maior com a nota inferior em F♯3: aceitável).",
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-acappella-modulacoes",
    title: "Verificação: modulações",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["md-dominante"],
    staticItems: [
      { id: "md-dominante", kind: "choice", skill: "harmonia-funcional", prompt: "Para modular de Sol maior para Lá maior, qual acorde prepara a chegada?", options: [{ id: "a", label: "E7, a dominante de Lá" }, { id: "b", label: "D7" }, { id: "c", label: "F maior" }], correctOptionId: "a", explanation: "A dominante da nova tonalidade aponta para ela." },
      { id: "md-terca", kind: "choice", skill: "harmonia-funcional", prompt: "O que liga Sol maior a Si maior na modulação por terça?", options: [{ id: "a", label: "A nota comum Si" }, { id: "b", label: "Um acorde de Ré7" }, { id: "c", label: "Nada; é sempre um salto sem ligação" }], correctOptionId: "a", explanation: "A nota comum mantém o fio; as outras vozes andam por grau." },
      { id: "md-abaixo", kind: "choice", skill: "arranjo", prompt: "Qual é o efeito típico de descer um tom na última estrofe?", options: [{ id: "a", label: "Acalmar, para um final mais íntimo" }, { id: "b", label: "Aumentar a energia" }, { id: "c", label: "Nenhum efeito audível" }], correctOptionId: "a", explanation: "Subir dá energia; descer recolhe." },
    ],
    generators: [{ type: "cadence-identification", count: 2 }, { type: "seventh-identification", count: 2 }, { type: "key-signature", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a preparação pela dominante.",
  application: {
    title: "Projeto: grupo a cappella gospel",
    steps: ["Abra Projetos → 'Grupo a cappella gospel (TTBB)'.", "Escreva o solo do barítono com 'uh', o refrão em bloco com eco e um ostinato no baixo.", "Module um tom acima pela dominante para a repetição do refrão.", "Avalie com a rubrica."],
  },
};
