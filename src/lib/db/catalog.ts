import { LESSONS, LEVELS } from "@/content/curriculum/curriculum";

/** Versão do conteúdo: muda quando lições são publicadas ou reestruturadas. */
export const CONTENT_VERSION = "2026.10.23";

const q = (s: string) => `'${s.replace(/'/g, "''")}'`;

/**
 * SQL idempotente que espelha o currículo do código no catálogo do banco
 * (semestres, disciplinas, aulas, pré-requisitos). Executado com privilégios de
 * service role — usuários não escrevem no catálogo.
 */
export function catalogSeedSql(): string {
  const lines: string[] = ["-- Gerado por scripts/generate-catalog-seed.ts — não editar à mão.", "begin;"];
  const levelIds = LEVELS.map((lv) => q(lv.id)).join(", ");
  const unitIds = LEVELS.flatMap((lv) => lv.units.map((u) => q(u.id))).join(", ");
  // Níveis que saíram da grade liberam seus números (únicos) antes do upsert.
  lines.push(`update public.levels set number = number + 100 where id not in (${levelIds}) and number < 100;`);
  for (const lv of LEVELS) {
    lines.push(
      `insert into public.levels (id, number, title) values (${q(lv.id)}, ${lv.number}, ${q(lv.title)}) on conflict (id) do update set number = excluded.number, title = excluded.title;`,
    );
    lv.units.forEach((u, i) => {
      lines.push(
        `insert into public.units (id, level_id, title, position) values (${q(u.id)}, ${q(lv.id)}, ${q(u.title)}, ${i + 1}) on conflict (id) do update set level_id = excluded.level_id, title = excluded.title, position = excluded.position;`,
      );
    });
  }
  for (const lv of LEVELS) {
    for (const u of lv.units) {
      u.lessonIds.forEach((id, i) => {
        const l = LESSONS.find((x) => x.id === id)!;
        lines.push(
          `insert into public.lessons (id, unit_id, title, status, content_version, position) values (${q(l.id)}, ${q(u.id)}, ${q(l.title)}, ${q(l.status)}, ${q(CONTENT_VERSION)}, ${i + 1}) on conflict (id) do update set unit_id = excluded.unit_id, title = excluded.title, status = excluded.status, content_version = excluded.content_version, position = excluded.position;`,
        );
      });
    }
  }
  // Disciplinas e semestres que saíram da grade (todas as aulas já foram realocadas acima).
  lines.push(`delete from public.units where id not in (${unitIds}) and not exists (select 1 from public.lessons l where l.unit_id = units.id);`);
  lines.push(`delete from public.levels where id not in (${levelIds}) and not exists (select 1 from public.units u where u.level_id = levels.id);`);
  lines.push("delete from public.lesson_prerequisites;");
  for (const l of LESSONS) {
    for (const p of l.prerequisites) {
      lines.push(`insert into public.lesson_prerequisites (lesson_id, prerequisite_id) values (${q(l.id)}, ${q(p)});`);
    }
  }
  lines.push("commit;", "");
  return lines.join("\n");
}
