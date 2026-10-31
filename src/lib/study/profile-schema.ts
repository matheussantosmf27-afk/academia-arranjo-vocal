import { z } from "zod";

/** Perfil musical inicial, respondido pelo próprio aluno no início do estudo. */
export const PROFILE_QUESTIONS = {
  estudo: { label: "Há quanto tempo você estuda música?", options: ["Não estudo", "Menos de 1 ano", "1 a 3 anos", "3 a 10 anos", "Mais de 10 anos"] },
  leitura: { label: "Como você lê partitura?", options: ["Não leio", "Leio devagar, nota por nota", "Leio melodias com fluência", "Leio a quatro vozes"] },
  coro: { label: "Canta ou cantou em coro?", options: ["Nunca", "Menos de 1 ano", "1 a 5 anos", "Mais de 5 anos"] },
  regencia: { label: "Rege ou ensaia algum grupo?", options: ["Não", "Às vezes", "Sim, regularmente"] },
  arranjo: { label: "Já escreveu arranjos vocais?", options: ["Nunca", "Um ou dois, sem orientação", "Alguns, com orientação", "Escrevo com frequência"] },
  harmonia: { label: "Estudou harmonia?", options: ["Não", "Cifras e acordes básicos", "Harmonia funcional", "Harmonia a quatro vozes"] },
} as const;

export type ProfileQuestion = keyof typeof PROFILE_QUESTIONS;

export const profileSchema = z.object({
  answers: z.object(Object.fromEntries(Object.keys(PROFILE_QUESTIONS).map((k) => [k, z.number().int().min(0).max(5)])) as Record<ProfileQuestion, z.ZodNumber>),
  goal: z.string().max(1000),
  consent: z.boolean(),
  at: z.string(),
});

export type MusicalProfile = z.infer<typeof profileSchema>;

