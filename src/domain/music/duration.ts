/**
 * Durações e métrica. Unidade interna: ticks, com PPQ = 480 ticks por semínima.
 * 480 é divisível por 2, 3, 4, 5, 6, 8, 10, 12, 16 — suficiente para pontuações e quiálteras futuras.
 */
export const PPQ = 480;

export const DURATION_TYPES = ["w", "h", "q", "8", "16"] as const;
export type DurationType = (typeof DURATION_TYPES)[number];

export interface Duration {
  readonly type: DurationType;
  readonly dots: 0 | 1 | 2;
}

export interface TimeSignature {
  readonly beats: number;
  readonly beatType: 1 | 2 | 4 | 8 | 16;
}

const BASE_TICKS: Record<DurationType, number> = {
  w: PPQ * 4,
  h: PPQ * 2,
  q: PPQ,
  "8": PPQ / 2,
  "16": PPQ / 4,
};

export const DURATION_NAMES_PT: Record<DurationType, string> = {
  w: "semibreve",
  h: "mínima",
  q: "semínima",
  "8": "colcheia",
  "16": "semicolcheia",
};

export function durationTicks(d: Duration): number {
  const base = BASE_TICKS[d.type];
  if (d.dots === 0) return base;
  if (d.dots === 1) return base + base / 2;
  return base + base / 2 + base / 4;
}

export function durationNamePt(d: Duration): string {
  const dots = d.dots === 1 ? " pontuada" : d.dots === 2 ? " duplamente pontuada" : "";
  return `${DURATION_NAMES_PT[d.type]}${dots}`;
}

export function measureTicks(ts: TimeSignature): number {
  return ts.beats * (PPQ * 4) / ts.beatType;
}

export function beatTicks(ts: TimeSignature): number {
  // Compassos compostos (6/8, 9/8, 12/8) têm tempo = semínima pontuada.
  if (ts.beatType === 8 && ts.beats % 3 === 0 && ts.beats > 3) return (PPQ * 4 * 3) / 8;
  return (PPQ * 4) / ts.beatType;
}

/** Posição métrica de um onset absoluto: compasso (1-based) e tempo (1-based, fracionário). */
export function metricPosition(onset: number, ts: TimeSignature): { measure: number; beat: number } {
  const mt = measureTicks(ts);
  const measure = Math.floor(onset / mt) + 1;
  const within = onset - (measure - 1) * mt;
  const beat = within / beatTicks(ts) + 1;
  return { measure, beat: Math.round(beat * 1000) / 1000 };
}

/** Tempo forte (início de compasso) ou meio-forte (metade de 4/4). */
export function isStrongBeat(onset: number, ts: TimeSignature): boolean {
  const mt = measureTicks(ts);
  const within = onset % mt;
  if (within === 0) return true;
  if (ts.beats === 4 && ts.beatType === 4 && within === mt / 2) return true;
  return false;
}

/**
 * Decompõe uma quantidade de ticks na menor sequência de durações escritas
 * (maiores primeiro). Usado para completar compassos com pausas.
 */
export function ticksToDurations(ticks: number): Duration[] {
  const out: Duration[] = [];
  let rest = ticks;
  const options: Duration[] = [];
  for (const type of DURATION_TYPES) {
    options.push({ type, dots: 1 }, { type, dots: 0 });
  }
  options.sort((a, b) => durationTicks(b) - durationTicks(a));
  while (rest > 0) {
    const d = options.find((o) => durationTicks(o) <= rest);
    if (!d) throw new Error(`Não é possível representar ${ticks} ticks`);
    out.push(d);
    rest -= durationTicks(d);
  }
  return out;
}

export function durationToVexFlow(d: Duration, rest = false): string {
  return `${d.type}${"d".repeat(d.dots)}${rest ? "r" : ""}`;
}
