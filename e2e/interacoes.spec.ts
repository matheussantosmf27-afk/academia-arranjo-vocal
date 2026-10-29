import { expect, test } from "@playwright/test";

test.describe("interações de aprendizagem", () => {
  test("início: mesa de vozes liga e desliga naipes e mostra o rolo de piano", async ({ page }) => {
    await page.goto("/");
    const soprano = page.getByRole("group", { name: "Vozes do coral" }).getByRole("button", { name: /Soprano/ });
    await expect(soprano).toHaveAttribute("aria-pressed", "true");
    await soprano.click();
    await expect(soprano).toHaveAttribute("aria-pressed", "false");
    await expect(page.getByRole("img", { name: /Rolo de piano/ }).first()).toBeVisible();
    await expect(page.getByText("Nível 1")).toBeVisible();
  });

  test("aula: pergunta rápida com resposta comentada e guia de seções", async ({ page }) => {
    await page.goto("/licoes/oficio-do-arranjador");
    await expect(page.getByRole("navigation", { name: "Seções da aula" })).toBeVisible();
    const quick = page.getByRole("complementary", { name: "Pare e pense" }).first();
    await quick.locator("fieldset button[aria-pressed]").first().click();
    // acerto mostra a explicação; erro mostra uma dica e a segunda chance, sem revelar a resposta
    await expect(quick.getByRole("status")).toContainText(/Correto\.|Ainda não\./);
  });

  test("escuta: rolo de piano acompanha as vozes selecionadas", async ({ page }) => {
    await page.goto("/licoes/texturas-vocais");
    const escuta = page.locator("section[aria-label^='Escuta']").first();
    await expect(escuta.getByRole("img", { name: /Rolo de piano/ })).toBeVisible();
    await escuta.getByRole("button", { name: "T", exact: true }).click();
    await expect(escuta.getByRole("button", { name: "T", exact: true })).toHaveAttribute("aria-pressed", "false");
  });

  test("exercício independente: dicas uma a uma e solução só depois de tentar", async ({ page }) => {
    await page.goto("/licoes/cadencias");
    const ex = page.locator("section", { has: page.getByText("Exercício independente") }).last();
    await expect(ex.getByRole("link", { name: "Abrir no laboratório de escrita" })).toHaveAttribute("href", /exemplo=exd-desafio-cad$/);
    await expect(ex.getByText("Dicas (0 de 3 abertas)")).toBeVisible();
    await ex.getByRole("button", { name: "Preciso de uma dica" }).click();
    await expect(ex.getByText("Dicas (1 de 3 abertas)")).toBeVisible();
    const show = ex.getByRole("button", { name: "Mostrar a solução comentada" });
    await expect(show).toBeDisabled();
    await expect(ex.getByRole("heading", { name: "Solução comentada" })).toHaveCount(0);
    await ex.getByRole("checkbox").check();
    await show.click();
    await expect(ex.getByRole("heading", { name: "Solução comentada" })).toBeVisible();
    await expect(ex.getByText("Exemplo correto")).toBeVisible();
  });
});
