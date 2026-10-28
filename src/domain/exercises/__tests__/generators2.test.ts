import { describe, expect, it } from "vitest";
import { harmonicFunction, identifyChord } from "../../music/chord";
import { keyFifths, keyNamePt, scaleDegree } from "../../music/key";
import { parseKey } from "../../music/text-notation";
import { buildContext } from "../../validation/context";
import { RULES, validateScore } from "../../validation/engine";
import { classifyMotion, MOTION_PT } from "../../validation/motion";
import { NCT_PT, analyzeNonChordTones } from "../../validation/rules/nct";
import {
  generateCadenceItems,
  generateErrorItems,
  generateFunctionItems,
  generateKeySignatureItems,
  generateMotionItems,
  generateNctItems,
  generateScaleDegreeItems,
  generateSeventhItems,
} from "../generators2";
import { CADENCE_SNIPPETS, ERROR_SNIPPETS, NCT_SNIPPETS } from "../library";
import { createRng } from "../random";
import type { ChoiceItem } from "../types";

const answer = (i: ChoiceItem) => i.options.find((o) => o.id === i.correctOptionId)!.label;
const wellFormed = (items: ChoiceItem[]) => {
  for (const i of items) {
    expect(i.options.some((o) => o.id === i.correctOptionId)).toBe(true);
    expect(new Set(i.options.map((o) => o.label)).size).toBe(i.options.length);
    expect(i.options.length).toBeGreaterThanOrEqual(2);
  }
};

describe("biblioteca de trechos-modelo confere com o motor", () => {
  it("cada trecho de erro produz exatamente o problema declarado", () => {
    for (const e of ERROR_SNIPPETS) {
      const serious = validateScore(e.score).diagnostics.filter((d) => d.severity === "erro" || d.severity === "alerta");
      expect(serious.map((d) => d.ruleId), e.score.id).toContain(e.ruleId);
      expect(serious.every((d) => d.ruleId === e.ruleId), `${e.score.id}: ${serious.map((d) => d.ruleId)}`).toBe(true);
    }
  });
  it("cadências são limpas e notas estranhas têm a classificação declarada", () => {
    for (const c of CADENCE_SNIPPETS) expect(validateScore(c.score).diagnostics.filter((d) => d.severity !== "info"), c.score.id).toEqual([]);
    for (const n of NCT_SNIPPETS) {
      const a = analyzeNonChordTones(buildContext(n.score, { style: "coral-tradicional" }));
      expect(a.map((x) => x.kind), n.score.id).toEqual([n.kind]);
      // o gerador só usa trechos sem outros problemas: todos precisam ser elegíveis
      expect(validateScore(n.score).diagnostics.filter((d) => d.severity !== "info"), n.score.id).toEqual([]);
    }
  });
});

describe("geradores: respostas calculadas pelo domínio", () => {
  for (let seed = 1; seed <= 15; seed++) {
    const rng = () => createRng(seed);
    it(`semente ${seed}`, () => {
      const keys = generateKeySignatureItems(rng(), 6);
      wellFormed(keys);
      for (const i of keys) {
        const m = /de (.+)\?$/.exec(i.prompt);
        if (m) {
          const all = ["C", "G", "D", "A", "E", "B", "F#", "F", "Bb", "Eb", "Ab", "Db", "Gb", "Am", "Em", "Bm", "F#m", "C#m", "Dm", "Gm", "Cm", "Fm", "Bbm", "Ebm"];
          const k = all.map(parseKey).find((x) => keyNamePt(x) === m[1])!;
          const f = keyFifths(k);
          expect(answer(i)).toContain(f === 0 ? "Nenhum" : String(Math.abs(f)));
        }
      }
      wellFormed(generateScaleDegreeItems(rng(), 6));
      const sevenths = generateSeventhItems(rng(), 4);
      wellFormed(sevenths);
      for (const i of sevenths) {
        const ps = i.notation!.parts.map((p) => (p.events[0]!.kind === "note" ? p.events[0]!.pitch : null)!);
        const c = identifyChord(ps)!;
        expect(answer(i)).toContain(["estado fundamental", "1ª inversão", "2ª inversão", "3ª inversão"][c.inversion]);
      }
      const funcs = generateFunctionItems(rng(), 4);
      wellFormed(funcs);
      for (const i of funcs) {
        const key = parseKey(["C", "G", "D", "F", "Bb", "Am", "Dm", "Em"].find((k) => i.prompt.startsWith(`Em ${keyNamePt(parseKey(k))},`))!);
        const ps = i.notation!.parts.map((p) => (p.events[0]!.kind === "note" ? p.events[0]!.pitch : null)!);
        const c = identifyChord(ps)!;
        expect(answer(i)).toContain(`(${harmonicFunction(scaleDegreeOf(c.root, key))})`);
      }
      const motions = generateMotionItems(rng(), 4);
      wellFormed(motions);
      for (const i of motions) {
        const [[l0, u0], [l1, u1]] = i.staff!.attacks as [[never, never], [never, never]];
        expect(answer(i)).toBe(MOTION_PT[classifyMotion(u0, u1, l0, l1)]);
      }
      const errors = generateErrorItems(rng(), 3);
      wellFormed(errors);
      for (const i of errors) {
        const ruleIds = validateScore(i.notation!).diagnostics.map((d) => d.ruleId);
        expect(ruleIds.map((r) => RULES.find((x) => x.meta.id === r)!.meta.name)).toContain(answer(i));
      }
      wellFormed(generateCadenceItems(rng(), 3));
      const ncts = generateNctItems(rng(), 3);
      wellFormed(ncts);
      for (const i of ncts) {
        const k = analyzeNonChordTones(buildContext(i.notation!, { style: "coral-tradicional" }))[0]!.kind;
        expect(answer(i)).toBe(NCT_PT[k]);
      }
    });
  }
});

function scaleDegreeOf(pc: Parameters<typeof scaleDegree>[0], key: ReturnType<typeof parseKey>) {
  return scaleDegree(pc, key).degree;
}

describe("baixo dado e canto dado", () => {
  it("a realização certa é limpa e cada errada tem erro ou alerta no motor", async () => {
    const { REALIZATION_PROBLEMS, realizationScore } = await import("../library");
    expect(REALIZATION_PROBLEMS.some((p) => p.mode === "baixo-dado")).toBe(true);
    expect(REALIZATION_PROBLEMS.some((p) => p.mode === "canto-dado")).toBe(true);
    for (const p of REALIZATION_PROBLEMS) {
      expect(validateScore(realizationScore(p, p.correct)).diagnostics.filter((d) => d.severity !== "info"), p.id).toEqual([]);
      for (const w of p.wrong) {
        expect(validateScore(realizationScore(p, w)).diagnostics.some((d) => d.severity === "erro" || d.severity === "alerta"), p.id).toBe(true);
      }
    }
  });
  it("gera itens bem formados, com a voz dada na notação e comentário em cada alternativa errada", async () => {
    const { generateRealizationItems } = await import("../generators2");
    for (const mode of ["baixo-dado", "canto-dado"] as const) {
      const items = generateRealizationItems(createRng(7), 2, mode);
      expect(items.length).toBe(2);
      wellFormed(items);
      for (const i of items) {
        const given = mode === "baixo-dado" ? "B" : "S";
        for (const part of i.notation!.parts) {
          const hasNotes = part.events.some((e) => e.kind === "note");
          expect(hasNotes, `${i.id} ${part.voice}`).toBe(part.voice === given);
        }
        for (const o of i.options) if (o.id !== i.correctOptionId) expect(i.optionFeedback?.[o.id]).toBeTruthy();
      }
    }
  });
});

describe("distribuição TTBB", () => {
  it("a alternativa certa é limpa no motor e cada errada tem um problema comentado", async () => {
    const { generateTtbbVoicingItems } = await import("../generators2");
    const { scoreFromText } = await import("../../music/text-notation");
    const PT_TO_ASCII: Record<string, string> = { Dó: "C", Ré: "D", Mi: "E", Fá: "F", Sol: "G", Lá: "A", Si: "B" };
    const toAscii = (pt: string) => {
      const m = /^(Dó|Ré|Mi|Fá|Sol|Lá|Si)(♯|♭)?(\d)$/.exec(pt)!;
      return `${PT_TO_ASCII[m[1]!]}${m[2] === "♯" ? "#" : m[2] === "♭" ? "b" : ""}${m[3]}`;
    };
    for (const seed of [1, 2, 3, 4, 5]) {
      const items = generateTtbbVoicingItems(createRng(seed), 3);
      expect(items.length).toBe(3);
      wellFormed(items);
      for (const i of items) {
        for (const o of i.options) {
          const notes = Object.fromEntries(o.label.split(" · ").map((part) => part.split(": ") as [string, string]));
          const score = scoreFromText({
            id: "t",
            title: "t",
            formation: "TTBB",
            key: "C",
            time: "4/4",
            voices: { B2: `${toAscii(notes["Baixo"]!)}:w`, B1: `${toAscii(notes["Barítono"]!)}:w`, T2: `${toAscii(notes["Tenor II"]!)}:w`, T1: `${toAscii(notes["Tenor I"]!)}:w` },
          });
          const problems = validateScore(score).diagnostics.filter((d) => d.severity !== "info");
          if (o.id === i.correctOptionId) expect(problems, o.label).toEqual([]);
          else {
            expect(problems.length, o.label).toBeGreaterThan(0);
            expect(i.optionFeedback?.[o.id]).toBeTruthy();
          }
        }
      }
    }
  });
});
