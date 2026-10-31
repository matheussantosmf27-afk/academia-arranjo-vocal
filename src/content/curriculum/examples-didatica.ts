import { scoreFromText } from "@/domain/music/text-notation";
import { MELODIA } from "./examples-arranjo";

/**
 * Partituras das demonstrações passo a passo e dos exercícios independentes
 * (originais). Vereditos conferidos pelo motor no teste de integridade.
 */
type Style = "coral-tradicional" | "coral-contemporaneo" | "popular-a-cappella";
const satb = (id: string, title: string, voices: Record<"S" | "A" | "T" | "B", string>, opts: { key?: string; time?: string; tempo?: number; style?: Style } = {}) =>
  scoreFromText({ id, title, formation: "SATB", key: opts.key ?? "C", time: opts.time ?? "4/4", voices, ...(opts.tempo ? { tempo: opts.tempo } : {}), ...(opts.style ? { style: opts.style } : {}) });
const ttbb = (id: string, title: string, voices: Record<"T1" | "T2" | "B1" | "B2", string>, opts: { key?: string; time?: string; style?: Style } = {}) =>
  scoreFromText({ id, title, formation: "TTBB", key: opts.key ?? "G", time: opts.time ?? "4/4", voices, ...(opts.style ? { style: opts.style } : {}) });
const ssaa = (id: string, title: string, voices: Record<"S1" | "S2" | "A1" | "A2", string>, opts: { key?: string } = {}) =>
  scoreFromText({ id, title, formation: "SSAA", key: opts.key ?? "C", time: "4/4", voices });
/** Vozes em pausa, compasso a compasso (4/4). */
const rests = (bars: number) => Array.from({ length: bars }, () => "r:w").join(" | ");

export const EXD = {
  // ——— Cadências ———
  cadImperfeita: satb("exd-cad-imperfeita", "Autêntica imperfeita (terça no soprano)", { S: "D5:h E5:h", A: "G4:h G4:h", T: "B3:h C4:h", B: "G2:h C3:h" }),
  cadSolPasso: satb("exd-cad-sol", "Autêntica perfeita em Sol: sensível no tenor, terça vinda do contralto", { S: "A4:h G4:h", A: "D4:h B3:h", T: "F#3:h G3:h", B: "D3:h G2:h" }, { key: "G" }),
  cadSolFrustrada: satb("exd-cad-sol-frustrada", "Variante: sensível do contralto desce à quinta do I", { S: "A4:h G4:h", A: "F#4:h D4:h", T: "A3:h B3:h", B: "D3:h G2:h" }, { key: "G" }),
  cadSolDobrada: satb("exd-cad-sol-dobrada", "Primeira tentativa: sensível dobrada", { S: "A4:h G4:h", A: "F#4:h G4:h", T: "F#3:h G3:h", B: "D3:h G2:h" }, { key: "G" }),
  desafioCadStart: satb("exd-desafio-cad", "Pergunta e resposta: soprano dado", { S: 'C5:h"Vens B4:h"já? | D5:h"Sim, C5:h"vou.', A: rests(2), T: rests(2), B: rests(2) }),
  desafioCadSol: satb("exd-desafio-cad-sol", "Solução: I – V | V7 – I", { S: 'C5:h"Vens B4:h"já? | D5:h"Sim, C5:h"vou.', A: "E4:h D4:h | F4:h E4:h", T: "G3:h G3:h | B3:h C4:h", B: "C3:h G2:h | G2:h C3:h" }),

  // ——— Paralelas ———
  parTentativa: satb("exd-par-tentativa", "Correção parcial: o baixo mudou, o tenor não", { S: "G4:h A4:h", A: "E4:h F4:h", T: "C4:h D4:h", B: "C3:h F3:h" }),
  parCorrigida: satb("exd-par-corrigida", "Soprano mantido, I → ii⁶ sem paralelas", { S: "G4:h A4:h", A: "E4:h D4:h", T: "C4:h A3:h", B: "C3:h F3:h" }),
  desafioParStart: satb("exd-desafio-par", "Vozes externas dadas: I – IV – V – I em Ré", { S: "D5:h D5:h | C#5:h D5:h", A: rests(2), T: rests(2), B: "D3:h G2:h | A2:h D3:h" }, { key: "D" }),
  desafioParSol: satb("exd-desafio-par-sol", "Solução: vozes superiores em movimento contrário ao baixo", { S: "D5:h D5:h | C#5:h D5:h", A: "F#4:h G4:h | E4:h F#4:h", T: "A3:h B3:h | A3:h A3:h", B: "D3:h G2:h | A2:h D3:h" }, { key: "D" }),

  // ——— Harmonização SATB ———
  harmDemoStart: satb("exd-harm-demo", "Melodia dada em Sol maior", { S: "B4:h A4:h | G4:h C5:h | B4:h A4:h | G4:w", A: rests(4), T: rests(4), B: rests(4) }, { key: "G" }),
  harmDemoSB: satb("exd-harm-demo-sb", "Passo 3: soprano e baixo", { S: "B4:h A4:h | G4:h C5:h | B4:h A4:h | G4:w", A: rests(4), T: rests(4), B: "G3:h F#3:h | G3:h E3:h | D3:h D3:h | G2:w" }, { key: "G" }),
  harmDemoBloco: satb("exd-harm-demo-bloco", "Vozes internas 'em bloco' sob o soprano", { S: "B4:h A4:h | G4:h C5:h | B4:h A4:h | G4:w", A: "G4:h F#4:h | D4:h E4:h | G4:h F#4:h | D4:w", T: "D4:h D4:h | B3:h C4:h | D4:h D4:h | B3:w", B: "G3:h F#3:h | G3:h E3:h | D3:h D3:h | G2:w" }, { key: "G" }),
  harmDemo: satb("exd-harm-demo-final", "Resultado: I – V⁶ | I – IV⁶ | I⁶₄ – V | I", { S: "B4:h A4:h | G4:h C5:h | B4:h A4:h | G4:w", A: "G4:h D4:h | D4:h C4:h | D4:h D4:h | B3:w", T: "D4:h A3:h | B3:h G3:h | G3:h F#3:h | G3:w", B: "G3:h F#3:h | G3:h E3:h | D3:h D3:h | G2:w" }, { key: "G" }),
  harmChalStart: satb("exd-desafio-harm", "Melodia dada em Mi maior", { S: "B4:h C#5:h | B4:h A4:h | G#4:h F#4:h | E4:w", A: rests(4), T: rests(4), B: rests(4) }, { key: "E" }),
  harmChalSol: satb("exd-desafio-harm-sol", "Solução: I – IV | I – V⁶₅ | I – V | I", { S: "B4:h C#5:h | B4:h A4:h | G#4:h F#4:h | E4:w", A: "G#4:h E4:h | E4:h B3:h | E4:h D#4:h | B3:w", T: "B3:h A3:h | G#3:h F#3:h | B3:h B3:h | G#3:w", B: "E3:h A2:h | E3:h D#3:h | E3:h B2:h | E3:w" }, { key: "E" }),
  // ——— 1º semestre ———
  procStart: satb("exd-desafio-processo", "Hino à Alegria: escreva o baixo do esqueleto", { S: MELODIA, A: rests(4), T: rests(4), B: rests(4) }, { key: "G" }),
  procSol: satb("exd-desafio-processo-sol", "Esqueleto: soprano e baixo", { S: MELODIA, A: rests(4), T: rests(4), B: "G2:h E3:h | D3:h G2:h | E3:h A2:h | D3:h G2:h" }, { key: "G" }),
  ritmoStart: satb("exd-desafio-ritmo", "'Caminhar contigo' com as tônicas fora do lugar", { S: 'E4:q"ca- F4:q"mi- G4:q"nhar | C5:q"con- B4:q"ti- A4:q"go | G4:h.', A: "r:h. | r:h. | r:h.", T: "r:h. | r:h. | r:h.", B: "r:h. | r:h. | r:h." }, { time: "3/4" }),
  ritmoSol: satb("exd-desafio-ritmo-sol", "Com anacruse: NHAR e TI nos tempos fortes", { S: 'r:q E4:q"ca- F4:q"mi- | G4:h"nhar C5:q"con- | B4:h"ti- A4:q"go | G4:h.', A: "r:h. | r:h. | r:h. | r:h.", T: "r:h. | r:h. | r:h. | r:h.", B: "r:h. | r:h. | r:h. | r:h." }, { time: "3/4" }),
  intStart: satb("exd-desafio-intervalos", "Contralto dado: escreva o soprano em 3ªs e 6ªs", { S: rests(4), A: "C4:h D4:h | E4:h F4:h | E4:h D4:h | C4:w", T: rests(4), B: rests(4) }),
  intSol: satb("exd-desafio-intervalos-sol", "Dueto em 3ªs e 6ªs", { S: "E4:h B4:h | C5:h A4:h | G4:h F4:h | E4:w", A: "C4:h D4:h | E4:h F4:h | E4:h D4:h | C4:w", T: rests(4), B: rests(4) }),
  triStart: satb("exd-desafio-triades", "Soprano e baixo dados: I – I⁶ | IV – V | I em Sol", { S: "D5:h D5:h | C5:h A4:h | G4:w", A: "r:w | r:w | r:w", T: "r:w | r:w | r:w", B: "G2:h B2:h | C3:h D3:h | G2:w" }, { key: "G" }),
  triSol: satb("exd-desafio-triades-sol", "Solução: duplicações escolhidas acorde a acorde", { S: "D5:h D5:h | C5:h A4:h | G4:w", A: "G4:h G4:h | E4:h D4:h | B3:w", T: "B3:h G3:h | G3:h F#3:h | G3:w", B: "G2:h B2:h | C3:h D3:h | G2:w" }, { key: "G" }),
  tetStart: satb("exd-desafio-tetrades", "Três dominantes com sétima: soprano e baixo dados", { S: "D5:h C5:h | G4:h G4:h | B4:h C5:h", A: "r:w | r:w | r:w", T: "r:w | r:w | r:w", B: "G2:h C3:h | B2:h C3:h | D3:h E3:h" }),
  tetSol: satb("exd-desafio-tetrades-sol", "Solução: V7 → I | V⁶₅ → I | V⁴₃ → I⁶", { S: "D5:h C5:h | G4:h G4:h | B4:h C5:h", A: "F4:h E4:h | F4:h E4:h | F4:h G4:h", T: "B3:h C4:h | D4:h C4:h | G3:h C4:h", B: "G2:h C3:h | B2:h C3:h | D3:h E3:h" }),
  funStart: satb("exd-desafio-funcoes", "Soprano dado: T – S – D – T", { S: "G4:h A4:h | B4:h C5:h", A: "r:w | r:w", T: "r:w | r:w", B: "r:w | r:w" }),
  funSol: satb("exd-desafio-funcoes-sol", "Solução: I – ii⁶ – V – I", { S: "G4:h A4:h | B4:h C5:h", A: "E4:h D4:h | D4:h E4:h", T: "C4:h A3:h | G3:h G3:h", B: "C3:h F3:h | G3:h C3:h" }),
  // ——— 2º semestre ———
  movStart: satb("exd-desafio-movimentos", "Soprano dado: escreva o baixo", { S: "E5:h C5:h | D5:h C5:h | C5:h B4:h | C5:w", A: rests(4), T: rests(4), B: rests(4) }),
  movSol: satb("exd-desafio-movimentos-sol", "Solução: paralelo, contrário, oblíquo e direto", { S: "E5:h C5:h | D5:h C5:h | C5:h B4:h | C5:w", A: rests(4), T: rests(4), B: "C3:h A2:h | G2:h C3:h | A2:h G2:h | C3:w" }),
  espStart: ttbb("exd-desafio-espacamento", "TTBB com o grave embolado", { T1: "D4:h E4:h | D4:h D4:h", T2: "G3:h G3:h | F#3:h G3:h", B1: "B2:h C3:h | A2:h B2:h", B2: "G2:h C3:h | D2:h G2:h" }),
  espSol: ttbb("exd-desafio-espacamento-sol", "Solução: quintas e oitavas no grave, terças nos tenores", { T1: "D4:h E4:h | D4:h D4:h", T2: "B3:h C4:h | A3:h B3:h", B1: "G3:h G3:h | F#3:h G3:h", B2: "G2:h C3:h | D3:h G2:h" }),
  dupStart: satb("exd-desafio-duplicacoes", "V – vi | V – I: soprano e baixo dados", { S: "D5:h C5:h | B4:h C5:h", A: rests(2), T: rests(2), B: "G2:h A2:h | G2:h C3:h" }),
  dupSol: satb("exd-desafio-duplicacoes-sol", "Solução: terça dobrada no vi, fundamental dobrada no V", { S: "D5:h C5:h | B4:h C5:h", A: "G4:h E4:h | G4:h G4:h", T: "B3:h C4:h | D4:h E4:h", B: "G2:h A2:h | G2:h C3:h" }),
  nctStart: satb("exd-desafio-nct", "Coral simples em Si♭: I – IV | V – I", { S: "D5:h Eb5:h | C5:h Bb4:h", A: "F4:h G4:h | F4:h D4:h", T: "Bb3:h Bb3:h | A3:h Bb3:h", B: "Bb2:h Eb3:h | F3:h Bb2:h" }, { key: "Bb" }),
  nctSol: satb("exd-desafio-nct-sol", "Solução: retardo 4–3 no tenor e sétima de passagem no contralto", { S: "D5:h Eb5:h | C5:h Bb4:h", A: "F4:h G4:h | F4:q Eb4:q D4:h", T: "Bb3:h Bb3:h~ | Bb3:q A3:q Bb3:h", B: "Bb2:h Eb3:h | F3:h Bb2:h" }, { key: "Bb" }),
  setStart: satb("exd-desafio-setimas", "Cadeia de sétimas: soprano e baixo dados", { S: "C5:h C5:h | B4:h C5:h", A: rests(2), T: rests(2), B: "C3:h D3:h | G2:h C3:h" }),
  setSol: satb("exd-desafio-setimas-sol", "Solução: I – ii7 – V7 – I", { S: "C5:h C5:h | B4:h C5:h", A: "E4:h D4:h | D4:h C4:h", T: "G3:h F3:h | F3:h E3:h", B: "C3:h D3:h | G2:h C3:h" }),
  setDemo: satb("exd-setimas-demo", "I – ii⁶₅ – V – I: a sétima do ii preparada no soprano", { S: "C5:h C5:h | B4:h C5:h", A: "E4:h D4:h | D4:h E4:h", T: "G3:h A3:h | G3:h G3:h", B: "C3:h F3:h | G3:h C3:h" }),
  amStart: satb("exd-desafio-analise-melodica", "Melodia para analisar", { S: "G4:q A4:q B4:q G4:q | C5:h B4:h | A4:q B4:q C5:q E5:q | D5:w", A: rests(4), T: rests(4), B: rests(4) }),
  duasStart: satb("exd-desafio-duas-vozes", "Melodia dada: escreva a segunda voz", { S: "C5:q D5:q E5:q C5:q | D5:h B4:h | C5:q A4:q B4:q G4:q | C5:w", A: rests(4), T: rests(4), B: rests(4) }),
  duasSol: satb("exd-desafio-duas-vozes-sol", "Solução: sextas, terças e o uníssono de oitava no fim", { S: "C5:q D5:q E5:q C5:q | D5:h B4:h | C5:q A4:q B4:q G4:q | C5:w", A: "E4:q F4:q G4:q E4:q | B4:h G4:h | E4:q C4:q D4:q B3:q | C4:w", T: rests(4), B: rests(4) }),
  bdStart: satb("exd-desafio-baixo-dado", "Baixo dado em Ré maior", { S: "r:w | r:w | r:w", A: "r:w | r:w | r:w", T: "r:w | r:w | r:w", B: "D3:h B2:h | G2:h A2:h | D3:w" }, { key: "D" }),
  bdSol: satb("exd-desafio-baixo-dado-sol", "Solução: I – vi | IV – V | I", { S: "A4:h B4:h | D5:h C#5:h | D5:w", A: "F#4:h F#4:h | G4:h E4:h | F#4:w", T: "D4:h D4:h | B3:h A3:h | A3:w", B: "D3:h B2:h | G2:h A2:h | D3:w" }, { key: "D" }),
  ttbbSol: ttbb("exd-desafio-ttbb-sol", "Solução: a pergunta e resposta em TTBB, melodia no Tenor II", { T1: "E4:h D4:h | F4:h E4:h", T2: 'C4:h"Vens B3:h"já? | D4:h"Sim, C4:h"vou.', B1: "G3:h G3:h | B3:h G3:h", B2: "C3:h G2:h | G2:h C3:h" }, { key: "C" }),
  sabStart: satb("exd-desafio-sab", "SAB: soprano e baixo dados", { S: "E5:h D5:h | C5:h B4:h | C5:w", A: "r:w | r:w | r:w", T: "r:w | r:w | r:w", B: "C3:h G2:h | E3:h G2:h | C3:w" }),
  sabSol: satb("exd-desafio-sab-sol", "Solução: uma terça em cada acorde", { S: "E5:h D5:h | C5:h B4:h | C5:w", A: "G4:h B4:h | G4:h G4:h | E4:w", T: "r:w | r:w | r:w", B: "C3:h G2:h | E3:h G2:h | C3:w" }),
  blocoStart: satb("exd-desafio-bloco", "Melodia sobre pedal de Sol (estilo popular)", { S: "B4:q A4:q G4:q A4:q | B4:w", A: rests(2), T: rests(2), B: "G2:w | G2:w" }, { key: "G", style: "popular-a-cappella" }),
  blocoSol: satb("exd-desafio-bloco-sol", "Solução: bloco fechado de três vozes sobre o pedal", { S: "B4:q A4:q G4:q A4:q | B4:w", A: "G4:q E4:q D4:q E4:q | G4:w", T: "D4:q C4:q B3:q C4:q | D4:w", B: "G2:w | G2:w" }, { key: "G", style: "popular-a-cappella" }),
  ccStart: satb("exd-desafio-contracanto", "Hino à Alegria: melodia, contralto e baixo dados", { S: MELODIA, A: "G4:h G4:h | F#4:h D4:h | E4:h E4:h | F#4:h D4:h", T: rests(4), B: "G2:h E3:h | D3:h G2:h | E3:h A2:h | D3:h G2:h" }, { key: "G" }),
  ccSol: satb("exd-desafio-contracanto-sol", "Solução: o tenor anda quando a melodia para", { S: MELODIA, A: "G4:h G4:h | F#4:h D4:h | E4:h E4:h | F#4:h D4:h", T: 'D4:h"uh C4:h | A3:w | B3:h C4:h~ | C4:h B3:q D4:q', B: "G2:h E3:h | D3:h G2:h | E3:h A2:h | D3:h G2:h" }, { key: "G" }),
  ttbbDemoErro: ttbb("exd-ttbb-demo-erro", "Primeira tentativa: SATB transposto 'no automático'", { T1: "D4:h G4:h", T2: "B3:h C4:h", B1: "D3:h E3:h", B2: "G2:h C3:h" }, { key: "C" }),
  ttbbDemo: ttbb("exd-ttbb-demo", "V → I em TTBB: quinta e oitava no grave, melodia no Tenor II", { T1: "D4:h E4:h", T2: "B3:h C4:h", B1: "G3:h G3:h", B2: "G2:h C3:h" }, { key: "C" }),
  vozStart: satb("exd-desafio-voicings", "Sol maior: soprano e baixo dados", { S: "B4:w | B4:w", A: "r:w | r:w", T: "r:w | r:w", B: "G2:w | G2:w" }, { key: "G" }),
  vozSol: satb("exd-desafio-voicings-sol", "Solução: posição fechada, depois aberta", { S: "B4:w | B4:w", A: "G4:w | D4:w", T: "D4:w | G3:w", B: "G2:w | G2:w" }, { key: "G" }),
  // ——— 3º semestre ———
  cp1Start: satb("exd-desafio-cp1", "Cantus firmus 2 no baixo: escreva o soprano nota contra nota", { S: rests(4), A: rests(4), T: rests(4), B: "C3:h E3:h | F3:h G3:h | E3:h F3:h | D3:h C3:h" }),
  cp1Sol: satb("exd-desafio-cp1-sol", "Solução: 1ª espécie sobre o cantus firmus 2", { S: "G4:h C5:h | A4:h G4:h | C5:h A4:h | B4:h C5:h", A: rests(4), T: rests(4), B: "C3:h E3:h | F3:h G3:h | E3:h F3:h | D3:h C3:h" }),
  cp2Start: satb("exd-desafio-cp2", "Cantus firmus 2: escreva duas notas contra uma", { S: rests(4), A: rests(4), T: rests(4), B: "C3:h E3:h | F3:h G3:h | E3:h F3:h | D3:h C3:h" }),
  cp2Sol: satb("exd-desafio-cp2-sol", "Solução: 2ª espécie sobre o cantus firmus 2", { S: "G4:q A4:q C5:q B4:q | A4:q C5:q G4:q B4:q | C5:q B4:q A4:q C5:q | B4:h C5:h", A: rests(4), T: rests(4), B: "C3:h E3:h | F3:h G3:h | E3:h F3:h | D3:h C3:h" }),
  cp4Start: satb("exd-desafio-cp4", "Baixo descendente F – E – D – C: escreva os retardos", { S: rests(4), A: rests(4), T: rests(4), B: "F3:w | E3:w | D3:w | C3:w" }),
  cp4Sol: satb("exd-desafio-cp4-sol", "Solução: preparação, 7–6, 7–6 e chegada", { S: "r:h D5:h~ | D5:h C5:h~ | C5:h B4:h | C5:w", A: rests(4), T: rests(4), B: "F3:w | E3:w | D3:w | C3:w" }),
  cp5Start: satb("exd-desafio-cp5", "Cantus firmus 2: escreva uma linha florida", { S: rests(4), A: rests(4), T: rests(4), B: "C3:h E3:h | F3:h G3:h | E3:h F3:h | D3:h C3:h" }),
  cp5Sol: satb("exd-desafio-cp5-sol", "Solução: contraponto florido com um único ponto culminante", { S: "G4:h C5:q B4:q | A4:q C5:q B4:h | C5:q E5:q D5:q C5:q | B4:h C5:h", A: rests(4), T: rests(4), B: "C3:h E3:h | F3:h G3:h | E3:h F3:h | D3:h C3:h" }),
  canoneStart: satb("exd-desafio-canone", "Melodia sobre pedal de Dó: faça o tenor imitar", { S: "E4:q F4:q G4:q E4:q | G4:h C5:h | E5:q D5:q C5:h | C5:w", A: rests(4), T: rests(4), B: "C3:w | C3:w | C3:w | C3:w" }),
  canoneSol: satb("exd-desafio-canone-sol", "Solução: cânone à oitava, um compasso depois", { S: "E4:q F4:q G4:q E4:q | G4:h C5:h | E5:q D5:q C5:h | C5:w", A: rests(4), T: "r:w | E3:q F3:q G3:q E3:q | G3:h C4:h | E4:q D4:q C4:h", B: "C3:w | C3:w | C3:w | C3:w" }),
  q4Start: satb("exd-desafio-quatro-vozes", "I – IV | V7 – I em Sol: soprano e baixo dados", { S: "B4:h C5:h | A4:h G4:h", A: rests(2), T: rests(2), B: "G2:h C3:h | D3:h G2:h" }, { key: "G" }),
  q4Sol: satb("exd-desafio-quatro-vozes-sol", "Solução: quatro ritmos, quatro desenhos", { S: "B4:h C5:h | A4:h G4:h", A: "G4:q F#4:q E4:h | F#4:h D4:h", T: "D4:h~ D4:q C4:q | C4:h B3:h", B: "G2:h C3:h | D3:h G2:h" }, { key: "G" }),
  ccpStart: satb("exd-desafio-cp-contracanto", "Melodia com notas longas: escreva o contracanto do contralto", { S: "E5:h D5:h | C5:w | D5:h E5:h | C5:w", A: rests(4), T: rests(4), B: "C3:h G2:h | A2:w | G2:h C3:h | C3:w" }),
  ccpSol: satb("exd-desafio-cp-contracanto-sol", "Solução: o contralto anda nas notas longas da melodia", { S: "E5:h D5:h | C5:w | D5:h E5:h | C5:w", A: "G4:w | E4:q F4:q G4:q A4:q | B4:h G4:h | G4:q F4:q E4:h", T: rests(4), B: "C3:h G2:h | A2:w | G2:h C3:h | C3:w" }),
  descantStart: satb("exd-desafio-descant", "Hino: melodia no tenor, contralto e baixo dados", { S: "r:w | r:w | r:w", A: "G4:h G4:h | G4:h G4:h | E4:w", T: "C4:h D4:h | E4:h D4:h | C4:w", B: "C3:h B2:h | C3:h G2:h | C3:w" }),
  descantSol: satb("exd-desafio-descant-sol", "Solução: descant em movimento contrário à melodia", { S: "E5:h D5:h | C5:h B4:h | C5:w", A: "G4:h G4:h | G4:h G4:h | E4:w", T: "C4:h D4:h | E4:h D4:h | C4:w", B: "C3:h B2:h | C3:h G2:h | C3:w" }),
  introStart: satb("exd-desafio-introducao", "Primeiro acorde do verso: escreva a introdução antes dele", { S: 'r:w | r:w | E4:w"Vou', A: "r:w | r:w | C4:w", T: "r:w | r:w | G3:w", B: "r:w | r:w | C3:w" }),
  introSol: satb("exd-desafio-introducao-sol", "Solução: I – IV | V – V7 → entrada do coro", { S: 'G4:h A4:h | G4:h F4:h | E4:w"Vou', A: "E4:h F4:h | D4:h D4:h | C4:w", T: "C4:h C4:h | B3:h B3:h | G3:w", B: "C3:h F3:h | G3:h G2:h | C3:w" }),
  prosStart: satb("exd-desafio-prosodia", "'Canta, coração': 28 segundos sem respirar (♩ = 60)", { S: 'C5:h"Can- D5:h"ta, | E5:h"co- D5:h"ra- | C5:w"ção, | D5:h"meu E5:h"can- | D5:h"to C5:h"vai | C5:w"lon- | B4:h"ge C5:h"vai.', A: rests(7), T: rests(7), B: rests(7) }, { tempo: 60 }),
  prosSol: satb("exd-desafio-prosodia-sol", "Solução: respirações nas vírgulas do texto", { S: 'C5:h"Can- D5:h"ta, | E5:h"co- D5:h"ra- | C5:h."ção, r:q | D5:h"meu E5:h"can- | D5:h"to C5:h"vai | C5:h"lon- B4:q"ge, r:q | C5:w"vai.', A: rests(7), T: rests(7), B: rests(7) }, { tempo: 60 }),
  tensStart: satb("exd-desafio-tensoes", "C – Am – Dm – G – C em tríades (estilo popular)", { S: "G4:h A4:h | A4:h G4:h | G4:w", A: "E4:h E4:h | F4:h D4:h | E4:w", T: "C4:h C4:h | D4:h B3:h | C4:w", B: "C3:h A2:h | D3:h G2:h | C3:w" }, { style: "popular-a-cappella" }),
  tensSol: satb("exd-desafio-tensoes-sol", "Solução: Cmaj7 – Am7 – Dm7 – G7 – Cmaj7 com notas comuns", { S: "G4:h G4:h | A4:h G4:h | G4:w", A: "E4:h E4:h | F4:h F4:h | E4:w", T: "B3:h C4:h | C4:h B3:h | B3:w", B: "C3:h A2:h | D3:h G2:h | C3:w" }, { style: "popular-a-cappella" }),
  modStart: satb("exd-desafio-modulacao", "I – V7/V | V – I em Ré: soprano e baixo dados", { S: "D5:h D5:h | C#5:h D5:h", A: rests(2), T: rests(2), B: "D3:h E3:h | A2:h D3:h" }, { key: "D" }),
  modSol: satb("exd-desafio-modulacao-sol", "Solução: a sétima preparada e a sensível secundária G♯", { S: "D5:h D5:h | C#5:h D5:h", A: "F#4:h G#4:h | A4:h F#4:h", T: "D4:h B3:h | A3:h A3:h", B: "D3:h E3:h | A2:h D3:h" }, { key: "D" }),
  cromStart: satb("exd-desafio-cromatico", "'Amém' com empréstimo: soprano e baixo dados", { S: "C5:h C5:h | C5:h C5:h", A: rests(2), T: rests(2), B: "C3:h F3:h | F3:h C3:h" }),
  cromSol: satb("exd-desafio-cromatico-sol", "Solução: I – IV – iv – I com o Lá♭ chegando por semitom", { S: "C5:h C5:h | C5:h C5:h", A: "E4:h F4:h | F4:h E4:h", T: "G3:h A3:h | Ab3:h G3:h", B: "C3:h F3:h | F3:h C3:h" }),
  // ——— 4º semestre ———
  marStart: satb("exd-desafio-mar-sereno", "Frase de exercício: melodia para rearmonizar", { S: "C5:h B4:h | A4:h G4:h | A4:h B4:h | C5:w", A: rests(4), T: rests(4), B: rests(4) }, { style: "popular-a-cappella" }),
  marDim: satb("exd-desafio-diminuto-sol", "Solução: C – G | Am – C♯°7 | Dm – G7 | C", { S: "C5:h B4:h | A4:h G4:h | A4:h B4:h | C5:w", A: "E4:h D4:h | C4:h E4:h | F4:h F4:h | E4:w", T: "G3:h G3:h | E3:h Bb3:h | A3:h G3:h | G3:w", B: "C3:h G2:h | A2:h C#3:h | D3:h G2:h | C3:w" }, { style: "popular-a-cappella" }),
  marDia: satb("exd-desafio-rearm-diatonica-sol", "Solução: C – G/D | Am/E – G7/F | Am/E – G/D | C", { S: "C5:h B4:h | A4:h G4:h | A4:h B4:h | C5:w", A: "E4:h D4:h | C4:h D4:h | C4:h D4:h | E4:w", T: "G3:h G3:h | A3:h B3:h | A3:h G3:h | G3:w", B: "C3:h D3:h | E3:h F3:h | E3:h D3:h | C3:w" }, { style: "popular-a-cappella" }),
  marDiaStart: satb("exd-desafio-rearm-diatonica", "Frase de exercício: rearmonize só com acordes diatônicos", { S: "C5:h B4:h | A4:h G4:h | A4:h B4:h | C5:w", A: rests(4), T: rests(4), B: rests(4) }, { style: "popular-a-cappella" }),
  marDimStart: satb("exd-desafio-diminuto", "Frase de exercício: insira um diminuto de passagem", { S: "C5:h B4:h | A4:h G4:h | A4:h B4:h | C5:w", A: rests(4), T: rests(4), B: rests(4) }, { style: "popular-a-cappella" }),
  marBaixoStart: satb("exd-desafio-rearm-baixo", "Frase de exercício: escreva primeiro o baixo", { S: "C5:h B4:h | A4:h G4:h | A4:h B4:h | C5:w", A: rests(4), T: rests(4), B: rests(4) }, { style: "popular-a-cappella" }),
  marBaixo: satb("exd-desafio-rearm-baixo-sol", "Solução: baixo subindo C – D – E – F – F♯ – G – C contra a melodia", { S: "C5:h B4:h | A4:h G4:h | A4:h B4:h | C5:w", A: "E4:h D4:h | C4:h E4:h | F#4:h D4:h | E4:w", T: "G3:h G3:h | A3:h A3:h | C4:h G3:h | G3:w", B: "C3:h D3:h | E3:h F3:h | F#3:h G3:h | C3:w" }, { style: "popular-a-cappella" }),
  ttbb7Start: ttbb("exd-desafio-ttbb-setima", "E7 → A: lead e baixo dados", { T1: "r:w | r:w", T2: "B3:w | A3:w", B1: "r:w | r:w", B2: "E3:w | A2:w" }, { key: "A" }),
  ttbb7Sol: ttbb("exd-desafio-ttbb-setima-sol", "Solução: sétima completa no quarteto e resolução com o grave aberto", { T1: "D4:w | C#4:w", T2: "B3:w | A3:w", B1: "G#3:w | E3:w", B2: "E3:w | A2:w" }, { key: "A" }),
  ssaStart: ssaa("exd-desafio-ssa", "Frase de exercício para SSA: melodia dada", { S1: "C5:h B4:h | A4:h G4:h | A4:h B4:h | C5:w", S2: rests(4), A1: rests(4), A2: rests(4) }),
  ssaSol: ssaa("exd-desafio-ssa-sol", "Solução: três vozes, contralto em fundamentais e terças", { S1: "C5:h B4:h | A4:h G4:h | A4:h B4:h | C5:w", S2: "G4:h G4:h | E4:h E4:h | E4:h F4:h | E4:w", A1: "E4:h E4:h | C4:h C4:h | C4:h D4:h | C4:w", A2: rests(4) }),
  revStart: satb("exd-desafio-revisao", "Trecho para revisar: I – ii | V – I com vários problemas", { S: "E5:h F5:h | D5:h C5:h", A: "G4:h A4:h | G4:h E4:h", T: "E4:h F4:h | B3:h C4:h", B: "C3:h D3:h | G2:h C2:h" }),
} as const;
