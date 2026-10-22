import { type ChordIdentification, harmonicFunction, memberOf, romanNumeral, secondaryFunction } from "../../music/chord";
import { PPQ, isStrongBeat, measureTicks } from "../../music/duration";
import type { VoiceId } from "../../music/formations";
import { intervalBetween, intervalNamePt } from "../../music/interval";
import { scaleDegree } from "../../music/key";
import { type Pitch, formatPitch, pitchClassNumber, samePitch, samePitchClass } from "../../music/pitch";
import type { ValidationContext, VoicedSonority } from "../context";
import { melodicNeighbors } from "../reduction";
import { ALL_STYLES, type Rule } from "../rule";

const sameChord = (a: ChordIdentification | null, b: ChordIdentification | null) =>
  !!a && !!b && samePitchClass(a.root, b.root) && a.quality === b.quality;

/** Sequência de mudanças de harmonia (sonoridades consecutivas com a mesma harmonia são agrupadas). */
function harmonicRuns(ctx: ValidationContext): Array<{ first: VoicedSonority; last: VoicedSonority; chord: ChordIdentification }> {
  const runs: Array<{ first: VoicedSonority; last: VoicedSonority; chord: ChordIdentification }> = [];
  for (const s of ctx.sonorities) {
    if (!s.harmony) continue;
    const cur = runs[runs.length - 1];
    if (cur && sameChord(cur.chord, s.harmony)) cur.last = s;
    else runs.push({ first: s, last: s, chord: s.harmony });
  }
  return runs;
}

export const retrogressionRule: Rule = {
  meta: {
    id: "harmonia.retrogressao",
    name: "Retrogressão harmônica (dominante → subdominante)",
    category: "convencao-estilistica",
    severityByStyle: { "coral-tradicional": "sugestao", "coral-contemporaneo": "info", "popular-a-cappella": "off" },
    summary: "Na harmonia funcional tradicional, a dominante tende a resolver na tônica, não a voltar à subdominante.",
  },
  check(ctx, emit) {
    const key = ctx.score.key;
    const runs = harmonicRuns(ctx);
    for (let i = 1; i < runs.length; i++) {
      const a = runs[i - 1]!;
      const b = runs[i]!;
      if (secondaryFunction(a.chord, key) || secondaryFunction(b.chord, key)) continue;
      const fa = harmonicFunction(scaleDegree(a.chord.root, key).degree);
      const fb = harmonicFunction(scaleDegree(b.chord.root, key).degree);
      if (fa !== "D" || fb !== "S") continue;
      const voices = [...ctx.voices];
      emit({
        onset: b.first.sonority.onset,
        measure: b.first.sonority.measure,
        beat: b.first.sonority.beat,
        voices,
        events: voices.map((v) => b.first.events.get(v)),
        message: `${romanNumeral(a.chord, key)} → ${romanNumeral(b.chord, key)}: função de dominante seguida de subdominante.`,
        explanation:
          "A progressão funcional típica é T → S → D → T. Voltar da dominante para a subdominante enfraquece a direção da frase e a expectativa de resolução criada pela sensível.",
        suggestions: ["Resolva a dominante na tônica (ou em vi, cadência de engano) antes de retornar à subdominante.", "Se a intenção é prolongar, troque a ordem: S → D."],
        exceptions:
          "V–IV⁶ como acorde de passagem entre V e V⁶ (baixo em grau conjunto), cadências do blues e muitas progressões populares e modais usam D → S de propósito.",
        evidence: { de: romanNumeral(a.chord, key), para: romanNumeral(b.chord, key) },
      });
    }
  },
};

/** Mesma harmonia na mesma inversão (o baixo não rearticula a mudança). */
function harmonicRunsStrict(ctx: ValidationContext) {
  const runs: Array<{ first: VoicedSonority; last: VoicedSonority; chord: ChordIdentification }> = [];
  for (const s of ctx.sonorities) {
    if (!s.harmony) continue;
    const cur = runs[runs.length - 1];
    if (cur && sameChord(cur.chord, s.harmony) && cur.chord.inversion === s.harmony.inversion) cur.last = s;
    else runs.push({ first: s, last: s, chord: s.harmony });
  }
  return runs;
}

export const harmonicSyncopationRule: Rule = {
  meta: {
    id: "harmonia.sincope-harmonica",
    name: "Harmonia do tempo fraco prolongada sobre o tempo forte",
    category: "recomendacao",
    severityByStyle: { "coral-tradicional": "sugestao", "coral-contemporaneo": "info", "popular-a-cappella": "off" },
    summary: "Um acorde iniciado em tempo fraco que continua (na mesma inversão) no tempo forte seguinte desloca a percepção métrica.",
  },
  check(ctx, emit) {
    const key = ctx.score.key;
    const ts = ctx.score.timeSignature;
    for (const run of harmonicRunsStrict(ctx)) {
      if (run.first.sonority.onset === 0 || isStrongBeat(run.first.sonority.onset, ts)) continue;
      const crossing = ctx.sonorities.find(
        (s) => s.sonority.onset > run.first.sonority.onset && s.sonority.onset <= run.last.sonority.onset && s.sonority.onset % measureTicks(ts) === 0,
      );
      if (!crossing) continue;
      const voices = [...ctx.voices];
      emit({
        onset: crossing.sonority.onset,
        measure: crossing.sonority.measure,
        beat: crossing.sonority.beat,
        voices,
        events: voices.map((v) => crossing.events.get(v)),
        message: `${romanNumeral(run.chord, key)} começa no tempo ${run.first.sonority.beat} do compasso ${run.first.sonority.measure} e continua no tempo forte do compasso ${crossing.sonority.measure}.`,
        explanation:
          "O ritmo harmônico reforça o compasso quando as mudanças de acorde coincidem com os tempos fortes. Uma harmonia que nasce no tempo fraco e atravessa a barra soa sincopada.",
        suggestions: ["Mude a harmonia no tempo forte ou antecipe a mudança para o tempo forte anterior."],
        exceptions: "Síncopes harmônicas são recurso expressivo legítimo; em anacruses e no estilo popular são frequentes.",
        evidence: { acorde: romanNumeral(run.chord, key) },
      });
    }
  },
};

export const sixFourRule: Rule = {
  meta: {
    id: "harmonia.seis-quatro",
    name: "Acorde de quarta e sexta (⁶₄) fora dos usos clássicos",
    category: "convencao-estilistica",
    severityByStyle: { "coral-tradicional": "sugestao", "coral-contemporaneo": "info", "popular-a-cappella": "off" },
    summary: "Na prática comum, a 2ª inversão aparece como ⁶₄ cadencial, de passagem, de pedal (bordadura) ou arpejada.",
  },
  check(ctx, emit) {
    const key = ctx.score.key;
    const bass = ctx.voices[ctx.voices.length - 1] as VoiceId;
    const runs = harmonicRuns(ctx);
    runs.forEach((run, i) => {
      const s = run.first;
      const chord = run.chord;
      if (chord.isSeventh || chord.inversion !== 2 || !s.complete) return;
      const bp = s.pitches.get(bass) as Pitch;
      const bte = s.events.get(bass);
      const { prev, next } = melodicNeighbors(ctx.timelines.get(bass) ?? [], bte);
      const nextRun = runs[i + 1];
      const prevRun = runs[i - 1];
      const cadential =
        scaleDegree(chord.root, key).degree === 1 && !!nextRun && scaleDegree(nextRun.chord.root, key).degree === 5 && pitchClassNumber(nextRun.chord.bass) === pitchClassNumber(bp);
      const passing = !!prev && !!next && intervalBetween(prev, bp).number === 2 && intervalBetween(bp, next).number === 2 && intervalBetween(prev, bp).direction === intervalBetween(bp, next).direction;
      const pedal = !!prev && !!next && samePitch(prev, bp) && samePitch(bp, next);
      const arpeggiated = (!!prevRun && sameChord(prevRun.chord, chord)) || (run.last !== run.first);
      if (cadential || passing || pedal || arpeggiated) return;
      const voices = [...ctx.voices];
      emit({
        onset: s.sonority.onset,
        measure: s.sonority.measure,
        beat: s.sonority.beat,
        voices,
        events: voices.map((v) => s.events.get(v)),
        message: `${romanNumeral(chord, key)} com a quinta (${formatPitch(bp)}) no baixo, sem contexto cadencial, de passagem, de pedal ou arpejado.`,
        explanation:
          "A quarta entre o baixo e uma voz superior é tratada como dissonância na prática comum; por isso a 2ª inversão só aparece em contextos em que o baixo está 'protegido': ⁶₄ cadencial (I⁶₄–V), de passagem (baixo em grau conjunto), de pedal/bordadura (baixo repetido) ou arpejado.",
        suggestions: ["Use a fundamental ou a terça no baixo.", "Ou transforme em ⁶₄ cadencial, seguindo com V sobre o mesmo baixo."],
        exceptions: "Na escrita contemporânea e popular, acordes em 2ª inversão são usados livremente por sua cor.",
        evidence: { acorde: romanNumeral(chord, key), baixoAnterior: prev ? formatPitch(prev) : "—", baixoSeguinte: next ? formatPitch(next) : "—" },
      });
    });
  },
};

export const doublingRule: Rule = {
  meta: {
    id: "vozes.duplicacao",
    name: "Duplicação em tríade no estado fundamental",
    category: "recomendacao",
    severityByStyle: { "coral-tradicional": "sugestao", "coral-contemporaneo": "info", "popular-a-cappella": "off" },
    summary: "Em tríades maiores e menores no estado fundamental, prefira dobrar a fundamental; evite acordes sem terça no meio da frase.",
  },
  check(ctx, emit) {
    const key = ctx.score.key;
    const runs = harmonicRuns(ctx);
    const last = ctx.sonorities[ctx.sonorities.length - 1];
    ctx.sonorities.forEach((s) => {
      const voices = [...ctx.voices];
      const attacked = voices.some((v) => s.sonority.voices.get(v)?.attacked);
      if (!s.complete || !attacked || s.nonChordVoices.length > 0) return;
      // Sem terça (só fundamental e quinta), fora do acorde final
      if (!s.chord && s !== last) {
        const pcs = [...new Set([...s.pitches.values()].map((p) => pitchClassNumber(p as Pitch)))];
        const ps = [...s.pitches.values()] as Pitch[];
        if (pcs.length === 2 && ps.some((a) => ps.some((b) => intervalBetween(a, b).number % 7 === 5 && intervalBetween(a, b).quality === "P"))) {
          emit({
            onset: s.sonority.onset,
            measure: s.sonority.measure,
            beat: s.sonority.beat,
            voices,
            events: voices.map((v) => s.events.get(v)),
            message: "Acorde sem terça (somente fundamental e quinta) no meio da frase.",
            explanation: "Sem a terça, o acorde não define maior nem menor e soa 'oco' no coro.",
            suggestions: ["Leve uma das vozes que dobram a fundamental ou a quinta para a terça."],
            exceptions: "Quintas vazias são cor intencional em música modal, medieval ou em efeitos de 'bordão'.",
            evidence: { classesDeAltura: pcs.length },
            key: "sem-terca",
          });
        }
        return;
      }
      const chord = s.chord;
      if (!chord || chord.isSeventh || chord.inversion !== 0 || (chord.quality !== "major" && chord.quality !== "minor")) return;
      const thirds = voices.filter((v) => memberOf(s.pitches.get(v) as Pitch, chord.root) === "third");
      if (thirds.length < 2) return;
      // Exceção usual: vi depois de V (cadência de engano) dobra a terça.
      const runIndex = runs.findIndex((r) => r.first === s || (r.first.sonority.onset <= s.sonority.onset && r.last.sonority.onset >= s.sonority.onset));
      const prevRun = runs[runIndex - 1];
      const deceptive = scaleDegree(chord.root, key).degree === 6 && !!prevRun && scaleDegree(prevRun.chord.root, key).degree === 5;
      if (deceptive) return;
      emit({
        onset: s.sonority.onset,
        measure: s.sonority.measure,
        beat: s.sonority.beat,
        voices: thirds,
        events: thirds.map((v) => s.events.get(v)),
        message: `Terça dobrada em ${romanNumeral(chord, key)} no estado fundamental (${thirds.map((v) => `${ctx.voiceName(v)} ${formatPitch(s.pitches.get(v) as Pitch)}`).join(", ")}).`,
        explanation:
          "Em tríades no estado fundamental, dobrar a fundamental reforça a estabilidade do acorde. A terça dobrada, sobretudo em acordes maiores, fica proeminente e desequilibra o coro.",
        suggestions: ["Troque uma das terças pela fundamental, se a condução permitir."],
        exceptions: "Dobrar a terça é preferível em vi após V (cadência de engano) e aceitável para evitar paralelas ou saltos ruins.",
        evidence: { acorde: romanNumeral(chord, key), tercas: thirds.length },
        key: "terca",
      });
    });
  },
};

export const breathingRule: Rule = {
  meta: {
    id: "escrita.respiracao",
    name: "Trecho longo sem respiração",
    category: "recomendacao",
    severityByStyle: ALL_STYLES("sugestao"),
    summary: "Uma voz canta por muito tempo sem pausa: planeje respirações.",
  },
  check(ctx, emit) {
    const LIMIT_SEC = 15;
    const secPerTick = 60 / ctx.score.tempoBpm / PPQ;
    for (const v of ctx.voices) {
      const tl = ctx.timelines.get(v) ?? [];
      let start: number | null = null;
      let startIdx = 0;
      const flush = (endIdx: number) => {
        if (start === null) return;
        const first = tl[startIdx]!;
        const lastTe = tl[endIdx]!;
        const dur = (lastTe.end - first.onset) * secPerTick;
        if (dur > LIMIT_SEC) {
          emit({
            onset: first.onset,
            measure: first.measure,
            beat: first.beat,
            voices: [v],
            events: [first, lastTe],
            message: `${ctx.voiceName(v)} canta ${dur.toFixed(1)} s seguidos sem pausa (compassos ${first.measure}–${lastTe.measure}, ♩ = ${ctx.score.tempoBpm}).`,
            explanation:
              "Frases muito longas sem pausa obrigam o cantor a respirar no meio de palavras ou notas, quebrando o fraseado e a afinação. Como referência prática para coros amadores, este motor aponta trechos com mais de 15 s de canto contínuo (heurística, não regra).",
            suggestions: ["Insira uma pausa curta no fim de um inciso do texto.", "Encurte a última nota antes da respiração (por exemplo, mínima → semínima + pausa)."],
            exceptions: "Em coro, a respiração escalonada (os cantores do naipe revezam a respiração) permite notas longas; indique-a na partitura.",
            evidence: { segundos: Number(dur.toFixed(1)), limite: LIMIT_SEC },
          });
        }
        start = null;
      };
      tl.forEach((te, i) => {
        if (te.event.kind === "note") {
          if (start === null) {
            start = te.onset;
            startIdx = i;
          }
        } else flush(i - 1);
      });
      flush(tl.length - 1);
    }
  },
};

export const strongBeatParallelsRule: Rule = {
  meta: {
    id: "conducao.paralelas-em-tempos-fortes",
    name: "Quintas ou oitavas em tempos fortes consecutivos",
    category: "convencao-estilistica",
    severityByStyle: { "coral-tradicional": "sugestao", "coral-contemporaneo": "off", "popular-a-cappella": "off" },
    summary: "Nas vozes extremas, consonâncias perfeitas iguais em tempos fortes seguidos, separadas apenas por notas de passagem.",
  },
  check(ctx, emit) {
    const top = ctx.voices[0] as VoiceId;
    const bottom = ctx.voices[ctx.voices.length - 1] as VoiceId;
    const ts = ctx.score.timeSignature;
    const strong = ctx.sonorities.filter((s) => isStrongBeat(s.sonority.onset, ts) && s.pitches.get(top) && s.pitches.get(bottom));
    for (let i = 1; i < strong.length; i++) {
      const a = strong[i - 1]!;
      const b = strong[i]!;
      const idxA = ctx.sonorities.indexOf(a);
      const idxB = ctx.sonorities.indexOf(b);
      if (idxB - idxA < 2) continue; // consecutivas: já cobertas pela regra de paralelas
      // A norma vale quando o que separa os tempos fortes são notas estranhas nas vozes extremas,
      // não uma troca real de acorde (escrita nota contra nota).
      const between = ctx.sonorities.slice(idxA + 1, idxB);
      if (!between.some((s) => s.nonChordVoices.includes(top) || s.nonChordVoices.includes(bottom))) continue;
      const u0 = a.pitches.get(top) as Pitch;
      const l0 = a.pitches.get(bottom) as Pitch;
      const u1 = b.pitches.get(top) as Pitch;
      const l1 = b.pitches.get(bottom) as Pitch;
      const i0 = intervalBetween(l0, u0);
      const i1 = intervalBetween(l1, u1);
      const kind = (x: typeof i0) => (x.quality !== "P" ? null : x.number % 7 === 5 ? "5" : x.number % 7 === 1 ? "8" : null);
      const k0 = kind(i0);
      const k1 = kind(i1);
      if (!k0 || k0 !== k1) continue;
      const du = Math.sign(intervalBetween(u0, u1).direction);
      const dl = Math.sign(intervalBetween(l0, l1).direction);
      if (du === 0 || du !== dl) continue;
      emit({
        onset: b.sonority.onset,
        measure: b.sonority.measure,
        beat: b.sonority.beat,
        voices: [top, bottom],
        events: [b.events.get(top), b.events.get(bottom)],
        message: `${k1 === "5" ? "Quintas" : "Oitavas"} entre ${ctx.voiceName(top)} e ${ctx.voiceName(bottom)} em tempos fortes consecutivos: ${formatPitch(u0)}/${formatPitch(l0)} (${intervalNamePt(i0)}) → ${formatPitch(u1)}/${formatPitch(l1)} (${intervalNamePt(i1)}).`,
        explanation:
          "Mesmo com notas intermediárias, o ouvido liga as consonâncias perfeitas dos tempos fortes nas vozes extremas, produzindo um paralelismo 'estrutural'. É uma norma do contraponto estrito, mais branda que as paralelas diretas.",
        suggestions: ["Altere uma das vozes extremas no segundo tempo forte (3ª ou 6ª em vez de 5ª/8ª)."],
        exceptions: "Muitos autores toleram quando as notas intermediárias são de fato harmônicas (troca de acorde) ou quando o salto é de oitava no baixo.",
        evidence: { intervalo: k1 === "5" ? "5ª justa" : "8ª justa" },
      });
    }
  },
};
