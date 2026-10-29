import { PARALLELS_FIXED_SATB, PARALLELS_SATB } from "@/domain/music/examples";
import { EXC } from "../examples-cp";
import { EXR } from "../examples-rearm";
import { EXG } from "../examples-regencia";
import type { Lesson } from "../types";

/**
 * REG401 — Regência Coral e Preparação de Ensaio. O que o arranjador precisa
 * para levar a própria partitura ao coro: gesto, aquecimento, afinação, ensino
 * por naipe, respiração, equilíbrio, revisão e adaptação ao grupo real. Os
 * exemplos são originais e conferidos pelo motor.
 */

export const lessonRegGesto: Lesson = {
  id: "reg-gesto",
  title: "Gesto básico: padrões, preparação, entrada e corte",
  summary: "Os padrões de 2, 3, 4 e 6 tempos, a preparação que faz o coro respirar junto, a anacruse e o corte, e o andamento como decisão do regente.",
  levelId: "s4",
  unitId: "s4-reg",
  status: "disponivel",
  prerequisites: ["ritmo-metrica-texto", "harmonizacao-satb"],
  estimatedMinutes: 55,
  competencies: ["regencia-e-ensaio", "leitura-vocal"],
  objectives: [
    "Reger os padrões de 2, 3, 4 e 6 tempos com a mão direita.",
    "Dar a preparação no tempo anterior à entrada, inclusive em anacruse.",
    "Escolher o andamento pensando na respiração do coro.",
  ],
  sections: [
    {
      title: "1. Os padrões",
      blocks: [
        { type: "paragraph", text: "O gesto do regente mostra onde está cada tempo. O primeiro tempo sempre desce (o 'ictus' mais forte), o último sempre sobe para preparar o compasso seguinte, e os do meio vão para dentro ou para fora. A mão esquerda fica livre para entradas, dinâmica e cortes." },
        {
          type: "table",
          caption: "Padrões de regência (mão direita)",
          headers: ["Compasso", "Tempo 1", "Tempo 2", "Tempo 3", "Tempo 4", "Observação"],
          rows: [
            ["2/4", "Baixo", "Cima", "—", "—", "Também serve para 6/8 rápido (em dois)"],
            ["3/4", "Baixo", "Fora (direita)", "Cima", "—", "Valsa rápida: em um"],
            ["4/4", "Baixo", "Dentro (esquerda)", "Fora (direita)", "Cima", "O padrão mais usado em hinos"],
            ["6/8 em seis", "Baixo", "Dentro", "Dentro", "Fora (4 e 5)", "6 sobe; em andamento lento"],
          ],
        },
        { type: "callout", tone: "dica", title: "Preparação", text: "Antes da entrada, o regente faz um tempo de preparação no andamento da música: o coro respira nesse gesto. Numa anacruse, a preparação é o tempo imediatamente anterior à entrada, e não o tempo 1." },
        { type: "example", score: EXG.hino3, verdict: "correto", caption: "Hino em 3/4 com anacruse", commentary: "O coro entra no terceiro tempo ('Vem'), sobre o acorde de Ré (V), e chega ao Sol no tempo forte do compasso 2. A preparação é o gesto do tempo 2 (para fora), onde o coro respira." },
        { type: "listening", title: "Sinta o três", score: EXG.hino3, instructions: ["Ouça e marque os tempos com a mão: baixo, fora, cima.", "Ouça de novo e respire no tempo 2, antes da entrada."], focus: [["S", "A", "T", "B"], ["S"]] },
      ],
    },
    {
      title: "2. Andamento é decisão",
      blocks: [
        { type: "example", score: EXG.hinoLento, verdict: "observacao", caption: "O mesmo hino a ♩ = 36", commentary: "Nas mesmas notas, a frase passa a durar 16,7 s sem pausa e o motor sugere um ponto de respiração. Um andamento lento demais pode quebrar a frase que, no tempo certo, cabe numa respiração." },
        { type: "list", items: ["Corte: um pequeno círculo ou gesto para cima e para dentro, no tempo em que o som termina.", "Fermata: o gesto para, sustentado; o corte vem quando o regente decide.", "Mantenha o gesto pequeno e o ictus claro: gesto grande não significa forte."] },
      ],
    },
  ],
  exercises: {
    id: "ex-reg-gesto",
    title: "Verificação: gesto",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["reg1-preparacao"],
    staticItems: [
      { id: "reg1-preparacao", kind: "choice", skill: "regencia", prompt: "Para que serve o gesto de preparação?", options: [{ id: "a", label: "Mostrar o andamento e fazer o coro respirar junto antes da entrada" }, { id: "b", label: "Pedir silêncio" }, { id: "c", label: "Marcar o fim da música" }], correctOptionId: "a", explanation: "Respiração no andamento = entrada junta." },
      { id: "reg1-ultimo", kind: "choice", skill: "regencia", prompt: "Em qualquer padrão, o último tempo do compasso vai…", options: [{ id: "a", label: "Para cima" }, { id: "b", label: "Para baixo" }, { id: "c", label: "Para fora" }], correctOptionId: "a", explanation: "O último tempo sobe e prepara o tempo 1 seguinte." },
      { id: "reg1-andamento", kind: "choice", skill: "regencia", prompt: "Por que o andamento afeta a respiração do coro?", options: [{ id: "a", label: "A mesma frase dura mais tempo quanto mais lento o andamento" }, { id: "b", label: "Não afeta" }, { id: "c", label: "Só afeta os baixos" }], correctOptionId: "a", explanation: "Ver o hino a ♩ = 36: 16,7 s sem pausa." },
    ],
    generators: [{ type: "conducting", count: 5 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a função da preparação.",
  application: { title: "Aplicação no Estúdio", steps: ["Abra um hino no Estúdio e toque-o.", "Reja junto com a reprodução, em pé, com a mão direita.", "Mude o andamento no Estúdio e observe quando o motor sugere respiração."] },
};

export const lessonRegAquecimento: Lesson = {
  id: "reg-aquecimento",
  title: "Aquecimento vocal e técnica no ensaio",
  summary: "Postura, respiração, vocalises e uma cadência de aquecimento que já prepara a afinação; por que vocalise em oitavas não é escrita a quatro vozes.",
  levelId: "s4",
  unitId: "s4-reg",
  status: "disponivel",
  prerequisites: ["reg-gesto", "voz-cantada"],
  estimatedMinutes: 45,
  competencies: ["regencia-e-ensaio", "percepcao"],
  objectives: [
    "Montar um aquecimento de 10 a 15 minutos ligado ao repertório do dia.",
    "Usar vocalises simples (cinco notas, arpejo, sirene) na tessitura confortável.",
    "Terminar o aquecimento com uma cadência a quatro vozes.",
  ],
  sections: [
    {
      title: "1. Roteiro de aquecimento",
      blocks: [
        { type: "list", ordered: true, items: ["Corpo e postura (1–2 min): soltar ombros, pescoço, mandíbula.", "Respiração (2 min): inspirar sem levantar os ombros, soltar em 's' contínuo.", "Ressonância (2 min): 'm' e 'n' em notas médias, sirenes suaves.", "Vocalises (5 min): cinco notas e arpejos, subindo por semitom só até a tessitura confortável.", "Afinação (3 min): uma cadência a quatro vozes em vogal, ouvindo os outros naipes."] },
        { type: "example", score: EXG.cadenciaAquecimento, verdict: "correto", caption: "Cadência I – IV – V – I em vogal 'u'", commentary: "Sol – Dó – Ré – Sol em semibreves, cada voz andando pouco. Serve para ouvir o acorde, ajustar a terça e treinar o fim junto." },
        { type: "listening", title: "Ouça o acorde se formar", score: EXG.cadenciaAquecimento, instructions: ["Ouça o baixo.", "Ouça as quatro vozes e preste atenção na terça de cada acorde."], focus: [["B"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "2. Vocalise não é arranjo",
      blocks: [
        { type: "example", score: EXG.vocaliseOitavas, verdict: "incorreto", caption: "Vocalise em oitavas", commentary: "Todos cantam a mesma escala de cinco notas, em oitavas e uníssono. Para aquecer é ótimo; como escrita a quatro vozes, o motor reprova cada passo como oitavas e uníssonos paralelos. Use o uníssono no aquecimento e a cadência para a afinação." },
        { type: "callout", tone: "atencao", title: "Cuidado com o agudo", text: "Ao subir vocalises por semitom, pare antes do limite da tessitura de cada naipe. Tenores e sopranos amadores cansam rápido no agudo, e o ensaio ainda nem começou." },
      ],
    },
  ],
  exercises: {
    id: "ex-reg-aquecimento",
    title: "Verificação: aquecimento",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["reg2-ordem"],
    staticItems: [
      { id: "reg2-ordem", kind: "choice", skill: "regencia", prompt: "Qual é uma ordem razoável de aquecimento?", options: [{ id: "a", label: "Corpo, respiração, ressonância, vocalises, afinação" }, { id: "b", label: "Agudos primeiro, depois respiração" }, { id: "c", label: "Começar direto pelo trecho mais difícil" }], correctOptionId: "a", explanation: "Do corpo para o som, do simples para o afinado." },
      { id: "reg2-vocalise", kind: "choice", skill: "regencia", prompt: "Até onde subir um vocalise por semitom?", options: [{ id: "a", label: "Até o limite confortável de cada naipe" }, { id: "b", label: "Até a nota mais aguda que alguém alcançar" }, { id: "c", label: "Uma oitava acima da tessitura" }], correctOptionId: "a", explanation: "Aquecer não é cansar." },
      { id: "reg2-cadencia", kind: "choice", skill: "regencia", prompt: "Por que terminar o aquecimento com uma cadência a quatro vozes?", options: [{ id: "a", label: "Para treinar escutar o acorde e afinar junto" }, { id: "b", label: "Para cansar o coro" }, { id: "c", label: "Porque é obrigatório" }], correctOptionId: "a", explanation: "Liga o aquecimento ao trabalho de afinação." },
    ],
    generators: [{ type: "range-check", count: 3 }, { type: "interval-identification", count: 2, earOnly: true, maxNumber: 8 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a ordem do aquecimento.",
  application: { title: "Aplicação no Estúdio", steps: ["Escreva no Estúdio uma cadência de aquecimento na tonalidade do hino que o coro vai ensaiar.", "Valide: as vozes devem andar pouco e sem paralelas.", "Use a reprodução de cada voz isolada para ensinar cada naipe."] },
};

export const lessonRegAfinacao: Lesson = {
  id: "reg-afinacao",
  title: "Afinação e acorde: construir de baixo para cima",
  summary: "Afinação como escuta: construir o acorde a partir do baixo, cuidar da terça e da sensível, e o que dobrar num acorde de afinação.",
  levelId: "s4",
  unitId: "s4-reg",
  status: "disponivel",
  prerequisites: ["reg-aquecimento"],
  estimatedMinutes: 50,
  competencies: ["regencia-e-ensaio", "percepcao"],
  objectives: [
    "Construir acordes com entradas sucessivas: fundamental, quinta, terça e oitava.",
    "Explicar por que a terça e a sensível pedem atenção na afinação.",
    "Evitar dobrar a terça num acorde de afinação.",
  ],
  sections: [
    {
      title: "1. De baixo para cima",
      blocks: [
        { type: "paragraph", text: "Num exercício de afinação, cada naipe entra sobre o que já está soando: primeiro a fundamental (baixos), depois a quinta (tenores), a terça (contraltos) e a oitava (sopranos). Cada entrada ouve as anteriores. A quinta pede som estável; a terça maior costuma soar melhor um pouco mais baixa que no piano; a sensível tende a subir." },
        { type: "example", score: EXG.acordeEscalonado, verdict: "correto", caption: "Acorde construído por entradas", commentary: "Baixo em Dó3, tenor em Sol3 no compasso 2, contralto em Mi4 no 3 e soprano em Dó5 no 4. A terça aparece uma vez só." },
        { type: "listening", title: "Entradas sucessivas", score: EXG.acordeEscalonado, instructions: ["Ouça o baixo e o tenor: a quinta.", "Ouça a entrada da terça.", "Ouça o acorde completo."], focus: [["T", "B"], ["A", "T", "B"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "2. O que dobrar",
      blocks: [
        { type: "example", score: EXG.acordeTercaDobrada, verdict: "observacao", caption: "Acorde de afinação com a terça dobrada", commentary: "Soprano e tenor cantam Mi: a terça dobrada pesa no acorde e é a nota mais difícil de afinar. Num exercício de afinação, dobre a fundamental." },
        {
          type: "table",
          caption: "Notas que pedem atenção",
          headers: ["Nota", "Tendência", "No ensaio"],
          rows: [["Terça maior", "Soa alta se cantada 'como no piano'", "Pedir menos volume e mais escuta"], ["Sensível", "Quer subir", "Não deixar cair na resolução"], ["Sétima", "Quer descer", "Resolver por grau, sem pressa"], ["Uníssono", "Qualquer desvio aparece", "Ouvir o vizinho, não o piano"]],
        },
      ],
    },
  ],
  exercises: {
    id: "ex-reg-afinacao",
    title: "Verificação: afinação",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["reg3-ordem"],
    staticItems: [
      { id: "reg3-ordem", kind: "choice", skill: "regencia", prompt: "Numa construção de acorde de baixo para cima, qual é a ordem usual das entradas?", options: [{ id: "a", label: "Fundamental, quinta, terça, oitava" }, { id: "b", label: "Terça, oitava, quinta, fundamental" }, { id: "c", label: "Todas juntas" }], correctOptionId: "a", explanation: "Primeiro o chão, depois as notas que dão cor." },
      { id: "reg3-terca", kind: "choice", skill: "percepcao", prompt: "Num acorde maior sustentado, a terça costuma soar melhor…", options: [{ id: "a", label: "Um pouco mais baixa que a do piano" }, { id: "b", label: "Mais alta que a do piano" }, { id: "c", label: "Exatamente igual, sempre" }], correctOptionId: "a", explanation: "A terça justa (acústica) é mais baixa que a temperada." },
      { id: "reg3-dobrar", kind: "choice", skill: "regencia", prompt: "Num acorde de afinação, qual nota dobrar?", options: [{ id: "a", label: "A fundamental" }, { id: "b", label: "A terça" }, { id: "c", label: "A sensível" }], correctOptionId: "a", explanation: "A terça dobrada pesa e desafina mais facilmente." },
    ],
    generators: [{ type: "chord-identification", count: 3 }, { type: "interval-identification", count: 2, earOnly: true, maxNumber: 8 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a ordem das entradas.",
  application: { title: "Aplicação no Estúdio", steps: ["Escreva um acorde construído por entradas na tonalidade do repertório.", "Valide e confira os dobramentos.", "Use o player com cada voz isolada para ensinar as entradas."] },
};

export const lessonRegNaipes: Lesson = {
  id: "reg-ensaio-naipes",
  title: "Ensinar as notas: naipes, trechos difíceis e ordem do ensaio",
  summary: "Como ensinar uma partitura nova: estrutura do ensaio, trabalho por naipe, trechos difíceis primeiro e a reescrita de um intervalo que ninguém consegue cantar.",
  levelId: "s4",
  unitId: "s4-reg",
  status: "disponivel",
  prerequisites: ["reg-afinacao", "analise-melodica"],
  estimatedMinutes: 55,
  competencies: ["regencia-e-ensaio", "conducao-de-vozes"],
  objectives: [
    "Planejar a ordem do ensaio de uma peça nova.",
    "Identificar os trechos difíceis de cada naipe antes do ensaio.",
    "Reescrever uma linha com intervalo aumentado sem mudar a harmonia.",
  ],
  sections: [
    {
      title: "1. Antes do ensaio, cante cada voz",
      blocks: [
        { type: "paragraph", text: "O regente precisa cantar todas as vozes antes de ensaiar. Saltos grandes, intervalos aumentados, entradas sem referência e notas longas no limite da tessitura são os pontos em que o naipe trava. Marque esses trechos e decida: ensinar com calma ou, se o arranjo é seu, reescrever." },
        { type: "example", score: EXG.contraltoAumentada, verdict: "incorreto", caption: "Contralto com segunda aumentada", commentary: "Em Lá menor, a contralto vai de Fá a Sol♯: uma segunda aumentada, difícil de afinar para cantores amadores. O motor marca o intervalo." },
        { type: "example", score: EXG.contraltoGrau, verdict: "correto", caption: "A mesma cadência reescrita", commentary: "A contralto desce Fá → Mi, por grau; a sensível (Sol♯) passa para o tenor, que vai Lá → Sol♯ → Lá. A harmonia é a mesma, e as duas linhas ficam fáceis de cantar." },
        { type: "listening", title: "Compare as contraltos", score: EXG.contraltoGrau, instructions: ["Ouça a contralto da versão reescrita.", "Ouça o tenor com a sensível.", "Ouça as quatro vozes."], focus: [["A"], ["T"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "2. Estrutura do ensaio",
      blocks: [
        { type: "list", ordered: true, items: ["Aquecimento ligado ao repertório (10–15 min).", "Visão geral: ouvir a gravação-guia ou cantar a melodia juntos.", "Trechos difíceis primeiro, por naipe ou em pares (sopranos e contraltos, tenores e baixos).", "Juntar as vozes por seções curtas, do fim para o começo quando o final é o mais difícil.", "Passar a peça inteira, mesmo com erros, para o coro sentir a forma.", "Fechar com algo que o coro já canta bem."] },
        { type: "callout", tone: "dica", title: "Kit de ensaio", text: "O PDF e o MIDI que o Estúdio exporta, e a reprodução de cada voz isolada no player, economizam tempo de ensaio: cada naipe estuda em casa e chega sabendo as notas (aula 'Partitura final, kit de ensaio e adaptação ao grupo')." },
      ],
    },
  ],
  exercises: {
    id: "ex-reg-naipes",
    title: "Verificação: ensaio por naipe",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["reg4-antes"],
    staticItems: [
      { id: "reg4-antes", kind: "choice", skill: "regencia", prompt: "O que o regente deve fazer antes de ensaiar uma peça nova?", options: [{ id: "a", label: "Cantar todas as vozes e marcar os trechos difíceis" }, { id: "b", label: "Só ouvir a gravação" }, { id: "c", label: "Ler apenas a melodia" }], correctOptionId: "a", explanation: "Quem não cantou a voz não sabe onde ela trava." },
      { id: "reg4-aumentada", kind: "choice", skill: "conducao-de-vozes", prompt: "Uma contralto amadora não afina a segunda aumentada Fá → Sol♯. Se o arranjo é seu, o que fazer?", options: [{ id: "a", label: "Passar a sensível para outra voz e deixar a contralto andar por grau" }, { id: "b", label: "Repetir o trecho até dar certo, sem mudar nada" }, { id: "c", label: "Tirar a contralto do trecho" }], correctOptionId: "a", explanation: "A harmonia continua igual; só muda quem canta cada nota." },
      { id: "reg4-ordem", kind: "choice", skill: "regencia", prompt: "Em que momento do ensaio entram os trechos difíceis?", options: [{ id: "a", label: "Logo após o aquecimento, com o coro descansado" }, { id: "b", label: "No fim, quando o coro está cansado" }, { id: "c", label: "Nunca: o coro aprende sozinho" }], correctOptionId: "a", explanation: "Concentração e voz descansada rendem mais." },
    ],
    generators: [{ type: "interval-identification", count: 3, maxNumber: 8 }, { type: "voice-leading-error", count: 2, ruleIds: ["conducao.paralelas", "harmonia.resolucao-da-sensivel"] }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a preparação antes do ensaio.",
  application: { title: "Aplicação no Estúdio", steps: ["Abra um arranjo seu e cante cada voz com o player.", "Anote no seu plano de ensaio os trechos difíceis de cada naipe (com o número do compasso).", "Reescreva um deles sem mudar a harmonia e valide."] },
};

export const lessonRegRespiracao: Lesson = {
  id: "reg-respiracao",
  title: "Respiração, frase e cortes",
  summary: "Onde o coro respira, respiração escalonada nas notas longas, cortes nas consoantes finais e como marcar tudo isso na partitura.",
  levelId: "s4",
  unitId: "s4-reg",
  status: "disponivel",
  prerequisites: ["reg-gesto", "prosodia-respiracao"],
  estimatedMinutes: 45,
  competencies: ["regencia-e-ensaio", "texto-e-prosodia"],
  objectives: [
    "Marcar pontos de respiração coerentes com o texto.",
    "Usar respiração escalonada em notas longas e frases longas.",
    "Cortar junto, inclusive a consoante final.",
  ],
  sections: [
    {
      title: "1. Onde respirar",
      blocks: [
        { type: "paragraph", text: "O coro respira onde o texto respira: vírgulas, fim de verso, antes de uma palavra importante. Uma frase muito longa sem pausa obriga cada cantor a respirar quando consegue, e o texto se quebra em lugares diferentes. O motor sugere atenção quando uma voz canta mais de 15 segundos sem pausa." },
        { type: "example", score: EXG.fraseLonga, verdict: "observacao", caption: "Seis compassos sem pausa", commentary: "A ♩ = 72, a frase dura 20 segundos para todas as vozes. Cada cantor vai respirar num lugar diferente." },
        { type: "example", score: EXG.fraseRespirada, verdict: "correto", caption: "A mesma frase com respiração escrita", commentary: "Uma pausa de semínima no fim do compasso 3, depois de 'na', divide a frase em duas metades de cerca de 10 segundos, e todo o coro respira junto." },
        { type: "listening", title: "Respire na pausa", score: EXG.fraseRespirada, instructions: ["Cante a melodia e respire no compasso 3.", "Ouça as quatro vozes."], focus: [["S"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "2. Respiração escalonada e cortes",
      blocks: [
        { type: "list", items: ["Respiração escalonada: em notas longas, cada cantor respira num momento diferente, entra suave e nunca no tempo forte. Combine com o naipe quem respira onde.", "Corte: o som termina no tempo indicado; a consoante final ('s', 't', 'r') é cantada junto, de preferência no gesto de corte.", "Marque as respirações na partitura com vírgula (') e combine as escalonadas por escrito."] },
        { type: "callout", tone: "atencao", title: "Consoantes", text: "Num coro, um 's' final de cada cantor em tempos diferentes vira um chiado longo. Peça o 's' curto e junto, ou quase omitido." },
      ],
    },
  ],
  exercises: {
    id: "ex-reg-respiracao",
    title: "Verificação: respiração",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["reg5-onde"],
    staticItems: [
      { id: "reg5-onde", kind: "choice", skill: "texto-e-prosodia", prompt: "Onde o coro deve respirar?", options: [{ id: "a", label: "Onde o texto respira: vírgulas, fim de verso" }, { id: "b", label: "Em qualquer lugar, cada um quando precisar" }, { id: "c", label: "Só no fim da música" }], correctOptionId: "a", explanation: "A respiração segue o sentido do texto." },
      { id: "reg5-escalonada", kind: "choice", skill: "regencia", prompt: "O que é respiração escalonada?", options: [{ id: "a", label: "Cada cantor respira em momento diferente para a nota longa não parar" }, { id: "b", label: "Todos respiram juntos a cada compasso" }, { id: "c", label: "Respirar subindo a escala" }], correctOptionId: "a", explanation: "O naipe mantém o som enquanto cada um renova o ar." },
      { id: "reg5-consoante", kind: "choice", skill: "regencia", prompt: "Como tratar o 's' final de uma palavra no coro?", options: [{ id: "a", label: "Curto e junto, no corte" }, { id: "b", label: "Longo, cada um no seu tempo" }, { id: "c", label: "Antes da vogal" }], correctOptionId: "a", explanation: "Consoantes desencontradas viram ruído." },
    ],
    generators: [{ type: "conducting", count: 3 }, { type: "range-check", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo onde respirar.",
  application: { title: "Aplicação no Estúdio", steps: ["Abra um arranjo seu e valide: procure sugestões de respiração.", "Escreva pausas de respiração onde o texto pede.", "Valide de novo e confira que nenhuma voz passa de 15 s sem pausa."] },
};

export const lessonRegEquilibrio: Lesson = {
  id: "reg-equilibrio",
  title: "Equilíbrio entre naipes e a tentação de dobrar a melodia",
  summary: "Equilíbrio é proporção de volume, não só de número de cantores: como valorizar a melodia sem dobrá-la em oitavas e como reforçar um naipe fraco.",
  levelId: "s4",
  unitId: "s4-reg",
  status: "disponivel",
  prerequisites: ["reg-ensaio-naipes", "texturas-vocais"],
  estimatedMinutes: 45,
  competencies: ["regencia-e-ensaio", "arranjo"],
  objectives: [
    "Ajustar dinâmica por naipe para a melodia aparecer.",
    "Reconhecer por que dobrar a melodia em oitavas muda o arranjo.",
    "Reforçar um naipe fraco sem desequilibrar a harmonia.",
  ],
  sections: [
    {
      title: "1. Melodia em primeiro plano",
      blocks: [
        { type: "paragraph", text: "Num coral, a melodia aparece quando as outras vozes cantam um pouco mais suave, e não quando mais gente canta a melodia. Peça dinâmica diferente por naipe (melodia 'mf', acompanhamento 'mp') e ouça de longe." },
        { type: "example", score: EXR.original, verdict: "correto", caption: "Melodia no soprano, acompanhamento discreto", commentary: "As outras vozes andam pouco e em região média; com um 'mp' nelas, a melodia aparece sem esforço." },
        { type: "listening", title: "Primeiro plano", score: EXR.original, instructions: ["Ouça só a melodia.", "Ouça as quatro e tente seguir a melodia."], focus: [["S"], ["S", "A", "T", "B"]] },
        { type: "example", score: EXG.melodiaDobrada, verdict: "incorreto", caption: "Tenor dobrando a melodia para 'reforçar'", commentary: "Para ajudar sopranos inseguras, o tenor passa a cantar a melodia uma oitava abaixo: oitavas paralelas o tempo todo e a sensível dobrada no Sol7. O arranjo perde a voz do tenor e o acorde fica pesado." },
      ],
    },
    {
      title: "2. Naipe fraco",
      blocks: [
        { type: "list", items: ["Coloque cantores seguros no centro do naipe e os inseguros ao lado deles.", "Peça às vozes fortes que cantem menos, em vez de pedir às fracas que cantem mais.", "Se faltam tenores, contraltos graves podem cantar a linha de tenor nos trechos médios (veja a aula de adaptação).", "Disposição do coro: naipes misturados em quartetos ajudam a afinação; naipes em bloco ajudam a segurança."] },
      ],
    },
  ],
  exercises: {
    id: "ex-reg-equilibrio",
    title: "Verificação: equilíbrio",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["reg6-melodia"],
    staticItems: [
      { id: "reg6-melodia", kind: "choice", skill: "regencia", prompt: "Como fazer a melodia aparecer num coral a quatro vozes?", options: [{ id: "a", label: "Pedir dinâmica mais suave às vozes de acompanhamento" }, { id: "b", label: "Mandar o tenor dobrar a melodia" }, { id: "c", label: "Tirar o contralto" }], correctOptionId: "a", explanation: "Equilíbrio é proporção." },
      { id: "reg6-dobra", kind: "choice", skill: "conducao-de-vozes", prompt: "O que acontece quando o tenor dobra a melodia do soprano uma oitava abaixo?", options: [{ id: "a", label: "Oitavas paralelas e uma voz a menos na harmonia" }, { id: "b", label: "A harmonia fica mais completa" }, { id: "c", label: "Nada muda" }], correctOptionId: "a", explanation: "Dobramento muda o arranjo, não só o volume." },
      { id: "reg6-forte", kind: "choice", skill: "regencia", prompt: "O naipe de baixos encobre os outros. A primeira tentativa é…", options: [{ id: "a", label: "Pedir menos volume aos baixos" }, { id: "b", label: "Pedir que todos os outros gritem" }, { id: "c", label: "Trocar a tonalidade" }], correctOptionId: "a", explanation: "Reduzir o que sobra antes de forçar o que falta." },
    ],
    generators: [{ type: "voice-leading-error", count: 2, ruleIds: ["conducao.paralelas", "harmonia.sensivel-dobrada"] }, { type: "conducting", count: 3 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo como valorizar a melodia.",
  application: { title: "Aplicação no Estúdio", steps: ["Toque um arranjo seu com o player.", "Silencie a melodia e ouça se o acompanhamento ainda faz sentido.", "Anote no seu plano de ensaio a dinâmica de cada naipe por seção."] },
};

export const lessonRegRevisao: Lesson = {
  id: "reg-revisao-planejamento",
  title: "Planejar o ensaio e revisar a partitura antes do coro",
  summary: "Cronograma até a apresentação, plano de cada ensaio, marcações na partitura e a revisão que evita gastar ensaio com erros de escrita.",
  levelId: "s4",
  unitId: "s4-reg",
  status: "disponivel",
  prerequisites: ["reg-ensaio-naipes", "reg-respiracao"],
  estimatedMinutes: 50,
  competencies: ["regencia-e-ensaio", "arranjo"],
  objectives: [
    "Montar um cronograma de ensaios até a apresentação.",
    "Escrever o plano de um ensaio com objetivos e tempos.",
    "Revisar a partitura no motor antes de entregá-la ao coro.",
  ],
  sections: [
    {
      title: "1. Revise antes de ensaiar",
      blocks: [
        { type: "paragraph", text: "Um erro de escrita custa minutos de ensaio: o naipe tenta, desafina, o regente para, explica. Quintas e oitavas paralelas, sensíveis dobradas e saltos estranhos devem ser corrigidos na partitura, não no ensaio." },
        { type: "example", score: PARALLELS_SATB, verdict: "incorreto", caption: "Erro que chegaria ao ensaio", commentary: "Todas as vozes sobem juntas de I para ii: quintas e oitavas paralelas. No ensaio, o acorde soa oco e o coro tende a desafinar no segundo acorde." },
        { type: "example", score: PARALLELS_FIXED_SATB, verdict: "correto", caption: "Corrigido antes do ensaio", commentary: "O baixo sobe para Fá (ii⁶) enquanto as vozes de cima descem: movimento contrário, nenhuma consonância perfeita em paralelo." },
        { type: "listening", title: "Antes e depois", score: PARALLELS_FIXED_SATB, instructions: ["Ouça a versão corrigida.", "Ouça baixo e soprano: movimento contrário."], focus: [["S", "A", "T", "B"], ["S", "B"]] },
      ],
    },
    {
      title: "2. Plano e cronograma",
      blocks: [
        {
          type: "table",
          caption: "Exemplo de cronograma para um hino novo (quatro ensaios)",
          headers: ["Ensaio", "Objetivo", "Como saber que deu certo"],
          rows: [["1", "Notas de cada naipe, trechos difíceis", "Cada naipe canta sua voz sozinho"], ["2", "Juntar vozes por seção, respirações", "A peça é cantada inteira, com paradas"], ["3", "Afinação, dinâmica, texto", "Sem paradas; respirações juntas"], ["4", "Interpretação e passagem no local", "Duas passagens seguidas sem problemas"]],
        },
        { type: "list", items: ["Numere os compassos e use letras de ensaio (A, B, C) no começo de cada seção.", "Marque respirações, dinâmicas e cortes antes de imprimir.", "Escreva o plano do ensaio com minutos por atividade e um objetivo verificável.", "Depois do ensaio, anote o que ficou pendente para o próximo."] },
      ],
    },
  ],
  exercises: {
    id: "ex-reg-revisao",
    title: "Verificação: planejamento",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["reg7-revisar"],
    staticItems: [
      { id: "reg7-revisar", kind: "choice", skill: "regencia", prompt: "Por que revisar a partitura no motor antes do primeiro ensaio?", options: [{ id: "a", label: "Erros de escrita viram minutos de ensaio perdidos" }, { id: "b", label: "Para o coro não precisar estudar" }, { id: "c", label: "Não é necessário" }], correctOptionId: "a", explanation: "Corrigir no papel é mais barato que no ensaio." },
      { id: "reg7-letras", kind: "choice", skill: "regencia", prompt: "Para que servem letras de ensaio (A, B, C) na partitura?", options: [{ id: "a", label: "Para todos acharem rápido o começo de cada seção" }, { id: "b", label: "Para indicar a dinâmica" }, { id: "c", label: "Para indicar a tonalidade" }], correctOptionId: "a", explanation: "'Do B' é mais rápido que 'do compasso 17'." },
      { id: "reg7-objetivo", kind: "choice", skill: "regencia", prompt: "Um bom objetivo de ensaio é…", options: [{ id: "a", label: "Verificável: 'cada naipe canta sua voz sozinho até a letra B'" }, { id: "b", label: "Vago: 'melhorar a música'" }, { id: "c", label: "Nenhum: ensaiar o que der" }], correctOptionId: "a", explanation: "Objetivo verificável permite saber se o ensaio rendeu." },
    ],
    generators: [{ type: "voice-leading-error", count: 3, ruleIds: ["conducao.paralelas", "harmonia.sensivel-dobrada", "vozes.cruzamento"] }, { type: "cadence-identification", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo por que revisar antes do ensaio.",
  application: { title: "Aplicação no Estúdio", steps: ["Valide um arranjo seu e corrija todos os erros e alertas.", "Escreva o plano de quatro ensaios, com objetivos verificáveis.", "Exporte o PDF e o MIDI para o coro estudar em casa."] },
};

export const lessonRegAdaptacao: Lesson = {
  id: "reg-adaptacao-grupo",
  title: "Adaptar ao grupo real: tonalidade, naipes faltando e divisões",
  summary: "Escolher a tonalidade pelo coro que você tem, o que fazer quando faltam tenores ou sobram sopranos e como dividir naipes sem perder a harmonia.",
  levelId: "s4",
  unitId: "s4-reg",
  status: "disponivel",
  prerequisites: ["reg-revisao-planejamento", "reg-equilibrio"],
  estimatedMinutes: 50,
  competencies: ["regencia-e-ensaio", "arranjo"],
  objectives: [
    "Escolher a tonalidade pela tessitura do naipe mais frágil.",
    "Redistribuir notas quando falta um naipe.",
    "Decidir quando reduzir para três vozes ou mudar de formação.",
  ],
  sections: [
    {
      title: "1. A tonalidade do seu coro",
      blocks: [
        { type: "paragraph", text: "A tonalidade não é a do original: é a que o seu coro canta bem. Verifique primeiro o naipe mais frágil (em coros amadores, quase sempre os tenores) e o ponto mais agudo da melodia." },
        { type: "example", score: EXG.descantRe, verdict: "observacao", caption: "O hino com descant em Ré maior", commentary: "Um tom acima, a melodia no tenor chega a Fá♯4, o descant a Fá♯5 e a contralto a Dó♯5: as três vozes passam da região confortável. Para tenores amadores, é o limite." },
        { type: "example", score: EXC.descant, verdict: "correto", caption: "O mesmo hino em Dó maior", commentary: "Em Dó, o tenor (melodia) fica entre Si3 e Mi4 e o descant chega a Mi5: tudo dentro das tessituras." },
        { type: "listening", title: "Compare as tonalidades", score: EXC.descant, instructions: ["Ouça o tenor em Dó.", "Ouça as quatro vozes."], focus: [["T"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "2. Quando falta um naipe",
      blocks: [
        {
          type: "table",
          caption: "Soluções comuns",
          headers: ["Situação", "Solução", "Cuidado"],
          rows: [
            ["Poucos tenores", "Contraltos graves reforçam o tenor nos trechos médios; ou reduza para SAB", "Contraltos abaixo de Lá3 perdem volume"],
            ["Sem tenores", "Arranjo SAB (soprano, contralto, barítono/baixo)", "Redistribuir as notas do tenor"],
            ["Só vozes agudas", "Adaptar para SSA/SSAA (disciplina EST407)", "Não copiar o tenor uma oitava acima"],
            ["Só vozes masculinas", "Adaptar para TTBB (disciplina EST405)", "Melodia no Tenor II, grave claro"],
            ["Naipe numeroso", "Divisi (dividir em I e II) em acordes cheios", "Divisi só onde há cantores seguros"],
          ],
        },
        { type: "callout", tone: "dica", title: "No Estúdio", text: "Transponha a partitura no Estúdio e valide de novo: as sugestões de tessitura mostram rapidamente qual naipe sofre em cada tonalidade." },
      ],
    },
  ],
  exercises: {
    id: "ex-reg-adaptacao",
    title: "Verificação: adaptação ao grupo",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["reg8-tonalidade"],
    staticItems: [
      { id: "reg8-tonalidade", kind: "choice", skill: "regencia", prompt: "Como escolher a tonalidade de um hino para o seu coro?", options: [{ id: "a", label: "Pela tessitura do naipe mais frágil e pelo ponto mais agudo da melodia" }, { id: "b", label: "Sempre a do original" }, { id: "c", label: "A mais aguda possível, para dar brilho" }], correctOptionId: "a", explanation: "A tonalidade serve ao coro que você tem." },
      { id: "reg8-tenores", kind: "choice", skill: "arranjo", prompt: "Seu coro não tem tenores. Uma boa saída é…", options: [{ id: "a", label: "Reescrever em SAB, redistribuindo as notas do tenor" }, { id: "b", label: "Ignorar a voz do tenor" }, { id: "c", label: "Pedir aos baixos que cantem o tenor em falsete" }], correctOptionId: "a", explanation: "Três vozes bem escritas soam melhor que quatro incompletas." },
      { id: "reg8-divisi", kind: "choice", skill: "regencia", prompt: "Quando usar divisi num naipe?", options: [{ id: "a", label: "Quando o naipe é numeroso e há cantores seguros para cada linha" }, { id: "b", label: "Sempre que possível" }, { id: "c", label: "Quando o naipe tem poucos cantores" }], correctOptionId: "a", explanation: "Dividir um naipe pequeno o enfraquece." },
    ],
    generators: [{ type: "range-check", count: 3, formations: ["SATB", "TTBB", "SSAA"] }, { type: "key-signature", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a escolha da tonalidade.",
  application: { title: "Aplicação no Estúdio", steps: ["Abra um arranjo seu e transponha um tom acima e um tom abaixo.", "Valide cada versão e anote as sugestões de tessitura por naipe.", "Escolha a tonalidade para o seu coro e justifique no seu plano de ensaio."] },
};
