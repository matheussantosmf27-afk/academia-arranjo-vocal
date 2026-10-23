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
