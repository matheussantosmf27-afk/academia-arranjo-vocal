/**
 * Auditoria automática do currículo: mede cada aula com os mesmos critérios e
 * grava a matriz em docs/auditoria/matriz-das-aulas.md. Uso: npm run audit:curriculum
 *
 * O script só mede o que é verificável no conteúdo (contagens, tipos de
 * exercício, posição da resposta certa, verbos dos objetivos, estimativa de
 * duração). Julgamentos musicais ficam no relatório escrito, não aqui.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { LESSONS, LEVELS } from "@/content/curriculum/curriculum";
import type { ContentBlock, Lesson } from "@/content/curriculum/types";
import { PROJECTS } from "@/content/projects";
import { buildExerciseSet, buildReviewSet } from "@/domain/exercises/engine";
import type { GeneratorSpec } from "@/domain/exercises/types";

/** Verbos que descrevem estado mental, não desempenho observável. */
const VAGUE = /^(entender|compreender|conhecer|saber|aprender|perceber|ter no(ç|c)ão|familiarizar)/i;
/** Geradores que pedem decisão de escrita (escolher entre realizações conferidas pelo motor). */
const PRODUCTION: GeneratorSpec["type"][] = ["realization", "ttbb-voicing", "ssaa-voicing", "reharm-choice", "voice-leading-error"];
/** Geradores com escuta como parte da tarefa. */
const EAR: GeneratorSpec["type"][] = ["cadence-identification"];

const words = (s: string) => s.split(/\s+/).filter(Boolean).length;
function blockWords(b: ContentBlock): number {
  if (b.type === "paragraph") return words(b.text);
  if (b.type === "list") return b.items.reduce((n, i) => n + words(i), 0);
  if (b.type === "callout") return words(b.title) + words(b.text);
  if (b.type === "table") return b.rows.flat().reduce((n, c) => n + words(c), words(b.caption));
  if (b.type === "example") return words(b.commentary);
  return b.instructions.reduce((n, i) => n + words(i), 0);
}

export interface LessonAudit {
  readonly lesson: Lesson;
  readonly unitCode: string;
  readonly words: number;
  readonly examples: { correto: number; incorreto: number; observacao: number };
  readonly listening: number;
  readonly staticItems: number;
  readonly firstOptionCorrect: number;
  /** Fração das vezes em que o aluno vê a certa na 1ª posição (40 tentativas simuladas). */
  readonly shownFirstRate: number;
  readonly generatedItems: number;
  readonly generatorTypes: readonly string[];
  readonly earItems: number;
  /** A revisão espaçada traz itens de ouvido (em 10 revisões simuladas). */
  readonly earInReview: boolean;
  readonly productionItems: number;
  readonly vagueObjectives: readonly string[];
  readonly estimate: number;
  readonly project: boolean;
  readonly flags: readonly string[];
}

export function auditLesson(lesson: Lesson): LessonAudit {
  const unitCode = LEVELS.flatMap((lv) => lv.units).find((u) => u.id === lesson.unitId)?.code ?? "?";
  const blocks = lesson.sections.flatMap((s) => s.blocks);
  const w = blocks.reduce((n, b) => n + blockWords(b), 0);
  const ex = { correto: 0, incorreto: 0, observacao: 0 };
  for (const b of blocks) if (b.type === "example") ex[b.verdict]++;
  const listening = blocks.filter((b) => b.type === "listening").length;
  const spec = lesson.exercises;
  const items = spec ? buildExerciseSet(spec, 1) : [];
  const statics = spec?.staticItems ?? [];
  const firstOptionCorrect = statics.filter((i) => i.options[0]?.id === i.correctOptionId).length;
  // O que o aluno vê: posição da certa nos itens fixos depois de montada a tentativa, em 40 sementes.
  let seen = 0;
  let seenFirst = 0;
  if (spec && statics.length) {
    for (let seed = 1; seed <= 40; seed++) {
      for (const it of buildExerciseSet(spec, seed).slice(0, statics.length)) {
        seen++;
        if (it.options[0]?.id === it.correctOptionId) seenFirst++;
      }
    }
  }
  const shownFirstRate = seen ? seenFirst / seen : 0;
  const gens = spec?.generators ?? [];
  const generatedItems = items.length - statics.length;
  const earItems = items.filter((i) => i.earOnly).length + gens.filter((g) => EAR.includes(g.type)).reduce((n, g) => n + g.count, 0);
  let earInReview = false;
  if (spec) for (let seed = 1; seed <= 10 && !earInReview; seed++) earInReview = buildReviewSet(spec, seed).some((i) => i.earOnly);
  const productionItems = gens.filter((g) => PRODUCTION.includes(g.type)).reduce((n, g) => n + g.count, 0);
  const vagueObjectives = lesson.objectives.filter((o) => VAGUE.test(o.trim()));
  // Estimativa: leitura a 150 palavras/min, 2 min por exemplo (ouvir + ler), 3 min por escuta guiada,
  // 1,5 min por item de verificação e 15 min para a aplicação no Estúdio.
  const estimate = Math.round(w / 150 + (ex.correto + ex.incorreto + ex.observacao) * 2 + listening * 3 + items.length * 1.5 + (lesson.application ? 15 : 0));
  const project = PROJECTS.some((p) => p.lessonId === lesson.id);
  const flags: string[] = [];
  if (statics.length > 0 && shownFirstRate > 0.6) flags.push(`resposta certa na 1ª posição em ${Math.round(shownFirstRate * 100)}% das tentativas`);
  if (vagueObjectives.length) flags.push(`${vagueObjectives.length} objetivo(s) com verbo não observável`);
  if (earItems === 0 && !earInReview) flags.push("nenhum item auditivo na verificação nem na revisão");
  if (productionItems === 0 && !project) flags.push("sem tarefa de decisão de escrita na verificação nem projeto");
  if (estimate > lesson.estimatedMinutes * 1.5) flags.push(`duração anunciada (${lesson.estimatedMinutes} min) abaixo da estimada (${estimate} min)`);
  if (estimate < lesson.estimatedMinutes * 0.5) flags.push(`duração anunciada (${lesson.estimatedMinutes} min) acima da estimada (${estimate} min)`);
  if (ex.incorreto + ex.observacao === 0) flags.push("sem contraexemplo");
  if (listening === 0) flags.push("sem escuta guiada");
  return { lesson, unitCode, words: w, examples: ex, listening, staticItems: statics.length, firstOptionCorrect, shownFirstRate, generatedItems, generatorTypes: [...new Set(gens.map((g) => g.type))], earItems, earInReview, productionItems, vagueObjectives, estimate, project, flags };
}

function main() {
  const rows = LESSONS.filter((l) => l.status === "disponivel").map(auditLesson);
  const count = (pred: (r: LessonAudit) => boolean) => rows.filter(pred).length;
  const lines: string[] = [];
  lines.push("# Matriz de auditoria das aulas (gerada)");
  lines.push("");
  lines.push(`Gerada por \`npm run audit:curriculum\` a partir do conteúdo do repositório. ${rows.length} aulas disponíveis.`);
  lines.push("");
  lines.push("Critérios medidos automaticamente: palavras de conteúdo, exemplos por veredito, escutas guiadas, itens fixos e gerados da verificação, itens auditivos, itens de decisão de escrita (realização, distribuição, rearmonização, localizar o erro), objetivos com verbo não observável, posição da resposta certa nos itens fixos e estimativa de duração (leitura a 150 palavras/min, 2 min por exemplo, 3 min por escuta, 1,5 min por item, 15 min de aplicação no Estúdio).");
  lines.push("");
  lines.push("## Resumo");
  lines.push("");
  lines.push(`- Aulas em que a resposta certa está escrita na 1ª posição em mais de 60% dos itens fixos: ${count((r) => r.staticItems > 0 && r.firstOptionCorrect / r.staticItems > 0.6)} (as alternativas agora são embaralhadas a cada tentativa)`);
  const allSeen = rows.filter((r) => r.staticItems > 0);
  lines.push(`- Fração média de vezes em que o aluno vê a certa na 1ª posição de um item fixo: ${Math.round((allSeen.reduce((n, r) => n + r.shownFirstRate, 0) / Math.max(1, allSeen.length)) * 100)}% (o acaso com 3 alternativas é 33%)`);
  lines.push(`- Aulas sem item auditivo na verificação: ${count((r) => r.earItems === 0)}; sem item auditivo nem na verificação nem na revisão espaçada: ${count((r) => r.earItems === 0 && !r.earInReview)}`);
  lines.push(`- Aulas sem tarefa de decisão de escrita nem projeto: ${count((r) => r.productionItems === 0 && !r.project)}`);
  lines.push(`- Aulas com objetivo de verbo não observável: ${count((r) => r.vagueObjectives.length > 0)}`);
  lines.push(`- Aulas com duração anunciada fora de 0,5×–1,5× da estimada: ${count((r) => r.flags.some((f) => f.startsWith("duração")))}`);
  const grav = (r: LessonAudit) => {
    const noEar = r.earItems === 0 && !r.earInReview;
    const noProd = r.productionItems === 0 && !r.project;
    return noEar && noProd ? "alta" : noEar || noProd ? "média" : "baixa";
  };
  lines.push(`- Gravidade (ver "Recomendações por aula"): alta ${count((r) => grav(r) === "alta")}, média ${count((r) => grav(r) === "média")}, baixa ${count((r) => grav(r) === "baixa")}`);
  lines.push(`- Aulas sem contraexemplo: ${count((r) => r.examples.incorreto + r.examples.observacao === 0)}`);
  lines.push(`- Aulas sem escuta guiada: ${count((r) => r.listening === 0)}`);
  lines.push("");
  lines.push("## Matriz");
  lines.push("");
  lines.push("| Aula | Disciplina | Min. anunciados / estimados | Exemplos (C/I/O) | Escutas | Itens fixos / gerados | Auditivos (verificação / revisão) |  Escrita | Geradores | Pendências |");
  lines.push("|---|---|---|---|---|---|---|---|---|---|");
  for (const r of rows) {
    lines.push(
      `| \`${r.lesson.id}\` ${r.lesson.title} | ${r.unitCode} | ${r.lesson.estimatedMinutes} / ${r.estimate} | ${r.examples.correto}/${r.examples.incorreto}/${r.examples.observacao} | ${r.listening} | ${r.staticItems} / ${r.generatedItems} | ${r.earItems} / ${r.earInReview ? "sim" : "não"} | ${r.productionItems}${r.project ? " + projeto" : ""} | ${r.generatorTypes.join(", ")} | ${r.flags.join("; ") || "—"} |`,
    );
  }
  lines.push("");
  lines.push("## Recomendações por aula");
  lines.push("");
  lines.push("Gravidade: **alta** quando a aula não tem nem escuta nem decisão de escrita avaliada (o aluno só reconhece ou recorda); **média** quando falta uma das duas; **baixa** quando só restam ajustes de texto ou de duração. A posição da resposta certa já foi resolvida no motor (alternativas embaralhadas) e não entra aqui.");
  lines.push("");
  lines.push("| Aula | Objetivo principal | Competências | Gravidade | Alteração recomendada | Critério de aprovação atual | Dependência técnica |");
  lines.push("|---|---|---|---|---|---|---|");
  for (const r of rows) {
    const noEar = r.earItems === 0 && !r.earInReview;
    const noProd = r.productionItems === 0 && !r.project;
    const gravity = noEar && noProd ? "alta" : noEar || noProd ? "média" : "baixa";
    const recs: string[] = [];
    const deps: string[] = [];
    if (noEar) {
      recs.push("acrescentar escuta avaliada do fenômeno da aula (comparar duas versões, reconhecer de ouvido)");
      deps.push("gerador auditivo do tema");
    }
    if (noProd) {
      recs.push("acrescentar tarefa de decisão de escrita (localizar e corrigir o erro, escolher a realização) ou ligar a um projeto");
      deps.push("trechos-modelo conferidos pelo motor");
    }
    if (r.flags.some((f) => f.startsWith("duração"))) recs.push("rever a duração anunciada");
    if (r.vagueObjectives.length) recs.push("reescrever objetivo com verbo observável");
    if (!recs.length) recs.push("manter; validar com estudantes");
    lines.push(
      `| \`${r.lesson.id}\` | ${r.lesson.objectives[0] ?? "—"} | ${r.lesson.competencies.join(", ")} | ${gravity} | ${recs.join("; ")} | ${r.lesson.masteryDescription ?? "—"} | ${deps.join("; ") || "nenhuma"} |`,
    );
  }
  lines.push("");
  mkdirSync("docs/auditoria", { recursive: true });
  writeFileSync("docs/auditoria/matriz-das-aulas.md", lines.join("\n"));
  console.log(lines.slice(0, 14).join("\n"));
}

main();
