import type * as VFModule from "vexflow/bravura";
import { durationToVexFlow, measureTicks } from "@/domain/music/duration";
import { getFormation } from "@/domain/music/formations";
import { keyToVexFlowSpec } from "@/domain/music/key";
import type { Score } from "@/domain/music/score";
import type { HarmonicLabel } from "@/domain/validation";
import { type NotationEvent, prepareNotation, restKey, vexAccidental, vexClef, vexKey } from "./layout";

export type VexFlowApi = typeof VFModule;

let vfPromise: Promise<VexFlowApi> | null = null;

/** Carrega o VexFlow (com a fonte Bravura embutida) apenas no navegador. */
export function loadVexFlow(): Promise<VexFlowApi> {
  vfPromise ??= import("vexflow/bravura").then(async (mod) => {
    if (typeof document !== "undefined" && "fonts" in document) {
      await Promise.allSettled([document.fonts.load("30px Bravura"), document.fonts.load("12px Academico")]);
    }
    return mod;
  });
  return vfPromise;
}

export interface RenderOptions {
  readonly width: number;
  readonly zoom: number;
  readonly selectedEventId?: string | null;
  /** Intervalo selecionado (copiar/colar): destacado em cor mais clara. */
  readonly rangeEventIds?: ReadonlySet<string>;
  /** IDs de eventos com diagnóstico, por gravidade de cor. */
  readonly flagged?: ReadonlyMap<string, "erro" | "alerta" | "sugestao" | "info">;
  readonly harmony?: readonly HarmonicLabel[];
  readonly showLyrics?: boolean;
  /** Vozes silenciadas na reprodução aparecem esmaecidas. */
  readonly dimmedVoices?: ReadonlySet<string>;
  /** "canvas" exige que o container seja um <canvas> (usado na exportação PDF). */
  readonly backend?: "svg" | "canvas";
}

export interface OnsetPosition {
  readonly onset: number;
  readonly x: number;
  readonly top: number;
  readonly bottom: number;
  /** Índice do sistema (linha) em que o onset aparece. */
  readonly system: number;
}

export interface RenderResult {
  readonly height: number;
  readonly onsets: readonly OnsetPosition[];
  /** Geometria dos sistemas (em pixels já com zoom) — usada para paginar o PDF. */
  readonly systems: readonly { readonly top: number; readonly height: number }[];
}

const COLORS = {
  selected: "#b4235a",
  range: "#d4789c",
  erro: "#c0392b",
  alerta: "#c77700",
  sugestao: "#2f6fb0",
  info: "#555",
  dim: "#b9b4c9",
  text: "#2a2238",
};

const STAFF_GAP = 95;
const SYSTEM_GAP = 90;
const LEFT = 12;

function estimateMeasureWidth(measureEvents: number): number {
  return Math.max(150, 60 + measureEvents * 34);
}

export function renderScore(VF: VexFlowApi, container: HTMLElement, score: Score, opts: RenderOptions): RenderResult {
  const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental, StaveConnector, StaveTie, Dot, Annotation, Beam, Barline, Articulation, Modifier } = VF;
  if (opts.backend !== "canvas") container.innerHTML = "";
  const formation = getFormation(score.formation);
  const measures = prepareNotation(score);
  const zoom = opts.zoom;
  const logicalWidth = Math.max(320, opts.width / zoom);
  const keySpec = keyToVexFlowSpec(score.key);
  const timeSpec = `${score.timeSignature.beats}/${score.timeSignature.beatType}`;
  const mt = measureTicks(score.timeSignature);

  // Distribui compassos em sistemas pela largura estimada.
  const systems: number[][] = [];
  let current: number[] = [];
  let used = 0;
  measures.forEach((m) => {
    const count = Math.max(...[...m.voices.values()].map((v) => v.length), 1);
    const w = estimateMeasureWidth(count) + (current.length === 0 ? 90 : 0);
    if (current.length > 0 && used + w > logicalWidth - LEFT * 2) {
      systems.push(current);
      current = [];
      used = 0;
    }
    current.push(m.index);
    used += w + (current.length === 1 ? 90 : 0);
  });
  if (current.length) systems.push(current);

  const systemHeight = STAFF_GAP + 80 + SYSTEM_GAP;
  const totalHeight = 30 + systems.length * systemHeight;
  const renderer =
    opts.backend === "canvas"
      ? new Renderer(container as HTMLCanvasElement, Renderer.Backends.CANVAS)
      : new Renderer(container as HTMLDivElement, Renderer.Backends.SVG);
  renderer.resize(logicalWidth * zoom, totalHeight * zoom);
  const ctx = renderer.getContext();
  ctx.scale(zoom, zoom);

  const svg = container.querySelector("svg");
  if (svg) {
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", `Partitura: ${score.title}, ${formation.name}, ${score.measureCount} compassos`);
  }

  const noteObjects = new Map<string, InstanceType<typeof StaveNote>>();
  const noteSystem = new Map<string, number>();
  const onsets: OnsetPosition[] = [];
  const tieQueue: NotationEvent[] = [];
  /** Sistemas com dinâmica/articulação sob a pauta inferior: a cifragem desce para não colidir. */
  const crowdedBelow = new Set<number>();

  systems.forEach((sys, si) => {
    const top = 20 + si * systemHeight;
    const yTop = top;
    const yBottom = top + STAFF_GAP;
    // larguras proporcionais ao conteúdo, esticadas até a margem
    const raw = sys.map((mi, k) => {
      const m = measures[mi]!;
      const count = Math.max(...[...m.voices.values()].map((v) => v.length), 1);
      return estimateMeasureWidth(count) + (k === 0 ? 90 : 0) + (si === 0 && k === 0 ? 30 : 0);
    });
    const isLastSystem = si === systems.length - 1;
    const sum = raw.reduce((a, b) => a + b, 0);
    const available = logicalWidth - LEFT * 2;
    const scale = isLastSystem && sum < available * 0.6 ? 1 : available / sum;
    let x = LEFT;
    sys.forEach((mi, k) => {
      const m = measures[mi]!;
      const w = raw[k]! * scale;
      const staves = formation.staves.map((staffSpec, sIdx) => {
        const st = new Stave(x, sIdx === 0 ? yTop : yBottom, w);
        if (k === 0) {
          st.addClef(vexClef(staffSpec.clef), "default", staffSpec.clef === "treble8vb" ? "8vb" : undefined);
          st.addKeySignature(keySpec);
          if (si === 0) st.addTimeSignature(timeSpec);
        }
        if (mi === score.measureCount - 1) st.setEndBarType(Barline.type.END);
        st.setContext(ctx);
        return st;
      }) as [InstanceType<typeof Stave>, InstanceType<typeof Stave>];
      const startX = Math.max(staves[0].getNoteStartX(), staves[1].getNoteStartX());
      staves.forEach((st) => st.setNoteStartX(startX));
      staves.forEach((st) => st.draw());
      if (k === 0) {
        new StaveConnector(staves[0], staves[1]).setType("brace").setContext(ctx).draw();
        new StaveConnector(staves[0], staves[1]).setType("singleLeft").setContext(ctx).draw();
      }
      new StaveConnector(staves[0], staves[1]).setType(mi === score.measureCount - 1 ? "boldDoubleRight" : "singleRight").setContext(ctx).draw();

      const voicesByStaff: Array<Array<InstanceType<typeof Voice>>> = [[], []];
      const beams: Array<InstanceType<typeof Beam>> = [];
      for (const v of formation.voices) {
        const events = m.voices.get(v.id) ?? [];
        if (events.length === 0) continue;
        const clef = vexClef(formation.staves[v.staff].clef);
        const notes = events.map((ne) => {
          const isRest = ne.timed.event.kind === "rest";
          const wholeRest = isRest && ne.timed.end - ne.timed.onset === mt;
          const duration = wholeRest ? "wr" : durationToVexFlow(ne.timed.event.duration, isRest);
          const note = new StaveNote({
            keys: [ne.written ? vexKey(ne.written) : restKey(ne.clef, ne.stem)],
            duration,
            clef,
            stemDirection: ne.stem,
          });
          note.setAttribute("id", ne.timed.event.id);
          if (ne.written && ne.accidental !== null) note.addModifier(new Accidental(vexAccidental(ne.accidental)), 0);
          if (ne.timed.event.duration.dots > 0) Dot.buildAndAttach([note], { all: true });
          const ev = ne.timed.event;
          if (opts.showLyrics && ev.kind === "note" && ev.lyric) {
            const ann = new Annotation(ev.lyric);
            ann.setVerticalJustification(Annotation.VerticalJustify.BOTTOM);
            note.addModifier(ann, 0);
          }
          if (ev.kind === "note") {
            const above = ne.stem === 1;
            if (!above && v.staff === 1 && (ev.dynamic || ev.articulations?.length)) crowdedBelow.add(si);
            for (const art of ev.articulations ?? []) {
              const code = { staccato: "a.", accent: "a>", tenuto: "a-", fermata: above ? "a@a" : "a@u" }[art];
              note.addModifier(new Articulation(code).setPosition(above ? Modifier.Position.ABOVE : Modifier.Position.BELOW), 0);
            }
            if (ev.dynamic) {
              const dyn = new Annotation(ev.dynamic);
              dyn.setFont("Academico, serif", 13, "bold", "italic");
              dyn.setVerticalJustification(above ? Annotation.VerticalJustify.TOP : Annotation.VerticalJustify.BOTTOM);
              note.addModifier(dyn, 0);
            }
          }
          const flag = opts.flagged?.get(ev.id);
          let color: string | null = null;
          if (opts.dimmedVoices?.has(v.id)) color = COLORS.dim;
          if (flag) color = COLORS[flag];
          if (opts.rangeEventIds?.has(ev.id)) color = COLORS.range;
          if (opts.selectedEventId === ev.id) color = COLORS.selected;
          if (color) note.setStyle({ fillStyle: color, strokeStyle: color });
          noteObjects.set(ev.id, note);
          noteSystem.set(ev.id, si);
          if (ev.kind === "note" && ev.tieToNext) tieQueue.push(ne);
          return note;
        });
        const voice = new Voice({ numBeats: score.timeSignature.beats, beatValue: score.timeSignature.beatType });
        voice.setMode(Voice.Mode.SOFT);
        voice.addTickables(notes);
        voicesByStaff[v.staff]!.push(voice);
        const beamable = notes.filter((n) => !n.isRest());
        if (beamable.length > 1) beams.push(...Beam.generateBeams(beamable, { maintainStemDirections: true }));
      }
      const all = [...voicesByStaff[0]!, ...voicesByStaff[1]!];
      if (all.length) {
        const formatter = new Formatter();
        voicesByStaff.forEach((vs) => vs.length && formatter.joinVoices(vs));
        formatter.format(all, Math.max(40, staves[0].getNoteEndX() - startX - 14));
        voicesByStaff.forEach((vs, sIdx) => vs.forEach((voice) => voice.draw(ctx, staves[sIdx as 0 | 1])));
        beams.forEach((b) => b.setContext(ctx).draw());
      }

      // posições de onset (cursor de reprodução e rótulos harmônicos)
      const seen = new Set<number>();
      for (const v of [...formation.voices].reverse()) {
        for (const ne of m.voices.get(v.id) ?? []) {
          if (seen.has(ne.timed.onset)) continue;
          const n = noteObjects.get(ne.timed.event.id);
          if (!n) continue;
          seen.add(ne.timed.onset);
          onsets.push({ onset: ne.timed.onset, x: (n.getAbsoluteX() + 4) * zoom, top: (staves[0].getYForLine(0) - 12) * zoom, bottom: (staves[1].getYForLine(4) + 12) * zoom, system: si });
        }
      }
      x += w;
    });
  });

  // ligaduras de prolongamento
  for (const ne of tieQueue) {
    const part = score.parts.find((p) => p.voice === ne.voice)!;
    const next = part.events[ne.timed.index + 1];
    const first = noteObjects.get(ne.timed.event.id);
    const last = next ? noteObjects.get(next.id) : undefined;
    if (!first) continue;
    if (last && noteSystem.get(next!.id) === noteSystem.get(ne.timed.event.id)) {
      new StaveTie({ firstNote: first, lastNote: last, firstIndexes: [0], lastIndexes: [0] }).setContext(ctx).draw();
    } else {
      new StaveTie({ firstNote: first, lastNote: null, firstIndexes: [0], lastIndexes: [0] }).setContext(ctx).draw();
      if (last) new StaveTie({ firstNote: null, lastNote: last, firstIndexes: [0], lastIndexes: [0] }).setContext(ctx).draw();
    }
  }

  // cifragem harmônica sob a pauta inferior
  if (opts.harmony?.length) {
    ctx.save();
    ctx.setFont("Academico, serif", 13);
    ctx.setFillStyle(COLORS.text);
    for (const h of opts.harmony) {
      const pos = onsets.find((o) => o.onset === h.onset);
      if (!pos || !h.roman) continue;
      ctx.fillText(h.roman, pos.x / zoom - 4, pos.bottom / zoom + (crowdedBelow.has(pos.system) ? 62 : 40));
    }
    ctx.restore();
  }

  onsets.sort((a, b) => a.onset - b.onset);
  return {
    height: totalHeight * zoom,
    onsets,
    systems: systems.map((_, si) => ({ top: (5 + si * systemHeight) * zoom, height: systemHeight * zoom })),
  };
}

export interface StaffSnippetOptions {
  readonly clef: "treble" | "treble8vb" | "bass";
  readonly attacks: ReadonlyArray<ReadonlyArray<{ step: string; alter: number; octave: number }>>;
  readonly width: number;
}

/** Pauta única para exercícios (notas/acordes como semibreves). Recebe alturas ESCRITAS. */
export function renderStaffSnippet(VF: VexFlowApi, container: HTMLElement, opts: StaffSnippetOptions): void {
  const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } = VF;
  container.innerHTML = "";
  const renderer = new Renderer(container as HTMLDivElement, Renderer.Backends.SVG);
  renderer.resize(opts.width, 130);
  const ctx = renderer.getContext();
  const stave = new Stave(8, 10, opts.width - 16);
  stave.addClef(opts.clef === "bass" ? "bass" : "treble", "default", opts.clef === "treble8vb" ? "8vb" : undefined);
  stave.setContext(ctx).draw();
  const clef = opts.clef === "bass" ? "bass" : "treble";
  const notes = opts.attacks.map((pitches) => {
    const sorted = [...pitches].sort((a, b) => a.octave * 7 + "CDEFGAB".indexOf(a.step) - (b.octave * 7 + "CDEFGAB".indexOf(b.step)));
    const n = new StaveNote({ keys: sorted.map((p) => `${p.step.toLowerCase()}/${p.octave}`), duration: "w", clef });
    sorted.forEach((p, i) => {
      if (p.alter !== 0) n.addModifier(new Accidental(vexAccidental(p.alter as -2 | -1 | 0 | 1 | 2)), i);
    });
    return n;
  });
  const voice = new Voice({ numBeats: 4 * notes.length, beatValue: 4 });
  voice.setMode(Voice.Mode.SOFT);
  voice.addTickables(notes);
  new Formatter().joinVoices([voice]).format([voice], opts.width - 100);
  voice.draw(ctx, stave);
  const svg = container.querySelector("svg");
  svg?.setAttribute("role", "img");
}
