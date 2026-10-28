import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const PAGES = [
  { path: "/", ready: "h1" },
  { path: "/curriculo", ready: "h1" },
  { path: "/licoes/intervalos", ready: "h1" },
  { path: "/licoes/oficio-do-arranjador", ready: "h1" },
  { path: "/disciplinas/s1-arv", ready: "h1" },
  { path: "/licoes/escrita-em-bloco", ready: "h1" },
  { path: "/disciplinas/s4-qtm", ready: "h1" },
  { path: "/licoes/quarteto-masculino", ready: "h1" },
  { path: "/disciplinas/s4-acp", ready: "h1" },
  { path: "/licoes/acappella-vocal-band", ready: "h1" },
  { path: "/disciplinas/s4-rea", ready: "h1" },
  { path: "/licoes/rearm-dominantes", ready: "h1" },
  { path: "/disciplinas/s3-ctp", ready: "h1" },
  { path: "/licoes/cp-quarta-especie", ready: "h1" },
  { path: "/estudio", ready: ".score-surface svg" },
  { path: "/laboratorio", ready: "h1" },
  { path: "/projetos", ready: "h1" },
  { path: "/perfil", ready: "h1" },
  { path: "/entrar", ready: "h1" },
];

test.describe("acessibilidade (axe, WCAG 2.1 AA)", () => {
  for (const { path, ready } of PAGES) {
    test(`sem violações em ${path}`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator(ready).first()).toBeVisible();
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`);
      expect(summary).toEqual([]);
    });
  }

  test("cabeçalhos de segurança presentes", async ({ request }) => {
    const res = await request.get("/");
    const h = res.headers();
    expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(h["x-content-type-options"]).toBe("nosniff");
    expect(h["x-frame-options"]).toBe("DENY");
    expect(h["x-powered-by"]).toBeUndefined();
  });
});
