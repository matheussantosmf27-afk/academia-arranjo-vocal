import { CHORALE_SATB_C } from "@/domain/music/examples";
import { EX } from "../examples";
import { EXD } from "../examples-didatica";
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
    {
      title: "4. Demonstração: escolher a tonalidade para um naipe",
      blocks: [
        { type: "paragraph", text: "Problema: uma melodia em Sol maior vai de D4 a E5 e passa a maior parte do tempo entre G4 e C5. Ela será cantada pelos contraltos (tessitura confortável A3–B4). Em que tonalidade escrever?" },
        { type: "list", ordered: true, items: [
          "Âmbito: D4–E5 é uma 9ª. A tessitura do contralto (A3–B4) também cobre uma 9ª: cabe, mas sem folga.",
          "Nota média: por volta de A4. O centro da tessitura do contralto fica por volta de E4–F4: precisamos descer cerca de uma 4ª ou 5ª.",
          "Testes: em Ré maior (4ª justa abaixo), a melodia vai de A3 a B4, com média por volta de E4 — exatamente a tessitura do contralto. Em Mi maior (3ª menor abaixo), vai de B3 a C♯5, média F♯4 — o C♯5 já passa da tessitura.",
          "Decisão: Ré maior. Mi maior só se o grupo quiser mais brilho e o ponto mais agudo for curto e preparado. Confira no Estúdio com Propriedades → Tonalidade.",
        ] },
        { type: "callout", tone: "atencao", title: "A armadura muda a leitura", text: "Mi maior tem quatro sustenidos; para leitores iniciantes, Ré (dois) ou Mi♭ (três bemóis) podem ser mais fáceis. Facilidade de leitura também é critério de escolha num coro amador." },
      ],
    },
    {
      title: "5. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Como reconhecer", "Correção"], rows: [["Confundir a ordem dos sustenidos e bemóis", "F♯ C♯ G♯ → 'Si maior'", "último sustenido + semitom: G♯ → Lá maior"], ["Usar a menor harmônica numa linha melódica ascendente 6–7–1", "2ª aumentada (F–G♯ em lá menor)", "melódica ascendente: F♯–G♯–A"], ["Escolher a tonalidade só pela nota mais aguda", "melodia confortável no extremo, cansativa no meio", "use a nota média"], ["Esquecer a relativa", "lá menor com armadura de Lá maior", "lá menor e Dó maior compartilham a armadura"]] },
        { type: "list", items: ["Cada quinta acima acrescenta um sustenido; cada quinta abaixo, um bemol.", "Menor natural (sem sensível), harmônica (sensível, 2ª aumentada), melódica ascendente (sem 2ª aumentada).", "A tonalidade é escolhida pela voz da melodia e conferida no baixo."] },
        {
          type: "challenge",
          title: "Tonalidade para tenores e para sopranos",
          task: "A 'Canção do Caminho' (em Dó: E4 a C5, nota média por volta de G4) será cantada primeiro pelos sopranos e depois, numa segunda estrofe, pelos tenores (uma oitava abaixo). Escolha UMA tonalidade que sirva às duas estrofes e justifique com as tessituras desta aula e da aula de vozes.",
          constraints: ["Mesma tonalidade nas duas estrofes.", "Tessituras: soprano E4–E5, tenor E3–E4 (sonoro)."],
          criteria: ["Âmbito calculado na tonalidade escolhida para as duas vozes.", "Nota média perto do centro das duas tessituras.", "Armadura escrita corretamente."],
          hints: ["Em Dó, os sopranos cantam E4–C5 (média G4) e os tenores E3–C4 (média G3). Os dois estão confortáveis?", "Subir para Ré maior coloca os sopranos em F♯4–D5 e os tenores em F♯3–D4. Ainda cabe?", "Mi maior leva os tenores a E4 no ponto culminante: no topo da tessitura."],
          solution: {
            commentary: "Dó maior e Ré maior servem às duas estrofes. Em Dó, sopranos de E4 a C5 (média G4, um pouco abaixo do centro) e tenores de E3 a C4 (média G3, bem no centro). Em Ré (dois sustenidos: F♯ e C♯), sopranos de F♯4 a D5 (média A4, no centro) e tenores de F♯3 a D4 (média A3, ainda confortável). Ré é a escolha mais equilibrada; Dó favorece os tenores. Mi maior (quatro sustenidos) já coloca o ponto culminante dos tenores em E4, no limite da tessitura.",
            alternatives: ["Se os tenores forem fracos no agudo e os sopranos fortes, Dó maior é preferível: perde-se um pouco de brilho nos sopranos, ganha-se segurança nos tenores."],
          },
        },
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
    {
      title: "4. Demonstração: encaixar um verso no compasso",
      blocks: [
        { type: "paragraph", text: "Problema: musicar 'vamos cantar juntos' em 4/4, uma nota por sílaba. Fale o verso e marque as tônicas: VA-mos can-TAR JUN-tos. Escrito ingenuamente, em semínimas a partir do 1º tempo, TAR cai no 4º tempo (fraco) e quem ouve tende a entender 'vamos CANtar'." },
        { type: "list", ordered: true, items: [
          "Coloque as tônicas primeiro: VA no 1º tempo do 1º compasso e TAR no 1º tempo do 2º compasso; JUN pode ficar no 3º tempo (meio-forte).",
          "Conte as átonas entre as tônicas: entre VA e TAR há duas ('mos', 'can'); entre TAR e JUN, nenhuma.",
          "Distribua: VA ocupa os tempos 1–2 (mínima); 'mos' e 'can' ficam nos tempos 3 e 4; TAR, mínima no 1º tempo; JUN no 3º tempo e 'tos' no 4º.",
          "Confira falando no ritmo, batendo o compasso: o acento do texto e o da música coincidem.",
          "Se o verso começasse por átona ('a-le-GRI-a'), a solução seria a anacruse: as átonas antes do primeiro tempo forte.",
        ] },
        { type: "callout", tone: "atencao", title: "O motor não vê prosódia", text: "Um verso com as tônicas nos tempos fracos não viola nenhuma regra de escrita: o motor não acusa nada. Este é um dos pontos em que só o ouvido (e a leitura em voz alta) do arranjador encontra o problema." },
      ],
    },
    {
      title: "5. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Como reconhecer", "Correção"], rows: [["Átona no tempo forte", "ao falar no ritmo, a palavra muda de acento", "desloque com anacruse ou alongue a sílaba anterior"], ["Figura atravessando a barra", "uma nota começa num compasso e termina no outro sem ligadura", "divida e ligue (botão 'Dividir nas barras com ligaduras')"], ["Tratar 6/8 como 3/4", "acentos a cada colcheia em grupos de dois", "pense em dois tempos de semínima pontuada"], ["Esconder o meio do compasso em 4/4", "semínima pontuada começando no 2º tempo", "escreva semínima ligada a colcheia para mostrar o 3º tempo"]] },
        { type: "list", items: ["Simples: tempo dividido em dois; composto: em três (unidade pontuada).", "Nenhuma figura atravessa a barra; a escrita mostra onde caem os tempos.", "Tônicas nos tempos fortes, átonas nos fracos; anacruse resolve quase todos os casos."] },
        {
          type: "challenge",
          title: "Conserte a prosódia",
          task: "Reescreva a melodia 'caminhar contigo' (abaixo) para que as sílabas tônicas NHAR e TI caiam em tempos fortes, mantendo as mesmas alturas na mesma ordem.",
          start: EXD.ritmoStart,
          revises: true,
          constraints: ["Mesmo compasso (3/4) e mesmas notas, na mesma ordem.", "Pode acrescentar pausas e mudar durações."],
          criteria: ["NHAR e TI no 1º tempo de compasso.", "Tônicas mais longas que as átonas vizinhas.", "Todos os compassos completos; nada atravessando a barra."],
          hints: ["Quantas sílabas átonas vêm antes da primeira tônica? Elas podem começar antes do 1º tempo.", "Comece com uma pausa de semínima: 'ca-mi' ficam nos tempos 2 e 3.", "Dê mínima a NHAR e a TI; 'con' e 'go' ficam com semínima."],
          solution: {
            score: EXD.ritmoSol,
            commentary: "Pausa | ca-mi (tempos 2–3) | NHAR (mínima) con (semínima) | TI (mínima) go (semínima) | final. As alturas são as mesmas, mas agora o apoio métrico coincide com o acento da fala, e o C5 — a nota mais alta — cai em 'con', logo antes da tônica TI, criando um impulso para ela.",
            alternatives: ["Em 4/4: 'ca-mi' como anacruse de duas colcheias, NHAR no 1º tempo e TI no 3º (meio-forte). Também funciona, com um caráter mais andante."],
          },
        },
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
    {
      title: "4. Demonstração: completo ou incompleto?",
      blocks: [
        { type: "paragraph", text: "Problema: escrever V7 → I em Dó maior, com o baixo G2 → C3 e o soprano D5 → C5. A pergunta do arranjador é: o V7 será completo (quatro notas diferentes) ou incompleto (sem quinta, fundamental dobrada)? A resposta decide como o I vai ficar." },
        { type: "list", ordered: true, items: [
          "Tendências obrigatórias: a sensível (B) sobe para C; a sétima (F) desce para E.",
          "V7 completo: G2, B3, F4, D5. Resolvendo, B3 → C4 e F4 → E4; o D5 vai para C5. Resultado: C3, C4, E4, C5 — I sem quinta (fundamental triplicada). Correto.",
          "V7 incompleto: G2, G3, F4, B4 (fundamental dobrada, sem D). Resolvendo, B4 → C5, F4 → E4 e G3 fica (nota comum, quinta do I): C3, G3, E4, C5 — I completo. Também correto.",
          "Regra prática: V7 completo → I incompleto; V7 incompleto → I completo. Não há como ter os dois completos com as tendências resolvidas em estado fundamental.",
        ] },
        { type: "example", score: EX.v7I, verdict: "correto", caption: "Versão com V7 completo", commentary: "Contralto: F4 → E4 (sétima desce). Tenor: B3 → C4 (sensível sobe). O I fica sem quinta — normal e correto." },
        { type: "callout", tone: "dica", title: "Decisão do arranjador", text: "No meio de uma frase, prefira o acorde de chegada completo (V7 incompleto). Na cadência final, o I com fundamental triplicada soa firme e é comum. Nas inversões (V⁶₅, V⁴₃, V⁴₂), o acorde costuma ficar completo, porque o baixo já resolve uma das tendências." },
      ],
    },
    {
      title: "5. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Sétima subindo", "a dissonância não resolve", "sétima desce por grau (exceção: V⁴₃ → I⁶ em décimas com o baixo)"], ["Sétima dobrada", "duas vozes descendo juntas: oitavas paralelas", "a sétima aparece uma vez"], ["Omitir a terça do V7", "o acorde perde a sensível e a função", "omita a quinta"], ["V⁴₂ com o baixo subindo", "a sétima no baixo não resolve", "V⁴₂ → I⁶: o baixo desce por grau"]] },
        { type: "list", items: ["Tétrade = tríade + sétima; as qualidades mais usadas são V7, ii7, viiø7, vii°7 e IV7M.", "Inversões: 7, ⁶₅, ⁴₃, ⁴₂ (sétima no baixo).", "A sétima desce, a sensível sobe; omita a quinta se precisar, nunca a terça."] },
        {
          type: "challenge",
          title: "Três dominantes, três resoluções",
          task: "Soprano e baixo estão dados para V7 → I | V⁶₅ → I | V⁴₃ → I⁶ em Dó maior. Escreva contralto e tenor resolvendo sensível e sétima em cada par.",
          start: EXD.tetStart,
          constraints: ["Não altere soprano nem baixo.", "Cada dominante tem a sétima (F) em alguma voz.", "Estilo coral tradicional."],
          criteria: ["Em cada dominante, sensível e sétima aparecem uma vez cada.", "A sétima desce, exceto no V⁴₃ → I⁶, onde pode subir acompanhando o baixo em décimas.", "O motor não aponta erros nem alertas (observações informativas são aceitáveis)."],
          hints: ["No primeiro par, o soprano tem D5 (quinta do V7). Onde ficam a sensível e a sétima?", "No V⁶₅, a sensível está no baixo (B2) e sobe para C3. O soprano G4 é a fundamental: faltam D e F.", "No V⁴₃ → I⁶ (baixo D3 → E3), o soprano B4 → C5 é a sensível. Coloque a sétima F4 no contralto e deixe-a subir para G4, em décimas com o baixo."],
          solution: {
            score: EXD.tetSol,
            commentary: "Par 1 — V7 completo: G2, B3, F4, D5 → C3, C4, E4, C5 (I sem quinta). Par 2 — V⁶₅: B2, D4, F4, G4 → C3, C4, E4, G4 (I completo; o soprano mantém G como nota comum). Par 3 — V⁴₃: D3, G3, F4, B4 → E3, C4, G4, C5: a sétima F4 sobe para G4 em décimas com o baixo D3 → E3 — a exceção reconhecida, que o motor registra como informação.",
            alternatives: ["No par 3, a sétima também pode descer (F4 → E4); então o I⁶ fica com a terça dobrada (baixo E3 e contralto E4), aceitável no I⁶ mas menos sonoro."],
          },
        },
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
    generators: [{ type: "seventh-identification", count: 5 }, { type: "seventh-identification", count: 2, earOnly: true }, { type: "voice-leading-error", count: 1, ruleIds: ["harmonia.resolucao-da-setima"] }],
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
    {
      title: "3. Substitutos e a direção funcional",
      blocks: [
        { type: "paragraph", text: "Acordes da mesma função compartilham notas: ii (D–F–A) tem duas notas em comum com IV (F–A–C); vi (A–C–E) tem duas em comum com I (C–E–G). Por isso um pode ocupar o lugar do outro sem mudar a direção da frase — muda a cor, não o caminho." },
        { type: "table", caption: "Funções em Dó maior e o que cada acorde acrescenta", headers: ["Função", "Acorde principal", "Substitutos", "Diferença de efeito"], rows: [["Tônica (T)", "I (C–E–G)", "vi (A–C–E), iii (E–G–B, raro)", "vi é tônica 'velada', menos conclusiva"], ["Subdominante (S)", "IV (F–A–C)", "ii (D–F–A), ii⁶ (baixo F)", "ii prepara o V com baixo por 5ª; ii⁶ deixa o baixo andar F → G"], ["Dominante (D)", "V (G–B–D)", "V7, vii°⁶ (B–D–F)", "vii°⁶ é dominante sem fundamental, ótimo de passagem"]] },
        { type: "paragraph", text: "A direção típica é T → S → D → T. Pode-se pular a S (T → D → T) ou repetir funções (T → T → S → D), mas, na escrita coral tradicional, voltar de D para S (retrogressão) é evitado. Ler uma cifragem romana é, antes de tudo, ler essa direção." },
        { type: "list", ordered: true, items: [
          "Demonstração com o soprano C5 – C5 – B4 – C5 (Dó maior) e o plano funcional T – S – D – T.",
          "T sobre C5: I (C é a fundamental).",
          "S sobre C5: IV (C é a quinta de F). O ii (D–F–A) não contém C — só o ii7 conteria, como sétima. Escolha: IV, com o soprano parado (nota comum).",
          "D sobre B4: V (B é a sensível, no soprano: precisa subir para C5 — e sobe).",
          "T sobre C5: I. Plano final: I – IV – V – I. Baixo C3 – F3 – G3 – C3; no IV → V, o baixo sobe um grau, então as vozes de cima descem (aula de paralelas).",
        ] },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Como reconhecer", "Correção"], rows: [["Confundir função com grau", "chamar o vi de 'subdominante' porque vem antes do V", "pergunte o que o acorde contém: vi contém a tônica (C) e a terça (E)"], ["V → IV no estilo tradicional", "a frase 'volta atrás' antes da cadência", "troque por IV → V ou ii → V"], ["Usar iii como substituto de V", "iii tem a sensível, mas não tem a fundamental do V", "em escrita coral, prefira V ou vii°⁶"], ["Achar que T–S–D–T é obrigatório em todo compasso", "harmonia rígida, previsível", "a direção vale para a frase, não para cada compasso"]] },
        { type: "list", items: ["Três funções: T (repouso), S (afastamento), D (tensão que pede a T).", "Substitutos da mesma função compartilham notas e mudam a cor.", "Direção típica: T → S → D → T; retrogressão é marca de estilo popular."] },
        {
          type: "challenge",
          title: "T – S – D – T a quatro vozes",
          task: "Harmonize o soprano G4 – A4 | B4 – C5 com o plano funcional T – S – D – T, usando ii (ou ii⁶) na subdominante. Escreva as quatro vozes.",
          start: EXD.funStart,
          constraints: ["Não altere o soprano.", "Use ii ou ii⁶ (não IV) para a função S.", "Estilo coral tradicional."],
          criteria: ["Cada acorde tem a função pedida e está cifrado (I, ii⁶, V, I).", "A sensível do V sobe para a tônica.", "O motor não aponta erros nem alertas."],
          hints: ["A4 está no ii como quinta (D–F–A). Com F no baixo, o acorde fica ii⁶.", "Cuidado com o I → ii⁶: se tenor e soprano subirem juntos, aparecem quintas paralelas (veja a aula de paralelas). Faça as vozes internas descerem.", "Baixo possível: C3 – F3 | G3 – C3."],
          solution: {
            score: EXD.funSol,
            commentary: "I – ii⁶ | V – I, baixo C3 – F3 – G3 – C3. No I → ii⁶, contralto (E4 → D4) e tenor (C4 → A3) descem enquanto soprano e baixo sobem: nenhuma paralela. No V, a sensível está no soprano (B4 → C5); o tenor desce para G3 (uníssono com o baixo, aceitável num acorde de passagem para a cadência) e o contralto mantém D4 antes de subir para E4.",
            alternatives: ["ii em estado fundamental (baixo D3): I – ii – V – I com baixo C3 – D3 – G2 – C3. Cuidado redobrado com paralelas no I → ii, porque o baixo sobe por grau junto com o soprano.", "Com IV no lugar de ii (fora da restrição do exercício), o efeito é mais 'aberto'; ii soa mais direcional porque seu baixo (D) está a uma 5ª do V."],
          },
        },
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
      title: "1. O que define uma cadência",
      blocks: [
        { type: "paragraph", text: "Cadência é o modo como uma frase termina. Três coisas a definem: os dois últimos acordes (a progressão), o grau da escala no soprano e a posição métrica — o acorde de chegada cai num tempo forte e costuma durar mais. Mudou qualquer uma das três, muda a força da pontuação." },
        { type: "paragraph", text: "Por isso o arranjador harmoniza as cadências antes do resto: elas são os pontos fixos da forma. Sabendo onde cada frase repousa (ponto final) ou fica suspensa (vírgula, pergunta), o caminho até lá pode ser escolhido de trás para a frente." },
        { type: "table", caption: "As quatro cadências e o que observar em cada uma", headers: ["Cadência", "Acordes", "Soprano típico", "Efeito", "Pontuação do texto"], rows: [["Autêntica perfeita", "V(7) → I, ambos no estado fundamental", "2–1 ou 7–1", "conclusão plena", "ponto final, fim de estrofe"], ["Autêntica imperfeita", "V → I com 3 ou 5 no soprano, ou um dos acordes invertido", "2–3, 5–5, 7–1 sobre I⁶", "conclusiva, mas pede mais", "ponto e vírgula, fim de frase interna"], ["Plagal", "IV → I", "1–1 (nota comum) ou 6–5", "repouso suave, 'Amém'", "coda, confirmação depois de uma autêntica"], ["Semicadência", "qualquer acorde → V", "2, 7 ou 5 sustentados", "suspensão", "vírgula, pergunta, dois-pontos"], ["De engano", "V → vi", "7–1 ou 2–1 (como na autêntica)", "surpresa, adiamento", "'mas…', virada do texto, repetição antes do fim"]] },
      ],
    },
    {
      title: "2. Ouvindo e lendo as quatro cadências",
      blocks: [
        { type: "example", score: EX.cadAutentica, verdict: "correto", caption: "Autêntica perfeita (V → I, fundamentais no baixo, tônica no soprano)", commentary: "A mais conclusiva: o baixo salta G2 → C3 (fundamental a fundamental) e o soprano chega à tônica pela sensível, B4 → C5." },
        { type: "example", score: EXD.cadImperfeita, verdict: "correto", caption: "Autêntica imperfeita (terça no soprano)", commentary: "Mesma progressão, mas o soprano termina em E5 (3º grau). O ouvido reconhece a chegada à tônica e, ainda assim, espera continuação — útil no meio de uma estrofe." },
        { type: "example", score: EX.cadPlagal, verdict: "correto", caption: "Plagal (IV → I)", commentary: "O 'Amém': conclusiva e mais suave, porque não há sensível. O C5 do soprano é nota comum aos dois acordes e fica parado." },
        { type: "example", score: EX.cadSemi, verdict: "correto", caption: "Semicadência (termina em V)", commentary: "A frase para na dominante, como uma vírgula ou um ponto de interrogação. O motor só observa que a peça não termina na tônica — num trecho isolado isso é esperado." },
        { type: "example", score: EX.cadEngano, verdict: "correto", caption: "De engano (V → vi)", commentary: "Soprano e sensível fazem exatamente o que fariam na autêntica (B4 → C5), mas o baixo sobe para A2: o acorde de chegada é Lá menor. A terça (C) fica dobrada no vi — é a duplicação recomendada aqui, porque evita quintas paralelas e deixa a sensível subir." },
        { type: "listening", title: "Percepção em contexto: o que o baixo faz", score: EX.cadEngano, instructions: ["Antes de ouvir, cante G2 → C3 (a autêntica) e depois G2 → A2.", "Ouça só o baixo e diga se ele 'confirmou' ou 'frustrou' a tônica.", "Ouça as quatro vozes: o soprano sozinho não distingue as duas cadências — é o baixo que decide."], focus: [["B"], ["S", "B"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "3. Demonstração passo a passo: escrever uma autêntica perfeita",
      blocks: [
        { type: "paragraph", text: "Problema: em Sol maior, o soprano termina a frase com A4 → G4 (2–1), em mínimas, no 2º compasso. Queremos a cadência mais conclusiva possível, a quatro vozes, no estilo coral tradicional." },
        { type: "list", ordered: true, items: [
          "Ler o soprano. 2–1 em tempo forte pede V → I. A4 é a quinta de D (V); G4, a fundamental de G (I).",
          "Escrever o baixo. Para ser perfeita, os dois acordes ficam no estado fundamental: D3 → G2. O soprano desce por grau e o baixo salta uma 5ª para baixo — movimento direto até a oitava, permitido porque o soprano anda por grau.",
          "Achar a sensível. Em Sol, a sensível é F♯. Ela precisa estar no V (é a terça do acorde) e subir para G. Vamos colocá-la no tenor: F♯3 → G3.",
          "Completar o V. Faltam notas para o contralto: D (fundamental) é a escolha natural — dobra a fundamental e fica perto do soprano. V = D3, F♯3, D4, A4.",
          "Completar o I sem perder a terça. O soprano e o tenor já dão G; falta B. O contralto desce D4 → B3 (3ª) e o acorde fica completo: G2, G3, B3, G4.",
          "Revisar: sensível subiu (tenor), nenhuma nota dobrada indevidamente, nenhuma 5ª ou 8ª paralela, contralto e tenor com movimentos pequenos.",
        ] },
        { type: "example", score: EXD.cadSolDobrada, verdict: "incorreto", caption: "Uma primeira tentativa comum: sensível dobrada", commentary: "Quem pensa 'o F♯ tem que subir' e o coloca em duas vozes ganha um problema duplo: as duas sensíveis sobem juntas para G e formam oitavas paralelas (contralto–tenor), e o I fica sem terça. O motor acusa os três fatos." },
        { type: "example", score: EXD.cadSolPasso, verdict: "correto", caption: "Resultado do passo a passo", commentary: "F♯ aparece uma vez (tenor) e resolve; o contralto busca a terça do I. Compare com a tentativa anterior: mesmas notas no soprano e no baixo, decisão diferente só nas vozes internas." },
        { type: "callout", tone: "dica", title: "Decisão do arranjador: a sensível numa voz interna", text: "Quando a sensível está no contralto ou no tenor, a escrita coral tradicional admite que ela desça à quinta do I (F♯4 → D4) para o acorde final sair completo. No soprano, não: ali o ouvido segue a linha e espera a tônica. O motor registra esse caso como informação, não como erro." },
        { type: "example", score: EXD.cadSolFrustrada, verdict: "correto", caption: "Alternativa válida: sensível interna descendo", commentary: "Contralto F♯4 → D4, tenor A3 → B3. O I fica com fundamental, terça e quinta. Escolha esta versão quando quiser o acorde final mais cheio; a anterior, quando quiser a linha da sensível bem audível." },
      ],
    },
    {
      title: "4. Erros comuns e como corrigi-los",
      blocks: [
        { type: "table", caption: "Erros frequentes na escrita de cadências", headers: ["Erro", "Por que acontece", "Como corrigir"], rows: [["Sensível do soprano descendo (7–5)", "a mão segue o acorde, não a linha", "faça o soprano subir à tônica; se quiser 5 no fim, reescreva para 2–1 ou use autêntica imperfeita"], ["Sensível dobrada no V", "tentar 'reforçar' a dominante", "deixe a sensível numa só voz e dobre a fundamental do V"], ["I sem terça no fim", "todas as vozes correm para a tônica", "leve uma voz interna à terça (do 5º grau do V, por grau, ou da fundamental, por 3ª)"], ["Acorde de chegada no tempo fraco", "a letra foi encaixada sem olhar a métrica", "desloque a cadência para que o I caia no tempo forte; prolongue o V se preciso"], ["Chamar de 'perfeita' uma cadência com I⁶ ou V⁶", "olhar só os acordes, não o baixo", "perfeita exige fundamentais no baixo; com inversão, é imperfeita — escolha conscientemente"]] },
        { type: "example", score: EX.sensivelNaoResolve, verdict: "incorreto", caption: "Autêntica com a sensível do soprano descendo", commentary: "B4 → G4 no soprano enfraquece a cadência: o ouvido esperava C5. O motor aponta e sugere subir para C5; o restante da escrita pode ficar como está." },
      ],
    },
    {
      title: "5. Cadência, texto e estilo",
      blocks: [
        { type: "paragraph", text: "O arranjador lê o texto como uma partitura de pontuação. Fim de estrofe pede autêntica perfeita; vírgula e pergunta, semicadência; uma virada do texto ('mas…', 'e então…') ou uma repetição antes do final combina com a cadência de engano, que adia a conclusão e justifica mais uma frase." },
        { type: "table", caption: "Decisões do arranjador: o mesmo final de soprano (B4 → C5) com harmonias diferentes", headers: ["Harmonização", "Efeito", "Quando escolher"], rows: [["V → I (autêntica perfeita)", "fecha", "último verso; fim de seção"], ["V → vi (engano)", "surpreende e reabre", "antes de repetir o refrão; texto que contradiz a expectativa"], ["V → I⁶ (imperfeita)", "chega, mas continua andando", "fim de verso no meio da estrofe"], ["IV → I com soprano C–C (plagal, se o soprano repetir a tônica)", "confirma, suave", "coda, 'Amém', depois de uma autêntica"]] },
        { type: "callout", tone: "atencao", title: "Regra de estilo, não lei", text: "A hierarquia acima vale para a escrita coral tradicional e para a maior parte do repertório tonal. No pop e no gospel, IV → I e ♭VII → I fecham canções inteiras, e terminar em V7sus4 ou num acorde com 9ª é comum. O que não muda em nenhum estilo: a cadência precisa coincidir com a pontuação e com o tempo forte." },
      ],
    },
    {
      title: "6. Síntese e exercício independente",
      blocks: [
        { type: "list", items: ["Cadência = progressão final + grau do soprano + tempo forte.", "Escreva primeiro soprano e baixo da cadência; depois coloque a sensível numa só voz e resolva-a.", "Perfeita exige fundamentais no baixo e tônica no soprano; qualquer outra coisa é imperfeita — o que pode ser exatamente o que você quer.", "Escolha a cadência pela pontuação do texto."] },
        {
          type: "challenge",
          title: "Pergunta e resposta",
          task: "Harmonize o soprano dado em Dó maior: o 1º compasso ('Vens já?') deve terminar numa semicadência e o 2º ('Sim, vou.') numa autêntica perfeita. Escreva contralto, tenor e baixo, uma nota por mínima.",
          start: EXD.desafioCadStart,
          constraints: ["Não altere o soprano.", "Um acorde por mínima, só tríades e o V7 (sem acordes alterados).", "Estilo coral tradicional; extensões padrão de SATB."],
          criteria: ["O 2º acorde é V e o último é I, ambos com a fundamental no baixo.", "A sensível (B) aparece uma só vez em cada acorde de dominante e sobe para C quando o I chega.", "Se usar V7, a sétima (F) desce para E.", "O motor não aponta erros nem alertas no estilo tradicional."],
          hints: [
            "Comece pelo baixo das duas cadências: o que o baixo faz numa semicadência e numa autêntica perfeita?",
            "O D5 do compasso 2 pertence ao V. Para que a resposta soe mais firme que a pergunta, experimente transformar esse V em V7 — a sétima F pode ficar no contralto.",
            "Baixo possível: C3 – G2 | G2 – C3. Com isso, o tenor pode sustentar G3 no 1º compasso e subir para a sensível B3 no 2º.",
          ],
          solution: {
            score: EXD.desafioCadSol,
            commentary: "I – V | V7 – I. No 1º compasso, o soprano desce C5 → B4 e o baixo C3 → G2: a pergunta fica suspensa na dominante. No 2º, as vozes superiores sobem uma 3ª sobre o baixo parado (o V vira V7 com o F4 no contralto); depois, sensível B3 → C4 no tenor e sétima F4 → E4 no contralto. O I final fica sem quinta — o preço normal de um V7 completo resolvendo bem.",
            alternatives: ["Com D5 no soprano, o 1º tempo do compasso 2 também aceitaria ii⁶ (F3 no baixo; D5 é a fundamental do ii). Mas então não sobraria tempo para o V antes do I, e ii⁶ → I não é cadência autêntica: aqui o V (ou V7) é obrigatório.", "Manter o V sem sétima no 2º compasso também resolve: contralto D4 → E4 e tenor B3 → C4 dão um I completo (C3, C4, E4, C5). O V7 só torna a 'resposta' mais enfática."],
          },
        },
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
