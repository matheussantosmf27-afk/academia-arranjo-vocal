import { type Interval, intervalBetween, intervalNamePt } from "../../music/interval";
import { formatPitch, toMidi } from "../../music/pitch";
import type { TimedEvent, NoteEvent } from "../../music/score";
import type { ValidationContext } from "../context";
import type { Rule } from "../rule";

interface MelodicStep {
  readonly from: TimedEvent & { event: NoteEvent };
  readonly to: TimedEvent & { event: NoteEvent };
  readonly interval: Interval;
}

/** Pares de notas consecutivas (uma pausa interrompe a linha; notas ligadas iguais são ignoradas). */
export function melodicSteps(ctx: ValidationContext, voice: string): MelodicStep[] {
  const tl = ctx.timelines.get(voice as never) ?? [];
  const out: MelodicStep[] = [];
  for (let i = 1; i < tl.length; i++) {
    const a = tl[i - 1] as TimedEvent;
    const b = tl[i] as TimedEvent;
    if (a.event.kind !== "note" || b.event.kind !== "note") continue;
    const interval = intervalBetween(a.event.pitch, b.event.pitch);
    if (interval.direction === 0 && interval.semitones === 0) continue;
    out.push({ from: a as MelodicStep["from"], to: b as MelodicStep["to"], interval });
  }
  return out;
}

const dir = (i: Interval) => (i.direction === 1 ? "ascendente" : "descendente");

export const augmentedMelodicRule: Rule = {
  meta: {
    id: "melodia.intervalo-aumentado",
    name: "Intervalo melódico aumentado",
    category: "convencao-estilistica",
    severityByStyle: { "coral-tradicional": "alerta", "coral-contemporaneo": "sugestao", "popular-a-cappella": "sugestao" },
    summary: "Saltos aumentados (2ª, 4ª, 5ª aumentadas) são difíceis de afinar.",
  },
  check(ctx, emit) {
    for (const voice of ctx.voices) {
      for (const st of melodicSteps(ctx, voice)) {
        if (st.interval.quality !== "A" && st.interval.quality !== "AA") continue;
        if (st.interval.number === 1) continue; // semitom cromático: tratado como inflexão
        emit({
          onset: st.to.onset,
          measure: st.to.measure,
          beat: st.to.beat,
          voices: [voice],
          events: [st.from, st.to],
          message: `${ctx.voiceName(voice)}: ${intervalNamePt(st.interval)} ${dir(st.interval)} (${formatPitch(st.from.event.pitch)} → ${formatPitch(st.to.event.pitch)}).`,
          explanation:
            "Intervalos aumentados não pertencem à escala diatônica 'natural' do ouvido do cantor e são difíceis de entoar com precisão, sobretudo sem apoio instrumental. Em menor, o caso típico é a 2ª aumentada entre o 6º e o 7º graus da escala harmônica.",
          suggestions: ["Em menor, use o 6º grau elevado (escala melódica) ao subir para a sensível.", "Reescreva a linha por graus conjuntos ou com um intervalo consonante."],
          exceptions: "A 2ª aumentada pode ser um recurso expressivo (cor 'oriental', lamentos), desde que preparada e bem ensaiada.",
          evidence: { interval: intervalNamePt(st.interval), semitones: st.interval.semitones },
        });
      }
    }
  },
};

export const largeLeapRule: Rule = {
  meta: {
    id: "melodia.salto-grande",
    name: "Salto melódico grande",
    category: "convencao-estilistica",
    severityByStyle: { "coral-tradicional": "alerta", "coral-contemporaneo": "sugestao", "popular-a-cappella": "sugestao" },
    summary: "Saltos maiores que a oitava, ou de 7ª, prejudicam a cantabilidade.",
  },
  check(ctx, emit) {
    for (const voice of ctx.voices) {
      for (const st of melodicSteps(ctx, voice)) {
        const n = st.interval.number;
        const tooBig = st.interval.semitones > 12;
        const seventh = n === 7;
        if (!tooBig && !seventh) continue;
        emit({
          onset: st.to.onset,
          measure: st.to.measure,
          beat: st.to.beat,
          voices: [voice],
          events: [st.from, st.to],
          message: `${ctx.voiceName(voice)}: salto de ${intervalNamePt(st.interval)} ${dir(st.interval)} (${formatPitch(st.from.event.pitch)} → ${formatPitch(st.to.event.pitch)}).`,
          explanation: tooBig
            ? "Saltos maiores que a oitava exigem mudança brusca de registro e quebram a continuidade da linha. Em coro, a afinação do naipe inteiro sofre."
            : "O salto de 7ª é dissonante e difícil de ouvir internamente antes de cantar; é evitado na escrita coral tradicional.",
          suggestions: ["Divida o salto em dois movimentos ou mude a oitava da nota de chegada.", "Troque a nota com outra voz para reduzir o salto."],
          exceptions: "No baixo, saltos de oitava são comuns em cadências. 7ªs separadas por pausa (nova frase) não são consideradas.",
          evidence: { interval: intervalNamePt(st.interval), semitones: st.interval.semitones },
          ...(tooBig ? {} : { severity: "sugestao" as const }),
        });
      }
    }
  },
};

export const leapRecoveryRule: Rule = {
  meta: {
    id: "melodia.compensacao-de-salto",
    name: "Salto grande sem compensação",
    category: "recomendacao",
    severityByStyle: { "coral-tradicional": "sugestao", "coral-contemporaneo": "info", "popular-a-cappella": "info" },
    summary: "Após um salto de 6ª ou maior, a linha deve mudar de direção, de preferência por grau conjunto.",
  },
  check(ctx, emit) {
    const bass = ctx.voices[ctx.voices.length - 1];
    for (const voice of ctx.voices) {
      const steps = melodicSteps(ctx, voice);
      for (let i = 0; i + 1 < steps.length; i++) {
        const leap = steps[i] as MelodicStep;
        const next = steps[i + 1] as MelodicStep;
        if (leap.to !== next.from) continue;
        if (leap.interval.number < 6) continue;
        if (voice === bass && leap.interval.number === 8) continue;
        const recovered = next.interval.direction === -leap.interval.direction;
        if (recovered) continue;
        emit({
          onset: next.to.onset,
          measure: next.to.measure,
          beat: next.to.beat,
          voices: [voice],
          events: [leap.from, leap.to, next.to],
          message: `${ctx.voiceName(voice)}: após o salto de ${intervalNamePt(leap.interval)} ${dir(leap.interval)}, a linha continua ${next.interval.direction === 0 ? "na mesma nota" : dir(next.interval)}.`,
          explanation:
            "Uma linha cantável tende a 'preencher' o espaço aberto por um salto grande voltando na direção oposta. Isso equilibra o contorno e ajuda a afinação.",
          suggestions: ["Faça a nota seguinte voltar por grau conjunto na direção contrária ao salto."],
          exceptions: "Arpejos do mesmo acorde e saltos de oitava no baixo são exceções usuais.",
          evidence: { leap: intervalNamePt(leap.interval), next: intervalNamePt(next.interval) },
        });
      }
    }
  },
};

export const consecutiveLeapsRule: Rule = {
  meta: {
    id: "melodia.saltos-consecutivos",
    name: "Saltos consecutivos na mesma direção",
    category: "recomendacao",
    severityByStyle: { "coral-tradicional": "sugestao", "coral-contemporaneo": "info", "popular-a-cappella": "off" },
    summary: "Dois saltos na mesma direção que somam mais que uma oitava ou delineiam uma dissonância.",
  },
  check(ctx, emit) {
    for (const voice of ctx.voices) {
      const steps = melodicSteps(ctx, voice);
      for (let i = 0; i + 1 < steps.length; i++) {
        const a = steps[i] as MelodicStep;
        const b = steps[i + 1] as MelodicStep;
        if (a.to !== b.from) continue;
        if (a.interval.number < 3 || b.interval.number < 3) continue;
        if (a.interval.direction !== b.interval.direction) continue;
        const outline = intervalBetween(a.from.event.pitch, b.to.event.pitch);
        const dissonant = [2, 7].includes(((outline.number - 1) % 7) + 1) || outline.quality === "A" || outline.quality === "d";
        const tooWide = outline.semitones > 12;
        if (!dissonant && !tooWide) continue;
        emit({
          onset: b.to.onset,
          measure: b.to.measure,
          beat: b.to.beat,
          voices: [voice],
          events: [a.from, a.to, b.to],
          message: `${ctx.voiceName(voice)}: dois saltos ${dir(a.interval)}s delineiam ${intervalNamePt(outline)} (${formatPitch(a.from.event.pitch)} → ${formatPitch(b.to.event.pitch)}).`,
          explanation:
            "Saltos sucessivos na mesma direção somam um intervalo maior, que o cantor precisa ouvir. Se o resultado é dissonante ou excede a oitava, a linha fica difícil de afinar.",
          suggestions: ["Inverta a direção do segundo salto.", "Substitua um dos saltos por grau conjunto."],
          exceptions: "Arpejos consonantes (tríade completa) são comuns e não são apontados.",
          evidence: { outline: intervalNamePt(outline), semitones: toMidi(b.to.event.pitch) - toMidi(a.from.event.pitch) },
        });
      }
    }
  },
};
