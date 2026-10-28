import type { Score } from "./score";
import { scoreFromText } from "./text-notation";

/**
 * Partituras de exemplo originais (escritas para este projeto, sem direitos de terceiros).
 * Os exemplos "corretos" são verificados nos testes: o motor de validação não
 * deve encontrar erros nem alertas neles.
 */

export const CHORALE_SATB_C: Score = scoreFromText({
  id: "exemplo-coral-satb-do",
  title: "Coral em Dó maior (SATB)",
  formation: "SATB",
  key: "C",
  time: "4/4",
  tempo: 72,
  notes: "I ii V I | vi ii V I | I⁶ IV I⁶₄ V | I — condução estrita em estilo coral tradicional.",
  voices: {
    S: "G4:q F4:q G4:q G4:q | A4:q A4:q G4:q G4:q | C5:q C5:q C5:q B4:q | C5:w",
    A: "E4:q D4:q D4:q E4:q | E4:q F4:q D4:q E4:q | G4:q A4:q G4:q G4:q | G4:w",
    T: "C4:q A3:q B3:q C4:q | C4:q D4:q B3:q C4:q | C4:q C4:q E4:q D4:q | E4:w",
    B: "C3:q D3:q G2:q C3:q | A2:q D3:q G2:q C3:q | E3:q F3:q G3:q G3:q | C3:w",
  },
});

export const CHORALE_TTBB_G: Score = scoreFromText({
  id: "exemplo-coral-ttbb-sol",
  title: "Cadência em Sol maior (TTBB)",
  formation: "TTBB",
  key: "G",
  time: "4/4",
  tempo: 66,
  notes: "I IV V I | IV I⁶₄ V | I — escrita masculina fechada; o baixo sustenta o grave sem descer de G2.",
  voices: {
    T1: "D4:q E4:q D4:q D4:q | E4:q D4:q D4:h | D4:w",
    T2: "B3:q C4:q A3:q B3:q | C4:q B3:q A3:h | B3:w",
    B1: "G3:q G3:q F#3:q G3:q | G3:q G3:q F#3:h | G3:w",
    B2: "G2:q C3:q D3:q G2:q | C3:q D3:q D3:h | G2:w",
  },
});

export const CHORALE_SSAA_G: Score = scoreFromText({
  id: "exemplo-coral-ssaa-sol",
  title: "Cadência em Sol maior (SSAA)",
  formation: "SSAA",
  key: "G",
  time: "4/4",
  tempo: 72,
  notes: "I IV I V | I — vozes iguais fechadas; o Contralto II faz o baixo com fundamentais, sem descer de G3.",
  voices: {
    S1: "B4:q C5:q B4:q A4:q | B4:w",
    S2: "G4:q G4:q G4:q F#4:q | G4:w",
    A1: "D4:q E4:q D4:q D4:q | D4:w",
    A2: "G3:q C4:q G3:q D4:q | G3:w",
  },
});

/** Exemplo INCORRETO: quintas e oitavas paralelas na progressão I → ii. */
export const PARALLELS_SATB: Score = scoreFromText({
  id: "exemplo-paralelas-satb",
  title: "I → ii com quintas e oitavas paralelas (incorreto)",
  formation: "SATB",
  key: "C",
  time: "4/4",
  notes: "Todas as vozes sobem por grau conjunto: S–B formam 5ªs paralelas (compostas) e T–B, 8ªs paralelas.",
  voices: {
    S: "G4:h A4:h",
    A: "E4:h F4:h",
    T: "C4:h D4:h",
    B: "C3:h D3:h",
  },
});

/** Versão corrigida do exemplo anterior: movimento contrário no baixo. */
export const PARALLELS_FIXED_SATB: Score = scoreFromText({
  id: "exemplo-paralelas-corrigido-satb",
  title: "I → ii⁶ corrigido (movimento contrário)",
  formation: "SATB",
  key: "C",
  time: "4/4",
  notes: "O baixo sobe para F (ii⁶) enquanto as vozes superiores descem: nenhuma consonância perfeita em paralelo.",
  voices: {
    S: "G4:h F4:h",
    A: "E4:h D4:h",
    T: "C4:h A3:h",
    B: "C3:h F3:h",
  },
});

export const EXAMPLE_SCORES: readonly Score[] = [CHORALE_SATB_C, CHORALE_TTBB_G, CHORALE_SSAA_G, PARALLELS_SATB, PARALLELS_FIXED_SATB];
