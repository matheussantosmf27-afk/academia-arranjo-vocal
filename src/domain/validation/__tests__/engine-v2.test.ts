import { describe, expect, it } from "vitest";
import { CHORALE_SATB_C, CHORALE_TTBB_G } from "../../music/examples";
import type { StyleProfileId } from "../../music/score";
import { type ScoreTextSpec, scoreFromText } from "../../music/text-notation";
import { buildContext } from "../context";
import { analyzeHarmony, validateScore } from "../engine";
import { analyzeNonChordTones } from "../rules/nct";
import type { Diagnostic } from "../types";

function satb(voices: ScoreTextSpec["voices"], opts: { key?: string; time?: string; tempo?: number; style?: StyleProfileId } = {}) {
  return scoreFromText({ id: "t", title: "t", formation: "SATB", key: opts.key ?? "C", time: opts.time ?? "4/4", voices, ...(opts.tempo ? { tempo: opts.tempo } : {}), style: opts.style ?? "coral-tradicional" });
}
const byRule = (ds: readonly Diagnostic[], id: string) => ds.filter((d) => d.ruleId === id);
const ncts = (s: ReturnType<typeof satb>) => analyzeNonChordTones(buildContext(s, { style: "coral-tradicional" }));
const C_CHORD = { A: "G4:w", T: "E4:w", B: "C3:w" };

describe("notas estranhas: classificação", () => {
  it("nota de passagem (tempo fraco) é descrita, não condenada", () => {
    const s = satb({ S: "E5:q F5:q G5:h", ...C_CHORD });
    const [n] = ncts(s);
    expect(n).toMatchObject({ kind: "passagem", accented: false, voice: "S" });
    const d = byRule(validateScore(s).diagnostics, "harmonia.notas-estranhas");
    expect(d).toHaveLength(1);
    expect(d[0]).toMatchObject({ severity: "info", category: "escolha-estetica", location: { measure: 1, beat: 2, eventIds: ["S-2"] } });
    expect(d[0]!.message).toMatch(/Nota de passagem em Soprano: F5 sobre I/);
  });
  it("bordadura", () => {
    expect(ncts(satb({ S: "E5:q F5:q E5:h", ...C_CHORD }))[0]?.kind).toBe("bordadura");
  });
  it("retardo 4–3 preparado e resolvido (a terça só chega na resolução)", () => {
    const s = satb({ S: "C5:h~ C5:q B4:q", A: "E4:h D4:h", T: "G3:h G3:h", B: "C3:h G2:h" });
    const [n] = ncts(s);
    expect(n).toMatchObject({ kind: "retardo", figure: "4–3", accented: true });
    const labels = analyzeHarmony(s).map((h) => h.roman);
    expect(labels).toEqual(["I", "V", "V"]);
  });
  it("retardo 9–8 sobre acorde completo", () => {
    const s = satb({ S: "D5:h~ D5:q C5:q", A: "G4:h G4:h", T: "B3:h E4:h", B: "G2:h C3:h" });
    expect(ncts(s)[0]).toMatchObject({ kind: "retardo", figure: "9–8" });
  });
  it("retardo sem resolução por grau é alerta no estilo tradicional", () => {
    const s = satb({ S: "D5:h~ D5:q G4:q", A: "G4:h G4:h", T: "B3:h E4:h", B: "G2:h C3:h" });
    const d = byRule(validateScore(s).diagnostics, "harmonia.notas-estranhas")[0]!;
    expect(d.evidence.tipo).toBe("retardo-sem-resolucao");
    expect(d).toMatchObject({ severity: "alerta", category: "convencao-estilistica" });
  });
  it("apojatura acentuada (chega por salto, resolve por grau)", () => {
    expect(ncts(satb({ S: "G4:h D5:q C5:q", ...C_CHORD }))[0]).toMatchObject({ kind: "apojatura", accented: true });
  });
  it("escapada (sai por grau, abandona por salto em sentido contrário)", () => {
    expect(ncts(satb({ S: "E5:q F5:q C5:h", ...C_CHORD }))[0]?.kind).toBe("escapada");
  });
  it("antecipação da nota do acorde seguinte", () => {
    const s = satb({ S: "B4:h B4:q C5:q | C5:w", A: "G4:w | G4:w", T: "D4:w | E4:w", B: "G2:w | C3:w" });
    expect(ncts(s)[0]).toMatchObject({ kind: "antecipacao", voice: "S" });
  });
  it("dissonância livre (salto para e salto de) é apontada; no estilo popular vira observação", () => {
    const s = satb({ S: "C5:h F5:q C5:q", ...C_CHORD });
    expect(byRule(validateScore(s).diagnostics, "harmonia.notas-estranhas")[0]).toMatchObject({ severity: "alerta" });
    expect(byRule(validateScore(s, { style: "popular-a-cappella" }).diagnostics, "harmonia.notas-estranhas")[0]).toMatchObject({ severity: "info" });
  });
  it("sonoridade com nota estranha reconhecida não gera a observação de 'não terciana'", () => {
    const s = satb({ S: "G4:h D5:q C5:q", ...C_CHORD });
    expect(byRule(validateScore(s).diagnostics, "harmonia.sonoridade-nao-terciana")).toEqual([]);
  });
});

describe("progressão e ritmo harmônico", () => {
  it("retrogressão V → IV", () => {
    const s = satb({ S: "D5:h C5:h", A: "B4:h A4:h", T: "G4:h F4:h", B: "G3:h F3:h" });
    const d = byRule(validateScore(s).diagnostics, "harmonia.retrogressao");
    expect(d).toHaveLength(1);
    expect(d[0]!.message).toMatch(/V → IV/);
    expect(byRule(validateScore(s, { style: "popular-a-cappella" }).diagnostics, "harmonia.retrogressao")).toEqual([]);
  });
  it("IV → V não é retrogressão", () => {
    const s = satb({ S: "C5:h D5:h", A: "A4:h B4:h", T: "F4:h G4:h", B: "F3:h G3:h" });
    expect(byRule(validateScore(s).diagnostics, "harmonia.retrogressao")).toEqual([]);
  });
  it("síncope harmônica: mesma harmonia e inversão do tempo fraco para o tempo forte", () => {
    const s = satb({ S: "G4:h. A4:q | A4:w", A: "E4:h. F4:q | F4:w", T: "C4:h. C4:q | C4:w", B: "C3:h. F3:q | F3:w" });
    expect(byRule(validateScore(s).diagnostics, "harmonia.sincope-harmonica")).toHaveLength(1);
  });
  it("seis-quatro sem contexto é apontado; o cadencial não", () => {
    const s = satb({ S: "C5:h C5:h", A: "A4:h G4:h", T: "F4:h E4:h", B: "F3:h G3:h" });
    expect(byRule(validateScore(s).diagnostics, "harmonia.seis-quatro")).toHaveLength(1);
    expect(byRule(validateScore(CHORALE_SATB_C).diagnostics, "harmonia.seis-quatro")).toEqual([]);
  });
  it("seis-quatro de passagem (baixo em grau conjunto) é aceito", () => {
    // I – V⁶₄ – I⁶ com o baixo C–D–E
    const s = satb({ S: "E5:q F5:q G5:h", A: "G4:q G4:q G4:h", T: "C4:q B3:q C4:h", B: "C3:q D3:q E3:h" });
    expect(byRule(validateScore(s).diagnostics, "harmonia.seis-quatro")).toEqual([]);
  });
});

describe("duplicação, respiração e paralelas estruturais", () => {
  it("terça dobrada em tríade maior no estado fundamental", () => {
    const s = satb({ S: "E5:w", A: "G4:w", T: "E4:w", B: "C3:w" });
    expect(byRule(validateScore(s).diagnostics, "vozes.duplicacao")[0]!.location.voices).toEqual(["S", "T"]);
  });
  it("exceção: vi depois de V (cadência de engano) com terça dobrada", () => {
    const s = satb({ S: "B4:h C5:h", A: "D4:h C4:h", T: "G3:h A3:h", B: "G2:h A2:h" });
    expect(byRule(validateScore(s).diagnostics, "vozes.duplicacao")).toEqual([]);
  });
  it("acorde sem terça no meio da frase", () => {
    const s = satb({ S: "G4:h G4:h", A: "C4:h E4:h", T: "G3:h C4:h", B: "C3:h C3:h" });
    expect(byRule(validateScore(s).diagnostics, "vozes.duplicacao").map((d) => d.id)).toEqual([expect.stringContaining("sem-terca")]);
  });
  it("trecho longo sem pausa sugere respiração; com pausa não", () => {
    const long = satb({ S: "C5:w | C5:w | C5:w | C5:w | C5:w", A: "r:w | r:w | r:w | r:w | r:w", T: "r:w | r:w | r:w | r:w | r:w", B: "r:w | r:w | r:w | r:w | r:w" }, { tempo: 60 });
    expect(byRule(validateScore(long).diagnostics, "escrita.respiracao")).toHaveLength(1);
    const breath = satb({ S: "C5:w | C5:w | C5:h r:h | C5:w | C5:w", A: "r:w | r:w | r:w | r:w | r:w", T: "r:w | r:w | r:w | r:w | r:w", B: "r:w | r:w | r:w | r:w | r:w" }, { tempo: 60 });
    expect(byRule(validateScore(breath).diagnostics, "escrita.respiracao")).toEqual([]);
  });
  it("oitavas nas vozes extremas em tempos fortes separados por nota de passagem", () => {
    const s = satb({ S: "C5:q D5:q E5:h", A: "G4:h G4:h", T: "E4:h C4:h", B: "C3:h E3:h" });
    expect(byRule(validateScore(s).diagnostics, "conducao.paralelas-em-tempos-fortes")).toHaveLength(1);
  });
});

describe("referências continuam limpas com o motor ampliado", () => {
  it("corais de exemplo SATB e TTBB sem diagnósticos", () => {
    expect(validateScore(CHORALE_SATB_C).diagnostics).toEqual([]);
    expect(validateScore(CHORALE_TTBB_G).diagnostics).toEqual([]);
  });
  it("análise harmônica marca dominante secundária", () => {
    const s = satb({ S: "E5:h F#5:h | G5:w", A: "C5:h C5:h | B4:w", T: "G4:h A4:h | G4:w", B: "C3:h D3:h | G2:w" }, { key: "C" });
    expect(analyzeHarmony(s).map((h) => h.roman)).toEqual(["I", "V7/V", "V"]);
  });
});
