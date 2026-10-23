import { writeFileSync } from "node:fs";
import { catalogSeedSql } from "../src/lib/db/catalog";

writeFileSync(new URL("../supabase/seed/catalog.sql", import.meta.url), catalogSeedSql());
console.log("supabase/seed/catalog.sql atualizado.");
