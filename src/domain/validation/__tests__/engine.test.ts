import { describe, expect, it } from "vitest";
import { CHORALE_SATB_C, CHORALE_TTBB_G, PARALLELS_FIXED_SATB, PARALLELS_SATB } from "../../music/examples";
import { parsePitch } from "../../music/pitch";
import type { StyleProfileId } from "../../music/score";
import { type ScoreTextSpec, scoreFromText } from "../../music/text-notation";
import { RULES, validateScore } from "../engine";
import type { Diagnostic } from "../types";

function satb(voices: ScoreTextSpec["voices"], key = "C", style: StyleProfileId = "coral-tradicional") {
  return scoreFromText({ id: "t", title: "teste", formation: "SATB", key, time: "4/4", voices, style });
}
function ttbb(voices: ScoreTextSpec["voices"], key = "C") {
  return scoreFromText({ id: "t", title: "teste", formation: "TTBB", key, time: "4/4", voices });
}
const byRule = (ds: readonly Diagnostic[], ruleId: string) => ds.filter((d) => d.ruleId === ruleId);

describe("exemplos de referência", () => {
  it("o coral SATB correto não gera diagnósticos", () => {
    expect(validateScore(CHORALE_SATB_C).diagnostics).toEqual([]);
  });
  it("a cadência TTBB correta não gera diagnósticos", () => {
    expect(validateScore(CHORALE_TTBB_G).diagnostics).toEqual([]);
  });
  it("nenhuma regra falha (lança exceção) nos exemplos", () => {
    for (const s of [CHORALE_SATB_C, CHORALE_TTBB_G, PARALLELS_SATB]) expect(validateScore(s).ruleFailures).toEqual([]);
  });
  it("todas as regras têm ID único e severidade para cada estilo", () => {
    const idsSet = new Set(RULES.map((r) => r.meta.id));
    expect(idsSet.size).toBe(RULES.length);
    for (const r of RULES) expect(Object.keys(r.meta.severityByStyle).sort()).toEqual(["coral-contemporaneo", "coral-tradicional", "popular-a-cappella"]);
  });
});

describe("quintas e oitavas paralelas", () => {
  it("detecta 5ªs (inclusive compostas) e 8ªs paralelas com localização exata", () => {
    const r = validateScore(PARALLELS_SATB);
    const par = byRule(r.diagnostics, "conducao.paralelas");
    expect(par.map((d) => d.location.voices.join("-")).sort()).toEqual(["S-B", "S-T", "T-B"]);
    for (const d of par) {
      expect(d.location).toMatchObject({ measure: 1, beat: 3 });
      expect(d.severity).toBe("erro");
      expect(d.category).toBe("convencao-estilistica");
      expect(d.suggestions.length).toBeGreaterThan(0);
      expect(d.exceptions).toBeTruthy();
    }
    expect(par.find((d) => d.location.voices.join("-") === "S-B")!.location.eventIds).toEqual(["S-2", "B-2"]);
  });
  it("a versão corrigida não tem paralelas", () => {
    expect(byRule(validateScore(PARALLELS_FIXED_SATB).diagnostics, "conducao.paralelas")).toEqual([]);
  });
  it("a gravidade depende do estilo, mas o achado continua registrado", () => {
    const pop = validateScore(PARALLELS_SATB, { style: "popular-a-cappella" });
    const par = byRule(pop.diagnostics, "conducao.paralelas");
    expect(par).toHaveLength(3);
    expect(par.every((d) => d.severity === "sugestao")).toBe(true);
    expect(validateScore(PARALLELS_SATB, { style: "coral-contemporaneo" }).diagnostics.find((d) => d.ruleId === "conducao.paralelas")!.severity).toBe("alerta");
  });
  it("5ª justa → 5ª diminuta não é paralela; 5ª diminuta → 5ª justa com o baixo é apontada", () => {
    const ok = satb({ S: "G4:h F4:h", A: "D4:h D4:h", T: "B3:h B3:h", B: "C3:h B2:h" });
    expect(byRule(validateScore(ok).diagnostics, "conducao.paralelas")).toEqual([]);
    const unequal = satb({ S: "F4:h G4:h", A: "D4:h D4:h", T: "G3:h G3:h", B: "B2:h C3:h" });
    expect(byRule(validateScore(unequal).diagnostics, "conducao.quintas-desiguais")).toHaveLength(1);
  });
  it("notas repetidas (sem movimento) não contam como paralelas", () => {
    const s = satb({ S: "G4:h G4:h", A: "E4:h E4:h", T: "C4:h C4:h", B: "C3:h C3:h" });
    expect(byRule(validateScore(s).diagnostics, "conducao.paralelas")).toEqual([]);
  });
  it("oitavas por movimento contrário: alerta entre vozes; observação na cadência final das extremas", () => {
    const inner = satb({ S: "E5:h D5:h", A: "G4:h G4:h", T: "C4:h G4:h", B: "C3:h G2:h" });
    const d = byRule(validateScore(inner).diagnostics, "conducao.paralelas-por-movimento-contrario");
    expect(d).toHaveLength(1);
    expect(d[0]!.location.voices).toEqual(["T", "B"]);
    expect(d[0]!.severity).toBe("alerta");
    const cadence = satb({ S: "G4:h C5:h", A: "D4:h E4:h", T: "B3:h G3:h", B: "G3:h C3:h" });
    const c = byRule(validateScore(cadence).diagnostics, "conducao.paralelas-por-movimento-contrario").find((x) => x.location.voices.join() === "S,B");
    expect(c).toMatchObject({ severity: "info", category: "escolha-estetica" });
  });
});

describe("quintas/oitavas diretas nas vozes extremas", () => {
  it("aponta quando o soprano chega por salto", () => {
    const s = satb({ S: "E5:h G5:h", A: "G4:h B4:h", T: "C4:h D4:h", B: "C3:h G3:h" });
    expect(byRule(validateScore(s).diagnostics, "conducao.quintas-oitavas-diretas")).toHaveLength(1);
  });
  it("exceção: soprano por grau conjunto", () => {
    const s = satb({ S: "F5:h G5:h", A: "A4:h B4:h", T: "D4:h D4:h", B: "D3:h G3:h" });
    expect(byRule(validateScore(s).diagnostics, "conducao.quintas-oitavas-diretas")).toEqual([]);
  });
});

describe("cruzamento, sobreposição e espaçamento", () => {
  it("detecta cruzamento e reduz a gravidade no estilo popular", () => {
    const s = satb({ S: "E4:w", A: "G4:w", T: "C4:w", B: "C3:w" });
    expect(byRule(validateScore(s).diagnostics, "vozes.cruzamento")[0]).toMatchObject({ severity: "alerta", location: { voices: ["S", "A"] } });
    expect(byRule(validateScore(s, { style: "popular-a-cappella" }).diagnostics, "vozes.cruzamento")[0]!.severity).toBe("info");
  });
  it("detecta sobreposição", () => {
    const s = satb({ S: "E4:h C5:h", A: "C4:h G4:h", T: "G3:h F4:h", B: "C3:h F3:h" });
    const d = byRule(validateScore(s).diagnostics, "vozes.sobreposicao");
    expect(d.some((x) => x.location.voices.join() === "A,T")).toBe(true);
  });
  it("aponta mais de uma oitava entre soprano e contralto, mas aceita 12ª entre tenor e baixo", () => {
    const s = satb({ S: "E5:w", A: "C4:w", T: "G4:w", B: "C3:w" });
    const d = byRule(validateScore(s, { disabledRules: ["vozes.cruzamento"] }).diagnostics, "vozes.espacamento");
    expect(d.map((x) => x.location.voices.join("-"))).toEqual(["S-A"]);
  });
  it("TTBB: terça maior no grave abaixo do limite recomendado", () => {
    const s = ttbb({ T1: "G3:w", T2: "D3:w", B1: "B2:w", B2: "G2:w" }, "G");
    const d = byRule(validateScore(s).diagnostics, "vozes.limite-grave-de-intervalo");
    // B1–B2: 3ª maior sobre G2 (limite B♭2); T2–B1: 3ª menor sobre B2 (limite C3).
    expect(d.map((x) => x.location.voices.join("-")).sort()).toEqual(["B1-B2", "T2-B1"]);
    expect(d.every((x) => x.category === "recomendacao")).toBe(true);
  });
});

describe("extensão e tessitura", () => {
  it("nota fora da extensão é erro objetivo; fora da tessitura é recomendação", () => {
    const s = satb({ S: "A5:h F5:h", A: "C5:h C5:h", T: "F4:h A3:h", B: "F3:h F3:h" }, "F");
    const r = validateScore(s);
    expect(byRule(r.diagnostics, "extensao.fora-da-extensao")[0]).toMatchObject({ category: "erro-objetivo", severity: "erro", location: { eventIds: ["S-1"] } });
    expect(byRule(r.diagnostics, "extensao.fora-da-tessitura").map((d) => d.location.eventIds)).toContainEqual(["S-2"]);
  });
  it("respeita extensões configuradas pelo usuário", () => {
    const s = satb({ S: "A5:w", A: "C5:w", T: "F4:w", B: "F3:w" }, "F");
    const r = validateScore(s, { style: "coral-tradicional", rangeOverrides: { S: { range: { low: parsePitch("C4"), high: parsePitch("C6") } } } });
    expect(byRule(r.diagnostics, "extensao.fora-da-extensao")).toEqual([]);
  });
});

describe("linhas melódicas", () => {
  it("2ª aumentada em menor harmônico", () => {
    const s = satb({ S: "r:h r:h", A: "F4:h G#4:h", T: "r:h r:h", B: "r:h r:h" }, "Am");
    expect(byRule(validateScore(s).diagnostics, "melodia.intervalo-aumentado")).toHaveLength(1);
  });
  it("salto maior que a oitava e 7ª", () => {
    const s = satb({ S: "C4:q D5:q C5:q D4:q", A: "r:w", T: "r:w", B: "r:w" });
    const d = byRule(validateScore(s).diagnostics, "melodia.salto-grande");
    expect(d.map((x) => x.severity)).toEqual(["alerta", "sugestao"]);
  });
  it("salto de 6ª sem compensação; com compensação não aponta", () => {
    const bad = satb({ S: "C4:q A4:q B4:q C5:q", A: "r:w", T: "r:w", B: "r:w" });
    expect(byRule(validateScore(bad).diagnostics, "melodia.compensacao-de-salto")).toHaveLength(1);
    const good = satb({ S: "C4:q A4:q G4:q F4:q", A: "r:w", T: "r:w", B: "r:w" });
    expect(byRule(validateScore(good).diagnostics, "melodia.compensacao-de-salto")).toEqual([]);
  });
  it("saltos consecutivos que delineiam 7ª; arpejo consonante não aponta", () => {
    const bad = satb({ S: "C4:q E4:q B4:q B4:q", A: "r:w", T: "r:w", B: "r:w" });
    expect(byRule(validateScore(bad).diagnostics, "melodia.saltos-consecutivos")).toHaveLength(1);
    const arp = satb({ S: "C4:q E4:q G4:q G4:q", A: "r:w", T: "r:w", B: "r:w" });
    expect(byRule(validateScore(arp).diagnostics, "melodia.saltos-consecutivos")).toEqual([]);
  });
});

describe("harmonia: sensível e sétima", () => {
  it("sensível dobrada no V", () => {
    const s = satb({ S: "B4:w", A: "G4:w", T: "B3:w", B: "G2:w" });
    const d = byRule(validateScore(s).diagnostics, "harmonia.sensivel-dobrada");
    expect(d).toHaveLength(1);
    expect(d[0]!.location.voices).toEqual(["S", "T"]);
  });
  it("sensível do soprano que não resolve é alerta", () => {
    const s = satb({ S: "B4:h G4:h", A: "G4:h E4:h", T: "D4:h C4:h", B: "G3:h C3:h" });
    expect(byRule(validateScore(s).diagnostics, "harmonia.resolucao-da-sensivel")[0]).toMatchObject({ severity: "alerta", location: { voices: ["S"] } });
  });
  it("exceção: sensível frustrada numa voz interna", () => {
    const s = satb({ S: "D5:h C5:h", A: "B4:h G4:h", T: "G3:h E3:h", B: "G2:h C3:h" });
    const d = byRule(validateScore(s).diagnostics, "harmonia.resolucao-da-sensivel");
    expect(d).toHaveLength(1);
    expect(d[0]).toMatchObject({ severity: "info", category: "escolha-estetica", location: { voices: ["A"] } });
    expect(d[0]!.exceptions).toMatch(/frustrada/);
  });
  it("sétima que sobe é apontada; exceção V⁴₃ → I⁶", () => {
    const bad = satb({ S: "F5:h G5:h", A: "B4:h C5:h", T: "D4:h E4:h", B: "G3:h C3:h" });
    expect(byRule(validateScore(bad).diagnostics, "harmonia.resolucao-da-setima")[0]).toMatchObject({ severity: "alerta" });
    const v43 = satb({ S: "B4:h C5:h", A: "F4:h G4:h", T: "G3:h C4:h", B: "D3:h E3:h" });
    expect(byRule(validateScore(v43).diagnostics, "harmonia.resolucao-da-setima")[0]).toMatchObject({ severity: "info", category: "escolha-estetica" });
  });
  it("sonoridade não terciana no tempo forte é observação, não erro", () => {
    const s = satb({ S: "D5:w", A: "C5:w", T: "G4:w", B: "C3:w" });
    expect(byRule(validateScore(s).diagnostics, "harmonia.sonoridade-nao-terciana")[0]).toMatchObject({ severity: "info", category: "recomendacao" });
  });
});

describe("estrutura", () => {
  it("voz incompleta e figura atravessando a barra", () => {
    const s = satb({ S: "C5:h. C5:h r:h.", A: "E4:w E4:q", T: "G3:w", B: "C3:w r:w" });
    const r = validateScore(s);
    expect(byRule(r.diagnostics, "estrutura.duracao-da-voz").map((d) => d.location.voices[0]).sort()).toEqual(["A", "T"]);
    expect(byRule(r.diagnostics, "estrutura.nota-atravessa-barra").map((d) => d.location.eventIds)).toEqual([["S-2"]]);
  });
});

describe("reprodutibilidade e configuração", () => {
  it("o mesmo arranjo gera exatamente os mesmos diagnósticos", () => {
    const a = validateScore(PARALLELS_SATB);
    const b = validateScore(JSON.parse(JSON.stringify(PARALLELS_SATB)));
    expect(b).toEqual(a);
  });
  it("regras desativadas não são executadas", () => {
    const r = validateScore(PARALLELS_SATB, { disabledRules: ["conducao.paralelas"] });
    expect(byRule(r.diagnostics, "conducao.paralelas")).toEqual([]);
  });
});
