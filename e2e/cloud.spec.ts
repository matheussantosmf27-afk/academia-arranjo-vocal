import { expect, test } from "@playwright/test";

/**
 * Fluxo com conta (Supabase Auth + banco com RLS). Requer o app construído com
 * NEXT_PUBLIC_SUPABASE_URL/NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY apontando para uma
 * stack local (`npx supabase start`) e E2E_SUPABASE=1.
 */
test.skip(!process.env.E2E_SUPABASE, "requer stack Supabase local");

const password = "senha-de-teste-123";

async function signUp(page: import("@playwright/test").Page, email: string) {
  await page.goto("/entrar");
  await page.getByRole("tab", { name: "Criar conta" }).click();
  await page.getByLabel("E-mail").fill(email);
  await page.getByLabel(/Senha/).fill(password);
  await page.getByRole("button", { name: "Criar conta" }).last().click();
  await expect(page.getByText(`Conectado como ${email}`)).toBeVisible();
}

test("conta: tentativa recorrigida no servidor, arranjo versionado e isolamento entre usuários", async ({ browser }) => {
  const stamp = Date.now();
  const a = await browser.newContext();
  const pa = await a.newPage();
  await signUp(pa, `aluno.a.${stamp}@exemplo.test`);

  // Tentativa de exercício registrada na conta
  await pa.goto("/licoes/vozes-claves-extensoes");
  await pa.getByRole("button", { name: "Iniciar tentativa" }).click();
  for (let i = 0; i < 30; i++) {
    const verificacao = pa.locator("section[aria-labelledby='exercicios']");
    await verificacao.getByRole("group", { name: "Alternativas", exact: true }).getByRole("button").first().click();
    await expect(verificacao.getByRole("status").filter({ hasText: /Correto\.|Ainda não\./ })).toBeVisible();
    const reveal = verificacao.getByRole("button", { name: "Mostrar a resposta" });
    if (await reveal.isVisible()) await reveal.click();
    const next = pa.getByRole("button", { name: /Próximo|Ver resultado/ });
    const label = await next.textContent();
    await next.click();
    if (label?.includes("Ver resultado")) break;
  }
  await expect(pa.getByText("Tentativa registrada na sua conta.")).toBeVisible();

  // Arranjo salvo na conta em duas versões
  await pa.goto("/estudio");
  await pa.getByLabel("Título").fill(`Coral do aluno A ${stamp}`);
  await pa.getByRole("button", { name: "Salvar na conta" }).click();
  await expect(pa.getByText(/Versão 1 salva na sua conta/)).toBeVisible();
  await pa.getByRole("button", { name: "Subir um grau" }).click();
  await pa.getByRole("button", { name: "Salvar nova versão" }).click();
  await expect(pa.getByText(/Versão 2 salva na sua conta/)).toBeVisible();

  // Reabre a partir da biblioteca: última versão (soprano em A4)
  await pa.goto("/projetos");
  const row = pa.locator("li").filter({ hasText: `Coral do aluno A ${stamp}` });
  await expect(row).toContainText("2 versão(ões)");
  await row.getByRole("link", { name: "Abrir" }).click();
  await expect(pa.getByText(/Arranjo da conta aberto \(versão 2\)/)).toBeVisible();
  await expect(pa.getByText(/Lá4 \(MIDI 69\)/)).toBeVisible();
  const arrangementUrl = pa.url();

  // Usuário B não enxerga nem abre o arranjo de A
  const b = await browser.newContext();
  const pb = await b.newPage();
  await signUp(pb, `aluno.b.${stamp}@exemplo.test`);
  await pb.goto("/projetos");
  await expect(pb.getByText("Nenhum arranjo salvo na conta")).toBeVisible();
  await pb.goto(arrangementUrl.replace(/^https?:\/\/[^/]+/, ""));
  await expect(pb.getByText("Arranjo não encontrado na sua conta.")).toBeVisible();
  // e o progresso de A não aparece para B
  await pb.goto("/perfil");
  await expect(pb.getByText("Nenhuma tentativa ainda.")).toBeVisible();

  await a.close();
  await b.close();
});
