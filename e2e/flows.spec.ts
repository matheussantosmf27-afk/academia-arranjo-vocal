import { expect, test } from "@playwright/test";

test("painel e navegação para o currículo @mobile", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Escreva para vozes reais." })).toBeVisible();
  await page.getByRole("link", { name: "Currículo" }).first().click();
  await expect(page.getByRole("heading", { name: /Nível 1/ })).toBeVisible();
  await expect(page.getByText("Vozes, claves e extensões: SATB e TTBB")).toBeVisible();
});

test("lição com pré-requisito não dominado bloqueia os exercícios", async ({ page }) => {
  await page.goto("/licoes/intervalos");
  await expect(page.getByText("Pré-requisitos ainda não dominados")).toBeVisible();
  await expect(page.getByText(/ficam disponíveis quando os pré-requisitos forem dominados/)).toBeVisible();
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
