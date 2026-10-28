import { EXT } from "../examples-ttbb";
import type { ContentBlock, Lesson } from "../types";

/**
 * EST405 — Quarteto masculino (TTBB). As técnicas vêm do estudo do repertório
 * de quartetos gospel, spirituals e barbershop; todos os exemplos são originais.
 */

const ESTUDO: ContentBlock = {
  type: "callout",
  tone: "dica",
  title: "Para ouvir e estudar",
  text: "Ouça com a partitura na mão: Arautos do Rei, Haven Quartet, Gaither Vocal Band, Golden Gate Quartet (spirituals) e quartetos de barbershop. Há partituras de quartetos masculinos publicadas para estudo, como as do acervo 4tons.com.br. Analise e transcreva trechos para você, mas não redistribua: os arranjos têm direitos autorais.",
};

export const lessonQuartetoMasculino: Lesson = {
  id: "quarteto-masculino",
  title: "O quarteto masculino: lead, tenor, barítono e baixo",
  summary: "Os quatro papéis do quarteto, por que a melodia fica no Tenor II, como se escreve em duas pautas e quando o barítono cruza o lead.",
  levelId: "s4",
  unitId: "s4-qtm",
  status: "disponivel",
  prerequisites: ["escrita-ttbb", "variacao-e-desenvolvimento"],
  estimatedMinutes: 55,
  competencies: ["escrita-ttbb", "arranjo"],
  objectives: [
    "Atribuir os papéis de lead, tenor, barítono e baixo às quatro vozes do quarteto.",
    "Harmonizar uma melodia com o lead no Tenor II e o tenor acima dela.",
    "Reconhecer quando um cruzamento entre barítono e lead é escolha de estilo e quando é erro.",
  ],
  sections: [
    {
      title: "1. Quatro papéis, não quatro naipes",
      blocks: [
        { type: "paragraph", text: "No coro masculino, cada naipe tem vários cantores e a escrita segue a lógica do coro misto. No quarteto, cada voz é um cantor com função própria, e o arranjo é pensado a partir dessas funções:" },
        {
          type: "table",
          caption: "Os papéis no quarteto masculino",
          headers: ["Voz", "Papel", "O que costuma cantar"],
          rows: [
            ["Tenor I (tenor)", "Brilho acima da melodia", "Terças e sextas acima do lead; falsete nos pontos culminantes"],
            ["Tenor II (lead)", "Melodia", "A canção, com o texto em primeiro plano"],
            ["Barítono (Baixo I)", "Completa o acorde", "A nota que falta; às vezes acima do lead"],
            ["Baixo (Baixo II)", "Fundamento e ritmo", "Fundamentais, linhas condutoras e respostas"],
          ],
        },
        { type: "paragraph", text: "A melodia no Tenor II deixa espaço para uma voz acima dela. O tenor 'emoldura' o lead por cima, e o acorde fica completo com a melodia no meio da textura, região em que a voz masculina tem mais corpo e o texto se entende melhor." },
        { type: "example", score: EXT.leadSo, verdict: "correto", caption: "A melodia sozinha, no lead", commentary: "Rio de Paz, melodia original do curso, em Sol maior: cabe confortável na tessitura do Tenor II (Mi3–Ré4)." },
        { type: "example", score: EXT.leadHarmonizado, verdict: "correto", caption: "Lead no meio, tenor acima", commentary: "O tenor fica acima do lead, quase sempre em terças; barítono completa o acorde e o baixo segura as fundamentais. O motor só registra a sensível do barítono descendo no fim (informação: em voz interna, é comum)." },
        { type: "listening", title: "Ouça cada papel", score: EXT.leadHarmonizado, instructions: ["Ouça só o lead (Tenor II).", "Acrescente o tenor por cima e perceba a 'moldura'.", "Ouça barítono e baixo juntos: é a base harmônica.", "Ouça os quatro."], focus: [["T2"], ["T1", "T2"], ["B1", "B2"], ["T1", "T2", "B1", "B2"]] },
      ],
    },
    {
      title: "2. Duas pautas e a ordem das vozes",
      blocks: [
        { type: "paragraph", text: "O quarteto masculino é escrito em duas pautas: tenores na clave de sol com o 8 embaixo (soa uma oitava abaixo do escrito) e barítono e baixo na clave de fá. Na pauta de cima, a haste para cima é do Tenor I e a haste para baixo, do lead; na de baixo, barítono para cima e baixo para baixo." },
        { type: "example", score: EXT.tenorAbaixoDoLead, verdict: "incorreto", caption: "Tenor I escrito abaixo do lead", commentary: "Se o tenor passa a cantar abaixo da melodia, a voz de cima vira o lead e a moldura se perde. No coral tradicional, o motor aponta cruzamento e sobreposição." },
        { type: "paragraph", text: "O barítono é diferente: no barbershop e em muitos quartetos gospel ele sobe acima do lead para completar o acorde sem obrigar a melodia a mudar. No estilo popular o motor apenas informa o cruzamento." },
        { type: "example", score: EXT.baritonoAcimaDoLead, verdict: "correto", caption: "Barítono acima do lead (estilo popular)", commentary: "No primeiro acorde, o barítono (Si3) está acima do lead (Sol3): a terça do acorde fica perto do tenor e o lead canta a fundamental. O motor registra o cruzamento como informação." },
        { type: "example", score: EXT.leadNoAgudo, verdict: "incorreto", caption: "Lead e tenor agudos demais", commentary: "Levar o arranjo para uma tonalidade alta põe o lead fora da extensão e o tenor no limite. No quarteto, escolha a tonalidade pela melodia no Tenor II, não pelo tenor." },
        ESTUDO,
      ],
    },
  ],
  exercises: {
    id: "ex-quarteto-masculino",
    title: "Verificação: papéis no quarteto masculino",
    instructions: "Domínio: 80% e os itens essenciais.",
    minScore: 0.8,
    requiredItemIds: ["qm-lead", "qm-tenor"],
    staticItems: [
      { id: "qm-lead", kind: "choice", skill: "escrita-ttbb", prompt: "Em que voz fica a melodia no quarteto masculino tradicional (gospel e barbershop)?", options: [{ id: "a", label: "Tenor II, o lead" }, { id: "b", label: "Tenor I, a voz mais aguda" }, { id: "c", label: "Baixo" }], correctOptionId: "a", explanation: "O lead canta a melodia no meio da textura; o tenor harmoniza acima.", optionFeedback: { b: "No quarteto o Tenor I harmoniza acima do lead; com a melodia no topo, você perde a moldura e cansa o tenor." } },
      { id: "qm-tenor", kind: "choice", skill: "escrita-ttbb", prompt: "O que o Tenor I costuma cantar?", options: [{ id: "a", label: "Uma harmonia acima do lead, em terças e sextas" }, { id: "b", label: "A melodia uma oitava acima" }, { id: "c", label: "As fundamentais do acorde" }], correctOptionId: "a", explanation: "O tenor emoldura o lead por cima; o falsete fica para os pontos culminantes." },
      { id: "qm-baritono", kind: "choice", skill: "escrita-ttbb", prompt: "Por que o barítono cruza o lead com frequência no barbershop?", options: [{ id: "a", label: "Para completar o acorde sem mudar a melodia" }, { id: "b", label: "Porque o barítono é a voz principal" }, { id: "c", label: "É um erro tolerado por tradição" }], correctOptionId: "a", explanation: "O barítono pega a nota que falta no acorde; se ela está acima da melodia, ele sobe. No estilo popular o motor só informa o cruzamento." },
      { id: "qm-clave", kind: "choice", skill: "leitura-vocal", prompt: "Na pauta dos tenores (clave de sol com 8 embaixo), um Sol escrito na segunda linha soa como…", options: [{ id: "a", label: "Sol3, uma oitava abaixo do escrito" }, { id: "b", label: "Sol4, como escrito" }, { id: "c", label: "Sol2, duas oitavas abaixo" }], correctOptionId: "a", explanation: "O 8 embaixo da clave indica que tudo soa uma oitava abaixo." },
    ],
    generators: [{ type: "range-check", count: 4 }, { type: "ttbb-voicing", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a voz do lead e o papel do tenor.",
  application: {
    title: "Aplicação no Estúdio",
    steps: ["Crie um arranjo TTBB (+ Novo arranjo → Formação: TTBB) e escreva uma melodia de 4 compassos no Tenor II.", "Escreva o baixo com as fundamentais, o tenor em terças acima do lead e complete com o barítono.", "Revise no estilo popular e no coral tradicional e compare o que muda nos cruzamentos."],
  },
};

export const lessonTtbbVoicing: Lesson = {
  id: "ttbb-voicing-fechado",
  title: "Voicing fechado e o grave no quarteto",
  summary: "Fundamental e quinta embaixo, terça nos tenores, limites graves de intervalo e a sétima de dominante que 'ressoa'.",
  levelId: "s4",
  unitId: "s4-qtm",
  status: "disponivel",
  prerequisites: ["quarteto-masculino"],
  estimatedMinutes: 55,
  competencies: ["escrita-ttbb", "conducao-de-vozes"],
  objectives: [
    "Distribuir tríades e tétrades em TTBB com o grave claro.",
    "Corrigir um acorde embolado pelos limites graves de intervalo.",
    "Escrever a sétima de dominante completa e resolvê-la.",
  ],
  sections: [
    {
      title: "1. Aberto embaixo, fechado em cima",
      blocks: [
        { type: "paragraph", text: "O quarteto masculino soa bem com a mesma regra da série harmônica: intervalos largos no grave e próximos no agudo. Na prática, fundamental e quinta (ou oitava) entre baixo e barítono, e terça e sétima com os tenores." },
        { type: "example", score: EXT.fechadoCorreto, verdict: "correto", caption: "I – IV – V – I em Sol", commentary: "Baixo e barítono em quintas e terças maiores acima de Si♭2; tenores fechados. No V, barítono e baixo dobram o Ré em uníssono e os tenores descem enquanto o baixo sobe: movimento contrário, sem paralelas." },
        { type: "example", score: EXT.tercaNoGrave, verdict: "observacao", caption: "Terça colada no baixo", commentary: "Si2 sobre Sol2 é uma terça maior abaixo do limite (Si♭2): o acorde embola. O Tenor II, em Ré3, também fica fora da tessitura." },
        { type: "example", score: EXT.tercaNoGraveCorrigida, verdict: "correto", caption: "Mesmo acorde, terça em cima", commentary: "Sol2 – Ré3 – Sol3 – Si3: quinta embaixo e a terça no Tenor I. As mesmas notas, distribuídas pela série harmônica." },
        { type: "table", caption: "Limites graves de intervalo usados pelo motor (nota inferior mínima)", headers: ["Intervalo", "Nota inferior mínima"], rows: [["3ª menor", "Dó3"], ["3ª maior", "Si♭2"], ["4ª justa", "Lá2"], ["5ª justa", "Si♭1"], ["6ª maior / 7ª", "Fá2"]] },
      ],
    },
    {
      title: "2. A sétima que ressoa",
      blocks: [
        { type: "paragraph", text: "O acorde mais característico do quarteto masculino é a sétima de dominante completa, com fundamental, terça, quinta e sétima em quatro vozes. Afinado em entonação justa, ele produz o 'ring' do barbershop: um harmônico agudo que parece uma quinta voz." },
        { type: "example", score: EXT.setimaBarbershop, verdict: "correto", caption: "D7 completo → G", commentary: "Sétima (Dó4) desce para Si3, terça (Fá♯3) no barítono, quinta (Lá3) no lead. Na resolução, o barítono desce para Ré3 para manter o grave aberto; o motor registra como informação." },
        { type: "listening", title: "Procure o 'ring'", score: EXT.setimaBarbershop, instructions: ["Ouça o primeiro acorde com as quatro vozes.", "Ouça baixo e lead (fundamental e quinta): o esqueleto.", "Acrescente barítono e tenor e compare."], focus: [["T1", "T2", "B1", "B2"], ["T2", "B2"], ["T1", "T2", "B1", "B2"]] },
        { type: "example", score: EXT.baixoAbaixo, verdict: "incorreto", caption: "Baixo em Ré2", commentary: "Abaixo da extensão do baixo (Mi2). Para chegar lá só com baixos profundos confirmados; no resto, suba o acorde ou troque a tonalidade." },
        ESTUDO,
      ],
    },
  ],
  exercises: {
    id: "ex-ttbb-voicing",
    title: "Verificação: voicing no quarteto",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["tv-grave"],
    staticItems: [
      { id: "tv-grave", kind: "choice", skill: "escrita-ttbb", prompt: "Num acorde de Sol maior com o baixo em Sol2, onde a terça (Si) soa mais clara?", options: [{ id: "a", label: "Nos tenores (Si3)" }, { id: "b", label: "No barítono, logo acima do baixo (Si2)" }, { id: "c", label: "Dobrada no baixo e no barítono" }], correctOptionId: "a", explanation: "Uma terça maior sobre Sol2 fica abaixo do limite grave (Si♭2) e embola; no Tenor I ou II ela soa limpa.", optionFeedback: { b: "Sol2–Si2 é uma terça maior abaixo do limite grave: o acorde embola." } },
      { id: "tv-ring", kind: "choice", skill: "acordes", prompt: "Qual acorde produz o 'ring' característico do quarteto barbershop?", options: [{ id: "a", label: "A sétima de dominante completa" }, { id: "b", label: "Uma tríade sem a quinta" }, { id: "c", label: "Um cluster de segundas" }], correctOptionId: "a", explanation: "Com as quatro notas e afinação justa, os harmônicos se reforçam e surge o 'ring'." },
    ],
    generators: [{ type: "ttbb-voicing", count: 4 }, { type: "voice-leading-error", count: 2, ruleIds: ["vozes.espacamento", "vozes.cruzamento", "conducao.paralelas"] }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo onde colocar a terça.",
  application: {
    title: "Aplicação no Estúdio",
    steps: ["Num arranjo TTBB, escreva I – IV – V7 – I em Fá, Sol e Lá maior.", "Mantenha fundamental e quinta entre baixo e barítono e a terça nos tenores.", "Revise: nenhuma sugestão de limite grave deve aparecer."],
  },
};

export const lessonTtbbChamadaResposta: Lesson = {
  id: "ttbb-chamada-resposta",
  title: "Baixo condutor, chamada e resposta e o 'doo' rítmico",
  summary: "O baixo que puxa a canção, o trio que responde, sílabas rítmicas sob o lead e o pad que precisa respirar.",
  levelId: "s4",
  unitId: "s4-qtm",
  status: "disponivel",
  prerequisites: ["ttbb-voicing-fechado"],
  estimatedMinutes: 55,
  competencies: ["escrita-ttbb", "arranjo", "texto-e-prosodia"],
  objectives: [
    "Escrever uma chamada do baixo e a resposta do trio.",
    "Criar um acompanhamento rítmico em sílabas sob o lead.",
    "Planejar respirações em pads e notas longas.",
  ],
  sections: [
    {
      title: "1. Chamada e resposta",
      blocks: [
        { type: "paragraph", text: "Herança dos spirituals e do gospel: uma voz lança a frase e as outras respondem. No quarteto, quem chama costuma ser o baixo, que tem timbre e região próprios. A resposta do trio repete ou completa o texto em bloco." },
        { type: "example", score: EXT.chamadaResposta, verdict: "correto", caption: "O baixo chama, o trio responde", commentary: "Compassos 1 e 3: o baixo sozinho arpeja o acorde e diz o texto. Compassos 2 e 4: o trio responde em bloco, com o baixo segurando a fundamental." },
        { type: "listening", title: "Pergunta e resposta", score: EXT.chamadaResposta, instructions: ["Ouça só o baixo.", "Ouça só o trio.", "Ouça tudo e marque onde cada um entra."], focus: [["B2"], ["T1", "T2", "B1"], ["T1", "T2", "B1", "B2"]] },
        { type: "list", items: ["A resposta pode repetir o texto, ecoar a última palavra ou comentar ('oh, sim').", "Alterne quem chama: o lead numa estrofe, o baixo na outra.", "Deixe a resposta mais curta que a chamada para a frase andar."] },
      ],
    },
    {
      title: "2. 'Doo' rítmico e o pad que respira",
      blocks: [
        { type: "paragraph", text: "Sob o lead, as outras vozes podem virar banda: o baixo marca os tempos com 'dm' ou 'bm', e tenor e barítono fazem os contratempos em 'doo'. Use consoantes curtas para o ritmo aparecer e vogais abertas só no fim da frase." },
        { type: "example", score: EXT.backingDoo, verdict: "correto", caption: "Lead com 'doo' nos contratempos", commentary: "Baixo nos tempos 1 e 3, tenor e barítono nos tempos 2 e 4: o acompanhamento de guitarra virou vozes. O motor só comenta, como informação, um Dó4 do tenor sobre o acorde de Sol." },
        { type: "paragraph", text: "O oposto do 'doo' é o pad: vozes sustentadas em 'uh' sob um solo. Ele funciona, mas precisa respirar, e quem respira é o arranjador." },
        { type: "example", score: EXT.padSemRespirar, verdict: "observacao", caption: "Pad de 21 segundos", commentary: "Cinco compassos lentos sem pausa: o motor sugere planejar respirações. Escreva uma pausa curta no fim da frase ou indique respiração escalonada." },
        ESTUDO,
      ],
    },
  ],
  exercises: {
    id: "ex-ttbb-chamada",
    title: "Verificação: chamada e resposta",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["cr-resposta"],
    staticItems: [
      { id: "cr-resposta", kind: "choice", skill: "arranjo", prompt: "Numa chamada e resposta com o baixo chamando, o que o trio faz?", options: [{ id: "a", label: "Responde em bloco, repetindo ou completando o texto" }, { id: "b", label: "Canta junto com o baixo o tempo todo" }, { id: "c", label: "Fica em silêncio até o fim da música" }], correctOptionId: "a", explanation: "A graça está na alternância: uma voz lança, o grupo responde." },
      { id: "cr-silabas", kind: "choice", skill: "arranjo", prompt: "Para o acompanhamento rítmico em sílabas soar como percussão, prefira…", options: [{ id: "a", label: "Consoantes curtas: 'doo', 'dm', 'bm'" }, { id: "b", label: "Vogais longas: 'ah', 'oh'" }, { id: "c", label: "O texto completo da canção" }], correctOptionId: "a", explanation: "O ataque da consoante marca o ritmo; vogais longas viram pad." },
      { id: "cr-pad", kind: "choice", skill: "texto-e-prosodia", prompt: "Um pad em 'uh' de cinco compassos lentos sem pausa. O que fazer?", options: [{ id: "a", label: "Escrever pausas curtas ou indicar respiração escalonada" }, { id: "b", label: "Nada: o cantor dá um jeito" }, { id: "c", label: "Trocar a vogal por 'ah'" }], correctOptionId: "a", explanation: "A respiração é decisão do arranjo; o motor sugere planejá-la a partir de 15 segundos." },
    ],
    generators: [{ type: "ttbb-voicing", count: 3 }, { type: "motion-type", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o papel da resposta.",
  application: {
    title: "Aplicação no Estúdio",
    steps: ["Escreva 4 compassos de chamada do baixo e resposta do trio.", "Em outra seção, ponha o lead com 'doo' de tenor e barítono nos contratempos.", "Toque com a mesa de vozes e confira se o texto do lead continua claro."],
  },
};

export const lessonTtbbUnissono: Lesson = {
  id: "ttbb-unissono-entradas",
  title: "Uníssono que se abre e entradas sucessivas",
  summary: "Começar em uníssono e abrir no fim da frase, apresentar as vozes uma a uma e usar o contraste entre uma linha e quatro.",
  levelId: "s4",
  unitId: "s4-qtm",
  status: "disponivel",
  prerequisites: ["ttbb-chamada-resposta"],
  estimatedMinutes: 45,
  competencies: ["escrita-ttbb", "arranjo"],
  objectives: [
    "Usar uníssono e oitavas como recurso de intensidade e de texto.",
    "Abrir um uníssono em harmonia na palavra certa.",
    "Escrever entradas sucessivas que constroem o acorde.",
  ],
  sections: [
    {
      title: "1. Uma linha que vira quatro",
      blocks: [
        { type: "paragraph", text: "Quatro homens cantando a mesma melodia (tenores em uníssono, barítono e baixo uma oitava abaixo) têm força e clareza de texto. Quando a frase chega na palavra importante, as vozes se separam e o acorde aparece: o contraste é o efeito." },
        { type: "example", score: EXT.unissonoAbre, verdict: "observacao", caption: "Uníssono que se abre em 'paz'", commentary: "Compasso 1 em uníssono e oitavas; compasso 2 abre em D – G. O motor sugere evitar oitavas e uníssonos paralelos: aqui elas são a textura escolhida (dobramento da melodia), não perda de independência. Registre a intenção." },
        { type: "listening", title: "Ouça a abertura", score: EXT.unissonoAbre, instructions: ["Ouça os tenores no compasso 1: uma só linha.", "Ouça os quatro e perceba o acorde surgir no compasso 2."], focus: [["T1", "T2"], ["T1", "T2", "B1", "B2"]] },
        { type: "callout", tone: "atencao", title: "Uníssono não é preguiça", text: "Use o uníssono onde o texto pede unidade (uma afirmação, o título da canção) e abra onde pede emoção. Uníssono do começo ao fim é só melodia dobrada." },
      ],
    },
    {
      title: "2. Entradas em escada",
      blocks: [
        { type: "paragraph", text: "Outra abertura típica: as vozes entram uma por vez, de baixo para cima, e cada uma sustenta sua nota. O ouvinte escuta o acorde ser montado. Também funciona com cada voz cantando uma frase da melodia antes do tutti." },
        { type: "example", score: EXT.entradasEmEscada, verdict: "correto", caption: "Baixo, barítono, lead e tenor", commentary: "Sol2, Ré3, Sol3 e Si3 entram compasso a compasso: fundamental, quinta, oitava e, por último, a terça no topo." },
        { type: "listening", title: "Monte o acorde", score: EXT.entradasEmEscada, instructions: ["Conte as entradas.", "Repare que o acorde só fica maior quando a terça entra."] },
        ESTUDO,
      ],
    },
  ],
  exercises: {
    id: "ex-ttbb-unissono",
    title: "Verificação: uníssono e entradas",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["un-abrir"],
    staticItems: [
      { id: "un-abrir", kind: "choice", skill: "arranjo", prompt: "Onde abrir em harmonia uma frase cantada em uníssono?", options: [{ id: "a", label: "Na palavra ou no momento mais importante da frase" }, { id: "b", label: "Na primeira sílaba, sempre" }, { id: "c", label: "Em qualquer lugar; o efeito é o mesmo" }], correctOptionId: "a", explanation: "O contraste entre uma linha e quatro chama atenção: use-o para destacar o texto." },
      { id: "un-motor", kind: "choice", skill: "conducao-de-vozes", prompt: "O motor aponta oitavas paralelas num trecho em que o quarteto dobra a melodia em oitavas. O que isso significa?", options: [{ id: "a", label: "É dobramento intencional da melodia; registre a intenção" }, { id: "b", label: "O trecho precisa ser reescrito em quatro vozes independentes" }, { id: "c", label: "O motor está com defeito" }], correctOptionId: "a", explanation: "A regra protege a independência das vozes; quando todas cantam a mesma linha, não há independência a proteger." },
      { id: "un-escada", kind: "choice", skill: "escrita-ttbb", prompt: "Nas entradas em escada de um acorde maior, qual nota faz o acorde soar maior?", options: [{ id: "a", label: "A terça" }, { id: "b", label: "A quinta" }, { id: "c", label: "A fundamental dobrada" }], correctOptionId: "a", explanation: "Fundamental e quinta soam 'ocas'; a terça define o modo." },
    ],
    generators: [{ type: "interval-identification", count: 3, maxNumber: 8 }, { type: "ttbb-voicing", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo onde abrir o uníssono.",
  application: {
    title: "Aplicação no Estúdio",
    steps: ["Escreva a primeira frase de uma canção em uníssono e oitavas.", "Abra em harmonia na palavra mais importante.", "Escreva uma introdução com entradas em escada no acorde da tônica."],
  },
};

export const lessonTtbbCores: Lesson = {
  id: "ttbb-cores-gospel",
  title: "Cores do quarteto gospel: sexta, sétima maior, empréstimo e pedal",
  summary: "Os acordes que dão o som do quarteto gospel: add2, 6, maj7, iv menor emprestado, baixo pedal e dominante com nona.",
  levelId: "s4",
  unitId: "s4-qtm",
  status: "disponivel",
  prerequisites: ["ttbb-voicing-fechado", "tensoes-e-extensoes"],
  estimatedMinutes: 60,
  competencies: ["escrita-ttbb", "harmonia-funcional", "acordes"],
  objectives: [
    "Distribuir acordes de sexta e de sétima maior em quatro vozes masculinas.",
    "Usar o iv menor emprestado com uma linha cromática interna.",
    "Escrever um baixo pedal e uma dominante com nona menor.",
  ],
  sections: [
    {
      title: "1. Cor sem perder a clareza",
      blocks: [
        { type: "paragraph", text: "O quarteto gospel raramente canta tríades puras: a tônica vira 6 ou maj7, a subdominante ganha a sexta, e o iv menor (emprestado do modo menor) aparece antes da volta para casa. Como só há quatro vozes, cada cor custa uma nota: em geral sai a quinta." },
        { type: "example", score: EXT.coresGospel, verdict: "correto", caption: "Gmaj7 – C6 – Cm6 – G", commentary: "Barítono em linha cromática (Ré – Mi – Mi♭ – Ré): o empréstimo modal fica numa voz interna. Os tenores quase não se mexem." },
        { type: "example", score: EXT.coresTradicional, verdict: "incorreto", caption: "As mesmas cores no coral tradicional", commentary: "No estilo tradicional, a sétima maior é dissonância que precisa descer; o motor aponta o Fá♯ subindo. É o mesmo trecho: a régua do estilo é que muda." },
        { type: "listening", title: "Siga a linha cromática", score: EXT.coresGospel, instructions: ["Ouça só o barítono.", "Ouça barítono e tenores.", "Ouça os quatro e note o escurecimento no Cm6."], focus: [["B1"], ["T1", "T2", "B1"], ["T1", "T2", "B1", "B2"]] },
      ],
    },
    {
      title: "2. Pedal e dominante com nona",
      blocks: [
        { type: "paragraph", text: "Com o baixo parado na tônica, as outras vozes podem passear por IV e V em cima dele (C/G, D/G): a harmonia se move e o chão não. É o pedal, muito usado em introduções e finais." },
        { type: "example", score: EXT.pedalNoBaixo, verdict: "correto", caption: "G – C/G – D/G – G sobre Sol2", commentary: "O baixo sustenta Sol2 por dois compassos; o trio caminha quase só por grau conjunto." },
        { type: "paragraph", text: "Na dominante, a nona menor (Mi♭ em D7) dá a tensão típica do gospel antes da resolução. Ela desce por grau, como a sétima." },
        { type: "example", score: EXT.dominanteNona, verdict: "correto", caption: "D7(♭9) → G", commentary: "Mi♭4 → Ré4 e Dó4 → Si3 descem; Fá♯3 → Sol3 sobe. O motor trata a nona como apojatura (informação)." },
        ESTUDO,
      ],
    },
  ],
  exercises: {
    id: "ex-ttbb-cores",
    title: "Verificação: cores do quarteto gospel",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["co-quinta"],
    staticItems: [
      { id: "co-quinta", kind: "choice", skill: "escrita-ttbb", prompt: "Para escrever C6 (Dó, Mi, Sol, Lá) em quatro vozes masculinas com a fundamental no baixo, que nota se costuma omitir?", options: [{ id: "a", label: "A quinta (Sol)" }, { id: "b", label: "A terça (Mi)" }, { id: "c", label: "A sexta (Lá)" }], correctOptionId: "a", explanation: "Terça e sexta definem o acorde; a quinta é a nota menos necessária." },
      { id: "co-iv", kind: "choice", skill: "harmonia-funcional", prompt: "Em Sol maior, o Cm6 antes da tônica é…", options: [{ id: "a", label: "Um empréstimo modal (iv do modo menor)" }, { id: "b", label: "Uma modulação para Dó menor" }, { id: "c", label: "Um erro de harmonia" }], correctOptionId: "a", explanation: "O iv menor vem de Sol menor e volta para Sol maior: cor, não modulação." },
      { id: "co-pedal", kind: "choice", skill: "harmonia-funcional", prompt: "O que caracteriza um baixo pedal?", options: [{ id: "a", label: "O baixo sustenta uma nota enquanto a harmonia muda em cima" }, { id: "b", label: "O baixo canta a melodia" }, { id: "c", label: "O baixo sai e só os tenores cantam" }], correctOptionId: "a", explanation: "O chão fica parado e os acordes passam por cima (C/G, D/G)." },
    ],
    generators: [{ type: "seventh-identification", count: 3 }, { type: "function-identification", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a nota omitida no acorde de sexta.",
  application: {
    title: "Aplicação no Estúdio",
    steps: ["Num arranjo TTBB em estilo popular, escreva I6 – IV6 – iv6 – I.", "Escreva uma introdução de dois compassos com baixo pedal.", "Termine uma frase com V7(♭9) → I e confira a resolução no motor."],
  },
};

export const lessonTtbbModulacao: Lesson = {
  id: "ttbb-modulacao-final",
  title: "Modulação de meio tom e finais de quarteto",
  summary: "A última estrofe meio tom acima, preparada pela dominante da nova tonalidade, e os finais: tag, nota longa e falsete.",
  levelId: "s4",
  unitId: "s4-qtm",
  status: "disponivel",
  prerequisites: ["ttbb-cores-gospel", "modulacao-reharmonizacao"],
  estimatedMinutes: 55,
  competencies: ["escrita-ttbb", "harmonia-funcional", "arranjo"],
  objectives: [
    "Preparar uma modulação de meio tom acima com o V7 da nova tonalidade.",
    "Resolver a sétima da dominante de chegada por grau descendente.",
    "Planejar o final do arranjo: tag, nota longa do lead e falsete do tenor.",
  ],
  sections: [
    {
      title: "1. Meio tom acima",
      blocks: [
        { type: "paragraph", text: "Subir a última estrofe meio tom é a modulação mais usada em quartetos gospel: renova a energia sem mudar o arranjo. Para não soar como um 'degrau' brusco, prepare com a dominante da nova tonalidade no fim da estrofe anterior: em Sol maior, E♭7 leva a Lá♭." },
        { type: "example", score: EXT.modulacaoMeioTom, verdict: "correto", caption: "Sol → Lá♭ por E♭7", commentary: "Do acorde de Sol, as vozes andam para E♭7 (o lead sobe Sol → Si♭, o tenor Si → Ré♭) e resolvem em Lá♭: a sétima Ré♭ desce para Dó. O motor analisa na armadura de Sol e chama o E♭7 de ♭VI7; o final em ♭II é informação." },
        { type: "example", score: EXT.modulacaoSetimaSobe, verdict: "incorreto", caption: "A sétima subindo", commentary: "Ré♭ → Mi♭ no tenor: a sétima da dominante não resolve. Mesmo numa modulação, a dominante cobra sua resolução." },
        { type: "listening", title: "Sinta o degrau", score: EXT.modulacaoMeioTom, instructions: ["Ouça os quatro e perceba a chegada em Lá♭.", "Ouça só os tenores: Ré♭ → Dó e Si♭ → Lá♭."], focus: [["T1", "T2", "B1", "B2"], ["T1", "T2"]] },
      ],
    },
    {
      title: "2. Como terminar",
      blocks: [
        {
          type: "list",
          items: [
            "Tag: repita a última frase com harmonia mais rica (I6, iv6) e um ritardando.",
            "Nota longa do lead, com as outras vozes se movendo por baixo (o 'swipe' do barbershop).",
            "Falsete do tenor no último acorde, na terça ou na nona.",
            "Baixo descendo para a fundamental na oitava grave no último compasso.",
          ],
        },
        { type: "callout", tone: "ttbb", title: "Cuidado com o fôlego", text: "Finais longos depois de uma modulação cansam: planeje respirações antes da tag e deixe a nota longa para quem tem mais fôlego no grupo." },
        ESTUDO,
      ],
    },
  ],
  exercises: {
    id: "ex-ttbb-modulacao",
    title: "Verificação: modulação e final",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["mo-preparo"],
    staticItems: [
      { id: "mo-preparo", kind: "choice", skill: "harmonia-funcional", prompt: "Para modular de Sol maior para Lá♭ maior, qual acorde prepara a chegada?", options: [{ id: "a", label: "E♭7, a dominante de Lá♭" }, { id: "b", label: "D7, a dominante de Sol" }, { id: "c", label: "C maior" }], correctOptionId: "a", explanation: "O V7 da nova tonalidade aponta para ela; o ouvido aceita o degrau." },
      { id: "mo-setima", kind: "choice", skill: "conducao-de-vozes", prompt: "Em E♭7 → Lá♭, para onde vai a sétima (Ré♭)?", options: [{ id: "a", label: "Desce para Dó" }, { id: "b", label: "Sobe para Mi♭" }, { id: "c", label: "Fica parada" }], correctOptionId: "a", explanation: "Como em qualquer dominante, a sétima resolve por grau descendente." },
      { id: "mo-tag", kind: "choice", skill: "arranjo", prompt: "O que é a 'tag' no final de um arranjo de quarteto?", options: [{ id: "a", label: "A repetição da última frase com harmonia mais rica" }, { id: "b", label: "Uma introdução falada" }, { id: "c", label: "A troca do lead por outro cantor" }], correctOptionId: "a", explanation: "A tag prolonga o final e é onde o quarteto mostra suas cores." },
    ],
    generators: [{ type: "seventh-identification", count: 2 }, { type: "cadence-identification", count: 3 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a preparação da modulação.",
  application: {
    title: "Projeto: quarteto gospel",
    steps: ["Abra Projetos → 'Quarteto gospel (TTBB)'.", "Harmonize a melodia do lead com chamada e resposta e uma cor gospel.", "Prepare a modulação de meio tom e escreva uma tag final.", "Avalie com a rubrica."],
  },
};
