import {
  lessonAnaliseRepertorio,
  lessonBaixoCantoDado,
  lessonContracantoAtivoPassivo,
  lessonDuasVozes,
  lessonEscritaBloco,
  lessonHarmoniaCromatica,
} from "./lessons/complementares";
import { lessonIntervalos } from "./lessons/intervalos";
import { lessonCadencias, lessonEscalas, lessonFuncoes, lessonRitmo, lessonTetrades } from "./lessons/nivel1";
import { lessonDuplicacoes, lessonEspacamento, lessonMovimentos, lessonNotasEstranhas, lessonParalelas, lessonSetimas } from "./lessons/nivel2";
import {
  lessonAcompanhamento,
  lessonAnaliseMelodica,
  lessonContraponto,
  lessonEscritaTtbb,
  lessonEstilo,
  lessonHarmonizacao,
  lessonModulacao,
  lessonProsodia,
} from "./lessons/nivel3a5";
import { lessonLeadSheet, lessonOficio, lessonProcesso, lessonVozCantada } from "./lessons/s1-arranjo";
import { lessonSilabas, lessonTexturas, lessonTresVozes, lessonVoicings } from "./lessons/s2-escrita";
import { lessonFormaEnergia, lessonTensoes, lessonVariacao } from "./lessons/s3-forma";
import { lessonAcappellaBaixo, lessonAcappellaBlocos, lessonAcappellaModulacoes, lessonAcappellaSolistas, lessonAcappellaTexturas, lessonAcappellaVocalBand } from "./lessons/s4-acappella";
import { lessonCpContracanto, lessonCpDescant, lessonCpFlorida, lessonCpImitacao, lessonCpPrimeira, lessonCpQuarta, lessonCpQuatroVozes, lessonCpSegundaTerceira } from "./lessons/s3-contraponto";
import { lessonSsaAdaptacao, lessonSsaBaixo, lessonSsaCores, lessonSsaFormacao, lessonSsaInfantil, lessonSsaQuatroVozes, lessonSsaTexturas, lessonSsaTresVozes } from "./lessons/s4-vozes-iguais";
import { lessonRearmBaixo, lessonRearmDiatonica, lessonRearmDiminutos, lessonRearmDominantes, lessonRearmFundamentos, lessonRearmModal, lessonRearmNoArranjo, lessonRearmSubV } from "./lessons/s4-rearm";
import { lessonQuartetoMasculino, lessonTtbbChamadaResposta, lessonTtbbCores, lessonTtbbModulacao, lessonTtbbUnissono, lessonTtbbVoicing } from "./lessons/s4-quarteto";
import { lessonACappellaPop, lessonArranjoCoral, lessonBaixoPercussao, lessonGospel, lessonMpbVocal, lessonPartituraEnsaio } from "./lessons/s4-estilos";
import { lessonTriades } from "./lessons/triades-inversoes";
import { lessonVozes } from "./lessons/vozes-claves-extensoes";
import type { CompetencyId, Lesson, Level } from "./types";

/**
 * Grade curricular: quatro semestres, cada um com disciplinas (código, ementa,
 * aulas, trabalho e bibliografia). O aluno parte de teoria básica; HAR101 é
 * revisão aplicada e pode ser concluída rapidamente por quem já domina o conteúdo.
 */
export const LEVELS: readonly Level[] = [
  {
    id: "s1",
    number: 1,
    title: "Fundamentos do arranjo vocal",
    description: "O que é arranjar, o método de trabalho, a voz humana como instrumento e a harmonia revisada do ponto de vista de quem escreve para vozes.",
    units: [
      {
        id: "s1-arv",
        code: "ARV101",
        title: "Introdução ao Arranjo Vocal",
        description: "O papel do arranjador; as três camadas de um arranjo; estilos e convenções; método em sete etapas; lead sheet, análise da canção e mapa do arranjo.",
        lessonIds: ["oficio-do-arranjador", "processo-de-arranjo", "lead-sheet-e-mapa"],
        project: { title: "Lead sheet e mapa de arranjo", description: "Transcrever uma canção (melodia, letra e cifra) e planejar o arranjo seção por seção." },
        bibliography: ["Ian Guest — Arranjo: método prático (Lumiar)", "Deke Sharon e Dylan Bell — A Cappella Arranging (Hal Leonard)"],
      },
      {
        id: "s1-voz",
        code: "VOZ101",
        title: "A Voz como Instrumento",
        description: "Classificação vocal, claves e extensões em SATB e TTBB; tessitura, registros e passagem; vogais, respiração e fadiga; ritmo e acentuação do texto.",
        lessonIds: ["vozes-claves-extensoes", "voz-cantada", "ritmo-metrica-texto"],
        bibliography: ["Escuta: gravações de coros amadores e profissionais do mesmo repertório, comparando tessituras"],
      },
      {
        id: "s1-har",
        code: "HAR101",
        title: "Harmonia para Arranjadores I (revisão aplicada)",
        description: "Intervalos, escalas e tonalidades, tríades e inversões, tétrades, graus e funções, cadências — sempre a quatro vozes.",
        lessonIds: ["intervalos", "escalas-tonalidades", "triades-inversoes", "tetrades", "graus-funcoes", "cadencias"],
        project: { title: "Cadências em SATB e TTBB", description: "Escrever as quatro cadências principais nas duas formações, com análise." },
        bibliography: ["Walter Piston — Harmony", "Ian Guest — Harmonia: método prático (Lumiar)"],
      },
    ],
    finalProject: {
      title: "Trabalho do 1º semestre — Mapa de arranjo",
      description: "Lead sheet completa de uma canção, análise da forma, briefing (formação, estilo, tonalidade) e mapa do arranjo com curva de intensidade.",
    },
  },
  {
    id: "s2",
    number: 2,
    title: "Escrita a quatro vozes",
    description: "Condução de vozes, harmonização de melodias em SATB, TTBB e três vozes, e as texturas e distribuições que dão cor ao arranjo.",
    units: [
      {
        id: "s2-cdv",
        code: "CDV201",
        title: "Condução de Vozes",
        description: "Movimentos entre vozes, paralelismos, espaçamento, duplicações, notas estranhas e resolução de sétimas.",
        lessonIds: ["movimentos", "paralelas", "espacamento-cruzamento", "duplicacoes", "notas-estranhas", "setimas-resolucao"],
        bibliography: ["Walter Piston — Harmony", "J. S. Bach — 371 corais a quatro vozes (escuta e análise)"],
      },
      {
        id: "s2-hmz",
        code: "HMZ201",
        title: "Harmonização de Melodias",
        description: "Análise melódica; escrita a duas vozes; baixo dado e canto dado; harmonização em SATB; escrita para coro masculino (TTBB) e para três vozes (SAB, SSA, TTB).",
        lessonIds: ["analise-melodica", "duas-vozes", "baixo-e-canto-dado", "harmonizacao-satb", "escrita-ttbb", "tres-vozes"],
        project: { title: "Hino a quatro vozes", description: "Harmonizar a melodia de um hino em SATB e adaptá-la para TTBB e para SAB." },
      },
      {
        id: "s2-tex",
        code: "TEX201",
        title: "Texturas e Distribuição Vocal",
        description: "Uníssono, homofonia, melodia com pad, acompanhamento rítmico e contracanto; posição fechada e aberta; escrita em bloco (bloco fechado, drop 2, quartas, segundas, estruturas superiores); sílabas de apoio; contracanto ativo e passivo, ostinatos e vocal band.",
        lessonIds: ["texturas-vocais", "voicings-posicoes", "escrita-em-bloco", "silabas-de-apoio", "contracanto-ativo-passivo"],
        bibliography: ["Deke Sharon e Dylan Bell — A Cappella Arranging (Hal Leonard)"],
      },
    ],
    finalProject: {
      title: "Trabalho do 2º semestre — Hino em três versões",
      description: "Um hino em SATB (homofonia), TTBB (melodia no Tenor II) e uma versão com melodia e pad, sem erros de condução no estilo tradicional.",
    },
  },
  {
    id: "s3",
    number: 3,
    title: "Forma, texto e linguagem harmônica",
    description: "Como o arranjo se organiza no tempo, como o texto e as linhas se relacionam e como a harmonia ganha cor com tensões, modulações e rearmonização.",
    units: [
      {
        id: "s3-for",
        code: "FOR301",
        title: "Forma e Estrutura do Arranjo",
        description: "Repetição e contraste, curva de energia e clímax; introduções, acompanhamento e codas; variação e desenvolvimento das seções repetidas.",
        lessonIds: ["forma-e-energia", "acompanhamento-introducoes", "variacao-e-desenvolvimento"],
        project: { title: "Três refrões", description: "Escrever o mesmo refrão três vezes, cada uma com técnica de variação diferente." },
      },
      {
        id: "s3-txt",
        code: "TXT301",
        title: "Texto e Contraponto",
        description: "Prosódia e respiração em português; contraponto aplicado ao coro: linhas independentes, imitação e contracanto.",
        lessonIds: ["prosodia-respiracao", "contraponto-aplicado"],
      },
      {
        id: "s3-ctp",
        code: "CTP301",
        title: "Contraponto Vocal",
        description:
          "As cinco espécies sobre cantus firmus (nota contra nota, passagem e bordadura, retardos, contraponto florido); imitação, cânone e contraponto invertível; independência real a três e quatro vozes; contracanto na canção; descant e quodlibet.",
        lessonIds: ["cp-primeira-especie", "cp-segunda-terceira", "cp-quarta-especie", "cp-florida", "cp-imitacao", "cp-quatro-vozes", "cp-contracanto", "cp-descant-quodlibet"],
        project: {
          title: "Descant para um hino",
          description: "Com a melodia no tenor, escrever um descant no soprano em movimento contrário, completar contralto e baixo e revisar no motor.",
        },
        bibliography: [
          "Johann Joseph Fux — Gradus ad Parnassum (as cinco espécies)",
          "Knud Jeppesen — Counterpoint: The Polyphonic Vocal Style of the Sixteenth Century",
          "Kent Kennan — Counterpoint",
          "H. J. Koellreutter — Contraponto modal do século XVI (Palestrina)",
          "Escuta: cânones e rounds tradicionais, descants de última estrofe em hinários, quodlibets corais",
        ],
      },
      {
        id: "s3-har",
        code: "HAR301",
        title: "Harmonia para Arranjadores II",
        description: "Sétimas, nonas, sus e add9 para vozes; notas-guia; modulação e rearmonização; empréstimo modal, acordes alterados, paralelismo, quartas e clusters.",
        lessonIds: ["tensoes-e-extensoes", "modulacao-reharmonizacao", "harmonia-cromatica-moderna"],
        bibliography: ["Ian Guest — Harmonia: método prático (Lumiar)"],
      },
    ],
    finalProject: {
      title: "Trabalho do 3º semestre — Canção arranjada com forma planejada",
      description: "Arranjo de uma canção folclórica ou de domínio público com introdução, variação dos refrões, uma modulação e final, acompanhado do mapa e da curva de energia.",
    },
  },
  {
    id: "s4",
    number: 4,
    title: "Estilos e prática profissional",
    description: "As linguagens do coral sacro e erudito, do pop a cappella, do gospel e da música popular brasileira, e a entrega profissional do arranjo.",
    units: [
      {
        id: "s4-rea",
        code: "HAR402",
        title: "Rearmonização para Vozes",
        description:
          "O que pode mudar numa rearmonização e o que segura a forma; substituições diatônicas e inversões; dominantes secundárias, ii–V e cadeias; substituto de trítono e tensões; empréstimo modal e planing; diminutos de passagem e auxiliares; rearmonizar a partir do baixo e com pedal; onde e quanto rearmonizar num arranjo vocal e como escrever as vozes.",
        lessonIds: ["rearm-fundamentos", "rearm-diatonica", "rearm-dominantes", "rearm-subv", "rearm-modal", "rearm-diminutos", "rearm-baixo", "rearm-no-arranjo"],
        project: {
          title: "Rearmonização do segundo refrão",
          description: "Manter a primeira apresentação de uma melodia e rearmonizar a repetição com ao menos três técnicas, com vozes cantáveis e justificativa de cada escolha.",
        },
        bibliography: [
          "Ian Guest — Harmonia: método prático, vols. 1 e 2 (Lumiar)",
          "Almir Chediak — Harmonia e improvisação, vols. 1 e 2 (Lumiar)",
          "Walter Piston — Harmony (dominantes secundárias, empréstimo modal)",
          "Escuta: Take 6, Gaither Vocal Band, The Real Group, Boca Livre e arranjos corais de MPB, comparando a primeira e a segunda vez de cada refrão",
        ],
      },
      {
        id: "s4-cor",
        code: "EST401",
        title: "Arranjo Coral: Sacro, Erudito e MPB para Coro",
        description: "A tradição do hino e do coral; retardos e cadências expressivas; adaptação de canções populares para coro misto.",
        lessonIds: ["arranjo-coral"],
        bibliography: ["J. S. Bach — corais (análise)", "Heitor Villa-Lobos — Guia Prático (escuta e análise)"],
      },
      {
        id: "s4-pop",
        code: "EST402",
        title: "Pop e A Cappella",
        description: "Papéis no grupo (lead, backing, baixo, percussão), transcrição da banda para vozes, equilíbrio; baixo vocal e percussão vocal.",
        lessonIds: ["a-cappella-pop", "baixo-e-percussao-vocal"],
        bibliography: ["Deke Sharon e Dylan Bell — A Cappella Arranging (Hal Leonard)", "Escuta: Pentatonix, The Real Group, Take 6"],
      },
      {
        id: "s4-gos",
        code: "EST403",
        title: "Gospel e Louvor",
        description: "Bloco de três vozes, acordes sobre baixo, chamada e resposta, vamp, modulações em degraus, escrita com banda e congregação.",
        lessonIds: ["gospel-louvor"],
        bibliography: ["Escuta: corais gospel norte-americanos e brasileiros; ministérios de louvor com vocal de apoio"],
      },
      {
        id: "s4-qtm",
        code: "EST405",
        title: "Quarteto Masculino (TTBB)",
        description:
          "A tradição dos quartetos gospel, spirituals e barbershop: lead no Tenor II e tenor acima; voicing fechado e grave claro; baixo condutor, chamada e resposta e acompanhamento em sílabas; uníssono que se abre e entradas sucessivas; cores (6, maj7, iv emprestado, pedal, dominante com nona); modulação de meio tom e finais.",
        lessonIds: ["quarteto-masculino", "ttbb-voicing-fechado", "ttbb-chamada-resposta", "ttbb-unissono-entradas", "ttbb-cores-gospel", "ttbb-modulacao-final"],
        project: {
          title: "Quarteto gospel",
          description: "Arranjar uma melodia para quarteto masculino com chamada e resposta, uma cor gospel, modulação de meio tom e tag final.",
        },
        bibliography: [
          "Escuta e análise: Arautos do Rei, Haven Quartet, Gaither Vocal Band, Golden Gate Quartet, Take 6 e quartetos de barbershop",
          "Partituras de quartetos masculinos para estudo: acervo 4tons.com.br (Pr. Marcelo Augusto de Carvalho), com a indicação de direitos de cada partitura",
          "Barbershop Harmony Society — materiais sobre arranjo e afinação para quarteto",
        ],
      },
      {
        id: "s4-acp",
        code: "EST406",
        title: "Grupo Vocal A Cappella Gospel",
        description:
          "Técnicas de grupos a cappella gospel: revezamento de solistas e dueto; estrofe em uníssono e refrão em bloco, eco, texto contra 'uh' e antecipação; vocal band com riffs, baixo em ostinato e beatbox; diminuto de passagem, planing e clichê de linha; linhas de baixo com inversões e pedal; modulações por tom e por terça.",
        lessonIds: ["acappella-solistas-dueto", "acappella-texturas", "acappella-vocal-band", "acappella-blocos-cromaticos", "acappella-linhas-de-baixo", "acappella-modulacoes"],
        project: {
          title: "Grupo a cappella gospel",
          description: "Arranjar uma canção para quarteto com solo, refrão em bloco com eco, baixo em ostinato e modulação pela dominante.",
        },
        bibliography: [
          "Escuta e análise: Ministério Vox (Vox Acapella; Acapella Vol. 2 e Vol. 3, arranjos de Samuel Lóia), Gaither Vocal Band (A Cappella), GLAD, Take 6, Arautos do Rei e Quarteto Ministry",
          "Partituras para estudo: acervo 4tons.com.br (Pr. Marcelo Augusto de Carvalho), com a indicação de direitos de cada partitura",
          "Deke Sharon e Dylan Bell — A Cappella Arranging (Hal Leonard)",
        ],
      },
      {
        id: "s4-ssa",
        code: "EST407",
        title: "Vozes Iguais: Coro Feminino e Infantil (SSA/SSAA)",
        description:
          "A formação de vozes iguais agudas, sem baixo real: extensões e escrita em duas pautas de clave de sol; SSA com uma nota por voz; SSAA fechado, dobramentos e espaçamento; a linha do Contralto II como baixo; coro infantil (tessitura, uníssono, cânone e duas vozes); melodia em voz interna e outras texturas; adaptação de arranjos de coro misto; nonas, clusters e planing.",
        lessonIds: ["ssa-formacao", "ssa-tres-vozes", "ssa-quatro-vozes", "ssa-baixo", "ssa-coro-infantil", "ssa-texturas", "ssa-adaptacao", "ssa-cores"],
        project: {
          title: "Hino para coro feminino",
          description: "Harmonizar uma melodia dada para SSAA, com o Contralto II como linha de baixo, posição fechada e uma estrofe com a melodia em voz interna.",
        },
        bibliography: [
          "Escuta e análise: repertório de coros femininos e infantis (coros juvenis brasileiros, canto orfeônico, arranjos para vozes iguais de cantigas de domínio público)",
          "Heitor Villa-Lobos — Guia Prático e Canto Orfeônico (repertório escolar a uma, duas e três vozes, para estudo)",
          "Kenneth H. Phillips — Teaching Kids to Sing (voz infantil, tessitura e desenvolvimento vocal)",
        ],
      },
      {
        id: "s4-mpb",
        code: "EST404",
        title: "Música Popular Brasileira para Vozes",
        description: "Samba, bossa nova e baião: ritmo, harmonia com tensões, modos nordestinos e prosódia brasileira.",
        lessonIds: ["mpb-vocal"],
        bibliography: ["Escuta: Quarteto em Cy, MPB4, Boca Livre"],
      },
      {
        id: "s4-prf",
        code: "PRF401",
        title: "Prática Profissional",
        description: "Análise de repertório com ficha padronizada; análise estilística e revisão; partitura final, kit de ensaio e adaptação ao nível do grupo.",
        lessonIds: ["analise-de-repertorio", "analise-estilistica-revisao", "partitura-e-ensaio"],
      },
    ],
    finalProject: {
      title: "Trabalho de conclusão — Arranjo completo",
      description: "Arranjo original em um dos estilos estudados, com introdução, variação, modulação e final, partitura revisada, kit de ensaio e avaliação por rubrica.",
    },
  },
];

/** Posição de cada aula na grade e seus pré-requisitos (domínio exigido). */
const PLACEMENT: Readonly<Record<string, { unitId: string; prerequisites: readonly string[] }>> = {
  // 1º semestre
  "oficio-do-arranjador": { unitId: "s1-arv", prerequisites: [] },
  "processo-de-arranjo": { unitId: "s1-arv", prerequisites: ["oficio-do-arranjador"] },
  "lead-sheet-e-mapa": { unitId: "s1-arv", prerequisites: ["processo-de-arranjo"] },
  "vozes-claves-extensoes": { unitId: "s1-voz", prerequisites: [] },
  "voz-cantada": { unitId: "s1-voz", prerequisites: ["vozes-claves-extensoes"] },
  "ritmo-metrica-texto": { unitId: "s1-voz", prerequisites: ["voz-cantada"] },
  intervalos: { unitId: "s1-har", prerequisites: [] },
  "escalas-tonalidades": { unitId: "s1-har", prerequisites: ["intervalos"] },
  "triades-inversoes": { unitId: "s1-har", prerequisites: ["intervalos"] },
  tetrades: { unitId: "s1-har", prerequisites: ["triades-inversoes"] },
  "graus-funcoes": { unitId: "s1-har", prerequisites: ["triades-inversoes", "escalas-tonalidades"] },
  cadencias: { unitId: "s1-har", prerequisites: ["graus-funcoes"] },
  // 2º semestre
  movimentos: { unitId: "s2-cdv", prerequisites: ["cadencias", "processo-de-arranjo"] },
  paralelas: { unitId: "s2-cdv", prerequisites: ["movimentos"] },
  "espacamento-cruzamento": { unitId: "s2-cdv", prerequisites: ["paralelas", "vozes-claves-extensoes"] },
  duplicacoes: { unitId: "s2-cdv", prerequisites: ["espacamento-cruzamento"] },
  "notas-estranhas": { unitId: "s2-cdv", prerequisites: ["duplicacoes"] },
  "setimas-resolucao": { unitId: "s2-cdv", prerequisites: ["notas-estranhas", "tetrades"] },
  "analise-melodica": { unitId: "s2-hmz", prerequisites: ["lead-sheet-e-mapa", "cadencias"] },
  "duas-vozes": { unitId: "s2-hmz", prerequisites: ["analise-melodica", "movimentos"] },
  "baixo-e-canto-dado": { unitId: "s2-hmz", prerequisites: ["duas-vozes", "duplicacoes"] },
  "harmonizacao-satb": { unitId: "s2-hmz", prerequisites: ["baixo-e-canto-dado"] },
  "escrita-ttbb": { unitId: "s2-hmz", prerequisites: ["harmonizacao-satb"] },
  "tres-vozes": { unitId: "s2-hmz", prerequisites: ["harmonizacao-satb"] },
  "texturas-vocais": { unitId: "s2-tex", prerequisites: ["harmonizacao-satb"] },
  "voicings-posicoes": { unitId: "s2-tex", prerequisites: ["texturas-vocais", "espacamento-cruzamento"] },
  "escrita-em-bloco": { unitId: "s2-tex", prerequisites: ["voicings-posicoes"] },
  "silabas-de-apoio": { unitId: "s2-tex", prerequisites: ["texturas-vocais", "voz-cantada"] },
  "contracanto-ativo-passivo": { unitId: "s2-tex", prerequisites: ["silabas-de-apoio", "duas-vozes"] },
  // 3º semestre
  "forma-e-energia": { unitId: "s3-for", prerequisites: ["texturas-vocais"] },
  "acompanhamento-introducoes": { unitId: "s3-for", prerequisites: ["forma-e-energia"] },
  "variacao-e-desenvolvimento": { unitId: "s3-for", prerequisites: ["acompanhamento-introducoes"] },
  "prosodia-respiracao": { unitId: "s3-txt", prerequisites: ["ritmo-metrica-texto", "harmonizacao-satb"] },
  "contraponto-aplicado": { unitId: "s3-txt", prerequisites: ["prosodia-respiracao", "notas-estranhas"] },
  "cp-primeira-especie": { unitId: "s3-ctp", prerequisites: ["contraponto-aplicado"] },
  "cp-segunda-terceira": { unitId: "s3-ctp", prerequisites: ["cp-primeira-especie"] },
  "cp-quarta-especie": { unitId: "s3-ctp", prerequisites: ["cp-segunda-terceira"] },
  "cp-florida": { unitId: "s3-ctp", prerequisites: ["cp-quarta-especie"] },
  "cp-imitacao": { unitId: "s3-ctp", prerequisites: ["cp-florida"] },
  "cp-quatro-vozes": { unitId: "s3-ctp", prerequisites: ["cp-quarta-especie"] },
  "cp-contracanto": { unitId: "s3-ctp", prerequisites: ["cp-quatro-vozes", "contracanto-ativo-passivo"] },
  "cp-descant-quodlibet": { unitId: "s3-ctp", prerequisites: ["cp-contracanto", "cp-imitacao"] },
  "tensoes-e-extensoes": { unitId: "s3-har", prerequisites: ["setimas-resolucao", "voicings-posicoes"] },
  "modulacao-reharmonizacao": { unitId: "s3-har", prerequisites: ["tensoes-e-extensoes"] },
  "harmonia-cromatica-moderna": { unitId: "s3-har", prerequisites: ["modulacao-reharmonizacao"] },
  // 4º semestre
  "rearm-fundamentos": { unitId: "s4-rea", prerequisites: ["modulacao-reharmonizacao", "harmonia-cromatica-moderna"] },
  "rearm-diatonica": { unitId: "s4-rea", prerequisites: ["rearm-fundamentos"] },
  "rearm-dominantes": { unitId: "s4-rea", prerequisites: ["rearm-diatonica"] },
  "rearm-subv": { unitId: "s4-rea", prerequisites: ["rearm-dominantes", "tensoes-e-extensoes"] },
  "rearm-modal": { unitId: "s4-rea", prerequisites: ["rearm-diatonica"] },
  "rearm-diminutos": { unitId: "s4-rea", prerequisites: ["rearm-dominantes"] },
  "rearm-baixo": { unitId: "s4-rea", prerequisites: ["rearm-diatonica"] },
  "rearm-no-arranjo": { unitId: "s4-rea", prerequisites: ["rearm-subv", "rearm-modal", "rearm-diminutos", "rearm-baixo"] },
  "arranjo-coral": { unitId: "s4-cor", prerequisites: ["variacao-e-desenvolvimento", "contraponto-aplicado"] },
  "a-cappella-pop": { unitId: "s4-pop", prerequisites: ["variacao-e-desenvolvimento", "silabas-de-apoio"] },
  "baixo-e-percussao-vocal": { unitId: "s4-pop", prerequisites: ["a-cappella-pop"] },
  "gospel-louvor": { unitId: "s4-gos", prerequisites: ["variacao-e-desenvolvimento", "tensoes-e-extensoes"] },
  "quarteto-masculino": { unitId: "s4-qtm", prerequisites: ["escrita-ttbb", "variacao-e-desenvolvimento"] },
  "ttbb-voicing-fechado": { unitId: "s4-qtm", prerequisites: ["quarteto-masculino"] },
  "ttbb-chamada-resposta": { unitId: "s4-qtm", prerequisites: ["ttbb-voicing-fechado"] },
  "ttbb-unissono-entradas": { unitId: "s4-qtm", prerequisites: ["ttbb-chamada-resposta"] },
  "ttbb-cores-gospel": { unitId: "s4-qtm", prerequisites: ["ttbb-voicing-fechado", "tensoes-e-extensoes"] },
  "ttbb-modulacao-final": { unitId: "s4-qtm", prerequisites: ["ttbb-cores-gospel", "modulacao-reharmonizacao"] },
  "acappella-solistas-dueto": { unitId: "s4-acp", prerequisites: ["quarteto-masculino"] },
  "acappella-texturas": { unitId: "s4-acp", prerequisites: ["acappella-solistas-dueto"] },
  "acappella-vocal-band": { unitId: "s4-acp", prerequisites: ["acappella-texturas", "baixo-e-percussao-vocal"] },
  "acappella-blocos-cromaticos": { unitId: "s4-acp", prerequisites: ["acappella-texturas", "harmonia-cromatica-moderna"] },
  "acappella-linhas-de-baixo": { unitId: "s4-acp", prerequisites: ["acappella-blocos-cromaticos"] },
  "acappella-modulacoes": { unitId: "s4-acp", prerequisites: ["acappella-linhas-de-baixo", "ttbb-modulacao-final"] },
  "ssa-formacao": { unitId: "s4-ssa", prerequisites: ["harmonizacao-satb", "escrita-ttbb"] },
  "ssa-tres-vozes": { unitId: "s4-ssa", prerequisites: ["ssa-formacao", "tres-vozes"] },
  "ssa-quatro-vozes": { unitId: "s4-ssa", prerequisites: ["ssa-tres-vozes"] },
  "ssa-baixo": { unitId: "s4-ssa", prerequisites: ["ssa-quatro-vozes"] },
  "ssa-coro-infantil": { unitId: "s4-ssa", prerequisites: ["ssa-tres-vozes"] },
  "ssa-texturas": { unitId: "s4-ssa", prerequisites: ["ssa-baixo", "texturas-vocais"] },
  "ssa-adaptacao": { unitId: "s4-ssa", prerequisites: ["ssa-baixo"] },
  "ssa-cores": { unitId: "s4-ssa", prerequisites: ["ssa-texturas", "ssa-adaptacao", "tensoes-e-extensoes"] },
  "mpb-vocal": { unitId: "s4-mpb", prerequisites: ["tensoes-e-extensoes", "modulacao-reharmonizacao"] },
  "analise-de-repertorio": { unitId: "s4-prf", prerequisites: ["variacao-e-desenvolvimento"] },
  "analise-estilistica-revisao": { unitId: "s4-prf", prerequisites: ["analise-de-repertorio", "modulacao-reharmonizacao"] },
  "partitura-e-ensaio": { unitId: "s4-prf", prerequisites: ["analise-estilistica-revisao"] },
};

const ALL_LESSONS: readonly Lesson[] = [
  lessonOficio,
  lessonProcesso,
  lessonLeadSheet,
  lessonVozes,
  lessonVozCantada,
  lessonRitmo,
  lessonIntervalos,
  lessonEscalas,
  lessonTriades,
  lessonTetrades,
  lessonFuncoes,
  lessonCadencias,
  lessonMovimentos,
  lessonParalelas,
  lessonEspacamento,
  lessonDuplicacoes,
  lessonNotasEstranhas,
  lessonSetimas,
  lessonAnaliseMelodica,
  lessonDuasVozes,
  lessonBaixoCantoDado,
  lessonHarmonizacao,
  lessonEscritaTtbb,
  lessonTresVozes,
  lessonTexturas,
  lessonVoicings,
  lessonEscritaBloco,
  lessonSilabas,
  lessonContracantoAtivoPassivo,
  lessonFormaEnergia,
  lessonAcompanhamento,
  lessonVariacao,
  lessonProsodia,
  lessonContraponto,
  lessonCpPrimeira,
  lessonCpSegundaTerceira,
  lessonCpQuarta,
  lessonCpFlorida,
  lessonCpImitacao,
  lessonCpQuatroVozes,
  lessonCpContracanto,
  lessonCpDescant,
  lessonTensoes,
  lessonModulacao,
  lessonHarmoniaCromatica,
  lessonRearmFundamentos,
  lessonRearmDiatonica,
  lessonRearmDominantes,
  lessonRearmSubV,
  lessonRearmModal,
  lessonRearmDiminutos,
  lessonRearmBaixo,
  lessonRearmNoArranjo,
  lessonArranjoCoral,
  lessonACappellaPop,
  lessonBaixoPercussao,
  lessonGospel,
  lessonQuartetoMasculino,
  lessonTtbbVoicing,
  lessonTtbbChamadaResposta,
  lessonTtbbUnissono,
  lessonTtbbCores,
  lessonTtbbModulacao,
  lessonAcappellaSolistas,
  lessonAcappellaTexturas,
  lessonAcappellaVocalBand,
  lessonAcappellaBlocos,
  lessonAcappellaBaixo,
  lessonAcappellaModulacoes,
  lessonSsaFormacao,
  lessonSsaTresVozes,
  lessonSsaQuatroVozes,
  lessonSsaBaixo,
  lessonSsaInfantil,
  lessonSsaTexturas,
  lessonSsaAdaptacao,
  lessonSsaCores,
  lessonMpbVocal,
  lessonAnaliseRepertorio,
  lessonEstilo,
  lessonPartituraEnsaio,
];

function place(lesson: Lesson): Lesson {
  const p = PLACEMENT[lesson.id];
  if (!p) throw new Error(`Aula sem posição na grade: ${lesson.id}`);
  const level = LEVELS.find((lv) => lv.units.some((u) => u.id === p.unitId));
  if (!level) throw new Error(`Disciplina inexistente: ${p.unitId}`);
  return { ...lesson, levelId: level.id, unitId: p.unitId, prerequisites: p.prerequisites };
}

/** Aulas na ordem da grade (semestre → disciplina → aula). */
export const LESSONS: readonly Lesson[] = LEVELS.flatMap((lv) =>
  lv.units.flatMap((u) =>
    u.lessonIds.map((id) => {
      const lesson = ALL_LESSONS.find((l) => l.id === id);
      if (!lesson) throw new Error(`Aula inexistente: ${id}`);
      return place(lesson);
    }),
  ),
);

/** Carga horária estimada de uma disciplina (soma das aulas), em horas. */
export function unitHours(unit: Level["units"][number]): number {
  const minutes = unit.lessonIds.reduce((acc, id) => acc + (LESSONS.find((l) => l.id === id)?.estimatedMinutes ?? 0), 0);
  return Math.max(1, Math.round(minutes / 60));
}

export function getUnit(unitId: string): { level: Level; unit: Level["units"][number] } | undefined {
  for (const level of LEVELS) {
    const unit = level.units.find((u) => u.id === unitId);
    if (unit) return { level, unit };
  }
  return undefined;
}

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

export function lessonsOfUnit(unitId: string): Lesson[] {
  return LESSONS.filter((l) => l.unitId === unitId);
}

export const COMPETENCIES: Readonly<Record<CompetencyId, string>> = {
  "leitura-vocal": "Leitura e escrita vocal",
  intervalos: "Intervalos",
  acordes: "Acordes",
  "harmonia-funcional": "Harmonia funcional",
  "conducao-de-vozes": "Condução de vozes",
  "escrita-satb": "Escrita SATB",
  "escrita-ttbb": "Escrita TTBB",
  "escrita-ssaa": "Escrita SSA/SSAA",
  percepcao: "Percepção auditiva",
  contraponto: "Contraponto",
  "texto-e-prosodia": "Texto e prosódia",
  arranjo: "Arranjo",
};
