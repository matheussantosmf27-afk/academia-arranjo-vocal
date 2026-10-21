import type { VoiceId } from "@/domain/music/formations";
import type { Score } from "@/domain/music/score";
import type { ExerciseSetSpec } from "@/domain/exercises/types";

export type CompetencyId =
  | "leitura-vocal"
  | "intervalos"
  | "acordes"
  | "harmonia-funcional"
  | "conducao-de-vozes"
  | "escrita-satb"
  | "escrita-ttbb"
  | "percepcao"
  | "contraponto"
  | "texto-e-prosodia"
  | "arranjo";

export type ContentBlock =
  | { readonly type: "paragraph"; readonly text: string }
  | { readonly type: "list"; readonly items: readonly string[]; readonly ordered?: boolean }
  | {
      readonly type: "callout";
      readonly tone: "satb" | "ttbb" | "atencao" | "dica";
      readonly title: string;
      readonly text: string;
    }
  | { readonly type: "table"; readonly caption: string; readonly headers: readonly string[]; readonly rows: readonly (readonly string[])[] }
  | {
      readonly type: "example";
      readonly score: Score;
      readonly verdict: "correto" | "incorreto" | "observacao";
      readonly caption: string;
      readonly commentary: string;
    }
  | {
      readonly type: "listening";
      readonly title: string;
      readonly score: Score;
      readonly instructions: readonly string[];
      /** Combinações de vozes sugeridas para escuta (vazio = todas). */
      readonly focus?: readonly (readonly VoiceId[])[];
    };

export interface LessonSection {
  readonly title: string;
  readonly blocks: readonly ContentBlock[];
}

export interface Lesson {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly levelId: string;
  readonly unitId: string;
  readonly status: "disponivel" | "em-preparacao";
  readonly prerequisites: readonly string[];
  readonly estimatedMinutes: number;
  readonly competencies: readonly CompetencyId[];
  /** Objetivos mensuráveis ("ao final, o aluno será capaz de…"). */
  readonly objectives: readonly string[];
  readonly sections: readonly LessonSection[];
  readonly exercises?: ExerciseSetSpec;
  /** Critério de domínio exibido ao aluno; aplicado por `evaluateMastery`. */
  readonly masteryDescription?: string;
  readonly application?: { readonly title: string; readonly steps: readonly string[] };
  /** Tópicos previstos para lições ainda em preparação. */
  readonly plannedTopics?: readonly string[];
}

export interface Unit {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly lessonIds: readonly string[];
  readonly project?: { readonly title: string; readonly description: string };
}

export interface Level {
  readonly id: string;
  readonly number: number;
  readonly title: string;
  readonly description: string;
  readonly units: readonly Unit[];
  readonly finalProject: { readonly title: string; readonly description: string };
}
