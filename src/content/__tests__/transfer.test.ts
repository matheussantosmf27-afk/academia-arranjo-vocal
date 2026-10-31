import { describe, expect, it } from "vitest";
import { REPERTORIO } from "@/content/repertorio";
import { POST_TEST_SEED, PRE_TEST_SEED, isTestTask, newTransferTaskId, postTest, preTest, publicTask, resolveTask } from "@/content/tasks";
import { LESSON_TASKS } from "@/content/production-tasks";
import { TRANSFER_MELODIES } from "@/content/transfer-melodies";
import { checkTask } from "@/domain/production/task";
import { TRANSFER_KINDS, buildTransferTask, generateTransferTask, parseTransferId } from "@/domain/production/transfer";
import { voiceTimeline } from "@/domain/music/score";
import { toMidi } from "@/domain/music/pitch";

describe("tarefas de produção das aulas", () => {
  it("cada solução passa e cada partida ainda não passa", () => {
    expect(LESSON_TASKS.length).toBeGreaterThanOrEqual(30);
    for (const t of LESSON_TASKS) {
      expect(checkTask(t, t.solution!.score!).passed, t.id).toBe(true);
      expect(checkTask(t, t.start).passed, t.id).toBe(false);
    }
    expect(new Set(LESSON_TASKS.map((t) => t.id)).size).toBe(LESSON_TASKS.length);
  });
});

describe("avaliação de transferência", () => {
  it("toda melodia gera tarefas resolvíveis: a referência passa e a partida não", () => {
    let count = 0;
    for (const m of TRANSFER_MELODIES)
      for (const kind of TRANSFER_KINDS) {
        const t = buildTransferTask(kind, m, 7);
        if (kind === "adaptar-ttbb" && !m.ttbb) {
          expect(t).toBeNull();
          continue;
        }
        expect(t, `${kind} ${m.id}`).not.toBeNull();
        const sol = checkTask(t!, t!.solution!.score!);
        expect(sol.passed, `${kind} ${m.id}: ${sol.checks.filter((c) => !c.ok).map((c) => c.detail).join("; ")}`).toBe(true);
        expect(checkTask(t!, t!.start).passed, `${kind} ${m.id} partida`).toBe(false);
        count++;
      }
    expect(count).toBeGreaterThan(200);
  });

  it("as melodias são inéditas: diferentes entre si e das peças do Repertório", () => {
    const sig = (s: Parameters<typeof voiceTimeline>[0], ts: Parameters<typeof voiceTimeline>[1]) => {
      const m = voiceTimeline(s, ts).flatMap((x) => (x.event.kind === "note" ? [toMidi(x.event.pitch)] : []));
      return m.slice(1, 9).map((x, i) => x - m[i]!).join(",");
    };
    const sigs = TRANSFER_MELODIES.map((m) => {
      const t = buildTransferTask("harmonizar", m, 1)!;
      return sig(t.start.parts[0]!, t.start.timeSignature);
    });
    expect(new Set(sigs).size).toBe(sigs.length);
    for (const r of REPERTORIO) expect(sigs).not.toContain(sig(r.score.parts[0]!, r.score.timeSignature));
  });

  it("mesma semente, mesma tarefa; o id reconstrói a tarefa", () => {
    for (const kind of TRANSFER_KINDS) {
      const a = generateTransferTask(kind, TRANSFER_MELODIES, 123)!;
      const b = generateTransferTask(kind, TRANSFER_MELODIES, 123)!;
      expect(JSON.stringify(a.start)).toBe(JSON.stringify(b.start));
      expect(parseTransferId(a.id)?.kind).toBe(kind);
      expect(JSON.stringify(resolveTask(a.id)?.start)).toBe(JSON.stringify(a.start));
    }
  });

  it("pré e pós-teste: um item de cada tipo, melodias diferentes e sem repetir entre os testes", () => {
    expect(PRE_TEST_SEED).not.toBe(POST_TEST_SEED);
    const pre = preTest();
    const post = postTest();
    expect(pre).toHaveLength(TRANSFER_KINDS.length);
    expect(post).toHaveLength(TRANSFER_KINDS.length);
    const mel = (ts: typeof pre) => ts.map((t) => parseTransferId(t.id)!.melodyId);
    expect(new Set(mel(pre)).size).toBe(pre.length);
    expect(new Set(mel(post)).size).toBe(post.length);
    // nenhuma melodia aparece nos dois testes
    expect(mel(post).filter((m) => mel(pre).includes(m))).toEqual([]);
    expect(isTestTask("pre-teste", pre[0]!.id)).toBe(true);
    expect(isTestTask("pos-teste", pre[0]!.id)).toBe(false);
    expect(isTestTask("pre-teste", generateTransferTask("harmonizar", TRANSFER_MELODIES, 5)!.id)).toBe(false);
  });

  it("a correção de erros parte de uma partitura com pelo menos um erro objetivo, três pontos graves e soprano intacto", () => {
    for (const m of TRANSFER_MELODIES) {
      const t = buildTransferTask("corrigir", m, 99)!;
      const r = checkTask(t, t.start);
      expect(r.serious.filter((d) => d.severity === "erro").length).toBeGreaterThanOrEqual(1);
      expect(r.serious.length).toBeGreaterThanOrEqual(3);
      expect(r.checks.find((c) => c.id === "preserva")?.ok).toBe(true);
    }
  });

  it("tarefa enviada ao navegador não leva a solução; ids gerados no servidor são resolvíveis", () => {
    const t = resolveTask(preTest()[0]!.id)!;
    expect(t.solution).toBeDefined();
    expect("solution" in publicTask(t)).toBe(false);
    const id = newTransferTaskId("corrigir", 9, "paralelas")!;
    expect(resolveTask(id)?.lessonId).toBe("paralelas");
    expect(newTransferTaskId("corrigir", 9, "nao-existe")).toBeNull();
  });

  it("prática ligada a uma aula: credita a aula e rejeita aula inexistente", () => {
    const t = generateTransferTask("harmonizar", TRANSFER_MELODIES, 42, "cadencias")!;
    expect(t.id.endsWith("@cadencias")).toBe(true);
    expect(t.lessonId).toBe("cadencias");
    expect(resolveTask(t.id)?.lessonId).toBe("cadencias");
    expect(resolveTask(t.id.replace("@cadencias", "@nao-existe"))).toBeUndefined();
    expect(checkTask(t, t.solution!.score!).passed).toBe(true);
  });
});
