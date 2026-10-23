import { intervalBetween, intervalNamePt } from "../../music/interval";
import type { VoiceId } from "../../music/formations";
import { type Pitch, formatPitch, toMidi } from "../../music/pitch";
import { pairSteps } from "../motion";
import { ALL_STYLES, type Rule } from "../rule";

function adjacentPairs(voices: readonly VoiceId[]): Array<[VoiceId, VoiceId, number]> {
  const out: Array<[VoiceId, VoiceId, number]> = [];
  for (let i = 0; i + 1 < voices.length; i++) out.push([voices[i] as VoiceId, voices[i + 1] as VoiceId, i]);
  return out;
}

export const crossingRule: Rule = {
  meta: {
    id: "vozes.cruzamento",
    name: "Cruzamento de vozes",
    category: "convencao-estilistica",
    severityByStyle: { "coral-tradicional": "alerta", "coral-contemporaneo": "sugestao", "popular-a-cappella": "info" },
    summary: "Uma voz soa abaixo da voz imediatamente inferior (ou acima da superior).",
  },
  check(ctx, emit) {
    for (const s of ctx.sonorities) {
      for (const [upper, lower] of adjacentPairs(ctx.voices)) {
        const u = s.pitches.get(upper);
        const l = s.pitches.get(lower);
        if (!u || !l || toMidi(u) >= toMidi(l)) continue;
        const attacked = s.sonority.voices.get(upper)?.attacked || s.sonority.voices.get(lower)?.attacked;
        if (!attacked) continue;
        emit({
          onset: s.sonority.onset,
          measure: s.sonority.measure,
          beat: s.sonority.beat,
          voices: [upper, lower],
          events: [s.events.get(upper), s.events.get(lower)],
          message: `${ctx.voiceName(upper)} (${formatPitch(u)}) está abaixo de ${ctx.voiceName(lower)} (${formatPitch(l)}).`,
          explanation:
            "Quando as vozes cruzam, o ouvinte tende a seguir a nota mais aguda e a mais grave, não a linha de cada naipe: a independência das vozes fica menos clara e a sonoridade de cada registro se altera.",
          suggestions: ["Troque as notas entre as duas vozes neste ponto, se a condução permitir.", "Reposicione o acorde para manter a ordem natural das vozes."],
          exceptions:
            "Cruzamentos breves entre vozes internas aparecem em Bach e são comuns na escrita masculina (Barítono acima do Tenor II no barbershop). Evite cruzar com o baixo, que define a inversão do acorde.",
          evidence: { upperMidi: toMidi(u), lowerMidi: toMidi(l) },
        });
      }
    }
  },
};

export const overlapRule: Rule = {
  meta: {
    id: "vozes.sobreposicao",
    name: "Sobreposição de vozes",
    category: "convencao-estilistica",
    severityByStyle: { "coral-tradicional": "alerta", "coral-contemporaneo": "sugestao", "popular-a-cappella": "off" },
    summary: "Uma voz ultrapassa a nota anterior da voz vizinha.",
  },
  check(ctx, emit) {
    for (const [upper, lower] of adjacentPairs(ctx.voices)) {
      for (const st of pairSteps(ctx, upper, lower)) {
        const lowerAbove = toMidi(st.lowerTo) > toMidi(st.upperFrom);
        const upperBelow = toMidi(st.upperTo) < toMidi(st.lowerFrom);
        if (!lowerAbove && !upperBelow) continue;
        const which = lowerAbove
          ? `${ctx.voiceName(lower)} sobe para ${formatPitch(st.lowerTo)}, acima da nota anterior de ${ctx.voiceName(upper)} (${formatPitch(st.upperFrom)})`
          : `${ctx.voiceName(upper)} desce para ${formatPitch(st.upperTo)}, abaixo da nota anterior de ${ctx.voiceName(lower)} (${formatPitch(st.lowerFrom)})`;
        emit({
          onset: st.cur.sonority.onset,
          measure: st.cur.sonority.measure,
          beat: st.cur.sonority.beat,
          voices: [upper, lower],
          events: [st.upperEvent, st.lowerEvent],
          message: `${which}.`,
          explanation:
            "Na sobreposição, uma voz invade o espaço que a vizinha acabou de ocupar. Mesmo sem cruzamento simultâneo, o ouvido pode ligar a nota à voz errada e a linha perde nitidez.",
          suggestions: ["Escolha outra nota do acorde para uma das vozes.", "Inverta a direção de uma das vozes (movimento contrário)."],
          exceptions: "Em escrita contemporânea e em texturas homofônicas densas, a sobreposição é frequentemente aceita.",
          evidence: { lowerTo: toMidi(st.lowerTo), upperFrom: toMidi(st.upperFrom), upperTo: toMidi(st.upperTo), lowerFrom: toMidi(st.lowerFrom) },
        });
      }
    }
  },
};

export const spacingRule: Rule = {
  meta: {
    id: "vozes.espacamento",
    name: "Espaçamento entre vozes adjacentes",
    category: "convencao-estilistica",
    severityByStyle: { "coral-tradicional": "alerta", "coral-contemporaneo": "sugestao", "popular-a-cappella": "sugestao" },
    summary: "Distância excessiva entre vozes vizinhas.",
  },
  check(ctx, emit) {
    for (const s of ctx.sonorities) {
      for (const [upper, lower, i] of adjacentPairs(ctx.voices)) {
        const u = s.pitches.get(upper);
        const l = s.pitches.get(lower);
        if (!u || !l) continue;
        const attacked = s.sonority.voices.get(upper)?.attacked || s.sonority.voices.get(lower)?.attacked;
        if (!attacked) continue;
        const max = ctx.formation.maxAdjacentSpacing[i] ?? 12;
        const semis = toMidi(u) - toMidi(l);
        if (semis <= max) continue;
        const isBassPair = i === ctx.voices.length - 2;
        emit({
          onset: s.sonority.onset,
          measure: s.sonority.measure,
          beat: s.sonority.beat,
          voices: [upper, lower],
          events: [s.events.get(upper), s.events.get(lower)],
          message: `${ctx.voiceName(upper)}–${ctx.voiceName(lower)}: ${intervalNamePt(intervalBetween(l, u))} (${semis} semitons), acima do limite de ${max} semitons.`,
          explanation: isBassPair
            ? "Entre as duas vozes mais graves admite-se distância maior (até uma 12ª), porque a série harmônica favorece intervalos abertos no grave. Além disso, o acorde perde coesão."
            : "Entre vozes superiores adjacentes o limite tradicional é a oitava. Distâncias maiores deixam um 'buraco' no acorde e isolam a voz superior, prejudicando a fusão do coro.",
          suggestions: ["Aproxime as vozes trocando a disposição do acorde (posição fechada/aberta).", "Leve a voz inferior para a oitava de cima, verificando a condução."],
          exceptions: "Efeitos de registro (soprano isolado no agudo) podem ser intencionais em texturas contemporâneas.",
          evidence: { semitones: semis, max },
        });
      }
    }
  },
};

/**
 * Limites graves de intervalos (low interval limits): abaixo destas notas o
 * intervalo soa embolado. Valores usuais em manuais de orquestração/arranjo,
 * expressos pela nota inferior mínima recomendada (MIDI).
 */
export const LOW_INTERVAL_LIMITS: Readonly<Record<number, number>> = {
  1: 52, // 2ª menor: E3
  2: 51, // 2ª maior: Eb3
  3: 48, // 3ª menor: C3
  4: 46, // 3ª maior: Bb2
  5: 45, // 4ª justa: A2
  6: 47, // trítono: B2
  7: 34, // 5ª justa: Bb1
  8: 43, // 6ª menor: G2
  9: 41, // 6ª maior: F2
  10: 41, // 7ª menor: F2
  11: 41, // 7ª maior: F2
};

export const lowIntervalRule: Rule = {
  meta: {
    id: "vozes.limite-grave-de-intervalo",
    name: "Intervalo fechado demais no grave",
    category: "recomendacao",
    severityByStyle: ALL_STYLES("sugestao"),
    summary: "Intervalos pequenos em região grave perdem clareza (limites graves de intervalo).",
  },
  check(ctx, emit) {
    for (const s of ctx.sonorities) {
      for (const [upper, lower] of adjacentPairs(ctx.voices)) {
        const u = s.pitches.get(upper);
        const l: Pitch | null | undefined = s.pitches.get(lower);
        if (!u || !l) continue;
        const attacked = s.sonority.voices.get(upper)?.attacked || s.sonority.voices.get(lower)?.attacked;
        if (!attacked) continue;
        const semis = toMidi(u) - toMidi(l);
        const limit = LOW_INTERVAL_LIMITS[semis];
        if (limit === undefined || toMidi(l) >= limit) continue;
        emit({
          onset: s.sonority.onset,
          measure: s.sonority.measure,
          beat: s.sonority.beat,
          voices: [upper, lower],
          events: [s.events.get(upper), s.events.get(lower)],
          message: `${ctx.voiceName(upper)}–${ctx.voiceName(lower)}: ${intervalNamePt(intervalBetween(l, u))} com a nota inferior em ${formatPitch(l)}, abaixo do limite recomendado.`,
          explanation:
            "No grave, os harmônicos de duas notas próximas interferem entre si e o intervalo soa embolado. Quanto menor o intervalo, mais alto precisa estar. Isso pesa especialmente na escrita TTBB, em que barítono e baixo convivem no grave.",
          suggestions: ["Abra o intervalo (por exemplo, leve o baixo uma oitava abaixo ou a voz superior para outra nota do acorde).", "Desloque o acorde inteiro para uma região mais aguda."],
          exceptions: "Clusters graves podem ser um efeito sombrio intencional; registre a intenção nas notas do arranjo.",
          evidence: { semitones: semis, lowerMidi: toMidi(l), limitMidi: limit },
        });
      }
    }
  },
};
