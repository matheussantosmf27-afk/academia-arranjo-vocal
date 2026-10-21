import type { FormationId, PitchRange, VoiceId } from "../music/formations";
import type { StyleProfileId } from "../music/score";

/**
 * Natureza do diagnóstico — o QUE ele é, independentemente da gravidade:
 * - erro-objetivo: problema verificável sem juízo estético (fora da extensão
 *   configurada, compasso com duração errada, nota atravessando a barra).
 * - convencao-estilistica: norma de um estilo/época (ex.: quintas paralelas no
 *   coral tradicional). Pode ser uma escolha legítima em outro estilo.
 * - recomendacao: prática que melhora cantabilidade, equilíbrio ou clareza.
 * - escolha-estetica: observação neutra sobre uma decisão que é do arranjador.
 */
export type DiagnosticCategory = "erro-objetivo" | "convencao-estilistica" | "recomendacao" | "escolha-estetica";

/** Gravidade no contexto do estilo escolhido. */
export type Severity = "erro" | "alerta" | "sugestao" | "info";

export interface DiagnosticLocation {
  /** Compasso 1-based. */
  readonly measure: number;
  /** Tempo 1-based (pode ser fracionário: 2.5 = contratempo do 2º tempo). */
  readonly beat: number;
  /** Onset absoluto em ticks — chave de ordenação e reprodutibilidade. */
  readonly onset: number;
  readonly voices: readonly VoiceId[];
  readonly eventIds: readonly string[];
}

export interface Diagnostic {
  /** Identificador determinístico: mesma partitura + mesma configuração ⇒ mesmo ID. */
  readonly id: string;
  readonly ruleId: string;
  readonly title: string;
  readonly category: DiagnosticCategory;
  readonly severity: Severity;
  readonly location: DiagnosticLocation;
  /** O que foi encontrado, com notas e intervalos concretos. */
  readonly message: string;
  /** A regra e por que ela existe. */
  readonly explanation: string;
  readonly suggestions: readonly string[];
  /** Quando isso pode ser aceitável (exceções musicais pertinentes). */
  readonly exceptions?: string;
  /** Evidências objetivas usadas (para auditoria e para o tutor). */
  readonly evidence: Readonly<Record<string, string | number | boolean>>;
}

export interface VoiceRangeOverride {
  readonly range?: PitchRange;
  readonly tessitura?: PitchRange;
}

export interface ValidationConfig {
  readonly style: StyleProfileId;
  readonly rangeOverrides?: Partial<Record<VoiceId, VoiceRangeOverride>>;
  readonly disabledRules?: readonly string[];
}

export type SeverityByStyle = Readonly<Record<StyleProfileId, Severity | "off">>;

export interface RuleMeta {
  readonly id: string;
  readonly name: string;
  readonly category: DiagnosticCategory;
  readonly severityByStyle: SeverityByStyle;
  /** Formações às quais a regra se aplica (padrão: todas). */
  readonly formations?: readonly FormationId[];
  readonly summary: string;
}

export const STYLE_PROFILES: Readonly<Record<StyleProfileId, { name: string; description: string }>> = {
  "coral-tradicional": {
    name: "Coral tradicional (prática comum)",
    description:
      "Normas da escrita coral tonal dos séculos XVIII–XIX, como nos corais de Bach e nos manuais de harmonia. Paralelismos de consonâncias perfeitas e duplicação da sensível são evitados com rigor.",
  },
  "coral-contemporaneo": {
    name: "Coral contemporâneo",
    description:
      "Escrita coral dos séculos XX–XXI: as normas tradicionais servem de referência, mas paralelismos, cruzamentos e acordes com notas acrescentadas podem ser recursos expressivos.",
  },
  "popular-a-cappella": {
    name: "Popular a cappella",
    description:
      "Arranjos vocais populares (MPB, gospel, barbershop, pop). Paralelismos e cruzamentos são frequentes e intencionais; o foco está em cantabilidade, equilíbrio e clareza harmônica.",
  },
};

export const SEVERITY_ORDER: Readonly<Record<Severity, number>> = { erro: 0, alerta: 1, sugestao: 2, info: 3 };

export const SEVERITY_PT: Readonly<Record<Severity, string>> = {
  erro: "Erro",
  alerta: "Alerta",
  sugestao: "Sugestão",
  info: "Observação",
};

export const CATEGORY_PT: Readonly<Record<DiagnosticCategory, string>> = {
  "erro-objetivo": "Erro objetivo",
  "convencao-estilistica": "Convenção estilística",
  recomendacao: "Recomendação",
  "escolha-estetica": "Escolha estética",
};
