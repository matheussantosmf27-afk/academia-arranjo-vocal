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

test("disciplina de grupo a cappella gospel: aulas, projeto e escuta por camada", async ({ page }) => {
  await page.goto("/disciplinas/s4-acp");
  await expect(page.getByRole("heading", { name: "Grupo Vocal A Cappella Gospel", level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: /Revezamento de solistas e dueto/ })).toBeVisible();
  await page.getByRole("link", { name: /Vocal band: riffs, baixo em ostinato e beatbox/ }).click();
  await expect(page.getByText("EST406 · Aula 3 de 6")).toBeVisible();
  await expect(page.locator(".score-surface svg").first()).toBeVisible();
  await page.goto("/projetos");
  await expect(page.locator(".card", { hasText: "Grupo a cappella gospel (TTBB)" })).toBeVisible();
});

test("disciplina de rearmonização: oito aulas, projeto e a mesma melodia rearmonizada", async ({ page }) => {
  await page.goto("/disciplinas/s4-rea");
  await expect(page.getByRole("heading", { name: "Rearmonização para Vozes", level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: /Substituto de trítono e dominantes estendidas/ })).toBeVisible();
  await page.getByRole("link", { name: /Dominantes secundárias, ii–V e dominantes em cadeia/ }).click();
  await expect(page.getByText("HAR402 · Aula 3 de 8")).toBeVisible();
  await expect(page.getByRole("table", { name: "Dominantes secundárias em Dó maior" })).toBeVisible();
  await expect(page.locator(".score-surface svg").first()).toBeVisible();
  await page.goto("/projetos");
  await expect(page.locator(".card", { hasText: "Rearmonização do segundo refrão (SATB)" })).toBeVisible();
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
  let earItems = 0;
  for (let i = 0; i < 30; i++) {
    const verificacao = page.locator("section[aria-labelledby='exercicios']");
    // comparação auditiva: só o player antes da resposta; a partitura aparece depois
    const ear = await verificacao.locator("legend", { hasText: "Ouça as duas versões" }).isVisible();
    if (ear) {
      earItems += 1;
      await expect(verificacao.getByText("Notação oculta até a resposta")).toBeVisible();
      await expect(verificacao.locator("fieldset .score-surface")).toHaveCount(0);
    }
    const option = verificacao.getByRole("group", { name: "Alternativas", exact: true }).getByRole("button").first();
    await option.click();
    await expect(verificacao.getByRole("status").filter({ hasText: /Correto\.|Ainda não\./ })).toBeVisible();
    const reveal = verificacao.getByRole("button", { name: "Mostrar a resposta" });
    if (await reveal.isVisible()) {
      // depois de um erro: dica sem a resposta, e a segunda chance antes de revelar
      await expect(page.getByText(/esta segunda escolha não muda a nota/)).toBeVisible();
      await reveal.click();
    }
    await expect(verificacao.getByRole("status").filter({ hasText: /Correto\.|Resposta destacada/ })).toBeVisible();
    if (ear) await expect(verificacao.locator("fieldset .score-surface")).toBeVisible();
    const next = page.getByRole("button", { name: /Próximo|Ver resultado/ });
    const label = await next.textContent();
    await next.click();
    if (label?.includes("Ver resultado")) break;
  }
  expect(earItems).toBe(2);
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

test("disciplina de contraponto vocal: oito aulas, retardos e projeto de descant", async ({ page }) => {
  await page.goto("/disciplinas/s3-ctp");
  await expect(page.getByRole("heading", { name: "Contraponto Vocal", level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: /Descant, quodlibet e melodias combinadas/ })).toBeVisible();
  await page.getByRole("link", { name: /Retardos: preparação, dissonância e resolução/ }).click();
  await expect(page.getByText("CTP301 · Aula 3 de 8")).toBeVisible();
  await expect(page.getByRole("table", { name: "Os retardos mais comuns (voz superior)" })).toBeVisible();
  await expect(page.locator(".score-surface svg").first()).toBeVisible();
  await page.goto("/projetos");
  await expect(page.locator(".card", { hasText: "Descant para um hino (SATB)" })).toBeVisible();
});

test("disciplina de vozes iguais: oito aulas, estúdio SSAA e projeto", async ({ page }) => {
  await page.goto("/disciplinas/s4-ssa");
  await expect(page.getByRole("heading", { name: "Vozes Iguais: Coro Feminino e Infantil (SSA/SSAA)", level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: /Coro infantil: tessitura, uníssono e duas vozes/ })).toBeVisible();
  await page.getByRole("link", { name: /O baixo sem baixo: a linha do Contralto II/ }).click();
  await expect(page.getByText("EST407 · Aula 4 de 8")).toBeVisible();
  await expect(page.locator(".score-surface svg").first()).toBeVisible();
  await page.goto("/projetos");
  await expect(page.locator(".card", { hasText: "Hino para coro feminino (SSAA)" })).toBeVisible();
});

test("estúdio SSAA com duas pautas em clave de sol @mobile", async ({ page }) => {
  await page.goto("/estudio?exemplo=exemplo-coral-ssaa-sol");
  await expect(page.locator(".score-surface svg")).toBeVisible();
  await expect(page.getByText("Coro feminino / vozes iguais (SSAA)")).toBeVisible();
});

test("disciplina de regência: oito aulas, padrões de regência e exemplo com anacruse", async ({ page }) => {
  await page.goto("/disciplinas/s4-reg");
  await expect(page.getByRole("heading", { name: "Regência Coral e Preparação de Ensaio", level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: /Adaptar ao grupo real: tonalidade, naipes faltando e divisões/ })).toBeVisible();
  await page.getByRole("link", { name: /Gesto básico: padrões, preparação, entrada e corte/ }).click();
  await expect(page.getByText("REG401 · Aula 1 de 8")).toBeVisible();
  await expect(page.getByRole("table", { name: "Padrões de regência (mão direita)" })).toBeVisible();
  await expect(page.locator(".score-surface svg").first()).toBeVisible();
});

test("revisão espaçada: aula concluída há três dias volta com itens novos e conta no perfil", async ({ page }) => {
  const done = new Date(Date.now() - 3 * 86_400_000).toISOString();
  await page.addInitScript((finishedAt) => {
    if (window.localStorage.getItem("aav:progress:v1")) return;
    const attempt = {
      id: "e2e-dominio",
      lessonId: "vozes-claves-extensoes",
      exerciseSetId: "ex-vozes",
      seed: 1,
      startedAt: finishedAt,
      finishedAt,
      answers: [],
      result: { score: 1, correct: 8, total: 8, passed: true, missingRequired: [], bySkill: {} },
    };
    window.localStorage.setItem("aav:progress:v1", JSON.stringify({ version: 1, attempts: [attempt], lessonsRead: [] }));
  }, done);
  await page.goto("/");
  const card = page.getByRole("region", { name: "Revisões espaçadas para hoje" });
  await expect(card.getByRole("link", { name: "Vozes, claves e extensões: SATB e TTBB" })).toBeVisible();
  await expect(card).toContainText("revisão atrasada há 2 dia(s)");
  await card.getByRole("link", { name: "Vozes, claves e extensões: SATB e TTBB" }).click();
  const revisao = page.locator("#revisao");
  await expect(revisao.getByRole("heading", { name: "Revisão espaçada", level: 3 })).toBeVisible();
  await revisao.getByRole("button", { name: "Iniciar revisão" }).click();
  for (let i = 0; i < 10; i++) {
    await revisao.getByRole("group", { name: "Alternativas", exact: true }).getByRole("button").first().click();
    await expect(revisao.getByRole("status").filter({ hasText: /Correto\.|Ainda não\./ })).toBeVisible();
    const reveal = revisao.getByRole("button", { name: "Mostrar a resposta" });
    if (await reveal.isVisible()) await reveal.click();
    const next = revisao.getByRole("button", { name: /Próximo|Ver resultado/ });
    const label = await next.textContent();
    await next.click();
    if (label?.includes("Ver resultado")) break;
  }
  await expect(revisao.getByText(/Retenção demonstrada|Revisão não aprovada/)).toBeVisible();
  await page.goto("/perfil");
  await expect(page.getByRole("heading", { name: "Competências em quatro dimensões" })).toBeVisible();
  await expect(page.getByText(/revisão aprovada|^revisão$/).first()).toBeVisible();
});
