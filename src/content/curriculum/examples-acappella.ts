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
/**
 * As melodias com texto vêm de canções em domínio público: "Ah! vous dirai-je, maman"
 * (séc. XVIII, a melodia de "Brilha, brilha, estrelinha"), "Santo! Santo! Santo!"
 * (Dykes/Heber), "Frère Jacques" e a Doxologia (Old 100th). Os acompanhamentos são do curso.
 */
const AH_LEAD = 'F3:q"Ah! F3:q"vous C4:q"di- C4:q"rai- | D4:q"je, D4:q"ma- C4:h"man,';

export const EXA2 = {
  // ── Solistas e dueto ───────────────────────────────────────────────
  duetoTercas: ttbb(
    "exa2-dueto-tercas",
    "Dueto: lead e barítono em terças (Ah! vous dirai-je, maman)",
    { T1: R(2), T2: AH_LEAD, B1: 'D3:q"Ah! D3:q"vous A3:q"di- A3:q"rai- | Bb3:q"je, Bb3:q"ma- A3:h"man,', B2: R(2) },
    { key: "F", ...POP },
  ),
  melodiaEmOitavas: ttbb(
    "exa2-melodia-oitavas",
    "Lead e baixo cantam a mesma melodia em oitavas",
    { T1: R(2), T2: AH_LEAD, B1: R(2), B2: 'F2:q"Ah! F2:q"vous C3:q"di- C3:q"rai- | D3:q"je, D3:q"ma- C3:h"man,' },
    { key: "F", ...POP },
  ),
  soloBaritono: ttbb(
    "exa2-solo-baritono",
    "Solo do barítono com 'uh' do baixo; o quarteto entra no refrão",
    {
      T1: 'r:w | r:w | D4:h"glo- E4:h"ri- | D4:w"a',
      T2: 'r:w | r:w | A3:h"glo- C#4:h"ri- | A3:w"a',
      B1: 'D3:q"Ho- D3:q"ly, F#3:q"ho- F#3:q"ly, | A3:h"ho- A3:h"ly! | F#3:h"glo- A3:h"ri- | F#3:w"a',
      B2: 'A2:w"uh | A2:w | D3:h A2:h | D3:w',
    },
    { key: "D", ...POP },
  ),
  soloAgudoDemais: ttbb(
    "exa2-solo-agudo",
    "Solo do barítono escrito no registro do tenor",
    { T1: R(2), T2: R(2), B1: 'D4:q"Ho- D4:q"ly, F#4:q"ho- F#4:q"ly, | A4:h"ho- A4:h"ly!', B2: 'D3:w"uh | D3:w' },
    { key: "D", ...POP },
  ),
  // ── Texturas do grupo ──────────────────────────────────────────────
  eco: ttbb(
    "exa2-eco",
    "Eco: o tenor repete o 'dormez-vous?' do lead (Frère Jacques)",
    {
      T1: 'r:w | B3:q"dor- C4:q"mez- D4:h"vous? | D4:w"_',
      T2: 'B3:q"dor- C4:q"mez- D4:h"vous? | r:w | B3:w"_',
      B1: 'G3:w"uh | G3:w | G3:w',
      B2: 'G2:w"bm | G2:w"bm | G2:w"bm',
    },
    POP,
  ),
  textoContraUh: ttbb(
    "exa2-texto-uh",
    "Tenores com o texto em terças; barítono e baixo em 'uh'",
    {
      T1: 'E4:q"Ce E4:q"qui D4:q"cau- D4:q"se | C4:q"mon C4:q"tour- B3:h"ment?',
      T2: 'C4:q"Ce C4:q"qui B3:q"cau- B3:q"se | A3:q"mon A3:q"tour- G3:h"ment?',
      B1: 'G3:h"uh G3:h | F#3:h D3:h',
      B2: 'C3:h"uh G2:h | D3:h G2:h',
    },
    POP,
  ),
  estrofeUnissono: satb(
    "exa2-estrofe-unissono",
    "SATB: estrofe com todo o grupo na melodia (uníssono e oitavas)",
    {
      S: 'F4:q"Ah! F4:q"vous C5:q"di- C5:q"rai- | D5:q"je, D5:q"ma- C5:h"man,',
      A: 'F4:q"Ah! F4:q"vous C5:q"di- C5:q"rai- | D5:q"je, D5:q"ma- C5:h"man,',
      T: 'F3:q"Ah! F3:q"vous C4:q"di- C4:q"rai- | D4:q"je, D4:q"ma- C4:h"man,',
      B: 'F2:q"Ah! F2:q"vous C3:q"di- C3:q"rai- | D3:q"je, D3:q"ma- C3:h"man,',
    },
    { key: "F", ...POP },
  ),
  refraoBloco: satb(
    "exa2-refrao-bloco",
    "SATB: refrão em bloco, todos no mesmo ritmo e texto (Doxologia)",
    {
      S: 'D5:h"Come B4:h"ye | G4:h"be- A4:q"fore C5:q"Him | B4:h"and A4:h"re- | G4:w"joice.',
      A: 'D4:h"Come E4:h"ye | E4:h"be- F#4:q"fore F#4:q"Him | G4:h"and F#4:h"re- | G4:w"joice.',
      T: 'B3:h"Come B3:h"ye | C4:h"be- C4:q"fore C4:q"Him | D4:h"and D4:h"re- | D4:w"joice.',
      B: 'G2:h"Come E3:h"ye | E3:h"be- D3:q"fore D3:q"Him | B2:h"and D3:h"re- | G2:w"joice.',
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
    "Riff em quartas nos tenores, Frère Jacques no barítono e 'bm' no baixo",
    {
      T1: 'r:8 D4:8"bop D4:8"bop D4:8"ba r:8 D4:8"bop E4:8"ba D4:8"bop | r:8 D4:8"bop D4:8"bop D4:8"ba r:8 D4:8"bop E4:8"ba D4:8"bop',
      T2: 'r:8 A3:8"bop A3:8"bop A3:8"ba r:8 A3:8"bop B3:8"ba A3:8"bop | r:8 A3:8"bop A3:8"bop A3:8"ba r:8 A3:8"bop B3:8"ba A3:8"bop',
      B1: 'D3:q"Frè- E3:q"re F#3:q"Jac- D3:q"ques, | D3:q"frè- E3:q"re F#3:q"Jac- D3:q"ques,',
      B2: 'A2:w"bm | A2:w"bm',
    },
    { key: "D", ...POP },
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
    "Um riff em terças levado para barítono e baixo",
    {
      T1: R(2),
      T2: 'G3:q"Frè- A3:q"re B3:q"Jac- G3:q"ques, | G3:q"frè- A3:q"re B3:q"Jac- G3:q"ques,',
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
