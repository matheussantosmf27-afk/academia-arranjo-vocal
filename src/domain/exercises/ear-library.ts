import type { FormationId, VoiceId } from "../music/formations";
import type { Score, StyleProfileId } from "../music/score";
import { scoreFromText } from "../music/text-notation";
import { shuffle } from "./random";
import type { ChoiceItem } from "./types";

/**
 * Comparações auditivas: duas versões do mesmo trecho, separadas por um compasso de
 * pausa; o aluno ouve sem ver a partitura e diz em qual delas está o fenômeno da aula.
 * As versões vêm dos exemplos do curso (originais). Quando o fenômeno é verificável,
 * `rule` diz que diagnóstico deve aparecer na versão marcada e não na outra (teste).
 */
export type EarTopic =
  | "paralelas"
  | "sensivel"
  | "setima"
  | "espacamento"
  | "grave-ttbb"
  | "textura-pad"
  | "melodia-interna"
  | "oitavas"
  | "retardo"
  | "emprestimo"
  | "secundaria"
  | "diminuto"
  | "subv"
  | "baixo-linha"
  | "modal"
  | "contracanto"
  | "imitacao"
  | "respiracao"
  | "dobra-melodia"
  | "ssaa-grave"
  | "ssa-quintas"
  | "cores"
  | "cores-ttbb"
  | "anacruse"
  | "menor-melodica"
  | "tessitura"
  | "chamada";

type Voices = Readonly<Partial<Record<VoiceId, string>>>;

export interface EarComparison {
  readonly topic: EarTopic;
  /** Pergunta: "Em qual versão …?" */
  readonly question: string;
  /** Por que a versão marcada tem o fenômeno (aparece depois da resposta). */
  readonly explanation: string;
  readonly formation: FormationId;
  readonly key: string;
  readonly time: string;
  readonly tempo?: number;
  readonly style?: StyleProfileId;
  /** Versão em que o fenômeno acontece. */
  readonly marked: Voices;
  /** Versão de comparação, sem o fenômeno. */
  readonly plain: Voices;
  /** Diagnóstico (id de regra, ou trecho da mensagem) presente só na versão marcada. */
  readonly rule?: { readonly id: string; readonly message?: string };
}

const LUZ = 'E5:h"Luz D5:h"da | C5:h"ma- E5:h"nhã | D5:h"vem B4:h"che- | C5:w"gar';
const LUZ_ORIGINAL = { S: LUZ, A: "G4:h G4:h | E4:h G4:h | G4:h F4:h | E4:w", T: "C4:h B3:h | C4:h C4:h | B3:h D4:h | C4:w", B: "C3:h G2:h | C3:h C3:h | G2:h G2:h | C3:w" };
const CAMINHO = 'E4:q"Vou G4:q"pe- A4:q"lo G4:q"ca- | C5:h"mi- G4:h"nho | A4:q"com C5:q"a B4:h"gen- | C5:h."te r:q';
const CAMINHO_BLOCO = { S: CAMINHO, A: "C4:q E4:h. | F4:h E4:h | E4:h G4:h | E4:h. r:q", T: "G3:h C4:h | C4:h C4:h | C4:h D4:h | C4:h. r:q", B: "C3:w | A2:h C3:h | C3:h G2:h | C3:h. r:q" };
const FRASE = {
  S: 'E5:h"Can- D5:h"ta | C5:h"o E5:h"co- | D5:h"ro B4:h"na | C5:h"luz G4:h"da | A4:h"ma- B4:h"nhã | C5:w"_',
  A: "G4:h G4:h | E4:h G4:h | G4:h F4:h | E4:h C4:h | F4:h F4:h | E4:w",
  T: "C4:h B3:h | C4:h C4:h | B3:h D4:h | C4:h C4:h | C4:h D4:h | C4:w",
  B: "C3:h G2:h | C3:h C3:h | G2:h G2:h | C3:h E3:h | A2:h G2:h | C3:w",
};
const R = (n: number) => Array.from({ length: n }, () => "r:w").join(" | ");
const SSAA_LUZ = { S1: LUZ, S2: "C5:h B4:h | G4:h C5:h | B4:h G4:h | G4:w", A1: "G4:h G4:h | E4:h G4:h | G4:h F4:h | E4:w" };

export const EAR_COMPARISONS: readonly EarComparison[] = [
  {
    topic: "paralelas",
    question: "Em qual versão todas as vozes sobem juntas e o acorde soa 'oco' (quintas e oitavas paralelas)?",
    explanation: "Na versão com paralelas, as quatro vozes sobem um grau ao mesmo tempo: três pares andam em 5ªs e 8ªs justas e o coro soa como menos vozes. Na outra, o baixo sobe enquanto as vozes de cima descem.",
    formation: "SATB", key: "C", time: "4/4",
    marked: { S: "G4:h A4:h", A: "E4:h F4:h", T: "C4:h D4:h", B: "C3:h D3:h" },
    plain: { S: "G4:h F4:h", A: "E4:h D4:h", T: "C4:h A3:h", B: "C3:h F3:h" },
    rule: { id: "conducao.paralelas" },
  },
  {
    topic: "sensivel",
    question: "Ouça o soprano na chegada ao último acorde: em qual versão a sensível NÃO sobe para a tônica?",
    explanation: "Na versão marcada, o soprano faz B4 → G4: a sensível desce uma 3ª e a cadência perde força. Na outra, B4 → C5, a resolução esperada.",
    formation: "SATB", key: "C", time: "4/4",
    marked: { S: "B4:h G4:h", A: "G4:h E4:h", T: "D4:h C4:h", B: "G2:h C3:h" },
    plain: { S: "B4:h C5:h", A: "G4:h G4:h", T: "D4:h E4:h", B: "G2:h C3:h" },
    rule: { id: "harmonia.resolucao-da-sensivel" },
  },
  {
    topic: "setima",
    question: "Ouça o soprano: em qual versão a sétima do acorde de dominante sobe em vez de descer?",
    explanation: "Na versão marcada, o soprano canta a sétima (F4) e sobe para G4: a tensão não resolve. Na outra, F4 desce para E4, como a sétima pede.",
    formation: "SATB", key: "C", time: "4/4",
    marked: { S: "F4:h G4:h", A: "D4:h E4:h", T: "B3:h C4:h", B: "G2:h C3:h" },
    plain: { S: "F4:h E4:h", A: "D4:h C4:h", T: "B3:h C4:h", B: "G2:h C3:h" },
    rule: { id: "harmonia.resolucao-da-setima" },
  },
  {
    topic: "espacamento",
    question: "Em qual versão o soprano soa isolado, com um 'buraco' entre ele e as outras vozes?",
    explanation: "Na versão marcada, há mais de uma oitava entre soprano (E5) e contralto (C4): o acorde se separa em duas camadas. Na outra, o contralto está em G4, perto do soprano.",
    formation: "SATB", key: "C", time: "4/4",
    marked: { S: "E5:w", A: "C4:w", T: "G3:w", B: "C3:w" },
    plain: { S: "E5:w", A: "G4:w", T: "C4:w", B: "C3:w" },
    rule: { id: "vozes.espacamento" },
  },
  {
    topic: "grave-ttbb",
    question: "Em qual versão o acorde masculino soa turvo, 'embolado' no grave?",
    explanation: "Na versão marcada, barítono e baixo cantam uma 3ª maior em G2–B2, abaixo do limite grave: o acorde embola. Na outra, os dois fazem uma 5ª (G2–D3) e a terça vai para o tenor.",
    formation: "TTBB", key: "G", time: "4/4",
    marked: { T1: "G3:w", T2: "D3:w", B1: "B2:w", B2: "G2:w" },
    plain: { T1: "B3:w", T2: "G3:w", B1: "D3:w", B2: "G2:w" },
    rule: { id: "vozes.limite-grave-de-intervalo" },
  },
  {
    topic: "textura-pad",
    question: "Em qual versão só a melodia se move e as outras vozes sustentam notas longas (pad)?",
    explanation: "Na versão marcada, contralto, tenor e baixo seguram os acordes em notas longas e só o soprano anda com a melodia: textura de melodia com pad. Na outra, todas as vozes mudam juntas, em homofonia.",
    formation: "SATB", key: "C", time: "4/4",
    marked: { S: CAMINHO, A: "C4:q E4:h. | E4:w | E4:h G4:h | E4:h. r:q", T: "G3:w | G3:w | C4:h D4:h | C4:h. r:q", B: "C3:w | C3:w | C3:h G2:h | C3:h. r:q" },
    plain: CAMINHO_BLOCO,
  },
  {
    topic: "melodia-interna",
    question: "Em qual versão a melodia passa para uma voz interna (o tenor) e o soprano só sustenta notas longas?",
    explanation: "Na versão marcada, a melodia está no tenor, uma oitava abaixo, e o soprano fica com notas longas acima dela. Na outra, a melodia está no soprano, como de costume.",
    formation: "SATB", key: "C", time: "4/4",
    marked: { S: "G4:w | G4:w | C5:h D5:h | C5:h. r:q", A: "C4:q E4:h. | E4:w | E4:h D4:h | E4:h. r:q", T: 'E3:q G3:q A3:q G3:q | C4:h G3:h | A3:q C4:q B3:h | C4:h. r:q', B: "C3:w | C3:w | C3:h G2:h | C3:h. r:q" },
    plain: CAMINHO_BLOCO,
  },
  {
    topic: "oitavas",
    question: "Em qual versão a melodia é cantada em oitavas, sem acordes?",
    explanation: "Na versão marcada, só sopranos e tenores cantam, a mesma melodia uma oitava de distância: força e clareza, sem harmonia. Na outra, as quatro vozes formam acordes.",
    formation: "SATB", key: "C", time: "4/4",
    marked: { S: CAMINHO, A: R(4), T: "E3:q G3:q A3:q G3:q | C4:h G3:h | A3:q C4:q B3:h | C4:h. r:q", B: R(4) },
    plain: CAMINHO_BLOCO,
    rule: { id: "conducao.paralelas" },
  },
  {
    topic: "retardo",
    question: "Em qual versão o soprano segura a nota quando o acorde muda e só depois desce (retardo)?",
    explanation: "Na versão marcada, o C5 do soprano fica ligado sobre o acorde de dominante (soa como 4ª) e resolve em B4 no último tempo: um retardo 4–3. Na outra, o soprano já chega ao B4 junto com o acorde.",
    formation: "SATB", key: "C", time: "4/4",
    marked: { S: "C5:h~ C5:q B4:q | C5:w", A: "E4:h D4:h | E4:w", T: "G3:h G3:h | G3:w", B: "C3:h G2:h | C3:w" },
    plain: { S: "C5:h B4:h | C5:w", A: "E4:h D4:h | E4:w", T: "G3:h G3:h | G3:w", B: "C3:h G2:h | C3:w" },
    rule: { id: "harmonia.notas-estranhas", message: "Retardo" },
  },
  {
    topic: "emprestimo",
    question: "Em qual versão o acorde do meio é menor, emprestado do modo menor (cor mais escura)?",
    explanation: "Na versão marcada, o acorde do meio é Fá menor (iv): o contralto desce A4 → A♭4. Na outra, é Fá maior (IV).",
    formation: "SATB", key: "C", time: "4/4",
    marked: { S: "C5:h C5:h | C5:w", A: "G4:h Ab4:h | G4:w", T: "E4:h F4:h | E4:w", B: "C3:h F3:h | C3:w" },
    plain: { S: "C5:h C5:h | C5:w", A: "G4:h A4:h | G4:w", T: "E4:h F4:h | E4:w", B: "C3:h F3:h | C3:w" },
  },
  {
    topic: "secundaria",
    question: "Em qual versão o baixo sobe por semitons (G♯ → A, C♯ → D), anunciando dominantes secundárias?",
    explanation: "Na versão marcada, E7/G♯ prepara Lá menor e A7/C♯ prepara Ré menor: o baixo sobe por semitom duas vezes. Na outra, só tônica e dominante.",
    formation: "SATB", key: "C", time: "4/4",
    marked: { S: LUZ, A: "G4:h E4:h | E4:h G4:h | F4:h F4:h | E4:w", T: "C4:h B3:h | A3:h A3:h | A3:h G3:h | G3:w", B: "C3:h G#2:h | A2:h C#3:h | D3:h G2:h | C3:w" },
    plain: LUZ_ORIGINAL,
  },
  {
    topic: "diminuto",
    question: "Em qual versão aparece um acorde diminuto de passagem (o baixo sobe A – C♯ – D)?",
    explanation: "Na versão marcada, C♯°7 liga Lá menor a Ré menor, com o baixo subindo por semitom e o tenor descendo B♭ → A. Na outra, a harmonia é só tônica e dominante.",
    formation: "SATB", key: "C", time: "4/4",
    marked: { S: LUZ, A: "G4:h G4:h | E4:h G4:h | F4:h F4:h | E4:w", T: "C4:h B3:h | C4:h Bb3:h | A3:h G3:h | G3:w", B: "C3:h G2:h | A2:h C#3:h | D3:h G2:h | C3:w" },
    plain: LUZ_ORIGINAL,
  },
  {
    topic: "subv",
    question: "Em qual versão o baixo chega à tônica final descendo por semitom (D♭ → C)?",
    explanation: "Na versão marcada, D♭7 substitui G7 (substituto de trítono) e o baixo desce D♭ → C; B♭7 aparece no lugar do E7. Na outra, o baixo salta G → C.",
    formation: "SATB", key: "C", time: "4/4", style: "popular-a-cappella",
    marked: { S: LUZ, A: "G4:h Ab4:h | G4:h G4:h | F4:h F4:h | E4:w", T: "C4:h D4:h | E4:h C#4:h | C4:h Ab3:h | C4:w", B: "C3:h Bb2:h | A2:h A2:h | D3:h Db3:h | C3:w" },
    plain: LUZ_ORIGINAL,
  },
  {
    topic: "baixo-linha",
    question: "Em qual versão o baixo desce por grau conjunto (C – B – A – G) em vez de saltar entre fundamentais?",
    explanation: "Na versão marcada, inversões (G/B, C/G) fazem o baixo descer por grau C – B – A – G. Na outra, o baixo salta entre C e G.",
    formation: "SATB", key: "C", time: "4/4", style: "popular-a-cappella",
    marked: { S: LUZ, A: "G4:h G4:h | E4:h E4:h | F4:h F4:h | E4:w", T: "C4:h D4:h | A3:h C4:h | A3:h G3:h | G3:w", B: "C3:h B2:h | A2:h G2:h | D3:h G2:h | C3:w" },
    plain: LUZ_ORIGINAL,
  },
  {
    topic: "modal",
    question: "Em qual versão aparecem acordes do modo menor (A♭ maior, Fá menor) no meio da frase?",
    explanation: "Na versão marcada, A♭ maior sob o C5 da melodia e Fm6/A♭ antes da dominante trazem a 'sombra' do modo menor. Na outra, só tônica e dominante.",
    formation: "SATB", key: "C", time: "4/4", style: "popular-a-cappella",
    marked: { S: LUZ, A: "G4:h G4:h | Eb4:h E4:h | F4:h G4:h | E4:w", T: "C4:h B3:h | C4:h C4:h | D4:h D4:h | C4:w", B: "C3:h G2:h | Ab2:h C3:h | Ab2:h G2:h | C3:w" },
    plain: LUZ_ORIGINAL,
  },
  {
    topic: "contracanto",
    question: "Em qual versão o contralto responde nas pausas da melodia, com uma linha própria (contracanto)?",
    explanation: "Na versão marcada, o contralto fica parado quando a melodia anda e se move nas pausas dela. Na outra, ele só dobra a melodia uma oitava abaixo, inclusive nas pausas.",
    formation: "SATB", key: "C", time: "4/4",
    marked: { S: 'E5:q D5:q C5:h | r:h B4:q C5:q | D5:h r:h | C5:w', A: "G4:w | A4:q G4:q G4:h | G4:h A4:q B4:q | E4:w", T: R(4), B: "C3:w | C3:h G2:h | G2:w | C3:w" },
    plain: { S: 'E5:q D5:q C5:h | r:h B4:q C5:q | D5:h r:h | C5:w', A: "E4:q D4:q C4:h | r:h B3:q C4:q | D4:h r:h | C4:w", T: R(4), B: "C3:w | C3:h G2:h | G2:w | C3:w" },
  },
  {
    topic: "imitacao",
    question: "Em qual versão o tenor entra depois e repete a melodia do soprano (imitação)?",
    explanation: "Na versão marcada, o tenor canta a mesma melodia uma oitava abaixo, um compasso depois: um cânone. Na outra, ele canta junto com o soprano, nota contra nota em movimento paralelo, e as duas linhas viram uma só.",
    formation: "SATB", key: "G", time: "4/4",
    marked: { S: "G4:q A4:q B4:q B4:q | B4:q C5:q D5:h | D5:q B4:q B4:h | G4:w", A: R(4), T: "r:w | G3:q A3:q B3:q B3:q | B3:q C4:q D4:h | D4:q B3:q B3:h", B: "G2:w | G2:w | G2:w | G2:w" },
    plain: { S: "G4:q A4:q B4:q B4:q | B4:q C5:q D5:h | D5:q B4:q B4:h | G4:w", A: R(4), T: "C4:q D4:q E4:q E4:q | E4:q F4:q G4:h | G4:q E4:q E4:h | B3:w", B: "G2:w | G2:w | G2:w | G2:w" },
  },
  {
    topic: "respiracao",
    question: "Em qual versão o coro inteiro para e respira junto no meio da frase?",
    explanation: "Na versão marcada, todas as vozes têm uma pausa de semínima no compasso 3, depois de 'na': a frase se divide em duas metades. Na outra, as seis medidas seguem sem pausa.",
    formation: "SATB", key: "C", time: "4/4", tempo: 72,
    marked: {
      S: 'E5:h"Can- D5:h"ta | C5:h"o E5:h"co- | D5:h"ro B4:q"na r:q | C5:h"luz G4:h"da | A4:h"ma- B4:h"nhã | C5:w"_',
      A: "G4:h G4:h | E4:h G4:h | G4:h F4:q r:q | E4:h C4:h | F4:h F4:h | E4:w",
      T: "C4:h B3:h | C4:h C4:h | B3:h D4:q r:q | C4:h C4:h | C4:h D4:h | C4:w",
      B: "C3:h G2:h | C3:h C3:h | G2:h G2:q r:q | C3:h E3:h | A2:h G2:h | C3:w",
    },
    plain: FRASE,
  },
  {
    topic: "dobra-melodia",
    question: "Em qual versão o tenor canta a melodia junto com os sopranos, uma oitava abaixo?",
    explanation: "Na versão marcada, o tenor dobra a melodia em oitavas: soa mais forte, mas a harmonia perde uma voz (oitavas paralelas). Na outra, o tenor tem sua própria linha.",
    formation: "SATB", key: "C", time: "4/4",
    marked: { S: LUZ, A: "G4:h G4:h | E4:h G4:h | G4:h F4:h | E4:w", T: "E4:h D4:h | C4:h E4:h | D4:h B3:h | C4:w", B: "C3:h G2:h | C3:h C3:h | G2:h G2:h | C3:w" },
    plain: LUZ_ORIGINAL,
    rule: { id: "conducao.paralelas" },
  },
  {
    topic: "ssaa-grave",
    question: "Em qual versão a voz mais grave do coro feminino desce como um baixo de coro misto?",
    explanation: "Na versão marcada, o Contralto II desce a C3, abaixo da extensão de qualquer contralto, e abre um buraco no acorde. Na outra, ele canta C4 e G3, uma oitava acima.",
    formation: "SSAA", key: "C", time: "4/4",
    marked: { ...SSAA_LUZ, A2: "C3:h G3:h | C3:h C3:h | G3:h G3:h | C3:w" },
    plain: { ...SSAA_LUZ, A2: "C4:h G3:h | C4:h C4:h | G3:h G3:h | C4:w" },
    rule: { id: "extensao.fora-da-extensao" },
  },
  {
    topic: "ssa-quintas",
    question: "Em qual versão a voz mais grave salta para as quintas dos acordes, deixando a harmonia instável?",
    explanation: "Na versão marcada, a contralto canta G, D, E, G, D, F: quase sempre a quinta, e os acordes ficam em segunda inversão. Na outra, ela canta fundamentais e terças (C, B, C, C, B, D, C).",
    formation: "SSAA", key: "C", time: "4/4",
    marked: { S1: LUZ, S2: "C5:h B4:h | G4:h C5:h | B4:h G4:h | E4:w", A1: "G4:h D4:h | E4:h G4:h | D4:h F4:h | C4:w", A2: R(4) },
    plain: { S1: LUZ, S2: "G4:h G4:h | G4:h G4:h | G4:h F4:h | E4:w", A1: "C4:h B3:h | C4:h C4:h | B3:h D4:h | C4:w", A2: R(4) },
  },
  {
    topic: "cores",
    question: "Em qual versão os acordes ganham notas de cor (sétima maior, sexta) com as mesmas fundamentais?",
    explanation: "Na versão marcada, o tenor canta B3 (sétima maior de Dó), D4 (sexta de Fá) e A3 (sexta de Dó): Cmaj7 – F6 – C6. Na outra, só tríades.",
    formation: "SATB", key: "C", time: "4/4", style: "popular-a-cappella",
    marked: { S: "G4:h A4:h | G4:w", A: "E4:h F4:h | E4:w", T: "B3:h D4:h | A3:w", B: "C3:h F3:h | C3:w" },
    plain: { S: "G4:h A4:h | G4:w", A: "E4:h F4:h | E4:w", T: "C4:h C4:h | C4:w", B: "C3:h F3:h | C3:w" },
  },
  {
    topic: "cores-ttbb",
    question: "Em qual versão o quarteto colore os acordes com sétima maior, sexta e um acorde menor emprestado?",
    explanation: "Na versão marcada, Gmaj7 – C6 – Cm6 – G: o barítono desce D – E – E♭ – D, uma linha cromática interna. Na outra, as tríades simples G – C – D – G.",
    formation: "TTBB", key: "G", time: "4/4", style: "popular-a-cappella",
    marked: { T1: "B3:h C4:h | C4:h B3:h", T2: "F#3:h A3:h | A3:h G3:h", B1: "D3:h E3:h | Eb3:h D3:h", B2: "G2:h C3:h | C3:h G2:h" },
    plain: { T1: "B3:h C4:h | A3:h B3:h", T2: "G3:h G3:h | F#3:h G3:h", B1: "D3:h E3:h | D3:h D3:h", B2: "G2:h C3:h | D3:h G2:h" },
  },
  {
    topic: "anacruse",
    question: "Em qual versão a melodia começa antes do primeiro tempo forte (anacruse)?",
    explanation: "Na versão marcada, 'ca-mi-' ocupam os tempos 2 e 3 e a tônica 'NHAR' cai no tempo forte seguinte. Na outra, com as mesmas notas e a mesma duração total, a melodia começa no tempo 1: 'ca-', 'con-' e 'ti-', sílabas átonas, ficam longas ou caem em tempo forte.",
    formation: "SATB", key: "C", time: "3/4",
    marked: { S: 'r:q E4:q"ca- F4:q"mi- | G4:h"nhar C5:q"con- | B4:h"ti- A4:q"go | G4:h.', A: "r:h. | r:h. | r:h. | r:h.", T: "r:h. | r:h. | r:h. | r:h.", B: "r:h. | r:h. | r:h. | r:h." },
    plain: { S: 'E4:h"ca- F4:q"mi- | G4:q"nhar C5:h"con- | B4:q"ti- A4:h"go | G4:h.', A: "r:h. | r:h. | r:h. | r:h.", T: "r:h. | r:h. | r:h. | r:h.", B: "r:h. | r:h. | r:h. | r:h." },
  },
  {
    topic: "menor-melodica",
    question: "Em qual versão a linha do contralto sobe com um salto 'exótico' de 2ª aumentada (F → G♯)?",
    explanation: "Na versão marcada, a linha usa a forma harmônica (F – G♯), com uma 2ª aumentada difícil de afinar. Na outra, a forma melódica ascendente (F♯ – G♯) sobe por graus mais cantáveis.",
    formation: "SATB", key: "Am", time: "4/4",
    marked: { S: R(1), A: "E4:q F4:q G#4:q A4:q", T: R(1), B: R(1) },
    plain: { S: R(1), A: "E4:q F#4:q G#4:q A4:q", T: R(1), B: R(1) },
    rule: { id: "melodia.intervalo-aumentado" },
  },
  {
    topic: "tessitura",
    question: "Em qual versão o tenor sustenta uma nota no extremo agudo, fora da região confortável?",
    explanation: "Na versão marcada, o tenor sobe a A4 e a sustenta por um compasso inteiro: acima da extensão de um tenor amador. Na outra, ele fica em D4, no meio da tessitura.",
    formation: "SATB", key: "D", time: "4/4",
    marked: { S: "A4:h B4:h | A4:w", A: "F#4:h G4:h | F#4:w", T: "D4:h G4:h | A4:w", B: "D3:h G2:h | D3:w" },
    plain: { S: "A4:h B4:h | A4:w", A: "F#4:h G4:h | F#4:w", T: "D4:h D4:h | D4:w", B: "D3:h G2:h | D3:w" },
    rule: { id: "extensao.fora-da-extensao" },
  },
  {
    topic: "chamada",
    question: "Em qual versão o baixo canta sozinho e o trio responde depois (chamada e resposta)?",
    explanation: "Na versão marcada, o baixo arpeja o acorde sozinho nos compassos 1 e 3 e o trio responde em bloco nos compassos 2 e 4. Na outra, as quatro vozes cantam juntas o tempo todo.",
    formation: "TTBB", key: "G", time: "4/4", style: "popular-a-cappella",
    marked: {
      T1: "r:w | D4:q D4:q D4:h | r:w | C4:h B3:h",
      T2: "r:w | B3:q B3:q B3:h | r:w | A3:h G3:h",
      B1: "r:w | G3:q G3:q G3:h | r:w | F#3:h D3:h",
      B2: "G2:q B2:q D3:h | G2:w | C3:q E3:q G3:h | D3:h G2:h",
    },
    plain: {
      T1: "D4:q D4:q D4:h | D4:q D4:q D4:h | C4:q C4:q C4:h | C4:h B3:h",
      T2: "B3:q B3:q B3:h | B3:q B3:q B3:h | A3:q A3:q A3:h | A3:h G3:h",
      B1: "G3:q G3:q G3:h | G3:q G3:q G3:h | E3:q E3:q E3:h | F#3:h D3:h",
      B2: "G2:q G2:q G2:h | G2:w | C3:q C3:q C3:h | D3:h G2:h",
    },
  },
];

/** Compasso de pausa no compasso da peça. */
function restBar(time: string): string {
  return { "4/4": "r:w", "3/4": "r:h.", "2/4": "r:h" }[time] ?? "r:w";
}

/** Partitura de uma versão sozinha (para os testes conferirem o fenômeno). */
export function versionScore(c: EarComparison, which: "marked" | "plain"): Score {
  return scoreFromText({ id: `ouvido-${c.topic}-${which}`, title: c.topic, formation: c.formation, key: c.key, time: c.time, voices: c[which], ...(c.tempo ? { tempo: c.tempo } : {}), ...(c.style ? { style: c.style } : {}) });
}

/** As duas versões em sequência, separadas por um compasso de pausa. */
export function comparisonScore(c: EarComparison, markedFirst: boolean): Score {
  const [first, second] = markedFirst ? [c.marked, c.plain] : [c.plain, c.marked];
  const voices = Object.fromEntries((Object.keys(first) as VoiceId[]).map((v) => [v, `${first[v]} | ${restBar(c.time)} | ${second[v]}`])) as Voices;
  return scoreFromText({ id: `ouvido-${c.topic}`, title: "Comparação auditiva: 1ª versão, pausa, 2ª versão", formation: c.formation, key: c.key, time: c.time, voices, ...(c.tempo ? { tempo: c.tempo } : {}), ...(c.style ? { style: c.style } : {}) });
}

const OPTIONS = [
  { id: "primeira", label: "Na 1ª versão" },
  { id: "segunda", label: "Na 2ª versão" },
  { id: "ambas", label: "Nas duas versões" },
] as const;

/**
 * Itens auditivos de comparação: o aluno ouve as duas versões (sem a partitura, que
 * aparece depois da resposta) e diz em qual está o fenômeno. A ordem das versões é
 * sorteada; os temas se alternam para que dois itens seguidos não repitam o mesmo par.
 */
export function generateEarComparisonItems(rng: () => number, count: number, topics: readonly EarTopic[]): ChoiceItem[] {
  const pool = EAR_COMPARISONS.filter((c) => topics.includes(c.topic));
  if (pool.length === 0) return [];
  const order = shuffle(rng, pool);
  const items: ChoiceItem[] = [];
  for (let i = 0; i < count; i++) {
    const c = order[i % order.length]!;
    const markedFirst = rng() < 0.5;
    const correct = markedFirst ? "primeira" : "segunda";
    items.push({
      id: `ouvido-${c.topic}-${i + 1}`,
      kind: "choice",
      skill: "percepcao",
      prompt: `Ouça as duas versões (separadas por um compasso de pausa) sem olhar a partitura: ${c.question}`,
      options: OPTIONS,
      correctOptionId: correct,
      explanation: `${markedFirst ? "1ª" : "2ª"} versão. ${c.explanation}`,
      optionFeedback: {
        [markedFirst ? "segunda" : "primeira"]: "Ouça de novo comparando as duas versões trecho a trecho: o fenômeno aparece só em uma delas.",
        ambas: "As versões são diferentes justamente nesse ponto: ouça de novo e compare o mesmo compasso nas duas.",
      },
      notation: comparisonScore(c, markedFirst),
      earOnly: true,
    });
  }
  return items;
}
