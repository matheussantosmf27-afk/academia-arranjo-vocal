import { CHORALE_SATB_C, CHORALE_TTBB_G } from "@/domain/music/examples";
import { FORMATIONS, clefNamePt } from "@/domain/music/formations";
import { formatPitch } from "@/domain/music/pitch";
import { scoreFromText } from "@/domain/music/text-notation";
import { EXD } from "../examples-didatica";
import type { Lesson } from "../types";

const rangeRows = (f: "SATB" | "TTBB") =>
  FORMATIONS[f].voices.map((v) => {
    const staff = FORMATIONS[f].staves[v.staff];
    return [v.name, `${formatPitch(v.range.low)}–${formatPitch(v.range.high)}`, `${formatPitch(v.tessitura.low)}–${formatPitch(v.tessitura.high)}`, clefNamePt(staff.clef), v.timbre];
  });

const TENOR_ALTO_DEMAIS = scoreFromText({
  id: "licao1-tenor-agudo",
  title: "Tenor sustentado no agudo (problema de tessitura)",
  formation: "SATB",
  key: "D",
  time: "4/4",
  voices: {
    S: "A4:h B4:h | A4:w",
    A: "F#4:h G4:h | F#4:w",
    T: "D4:h G4:h | A4:w",
    B: "D3:h G2:h | D3:w",
  },
});

const TTBB_FECHADO_GRAVE = scoreFromText({
  id: "licao1-ttbb-grave",
  title: "TTBB fechado demais no grave",
  formation: "TTBB",
  key: "G",
  time: "4/4",
  voices: {
    T1: "D4:w",
    T2: "G3:w",
    B1: "B2:w",
    B2: "G2:w",
  },
});

export const lessonVozes: Lesson = {
  id: "vozes-claves-extensoes",
  title: "Vozes, claves e extensões: SATB e TTBB",
  summary:
    "Quem canta cada linha, em que clave ela é escrita, até onde pode ir e onde soa melhor — a base física de qualquer arranjo vocal.",
  levelId: "n1",
  unitId: "n1-u1",
  status: "disponivel",
  prerequisites: [],
  estimatedMinutes: 50,
  competencies: ["leitura-vocal", "escrita-satb", "escrita-ttbb"],
  objectives: [
    "Nomear as quatro vozes de SATB e de TTBB, na ordem do agudo para o grave, e a clave usual de cada uma.",
    "Converter altura escrita em altura sonora na clave de sol oitavada (tenores), sem erro.",
    "Classificar uma nota como dentro da tessitura, apenas dentro da extensão ou fora da extensão de uma voz, com pelo menos 80% de acerto.",
    "Explicar três diferenças práticas entre escrever para coro misto (SATB) e para coro masculino (TTBB).",
  ],
  sections: [
    {
      title: "1. Por que o arranjador começa pelas vozes",
      blocks: [
        {
          type: "paragraph",
          text: "Um arranjo vocal não é uma harmonia abstrata distribuída em quatro pautas: é música para pessoas reais, com corpos, registros, cansaço e respiração. Uma progressão correta no papel pode ser impraticável se o tenor passar oito compassos acima de E4, ou se o baixo de um coro amador tiver de sustentar um E2 em piano.",
        },
        {
          type: "paragraph",
          text: "Por isso, antes de harmonizar qualquer melodia, o arranjador precisa ter interiorizado três informações sobre cada naipe: a extensão (até onde é razoável pedir), a tessitura (onde a voz passa a maior parte do tempo com conforto) e o timbre de cada região (onde a voz brilha, onde fica opaca, onde perde volume).",
        },
        {
          type: "callout",
          tone: "atencao",
          title: "Os números são padrões didáticos, não leis",
          text: "As extensões desta plataforma seguem o consenso aproximado de manuais de harmonia e de regência coral para grupos amadores e intermediários. Coros profissionais, coros infantis ou um naipe específico podem ter limites diferentes. Por isso o motor de validação permite configurar as extensões de cada projeto.",
        },
      ],
    },
    {
      title: "2. Coro misto: SATB",
      blocks: [
        {
          type: "paragraph",
          text: "No SATB, soprano e contralto são vozes femininas (ou infantis) e tenor e baixo, masculinas. Entre as duas vozes femininas e as duas masculinas há, aproximadamente, uma oitava de diferença de registro. O conjunto cobre cerca de quatro oitavas, o que permite acordes abertos e grande variedade de disposições.",
        },
        { type: "table", caption: "Extensões e tessituras usadas pelo motor de validação (SATB)", headers: ["Voz", "Extensão", "Tessitura", "Clave", "Timbre e cuidados"], rows: rangeRows("SATB") },
        {
          type: "paragraph",
          text: "Na redução em duas pautas (o formato de hinários e corais de Bach), soprano e contralto dividem a clave de sol — soprano com hastes para cima, contralto para baixo — e tenor e baixo dividem a clave de fá. Em partituras de ensaio com uma pauta por voz, o tenor costuma aparecer em clave de sol oitavada.",
        },
        {
          type: "example",
          score: CHORALE_SATB_C,
          verdict: "correto",
          caption: "Coral em Dó maior (SATB)",
          commentary:
            "Todas as vozes ficam na tessitura. Observe a distância de no máximo uma oitava entre soprano–contralto e contralto–tenor, e a distância maior (até uma 10ª) entre tenor e baixo: é a disposição natural da série harmônica, com intervalos mais abertos no grave.",
        },
      ],
    },
    {
      title: "3. Coro masculino: TTBB",
      blocks: [
        {
          type: "paragraph",
          text: "No TTBB, as quatro vozes são masculinas: Tenor I, Tenor II, Barítono (Baixo I) e Baixo (Baixo II). O conjunto cobre só cerca de duas oitavas e meia — bem menos que o SATB. Consequência direta: as vozes ficam próximas, os acordes tendem à posição fechada e o grave fica congestionado com facilidade.",
        },
        { type: "table", caption: "Extensões e tessituras usadas pelo motor de validação (TTBB)", headers: ["Voz", "Extensão", "Tessitura", "Clave", "Timbre e cuidados"], rows: rangeRows("TTBB") },
        {
          type: "callout",
          tone: "ttbb",
          title: "Quem canta a melodia?",
          text: "Em muitos arranjos masculinos tradicionais (e no barbershop), a melodia fica com o Tenor II, e o Tenor I faz uma voz acima dela, frequentemente em voz mista ou falsete. Em SATB, o padrão é a melodia no soprano. Essa diferença muda toda a lógica de distribuição das vozes.",
        },
        {
          type: "example",
          score: CHORALE_TTBB_G,
          verdict: "correto",
          caption: "Cadência em Sol maior (TTBB)",
          commentary:
            "Os tenores são escritos em clave de sol oitavada: a nota que você vê soa uma oitava abaixo. Repare que o baixo nunca desce de G2 e que, no V, a terça maior entre baixo e barítono está em D3–F♯3, acima do limite grave para terças.",
        },
      ],
    },
    {
      title: "4. Claves e a diferença entre altura escrita e altura sonora",
      blocks: [
        {
          type: "paragraph",
          text: "A clave de sol oitavada (um 8 sob a clave de sol) é uma convenção de leitura: o tenor lê como se fosse clave de sol, mas canta uma oitava abaixo. Assim, um D5 escrito na pauta do tenor soa D4. O mesmo vale para os tenores do TTBB.",
        },
        {
          type: "list",
          items: [
            "Altura sonora: a frequência que realmente se ouve (é o que esta plataforma guarda no modelo da partitura e envia para o áudio e para a validação).",
            "Altura escrita: a posição da nota na pauta, que depende da clave. Na clave de sol oitavada, escrita = sonora + 1 oitava.",
            "Convenção de oitavas: C4 é o Dó central (MIDI 60). A oitava acompanha a letra: B♯3 soa igual a C4.",
          ],
        },
        {
          type: "callout",
          tone: "atencao",
          title: "Erro clássico",
          text: "Escrever a parte do tenor em clave de sol comum (sem o 8) com as alturas sonoras: o cantor vai ler tudo uma oitava acima do pretendido — ou o arranjador vai achar que a parte está grave demais e 'corrigir' para cima, deixando-a inviável.",
        },
      ],
    },
    {
      title: "5. Extensão × tessitura na prática",
      blocks: [
        {
          type: "paragraph",
          text: "Uma nota isolada no limite da extensão, num ponto culminante, com preparação e respiração, é perfeitamente cantável. O problema é a permanência: um trecho longo acima da tessitura cansa e desafina o naipe; um trecho longo abaixo dela perde volume e é encoberto pelas outras vozes.",
        },
        {
          type: "example",
          score: TENOR_ALTO_DEMAIS,
          verdict: "incorreto",
          caption: "Tenor sustentando A4",
          commentary:
            "O A4 do tenor está acima da extensão configurada para coro amador (G4) — e é uma semibreve. O motor aponta um erro objetivo em relação à extensão configurada. Soluções: redistribuir (o tenor fica em F♯4 ou D4 e o contralto assume outra nota) ou baixar a tonalidade.",
        },
        {
          type: "example",
          score: TTBB_FECHADO_GRAVE,
          verdict: "observacao",
          caption: "TTBB com terças no grave",
          commentary:
            "Todas as notas estão na extensão, mas a terça maior G2–B2 entre Baixo e Barítono fica abaixo do limite grave recomendado para terças maiores (B♭2): o acorde soa embolado. É uma recomendação, não um erro. Solução típica: barítono em D3 (quinta G2–D3) e a terça do acorde num tenor.",
        },
      ],
    },
    {
      title: "6. SATB × TTBB: diferenças que mudam a escrita",
      blocks: [
        {
          type: "table",
          caption: "Comparação prática",
          headers: ["Aspecto", "SATB", "TTBB"],
          rows: [
            ["Âmbito total", "≈ 4 oitavas (E2–G5)", "≈ 2½ oitavas (E2–A4)"],
            ["Disposição típica", "Aberta ou fechada; tenor–baixo até 12ª", "Predominantemente fechada; cuidado com limites graves"],
            ["Melodia", "Normalmente no soprano", "Frequentemente no Tenor II"],
            ["Cruzamentos", "Evitados na escrita tradicional", "Barítono acima do Tenor II é recurso comum"],
            ["Timbre", "Contraste entre vozes femininas e masculinas", "Timbre homogêneo; fusão e 'ressonância' de acordes fechados"],
            ["Equilíbrio", "Agudo brilhante pode encobrir o tenor", "Tenor I no agudo exige voz mista ou falsete planejados"],
          ],
        },
      ],
    },
    {
      title: "7. Escuta guiada",
      blocks: [
        {
          type: "listening",
          title: "Ouça cada voz e depois o conjunto (SATB)",
          score: CHORALE_SATB_C,
          instructions: [
            "Ouça o baixo sozinho e cante junto, uma oitava acima se necessário.",
            "Ouça soprano + baixo: é o 'esqueleto' do coral.",
            "Ouça tudo e tente seguir o tenor dentro do acorde.",
          ],
          focus: [["B"], ["S", "B"], ["T"], ["S", "A", "T", "B"]],
        },
        {
          type: "listening",
          title: "Compare com a textura masculina (TTBB)",
          score: CHORALE_TTBB_G,
          instructions: ["Ouça o conjunto e perceba como as vozes estão próximas.", "Isole Barítono + Baixo e observe a clareza do grave."],
          focus: [["T1", "T2", "B1", "B2"], ["B1", "B2"]],
        },
      ],
    },
    {
      title: "8. Erros comuns, síntese e exercício independente",
      blocks: [
        { type: "table", caption: "Erros frequentes com vozes e claves", headers: ["Erro", "Por que acontece", "Como corrigir"], rows: [["Escrever o tenor na altura real na clave de sol sem o 8 embaixo", "esquecer que a clave de tenor soa uma oitava abaixo", "use a clave de sol com 8 (o Estúdio faz isso automaticamente) e pense sempre na altura sonora"], ["Conferir só a extensão, não a tessitura", "olhar apenas as notas extremas", "conte quanto tempo cada voz passa acima ou abaixo da região confortável"], ["Copiar a extensão de livros de coro profissional", "usar números de cantores treinados", "ajuste a extensão ao seu grupo no Estúdio; para amadores, prefira a tessitura"], ["Transpor um arranjo SATB inteiro para TTBB uma oitava abaixo", "achar que a mudança é só de registro", "redistribua as vozes: os limites graves e o âmbito masculino mudam a escrita"]] },
        { type: "list", items: ["Extensão é o limite; tessitura é onde a voz trabalha bem.", "O tenor é escrito uma oitava acima do que soa (clave de sol com 8).", "TTBB tem âmbito menor que SATB: acordes mais fechados, cuidado com intervalos pequenos no grave.", "Antes de escrever, verifique o ponto mais agudo, o mais grave e a nota média de cada voz."] },
        {
          type: "challenge",
          title: "A melodia cabe neste naipe?",
          task: "A 'Canção do Caminho' (E4 a C5, nota média por volta de G4) será cantada pelos tenores de um coro TTBB amador (Tenor II na melodia). Decida em que oitava e em que tonalidade escrevê-la, e diga como ela aparece na partitura (clave e notas escritas).",
          constraints: ["Use as tessituras desta aula (Tenor: E3–E4 confortável).", "Mantenha a melodia inteira na mesma oitava."],
          criteria: ["Nota mais grave e mais aguda calculadas na altura sonora.", "A nota média fica perto do centro da tessitura do tenor.", "A grafia na clave de sol com 8 está coerente com a altura sonora."],
          hints: ["Em Dó maior, uma oitava abaixo, a melodia iria de E3 a C4: está na tessitura?", "Se quiser a melodia mais brilhante, que tonalidade leva o C4 (ponto mais alto) para D4 sem passar de E4?", "Na clave de sol com 8, uma nota que soa E3 é escrita na 1ª linha (E4 escrito)."],
          solution: {
            commentary: "Uma oitava abaixo, em Dó maior, a melodia soa de E3 a C4, com nota média por volta de G3 — no centro da tessitura de tenor (E3–E4). É uma boa escolha. Para mais brilho, Ré maior (F♯3 a D4, média A3) também fica confortável. Mi maior (G♯3 a E4) já leva o ponto culminante ao topo da tessitura: possível num clímax, cansativo como tonalidade de trabalho. Na partitura, o tenor usa a clave de sol com 8: em Dó, as notas escritas são as mesmas da melodia original (E4 a C5), e soam uma oitava abaixo.",
            alternatives: ["Se o grupo tiver um Tenor I confortável até G4, a melodia pode ir para ele em Fá ou Sol maior, liberando o Tenor II para a harmonia."],
          },
        },
      ],
    },
  ],
  exercises: {
    id: "ex-vozes",
    title: "Verificação: vozes, claves e extensões",
    instructions: "Responda a todos os itens. Cada resposta traz um comentário. O domínio exige 80% de acerto e os três itens conceituais marcados como essenciais.",
    minScore: 0.8,
    requiredItemIds: ["vz-ordem-ttbb", "vz-clave-tenor", "vz-escrita-sonora"],
    staticItems: [
      {
        id: "vz-ordem-ttbb",
        kind: "choice",
        skill: "escrita-ttbb",
        prompt: "Qual é a ordem das vozes do TTBB, do agudo para o grave?",
        options: [
          { id: "a", label: "Tenor I, Tenor II, Barítono (Baixo I), Baixo (Baixo II)" },
          { id: "b", label: "Tenor I, Barítono, Tenor II, Baixo" },
          { id: "c", label: "Contratenor, Tenor, Barítono, Baixo" },
        ],
        correctOptionId: "a",
        explanation: "TTBB = Tenor I, Tenor II, Baixo I (barítono) e Baixo II. O barítono é o 'Baixo I'.",
      },
      {
        id: "vz-clave-tenor",
        kind: "choice",
        skill: "leitura-vocal",
        prompt: "Em partituras vocais modernas com pauta própria para o tenor, qual clave é usada?",
        options: [
          { id: "a", label: "Clave de fá" },
          { id: "b", label: "Clave de sol oitavada (soa uma oitava abaixo)" },
          { id: "c", label: "Clave de dó na 4ª linha, obrigatoriamente" },
        ],
        correctOptionId: "b",
        explanation: "A clave de sol oitavada é o padrão atual para tenores. A clave de dó de tenor aparece em edições antigas, mas não é obrigatória.",
        optionFeedback: { a: "A clave de fá é usada para o tenor apenas na redução em duas pautas (junto com o baixo)." },
      },
      {
        id: "vz-escrita-sonora",
        kind: "choice",
        skill: "leitura-vocal",
        prompt: "Na pauta do Tenor II (clave de sol oitavada) está escrito um E4. Qual é a altura sonora?",
        options: [
          { id: "a", label: "E4" },
          { id: "b", label: "E3" },
          { id: "c", label: "E5" },
        ],
        correctOptionId: "b",
        explanation: "Na clave de sol oitavada, a nota soa uma oitava abaixo do escrito: E4 escrito = E3 sonoro.",
        staff: { clef: "treble8vb", attacks: [[{ step: "E", alter: 0, octave: 3 }]] },
      },
      {
        id: "vz-diferenca",
        kind: "choice",
        skill: "escrita-ttbb",
        prompt: "Qual destas afirmações sobre TTBB, comparado a SATB, é verdadeira?",
        options: [
          { id: "a", label: "O âmbito total é maior, por isso os acordes ficam mais abertos." },
          { id: "b", label: "O âmbito é menor; acordes fechados no grave precisam respeitar limites graves de intervalo." },
          { id: "c", label: "Não há diferença: basta transpor um arranjo SATB uma oitava abaixo." },
        ],
        correctOptionId: "b",
        explanation: "O TTBB cobre cerca de duas oitavas e meia. Transpor o soprano e o contralto uma oitava abaixo jogaria tudo no grave e criaria intervalos embolados; é preciso redistribuir.",
        optionFeedback: { c: "Transpor uma oitava abaixo leva o baixo para fora da extensão e embola o grave: arranjar para TTBB exige reescrever a distribuição." },
      },
    ],
    generators: [{ type: "range-check", count: 6 }],
  },
  masteryDescription: "≥ 80% de acertos, incluindo os três itens essenciais (ordem TTBB, clave do tenor, altura escrita × sonora).",
  application: {
    title: "Aplicação no Estúdio",
    steps: [
      "Abra o Estúdio com o coral SATB de exemplo.",
      "Selecione a última nota do tenor (E4) e suba-a com ↑ até G4 e depois A4. Observe como o diagnóstico muda de 'tessitura' (recomendação) para 'extensão' (erro objetivo).",
      "Troque para o exemplo TTBB e confira: a nota que aparece como D5 na pauta do Tenor I soa D4 (veja a lista de eventos).",
      "Escreva em uma frase por que o barítono do TTBB não pode simplesmente cantar a parte do tenor de um arranjo SATB.",
    ],
  },
};
