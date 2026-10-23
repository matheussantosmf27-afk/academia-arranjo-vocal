import { readFileSync } from "node:fs";
import { Client } from "pg";

/**
 * Banco descartável para testes de integração: cria um database novo num
 * Postgres local, aplica o shim do Supabase, as migrations, os grants padrão e o catálogo.
 * URL do servidor administrativo: AAV_TEST_DATABASE_URL (ex.: postgres://postgres@localhost:54329/postgres).
 */
export const ADMIN_URL = process.env.AAV_TEST_DATABASE_URL;

const file = (p: string) => readFileSync(new URL(`../../${p}`, import.meta.url), "utf8");

export async function createTestDatabase(): Promise<{ client: Client; drop: () => Promise<void> }> {
  if (!ADMIN_URL) throw new Error("AAV_TEST_DATABASE_URL não definida");
  const name = `aav_test_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
  const admin = new Client({ connectionString: ADMIN_URL });
  await admin.connect();
  await admin.query(`create database ${name}`);
  const url = new URL(ADMIN_URL);
  url.pathname = `/${name}`;
  const client = new Client({ connectionString: url.toString() });
  await client.connect();
  for (const f of [
    "supabase/tests/supabase-shim.sql",
    "supabase/migrations/20261022170550_esquema_inicial.sql",
    "supabase/migrations/20261022170558_indices_fk.sql",
    "supabase/tests/grants.sql", // no Supabase estes privilégios já existem quando as funções são criadas
    "supabase/migrations/20261022170818_revoga_rpc_handle_new_user.sql",
    "supabase/migrations/20261023124616_tutor_interactions.sql",
    "supabase/seed/catalog.sql",
  ]) {
    await client.query(file(f));
  }
  return {
    client,
    drop: async () => {
      await client.end();
      await admin.query(`drop database ${name} with (force)`);
      await admin.end();
    },
  };
}

/** Executa SQL como um usuário (role authenticated + claims JWT) ou anônimo, numa transação revertida. */
export async function as<T>(client: Client, userId: string | null, fn: (q: Client["query"]) => Promise<T>): Promise<T> {
  await client.query("begin");
  try {
    await client.query(`set local role ${userId ? "authenticated" : "anon"}`);
    await client.query(`select set_config('request.jwt.claims', $1, true)`, [JSON.stringify(userId ? { sub: userId, role: "authenticated" } : { role: "anon" })]);
    const result = await fn(client.query.bind(client) as Client["query"]);
    await client.query("commit");
    return result;
  } catch (e) {
    await client.query("rollback");
    throw e;
  }
}
