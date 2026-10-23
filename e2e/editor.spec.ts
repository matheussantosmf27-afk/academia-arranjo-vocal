import { expect, test } from "@playwright/test";

test.describe("editor (etapa 4)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/estudio");
    await expect(page.locator(".score-surface svg")).toBeVisible();
  });

  test("dividir e juntar pelo teclado, com desfazer", async ({ page }) => {
    await page.locator('[id="vf-S-13"]').click(); // semibreve final
    await page.keyboard.press("/");
    await expect(page.getByText("Evento dividido em dois.")).toBeVisible();
    await expect(page.getByText(/Dó5 \(MIDI 72\) · mínima/)).toBeVisible();
    await page.keyboard.press("j");
    await expect(page.getByText(/Dó5 \(MIDI 72\) · semibreve/)).toBeVisible();
    await page.keyboard.press("Control+z");
    await expect(page.getByText(/Dó5 \(MIDI 72\) · mínima/)).toBeVisible();
  });

  test("selecionar trecho, copiar e colar em outra voz", async ({ page }) => {
    await page.locator('[id="vf-S-1"]').click();
    await page.keyboard.press("Shift+ArrowRight");
    await page.keyboard.press("Shift+ArrowRight");
    await expect(page.getByText("3 eventos selecionados")).toBeVisible();
    await page.keyboard.press("Control+c");
    await expect(page.getByText("3 evento(s) copiado(s).")).toBeVisible();
    await page.locator('[id="vf-T-5"]').click();
    await page.getByRole("button", { name: /Colar aqui/ }).click();
    await expect(page.getByText(/colado\(s\) a partir da seleção/)).toBeVisible();
    // o tenor recebeu G4 F4 G4 (agora com diagnósticos do motor)
    await page.getByText("Lista de eventos").click();
    await page.getByRole("tab", { name: "Tenor" }).click();
    const rows = page.locator("tbody tr");
    await expect(rows.nth(4)).toContainText("G4");
    await expect(rows.nth(5)).toContainText("F4");
  });

  test("articulação e dinâmica aparecem na partitura", async ({ page }) => {
    await page.locator('[id="vf-S-1"]').click();
    await page.getByRole("button", { name: "fermata" }).click();
    await page.getByLabel("Dinâmica").selectOption("mf");
    await expect(page.getByRole("button", { name: "fermata" })).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".score-surface svg text", { hasText: "mf" })).toHaveCount(1);
  });

  test("trocar compasso e transpor a tonalidade", async ({ page }) => {
    await page.getByText("Propriedades da partitura").click();
    await page.getByLabel("Fórmula de compasso").selectOption("3/4");
    await expect(page.getByText(/Compasso alterado para 3\/4/)).toBeVisible();
    await expect(page.getByText("6 compassos")).toBeVisible();
    await page.getByLabel("Nova tonalidade").selectOption("D");
    await page.getByRole("button", { name: "Aplicar" }).first().click();
    await expect(page.getByText("Transposto para Ré maior.")).toBeVisible();
    await expect(page.getByText(/Lá4 \(MIDI 69\)/)).toBeVisible(); // G4 → A4 no soprano
  });
});
