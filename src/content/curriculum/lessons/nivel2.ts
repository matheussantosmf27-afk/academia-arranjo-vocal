import { CHORALE_TTBB_G } from "@/domain/music/examples";
import { EX } from "../examples";
import type { Lesson } from "../types";

export const lessonMovimentos: Lesson = {
  id: "movimentos",
  title: "Movimentos entre vozes",
  summary: "Paralelo, direto, contrário e oblíquo: a base da independência das linhas e do 'menor movimento'.",
  levelId: "n2",
  unitId: "n2-u1",
  status: "disponivel",
  prerequisites: ["cadencias"],
  estimatedMinutes: 45,
  competencies: ["conducao-de-vozes", "percepcao"],
  objectives: [
    "Classificar o movimento entre duas vozes (paralelo, direto, contrário, oblíquo), com pelo menos 80% de acerto.",
    "Aplicar o princípio do menor movimento: manter notas comuns e mover as demais por grau.",
    "Usar o movimento contrário entre as vozes extremas para garantir independência.",
  ],
  sections: [
    {
      title: "1. Quatro movimentos",
      blocks: [
        { type: "table", caption: "Movimentos relativos", headers: ["Movimento", "Definição", "Efeito"], rows: [["Paralelo", "mesma direção, mesmo intervalo", "fusão; perigoso com 5ªs e 8ªs"], ["Direto (semelhante)", "mesma direção, intervalos diferentes", "neutro; atenção nas vozes extremas"], ["Contrário", "direções opostas", "máxima independência"], ["Oblíquo", "uma voz parada, outra se move", "estabilidade; notas comuns"]] },
        { type: "paragraph", text: "Num coral bem conduzido, o soprano e o baixo se movem frequentemente em movimento contrário, enquanto contralto e tenor mantêm notas comuns e andam por grau — o 'menor movimento'." },
      ],
    },
    {
      title: "2. O menor movimento na prática",
      blocks: [
        { type: "example", score: EX.paralelasCorrigidas, verdict: "correto", caption: "I → ii⁶: baixo sobe, vozes superiores descem", commentary: "Movimento contrário entre o baixo e as demais vozes: nenhuma consonância perfeita em paralelo." },
        { type: "example", score: EX.paralelas, verdict: "incorreto", caption: "I → ii com todas as vozes subindo", commentary: "Movimento paralelo geral: o motor aponta 5ªs (soprano–baixo, soprano–tenor) e 8ªs (tenor–baixo)." },
        { type: "listening", title: "Escute as linhas extremas", score: EX.paralelasCorrigidas, instructions: ["Ouça soprano + baixo: uma linha desce, a outra sobe.", "Compare com a versão paralela."], focus: [["S", "B"]] },
      ],
    },
  ],
  exercises: {
    id: "ex-movimentos",
    title: "Verificação: movimentos",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["mov-menor"],
    staticItems: [
      { id: "mov-menor", kind: "choice", skill: "conducao-de-vozes", prompt: "O que diz o princípio do menor movimento?", options: [{ id: "a", label: "Manter notas comuns e mover as outras vozes pela menor distância" }, { id: "b", label: "Mover todas as vozes na mesma direção" }, { id: "c", label: "Saltar sempre para a nota mais aguda disponível" }], correctOptionId: "a", explanation: "Notas comuns e graus conjuntos tornam as linhas internas cantáveis e evitam paralelismos." },
    ],
    generators: [{ type: "motion-type", count: 8 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo o princípio do menor movimento.",
  application: { title: "Aplicação no Estúdio", steps: ["Abra o exemplo 'I → ii com quintas e oitavas paralelas'.", "Corrija mudando apenas o baixo e uma voz interna até o motor não acusar paralelas.", "Ouça soprano + baixo antes e depois."] },
};

export const lessonParalelas: Lesson = {
  id: "paralelas",
  title: "Quintas e oitavas paralelas, diretas e por contrário",
  summary: "Por que a prática comum evita paralelismos, as exceções reconhecidas e o paralelismo como recurso em outros estilos.",
  levelId: "n2",
  unitId: "n2-u1",
  status: "disponivel",
  prerequisites: ["movimentos"],
  estimatedMinutes: 60,
  competencies: ["conducao-de-vozes", "escrita-satb"],
  objectives: [
    "Detectar quintas e oitavas paralelas, inclusive compostas, entre quaisquer duas vozes.",
    "Distinguir paralelas, diretas (ocultas) e por movimento contrário, e as exceções de cada uma.",
    "Explicar por que o mesmo trecho é erro no coral tradicional e escolha estética no popular.",
  ],
  sections: [
    {
      title: "1. Paralelas",
      blocks: [
        { type: "paragraph", text: "Quintas e oitavas justas são as consonâncias mais fundidas. Em movimento paralelo, duas vozes soam como uma só, e o coro perde uma linha real. Valem também as compostas (12ª, 15ª): o que importa é a classe do intervalo." },
        { type: "example", score: EX.paralelas, verdict: "incorreto", caption: "Paralelas no estilo tradicional", commentary: "Três pares de vozes em paralelo. No estilo tradicional, gravidade 'erro'." },
        { type: "example", score: EX.paralelasCorrigidas, verdict: "correto", caption: "A correção: movimento contrário no baixo", commentary: "O baixo sobe para F (ii⁶) enquanto as vozes superiores descem: nenhuma consonância perfeita se repete." },
        { type: "example", score: EX.paralelasPopular, verdict: "observacao", caption: "O mesmo trecho no estilo popular", commentary: "O fato musical é o mesmo e o motor continua registrando, mas como sugestão: em arranjos populares, blocos paralelos são textura deliberada." },
      ],
    },
    {
      title: "2. Diretas e por contrário",
      blocks: [
        { type: "paragraph", text: "Quintas ou oitavas diretas (ocultas): as vozes extremas chegam a uma consonância perfeita por movimento direto. São evitadas quando o soprano salta; aceitas quando ele se move por grau. Já duas consonâncias perfeitas seguidas em movimento contrário (5ª → 12ª) também enfraquecem a independência — exceto, segundo muitos autores, na cadência final." },
        { type: "example", score: EX.diretas, verdict: "incorreto", caption: "Oitavas diretas com salto no soprano", commentary: "E5 → G4 (6ª descendente) enquanto o baixo desce para G2: o ouvido 'completa' a oitava paralela. O motor também nota a terça dobrada no primeiro acorde." },
        { type: "callout", tone: "dica", title: "Quintas desiguais", text: "5ª justa → 5ª diminuta é aceita (o trítono resolve depois). 5ª diminuta → 5ª justa envolvendo o baixo é evitada." },
        { type: "listening", title: "Ouça a fusão das paralelas", score: EX.paralelas, instructions: ["Ouça tenor + baixo: as duas linhas soam como uma linha dobrada.", "Ouça o conjunto e tente seguir o tenor."], focus: [["T", "B"], ["S", "A", "T", "B"]] },
      ],
    },
  ],
  exercises: {
    id: "ex-paralelas",
    title: "Verificação: paralelas",
    instructions: "Identifique o problema de cada trecho. Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["par-composta"],
    staticItems: [
      { id: "par-composta", kind: "choice", skill: "conducao-de-vozes", prompt: "Soprano e baixo vão de 12ª justa para 12ª justa, ambos subindo. Isso é…", options: [{ id: "a", label: "Quintas paralelas (compostas)" }, { id: "b", label: "Aceitável, pois são 12ªs" }, { id: "c", label: "Oitavas diretas" }], correctOptionId: "a", explanation: "12ª = 8ª + 5ª. A classe do intervalo é a 5ª justa." },
      { id: "par-excecao", kind: "choice", skill: "conducao-de-vozes", prompt: "Quando as oitavas diretas nas vozes extremas são aceitas?", options: [{ id: "a", label: "Quando o soprano se move por grau conjunto" }, { id: "b", label: "Sempre" }, { id: "c", label: "Quando o baixo se move por grau" }], correctOptionId: "a", explanation: "A exceção clássica: soprano por grau (ex.: cadência V–I com 2–1 no soprano)." },
    ],
    generators: [{ type: "voice-leading-error", count: 6 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo paralelas compostas.",
  application: { title: "Aplicação no Estúdio", steps: ["Abra o exemplo de paralelas e mude o estilo de referência para 'Popular a cappella': compare gravidades.", "Volte ao tradicional e corrija o trecho.", "Escreva uma nota no campo de notas do arranjo justificando quando usaria paralelas de propósito."] },
};

export const lessonEspacamento: Lesson = {
  id: "espacamento-cruzamento",
  title: "Espaçamento, cruzamento e sobreposição",
  summary: "Distâncias entre vozes, limites graves de intervalo e cruzamentos intencionais na escrita masculina.",
  levelId: "n2",
  unitId: "n2-u1",
  status: "disponivel",
  prerequisites: ["movimentos"],
  estimatedMinutes: 45,
  competencies: ["conducao-de-vozes", "escrita-satb", "escrita-ttbb"],
  objectives: [
    "Aplicar os limites de espaçamento entre vozes adjacentes em SATB e TTBB.",
    "Usar os limites graves de intervalo para evitar acordes embolados, especialmente em TTBB.",
    "Distinguir cruzamento e sobreposição e decidir quando são aceitáveis.",
  ],
  sections: [
    {
      title: "1. Espaçamento",
      blocks: [
        { type: "paragraph", text: "Entre vozes superiores adjacentes, no máximo uma oitava; entre tenor e baixo, até uma 12ª. A lógica é a da série harmônica: intervalos largos embaixo, estreitos em cima." },
        { type: "example", score: EX.espacamento, verdict: "incorreto", caption: "Soprano isolado no agudo", commentary: "E5–C4 entre soprano e contralto: mais de uma oitava, um 'buraco' no acorde." },
      ],
    },
    {
      title: "2. Limites graves de intervalo",
      blocks: [
        { type: "paragraph", text: "No grave, intervalos pequenos embolam: a terça maior não deve ficar abaixo de B♭2, a terça menor abaixo de C3, a segunda abaixo de E♭3. Em TTBB isso é decisivo: barítono e baixo vivem nessa região." },
        { type: "example", score: EX.ttbbGrave, verdict: "observacao", caption: "Terça maior G2–B2", commentary: "Recomendação, não erro: o acorde soa turvo." },
        { type: "example", score: EX.ttbbGraveCorrigido, verdict: "correto", caption: "Quinta no grave, terça nos tenores", commentary: "G2–D3 (5ª) embaixo; a terça B3 vai para o Tenor II. Mesmo acorde, muito mais claro." },
      ],
    },
    {
      title: "3. Cruzamento e sobreposição",
      blocks: [
        { type: "paragraph", text: "Cruzamento: uma voz soa abaixo da vizinha inferior. Sobreposição: uma voz ultrapassa a nota anterior da vizinha. Ambos confundem o ouvido sobre qual linha é qual. Em TTBB e barbershop, o barítono acima do Tenor II é recurso comum; o motor reduz a gravidade nesses estilos." },
        { type: "example", score: EX.cruzamento, verdict: "incorreto", caption: "Soprano abaixo do contralto", commentary: "No estilo tradicional, alerta; no popular, observação." },
        { type: "example", score: CHORALE_TTBB_G, verdict: "correto", caption: "TTBB bem espaçado", commentary: "Vozes próximas em cima, quinta e oitava no grave." },
        { type: "listening", title: "Clareza no grave", score: EX.ttbbGraveCorrigido, instructions: ["Ouça barítono + baixo.", "Compare com a versão em terça maior grave."], focus: [["B1", "B2"]] },
      ],
    },
  ],
  exercises: {
    id: "ex-espacamento",
    title: "Verificação: espaçamento",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["esp-limite"],
    staticItems: [
      { id: "esp-limite", kind: "choice", skill: "escrita-ttbb", prompt: "Em TTBB, o baixo está em G2 e o barítono em B2. O que fazer?", options: [{ id: "a", label: "Abrir o intervalo (ex.: barítono em D3) e levar a terça para um tenor" }, { id: "b", label: "Nada, é a melhor disposição" }, { id: "c", label: "Descer o barítono para G2" }], correctOptionId: "a", explanation: "3ª maior abaixo de B♭2 embola; quinta no grave e terça em cima soa clara." },
      { id: "esp-tb", kind: "choice", skill: "escrita-satb", prompt: "Qual é o espaçamento máximo usual entre tenor e baixo em SATB?", options: [{ id: "a", label: "Uma oitava" }, { id: "b", label: "Uma 12ª" }, { id: "c", label: "Duas oitavas" }], correctOptionId: "b", explanation: "Entre as vozes graves admite-se distância maior (até a 12ª)." },
    ],
    generators: [{ type: "voice-leading-error", count: 4, ruleIds: ["vozes.espacamento", "vozes.cruzamento", "conducao.paralelas", "harmonia.sensivel-dobrada"] }, { type: "range-check", count: 3 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo limites graves.",
  application: { title: "Aplicação no Estúdio", steps: ["Abra o exemplo TTBB e desça o barítono do I final para B2: leia o diagnóstico de limite grave.", "Corrija redistribuindo a terça para um tenor.", "Teste o estilo 'Popular a cappella' e veja como muda a gravidade do cruzamento."] },
};

export const lessonDuplicacoes: Lesson = {
  id: "duplicacoes",
  title: "Duplicações e omissões",
  summary: "Que nota dobrar em cada acorde, quando omitir a quinta e por que a escrita coral tradicional evita dobrar a sensível.",
  levelId: "n2",
  unitId: "n2-u1",
  status: "disponivel",
  prerequisites: ["paralelas"],
  estimatedMinutes: 45,
  competencies: ["conducao-de-vozes", "acordes"],
  objectives: [
    "Escolher a duplicação adequada conforme o acorde, a inversão e o contexto.",
    "Explicar por que a sensível e a sétima não são dobradas na escrita coral tradicional, e corrigir um acorde em que estejam.",
    "Reconhecer quando dobrar a terça é preferível (vi após V).",
  ],
  sections: [
    {
      title: "1. Regras práticas",
      blocks: [
        { type: "list", ordered: true, items: ["Estado fundamental: dobre a fundamental.", "1ª inversão: dobre a fundamental ou a quinta; o baixo só se não for a sensível.", "2ª inversão: dobre o baixo (a quinta).", "Não dobre a sensível quando ela age como sensível (V, V7, vii°) nem a sétima de um acorde de sétima: as duas notas tendem a resolver na mesma direção e geram oitavas paralelas.", "Omita a quinta quando necessário; a terça quase nunca (sem ela o acorde perde o modo).", "Em vi depois de V (cadência de engano), dobre a terça."] },
        { type: "example", score: EX.sensivelDobrada, verdict: "incorreto", caption: "V com a sensível dobrada", commentary: "Erro no estilo tradicional: as duas sensíveis gerariam oitavas paralelas ao resolver." },
        { type: "callout", tone: "atencao", title: "Regra didática, convenção e exceção", text: "Estas são convenções da escrita coral tradicional (prática comum), ensinadas como regra porque evitam os problemas mais frequentes de quem começa. Há exceções conhecidas: numa sequência, a sensível pode aparecer dobrada num acorde que não é dominante; no pop e no gospel, blocos em oitavas são recurso de estilo. Quem foge da regra precisa saber por quê, e a aula do estilo diz quando." },
        { type: "example", score: EX.tercaDobrada, verdict: "observacao", caption: "I com a terça dobrada", commentary: "Recomendação: num acorde maior em estado fundamental, a terça dobrada fica proeminente." },
        { type: "example", score: EX.cadEngano, verdict: "correto", caption: "vi com terça dobrada após V", commentary: "Aqui a terça dobrada é a solução recomendada — o motor reconhece a exceção." },
        { type: "listening", title: "Peso da terça", score: EX.tercaDobrada, instructions: ["Ouça o acorde e depois apenas soprano + tenor (as duas terças)."], focus: [["S", "T"], ["S", "A", "T", "B"]] },
      ],
    },
  ],
  exercises: {
    id: "ex-duplicacoes",
    title: "Verificação: duplicações",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["dup-sensivel"],
    staticItems: [
      { id: "dup-sensivel", kind: "choice", skill: "conducao-de-vozes", prompt: "Por que não se dobra a sensível no V?", options: [{ id: "a", label: "Ao resolver, as duas vozes subiriam juntas à tônica: oitavas paralelas" }, { id: "b", label: "Porque soa grave demais" }, { id: "c", label: "Porque a sensível não pertence ao acorde" }], correctOptionId: "a", explanation: "A sensível tem tendência obrigatória; dobrada, ou produz oitavas, ou uma das vozes contraria a tendência." },
      { id: "dup-64", kind: "choice", skill: "acordes", prompt: "No I⁶₄ cadencial, que nota se dobra?", options: [{ id: "a", label: "O baixo (a quinta do acorde)" }, { id: "b", label: "A terça" }, { id: "c", label: "Nenhuma" }], correctOptionId: "a", explanation: "Na 2ª inversão dobra-se o baixo, que no ⁶₄ cadencial é a futura fundamental do V." },
    ],
    generators: [{ type: "chord-identification", count: 4 }, { type: "voice-leading-error", count: 3, ruleIds: ["harmonia.sensivel-dobrada", "conducao.paralelas", "vozes.espacamento"] }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a sensível dobrada.",
  application: { title: "Aplicação no Estúdio", steps: ["Crie um V → vi em SATB e escreva-o primeiro com a fundamental dobrada no vi, depois com a terça.", "Compare os diagnósticos de condução das duas versões."] },
};

export const lessonNotasEstranhas: Lesson = {
  id: "notas-estranhas",
  title: "Notas estranhas ao acorde",
  summary: "Passagem, bordadura, retardo, apojatura, escapada e antecipação: dissonância preparada e resolvida.",
  levelId: "n2",
  unitId: "n2-u2",
  status: "disponivel",
  prerequisites: ["duplicacoes"],
  estimatedMinutes: 65,
  competencies: ["conducao-de-vozes", "contraponto", "percepcao"],
  objectives: [
    "Classificar notas estranhas pelo modo como chegam e saem e pela posição métrica, com pelo menos 80% de acerto.",
    "Escrever retardos 4–3, 7–6 e 9–8 com preparação, dissonância e resolução.",
    "Reconhecer dissonâncias sem tratamento e corrigi-las.",
  ],
  sections: [
    {
      title: "1. Como o motor (e o analista) enxerga uma nota estranha",
      blocks: [
        { type: "paragraph", text: "Uma nota estranha não pertence ao acorde que soa. Para classificá-la, olhe três coisas: como ela chega (grau ou salto, ou preparada na mesma voz), como sai (grau ou salto, em que direção) e se cai em tempo forte ou fraco." },
        { type: "table", caption: "Classificação", headers: ["Tipo", "Chegada", "Saída", "Tempo"], rows: [["Passagem", "grau", "grau, mesma direção", "geralmente fraco"], ["Bordadura", "grau", "grau, volta", "geralmente fraco"], ["Retardo", "preparada (mesma nota)", "grau descendente", "forte"], ["Apojatura", "salto", "grau", "geralmente forte"], ["Escapada", "grau", "salto, direção oposta", "fraco"], ["Antecipação", "qualquer", "mesma nota (do acorde seguinte)", "fraco"]] },
      ],
    },
    {
      title: "2. Exemplos",
      blocks: [
        { type: "example", score: EX.passagem, verdict: "correto", caption: "Passagens", commentary: "A4 e B4 ligam G4 e C5 por grau sobre o acorde de Dó. O motor descreve como observação — não é erro." },
        { type: "example", score: EX.bordadura, verdict: "correto", caption: "Bordadura", commentary: "C5–D5–C5: sai e volta por grau." },
        { type: "example", score: EX.retardo, verdict: "correto", caption: "Retardo 9–8", commentary: "D5 é preparado no V, mantido sobre o I (9ª com o baixo) e resolve em C5 (8ª)." },
        { type: "example", score: EX.apojatura, verdict: "correto", caption: "Apojatura", commentary: "D5 chega por salto no tempo forte e resolve por grau." },
        { type: "example", score: EX.dissonanciaLivre, verdict: "incorreto", caption: "Dissonância sem tratamento", commentary: "F5 chega e sai por salto: não é preparada nem resolvida. No estilo tradicional, alerta." },
        { type: "listening", title: "Ouça o retardo", score: EX.retardo, instructions: ["Ouça soprano + baixo: sinta a tensão da 9ª e o alívio da 8ª."], focus: [["S", "B"], ["S", "A", "T", "B"]] },
      ],
    },
  ],
  exercises: {
    id: "ex-nct",
    title: "Verificação: notas estranhas",
    instructions: "Classifique as notas estranhas. Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["nct-retardo"],
    staticItems: [
      { id: "nct-retardo", kind: "choice", skill: "conducao-de-vozes", prompt: "Quais são as três etapas de um retardo?", options: [{ id: "a", label: "Preparação, dissonância, resolução" }, { id: "b", label: "Salto, dissonância, salto" }, { id: "c", label: "Antecipação, passagem, resolução" }], correctOptionId: "a", explanation: "A nota é consonante no acorde anterior (preparação), torna-se dissonante quando a harmonia muda e resolve por grau, geralmente descendente." },
    ],
    generators: [{ type: "nct-identification", count: 6 }, { type: "motion-type", count: 2 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo as etapas do retardo.",
  application: { title: "Aplicação no Estúdio", steps: ["No coral SATB, transforme uma nota do soprano em semínima seguida de nota de passagem (use Dividir e ↑/↓).", "Verifique a classificação do motor na lista de diagnósticos (observações).", "Escreva um retardo 4–3 no V do compasso 2."] },
};

export const lessonSetimas: Lesson = {
  id: "setimas-resolucao",
  title: "Dissonância e resolução das sétimas",
  summary: "V7, vii°7 e sétimas diatônicas: preparação, resolução e exceções reconhecidas.",
  levelId: "n2",
  unitId: "n2-u2",
  status: "disponivel",
  prerequisites: ["notas-estranhas"],
  estimatedMinutes: 50,
  competencies: ["conducao-de-vozes", "harmonia-funcional"],
  objectives: [
    "Resolver a sétima de qualquer acorde de sétima descendo por grau.",
    "Resolver o trítono do V7 (sensível e sétima) para dentro ou para fora conforme a inversão.",
    "Reconhecer a exceção V⁴₃ → I⁶ e a resolução adiada.",
  ],
  sections: [
    {
      title: "1. Resolução",
      blocks: [
        { type: "example", score: EX.v7I, verdict: "correto", caption: "V7 → I", commentary: "Sétima desce, sensível sobe: o trítono F–B resolve em E–C." },
        { type: "example", score: EX.setimaSobe, verdict: "incorreto", caption: "Sétima subindo", commentary: "O motor exige a resolução descendente no estilo tradicional." },
        { type: "example", score: EX.v43I6, verdict: "correto", caption: "V⁴₃ → I⁶", commentary: "A sétima sobe acompanhando o baixo em décimas — exceção registrada como observação." },
        { type: "callout", tone: "dica", title: "Resolução adiada", text: "Se o acorde de sétima se mantém (mesma harmonia), a sétima pode esperar. O motor só cobra a resolução quando a harmonia muda." },
        { type: "listening", title: "O trítono resolvendo", score: EX.v7I, instructions: ["Ouça contralto + tenor."], focus: [["A", "T"]] },
      ],
    },
  ],
  exercises: {
    id: "ex-setimas",
    title: "Verificação: sétimas",
    instructions: "Domínio: 80% e o item essencial.",
    minScore: 0.8,
    requiredItemIds: ["set-tritono"],
    staticItems: [
      { id: "set-tritono", kind: "choice", skill: "conducao-de-vozes", prompt: "No V7 de Dó maior em estado fundamental, como resolve o trítono B–F?", options: [{ id: "a", label: "B sobe para C e F desce para E" }, { id: "b", label: "Ambos sobem" }, { id: "c", label: "B desce para G e F sobe para G" }], correctOptionId: "a", explanation: "Sensível sobe, sétima desce: a 5ª diminuta resolve para dentro, numa 3ª." },
    ],
    generators: [{ type: "seventh-identification", count: 4 }, { type: "voice-leading-error", count: 3, ruleIds: ["harmonia.resolucao-da-setima", "harmonia.resolucao-da-sensivel", "harmonia.sensivel-dobrada"] }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo a resolução do trítono.",
  application: { title: "Aplicação no Estúdio", steps: ["Escreva ii⁶₅ → V7 → I em Dó maior.", "Confirme que a sétima do ii⁶₅ é preparada e resolve; idem a do V7.", "Toque com o timbre de vogal 'a' e observe a tensão de cada sétima."] },
};
