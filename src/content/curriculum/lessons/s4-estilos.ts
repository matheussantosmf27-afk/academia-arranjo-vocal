import { CHORALE_SATB_C } from "@/domain/music/examples";
import { EX } from "../examples";
import { EXA } from "../examples-arranjo";
import type { Lesson } from "../types";

/* 4º semestre — disciplinas de estilo (EST401–EST404) e PRF401 Prática Profissional. */

export const lessonArranjoCoral: Lesson = {
  id: "arranjo-coral",
  title: "Arranjo coral: sacro, erudito e MPB para coro",
  summary: "A tradição coral aplicada ao arranjo: o hino e o coral de igreja, a peça de concerto, e a canção popular brasileira adaptada para coro misto.",
  levelId: "s4",
  unitId: "s4-cor",
  status: "disponivel",
  prerequisites: ["variacao-e-desenvolvimento", "contraponto-aplicado"],
  estimatedMinutes: 70,
  competencies: ["escrita-satb", "arranjo", "contraponto"],
  objectives: [
    "Escrever no estilo coral tradicional respeitando condução, cadências e dissonâncias preparadas.",
    "Adaptar uma canção popular para coro misto mantendo o balanço rítmico e a letra clara.",
    "Usar retardos, imitação e divisi como recursos expressivos.",
  ],
  sections: [
    {
      title: "1. A tradição coral",
      blocks: [
        {
          type: "paragraph",
          text: "O coral de igreja — de Lutero e Bach aos hinários atuais — é a escola de todo arranjador: quatro vozes cantáveis, harmonia funcional, cadências claras e o texto em primeiro lugar. No Brasil, essa tradição se misturou à canção popular: o canto orfeônico liderado por Villa-Lobos levou o canto coral às escolas, e regentes e arranjadores brasileiros desenvolveram um repertório enorme de MPB, folclore e música sacra para coro.",
        },
        {
          type: "list",
          items: [
            "Hino e coral: homofonia, uma nota por sílaba, cadência ao fim de cada verso.",
            "Peça de concerto: imitação entre vozes, retardos, mudanças de textura e de compasso.",
            "MPB para coro: melodia distribuída entre naipes, acompanhamento rítmico vocal, harmonia com tensões.",
          ],
        },
      ],
    },
    {
      title: "2. Retardos e cadências expressivas",
      blocks: [
        {
          type: "paragraph",
          text: "O retardo é a dissonância mais expressiva da escrita coral: uma voz sustenta a nota do acorde anterior enquanto as outras já mudaram, criando uma tensão que resolve por grau descendente. Na cadência final, o retardo 4–3 (a quarta sobre o acorde de dominante resolvendo na terça) é um clássico do estilo sacro.",
        },
        { type: "example", score: EXA.coralSuspensao, verdict: "correto", caption: "Retardo 4–3 na cadência", commentary: "O Dó5 do soprano é preparado no acorde de tônica, sustentado sobre o acorde de dominante (onde é dissonante) e resolve em Si4 antes da tônica final." },
        { type: "example", score: EX.retrogressao, verdict: "observacao", caption: "V → IV no estilo tradicional", commentary: "Uma retrogressão funcional: no coral tradicional, o motor registra como observação. Na MPB e no pop, esse movimento é frequente." },
        { type: "listening", title: "Ouça o retardo", score: EXA.coralSuspensao, instructions: ["Ouça soprano e tenor: o Dó5 'fica para trás' enquanto o tenor já mudou.", "Ouça tudo e sinta a resolução."], focus: [["S", "T"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "3. Canção popular para coro",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Preserve o balanço: se a canção é sincopada, pelo menos uma camada do arranjo precisa manter a síncope.",
            "Distribua a melodia: verso com contraltos, refrão com sopranos, uma estrofe com tenores.",
            "Use divisi com moderação: dividir um naipe (sopranos I e II) dá acordes mais ricos, mas exige cantores suficientes.",
            "Respeite a prosódia brasileira: sílabas tônicas nos tempos fortes ou nas síncopes que a canção já tem.",
          ],
        },
        { type: "example", score: CHORALE_SATB_C, verdict: "correto", caption: "Base coral sem erros", commentary: "Antes de acrescentar síncopes e tensões, a harmonia a quatro vozes precisa estar sólida." },
      ],
    },
    {
      title: "4. Demonstração: de um hino simples a uma estrofe expressiva",
      blocks: [
        { type: "paragraph", text: "Problema: a última estrofe de um hino em homofonia simples precisa soar mais expressiva sem mudar a melodia nem perder a clareza do texto. Que recursos da tradição coral usar, e em que ordem?" },
        { type: "list", ordered: true, items: [
          "Leia o texto e marque a palavra mais importante da estrofe: ela recebe o recurso mais forte.",
          "Na cadência final, troque o V simples por um V com retardo 4–3 numa voz interna ou no soprano (a nota da tônica sustentada sobre o V e resolvendo na sensível).",
          "Num verso intermediário, use uma entrada imitativa curta: o contralto antecipa o motivo do soprano um tempo antes, os outros entram em homofonia.",
          "Na palavra mais importante, abra a posição (soprano mais agudo, tenor mais grave) ou use um divisi breve nos sopranos.",
          "Revise no estilo tradicional: cada dissonância preparada e resolvida, nenhuma paralela, texto silábico nos pontos importantes.",
        ] },
        { type: "callout", tone: "atencao", title: "MPB para coro: o que muda", text: "Ao trazer uma canção popular para coro misto, a régua do estilo tradicional (sétimas resolvidas, paralelas evitadas) pode ser flexibilizada para preservar o balanço e as tensões da canção. Escolha o estilo do arranjo no Estúdio — coral contemporâneo é um meio-termo útil — e decida conscientemente o que manter de cada tradição." },
      ],
    },
    {
      title: "5. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Retardo sem preparação", "dissonância atacada", "a nota deve estar no acorde anterior"], ["Imitação que esconde o texto", "palavras sobrepostas", "imite em fragmentos curtos e volte à homofonia"], ["Síncope da canção popular apagada no arranjo coral", "a canção perde o balanço", "mantenha a síncope em ao menos uma camada"], ["Divisi sem cantores suficientes", "naipe fraco e desafinado", "divisi só onde o grupo comporta"]] },
        { type: "list", items: ["Tradição coral: texto em primeiro lugar, quatro vozes cantáveis, cadências claras.", "Retardos e imitação são os recursos expressivos clássicos.", "Canção popular para coro: preserve o balanço e a prosódia."] },
        {
          type: "challenge",
          title: "Uma cadência expressiva para o 'Amém'",
          task: "Pegue a cadência final do coral SATB de exemplo (I⁶ IV I⁶₄ V | I) e descreva — ou escreva no Estúdio — duas versões mais expressivas, no estilo tradicional: uma com retardo e outra com a cadência plagal acrescentada ('Amém').",
          constraints: ["Estilo coral tradicional.", "A melodia do soprano pode ganhar a nota sustentada do retardo, mas não muda de contorno.", "Cada versão com no máximo dois recursos novos."],
          criteria: ["O retardo está preparado, dissonante no tempo forte e resolvido por grau.", "O 'Amém' plagal (IV – I) vem depois da cadência autêntica, não no lugar dela.", "Ao realizar no Estúdio, o motor não aponta erros nem alertas."],
          hints: ["No compasso 3, o soprano canta C5 sobre o I⁶₄ e B4 sobre o V: o C5 sobre o V é um retardo 4–3 em potencial.", "Para o 'Amém', acrescente um compasso IV – I depois da cadência, com o soprano parado em C5.", "No IV do 'Amém', uma voz interna pode fazer A → G (6–5) para suavizar."],
          solution: {
            commentary: "Versão 1 (retardo): no compasso 3, o soprano liga o C5 do I⁶₄ sobre o V (o C5 vira 4ª sobre G3) e resolve em B4 no 4º tempo antes da tônica — a cadência fica mais tensa e expressiva sem mudar o desenho. Versão 2 ('Amém'): depois do I final, mais um compasso IV (F3 – A3 – F4 – C5) – I (C3 – G3 – E4 – C5): o soprano parado em C5, o contralto F4 → E4 e o tenor A3 → G3. A primeira versão aumenta a tensão antes do fim; a segunda prolonga o repouso. Escolha pelo texto.",
            alternatives: ["Combinar as duas (retardo + Amém) é tradicional em hinos, mas faz o final mais longo: use só se a música pedir solenidade."],
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-arranjo-coral",
    title: "Verificação: arranjo coral",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["ac-retardo"],
    staticItems: [
      {
        id: "ac-retardo",
        kind: "choice",
        skill: "contraponto",
        prompt: "Como se trata um retardo no estilo coral tradicional?",
        options: [
          { id: "a", label: "Preparado como consonância, sustentado como dissonância e resolvido por grau descendente" },
          { id: "b", label: "Atacado por salto e abandonado por salto" },
          { id: "c", label: "Resolvido por salto ascendente" },
        ],
        correctOptionId: "a",
        explanation: "Preparação, dissonância e resolução descendente por grau.",
      },
      {
        id: "ac-divisi",
        kind: "choice",
        skill: "arranjo",
        prompt: "Quando evitar divisi?",
        options: [
          { id: "a", label: "Quando o naipe tem poucos cantores" },
          { id: "b", label: "Sempre que houver letra" },
          { id: "c", label: "Nunca: divisi é sempre melhor" },
        ],
        correctOptionId: "a",
        explanation: "Dividir um naipe pequeno deixa cada linha fraca e desequilibrada.",
      },
      {
        id: "ac-sincope",
        kind: "choice",
        skill: "arranjo",
        prompt: "Ao arranjar um samba para coro, como manter o balanço?",
        options: [
          { id: "a", label: "Manter a síncope em pelo menos uma camada (melodia ou acompanhamento rítmico)" },
          { id: "b", label: "Converter tudo em semínimas regulares" },
          { id: "c", label: "Cantar tudo em notas longas" },
        ],
        correctOptionId: "a",
        explanation: "Sem síncope, a canção perde a identidade rítmica.",
      },
    ],
    generators: [{ type: "nct-identification", count: 3 }, { type: "cadence-identification", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o tratamento do retardo.",
  application: {
    title: "Prática no laboratório de escrita",
    steps: [
      "Abra o coral SATB de exemplo.",
      "Transforme a cadência final em V com retardo 4–3 no soprano, como no exemplo da aula.",
      "Revise com o motor no estilo tradicional.",
    ],
  },
};

export const lessonACappellaPop: Lesson = {
  id: "a-cappella-pop",
  title: "Pop a cappella: solista, backing vocals e a banda feita de vozes",
  summary: "Como transformar uma canção pop num arranjo a cappella: papéis (lead, backing, baixo, percussão), imitação de instrumentos e equilíbrio.",
  levelId: "s4",
  unitId: "s4-pop",
  status: "disponivel",
  prerequisites: ["variacao-e-desenvolvimento", "silabas-de-apoio"],
  estimatedMinutes: 70,
  competencies: ["arranjo"],
  objectives: [
    "Distribuir os papéis de um grupo a cappella (lead, backing, baixo, percussão vocal).",
    "Transcrever a 'banda' da gravação original em partes vocais.",
    "Equilibrar o grupo para que o solista e a letra fiquem em primeiro plano.",
  ],
  sections: [
    {
      title: "1. Papéis no grupo",
      blocks: [
        {
          type: "table",
          caption: "Quem faz o quê",
          headers: ["Papel", "Função", "Escrita típica"],
          rows: [
            ["Lead (solista)", "Canta a melodia e a letra", "Melodia original, com liberdade de interpretação"],
            ["Backing (2–4 vozes)", "Harmonia e ritmo", "Pads, sílabas rítmicas, respostas ao solista, 'hits'"],
            ["Baixo vocal", "Fundamento harmônico e rítmico", "Linha de baixo da canção, com 'dm', 'bm'"],
            ["Percussão vocal (VP)", "Bateria", "Bumbo, caixa e chimbal com a boca"],
          ],
        },
        {
          type: "paragraph",
          text: "Grupos como Pentatonix, The Real Group, Take 6 e, no Brasil, grupos vocais como Boca Livre e MPB4 mostram estilos diferentes de organizar esses papéis. Ouça com atenção quem faz o quê em cada trecho: muitas vezes o mesmo cantor alterna entre backing e lead.",
        },
      ],
    },
    {
      title: "2. Da gravação ao arranjo",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Escute a gravação e liste os instrumentos de cada seção.",
            "Escolha o que é essencial: geralmente baixo, um instrumento harmônico (violão ou teclado) e um 'riff' característico.",
            "Transforme cada elemento em voz: o baixo vira baixo vocal, o teclado vira pad ou sílabas rítmicas, o riff vira uma linha em 'ba-da'.",
            "Simplifique: um grupo vocal não precisa reproduzir tudo; precisa reproduzir o que faz a música ser reconhecida.",
          ],
        },
        { type: "example", score: EXA.popLeadBacking, verdict: "correto", caption: "Lead, backing e baixo", commentary: "O soprano canta a letra; contralto e tenor fazem os contratempos em 'dum' (o 'violão'); o baixo marca os tempos fortes em 'dm'. Três camadas claramente separadas." },
        { type: "example", score: EXA.unissonoOitavasPop, verdict: "observacao", caption: "Dobramento em oitavas", commentary: "No refrão, dobrar a melodia em oitavas (lead + uma voz do backing) dá força. No estilo popular, o motor registra apenas sugestões." },
        {
          type: "listening",
          title: "Separe as camadas",
          score: EXA.popLeadBacking,
          instructions: ["Ouça só o backing (contralto e tenor).", "Ouça só o baixo.", "Ouça tudo: o lead fica em primeiro plano?"],
          focus: [["A", "T"], ["B"], ["S", "A", "T", "B"]],
        },
      ],
    },
    {
      title: "3. Equilíbrio",
      blocks: [
        {
          type: "list",
          items: [
            "O lead precisa estar sempre audível: backing em registro diferente ou com sílabas mais fechadas.",
            "Evite backing no mesmo registro e ritmo da melodia — ele 'apaga' o solista.",
            "Quando o lead para (fim de frase), o backing pode responder: é o momento de brilhar.",
            "Com microfones, o equilíbrio é feito na mesa de som; sem microfone, é feito na escrita (número de cantores por parte e dinâmica).",
          ],
        },
      ],
    },
    {
      title: "4. Demonstração: da gravação às partes vocais",
      blocks: [
        { type: "paragraph", text: "Problema: transformar o refrão de uma canção pop (voz, violão, baixo, bateria e um riff de teclado) num arranjo para cinco vozes a cappella (lead, três backings, baixo vocal) e percussão vocal opcional." },
        { type: "table", caption: "Do instrumento à voz", headers: ["Na gravação", "No arranjo vocal", "Como escrever"], rows: [["Voz principal", "lead", "melodia original; liberdade rítmica indicada como 'ad lib.'"], ["Violão (batida)", "backing 1 e 2", "acordes em 'dum'/'dm' nos contratempos, em terças"], ["Riff do teclado", "backing 3 (soprano)", "linha em 'ba-da' só nos espaços da melodia"], ["Baixo", "baixo vocal", "fundamentais nos tempos 1 e 3 em 'dm'/'bm'"], ["Bateria", "percussão vocal ou nada", "indicação de estilo e viradas em uma linha separada"]] },
        { type: "list", ordered: true, items: ["Escute e liste o que cada instrumento faz no refrão.", "Escolha o essencial: baixo, harmonia e um elemento característico.", "Escreva primeiro o baixo vocal e o lead; depois os backings em registro diferente do lead.", "Confira o equilíbrio: backings mais fechados e mais suaves sob o lead; respostas quando o lead respira."] },
      ],
    },
    {
      title: "5. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Copiar todos os instrumentos", "textura densa, impossível de cantar", "escolha o essencial"], ["Backing no registro e ritmo do lead", "o solista some", "registro e sílabas diferentes"], ["Baixo vocal sem pausas", "fadiga", "planeje respiros"], ["Sílabas trocadas a cada compasso", "confusão", "uma sílaba por função e seção"]] },
        { type: "list", items: ["Papéis: lead, backing, baixo, percussão.", "Da gravação, escolha o essencial e converta em sílabas.", "O lead sempre em primeiro plano."] },
        {
          type: "challenge",
          title: "Mapa de papéis de um refrão",
          task: "Escolha uma canção pop que você conheça bem. Para o refrão, faça a tabela 'na gravação → no arranjo vocal → como escrever' para um grupo de cinco vozes (lead, três backings, baixo), indicando sílabas, registro e ritmo de cada parte.",
          constraints: ["Cinco vozes, sem instrumentos.", "O lead canta a melodia original.", "Para estudo: não publique nem apresente o arranjo de uma canção protegida sem autorização."],
          criteria: ["Cada voz tem função, sílaba e registro definidos.", "Pelo menos um momento de resposta dos backings quando o lead respira.", "O baixo vocal tem pausas planejadas."],
          hints: ["Comece pelo baixo da gravação: transcreva as fundamentais do refrão.", "O instrumento harmônico (violão ou teclado) vira os backings em terças.", "Procure no refrão o 'gancho' instrumental: ele pode virar uma linha em 'ba-da' de uma voz só."],
          solution: {
            commentary: "Uma tabela-modelo (para uma canção em Sol maior, refrão em G – D – Em – C): Lead — melodia, texto, registro original. Backing 1 e 2 (contralto e tenor) — 'dum' nos contratempos, em terças, entre G3 e D4, acordes completos com o baixo. Backing 3 (soprano) — o gancho do teclado em 'ba-da', só nos fins de frase do lead, entre D5 e G5, p. Baixo vocal — G2, D3, E3 (E2 ficaria abaixo da tessitura), C3 em 'dm' nos tempos 1 e 3, pausa de um tempo antes do último refrão. Percussão — 'pop, 92 bpm', viradas no último compasso. O critério de qualidade é o equilíbrio: o lead nunca disputa registro e ritmo com os backings.",
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-a-cappella-pop",
    title: "Verificação: pop a cappella",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["pop-papeis"],
    staticItems: [
      {
        id: "pop-papeis",
        kind: "choice",
        skill: "arranjo",
        prompt: "Num arranjo a cappella de uma canção com banda, o que o baixo vocal substitui?",
        options: [
          { id: "a", label: "O contrabaixo da banda (fundamento harmônico e rítmico)" },
          { id: "b", label: "A voz solista" },
          { id: "c", label: "Os pratos da bateria" },
        ],
        correctOptionId: "a",
        explanation: "O baixo vocal canta a linha de baixo da canção.",
      },
      {
        id: "pop-essencial",
        kind: "choice",
        skill: "arranjo",
        prompt: "Ao transcrever uma gravação, o que priorizar?",
        options: [
          { id: "a", label: "O que faz a música ser reconhecida: baixo, harmonia e o riff característico" },
          { id: "b", label: "Todos os instrumentos, nota por nota" },
          { id: "c", label: "Apenas a bateria" },
        ],
        correctOptionId: "a",
        explanation: "Simplificar é parte do ofício: um grupo vocal não é uma banda.",
      },
      {
        id: "pop-equilibrio",
        kind: "choice",
        skill: "arranjo",
        prompt: "O backing está no mesmo registro e ritmo da melodia. Qual o problema?",
        options: [
          { id: "a", label: "Encobre o solista" },
          { id: "b", label: "Nenhum" },
          { id: "c", label: "Deixa o baixo mais forte" },
        ],
        correctOptionId: "a",
        explanation: "Separação de registro e ritmo mantém as camadas audíveis.",
      },
      {
        id: "pop-resposta",
        kind: "choice",
        skill: "arranjo",
        prompt: "Qual o melhor momento para o backing 'responder' com uma frase própria?",
        options: [
          { id: "a", label: "Quando o lead para, no fim da frase" },
          { id: "b", label: "Junto com a palavra mais importante da letra" },
          { id: "c", label: "Durante toda a melodia" },
        ],
        correctOptionId: "a",
        explanation: "Responder nos espaços mantém o lead audível e cria diálogo.",
      },
      {
        id: "pop-microfone",
        kind: "choice",
        skill: "arranjo",
        prompt: "Sem microfones, como equilibrar um lead contra quatro vozes de backing?",
        options: [
          { id: "a", label: "Na escrita: backing em dinâmica menor, sílabas fechadas e registro diferente" },
          { id: "b", label: "Pedir ao lead para gritar" },
          { id: "c", label: "Não é possível" },
        ],
        correctOptionId: "a",
        explanation: "Sem mesa de som, o equilíbrio nasce da partitura.",
      },
    ],
    generators: [{ type: "function-identification", count: 2 }, { type: "range-check", count: 1 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo os papéis do grupo.",
  application: {
    title: "Prática no laboratório de escrita",
    steps: [
      "Abra o exemplo 'Pop a cappella: lead, backing em dum e baixo vocal'.",
      "Escreva mais dois compassos continuando o padrão do backing e do baixo.",
      "Mude o estilo para 'Popular a cappella' e revise com o motor.",
    ],
  },
};

export const lessonBaixoPercussao: Lesson = {
  id: "baixo-e-percussao-vocal",
  title: "Baixo vocal e percussão vocal",
  summary: "Como escrever uma linha de baixo vocal que sustenta o grupo e como notar e integrar a percussão vocal no arranjo.",
  levelId: "s4",
  unitId: "s4-pop",
  status: "disponivel",
  prerequisites: ["a-cappella-pop"],
  estimatedMinutes: 55,
  competencies: ["arranjo", "harmonia-funcional"],
  objectives: [
    "Escrever linhas de baixo vocal com fundamentais, notas de passagem e ritmo.",
    "Respeitar a extensão e a resistência do baixo vocal.",
    "Indicar a percussão vocal de forma simples e legível.",
  ],
  sections: [
    {
      title: "1. A linha de baixo",
      blocks: [
        {
          type: "paragraph",
          text: "O baixo vocal canta, na maior parte do tempo, a fundamental de cada acorde nos tempos fortes — é ele quem diz ao ouvinte qual é a harmonia. Entre uma fundamental e outra, pode caminhar por graus (notas de passagem), arpejar o acorde ou repetir notas com ritmo. Sílabas como 'dm', 'dum', 'bm' combinam ataque (consoante) e ressonância (o 'm').",
        },
        { type: "example", score: EXA.baixoVocal, verdict: "correto", caption: "Baixo caminhando (C – Am – Dm – G)", commentary: "Fundamentais nos tempos 1 de cada compasso, ligadas por graus conjuntos e pequenos saltos: a linha é cantável e define a harmonia." },
        { type: "example", score: EXA.baixoVocalGrave, verdict: "incorreto", caption: "Baixo abaixo da extensão", commentary: "Dó2 e Mi2 estão abaixo da extensão configurada: só baixos profundos (ou um microfone com efeito) alcançam. Para um grupo comum, suba a linha uma oitava." },
        { type: "listening", title: "Cante o baixo", score: EXA.baixoVocal, instructions: ["Cante junto em 'dm'.", "Perceba as fundamentais nos tempos fortes."], focus: [["B"]] },
      ],
    },
    {
      title: "2. Percussão vocal",
      blocks: [
        {
          type: "table",
          caption: "Sons básicos da percussão vocal",
          headers: ["Som", "Imita", "Como se faz (aproximado)"],
          rows: [
            ["'b' / 'p' explosivo", "Bumbo", "Lábios fechados, ar liberado de uma vez"],
            ["'k' / 'pf'", "Caixa", "Consoante explosiva com ar"],
            ["'ts' / 't'", "Chimbal", "Ponta da língua nos dentes"],
            ["'tssss'", "Chimbal aberto", "Som sustentado"],
          ],
        },
        {
          type: "paragraph",
          text: "Na partitura, a percussão vocal costuma ganhar uma pauta de uma linha com notas em x e a legenda B (bumbo), S (caixa) e H (chimbal). Na maioria dos grupos, o percussionista vocal improvisa a partir de uma indicação de estilo ('groove de pop a 90 bpm', 'samba') e de marcações nos pontos importantes (viradas, paradas). Escreva o essencial; deixe espaço para o intérprete.",
        },
        {
          type: "callout",
          tone: "dica",
          title: "Respeite o fôlego do baixo",
          text: "Cantar baixo rítmico o arranjo inteiro cansa. Planeje compassos de pausa ou trechos em notas longas, especialmente antes dos refrões.",
        },
      ],
    },
    {
      title: "3. Demonstração: uma linha de baixo vocal para C – G/B – Am – F",
      blocks: [
        { type: "list", ordered: true, items: [
          "Fundamentais nos tempos fortes: C3 | B2 (o baixo indicado na cifra G/B) | A2 | F. F2 fica abaixo da tessitura do baixo (G2–C4): use F3.",
          "Ligue os tempos fortes por graus ou pequenos saltos: C3 – B2 – A2 descem por grau; de A2 para F3 há um salto de 6ª, que pode ser suavizado com uma nota de ligação (A2 – C3 – F3).",
          "Defina o ritmo e a sílaba: 'dm' nos tempos 1 e 3, 'dm-dm' em colcheias antes da mudança de acorde.",
          "Planeje o fôlego: uma pausa de colcheia antes de cada compasso dá respiração e ataque.",
          "Confira a extensão no estilo popular: E2 é o limite inferior padrão; abaixo disso, só com baixos profundos confirmados.",
        ] },
        { type: "callout", tone: "dica", title: "Percussão na partitura", text: "Escreva a percussão vocal numa linha à parte, com x e legenda (B, S, H), e indique o estilo e o andamento. Marque só o essencial (viradas, paradas, entradas); o resto fica para o percussionista. O motor não analisa percussão." },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Baixo abaixo de E2", "inaudível ou desafinado", "suba uma oitava ou use inversão"], ["Saltos de 7ª ou mais na linha", "difícil de cantar no ritmo", "graus e pequenos saltos"], ["Baixo rítmico sem pausas", "fadiga e afinação caindo", "respiros planejados"], ["Percussão escrita nota a nota", "partitura ilegível", "estilo + pontos de referência"]] },
        { type: "list", items: ["Baixo vocal: fundamentais nos tempos fortes, ligadas por graus.", "Sílabas com ataque e ressonância ('dm', 'bm').", "Percussão vocal: estilo, sons básicos e marcações."] },
        {
          type: "challenge",
          title: "Baixo vocal para uma progressão de quatro acordes",
          task: "Escreva uma linha de baixo vocal (dois compassos por acorde, em 4/4) para G – Em – C – D, estilo pop, com fundamentais nos tempos 1 e notas de ligação, sílabas e pausas de respiração.",
          constraints: ["Extensão G2–C4 (tessitura do baixo).", "Fundamental no tempo 1 de cada acorde.", "Pelo menos uma pausa a cada dois compassos."],
          criteria: ["Nenhum salto maior que uma 5ª.", "As notas de ligação andam por grau ou pertencem ao acorde.", "Ao escrever no Estúdio (estilo popular), o motor não aponta notas fora da extensão."],
          hints: ["G2 é o limite inferior da tessitura: o acorde de Em pode ter a fundamental em E3, não E2.", "Ligações possíveis: G2 – A2 – B2 – (E3); E3 – D3 – C3; C3 – B2 – A2 – (D3).", "Sílaba 'dm' nas notas longas, 'dm-dm' nas colcheias de ligação, pausa de colcheia antes do tempo 1 seguinte."],
          solution: {
            commentary: "Uma linha: G2 (semínima pontuada) – pausa de colcheia – G2 – A2 | B2 – D3 – B2 – pausa | E3 – pausa – E3 – D3 | C3 (semínima) – D3 – E3 – pausa | C3 – pausa – C3 – B2 | A2 – G2 – A2 – pausa | D3 – pausa – D3 – E3 | F♯3 – E3 – D3 – pausa. Fundamentais no tempo 1 (G2, E3, C3, D3), ligações por grau, uma pausa a cada compasso e nenhum salto maior que uma 4ª. Sílabas: 'dm' nas fundamentais, 'dm-dm' nas ligações em colcheia.",
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-baixo-percussao",
    title: "Verificação: baixo e percussão vocal",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["bv-fundamental"],
    staticItems: [
      {
        id: "bv-fundamental",
        kind: "choice",
        skill: "harmonia-funcional",
        prompt: "Na maior parte do tempo, o que o baixo vocal canta nos tempos fortes?",
        options: [
          { id: "a", label: "A fundamental do acorde" },
          { id: "b", label: "A melodia uma oitava abaixo" },
          { id: "c", label: "Notas aleatórias" },
        ],
        correctOptionId: "a",
        explanation: "A fundamental no tempo forte define a harmonia para o ouvinte.",
      },
      {
        id: "bv-silaba",
        kind: "choice",
        skill: "arranjo",
        prompt: "Qual sílaba combina ataque e ressonância para o baixo vocal?",
        options: [
          { id: "a", label: "'dm'" },
          { id: "b", label: "'i'" },
          { id: "c", label: "'ts'" },
        ],
        correctOptionId: "a",
        explanation: "O 'd' dá o ataque; o 'm' prolonga a ressonância.",
      },
      {
        id: "bv-vp",
        kind: "choice",
        skill: "arranjo",
        prompt: "Como costuma ser indicada a percussão vocal?",
        options: [
          { id: "a", label: "Pauta de uma linha com B, S e H e indicações de estilo, deixando espaço para o intérprete" },
          { id: "b", label: "Na pauta do soprano" },
          { id: "c", label: "Não se indica" },
        ],
        correctOptionId: "a",
        explanation: "Notação simples + estilo + pontos de marcação.",
      },
    ],
    generators: [{ type: "range-check", count: 3 }, { type: "function-identification", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a função do baixo.",
  application: {
    title: "Prática no laboratório de escrita",
    steps: [
      "Abra o exemplo 'Linha de baixo vocal caminhando por graus'.",
      "Reescreva a linha para a progressão C – G/B – Am – F, com fundamentais (ou o baixo indicado) nos tempos fortes.",
      "Mude o estilo para 'Popular a cappella' e confira a extensão.",
    ],
  },
};

export const lessonGospel: Lesson = {
  id: "gospel-louvor",
  title: "Gospel e louvor: vocal de apoio, blocos e congregação",
  summary: "Arranjos para ministério de louvor e coro gospel: três vozes em bloco, chamada e resposta, vamp, modulações e como escrever para cantar junto com a banda e a congregação.",
  levelId: "s4",
  unitId: "s4-gos",
  status: "disponivel",
  prerequisites: ["variacao-e-desenvolvimento", "tensoes-e-extensoes"],
  estimatedMinutes: 65,
  competencies: ["arranjo", "harmonia-funcional"],
  objectives: [
    "Escrever vocal de apoio em três vozes em bloco acima da melodia ou ao redor dela.",
    "Usar chamada e resposta, vamp e modulação para construir a energia de uma canção de louvor.",
    "Adaptar a escrita à presença da banda e à participação da congregação.",
  ],
  sections: [
    {
      title: "1. O bloco de três vozes",
      blocks: [
        {
          type: "paragraph",
          text: "A sonoridade característica do coro gospel e do vocal de louvor é o bloco de três vozes (sopranos, contraltos e tenores) cantando a letra em acordes fechados, com a banda (ou o baixo) fazendo a fundamental. Como o baixo instrumental já toca a fundamental, as vozes ficam livres para usar inversões e 'acordes sobre baixo' (IV/I, V/IV), que soam abertos e modernos.",
        },
        { type: "example", score: EXA.gospelBloco, verdict: "correto", caption: "I – IV/I – I sobre baixo pedal", commentary: "O baixo sustenta Dó; as três vozes de cima vão de Dó maior para Fá maior em segunda inversão e voltam — o 'amém' que se ouve em muitos refrões." },
        {
          type: "example",
          score: EXA.gospelBlocoParalelo,
          verdict: "observacao",
          caption: "Tríades paralelas",
          commentary: "Mover o bloco inteiro em paralelo (I – ii – iii – ii) é um gesto típico do gospel. O motor registra as paralelas como sugestão no estilo popular: é escolha de estilo, não erro.",
        },
        { type: "listening", title: "Ouça o bloco", score: EXA.gospelBloco, instructions: ["Ouça só as três vozes de cima.", "Acrescente o baixo: o acorde de Fá sobre Dó ganha outra cor."], focus: [["S", "A", "T"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "2. Chamada e resposta, vamp e modulação",
      blocks: [
        {
          type: "list",
          items: [
            "Chamada e resposta: o solista canta uma frase, o coro responde (repetindo ou completando). Funciona em qualquer nível técnico.",
            "Vamp: uma frase curta repetida várias vezes, crescendo a cada repetição — o solista improvisa por cima. Indique 'repetir ad lib.' e a entrada para a saída.",
            "Modulação em degraus: o vamp ou o refrão sobe meio tom ou um tom a cada repetição. Prepare com o acorde de dominante da nova tonalidade.",
            "Paradas (breaks): a banda e o coro param juntos por um ou dois tempos antes de uma frase importante.",
          ],
        },
        {
          type: "callout",
          tone: "atencao",
          title: "Congregação canta junto",
          text: "Em louvor congregacional, a melodia precisa estar na tonalidade em que a congregação canta (geralmente com a nota mais aguda em torno de D5) e sempre audível. Vozes de apoio enriquecem, mas não devem esconder a melodia de quem está cantando junto.",
        },
      ],
    },
    {
      title: "3. Com a banda",
      blocks: [
        {
          type: "paragraph",
          text: "Quando há banda, o arranjo vocal não precisa fazer o baixo nem o ritmo — e não deve competir com eles. Deixe o grave para o baixo instrumental, use o coro nas frases longas e nas respostas, e dobre a melodia nos refrões. Combine com o tecladista a distribuição dos acordes: se o teclado toca a terça no agudo, o coro pode cantar a sétima ou a nona.",
        },
        { type: "example", score: CHORALE_SATB_C, verdict: "correto", caption: "Base harmônica a quatro vozes", commentary: "Sem banda, as quatro vozes precisam fazer tudo; com banda, o baixo vocal pode ser dispensado e as três vozes de cima viram o bloco." },
      ],
    },
    {
      title: "4. Demonstração: chamada, resposta e vamp num refrão de louvor",
      blocks: [
        { type: "list", ordered: true, items: [
          "Escolha a frase da chamada: curta, com o texto principal ('Santo é o Senhor'). O solista canta sozinho, livre.",
          "Escreva a resposta do coro em bloco de três vozes, repetindo ou completando o texto ('Santo, santo'), com acordes fechados sobre o baixo da banda.",
          "Monte o vamp: duas frases de resposta que se repetem, com um 'repetir ad lib.' e uma indicação clara de saída (o regente faz o sinal; o coro vai para o último refrão).",
          "Planeje a energia: a cada repetição, acrescente algo — dinâmica, uma voz mais aguda, uma modulação de meio tom.",
          "Confira a melodia da congregação: ela continua na tonalidade e no registro que o povo canta (até por volta de D5).",
        ] },
        { type: "callout", tone: "dica", title: "Decisões do arranjador", text: "Com banda, deixe o grave para o baixo instrumental e não dobre o teclado nota a nota: combine com o tecladista quem faz a terça e quem faz a sétima. Sem banda, o coro precisa voltar a fazer o baixo — e o bloco de três vozes ganha uma quarta voz." },
      ],
    },
    {
      title: "5. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Bloco no mesmo registro do solista", "o solista some", "bloco acima ou abaixo da melodia, mais suave"], ["Vamp sem indicação de saída", "o coro se perde", "'repetir ad lib.' + sinal de saída combinado"], ["Modulação a cada repetição sem preparo", "desafinação", "dominante da nova tonalidade antes de subir"], ["Tonalidade alta demais para a congregação", "o povo para de cantar", "melodia com o ponto mais agudo por volta de D5"]] },
        { type: "list", items: ["Bloco de três vozes sobre o baixo da banda.", "Chamada e resposta, vamp e modulação constroem a energia.", "Congregação: tonalidade e melodia sempre acessíveis."] },
        {
          type: "challenge",
          title: "Um vamp com saída",
          task: "Planeje um vamp de quatro compassos para o final de uma canção de louvor (em Ré maior, com banda): texto da resposta, acordes, distribuição das três vozes no primeiro acorde, plano de energia em três repetições e a saída.",
          constraints: ["Coro em bloco de três vozes (S, C, T); a banda faz o baixo.", "Melodia da resposta até D5.", "A saída precisa estar escrita (como o coro sabe que acabou?)."],
          criteria: ["Os acordes do vamp formam um ciclo que volta ao início sem esforço.", "Cada repetição acrescenta um elemento de energia.", "A saída termina na tônica com uma cadência clara."],
          hints: ["Ciclos comuns: I – IV/I – I – IV/I (pedal) ou I – vi – IV – V.", "Distribua o primeiro acorde fechado: D – F♯ – A entre G4 e D5, por exemplo.", "Para a 3ª repetição, meio tom acima (E♭) exige um B♭7 no fim da 2ª."],
          solution: {
            commentary: "Uma proposta: texto 'Santo, santo é o Senhor'; acordes D – G/D | D – G/D (pedal na banda); primeiro acorde fechado: tenor em A3, contralto em D4 e soprano em F♯4 (registro confortável; o bloco sobe para G/D com B3 – D4 – G4). Energia: 1ª vez, mf, só as respostas; 2ª vez, f, sopranos uma oitava acima em 'santo' (até D5); fim da 2ª vez, B♭7 para preparar; 3ª vez, em E♭, ff. Saída: o regente levanta a mão no compasso 4 da 3ª vez; o coro canta 'é o Senhor' em mínimas, com cadência IV – V – I (A♭ – B♭ – E♭) e acorde final em fermata.",
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-gospel",
    title: "Verificação: gospel e louvor",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["go-bloco"],
    staticItems: [
      {
        id: "go-bloco",
        kind: "choice",
        skill: "arranjo",
        prompt: "No coro gospel com banda, por que as vozes podem usar inversões livremente?",
        options: [
          { id: "a", label: "Porque o baixo instrumental já toca a fundamental" },
          { id: "b", label: "Porque o gospel não tem harmonia" },
          { id: "c", label: "Porque inversões são proibidas no coral tradicional" },
        ],
        correctOptionId: "a",
        explanation: "Com a fundamental garantida pelo baixo, o bloco vocal pode escolher a disposição que soa melhor.",
      },
      {
        id: "go-vamp",
        kind: "choice",
        skill: "arranjo",
        prompt: "O que é um vamp?",
        options: [
          { id: "a", label: "Uma frase curta repetida várias vezes, crescendo, com o solista improvisando" },
          { id: "b", label: "Um acorde final" },
          { id: "c", label: "Uma introdução instrumental" },
        ],
        correctOptionId: "a",
        explanation: "É o momento de construir energia; indique 'ad lib.' e a saída.",
      },
      {
        id: "go-congregacao",
        kind: "choice",
        skill: "arranjo",
        prompt: "No louvor congregacional, o que é prioritário?",
        options: [
          { id: "a", label: "A melodia na tonalidade da congregação e sempre audível" },
          { id: "b", label: "Acordes com muitas tensões" },
          { id: "c", label: "O vocal de apoio mais forte que o líder" },
        ],
        correctOptionId: "a",
        explanation: "A congregação canta a melodia; o arranjo serve a ela.",
      },
    ],
    generators: [{ type: "chord-identification", count: 2 }, { type: "function-identification", count: 2 }, { type: "cadence-identification", count: 1 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o bloco de três vozes.",
  application: {
    title: "Prática no laboratório de escrita",
    steps: [
      "Abra o exemplo 'Gospel: três vozes em bloco sobre o baixo'.",
      "Escreva mais dois compassos com chamada (soprano sozinho) e resposta (três vozes em bloco).",
      "Revise no estilo 'Popular a cappella'.",
    ],
  },
};

export const lessonMpbVocal: Lesson = {
  id: "mpb-vocal",
  title: "Música popular brasileira para vozes: samba, bossa e baião",
  summary: "Ritmo e harmonia dos gêneros brasileiros aplicados ao arranjo vocal: síncope do samba, acordes da bossa, modos do baião e a tradição dos grupos vocais.",
  levelId: "s4",
  unitId: "s4-mpb",
  status: "disponivel",
  prerequisites: ["tensoes-e-extensoes", "modulacao-reharmonizacao"],
  estimatedMinutes: 70,
  competencies: ["arranjo", "harmonia-funcional", "texto-e-prosodia"],
  objectives: [
    "Reconhecer e escrever os padrões rítmicos básicos de samba, bossa e baião para vozes.",
    "Usar a harmonia com sétimas e nonas típica da bossa nova sem perder a afinação.",
    "Aplicar os modos característicos do baião (sétima menor, quarta aumentada) a linhas vocais.",
  ],
  sections: [
    {
      title: "1. Ritmo antes de tudo",
      blocks: [
        {
          type: "table",
          caption: "Gêneros e o que o arranjo vocal precisa manter",
          headers: ["Gênero", "Compasso", "Característica", "No arranjo vocal"],
          rows: [
            ["Samba", "2/4", "Síncope constante; surdo no 2º tempo", "Backing com sílabas sincopadas ('tchi-ca'), baixo marcando o 2º tempo"],
            ["Bossa nova", "2/4 ou 4/4", "Batida do violão deslocada; harmonia rica", "Vozes suaves, acordes com 7ª e 9ª, pouco vibrato"],
            ["Baião", "2/4", "Zabumba: colcheia pontuada + semicolcheia", "Baixo vocal imitando a zabumba, melodia modal"],
            ["Choro/marcha-rancho", "2/4", "Contracantos, baixarias", "Linhas de baixo melódicas nos tenores ou baixos"],
          ],
        },
        {
          type: "paragraph",
          text: "Os grupos vocais brasileiros — Quarteto em Cy, MPB4, Boca Livre, e tantos coros que cantam MPB — mostram que a síncope pode estar na melodia, no acompanhamento ou nos dois. Escute e transcreva o padrão rítmico antes de escrever as vozes: um samba com acompanhamento em semínimas regulares deixa de ser samba.",
        },
      ],
    },
    {
      title: "2. A harmonia da bossa",
      blocks: [
        {
          type: "paragraph",
          text: "A bossa nova popularizou a harmonia com sétimas e nonas em quase todos os acordes, encadeados por notas comuns e graus conjuntos. Para vozes, isso é uma vantagem: as tensões da bossa costumam vir de vozes que ficam paradas enquanto o acorde muda por baixo. Escreva primeiro as notas-guia (terças e sétimas) e veja como elas andam por semitom de um acorde a outro.",
        },
        { type: "example", score: EXA.bossa, verdict: "correto", caption: "ii7 – V7 – Imaj7", commentary: "As notas-guia quase não se movem: a sétima de Dm7 (Dó5) desce meio tom para a terça de G7 (Si4), a terça de Dm7 (Fá4) permanece como sétima de G7, e a sétima maior do acorde final é o Si4 que o soprano já cantava. No estilo popular, o motor não aponta problemas." },
        { type: "example", score: EXA.dropTradicional, verdict: "incorreto", caption: "A mesma linguagem julgada pelo coral tradicional", commentary: "Se o estilo do arranjo estiver como coral tradicional, o motor acusa paralelas e sétimas sem resolução. Confirme sempre o estilo antes de revisar." },
        { type: "listening", title: "Ouça as notas-guia", score: EXA.bossa, instructions: ["Ouça contralto e soprano: as notas-guia andam pouco.", "Ouça tudo."], focus: [["S", "A"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "3. O baião e os modos",
      blocks: [
        {
          type: "paragraph",
          text: "Muitas melodias nordestinas usam o modo mixolídio (escala maior com sétima menor) e, às vezes, também a quarta aumentada (o chamado modo 'nordestino' ou lídio-mixolídio). No arranjo vocal, isso significa evitar 'corrigir' a sétima menor para sensível: ela é a identidade do gênero. A harmonia costuma girar em torno do acorde de tônica com sétima menor, sem a cadência V – I tradicional.",
        },
        {
          type: "callout",
          tone: "dica",
          title: "Prosódia brasileira",
          text: "O português tem muitas sílabas átonas finais ('can-ta', 'ca-mi-nho'). Em ritmos sincopados, a tônica costuma cair na síncope ou no tempo forte; as átonas, em notas curtas. Fale a letra no ritmo antes de escrever as vozes.",
        },
      ],
    },
    {
      title: "4. Demonstração: transcrever o ritmo antes das notas",
      blocks: [
        { type: "list", ordered: true, items: [
          "Ouça a gravação e bata o padrão do acompanhamento (violão, pandeiro, zabumba). Escreva-o numa linha rítmica, sem alturas.",
          "Decida quem leva o padrão no arranjo vocal: o baixo (surdo no 2º tempo do samba; colcheia pontuada + semicolcheia no baião) e/ou o backing com sílabas ('tchi-ca', 'pa-ra').",
          "Escreva as notas-guia da harmonia (terças e sétimas) em notas longas ou no ritmo escolhido, encadeadas por semitom.",
          "Coloque a melodia por cima e confira a prosódia: as tônicas na síncope ou no tempo forte.",
          "Ouça no estilo popular e confira se o balanço continua: se tudo cair nos tempos fortes, a síncope sumiu.",
        ] },
        { type: "callout", tone: "atencao", title: "Modo não é erro", text: "No baião, a sétima menor (mixolídio) e a quarta aumentada são identidade do gênero. 'Corrigir' a sétima menor para sensível tira o sotaque nordestino da melodia. No motor, escolha o estilo popular e leia os diagnósticos de sensível como informação." },
      ],
    },
    {
      title: "5. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Acompanhamento vocal em semínimas regulares", "o samba deixa de ser samba", "síncope em ao menos uma camada"], ["Tensões da bossa alcançadas por salto", "afinação instável", "notas-guia por semitom ou paradas"], ["Sensível no lugar da sétima menor no baião", "perde-se o modo", "mantenha a sétima menor"], ["Vibrato e vozes 'operísticas' na bossa", "estilo errado", "voz leve, pouco vibrato"]] },
        { type: "list", items: ["Ritmo primeiro: transcreva o padrão antes das notas.", "Bossa: notas-guia por semitom, tensões paradas.", "Baião: mixolídio e quarta aumentada como identidade."] },
        {
          type: "challenge",
          title: "Notas-guia de um ii–V–I em Fá",
          task: "Para a progressão Gm7 – C7 – Fmaj7 (bossa, um acorde por compasso), escreva as notas-guia (terça e sétima de cada acorde) em duas vozes, encadeadas pelo menor movimento, e diga onde caberia uma nona.",
          constraints: ["Duas vozes, uma com terças/sétimas alternadas e outra complementar.", "Nenhum salto maior que uma 2ª entre acordes."],
          criteria: ["Cada acorde tem sua terça e sua sétima.", "As vozes andam por semitom, tom ou ficam paradas.", "A nona proposta chega por grau ou nota comum."],
          hints: ["Gm7: terça B♭, sétima F. C7: terça E, sétima B♭. Fmaj7: terça A, sétima E.", "A sétima de um acorde vira a terça do seguinte, ou desce um semitom para ela.", "A nona de Gm7 é A; a de C7 é D; a de Fmaj7 é G."],
          solution: {
            commentary: "Voz 1: F4 (7ª de Gm7) → E4 (3ª de C7) → E4 (7ª de Fmaj7). Voz 2: B♭3 (3ª de Gm7) → B♭3 (7ª de C7) → A3 (3ª de Fmaj7). As notas-guia andam um semitom ou ficam paradas: F → E → E e B♭ → B♭ → A. Uma nona afinável: no Fmaj7, um soprano pode sustentar G4 vindo do G4 de um Gm7 em posição aberta (fundamental do Gm7 → nona do Fmaj7 depois de passar pelo C7 como quinta) — a nota não se move e muda de função três vezes.",
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-mpb",
    title: "Verificação: música popular brasileira",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["mpb-sincope"],
    staticItems: [
      {
        id: "mpb-sincope",
        kind: "choice",
        skill: "arranjo",
        prompt: "Ao arranjar um samba, qual é o maior risco?",
        options: [
          { id: "a", label: "Perder a síncope, escrevendo tudo em tempos regulares" },
          { id: "b", label: "Usar compasso 2/4" },
          { id: "c", label: "Usar o baixo no 2º tempo" },
        ],
        correctOptionId: "a",
        explanation: "A síncope é a identidade do gênero.",
      },
      {
        id: "mpb-guia",
        kind: "choice",
        skill: "harmonia-funcional",
        prompt: "O que são 'notas-guia' num acorde de sétima?",
        options: [
          { id: "a", label: "A terça e a sétima" },
          { id: "b", label: "A fundamental e a quinta" },
          { id: "c", label: "A nona e a décima primeira" },
        ],
        correctOptionId: "a",
        explanation: "São as notas que definem a qualidade do acorde e que andam por grau de um acorde a outro.",
      },
      {
        id: "mpb-modo",
        kind: "choice",
        skill: "harmonia-funcional",
        prompt: "Uma melodia de baião em Sol usa Fá natural. O arranjador deve:",
        options: [
          { id: "a", label: "Manter o Fá natural: é o modo mixolídio, característico do gênero" },
          { id: "b", label: "Trocar por Fá♯ para ter sensível" },
          { id: "c", label: "Transpor para menor" },
        ],
        correctOptionId: "a",
        explanation: "A sétima menor é a identidade modal do baião.",
      },
    ],
    generators: [{ type: "seventh-identification", count: 2 }, { type: "chord-identification", count: 3 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a síncope do samba.",
  application: {
    title: "Prática no laboratório de escrita",
    steps: [
      "Abra o exemplo 'Bossa: Dm7 – G7 – Cmaj7' e mude o estilo para 'Popular a cappella'.",
      "Acrescente dois compassos com Am7 – D7 – Dm7 – G7, escrevendo primeiro as terças e sétimas.",
      "Ouça cada voz sozinha e ajuste os saltos maiores que uma quarta.",
    ],
  },
};

export const lessonPartituraEnsaio: Lesson = {
  id: "partitura-e-ensaio",
  title: "Partitura final, kit de ensaio e adaptação ao grupo",
  summary: "Como entregar um arranjo profissional: partitura legível, indicações claras, arquivos de ensaio por naipe e versões para grupos de níveis diferentes.",
  levelId: "s4",
  unitId: "s4-prf",
  status: "disponivel",
  prerequisites: ["analise-estilistica-revisao"],
  estimatedMinutes: 55,
  competencies: ["leitura-vocal", "arranjo"],
  objectives: [
    "Revisar uma partitura quanto a legibilidade: letra, dinâmicas, respirações, compassos e acidentes.",
    "Preparar um kit de ensaio (PDF, MIDI por naipe, MusicXML).",
    "Simplificar ou enriquecer um arranjo conforme o nível do grupo.",
  ],
  sections: [
    {
      title: "1. Checklist da partitura",
      blocks: [
        {
          type: "list",
          items: [
            "Título, compositor, arranjador, formação e andamento no topo.",
            "Letra completa em todas as vozes que cantam texto, com hífens nas sílabas.",
            "Dinâmicas no início de cada seção e em toda mudança.",
            "Respirações marcadas onde não forem óbvias.",
            "Figuras escritas de modo que se veja o meio do compasso (sem notas atravessando o tempo 3 em 4/4).",
            "Acidentes de precaução quando uma nota alterada volta ao natural no compasso seguinte.",
            "Números de compasso no início de cada sistema e letras de ensaio (A, B, C) nas seções.",
          ],
        },
        { type: "example", score: EXA.partituraLimpa, verdict: "correto", caption: "Trecho pronto para ensaio", commentary: "Letra em todas as vozes, figuras claras e harmonia sem problemas: o coro consegue ler na primeira vez." },
        { type: "example", score: EX.ritmoAtravessaBarra, verdict: "incorreto", caption: "Figura que atravessa a barra", commentary: "Uma mínima pontuada que cruza a barra de compasso é erro de escrita: deve ser dividida com ligadura." },
      ],
    },
    {
      title: "2. O kit de ensaio",
      blocks: [
        {
          type: "paragraph",
          text: "Coros amadores aprendem muito em casa, com arquivos de áudio. Exporte o PDF da partitura, um MIDI ou áudio por naipe (a voz em destaque e as outras baixas) e o MusicXML para quem usa outros editores. O laboratório de escrita já exporta PDF, MusicXML e MIDI; a reprodução por voz permite gravar cada naipe isolado.",
        },
        { type: "listening", title: "Arquivo de ensaio do contralto", score: EXA.partituraLimpa, instructions: ["Ouça o contralto sozinho, depois com o soprano.", "É assim que um cantor estuda a própria voz em casa."], focus: [["A"], ["S", "A"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "3. Adaptar ao nível do grupo",
      blocks: [
        {
          type: "table",
          caption: "Simplificar × enriquecer",
          headers: ["Para simplificar", "Para enriquecer"],
          rows: [
            ["Mais uníssono e homofonia", "Mais contracanto e imitação"],
            ["Vozes internas com notas repetidas", "Vozes internas com movimento próprio"],
            ["Tonalidade que centraliza as tessituras", "Modulações e acordes com tensões"],
            ["Três vozes (SAB) em vez de quatro", "Divisi em seções escolhidas"],
            ["Ritmo das vozes igual ao da melodia", "Ritmos independentes e síncopes"],
          ],
        },
        { type: "paragraph", text: "Um bom arranjador entrega a versão que o grupo consegue cantar bem — e às vezes duas versões do mesmo arranjo, uma mais simples e outra mais elaborada." },
      ],
    },
  ],
  exercises: {
    id: "ex-partitura",
    title: "Verificação: partitura e ensaio",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["pe-barra"],
    staticItems: [
      {
        id: "pe-barra",
        kind: "choice",
        skill: "leitura-vocal",
        prompt: "Uma nota dura além da barra de compasso. Como escrever?",
        options: [
          { id: "a", label: "Dividir em duas figuras ligadas, uma em cada compasso" },
          { id: "b", label: "Usar uma figura maior atravessando a barra" },
          { id: "c", label: "Apagar a barra" },
        ],
        correctOptionId: "a",
        explanation: "A barra de compasso nunca é atravessada por uma figura: usa-se ligadura.",
      },
      {
        id: "pe-kit",
        kind: "choice",
        skill: "arranjo",
        prompt: "O que NÃO costuma fazer parte do kit de ensaio?",
        options: [
          { id: "a", label: "A senha do editor de partituras" },
          { id: "b", label: "Áudio ou MIDI por naipe" },
          { id: "c", label: "PDF da partitura" },
        ],
        correctOptionId: "a",
        explanation: "PDF, arquivos por naipe e MusicXML são o kit típico.",
      },
      {
        id: "pe-simplificar",
        kind: "choice",
        skill: "arranjo",
        prompt: "O grupo tem pouco tempo de ensaio. Qual mudança simplifica sem empobrecer a canção?",
        options: [
          { id: "a", label: "Trocar contracantos por homofonia e pad nas seções menos importantes" },
          { id: "b", label: "Retirar a melodia" },
          { id: "c", label: "Acrescentar divisi" },
        ],
        correctOptionId: "a",
        explanation: "Homofonia e pad são aprendidos mais rápido e mantêm a canção reconhecível.",
      },
      {
        id: "pe-letras",
        kind: "choice",
        skill: "leitura-vocal",
        prompt: "Para que servem as letras de ensaio (A, B, C) na partitura?",
        options: [
          { id: "a", label: "Para o regente e o coro localizarem rapidamente as seções no ensaio" },
          { id: "b", label: "Para indicar a tonalidade" },
          { id: "c", label: "Para indicar a dinâmica" },
        ],
        correctOptionId: "a",
        explanation: "'Vamos da letra C' é muito mais rápido que contar compassos.",
      },
      {
        id: "pe-precaucao",
        kind: "choice",
        skill: "leitura-vocal",
        prompt: "Um Fá♯ no compasso 3 volta a ser Fá natural no compasso 4. O que escrever?",
        options: [
          { id: "a", label: "Um bequadro de precaução no Fá do compasso 4" },
          { id: "b", label: "Nada" },
          { id: "c", label: "Mudar a armadura" },
        ],
        correctOptionId: "a",
        explanation: "Tecnicamente desnecessário, mas evita que o cantor repita o sustenido por memória.",
      },
    ],
    generators: [{ type: "range-check", count: 3 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a escrita de figuras na barra.",
  application: {
    title: "Trabalho de conclusão",
    steps: [
      "Abra o projeto 'Arranjo completo' em Trabalhos práticos.",
      "Revise a partitura pelo checklist desta aula.",
      "Exporte PDF, MusicXML e MIDI e ouça cada naipe isolado antes de entregar.",
    ],
  },
};
