import { scoreFromText } from "@/domain/music/text-notation";
import type { StyleProfileId } from "@/domain/music/score";

/**
 * Exemplos (originais) da disciplina de grupo vocal a cappella gospel. As
 * técnicas vêm do estudo de partituras de quartetos e grupos a cappella; as
 * melodias e harmonizações aqui são escritas para o curso. Cada veredito usado
 * nas aulas é conferido pelo motor de validação no teste de integridade do currículo.
 */
type T = Record<"T1" | "T2" | "B1" | "B2", string>;
type S = Record<"S" | "A" | "T" | "B", string>;
type Opts = { key?: string; time?: string; tempo?: number; style?: StyleProfileId };
const extra = (o: Opts) => ({ ...(o.tempo ? { tempo: o.tempo } : {}), ...(o.style ? { style: o.style } : {}) });
const ttbb = (id: string, title: string, voices: T, o: Opts = {}) =>
  scoreFromText({ id, title, formation: "TTBB", key: o.key ?? "G", time: o.time ?? "4/4", voices, ...extra(o) });
const satb = (id: string, title: string, voices: S, o: Opts = {}) =>
  scoreFromText({ id, title, formation: "SATB", key: o.key ?? "G", time: o.time ?? "4/4", voices, ...extra(o) });

const R = (n: number) => Array.from({ length: n }, () => "r:w").join(" | ");
const POP = { style: "popular-a-cappella" } as const;

export const EXA2 = {
  // ── Solistas e dueto ───────────────────────────────────────────────
  duetoTercas: ttbb(
    "exa2-dueto-tercas",
    "Dueto: lead e barítono em terças e sextas",
    { T1: R(2), T2: 'B3:q"Can- C4:q"ta D4:q"meu B3:q"co- | A3:h"ra- G3:h"ção', B1: 'G3:q"Can- A3:q"ta B3:q"meu G3:q"co- | F#3:h"ra- B2:h"ção', B2: R(2) },
    POP,
  ),
  melodiaEmOitavas: ttbb(
    "exa2-melodia-oitavas",
    "Lead e baixo cantam a mesma melodia em oitavas",
    { T1: R(2), T2: 'B3:q"Can- C4:q"ta D4:q"meu B3:q"co- | A3:h"ra- G3:h"ção', B1: R(2), B2: 'B2:q"Can- C3:q"ta D3:q"meu B2:q"co- | A2:h"ra- G2:h"ção' },
    POP,
  ),
  soloBaritono: ttbb(
    "exa2-solo-baritono",
    "Solo do barítono com 'uh' do baixo; o quarteto entra no refrão",
    {
      T1: 'r:w | r:w | D4:h"glo- E4:h"ri- | D4:w"a',
      T2: 'r:w | r:w | A3:h"glo- C#4:h"ri- | A3:w"a',
      B1: 'D3:q"Can- E3:q"ta F#3:q"meu A3:q"co- | G3:h"ra- F#3:h"ção | F#3:h"glo- A3:h"ri- | F#3:w"a',
      B2: 'A2:w"uh | B2:w | D3:h A2:h | D3:w',
    },
    { key: "D", ...POP },
  ),
  soloAgudoDemais: ttbb(
    "exa2-solo-agudo",
    "Solo do barítono escrito no registro do tenor",
    { T1: R(2), T2: R(2), B1: 'A3:q"Can- B3:q"ta D4:q"meu F4:q"co- | E4:h"ra- D4:h"ção', B2: 'D3:w"uh | D3:w' },
    { key: "D", ...POP },
  ),
  // ── Texturas do grupo ──────────────────────────────────────────────
  eco: ttbb(
    "exa2-eco",
    "Eco: o barítono repete a frase do lead um tempo depois",
    {
      T1: R(3),
      T2: 'D4:q"Vem D4:q"Se- B3:h"nhor | C4:q"Vem C4:q"Se- A3:h"nhor | B3:w"_',
      B1: 'r:q B3:q"Vem B3:q"Se- G3:q"nhor | r:q A3:q"Vem A3:q"Se- F#3:q"nhor | G3:w"_',
      B2: 'G2:w"bm | D3:w"bm | G2:w"bm',
    },
    POP,
  ),
  textoContraUh: ttbb(
    "exa2-texto-uh",
    "Tenores com o texto em terças; barítono e baixo em 'uh'",
    {
      T1: 'D4:q"Eu E4:q"sei D4:h"meu | E4:h"lu- C4:h"gar | D4:w"_',
      T2: 'B3:q"Eu C4:q"sei B3:h"meu | C4:h"lu- A3:h"gar | B3:w"_',
      B1: 'G3:w"uh | G3:h F#3:h | G3:w',
      B2: 'G2:w"uh | C3:h D3:h | G2:w',
    },
    POP,
  ),
  estrofeUnissono: satb(
    "exa2-estrofe-unissono",
    "SATB: estrofe com todo o grupo na melodia (uníssono e oitavas)",
    {
      S: 'B4:q"Não A4:q"te- G4:q"nho A4:q"na- | B4:h"da B4:h"_',
      A: 'B4:q"Não A4:q"te- G4:q"nho A4:q"na- | B4:h"da B4:h"_',
      T: 'B3:q"Não A3:q"te- G3:q"nho A3:q"na- | B3:h"da B3:h"_',
      B: 'B2:q"Não A2:q"te- G2:q"nho A2:q"na- | B2:h"da B2:h"_',
    },
    POP,
  ),
  refraoBloco: satb(
    "exa2-refrao-bloco",
    "SATB: refrão em bloco, todos no mesmo ritmo e texto",
    {
      S: 'B4:h"To- B4:h"ma | C5:h"meu A4:h"co- | B4:w"ração',
      A: 'G4:h"To- G4:h"ma | G4:h"meu F#4:h"co- | G4:w"ração',
      T: 'D4:h"To- E4:h"ma | E4:h"meu D4:h"co- | D4:w"ração',
      B: 'G3:h"To- E3:h"ma | C3:h"meu D3:h"co- | G2:w"ração',
    },
    POP,
  ),
  antecipacao: ttbb(
    "exa2-antecipacao",
    "Antecipação ('push'): o acorde novo chega uma colcheia antes do tempo forte",
    {
      T1: 'D4:h D4:q. E4:8~ | E4:w',
      T2: 'B3:h B3:q. C4:8~ | C4:w',
      B1: 'G3:h G3:q. G3:8~ | G3:w',
      B2: 'G2:h G2:q. C3:8~ | C3:w',
    },
    POP,
  ),

  // ── Vocal band ─────────────────────────────────────────────────────
  riffBop: ttbb(
    "exa2-riff-bop",
    "Riff em terças nos tenores, melodia no barítono e 'bm' no baixo",
    {
      T1: 'r:8 D4:8"bop D4:8"bop D4:8"ba r:8 D4:8"bop E4:8"ba D4:8"bop | r:8 E4:8"bop E4:8"bop E4:8"ba r:8 E4:8"bop E4:8"ba E4:8"bop | D4:w"bop',
      T2: 'r:8 B3:8"bop B3:8"bop B3:8"ba r:8 B3:8"bop C4:8"ba B3:8"bop | r:8 C4:8"bop C4:8"bop C4:8"ba r:8 C4:8"bop C4:8"ba C4:8"bop | B3:w"bop',
      B1: 'G3:q"E- A3:q"le B3:h"vem | G3:h"me E3:h"bus- | G3:w"car',
      B2: 'G2:w"bm | C3:w"bm | G2:w"bm',
    },
    POP,
  ),
  baixoOstinato: ttbb(
    "exa2-baixo-ostinato",
    "Baixo em ostinato ('do do do') sob o trio sustentado",
    {
      T1: 'D4:w"ooo | E4:w | D4:w',
      T2: 'B3:w"ooo | C4:w | B3:w',
      B1: 'G3:w"ooo | G3:w | G3:w',
      B2: 'G2:q"do G3:8"do D3:8"do E3:q"do B2:8"do D3:8"do | C3:q"do G3:8"do E3:8"do A3:q"do E3:8"do G3:8"do | G2:w"do',
    },
    POP,
  ),
  riffGrave: ttbb(
    "exa2-riff-grave",
    "O mesmo riff em terças, levado para barítono e baixo",
    {
      T1: R(2),
      T2: 'D4:h"E- B3:h"le | G3:w"vem',
      B1: 'r:8 B2:8"bop B2:8"bop B2:8"ba r:8 B2:8"bop B2:8"ba B2:8"bop | B2:w',
      B2: 'r:8 G2:8"bop G2:8"bop G2:8"ba r:8 G2:8"bop G2:8"ba G2:8"bop | G2:w',
    },
    POP,
  ),

  // ── Blocos cromáticos e clichê de linha ────────────────────────────
  diminutoPassagem: ttbb(
    "exa2-diminuto-passagem",
    "G – G♯°7 – Am – D7 – G: diminuto de passagem com baixo cromático",
    { T1: "B3:h D4:h | C4:h C4:h | B3:w", T2: "G3:h B3:h | A3:h A3:h | G3:w", B1: "D3:h F3:h | E3:h F#3:h | G3:w", B2: "G2:h G#2:h | A2:h D3:h | G2:w" },
    POP,
  ),
  planing: ttbb(
    "exa2-planing",
    "Planing: o trio desce em tríades paralelas por semitom até o V",
    { T1: "C4:q B3:q Bb3:q A3:q | B3:w", T2: "A3:q G#3:q G3:q F#3:q | G3:w", B1: "F3:q E3:q Eb3:q D3:q | D3:w", B2: "r:w | G2:w" },
    POP,
  ),
  clicheLinha: ttbb(
    "exa2-cliche-linha",
    "Clichê de linha: Am – Am(maj7) – Am7 – Am6 com a linha no barítono",
    { T1: "E4:w~ | E4:w", T2: "C4:w~ | C4:w", B1: "A3:h G#3:h | G3:h F#3:h", B2: "A2:w~ | A2:w" },
    POP,
  ),
  clicheDobrado: ttbb("exa2-cliche-dobrado", "A linha do clichê dobrada pelo baixo, no coral tradicional", {
    T1: "E4:w~ | E4:w",
    T2: "C4:w~ | C4:w",
    B1: "A3:h G#3:h | G3:h F#3:h",
    B2: "A2:h G#2:h | G2:h F#2:h",
  }),

  // ── Linhas de baixo ────────────────────────────────────────────────
  baixoDescendente: ttbb(
    "exa2-baixo-descendente",
    "Baixo descendente com inversões: D – A/C♯ – Bm – Bm/A – G – A7 – D",
    {
      T1: "D4:h E4:h | D4:h D4:h | D4:h C#4:h | D4:w",
      T2: "A3:h A3:h | B3:h B3:h | B3:h A3:h | A3:w",
      B1: "F#3:h E3:h | F#3:h F#3:h | G3:h G3:h | F#3:w",
      B2: "D3:h C#3:h | B2:h A2:h | G2:h A2:h | D3:w",
    },
    { key: "D", ...POP },
  ),
  pedalAcordes: ttbb(
    "exa2-pedal-acordes",
    "Pedal em Ré: D – G/D – Em7/D – A7/D – D",
    { T1: "D4:h D4:h | E4:h E4:h | D4:w", T2: "A3:h B3:h | B3:h C#4:h | D4:w", B1: "F#3:h G3:h | G3:h G3:h | F#3:w", B2: "D3:w~ | D3:w~ | D3:w" },
    { key: "D", ...POP },
  ),
  baixoOitavasTradicional: ttbb("exa2-baixo-oitavas", "Linha do baixo dobrada em oitavas pelo barítono, no coral tradicional", {
    T1: "G4:h G4:h | E4:h D4:h | E4:w",
    T2: "E4:h D4:h | C4:h B3:h | C4:w",
    B1: "C4:h B3:h | A3:h G3:h | G3:w",
    B2: "C3:h B2:h | A2:h G2:h | C3:w",
  }, { key: "C" }),

  // ── Modulações ─────────────────────────────────────────────────────
  modTomAcima: ttbb("exa2-mod-tom-acima", "Sol → Lá pelo V7 da nova tonalidade (E7/G♯, baixo cromático)", {
    T1: "B3:h C4:h | B3:h D4:h | C#4:w",
    T2: "G3:h A3:h | G3:h B3:h | A3:w",
    B1: "D3:h F#3:h | G3:h E3:h | E3:w",
    B2: "G2:h D3:h | G2:h G#2:h | A2:w",
  }),
  modTerca: ttbb(
    "exa2-mod-terca",
    "Sol → Si maior direto (mediante cromática), com a nota comum Si no tenor",
    { T1: "B3:w | B3:w", T2: "G3:w | F#3:w", B1: "D3:w | D#3:w", B2: "G2:w | B2:w" },
    POP,
  ),
  modTomAbaixo: ttbb("exa2-mod-tom-abaixo", "Lá → Sol pelo D7 (V7 de Sol): um tom abaixo", {
    T1: "C#4:w | C4:w | B3:w",
    T2: "A3:w | A3:w | G3:w",
    B1: "E3:w | F#3:w | G3:w",
    B2: "A2:w | D3:w | G2:w",
  }, { key: "A" }),
  modQuintasParalelas: ttbb("exa2-mod-quintas", "Sol → E7 com baixo e barítono em quintas paralelas", {
    T1: "B3:w | D4:w | C#4:w",
    T2: "G3:w | G#3:w | A3:w",
    B1: "D3:w | B2:w | E3:w",
    B2: "G2:w | E2:w | A2:w",
  }),
} as const;
