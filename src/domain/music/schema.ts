import { z } from "zod";
import { DURATION_TYPES } from "./duration";
import { getFormation } from "./formations";
import { isSupportedKey } from "./key";
import { STEPS } from "./pitch";
import { SCORE_SCHEMA_VERSION, type Score } from "./score";

/**
 * Validação estrutural (Zod) para qualquer partitura vinda de fora do domínio:
 * armazenamento local, banco de dados, importação de arquivos.
 */
const stepSchema = z.enum(STEPS);
const alterSchema = z.union([z.literal(-2), z.literal(-1), z.literal(0), z.literal(1), z.literal(2)]);

export const pitchSchema = z.object({
  step: stepSchema,
  alter: alterSchema,
  octave: z.number().int().min(0).max(8),
});

export const durationSchema = z.object({
  type: z.enum(DURATION_TYPES),
  dots: z.union([z.literal(0), z.literal(1), z.literal(2)]),
});

const idSchema = z.string().min(1).max(64);

const noteSchema = z.object({
  id: idSchema,
  kind: z.literal("note"),
  pitch: pitchSchema,
  duration: durationSchema,
  tieToNext: z.boolean().optional(),
  lyric: z.string().max(64).optional(),
  articulations: z.array(z.enum(["staccato", "accent", "tenuto", "fermata"])).max(4).optional(),
  dynamic: z.enum(["pp", "p", "mp", "mf", "f", "ff"]).optional(),
});

const restSchema = z.object({
  id: idSchema,
  kind: z.literal("rest"),
  duration: durationSchema,
});

const voiceIdSchema = z.enum(["S", "A", "T", "B", "T1", "T2", "B1", "B2"]);

export const scoreSchema = z
  .object({
    schemaVersion: z.literal(SCORE_SCHEMA_VERSION),
    id: idSchema,
    title: z.string().min(1).max(200),
    formation: z.enum(["SATB", "TTBB"]),
    key: z.object({
      tonic: z.object({ step: stepSchema, alter: alterSchema }),
      mode: z.enum(["major", "minor"]),
    }),
    timeSignature: z.object({
      beats: z.number().int().min(1).max(16),
      beatType: z.union([z.literal(1), z.literal(2), z.literal(4), z.literal(8), z.literal(16)]),
    }),
    tempoBpm: z.number().min(20).max(300),
    measureCount: z.number().int().min(1).max(512),
    parts: z.array(
      z.object({
        voice: voiceIdSchema,
        events: z.array(z.discriminatedUnion("kind", [noteSchema, restSchema])).max(4096),
      }),
    ),
    metadata: z.object({
      composer: z.string().max(200).optional(),
      arranger: z.string().max(200).optional(),
      style: z.enum(["coral-tradicional", "coral-contemporaneo", "popular-a-cappella"]),
      notes: z.string().max(4000).optional(),
    }),
  })
  .superRefine((score, ctx) => {
    const expected = getFormation(score.formation).voices.map((v) => v.id);
    const got = score.parts.map((p) => p.voice);
    if (expected.join(",") !== got.join(",")) {
      ctx.addIssue({ code: "custom", message: `Vozes devem ser ${expected.join(", ")} nesta ordem`, path: ["parts"] });
    }
    if (!isSupportedKey(score.key)) {
      ctx.addIssue({ code: "custom", message: "Tonalidade com mais de 7 acidentes não é suportada", path: ["key"] });
    }
    const ids = new Set<string>();
    for (const part of score.parts) {
      for (const e of part.events) {
        if (ids.has(e.id)) ctx.addIssue({ code: "custom", message: `ID de evento duplicado: ${e.id}`, path: ["parts"] });
        ids.add(e.id);
      }
    }
  });

export type ParseScoreResult = { ok: true; score: Score } | { ok: false; errors: string[] };

export function parseScore(input: unknown): ParseScoreResult {
  const result = scoreSchema.safeParse(input);
  if (result.success) return { ok: true, score: result.data as Score };
  return {
    ok: false,
    errors: result.error.issues.map((i) => `${i.path.join(".") || "(raiz)"}: ${i.message}`),
  };
}
