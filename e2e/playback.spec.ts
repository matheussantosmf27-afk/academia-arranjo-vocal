import { expect, test } from "@playwright/test";

test.describe("reprodução (etapa 5)", () => {
  test("tocar, cursor sincronizado, pausar, continuar e parar", async ({ page }) => {
    await page.goto("/estudio");
    await expect(page.locator(".score-surface svg")).toBeVisible();
    await page.getByRole("button", { name: /▶ Tocar/ }).click();
    await expect(page.getByRole("button", { name: /Pausar/ })).toBeVisible();
    const cursor = page.locator(".play-cursor");
    await expect(cursor).toBeVisible();
    const x1 = await cursor.evaluate((el) => (el as HTMLElement).style.left);
    await page.waitForTimeout(1800);
    const x2 = await cursor.evaluate((el) => (el as HTMLElement).style.left);
    expect(x2).not.toBe(x1); // o cursor avança com o áudio
    await page.getByRole("button", { name: /Pausar/ }).click();
    await expect(page.getByRole("button", { name: /Continuar/ })).toBeVisible();
    await page.getByRole("button", { name: /Continuar/ }).click();
    await page.getByRole("button", { name: /Parar/ }).click();
    await expect(page.getByRole("button", { name: /▶ Tocar/ })).toBeVisible();
    await expect(cursor).toHaveCount(0);
  });

  test("tocar da seleção e trecho em loop com metrônomo", async ({ page }) => {
    await page.goto("/estudio");
    await page.locator('[id="vf-S-9"]').click(); // compasso 3
    await page.getByText("Opções de estudo").click();
    await page.getByLabel("Metrônomo").check();
    await page.getByLabel(/Repetir trecho/).check();
    await page.getByLabel("Primeiro compasso do trecho").fill("3");
    await page.getByLabel("Último compasso do trecho").fill("3");
    await page.getByRole("button", { name: /Da seleção/ }).click();
    await expect(page.getByRole("button", { name: /Pausar/ })).toBeVisible();
    // um compasso a ♩=72 dura ~3,3 s; após 4 s o loop deve seguir tocando
    await page.waitForTimeout(4000);
    await expect(page.getByRole("button", { name: /Pausar/ })).toBeVisible();
    await page.getByRole("button", { name: /Parar/ }).click();
  });
});
