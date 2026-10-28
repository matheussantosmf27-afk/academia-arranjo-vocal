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

/** Melodia original do lead ("Rio de Paz"), no Tenor II. */
const LEAD = 'B3:q"Há D4:q"um C4:q"ri- B3:q"o | A3:h"de B3:h"paz | C4:q"que B3:q"cor- A3:q"re_a- A3:q"té | G3:w"mim';

export const EXT = {
  // ── Papéis no quarteto ─────────────────────────────────────────────
  leadSo: ttbb("ext-lead-so", "Rio de Paz — a melodia no lead (Tenor II)", { T1: R(4), T2: LEAD, B1: R(4), B2: R(4) }),
  leadHarmonizado: ttbb("ext-lead-harmonizado", "Rio de Paz — lead no Tenor II, tenor acima, barítono e baixo", {
    T1: "D4:q D4:q E4:q D4:q | D4:h D4:h | E4:q D4:q D4:q C4:q | B3:w",
    T2: LEAD,
    B1: "G3:q B3:q G3:q G3:q | F#3:h G3:h | G3:q G3:q F#3:q F#3:q | D3:w",
    B2: "G2:q G2:q C3:q G2:q | D3:h G2:h | C3:q G2:q D3:q D3:q | G2:w",
  }),
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
      T1: 'r:w | D4:q"vem D4:q"pro D4:h"rio | r:w | C4:h"o- B3:h"lá',
      T2: 'r:w | B3:q"vem B3:q"pro B3:h"rio | r:w | A3:h"o- G3:h"lá',
      B1: 'r:w | G3:q"vem G3:q"pro G3:h"rio | r:w | F#3:h"o- D3:h"lá',
      B2: 'G2:q"Vem B2:q"pro D3:h"rio | G2:w | C3:q"Vem E3:q"pro G3:h"rio | D3:h G2:h',
    },
    { style: "popular-a-cappella" },
  ),
  backingDoo: ttbb(
    "ext-backing-doo",
    "Lead com 'doo' rítmico de barítono e tenor e baixo nos tempos",
    {
      T1: 'r:q D4:q"doo r:q D4:q"doo | r:q C4:q"doo r:q C4:q"doo | r:q D4:q"doo r:q C4:q"doo | B3:w"doo',
      T2: LEAD,
      B1: 'r:q G3:q"doo r:q G3:q"doo | r:q F#3:q"doo r:q G3:q"doo | r:q G3:q"doo r:q F#3:q"doo | G3:w"doo',
      B2: 'G2:q"dm r:q D3:q"dm r:q | D3:q"dm r:q G2:q"dm r:q | C3:q"dm r:q D3:q"dm r:q | G2:w"dm',
    },
    { style: "popular-a-cappella" },
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
      T1: 'B3:q"Há D4:q"um C4:q"ri- B3:q"o | D4:h"de D4:h"paz',
      T2: 'B3:q"Há D4:q"um C4:q"ri- B3:q"o | A3:h"de B3:h"paz',
      B1: 'B2:q"Há D3:q"um C3:q"ri- B2:q"o | F#3:h"de G3:h"paz',
      B2: 'B2:q"Há D3:q"um C3:q"ri- B2:q"o | D3:h"de G2:h"paz',
    },
    { style: "popular-a-cappella" },
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
