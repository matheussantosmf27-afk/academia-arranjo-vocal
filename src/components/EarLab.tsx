"use client";

import { useState } from "react";
import type { ExerciseSetSpec } from "@/domain/exercises/types";
import { ExercisePanel } from "./lesson/ExercisePanel";
import { SYNTH_NOTICE } from "./audio/VoicePlayer";

const DRILLS: Record<string, ExerciseSetSpec> = {
  intervalos: {
    id: "lab-intervalos",
    title: "Intervalos de ouvido",
    instructions: "Ouça e identifique. A notação aparece depois da resposta.",
    staticItems: [],
    generators: [{ type: "interval-identification", count: 10, earOnly: true }],
    minScore: 0,
  },
  basicos: {
    id: "lab-intervalos-basicos",
    title: "Intervalos até a 5ª",
    instructions: "Segundas, terças, quartas e quintas — o vocabulário mais frequente nas linhas vocais.",
    staticItems: [],
    generators: [{ type: "interval-identification", count: 10, earOnly: true, maxNumber: 5 }],
    minScore: 0,
  },
  acordes: {
    id: "lab-acordes",
    title: "Acordes: qualidade e inversão",
    instructions: "Ouça o acorde a quatro vozes, veja a partitura e identifique.",
    staticItems: [],
    generators: [{ type: "chord-identification", count: 8 }],
    minScore: 0,
  },
};

export function EarLab() {
  const [drill, setDrill] = useState<keyof typeof DRILLS>("basicos");
  return (
    <div className="stack" style={{ gap: 16 }}>
      <div className="row" role="tablist" aria-label="Tipo de treino">
        {Object.entries(DRILLS).map(([key, d]) => (
          <button key={key} type="button" role="tab" aria-selected={drill === key} className="btn btn-sm" onClick={() => setDrill(key as keyof typeof DRILLS)}>
            {d.title}
          </button>
        ))}
      </div>
      <ExercisePanel key={drill} spec={DRILLS[drill]!} lessonId="laboratorio" practice />
      <p className="muted" style={{ fontSize: "0.85rem" }}>
        {SYNTH_NOTICE} Ditado melódico, funções harmônicas e reconhecimento de problemas de condução entram nas próximas etapas.
      </p>
    </div>
  );
}
