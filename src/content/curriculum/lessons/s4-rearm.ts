import { EXR } from "../examples-rearm";
import { EXD } from "../examples-didatica";
import type { Lesson } from "../types";

/**
 * HAR402 — Rearmonização para vozes. Uma melodia original ("Luz da manhã")
 * percorre a disciplina com harmonias diferentes; todos os exemplos são
 * originais e conferidos pelo motor.
 */

export const lessonRearmFundamentos: Lesson = {
  id: "rearm-fundamentos",
  title: "Rearmonização: o que pode mudar e o que não pode",
  summary: "Notas estruturais e de passagem, o papel de cada nota da melodia no acorde, a função de cada frase e as cadências que seguram a forma.",
  levelId: "s4",
  unitId: "s4-rea",
  status: "disponivel",
  prerequisites: ["modulacao-reharmonizacao", "harmonia-cromatica-moderna"],
  estimatedMinutes: 60,
  competencies: ["harmonia-funcional", "arranjo"],
  objectives: [
    "Separar as notas estruturais da melodia das notas de passagem.",
    "Listar os acordes em que uma nota da melodia é nota do acorde (fundamental, terça, quinta, sétima, nona).",
    "Decidir o que manter (cadências, ponto culminante) e o que pode mudar numa rearmonização.",
  ],
  sections: [
    {
      title: "1. A melodia manda",
      blocks: [
        { type: "paragraph", text: "Rearmonizar é trocar os acordes de uma melodia que já existe sem mudar uma nota dela. A primeira pergunta é sempre: quais notas da melodia precisam ser apoiadas por um acorde (as estruturais, em tempo forte ou longas) e quais podem passar (notas de passagem, bordaduras)?" },
        { type: "example", score: EXR.original, verdict: "correto", caption: "Luz da manhã, harmonia simples", commentary: "Só tônica e dominante: C – G – C – C – G – G7 – C. Toda nota da melodia é nota do acorde. É o ponto de partida de toda a disciplina." },
        { type: "listening", title: "Ouça a melodia e o baixo", score: EXR.original, instructions: ["Ouça só o soprano e cante a melodia.", "Ouça soprano e baixo: este é o esqueleto que vamos trocar."], focus: [["S"], ["S", "B"]] },
        {
          type: "table",
          caption: "Uma nota, muitos acordes: em Dó maior, o Mi da melodia pode ser…",
          headers: ["Papel do Mi", "Acorde", "Cor"],
          rows: [
            ["Fundamental", "Em, E7", "Escuro / dominante de Lá menor"],
            ["Terça", "C, C7, C6", "Estável"],
            ["Quinta", "Am, A7", "Suave / dominante de Ré menor"],
            ["Sétima", "Fmaj7", "Aberta, 'jazz'"],
            ["Nona", "Dm9, D7(9)", "Tensa, pede resolução"],
            ["Sexta / 13ª", "G6, G13", "Brilhante, sobre a dominante"],
          ],
        },
      ],
    },
    {
      title: "2. O que segura a forma",
      blocks: [
        { type: "list", items: ["Cadências finais: mude a cor (V7(♭9), iv menor), mas mantenha a função de fechamento.", "Ponto culminante da melodia: é o lugar mais forte para a mudança mais ousada.", "Ritmo harmônico: rearmonizar não é pôr mais acordes; é escolher melhor os que já estão.", "Notas longas da melodia precisam ser nota do acorde (ou tensão que resolve)."] },
        { type: "example", score: EXR.conflito, verdict: "incorreto", caption: "Nota da melodia sem apoio", commentary: "No compasso 2, o Dó da melodia cai sobre Sol maior (Sol–Si–Ré) e depois salta para Mi: dissonância sem preparação nem resolução. O motor aponta. Antes de trocar um acorde, confira se a nota longa pertence a ele." },
        { type: "callout", tone: "dica", title: "Método em quatro passos", text: "1) Marque as notas estruturais. 2) Para cada uma, liste os acordes possíveis (tabela acima). 3) Escolha pela função e pelo baixo que você quer. 4) Escreva as vozes pelo menor movimento e ouça." },
      ],
    },
    {
      title: "3. Demonstração: o inventário de acordes de uma melodia",
      blocks: [
        { type: "paragraph", text: "Antes de propor qualquer rearmonização, faça o inventário. Veja com a 'Luz da manhã' (E5 D5 | C5 E5 | D5 B4 | C5):" },
        { type: "table", caption: "Notas estruturais e acordes possíveis (Dó maior)", headers: ["Nota (tempo)", "Função na harmonia original", "Outras opções", "Observação"], rows: [["E5 (c. 1, t. 1)", "terça de C", "Am (quinta), Em (fundamental), Fmaj7 (sétima)", "início: prefira algo que afirme a tonalidade"], ["D5 (c. 1, t. 3)", "quinta de G", "Dm (fundamental), Bm7♭5 (terça), E7 (sétima)", "nota de passagem forte: aceita quase tudo"], ["C5 (c. 2, t. 1)", "fundamental de C", "Am (terça), F (quinta), D7 (sétima), A♭ (terça, emprestado)", "ponto de repouso no meio da frase"], ["D5 – B4 (c. 3)", "quinta e terça de G", "Dm7 – G7, D♭7 (subV) no B4", "preparação da cadência: mantenha a função D"], ["C5 (c. 4)", "fundamental de C", "C com cor (C6, Cmaj7)", "cadência final: a função T não muda"]] },
        { type: "paragraph", text: "Com a tabela pronta, a decisão vira escolha consciente: o que manter (cadência final, função dominante no compasso 3) e onde ousar (compassos 1–2)." },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Mudar uma nota da melodia para caber no acorde novo", "a canção deixa de ser a mesma", "a melodia é intocável; troque o acorde"], ["Nota longa da melodia fora do acorde", "dissonância sem tratamento", "confira as notas longas primeiro"], ["Rearmonizar a cadência final até perder a função", "o fim não fecha", "mude a cor, não a função (V7(♭9), iv – I)"], ["Pôr mais acordes em vez de acordes melhores", "harmonia agitada, difícil de cantar", "mantenha o ritmo harmônico"]] },
        { type: "list", items: ["A melodia manda: notas estruturais precisam de apoio.", "Cada nota pertence a vários acordes (fundamental, terça, quinta, sétima, nona).", "Cadências e ponto culminante seguram a forma."] },
        {
          type: "challenge",
          title: "Inventário de 'Mar sereno'",
          task: "Para a melodia 'Mar sereno' (C5 B4 | A4 G4 | A4 B4 | C5, em mínimas, Dó maior), marque as notas estruturais e liste, para cada uma, a harmonia mais simples e duas alternativas. Diga onde você ousaria e o que manteria.",
          start: EXD.marStart,
          constraints: ["Não altere a melodia.", "Pelo menos uma alternativa por nota deve ser diatônica e uma pode ser cromática."],
          criteria: ["Cada acorde proposto contém a nota da melodia (diga como: fundamental, terça…).", "A cadência final continua T (Dó).", "Você justificou onde ousar."],
          hints: ["Todas as notas são mínimas em tempos 1 e 3: todas são estruturais.", "O B4 do compasso 3 antecede a tônica: a função D deve ficar.", "O G4 do compasso 2 pode ser fundamental de G, quinta de C, terça de E♭ (emprestado) ou nona de F."],
          solution: {
            commentary: "Inventário possível: C5 — C (fundamental); alt. Am (terça), F (quinta). B4 — G (terça); alt. Em (quinta), G/B. A4 — Am (fundamental); alt. F (terça), D7 (quinta), Dm (quinta). G4 — C/G ou C (quinta); alt. Em (terça), C♯°7 (quinta, preparando Dm), Fmaj9 (nona). A4 — F ou Dm (terça/quinta); alt. D7/F♯ (quinta). B4 — G7 (terça); alt. D♭7 (sétima, como C♭, no estilo popular). C5 — C; alt. Cmaj7 ou C6 como cor. Onde ousar: compasso 2 (Am → C♯°7 leva bem ao Dm) e o B4 do compasso 3 (G7 ou D♭7). O que manter: a tônica final e a função D antes dela.",
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-rearm-fundamentos",
    title: "Verificação: fundamentos da rearmonização",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["rf-melodia"],
    staticItems: [
      { id: "rf-melodia", kind: "choice", skill: "harmonia-funcional", prompt: "Numa rearmonização, o que não pode mudar?", options: [{ id: "a", label: "As notas da melodia" }, { id: "b", label: "Os acordes" }, { id: "c", label: "As vozes internas" }], correctOptionId: "a", explanation: "Rearmonizar é trocar a harmonia sob a mesma melodia." },
      { id: "rf-mi", kind: "choice", skill: "acordes", prompt: "Em Dó maior, o Mi da melodia é a quinta de qual acorde?", options: [{ id: "a", label: "Lá menor" }, { id: "b", label: "Dó maior" }, { id: "c", label: "Mi menor" }], correctOptionId: "a", explanation: "Lá – Dó – Mi: o Mi é a quinta." },
      { id: "rf-longa", kind: "choice", skill: "harmonia-funcional", prompt: "Uma nota longa da melodia, em tempo forte, deve ser…", options: [{ id: "a", label: "Nota do acorde (ou tensão que resolve)" }, { id: "b", label: "Sempre a fundamental do acorde" }, { id: "c", label: "Uma nota estranha ao acorde" }], correctOptionId: "a", explanation: "Notas longas definem a harmonia; notas de passagem podem ser estranhas." },
    ],
    generators: [{ type: "reharm-choice", count: 2 }, { type: "chord-identification", count: 3 }, { type: "nct-identification", count: 1 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o que não muda numa rearmonização.",
  application: { title: "Aplicação no Estúdio", steps: ["Escreva a melodia 'Luz da manhã' no soprano.", "Para cada nota estrutural, anote três acordes possíveis.", "Harmonize com tônica e dominante e guarde como versão de partida."] },
};

export const lessonRearmDiatonica: Lesson = {
  id: "rearm-diatonica",
  title: "Substituições diatônicas e inversões",
  summary: "Acordes da mesma função (I, vi, iii; IV, ii; V, vii°), inversões para o baixo andar por grau e as paralelas que aparecem quando se troca acorde sem cuidar das vozes.",
  levelId: "s4",
  unitId: "s4-rea",
  status: "disponivel",
  prerequisites: ["rearm-fundamentos"],
  estimatedMinutes: 55,
  competencies: ["harmonia-funcional", "conducao-de-vozes"],
  objectives: [
    "Trocar acordes por outros da mesma função.",
    "Usar inversões para criar uma linha de baixo por grau.",
    "Evitar paralelas ao substituir acordes no estado fundamental.",
  ],
  sections: [
    {
      title: "1. Famílias de função",
      blocks: [
        {
          type: "table",
          caption: "Substitutos diatônicos em Dó maior",
          headers: ["Função", "Acorde original", "Substitutos (notas em comum)"],
          rows: [
            ["Tônica", "C", "Am (Dó, Mi), Em (Mi, Sol)"],
            ["Subdominante", "F", "Dm (Fá, Lá), Am (Lá, Dó)"],
            ["Dominante", "G", "Bm7(♭5) (Si, Ré, Fá), Em (Sol, Si)"],
          ],
        },
        { type: "paragraph", text: "Acordes a uma terça de distância têm duas notas em comum: por isso substituem um ao outro sem chocar com a melodia. Junte isso às inversões (G/B, C/G) e o baixo passa a descer por grau, uma das marcas da canção popular." },
        { type: "example", score: EXR.diatonica, verdict: "correto", caption: "C – G/B – Am – C/G – Dm – G7 – C", commentary: "O baixo desce Dó – Si – Lá – Sol e cadencia em Ré – Sol – Dó; a melodia é a mesma. No estilo popular, o motor só informa que o Si do baixo desce." },
        { type: "listening", title: "A linha do baixo", score: EXR.diatonica, instructions: ["Ouça só o baixo.", "Compare com o baixo da harmonia simples."], focus: [["B"], ["S", "B"]] },
      ],
    },
    {
      title: "2. O preço da troca",
      blocks: [
        { type: "example", score: EXR.diatonicaTradicional, verdict: "incorreto", caption: "A mesma linha no coral tradicional", commentary: "No estilo tradicional, o Si no baixo é sensível e deveria subir para Dó; o motor também comenta o C/G sem contexto cadencial. É a mesma partitura: a régua do estilo é que muda." },
        { type: "example", score: EXR.paralelasRearm, verdict: "incorreto", caption: "C – Dm – C, todos juntos", commentary: "Trocar o Sol por Ré menor com todas as vozes subindo e descendo juntas gera quintas e oitavas paralelas. Mantenha notas comuns e mova o baixo em sentido contrário." },
      ],
    },
    {
      title: "3. Demonstração: uma linha de baixo descendente, passo a passo",
      blocks: [
        { type: "list", ordered: true, items: [
          "Escreva a linha de baixo desejada antes dos acordes: na 'Luz da manhã', C – B – A – G descendo por grau nos dois primeiros compassos.",
          "Para cada par baixo + melodia, procure o acorde que contém as duas notas: C/E5 → C; B/D5 → G/B; A/C5 → Am; G/E5 → C/G.",
          "Confira o estilo: no popular, o B no baixo descendo é natural; no coral tradicional, é uma sensível que deveria subir.",
          "Complete as vozes internas com notas comuns: G4 no contralto atravessa C, G/B e (como sétima) Am7, se quiser cor.",
          "Revise as paralelas: com o baixo descendo por grau e a melodia descendo também, procure movimento contrário nas vozes internas.",
        ] },
        { type: "callout", tone: "dica", title: "Decisões do arranjador", text: "A mesma linha descendente funciona com Am e com C/A? Não: escolha o acorde pela nota da melodia e pela função. Se a melodia tiver C5 sobre o A do baixo, Am (C é terça) é natural; Fmaj7/A seria outra cor, com a melodia como quinta." },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Substituto de outra função (V no lugar de IV)", "a frase muda de direção", "troque dentro da família funcional"], ["Todas as vozes seguindo o baixo descendente", "paralelas", "vozes internas paradas ou em contrário"], ["Inversão ⁶₄ sem contexto no estilo tradicional", "instabilidade sem motivo", "⁶₄ de passagem ou cadencial"], ["Substituição que contradiz a nota da melodia", "choque", "o substituto precisa conter a nota"]] },
        { type: "list", items: ["Substitutos da mesma função compartilham duas notas.", "Inversões transformam o baixo numa linha.", "O estilo decide se a sensível pode descer no baixo."] },
        {
          type: "challenge",
          title: "Rearmonização diatônica de 'Mar sereno'",
          task: "Rearmonize 'Mar sereno' (C5 B4 | A4 G4 | A4 B4 | C5) só com acordes diatônicos e inversões, com um baixo que ande apenas por grau conjunto. Escreva as quatro vozes no estilo popular.",
          start: EXD.marDiaStart,
          constraints: ["Sem acordes cromáticos; tétrades diatônicas permitidas.", "Baixo só por grau conjunto, entre C3 e F3.", "Começar e terminar em C no estado fundamental."],
          criteria: ["Cada acorde contém a nota da melodia.", "Onde a melodia desce, o baixo sobe (e vice-versa) pelo menos em quatro trocas.", "O motor (estilo popular) só registra observações informativas."],
          hints: ["Se a melodia desce C – B – A – G, faça o baixo subir C – D – E – F.", "Sobre D no baixo com B4 na melodia: G/D. Sobre E com A4: Am/E. Sobre F com G4: G7/F.", "Na volta, o baixo desce E – D – C enquanto a melodia sobe A – B – C."],
          solution: {
            score: EXD.marDia,
            commentary: "C – G/D | Am/E – G7/F | Am/E – G/D | C. O baixo sobe C – D – E – F e desce F – E – D – C: um arco em espelho com a melodia, em movimento contrário em quase todas as trocas. A sétima F do G7/F, no baixo, desce para E — a resolução que o estilo tradicional também pediria. A sensível B4 da melodia vai para A4 no compasso 1 (informação do motor: na melodia dada, não há escolha). Cuidado que esta versão evita: com o baixo descendo C – B – A – G junto com a melodia, soprano e baixo andariam em 15ªs paralelas.",
            alternatives: ["Trocar o Am/E do compasso 3 por F/A (A4 = terça, baixo A2) também é diatônico, mas o baixo deixaria de andar por grau (F3 → A2)."],
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-rearm-diatonica",
    title: "Verificação: substituições diatônicas",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["rd-tonica"],
    staticItems: [
      { id: "rd-tonica", kind: "choice", skill: "harmonia-funcional", prompt: "Qual acorde substitui Dó maior (tônica) mantendo duas notas em comum?", options: [{ id: "a", label: "Lá menor" }, { id: "b", label: "Ré menor" }, { id: "c", label: "Sol maior" }], correctOptionId: "a", explanation: "Lá – Dó – Mi tem Dó e Mi em comum com Dó maior." },
      { id: "rd-baixo", kind: "choice", skill: "harmonia-funcional", prompt: "Para o baixo descer de Dó a Lá por grau, que acorde cabe no meio (sobre Ré na melodia)?", options: [{ id: "a", label: "G/B" }, { id: "b", label: "G no estado fundamental" }, { id: "c", label: "D maior" }], correctOptionId: "a", explanation: "A inversão põe o Si no baixo: Dó – Si – Lá." },
      { id: "rd-paralelas", kind: "choice", skill: "conducao-de-vozes", prompt: "Trocar C por Dm com todas as vozes no estado fundamental e se movendo juntas causa…", options: [{ id: "a", label: "Quintas e oitavas paralelas" }, { id: "b", label: "Cruzamento de vozes" }, { id: "c", label: "Nada; é sempre seguro" }], correctOptionId: "a", explanation: "Acordes vizinhos em movimento paralelo produzem paralelas; use notas comuns e movimento contrário." },
    ],
    generators: [{ type: "reharm-choice", count: 2 }, { type: "function-identification", count: 3 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o substituto da tônica.",
  application: { title: "Aplicação no Estúdio", steps: ["Rearmonize 'Luz da manhã' só com acordes diatônicos e inversões.", "Faça o baixo descer por grau pelo menos quatro notas.", "Revise nos estilos tradicional e popular e compare."] },
};

export const lessonRearmDominantes: Lesson = {
  id: "rearm-dominantes",
  title: "Dominantes secundárias, ii–V e dominantes em cadeia",
  summary: "Preceder qualquer acorde com a dominante dele, o ii–V secundário e a cadeia de dominantes, sempre resolvendo sensível e sétima.",
  levelId: "s4",
  unitId: "s4-rea",
  status: "disponivel",
  prerequisites: ["rearm-diatonica"],
  estimatedMinutes: 60,
  competencies: ["harmonia-funcional", "conducao-de-vozes"],
  objectives: [
    "Inserir a dominante secundária de um acorde da melodia.",
    "Ampliar para ii–V secundário e cadeia de dominantes.",
    "Resolver a sensível e a sétima de cada dominante.",
  ],
  sections: [
    {
      title: "1. A dominante de cada acorde",
      blocks: [
        { type: "paragraph", text: "Qualquer acorde maior ou menor da tonalidade pode ser precedido pela própria dominante: E7 antes de Am, A7 antes de Dm, D7 antes de G. A melodia aceita quando a nota dela é nota da dominante: em 'Luz da manhã', o Ré é a sétima do E7 e o Mi é a quinta do A7." },
        { type: "example", score: EXR.dominantes, verdict: "correto", caption: "C – E7/G♯ – Am – A7/C♯ – Dm – G7 – C", commentary: "O baixo sobe por semitom (Sol♯ → Lá, Dó♯ → Ré): cada dominante secundária está invertida e a sensível dela está no baixo. A sétima do E7 é a própria melodia (Ré → Dó); a do A7 (Sol, no contralto) desce para Fá." },
        { type: "listening", title: "O baixo cromático", score: EXR.dominantes, instructions: ["Ouça o baixo: Dó – Sol♯ – Lá – Dó♯ – Ré – Sol – Dó.", "Ouça o contralto resolvendo Sol → Fá."], focus: [["B"], ["A"]] },
        {
          type: "table",
          caption: "Dominantes secundárias em Dó maior",
          headers: ["Alvo", "Dominante", "ii–V secundário"],
          rows: [
            ["Dm (ii)", "A7", "Em7(♭5) – A7"],
            ["Em (iii)", "B7", "F♯m7(♭5) – B7"],
            ["F (IV)", "C7", "Gm7 – C7"],
            ["G (V)", "D7", "Am7 – D7"],
            ["Am (vi)", "E7", "Bm7(♭5) – E7"],
          ],
        },
      ],
    },
    {
      title: "2. Cadeia de dominantes e o cuidado com a sétima",
      blocks: [
        { type: "paragraph", text: "Na cadeia, cada dominante resolve em outra dominante (E7 – A7 – D7 – G7 – C): o baixo anda em quartas e as sétimas descem, uma depois da outra, nas vozes internas. Funciona quando a melodia tem notas comuns ou desce por grau." },
        { type: "example", score: EXR.setimaSobe, verdict: "incorreto", caption: "A sétima do A7 subindo", commentary: "Se o contralto sobe Sol → Lá em vez de descer para Fá, o motor aponta quintas desiguais com o baixo e dissonâncias sem resolução. Toda sétima de dominante desce por grau." },
      ],
    },
    {
      title: "3. Demonstração: inserir uma dominante secundária",
      blocks: [
        { type: "list", ordered: true, items: [
          "Escolha o acorde-alvo: um acorde maior ou menor da tonalidade que mereça destaque (aqui, Am, sob o C5 da 'Luz da manhã').",
          "Construa a dominante dele: uma 5ª acima de A é E; E7 = E – G♯ – B – D.",
          "Confira a melodia no tempo em que o E7 vai entrar: o D5 é a sétima do E7 — cabe, e resolve descendo para C5 junto com a troca de acorde.",
          "Ponha a sensível secundária (G♯) numa voz que possa subir para A: no baixo (E7/G♯ → Am) ou numa voz interna.",
          "Resolva as duas tendências ao mesmo tempo (G♯ → A, D → C) e confira as paralelas.",
        ] },
        { type: "callout", tone: "atencao", title: "Falsa relação", text: "Se uma voz canta G natural logo antes ou logo depois de outra cantar G♯, o choque cromático entre vozes (falsa relação) soa como erro. Deixe o cromatismo na mesma voz: G → G♯ → A." },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Sensível secundária descendo", "a tonicização não se percebe", "G♯ sobe para A"], ["Sétima da dominante secundária subindo", "dissonância sem resolução", "desce por grau"], ["Dominante secundária sobre nota da melodia que não pertence a ela", "choque", "confira a melodia antes"], ["Cadeia de dominantes longa demais", "perde-se a tonalidade", "duas ou três dominantes seguidas, no máximo"]] },
        { type: "list", items: ["Toda tríade maior ou menor da tonalidade pode receber sua dominante.", "ii–V secundário: prepara a dominante secundária com seu próprio ii.", "Sensível sobe, sétima desce — também nas dominantes secundárias."] },
        {
          type: "challenge",
          title: "Duas dominantes em 'Mar sereno'",
          task: "Em 'Mar sereno' (C5 B4 | A4 G4 | A4 B4 | C5), insira duas dominantes secundárias. Escreva as cifras, a nota da melodia em cada uma (que função ela tem no acorde) e o caminho da sensível secundária.",
          constraints: ["A melodia não muda.", "Cada dominante secundária resolve no acorde-alvo seguinte.", "Termine com G7 – C."],
          criteria: ["A nota da melodia pertence a cada dominante secundária.", "Você indicou em que voz está a sensível secundária e para onde ela vai.", "Ao realizar no Estúdio, o motor não aponta erros de resolução."],
          hints: ["Sob o B4 do compasso 1, que dominante prepara o Am do compasso 2? B é a quinta de E.", "Sob o G4 do compasso 2, que dominante prepara o F (ou o Dm) do compasso 3? G é a quinta de C7 e a sétima de A7.", "Com a sensível no baixo: E7/G♯ → Am e C7/E → F."],
          solution: {
            commentary: "C – E7/G♯ | Am – C7/E | F – G7 | C. B4 é a quinta do E7; a sensível G♯ está no baixo e sobe para A (Am). G4 é a quinta do C7; a sensível secundária E está no baixo e sobe para F (F); a sétima B♭ do C7, numa voz interna, desce para A. No compasso 3, A4 é a terça de F e B4 a terça de G7. O baixo fica C – G♯ – A – E – F – G – C: duas subidas por semitom. Alternativa com A7: C – E7/G♯ | Am – A7/C♯ | Dm – G7 | C, seria mais natural no papel, mas o G4 da melodia (sétima do A7) sobe para A4 no compasso seguinte: a sétima subiria. Por isso, sob este G4, C7 funciona melhor que A7.",
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-rearm-dominantes",
    title: "Verificação: dominantes secundárias",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["rdo-v-vi"],
    staticItems: [
      { id: "rdo-v-vi", kind: "choice", skill: "harmonia-funcional", prompt: "Em Dó maior, qual é a dominante secundária de Lá menor?", options: [{ id: "a", label: "E7" }, { id: "b", label: "A7" }, { id: "c", label: "D7" }], correctOptionId: "a", explanation: "Mi – Sol♯ – Si – Ré: o Sol♯ é a sensível de Lá." },
      { id: "rdo-setima", kind: "choice", skill: "conducao-de-vozes", prompt: "Em A7 → Dm, para onde vai o Sol (sétima do A7)?", options: [{ id: "a", label: "Desce para Fá" }, { id: "b", label: "Sobe para Lá" }, { id: "c", label: "Fica parado" }], correctOptionId: "a", explanation: "A sétima desce por grau." },
      { id: "rdo-cadeia", kind: "choice", skill: "harmonia-funcional", prompt: "Numa cadeia de dominantes E7 – A7 – D7 – G7 – C, o baixo anda em…", options: [{ id: "a", label: "Quartas ascendentes (ou quintas descendentes)" }, { id: "b", label: "Semitons" }, { id: "c", label: "Terças" }], correctOptionId: "a", explanation: "Cada dominante resolve uma quinta abaixo." },
    ],
    generators: [{ type: "reharm-choice", count: 2 }, { type: "seventh-identification", count: 2 }, { type: "realization", count: 1, mode: "canto-dado" }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a dominante de Lá menor.",
  application: { title: "Aplicação no Estúdio", steps: ["Rearmonize 'Luz da manhã' com duas dominantes secundárias.", "Ponha a sensível de cada dominante no baixo (inversão) e confira a resolução.", "Experimente um ii–V secundário antes do Ré menor."] },
};

export const lessonRearmSubV: Lesson = {
  id: "rearm-subv",
  title: "Substituto de trítono e dominantes estendidas",
  summary: "Trocar uma dominante pela que está a um trítono (D♭7 no lugar de G7), o baixo cromático que resulta e as tensões das dominantes no estilo popular.",
  levelId: "s4",
  unitId: "s4-rea",
  status: "disponivel",
  prerequisites: ["rearm-dominantes", "tensoes-e-extensoes"],
  estimatedMinutes: 55,
  competencies: ["harmonia-funcional", "acordes"],
  objectives: [
    "Encontrar o substituto de trítono de qualquer dominante.",
    "Criar um baixo cromático descendente com SubV.",
    "Dizer em que estilos o SubV cabe e explicar o diagnóstico que o coral tradicional dá para a mesma passagem.",
  ],
  sections: [
    {
      title: "1. O trítono compartilhado",
      blocks: [
        { type: "paragraph", text: "G7 e D♭7 têm o mesmo trítono: Si (Dó♭) e Fá. Por isso um pode ocupar o lugar do outro antes de Dó. O baixo, em vez de saltar Sol → Dó, desce por semitom: Ré♭ → Dó. A melodia Si funciona como a sétima do D♭7 (Dó♭)." },
        {
          type: "table",
          caption: "Dominantes e seus substitutos de trítono",
          headers: ["Alvo", "Dominante", "SubV"],
          rows: [["C", "G7", "D♭7"], ["Am", "E7", "B♭7"], ["Dm", "A7", "E♭7"], ["G", "D7", "A♭7"]],
        },
        { type: "example", score: EXR.subV, verdict: "correto", caption: "C – B♭7 – Am7 – A7 – Dm7 – D♭7 – C", commentary: "B♭7 no lugar de E7 (antes de Lá menor) e D♭7 no lugar de G7 (antes de Dó): o baixo faz Dó – Si♭ – Lá e Ré – Ré♭ – Dó. No estilo popular, o motor só comenta o Si da melodia sobre o D♭7." },
        { type: "listening", title: "Ouça o baixo descer por semitom", score: EXR.subV, instructions: ["Ouça só o baixo.", "Ouça os quatro e compare com a versão com E7 e G7."], focus: [["B"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "2. Estilo e tensões",
      blocks: [
        { type: "paragraph", text: "O SubV é linguagem de jazz, bossa nova e gospel contemporâneo. No coral tradicional, as sétimas dos acordes menores com sétima (Am7, Dm7) são tratadas como dissonâncias que precisam descer por grau, e o motor cobra isso." },
        { type: "example", score: EXR.subVTradicional, verdict: "incorreto", caption: "A mesma harmonia no coral tradicional", commentary: "O motor aponta a sétima do Am7 (Sol) parada e a sétima do Dm7 (Dó) indo para Lá♭ por salto. Em repertório tradicional, prefira dominantes secundárias comuns." },
        { type: "callout", tone: "dica", title: "Tensões da dominante", text: "Sobre G7 cabem 9 (Lá), ♭9 (Lá♭), 13 (Mi) e ♭13 (Mi♭). Em vozes, ponha a tensão no soprano ou no contralto e resolva por grau no acorde seguinte." },
      ],
    },
    {
      title: "3. Demonstração: trocar G7 por D♭7",
      blocks: [
        { type: "list", ordered: true, items: [
          "Encontre a dominante a substituir: G7 antes de C.",
          "Calcule o substituto: uma 5ª diminuta (trítono) acima de G é D♭; D♭7 = D♭ – F – A♭ – C♭.",
          "Confira o trítono comum: G7 tem B e F; D♭7 tem C♭ (= B) e F. As duas notas que resolvem na tônica continuam lá.",
          "Confira a melodia: se ela tem B (= C♭) ou F, está na sétima ou na terça do D♭7; se tem D ou G, choca (D é ♭9, G é #11 — tensões fortes, só no jazz).",
          "Escreva o baixo D♭ → C (semitom) e resolva C♭ → C e F → E nas vozes.",
        ] },
        { type: "callout", tone: "dica", title: "Grafia", text: "Num arranjo vocal, escreva a sétima do D♭7 como B (Si) quando ela vier da sensível ou for para C: o cantor lê e afina melhor um semitom 'Si → Dó' do que 'Dó♭ → Dó'. O motor entende as duas grafias." },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["SubV sobre nota da melodia que não pertence a ele", "choque forte", "confira a melodia: só 3ª, 7ª ou tensões intencionais"], ["SubV no coral tradicional", "o motor cobra sétimas e quintas", "use dominantes comuns no estilo tradicional"], ["Baixo D♭ saltando em vez de descer a C", "perde o efeito", "a graça do SubV é o semitom no baixo"], ["Tensões da dominante sem resolução", "acorde 'sujo'", "nona e décima terceira descem por grau"]] },
        { type: "list", items: ["SubV = dominante a um trítono; mesmo trítono, baixo cromático.", "Linguagem de jazz, bossa e gospel moderno.", "A melodia precisa caber no acorde novo."] },
        {
          type: "challenge",
          title: "Onde cabe um SubV?",
          task: "Em 'Mar sereno' (C5 B4 | A4 G4 | A4 B4 | C5) com a harmonia C – G | Am – C | Dm – G7 | C, diga em quais acordes um substituto de trítono é possível sem mudar a melodia e escreva a nova progressão.",
          constraints: ["Só substitua dominantes (ou acordes que você transforme em dominante).", "Confira a nota da melodia em cada substituição."],
          criteria: ["Cada SubV proposto contém a nota da melodia como 3ª ou 7ª.", "O baixo desce por semitom para o acorde-alvo.", "Você descartou explicitamente as posições em que a melodia choca."],
          hints: ["O G7 do compasso 3 tem B4 na melodia. B = C♭: que função ele tem no D♭7?", "Antes do Dm, a dominante seria A7; o SubV de A7 é E♭7. A melodia ali (G4) pertence ao E♭7?", "Antes do Am, a dominante seria E7; o SubV é B♭7. O B4 da melodia pertence ao B♭7?"],
          solution: {
            commentary: "Funciona: D♭7 no lugar do G7 (o B4 da melodia é a sétima C♭ do D♭7; baixo D♭ → C). Também funciona E♭7 antes do Dm: o G4 da melodia é a terça de E♭7 (E♭ – G – B♭ – D♭), e o baixo desce E♭ → D. Não funciona B♭7 antes do Am: o B4 natural da melodia choca com o B♭ fundamental. Progressão: C – G | Am – E♭7 | Dm – D♭7 | C. No estilo popular, o baixo fica C – G – A – E♭ – D – D♭ – C, com dois semitons descendentes.",
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-rearm-subv",
    title: "Verificação: substituto de trítono",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["rs-subv"],
    staticItems: [
      { id: "rs-subv", kind: "choice", skill: "harmonia-funcional", prompt: "Qual é o substituto de trítono de G7?", options: [{ id: "a", label: "D♭7" }, { id: "b", label: "D7" }, { id: "c", label: "C♯m7" }], correctOptionId: "a", explanation: "D♭7 tem o mesmo trítono (Fá e Dó♭/Si)." },
      { id: "rs-baixo", kind: "choice", skill: "harmonia-funcional", prompt: "Com SubV antes de Dó, o baixo vai de…", options: [{ id: "a", label: "Ré♭ para Dó, por semitom" }, { id: "b", label: "Sol para Dó, por quarta" }, { id: "c", label: "Si para Dó" }], correctOptionId: "a", explanation: "É o baixo cromático característico do SubV." },
      { id: "rs-estilo", kind: "choice", skill: "arranjo", prompt: "Em que repertório o SubV soa natural?", options: [{ id: "a", label: "Jazz, bossa nova e gospel contemporâneo" }, { id: "b", label: "Corais de Bach" }, { id: "c", label: "Canto gregoriano" }], correctOptionId: "a", explanation: "Na harmonia tradicional, a dominante comum é a regra." },
    ],
    generators: [{ type: "seventh-identification", count: 3 }, { type: "chord-identification", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o SubV de G7.",
  application: { title: "Aplicação no Estúdio", steps: ["No estilo popular, troque o G7 da cadência final por D♭7.", "Troque o E7 antes de Lá menor por B♭7.", "Ouça o baixo e confira as resoluções."] },
};

export const lessonRearmModal: Lesson = {
  id: "rearm-modal",
  title: "Empréstimo modal: iv menor, ♭VI, ♭VII e a picardia",
  summary: "Acordes do modo menor dentro do maior, a linha cromática que eles criam e o planing de acordes maiores paralelos.",
  levelId: "s4",
  unitId: "s4-rea",
  status: "disponivel",
  prerequisites: ["rearm-diatonica"],
  estimatedMinutes: 55,
  competencies: ["harmonia-funcional", "acordes"],
  objectives: [
    "Usar iv, ♭VI e ♭VII emprestados do modo menor.",
    "Conferir se a nota da melodia pertence ao acorde emprestado.",
    "Distinguir empréstimo funcional de planing (cor).",
  ],
  sections: [
    {
      title: "1. Acordes do 'lado escuro'",
      blocks: [
        {
          type: "table",
          caption: "Empréstimos de Dó menor em Dó maior",
          headers: ["Acorde", "Notas", "Melodia que aceita", "Uso típico"],
          rows: [
            ["Fm (iv)", "Fá – Lá♭ – Dó", "Fá, Lá♭, Dó (e Ré como sexta)", "Antes da tônica, 'amém' melancólico"],
            ["A♭ (♭VI)", "Lá♭ – Dó – Mi♭", "Dó, Mi♭", "Surpresa no meio da frase"],
            ["B♭ (♭VII)", "Si♭ – Ré – Fá", "Ré, Fá", "Cadência 'rock' e gospel (♭VII – I)"],
            ["Dm7(♭5) (iiø)", "Ré – Fá – Lá♭ – Dó", "Ré, Fá, Dó", "Antes do V"],
          ],
        },
        { type: "example", score: EXR.modal, verdict: "correto", caption: "C – G – A♭ – C – Fm6/A♭ – G – C", commentary: "O Dó da melodia vira terça de Lá♭ maior; o Ré vira sexta de Fá menor (com Lá♭ no baixo). O motor lê o Fm6/A♭ como ii° com Lá♭ no baixo: são as mesmas notas, Ré – Fá – Lá♭." },
        { type: "listening", title: "A sombra do menor", score: EXR.modal, instructions: ["Ouça o contralto: Sol – Mi♭ – Mi e Fá – Sol.", "Ouça os quatro e note a mudança de cor no compasso 2."], focus: [["A"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "2. Empréstimo ou planing?",
      blocks: [
        { type: "paragraph", text: "Acordes maiores descendo por tom (C – B♭ – A♭) soam modais e épicos, mas em blocos paralelos são cor, não função: as quintas paralelas fazem parte do efeito. Use em introduções, interlúdios ou finais, não no meio de um hino tradicional." },
        { type: "example", score: EXR.modalPlaning, verdict: "observacao", caption: "C – B♭ – A♭ em blocos", commentary: "O motor sugere evitar as quintas e oitavas paralelas: aqui são o efeito. Num coral tradicional, reescreva com movimento contrário." },
        { type: "callout", tone: "dica", title: "Terça de picardia", text: "O caminho inverso também vale: uma canção em menor que termina no acorde maior da tônica. É o empréstimo do modo maior no último acorde." },
      ],
    },
    {
      title: "3. Demonstração: conferir se o empréstimo cabe na melodia",
      blocks: [
        { type: "list", ordered: true, items: [
          "Liste os acordes emprestados de Dó menor: Fm (F – A♭ – C), A♭ (A♭ – C – E♭), B♭ (B♭ – D – F), Dm7♭5 (D – F – A♭ – C), E♭ (E♭ – G – B♭).",
          "Para cada nota da melodia, veja se ela pertence a algum deles. Atenção às notas que o empréstimo altera: A, E e B naturais na melodia chocam com A♭, E♭ e B♭.",
          "Escolha o ponto: empréstimos funcionam melhor perto das cadências (iv – I) ou como surpresa no meio da frase (♭VI).",
          "Coloque a nota alterada numa voz interna, chegando por semitom.",
          "Volte ao maior com uma cadência clara.",
        ] },
        { type: "table", caption: "Exemplo: a 'Luz da manhã' (E5 D5 | C5 E5 | D5 B4 | C5)", headers: ["Nota", "Empréstimo possível?", "Por quê"], rows: [["E5", "não", "todos os acordes de Dó menor têm E♭"], ["D5", "sim: B♭ (terça), Fm6 (sexta), Dm7♭5", "D pertence a eles"], ["C5", "sim: Fm, A♭, Dm7♭5", "C pertence a eles"], ["B4", "não", "B natural choca com B♭; só G7 serve"]] },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Empréstimo sob nota da melodia que ele altera", "choque (A na melodia, A♭ no acorde)", "confira a melodia antes"], ["Nota alterada por salto", "difícil de afinar", "semitom na mesma voz"], ["Empréstimos demais", "a tonalidade vira menor", "um por seção"], ["Planing no meio de um hino tradicional", "paralelas fora de contexto", "planing em introduções e finais, no estilo popular"]] },
        { type: "list", items: ["iv, ♭VI, ♭VII e iiø vêm do menor homônimo.", "A melodia decide onde cabem.", "A picardia é o empréstimo ao contrário: menor terminando em maior."] },
        {
          type: "challenge",
          title: "Empréstimos em 'Mar sereno'",
          task: "Em 'Mar sereno' (C5 B4 | A4 G4 | A4 B4 | C5), indique em que notas um acorde emprestado de Dó menor é possível e proponha uma versão com um empréstimo. Justifique pela nota da melodia.",
          constraints: ["A melodia não muda.", "Termine com G7 – C (ou com iv – I, se a melodia permitir)."],
          criteria: ["Você testou cada nota contra os acordes emprestados.", "O empréstimo escolhido contém a nota da melodia.", "A nota alterada chega por semitom numa voz interna."],
          hints: ["A4 e B4 chocam com A♭ e B♭: elimine-as.", "Restam C5 e G4. C5 está em Fm, A♭ e Dm7♭5; G4 está em E♭ e Cm.", "Sob o G4 do compasso 2, E♭ (♭III) é uma surpresa possível; depois, o A4 do compasso 3 pede F ou Dm de volta."],
          solution: {
            commentary: "Só C5 (compassos 1 e 4) e G4 (compasso 2) aceitam empréstimos; A4 e B4 chocam com A♭ e B♭. Uma versão: C – G | Am – E♭ | F – G7 | C. O E♭ maior (♭III) sob o G4 é a surpresa; uma voz interna faz E → E♭ (semitom) e volta para F no compasso 3 (E♭ → F, tom). Como a melodia final é C5 sobre C, um A♭ maior (♭VI) antes do último acorde exigiria trocar o B4 do compasso 3 — não é possível sem alterar a melodia. Por isso, nesta melodia, o empréstimo fica no meio da frase, não na cadência.",
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-rearm-modal",
    title: "Verificação: empréstimo modal",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["rm-iv"],
    staticItems: [
      { id: "rm-iv", kind: "choice", skill: "harmonia-funcional", prompt: "Em Dó maior, o acorde de Fá menor é…", options: [{ id: "a", label: "Um empréstimo do modo menor (iv)" }, { id: "b", label: "Uma modulação para Fá" }, { id: "c", label: "Um erro de harmonia" }], correctOptionId: "a", explanation: "Fá – Lá♭ – Dó vem de Dó menor." },
      { id: "rm-lab", kind: "choice", skill: "acordes", prompt: "Qual nota da melodia combina com A♭ maior em Dó maior?", options: [{ id: "a", label: "Dó" }, { id: "b", label: "Ré" }, { id: "c", label: "Si" }], correctOptionId: "a", explanation: "Lá♭ – Dó – Mi♭: o Dó é a terça." },
      { id: "rm-planing", kind: "choice", skill: "conducao-de-vozes", prompt: "C – B♭ – A♭ em blocos paralelos gera quintas paralelas. Isso é…", options: [{ id: "a", label: "Efeito de cor aceitável no estilo popular, em trechos curtos" }, { id: "b", label: "Sempre proibido" }, { id: "c", label: "Obrigatório em hinos" }], correctOptionId: "a", explanation: "Planing é cor; no coral tradicional, reescreva com movimento contrário." },
    ],
    generators: [{ type: "chord-identification", count: 3 }, { type: "function-identification", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o iv emprestado.",
  application: { title: "Aplicação no Estúdio", steps: ["Ponha um Fm6 antes da última tônica de 'Luz da manhã'.", "Experimente um A♭ maior sob o Dó da melodia.", "Escreva dois compassos de planing numa introdução."] },
};

export const lessonRearmDiminutos: Lesson = {
  id: "rearm-diminutos",
  title: "Diminutos: de passagem, auxiliar e como dominante",
  summary: "O diminuto entre dois acordes vizinhos, o diminuto auxiliar sobre a tônica e o vii°7 como dominante sem fundamental, com a sétima sempre descendo.",
  levelId: "s4",
  unitId: "s4-rea",
  status: "disponivel",
  prerequisites: ["rearm-dominantes"],
  estimatedMinutes: 50,
  competencies: ["harmonia-funcional", "conducao-de-vozes"],
  objectives: [
    "Inserir um diminuto de passagem com baixo cromático.",
    "Usar o diminuto auxiliar (I – I°7 – I).",
    "Resolver a sétima diminuta por grau descendente.",
  ],
  sections: [
    {
      title: "1. O diminuto que liga",
      blocks: [
        { type: "paragraph", text: "Quando o baixo pode chegar ao acorde seguinte por semitom ascendente (Dó♯ → Ré, Fá♯ → Sol), o diminuto construído sobre essa nota liga os dois acordes. C♯°7 entre Am e Dm funciona como A7(♭9) sem fundamental: é uma dominante disfarçada." },
        { type: "example", score: EXR.diminuto, verdict: "correto", caption: "C – G – Am – C♯°7 – Dm – G7 – C", commentary: "O baixo sobe Lá – Dó♯ – Ré; o Mi da melodia é a terça do C♯°7 e o tenor resolve Si♭ → Lá (a sétima diminuta desce)." },
        { type: "listening", title: "Ouça o tenor", score: EXR.diminuto, instructions: ["Ouça o tenor: Dó – Si♭ – Lá.", "Ouça os quatro."], focus: [["T"], ["S", "A", "T", "B"]] },
        {
          type: "table",
          caption: "Diminutos úteis em Dó maior",
          headers: ["Tipo", "Exemplo", "Função"],
          rows: [["De passagem ascendente", "C – C♯°7 – Dm", "Dominante de Dm sem fundamental"], ["De passagem descendente", "Em – E♭°7 – Dm", "Cor cromática"], ["Auxiliar", "C – C°7 – C", "Bordadura sobre a tônica"], ["Antes do V", "F – F♯°7 – C/G", "Leva ao 6/4 cadencial"]],
        },
      ],
    },
    {
      title: "2. A sétima diminuta desce",
      blocks: [
        { type: "example", score: EXR.diminutoSetimaSobe, verdict: "incorreto", caption: "Si♭ subindo para Si", commentary: "Se o tenor sobe Si♭ → Si, a sétima do diminuto não resolve: o motor aponta. Ela desce por grau (Si♭ → Lá), como a de qualquer dominante." },
        { type: "callout", tone: "dica", title: "Os quatro nomes do diminuto", text: "C♯°7, E°7, G°7 e B♭°7 têm as mesmas notas. Escolha o nome pela nota que está no baixo e pelo acorde para onde ele resolve." },
      ],
    },
    {
      title: "3. Demonstração: onde cabe um diminuto de passagem",
      blocks: [
        { type: "list", ordered: true, items: [
          "Procure dois acordes cujas fundamentais estão a um tom de distância e em que o baixo pode subir por semitom (C – Dm, G – Am, F – G).",
          "Construa o diminuto sobre a nota um semitom abaixo da fundamental do acorde-alvo: para chegar a Dm, C♯°7 (C♯ – E – G – B♭).",
          "Confira a melodia no tempo do diminuto: ela precisa ser uma das quatro notas (C♯, E, G, B♭) ou uma nota de passagem curta.",
          "Resolva: a fundamental (C♯) sobe para D; a sétima diminuta (B♭) desce para A; as outras andam por grau ou ficam.",
          "Cuidado com quintas desiguais entre a melodia e o baixo (G/C♯ → A/D é 5ª diminuta → 5ª justa, que o estilo tradicional evita): no estilo popular, é aceita.",
        ] },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Sétima diminuta subindo", "dissonância sem resolução", "desce por grau"], ["Diminuto sob nota da melodia que não pertence a ele", "choque", "confira a melodia"], ["Baixo do diminuto saltando", "perde a função de passagem", "baixo cromático (C → C♯ → D)"], ["Diminutos em sequência demais", "perde-se a tonalidade", "um por frase"]] },
        { type: "list", items: ["Diminuto de passagem: baixo sobe por semitom entre dois acordes a um tom.", "É uma dominante sem fundamental (C♯°7 ≈ A7♭9).", "A sétima diminuta desce."] },
        {
          type: "challenge",
          title: "Um diminuto em 'Mar sereno'",
          task: "Na harmonia C – G | Am – ? | Dm – G7 | C de 'Mar sereno', escreva no lugar do '?' um diminuto de passagem que leve ao Dm, com o baixo cromático, e realize as quatro vozes no estilo popular.",
          start: EXD.marDimStart,
          constraints: ["A melodia não muda (o G4 do compasso 2 fica sobre o diminuto).", "Baixo A2 – ? – D3 com semitom antes do D.", "Estilo popular a cappella."],
          criteria: ["O G4 da melodia pertence ao diminuto.", "A sétima diminuta desce por grau.", "O motor só registra observações informativas."],
          hints: ["Que diminuto tem a fundamental um semitom abaixo de D? C♯°7 = C♯ – E – G – B♭.", "O G4 da melodia é a quinta diminuta do C♯°7: cabe.", "O B♭ pode ficar no tenor: E3 → B♭3 (salto) e depois B♭3 → A3 (resolução)."],
          solution: {
            score: EXD.marDim,
            commentary: "C – G | Am – C♯°7 | Dm – G7 | C, com baixo C3 – G2 | A2 – C♯3 | D3 – G2 | C3. O G4 da melodia é nota do C♯°7; o tenor salta E3 → B♭3 (a sétima diminuta) e desce para A3 no Dm; o contralto mantém E4 (nota comum entre Am e C♯°7) e sobe para F4. No estilo tradicional, o motor apontaria as quintas desiguais G4/C♯3 → A4/D3 entre soprano e baixo; no popular, a passagem é idiomática. Se o salto E3 → B♭3 (4ª aumentada) for difícil para o tenor do grupo, ensaie-o isolado ou leve o B♭ para outra voz que chegue a ele por grau.",
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-rearm-diminutos",
    title: "Verificação: diminutos",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["rdi-passagem"],
    staticItems: [
      { id: "rdi-passagem", kind: "choice", skill: "harmonia-funcional", prompt: "Entre Lá menor e Ré menor, qual diminuto faz o baixo andar por semitom até Ré?", options: [{ id: "a", label: "C♯°7" }, { id: "b", label: "B°7" }, { id: "c", label: "F°7" }], correctOptionId: "a", explanation: "Dó♯ é a sensível de Ré." },
      { id: "rdi-setima", kind: "choice", skill: "conducao-de-vozes", prompt: "Em C♯°7 → Dm, para onde vai o Si♭?", options: [{ id: "a", label: "Desce para Lá" }, { id: "b", label: "Sobe para Si" }, { id: "c", label: "Salta para Ré" }], correctOptionId: "a", explanation: "A sétima diminuta desce por grau." },
      { id: "rdi-nomes", kind: "choice", skill: "acordes", prompt: "Quantos diminutos com sétima diferentes existem (pelas notas)?", options: [{ id: "a", label: "Três" }, { id: "b", label: "Doze" }, { id: "c", label: "Sete" }], correctOptionId: "a", explanation: "Cada diminuto divide a oitava em terças menores; só há três conjuntos diferentes." },
    ],
    generators: [{ type: "seventh-identification", count: 3 }, { type: "reharm-choice", count: 1 }, { type: "voice-leading-error", count: 1, ruleIds: ["harmonia.resolucao-da-setima", "harmonia.resolucao-da-sensivel"] }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o diminuto de passagem.",
  application: { title: "Aplicação no Estúdio", steps: ["Ponha um C♯°7 entre Am e Dm em 'Luz da manhã'.", "Experimente um diminuto auxiliar sobre a tônica do primeiro compasso.", "Confira a resolução da sétima no motor."] },
};

export const lessonRearmBaixo: Lesson = {
  id: "rearm-baixo",
  title: "Rearmonizar a partir do baixo: linhas, pedal e contracanto",
  summary: "Desenhar primeiro a linha do baixo (ascendente, descendente, pedal) e depois escolher os acordes que acomodam melodia e baixo.",
  levelId: "s4",
  unitId: "s4-rea",
  status: "disponivel",
  prerequisites: ["rearm-diatonica"],
  estimatedMinutes: 55,
  competencies: ["harmonia-funcional", "contraponto"],
  objectives: [
    "Escrever uma linha de baixo em contraponto com a melodia e harmonizar a partir dela.",
    "Usar pedal com acordes por cima.",
    "Escolher o estilo de referência adequado para linhas com sensível no baixo.",
  ],
  sections: [
    {
      title: "1. Primeiro o baixo",
      blocks: [
        { type: "paragraph", text: "Em vez de escolher acordes nota a nota, desenhe primeiro uma linha de baixo que faça bom contraponto com a melodia (movimento contrário, terças e sextas). Depois, para cada par baixo + melodia, procure o acorde que contém as duas notas. É assim que nascem progressões como C – G/D – Am/E – Fmaj7." },
        { type: "example", score: EXR.baixoAscendente, verdict: "correto", caption: "Baixo subindo enquanto a melodia desce", commentary: "Dó – Ré – Mi – Fá – Fá♯ – Sol no baixo contra Mi – Ré – Dó – Mi – Ré – Si na melodia: movimento contrário quase o tempo todo. Os acordes (G/D, Am/E, Fmaj7, D7/F♯) saíram da linha." },
        { type: "listening", title: "Contraponto entre os extremos", score: EXR.baixoAscendente, instructions: ["Ouça soprano e baixo juntos.", "Ouça os quatro."], focus: [["S", "B"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "2. Pedal e a sensível no baixo",
      blocks: [
        { type: "example", score: EXR.pedal, verdict: "correto", caption: "Pedal de tônica", commentary: "O baixo fica em Dó do começo ao fim; por cima, Dm7/C, F/C e G7/C. O pedal deixa a harmonia andar sem perder o chão." },
        { type: "paragraph", text: "Linhas descendentes que passam pela sensível (Dó – Si – Lá) são naturais no estilo popular, mas no coral tradicional a sensível no baixo precisa subir. Escolha o estilo de referência antes de julgar o resultado." },
        { type: "example", score: EXR.diatonicaTradicional, verdict: "incorreto", caption: "Linha descendente no coral tradicional", commentary: "O motor aponta o Si do baixo descendo para Lá. No estilo popular, a mesma linha passa (veja a aula de substituições diatônicas)." },
      ],
    },
    {
      title: "3. Demonstração: do baixo aos acordes",
      blocks: [
        { type: "list", ordered: true, items: [
          "Escreva a melodia e, abaixo dela, um baixo em contraponto: onde ela desce, ele sobe; nos fins de frase, os dois convergem.",
          "Para cada par (nota do baixo, nota da melodia), liste os acordes que contêm as duas: C3 + C5 → C; D3 + B4 → G/D ou Bm7♭5/D; E3 + A4 → Am/E; F3 + G4 → G7/F ou Fmaj9…",
          "Escolha pelo caminho funcional e pela cor: um acorde com o baixo cromático (F♯ antes de G) pede uma dominante (D7/F♯).",
          "Escreva as vozes internas com notas comuns.",
          "Revise no estilo certo: no popular, inversões e baixos cromáticos são naturais.",
        ] },
        { type: "callout", tone: "dica", title: "Pedal", text: "O caminho oposto também é rearmonização: manter o baixo parado (pedal de tônica ou de dominante) e mover os acordes por cima. Funciona em introduções, finais e pontes, e dá ao coro um chão fácil de afinar." },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Baixo paralelo à melodia em 8ªs", "oitavas paralelas, perde-se uma linha", "movimento contrário"], ["Baixo bonito sem acorde possível", "choque com a melodia", "confira cada par antes de seguir"], ["Sensível no baixo descendo no estilo tradicional", "o motor aponta", "suba-a ou mude de estilo conscientemente"], ["Pedal longo demais sem mudança em cima", "estático", "mova as vozes superiores sobre o pedal"]] },
        { type: "list", items: ["Primeiro o baixo: contraponto com a melodia.", "O acorde nasce do par baixo + melodia.", "Pedal: baixo parado, harmonia andando."] },
        {
          type: "challenge",
          title: "Baixo primeiro em 'Mar sereno'",
          task: "Escreva primeiro um baixo que suba por grau (com um cromatismo) enquanto a melodia de 'Mar sereno' desce, e depois os acordes e as vozes internas, no estilo popular.",
          start: EXD.marBaixoStart,
          constraints: ["Baixo: C – D – E – F – F♯ – G – C (uma nota por mínima).", "Escolha acordes que contenham a nota do baixo e a da melodia.", "Estilo popular a cappella."],
          criteria: ["Cada acorde contém a nota do baixo e a da melodia.", "O F♯ do baixo funciona como sensível secundária do G.", "O motor só registra observações informativas."],
          hints: ["D3 + B4 → G/D; E3 + A4 → Am/E.", "F3 + G4: G7/F (sétima no baixo) ou Fmaj9. F♯3 + A4: D7/F♯ (A4 é a quinta).", "Com G7/F → D7/F♯, o F do baixo sobe cromaticamente em vez de descer — aceitável no estilo popular; se preferir, use Fmaj9 no lugar do G7/F."],
          solution: {
            score: EXD.marBaixo,
            commentary: "C – G/D | Am/E – Fmaj9 | D7/F♯ – G | C. O baixo sobe C – D – E – F – F♯ – G enquanto a melodia desce e depois sobe para a cadência; o F♯ (terça do D7) sobe para G como sensível secundária. Contralto E4 – D4 | C4 – E4 | F♯4 – D4 | E4 e tenor G3 – G3 | A3 – A3 | C4 – G3 | G3: notas comuns e graus. O motor cifra o F3 + G4 + A3 + E4 como IVM7 (Fmaj7 com a nona G na melodia) e só informa a sensível B4 descendo na melodia dada.",
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-rearm-baixo",
    title: "Verificação: rearmonizar a partir do baixo",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["rb-acorde"],
    staticItems: [
      { id: "rb-acorde", kind: "choice", skill: "harmonia-funcional", prompt: "Baixo em Mi e melodia em Dó: qual acorde contém as duas notas?", options: [{ id: "a", label: "Am/E (ou C/E)" }, { id: "b", label: "Em" }, { id: "c", label: "G/B" }], correctOptionId: "a", explanation: "Lá – Dó – Mi e Dó – Mi – Sol contêm Mi e Dó." },
      { id: "rb-contraponto", kind: "choice", skill: "contraponto", prompt: "Qual movimento entre baixo e melodia dá mais independência à rearmonização?", options: [{ id: "a", label: "Contrário" }, { id: "b", label: "Paralelo em oitavas" }, { id: "c", label: "Direto em quintas" }], correctOptionId: "a", explanation: "Movimento contrário mantém as vozes extremas independentes." },
      { id: "rb-pedal", kind: "choice", skill: "harmonia-funcional", prompt: "O que caracteriza o pedal?", options: [{ id: "a", label: "O baixo sustenta uma nota enquanto os acordes mudam por cima" }, { id: "b", label: "Todas as vozes sustentam a mesma nota" }, { id: "c", label: "O baixo canta a melodia" }], correctOptionId: "a", explanation: "O chão fica parado e a harmonia anda." },
    ],
    generators: [{ type: "motion-type", count: 3 }, { type: "realization", count: 2, mode: "baixo-dado" }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o acorde que contém baixo e melodia.",
  application: { title: "Aplicação no Estúdio", steps: ["Escreva primeiro uma linha de baixo em movimento contrário à melodia.", "Para cada par baixo + melodia, escolha o acorde.", "Escreva uma introdução com pedal de tônica."] },
};

export const lessonRearmNoArranjo: Lesson = {
  id: "rearm-no-arranjo",
  title: "Rearmonizar no arranjo vocal: onde, quanto e como escrever as vozes",
  summary: "Rearmonizar a repetição e não a primeira vez, guardar a ousadia para o clímax, manter notas comuns e vozes cantáveis e não exagerar.",
  levelId: "s4",
  unitId: "s4-rea",
  status: "disponivel",
  prerequisites: ["rearm-subv", "rearm-modal", "rearm-diminutos", "rearm-baixo"],
  estimatedMinutes: 60,
  competencies: ["arranjo", "conducao-de-vozes", "harmonia-funcional"],
  objectives: [
    "Planejar onde rearmonizar num arranjo (repetições, ponte, final).",
    "Escrever as vozes da rearmonização com notas comuns e graus conjuntos.",
    "Reconhecer o excesso: acordes demais e vozes impossíveis de cantar.",
  ],
  sections: [
    {
      title: "1. Onde rearmonizar",
      blocks: [
        { type: "paragraph", text: "A primeira vez que o ouvinte escuta a melodia, a harmonia simples ajuda a reconhecê-la. Na repetição, a rearmonização renova sem confundir. O mesmo vale para o último refrão e para a tag final: é ali que cabe a mudança mais ousada." },
        { type: "example", score: EXR.segundaVez, verdict: "correto", caption: "A primeira vez simples, a segunda rearmonizada", commentary: "Compassos 1–4: tônica e dominante. Compassos 5–8: a mesma melodia com dominantes secundárias (E7/G♯, A7/C♯) e baixo cromático. A respiração no compasso 4 separa as duas versões." },
        { type: "listening", title: "Compare as duas vezes", score: EXR.segundaVez, instructions: ["Ouça o baixo nas duas metades.", "Ouça os quatro e note onde a cor muda."], focus: [["B"], ["S", "A", "T", "B"]] },
        {
          type: "table",
          caption: "Plano de rearmonização numa canção",
          headers: ["Seção", "Quanto rearmonizar", "Técnicas"],
          rows: [
            ["1ª estrofe e refrão", "Nada ou pouco", "Harmonia da canção"],
            ["2ª estrofe", "Pouco", "Substituições diatônicas, inversões"],
            ["2º refrão", "Médio", "Dominantes secundárias, empréstimo modal"],
            ["Ponte / clímax", "Mais", "SubV, diminutos, modulação"],
            ["Final / tag", "Cor máxima", "iv menor, V7(♭9), pedal"],
          ],
        },
      ],
    },
    {
      title: "2. Como escrever as vozes (e quando parar)",
      blocks: [
        { type: "list", items: ["Mantenha as notas comuns entre os acordes na mesma voz.", "Mova as outras vozes por grau; deixe os saltos para o baixo.", "Resolva sensíveis e sétimas, também nos acordes emprestados.", "Um acorde novo por tempo forte já é muito em andamento rápido: o coro precisa ouvir para afinar.", "Rearmonize uma seção por vez e cante as vozes internas antes de seguir."] },
        { type: "example", score: EXR.excesso, verdict: "incorreto", caption: "Acordes demais", commentary: "Um acorde por tempo, com saltos nas vozes internas: o motor aponta paralelas, um trítono melódico no contralto e notas fora da tessitura. Mais acordes não é mais música; é mais difícil de cantar." },
        { type: "callout", tone: "atencao", title: "Antes de entregar", text: "Cante (ou toque) cada voz interna sozinha. Se uma voz não faz sentido melódico, a rearmonização ainda não está pronta para o coro." },
      ],
    },
    {
      title: "3. Demonstração: um plano de rearmonização para uma canção inteira",
      blocks: [
        { type: "paragraph", text: "Problema: uma canção A A B A (estrofe, estrofe, ponte, estrofe final) para coro SATB amador, estilo popular, seis ensaios. Onde e quanto rearmonizar?" },
        { type: "table", caption: "Plano e justificativa", headers: ["Seção", "Rearmonização", "Por quê"], rows: [["A (1ª)", "nenhuma", "o público precisa reconhecer a canção"], ["A (2ª)", "duas substituições diatônicas e um baixo descendente", "renova sem confundir; fácil de ensaiar"], ["B (ponte)", "uma dominante secundária e um empréstimo (iv)", "a ponte já é contraste: a harmonia acompanha"], ["A (final)", "dominantes secundárias com baixo cromático e um SubV na cadência", "o clímax harmônico do arranjo"], ["Tag", "iv6 – I com fermata", "cor de despedida"]] },
        { type: "list", ordered: true, items: ["Para cada seção rearmonizada, escreva primeiro as cifras sobre a melodia e confira as notas longas.", "Escreva o baixo e só então as vozes internas.", "Cante as vozes internas: se uma não fizer sentido sozinha, simplifique o acorde, não a voz.", "Teste com o grupo a seção mais difícil cedo, para ter tempo de recuar."] },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Efeito", "Correção"], rows: [["Rearmonizar a primeira apresentação da melodia", "o público não reconhece a canção", "comece simples"], ["Um acorde novo por tempo", "difícil de afinar e de ouvir", "mantenha o ritmo harmônico"], ["Técnicas demais na mesma seção", "efeito confuso", "uma ou duas por seção"], ["Vozes internas com saltos para caber nos acordes", "o coro não aprende", "notas comuns e graus; simplifique o acorde"]] },
        { type: "list", items: ["Onde: repetições, ponte, final.", "Quanto: crescente ao longo do arranjo.", "Como: baixo primeiro, vozes por notas comuns, cante tudo antes de entregar."] },
        {
          type: "challenge",
          title: "Plano para 'Mar sereno' em três vezes",
          task: "'Mar sereno' será cantada três vezes seguidas (forma A A A) por um coro SATB no estilo popular. Faça o plano de rearmonização das três vezes, usando técnicas desta disciplina, e indique as cifras de cada versão.",
          constraints: ["A melodia não muda.", "A 1ª vez com harmonia simples.", "Cada versão acrescenta no máximo duas técnicas novas."],
          criteria: ["Cada cifra contém a nota da melodia.", "A complexidade cresce da 1ª para a 3ª vez.", "Você indicou em que voz fica cada nota cromática nova."],
          hints: ["1ª vez: C – G | Am – C | Dm – G7 | C.", "2ª vez: técnicas diatônicas (baixo por grau, inversões) — veja a aula de substituições.", "3ª vez: diminuto de passagem antes do Dm e SubV na cadência."],
          solution: {
            commentary: "1ª vez: C – G | Am – C | Dm – G7 | C (tônica e dominante, mais Am e Dm). 2ª vez: C – G/D | Am/E – G7/F | Am/E – G/D | C (inversões, baixo em arco por grau). 3ª vez: C – G | Am – C♯°7 | Dm – D♭7 | C (diminuto de passagem, com o B♭ no tenor; SubV com o B4 da melodia como sétima e o baixo D♭ → C). Cada versão traz no máximo duas técnicas novas, e a mais ousada fica no fim.",
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-rearm-arranjo",
    title: "Verificação: rearmonização no arranjo",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["ra-onde"],
    staticItems: [
      { id: "ra-onde", kind: "choice", skill: "arranjo", prompt: "Onde a rearmonização costuma funcionar melhor num arranjo?", options: [{ id: "a", label: "Nas repetições, na ponte e no final" }, { id: "b", label: "Na primeira apresentação da melodia" }, { id: "c", label: "Em todos os compassos" }], correctOptionId: "a", explanation: "A primeira vez apresenta a canção; as seguintes renovam." },
      { id: "ra-comuns", kind: "choice", skill: "conducao-de-vozes", prompt: "Ao trocar um acorde, o que fazer com as notas em comum?", options: [{ id: "a", label: "Mantê-las na mesma voz" }, { id: "b", label: "Trocá-las de voz" }, { id: "c", label: "Omiti-las" }], correctOptionId: "a", explanation: "Notas comuns paradas dão estabilidade e facilitam a afinação." },
      { id: "ra-excesso", kind: "choice", skill: "arranjo", prompt: "Qual é o sinal de rearmonização exagerada?", options: [{ id: "a", label: "Vozes internas com saltos e acordes demais para o andamento" }, { id: "b", label: "Uma dominante secundária no segundo refrão" }, { id: "c", label: "Um iv menor no final" }], correctOptionId: "a", explanation: "Se o coro não consegue cantar e afinar, a harmonia virou obstáculo." },
    ],
    generators: [{ type: "reharm-choice", count: 3 }, { type: "voice-leading-error", count: 2, ruleIds: ["conducao.paralelas", "harmonia.resolucao-da-setima"] }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo onde rearmonizar.",
  application: {
    title: "Projeto: rearmonizar o segundo refrão",
    steps: ["Abra Projetos → 'Rearmonização do segundo refrão'.", "Mantenha a primeira vez como está e rearmonize a repetição com pelo menos três técnicas da disciplina.", "Cante as vozes internas, revise no motor e avalie com a rubrica."],
  },
};
