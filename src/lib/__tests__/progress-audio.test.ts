import { describe, expect, it } from "vitest";
import { getLesson } from "@/content/curriculum/curriculum";
import { PPQ } from "@/domain/music/duration";
import { CHORALE_SATB_C } from "@/domain/music/examples";
import { toggleTie } from "@/domain/music/operations";
import { buildPlaybackNotes, ticksToSeconds } from "../audio/schedule";
import { type Attempt, EMPTY_PROGRESS, itemsToReview, lessonStatus, missingPrerequisites, skillSummary } from "../progress/model";

const attempt = (lessonId: string, passed: boolean, finishedAt: string): Attempt => ({
  id: `${lessonId}-${finishedAt}`,
  lessonId,
  exerciseSetId: "x",
  seed: 1,
  startedAt: finishedAt,
  finishedAt,
  answers: [
    { itemId: "a", skill: "intervalos", chosenOptionId: "o1", correct: true },
    { itemId: "b", skill: "intervalos", chosenOptionId: "o2", correct: passed },
  ],
  result: { score: passed ? 1 : 0.5, correct: passed ? 2 : 1, total: 2, passed, missingRequired: [], bySkill: { intervalos: { correct: passed ? 2 : 1, total: 2 } } },
});

describe("progresso e domínio", () => {
  const vozes = getLesson("vozes-claves-extensoes")!;
  const intervalos = getLesson("intervalos")!;
  it("lição com pré-requisito não dominado fica bloqueada", () => {
    expect(lessonStatus(EMPTY_PROGRESS, vozes)).toBe("disponivel");
    expect(lessonStatus(EMPTY_PROGRESS, intervalos)).toBe("bloqueada");
    expect(missingPrerequisites(EMPTY_PROGRESS, intervalos)).toEqual(["vozes-claves-extensoes"]);
  });
  it("tentativa sem domínio não libera a próxima lição", () => {
    const s = { ...EMPTY_PROGRESS, attempts: [attempt("vozes-claves-extensoes", false, "2026-01-01")] };
    expect(lessonStatus(s, vozes)).toBe("em-andamento");
    expect(lessonStatus(s, intervalos)).toBe("bloqueada");
    expect(itemsToReview(s)).toEqual([{ lessonId: "vozes-claves-extensoes", itemId: "b", skill: "intervalos" }]);
  });
  it("domínio libera a próxima lição; perfil usa a melhor tentativa", () => {
    const s = { ...EMPTY_PROGRESS, attempts: [attempt("vozes-claves-extensoes", false, "2026-01-01"), attempt("vozes-claves-extensoes", true, "2026-01-02")] };
    expect(lessonStatus(s, vozes)).toBe("dominada");
    expect(lessonStatus(s, intervalos)).toBe("disponivel");
    expect(skillSummary(s)).toEqual({ intervalos: { correct: 2, total: 2 } });
    expect(itemsToReview(s)).toEqual([]);
  });
  it("lições em preparação nunca aparecem como disponíveis", () => {
    expect(lessonStatus(EMPTY_PROGRESS, getLesson("tetrades")!)).toBe("em-preparacao");
  });
});

describe("agendamento de reprodução", () => {
  it("toca apenas as vozes selecionadas", () => {
    const notes = buildPlaybackNotes(CHORALE_SATB_C, new Set(["S", "B"]));
    expect(new Set(notes.map((n) => n.voice))).toEqual(new Set(["S", "B"]));
    expect(notes.filter((n) => n.voice === "S")).toHaveLength(13);
  });
  it("funde notas ligadas de mesma altura", () => {
    const tied = toggleTie(CHORALE_SATB_C, "S-3"); // G4 ligado ao G4 seguinte
    const s = buildPlaybackNotes(tied, new Set(["S"]));
    expect(s).toHaveLength(12);
    expect(s[2]).toMatchObject({ midi: 67, onset: 2 * PPQ, end: 4 * PPQ, eventIds: ["S-3", "S-4"] });
  });
  it("converte ticks em segundos pelo andamento", () => {
    expect(ticksToSeconds(PPQ, 60)).toBe(1);
    expect(ticksToSeconds(PPQ * 4, 120)).toBe(2);
  });
});
