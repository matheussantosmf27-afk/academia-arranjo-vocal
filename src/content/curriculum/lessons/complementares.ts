import { NOITE_FELIZ } from "../../repertorio";
import { CHORALE_SATB_C } from "@/domain/music/examples";
import { EX } from "../examples";
import { EXA } from "../examples-arranjo";
import { EXD } from "../examples-didatica";
import type { Lesson } from "../types";

/*
 * Aulas que completam a grade com conteúdos recorrentes nos programas de
 * graduação pesquisados (escrita a duas vozes, baixo e canto dado, escrita em
 * bloco, contracanto ativo e passivo, harmonia cromática e moderna, análise de
 * repertório). A posição na grade e os pré-requisitos ficam em curriculum.ts.
 */

export const lessonDuasVozes: Lesson = {
  id: "duas-vozes",
  title: "Escrita a duas vozes: dueto, terças e sextas, independência",
  summary: "O primeiro passo da escrita vocal: como acompanhar uma melodia com uma segunda voz que soa bem, é cantável e não 'cola' na primeira.",
  levelId: "s2",
  unitId: "s2-hmz",
  status: "disponivel",
  prerequisites: [],
  estimatedMinutes: 55,
  competencies: ["contraponto", "conducao-de-vozes", "arranjo"],
  objectives: [
    "Escrever uma segunda voz em terças e sextas sob (ou sobre) uma melodia.",
    "Usar os três tipos de movimento (paralelo, contrário e oblíquo) com intenção.",
    "Evitar quintas e oitavas paralelas e uníssonos que apagam uma das vozes.",
    "Decidir quando a segunda voz deve cantar a letra e quando deve fazer apoio.",
  ],
  sections: [
    {
      title: "1. Por que começar com duas vozes",
      blocks: [
        {
          type: "paragraph",
          text: "Programas de arranjo vocal costumam começar pela escrita a duas vozes antes de chegar a três e quatro: é o menor arranjo possível e já exige todas as decisões importantes — que intervalo usar, quando seguir a melodia e quando se afastar dela, como terminar. É também uma formação real: duplas sertanejas, duos de MPB, o 'segunda voz' do louvor e a abertura de muitos arranjos corais.",
        },
        {
          type: "table",
          caption: "Os intervalos entre as duas vozes",
          headers: ["Intervalo", "Efeito", "Uso"],
          rows: [
            ["Terças e sextas", "Doces, cheias, fundem as vozes", "A base do dueto; podem andar em paralelo"],
            ["Quintas e oitavas", "Ocas, 'abertas'", "Em notas isoladas (inícios, finais); nunca em sequência"],
            ["Uníssono", "Força, as vozes viram uma", "Para destacar uma palavra ou fechar a frase"],
            ["Segundas, quartas, sétimas", "Tensão", "Como notas de passagem ou retardos, resolvendo por grau"],
          ],
        },
        { type: "example", score: NOITE_FELIZ.score, verdict: "observacao", caption: "Noite Feliz (Gruber, 1818): o dueto original", commentary: "Repertório real (domínio público): na primeira versão, a segunda voz acompanha a melodia quase sempre uma terça ou uma sexta abaixo, no mesmo ritmo. É o dueto em terças e sextas mais conhecido do mundo. O motor só faz sugestões: a peça foi escrita para duas vozes, e tenor e baixo estão em pausa." },
      ],
    },
    {
      title: "2. Terças e sextas: o dueto clássico",
      blocks: [
        {
          type: "paragraph",
          text: "A segunda voz mais simples acompanha a melodia uma terça abaixo. Quando a terça abaixo não pertence ao acorde, ou quando a melodia sobe demais, troque para a sexta abaixo (que é a mesma nota uma oitava acima, invertida). Alternar terças e sextas mantém a segunda voz numa região confortável e evita que ela cruze a melodia.",
        },
        {
          type: "example",
          score: EXA.duetoTercas,
          verdict: "correto",
          caption: "Dueto em terças e sextas",
          commentary: "O contralto canta a mesma letra quase sempre uma terça abaixo da melodia; no tempo 4 do compasso 1 passa para a sexta (Ré5 sobre Fá♯4), sem nunca ultrapassá-la. O final numa sexta (Sol4 sobre Si3) é mais doce do que um uníssono.",
        },
        { type: "listening", title: "Cante a segunda voz", score: EXA.duetoTercas, instructions: ["Cante o contralto enquanto ouve o soprano.", "Ouça as duas vozes juntas: elas se fundem?"], focus: [["A"], ["S", "A"]] },
      ],
    },
    {
      title: "3. Independência: movimento contrário e oblíquo",
      blocks: [
        {
          type: "paragraph",
          text: "Terças paralelas o tempo todo podem soar como 'uma voz engrossada'. Para dar identidade à segunda voz, use movimento contrário nas cadências e movimento oblíquo (uma voz parada, a outra andando) quando a melodia tem notas rápidas. A regra de ouro do contraponto vale aqui: quintas e oitavas justas nunca em sequência.",
        },
        { type: "example", score: EX.duasVozes, verdict: "correto", caption: "Movimento contrário entre as vozes extremas", commentary: "Quando o soprano sobe, o baixo desce: cada voz tem desenho próprio e as duas juntas definem a harmonia." },
        { type: "example", score: EX.duasVozesParalelas, verdict: "incorreto", caption: "Quintas paralelas", commentary: "Duas vozes em quintas justas consecutivas soam como uma só linha 'oca' — o motor acusa o erro." },
      ],
    },
    {
      title: "4. Demonstração: uma segunda voz passo a passo",
      blocks: [
        { type: "list", ordered: true, items: [
          "Cante a melodia e marque onde ela sobe muito e onde termina: é aí que a segunda voz vai precisar mudar de intervalo.",
          "Escreva uma 3ª abaixo de cada nota (dentro da tonalidade). Confira se essas notas pertencem ao acorde implícito; se não, troque pela 6ª abaixo.",
          "Onde a 3ª abaixo deixa a segunda voz aguda demais para o naipe (contraltos acima de B4), use a 6ª abaixo.",
          "Procure um ou dois lugares para movimento contrário ou oblíquo (fins de frase, notas longas da melodia).",
          "Termine numa consonância estável: 3ª, 6ª ou 8ª. Uníssono só se quiser 'fechar' as vozes numa palavra importante.",
          "Cante a segunda voz sozinha: ela precisa ter sentido como linha, não só como sombra da melodia.",
        ] },
        { type: "callout", tone: "dica", title: "Decisões do arranjador", text: "Terças paralelas o tempo todo funcionam no sertanejo e no louvor, onde a fusão é o objetivo. Em coro, uma segunda voz que alterna 3ªs e 6ªs e tem alguns movimentos próprios soa mais rica e é mais fácil de equilibrar. Decida pelo estilo e pelo que o texto pede." },
      ],
    },
    {
      title: "5. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Consequência", "Correção"], rows: [["3ª abaixo que não pertence ao acorde", "atrito não desejado num tempo forte", "troque pela 6ª ou por outra nota do acorde"], ["Segunda voz cruzando a melodia", "o ouvido perde a melodia", "mantenha a segunda voz abaixo (ou acima) o tempo todo"], ["5ªs ou 8ªs seguidas", "as duas vozes viram uma", "no máximo isoladas, no início ou no fim"], ["Segunda voz sem respiração própria", "naipe sem fôlego", "respire junto com a melodia"]] },
        { type: "list", items: ["3ªs e 6ªs são a base do dueto; alterne-as para manter a voz confortável.", "Movimento contrário e oblíquo dão identidade à segunda voz.", "Consonâncias perfeitas só isoladas; nunca em sequência."] },
        {
          type: "challenge",
          title: "Segunda voz para uma melodia nova",
          task: "Escreva uma segunda voz (contralto) abaixo da melodia dada, em 3ªs e 6ªs, terminando numa 8ª.",
          start: EXD.duasStart,
          constraints: ["Contralto entre A3 e B4.", "Só 3ªs, 6ªs e a 8ª final.", "Mesmo ritmo da melodia."],
          criteria: ["Nenhuma 5ª ou 8ª antes do último acorde.", "Pelo menos um trecho em 6ªs e outro em 3ªs.", "O contralto nunca passa acima da melodia."],
          hints: ["Com 3ªs abaixo, o compasso 1 levaria o contralto a C5 (sob E5): acima da tessitura. Que intervalo usar ali?", "As 6ªs abaixo do compasso 1 são E4 F4 G4 E4.", "No compasso 3 a melodia desce até G4: 6ªs abaixo levam o contralto até B3, ainda na tessitura."],
          solution: {
            score: EXD.duasSol,
            commentary: "Compasso 1 em 6ªs (E4 F4 G4 E4), compasso 2 em 3ªs (B4 G4), compasso 3 de novo em 6ªs (E4 C4 D4 B3) e a 8ª final (C4 sob C5). A troca entre 6ªs e 3ªs mantém o contralto entre B3 e B4 — exatamente a tessitura — e a 8ª final fecha a frase com estabilidade.",
            alternatives: ["Terminar em 6ª (E4 sob C5), como no dueto da seção 2, também é válido e soa mais doce que a 8ª; evite a 3ª abaixo (A4), que sugere lá menor no acorde final.", "No compasso 2, 6ªs (F4 D4) em vez de 3ªs também funcionam, deixando o contralto mais grave e escuro."],
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-duas-vozes",
    title: "Verificação: duas vozes",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["dv-paralelas"],
    staticItems: [
      {
        id: "dv-paralelas",
        kind: "choice",
        skill: "contraponto",
        prompt: "Quais intervalos podem andar em paralelo entre duas vozes sem problema no estilo tradicional?",
        options: [
          { id: "a", label: "Terças e sextas" },
          { id: "b", label: "Quintas e oitavas justas" },
          { id: "c", label: "Qualquer intervalo" },
        ],
        correctOptionId: "a",
        explanation: "Consonâncias imperfeitas em paralelo fundem as vozes sem anular a independência; quintas e oitavas paralelas fazem duas vozes soarem como uma.",
      },
      {
        id: "dv-sexta",
        kind: "choice",
        skill: "arranjo",
        prompt: "A terça abaixo da melodia não pertence ao acorde. Qual é a troca mais comum?",
        options: [
          { id: "a", label: "Usar a sexta abaixo" },
          { id: "b", label: "Usar a segunda abaixo" },
          { id: "c", label: "Cantar em uníssono o tempo todo" },
        ],
        correctOptionId: "a",
        explanation: "A sexta abaixo costuma ser nota do acorde e mantém a doçura do dueto.",
      },
      {
        id: "dv-obliquo",
        kind: "choice",
        skill: "contraponto",
        prompt: "O que é movimento oblíquo?",
        options: [
          { id: "a", label: "Uma voz parada enquanto a outra se move" },
          { id: "b", label: "As duas vozes na mesma direção" },
          { id: "c", label: "As duas vozes em direções opostas" },
        ],
        correctOptionId: "a",
        explanation: "É útil quando a melodia tem notas rápidas: a segunda voz sustenta e dá apoio.",
      },
      {
        id: "dv-cruzamento",
        kind: "choice",
        skill: "conducao-de-vozes",
        prompt: "A segunda voz (abaixo) sobe acima da melodia por um tempo. O que acontece?",
        options: [
          { id: "a", label: "O ouvinte perde a melodia: ela deixa de ser a voz mais aguda" },
          { id: "b", label: "Nada muda" },
          { id: "c", label: "A harmonia fica mais clara" },
        ],
        correctOptionId: "a",
        explanation: "O ouvido acompanha a voz mais aguda; cruzar a melodia confunde o ouvinte.",
      },
    ],
    generators: [{ type: "ear-comparison", count: 1, topics: ["paralelas"] }, { type: "motion-type", count: 1, earOnly: true }, { type: "motion-type", count: 3 }, { type: "interval-identification", count: 2, maxNumber: 8 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo os intervalos que podem andar em paralelo.",
  application: {
    title: "Prática no laboratório de escrita",
    steps: [
      "Abra o exercício 'canto dado' no laboratório (Abrir exemplo).",
      "Escreva no contralto uma segunda voz em terças e sextas, com a mesma letra.",
      "Revise com o motor e cante a sua voz enquanto ouve a melodia.",
    ],
  },
};

export const lessonBaixoCantoDado: Lesson = {
  id: "baixo-e-canto-dado",
  title: "Baixo dado e canto dado: o treino clássico de harmonia",
  summary: "Os dois exercícios que formam o ouvido harmônico nas escolas de música: completar as vozes a partir do baixo ou da melodia.",
  levelId: "s2",
  unitId: "s2-hmz",
  status: "disponivel",
  prerequisites: [],
  estimatedMinutes: 60,
  competencies: ["conducao-de-vozes", "harmonia-funcional", "escrita-satb"],
  objectives: [
    "Realizar um baixo dado: deduzir os acordes e escrever soprano, contralto e tenor.",
    "Harmonizar um canto dado: escolher acordes e escrever contralto, tenor e baixo.",
    "Verificar a própria realização: acordes completos, dobras, sensível, paralelas.",
  ],
  sections: [
    {
      title: "1. O que são",
      blocks: [
        {
          type: "paragraph",
          text: "Nos cursos de harmonia, os dois exercícios mais tradicionais são o baixo dado (o professor escreve a linha do baixo, às vezes com cifras numéricas, e o aluno completa as outras vozes) e o canto dado (o professor dá a melodia e o aluno harmoniza). Eles treinam exatamente o que o arranjador faz o tempo todo: a partir de uma linha, decidir acordes e distribuí-los com boa condução.",
        },
        {
          type: "table",
          caption: "Comparação",
          headers: ["Exercício", "O que é dado", "O que se decide", "Principal desafio"],
          rows: [
            ["Baixo dado", "A linha do baixo", "Os acordes (pelo baixo e pela função) e as três vozes de cima", "Escrever um soprano com bom contorno"],
            ["Canto dado", "A melodia", "Os acordes (vários servem para cada nota) e o baixo", "Fazer o baixo em contraponto com a melodia"],
          ],
        },
      ],
    },
    {
      title: "2. Método para o baixo dado",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Identifique o acorde de cada nota do baixo (estado fundamental, salvo cifra indicando inversão).",
            "Marque as cadências e a sensível de cada dominante.",
            "Escreva o soprano: uma linha cantável, de preferência em movimento contrário ao baixo.",
            "Complete contralto e tenor com as notas que faltam, mantendo notas comuns e andando por grau.",
            "Confira: cada acorde tem fundamental, terça (e quinta, se possível)? A sensível não está dobrada e resolve? Há quintas ou oitavas paralelas?",
          ],
        },
        { type: "example", score: CHORALE_SATB_C, verdict: "correto", caption: "Realização completa", commentary: "Leia só o baixo e deduza os acordes; depois confira como soprano, contralto e tenor completam cada acorde com o menor movimento." },
        { type: "example", score: EX.paralelas, verdict: "incorreto", caption: "Realização em bloco", commentary: "Mover as três vozes de cima na mesma direção do baixo produz quintas e oitavas paralelas — o erro mais comum do baixo dado." },
      ],
    },
    {
      title: "3. Método para o canto dado",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Para cada nota da melodia, liste os acordes que a contêm (Dó está em I, IV e vi).",
            "Escolha pela função: as cadências primeiro, depois o caminho T → S → D → T.",
            "Escreva o baixo em contraponto com a melodia, evitando oitavas e quintas paralelas entre os dois.",
            "Complete contralto e tenor, conferindo dobras e a sensível.",
          ],
        },
        {
          type: "listening",
          title: "Ouça o baixo e o soprano",
          score: CHORALE_SATB_C,
          instructions: ["Ouça só o baixo: dá para adivinhar os acordes?", "Ouça só o soprano: que acordes você escolheria?", "Ouça tudo e compare."],
          focus: [["B"], ["S"], ["S", "A", "T", "B"]],
        },
      ],
    },
    {
      title: "4. Demonstração: realizar um baixo dado",
      blocks: [
        { type: "paragraph", text: "Problema: baixo dado em Sol maior, G2 – C3 | A2 – D3 | G2, sem cifras (todos os acordes em estado fundamental). Escreva soprano, contralto e tenor." },
        { type: "list", ordered: true, items: [
          "Acordes: G2 = I, C3 = IV, A2 = ii, D3 = V, G2 = I. Funções: T – S – S – D – T; a última troca (V → I) é a cadência autêntica.",
          "Pontos críticos: a sensível F♯ no V (uma só, subindo para G) e as duas trocas em que o baixo anda por 3ª ou 4ª — com salto no baixo, as vozes de cima devem andar pouco.",
          "Soprano com direção: B4 – C5 | C5 – A4 | G4. Ele sobe ao C5 (nota comum entre IV e ii), desce e chega à tônica por 2–1 — autêntica perfeita.",
          "Vozes internas: notas comuns primeiro. C e E são comuns a IV e ii; D é comum a I e V; G é comum a I e IV.",
          "Confira os seis pares em cada troca e, no fim, se o I tem terça.",
        ] },
        { type: "callout", tone: "dica", title: "Baixo dado com cifras numéricas", text: "Quando o baixo vem com números (6, ⁶₄, 7), eles indicam os intervalos acima do baixo: 6 = 1ª inversão; ⁶₄ = 2ª inversão; 7 = acorde de sétima. Leia-os antes de decidir o acorde: um B2 com '6' não é vi, é o V⁶ de… depende da tonalidade (em Sol maior, por exemplo, B2⁶ é I⁶)." },
      ],
    },
    {
      title: "5. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Consequência", "Correção"], rows: [["Soprano que só repete notas comuns", "linha sem direção", "dê ao soprano um ponto culminante e uma chegada"], ["Ler a nota do baixo como fundamental sem olhar a cifra", "acorde errado", "a cifra numérica decide a inversão"], ["Vozes de cima na mesma direção do baixo no IV → V", "paralelas", "movimento contrário ao baixo"], ["Sensível no V em duas vozes", "oitavas paralelas na resolução", "uma só, e subindo"]] },
        { type: "list", items: ["Baixo dado: deduza os acordes, escreva o soprano, complete as vozes internas.", "Canto dado: escolha os acordes pela melodia e pela função, escreva o baixo em contraponto.", "Nos dois casos, a conferência final é a mesma: acordes completos, dobras, sensível, paralelas."] },
        {
          type: "challenge",
          title: "Baixo dado em Ré maior",
          task: "Realize o baixo dado abaixo (D3 – B2 | G2 – A2 | D3, todos em estado fundamental): escreva soprano, contralto e tenor.",
          start: EXD.bdStart,
          constraints: ["Não altere o baixo.", "Só tríades em estado fundamental, como indicado.", "Soprano com pelo menos um movimento contrário ao baixo e terminando na tônica."],
          criteria: ["Acordes: I – vi | IV – V | I, todos completos ou com a quinta omitida.", "Sensível uma vez no V e subindo.", "O motor não aponta erros nem alertas."],
          hints: ["Comece pelo fim: V → I com o soprano C♯5 → D5.", "No IV → V, o baixo sobe G2 → A2: contralto e tenor devem descer.", "Notas comuns: F♯ (entre I e vi) e D (entre I, vi e IV)."],
          solution: {
            score: EXD.bdSol,
            commentary: "Soprano A4 – B4 | D5 – C♯5 | D5; contralto F♯4 – F♯4 | G4 – E4 | F♯4; tenor D4 – D4 | B3 – A3 | A3. O contralto mantém F♯4 do I para o vi (nota comum) e o tenor mantém D4; no IV → V, contralto e tenor descem enquanto o baixo sobe. O soprano sobe ao D5 no IV (ponto culminante) e chega à tônica pela sensível.",
            alternatives: ["Soprano D5 – D5 | D5 – C♯5 | D5: correto, mas sem direção (três notas iguais); prefira um soprano com contorno.", "Soprano F♯4 – F♯4 | G4 – E4 | F♯4 (o contralto da solução no lugar do soprano): termina na terça, cadência autêntica imperfeita — válida se o trecho não for o final."],
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-baixo-canto-dado",
    title: "Verificação: baixo dado e canto dado",
    instructions: "Escolha a realização sem erros. Cada alternativa errada mostra o diagnóstico do motor. Domínio: 75% e o item essencial.",
    minScore: 0.75,
    requiredItemIds: ["bcd-conferir"],
    staticItems: [
      {
        id: "bcd-conferir",
        kind: "choice",
        skill: "conducao-de-vozes",
        prompt: "Ao revisar um baixo dado, qual destes NÃO é um item de conferência?",
        options: [
          { id: "a", label: "Se o soprano canta a letra" },
          { id: "b", label: "Se a sensível do V está dobrada" },
          { id: "c", label: "Se há quintas ou oitavas paralelas" },
        ],
        correctOptionId: "a",
        explanation: "O exercício avalia harmonia e condução: acordes completos, dobras, sensível e paralelas.",
      },
      {
        id: "bcd-acordes",
        kind: "choice",
        skill: "harmonia-funcional",
        prompt: "No canto dado em Dó maior, a melodia tem Dó. Quais acordes contêm essa nota?",
        options: [
          { id: "a", label: "I, IV e vi" },
          { id: "b", label: "V e vii°" },
          { id: "c", label: "Só o I" },
        ],
        correctOptionId: "a",
        explanation: "Dó é fundamental de I, quinta de IV e terça de vi.",
      },
      {
        id: "bcd-primeiro",
        kind: "choice",
        skill: "harmonia-funcional",
        prompt: "No canto dado, o que se harmoniza primeiro?",
        options: [
          { id: "a", label: "As cadências (finais de frase)" },
          { id: "b", label: "A primeira nota" },
          { id: "c", label: "As notas mais agudas" },
        ],
        correctOptionId: "a",
        explanation: "As cadências estruturam a frase; o resto se encaixa a partir delas.",
      },
      {
        id: "bcd-baixo",
        kind: "choice",
        skill: "conducao-de-vozes",
        prompt: "No canto dado, como escrever o baixo em relação à melodia?",
        options: [
          { id: "a", label: "Em contraponto: de preferência movimento contrário, sem quintas ou oitavas paralelas" },
          { id: "b", label: "Sempre na mesma direção da melodia" },
          { id: "c", label: "Repetindo a melodia uma oitava abaixo" },
        ],
        correctOptionId: "a",
        explanation: "Melodia e baixo formam o esqueleto: precisam ser independentes.",
      },
    ],
    generators: [
      { type: "ear-comparison", count: 1, topics: ["sensivel"] }, { type: "cadence-identification", count: 1, earOnly: true },
      { type: "realization", count: 2, mode: "baixo-dado" },
      { type: "realization", count: 2, mode: "canto-dado" },
    ],
  },
  masteryDescription: "≥ 75% de acertos, incluindo o item de conferência.",
  application: {
    title: "Prática no laboratório de escrita",
    steps: [
      "Abra o exercício 'baixo dado' no laboratório (Abrir exemplo) e escreva soprano, contralto e tenor.",
      "Abra o exercício 'canto dado' e escreva contralto, tenor e baixo.",
      "Revise os dois com o motor no estilo coral tradicional até não haver erros nem alertas.",
    ],
  },
};

export const lessonEscritaBloco: Lesson = {
  id: "escrita-em-bloco",
  title: "Escrita em bloco: técnicas da música popular",
  summary: "Bloco fechado, drop 2, estruturas em quartas e em segundas, tríades de estrutura superior, aproximação e técnica linear — o 'soli' vocal do jazz, do gospel e da MPB.",
  levelId: "s2",
  unitId: "s2-tex",
  status: "disponivel",
  prerequisites: [],
  estimatedMinutes: 70,
  competencies: ["arranjo", "acordes", "escrita-satb"],
  objectives: [
    "Harmonizar uma melodia em bloco fechado (as vozes logo abaixo da melodia).",
    "Abrir o bloco com a técnica drop 2 para vozes.",
    "Reconhecer estruturas em quartas, em segundas e tríades de estrutura superior.",
    "Harmonizar notas de passagem da melodia com acordes de aproximação.",
  ],
  sections: [
    {
      title: "1. Bloco: a melodia arrasta o acorde",
      blocks: [
        {
          type: "paragraph",
          text: "Na escrita em bloco (ou 'soli'), as vozes de acompanhamento cantam o mesmo ritmo e a mesma letra da melodia, cada uma numa nota do acorde logo abaixo dela. O resultado é um único 'corpo sonoro' que se move junto — a sonoridade de grupos vocais de jazz, de muitos corais gospel e de arranjos de MPB. Diferente da homofonia tradicional, aqui o paralelismo é desejado: o bloco sobe e desce com a melodia.",
        },
        {
          type: "table",
          caption: "Técnicas de bloco",
          headers: ["Técnica", "Como se faz", "Som"],
          rows: [
            ["Bloco fechado (mecânico)", "Melodia no topo; as outras vozes nas notas do acorde imediatamente abaixo, dentro de uma oitava", "Compacto, brilhante"],
            ["Drop 2", "A partir do bloco fechado, a segunda voz de cima desce uma oitava", "Mais aberto, menos 'embolado' no grave"],
            ["Aproximação", "Nota da melodia fora do acorde recebe um acorde de passagem (diminuto ou dominante)", "Movimento cromático suave"],
            ["Estruturas em quartas", "Acordes empilhados em quartas sob a melodia", "Moderno, aberto, sem centro forte"],
            ["Estruturas em segundas", "Duas vozes a um tom ou semitom de distância (cluster)", "Atrito, brilho; exige afinação segura"],
            ["Tríade de estrutura superior", "Uma tríade nas vozes de cima sobre outro acorde no baixo (ex.: Ré maior sobre Dó)", "Tensões ricas soando como tríade simples"],
            ["Técnica linear", "Cada voz pensada como melodia própria, mesmo no ritmo da melodia", "Bloco com vozes internas cantáveis"],
          ],
        },
      ],
    },
    {
      title: "2. Bloco sobre o baixo",
      blocks: [
        {
          type: "paragraph",
          text: "Em coro misto, o bloco costuma ficar nas três vozes de cima (soprano, contralto e tenor), com o baixo livre para fazer as fundamentais ou um pedal. Assim as vozes de cima podem usar inversões e cores sem perder a clareza da harmonia.",
        },
        { type: "example", score: EXA.gospelBloco, verdict: "correto", caption: "Bloco de três vozes sobre baixo pedal", commentary: "Soprano, contralto e tenor movem-se juntos (I – IV/I – I) enquanto o baixo sustenta Dó." },
        {
          type: "example",
          score: EXA.gospelBlocoParalelo,
          verdict: "observacao",
          caption: "Bloco paralelo",
          commentary: "Todas as vozes em tríades paralelas: no estilo popular o motor registra apenas sugestões. É o efeito de 'naipe' que o bloco procura.",
        },
        { type: "example", score: EXA.dropTradicional, verdict: "incorreto", caption: "O mesmo recurso no estilo errado", commentary: "Tétrades em bloco avaliadas como coral tradicional: paralelas e sétimas sem resolução são erros nesse estilo." },
      ],
    },
    {
      title: "3. Quartas, segundas e estruturas superiores",
      blocks: [
        {
          type: "paragraph",
          text: "Empilhar quartas (Mi – Lá – Ré sobre Dó) produz um acorde ambíguo, aberto e moderno, muito usado em introduções e finais de arranjos de jazz e MPB. As segundas (clusters) dão brilho e atrito; escreva-as para vozes seguras, chegando a elas por grau. A tríade de estrutura superior é um truque de afinação: o coro canta uma tríade simples, mas, sobre o baixo, ela vira um acorde com nona, décima primeira aumentada e décima terceira.",
        },
        { type: "example", score: EXA.quartas, verdict: "correto", caption: "Estrutura em quartas sobre Dó", commentary: "Mi4 – Lá4 – Ré5 (quartas empilhadas) sobre o baixo Dó3: terça, sexta e nona de Dó — o acorde soa como C6/9, aberto e sem a quinta. No estilo popular, o motor não aponta problemas." },
        { type: "listening", title: "Ouça a estrutura quartal", score: EXA.quartas, instructions: ["Ouça só as três vozes de cima: quartas empilhadas.", "Acrescente o baixo."], focus: [["S", "A", "T"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "4. Demonstração: harmonizar em bloco sobre um pedal",
      blocks: [
        { type: "paragraph", text: "Problema: no estilo gospel, a melodia E5 – D5 – C5 (Dó maior) deve ganhar um bloco de três vozes (soprano, contralto, tenor) sobre o baixo parado em C3." },
        { type: "list", ordered: true, items: [
          "Decida o acorde de cada nota da melodia: E5 (C), D5 (G/C ou Dm7/C), C5 (C).",
          "Bloco fechado: para cada nota, as duas notas do acorde imediatamente abaixo dela. E5 → C5 e G4; D5 → B4 e G4 (G/C) ou A4 e F4 (Dm/C); C5 → G4 e E4.",
          "Escolha pela linha de cada voz: com Dm/C, o contralto faz C5 – A4 – G4 e o tenor G4 – F4 – E4 — todos descem por grau, como um único corpo.",
          "Confira o baixo: o pedal C3 sustenta tudo; as dissonâncias com ele (D, F, A sobre C) são cor, típicas do estilo.",
          "Ouça no estilo popular: o motor registra os paralelos como sugestão, não erro.",
        ] },
        { type: "callout", tone: "atencao", title: "Bloco e estilo", text: "Um bloco paralelo no estilo coral tradicional seria corrigido; no gospel e no jazz vocal, é o objetivo. Antes de escrever um bloco, confirme que o estilo do arranjo pede essa sonoridade e que o grupo afina tríades paralelas com segurança." },
      ],
    },
    {
      title: "5. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Bloco grave demais (abaixo de C4 nas vozes femininas)", "som embolado e sem brilho", "suba a tonalidade ou use drop 2"], ["Nota da melodia fora do acorde harmonizada 'no automático'", "atrito sem intenção", "acorde de aproximação (diminuto ou dominante) ou nota de passagem"], ["Bloco e baixo nas mesmas notas", "o baixo perde a função", "o baixo faz fundamentais ou pedal, separado do bloco"], ["Clusters em vozes inseguras", "desafinação", "chegue às segundas por grau e só com vozes seguras"]] },
        { type: "list", items: ["Bloco: as vozes de apoio logo abaixo da melodia, no mesmo ritmo e na mesma letra.", "Drop 2 abre o bloco e alivia o grave.", "O bloco é estilo popular; o baixo fica livre para fundamentais ou pedal."] },
        {
          type: "challenge",
          title: "Bloco de três vozes sobre o pedal de Sol",
          task: "Harmonize a melodia B4 – A4 – G4 – A4 | B4 em bloco fechado de três vozes (soprano, contralto, tenor) sobre o baixo parado em G2, estilo popular.",
          start: EXD.blocoStart,
          constraints: ["Bloco fechado: contralto e tenor nas notas do acorde imediatamente abaixo da melodia.", "Acordes: G e Am7/G (Lá menor sobre o pedal de Sol).", "Tenor até E4."],
          criteria: ["As três vozes de cima se movem juntas, no mesmo ritmo.", "Nas notas B4 e G4 o acorde é G; em A4, Am/G.", "O motor, no estilo popular, não aponta erros nem alertas."],
          hints: ["Sob B4 no acorde de G: as duas notas de G logo abaixo são G4 e D4.", "Sob A4 no acorde de Lá menor: E4 e C4.", "Sob G4 no acorde de G: D4 e B3."],
          solution: {
            score: EXD.blocoSol,
            commentary: "Contralto G4 – E4 – D4 – E4 | G4 e tenor D4 – C4 – B3 – C4 | D4 sobre G2 sustentado. O bloco desenha a mesma curva da melodia; sobre o pedal, o acorde de Lá menor vira Am7/G — o motor o cifra como ii⁴₂, uma cor suave típica do gospel. Mesmo com movimento paralelo, não há 5ªs nem 8ªs paralelas entre as vozes do bloco (só 3ªs, 4ªs e 6ªs), por isso o motor não registra nada.",
            alternatives: ["Em drop 2 (o contralto desce uma 8ª), o bloco fica mais aberto, mas nesta tonalidade o contralto iria a G3 – E3, abaixo da sua região confortável: o drop 2 funciona melhor num coro masculino, com tenor e barítono."],
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-escrita-bloco",
    title: "Verificação: escrita em bloco",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["eb-fechado"],
    staticItems: [
      {
        id: "eb-fechado",
        kind: "choice",
        skill: "arranjo",
        prompt: "Na técnica de bloco fechado, onde ficam as vozes de acompanhamento?",
        options: [
          { id: "a", label: "Nas notas do acorde imediatamente abaixo da melodia, dentro de uma oitava" },
          { id: "b", label: "Uma oitava abaixo da melodia, em uníssono" },
          { id: "c", label: "Acima da melodia" },
        ],
        correctOptionId: "a",
        explanation: "O bloco fechado é compacto: cabe numa oitava sob a melodia.",
      },
      {
        id: "eb-drop2",
        kind: "choice",
        skill: "arranjo",
        prompt: "O que é o 'drop 2'?",
        options: [
          { id: "a", label: "Descer uma oitava a segunda voz de cima do bloco fechado" },
          { id: "b", label: "Retirar duas vozes" },
          { id: "c", label: "Transpor o bloco dois tons abaixo" },
        ],
        correctOptionId: "a",
        explanation: "Abre o bloco e distribui melhor as vozes no registro.",
      },
      {
        id: "eb-aproximacao",
        kind: "choice",
        skill: "harmonia-funcional",
        prompt: "A melodia tem uma nota de passagem fora do acorde. O que a técnica de aproximação faz?",
        options: [
          { id: "a", label: "Harmoniza essa nota com um acorde de passagem (diminuto ou dominante)" },
          { id: "b", label: "Coloca todas as outras vozes em pausa" },
          { id: "c", label: "Repete o acorde anterior em todas as vozes" },
        ],
        correctOptionId: "a",
        explanation: "Cada nota da melodia recebe um acorde, e o bloco anda cromaticamente.",
      },
      {
        id: "eb-estilo",
        kind: "choice",
        skill: "arranjo",
        prompt: "Um bloco de tríades paralelas é avaliado como erro pelo motor. O que verificar primeiro?",
        options: [
          { id: "a", label: "Se o estilo do arranjo está configurado como coral tradicional" },
          { id: "b", label: "Se a letra está correta" },
          { id: "c", label: "O andamento" },
        ],
        correctOptionId: "a",
        explanation: "Paralelas são convenção: erro no tradicional, recurso no popular.",
      },
      {
        id: "eb-superior",
        kind: "choice",
        skill: "acordes",
        prompt: "Ré maior cantado pelas vozes de cima sobre Dó no baixo resulta em:",
        options: [
          { id: "a", label: "Dó com nona, décima primeira aumentada e décima terceira (tríade de estrutura superior)" },
          { id: "b", label: "Ré maior em segunda inversão" },
          { id: "c", label: "Um erro de afinação" },
        ],
        correctOptionId: "a",
        explanation: "Ré, Fá♯ e Lá são a 9ª, a 11ª aumentada e a 13ª de Dó.",
      },
    ],
    generators: [{ type: "ear-comparison", count: 1, topics: ["cores"] }, { type: "seventh-identification", count: 1, earOnly: true }, { type: "chord-identification", count: 2 }, { type: "seventh-identification", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a definição de bloco fechado.",
  application: {
    title: "Prática no laboratório de escrita",
    steps: [
      "Abra o exemplo 'Gospel: três vozes em bloco sobre o baixo' e mude o estilo para 'Popular a cappella'.",
      "Harmonize em bloco fechado mais dois compassos de melodia, com o baixo nas fundamentais.",
      "Transforme um acorde em drop 2 e compare o som.",
    ],
  },
};

export const lessonContracantoAtivoPassivo: Lesson = {
  id: "contracanto-ativo-passivo",
  title: "Contracanto ativo e passivo, vocal band, ostinatos e arpejos",
  summary: "As técnicas polifônicas do arranjo vocal: a linha de apoio que só sustenta (passiva), a que dialoga com a melodia (ativa) e as vozes que imitam a banda.",
  levelId: "s2",
  unitId: "s2-tex",
  status: "disponivel",
  prerequisites: [],
  estimatedMinutes: 60,
  competencies: ["contraponto", "arranjo"],
  objectives: [
    "Distinguir contracanto passivo (background) de contracanto ativo.",
    "Escrever um contracanto ativo com ritmo complementar e registro próprio.",
    "Usar ostinatos, arpejos e 'vocal band' como acompanhamento vocal.",
  ],
  sections: [
    {
      title: "1. Passivo e ativo",
      blocks: [
        {
          type: "table",
          caption: "Dois tipos de contracanto",
          headers: ["", "Contracanto passivo (background)", "Contracanto ativo"],
          rows: [
            ["Ritmo", "Notas longas, poucas mudanças", "Movimento próprio, complementar à melodia"],
            ["Texto", "Sílabas neutras ('uh', 'mm') ou palavras-chave", "Pode ter letra própria ou ecos do texto"],
            ["Quando se move", "Quando a harmonia muda", "Quando a melodia para"],
            ["Efeito", "Sustenta, dá cor, deixa a melodia em destaque", "Diálogo, riqueza, interesse"],
          ],
        },
        { type: "example", score: EXA.melodiaPad, verdict: "correto", caption: "Contracanto passivo", commentary: "As três vozes de apoio sustentam os acordes em 'uh' e só mudam de nota com a harmonia." },
        {
          type: "example",
          score: EXA.contracantoAtivo,
          verdict: "correto",
          caption: "Contracanto ativo no tenor",
          commentary: "Enquanto a melodia anda em semínimas (compassos 1 a 3), o tenor fica em mínimas e semibreves; no compasso 4, quando a melodia para no Sol, ele resolve a sétima (Dó → Si) e sobe ao Ré. As duas linhas se alternam no primeiro plano.",
        },
        { type: "listening", title: "Ouça o diálogo", score: EXA.contracantoAtivo, instructions: ["Ouça só soprano e tenor.", "Perceba que um se move enquanto o outro sustenta."], focus: [["S", "T"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "2. Técnicas especiais",
      blocks: [
        {
          type: "list",
          items: [
            "Ostinato: uma figura curta repetida (ex.: 'du-du-dá' em Sol – Lá – Si) que sustenta uma seção inteira.",
            "Arpejo: as vozes de apoio cantam as notas do acorde em sequência, imitando um violão dedilhado.",
            "Base rítmica: sílabas curtas nos contratempos, como uma batida de violão ou teclado.",
            "Vocal band: o grupo inteiro imita a banda — baixo, guitarra, metais e bateria —, cada voz com um papel instrumental.",
          ],
        },
        { type: "example", score: EXA.popLeadBacking, verdict: "correto", caption: "Base rítmica e baixo vocal", commentary: "Contralto e tenor fazem a 'batida' em 'dum' nos contratempos; o baixo, as fundamentais nos tempos fortes." },
        { type: "example", score: EX.duasVozesParalelas, verdict: "incorreto", caption: "Contracanto que não é contracanto", commentary: "Uma segunda linha em quintas paralelas com a primeira não dialoga: soa como a mesma linha engrossada." },
      ],
    },
    {
      title: "3. Demonstração: escrever um contracanto ativo",
      blocks: [
        { type: "list", ordered: true, items: [
          "Marque na melodia onde ela anda (notas curtas) e onde para (notas longas, pausas). O contracanto ativo vai se mover nos lugares em que a melodia para.",
          "Escolha o registro do contracanto: abaixo da melodia (tenor ou contralto) ou acima dela (descant). Ele não deve cruzar a melodia.",
          "Onde a melodia anda, o contracanto sustenta uma nota do acorde (movimento oblíquo).",
          "Onde a melodia para, o contracanto caminha por notas do acorde e notas de passagem, de preferência em movimento contrário à frase seguinte da melodia.",
          "Confira os intervalos com a melodia e com o baixo: nenhuma 5ª ou 8ª paralela, e nada de dobrar a sensível.",
        ] },
        { type: "callout", tone: "dica", title: "Decisões do arranjador", text: "Um contracanto com letra própria (eco de palavras-chave) chama mais atenção do que um em 'uh'. Use letra quando quiser um diálogo; use sílaba neutra quando o contracanto for só movimento. Em ambos os casos, ele vem depois da melodia na ordem de importância: dinâmica um nível abaixo." },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Contracanto se movendo junto com a melodia", "disputa pela atenção", "mova-se quando a melodia para"], ["Contracanto em 8ªs ou 5ªs com a melodia", "não é contracanto, é dobra", "3ªs, 6ªs e movimento contrário"], ["Ostinato que ignora a mudança de acorde", "choques sem intenção", "ajuste a figura a cada acorde"], ["Vocal band sem baixo definido", "harmonia sem chão", "o baixo vocal é a primeira voz a escrever"]] },
        { type: "list", items: ["Passivo: sustenta e dá cor; ativo: dialoga.", "O ativo se move quando a melodia para.", "Ostinatos, arpejos e base rítmica são acompanhamentos vocais; o baixo vem primeiro."] },
        {
          type: "challenge",
          title: "Um tenor que dialoga",
          task: "Melodia (2ª frase do 'Hino à Alegria'), contralto e baixo estão dados. Escreva um contracanto ativo no tenor: quase parado enquanto a melodia anda em semínimas, em movimento quando ela sustenta.",
          start: EXD.ccStart,
          constraints: ["Não altere soprano, contralto nem baixo.", "Tenor entre D3 e E4.", "Acordes: G – C/E | D7 – G | Em – Am | D – G; use notas dos acordes, notas de passagem por grau e, se quiser, uma nota preparada que se torne dissonante."],
          criteria: ["Nos compassos 1 a 3 (melodia em semínimas), o tenor anda no máximo em mínimas.", "No compasso 4, quando a melodia sustenta o Sol final, o tenor se move.", "O motor não aponta erros nem alertas."],
          hints: ["Compasso 2: uma nota comum ao D7 e ao G pode ficar a semibreve inteira.", "No compasso 3, termine no Dó do acorde de Lá menor e segure essa nota sobre o acorde de Ré: ela vira a sétima do D7 e pede para descer.", "No compasso 4, a sétima desce para Si quando chega o Sol maior; depois o tenor ainda pode subir ao Ré."],
          solution: {
            score: EXD.ccSol,
            commentary: "Tenor: D4 – C4 | A3 (semibreve) | B3 – C4 ligado | C4 – B3 – D4. Nos três primeiros compassos o tenor anda em mínimas (e fica parado no compasso 2) enquanto a melodia anda em semínimas. O C4 do fim do compasso 3 é preparado no acorde de Lá menor e ligado ao compasso 4, onde vira a sétima do D7 enquanto a melodia faz Lá – Sol. Quando a melodia para no Sol final, o tenor se move: C4 resolve em B3 e sobe ao D4. Os dois planos se alternam, como pede o contracanto ativo.",
            alternatives: ["Um contracanto acima da melodia (descant) nas sopranos II, entrando só no compasso 4, é outra forma de diálogo — reservada, em geral, para a última estrofe."],
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-contracanto",
    title: "Verificação: contracanto",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["cc-ativo"],
    staticItems: [
      {
        id: "cc-ativo",
        kind: "choice",
        skill: "contraponto",
        prompt: "O que caracteriza um contracanto ATIVO?",
        options: [
          { id: "a", label: "Movimento próprio, que acontece principalmente quando a melodia para" },
          { id: "b", label: "Notas longas que só mudam com a harmonia" },
          { id: "c", label: "A melodia dobrada em oitavas" },
        ],
        correctOptionId: "a",
        explanation: "O contracanto ativo dialoga com a melodia, preenchendo os espaços dela.",
      },
      {
        id: "cc-passivo",
        kind: "choice",
        skill: "arranjo",
        prompt: "Um pad em 'uh' sob o solista é um exemplo de:",
        options: [
          { id: "a", label: "Contracanto passivo (background)" },
          { id: "b", label: "Contracanto ativo" },
          { id: "c", label: "Uníssono" },
        ],
        correctOptionId: "a",
        explanation: "Sustenta e colore, sem disputar a atenção.",
      },
      {
        id: "cc-ostinato",
        kind: "choice",
        skill: "arranjo",
        prompt: "O que é um ostinato?",
        options: [
          { id: "a", label: "Uma figura curta repetida que sustenta uma seção" },
          { id: "b", label: "Uma nota longa no final" },
          { id: "c", label: "Uma mudança de tonalidade" },
        ],
        correctOptionId: "a",
        explanation: "Repetição cria um chão rítmico e harmônico para a melodia.",
      },
      {
        id: "cc-vocalband",
        kind: "choice",
        skill: "arranjo",
        prompt: "Num arranjo 'vocal band', o que as vozes fazem?",
        options: [
          { id: "a", label: "Cada voz imita um instrumento da banda (baixo, guitarra, metais, bateria)" },
          { id: "b", label: "Todas cantam a melodia" },
          { id: "c", label: "Só o solista canta" },
        ],
        correctOptionId: "a",
        explanation: "É a técnica mais comum do pop a cappella.",
      },
      {
        id: "cc-registro",
        kind: "choice",
        skill: "contraponto",
        prompt: "Para que o contracanto não encubra a melodia, ele deve ficar:",
        options: [
          { id: "a", label: "Em registro diferente e com ritmo complementar" },
          { id: "b", label: "No mesmo registro e no mesmo ritmo" },
          { id: "c", label: "Sempre mais forte" },
        ],
        correctOptionId: "a",
        explanation: "Separação de registro e ritmo mantém as duas linhas audíveis.",
      },
    ],
    generators: [{ type: "ear-comparison", count: 2, topics: ["contracanto", "textura-pad"] }, { type: "motion-type", count: 3 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a definição de contracanto ativo.",
  application: {
    title: "Prática no laboratório de escrita",
    steps: [
      "Abra o exemplo 'Contracanto ativo no tenor'.",
      "Escreva um contracanto ativo também no contralto do compasso 2, sem cruzar a melodia.",
      "Revise com o motor e ouça soprano + contralto + tenor.",
    ],
  },
};

export const lessonHarmoniaCromatica: Lesson = {
  id: "harmonia-cromatica-moderna",
  title: "Harmonia cromática e moderna para vozes",
  summary: "Empréstimo modal, napolitana, sexta aumentada, mediantes cromáticas, paralelismo, quartas e clusters: a cor harmônica além das funções básicas.",
  levelId: "s3",
  unitId: "s3-har",
  status: "disponivel",
  prerequisites: [],
  estimatedMinutes: 70,
  competencies: ["harmonia-funcional", "acordes", "arranjo"],
  objectives: [
    "Usar acordes de empréstimo modal (iv, ♭VI, ♭VII) em tonalidade maior.",
    "Reconhecer a sexta napolitana e os acordes de sexta aumentada e sua resolução.",
    "Aplicar paralelismo, acordes por quartas e segundas acrescentadas com intenção.",
    "Escrever o cromatismo de modo que o coro consiga afinar.",
  ],
  sections: [
    {
      title: "1. Empréstimo modal",
      blocks: [
        {
          type: "paragraph",
          text: "Uma canção em maior pode 'pegar emprestados' acordes do modo menor homônimo. Os mais comuns são o iv (Fá menor em Dó maior), o ♭VI (Lá♭ maior) e o ♭VII (Si♭ maior). O iv antes do I é a cadência plagal 'melancólica', frequente em hinos, baladas e MPB. Para vozes, o segredo é que a nota emprestada (Lá♭) apareça por semitom a partir da nota vizinha do acorde anterior.",
        },
        { type: "example", score: EXA.emprestimo, verdict: "correto", caption: "I – iv – I", commentary: "O contralto vai de Sol a Lá♭ e volta: um semitom fácil de cantar que muda toda a cor do acorde." },
        { type: "listening", title: "Ouça a cor emprestada", score: EXA.emprestimo, instructions: ["Ouça só o contralto: Sol – Lá♭ – Sol.", "Ouça tudo: o iv soa 'melancólico'."], focus: [["A"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "2. Acordes alterados",
      blocks: [
        {
          type: "table",
          caption: "Acordes cromáticos clássicos (em Dó)",
          headers: ["Acorde", "Notas", "Função e resolução"],
          rows: [
            ["Napolitana (♭II⁶)", "Fá – Lá♭ – Ré♭", "Subdominante; vai para o V (ou I⁶₄ – V), com o Ré♭ descendo"],
            ["Sexta aumentada italiana", "Lá♭ – Dó – Fá♯", "Lá♭ e Fá♯ abrem por semitom para Sol (oitava)"],
            ["Sexta aumentada alemã", "Lá♭ – Dó – Mi♭ – Fá♯", "Idem; cuidado com quintas paralelas ao ir para o V"],
            ["Mediante cromática", "Mi maior ou Lá♭ maior em Dó", "Mudança de cor por terça, com uma nota comum"],
          ],
        },
        {
          type: "callout",
          tone: "dica",
          title: "Cromatismo afinável",
          text: "O coro afina cromatismo quando cada voz se move por semitom ou mantém uma nota comum. Evite saltos para notas alteradas e intervalos aumentados na mesma voz.",
        },
        { type: "example", score: EX.segundaAumentada, verdict: "incorreto", caption: "Intervalo aumentado na mesma voz", commentary: "Fá – Sol♯ é uma segunda aumentada: difícil de afinar e evitada na escrita vocal tradicional." },
      ],
    },
    {
      title: "3. Harmonia do século XX",
      blocks: [
        {
          type: "list",
          items: [
            "Paralelismo (planing): o mesmo acorde deslizando em paralelo; 'real' mantém as qualidades exatas, 'tonal' segue as notas da escala.",
            "Modos: harmonia derivada do dórico, mixolídio ou lídio, sem a cadência V – I tradicional.",
            "Acordes por quartas e quintas: sonoridade aberta, sem centro forte.",
            "Segundas acrescentadas e clusters: brilho e atrito; afinação exige vozes seguras.",
          ],
        },
        { type: "example", score: EXA.quartas, verdict: "correto", caption: "Acorde por quartas (estilo popular)", commentary: "Mi – Lá – Ré sobre Dó: a estrutura quartal soa moderna e aberta." },
        { type: "example", score: EXA.gospelBlocoParalelo, verdict: "observacao", caption: "Paralelismo tonal", commentary: "Tríades deslizando pela escala: no estilo popular, só sugestões. No tradicional, seriam erros." },
      ],
    },
    {
      title: "4. Demonstração: inserir um empréstimo modal",
      blocks: [
        { type: "list", ordered: true, items: [
          "Escolha o ponto: o empréstimo funciona melhor numa cadência plagal (IV – iv – I) ou como cor num acorde que se repete.",
          "Identifique a nota alterada: o iv de Dó (Fá menor) difere do IV (Fá maior) só no Lá → Lá♭.",
          "Coloque essa nota numa voz que já tenha Lá no IV: a mudança será de um semitom, na mesma voz.",
          "Faça a nota alterada continuar por grau: Lá♭ desce para Sol (quinta do I).",
          "Confira: nenhuma outra voz canta Lá natural ao mesmo tempo ou logo em seguida (falsa relação).",
        ] },
        { type: "callout", tone: "dica", title: "Decisões do arranjador", text: "O iv no fim de uma canção alegre dá um toque melancólico de 'despedida'; o ♭VI e o ♭VII antes do I dão grandeza (muito usados no pop e em trilhas). Use um empréstimo por seção: mais que isso, a tonalidade maior começa a soar menor." },
      ],
    },
    {
      title: "5. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Nota alterada alcançada por salto", "difícil de afinar", "semitom na mesma voz"], ["Falsa relação (A♮ numa voz, A♭ em outra)", "choque", "o cromatismo fica numa voz só"], ["2ª aumentada na mesma voz", "intervalo difícil", "grafia e caminho por semitons"], ["Planing no estilo tradicional", "paralelas", "planing só no estilo popular ou moderno"]] },
        { type: "list", items: ["Empréstimo: iv, ♭VI, ♭VII do modo menor.", "Napolitana e sextas aumentadas resolvem por semitom.", "Cromatismo afinável = semitom ou nota comum em cada voz."] },
        {
          type: "challenge",
          title: "Um 'Amém' com empréstimo",
          task: "Soprano (C5 sustentado) e baixo estão dados para I – IV | iv – I em Dó maior. Escreva contralto e tenor de modo que o Lá♭ do iv chegue por semitom.",
          start: EXD.cromStart,
          constraints: ["Não altere soprano nem baixo.", "O iv tem Lá♭.", "Estilo coral tradicional."],
          criteria: ["A mesma voz canta Lá (no IV), Lá♭ (no iv) e Sol (no I).", "Nenhuma falsa relação.", "O motor não aponta erros nem alertas."],
          hints: ["Quem canta o Lá no IV? Escolha uma voz interna.", "O tenor pode fazer G3 – A3 – A♭3 – G3.", "O contralto fica com E e F (terça do I, fundamental do IV/iv)."],
          solution: {
            score: EXD.cromSol,
            commentary: "Tenor G3 – A3 | A♭3 – G3: a linha cromática A → A♭ → G fica numa voz só, em semitons — fácil de afinar e sem falsa relação. Contralto E4 – F4 | F4 – E4. O soprano parado em C5 e o baixo F3 parado nos dois acordes do meio fazem do Lá♭ o único acontecimento: toda a cor nova vem de uma nota.",
            alternatives: ["A linha cromática também pode ficar no contralto (G4 – A4 | A♭4 – G4, sob o C5 do soprano), deixando a cor mais audível; o tenor passa então para E4 – F4 | F4 – E4, no alto da tessitura — confira com o motor antes de adotar."],
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-harmonia-cromatica",
    title: "Verificação: harmonia cromática e moderna",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["hc-emprestimo"],
    staticItems: [
      {
        id: "hc-emprestimo",
        kind: "choice",
        skill: "harmonia-funcional",
        prompt: "Em Dó maior, qual acorde é de empréstimo modal?",
        options: [
          { id: "a", label: "Fá menor (iv)" },
          { id: "b", label: "Fá maior (IV)" },
          { id: "c", label: "Sol maior (V)" },
        ],
        correctOptionId: "a",
        explanation: "Fá menor vem de Dó menor, o modo homônimo.",
      },
      {
        id: "hc-napolitana",
        kind: "choice",
        skill: "harmonia-funcional",
        prompt: "Para onde a sexta napolitana costuma ir?",
        options: [
          { id: "a", label: "Para o V (às vezes passando pelo I⁶₄ cadencial)" },
          { id: "b", label: "Para o IV" },
          { id: "c", label: "Para o vi" },
        ],
        correctOptionId: "a",
        explanation: "É um acorde de função subdominante, preparando a dominante.",
      },
      {
        id: "hc-sexta",
        kind: "choice",
        skill: "conducao-de-vozes",
        prompt: "No acorde de sexta aumentada (Lá♭ – Fá♯ em Dó), como as notas do intervalo resolvem?",
        options: [
          { id: "a", label: "Abrem por semitom até a oitava de Sol" },
          { id: "b", label: "Fecham em uníssono em Fá" },
          { id: "c", label: "Ficam paradas" },
        ],
        correctOptionId: "a",
        explanation: "Lá♭ desce para Sol e Fá♯ sobe para Sol.",
      },
      {
        id: "hc-afinavel",
        kind: "choice",
        skill: "arranjo",
        prompt: "Como tornar uma passagem cromática afinável para o coro?",
        options: [
          { id: "a", label: "Movimentos por semitom e notas comuns entre os acordes" },
          { id: "b", label: "Saltos para as notas alteradas" },
          { id: "c", label: "Intervalos aumentados na mesma voz" },
        ],
        correctOptionId: "a",
        explanation: "O cantor ouve e acha a nota a partir da anterior.",
      },
      {
        id: "hc-planing",
        kind: "choice",
        skill: "acordes",
        prompt: "O que é paralelismo 'real'?",
        options: [
          { id: "a", label: "O acorde desliza mantendo exatamente a mesma qualidade (todos maiores, por exemplo)" },
          { id: "b", label: "Os acordes seguem as notas da escala" },
          { id: "c", label: "Só o baixo se move" },
        ],
        correctOptionId: "a",
        explanation: "No paralelismo tonal, as qualidades mudam conforme a escala.",
      },
    ],
    generators: [{ type: "ear-comparison", count: 2, topics: ["emprestimo", "modal"] }, { type: "seventh-identification", count: 2 }, { type: "chord-identification", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o empréstimo modal.",
  application: {
    title: "Prática no laboratório de escrita",
    steps: [
      "Abra o coral SATB de exemplo.",
      "Troque o IV do compasso 3 por iv (Fá menor), fazendo a nota alterada chegar por semitom.",
      "Revise no estilo tradicional e ouça a diferença de cor.",
    ],
  },
};

export const lessonAnaliseRepertorio: Lesson = {
  id: "analise-de-repertorio",
  title: "Análise de repertório: aprender com arranjos existentes",
  summary: "Um método de análise para estudar corais, hinos e arranjos de grupos vocais: o que observar, como anotar e como transformar a análise em técnica própria.",
  levelId: "s4",
  unitId: "s4-prf",
  status: "disponivel",
  prerequisites: [],
  estimatedMinutes: 60,
  competencies: ["arranjo", "harmonia-funcional", "percepcao"],
  objectives: [
    "Analisar um arranjo existente com uma ficha de análise padronizada.",
    "Identificar forma, textura, distribuição da melodia, harmonia e recursos de estilo.",
    "Transformar o que foi analisado em escolhas para os próprios arranjos.",
  ],
  sections: [
    {
      title: "1. Por que analisar",
      blocks: [
        {
          type: "paragraph",
          text: "Em todos os cursos de arranjo e regência, a análise de obras existentes ocupa boa parte das aulas: é assim que o estudante aprende soluções que nenhum manual descreve. Analisar não é só dar nome aos acordes — é entender por que o arranjador escolheu cada textura, onde colocou o clímax e como fez a melodia passar de um naipe a outro.",
        },
      ],
    },
    {
      title: "2. A ficha de análise",
      blocks: [
        {
          type: "table",
          caption: "O que anotar",
          headers: ["Item", "Perguntas"],
          rows: [
            ["Formação e tonalidade", "Para quem foi escrito? Em que tonalidade? A tonalidade favorece as tessituras?"],
            ["Forma", "Quais seções? O que se repete e o que muda a cada repetição?"],
            ["Textura por seção", "Uníssono, homofonia, pad, bloco, contracanto?"],
            ["Melodia", "Em que voz está em cada seção? Há dobramentos?"],
            ["Harmonia", "Cadências, acordes de empréstimo, tensões, modulações?"],
            ["Condução", "As vozes internas são cantáveis? Há paralelas intencionais?"],
            ["Texto", "A prosódia é respeitada? Onde estão as respirações?"],
            ["Energia", "Onde está o clímax? Como o arranjo chega a ele?"],
          ],
        },
        { type: "example", score: CHORALE_SATB_C, verdict: "correto", caption: "Exercício de análise", commentary: "Aplique a ficha: formação SATB em Dó maior, homofonia, melodia no soprano, I – ii – V – I e cadência autêntica final; o contralto e o tenor andam quase só por grau." },
        { type: "example", score: EX.retrogressao, verdict: "observacao", caption: "Uma escolha a investigar", commentary: "V → IV é uma retrogressão no estilo tradicional. Ao encontrar algo assim num arranjo publicado, pergunte: é um erro, uma escolha de estilo ou um efeito de texto?" },
        { type: "listening", title: "Analise ouvindo", score: CHORALE_SATB_C, instructions: ["Ouça cada voz sozinha e anote o contorno.", "Ouça tudo e marque as cadências."], focus: [["S"], ["A"], ["T"], ["B"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "3. Repertório para estudar",
      blocks: [
        {
          type: "list",
          items: [
            "Corais de J. S. Bach (domínio público): condução de vozes e cadências em sua forma mais clara.",
            "Hinários tradicionais (domínio público): homofonia funcional e prosódia.",
            "Heitor Villa-Lobos, Guia Prático: canções folclóricas brasileiras arranjadas para coro.",
            "Gravações de grupos vocais de MPB, pop a cappella e gospel: ouça e transcreva trechos para estudar texturas e sílabas.",
          ],
        },
        {
          type: "callout",
          tone: "atencao",
          title: "Direitos autorais",
          text: "Estudar e analisar gravações e partituras é livre; publicar ou apresentar um arranjo de canção protegida exige autorização. Para trabalhos e apresentações, prefira repertório em domínio público ou obras próprias.",
        },
      ],
    },
    {
      title: "4. Demonstração: a ficha aplicada a um coral",
      blocks: [
        { type: "table", caption: "Ficha preenchida — coral de exemplo do curso (SATB, Dó maior)", headers: ["Campo", "O que se observa", "O que levar para o seu arranjo"], rows: [["Formação e tonalidade", "SATB, Dó maior; tenor entre B3 e E4", "tonalidade que deixa o tenor no meio da tessitura"], ["Forma", "três frases de um compasso e cadência final", "cadência a cada fim de frase"], ["Textura", "homofonia do começo ao fim", "homofonia é a base; variações vêm depois"], ["Melodia", "soprano, com ponto culminante C5 no c. 3", "o culminante coincide com o I⁶₄ cadencial"], ["Harmonia", "I – ii – V – I; vi; I⁶ – IV – I⁶₄ – V – I", "ii antes do V; inversões no baixo para fazer linha"], ["Condução", "contralto e tenor quase só por grau", "notas comuns e graus nas vozes internas"]] },
        { type: "paragraph", text: "A última coluna é o que torna a análise útil: cada observação vira uma decisão que você pode copiar (ou evitar) no próximo arranjo." },
      ],
    },
    {
      title: "5. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Análise só de acordes", "não se aprende arranjo", "forma, textura, distribuição da melodia, clímax"], ["Julgar um arranjo publicado pela régua de outro estilo", "conclusões erradas", "identifique o estilo antes"], ["Copiar soluções sem entender o contexto", "efeito fora do lugar", "anote por que a solução funciona ali"], ["Publicar arranjo de obra protegida", "problema de direitos", "estude livremente; publique só com autorização"]] },
        { type: "list", items: ["Analise forma, textura, melodia, harmonia, condução e estilo.", "Cada observação vira uma decisão para os seus arranjos.", "Estude repertório em domínio público e gravações; publique com autorização."] },
        {
          type: "challenge",
          title: "Ficha de um arranjo do curso",
          task: "Preencha a ficha de análise (formação e tonalidade, forma, textura por seção, melodia, harmonia, condução e estilo) para o exemplo 'Melodia com pad' da aula de texturas, e escreva três decisões que você levaria para o seu trabalho de conclusão.",
          constraints: ["Use a partitura no Estúdio (Abrir exemplo) e ouça cada voz.", "Três decisões concretas, cada uma ligada a uma observação."],
          criteria: ["Todos os campos da ficha preenchidos com observações verificáveis na partitura.", "As decisões citam a observação que as originou.", "Você identificou o estilo e julgou pela régua desse estilo."],
          hints: ["Quem canta a letra? E as outras vozes, o que cantam e quando mudam de nota?", "A harmonia do pad é a mesma da versão em homofonia?", "Compare com 'Homofonia': o que muda no efeito, e por quê?"],
          solution: {
            commentary: "Ficha-modelo: SATB, Dó maior; uma frase de quatro compassos; textura de melodia + pad (só o soprano canta a letra); melodia no soprano, culminante C5 no c. 2; harmonia igual à da homofonia, com as vozes de apoio mudando de nota só quando o acorde muda; condução por notas comuns (as vozes de apoio quase não se movem); estilo coral tradicional/contemporâneo, sem dissonâncias livres. Três decisões: (1) usar o pad no primeiro verso, porque deixa a melodia e o texto em primeiro plano; (2) escrever o pad em 'uh' com notas comuns, porque cansa menos e afina melhor; (3) guardar a homofonia para o refrão, porque o contraste pad → homofonia marca a mudança de seção.",
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-analise-repertorio",
    title: "Verificação: análise de repertório",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["ar-objetivo"],
    staticItems: [
      {
        id: "ar-objetivo",
        kind: "choice",
        skill: "arranjo",
        prompt: "Qual é o principal objetivo de analisar arranjos existentes?",
        options: [
          { id: "a", label: "Entender as escolhas do arranjador para aplicá-las nos próprios arranjos" },
          { id: "b", label: "Copiar o arranjo para apresentar" },
          { id: "c", label: "Encontrar erros para corrigir" },
        ],
        correctOptionId: "a",
        explanation: "A análise é uma fonte de técnica: soluções reais para problemas reais.",
      },
      {
        id: "ar-forma",
        kind: "choice",
        skill: "arranjo",
        prompt: "Ao analisar a forma, o que é mais revelador?",
        options: [
          { id: "a", label: "O que muda a cada repetição de uma mesma seção" },
          { id: "b", label: "O número total de compassos" },
          { id: "c", label: "A fonte da partitura" },
        ],
        correctOptionId: "a",
        explanation: "As mudanças entre repetições mostram as técnicas de variação.",
      },
      {
        id: "ar-escuta",
        kind: "choice",
        skill: "percepcao",
        prompt: "Qual é a forma mais eficaz de analisar as vozes internas?",
        options: [
          { id: "a", label: "Ouvir e cantar cada voz sozinha, anotando o contorno" },
          { id: "b", label: "Ler só o soprano" },
          { id: "c", label: "Contar as notas" },
        ],
        correctOptionId: "a",
        explanation: "A cantabilidade das vozes internas só aparece quando elas são ouvidas isoladas.",
      },
      {
        id: "ar-direitos",
        kind: "choice",
        skill: "arranjo",
        prompt: "Você quer apresentar publicamente o seu arranjo de uma canção protegida. O que é necessário?",
        options: [
          { id: "a", label: "Autorização do titular dos direitos" },
          { id: "b", label: "Nada, porque o arranjo é seu" },
          { id: "c", label: "Apenas citar o compositor" },
        ],
        correctOptionId: "a",
        explanation: "Arranjo é obra derivada; a apresentação pública de obra protegida depende de autorização.",
      },
      {
        id: "ar-retrogressao",
        kind: "choice",
        skill: "harmonia-funcional",
        prompt: "Um arranjo publicado tem V → IV. Qual a melhor atitude na análise?",
        options: [
          { id: "a", label: "Perguntar se é erro, escolha de estilo ou efeito de texto" },
          { id: "b", label: "Concluir que o arranjador errou" },
          { id: "c", label: "Ignorar" },
        ],
        correctOptionId: "a",
        explanation: "Convenções mudam com o estilo; a análise busca a intenção.",
      },
    ],
    generators: [{ type: "cadence-identification", count: 2 }, { type: "function-identification", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o objetivo da análise.",
  application: {
    title: "Trabalho da disciplina",
    steps: [
      "Escolha um coral de Bach ou um hino em domínio público e preencha a ficha de análise.",
      "Escolha uma gravação de grupo vocal e descreva a textura de cada seção.",
      "Liste três técnicas encontradas que você vai usar no trabalho de conclusão.",
    ],
  },
};
