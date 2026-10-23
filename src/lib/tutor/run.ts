import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import type { Score, StyleProfileId } from "@/domain/music/score";
import {
  type GroundedTutorResponse,
  TUTOR_SYSTEM_PROMPT,
  type TutorEvidence,
  type TutorMode,
  buildTutorUserContent,
  groundTutorResponse,
  tutorResponseSchema,
} from "@/domain/tutor/grounding";

export const TUTOR_MODEL = "claude-opus-5-5";

export type TutorOutcome =
  | ({ ok: true; evidence: TutorEvidence; servedBy: string } & GroundedTutorResponse)
  | { ok: false; error: string; evidence?: TutorEvidence };

/** Chama o modelo com saída estruturada e devolve a resposta já fundamentada (validada contra o relatório). */
export async function runTutor(client: Anthropic, score: Score, style: StyleProfileId, question: string, mode: TutorMode): Promise<TutorOutcome> {
  const { content, evidence } = buildTutorUserContent(score, style, question, mode);
  try {
    const response = await client.beta.messages.parse({
      model: TUTOR_MODEL,
      max_tokens: 16000,
      thinking: { type: "adaptive" },
      output_config: { effort: "medium", format: betaZodOutputFormat(tutorResponseSchema) },
      // Recusas por segurança são reexecutadas no servidor por um modelo de fallback.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: TUTOR_SYSTEM_PROMPT,
      messages: [{ role: "user", content }],
    });
    if (response.stop_reason === "refusal") return { ok: false, error: "O tutor não pôde responder a esta pergunta.", evidence };
    if (response.stop_reason === "max_tokens") return { ok: false, error: "A resposta do tutor ficou incompleta; tente uma pergunta mais específica.", evidence };
    const parsed = response.parsed_output;
    if (!parsed) return { ok: false, error: "O tutor devolveu uma resposta em formato inesperado.", evidence };
    return { ok: true, evidence, servedBy: response.model, ...groundTutorResponse(parsed, evidence, mode) };
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) return { ok: false, error: "Muitas perguntas ao mesmo tempo; tente em instantes.", evidence };
    if (error instanceof Anthropic.AuthenticationError) return { ok: false, error: "Credencial do tutor inválida no servidor.", evidence };
    if (error instanceof Anthropic.APIError) return { ok: false, error: `Tutor indisponível (erro ${error.status ?? "de rede"}).`, evidence };
    return { ok: false, error: "Tutor indisponível no momento.", evidence };
  }
}
