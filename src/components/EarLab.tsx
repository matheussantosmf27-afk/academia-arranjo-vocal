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
  acordesOuvido: {
    id: "lab-acordes-ouvido",
    title: "Acordes só de ouvido",
    instructions: "Sem partitura até responder: cante a nota mais grave e decida a qualidade (maior, menor, diminuto, aumentado) e a inversão.",
    staticItems: [],
    generators: [{ type: "chord-identification", count: 8, earOnly: true }],
    minScore: 0,
  },
  cadencias: {
    id: "lab-cadencias",
    title: "Cadências de ouvido",
    instructions: "Ouça o trecho a quatro vozes e diga como a frase termina: autêntica, plagal, semicadência ou de engano. A partitura aparece depois.",
    staticItems: [],
    generators: [{ type: "cadence-identification", count: 6, earOnly: true }],
    minScore: 0,
  },
  movimento: {
    id: "lab-movimento",
    title: "Movimento entre duas vozes",
    instructions: "Ouça duas vozes que passam de um intervalo a outro e classifique o movimento (paralelo, direto, contrário, oblíquo).",
    staticItems: [],
    generators: [{ type: "motion-type", count: 8, earOnly: true }],
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
        {SYNTH_NOTICE} Os resultados daqui não contam para o domínio; a revisão espaçada de cada aula traz os mesmos tipos de pergunta, de ouvido. Ditado melódico e
        rítmico ainda não existem: dependem de um editor de resposta (ver o relatório de auditoria).
      </p>
    </div>
  );
}
