import { expect, test } from "@playwright/test";

test("início e navegação para a grade curricular @mobile", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Aprenda a escrever, estruturar e criar arranjos vocais." })).toBeVisible();
  await page.getByRole("link", { name: "Ver a grade curricular" }).click();
  await expect(page.getByRole("heading", { name: /1º semestre — Fundamentos do arranjo vocal/ })).toBeVisible();
  await expect(page.getByText("O ofício do arranjador vocal").first()).toBeVisible();
});

test("página da disciplina com ementa, aulas e bibliografia", async ({ page }) => {
  await page.goto("/curriculo");
  await page.getByRole("link", { name: /ARV101 Introdução ao Arranjo Vocal/ }).click();
  await expect(page.getByRole("heading", { name: "Introdução ao Arranjo Vocal", level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Ementa" })).toBeVisible();
  await expect(page.getByRole("link", { name: /O processo de arranjo, passo a passo/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Bibliografia e escuta recomendadas" })).toBeVisible();
});

test("disciplina de quarteto masculino: aulas, projeto e aula com escuta por papel", async ({ page }) => {
  await page.goto("/disciplinas/s4-qtm");
  await expect(page.getByRole("heading", { name: "Quarteto Masculino (TTBB)", level: 1 })).toBeVisible();
  for (const title of ["O quarteto masculino: lead, tenor, barítono e baixo", "Modulação de meio tom e finais de quarteto"]) {
    await expect(page.getByRole("link", { name: new RegExp(title) })).toBeVisible();
  }
  await page.getByRole("link", { name: /O quarteto masculino: lead, tenor, barítono e baixo/ }).click();
  await expect(page.getByText("EST405 · Aula 1 de 6")).toBeVisible();
  await expect(page.getByRole("table", { name: "Os papéis no quarteto masculino" })).toBeVisible();
  await expect(page.locator(".score-surface svg").first()).toBeVisible();
  await page.goto("/projetos");
  await expect(page.locator(".card", { hasText: "Quarteto gospel (TTBB)" })).toBeVisible();
});

test("aula com pré-requisito não concluído bloqueia a verificação", async ({ page }) => {
  await page.goto("/licoes/processo-de-arranjo");
  await expect(page.getByText("ARV101 · Aula 2 de 3")).toBeVisible();
  await expect(page.getByText("Aulas pré-requisito ainda não concluídas")).toBeVisible();
  await expect(page.getByText(/ficam disponíveis quando as aulas pré-requisito forem concluídas/)).toBeVisible();
});

test("tentativa completa de exercícios com feedback e registro no perfil", async ({ page }) => {
  await page.goto("/licoes/vozes-claves-extensoes");
  // exemplos renderizados em notação real (SVG do VexFlow)
  await expect(page.locator(".score-surface svg").first()).toBeVisible();
  await page.getByRole("button", { name: "Iniciar tentativa" }).click();
  for (let i = 0; i < 30; i++) {
    const option = page.locator("fieldset button[aria-pressed]").first();
    await option.click();
    await expect(page.getByRole("status").filter({ hasText: /Correto\.|Ainda não\./ })).toBeVisible();
    const next = page.getByRole("button", { name: /Próximo|Ver resultado/ });
    const label = await next.textContent();
    await next.click();
    if (label?.includes("Ver resultado")) break;
  }
  await expect(page.getByRole("heading", { name: "Resultado" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Nova tentativa" })).toBeVisible();
  await page.goto("/perfil");
  await expect(page.getByRole("cell", { name: "Vozes, claves e extensões: SATB e TTBB" })).toBeVisible();
});

test("estúdio: selecionar, editar, desfazer, salvar e reabrir", async ({ page }) => {
  await page.goto("/estudio");
  const svg = page.locator(".score-surface svg");
  await expect(svg).toBeVisible();
  await expect(page.getByText("Nenhum diagnóstico")).toBeVisible();
  // a primeira nota do soprano vem selecionada: G4 → sobe um grau (A4)
  await expect(page.getByText(/Sol4 \(MIDI 67\)/)).toBeVisible();
  await page.getByRole("button", { name: "Subir um grau" }).click();
  await expect(page.getByText(/Lá4 \(MIDI 69\)/)).toBeVisible();
  await page.getByRole("button", { name: /Desfazer/ }).click();
  await expect(page.getByText(/Sol4 \(MIDI 67\)/)).toBeVisible();
  // clique na partitura seleciona outra nota (último evento do baixo)
  await page.locator('[id="vf-B-13"]').click();
  await expect(page.getByText(/Baixo · compasso 4, tempo 1/)).toBeVisible();
  // teclado: transforma em pausa → o motor detecta mudanças estruturais/harmônicas
  await page.keyboard.press("r");
  await expect(page.getByText("Nota convertida em pausa.")).toBeVisible();
  await page.getByLabel("Título").fill("Meu coral de teste");
  await page.getByRole("button", { name: "Salvar rascunho" }).click();
  await expect(page.getByText(/Rascunho salvo neste navegador/)).toBeVisible();
  await page.goto("/projetos");
  await expect(page.getByText("Meu coral de teste")).toBeVisible();
  await page.getByRole("link", { name: "Abrir", exact: true }).first().click();
  await expect(page.getByLabel("Título")).toHaveValue("Meu coral de teste");
  await page.locator('[id="vf-B-13"]').click();
  await expect(page.getByText(/Pausa · semibreve/)).toBeVisible();
});

test("estúdio: diagnósticos de paralelas reproduzíveis e estilo", async ({ page }) => {
  await page.goto("/estudio?exemplo=exemplo-paralelas-satb");
  const first = page.locator("summary").filter({ hasText: "Quintas ou oitavas paralelas" }).first();
  await expect(first).toContainText("Erro");
  await first.click();
  await expect(page.getByText(/Quintas paralelas entre Soprano e (Baixo|Tenor)/).first()).toBeVisible();
  await page.getByLabel("Estilo de referência").selectOption("popular-a-cappella");
  await expect(page.locator("summary").filter({ hasText: "Quintas ou oitavas paralelas" }).first()).toContainText("Sugestão");
});

test("estúdio TTBB com clave de sol oitavada @mobile", async ({ page }) => {
  await page.goto("/estudio?exemplo=exemplo-coral-ttbb-sol");
  await expect(page.locator(".score-surface svg")).toBeVisible();
  await expect(page.getByText("Coro / quarteto masculino (TTBB)")).toBeVisible();
  await expect(page.getByText(/Escrita em clave de sol oitavada \(8vb\): D5/)).toBeVisible();
});

test("aula de baixo dado e canto dado e exercícios em branco no laboratório", async ({ page }) => {
  await page.goto("/disciplinas/s2-hmz");
  await expect(page.getByRole("link", { name: /Baixo dado e canto dado: o treino clássico de harmonia/ })).toBeVisible();
  await page.goto("/estudio?exemplo=exa-exercicio-baixo-dado");
  await expect(page.locator(".score-surface svg")).toBeVisible();
  await expect(page.getByLabel("Título")).toHaveValue("Exercício: baixo dado (escreva soprano, contralto e tenor)");
});
