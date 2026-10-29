import type { ContentBlock } from "./types";

/**
 * Roteiro de autorrevisão em cinco níveis, do verificável ao estético. Usado nas aulas
 * de escrita: o aluno revisa um nível de cada vez, na ordem, antes de ouvir o todo.
 */
export const REVISION_LEVELS: ContentBlock = {
  type: "table",
  caption: "Autorrevisão em cinco níveis (um de cada vez, nesta ordem)",
  headers: ["Nível", "Pergunta", "O que conferir", "Quem ajuda"],
  rows: [
    ["1. Escrita", "Está legível e completo?", "durações somando o compasso, nada atravessando a barra, armadura, letra sob a voz certa", "motor (estrutura)"],
    ["2. Extensão", "Cada naipe consegue cantar?", "extensão e, principalmente, tessitura: onde a voz passa mais tempo", "motor (extensão/tessitura)"],
    ["3. Harmonia", "Os acordes são os pretendidos?", "cifragem sob a pauta, funções, cadências nos tempos fortes, notas estranhas tratadas", "cifragem do Estúdio + sua análise"],
    ["4. Condução", "As linhas são independentes e cantáveis?", "seis pares de vozes sem paralelas, sensível e sétimas resolvidas, espaçamento, saltos compensados", "motor (condução) + cantar cada voz sozinho"],
    ["5. Efeito", "Serve ao texto e ao estilo?", "pontuação do texto nas cadências, respirações, ponto culminante, densidade, escolhas de estilo justificadas", "seu ouvido; um colega cantando"],
  ],
};
