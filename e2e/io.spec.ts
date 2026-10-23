import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

test.describe("exportação e importação (etapa 9)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/estudio");
    await expect(page.locator(".score-surface svg")).toBeVisible();
  });

  test("PDF real é gerado e baixado", async ({ page }) => {
    const download = page.waitForEvent("download");
    await page.getByLabel("Exportar partitura").selectOption("pdf");
    const file = await download;
    expect(file.suggestedFilename()).toMatch(/\.pdf$/);
    const bytes = readFileSync((await file.path())!);
    expect(bytes.subarray(0, 5).toString()).toBe("%PDF-");
    expect(bytes.length).toBeGreaterThan(10_000);
    await expect(page.getByRole("status")).toContainText("Arquivo PDF exportado.");
  });

  test("MusicXML exportado volta ao Estúdio com as mesmas notas", async ({ page }) => {
    const download = page.waitForEvent("download");
    await page.getByLabel("Exportar partitura").selectOption("musicxml");
    const file = await download;
    const xml = readFileSync((await file.path())!, "utf8");
    expect(xml).toContain("<score-partwise");
    await page.getByTestId("importar-arquivo").setInputFiles({ name: "coral.musicxml", mimeType: "application/xml", buffer: Buffer.from(xml) });
    await expect(page.getByRole("status")).toContainText(/"coral.musicxml" importado \(SATB, 4 compassos\)/);
    await page.getByText("Lista de eventos").click();
    await expect(page.locator("tbody tr").first()).toContainText("G4");
  });

  test("MIDI exportado e reimportado", async ({ page }) => {
    const download = page.waitForEvent("download");
    await page.getByLabel("Exportar partitura").selectOption("midi");
    const file = await download;
    const bytes = readFileSync((await file.path())!);
    expect(bytes.subarray(0, 4).toString()).toBe("MThd");
    await page.getByTestId("importar-arquivo").setInputFiles({ name: "coral.mid", mimeType: "audio/midi", buffer: bytes });
    await expect(page.getByRole("status")).toContainText(/"coral.mid" importado \(SATB/);
  });

  test("arquivo inválido mostra erro sem alterar a partitura", async ({ page }) => {
    await page.getByTestId("importar-arquivo").setInputFiles({ name: "x.musicxml", mimeType: "application/xml", buffer: Buffer.from("<score-timewise/>") });
    await expect(page.getByRole("status")).toContainText(/Não foi possível importar "x.musicxml"/);
  });
});
