import {
  type Interval,
  intervalBetween,
  intervalNamePt,
  isPerfectFifthLike,
  isPerfectOctaveLike,
  simpleNumber,
} from "../../music/interval";
import { pitchClassNumber, formatPitch, toMidi } from "../../music/pitch";
import type { VoicedSonority } from "../context";
import { type PairStep, pairSteps, voicePairs } from "../motion";
import type { Rule } from "../rule";

type PerfectKind = "quintas" | "oitavas" | "unissonos";

function perfectKind(i: Interval): PerfectKind | null {
  if (isPerfectFifthLike(i)) return "quintas";
  if (isPerfectOctaveLike(i)) return i.number === 1 ? "unissonos" : "oitavas";
  return null;
}

function sameKind(a: PerfectKind, b: PerfectKind): boolean {
  if (a === "quintas" || b === "quintas") return a === b;
  return true; // uníssono ↔ oitava contam como a mesma classe (oitavas consecutivas)
}

function stepDetails(st: PairStep) {
  const i0 = intervalBetween(st.lowerFrom, st.upperFrom);
  const i1 = intervalBetween(st.lowerTo, st.upperTo);
  return { i0, i1 };
}

function describe(st: PairStep, i0: Interval, i1: Interval): string {
  return `${formatPitch(st.upperFrom)}/${formatPitch(st.lowerFrom)} (${intervalNamePt(i0)}) → ${formatPitch(st.upperTo)}/${formatPitch(st.lowerTo)} (${intervalNamePt(i1)})`;
}

const PARALLEL_EXPLANATION =
  "Quintas e oitavas justas são as consonâncias mais 'fundidas' da série harmônica. Quando duas vozes se movem juntas mantendo esse intervalo, o ouvido as percebe como uma só linha reforçada: a textura perde uma voz real e a independência que caracteriza a escrita a quatro partes. Na prática comum, isso é evitado entre quaisquer duas vozes.";

export const parallelPerfectRule: Rule = {
  meta: {
    id: "conducao.paralelas",
    name: "Quintas ou oitavas paralelas",
    category: "convencao-estilistica",
    severityByStyle: { "coral-tradicional": "erro", "coral-contemporaneo": "alerta", "popular-a-cappella": "sugestao" },
    summary: "Duas vozes formam 5ª justa (ou 8ª/uníssono) em notas consecutivas, movendo-se na mesma direção.",
  },
  check(ctx, emit) {
    for (const [upper, lower] of voicePairs(ctx.voices)) {
      for (const st of pairSteps(ctx, upper, lower)) {
        if (st.motion !== "paralelo" && st.motion !== "semelhante") continue;
        const { i0, i1 } = stepDetails(st);
        const k0 = perfectKind(i0);
        const k1 = perfectKind(i1);
        if (!k0 || !k1 || !sameKind(k0, k1)) continue;
        const name = k1 === "quintas" ? "Quintas paralelas" : k1 === "unissonos" && k0 === "unissonos" ? "Uníssonos paralelos" : "Oitavas paralelas";
        emit({
          onset: st.cur.sonority.onset,
          measure: st.cur.sonority.measure,
          beat: st.cur.sonority.beat,
          voices: [upper, lower],
          events: [st.upperEvent, st.lowerEvent],
          message: `${name} entre ${ctx.voiceName(upper)} e ${ctx.voiceName(lower)}: ${describe(st, i0, i1)}.`,
          explanation: PARALLEL_EXPLANATION,
          suggestions: [
            "Mova uma das vozes em movimento contrário ou oblíquo.",
            "Troque a nota de uma das vozes por outro membro do acorde (mudando a duplicação).",
            "Use outra inversão do acorde para alterar a linha do baixo.",
          ],
          exceptions:
            "Duplicações intencionais (duas vozes cantando a mesma linha em oitavas por um trecho inteiro), paralelismo modal/impressionista e escrita popular com 'power chords' vocais. Nesses casos, trate como escolha de textura, não como erro de condução.",
          evidence: { from: intervalNamePt(i0), to: intervalNamePt(i1), motion: st.motion, kind: k1 },
          key: k1,
        });
      }
    }
  },
};

export const contraryPerfectRule: Rule = {
  meta: {
    id: "conducao.paralelas-por-movimento-contrario",
    name: "Quintas ou oitavas por movimento contrário",
    category: "convencao-estilistica",
    severityByStyle: { "coral-tradicional": "alerta", "coral-contemporaneo": "sugestao", "popular-a-cappella": "off" },
    summary: "Consonâncias perfeitas consecutivas obtidas por movimento contrário (ex.: 5ª → 12ª).",
  },
  check(ctx, emit) {
    const outer: [string, string] = [ctx.voices[0] as string, ctx.voices[ctx.voices.length - 1] as string];
    for (const [upper, lower] of voicePairs(ctx.voices)) {
      for (const st of pairSteps(ctx, upper, lower)) {
        if (st.motion !== "contrario") continue;
        const { i0, i1 } = stepDetails(st);
        const k0 = perfectKind(i0);
        const k1 = perfectKind(i1);
        if (!k0 || !k1 || !sameKind(k0, k1)) continue;
        const isOuter = upper === outer[0] && lower === outer[1];
        const finalCadence = st.cur === ctx.sonorities[ctx.sonorities.length - 1];
        emit({
          onset: st.cur.sonority.onset,
          measure: st.cur.sonority.measure,
          beat: st.cur.sonority.beat,
          voices: [upper, lower],
          events: [st.upperEvent, st.lowerEvent],
          message: `${k1 === "quintas" ? "Quintas" : "Oitavas"} consecutivas por movimento contrário entre ${ctx.voiceName(upper)} e ${ctx.voiceName(lower)}: ${describe(st, i0, i1)}.`,
          explanation:
            "O movimento contrário disfarça o paralelismo, mas a sucessão de duas consonâncias perfeitas do mesmo tipo ainda enfraquece a independência das vozes. Manuais rigorosos tratam como paralelas 'escondidas por contrário'.",
          suggestions: ["Altere a duplicação do segundo acorde.", "Mova uma das vozes por grau conjunto para uma terça ou sexta."],
          exceptions:
            "Bach usa oitavas por movimento contrário entre as vozes extremas em cadências (baixo saltando V–I). Fora disso, prefira evitar.",
          evidence: { from: intervalNamePt(i0), to: intervalNamePt(i1), outerVoices: isOuter, finalCadence },
          ...(isOuter && finalCadence ? { severity: "info" as const, category: "escolha-estetica" as const } : {}),
        });
      }
    }
  },
};

export const unequalFifthsRule: Rule = {
  meta: {
    id: "conducao.quintas-desiguais",
    name: "Quinta diminuta seguida de quinta justa com o baixo",
    category: "convencao-estilistica",
    severityByStyle: { "coral-tradicional": "alerta", "coral-contemporaneo": "sugestao", "popular-a-cappella": "off" },
    summary: "5ª diminuta → 5ª justa envolvendo o baixo.",
  },
  check(ctx, emit) {
    const bass = ctx.voices[ctx.voices.length - 1];
    for (const [upper, lower] of voicePairs(ctx.voices)) {
      if (lower !== bass) continue;
      for (const st of pairSteps(ctx, upper, lower)) {
        if (st.motion !== "semelhante" && st.motion !== "paralelo") continue;
        const { i0, i1 } = stepDetails(st);
        if (!(simpleNumber(i0.number) === 5 && i0.quality === "d" && isPerfectFifthLike(i1))) continue;
        emit({
          onset: st.cur.sonority.onset,
          measure: st.cur.sonority.measure,
          beat: st.cur.sonority.beat,
          voices: [upper, lower],
          events: [st.upperEvent, st.lowerEvent],
          message: `${ctx.voiceName(upper)}–${ctx.voiceName(lower)}: ${describe(st, i0, i1)}.`,
          explanation:
            "A 5ª diminuta pede resolução para dentro (3ª). Ao seguir para uma 5ª justa com o baixo, o trítono não resolve e a consonância perfeita fica exposta. Já 5ª justa → 5ª diminuta é aceita.",
          suggestions: ["Resolva o trítono por movimento contrário (para uma 3ª)."],
          exceptions: "Entre vozes superiores, sem o baixo, a sucessão é geralmente tolerada.",
          evidence: { from: intervalNamePt(i0), to: intervalNamePt(i1) },
        });
      }
    }
  },
};

function samePitchClassSet(a: VoicedSonority, b: VoicedSonority): boolean {
  const set = (s: VoicedSonority) =>
    [...new Set([...s.pitches.values()].filter((p) => p !== null).map((p) => pitchClassNumber(p!)))].sort().join(",");
  return set(a) === set(b);
}

export const directOuterRule: Rule = {
  meta: {
    id: "conducao.quintas-oitavas-diretas",
    name: "Quintas ou oitavas diretas (ocultas) nas vozes extremas",
    category: "convencao-estilistica",
    severityByStyle: { "coral-tradicional": "alerta", "coral-contemporaneo": "info", "popular-a-cappella": "off" },
    summary: "Vozes extremas chegam a 5ª/8ª justa por movimento direto com salto na voz superior.",
  },
  check(ctx, emit) {
    const top = ctx.voices[0];
    const bottom = ctx.voices[ctx.voices.length - 1];
    if (!top || !bottom) return;
    for (const st of pairSteps(ctx, top, bottom)) {
      if (st.motion !== "semelhante") continue;
      const { i0, i1 } = stepDetails(st);
      const k1 = perfectKind(i1);
      if (!k1) continue;
      const k0 = perfectKind(i0);
      if (k0 && sameKind(k0, k1)) continue; // já é paralela: outra regra
      const upperMove = intervalBetween(st.upperFrom, st.upperTo);
      if (upperMove.number <= 2) continue; // exceção clássica: soprano por grau conjunto
      if (samePitchClassSet(st.prev, st.cur)) continue; // mesmo acorde reposicionado
      emit({
        onset: st.cur.sonority.onset,
        measure: st.cur.sonority.measure,
        beat: st.cur.sonority.beat,
        voices: [top, bottom],
        events: [st.upperEvent, st.lowerEvent],
        message: `${ctx.voiceName(top)} e ${ctx.voiceName(bottom)} chegam a ${intervalNamePt(i1)} por movimento direto, com salto de ${intervalNamePt(upperMove)} na voz superior: ${describe(st, i0, i1)}.`,
        explanation:
          "Nas vozes extremas — as mais audíveis — chegar a uma consonância perfeita por movimento direto com salto na voz superior faz o ouvido 'preencher' o paralelismo implícito.",
        suggestions: ["Faça a voz superior chegar por grau conjunto.", "Use movimento contrário entre as vozes extremas."],
        exceptions:
          "Permitido quando a voz superior se move por grau conjunto (já desconsiderado aqui), em mudanças de posição do mesmo acorde e, segundo muitos autores, na cadência V–I com o baixo saltando.",
        evidence: { to: intervalNamePt(i1), upperLeap: intervalNamePt(upperMove), upperDelta: toMidi(st.upperTo) - toMidi(st.upperFrom) },
      });
    }
  },
};
