import { scoreFromText } from "@/domain/music/text-notation";
import type { StyleProfileId } from "@/domain/music/score";

/**
 * Exemplos (originais) da disciplina de vozes iguais agudas (SSA/SSAA). Em SSA,
 * a linha do Contralto II fica em pausa. Cada veredito usado nas aulas é
 * conferido pelo motor no teste de integridade do currículo.
 */
type V = Record<"S1" | "S2" | "A1" | "A2", string>;
type Opts = { key?: string; time?: string; tempo?: number; style?: StyleProfileId };
const ssaa = (id: string, title: string, voices: V, o: Opts = {}) =>
  scoreFromText({
    id,
    title,
    formation: "SSAA",
    key: o.key ?? "C",
    time: o.time ?? "4/4",
    voices,
    ...(o.tempo ? { tempo: o.tempo } : {}),
    ...(o.style ? { style: o.style } : {}),
  });

const R = (n: number) => Array.from({ length: n }, () => "r:w").join(" | ");

/**
 * "Santo! Santo! Santo!" (Nicaea, Dykes, 1861; domínio público), 1ª frase. Em Lá♭ maior para
 * o Soprano I (de Lá♭4 a Fá5, dentro da tessitura) e em Fá maior para cantar no Soprano II.
 */
const NIC = 'Ab4:q"Ho- Ab4:q"ly, C5:q"ho- C5:q"ly, | Eb5:h"ho- Eb5:h"ly! | F5:h"Lord F5:q"God F5:q"Al- | Eb5:h"migh- C5:h"ty!';
const NIC_F = 'F4:q"Ho- F4:q"ly, A4:q"ho- A4:q"ly, | C5:h"ho- C5:h"ly! | D5:h"Lord D5:q"God D5:q"Al- | C5:h"migh- A4:h"ty!';
const AB = { key: "Ab" } as const;
/** Soprano II e Contralto I da versão-hino. */
const HINO_S2 = "Eb4:h Ab4:h | Bb4:h C5:h | Db5:h Db5:h | Bb4:h Ab4:h";
const HINO_A1 = "C4:h Eb4:h | Eb4:h Ab4:h | Ab4:h Ab4:h | Eb4:h Eb4:h";
const SSA_S2 = "Ab4:h Ab4:h | Bb4:h C5:h | Ab4:h Ab4:h | Bb4:h C5:h";
/** "Ah! vous dirai-je, maman" (França, séc. XVIII; domínio público), conhecida no Brasil como "Brilha, brilha, estrelinha". */
const ESTRELINHA = 'G4:q"Ah! G4:q"vous D5:q"di- D5:q"rai- | E5:q"je, E5:q"ma- D5:h"man, | C5:q"ce C5:q"qui B4:q"cau- B4:q"se | A4:q"mon A4:q"tour- G4:h"ment?';
const PLANING: V = {
  S1: 'C5:q"u D5:q"u E5:q"u D5:q"u | C5:w"u',
  S2: "G4:q A4:q B4:q A4:q | G4:w",
  A1: "E4:q F4:q G4:q F4:q | E4:w",
  A2: "C4:q D4:q E4:q D4:q | C4:w",
};
const CORES: V = {
  S1: "E5:w | E5:w | F5:w | F5:w | E5:w",
  S2: "D5:w | C5:w | C5:w | B4:w | C5:w",
  A1: "G4:w | G4:w | F4:w | G4:w | G4:w",
  A2: "C4:w | A3:w | D4:w | G3:w | C4:w",
};

export const EXS = {
  // ── A formação ─────────────────────────────────────────────────────
  hino: ssaa("exs-hino", "Santo! Santo! Santo! em SSAA: A♭ – A♭ | E♭/G – A♭ | D♭ – D♭ | E♭/G – A♭", { S1: NIC, S2: HINO_S2, A1: HINO_A1, A2: "Ab3:h Ab3:h | G3:h Ab3:h | Db4:h Db4:h | G3:h Ab3:h" }, AB),
  graveDemais: ssaa("exs-grave-demais", "Contralto II escrito como baixo de coro misto", { S1: NIC, S2: HINO_S2, A1: HINO_A1, A2: "Ab2:h Ab2:h | G2:h Ab2:h | Db3:h Db3:h | G2:h Ab2:h" }, AB),

  // ── SSA: três vozes ────────────────────────────────────────────────
  ssa: ssaa("exs-ssa", "Santo! Santo! Santo! em SSA: a contralto como baixo, só fundamentais e terças", { S1: NIC, S2: SSA_S2, A1: "C4:h F4:h | G4:h Ab4:h | F4:h F4:h | G4:h Ab4:h", A2: R(4) }, AB),
  ssaQuintas: ssaa("exs-ssa-quintas", "SSA com a contralto saltando para as quintas dos acordes", { S1: NIC, S2: "Ab4:h Ab4:h | G4:h C5:h | Ab4:h Ab4:h | Db5:h C5:h", A1: "Eb4:h C4:h | Bb3:h Eb4:h | C4:h C4:h | Bb3:h Eb4:h", A2: R(4) }, AB),

  // ── SSAA: espaçamento ──────────────────────────────────────────────
  buraco: ssaa("exs-buraco", "Sopranos longe das contraltos: um buraco no meio do acorde", {
    S1: "G5:h F5:h | E5:w",
    S2: "E4:h D4:h | C4:w",
    A1: "C4:h B3:h | C4:w",
    A2: "C4:h G3:h | C4:w",
  }),

  // ── O baixo sem baixo ──────────────────────────────────────────────
  baixoLinha: ssaa(
    "exs-baixo-linha",
    "Contralto II com linha de baixo: A♭ – A♭ | E♭/B♭ – A♭/C | D♭ – D♭ | E♭/G – A♭",
    { S1: NIC, S2: "Eb4:h Ab4:h | G4:h Ab4:h | Db5:h Db5:h | Bb4:h Ab4:h", A1: "C4:h Eb4:h | Eb4:h Eb4:h | Ab4:h Ab4:h | Eb4:h Eb4:h", A2: "Ab3:h Ab3:h | Bb3:h C4:h | Db4:h Db4:h | G3:h Ab3:h" },
    AB,
  ),
  baixoOitavas: ssaa(
    "exs-baixo-oitavas",
    "Contralto II dobrando a melodia uma oitava abaixo",
    { S1: NIC, S2: HINO_S2, A1: HINO_A1, A2: "Ab3:q Ab3:q C4:q C4:q | Eb4:h Eb4:h | F4:h F4:q F4:q | Eb4:h C4:h" },
    AB,
  ),

  // ── Coro infantil ──────────────────────────────────────────────────
  infantil: ssaa(
    "exs-infantil",
    "Ah! vous dirai-je, maman (Brilha, brilha, estrelinha) a duas vozes, em Sol maior",
    { S1: ESTRELINHA, S2: "G4:q G4:q G4:q B4:q | C5:q C5:q B4:h | A4:q A4:q G4:q G4:q | F#4:q F#4:q G4:h", A1: R(4), A2: R(4) },
    { key: "G" },
  ),
  infantilAgudo: ssaa(
    "exs-infantil-agudo",
    "A mesma canção em Lá maior: o ponto mais agudo sai da região confortável",
    {
      S1: ESTRELINHA.replace(/G4/g, "A4").replace(/D5/g, "E5").replace(/E5:q"je, E5:q"ma-/, 'F#5:q"je, F#5:q"ma-').replace(/C5/g, "D5").replace(/B4/g, "C#5").replace(/A4:q"mon A4:q"tour-/, 'B4:q"mon B4:q"tour-'),
      S2: "A4:q A4:q A4:q C#5:q | D5:q D5:q C#5:h | B4:q B4:q A4:q A4:q | G#4:q G#4:q A4:h",
      A1: R(4),
      A2: R(4),
    },
    { key: "A" },
  ),

  // ── Texturas ───────────────────────────────────────────────────────
  melodiaInterna: ssaa(
    "exs-melodia-interna",
    "Melodia no Soprano II, com o Soprano I sustentando por cima",
    { S1: "F5:w | E5:h F5:h | F5:w | E5:h F5:h", S2: NIC_F, A1: "r:w | G4:h F4:h | Bb4:w | G4:h F4:h", A2: "r:w | C4:h A3:h | Bb3:w | C4:h r:h" },
    { key: "F" },
  ),
  melodiaCruzada: ssaa(
    "exs-melodia-cruzada",
    "Melodia no Soprano II com o Contralto I passando por cima dela",
    { S1: "F5:w | E5:h F5:h | F5:w | E5:h F5:h", S2: NIC_F, A1: "r:w | E5:h F4:h | Bb4:w | G4:h F4:h", A2: "r:w | C4:h A3:h | Bb3:w | C4:h r:h" },
    { key: "F" },
  ),

  // ── Adaptação de SATB ──────────────────────────────────────────────
  adaptacaoDireta: ssaa(
    "exs-adaptacao-direta",
    "Coro misto copiado: tenor uma oitava acima no Soprano II",
    { S1: NIC, S2: "C5:h Eb5:h | Eb5:h C5:h | Ab4:h Ab4:h | G4:h Ab4:h", A1: "Eb4:h Ab4:h | G4:h Ab4:h | Ab4:h Ab4:h | Eb4:h Eb4:h", A2: "Ab3:h Ab4:h | Eb4:h Ab3:h | Db4:h Db4:h | Eb4:h Ab3:h" },
    AB,
  ),

  // ── Cores ──────────────────────────────────────────────────────────
  cores: ssaa("exs-cores", "Cadd9 – Am7 – Dm7 – G7 – C em vozes iguais", CORES, { style: "coral-contemporaneo", tempo: 90 }),
  planing: ssaa("exs-planing", "Tríades paralelas em bloco (planing): C – Dm – Em – Dm – C", PLANING, { style: "popular-a-cappella" }),
  planingTradicional: ssaa("exs-planing-tradicional", "O mesmo bloco paralelo avaliado no coral tradicional", PLANING),
} as const;
