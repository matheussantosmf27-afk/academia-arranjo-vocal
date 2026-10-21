import { measureTicks } from "../../music/duration";
import { partLengthTicks, scoreLengthTicks } from "../../music/score";
import { ALL_STYLES, type Rule } from "../rule";

export const measureLengthRule: Rule = {
  meta: {
    id: "estrutura.duracao-da-voz",
    name: "Duração total da voz",
    category: "erro-objetivo",
    severityByStyle: ALL_STYLES("erro"),
    summary: "Cada voz deve preencher exatamente o número de compassos da partitura.",
  },
  check(ctx, emit) {
    const expected = scoreLengthTicks(ctx.score);
    const mt = measureTicks(ctx.score.timeSignature);
    for (const part of ctx.score.parts) {
      const got = partLengthTicks(part);
      if (got === expected) continue;
      const tl = ctx.timelines.get(part.voice) ?? [];
      const last = tl[tl.length - 1];
      const diffBeats = (got - expected) / (mt / ctx.score.timeSignature.beats);
      emit({
        onset: last ? last.onset : 0,
        measure: last ? last.measure : 1,
        beat: last ? last.beat : 1,
        voices: [part.voice],
        events: [last],
        message: `${ctx.voiceName(part.voice)}: ${got > expected ? "sobram" : "faltam"} ${Math.abs(diffBeats)} tempo(s) em relação a ${ctx.score.measureCount} compasso(s) de ${ctx.score.timeSignature.beats}/${ctx.score.timeSignature.beatType}.`,
        explanation:
          "Numa partitura vocal todas as vozes precisam ocupar o mesmo tempo total; caso contrário, o alinhamento vertical (e a harmonia) fica indefinido.",
        suggestions: [got > expected ? "Encurte ou remova eventos no fim da voz." : "Complete a voz com notas ou pausas."],
        evidence: { expectedTicks: expected, actualTicks: got },
      });
    }
  },
};

export const barlineCrossingRule: Rule = {
  meta: {
    id: "estrutura.nota-atravessa-barra",
    name: "Figura atravessando a barra de compasso",
    category: "erro-objetivo",
    severityByStyle: ALL_STYLES("erro"),
    summary: "Uma figura não pode ultrapassar a barra; use duas figuras ligadas.",
  },
  check(ctx, emit) {
    const mt = measureTicks(ctx.score.timeSignature);
    for (const [voice, tl] of ctx.timelines) {
      for (const te of tl) {
        const startMeasure = Math.floor(te.onset / mt);
        const endMeasure = Math.floor((te.end - 1) / mt);
        if (startMeasure === endMeasure) continue;
        emit({
          onset: te.onset,
          measure: te.measure,
          beat: te.beat,
          voices: [voice],
          events: [te],
          message: `${ctx.voiceName(voice)}: a figura iniciada no compasso ${te.measure}, tempo ${te.beat}, termina no compasso ${endMeasure + 1}.`,
          explanation:
            "Na escrita métrica, cada compasso é completo em si. Durações que continuam depois da barra são escritas como duas figuras unidas por ligadura de prolongamento, para que o cantor veja onde caem os tempos.",
          suggestions: ["Divida a nota na barra de compasso e ligue as duas partes.", "Ou ajuste as durações anteriores para que a nota comece no compasso seguinte."],
          evidence: { onset: te.onset, end: te.end, measureTicks: mt },
        });
      }
    }
  },
};
