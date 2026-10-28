import { type Pitch, parsePitch, shiftOctave } from "./pitch";

/**
 * Formações vocais. As extensões são PADRÕES DIDÁTICOS configuráveis, não leis:
 * variam com idade, treino, repertório e estilo. Fontes de referência (consenso
 * aproximado de manuais de harmonia e regência coral): Aldwell & Schachter,
 * Kostka & Payne, prática de coros masculinos/barbershop para TTBB e de coros
 * femininos e infantis (repertório SSA/SSAA) para vozes iguais agudas.
 */
export type FormationId = "SATB" | "TTBB" | "SSAA";
export type SATBVoice = "S" | "A" | "T" | "B";
export type TTBBVoice = "T1" | "T2" | "B1" | "B2";
export type SSAAVoice = "S1" | "S2" | "A1" | "A2";
export type VoiceId = SATBVoice | TTBBVoice | SSAAVoice;

/**
 * Claves:
 * - "treble": clave de sol.
 * - "treble8vb": clave de sol oitavada (com 8 embaixo) — a nota escrita soa uma
 *   oitava ABAIXO. Usada para tenores.
 * - "bass": clave de fá.
 */
export type Clef = "treble" | "treble8vb" | "bass";

export interface PitchRange {
  readonly low: Pitch;
  readonly high: Pitch;
}

export interface VoiceSpec {
  readonly id: VoiceId;
  readonly name: string;
  readonly shortName: string;
  /** 0 = pauta superior, 1 = pauta inferior (partitura reduzida em duas pautas). */
  readonly staff: 0 | 1;
  /** 1 = haste para cima (voz superior da pauta), -1 = para baixo. */
  readonly stem: 1 | -1;
  /** Extensão utilizável (limite absoluto recomendado para coro amador/intermediário). */
  readonly range: PitchRange;
  /** Tessitura confortável, onde a voz deve passar a maior parte do tempo. */
  readonly tessitura: PitchRange;
  readonly timbre: string;
}

export interface StaffSpec {
  readonly clef: Clef;
  readonly voices: readonly [VoiceId, VoiceId];
}

export interface FormationSpec {
  readonly id: FormationId;
  readonly name: string;
  readonly description: string;
  /** Vozes de cima para baixo. */
  readonly voices: readonly VoiceSpec[];
  readonly staves: readonly [StaffSpec, StaffSpec];
  /** Espaçamento máximo recomendado (em semitons) entre vozes adjacentes, de cima para baixo. */
  readonly maxAdjacentSpacing: readonly number[];
}

const r = (low: string, high: string): PitchRange => ({ low: parsePitch(low), high: parsePitch(high) });

export const SATB: FormationSpec = {
  id: "SATB",
  name: "Coro misto (SATB)",
  description:
    "Soprano, contralto, tenor e baixo. Abrange cerca de quatro oitavas, com vozes femininas e masculinas separadas por aproximadamente uma oitava de registro.",
  voices: [
    {
      id: "S",
      name: "Soprano",
      shortName: "S",
      staff: 0,
      stem: 1,
      range: r("C4", "G5"),
      tessitura: r("E4", "E5"),
      timbre: "Brilhante e projetado no agudo; carrega normalmente a melodia.",
    },
    {
      id: "A",
      name: "Contralto",
      shortName: "C",
      staff: 0,
      stem: -1,
      range: r("G3", "D5"),
      tessitura: r("A3", "B4"),
      timbre: "Encorpado no médio-grave; perde volume abaixo de A3.",
    },
    {
      id: "T",
      name: "Tenor",
      shortName: "T",
      staff: 1,
      stem: 1,
      range: r("C3", "G4"),
      tessitura: r("E3", "E4"),
      timbre: "Brilhante no agudo (E4–G4 exige energia); fraco abaixo de D3.",
    },
    {
      id: "B",
      name: "Baixo",
      shortName: "B",
      staff: 1,
      stem: -1,
      range: r("E2", "D4"),
      tessitura: r("G2", "C4"),
      timbre: "Fundamento harmônico; notas abaixo de G2 soam menos definidas em coros amadores.",
    },
  ],
  staves: [
    { clef: "treble", voices: ["S", "A"] },
    { clef: "bass", voices: ["T", "B"] },
  ],
  // S–C ≤ 8ª, C–T ≤ 8ª, T–B ≤ 12ª (tradição de manuais de harmonia).
  maxAdjacentSpacing: [12, 12, 19],
};

export const TTBB: FormationSpec = {
  id: "TTBB",
  name: "Coro / quarteto masculino (TTBB)",
  description:
    "Tenor I, Tenor II, Barítono (Baixo I) e Baixo (Baixo II). Abrange cerca de duas oitavas e meia: as vozes ficam muito mais próximas e o grave exige cuidado com o espaçamento.",
  voices: [
    {
      id: "T1",
      name: "Tenor I",
      shortName: "T1",
      staff: 0,
      stem: 1,
      range: r("D3", "A4"),
      tessitura: r("G3", "F4"),
      timbre: "Agudo da formação; acima de G4 tende ao falsete/voz mista — escreva com intenção.",
    },
    {
      id: "T2",
      name: "Tenor II",
      shortName: "T2",
      staff: 0,
      stem: -1,
      range: r("C3", "F4"),
      tessitura: r("E3", "D4"),
      timbre: "Frequentemente canta a melodia em arranjos masculinos tradicionais.",
    },
    {
      id: "B1",
      name: "Barítono (Baixo I)",
      shortName: "Br",
      staff: 1,
      stem: 1,
      range: r("A2", "E4"),
      tessitura: r("B2", "C4"),
      timbre: "Voz de preenchimento harmônico; cruza com o Tenor II com frequência em estilos como barbershop.",
    },
    {
      id: "B2",
      name: "Baixo (Baixo II)",
      shortName: "B",
      staff: 1,
      stem: -1,
      range: r("E2", "C4"),
      tessitura: r("G2", "A3"),
      timbre: "Fundamento; abaixo de F2 apenas com baixos profundos confirmados.",
    },
  ],
  staves: [
    { clef: "treble8vb", voices: ["T1", "T2"] },
    { clef: "bass", voices: ["B1", "B2"] },
  ],
  // Escrita masculina tende a ser mais fechada; T2–Br ≤ 8ª, Br–B ≤ 12ª.
  maxAdjacentSpacing: [12, 12, 19],
};

export const SSAA: FormationSpec = {
  id: "SSAA",
  name: "Coro feminino / vozes iguais (SSAA)",
  description:
    "Soprano I, Soprano II, Contralto I e Contralto II. Abrange cerca de duas oitavas, todas na região aguda: não há baixo real, então o Contralto II faz o papel de baixo e a harmonia precisa de cuidado com inversões e espaçamento. Em SSA, a pauta inferior usa só o Contralto I.",
  voices: [
    {
      id: "S1",
      name: "Soprano I",
      shortName: "S1",
      staff: 0,
      stem: 1,
      range: r("D4", "A5"),
      tessitura: r("F4", "F5"),
      timbre: "Brilho e projeção; acima de F5 cansa em coros amadores e infantis.",
    },
    {
      id: "S2",
      name: "Soprano II",
      shortName: "S2",
      staff: 0,
      stem: -1,
      range: r("C4", "F5"),
      tessitura: r("D4", "D5"),
      timbre: "Mais escuro que o Soprano I; segura terças e sextas sob a melodia.",
    },
    {
      id: "A1",
      name: "Contralto I",
      shortName: "A1",
      staff: 1,
      stem: 1,
      range: r("A3", "D5"),
      tessitura: r("B3", "B4"),
      timbre: "Centro da formação; em SSA é a voz mais grave e sustenta a harmonia.",
    },
    {
      id: "A2",
      name: "Contralto II",
      shortName: "A2",
      staff: 1,
      stem: -1,
      range: r("F3", "C5"),
      tessitura: r("G3", "A4"),
      timbre: "Faz o papel de baixo; abaixo de G3 perde volume e só funciona com contraltos graves confirmadas.",
    },
  ],
  staves: [
    { clef: "treble", voices: ["S1", "S2"] },
    { clef: "treble", voices: ["A1", "A2"] },
  ],
  // Vozes iguais soam melhor fechadas: nenhuma distância maior que uma oitava.
  maxAdjacentSpacing: [12, 12, 12],
};

export const FORMATIONS: Readonly<Record<FormationId, FormationSpec>> = { SATB, TTBB, SSAA };

export function getFormation(id: FormationId): FormationSpec {
  return FORMATIONS[id];
}

export function voiceSpec(formation: FormationId, voice: VoiceId): VoiceSpec {
  const spec = FORMATIONS[formation].voices.find((v) => v.id === voice);
  if (!spec) throw new Error(`Voz ${voice} não pertence à formação ${formation}`);
  return spec;
}

export function staffOfVoice(formation: FormationId, voice: VoiceId): StaffSpec {
  return voiceSpec(formation, voice).staff === 0 ? FORMATIONS[formation].staves[0] : FORMATIONS[formation].staves[1];
}

/** Deslocamento em oitavas entre altura escrita e sonora: escrita = sonora + shift. */
export function clefOctaveShift(clef: Clef): number {
  return clef === "treble8vb" ? 1 : 0;
}

/** Altura ESCRITA a partir da altura SONORA (preserva a grafia). */
export function writtenPitch(sounding: Pitch, clef: Clef): Pitch {
  return shiftOctave(sounding, clefOctaveShift(clef));
}

/** Altura SONORA a partir da altura ESCRITA. */
export function soundingPitch(written: Pitch, clef: Clef): Pitch {
  return shiftOctave(written, -clefOctaveShift(clef));
}

export function clefNamePt(clef: Clef): string {
  return { treble: "clave de sol", treble8vb: "clave de sol oitavada (8vb)", bass: "clave de fá" }[clef];
}
