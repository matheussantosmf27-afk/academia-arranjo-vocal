import type { Clef } from "../music/formations";
import type { Pitch } from "../music/pitch";
import type { Score } from "../music/score";

export interface ChoiceOption {
  readonly id: string;
  readonly label: string;
}

/** Item de exercício: múltipla escolha com resposta comentada. */
export interface ChoiceItem {
  readonly id: string;
  readonly kind: "choice";
  readonly skill: string;
  readonly prompt: string;
  readonly options: readonly ChoiceOption[];
  readonly correctOptionId: string;
  /** Resposta comentada (exibida após responder). */
  readonly explanation: string;
  /** Comentários específicos para alternativas erradas comuns. */
  readonly optionFeedback?: Readonly<Record<string, string>>;
  /** Partitura de quatro vozes para leitura (opcional). */
  readonly notation?: Score;
  /** Pauta única simples (intervalos, notas isoladas), com alturas SONORAS; cada elemento é um ataque (nota ou acorde). */
  readonly staff?: { readonly clef: Clef; readonly attacks: readonly (readonly Pitch[])[] };
  /** Alturas para escuta: tocadas em sequência (melódico) ou juntas (harmônico). */
  readonly audio?: { readonly pitches: readonly Pitch[]; readonly mode: "melodico" | "harmonico" };
  /** Itens auditivos ocultam a notação até a resposta. */
  readonly earOnly?: boolean;
}

export type ExerciseItem = ChoiceItem;

export type GeneratorSpec =
  | { readonly type: "interval-identification"; readonly count: number; readonly earOnly?: boolean; readonly maxNumber?: number }
  | { readonly type: "chord-identification"; readonly count: number }
  | { readonly type: "range-check"; readonly count: number }
  | { readonly type: "key-signature"; readonly count: number }
  | { readonly type: "scale-degree"; readonly count: number }
  | { readonly type: "seventh-identification"; readonly count: number }
  | { readonly type: "function-identification"; readonly count: number }
  | { readonly type: "motion-type"; readonly count: number }
  | { readonly type: "voice-leading-error"; readonly count: number; readonly ruleIds?: readonly string[] }
  | { readonly type: "cadence-identification"; readonly count: number }
  | { readonly type: "nct-identification"; readonly count: number }
  /** Baixo dado / canto dado: escolher a realização das outras vozes. */
  | { readonly type: "realization"; readonly count: number; readonly mode?: "baixo-dado" | "canto-dado" }
  /** Distribuição de um acorde em TTBB: escolher o voicing claro no grave. */
  | { readonly type: "ttbb-voicing"; readonly count: number }
  /** Rearmonização: escolher a harmonia nova que mantém a melodia e passa no motor. */
  | { readonly type: "reharm-choice"; readonly count: number }
  /** Contraponto: classificar o intervalo harmônico entre duas vozes. */
  | { readonly type: "counterpoint-interval"; readonly count: number };

export interface ExerciseSetSpec {
  readonly id: string;
  readonly title: string;
  readonly instructions: string;
  readonly staticItems: readonly ExerciseItem[];
  readonly generators: readonly GeneratorSpec[];
  /** Fração mínima de acertos para domínio (0–1). */
  readonly minScore: number;
  /** Itens que precisam ser acertados obrigatoriamente (conceitos essenciais). */
  readonly requiredItemIds?: readonly string[];
}

export interface AnswerRecord {
  readonly itemId: string;
  readonly skill: string;
  readonly chosenOptionId: string;
  readonly correct: boolean;
}

export interface MasteryResult {
  readonly score: number;
  readonly correct: number;
  readonly total: number;
  readonly passed: boolean;
  readonly missingRequired: readonly string[];
  readonly bySkill: Readonly<Record<string, { correct: number; total: number }>>;
}
