import { expect, test } from "@playwright/test";

test("projeto prático: justificar, avaliar por rubrica, registrar rascunho e comparar versões", async ({ page }) => {
  await page.goto("/projetos");
  await page.getByRole("heading", { name: "Trabalhos dos semestres" }).waitFor();
  await page.locator(".card", { hasText: "Hino a quatro vozes" }).getByRole("link", { name: "Abrir projeto" }).click();
  await expect(page.getByRole("heading", { name: "Hino a quatro vozes (SATB)" })).toBeVisible();
  await expect(page.getByText(/A melodia dada está no Soprano/)).toBeVisible();

  await page.getByText(/Justificativas \(0\/3\)/).click();
  await page.getByLabel(/Que cadência você escolheu/).fill("Semicadência no fim da primeira frase e autêntica no fim da segunda, seguindo o texto.");
  await expect(page.getByText(/Justificativas \(1\/3\)/)).toBeVisible();

  await page.getByRole("button", { name: "Avaliar com a rubrica" }).click();
  const table = page.locator("table", { has: page.getByRole("columnheader", { name: "Critério" }) });
  await expect(table.locator("tbody tr")).toHaveCount(9);
  await expect(table).toContainText("Vozes sem nenhuma nota");
  await expect(table).toContainText("Melodia dada preservada");

  // rascunho: só depois do checklist de escuta completo
  const registrar = page.getByRole("button", { name: "Registrar rascunho" });
  await expect(registrar).toBeDisabled();
  for (const label of ["Ouvi cada voz isolada no reprodutor", "Cantei (ou solfejei) as vozes internas", "Ouvi o arranjo inteiro no andamento real", "Revisei letra, respirações e dinâmicas em todas as vozes"]) {
    await page.getByLabel(label).check();
  }
  await registrar.click();
  await expect(page.getByText("Rascunho 1 registrado.", { exact: false })).toBeVisible();

  // edição (contralto ganha uma nota) e comparação com o rascunho, já selecionado
  await page.locator('[id="vf-A-1"]').click();
  await page.keyboard.press("r"); // pausa → nota
  await expect(page.getByLabel("Versão anterior para comparar")).not.toHaveValue("");
  await page.getByRole("button", { name: "Comparar", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Comparação com a versão anterior" })).toBeVisible();
});
