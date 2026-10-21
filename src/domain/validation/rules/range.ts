import { type Pitch, formatPitch, toMidi } from "../../music/pitch";
import type { TimedEvent } from "../../music/score";
import { ALL_STYLES, type Rule } from "../rule";

const fmtRange = (r: { low: Pitch; high: Pitch }) => `${formatPitch(r.low)}–${formatPitch(r.high)}`;

export const absoluteRangeRule: Rule = {
  meta: {
    id: "extensao.fora-da-extensao",
    name: "Nota fora da extensão da voz",
    category: "erro-objetivo",
    severityByStyle: ALL_STYLES("erro"),
    summary: "Notas fora da extensão configurada para a voz.",
  },
  check(ctx, emit) {
    for (const [voice, tl] of ctx.timelines) {
      const range = ctx.rangeOf(voice);
      for (const te of tl) {
        if (te.event.kind !== "note") continue;
        const m = toMidi(te.event.pitch);
        if (m >= toMidi(range.low) && m <= toMidi(range.high)) continue;
        const below = m < toMidi(range.low);
        emit({
          onset: te.onset,
          measure: te.measure,
          beat: te.beat,
          voices: [voice],
          events: [te],
          message: `${ctx.voiceName(voice)}: ${formatPitch(te.event.pitch)} está ${below ? "abaixo" : "acima"} da extensão configurada (${fmtRange(range)}).`,
          explanation:
            "A extensão é o limite do que se pode pedir com segurança ao naipe para o qual se escreve. Fora dela, parte dos cantores não alcança a nota ou a produz sem controle de afinação e timbre.",
          suggestions: [
            "Transponha a nota (ou o trecho) uma oitava, cuidando da condução.",
            "Troque a nota com outra voz que esteja confortável nesse registro.",
            "Se o grupo tiver cantores com extensão maior, ajuste a extensão nas configurações.",
          ],
          exceptions: "Solistas ou naipes específicos podem ter extensão maior; nesse caso, ajuste a configuração em vez de ignorar o aviso.",
          evidence: { midi: m, low: toMidi(range.low), high: toMidi(range.high) },
        });
      }
    }
  },
};

export const tessituraRule: Rule = {
  meta: {
    id: "extensao.fora-da-tessitura",
    name: "Trecho fora da tessitura confortável",
    category: "recomendacao",
    severityByStyle: ALL_STYLES("sugestao"),
    summary: "Notas dentro da extensão, mas fora da região confortável da voz.",
  },
  check(ctx, emit) {
    for (const [voice, tl] of ctx.timelines) {
      const range = ctx.rangeOf(voice);
      const tess = ctx.tessituraOf(voice);
      let run: TimedEvent[] = [];
      let runSide: "agudo" | "grave" | null = null;
      const flush = () => {
        const first = run[0];
        if (first && runSide) {
          const notes = run.map((t) => (t.event.kind === "note" ? formatPitch(t.event.pitch) : "")).join(", ");
          emit({
            onset: first.onset,
            measure: first.measure,
            beat: first.beat,
            voices: [voice],
            events: run,
            message: `${ctx.voiceName(voice)}: ${run.length} nota(s) no ${runSide} da voz, fora da tessitura ${fmtRange(tess)} (${notes}).`,
            explanation:
              "Tessitura é a região onde a voz soa com conforto e timbre equilibrado. Passagens breves fora dela são normais; permanência prolongada cansa o naipe e desequilibra o conjunto.",
            suggestions: [
              "Verifique se o trecho é curto e se há tempo de respiração antes e depois.",
              runSide === "agudo" ? "Considere redistribuir a nota mais aguda para a voz vizinha superior." : "Considere redistribuir a nota mais grave para a voz vizinha inferior.",
            ],
            exceptions: "Um ponto culminante no agudo ou uma nota grave expressiva podem ser intencionais — avalie a dinâmica e o texto.",
            evidence: { notes: run.length, side: runSide },
            key: String(first.index),
          });
        }
        run = [];
        runSide = null;
      };
      for (const te of tl) {
        if (te.event.kind !== "note") {
          flush();
          continue;
        }
        const m = toMidi(te.event.pitch);
        const outOfRange = m < toMidi(range.low) || m > toMidi(range.high);
        const side = m > toMidi(tess.high) ? "agudo" : m < toMidi(tess.low) ? "grave" : null;
        if (side && !outOfRange) {
          if (runSide && runSide !== side) flush();
          run.push(te);
          runSide = side;
        } else flush();
      }
      flush();
    }
  },
};
