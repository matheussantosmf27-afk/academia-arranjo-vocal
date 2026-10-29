import { CHORALE_SATB_C } from "@/domain/music/examples";
import { scoreFromText } from "@/domain/music/text-notation";
import { EXD } from "../examples-didatica";
import type { Lesson } from "../types";

const INVERSOES = scoreFromText({
  id: "licao3-inversoes",
  title: "Tríade de Dó maior: fundamental, 1ª e 2ª inversões",
  formation: "SATB",
  key: "C",
  time: "3/4",
  notes: "Mesmas classes de altura, baixos diferentes: C (estado fundamental), E (⁶), G (⁶₄).",
  voices: {
    S: "C5:h.",
    A: "G4:h.",
    T: "E4:h.",
    B: "C3:h.",
  },
});

const INVERSOES_SEQ = scoreFromText({
  id: "licao3-inversoes-seq",
  title: "I – I⁶ – IV – I⁶₄ – V – I",
  formation: "SATB",
  key: "C",
  time: "3/4",
  voices: {
    S: "G4:q G4:q A4:q | G4:q G4:q G4:q",
    A: "E4:q C4:q F4:q | E4:q D4:q E4:q",
    T: "C4:q C4:q C4:q | C4:q B3:q C4:q",
    B: "C3:q E3:q F3:q | G3:q G3:q C3:q",
  },
});

const SENSIVEL_DOBRADA = scoreFromText({
  id: "licao3-sensivel-dobrada",
  title: "V com a sensível dobrada (incorreto)",
  formation: "SATB",
  key: "C",
  time: "4/4",
  voices: {
    S: "B4:h C5:h",
    A: "G4:h G4:h",
    T: "B3:h C4:h",
    B: "G2:h C3:h",
  },
});

const DUPLICACAO_CORRIGIDA = scoreFromText({
  id: "licao3-duplicacao-corrigida",
  title: "V com a fundamental dobrada (corrigido)",
  formation: "SATB",
  key: "C",
  time: "4/4",
  voices: {
    S: "B4:h C5:h",
    A: "G4:h G4:h",
    T: "D4:h E4:h",
    B: "G2:h C3:h",
  },
});

export const lessonTriades: Lesson = {
  id: "triades-inversoes",
  title: "Tríades e inversões a quatro vozes",
  summary:
    "Como uma tríade se transforma em acorde de quatro vozes: qualidade, inversão, duplicação, posição aberta e fechada — e o que muda entre SATB e TTBB.",
  levelId: "n1",
  unitId: "n1-u2",
  status: "disponivel",
  prerequisites: ["intervalos"],
  estimatedMinutes: 70,
  competencies: ["acordes", "escrita-satb", "escrita-ttbb", "harmonia-funcional"],
  objectives: [
    "Identificar a qualidade (maior, menor, diminuta, aumentada) e a inversão de tríades distribuídas em quatro vozes, com pelo menos 80% de acerto.",
    "Escolher a nota a dobrar em tríades maiores e menores em estado fundamental e justificar a escolha.",
    "Reconhecer e evitar a duplicação da sensível em acordes de função dominante.",
    "Associar as cifras ⁶ e ⁶₄ às inversões correspondentes.",
  ],
  sections: [
    {
      title: "1. Construção por terças e qualidade",
      blocks: [
        {
          type: "paragraph",
          text: "Uma tríade é formada por três notas empilhadas em terças: fundamental, terça e quinta. A qualidade depende das terças empilhadas: maior (3M + 3m), menor (3m + 3M), diminuta (3m + 3m) e aumentada (3M + 3M). Nas tonalidades maiores, I, IV e V são maiores; ii, iii e vi, menores; vii°, diminuta.",
        },
        {
          type: "callout",
          tone: "dica",
          title: "Como o motor reconhece acordes",
          text: "A plataforma identifica acordes pela grafia, testando cada nota como possível fundamental e verificando se as demais são terça, quinta ou sétima. Se a sonoridade não é terciana (por exemplo, por uma nota estranha no tempo forte), o motor não 'adivinha' um acorde: ele informa que não reconheceu e explica por quê.",
        },
      ],
    },
    {
      title: "2. Inversões: quem está no baixo",
      blocks: [
        {
          type: "paragraph",
          text: "A inversão é definida exclusivamente pela nota mais grave — não importa a ordem das vozes superiores. Fundamental no baixo: estado fundamental. Terça no baixo: 1ª inversão (cifra ⁶). Quinta no baixo: 2ª inversão (cifra ⁶₄).",
        },
        {
          type: "example",
          score: INVERSOES,
          verdict: "correto",
          caption: "Tríade de Dó maior em estado fundamental, distribuída em SATB",
          commentary:
            "C3–E4–G4–C5: a fundamental está dobrada (baixo e soprano) e as vozes superiores estão em posição aberta — há espaço para uma nota do acorde entre tenor e contralto e entre contralto e soprano.",
        },
        {
          type: "example",
          score: INVERSOES_SEQ,
          verdict: "correto",
          caption: "As três posições num contexto real",
          commentary:
            "I⁶ dá movimento à linha do baixo sem mudar de harmonia; I⁶₄ aparece aqui como 'seis-quatro cadencial', resolvendo no V sobre o mesmo baixo. A 2ª inversão é instável: na prática comum, só aparece em contextos específicos (cadencial, de passagem, de bordadura e arpejado).",
        },
      ],
    },
    {
      title: "3. Duplicação: quatro vozes, três notas",
      blocks: [
        {
          type: "paragraph",
          text: "Com quatro vozes e três notas, uma delas precisa ser dobrada (ou a quinta é omitida e a fundamental, triplicada). As diretrizes da prática comum:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Em estado fundamental, dobre preferencialmente a fundamental.",
            "Não dobre a sensível (7º grau) num acorde de dominante: ela tende a subir para a tônica, e duas vozes subindo juntas formam oitavas paralelas.",
            "Na 1ª inversão, dobre a fundamental ou a quinta; dobrar o baixo (a terça) é aceitável quando ele não for a sensível.",
            "Na 2ª inversão, dobre o baixo (a quinta).",
            "A quinta pode ser omitida; a terça, não — sem ela, o acorde não tem modo.",
          ],
        },
        {
          type: "example",
          score: SENSIVEL_DOBRADA,
          verdict: "incorreto",
          caption: "V → I com B (sensível) no soprano e no tenor",
          commentary:
            "O motor aponta a sensível dobrada no V. Se ambas as vozes resolverem em C, teremos oitavas paralelas; se uma não resolver, a tendência da sensível é contrariada. Compare com a versão corrigida.",
        },
        {
          type: "example",
          score: DUPLICACAO_CORRIGIDA,
          verdict: "correto",
          caption: "V → I com a fundamental dobrada",
          commentary: "O tenor canta D (a quinta) e resolve em E. Só o soprano tem a sensível, que sobe para a tônica.",
        },
      ],
    },
    {
      title: "4. Posição aberta, fechada e a diferença entre SATB e TTBB",
      blocks: [
        {
          type: "paragraph",
          text: "Em posição fechada, as três vozes superiores ocupam o menor espaço possível (não cabe nota do acorde entre elas). Em posição aberta, cabe. No SATB, as duas são comuns e a escolha depende da condução. No TTBB, a posição fechada é a regra nas vozes de cima, mas no grave o arranjador precisa abrir o acorde: terças e segundas abaixo de cerca de C3 soam emboladas.",
        },
        {
          type: "callout",
          tone: "ttbb",
          title: "Duplicação em TTBB",
          text: "Como o âmbito é estreito, é frequente omitir a quinta e dobrar a fundamental no grave (baixo + barítono em oitava ou quinta), deixando terça e sétima para os tenores. É a lógica do 'acorde de barbershop': fundamental e quinta embaixo, terça e sétima em cima.",
        },
        {
          type: "callout",
          tone: "satb",
          title: "Distribuição em SATB",
          text: "Mantenha no máximo uma oitava entre soprano–contralto e contralto–tenor. Entre tenor e baixo, até uma 12ª é natural. Acordes muito abertos entre as vozes superiores 'esvaziam' a sonoridade do coro.",
        },
      ],
    },
    {
      title: "5. Análise e escuta",
      blocks: [
        {
          type: "listening",
          title: "Ouça o coral de exemplo e acompanhe a cifragem",
          score: CHORALE_SATB_C,
          instructions: [
            "Ouça apenas o baixo e diga, para cada acorde, se está em estado fundamental ou invertido.",
            "Ouça tudo e perceba a diferença de estabilidade entre I⁶₄ e V no compasso 3.",
          ],
          focus: [["B"], ["S", "A", "T", "B"]],
        },
      ],
    },
    {
      title: "6. Demonstração: distribuir um acorde a partir do soprano e do baixo",
      blocks: [
        { type: "paragraph", text: "Problema: em Sol maior, o soprano tem D5 e o baixo B2, e o acorde pedido é I (G–B–D). Que notas o contralto e o tenor cantam?" },
        { type: "list", ordered: true, items: [
          "Inversão: B no baixo é a terça de G — o acorde está em 1ª inversão (I⁶).",
          "O que já temos: terça (baixo) e quinta (soprano). Falta a fundamental G, obrigatoriamente.",
          "O que dobrar: na 1ª inversão, prefira dobrar a fundamental ou a quinta. A terça já está no baixo e, num acorde maior, dobrá-la deixa a cor da terça pesada.",
          "Onde colocar: contralto até uma 8ª abaixo do soprano (D4–D5) e tenor até uma 8ª abaixo do contralto. G4 no contralto e G3 no tenor dão B2, G3, G4, D5: fundamental dobrada, posição aberta.",
          "Conferir o contexto: a nota escolhida para cada voz deve ser a mais próxima da nota anterior dessa voz. Às vezes isso muda a duplicação (ver o exercício abaixo).",
        ] },
        { type: "table", caption: "Resumo das duplicações recomendadas na escrita coral tradicional", headers: ["Acorde", "Dobre", "Evite dobrar"], rows: [["Estado fundamental", "fundamental", "sensível (em V e vii°)"], ["1ª inversão (⁶)", "fundamental ou quinta", "o baixo quando for a sensível"], ["2ª inversão (⁶₄)", "o baixo (quinta)", "—"], ["vii° (diminuto)", "terça (o baixo, em vii°⁶)", "fundamental (é a sensível)"]] },
      ],
    },
    {
      title: "7. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Por que acontece", "Correção"], rows: [["Identificar a inversão pela nota do soprano", "olhar a voz mais aguda", "a inversão depende só do baixo"], ["Omitir a terça", "querer dobrar fundamental e quinta", "a terça define o modo; omita a quinta, nunca a terça"], ["Dobrar a sensível no V", "completar o acorde 'por cima' sem pensar na resolução", "dobre a fundamental do V"], ["⁶₄ usado como inversão qualquer", "tratar as três inversões como equivalentes", "⁶₄ só cadencial, de passagem, de bordadura ou arpejado"]] },
        { type: "list", items: ["Inversão = nota do baixo.", "Quatro vozes, três notas: dobre a fundamental em estado fundamental; nunca a sensível num acorde de dominante.", "A terça nunca é omitida."] },
        {
          type: "challenge",
          title: "Cinco acordes, cinco duplicações",
          task: "Soprano e baixo estão dados para I – I⁶ | IV – V | I em Sol maior. Escreva contralto e tenor escolhendo, em cada acorde, que nota dobrar.",
          start: EXD.triStart,
          constraints: ["Não altere soprano nem baixo.", "Só notas dos acordes indicados.", "Escreva ao lado de cada acorde a nota dobrada e por quê."],
          criteria: ["Todos os acordes têm terça.", "A sensível (F♯) aparece no máximo uma vez no V e sobe para G.", "O motor não aponta erros nem alertas."],
          hints: ["No I⁶, o baixo é B (terça) e o soprano D (quinta). O que falta?", "No IV → V, o baixo sobe um grau (C3 → D3). As vozes de cima devem descer para evitar paralelas.", "No I final, o soprano termina em G4 e o baixo em G2: alguém precisa cantar B."],
          solution: {
            score: EXD.triSol,
            commentary: "I: G2, B3, G4, D5 (fundamental dobrada). I⁶: B2, G3, G4, D5 (fundamental dobrada — a terça já está no baixo). IV: C3, G3, E4, C5 (fundamental dobrada, o tenor mantém G3 como nota comum). V: D3, F♯3, D4, A4 (fundamental dobrada; sensível só no tenor). I: G2, G3, B3, G4 — o tenor resolve a sensível e o contralto desce à terça. No IV → V, as três vozes superiores descem enquanto o baixo sobe. Duas armadilhas: começar com tenor D4 (G2, D4, G4, D5 não tem terça) e, no fim, manter o contralto em D4 (G2, G3, D4, G4 também fica sem terça).",
            alternatives: ["No I⁶, dobrar a quinta (tenor D4 em vez de G3: B2, D4, G4, D5) também é correto. Confira então o caminho do tenor até o IV e o V: com o baixo subindo C3 → D3, o tenor não pode subir junto mantendo a mesma distância."],
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-triades",
    title: "Verificação: tríades e inversões",
    instructions:
      "Identifique qualidade e inversão dos acordes (leia do baixo para cima) e responda às questões de duplicação. Domínio: 80% de acerto e os dois itens essenciais.",
    minScore: 0.8,
    requiredItemIds: ["tr-sensivel", "tr-inversao-baixo"],
    staticItems: [
      {
        id: "tr-inversao-baixo",
        kind: "choice",
        skill: "acordes",
        prompt: "O que define a inversão de um acorde a quatro vozes?",
        options: [
          { id: "a", label: "A nota mais aguda (soprano)" },
          { id: "b", label: "A nota mais grave (baixo)" },
          { id: "c", label: "A nota dobrada" },
        ],
        correctOptionId: "b",
        explanation: "Somente o baixo define a inversão. As vozes superiores podem estar em qualquer ordem.",
      },
      {
        id: "tr-sensivel",
        kind: "choice",
        skill: "harmonia-funcional",
        prompt: "No acorde V de Dó maior (G–B–D) a quatro vozes, qual nota NÃO deve ser dobrada?",
        options: [
          { id: "a", label: "G (fundamental)" },
          { id: "b", label: "B (sensível)" },
          { id: "c", label: "D (quinta)" },
        ],
        correctOptionId: "b",
        explanation: "B é a sensível de Dó maior. Dobrada, leva a oitavas paralelas na resolução (ou a uma resolução contrariada).",
      },
      {
        id: "tr-terca",
        kind: "choice",
        skill: "acordes",
        prompt: "Qual nota de uma tríade pode ser omitida na escrita a quatro vozes?",
        options: [
          { id: "a", label: "A quinta" },
          { id: "b", label: "A terça" },
          { id: "c", label: "Nenhuma, nunca" },
        ],
        correctOptionId: "a",
        explanation: "A quinta pode ser omitida (dobrando-se a fundamental). A terça define o modo e não deve faltar.",
      },
    ],
    generators: [{ type: "chord-identification", count: 8 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo os itens sobre baixo/inversão e duplicação da sensível.",
  application: {
    title: "Aplicação no Estúdio",
    steps: [
      "Abra o coral SATB no Estúdio e ative a análise harmônica: confira as cifras I, ii, V, I⁶, I⁶₄.",
      "No último acorde do compasso 1 (V → I), mude o tenor de B3 para D4: o motor apontará a sensível sem resolução? Por quê? (Dica: verifique quem canta a sensível agora.)",
      "No compasso 3, troque o I⁶ por I em estado fundamental (baixo C3) e observe quais diagnósticos aparecem na condução do baixo.",
    ],
  },
};
