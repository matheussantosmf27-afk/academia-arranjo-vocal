import { type ChordIdentification, memberOf, romanNumeral } from "../../music/chord";
import { isStrongBeat } from "../../music/duration";
import type { VoiceId } from "../../music/formations";
import { intervalBetween, intervalNamePt } from "../../music/interval";
import { type Key, isLeadingTone, scaleDegree } from "../../music/key";
import { type Pitch, formatPitch, formatPitchClassPt, pitchClassNumber, samePitchClass } from "../../music/pitch";
import type { TimedEvent } from "../../music/score";
import type { ValidationContext, VoicedSonority } from "../context";
import { ALL_STYLES, type Rule } from "../rule";

function isDominantFunction(chord: ChordIdentification, key: Key): boolean {
  const { degree } = scaleDegree(chord.root, key);
  if (degree === 5) return chord.quality === "major" || chord.quality === "dominant7";
  if (degree === 7) return ["diminished", "halfDiminished7", "diminished7"].includes(chord.quality);
  return false;
}

/** Próxima nota (evento) da voz depois do evento dado, e a sonoridade em que ela começa. */
function nextNote(ctx: ValidationContext, voice: VoiceId, te: TimedEvent): { te: TimedEvent; sonority: VoicedSonority } | null {
  const tl = ctx.timelines.get(voice) ?? [];
  const next = tl[te.index + 1];
  if (!next || next.event.kind !== "note") return null;
  const sonority = ctx.sonorities.find((s) => s.sonority.onset === next.onset);
  return sonority ? { te: next, sonority } : null;
}

export const leadingToneDoublingRule: Rule = {
  meta: {
    id: "harmonia.sensivel-dobrada",
    name: "Sensível dobrada",
    category: "convencao-estilistica",
    severityByStyle: { "coral-tradicional": "erro", "coral-contemporaneo": "alerta", "popular-a-cappella": "sugestao" },
    summary: "A sensível aparece em duas vozes num acorde de função dominante.",
  },
  check(ctx, emit) {
    const key = ctx.score.key;
    for (const s of ctx.sonorities) {
      if (!s.chord || !isDominantFunction(s.chord, key)) continue;
      const voices = ctx.voices.filter((v) => {
        const p = s.pitches.get(v);
        return p ? isLeadingTone(p, key) : false;
      });
      if (voices.length < 2) continue;
      const anyAttack = voices.some((v) => s.sonority.voices.get(v)?.attacked);
      if (!anyAttack) continue;
      emit({
        onset: s.sonority.onset,
        measure: s.sonority.measure,
        beat: s.sonority.beat,
        voices,
        events: voices.map((v) => s.events.get(v)),
        message: `A sensível (${formatPitchClassPt(s.pitches.get(voices[0] as VoiceId) as Pitch)}) está dobrada em ${voices.map((v) => ctx.voiceName(v)).join(" e ")} no acorde ${romanNumeral(s.chord, key)}.`,
        explanation:
          "A sensível tem tendência forte a subir para a tônica. Dobrada, ou as duas vozes resolvem juntas (oitavas paralelas), ou uma delas contraria a tendência. Além disso, a nota fica com peso excessivo no acorde.",
        suggestions: ["Dobre a fundamental do acorde de dominante em vez da sensível.", "Em V⁶, dobre a quinta ou a fundamental, nunca o baixo (que é a sensível)."],
        exceptions: "Em sequências harmônicas (progressões por quintas) a sensível pode aparecer dobrada de passagem, sem função cadencial.",
        evidence: { chord: romanNumeral(s.chord, key), count: voices.length },
      });
    }
  },
};

export const leadingToneResolutionRule: Rule = {
  meta: {
    id: "harmonia.resolucao-da-sensivel",
    name: "Resolução da sensível",
    category: "convencao-estilistica",
    severityByStyle: { "coral-tradicional": "alerta", "coral-contemporaneo": "sugestao", "popular-a-cappella": "info" },
    summary: "Na passagem dominante → tônica (ou VI), a sensível deve subir para a tônica.",
  },
  check(ctx, emit) {
    const key = ctx.score.key;
    const top = ctx.voices[0];
    const bass = ctx.voices[ctx.voices.length - 1];
    for (const s of ctx.sonorities) {
      if (!s.chord || !isDominantFunction(s.chord, key)) continue;
      for (const v of ctx.voices) {
        const p = s.pitches.get(v);
        const te = s.events.get(v);
        if (!p || !te || !isLeadingTone(p, key)) continue;
        // Avalia uma única vez por evento: na sonoridade em que ele termina.
        const last = [...ctx.sonorities].reverse().find((x) => x.events.get(v) === te);
        if (last !== s) continue;
        const nx = nextNote(ctx, v, te);
        if (!nx || !nx.sonority.chord) continue;
        const target = scaleDegree(nx.sonority.chord.root, key).degree;
        if (target !== 1 && target !== 6) continue;
        if (nx.te.event.kind !== "note") continue;
        const to = nx.te.event.pitch;
        const mv = intervalBetween(p, to);
        if (samePitchClass(to, key.tonic) && mv.direction === 1 && mv.number === 2) continue;
        const inner = v !== top && v !== bass;
        const frustrated = inner && mv.direction === -1 && mv.number === 3 && scaleDegree(to, key).degree === 5;
        emit({
          onset: nx.te.onset,
          measure: nx.te.measure,
          beat: nx.te.beat,
          voices: [v],
          events: [te, nx.te],
          message: `${ctx.voiceName(v)}: a sensível ${formatPitch(p)} vai para ${formatPitch(to)} (${intervalNamePt(mv)} ${mv.direction === 1 ? "acima" : "abaixo"}) em vez de subir para a tônica.`,
          explanation:
            "A sensível, a meio tom da tônica, cria a expectativa mais forte da harmonia tonal. Nas vozes extremas, que o ouvinte acompanha com mais atenção, deixar de resolvê-la enfraquece a cadência.",
          suggestions: [`Faça ${ctx.voiceName(v)} subir para ${formatPitchClassPt(key.tonic)}.`],
          exceptions: frustrated
            ? "Exceção reconhecida: numa voz interna, a sensível pode descer para o 5º grau ('sensível frustrada') para completar o acorde de tônica — prática comum em Bach."
            : "Em vozes internas a resolução pode ser transferida para outra voz; nas extremas, a exigência é maior.",
          evidence: { from: formatPitch(p), to: formatPitch(to), innerVoice: inner, frustrated },
          ...(frustrated ? { severity: "info" as const, category: "escolha-estetica" as const } : {}),
        });
      }
    }
  },
};

export const seventhResolutionRule: Rule = {
  meta: {
    id: "harmonia.resolucao-da-setima",
    name: "Resolução da sétima do acorde",
    category: "convencao-estilistica",
    severityByStyle: { "coral-tradicional": "alerta", "coral-contemporaneo": "sugestao", "popular-a-cappella": "off" },
    summary: "A sétima de um acorde de sétima deve descer por grau conjunto.",
  },
  check(ctx, emit) {
    const key = ctx.score.key;
    for (const s of ctx.sonorities) {
      if (!s.chord || !s.chord.isSeventh) continue;
      for (const v of ctx.voices) {
        const p = s.pitches.get(v);
        const te = s.events.get(v);
        if (!p || !te || memberOf(p, s.chord.root) !== "seventh") continue;
        const last = [...ctx.sonorities].reverse().find((x) => x.events.get(v) === te);
        if (last !== s) continue;
        const nx = nextNote(ctx, v, te);
        if (!nx || nx.te.event.kind !== "note") continue;
        const nextChord = nx.sonority.chord;
        if (nextChord && samePitchClass(nextChord.root, s.chord.root) && nextChord.quality === s.chord.quality) continue;
        const to = nx.te.event.pitch;
        const mv = intervalBetween(p, to);
        if (mv.direction === -1 && mv.number === 2) continue;
        const v43toI6 =
          s.chord.quality === "dominant7" &&
          s.chord.inversion === 2 &&
          !!nextChord &&
          scaleDegree(nextChord.root, key).degree === 1 &&
          nextChord.inversion === 1 &&
          mv.direction === 1 &&
          mv.number === 2;
        emit({
          onset: nx.te.onset,
          measure: nx.te.measure,
          beat: nx.te.beat,
          voices: [v],
          events: [te, nx.te],
          message: `${ctx.voiceName(v)}: a sétima ${formatPitch(p)} de ${romanNumeral(s.chord, key)} vai para ${formatPitch(to)} em vez de descer por grau conjunto.`,
          explanation:
            "A sétima é uma dissonância: na prática comum ela é preparada (ou atacada por grau) e resolve descendo um grau. Sem essa resolução a tensão fica 'pendurada'.",
          suggestions: ["Faça a sétima descer um grau no acorde seguinte."],
          exceptions: v43toI6
            ? "Exceção reconhecida: em V⁴₃ → I⁶ a sétima pode subir, acompanhando o baixo em décimas paralelas."
            : "A resolução pode ser adiada se o acorde de sétima se mantém (mesma harmonia) ou se a sétima é transferida para outra voz.",
          evidence: { from: formatPitch(p), to: formatPitch(to), exceptionV43: v43toI6 },
          ...(v43toI6 ? { severity: "info" as const, category: "escolha-estetica" as const } : {}),
        });
      }
    }
  },
};

export const nonTertianStrongBeatRule: Rule = {
  meta: {
    id: "harmonia.sonoridade-nao-terciana",
    name: "Sonoridade não identificada em tempo forte",
    category: "recomendacao",
    severityByStyle: { "coral-tradicional": "info", "coral-contemporaneo": "info", "popular-a-cappella": "off" },
    summary: "No tempo forte, as quatro vozes não formam uma tríade ou tétrade reconhecível.",
  },
  check(ctx, emit) {
    for (const s of ctx.sonorities) {
      if (!s.complete || s.chord) continue;
      if (!isStrongBeat(s.sonority.onset, ctx.score.timeSignature)) continue;
      const pcs = new Set([...s.pitches.values()].filter((p): p is Pitch => !!p).map((p) => pitchClassNumber(p)));
      if (pcs.size < 3) continue;
      const notes = ctx.voices.map((v) => formatPitch(s.pitches.get(v) as Pitch)).join(" ");
      emit({
        onset: s.sonority.onset,
        measure: s.sonority.measure,
        beat: s.sonority.beat,
        voices: [...ctx.voices],
        events: ctx.voices.map((v) => s.events.get(v)),
        message: `Sonoridade ${notes} no tempo forte não forma tríade nem tétrade terciana.`,
        explanation:
          "O motor reconhece acordes por superposição de terças. Uma sonoridade não reconhecida no tempo forte costuma indicar nota estranha acentuada (apojatura, retardo) ou um erro de nota. Isto não é um erro em si: verifique se a dissonância é preparada e resolvida.",
        suggestions: ["Confirme se há apojatura ou retardo e se ele resolve por grau conjunto.", "Se não for intencional, corrija a nota para um membro do acorde."],
        exceptions: "Acordes com notas acrescentadas (add9, sus4) e harmonias quartais são recursos legítimos em estilos contemporâneos e populares.",
        evidence: { pitchClasses: pcs.size },
      });
    }
  },
};

export const finalChordRule: Rule = {
  meta: {
    id: "harmonia.acorde-final",
    name: "Acorde final",
    category: "escolha-estetica",
    severityByStyle: ALL_STYLES("info"),
    summary: "Observa se a peça termina no acorde de tônica e se ele está completo.",
  },
  check(ctx, emit) {
    const last = ctx.sonorities[ctx.sonorities.length - 1];
    if (!last || !last.complete) return;
    const key = ctx.score.key;
    const voices = [...ctx.voices];
    const events = voices.map((v) => last.events.get(v));
    const base = { onset: last.sonority.onset, measure: last.sonority.measure, beat: last.sonority.beat, voices, events };
    if (!last.chord) {
      const pcs = new Set([...last.pitches.values()].filter((p): p is Pitch => !!p).map((p) => pitchClassNumber(p)));
      if (pcs.size <= 2) {
        emit({
          ...base,
          message: "O acorde final não tem terça (somente fundamental e quinta, ou uníssono).",
          explanation: "Sem a terça, o acorde final não define modo maior nem menor.",
          suggestions: ["Inclua a terça em uma das vozes internas, se quiser um final conclusivo."],
          exceptions: "O acorde final 'vazio' é tradição da música renascentista e um recurso de cor em arranjos modernos.",
          evidence: { pitchClasses: pcs.size },
          key: "sem-terca",
        });
      }
      return;
    }
    const degree = scaleDegree(last.chord.root, key).degree;
    if (degree !== 1) {
      emit({
        ...base,
        message: `A peça termina em ${romanNumeral(last.chord, key)}, não na tônica.`,
        explanation: "Finais fora da tônica soam suspensivos. Pode ser intencional (exercício de frase antecedente, final em semicadência).",
        suggestions: ["Se a intenção é concluir, termine com uma cadência autêntica (V–I)."],
        evidence: { degree },
        key: "nao-tonica",
      });
    } else if (last.chord.inversion !== 0) {
      emit({
        ...base,
        message: `O acorde final de tônica está em ${last.chord.inversion === 1 ? "1ª" : "2ª"} inversão.`,
        explanation: "Uma cadência conclusiva pede a tônica no baixo; com a terça ou a quinta no baixo o final soa menos estável.",
        suggestions: ["Coloque a fundamental no baixo no último acorde."],
        evidence: { inversion: last.chord.inversion },
        key: "inversao",
      });
    }
  },
};
