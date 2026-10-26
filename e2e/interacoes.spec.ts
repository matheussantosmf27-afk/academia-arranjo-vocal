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
    await quick.getByRole("group", { name: "Alternativas" }).getByRole("button").first().click();
    await expect(quick.getByRole("status")).toContainText(/Isso!|Quase\./);
  });

  test("escuta: rolo de piano acompanha as vozes selecionadas", async ({ page }) => {
    await page.goto("/licoes/texturas-vocais");
    const escuta = page.locator("section[aria-label^='Escuta']").first();
    await expect(escuta.getByRole("img", { name: /Rolo de piano/ })).toBeVisible();
    await escuta.getByRole("button", { name: "T", exact: true }).click();
    await expect(escuta.getByRole("button", { name: "T", exact: true })).toHaveAttribute("aria-pressed", "false");
  });
});
