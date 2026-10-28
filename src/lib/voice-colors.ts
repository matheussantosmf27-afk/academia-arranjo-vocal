import type { FormationId, VoiceId } from "@/domain/music/formations";

/** Cor de cada voz na interface escura (botões, rolo de piano, legendas). */
export const VOICE_UI_COLOR: Readonly<Record<VoiceId, string>> = {
  S: "#ff4d9d",
  A: "#ffb547",
  T: "#2ee6ff",
  B: "#a3e635",
  T1: "#ff4d9d",
  T2: "#2ee6ff",
  B1: "#ffb547",
  B2: "#a3e635",
  S1: "#ff4d9d",
  S2: "#2ee6ff",
  A1: "#ffb547",
  A2: "#a3e635",
};

/** Mesmas cores, escurecidas para a partitura em papel claro (contraste com o fundo branco). */
export const VOICE_PAPER_COLOR: Readonly<Record<VoiceId, string>> = {
  S: "#c2185b",
  A: "#b45309",
  T: "#0e7490",
  B: "#3f6212",
  T1: "#c2185b",
  T2: "#0e7490",
  B1: "#b45309",
  B2: "#3f6212",
  S1: "#c2185b",
  S2: "#0e7490",
  A1: "#b45309",
  A2: "#3f6212",
};

/** Classe do selo de formação (SATB, TTBB, SSAA). */
export function formationChipClass(formation: FormationId): string {
  return { SATB: "chip-satb", TTBB: "chip-ttbb", SSAA: "chip-ssaa" }[formation];
}
