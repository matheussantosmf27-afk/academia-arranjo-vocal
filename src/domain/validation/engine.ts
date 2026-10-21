import { describeChordPt, harmonicFunction, romanNumeral } from "../music/chord";
import type { Score } from "../music/score";
import { scaleDegree } from "../music/key";
import { buildContext } from "./context";
import { type Rule, createEmitter } from "./rule";
import { crossingRule, lowIntervalRule, overlapRule, spacingRule } from "./rules/spacing";
import {
  finalChordRule,
  leadingToneDoublingRule,
  leadingToneResolutionRule,
  nonTertianStrongBeatRule,
  seventhResolutionRule,
} from "./rules/harmony";
import { augmentedMelodicRule, consecutiveLeapsRule, largeLeapRule, leapRecoveryRule } from "./rules/melodic";
import { contraryPerfectRule, directOuterRule, parallelPerfectRule, unequalFifthsRule } from "./rules/parallels";
import { absoluteRangeRule, tessituraRule } from "./rules/range";
import { barlineCrossingRule, measureLengthRule } from "./rules/structure";
import { type Diagnostic, type DiagnosticCategory, SEVERITY_ORDER, type Severity, type ValidationConfig } from "./types";

/** Versão do motor: muda quando o comportamento das regras muda (rastreabilidade de avaliações). */
export const ENGINE_VERSION = "0.1.0";

export const RULES: readonly Rule[] = [
  measureLengthRule,
  barlineCrossingRule,
  absoluteRangeRule,
  tessituraRule,
  crossingRule,
  overlapRule,
  spacingRule,
  lowIntervalRule,
  parallelPerfectRule,
  contraryPerfectRule,
  unequalFifthsRule,
  directOuterRule,
  augmentedMelodicRule,
  largeLeapRule,
  leapRecoveryRule,
  consecutiveLeapsRule,
  leadingToneDoublingRule,
  leadingToneResolutionRule,
  seventhResolutionRule,
  nonTertianStrongBeatRule,
  finalChordRule,
];

export interface ValidationReport {
  readonly engineVersion: string;
  readonly config: ValidationConfig;
  readonly diagnostics: readonly Diagnostic[];
  readonly countsBySeverity: Readonly<Record<Severity, number>>;
  readonly countsByCategory: Readonly<Record<DiagnosticCategory, number>>;
  /** Regras que lançaram exceção (bug no motor): reportadas, nunca silenciadas. */
  readonly ruleFailures: readonly { ruleId: string; message: string }[];
}

export function validateScore(score: Score, config?: Partial<ValidationConfig>): ValidationReport {
  const cfg: ValidationConfig = { style: config?.style ?? score.metadata.style, ...config };
  const ctx = buildContext(score, cfg);
  const diagnostics: Diagnostic[] = [];
  const ruleFailures: { ruleId: string; message: string }[] = [];
  const disabled = new Set(cfg.disabledRules ?? []);
  for (const rule of RULES) {
    if (disabled.has(rule.meta.id)) continue;
    if (rule.meta.formations && !rule.meta.formations.includes(score.formation)) continue;
    try {
      rule.check(ctx, createEmitter(rule, ctx, diagnostics));
    } catch (err) {
      ruleFailures.push({ ruleId: rule.meta.id, message: err instanceof Error ? err.message : String(err) });
    }
  }
  const unique = new Map<string, Diagnostic>();
  for (const d of diagnostics) if (!unique.has(d.id)) unique.set(d.id, d);
  const sorted = [...unique.values()].sort(
    (a, b) =>
      a.location.onset - b.location.onset ||
      SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity] ||
      a.ruleId.localeCompare(b.ruleId) ||
      a.id.localeCompare(b.id),
  );
  const countsBySeverity: Record<Severity, number> = { erro: 0, alerta: 0, sugestao: 0, info: 0 };
  const countsByCategory: Record<DiagnosticCategory, number> = {
    "erro-objetivo": 0,
    "convencao-estilistica": 0,
    recomendacao: 0,
    "escolha-estetica": 0,
  };
  for (const d of sorted) {
    countsBySeverity[d.severity] += 1;
    countsByCategory[d.category] += 1;
  }
  return { engineVersion: ENGINE_VERSION, config: cfg, diagnostics: sorted, countsBySeverity, countsByCategory, ruleFailures };
}

export interface HarmonicLabel {
  readonly onset: number;
  readonly measure: number;
  readonly beat: number;
  readonly roman: string | null;
  readonly description: string | null;
  readonly func: "T" | "S" | "D" | null;
}

/** Análise harmônica por sonoridade (cifragem romana), para exibir sob a partitura. */
export function analyzeHarmony(score: Score): HarmonicLabel[] {
  const ctx = buildContext(score, { style: score.metadata.style });
  return ctx.sonorities.map((s) => {
    const chord = s.chord;
    return {
      onset: s.sonority.onset,
      measure: s.sonority.measure,
      beat: s.sonority.beat,
      roman: chord ? romanNumeral(chord, score.key) : null,
      description: chord ? describeChordPt(chord) : null,
      func: chord ? harmonicFunction(scaleDegree(chord.root, score.key).degree) : null,
    };
  });
}

export function ruleCatalog() {
  return RULES.map((r) => r.meta);
}
