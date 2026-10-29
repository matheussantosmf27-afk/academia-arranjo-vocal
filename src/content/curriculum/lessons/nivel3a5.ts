import { CHORALE_SATB_C, CHORALE_TTBB_G } from "@/domain/music/examples";
import { REVISION_LEVELS } from "../didactics";
import { EX } from "../examples";
import { EXD } from "../examples-didatica";
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
    {
      title: "2. Demonstração: a análise completa de uma melodia curta",
      blocks: [
        { type: "paragraph", text: "Vamos aplicar os quatro passos à 'Canção do Caminho' (E4 G4 A4 G4 | C5 G4 | A4 C5 B4 | C5), em Dó maior, 4/4." },
        { type: "table", caption: "Análise compasso a compasso", headers: ["Compasso", "Notas estruturais (tempos 1 e 3)", "Notas de passagem/ornamento", "Função implícita"], rows: [["1", "E4, A4", "G4 (tempo 2), G4 (tempo 4)", "tônica (E e G pertencem ao I; A4 é bordadura de G4)"], ["2", "C5 (ponto culminante), G4", "—", "C5 sustentado: I ou vi; G4: I"], ["3", "A4, B4", "C5 (tempo 2)", "A4 pede IV ou vi; B4 longo pede V"], ["4", "C5", "—", "tônica: cadência autêntica implícita (B4 → C5)"]] },
        { type: "list", ordered: true, items: ["Frase: uma só, de quatro compassos, com respiração no fim (pausa de semínima).", "Ponto culminante: C5, no 1º tempo do compasso 2 — cedo, mas repetido como nota final, o que dá unidade.", "Cadência implícita: 7 → 1 no soprano (B4 → C5), com a sensível longa no compasso 3: autêntica.", "Cantabilidade: âmbito de 6ª menor (E4–C5), saltos de 3ª e 4ª compensados por grau; nenhuma nota fora da tessitura do soprano."] },
        { type: "callout", tone: "dica", title: "Por que isso economiza tempo", text: "Com esta tabela pronta, a harmonização já está meio decidida: os acordes só mudam nos tempos 1 e 3, o compasso 3 prepara a cadência e o compasso 4 é tônica. As notas de passagem não recebem acorde próprio." },
      ],
    },
    {
      title: "3. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Consequência", "Correção"], rows: [["Dar um acorde a cada nota", "harmonia agitada, vozes internas saltando", "harmonize só as notas estruturais"], ["Ignorar a respiração", "frase musical cortando a frase do texto", "marque as respirações antes de tudo"], ["Confundir ponto culminante com nota mais longa", "clímax harmônico no lugar errado", "o culminante é a nota mais aguda da frase"], ["Não perceber a cadência implícita", "harmonia que contradiz o final da melodia", "pergunte: a frase termina em 1/3 (conclusiva) ou em 2/5/7 (suspensiva)?"]] },
        { type: "list", items: ["Leia a melodia antes de harmonizar: frases, culminante, notas estruturais, cadências.", "Final em 1 ou 3 sugere conclusão; em 2, 5 ou 7, suspensão.", "Saltos grandes pedem compensação por grau na direção oposta."] },
        {
          type: "challenge",
          title: "Analise antes de harmonizar",
          task: "Analise a melodia abaixo (Dó maior): marque a frase, o ponto culminante, as notas estruturais de cada compasso, a cadência implícita no final e um ponto de atenção para a cantabilidade.",
          start: EXD.amStart,
          constraints: ["Considere estruturais as notas dos tempos 1 e 3.", "Use os graus da escala para justificar a cadência."],
          criteria: ["A cadência implícita está justificada pelo grau final do soprano.", "O ponto culminante foi localizado (nota e compasso).", "Você identificou pelo menos um salto e disse se ele é compensado."],
          hints: ["Em que grau a melodia termina? D5, em nota longa.", "O 2º grau sustentado no fim sugere qual acorde e qual cadência?", "Olhe o salto C5 → E5 no compasso 3: o que vem depois dele?"],
          solution: {
            commentary: "Uma frase de quatro compassos, sem respiração interna. Notas estruturais: G4 e B4 (c. 1), C5 e B4 (c. 2), A4 e C5 (c. 3), D5 (c. 4). Ponto culminante: E5, no 4º tempo do compasso 3, uma nota de passagem curta que leva ao D5 final. Final em D5 (2º grau) sustentado: semicadência implícita (V). É uma frase 'pergunta', que pede uma segunda frase de resposta. Cantabilidade: o salto C5 → E5 (3ª) é compensado pela descida por grau para D5; âmbito G4–E5 (6ª maior), dentro da tessitura do soprano.",
            alternatives: ["Também é razoável ler o compasso 3 com A4 e C5 como partes de um IV (F–A–C), preparando o V do final: a análise das funções pode variar; o grau final (2 → V) não."],
          },
        },
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
      title: "1. Antes de escrever: ler a melodia",
      blocks: [
        { type: "paragraph", text: "Harmonizar não é procurar 'um acorde que caiba' em cada nota. É decidir onde a música repousa, por onde passa e com que velocidade os acordes mudam. Por isso o trabalho começa pela melodia — com as ferramentas da aula de análise melódica — e não pela pauta do baixo." },
        { type: "list", ordered: true, items: ["Marque as frases e as respirações.", "Decida a cadência de cada fim de frase (o grau final do soprano sugere: 1 ou 3 → autêntica; 2, 5 ou 7 sustentados → semicadência).", "Separe notas estruturais (tempos fortes, notas longas) de notas de passagem: só as estruturais recebem acorde próprio.", "Defina o ritmo harmônico: aqui, um acorde por mínima; em hinos rápidos, um por compasso."] },
        { type: "table", caption: "Que acordes contêm cada grau do soprano (modo maior)", headers: ["Grau no soprano", "Acordes que o contêm", "Observação"], rows: [["1", "I, IV, vi", "I no início e no fim; IV e vi no meio da frase"], ["2", "V, ii, vii°", "V na semicadência; ii prepara o V"], ["3", "I, vi, iii", "iii é raro como acorde próprio em escrita coral"], ["4", "IV, ii, V7 (como sétima)", "como sétima do V7, desce para 3"], ["5", "I, V, iii", "I⁶₄ cadencial quando o baixo é a dominante"], ["6", "IV, ii, vi", "ii⁶ e IV dão baixo ativo antes do V"], ["7", "V, vii°, iii", "a sensível sobe para 1 no soprano"]] },
      ],
    },
    {
      title: "2. Demonstração passo a passo",
      blocks: [
        { type: "paragraph", text: "Problema: harmonizar a melodia abaixo (Sol maior, quatro compassos, uma frase que termina na tônica) para SATB no estilo coral tradicional." },
        { type: "example", score: EXD.harmDemoStart, verdict: "correto", caption: "Passo 1: a melodia dada", commentary: "Graus 3–2 | 1–4 | 3–2 | 1. A frase termina em 1, em nota longa e tempo forte: cadência autêntica perfeita. O C5 do 2º compasso é o ponto culminante." },
        { type: "table", caption: "Passo 2: plano de acordes, com a razão de cada escolha e a alternativa descartada", headers: ["Soprano", "Acorde escolhido", "Por quê", "Alternativa e por que não"], rows: [["B4 (3)", "I", "começo afirma a tonalidade", "vi (Mi menor): começaria fora da tônica"], ["A4 (2)", "V⁶ (baixo F♯)", "baixo sobe-desce G–F♯–G, linha por grau", "V em estado fundamental: baixo saltaria G3 → D3 → G3"], ["G4 (1)", "I", "a sensível do baixo resolve", "vi: possível, mas o baixo F♯ → E não resolveria a sensível"], ["C5 (4)", "IV⁶ (baixo E)", "baixo desce por grau em direção à cadência", "IV com baixo C3: 8ª G4/G3 → 15ª C5/C3 por movimento contrário no meio da frase"], ["B4 (3)", "I⁶₄ cadencial (baixo D)", "prepara a cadência e prolonga o V", "I com baixo G: interromperia o baixo E → D"], ["A4 (2)", "V", "6–5 e 4–3 sobre o baixo parado", "V7 também é correto (contralto D4 → C4 → B3, sétima preparada e resolvida); o V simples deixa o 4–3 do tenor em primeiro plano"], ["G4 (1)", "I", "autêntica perfeita", "—"]] },
        { type: "example", score: EXD.harmDemoSB, verdict: "observacao", caption: "Passo 3: o esqueleto soprano–baixo", commentary: "Antes das vozes internas, confira só soprano e baixo: movimento contrário no início e no fim, nenhuma 5ª ou 8ª paralela entre eles. O motor, ouvindo só duas notas por vez, ainda não sabe que acordes você quis (cifra vii, iii⁶…) — é normal: a harmonia só fica definida quando as vozes internas entrarem." },
        { type: "list", ordered: true, items: [
          "Passo 4: vozes internas, acorde por acorde, pelo menor movimento. Comece pelo que é obrigatório (a sensível F♯ só no baixo do V⁶; a terça de cada acorde presente), depois mantenha notas comuns (o D4 do contralto atravessa quatro acordes) e, por último, escolha entre as notas que sobram a que está mais perto.",
          "Passo 5: no I⁶₄ cadencial, dobre o baixo (D) e faça as resoluções clássicas: 6–5 no soprano (B4 → A4) e 4–3 no tenor (G3 → F♯3).",
          "Passo 6: revise nos cinco níveis (seção 4) e cante cada voz interna sozinha.",
        ] },
        { type: "example", score: EXD.harmDemoBloco, verdict: "incorreto", caption: "Um atalho que não funciona: vozes internas 'coladas' ao soprano", commentary: "Contralto e tenor copiam o desenho do soprano uma 3ª e uma 6ª abaixo. Parece seguro, mas o contralto fica a uma 8ª do baixo e anda junto com ele (G → F♯): oitavas paralelas e sensível dobrada no V⁶. O motor aponta os dois fatos." },
        { type: "example", score: EXD.harmDemo, verdict: "correto", caption: "Passo 6: resultado revisado", commentary: "I – V⁶ | I – IV⁶ | I⁶₄ – V | I. O contralto repete D4 por quatro acordes (nota comum), o tenor faz G3 → F♯3 → G3 na cadência, o baixo desce por grau G–F♯–G–E–D antes do salto final para G2. Nenhum diagnóstico no estilo tradicional." },
        { type: "listening", title: "Percepção em contexto: as linhas internas", score: EXD.harmDemo, instructions: ["Ouça o contralto sozinho: quantas notas diferentes ele canta?", "Ouça o tenor no compasso 3: identifique o 4–3 (G3 → F♯3) sobre o baixo parado.", "Ouça soprano + baixo e depois o conjunto: o que as vozes internas acrescentam?"], focus: [["A"], ["T", "B"], ["S", "B"], ["S", "A", "T", "B"]] },
      ],
    },
    {
      title: "3. Decisões do arranjador e erros comuns",
      blocks: [
        { type: "paragraph", text: "Quase toda melodia admite várias harmonizações corretas. O que distingue a boa é a coerência: o baixo é uma linha cantável, o ritmo harmônico acelera perto da cadência, e as escolhas acompanham o texto (uma palavra importante pode receber um acorde menos esperado, como vi ou ii)." },
        { type: "table", caption: "Erros frequentes de harmonização", headers: ["Erro", "Por que acontece", "Como corrigir"], rows: [["Escolher acordes nota a nota, sem plano", "começar pelo primeiro compasso", "harmonize as cadências primeiro e caminhe de trás para a frente"], ["Baixo só com fundamentais, saltando", "evitar inversões por insegurança", "use I⁶, V⁶, IV⁶ e ii⁶ para criar linha por grau"], ["Mover as quatro vozes juntas", "escrever 'em bloco'", "soprano e baixo em contrário; vozes internas por notas comuns"], ["Vozes internas que pulam sem motivo", "procurar a nota do acorde mais 'bonita'", "a mais próxima quase sempre é a melhor"], ["Mesmo acorde atravessando a barra para um tempo forte", "não olhar o ritmo harmônico", "mude de acorde no tempo forte; repita só do forte para o fraco"], ["I⁶₄ fora da cadência", "tratar o ⁶₄ como inversão comum", "use ⁶₄ cadencial, de passagem ou de bordadura — nunca solto"]] },
        { type: "callout", tone: "dica", title: "Quando o estilo muda a decisão", text: "Em coral contemporâneo e popular, a mesma melodia aceita acordes com sétima e nona em quase todos os tempos, baixo com pedais longos e blocos paralelos. A ordem de trabalho (cadências → baixo → vozes internas → revisão) continua a mesma; mudam os acordes disponíveis e a gravidade do que o motor aponta." },
        { type: "example", score: EX.paralelas, verdict: "incorreto", caption: "O erro típico de quem escreve em bloco", commentary: "Mover todas as vozes juntas gera paralelas: o motor localiza os pares de vozes exatos." },
      ],
    },
    {
      title: "4. Autorrevisão",
      blocks: [
        { type: "paragraph", text: "Revise um nível de cada vez. Misturar os níveis faz você corrigir uma paralela e criar um problema de extensão sem perceber. Os três primeiros são quase mecânicos; os dois últimos pedem ouvido." },
        REVISION_LEVELS,
        { type: "example", score: CHORALE_SATB_C, verdict: "correto", caption: "Outra harmonização completa para estudar", commentary: "Cadência autêntica no fim, I⁶₄ cadencial no compasso 3, baixo com inversões que criam linha." },
      ],
    },
    {
      title: "5. Síntese e exercício independente",
      blocks: [
        { type: "list", items: ["Ordem de trabalho: análise → cadências → plano de acordes → baixo → vozes internas → revisão em cinco níveis.", "Para cada nota estrutural há pelo menos três acordes possíveis; escolha pela direção funcional e pela linha do baixo.", "Inversões não são enfeite: são a ferramenta para o baixo andar por grau.", "Antes de dar como pronto, cante contralto e tenor sozinhos."] },
        {
          type: "challenge",
          title: "Harmonize uma frase em Mi maior",
          task: "Escreva contralto, tenor e baixo para a melodia dada, um acorde por mínima, terminando numa cadência autêntica perfeita.",
          start: EXD.harmChalStart,
          constraints: ["Não altere o soprano.", "Tríades e no máximo um acorde de sétima (V7 ou uma inversão dele).", "Estilo coral tradicional; extensões padrão."],
          criteria: ["Plano de acordes escrito antes das notas, com a cadência final definida.", "Baixo com pelo menos um trecho por grau conjunto.", "Sensível presente e resolvida em cada dominante; sétima, se houver, descendo.", "O motor não aponta erros nem alertas; você cantou contralto e tenor sozinhos."],
          hints: [
            "Graus do soprano: 5–6 | 5–4 | 3–2 | 1. Comece pelo fim: que dois acordes fazem a cadência autêntica com 2–1 no soprano?",
            "O A4 (4º grau) no 2º compasso pode ser a sétima de um V7. Se o baixo estiver em E3 antes, que inversão do V7 deixa o baixo andar por grau e voltar a E3?",
            "Plano possível: I – IV | I – V⁶₅ | I – V | I, com o baixo E3 – A2 | E3 – D♯3 | E3 – B2 | E3.",
          ],
          solution: {
            score: EXD.harmChalSol,
            commentary: "I – IV | I – V⁶₅ | I – V | I. A sétima A4 está no soprano e desce para G♯4; a sensível D♯3, no baixo do V⁶₅, sobe para E3 — as duas tendências resolvem ao mesmo tempo. Na cadência final, o contralto leva a sensível D♯4 à quinta do I (B3), recurso de voz interna que o motor registra só como informação, e o acorde final fica completo.",
            alternatives: ["I – IV | I – IV | I – V | I: o A4 do 2º compasso como fundamental do IV. Funciona e soa mais calmo (plagal interna), mas o baixo fica com três saltos E–A–E–A; escolha esta se o texto pedir serenidade.", "I – ii⁶ | I⁶₄ – V7 | I – V | I (baixo E3 – A2 | B2 – B2 | E3 – B2 | E3): I⁶₄ – V7 → I no meio da frase forma uma pequena cadência interna — imperfeita, porque o soprano chega ao 3º grau (A4 → G♯4). Ganha-se movimento harmônico; perde-se um pouco da força da cadência final, que deixa de ser a primeira chegada à tônica."],
          },
        },
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
    {
      title: "3. Demonstração: uma cadência de SATB para TTBB",
      blocks: [
        { type: "paragraph", text: "Problema: levar a cadência V → I (soprano B4 → C5) para TTBB, com a melodia no Tenor II, uma oitava abaixo (B3 → C4). A tentação é transpor as outras vozes 'no automático' e encaixá-las em volta da melodia." },
        { type: "example", score: EXD.ttbbDemoErro, verdict: "incorreto", caption: "Primeira tentativa: vozes colocadas por proximidade, sem plano", commentary: "O Tenor I sobe D4 → G4 enquanto o baixo sobe G2 → C3, mantendo uma 12ª: quintas paralelas. E o G4 ainda passa da tessitura do Tenor I amador. O barítono em D3 → E3 deixa o grave apertado." },
        { type: "list", ordered: true, items: [
          "Fixe a melodia (Tenor II: B3 → C4) e o baixo (G2 → C3, fundamentais).",
          "Coloque o barítono a uma 8ª ou 5ª do baixo e, se possível, parado: G3 serve ao V (fundamental) e ao I (quinta).",
          "O Tenor I fica com o que falta, perto da melodia: D4 no V (quinta), E4 no I (terça).",
          "Confira: a sensível B3 está só no Tenor II e sobe; o I tem fundamental, terça e quinta; nenhuma 5ª ou 8ª paralela; Tenor I abaixo de F4.",
        ] },
        { type: "example", score: EXD.ttbbDemo, verdict: "correto", caption: "Resultado: plano antes das notas", commentary: "G2/G3 embaixo (8ª), terças e quintas nos tenores. O barítono não se move: é a voz que dá estabilidade ao coro masculino. Compare com a tentativa: as mesmas notas para a melodia e o baixo, decisões diferentes no meio." },
      ],
    },
    {
      title: "4. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes", headers: ["Erro", "Por que acontece", "Correção"], rows: [["Transpor SATB inteiro uma oitava abaixo", "pensar que TTBB é 'SATB grave'", "redistribua: 5ª/8ª embaixo, terças em cima"], ["Terça entre barítono e baixo no grave", "copiar a distribuição de contralto/tenor", "respeite os limites graves de intervalo"], ["Tenor I sempre agudo", "usar o Tenor I como 'soprano'", "agudo (acima de F4) só nos clímax"], ["Melodia no Tenor I por padrão", "herança do SATB", "melodia no Tenor II, com o Tenor I fazendo a harmonia de cima"]] },
        { type: "list", items: ["TTBB: âmbito estreito, acordes fechados em cima e abertos embaixo.", "Melodia normalmente no Tenor II.", "Adaptar = manter a harmonia e redistribuir, revendo a tonalidade."] },
        {
          type: "challenge",
          title: "Pergunta e resposta para coro masculino",
          task: "Adapte a 'pergunta e resposta' da aula de cadências (I – V | V7 – I em Dó, SATB) para TTBB, com a melodia no Tenor II uma oitava abaixo.",
          start: EXD.desafioCadSol,
          revises: true,
          constraints: ["Mantenha a harmonia (I – V | V7 – I) e a tonalidade.", "Melodia no Tenor II: C4 B3 | D4 C4.", "Baixo nas fundamentais; Tenor I até F4."],
          criteria: ["Nenhuma terça entre barítono e baixo abaixo de B♭2.", "Sétima do V7 resolvendo para baixo; sensível presente uma vez.", "O motor não aponta erros nem alertas."],
          hints: ["Baixo: C3 – G2 | G2 – C3. O barítono pode sustentar G3 em quase tudo.", "Quem canta a sétima F no V7? O Tenor I, acima da melodia D4, resolve F4 → E4.", "No V7, o barítono pode subir para a terça B3 e descer de volta a G3 no I."],
          solution: {
            score: EXD.ttbbSol,
            commentary: "Tenor I: E4 – D4 | F4 – E4; Tenor II (melodia): C4 – B3 | D4 – C4; barítono: G3 – G3 | B3 – G3; baixo: C3 – G2 | G2 – C3. A sétima F4 está no Tenor I e desce para E4. No V7, a sensível B3 está no barítono, que desce para G3 no I — uma sensível de voz interna 'frustrada', aceita e registrada pelo motor só como informação, para que o I tenha a quinta e a fundamental no grave.",
            alternatives: ["Barítono B3 → C4 no último acorde (sensível resolvendo) forma uníssono com a melodia em C4: correto, mas o I fica sem quinta e o uníssono apaga uma voz por um instante."],
          },
        },
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
