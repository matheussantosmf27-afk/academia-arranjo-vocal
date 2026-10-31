import type { Level } from "./rubric";

/**
 * Rubrica de avaliação HUMANA (professor, regente ou colega experiente). Os níveis são
 * escolhidos por uma pessoa que ouviu e leu o arranjo; o curso não sugere nem calcula nota
 * para criatividade, expressividade ou adequação ao repertório. O motor só oferece, como
 * referência, o que ele mede (erros e alertas), separado da escolha do avaliador.
 */
export type HumanCriterionId =
  | "correcao-harmonica"
  | "conducao"
  | "cantabilidade"
  | "tessitura"
  | "prosodia"
  | "equilibrio"
  | "criatividade"
  | "coerencia-estilistica"
  | "expressividade"
  | "adequacao";

export interface HumanCriterion {
  readonly id: HumanCriterionId;
  readonly name: string;
  readonly question: string;
  /** Descritor de cada nível (1 a 4). */
  readonly levels: Readonly<Record<Level, string>>;
  /** O motor mede algo relacionado (mostrado como referência, nunca como nota). */
  readonly engineHint?: string;
}

export const HUMAN_RUBRIC: readonly HumanCriterion[] = [
  {
    id: "correcao-harmonica",
    name: "Correção harmônica",
    question: "Os acordes estão completos e bem escolhidos para a melodia, com cadências claras?",
    levels: { 1: "Acordes incompletos ou que contradizem a melodia em vários pontos.", 2: "Harmonia funciona na maior parte, com escolhas pobres ou cadências pouco claras.", 3: "Harmonia correta e funcional, cadências claras.", 4: "Harmonia correta e com escolhas que valorizam a melodia (cor, ritmo harmônico)." },
    engineHint: "O motor aponta notas estranhas ao acorde, duplicações e resolução da sensível e da sétima.",
  },
  {
    id: "conducao",
    name: "Condução de vozes",
    question: "As vozes se movem com economia, sem paralelas, cruzamentos ou saltos sem razão?",
    levels: { 1: "Paralelas e saltos frequentes; vozes sem direção.", 2: "Alguns erros de condução; linhas internas irregulares.", 3: "Condução correta, com movimento por grau e notas comuns mantidas.", 4: "Condução correta e com linhas internas que têm vida própria." },
    engineHint: "O motor confere quintas e oitavas paralelas e diretas, cruzamento, sobreposição e espaçamento.",
  },
  {
    id: "cantabilidade",
    name: "Cantabilidade",
    question: "Cada voz é fácil de cantar sozinha, com intervalos afináveis e lugar para respirar?",
    levels: { 1: "Linhas difíceis de afinar, sem respiração.", 2: "Cantável com esforço; alguns intervalos ou trechos ingratos.", 3: "Todas as vozes cantáveis, com respirações possíveis.", 4: "Cada voz é uma melodia agradável de cantar." },
  },
  {
    id: "tessitura",
    name: "Tessitura",
    question: "As vozes ficam na região confortável do naipe, sem permanecer muito tempo nos extremos?",
    levels: { 1: "Notas fora da extensão ou longos trechos no extremo.", 2: "Dentro da extensão, mas cansativo em trechos.", 3: "Tessitura confortável na maior parte.", 4: "Tessitura confortável e usada a favor do caráter (clímax no lugar certo)." },
    engineHint: "O motor confere extensão e permanência fora da tessitura confortável.",
  },
  {
    id: "prosodia",
    name: "Prosódia",
    question: "As sílabas tônicas caem em tempos fortes ou notas longas, e o texto é compreensível?",
    levels: { 1: "Acentos do texto contrariados com frequência.", 2: "Prosódia aceitável, com deslocamentos ocasionais.", 3: "Prosódia correta.", 4: "Prosódia correta e a música realça o sentido do texto." },
    engineHint: "O motor só confere onde há sílabas marcadas na partitura.",
  },
  {
    id: "equilibrio",
    name: "Equilíbrio",
    question: "A melodia se destaca e os naipes soam equilibrados (densidade, dobramentos, registro)?",
    levels: { 1: "Melodia encoberta ou naipes desequilibrados.", 2: "Equilíbrio irregular entre trechos.", 3: "Melodia clara e naipes equilibrados.", 4: "Equilíbrio controlado e variado conforme a forma." },
  },
  {
    id: "criatividade",
    name: "Criatividade",
    question: "Há ideias próprias (textura, contracanto, introdução, rearmonização) que vão além do esperado?",
    levels: { 1: "Apenas blocos de acordes sem ideia própria.", 2: "Alguma ideia, pouco desenvolvida.", 3: "Ideias próprias, desenvolvidas com coerência.", 4: "Ideias originais que dão identidade ao arranjo." },
  },
  {
    id: "coerencia-estilistica",
    name: "Coerência estilística",
    question: "As escolhas pertencem ao estilo declarado do arranjo, do começo ao fim?",
    levels: { 1: "Mistura de estilos sem intenção.", 2: "Estilo reconhecível, com trechos fora dele.", 3: "Estilo coerente.", 4: "Estilo coerente e dominado, com recursos idiomáticos." },
    engineHint: "O motor julga as mesmas regras de forma diferente em cada estilo; o avaliador decide se as escolhas combinam com o estilo.",
  },
  {
    id: "expressividade",
    name: "Expressividade",
    question: "Dinâmicas, articulações e forma criam uma interpretação com começo, clímax e fim?",
    levels: { 1: "Sem indicações expressivas nem forma perceptível.", 2: "Algumas indicações, pouco ligadas à forma.", 3: "Indicações coerentes e um clímax claro.", 4: "Interpretação convincente, que guia o coro." },
  },
  {
    id: "adequacao",
    name: "Adequação ao repertório",
    question: "O arranjo serve ao coro, à ocasião e ao caráter da peça original?",
    levels: { 1: "Inadequado ao coro ou à peça.", 2: "Adequado com ressalvas importantes.", 3: "Adequado ao coro e à ocasião.", 4: "Muito adequado: realça a peça e o coro que vai cantá-la." },
  },
];

export interface HumanEvaluation {
  readonly id: string;
  readonly at: string;
  readonly evaluatorName: string;
  readonly role: "professor" | "regente" | "colega";
  /** O que foi avaliado: projeto prático, projeto cumulativo, tarefa. */
  readonly target: string;
  readonly levels: Readonly<Partial<Record<HumanCriterionId, Level>>>;
  readonly comments: Readonly<Partial<Record<HumanCriterionId, string>>>;
  readonly general: string;
}

export const ROLE_PT: Record<HumanEvaluation["role"], string> = { professor: "Professor(a)", regente: "Regente", colega: "Colega" };

/** Uma avaliação humana é válida quando todos os critérios têm nível e há um comentário geral. */
export function validateHumanEvaluation(e: Pick<HumanEvaluation, "evaluatorName" | "levels" | "general">): string[] {
  const errors: string[] = [];
  if (!e.evaluatorName.trim()) errors.push("Informe o nome de quem avaliou.");
  const missing = HUMAN_RUBRIC.filter((c) => !e.levels[c.id]).map((c) => c.name);
  if (missing.length) errors.push(`Escolha um nível para: ${missing.join(", ")}.`);
  if (e.general.trim().length < 20) errors.push("Escreva um comentário geral (pelo menos 20 caracteres).");
  return errors;
}
