import { scoreFromText } from "@/domain/music/text-notation";
import type { StyleProfileId } from "@/domain/music/score";

/**
 * Exemplos (originais) das aulas de arranjo. Cada veredito usado nas aulas é
 * conferido pelo motor de validação no teste de integridade do currículo,
 * sempre no estilo indicado em `style`.
 */
type S = Record<"S" | "A" | "T" | "B", string>;
const satb = (id: string, title: string, voices: S, opts: { key?: string; time?: string; tempo?: number; style?: StyleProfileId } = {}) =>
  scoreFromText({ id, title, formation: "SATB", key: opts.key ?? "C", time: opts.time ?? "4/4", voices, ...(opts.tempo ? { tempo: opts.tempo } : {}), ...(opts.style ? { style: opts.style } : {}) });
const ttbb = (id: string, title: string, voices: Record<"T1" | "T2" | "B1" | "B2", string>, opts: { key?: string; time?: string; style?: StyleProfileId } = {}) =>
  scoreFromText({ id, title, formation: "TTBB", key: opts.key ?? "G", time: opts.time ?? "4/4", voices, ...(opts.style ? { style: opts.style } : {}) });

const R = (n: number) => Array.from({ length: n }, () => "r:w").join(" | ");

/**
 * Melodia usada como fio condutor das aulas de arranjo: a 2ª frase do "Hino à Alegria"
 * (Beethoven, 9ª Sinfonia, 1824; texto de Schiller, 1785), em Sol maior. Domínio público;
 * melodia conferida na transcrição da Wikipédia (Ode to Joy). As harmonizações são do curso.
 */
export const MELODIA = 'B4:q"Wir B4:q"be- C5:q"tre- D5:q"ten | D5:q"feu- C5:q"er- B4:q"trun- A4:q"ken, | G4:q"Himm- G4:q"li- A4:q"sche, B4:q"dein | A4:q."Hei- G4:8"lig- G4:h"tum!';
const G = { key: "G" } as const;
/** A mesma melodia uma oitava abaixo (tenores). */
const MELODIA_8VB = MELODIA.replace(/([A-G][#b]?)(\d)/g, (_, n: string, o: string) => `${n}${Number(o) - 1}`);

export const EXA = {
  melodiaSo: satb("exa-melodia-so", "Hino à Alegria (2ª frase) — a melodia sozinha", { S: MELODIA, A: R(4), T: R(4), B: R(4) }, G),
  melodiaHarmonizada: satb(
    "exa-melodia-harmonizada",
    "Hino à Alegria — harmonização em bloco (homofonia): G – C/E | D7 – G | Em – Am | D – G",
    {
      S: MELODIA,
      A: "G4:h G4:h | F#4:h D4:h | E4:h E4:h | F#4:h D4:h",
      T: "D4:h C4:h | A3:h G3:h | B3:h C4:h | A3:h B3:h",
      B: "G2:h E3:h | D3:h G2:h | E3:h A2:h | D3:h G2:h",
    },
    G,
  ),
  unissonoOitavas: satb("exa-unissono-oitavas", "Hino à Alegria — melodia em oitavas (sopranos e tenores)", { S: MELODIA, A: R(4), T: MELODIA_8VB, B: R(4) }, G),
  unissonoOitavasPop: satb(
    "exa-unissono-oitavas-pop",
    "Hino à Alegria — melodia em oitavas, avaliada no estilo popular",
    { S: MELODIA, A: R(4), T: MELODIA_8VB, B: R(4) },
    { ...G, style: "popular-a-cappella" },
  ),
  melodiaPad: satb(
    "exa-melodia-pad",
    "Melodia com 'pad' de vozes sustentadas em 'uh'",
    {
      S: MELODIA,
      A: 'G4:w"uh | G4:w | E4:h E4:h | F#4:h D4:h',
      T: 'D4:w"uh | D4:w | B3:h C4:h | A3:h B3:h',
      B: 'B2:w"uh | B2:w | E3:h A2:h | D3:h G2:h',
    },
    G,
  ),
  melodiaNoTenor: satb(
    "exa-melodia-no-tenor",
    "A melodia passa para o tenor",
    {
      S: "D5:w | D5:w | D5:h C5:h | A4:h B4:h",
      A: "G4:w | G4:w | G4:h E4:h | F#4:h G4:h",
      T: MELODIA_8VB,
      B: "B2:w | B2:w | B2:h A2:h | D3:h G2:h",
    },
    G,
  ),
  tresVozes: satb("exa-tres-vozes", "Três vozes (SAB): soprano, contralto e baixo", { S: "C5:h B4:h | C5:w", A: "E4:h D4:h | E4:w", T: "r:w | r:w", B: "C3:h G2:h | C3:w" }),
  tresVozesSemTerca: satb("exa-tres-vozes-sem-terca", "Três vozes em quintas e oitavas, sem terça", { S: "G4:h D5:h | C5:w", A: "C4:h G4:h | G4:w", T: "r:w | r:w", B: "C3:h G2:h | C3:w" }),
  fechado: satb("exa-fechado", "Posição fechada: soprano, contralto e tenor dentro de uma oitava", { S: "G4:h A4:h | G4:w", A: "E4:h F4:h | E4:w", T: "C4:h C4:h | C4:w", B: "C3:h F3:h | C3:w" }),
  aberto: satb("exa-aberto", "Posição aberta: mais de uma oitava entre soprano e tenor", { S: "E5:h D5:h | E5:w", A: "G4:h G4:h | G4:w", T: "C4:h B3:h | C4:w", B: "C3:h G2:h | C3:w" }),
  dropPop: satb(
    "exa-drop-pop",
    "Tétrades em bloco paralelo (Cmaj7 – Dm7 – G7 – Cmaj7), estilo popular",
    { S: "B4:h C5:h | B4:h B4:h", A: "G4:h A4:h | F4:h G4:h", T: "E4:h F4:h | D4:h E4:h", B: "C3:h D3:h | G2:h C3:h" },
    { style: "popular-a-cappella" },
  ),
  dropTradicional: satb("exa-drop-tradicional", "As mesmas tétrades em bloco, avaliadas no coral tradicional", {
    S: "B4:h C5:h | B4:h B4:h",
    A: "G4:h A4:h | F4:h G4:h",
    T: "E4:h F4:h | D4:h E4:h",
    B: "C3:h D3:h | G2:h C3:h",
  }),
  add9Sus: satb(
    "exa-add9-sus",
    "Csus4 → C, depois Cadd9 → Fadd9 (estilo popular)",
    { S: "F4:h E4:h | E4:h G4:h", A: "C4:w | D4:h C4:h", T: "G3:w | G3:h A3:h", B: "C3:w | C3:h F3:h" },
    { style: "popular-a-cappella" },
  ),
  add9Tradicional: satb("exa-add9-tradicional", "Cadd9 sem resolução, no coral tradicional", { S: "D5:w", A: "G4:w", T: "E4:w", B: "C3:w" }),
  popLeadBacking: satb(
    "exa-pop-lead-backing",
    "Pop a cappella: lead, backing em 'dum' e baixo vocal",
    {
      S: MELODIA.split(" | ").slice(0, 2).join(" | "),
      A: 'r:q G4:q"dum r:q G4:q"dum | r:q F#4:q"dum r:q G4:q"dum',
      T: 'r:q D4:q"dum r:q E4:q"dum | r:q A3:q"dum r:q D4:q"dum',
      B: 'G2:q"dm r:q C3:q"dm r:q | D3:q"dm r:q G2:q"dm r:q',
    },
    { ...G, style: "popular-a-cappella" },
  ),
  baixoVocal: satb(
    "exa-baixo-vocal",
    "Linha de baixo vocal caminhando por graus (C – Am – Dm – G)",
    { S: R(4), A: R(4), T: R(4), B: 'C3:q"dm D3:q E3:q G3:q | A3:q G3:q E3:q C3:q | D3:q E3:q F3:q A3:q | G3:q F3:q D3:q B2:q' },
    { style: "popular-a-cappella" },
  ),
  baixoVocalGrave: satb("exa-baixo-vocal-grave", "Baixo vocal abaixo da extensão", { S: R(1), A: R(1), T: R(1), B: "C2:q E2:q G2:q C3:q" }, { style: "popular-a-cappella" }),
  gospelBloco: satb(
    "exa-gospel-bloco",
    "Gospel: três vozes em bloco sobre o baixo (I – IV/I – I)",
    { S: "G4:q A4:q G4:h", A: "E4:q F4:q E4:h", T: "C4:q C4:q C4:h", B: "C3:w" },
    { style: "popular-a-cappella" },
  ),
  gospelBlocoParalelo: satb(
    "exa-gospel-bloco-paralelo",
    "Gospel: tríades paralelas (I – ii – iii – ii)",
    { S: "G4:q A4:q B4:q A4:q", A: "E4:q F4:q G4:q F4:q", T: "C4:q D4:q E4:q D4:q", B: "C3:q D3:q E3:q D3:q" },
    { style: "popular-a-cappella" },
  ),
  bossa: satb(
    "exa-bossa",
    "Bossa: Dm7 – G7 – Cmaj7",
    { S: "C5:h B4:h | B4:w", A: "F4:h F4:h | G4:w", T: "A3:h G3:h | E4:w", B: "D3:h G2:h | C3:w" },
    { style: "popular-a-cappella" },
  ),
  coralSuspensao: satb("exa-coral-suspensao", "Coral sacro: retardo 4–3 na cadência", { S: "C5:h~ C5:q B4:q | C5:w", A: "G4:h G4:h | G4:w", T: "E4:h D4:h | E4:w", B: "C3:h G2:h | C3:w" }),
  partituraLimpa: satb("exa-partitura-limpa", "Trecho de ensaio com letra em todas as vozes", {
    S: 'G4:q"Can- A4:q"ta G4:q"o F4:q"co- | E4:w"ro',
    A: 'E4:q"Can- F4:q"ta E4:q"o D4:q"co- | C4:w"ro',
    T: 'C4:q"Can- C4:q"ta C4:q"o B3:q"co- | G3:w"ro',
    B: 'C3:q"Can- F3:q"ta C3:q"o G3:q"co- | C3:w"ro',
  }),
  tessituraAlta: satb("exa-tessitura-alta", "Soprano amador sustentado em Lá5", { S: "A5:w | A5:w", A: "C5:w | C5:w", T: "F4:w | F4:w", B: "F3:w | F3:w" }, { key: "F" }),
  ttbbMelodiaT2: ttbb("exa-ttbb-t2", "TTBB com a melodia no Tenor II", { T1: "B3:h C4:h | B3:w", T2: "G3:h A3:h | G3:w", B1: "D3:h E3:h | D3:w", B2: "G2:h C3:h | G2:w" }),
  // 2º semestre — duas vozes e contracanto
  duetoTercas: satb(
    "exa-dueto-tercas",
    "Dueto: a segunda voz em terças e sextas sob a melodia",
    {
      S: MELODIA,
      A: 'G4:q"Wir G4:q"be- A4:q"tre- F#4:q"ten | B4:q"feu- A4:q"er- G4:q"trun- F#4:q"ken, | E4:q"Himm- E4:q"li- F#4:q"sche, G4:q"dein | F#4:q."Hei- E4:8"lig- B3:h"tum!',
      T: R(4),
      B: R(4),
    },
    G,
  ),
  contracantoAtivo: satb(
    "exa-contracanto-ativo",
    "Contracanto ativo no tenor: move-se quando a melodia para",
    {
      S: MELODIA,
      A: "G4:h G4:h | F#4:h D4:h | E4:h E4:h | F#4:h D4:h",
      T: 'D4:h"uh C4:h | A3:w | B3:h C4:h | A3:q C4:q B3:q D4:q',
      B: "G2:h E3:h | D3:h G2:h | E3:h A2:h | D3:h G2:h",
    },
    G,
  ),
  // 2º semestre — escrita em bloco (estilo popular)
  quartas: satb(
    "exa-quartas",
    "Acorde por quartas sobre Dó (estrutura quartal)",
    { S: "D5:w", A: "A4:w", T: "E4:w", B: "C3:w" },
    { style: "popular-a-cappella" },
  ),
  // 3º semestre — harmonia cromática
  emprestimo: satb("exa-emprestimo", "Empréstimo modal: I – iv – I (Fá menor dentro de Dó maior)", {
    S: "C5:h C5:h | C5:w",
    A: "G4:h Ab4:h | G4:w",
    T: "E4:h C4:h | E4:w",
    B: "C3:h F3:h | C3:w",
  }),
  // Laboratório — exercícios em branco
  exercicioBaixoDado: satb("exa-exercicio-baixo-dado", "Exercício: baixo dado (escreva soprano, contralto e tenor)", {
    S: R(3),
    A: R(3),
    T: R(3),
    B: "C3:q F3:q G3:q C3:q | A2:q D3:q G2:h | C3:w",
  }),
  exercicioCantoDado: satb("exa-exercicio-canto-dado", "Exercício: canto dado (escreva contralto, tenor e baixo)", { S: MELODIA, A: R(4), T: R(4), B: R(4) }, G),
} as const;
