import { expect, test } from "@playwright/test";
import { resolveTask } from "../src/content/tasks";
import { buildTransferTask } from "../src/domain/production/transfer";
import { TRANSFER_MELODIES } from "../src/content/transfer-melodies";
import { getCumulativeMelody } from "../src/content/cumulative";

const LESSON_TASK = "harmonizacao-satb:harmonize-uma-frase-em-mi-maior";

test.describe("evolução pedagógica", () => {
  test("tarefa da aula: conferir, reprovar, dica registrada e solução só depois da conferência", async ({ page }) => {
    expect(resolveTask(LESSON_TASK)).toBeDefined();
    await page.goto("/licoes/harmonizacao-satb");
    const link = page.getByRole("link", { name: "Resolver no laboratório (correção automática)" }).first();
    await expect(link).toBeVisible();
    await expect(page.getByText("Ainda não conferida.").first()).toBeVisible();
    await page.goto(`/estudio?tarefa=${encodeURIComponent(LESSON_TASK)}`);
    const panel = page.getByTestId("task-panel");
    await expect(panel).toBeVisible();
    await expect(panel.getByRole("button", { name: "Ver solução de referência" })).toHaveCount(0);
    await expect(panel.getByText("A solução de referência fica disponível depois da primeira conferência.")).toBeVisible();
    await panel.getByRole("button", { name: "Preciso de uma dica" }).click();
    await expect(panel.getByText("(registrada: Resolvido depois de uma dica)")).toBeVisible();
    await panel.getByRole("button", { name: "Conferir", exact: true }).click();
    const result = page.getByTestId("task-result");
    await expect(result.getByRole("heading", { name: "Ainda não: veja o que falta" })).toBeVisible();
    await expect(result.getByText("falta").first()).toBeVisible();
    await expect(panel.getByText("Em andamento · 1 conferência(s)")).toBeVisible();
    page.once("dialog", (d) => void d.accept());
    await panel.getByRole("button", { name: "Ver solução de referência" }).click();
    await expect(panel.getByRole("heading", { name: "Solução de referência" })).toBeVisible();
    await expect(panel.getByText("(registrada: Resolvido depois de ver a solução)")).toBeVisible();
    // a sessão sobrevive a recarregar
    await page.reload();
    await expect(page.getByTestId("task-panel").getByText("Em andamento · 1 conferência(s)")).toBeVisible();
    // o painel registra a tentativa
    await page.goto("/perfil");
    await expect(page.getByTestId("development-panel")).toContainText("Tarefas das aulas");
  });

  test("transferência: acerto autônomo conta no painel e no histórico da avaliação", async ({ page }) => {
    const task = buildTransferTask("harmonizar", TRANSFER_MELODIES[3]!, 777)!;
    await page.goto("/avaliacao");
    await expect(page.getByTestId("hist-harmonizar")).toHaveText("Você ainda não fez nenhuma situação deste tipo.");
    await page.evaluate(
      ([id, score]) => localStorage.setItem(`aav:tarefa:${id}`, JSON.stringify({ startedAt: new Date(Date.now() - 600000).toISOString(), log: { hintsOpened: 0, demoOpened: false, solutionOpened: false }, failed: 0, checked: 0, solvedAt: null, score })),
      [task.id, task.solution!.score!] as const,
    );
    await page.goto(`/estudio?tarefa=${encodeURIComponent(task.id)}`);
    await expect(page.getByText("Tarefa retomada de onde você parou.")).toBeVisible();
    const panel = page.getByTestId("task-panel");
    await panel.getByRole("button", { name: "Conferir", exact: true }).click();
    await expect(page.getByTestId("task-result").getByRole("heading", { name: "Todos os critérios atendidos" })).toBeVisible();
    await expect(panel.getByText("Resolvida · resolvido sem ajuda")).toBeVisible();
    await page.goto("/avaliacao");
    await expect(page.getByTestId("hist-harmonizar")).toContainText("1 resolvida(s), 1 sem nenhuma ajuda");
    await page.goto("/perfil");
    const dev = page.getByTestId("development-panel");
    await expect(dev.getByRole("row", { name: /Transferência e testes/ })).toContainText("100%");
  });

  test("nova situação gera tarefa inédita no laboratório", async ({ page }) => {
    await page.goto("/avaliacao");
    await page.locator("section", { hasText: "Corrigir uma partitura com erros" }).getByRole("button", { name: "Nova situação" }).click();
    await expect(page).toHaveURL(/\/estudio\?tarefa=transf%3Acorrigir/);
    await expect(page.getByTestId("task-panel")).toContainText("Corrigir uma partitura com erros");
  });

  test("projeto cumulativo: análise conferida, etapa concluída e versão guardada", async ({ page }) => {
    await page.goto("/meu-arranjo");
    await page.locator("section", { hasText: "Santo! Santo! Santo!" }).getByRole("button", { name: "Começar com esta melodia" }).click();
    await expect(page.getByText("etapa atual")).toBeVisible();
    await page.getByRole("link", { name: "Continuar no laboratório" }).click();
    const panel = page.getByTestId("cumulative-panel");
    await expect(panel.getByRole("heading", { name: "Etapa 1 de 6: Análise da melodia" })).toBeVisible();
    const concluir = panel.getByRole("button", { name: "Concluir etapa e guardar versão" });
    await expect(concluir).toBeDisabled();
    await panel.getByLabel(/Tonalidade/).fill("G");
    await panel.getByRole("button", { name: "Conferir etapa" }).click();
    await expect(panel.getByText(/A tonalidade não confere/)).toBeVisible();
    const mel = getCumulativeMelody("santo-santo-santo")!.score;
    const notes = mel.parts[0]!.events.flatMap((e) => (e.kind === "note" ? [e.pitch] : []));
    const midi = (p: (typeof notes)[number]) => p.octave * 12 + [0, 2, 4, 5, 7, 9, 11]["CDEFGAB".indexOf(p.step)]! + p.alter;
    const name = (p: (typeof notes)[number]) => `${p.step}${p.alter > 0 ? "#" : p.alter < 0 ? "b" : ""}${p.octave}`;
    const sorted = [...notes].sort((a, b) => midi(a) - midi(b));
    await panel.getByLabel(/Tonalidade/).fill("D");
    await panel.getByLabel(/Nota mais grave/).fill(name(sorted[0]!));
    await panel.getByLabel(/Nota mais aguda/).fill(name(sorted[sorted.length - 1]!));
    await panel.getByLabel(/Frases: onde terminam/).fill("Quatro frases; a primeira termina na dominante, a última em cadência autêntica.");
    await panel.getByLabel(/Clímax/).fill("Na nota mais aguda da terceira frase.");
    await panel.getByRole("button", { name: "Conferir etapa" }).click();
    await expect(concluir).toBeEnabled();
    await concluir.click();
    await expect(panel.getByRole("heading", { name: "Etapa 2 de 6: Harmonização (baixo)" })).toBeVisible();
    await page.goto("/meu-arranjo");
    await expect(page.getByText(/concluída em/)).toBeVisible();
    await expect(page.getByRole("heading", { name: "Versões (1)" })).toBeVisible();
  });

  test("estudo: perfil inicial salvo e pré-teste com cinco situações fixas", async ({ page }) => {
    await page.goto("/estudo");
    await page.getByRole("button", { name: "Salvar perfil" }).click();
    await expect(page.locator("form").getByRole("alert")).toHaveText("Responda todas as perguntas.");
    for (const fs of await page.locator("fieldset").all()) await fs.getByRole("radio").first().check();
    await page.getByRole("button", { name: "Salvar perfil" }).click();
    await expect(page.getByRole("status")).toContainText("Perfil salvo neste navegador");
    const pre = page.locator("section", { has: page.getByRole("heading", { name: "2. Pré-teste" }) });
    await expect(pre.getByRole("link", { name: "Começar" })).toHaveCount(5);
    await pre.getByRole("link", { name: "Começar" }).first().click();
    await expect(page.getByTestId("task-panel")).toContainText("Pré-teste");
  });

  test("avaliação humana: exige todos os critérios e registra o parecer", async ({ page }) => {
    await page.goto("/projetos");
    await page.locator(".card", { hasText: "Hino a quatro vozes" }).getByRole("link", { name: "Abrir projeto" }).click();
    const box = page.getByTestId("human-eval");
    await box.getByRole("button", { name: "Registrar uma avaliação humana" }).click();
    await box.getByRole("button", { name: "Registrar avaliação" }).click();
    await expect(box.getByRole("alert")).toContainText("Informe o nome de quem avaliou.");
    await box.getByLabel("Nome de quem avalia").fill("Profa. Teste");
    for (const fs of await box.locator("fieldset").all()) await fs.getByRole("radio").nth(2).check();
    await box.getByLabel(/Comentário geral/).fill("Condução segura; desenvolver mais o contracanto.");
    await box.getByRole("button", { name: "Registrar avaliação" }).click();
    await expect(box.getByText("Avaliação registrada neste navegador.")).toBeVisible();
    await expect(box.getByText("1 avaliação(ões) registrada(s)")).toBeVisible();
  });
});
