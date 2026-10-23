import { CHORALE_SATB_C, CHORALE_TTBB_G } from "@/domain/music/examples";
import { EX } from "../examples";
import type { Lesson } from "../types";

export const lessonAnaliseMelodica: Lesson = {
  id: "analise-melodica",
  title: "Análise melódica e frase",
  summary: "Contorno, ponto culminante, notas estruturais, frases, cadências implícitas e respiração.",
  levelId: "n3",
  unitId: "n3-u1",
  status: "disponivel",
  prerequisites: ["setimas-resolucao"],
  estimatedMinutes: 50,
  competencies: ["harmonia-funcional", "texto-e-prosodia"],
  objectives: [
    "Identificar frases, pontos culminantes e notas estruturais de uma melodia.",
    "Deduzir a cadência implícita no fim de cada frase.",
    "Avaliar a cantabilidade de uma linha (saltos, compensação, tessitura).",
  ],
  sections: [
    {
      title: "1. Ler a melodia antes de harmonizar",
      blocks: [
        { type: "list", ordered: true, items: ["Marque as respirações (pausas, fins de verso): são os limites das frases.", "Ache o ponto culminante de cada frase.", "Identifique notas estruturais (tempos fortes, notas longas) e notas de passagem.", "No fim de cada frase, pergunte: a melodia termina em 1, 3 ou 5 (conclusiva) ou em 2, 7, 5 (suspensiva)?"] },
        { type: "example", score: EX.melodiaFrase, verdict: "correto", caption: "Duas frases: antecedente e consequente", commentary: "A 1ª frase termina em G4 (5º grau, sobre V: semicadência implícita) e respira; a 2ª sobe ao ponto culminante D5 e termina em C5 (tônica: cadência autêntica implícita)." },
        { type: "example", score: EX.melodiaSalto, verdict: "observacao", caption: "Salto grande sem compensação", commentary: "C4 → A4 (6ª maior) seguido de movimento na mesma direção: o motor sugere compensar descendo por grau." },
        { type: "listening", title: "Cante as duas frases", score: EX.melodiaFrase, instructions: ["Respire na pausa do compasso 2.", "Sinta o ponto culminante no compasso 3."], focus: [["S"]] },
      ],
    },
  ],
  exercises: {
    id: "ex-analise-melodica",
    title: "Verificação: análise melódica",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["am-cadencia"],
    staticItems: [
      { id: "am-cadencia", kind: "choice", skill: "harmonia-funcional", prompt: "Uma frase termina no 2º grau da escala, em nota longa. Que cadência a melodia sugere?", options: [{ id: "a", label: "Semicadência (V)" }, { id: "b", label: "Autêntica (I)" }, { id: "c", label: "Plagal" }], correctOptionId: "a", explanation: "O 2º grau pertence ao V (é a sua quinta): o final suspensivo pede semicadência." },
      { id: "am-culminante", kind: "choice", skill: "texto-e-prosodia", prompt: "Onde costuma ficar o ponto culminante de uma frase cantável?", options: [{ id: "a", label: "Uma única vez, perto do fim da frase ou do 2/3 dela" }, { id: "b", label: "Repetido várias vezes no início" }, { id: "c", label: "Sempre na primeira nota" }], correctOptionId: "a", explanation: "Um único ponto culminante, preparado e seguido de descida, dá direção à frase." },
    ],
    generators: [{ type: "interval-identification", count: 3, maxNumber: 6 }, { type: "cadence-identification", count: 3 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a cadência implícita.",
  application: { title: "Aplicação no Estúdio", steps: ["Abra a melodia em duas frases (exemplo desta lição) no Estúdio.", "Anote, nas notas do arranjo, a cadência implícita de cada frase.", "Use-a como soprano no projeto de harmonização da próxima lição."] },
};

export const lessonHarmonizacao: Lesson = {
  id: "harmonizacao-satb",
  title: "Harmonização de melodias em SATB",
  summary: "Do soprano ao coral: escolha de acordes, linha do baixo, vozes internas e revisão com o motor.",
  levelId: "n3",
  unitId: "n3-u1",
  status: "disponivel",
  prerequisites: ["analise-melodica"],
  estimatedMinutes: 75,
  competencies: ["escrita-satb", "harmonia-funcional", "conducao-de-vozes"],
  objectives: [
    "Escolher acordes para cada nota estrutural de uma melodia, respeitando as funções e as cadências.",
    "Escrever primeiro o baixo em contraponto com o soprano, depois as vozes internas pelo menor movimento.",
    "Revisar o arranjo com o motor até não haver erros nem alertas no estilo escolhido.",
  ],
  sections: [
    {
      title: "1. Método em cinco passos",
      blocks: [
        { type: "list", ordered: true, items: ["Cadências primeiro: harmonize os finais de frase.", "Para cada nota estrutural, liste os acordes que a contêm (ex.: C está em I, IV, vi).", "Escolha pela direção funcional (T → S → D → T) e pelo ritmo harmônico (mudanças nos tempos fortes).", "Escreva o baixo: movimento contrário ao soprano, inversões para linhas por grau.", "Preencha contralto e tenor com notas comuns e graus conjuntos; revise com o motor."] },
        { type: "example", score: CHORALE_SATB_C, verdict: "correto", caption: "Harmonização completa", commentary: "Cadência autêntica no fim, I⁶₄ cadencial no compasso 3, baixo com inversões que criam linha." },
        { type: "example", score: EX.paralelas, verdict: "incorreto", caption: "Erro típico de harmonização em bloco", commentary: "Mover todas as vozes juntas gera paralelas: o motor localiza os pares de vozes exatos." },
        { type: "listening", title: "Ouça a condução", score: CHORALE_SATB_C, instructions: ["Ouça contralto e tenor isolados: são linhas cantáveis?"], focus: [["A"], ["T"], ["S", "A", "T", "B"]] },
      ],
    },
  ],
  exercises: {
    id: "ex-harmonizacao",
    title: "Verificação: harmonização",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["harm-ordem"],
    staticItems: [
      { id: "harm-ordem", kind: "choice", skill: "escrita-satb", prompt: "Depois de definir os acordes, qual voz escrever primeiro?", options: [{ id: "a", label: "O baixo, em contraponto com o soprano" }, { id: "b", label: "O tenor" }, { id: "c", label: "Todas as vozes ao mesmo tempo, em bloco" }], correctOptionId: "a", explanation: "Soprano e baixo formam o esqueleto: corrigir paralelas e direções nessas duas vozes antes evita retrabalho." },
    ],
    generators: [{ type: "function-identification", count: 3 }, { type: "voice-leading-error", count: 3 }, { type: "cadence-identification", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a ordem de escrita.",
  application: { title: "Projeto prático", steps: ["Abra Projetos → 'Hino a quatro vozes' e harmonize a melodia dada.", "Preencha as justificativas e gere a avaliação por rubrica.", "Compare duas versões e explique o que melhorou."] },
};

export const lessonEscritaTtbb: Lesson = {
  id: "escrita-ttbb",
  title: "Escrita para TTBB",
  summary: "Melodia no Tenor II, fechamento, limites graves, falsete e como adaptar um arranjo SATB.",
  levelId: "n3",
  unitId: "n3-u2",
  status: "disponivel",
  prerequisites: ["harmonizacao-satb"],
  estimatedMinutes: 60,
  competencies: ["escrita-ttbb", "conducao-de-vozes"],
  objectives: [
    "Distribuir acordes em TTBB respeitando extensões e limites graves.",
    "Colocar a melodia no Tenor II (ou no Tenor I) e justificar a escolha.",
    "Adaptar uma harmonização SATB para TTBB sem transposições ingênuas.",
  ],
  sections: [
    {
      title: "1. Particularidades",
      blocks: [
        { type: "list", items: ["Âmbito estreito: acordes predominantemente fechados.", "Quinta ou oitava entre baixo e barítono; terças e sétimas nos tenores.", "Tenor I acima de G4: voz mista/falsete — use em pontos culminantes, não como regra.", "O baixo raramente desce abaixo de F2 em coros amadores."] },
        { type: "example", score: CHORALE_TTBB_G, verdict: "correto", caption: "Cadência em Sol maior", commentary: "Quinta e oitava no grave; tenores em terças e quartas." },
        { type: "example", score: EX.ttbbBaixoFora, verdict: "incorreto", caption: "Baixo em D2", commentary: "Fora da extensão configurada (E2) e, além disso, cria um ⁶₄ sem contexto." },
        { type: "example", score: EX.ttbbGrave, verdict: "observacao", caption: "Terça grave", commentary: "Limite grave de intervalo: abra o acorde." },
      ],
    },
    {
      title: "2. Adaptando SATB → TTBB",
      blocks: [
        { type: "paragraph", text: "Não basta transpor soprano e contralto uma oitava abaixo: o baixo ficaria grave demais e os intervalos internos, embolados. Recomece pela melodia na voz escolhida, mantenha a harmonia e redistribua as notas do acorde segundo as particularidades acima. A tonalidade costuma mudar para que a fundamental do baixo fique em G2–C3." },
        { type: "listening", title: "Ouça a fusão masculina", score: CHORALE_TTBB_G, instructions: ["Ouça os tenores juntos e depois os baixos juntos."], focus: [["T1", "T2"], ["B1", "B2"], ["T1", "T2", "B1", "B2"]] },
      ],
    },
  ],
  exercises: {
    id: "ex-ttbb",
    title: "Verificação: TTBB",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["ttbb-adapt"],
    staticItems: [
      { id: "ttbb-adapt", kind: "choice", skill: "escrita-ttbb", prompt: "Qual é a melhor estratégia para adaptar um coral SATB para TTBB?", options: [{ id: "a", label: "Manter a harmonia, escolher a voz da melodia e redistribuir as notas, revendo a tonalidade" }, { id: "b", label: "Transpor todas as vozes uma oitava abaixo" }, { id: "c", label: "Trocar apenas o soprano por tenor" }], correctOptionId: "a", explanation: "A distribuição precisa ser refeita para o âmbito e os limites graves do coro masculino." },
    ],
    generators: [{ type: "range-check", count: 5 }, { type: "voice-leading-error", count: 3, ruleIds: ["vozes.espacamento", "vozes.cruzamento", "conducao.paralelas"] }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a estratégia de adaptação.",
  application: { title: "Projeto prático", steps: ["Abra Projetos → 'Adaptação para TTBB' e reescreva o coral para vozes masculinas.", "Use Propriedades → Tonalidade para achar a melhor tonalidade.", "Avalie com a rubrica e compare com a versão SATB."] },
};

export const lessonContraponto: Lesson = {
  id: "contraponto-aplicado",
  title: "Contraponto aplicado ao coro",
  summary: "Duas linhas independentes: consonâncias, movimento contrário, imitação e linhas internas cantáveis.",
  levelId: "n4",
  unitId: "n4-u1",
  status: "disponivel",
  prerequisites: ["escrita-ttbb"],
  estimatedMinutes: 60,
  competencies: ["contraponto", "conducao-de-vozes"],
  objectives: [
    "Escrever duas vozes independentes com predominância de consonâncias imperfeitas e movimento contrário.",
    "Evitar paralelas e diretas entre as vozes extremas.",
    "Criar entradas imitativas simples entre naipes.",
  ],
  sections: [
    {
      title: "1. Duas vozes",
      blocks: [
        { type: "paragraph", text: "O contraponto de espécies é um treino de independência: cada nota do baixo contra uma do soprano, consonâncias nos tempos fortes, terças e sextas preferidas, movimento contrário sempre que possível e consonâncias perfeitas só no início e no fim." },
        { type: "example", score: EX.duasVozes, verdict: "correto", caption: "Soprano e baixo independentes", commentary: "8ª – 10ª – 10ª – 12ª – 15ª: começa e termina em consonância perfeita, chega à 12ª com o soprano por grau e à 15ª final por movimento contrário." },
        { type: "example", score: EX.duasVozesParalelas, verdict: "incorreto", caption: "Quintas paralelas a duas vozes", commentary: "As linhas andam juntas em 12ªs: perdem a independência." },
        { type: "callout", tone: "dica", title: "Imitação", text: "Uma entrada imitativa (o contralto repete o motivo do soprano uma 4ª ou 5ª abaixo, um compasso depois) é a forma mais simples de dar vida às vozes internas. Teste no Estúdio com copiar e colar." },
        { type: "listening", title: "Duas linhas", score: EX.duasVozes, instructions: ["Ouça cada voz separada e depois juntas."], focus: [["S"], ["B"], ["S", "B"]] },
      ],
    },
  ],
  exercises: {
    id: "ex-contraponto",
    title: "Verificação: contraponto",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["cp-consonancia"],
    staticItems: [
      { id: "cp-consonancia", kind: "choice", skill: "contraponto", prompt: "No contraponto a duas vozes, quais consonâncias devem predominar no meio da frase?", options: [{ id: "a", label: "Terças e sextas (imperfeitas)" }, { id: "b", label: "Quintas e oitavas (perfeitas)" }, { id: "c", label: "Segundas e sétimas" }], correctOptionId: "a", explanation: "As imperfeitas permitem movimento paralelo sem perda de independência; as perfeitas ficam para início e fim." },
    ],
    generators: [{ type: "motion-type", count: 4 }, { type: "interval-identification", count: 3 }, { type: "voice-leading-error", count: 2, ruleIds: ["conducao.paralelas", "conducao.quintas-oitavas-diretas"] }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o uso das consonâncias.",
  application: { title: "Aplicação no Estúdio", steps: ["Crie um arranjo e escreva um contraponto de oito compassos entre soprano e baixo.", "Copie o motivo inicial do soprano e cole no contralto um compasso depois (imitação).", "Revise com o motor."] },
};

export const lessonProsodia: Lesson = {
  id: "prosodia-respiracao",
  title: "Prosódia, fraseado e respiração",
  summary: "Acentos do português, melismas e silabação, pontos de respiração e respiração escalonada.",
  levelId: "n4",
  unitId: "n4-u1",
  status: "disponivel",
  prerequisites: ["contraponto-aplicado"],
  estimatedMinutes: 50,
  competencies: ["texto-e-prosodia", "arranjo"],
  objectives: [
    "Planejar respirações coerentes com o texto em todas as vozes.",
    "Escolher entre silabação e melisma conforme a importância da palavra.",
    "Indicar respiração escalonada quando a frase musical exceder o fôlego.",
  ],
  sections: [
    {
      title: "1. Texto e fôlego",
      blocks: [
        { type: "paragraph", text: "Respire onde o texto respira: vírgulas, fins de verso, antes de palavras importantes. Uma respiração no meio de uma palavra é um erro de arranjo, não do cantor. Todas as vozes precisam de pausas — não só a melodia." },
        { type: "example", score: EX.melodiaFrase, verdict: "correto", caption: "Respiração entre frases", commentary: "A pausa no compasso 2 coincide com o fim da primeira frase." },
        { type: "example", score: EX.semRespiracao, verdict: "observacao", caption: "20 segundos sem pausa", commentary: "O motor sugere planejar respirações (heurística de 15 s). Em coro, a respiração escalonada resolve notas longas — indique-a na partitura." },
        { type: "callout", tone: "atencao", title: "Limite do motor", text: "O motor ainda não lê a acentuação das sílabas. Ao escrever a letra no Estúdio, marque as sílabas tônicas em maiúsculas para conferir visualmente o alinhamento com os tempos fortes." },
        { type: "listening", title: "Respire com a frase", score: EX.melodiaFrase, instructions: ["Cante e respire apenas na pausa."], focus: [["S"]] },
      ],
    },
  ],
  exercises: {
    id: "ex-prosodia",
    title: "Verificação: prosódia e respiração",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["pr-escalonada"],
    staticItems: [
      { id: "pr-escalonada", kind: "choice", skill: "texto-e-prosodia", prompt: "O que é respiração escalonada?", options: [{ id: "a", label: "Os cantores de um naipe revezam o momento de respirar para sustentar uma nota ou frase longa" }, { id: "b", label: "Todos respiram juntos a cada compasso" }, { id: "c", label: "Respirar em escalas" }], correctOptionId: "a", explanation: "Ninguém respira ao mesmo tempo que o vizinho: o som do naipe não se interrompe." },
      { id: "pr-melisma", kind: "choice", skill: "texto-e-prosodia", prompt: "Onde um melisma (várias notas numa sílaba) é mais adequado?", options: [{ id: "a", label: "Em sílaba tônica de palavra importante, com vogal aberta" }, { id: "b", label: "Em artigos e preposições" }, { id: "c", label: "Em consoantes" }], correctOptionId: "a", explanation: "O melisma enfatiza: deve recair em sílabas que merecem destaque e que soam bem sustentadas." },
      { id: "pr-onde", kind: "choice", skill: "texto-e-prosodia", prompt: "Onde marcar respirações no arranjo?", options: [{ id: "a", label: "Nos pontos de pontuação e fins de verso, em todas as vozes" }, { id: "b", label: "Só na melodia" }, { id: "c", label: "No meio das palavras longas" }], correctOptionId: "a", explanation: "Todas as vozes cantam o texto e precisam de respirações coerentes com ele." },
    ],
    generators: [{ type: "interval-identification", count: 3, maxNumber: 5 }, { type: "cadence-identification", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo respiração escalonada.",
  application: { title: "Aplicação no Estúdio", steps: ["Escreva a letra de um verso na melodia do Estúdio (campo 'Sílaba da letra').", "Insira pausas de respiração nas quatro vozes e confirme que o motor não sugere mais respirações."] },
};

export const lessonAcompanhamento: Lesson = {
  id: "acompanhamento-introducoes",
  title: "Acompanhamento, introduções e interlúdios",
  summary: "Funções do acompanhamento, introduções a partir de motivos e transições entre estrofes — inclusive a cappella.",
  levelId: "n5",
  unitId: "n5-u1",
  status: "disponivel",
  prerequisites: ["prosodia-respiracao"],
  estimatedMinutes: 50,
  competencies: ["arranjo"],
  objectives: [
    "Planejar uma introdução que apresente tonalidade, andamento e um motivo da canção.",
    "Escrever interlúdios que preparem a entrada seguinte (dominante no fim).",
    "Definir a função do acompanhamento (apoio harmônico, rítmico ou contracanto).",
  ],
  sections: [
    {
      title: "1. Introduções",
      blocks: [
        { type: "paragraph", text: "Uma introdução dá ao coro a nota e o andamento e ao público o caráter. Receitas seguras: os últimos compassos da canção; um motivo da melodia em imitação; ou a cadência final como 'pedal' em bocca chiusa (boca fechada). Termine na dominante ou na tônica com a nota inicial da melodia em evidência." },
        { type: "example", score: CHORALE_TTBB_G, verdict: "correto", caption: "Cadência final usada como introdução em bocca chiusa", commentary: "Quatro compassos que estabelecem Sol maior e terminam na tônica: o Tenor II já encontra sua primeira nota." },
        { type: "example", score: EX.ttbbBaixoFora, verdict: "incorreto", caption: "Introdução grave demais", commentary: "Começar fora da extensão do baixo compromete a afinação desde o primeiro acorde." },
        { type: "callout", tone: "dica", title: "Acompanhamento instrumental", text: "Nesta versão o Estúdio escreve apenas vozes. Para arranjos com piano, planeje o acompanhamento como uma quinta camada: dobrar o baixo e a harmonia, sem duplicar a melodia o tempo todo, dá apoio sem tirar a independência do coro." },
        { type: "listening", title: "Ouça a introdução", score: CHORALE_TTBB_G, instructions: ["Ouça e cante a primeira nota do Tenor II em seguida."], focus: [["T1", "T2", "B1", "B2"]] },
      ],
    },
  ],
  exercises: {
    id: "ex-acompanhamento",
    title: "Verificação: introduções",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["ac-fim"],
    staticItems: [
      { id: "ac-fim", kind: "choice", skill: "arranjo", prompt: "Em que acorde uma introdução costuma terminar?", options: [{ id: "a", label: "Na dominante (ou na tônica com a nota inicial da melodia em evidência)" }, { id: "b", label: "Num acorde diminuto" }, { id: "c", label: "No IV, sempre" }], correctOptionId: "a", explanation: "A dominante 'chama' a entrada do coro; a tônica funciona quando a nota inicial está clara." },
      { id: "ac-funcao", kind: "choice", skill: "arranjo", prompt: "Qual destas é uma função legítima do acompanhamento?", options: [{ id: "a", label: "Dar apoio harmônico e rítmico sem dobrar a melodia o tempo todo" }, { id: "b", label: "Tocar sempre a melodia para os cantores" }, { id: "c", label: "Substituir o baixo do coro" }], correctOptionId: "a", explanation: "Dobrar a melodia constantemente tira a autonomia do coro e esconde problemas de afinação." },
    ],
    generators: [{ type: "cadence-identification", count: 3 }, { type: "function-identification", count: 3 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o final da introdução.",
  application: { title: "Aplicação no Estúdio", steps: ["Antes do seu arranjo, crie quatro compassos de introdução copiando a cadência final.", "Termine na dominante e verifique a entrada do coro."] },
};

export const lessonModulacao: Lesson = {
  id: "modulacao-reharmonizacao",
  title: "Modulação e reharmonização",
  summary: "Dominantes secundárias, tonicização, modulação por acorde comum e reharmonização com condução coerente.",
  levelId: "n5",
  unitId: "n5-u1",
  status: "disponivel",
  prerequisites: ["acompanhamento-introducoes"],
  estimatedMinutes: 65,
  competencies: ["arranjo", "harmonia-funcional", "conducao-de-vozes"],
  objectives: [
    "Escrever dominantes secundárias (V/V, V⁷/IV) com a sensível secundária resolvendo.",
    "Modular por acorde comum (pivô) entre tonalidades vizinhas.",
    "Reharmonizar uma melodia mantendo a condução sem paralelas.",
  ],
  sections: [
    {
      title: "1. Tonicização e dominantes secundárias",
      blocks: [
        { type: "paragraph", text: "Uma dominante secundária é o V (ou V7, vii°) de um grau diferente da tônica. Em Dó maior, D–F♯–A–C é o V⁷/V: o F♯ é a 'sensível' de G e sobe para ele; o C (sétima) desce para B. A cifragem do Estúdio reconhece essas funções automaticamente." },
        { type: "example", score: EX.tonicizacao, verdict: "correto", caption: "I – V⁷/V – V – I", commentary: "F♯4 (contralto) sobe para G4; a sétima C4 (tenor) desce para B3. O motor cifra V⁷/V e não encontra problemas." },
      ],
    },
    {
      title: "2. Modulação por acorde comum",
      blocks: [
        { type: "paragraph", text: "Para ir de Dó maior a Sol maior, escolha um acorde que pertença às duas tonalidades (pivô): Lá menor é vi em Dó e ii em Sol. Depois do pivô, use a dominante da nova tonalidade (D7) e confirme com uma cadência. Limitação atual: o motor analisa tudo na tonalidade da partitura, então a nova região aparece como funções secundárias." },
        { type: "example", score: EX.paralelas, verdict: "incorreto", caption: "Reharmonização em bloco", commentary: "Trocar acordes sem cuidar da condução cria paralelas; reharmonizar é sempre reconduzir as vozes." },
        { type: "listening", title: "Ouça a tonicização", score: EX.tonicizacao, instructions: ["Ouça o contralto: F♯ → G.", "Ouça o conjunto e sinta o 'brilho' do V⁷/V."], focus: [["A"], ["S", "A", "T", "B"]] },
      ],
    },
  ],
  exercises: {
    id: "ex-modulacao",
    title: "Verificação: modulação",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["mod-vv"],
    staticItems: [
      { id: "mod-vv", kind: "choice", skill: "harmonia-funcional", prompt: "Em Dó maior, qual é o V⁷/V?", options: [{ id: "a", label: "D–F♯–A–C" }, { id: "b", label: "G–B–D–F" }, { id: "c", label: "A–C♯–E–G" }], correctOptionId: "a", explanation: "V/V é a dominante de G: D maior com sétima menor (C)." },
      { id: "mod-pivo", kind: "choice", skill: "harmonia-funcional", prompt: "Qual acorde serve de pivô entre Dó maior e Sol maior?", options: [{ id: "a", label: "Lá menor (vi em Dó, ii em Sol)" }, { id: "b", label: "Fá maior" }, { id: "c", label: "Si♭ maior" }], correctOptionId: "a", explanation: "O pivô pertence às duas tonalidades. Fá maior não existe em Sol maior (F♯)." },
    ],
    generators: [{ type: "function-identification", count: 3 }, { type: "key-signature", count: 3 }, { type: "voice-leading-error", count: 2, ruleIds: ["harmonia.resolucao-da-setima", "harmonia.resolucao-da-sensivel"] }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o V⁷/V.",
  application: { title: "Aplicação no Estúdio", steps: ["No coral SATB, transforme o ii do compasso 2 em V⁷/V (D–F♯–A–C).", "Confira a cifragem e a resolução da sensível secundária.", "Escreva uma frase que module para Sol maior com Lá menor como pivô."] },
};

export const lessonEstilo: Lesson = {
  id: "analise-estilistica-revisao",
  title: "Análise estilística, revisão e preparação de partituras",
  summary: "O mesmo arranjo sob três estilos, revisão sistemática com diagnósticos e a partitura de ensaio.",
  levelId: "n5",
  unitId: "n5-u1",
  status: "disponivel",
  prerequisites: ["modulacao-reharmonizacao"],
  estimatedMinutes: 55,
  competencies: ["arranjo", "conducao-de-vozes"],
  objectives: [
    "Diferenciar erro objetivo, convenção estilística, recomendação e escolha estética num relatório de diagnósticos.",
    "Revisar um arranjo em etapas (estrutura → extensão → condução → harmonia → texto).",
    "Preparar a partitura final: letra, dinâmicas, respirações e exportação.",
  ],
  sections: [
    {
      title: "1. Estilo muda a gravidade, não os fatos",
      blocks: [
        { type: "example", score: EX.paralelas, verdict: "incorreto", caption: "Coral tradicional", commentary: "Paralelas são erro de convenção." },
        { type: "example", score: EX.paralelasPopular, verdict: "observacao", caption: "Popular a cappella", commentary: "O mesmo fato vira sugestão. O relatório sempre diz o que encontrou; o estilo decide o peso." },
      ],
    },
    {
      title: "2. Roteiro de revisão",
      blocks: [
        { type: "list", ordered: true, items: ["Estrutura: durações completas, nada atravessando barras.", "Extensão e tessitura de cada voz.", "Condução: paralelas, diretas, espaçamento, cruzamentos.", "Harmonia: sensível, sétimas, duplicações, cadências.", "Texto: prosódia, respirações, melismas.", "Partitura: dinâmicas, articulações, título, exportação (MusicXML, MIDI, PDF)."] },
        { type: "example", score: CHORALE_SATB_C, verdict: "correto", caption: "Arranjo revisado", commentary: "Relatório limpo no estilo tradicional." },
        { type: "listening", title: "Escuta final", score: CHORALE_SATB_C, instructions: ["Ouça cada voz isolada como um cantor do naipe ouviria."], focus: [["S"], ["A"], ["T"], ["B"]] },
      ],
    },
  ],
  exercises: {
    id: "ex-estilo",
    title: "Verificação: estilo e revisão",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["est-categoria"],
    staticItems: [
      { id: "est-categoria", kind: "choice", skill: "arranjo", prompt: "Uma nota fora da extensão configurada é…", options: [{ id: "a", label: "Erro objetivo (relativo à extensão configurada)" }, { id: "b", label: "Escolha estética" }, { id: "c", label: "Convenção estilística" }], correctOptionId: "a", explanation: "É verificável sem juízo de estilo: o naipe não alcança a nota com segurança." },
      { id: "est-paralelas", kind: "choice", skill: "arranjo", prompt: "Quintas paralelas num arranjo pop são…", options: [{ id: "a", label: "Uma convenção do estilo tradicional que pode ser escolha estética no pop" }, { id: "b", label: "Sempre erro objetivo" }, { id: "c", label: "Impossíveis de cantar" }], correctOptionId: "a", explanation: "O motor registra o fato e ajusta a gravidade ao estilo escolhido." },
    ],
    generators: [{ type: "voice-leading-error", count: 4 }, { type: "nct-identification", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo categorias de diagnóstico.",
  application: { title: "Projeto final", steps: ["Abra Projetos → 'Arranjo completo' e siga o roteiro de revisão.", "Exporte MusicXML, MIDI e PDF.", "Gere a avaliação por rubrica e compare com a versão anterior."] },
};
