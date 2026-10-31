import type { ChallengeBlock, Lesson } from "@/content/curriculum/types";
import { LESSONS } from "@/content/curriculum/curriculum";
import type { VoiceId } from "@/domain/music/formations";
import { type Score, voiceTimeline } from "@/domain/music/score";
import { type ProductionTask, checkTask } from "@/domain/production/task";

/**
 * Tarefas de produção das aulas: cada exercício independente com partitura de partida e
 * solução vira uma tarefa que o aluno resolve no laboratório e o motor confere.
 * As vozes a preservar e a escrever saem da comparação entre a partida e a solução.
 */
const notes = (s: Score, v: VoiceId) => {
  const p = s.parts.find((x) => x.voice === v);
  return p ? voiceTimeline(p, s.timeSignature).filter((t) => t.event.kind === "note").map((t) => `${t.onset}:${t.event.kind === "note" ? `${t.event.pitch.step}${t.event.pitch.alter}${t.event.pitch.octave}` : ""}`) : [];
};

const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);

const CADENCE = /cad[êe]ncia (aut[êe]ntica|perfeita)|termin[eao][^.]*\(V\)[^.]*\(I\)/i;

function taskFromChallenge(lesson: Lesson, block: ChallengeBlock): ProductionTask | null {
  const start = block.start;
  const solution = block.solution.score;
  if (!start || !solution) return null;
  const voices = start.parts.map((p) => p.voice);
  const keepVoices: VoiceId[] = [];
  const writeVoices: VoiceId[] = [];
  for (const v of voices) {
    const given = notes(start, v);
    const solved = new Set(notes(solution, v));
    const unchanged = given.length > 0 && given.every((n) => solved.has(n)) && notes(solution, v).length === given.length;
    if (given.length > 0 && (unchanged || !block.revises)) keepVoices.push(v);
    else if (notes(solution, v).length > 0) writeVoices.push(v);
  }
  // Só vira tarefa corrigida o que o motor consegue conferir: mesma formação e uma partida que ainda não está pronta.
  if (start.formation !== solution.formation || writeVoices.length === 0) return null;
  const measures = (s: Score, v: VoiceId) => {
    const p = s.parts.find((x) => x.voice === v);
    return p ? [...new Set(voiceTimeline(p, s.timeSignature).filter((t) => t.event.kind === "note").map((t) => t.measure))] : [];
  };
  const writeMeasures = Object.fromEntries(writeVoices.map((v) => [v, measures(solution, v)]));
  return {
    id: `${lesson.id}:${slug(block.title)}`,
    writeMeasures,
    kind: "producao",
    lessonId: lesson.id,
    competency: lesson.competencies[0] ?? "arranjo",
    title: block.title,
    prompt: block.task,
    start,
    style: start.metadata.style,
    keepVoices,
    writeVoices,
    requireCadence: CADENCE.test([block.task, ...block.constraints].join(" ")),
    constraints: block.constraints,
    hints: block.hints,
    demo: { label: "Rever a aula", href: `/licoes/${lesson.id}` },
    solution: { score: solution, commentary: block.solution.commentary },
  };
}

export const LESSON_TASKS: readonly ProductionTask[] = LESSONS.flatMap((l) =>
  l.sections
    .flatMap((s) => s.blocks)
    .flatMap((b) => (b.type === "challenge" ? [taskFromChallenge(l, b)].filter((t): t is ProductionTask => t !== null) : []))
    // A partida não pode já passar na conferência (exercícios de prosódia ou de cor que o motor não mede ficam como autoconferência).
    .filter((t) => !checkTask(t, t.start).passed),
);

export function getLessonTask(id: string): ProductionTask | undefined {
  return LESSON_TASKS.find((t) => t.id === id);
}

/** Id da tarefa de um exercício independente (ou undefined se ele não tem partitura). */
export function taskIdFor(lessonId: string, block: ChallengeBlock): string | undefined {
  const id = `${lessonId}:${slug(block.title)}`;
  return LESSON_TASKS.some((t) => t.id === id) ? id : undefined;
}
