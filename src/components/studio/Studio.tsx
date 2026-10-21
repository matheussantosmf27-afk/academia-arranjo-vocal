"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { type KeyboardEvent, useCallback, useMemo, useRef, useState } from "react";
import { DURATION_NAMES_PT, DURATION_TYPES, type DurationType, durationNamePt } from "@/domain/music/duration";
import { EXAMPLE_SCORES, CHORALE_SATB_C } from "@/domain/music/examples";
import { type FormationId, type VoiceId, getFormation, staffOfVoice, writtenPitch, clefNamePt } from "@/domain/music/formations";
import { type History, canRedo, canUndo, createHistory, pushHistory, redo, undo } from "@/domain/music/history";
import { keyNamePt } from "@/domain/music/key";
import {
  emptyScore,
  setDuration,
  setLyric,
  toNote,
  toRest,
  toggleTie,
  transposeEventChromatic,
  transposeEventDiatonic,
  transposeEventOctave,
  setPitch,
} from "@/domain/music/operations";
import { type Step, formatPitch, formatPitchPt, toMidi } from "@/domain/music/pitch";
import { parseScore } from "@/domain/music/schema";
import { type Score, type StyleProfileId, findEvent, voiceTimeline } from "@/domain/music/score";
import { parseKey } from "@/domain/music/text-notation";
import { type Diagnostic, STYLE_PROFILES, analyzeHarmony, validateScore } from "@/domain/validation";
import { loadDraft, saveDraft } from "@/lib/projects/store";
import { DiagnosticList } from "../diagnostics/DiagnosticList";
import { ScoreView } from "../notation/ScoreView";
import { VoicePlayer } from "../audio/VoicePlayer";
import { DURATION_KEYS, defaultPitchFor, nearestWithLetter, neighborEvent, verticalNeighbor } from "./editing";
import styles from "./Studio.module.css";

const KEYS = ["C", "G", "D", "A", "E", "F", "Bb", "Eb", "Ab", "Am", "Em", "Bm", "Dm", "Gm", "Cm"];

function firstEventId(score: Score): string | null {
  return score.parts[0]?.events[0]?.id ?? null;
}

/** Partitura inicial: rascunho (?projeto=) ou exemplo (?exemplo=) da URL; senão, o coral SATB. */
function resolveInitial(params: URLSearchParams): { score: Score; message: string } {
  const draft = params.get("projeto");
  const ex = params.get("exemplo");
  if (draft) {
    const r = loadDraft(draft);
    return r.ok ? { score: r.score, message: `Rascunho "${r.score.title}" aberto.` } : { score: CHORALE_SATB_C, message: r.error };
  }
  const s = ex ? EXAMPLE_SCORES.find((e) => e.id === ex) : undefined;
  return s ? { score: s, message: `Exemplo "${s.title}" aberto.` } : { score: CHORALE_SATB_C, message: "" };
}

export function Studio() {
  const params = useSearchParams();
  const router = useRouter();
  const [initial] = useState(() => resolveInitial(new URLSearchParams(params.toString())));
  const [history, setHistory] = useState<History<Score>>(() => createHistory(initial.score));
  const score = history.present;
  const [selected, setSelected] = useState<string | null>(firstEventId(initial.score));
  const [zoom, setZoom] = useState(1);
  const [style, setStyle] = useState<StyleProfileId>(initial.score.metadata.style);
  const [showHarmony, setShowHarmony] = useState(true);
  const [voices, setVoices] = useState<Set<VoiceId>>(() => new Set(getFormation(initial.score.formation).voices.map((v) => v.id)));
  const [playhead, setPlayhead] = useState<number | null>(null);
  const [status, setStatus] = useState(initial.message);
  const [activeDiag, setActiveDiag] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const load = useCallback((s: Score, message: string) => {
    setHistory(createHistory(s));
    setSelected(firstEventId(s));
    setStyle(s.metadata.style);
    setVoices(new Set(getFormation(s.formation).voices.map((v) => v.id)));
    setActiveDiag(null);
    setStatus(message);
  }, []);

  const apply = useCallback(
    (fn: (s: Score) => Score, message?: string) => {
      try {
        const next = fn(history.present);
        setHistory((h) => pushHistory(h, next));
        if (message) setStatus(message);
      } catch (e) {
        setStatus(e instanceof Error ? e.message : "Operação inválida");
      }
    },
    [history.present],
  );

  const report = useMemo(() => validateScore(score, { style }), [score, style]);
  const harmony = useMemo(() => (showHarmony ? analyzeHarmony(score) : undefined), [score, showHarmony]);
  const flagged = useMemo(() => {
    const m = new Map<string, "erro" | "alerta" | "sugestao" | "info">();
    for (const d of report.diagnostics) for (const id of d.location.eventIds) if (!m.has(id)) m.set(id, d.severity);
    return m;
  }, [report]);
  const formation = getFormation(score.formation);
  const dimmed = useMemo(() => new Set<string>(formation.voices.map((v) => v.id).filter((v) => !voices.has(v))), [formation, voices]);
  const sel = selected ? findEvent(score, selected) : null;
  const selTimed = sel ? voiceTimeline(sel.part, score.timeSignature)[sel.index] : undefined;

  const act = useCallback(
    (action: string, arg?: string) => {
      if (!selected || !sel) return;
      const id = selected;
      const ev = sel.event;
      switch (action) {
        case "up":
          return apply((s) => transposeEventDiatonic(s, id, 1));
        case "down":
          return apply((s) => transposeEventDiatonic(s, id, -1));
        case "sharp":
          return apply((s) => transposeEventChromatic(s, id, 1));
        case "flat":
          return apply((s) => transposeEventChromatic(s, id, -1));
        case "octUp":
          return apply((s) => transposeEventOctave(s, id, 1));
        case "octDown":
          return apply((s) => transposeEventOctave(s, id, -1));
        case "rest":
          return ev.kind === "note"
            ? apply((s) => toRest(s, id), "Nota convertida em pausa.")
            : apply((s) => toNote(s, id, defaultPitchFor(s, sel.part.voice)), "Pausa convertida em nota.");
        case "tie":
          return apply((s) => toggleTie(s, id));
        case "dot": {
          const dots = ev.duration.dots === 0 ? 1 : 0;
          return apply((s) => setDuration(s, id, { type: ev.duration.type, dots }), `Duração: ${durationNamePt({ type: ev.duration.type, dots })}.`);
        }
        case "duration": {
          const type = arg as DurationType;
          return apply((s) => setDuration(s, id, { type, dots: 0 }), `Duração: ${DURATION_NAMES_PT[type]}.`);
        }
        case "letter": {
          const ref = ev.kind === "note" ? toMidi(ev.pitch) : toMidi(defaultPitchFor(score, sel.part.voice));
          return apply((s) => setPitch(s, id, nearestWithLetter(s, arg as Step, ref)));
        }
      }
    },
    [selected, sel, apply, score],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName)) return;
    const mod = e.ctrlKey || e.metaKey;
    if (mod && e.key.toLowerCase() === "z") {
      e.preventDefault();
      setHistory((h) => (e.shiftKey ? redo(h) : undo(h)));
      return;
    }
    if (mod && e.key.toLowerCase() === "y") {
      e.preventDefault();
      setHistory((h) => redo(h));
      return;
    }
    if (!selected) return;
    const map: Record<string, () => void> = {
      ArrowUp: () => (e.altKey ? setSelected(verticalNeighbor(score, selected, -1) ?? selected) : act(mod ? "octUp" : e.shiftKey ? "sharp" : "up")),
      ArrowDown: () => (e.altKey ? setSelected(verticalNeighbor(score, selected, 1) ?? selected) : act(mod ? "octDown" : e.shiftKey ? "flat" : "down")),
      ArrowLeft: () => setSelected(neighborEvent(score, selected, -1) ?? selected),
      ArrowRight: () => setSelected(neighborEvent(score, selected, 1) ?? selected),
      ".": () => act("dot"),
      r: () => act("rest"),
      R: () => act("rest"),
      l: () => act("tie"),
      L: () => act("tie"),
      Delete: () => sel?.event.kind === "note" && act("rest"),
      Backspace: () => sel?.event.kind === "note" && act("rest"),
    };
    const dur = DURATION_KEYS[e.key];
    const letter = /^[a-g]$/i.test(e.key) && !mod ? e.key.toUpperCase() : null;
    const fn = map[e.key] ?? (dur ? () => act("duration", dur) : letter ? () => act("letter", letter) : undefined);
    if (fn) {
      e.preventDefault();
      fn();
    }
  };

  const focusDiagnostic = (d: Diagnostic) => {
    setActiveDiag(d.id);
    const first = d.location.eventIds[0];
    if (first) setSelected(first);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(score, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${score.title.replace(/[^\p{L}\p{N}]+/gu, "-").toLowerCase() || "arranjo"}.aav.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatus("Arquivo JSON exportado.");
  };

  const importJson = async (file: File) => {
    try {
      const parsed = parseScore(JSON.parse(await file.text()));
      if (parsed.ok) load(parsed.score, `Arquivo "${file.name}" importado.`);
      else setStatus(`Arquivo inválido: ${parsed.errors.slice(0, 3).join("; ")}`);
    } catch {
      setStatus("Não foi possível ler o arquivo (JSON inválido).");
    }
  };

  const save = () => {
    const r = saveDraft(score);
    setStatus(r.ok ? `Rascunho salvo neste navegador (${new Date(r.updatedAt).toLocaleTimeString("pt-BR")}).` : `Falha ao salvar: ${r.error}`);
    if (r.ok) router.replace(`/estudio?projeto=${encodeURIComponent(score.id)}`, { scroll: false });
  };

  return (
    <div className={styles.studio} onKeyDown={onKeyDown} ref={editorRef}>
      <div className={styles.toolbar} role="toolbar" aria-label="Ferramentas do Estúdio">
        <label className={styles.field}>
          <span>Abrir exemplo</span>
          <select
            value=""
            onChange={(e) => {
              const s = EXAMPLE_SCORES.find((x) => x.id === e.target.value);
              if (s) load(s, `Exemplo "${s.title}" aberto.`);
            }}
          >
            <option value="">Escolha…</option>
            {EXAMPLE_SCORES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="btn btn-sm" onClick={() => setShowNew((v) => !v)} aria-expanded={showNew}>
          + Novo arranjo
        </button>
        <span className={styles.sep} />
        <button type="button" className="btn btn-sm" onClick={() => setHistory(undo)} disabled={!canUndo(history)} title="Desfazer (Ctrl+Z)">
          ↶ Desfazer
        </button>
        <button type="button" className="btn btn-sm" onClick={() => setHistory(redo)} disabled={!canRedo(history)} title="Refazer (Ctrl+Shift+Z)">
          ↷ Refazer
        </button>
        <span className={styles.sep} />
        <button type="button" className="btn btn-sm" onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.1).toFixed(1)))} aria-label="Diminuir zoom">
          −
        </button>
        <span className={styles.zoom} aria-live="polite">
          {Math.round(zoom * 100)}%
        </span>
        <button type="button" className="btn btn-sm" onClick={() => setZoom((z) => Math.min(1.8, +(z + 0.1).toFixed(1)))} aria-label="Aumentar zoom">
          +
        </button>
        <span className={styles.sep} />
        <button type="button" className="btn btn-sm btn-primary" onClick={save}>
          Salvar rascunho
        </button>
        <button type="button" className="btn btn-sm" onClick={exportJson}>
          Exportar JSON
        </button>
        <button type="button" className="btn btn-sm" onClick={() => fileRef.current?.click()}>
          Importar JSON
        </button>
        <input ref={fileRef} type="file" accept=".json,application/json" hidden onChange={(e) => e.target.files?.[0] && void importJson(e.target.files[0])} />
        <button type="button" className="btn btn-sm" disabled title="MusicXML, MIDI e PDF serão implementados na etapa 9">
          MusicXML / MIDI / PDF (etapa 9)
        </button>
      </div>

      {showNew && (
        <NewScoreForm
          onCreate={(s) => {
            load(s, `Novo arranjo ${s.formation} criado.`);
            setShowNew(false);
          }}
          onCancel={() => setShowNew(false)}
        />
      )}

      <div className={styles.header}>
        <div>
          <label className="visually-hidden" htmlFor="titulo">
            Título
          </label>
          <input
            id="titulo"
            className={styles.title}
            type="text"
            value={score.title}
            maxLength={200}
            onChange={(e) => {
              const title = e.target.value;
              setHistory((h) => ({ ...h, present: { ...h.present, title } }));
            }}
          />
          <div className="row" style={{ marginTop: 4 }}>
            <span className={`chip ${score.formation === "SATB" ? "chip-satb" : "chip-ttbb"}`}>{formation.name}</span>
            <span className="chip">{keyNamePt(score.key)}</span>
            <span className="chip">
              {score.timeSignature.beats}/{score.timeSignature.beatType}
            </span>
            <span className="chip">{score.measureCount} compassos</span>
            <label className={styles.inline}>
              ♩ =
              <input
                type="number"
                min={30}
                max={200}
                value={score.tempoBpm}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (v >= 30 && v <= 200) apply((s) => ({ ...s, tempoBpm: v }));
                }}
                style={{ width: 70 }}
                aria-label="Andamento em batidas por minuto"
              />
            </label>
          </div>
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.main}>
          <VoicePlayer score={score} voices={voices} onVoicesChange={setVoices} onPosition={setPlayhead} presets={[formation.voices.map((v) => v.id), [formation.voices[0]!.id, formation.voices[3]!.id]]} />
          <div className="row" style={{ margin: "10px 0 6px" }}>
            <label className={styles.inline}>
              <input type="checkbox" checked={showHarmony} onChange={(e) => setShowHarmony(e.target.checked)} /> Mostrar cifragem harmônica
            </label>
            <span className="muted" style={{ fontSize: "0.82rem" }}>
              Clique numa nota para selecioná-la. Atalhos: <kbd>↑</kbd>/<kbd>↓</kbd> grau, <kbd>Shift</kbd> semitom, <kbd>Ctrl</kbd> oitava, <kbd>←</kbd>/<kbd>→</kbd> evento,{" "}
              <kbd>Alt</kbd>+<kbd>↑↓</kbd> voz, <kbd>A</kbd>–<kbd>G</kbd> nota, <kbd>1</kbd>–<kbd>5</kbd> figura, <kbd>.</kbd> ponto, <kbd>R</kbd> pausa, <kbd>L</kbd> ligadura.
            </span>
          </div>
          <div tabIndex={0} className={styles.scoreFocus} aria-label="Partitura editável. Use os atalhos de teclado para editar a nota selecionada.">
            <ScoreView
              score={score}
              zoom={zoom}
              selectedEventId={selected}
              flagged={flagged}
              {...(harmony ? { harmony } : {})}
              dimmedVoices={dimmed}
              onSelectEvent={(id) => {
                setSelected(id);
                editorRef.current?.querySelector<HTMLElement>(`.${styles.scoreFocus}`)?.focus();
              }}
              playhead={playhead}
            />
          </div>
          <p className={styles.status} role="status" aria-live="polite">
            {status}
          </p>
          <EventList score={score} selected={selected} onSelect={setSelected} />
        </div>

        <aside className={styles.side} aria-label="Inspetor e diagnósticos">
          <section className={styles.panel} aria-labelledby="insp">
            <h2 id="insp" className={styles.panelTitle}>
              Evento selecionado
            </h2>
            {sel && selTimed ? (
              <div className="stack" style={{ gap: 10 }}>
                <p style={{ margin: 0 }}>
                  <strong>{formation.voices.find((v) => v.id === sel.part.voice)?.name}</strong> · compasso {selTimed.measure}, tempo {selTimed.beat}
                  <br />
                  {sel.event.kind === "note" ? (
                    <>
                      {formatPitchPt(sel.event.pitch)} (MIDI {toMidi(sel.event.pitch)}) · {durationNamePt(sel.event.duration)}
                      {staffOfVoice(score.formation, sel.part.voice).clef === "treble8vb" && (
                        <>
                          <br />
                          <small>
                            Escrita em {clefNamePt("treble8vb")}: {formatPitch(writtenPitch(sel.event.pitch, "treble8vb"))}
                          </small>
                        </>
                      )}
                    </>
                  ) : (
                    <>Pausa · {durationNamePt(sel.event.duration)}</>
                  )}
                </p>
                <fieldset>
                  <legend>Altura</legend>
                  <div className="row">
                    <button type="button" className="btn btn-sm" onClick={() => act("up")} disabled={sel.event.kind !== "note"} aria-label="Subir um grau">
                      ↑ grau
                    </button>
                    <button type="button" className="btn btn-sm" onClick={() => act("down")} disabled={sel.event.kind !== "note"} aria-label="Descer um grau">
                      ↓ grau
                    </button>
                    <button type="button" className="btn btn-sm" onClick={() => act("sharp")} disabled={sel.event.kind !== "note"} aria-label="Subir um semitom">
                      ♯
                    </button>
                    <button type="button" className="btn btn-sm" onClick={() => act("flat")} disabled={sel.event.kind !== "note"} aria-label="Descer um semitom">
                      ♭
                    </button>
                    <button type="button" className="btn btn-sm" onClick={() => act("octUp")} disabled={sel.event.kind !== "note"}>
                      8ª ↑
                    </button>
                    <button type="button" className="btn btn-sm" onClick={() => act("octDown")} disabled={sel.event.kind !== "note"}>
                      8ª ↓
                    </button>
                  </div>
                </fieldset>
                <fieldset>
                  <legend>Duração</legend>
                  <div className="row">
                    {DURATION_TYPES.map((t) => (
                      <button key={t} type="button" className="btn btn-sm" aria-pressed={sel.event.duration.type === t} onClick={() => act("duration", t)} title={DURATION_NAMES_PT[t]}>
                        {DURATION_NAMES_PT[t]}
                      </button>
                    ))}
                    <button type="button" className="btn btn-sm" aria-pressed={sel.event.duration.dots > 0} onClick={() => act("dot")}>
                      ponto
                    </button>
                  </div>
                </fieldset>
                <div className="row">
                  <button type="button" className="btn btn-sm" onClick={() => act("rest")}>
                    {sel.event.kind === "note" ? "Transformar em pausa" : "Transformar em nota"}
                  </button>
                  <button type="button" className="btn btn-sm" aria-pressed={sel.event.kind === "note" && !!sel.event.tieToNext} onClick={() => act("tie")} disabled={sel.event.kind !== "note"}>
                    Ligadura
                  </button>
                </div>
                {sel.event.kind === "note" && (
                  <label className="stack" style={{ gap: 2 }}>
                    Sílaba da letra
                    <input
                      type="text"
                      maxLength={64}
                      key={sel.event.id}
                      defaultValue={sel.event.lyric ?? ""}
                      onBlur={(e) => {
                        const v = e.target.value;
                        if (sel.event.kind === "note" && v !== (sel.event.lyric ?? "")) apply((s) => setLyric(s, sel.event.id, v));
                      }}
                    />
                  </label>
                )}
              </div>
            ) : (
              <p className="muted">Nenhum evento selecionado.</p>
            )}
          </section>

          <section className={styles.panel} aria-labelledby="diag">
            <div className="row">
              <h2 id="diag" className={styles.panelTitle}>
                Diagnósticos
              </h2>
              <span className="spacer" />
              {(["erro", "alerta", "sugestao", "info"] as const).map((s) =>
                report.countsBySeverity[s] ? (
                  <span key={s} className={`chip chip-${s}`}>
                    {report.countsBySeverity[s]}
                  </span>
                ) : null,
              )}
            </div>
            <label className="stack" style={{ gap: 2, marginBottom: 10 }}>
              Estilo de referência
              <select value={style} onChange={(e) => setStyle(e.target.value as StyleProfileId)}>
                {Object.entries(STYLE_PROFILES).map(([id, p]) => (
                  <option key={id} value={id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
            <p className="muted" style={{ fontSize: "0.82rem" }}>
              {STYLE_PROFILES[style].description}
            </p>
            {report.ruleFailures.length > 0 && (
              <p className="notice" role="alert">
                Falha interna em {report.ruleFailures.length} regra(s): {report.ruleFailures.map((f) => f.ruleId).join(", ")}.
              </p>
            )}
            <DiagnosticList diagnostics={report.diagnostics} onFocus={focusDiagnostic} activeId={activeDiag} />
            <p className="muted" style={{ fontSize: "0.78rem", marginTop: 8 }}>
              Motor de validação v{report.engineVersion} — regras determinísticas; o mesmo arranjo e estilo produzem sempre os mesmos diagnósticos.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}

function EventList({ score, selected, onSelect }: { score: Score; selected: string | null; onSelect: (id: string) => void }) {
  const formation = getFormation(score.formation);
  const [voice, setVoice] = useState<VoiceId>(formation.voices[0]!.id);
  const current = formation.voices.some((v) => v.id === voice) ? voice : formation.voices[0]!.id;
  const part = score.parts.find((p) => p.voice === current)!;
  const tl = voiceTimeline(part, score.timeSignature);
  return (
    <details className={styles.events}>
      <summary>Lista de eventos (alternativa acessível à partitura)</summary>
      <div className="row" role="tablist" aria-label="Voz" style={{ margin: "8px 0" }}>
        {formation.voices.map((v) => (
          <button key={v.id} type="button" role="tab" aria-selected={current === v.id} className="btn btn-sm" onClick={() => setVoice(v.id)}>
            {v.name}
          </button>
        ))}
      </div>
      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Compasso/tempo</th>
              <th scope="col">Altura sonora</th>
              <th scope="col">Duração</th>
              <th scope="col">Letra</th>
            </tr>
          </thead>
          <tbody>
            {tl.map((t, i) => (
              <tr key={t.event.id} aria-selected={selected === t.event.id} className={selected === t.event.id ? styles.rowSelected : undefined}>
                <td>
                  <button type="button" className="btn btn-sm btn-ghost" onClick={() => onSelect(t.event.id)} aria-label={`Selecionar evento ${i + 1}`}>
                    {i + 1}
                  </button>
                </td>
                <td>
                  {t.measure}/{t.beat}
                </td>
                <td>{t.event.kind === "note" ? formatPitch(t.event.pitch) : "pausa"}</td>
                <td>
                  {durationNamePt(t.event.duration)}
                  {t.event.kind === "note" && t.event.tieToNext ? " (ligada)" : ""}
                </td>
                <td>{t.event.kind === "note" ? (t.event.lyric ?? "") : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

function NewScoreForm({ onCreate, onCancel }: { onCreate: (s: Score) => void; onCancel: () => void }) {
  const [formation, setFormation] = useState<FormationId>("SATB");
  const [key, setKey] = useState("C");
  const [time, setTime] = useState("4/4");
  const [measures, setMeasures] = useState(4);
  const [title, setTitle] = useState("Novo arranjo");
  return (
    <form
      className={styles.newForm}
      onSubmit={(e) => {
        e.preventDefault();
        const [beats, beatType] = time.split("/").map(Number) as [number, 2 | 4 | 8];
        onCreate(
          emptyScore({
            id: `arranjo-${Date.now().toString(36)}`,
            title: title.trim() || "Novo arranjo",
            formation,
            key: parseKey(key),
            timeSignature: { beats, beatType },
            tempoBpm: 72,
            measureCount: measures,
            voices: getFormation(formation).voices.map((v) => v.id),
          }),
        );
      }}
    >
      <label>
        Título <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} />
      </label>
      <label>
        Formação
        <select value={formation} onChange={(e) => setFormation(e.target.value as FormationId)}>
          <option value="SATB">SATB — coro misto</option>
          <option value="TTBB">TTBB — coro masculino</option>
        </select>
      </label>
      <label>
        Tonalidade
        <select value={key} onChange={(e) => setKey(e.target.value)}>
          {KEYS.map((k) => (
            <option key={k} value={k}>
              {keyNamePt(parseKey(k))}
            </option>
          ))}
        </select>
      </label>
      <label>
        Compasso
        <select value={time} onChange={(e) => setTime(e.target.value)}>
          {["4/4", "3/4", "2/4", "6/8", "2/2"].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label>
        Compassos
        <input type="number" min={1} max={64} value={measures} onChange={(e) => setMeasures(Math.max(1, Math.min(64, Number(e.target.value) || 1)))} style={{ width: 80 }} />
      </label>
      <div className="row">
        <button type="submit" className="btn btn-accent btn-sm">
          Criar
        </button>
        <button type="button" className="btn btn-sm" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export function StudioFallback() {
  return (
    <p className="muted">
      Carregando o Estúdio… <Link href="/curriculo">Ir para o currículo</Link>
    </p>
  );
}
