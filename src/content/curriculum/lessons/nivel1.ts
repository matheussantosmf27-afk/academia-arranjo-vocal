import { CHORALE_SATB_C } from "@/domain/music/examples";
import { EX } from "../examples";
import type { Lesson } from "../types";

export const lessonEscalas: Lesson = {
  id: "escalas-tonalidades",
  title: "Escalas, tonalidades e armaduras",
  summary: "Escala maior, as três formas da menor, ciclo de quintas e como escolher a tonalidade a partir da extensão do coro.",
  levelId: "n1",
  unitId: "n1-u1",
  status: "disponivel",
  prerequisites: ["intervalos"],
  estimatedMinutes: 55,
  competencies: ["leitura-vocal", "intervalos", "harmonia-funcional"],
  objectives: [
    "Identificar a armadura de qualquer tonalidade maior ou menor até seis acidentes, com pelo menos 80% de acerto.",
    "Construir as formas natural, harmônica e melódica da escala menor e justificar o uso de cada uma no canto.",
    "Nomear graus da escala (tônica, supertônica… sensível) em qualquer tonalidade maior.",
    "Escolher uma tonalidade que mantenha a melodia dentro da tessitura da voz que a canta.",
  ],
  sections: [
    {
      title: "1. A escala maior e o ciclo de quintas",
      blocks: [
        { type: "paragraph", text: "A escala maior segue o padrão tom–tom–semitom–tom–tom–tom–semitom. Começando em Dó, não há acidentes; cada quinta acima (Sol, Ré, Lá…) acrescenta um sustenido, na ordem Fá–Dó–Sol–Ré–Lá–Mi–Si; cada quinta abaixo (Fá, Si♭, Mi♭…) acrescenta um bemol, na ordem inversa." },
        { type: "list", items: ["Truque para sustenidos: a tônica fica um semitom acima do último sustenido (F♯ C♯ → Ré maior).", "Truque para bemóis: a tônica é o penúltimo bemol (B♭ E♭ A♭ → Mi♭ maior). Fá maior (um bemol) é a exceção a memorizar."] },
        { type: "callout", tone: "dica", title: "Por que o arranjador precisa disso de cor", text: "Transpor um arranjo para caber no coro é rotina. Saber instantaneamente que Mi maior tem quatro sustenidos — e que isso aparece na pauta do tenor oitavada do mesmo jeito — evita erros de grafia que o motor de validação vai acusar como intervalos aumentados ou paralelas inexistentes." },
      ],
    },
    {
      title: "2. As três formas da escala menor",
      blocks: [
        { type: "paragraph", text: "A menor natural tem a armadura da relativa maior (lá menor ↔ Dó maior). Sem sensível, porém, a dominante é menor e não 'puxa' para a tônica. A menor harmônica eleva o 7º grau (G♯ em lá menor) e cria a sensível — mas abre uma 2ª aumentada entre o 6º e o 7º graus (F–G♯), difícil de cantar. A menor melódica resolve isso elevando também o 6º grau na subida (F♯–G♯) e voltando à forma natural na descida." },
        { type: "example", score: EX.menorMelodica, verdict: "correto", caption: "Forma melódica ascendente no contralto", commentary: "F♯4–G♯4–A4: a linha chega à tônica pela sensível sem a 2ª aumentada. Na harmonia, o G♯ continua sendo a sensível do V." },
        { type: "example", score: EX.segundaAumentada, verdict: "incorreto", caption: "Forma harmônica numa linha melódica", commentary: "F4 → G♯4 é uma 2ª aumentada (3 semitons). O motor aponta a convenção; a correção usual é usar F♯ na subida." },
      ],
    },
    {
      title: "3. Escolhendo a tonalidade para o coro",
      blocks: [
        { type: "paragraph", text: "Antes de harmonizar, verifique a extensão da melodia e onde ela fica mais tempo. Uma melodia de C4 a E5 cabe na tessitura do soprano em Dó; em Mi♭, sobe até G5 — no limite da extensão. Em TTBB, a mesma melodia no Tenor II precisa ficar entre E3 e D4 (sonoro): normalmente uma oitava abaixo e possivelmente em outra tonalidade." },
        { type: "list", ordered: true, items: ["Encontre a nota mais aguda e a mais grave da melodia.", "Encontre a 'nota média' (onde a melodia passa mais tempo).", "Escolha a tonalidade que coloca a nota média no centro da tessitura da voz da melodia.", "Confira o baixo: a tônica grave (ex.: G2, F2) precisa ser confortável para os baixos."] },
        { type: "callout", tone: "ttbb", title: "TTBB e tonalidades com bemóis", text: "Coros masculinos costumam preferir tonalidades como Si♭, Mi♭ e Fá: deixam a tônica do baixo em B♭1–F2 apenas se o grupo tiver baixos profundos; com baixos comuns, Sol e Lá maior mantêm a fundamental em G2–A2, região mais segura." },
        { type: "listening", title: "Ouça a forma melódica", score: EX.menorMelodica, instructions: ["Cante junto e perceba a 'subida' natural de F♯ a G♯.", "Compare mentalmente com F–G♯ (forma harmônica)."], focus: [["A"]] },
      ],
    },
  ],
  exercises: {
    id: "ex-escalas",
    title: "Verificação: escalas e armaduras",
    instructions: "Responda armaduras e graus. Domínio: 80% de acerto e o item essencial sobre a escala menor.",
    minScore: 0.8,
    requiredItemIds: ["esc-menor"],
    staticItems: [
      {
        id: "esc-menor",
        kind: "choice",
        skill: "leitura-vocal",
        prompt: "Numa linha vocal em lá menor que sobe do 6º para o 7º grau até a tônica, qual forma da escala é preferível?",
        options: [
          { id: "a", label: "Natural (F–G–A): sem sensível" },
          { id: "b", label: "Harmônica (F–G♯–A): 2ª aumentada" },
          { id: "c", label: "Melódica (F♯–G♯–A): sensível sem 2ª aumentada" },
        ],
        correctOptionId: "c",
        explanation: "A forma melódica ascendente mantém a sensível e evita a 2ª aumentada, mais difícil de afinar.",
      },
    ],
    generators: [{ type: "key-signature", count: 5 }, { type: "scale-degree", count: 4 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a escolha da forma da escala menor.",
  application: { title: "Aplicação no Estúdio", steps: ["Abra o coral SATB e use Propriedades → Tonalidade para transpô-lo para Ré e Si♭.", "Observe quais diagnósticos de tessitura aparecem em cada tonalidade e escolha a melhor para um coro amador.", "Repita no exemplo TTBB e anote a menor tonalidade em que o baixo ainda canta a fundamental confortavelmente."] },
};

export const lessonRitmo: Lesson = {
  id: "ritmo-metrica-texto",
  title: "Ritmo, métrica e acentuação do texto",
  summary: "Compassos simples e compostos, notação rítmica correta e o encaixe das sílabas tônicas do português nos tempos fortes.",
  levelId: "n1",
  unitId: "n1-u1",
  status: "disponivel",
  prerequisites: ["vozes-claves-extensoes"],
  estimatedMinutes: 50,
  competencies: ["leitura-vocal", "texto-e-prosodia"],
  objectives: [
    "Distinguir compassos simples e compostos e indicar a unidade de tempo de cada um.",
    "Escrever durações que respeitam a barra de compasso, usando ligaduras quando necessário.",
    "Alinhar as sílabas tônicas de um verso em português com tempos fortes ou meio-fortes.",
  ],
  sections: [
    {
      title: "1. Compasso, tempo e subdivisão",
      blocks: [
        { type: "paragraph", text: "Em compassos simples (2/4, 3/4, 4/4), o tempo é uma figura simples e se divide em duas partes. Em compassos compostos (6/8, 9/8, 12/8), o tempo é uma figura pontuada e se divide em três. 6/8 não é '3/4 rápido': tem dois tempos (semínimas pontuadas) com subdivisão ternária." },
        { type: "table", caption: "Compassos frequentes", headers: ["Compasso", "Tempos", "Unidade de tempo", "Acentos"], rows: [["2/4", "2", "semínima", "forte – fraco"], ["3/4", "3", "semínima", "forte – fraco – fraco"], ["4/4", "4", "semínima", "forte – fraco – meio-forte – fraco"], ["6/8", "2", "semínima pontuada", "forte – fraco"]] },
      ],
    },
    {
      title: "2. Notação que o cantor lê de primeira",
      blocks: [
        { type: "paragraph", text: "Uma figura nunca atravessa a barra de compasso: divide-se em duas figuras ligadas. Dentro do compasso, a escrita deve mostrar onde caem os tempos — em 4/4, uma nota que começa no 2º tempo e dura dois tempos é escrita como mínima, mas uma que começa no 2º tempo e dura três tempos é semínima ligada a mínima, para que o meio do compasso fique visível." },
        { type: "example", score: EX.ritmoAtravessaBarra, verdict: "incorreto", caption: "Figuras atravessando a barra", commentary: "O motor aponta a mínima pontuada que começa no 2º tempo e invade o compasso seguinte. No Estúdio, o botão 'Dividir nas barras com ligaduras' corrige automaticamente." },
      ],
    },
    {
      title: "3. Prosódia: a sílaba tônica no lugar certo",
      blocks: [
        { type: "paragraph", text: "Em português, a acentuação das palavras (CAN-ta, co-ra-ÇÃO, MÚ-si-ca) precisa coincidir com os pontos de apoio da métrica. Sílaba tônica em tempo fraco e átona em tempo forte soam como erro de pronúncia — o público ouve 'cantá' em vez de 'canta'." },
        { type: "example", score: EX.ritmoComLetra, verdict: "correto", caption: "Sílabas tônicas (em maiúsculas) no 1º tempo", commentary: "CAN-ta, CO-ro, JÁ: as tônicas caem nos tempos fortes do 3/4 e recebem as notas mais longas. As átonas ficam no 3º tempo, curtas." },
        { type: "callout", tone: "atencao", title: "Limite do motor", text: "O motor ainda não verifica a prosódia automaticamente: para isso, as sílabas precisam ser marcadas como tônicas ou átonas. Até lá, verifique o texto em voz alta, batendo o compasso." },
        { type: "listening", title: "Cante a melodia com o texto", score: EX.ritmoComLetra, instructions: ["Fale o texto no ritmo antes de cantar.", "Repare que as notas longas caem nas sílabas tônicas."], focus: [["S"]] },
      ],
    },
  ],
  exercises: {
    id: "ex-ritmo",
    title: "Verificação: métrica e texto",
    instructions: "Domínio: 80% de acerto, incluindo os itens essenciais de compasso composto e prosódia.",
    minScore: 0.8,
    requiredItemIds: ["rit-68", "rit-prosodia"],
    staticItems: [
      { id: "rit-68", kind: "choice", skill: "leitura-vocal", prompt: "Quantos tempos tem um compasso 6/8 e qual é a unidade de tempo?", options: [{ id: "a", label: "6 tempos de colcheia" }, { id: "b", label: "2 tempos de semínima pontuada" }, { id: "c", label: "3 tempos de semínima" }], correctOptionId: "b", explanation: "6/8 é composto binário: dois tempos, cada um com três colcheias." },
      { id: "rit-barra", kind: "choice", skill: "leitura-vocal", prompt: "Em 4/4, uma nota começa no 4º tempo e dura dois tempos. Como escrever?", options: [{ id: "a", label: "Uma mínima atravessando a barra" }, { id: "b", label: "Semínima ligada a semínima no compasso seguinte" }, { id: "c", label: "Uma semínima pontuada" }], correctOptionId: "b", explanation: "Nenhuma figura atravessa a barra: divide-se e liga-se." },
      { id: "rit-prosodia", kind: "choice", skill: "texto-e-prosodia", prompt: "Na palavra 'coração' cantada em 3/4 começando no 1º tempo com três notas iguais (co-ra-ção), onde fica a tônica?", options: [{ id: "a", label: "No 1º tempo (forte): certo" }, { id: "b", label: "No 3º tempo (fraco): convém reescrever" }, { id: "c", label: "Não importa" }], correctOptionId: "b", explanation: "co-ra-ÇÃO tem a tônica na última sílaba; começando no 1º tempo, ela cai no 3º (fraco). Desloque a palavra para que 'ção' caia no tempo forte seguinte (anacruse 'co-ra-')." },
      { id: "rit-34", kind: "choice", skill: "leitura-vocal", prompt: "Qual é o padrão de acentos do 3/4?", options: [{ id: "a", label: "forte – fraco – fraco" }, { id: "b", label: "forte – fraco – forte" }, { id: "c", label: "fraco – forte – fraco" }], correctOptionId: "a", explanation: "Compasso ternário simples: um apoio forte e dois tempos fracos." },
    ],
    generators: [{ type: "interval-identification", count: 4, maxNumber: 5 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo compasso composto e prosódia.",
  application: { title: "Aplicação no Estúdio", steps: ["Crie um arranjo novo em 3/4 e escreva uma melodia de quatro compassos com letra própria.", "Diga o texto em voz alta batendo o compasso e confira se as tônicas caem nos tempos fortes.", "Troque o compasso para 4/4 em Propriedades e observe como o motor liga as figuras que passaram a atravessar a barra."] },
};

export const lessonTetrades: Lesson = {
  id: "tetrades",
  title: "Tétrades e acordes de sétima",
  summary: "V7, ii7, viiø7, vii°7 e IV7M: construção, inversões, omissões a quatro vozes e a resolução da sétima.",
  levelId: "n1",
  unitId: "n1-u2",
  status: "disponivel",
  prerequisites: ["triades-inversoes"],
  estimatedMinutes: 60,
  competencies: ["acordes", "harmonia-funcional", "escrita-satb"],
  objectives: [
    "Identificar qualidade e inversão de tétrades a quatro vozes, com pelo menos 80% de acerto.",
    "Associar as cifras 7, ⁶₅, ⁴₃ e ⁴₂ às inversões.",
    "Resolver o V7 com a sétima descendo e a sensível subindo, completo ou com quinta omitida.",
  ],
  sections: [
    {
      title: "1. Qualidades de tétrades",
      blocks: [
        { type: "table", caption: "Tétrades mais usadas", headers: ["Qualidade", "Estrutura", "Grau típico em maior", "Cifra"], rows: [["Sétima de dominante", "tríade maior + 7ª menor", "V7", "G7"], ["Menor com sétima", "tríade menor + 7ª menor", "ii7, vi7", "Dm7"], ["Sétima maior", "tríade maior + 7ª maior", "I7M, IV7M", "F7M"], ["Meio-diminuto", "tríade diminuta + 7ª menor", "viiø7", "Bm7♭5"], ["Diminuto", "tríade diminuta + 7ª diminuta", "vii°7 (menor)", "G♯°"]] },
        { type: "paragraph", text: "Com quatro vozes e quatro notas, a tétrade pode soar completa. Quando a condução exige, omite-se a quinta e dobra-se a fundamental — nunca se omite a terça nem se dobra a sétima ou a sensível." },
      ],
    },
    {
      title: "2. Inversões e cifras",
      blocks: [
        { type: "list", items: ["Estado fundamental: 7", "1ª inversão (terça no baixo): ⁶₅", "2ª inversão (quinta no baixo): ⁴₃", "3ª inversão (sétima no baixo): ⁴₂ — o baixo, que é a sétima, desce por grau (V⁴₂ → I⁶)"] },
      ],
    },
    {
      title: "3. A resolução da sétima",
      blocks: [
        { type: "paragraph", text: "A sétima é dissonância: resolve descendo um grau. No V7 → I, a sétima (F em Dó) vai para E, e a sensível (B) sobe para C. Com V7 completo, o I resultante costuma ficar sem quinta (três fundamentais ou fundamental dobrada e terça); é o preço da condução correta." },
        { type: "example", score: EX.v7I, verdict: "correto", caption: "V7 completo → I incompleto", commentary: "Contralto: F4 → E4 (sétima desce). Tenor: B3 → C4 (sensível sobe). Soprano D5 → C5. O I fica sem quinta — normal e correto." },
        { type: "example", score: EX.setimaSobe, verdict: "incorreto", caption: "Sétima no soprano subindo", commentary: "O F4 do soprano sobe para G4: a dissonância não resolve. O motor aponta e sugere descer para E4." },
        { type: "example", score: EX.v43I6, verdict: "correto", caption: "Exceção: V⁴₃ → I⁶", commentary: "Aqui a sétima (F4) pode subir para G4 porque acompanha o baixo D3 → E3 em décimas paralelas. O motor reconhece a exceção e registra apenas uma observação." },
        { type: "listening", title: "Ouça a tensão e a resolução", score: EX.v7I, instructions: ["Ouça contralto + tenor: o trítono F–B resolve para dentro (E–C).", "Ouça tudo e compare com a versão em que a sétima sobe."], focus: [["A", "T"], ["S", "A", "T", "B"]] },
      ],
    },
  ],
  exercises: {
    id: "ex-tetrades",
    title: "Verificação: tétrades",
    instructions: "Identifique as tétrades. Domínio: 80% e os dois itens essenciais.",
    minScore: 0.8,
    requiredItemIds: ["tet-setima", "tet-omissao"],
    staticItems: [
      { id: "tet-setima", kind: "choice", skill: "harmonia-funcional", prompt: "No V7 → I em Dó maior, para onde vai a sétima (F)?", options: [{ id: "a", label: "Para E (desce um grau)" }, { id: "b", label: "Para G (sobe um grau)" }, { id: "c", label: "Fica em F" }], correctOptionId: "a", explanation: "A sétima é dissonância e resolve descendo por grau conjunto." },
      { id: "tet-omissao", kind: "choice", skill: "acordes", prompt: "Qual nota do V7 pode ser omitida na escrita a quatro vozes?", options: [{ id: "a", label: "A terça (sensível)" }, { id: "b", label: "A quinta" }, { id: "c", label: "A sétima" }], correctOptionId: "b", explanation: "Omite-se a quinta, dobrando a fundamental. Terça e sétima definem a função dominante." },
      { id: "tet-cifra", kind: "choice", skill: "acordes", prompt: "Qual cifra indica a sétima no baixo?", options: [{ id: "a", label: "⁶₅" }, { id: "b", label: "⁴₃" }, { id: "c", label: "⁴₂" }], correctOptionId: "c", explanation: "⁴₂ = 3ª inversão: a sétima no baixo, que desce para a terça do acorde seguinte (V⁴₂ → I⁶)." },
    ],
    generators: [{ type: "seventh-identification", count: 7 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo resolução e omissão.",
  application: { title: "Aplicação no Estúdio", steps: ["No coral SATB, transforme o V do compasso 2 em V7 trocando uma das notas G por F.", "Confira se a sétima resolve descendo; se o motor apontar, corrija a condução.", "Teste a versão V⁴₃ → I⁶ e observe a exceção reconhecida."] },
};

export const lessonFuncoes: Lesson = {
  id: "graus-funcoes",
  title: "Graus e funções harmônicas",
  summary: "Tônica, subdominante e dominante; acordes substitutos; a direção T → S → D → T e a retrogressão.",
  levelId: "n1",
  unitId: "n1-u2",
  status: "disponivel",
  prerequisites: ["triades-inversoes"],
  estimatedMinutes: 55,
  competencies: ["harmonia-funcional", "percepcao"],
  objectives: [
    "Classificar acordes diatônicos nas funções T, S e D, com pelo menos 80% de acerto.",
    "Explicar a progressão funcional típica e reconhecer uma retrogressão.",
    "Ler uma cifragem romana sob a partitura e cantar o baixo correspondente.",
  ],
  sections: [
    {
      title: "1. Três funções",
      blocks: [
        { type: "paragraph", text: "Na harmonia tonal, os acordes se agrupam por função. Tônica (I, vi, iii) dá repouso. Subdominante (IV, ii) afasta-se da tônica e prepara a dominante. Dominante (V, vii°) contém a sensível e cria a expectativa de voltar à tônica." },
        { type: "list", items: ["I – IV – V – I: o esqueleto funcional.", "ii substitui IV com movimento de baixo por quinta (ii–V–I).", "vi substitui I, especialmente na cadência de engano (V–vi)."] },
        { type: "example", score: CHORALE_SATB_C, verdict: "correto", caption: "Coral analisado: I ii V I | vi ii V I | I⁶ IV I⁶₄ V | I", commentary: "Cada compasso percorre T → S → D → T. Observe a cifragem sob a pauta inferior." },
      ],
    },
    {
      title: "2. Retrogressão",
      blocks: [
        { type: "paragraph", text: "Quando uma dominante segue para a subdominante (V → IV), a direção funcional se inverte. Na prática comum isso é raro e soa como 'voltar atrás'; no blues e no pop, é idiomático." },
        { type: "example", score: EX.retrogressao, verdict: "observacao", caption: "V → IV", commentary: "O motor registra a retrogressão como sugestão no estilo tradicional e explica a exceção para estilos populares. Também observa o tenor no agudo da tessitura." },
        { type: "listening", title: "Funções no coral", score: CHORALE_SATB_C, instructions: ["Cante o baixo e diga a função de cada acorde (T, S ou D).", "Perceba a tensão de cada D antes da volta à T."], focus: [["B"], ["S", "A", "T", "B"]] },
      ],
    },
  ],
  exercises: {
    id: "ex-funcoes",
    title: "Verificação: funções",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["fun-dominante"],
    staticItems: [
      { id: "fun-dominante", kind: "choice", skill: "harmonia-funcional", prompt: "O que caracteriza a função de dominante?", options: [{ id: "a", label: "Contém a sensível e tende a resolver na tônica" }, { id: "b", label: "É sempre o último acorde" }, { id: "c", label: "Contém a tônica no baixo" }], correctOptionId: "a", explanation: "V e vii° contêm a sensível (7º grau), cuja tendência a subir para a tônica define a função." },
      { id: "fun-ii", kind: "choice", skill: "harmonia-funcional", prompt: "Qual acorde substitui o IV na função subdominante?", options: [{ id: "a", label: "ii" }, { id: "b", label: "iii" }, { id: "c", label: "vii°" }], correctOptionId: "a", explanation: "ii compartilha duas notas com IV e tem o baixo uma quinta acima do V." },
    ],
    generators: [{ type: "function-identification", count: 6 }, { type: "scale-degree", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a definição de dominante.",
  application: { title: "Aplicação no Estúdio", steps: ["No coral SATB, ative a cifragem e anote T, S ou D sob cada acorde.", "Troque um ii por IV (mude o baixo D3 para F3) e verifique a condução.", "Experimente uma retrogressão e leia a explicação do motor."] },
};

export const lessonCadencias: Lesson = {
  id: "cadencias",
  title: "Cadências",
  summary: "Autêntica, plagal, semicadência e de engano — pontuação musical e sua relação com o texto.",
  levelId: "n1",
  unitId: "n1-u2",
  status: "disponivel",
  prerequisites: ["graus-funcoes"],
  estimatedMinutes: 50,
  competencies: ["harmonia-funcional", "percepcao", "escrita-satb"],
  objectives: [
    "Reconhecer de ouvido e na partitura as quatro cadências principais, com pelo menos 80% de acerto.",
    "Escrever cada cadência a quatro vozes com condução correta.",
    "Associar cadências conclusivas e suspensivas à pontuação do texto.",
  ],
  sections: [
    {
      title: "1. Quatro cadências",
      blocks: [
        { type: "example", score: EX.cadAutentica, verdict: "correto", caption: "Autêntica perfeita (V → I, fundamentais no baixo, tônica no soprano)", commentary: "A mais conclusiva: ponto final." },
        { type: "example", score: EX.cadPlagal, verdict: "correto", caption: "Plagal (IV → I)", commentary: "O 'Amém': conclusiva, mais suave; nota comum (C) no soprano." },
        { type: "example", score: EX.cadSemi, verdict: "correto", caption: "Semicadência (termina em V)", commentary: "Vírgula ou ponto de interrogação: a frase pede continuação. O motor só observa que a peça não termina na tônica." },
        { type: "example", score: EX.cadEngano, verdict: "correto", caption: "De engano (V → vi)", commentary: "A sensível sobe, mas o baixo vai para A: surpresa. Note a terça dobrada no vi — a duplicação recomendada aqui." },
        { type: "example", score: EX.sensivelNaoResolve, verdict: "incorreto", caption: "Autêntica com a sensível do soprano descendo", commentary: "B4 → G4 no soprano enfraquece a cadência; o motor aponta e sugere subir para C5." },
      ],
    },
    {
      title: "2. Cadência e texto",
      blocks: [
        { type: "paragraph", text: "O arranjador lê o texto como uma partitura de pontuação: fim de estrofe pede cadência autêntica; vírgula e pergunta, semicadência; um 'desvio' do texto (uma surpresa, um 'mas') combina com cadência de engano." },
        { type: "listening", title: "Compare as cadências", score: EX.cadEngano, instructions: ["Ouça a cadência de engano e depois a autêntica.", "Em qual o baixo 'frustra' a expectativa?"], focus: [["B"], ["S", "A", "T", "B"]] },
      ],
    },
  ],
  exercises: {
    id: "ex-cadencias",
    title: "Verificação: cadências",
    instructions: "Ouça, leia e identifique. Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["cad-texto"],
    staticItems: [
      { id: "cad-texto", kind: "choice", skill: "harmonia-funcional", prompt: "O verso termina com uma pergunta e a música continua. Qual cadência combina melhor?", options: [{ id: "a", label: "Autêntica perfeita" }, { id: "b", label: "Semicadência" }, { id: "c", label: "Plagal" }], correctOptionId: "b", explanation: "A semicadência suspende a frase, como uma pergunta à espera de resposta." },
    ],
    generators: [{ type: "cadence-identification", count: 7 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a relação cadência–texto.",
  application: { title: "Aplicação no Estúdio", steps: ["Crie um arranjo SATB de dois compassos e escreva uma cadência autêntica e uma de engano.", "Valide com o motor e corrija a condução até não haver alertas.", "Toque as duas e descreva a diferença de efeito em uma frase."] },
};
