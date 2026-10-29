import { scoreFromText } from "@/domain/music/text-notation";

/**
 * Partituras das demonstrações passo a passo e dos exercícios independentes
 * (originais). Vereditos conferidos pelo motor no teste de integridade.
 */
type Style = "coral-tradicional" | "coral-contemporaneo" | "popular-a-cappella";
const satb = (id: string, title: string, voices: Record<"S" | "A" | "T" | "B", string>, opts: { key?: string; time?: string; tempo?: number; style?: Style } = {}) =>
  scoreFromText({ id, title, formation: "SATB", key: opts.key ?? "C", time: opts.time ?? "4/4", voices, ...(opts.tempo ? { tempo: opts.tempo } : {}), ...(opts.style ? { style: opts.style } : {}) });
const ttbb = (id: string, title: string, voices: Record<"T1" | "T2" | "B1" | "B2", string>, opts: { key?: string; time?: string; style?: Style } = {}) =>
  scoreFromText({ id, title, formation: "TTBB", key: opts.key ?? "G", time: opts.time ?? "4/4", voices, ...(opts.style ? { style: opts.style } : {}) });
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
} as const;
