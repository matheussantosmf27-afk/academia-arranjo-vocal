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

/** Melodia original usada como fio condutor do curso ("Canção do Caminho"). */
const MELODIA = 'E4:q"Vou G4:q"pe- A4:q"lo G4:q"ca- | C5:h"mi- G4:h"nho | A4:q"com C5:q"a B4:h"gen- | C5:h."te r:q';

export const EXA = {
  melodiaSo: satb("exa-melodia-so", "Canção do Caminho — a melodia sozinha", { S: MELODIA, A: R(4), T: R(4), B: R(4) }),
  melodiaHarmonizada: satb("exa-melodia-harmonizada", "Canção do Caminho — harmonização em bloco (homofonia)", {
    S: MELODIA,
    A: "C4:q E4:h. | F4:h E4:h | E4:h G4:h | E4:h. r:q",
    T: "G3:h C4:h | C4:h C4:h | C4:h D4:h | C4:h. r:q",
    B: "C3:w | A2:h C3:h | C3:h G2:h | C3:h. r:q",
  }),
  unissonoOitavas: satb("exa-unissono-oitavas", "Canção do Caminho — melodia em oitavas (sopranos e tenores)", {
    S: MELODIA,
    A: R(4),
    T: "E3:q G3:q A3:q G3:q | C4:h G3:h | A3:q C4:q B3:h | C4:h. r:q",
    B: R(4),
  }),
  unissonoOitavasPop: satb(
    "exa-unissono-oitavas-pop",
    "Canção do Caminho — melodia em oitavas, avaliada no estilo popular",
    { S: MELODIA, A: R(4), T: "E3:q G3:q A3:q G3:q | C4:h G3:h | A3:q C4:q B3:h | C4:h. r:q", B: R(4) },
    { style: "popular-a-cappella" },
  ),
  melodiaPad: satb("exa-melodia-pad", "Melodia com 'pad' de vozes sustentadas em 'uh'", {
    S: MELODIA,
    A: 'C4:q"uh E4:h. | E4:w | E4:h G4:h | E4:h. r:q',
    T: 'G3:w"uh | G3:w | C4:h D4:h | C4:h. r:q',
    B: 'C3:w"uh | C3:w | C3:h G2:h | C3:h. r:q',
  }),
  melodiaNoTenor: satb("exa-melodia-no-tenor", "A melodia passa para o tenor", {
    S: "G4:w | G4:w | C5:h D5:h | C5:h. r:q",
    A: "C4:q E4:h. | E4:w | E4:h D4:h | E4:h. r:q",
    T: 'E3:q"Vou G3:q"pe- A3:q"lo G3:q"ca- | C4:h"mi- G3:h"nho | A3:q"com C4:q"a B3:h"gen- | C4:h."te r:q',
    B: "C3:w | C3:w | C3:h G2:h | C3:h. r:q",
  }),
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
      S: 'E4:q"Vou G4:q"pe- A4:q"lo G4:q"ca- | C5:h"mi- G4:h"nho',
      A: 'r:q C4:q"dum r:q C4:q"dum | r:q E4:q"dum r:q E4:q"dum',
      T: 'r:q G3:q"dum r:q G3:q"dum | r:q G3:q"dum r:q G3:q"dum',
      B: 'C3:q"dm r:q G2:q"dm r:q | C3:q"dm r:q C3:q"dm r:q',
    },
    { style: "popular-a-cappella" },
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
  duetoTercas: satb("exa-dueto-tercas", "Dueto: a segunda voz em terças e sextas sob a melodia", {
    S: MELODIA,
    A: 'C4:q"Vou E4:q"pe- F4:q"lo E4:q"ca- | E4:h"mi- E4:h"nho | F4:q"com E4:q"a G4:h"gen- | E4:h."te r:q',
    T: R(4),
    B: R(4),
  }),
  contracantoAtivo: satb("exa-contracanto-ativo", "Contracanto ativo no tenor: move-se quando a melodia para", {
    S: MELODIA,
    A: "C4:q E4:h. | F4:h E4:h | E4:h G4:h | E4:h. r:q",
    T: 'G3:h"uh C4:h | C4:q A3:q G3:q C4:q | C4:h D4:h | C4:q G3:q C4:q r:q',
    B: "C3:w | A2:h C3:h | C3:h G2:h | C3:h. r:q",
  }),
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
  exercicioCantoDado: satb("exa-exercicio-canto-dado", "Exercício: canto dado (escreva contralto, tenor e baixo)", { S: MELODIA, A: R(4), T: R(4), B: R(4) }),
} as const;
