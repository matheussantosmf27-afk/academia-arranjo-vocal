import { z } from "zod";
import { LESSONS } from "@/content/curriculum/curriculum";
import type { Score, StyleProfileId } from "../music/score";
import { keyNamePt } from "../music/key";
import { getFormation } from "../music/formations";
import { STYLE_PROFILES } from "../validation/types";
import { type ValidationReport, analyzeHarmony, validateScore } from "../validation/engine";

/**
 * Fundamentação do tutor de IA. O tutor só pode explicar o que o motor determinístico
 * encontrou: recebe o relatório (IDs, regras, categorias, exceções) e devolve uma resposta
 * estruturada que é validada contra esse relatório antes de chegar ao aluno.
 */
export type TutorMode = "explicar" | "socratico" | "revisar";

export const TUTOR_MODES: Record<TutorMode, string> = {
  explicar: "Explicar os diagnósticos",
  socratico: "Perguntas socráticas (sem dar a resposta)",
  revisar: "Propor revisões",
};

export const tutorResponseSchema = z.object({
  answer: z.string(),
  socraticQuestions: z.array(z.string()),
  revisions: z.array(z.object({ diagnosticId: z.string(), suggestion: z.string() })),
  citedDiagnosticIds: z.array(z.string()),
  suggestedLessonIds: z.array(z.string()),
});
export type TutorResponse = z.infer<typeof tutorResponseSchema>;

export interface TutorEvidence {
  readonly engineVersion: string;
  readonly style: StyleProfileId;
  readonly diagnosticIds: readonly string[];
  readonly harmony: readonly string[];
}

export const TUTOR_SYSTEM_PROMPT = `Você é o tutor da Academia de Arranjo Vocal, para alunos intermediários de arranjo coral (SATB e TTBB). Responda em português do Brasil.

Fontes de verdade:
- O relatório do motor de validação determinístico é a única fonte de diagnósticos. Explique-o; não crie problemas que ele não listou, não negue os que listou e não mude gravidade ou categoria.
- Ao falar de um problema, cite o ID exato do diagnóstico em citedDiagnosticIds. Revisões propostas referem-se a um ID existente.
- Se o aluno perguntar algo que o relatório não cobre (por exemplo, prosódia sem marcação de sílabas ou criatividade), diga claramente que o motor não avalia isso e ofereça critérios para o próprio aluno verificar.
- Diferencie as categorias: "erro objetivo" (verificável), "convenção estilística" (norma de um estilo, não lei universal), "recomendação" e "escolha estética". Nunca apresente uma convenção como regra universal; mencione as exceções que o relatório traz quando forem pertinentes.

Pedagogia:
- No modo "socratico", não entregue a solução: faça de 2 a 4 perguntas que levem o aluno a encontrar o problema e a correção, e deixe "revisions" vazio.
- No modo "explicar", explique a regra e por que ela existe, com as notas concretas do relatório.
- No modo "revisar", proponha correções pequenas e cantáveis, uma por diagnóstico, priorizando erros e alertas.
- Sugira lições apenas da lista fornecida (suggestedLessonIds), quando ajudarem a entender o problema.
- Seja conciso: o aluno está editando a partitura.`;

/** Mensagem do usuário: a pergunta + o contexto fundamentado (JSON). */
export function buildTutorUserContent(score: Score, style: StyleProfileId, question: string, mode: TutorMode): { content: string; evidence: TutorEvidence; report: ValidationReport } {
  const report = validateScore(score, { style });
  const harmony = analyzeHarmony(score).map((h) => `c.${h.measure} t.${h.beat}: ${h.roman ?? "?"}`);
  const context = {
    partitura: {
      titulo: score.title,
      formacao: getFormation(score.formation).name,
      tonalidade: keyNamePt(score.key),
      compasso: `${score.timeSignature.beats}/${score.timeSignature.beatType}`,
      compassos: score.measureCount,
      estilo: `${STYLE_PROFILES[style].name} — ${STYLE_PROFILES[style].description}`,
    },
    cifragem: harmony,
    relatorio: {
      versaoDoMotor: report.engineVersion,
      diagnosticos: report.diagnostics.map((d) => ({
        id: d.id,
        regra: d.ruleId,
        titulo: d.title,
        gravidade: d.severity,
        categoria: d.category,
        local: `compasso ${d.location.measure}, tempo ${d.location.beat}, vozes ${d.location.voices.join(", ")}`,
        mensagem: d.message,
        explicacao: d.explanation,
        sugestoes: d.suggestions,
        excecoes: d.exceptions ?? null,
      })),
    },
    licoesDisponiveis: LESSONS.map((l) => ({ id: l.id, titulo: l.title })),
  };
  const content = `Modo: ${mode} (${TUTOR_MODES[mode]})\nPergunta do aluno: ${question.trim() || "(sem pergunta: comente o relatório)"}\n\nContexto (JSON):\n${JSON.stringify(context)}`;
  return {
    content,
    report,
    evidence: { engineVersion: report.engineVersion, style, diagnosticIds: report.diagnostics.map((d) => d.id), harmony },
  };
}

export interface GroundedTutorResponse {
  readonly response: TutorResponse;
  /** Avisos de fundamentação: referências removidas por não existirem no relatório. */
  readonly warnings: readonly string[];
}

/** Remove da resposta referências que não existem no relatório nem no currículo. */
export function groundTutorResponse(raw: TutorResponse, evidence: TutorEvidence, mode: TutorMode): GroundedTutorResponse {
  const ids = new Set(evidence.diagnosticIds);
  const lessons = new Set(LESSONS.map((l) => l.id));
  const warnings: string[] = [];
  const cited = raw.citedDiagnosticIds.filter((id) => {
    if (ids.has(id)) return true;
    warnings.push(`Referência a diagnóstico inexistente removida (${id}).`);
    return false;
  });
  const revisions = raw.revisions.filter((r) => {
    if (ids.has(r.diagnosticId)) return true;
    warnings.push(`Revisão sem diagnóstico correspondente removida (${r.diagnosticId}).`);
    return false;
  });
  const suggestedLessonIds = raw.suggestedLessonIds.filter((id) => {
    if (lessons.has(id)) return true;
    warnings.push(`Lição inexistente removida (${id}).`);
    return false;
  });
  if (mode === "socratico" && revisions.length) warnings.push("No modo socrático as revisões prontas foram ocultadas.");
  return {
    response: { ...raw, citedDiagnosticIds: cited, revisions: mode === "socratico" ? [] : revisions, suggestedLessonIds },
    warnings,
  };
}
