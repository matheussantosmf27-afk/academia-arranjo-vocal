import type { VoiceId } from "../music/formations";
import type { TimedEvent } from "../music/score";
import type { ValidationContext } from "./context";
import type { Diagnostic, DiagnosticCategory, RuleMeta, Severity } from "./types";

export interface Rule {
  readonly meta: RuleMeta;
  check(ctx: ValidationContext, emit: Emitter): void;
}

export interface EmitInput {
  readonly onset: number;
  readonly measure: number;
  readonly beat: number;
  readonly voices: readonly VoiceId[];
  readonly events: readonly (TimedEvent | null | undefined)[];
  readonly message: string;
  readonly explanation: string;
  readonly suggestions: readonly string[];
  readonly exceptions?: string;
  readonly evidence: Readonly<Record<string, string | number | boolean>>;
  /** Ajustes pontuais quando uma exceção reconhecida se aplica. */
  readonly severity?: Severity;
  readonly category?: DiagnosticCategory;
  /** Sufixo para distinguir diagnósticos da mesma regra no mesmo ponto. */
  readonly key?: string;
}

export type Emitter = (input: EmitInput) => void;

export function createEmitter(rule: Rule, ctx: ValidationContext, out: Diagnostic[]): Emitter {
  const styleSeverity = rule.meta.severityByStyle[ctx.config.style];
  return (input) => {
    if (styleSeverity === "off") return;
    const eventIds = input.events.filter((e): e is TimedEvent => !!e).map((e) => e.event.id);
    const id = `${rule.meta.id}@${input.onset}:${input.voices.join("-")}${input.key ? `:${input.key}` : ""}`;
    out.push({
      id,
      ruleId: rule.meta.id,
      title: rule.meta.name,
      category: input.category ?? rule.meta.category,
      severity: input.severity ?? styleSeverity,
      location: {
        measure: input.measure,
        beat: input.beat,
        onset: input.onset,
        voices: input.voices,
        eventIds: [...new Set(eventIds)],
      },
      message: input.message,
      explanation: input.explanation,
      suggestions: input.suggestions,
      ...(input.exceptions ? { exceptions: input.exceptions } : {}),
      evidence: input.evidence,
    });
  };
}

export const ALL_STYLES = (s: Severity): RuleMeta["severityByStyle"] => ({
  "coral-tradicional": s,
  "coral-contemporaneo": s,
  "popular-a-cappella": s,
});
