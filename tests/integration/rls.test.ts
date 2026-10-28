import type { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { CHORALE_SATB_C } from "@/domain/music/examples";
import { validateScore } from "@/domain/validation";
import { LESSONS } from "@/content/curriculum/curriculum";
import { ADMIN_URL, as, createTestDatabase } from "./db";

const A = "00000000-0000-4000-8000-00000000000a";
const B = "00000000-0000-4000-8000-00000000000b";

describe.skipIf(!ADMIN_URL)("persistência e RLS (Postgres local com shim do Supabase)", () => {
  let client: Client;
  let drop: () => Promise<void>;
  let arrangementA: string;
  let versionA: string;

  beforeAll(async () => {
    ({ client, drop } = await createTestDatabase());
    await client.query("insert into auth.users (id, email) values ($1, 'a@exemplo.test'), ($2, 'b@exemplo.test')", [A, B]);
  });
  afterAll(async () => drop?.());

  it("cria o perfil automaticamente no cadastro", async () => {
    const r = await as(client, A, (q) => q("select id, preferred_formation from profiles"));
    expect(r.rows).toEqual([{ id: A, preferred_formation: "SATB" }]);
  });

  it("a função de trigger handle_new_user não pode ser chamada por usuários", async () => {
    await expect(as(client, null, (q) => q("select public.handle_new_user()"))).rejects.toThrow(/permission denied/);
    await expect(as(client, A, (q) => q("select public.handle_new_user()"))).rejects.toThrow(/permission denied/);
  });

  it("catálogo é público para leitura e protegido para escrita", async () => {
    const r = await as(client, null, (q) => q("select count(*)::int as n from lessons where status = 'disponivel'"));
    expect(r.rows[0].n).toBe(LESSONS.filter((l) => l.status === "disponivel").length);
    await expect(as(client, A, (q) => q("insert into levels (id, number, title) values ('x', 99, 'x')"))).rejects.toThrow(/row-level security/);
    const upd = await as(client, A, (q) => q("update lessons set title = 'hack'"));
    expect(upd.rowCount).toBe(0);
  });

  it("salva arranjo, versão (Score validado) e relatório do motor", async () => {
    const report = validateScore(CHORALE_SATB_C);
    const ids = await as(client, A, async (q) => {
      const arr = await q("insert into arrangements (title, formation) values ($1, 'SATB') returning id", [CHORALE_SATB_C.title]);
      const ver = await q("insert into arrangement_versions (arrangement_id, version_number, schema_version, score) values ($1, 1, 1, $2) returning id", [
        arr.rows[0].id,
        JSON.stringify(CHORALE_SATB_C),
      ]);
      await q("update arrangements set current_version_id = $1 where id = $2", [ver.rows[0].id, arr.rows[0].id]);
      await q("insert into validation_reports (version_id, engine_version, config, diagnostics, counts) values ($1, $2, $3, $4, $5)", [
        ver.rows[0].id,
        report.engineVersion,
        JSON.stringify(report.config),
        JSON.stringify(report.diagnostics),
        JSON.stringify(report.countsBySeverity),
      ]);
      return { arr: arr.rows[0].id as string, ver: ver.rows[0].id as string };
    });
    arrangementA = ids.arr;
    versionA = ids.ver;
    const back = await as(client, A, (q) => q("select score from arrangement_versions where id = $1", [versionA]));
    expect(back.rows[0].score).toEqual(CHORALE_SATB_C);
  });

  it("outro usuário não vê nem altera dados privados", async () => {
    const seen = await as(client, B, async (q) => ({
      arr: (await q("select * from arrangements")).rowCount,
      ver: (await q("select * from arrangement_versions")).rowCount,
      rep: (await q("select * from validation_reports")).rowCount,
      upd: (await q("update arrangements set title = 'x' where id = $1", [arrangementA])).rowCount,
      del: (await q("delete from arrangements where id = $1", [arrangementA])).rowCount,
    }));
    expect(seen).toEqual({ arr: 0, ver: 0, rep: 0, upd: 0, del: 0 });
  });

  it("anônimo não vê dados privados", async () => {
    const r = await as(client, null, (q) => q("select * from arrangements"));
    expect(r.rowCount).toBe(0);
    await expect(as(client, null, (q) => q("insert into arrangements (user_id, title, formation) values ($1, 'x', 'SATB')", [A]))).rejects.toThrow();
  });

  it("não é possível criar versão no arranjo de outro usuário nem forjar o dono", async () => {
    await expect(
      as(client, B, (q) => q("insert into arrangement_versions (arrangement_id, version_number, schema_version, score) values ($1, 2, 1, '{}')", [arrangementA])),
    ).rejects.toThrow(/não pertence/);
    await expect(
      as(client, B, (q) => q("insert into arrangement_versions (arrangement_id, user_id, version_number, schema_version, score) values ($1, $2, 2, 1, '{}')", [arrangementA, A])),
    ).rejects.toThrow(/row-level security|não pertence/);
    await expect(
      as(client, B, (q) => q("insert into evaluations (version_id, project_id, rubric, source) values ($1, 'p', '{}', 'tutor')", [versionA])),
    ).rejects.toThrow(/não pertence/);
  });

  it("versões são imutáveis", async () => {
    const r = await as(client, A, (q) => q("update arrangement_versions set note = 'editada' where id = $1", [versionA]));
    expect(r.rowCount).toBe(0);
  });

  it("tentativas são evidência: o aluno cria e lê as suas, mas não edita nem apaga", async () => {
    const insert = (uid: string, owner: string) =>
      as(client, uid, (q) =>
        q(
          `insert into exercise_attempts (user_id, lesson_id, exercise_set_id, seed, answers, score, correct, total, passed, started_at)
           values ($1, 'vozes-claves-extensoes', 'ex-vozes', 42, '[]', 0.9, 9, 10, true, now() - interval '5 minutes') returning id`,
          [owner],
        ),
      );
    const r = await insert(A, A);
    expect(r.rowCount).toBe(1);
    await expect(insert(B, A)).rejects.toThrow(/row-level security/);
    const changes = await as(client, A, async (q) => ({
      upd: (await q("update exercise_attempts set passed = false")).rowCount,
      del: (await q("delete from exercise_attempts")).rowCount,
    }));
    expect(changes).toEqual({ upd: 0, del: 0 });
    expect((await as(client, B, (q) => q("select * from exercise_attempts"))).rowCount).toBe(0);
  });

  it("aceita arranjos e preferência na formação SSAA", async () => {
    const r = await as(client, A, async (q) => {
      await q("update profiles set preferred_formation = 'SSAA' where id = $1", [A]);
      const arr = await q("insert into arrangements (title, formation) values ('Vozes iguais', 'SSAA') returning formation");
      const p = await q("select preferred_formation from profiles where id = $1", [A]);
      await q("update profiles set preferred_formation = 'SATB' where id = $1", [A]);
      return { arr: arr.rows[0].formation, pref: p.rows[0].preferred_formation };
    });
    expect(r).toEqual({ arr: "SSAA", pref: "SSAA" });
  });

  it("restrições de integridade rejeitam dados inválidos", async () => {
    await expect(as(client, A, (q) => q("insert into arrangements (title, formation) values ('x', 'SSA')"))).rejects.toThrow(/check/);
    await expect(
      as(client, A, (q) =>
        q(
          `insert into exercise_attempts (lesson_id, exercise_set_id, seed, answers, score, correct, total, passed, started_at)
           values ('vozes-claves-extensoes', 'e', 1, '[]', 1.5, 1, 1, true, now())`,
        ),
      ),
    ).rejects.toThrow(/check/);
    await expect(
      as(client, A, (q) =>
        q(`insert into exercise_attempts (lesson_id, exercise_set_id, seed, answers, score, correct, total, passed, started_at)
           values ('licao-inexistente', 'e', 1, '[]', 1, 1, 1, true, now())`),
      ),
    ).rejects.toThrow(/foreign key/);
  });
});
