import { scoreFromText } from "@/domain/music/text-notation";
import type { StyleProfileId } from "@/domain/music/score";

/**
 * Exemplos (originais) da disciplina de quarteto masculino. As técnicas vêm do
 * estudo do repertório de quartetos gospel e barbershop; melodias e
 * harmonizações aqui são escritas para o curso. Cada veredito usado nas aulas é
 * conferido pelo motor de validação no teste de integridade do currículo.
 */
type V = Record<"T1" | "T2" | "B1" | "B2", string>;
const ttbb = (id: string, title: string, voices: V, opts: { key?: string; time?: string; tempo?: number; style?: StyleProfileId } = {}) =>
  scoreFromText({
    id,
    title,
    formation: "TTBB",
    key: opts.key ?? "G",
    time: opts.time ?? "4/4",
    voices,
    ...(opts.tempo ? { tempo: opts.tempo } : {}),
    ...(opts.style ? { style: opts.style } : {}),
  });

const R = (n: number) => Array.from({ length: n }, () => "r:w").join(" | ");

/**
 * Melodia do lead, no Tenor II: a 2ª frase do "Hino à Alegria" (Beethoven, 1824; texto de
 * Schiller; domínio público), uma oitava abaixo e em Fá maior, para caber no quarteto.
 */
const LEAD = 'A3:q"Wir A3:q"be- Bb3:q"tre- C4:q"ten | C4:q"feu- Bb3:q"er- A3:q"trun- G3:q"ken, | F3:q"Himm- F3:q"li- G3:q"sche, A3:q"dein | G3:q."Hei- F3:8"lig- F3:h"tum!';
const F = { key: "F" } as const;

export const EXT = {
  // ── Papéis no quarteto ─────────────────────────────────────────────
  leadSo: ttbb("ext-lead-so", "Hino à Alegria — a melodia no lead (Tenor II)", { T1: R(4), T2: LEAD, B1: R(4), B2: R(4) }, F),
  leadHarmonizado: ttbb(
    "ext-lead-harmonizado",
    "Hino à Alegria — lead no Tenor II, tenor acima, barítono e baixo",
    { T1: "C4:h D4:h | E4:h F4:h | D4:h D4:h | C4:h C4:h", T2: LEAD, B1: "F3:h F3:h | G3:h F3:h | F3:h D3:h | E3:h F3:h", B2: "A2:h D3:h | C3:h A2:h | Bb2:h Bb2:h | C3:h A2:h" },
    F,
  ),
  tenorAbaixoDoLead: ttbb("ext-tenor-abaixo", "Tenor I escrito abaixo do lead", {
    T1: "G3:h F#3:h | G3:w",
    T2: "B3:h A3:h | B3:w",
    B1: "D3:h D3:h | D3:w",
    B2: "G2:h D3:h | G2:w",
  }),
  leadNoAgudo: ttbb("ext-lead-agudo", "Lead e tenor escritos agudos demais", {
    T1: "A4:q A4:q B4:q A4:q | A4:w",
    T2: "F#4:q F#4:q G4:q F#4:q | F#4:w",
    B1: "D4:q D4:q D4:q D4:q | D4:w",
    B2: "D3:q D3:q G2:q D3:q | D3:w",
  }, { key: "D" }),

  // ── Voicing fechado e grave ────────────────────────────────────────
  fechadoCorreto: ttbb("ext-fechado", "I – IV – V – I: fundamental e quinta embaixo, terça nos tenores", {
    T1: "B3:h C4:h | A3:h B3:h",
    T2: "G3:h G3:h | F#3:h G3:h",
    B1: "D3:h E3:h | D3:h D3:h",
    B2: "G2:h C3:h | D3:h G2:h",
  }),
  tercaNoGrave: ttbb("ext-terca-grave", "Terça entre baixo e barítono em Sol2", { T1: "G3:w", T2: "D3:w", B1: "B2:w", B2: "G2:w" }),
  tercaNoGraveCorrigida: ttbb("ext-terca-grave-corrigida", "Mesma harmonia: quinta embaixo, terça em cima", { T1: "B3:w", T2: "G3:w", B1: "D3:w", B2: "G2:w" }),
  baixoAbaixo: ttbb("ext-baixo-abaixo", "Baixo em Ré2, abaixo da extensão", { T1: "B3:w", T2: "F#3:w", B1: "A2:w", B2: "D2:w" }),
  baritonoAcimaDoLead: ttbb(
    "ext-baritono-acima",
    "Barítono acima do lead, como no barbershop",
    { T1: "D4:h C4:h | B3:w", T2: "G3:h A3:h | G3:w", B1: "B3:h F#3:h | D3:w", B2: "G2:h D3:h | G2:w" },
    { style: "popular-a-cappella" },
  ),
  setimaBarbershop: ttbb(
    "ext-setima-barbershop",
    "Acorde de sétima de dominante completo (o 'ring' do barbershop) resolvendo",
    { T1: "C4:h B3:h", T2: "A3:h G3:h", B1: "F#3:h D3:h", B2: "D3:h G2:h" },
    { style: "popular-a-cappella" },
  ),
  // ── Baixo condutor, chamada e resposta ─────────────────────────────
  chamadaResposta: ttbb(
    "ext-chamada-resposta",
    "Chamada e resposta: o baixo chama, o trio responde",
    {
      T1: 'r:w | D4:q"Ho- D4:q"ly D4:h"Lord! | r:w | C4:h"A- B3:h"men.',
      T2: 'r:w | B3:q"Ho- B3:q"ly D4:h"Lord! | r:w | A3:h"A- G3:h"men.',
      B1: 'r:w | G3:q"Ho- G3:q"ly G3:h"Lord! | r:w | F#3:h"A- D3:h"men.',
      B2: 'G2:q"Ho- B2:q"ly D3:h"Lord, | G2:w | C3:q"Ho- E3:q"ly G3:h"Lord, | D3:h G2:h',
    },
    { style: "popular-a-cappella" },
  ),
  backingDoo: ttbb(
    "ext-backing-doo",
    "Lead com 'doo' rítmico de barítono e tenor e baixo nos tempos",
    {
      T1: 'r:q C4:q"doo r:q D4:q"doo | r:q E4:q"doo r:q F4:q"doo | r:q D4:q"doo r:q D4:q"doo | r:q C4:q"doo C4:h"doo',
      T2: LEAD,
      B1: 'r:q F3:q"doo r:q F3:q"doo | r:q G3:q"doo r:q F3:q"doo | r:q F3:q"doo r:q D3:q"doo | r:q E3:q"doo F3:h"doo',
      B2: 'A2:q"dm r:q D3:q"dm r:q | C3:q"dm r:q A2:q"dm r:q | Bb2:q"dm r:q Bb2:q"dm r:q | C3:q"dm r:q A2:h"dm',
    },
    { key: "F", style: "popular-a-cappella" },
  ),
  padSemRespirar: ttbb(
    "ext-pad-sem-respirar",
    "Pad em 'uh' por cinco compassos lentos, sem respiração",
    {
      T1: 'B3:w"uh | C4:w | B3:w | A3:w | B3:w',
      T2: 'G3:w"uh | G3:w | G3:w | F#3:w | G3:w',
      B1: 'D3:w"uh | E3:w | D3:w | D3:w | D3:w',
      B2: 'G2:w"uh | C3:w | G2:w | D3:w | G2:w',
    },
    { tempo: 56, style: "popular-a-cappella" },
  ),

  // ── Uníssono e entradas ────────────────────────────────────────────
  unissonoAbre: ttbb(
    "ext-unissono-abre",
    "Uníssono e oitavas que se abrem em harmonia no fim da frase",
    {
      T1: 'A3:q"Wir A3:q"be- Bb3:q"tre- C4:q"ten | E4:h"feu- F4:h"er-',
      T2: 'A3:q"Wir A3:q"be- Bb3:q"tre- C4:q"ten | C4:q"feu- Bb3:q"er- A3:q"trun- G3:q"ken,',
      B1: 'A2:q"Wir A2:q"be- Bb2:q"tre- C3:q"ten | G3:h"feu- F3:h"er-',
      B2: 'A2:q"Wir A2:q"be- Bb2:q"tre- C3:q"ten | C3:h"feu- A2:h"er-',
    },
    { key: "F", style: "popular-a-cappella" },
  ),
  entradasEmEscada: ttbb(
    "ext-entradas-escada",
    "Entradas em escada: baixo, barítono, lead e tenor",
    {
      T1: 'r:w | r:w | r:w | B3:w"ah',
      T2: 'r:w | r:w | G3:w"ah~ | G3:w',
      B1: 'r:w | D3:w"ah~ | D3:w~ | D3:w',
      B2: 'G2:w"ah~ | G2:w~ | G2:w~ | G2:w',
    },
    { style: "popular-a-cappella" },
  ),

  // ── Cores do quarteto gospel ───────────────────────────────────────
  coresGospel: ttbb(
    "ext-cores-gospel",
    "Gmaj7 – C6 – Cm6 – G: sétima maior, sexta e empréstimo modal",
    { T1: "B3:h C4:h | C4:h B3:h", T2: "F#3:h A3:h | A3:h G3:h", B1: "D3:h E3:h | Eb3:h D3:h", B2: "G2:h C3:h | C3:h G2:h" },
    { style: "popular-a-cappella" },
  ),
  coresTradicional: ttbb("ext-cores-tradicional", "As mesmas cores avaliadas no coral tradicional", {
    T1: "B3:h C4:h | C4:h B3:h",
    T2: "F#3:h A3:h | A3:h G3:h",
    B1: "D3:h E3:h | Eb3:h D3:h",
    B2: "G2:h C3:h | C3:h G2:h",
  }),
  pedalNoBaixo: ttbb(
    "ext-pedal-baixo",
    "Baixo em pedal: G – C/G – D/G – G",
    { T1: "B3:h C4:h | A3:h B3:h", T2: "G3:h G3:h | F#3:h G3:h", B1: "D3:h E3:h | D3:h D3:h", B2: "G2:w~ | G2:w" },
    { style: "popular-a-cappella" },
  ),
  dominanteNona: ttbb(
    "ext-dominante-nona",
    "D7(♭9) → G: a nona menor desce, a sétima desce, a sensível sobe",
    { T1: "Eb4:h D4:h", T2: "C4:h B3:h", B1: "F#3:h G3:h", B2: "D3:h G2:h" },
    { style: "popular-a-cappella" },
  ),

  // ── Modulação e final ──────────────────────────────────────────────
  modulacaoMeioTom: ttbb("ext-modulacao-meio-tom", "Sol maior → Lá♭ maior pelo V7 da nova tonalidade (E♭7)", {
    T1: "B3:h C4:h | B3:w | Db4:w | C4:w",
    T2: "G3:h A3:h | G3:w | Bb3:w | Ab3:w",
    B1: "D3:h F#3:h | G3:w | G3:w | Eb3:w",
    B2: "G2:h D3:h | G2:w | Eb3:w | Ab2:w",
  }),
  modulacaoSetimaSobe: ttbb("ext-modulacao-setima-sobe", "A mesma modulação com a sétima (Ré♭) subindo", {
    T1: "B3:h C4:h | B3:w | Db4:w | Eb4:w",
    T2: "G3:h A3:h | G3:w | Bb3:w | C4:w",
    B1: "D3:h F#3:h | G3:w | G3:w | Eb3:w",
    B2: "G2:h D3:h | G2:w | Eb3:w | Ab2:w",
  }),
} as const;
