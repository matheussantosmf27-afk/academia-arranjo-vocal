import type { Score } from "@/domain/music/score";
import { scoreFromText } from "@/domain/music/text-notation";

/**
 * Repertório real em domínio público. Diferente dos exemplos curtos das aulas
 * (escritos para isolar um fenômeno), estas são peças que coros cantam de fato,
 * com as notas da fonte citada em `fonte`. A justificativa de domínio público de
 * cada uma está em `dominioPublico` (Lei 9.610/98, art. 41: 70 anos contados de
 * 1º de janeiro do ano seguinte à morte do autor). Traduções e arranjos modernos
 * (inclusive os de hinários atuais) podem estar protegidos e NÃO foram usados:
 * as letras estão no idioma original.
 *
 * As partituras do corpus de Bach foram convertidas automaticamente do MusicXML
 * do music21 (as letras vêm do próprio arquivo); as demais, das transcrições em
 * LilyPond citadas. Repetições foram escritas uma vez só.
 */
export interface PecaDoRepertorio {
  readonly id: string;
  readonly titulo: string;
  /** Como a peça é conhecida, em uma frase. */
  readonly conhecidoComo: string;
  readonly autoria: string;
  readonly fonte: { readonly descricao: string; readonly url: string };
  readonly dominioPublico: string;
  /** O que observar ao ouvir e ler a partitura. */
  readonly analise: string;
  readonly score: Score;
}

type V = Record<"S" | "A" | "T" | "B", string>;
const peca = (p: Omit<PecaDoRepertorio, "score"> & { key: string; time: string; tempo?: number; voices: V }): PecaDoRepertorio => {
  const { key, time, tempo, voices, ...rest } = p;
  return { ...rest, score: scoreFromText({ id: `rep-${p.id}`, title: p.titulo, formation: "SATB", key, time, voices, ...(tempo ? { tempo } : {}) }) };
};

export const CASTELO_FORTE = peca({
  id: "castelo-forte",
  analise: "Repare no baixo: quase nunca para, em colcheias que ligam um acorde ao outro, enquanto o soprano canta a melodia de Lutero em semínimas. Bach usa o alcance inteiro das vozes (o baixo desce ao Ré grave no fim) e deixa contralto e tenor se cruzarem quando isso dá uma linha melhor a cada um: por isso o motor do curso, que segue as regras escolares, aponta cruzamentos e sobreposições. Compare os alertas com o que você ouve.",
  titulo: "Castelo Forte (Ein feste Burg ist unser Gott)",
  conhecidoComo: "“Castelo Forte”, presente em muitos hinários de língua portuguesa",
  autoria: "Melodia e texto: Martinho Lutero (c. 1529). Harmonização a quatro vozes: Johann Sebastian Bach, BWV 302.",
  fonte: { descricao: "Corais de Bach do corpus do music21 (edição digital da harmonização BWV 302)", url: "https://github.com/cuthbertLab/music21/tree/master/music21/corpus/bach" },
  dominioPublico: "Lutero morreu em 1546 e Bach em 1750: melodia, texto alemão e harmonização estão em domínio público há séculos (Lei 9.610/98, art. 41). A tradução portuguesa do hinário NÃO foi usada: o texto aqui é o alemão original.",
  key: "D",
  time: "4/4",
  voices: {
    S: "r:h. D5:q\"Ein' | D5:q\"fe- D5:q\"ste A4:8\"Burg B4:8 C#5:q\"ist | D5:8\"un- C#5:8 B4:q\"ser A4:q\"Gott, D5:q\"ein' | C#5:q\"gu- B4:q\"te A4:q\"Wehr B4:q\"und | G4:8\"Waf- F#4:8 E4:q D4:q\"fen. D4:q\"Der | A4:q\"alt' B4:q A4:q\"bö- G#4:q\"se | A4:h\"Feind, D4:q\"mit A4:q\"Ernst | B4:q\"er's C#5:q\"jetzt D5:q\"meint, C#5:q\"gross | D5:8\"Macht C#5:8\"und B4:q\"viel A4:q\"List B4:q\"sein | B4:q\"grau- A4:q\"sam' B4:8\"Rüst- A4:8 G4:q\"zeug | F#4:q\"ist, D5:q\"auf C#5:q\"Erd'n B4:q\"ist | A4:q\"nicht B4:8\"sein's A4:8 G4:q\"Glei- F#4:q | E4:h D4:q\"chen. r:q",
    A: "r:h. A4:q | D4:q D4:8 E4:8 F#4:q G4:q | A4:q G#4:q E4:q B4:q | E4:q D4:q C#4:q B3:q | C#4:8 D4:q C#4:8 D4:q D4:q | C#4:q D4:q E4:8 D4:8 B3:q | C#4:h D4:8 E4:8 F#4:q | G4:8 F#4:8 E4:q F#4:q F#4:q | F#4:16 G#4:16 A4:q G#4:8 E4:q G4:q | G4:q D#4:8 E4:8 F#4:q E4:q | D#4:q F#4:q F#4:8 E4:8 D4:8 E4:8 | F#4:8 E4:8 D4:q E4:8 A3:8 D4:q~ | D4:q C#4:q A3:q r:q",
    T: "r:h. F#4:q | F#4:q B3:8 C#4:8 D4:q E4:q | F#4:q. E4:16 D4:16 C#4:q F#3:8 G#3:8 | A#3:q B3:q F#4:8 E4:8 D4:q | E4:8 A3:q G3:8 F#3:q F#3:8 G3:8 | A3:q G#3:8 F#3:8 E3:8 F#3:8 E3:q | E3:h A3:q D4:q | D4:q A3:q A3:q A3:q | B3:8 E4:8 F#4:8 E4:8 C#4:q E4:q | D4:8 E4:8 F#4:q B3:q B3:q | B3:q B3:q A3:q B3:8 C#4:8 | D4:q G3:8 F#3:8 E3:q F#3:16 G3:16 A3:8 | B3:q A3:8 G3:8 F#3:q r:q",
    B: "r:h. D4:8 C#4:8 | B3:q A3:8 G3:8 F#3:q E3:q | D3:q E3:q A2:q B2:q | C#3:q D3:8 E3:8 F#3:q G3:8 F#3:8 | E3:8 D3:8 A2:q D3:q D3:8 E3:8 | F#3:q E3:8 D3:8 C#3:8 D3:8 E3:q | A2:h F#3:q E3:8 D3:8 | G3:q A3:q D3:q F#3:q | B2:8 C#3:8 D3:8 E3:8 A2:q E3:8 F#3:8 | G3:q F#3:8 E3:8 D#3:q E3:q | B2:q B2:q F#3:q G3:q | D3:8 C#3:8 B2:q C#3:q D3:q | G2:q A2:q D2:q r:q",
  },
});

export const FRONTE_ENSANGUENTADA = peca({
  id: "fronte-ensanguentada",
  analise: "Tom menor, frases curtas e um final suspenso: a última frase termina no acorde de Mi maior, a dominante de Lá menor, com o baixo descendo Sol♯ – Lá – Mi. É a cadência que deixa a pergunta no ar. Ouça também as notas de passagem em colcheias no contralto e no tenor, que preenchem os saltos da melodia.",
  titulo: "Ó Fronte Ensanguentada (O Haupt voll Blut und Wunden)",
  conhecidoComo: "“Ó Fronte Ensanguentada”, hino da Paixão cantado em muitas igrejas",
  autoria: "Melodia: Hans Leo Hassler (1601). Texto: Paul Gerhardt (1656). Harmonização: J. S. Bach, Paixão segundo São Mateus, BWV 244.62.",
  fonte: { descricao: "Corais de Bach do corpus do music21 (BWV 244.62)", url: "https://github.com/cuthbertLab/music21/tree/master/music21/corpus/bach" },
  dominioPublico: "Hassler (m. 1612), Gerhardt (m. 1676) e Bach (m. 1750): domínio público. Texto alemão original; nenhuma tradução protegida foi usada.",
  key: "Am",
  time: "4/4",
  voices: {
    S: "r:h. E4:q\"O | A4:q\"Haupt G4:q\"voll F4:q\"Blut E4:q\"und | D4:h\"Wun- E4:q\"den, B4:q\"voll | C5:q\"Schmerz B4:8\"und C5:16 D5:16 C5:q\"vol- B4:8\"ler A4:8 | A4:h.\"Hohn! C5:q\"O | B4:8\"Haupt, A4:8 G4:q\"sonst A4:q\"schön B4:q\"ge- | C5:h\"zie- C5:q\"ret G4:q\"mit | A4:q\"höch- G4:q\"ster F4:8\"Ehr E4:8 F4:q\"und | E4:h.\"Zier. C5:q\"jetzt | B4:8\"ab- C5:8 D5:q\"er C5:q\"hoch B4:q\"schim- | A4:h\"pfi- B4:q\"ret: E4:q\"ge- | F4:q\"grü- E4:q\"sset D4:q\"seist G4:q\"du | E4:h.\"mir! r:q",
    A: "r:h. C4:q | C4:8 D4:8 E4:q A3:8 B3:8 C4:q | C4:q B3:q C4:q E4:q | E4:q F4:q E4:q D4:8 C4:8 | C4:h. E4:q | F#4:q E4:q F4:q F4:q | G4:q F4:q E4:q E4:q | E4:8 D4:8 C#4:8 D4:8 E4:q. D4:8 | D4:q C#4:h A4:q | G4:q G4:q G4:8 A4:8 B4:8 G4:8 | G4:q F#4:q G4:q C4:q | D4:q C4:q D4:q E4:8 D4:8 | D4:q C4:q B3:q r:q",
    T: "r:h. A3:q | A3:8 B3:8 C4:q D4:q G3:q | A3:q G3:q G3:q B3:q | A3:q A3:q A3:q G#3:q | E3:h. A3:8 G3:8 | F#3:q B3:q C4:q D4:q | C4:8 Bb3:q Ab3:8 G3:q C4:8 Bb3:8 | A3:q Bb3:q A3:q A3:q | A3:h. D4:q | D4:q D4:8 E4:16 F4:16 E4:q D4:q | E4:q D4:q D4:q G3:q | G3:q G3:q G3:8 A3:8 Bb3:q | B3:q A3:q G#3:q r:q",
    B: "r:h. A3:8 G3:8 | F3:q E3:q D3:q C3:q | F#2:q G2:q C3:q G#2:q | A2:q D3:q E3:q E2:q | A2:h. A3:q | D#3:q E3:q Eb3:q D3:q | E3:q F3:q C3:q C3:q | F3:q E3:8 D3:8 C#3:q D3:q | A2:h. F#3:q | G3:8 A3:8 B3:q E3:8 F#3:8 G3:q | C#3:q D3:q G2:q C3:q | B2:q C3:q Bb2:8 A2:8 G2:q | G#2:q A2:q E2:q r:q",
  },
});

export const NUN_DANKET = peca({
  id: "nun-danket",
  analise: "Comece pelo baixo do 2º compasso: colcheias que sobem e descem pelo acorde enquanto contralto e tenor ficam quase parados. Bach dobra a sensível uma vez (o motor marca como erro de escrita escolar): escute o trecho e julgue se incomoda. O final repousa em Lá maior com a terça no tenor e a fundamental no baixo.",
  titulo: "Nun danket alle Gott (Agora, todos, dai graças a Deus)",
  conhecidoComo: "hino de ação de graças cantado em muitas tradições cristãs",
  autoria: "Melodia: Johann Crüger (1647). Texto: Martin Rinkart (1636). Harmonização: J. S. Bach, BWV 386.",
  fonte: { descricao: "Corais de Bach do corpus do music21 (BWV 386)", url: "https://github.com/cuthbertLab/music21/tree/master/music21/corpus/bach" },
  dominioPublico: "Crüger (m. 1662), Rinkart (m. 1649) e Bach (m. 1750): domínio público. Texto alemão original.",
  key: "A",
  time: "4/4",
  voices: {
    S: "r:h. E5:q\"Nun | E5:q\"dan- E5:q\"ket F#5:q\"al- F#5:q\"le | E5:h\"Gott r:q C#5:q\"mit | D5:q\"Her- C#5:q\"zen, B4:q\"Mund C#5:8.\"und D5:16 | B4:h\"Hän- A4:q\"den, B4:q\"der | B4:q\"uns B4:q\"von C#5:q\"Mut- C#5:q\"ter- | B4:h\"leib r:q B4:q\"und | C#5:8\"Kin- D#5:8 E5:q\"des- E5:q\"bei- D#5:q\"nen | E5:h\"an r:q E5:q\"un- | F#5:q\"zäh- E5:q\"lig D5:q\"viel C#5:q\"zu | D5:h\"gut, r:q C#5:q\"und | B4:q\"noch C#5:8.\"jetz- D5:16 B4:q.\"und A4:8\"ge- | A4:h.\"than. r:q",
    A: "r:h. A4:q | A4:q A4:q A4:q A4:q | A4:h r:q A4:q | B4:q A4:q G#4:q A4:q~ | A4:8 F#4:8 G#4:q E4:q G#4:8 F#4:8 | E4:q E4:q E4:q E4:q | E4:h r:q G#4:q | A4:q G#4:q F#4:q F#4:q | G#4:h r:q A4:q | A4:8 B4:8 C#5:q. B4:q A#4:8 | B4:h r:q A4:q | G#4:q A4:q A4:q G#4:q | E4:h. r:q",
    T: "r:h. C#4:q | C#4:q C#4:q D4:q D4:q | C#4:h r:q F#4:q | E4:q E4:q E4:q E4:q | E4:8 D4:16 C#4:16 D4:q C#4:q B3:8 A3:8 | G#3:8 A3:8 B3:q. A3:16 G#3:16 A3:q | G#3:h r:q E4:q | E4:q E4:q C#4:q B3:q | B3:h r:q C#4:q | D4:q C#4:q F#4:q G4:8 F#4:8 | F#4:h r:q E4:q | E4:q E4:8 F#4:8 F#4:8 D4:8 B3:8. E4:16 | C#4:h. r:q",
    B: "r:h. A2:q | A3:8 B3:8 C#4:8 A3:8 D3:8 E3:8 F#3:8 D3:8 | A3:h r:q A3:q | G#3:q A3:q E3:8 D3:8 C#3:8 A2:8 | E3:h A2:q E3:q | E3:8 F#3:8 G#3:8 E3:8 A2:8 B2:8 C#3:8 A2:8 | E2:h r:q E3:q | A3:8 B3:8 C#4:8 G#3:8 A3:8 F#3:8 B3:8 B2:8 | E3:h r:q A2:q | D3:8 C#3:8 B2:8 A#2:8 B2:8 D3:8 E3:8 F#3:8 | B2:h r:q C#3:8 D3:8 | E3:q A3:8 F#3:8 D3:8 B2:8 E3:8 E2:8 | A2:h. r:q",
  },
});

export const WACHET_AUF = peca({
  id: "wachet-auf",
  analise: "Uma melodia longa, em Mi♭ maior, com frases de tamanhos diferentes. O baixo termina com o salto de dominante para tônica (Si♭ – Mi♭) e o contralto e o tenor fecham por grau conjunto. Bach leva o soprano ao Sol agudo e o baixo ao Mi♭ grave: veja como o motor trata esses extremos de extensão.",
  titulo: "Wachet auf (Despertai, a voz nos chama)",
  conhecidoComo: "coral do Advento que fecha a cantata BWV 140",
  autoria: "Melodia e texto: Philipp Nicolai (1599). Harmonização: J. S. Bach, Cantata BWV 140, n.º 7.",
  fonte: { descricao: "Corais de Bach do corpus do music21 (BWV 140.7)", url: "https://github.com/cuthbertLab/music21/tree/master/music21/corpus/bach" },
  dominioPublico: "Nicolai (m. 1608) e Bach (m. 1750): domínio público. Texto alemão original.",
  key: "Eb",
  time: "4/4",
  voices: {
    S: "Eb4:q\"Wa- G4:q\"chet Bb4:q.\"auf, Bb4:8\"ruft | Bb4:q\"uns Bb4:q\"die C5:h\"Stim- | Bb4:h\"me r:q Bb4:q\"der | Eb5:q\"Wäch- Bb4:q\"ter Eb5:8\"sehr F5:8 G5:q\"hoch | F5:q\"auf Eb5:q\"der D5:q\"Zin- C5:q | Bb4:h\"ne: r:q Bb4:q\"wach' | Eb5:q\"auf, Bb4:q\"du C5:q\"Stadt G4:q\"Je- | Ab4:8\"ru- G4:8 F4:q\"sa- Eb4:q\"lem! Bb4:q\"Wohl- | Bb4:q.\"auf, Ab4:8\"der G4:q\"Bräut- F4:q\"gam | Eb4:h\"kommt, r:q Bb4:q\"steht | Bb4:q.\"auf, Ab4:8\"die G4:q\"Lam- F4:q\"pen | Eb4:h\"nehmt. r:q F4:q\"Al- | G4:q\"le- Ab4:q\"lu- G4:q\"ja! Bb4:q\"macht | C5:q\"euch D5:q\"be- Eb5:q\"reit Eb5:8\"zu F5:8 | G5:q\"der F5:q\"Hoch- Eb5:q\"zeit, Bb4:q\"ihr | Eb5:q\"müs- Bb4:q\"set C5:q\"ihm G4:q\"ent- | Ab4:8\"ge- G4:8 F4:q\"gen Eb4:h\"gehn.",
    A: "Bb3:q Eb4:q G4:q F4:q | G4:q F4:q G4:q F4:q | F4:h r:q F4:q | Bb4:q. Ab4:8 G4:8 Ab4:8 Bb4:q | Bb4:q C5:q. Bb4:q A4:8 | F4:h r:q G4:q | Ab4:q G4:q Eb4:q Eb4:q | Eb4:q D4:q Bb3:q F4:q | G4:q. F4:8 Bb3:8 C4:8 D4:q | C4:h r:q D4:8 Eb4:8 | F4:q F4:q. Eb4:q D4:8 | Bb3:h r:q D4:q | Eb4:q. D4:8 Eb4:q G4:q~ | G4:8 F4:q G4:8 G4:q G4:8 Ab4:8 | Bb4:q. Ab4:8 G4:q G4:8 Ab4:8 | Bb4:8 Ab4:8 Bb4:8 G4:8 Ab4:q Eb4:q | Eb4:q D4:q Bb3:h",
    T: "G3:q Bb3:q Eb4:q D4:q | Eb4:q Bb3:q Bb3:q A3:q | D4:h r:q D4:q | Eb4:q Eb4:q Bb3:q Eb4:q | F4:q F4:q F4:q. C4:8 | D4:h r:q Eb4:q | Eb4:q. Db4:8 C4:q C4:q | C4:8 Bb3:8 Ab3:q G3:q Bb3:q | Eb4:8 D4:8 C4:8 D4:8 Eb4:q Bb3:8 Ab3:8 | G3:h r:q Bb3:q | Bb3:8 C4:8 D4:q Bb3:8 C4:q Bb3:8 | G3:h r:q Bb3:q | Bb3:q C4:8 Ab3:8 Bb3:q Eb4:q | Eb4:q D4:q C4:q Eb4:q | Eb4:q D4:q Eb4:q Eb4:q | Bb3:q Eb4:q Eb4:q. C4:8 | C4:8 Bb3:8 Ab3:q G3:h",
    B: "Eb3:h~ Eb3:8 G3:8 Bb3:8 Ab3:8 | G3:8 F3:8 Eb3:8 D3:8 Eb3:8 C3:8 F3:q | Bb2:h r:q Bb3:8 Ab3:8 | G3:8 Ab3:8 G3:8 F3:8 Eb3:q Eb4:q | D4:8 C4:8 Bb3:8 A3:8 Bb3:q F3:q | Bb2:h r:q Eb3:8 Db3:8 | C3:8 D3:8 Eb3:q Ab2:8 Bb2:8 C3:q | F2:q Bb2:q Eb2:q D3:q | Eb3:q F3:q G3:8 Ab3:8 Bb3:8 Bb2:8 | C3:h r:q G3:q | D3:8 C3:8 Bb2:q Eb3:8 C3:8 Ab2:8 Bb2:8 | Eb3:h r:q Bb3:8 Ab3:8 | G3:q F3:q Eb3:q Eb4:q | A3:q B3:q C4:q C4:q | G3:8 Ab3:8 Bb3:q C3:q Eb3:8 F3:8 | G3:8 F3:8 G3:8 Eb3:8 Ab2:8 Bb2:8 C3:q | F2:q Bb2:q Eb2:h",
  },
});

export const DOXOLOGIA = peca({
  id: "doxologia",
  analise: "A melodia de Genebra, que costuma ser cantada em compasso binário, aqui está em ternário (3/4), como Bach a escreveu na cantata. Observe a primeira frase: o baixo sobe Dó – Ré – Mi – Fá – Sol em colcheias sob a nota longa do soprano. O final é uma cadência perfeita em Dó maior.",
  titulo: "Doxologia — Old 100th (Herr Gott, dich loben alle wir)",
  conhecidoComo: "“Doxologia” (Old Hundredth), a melodia do “louvor final” de muitos cultos",
  autoria: "Melodia: Louis Bourgeois, Saltério de Genebra (1551). Harmonização: J. S. Bach, Cantata BWV 130, n.º 6, em compasso ternário.",
  fonte: { descricao: "Corais de Bach do corpus do music21 (BWV 130.6); melodia original conferida na Wikipédia (Old 100th)", url: "https://en.wikipedia.org/wiki/Old_100th" },
  dominioPublico: "Bourgeois (m. c. 1560) e Bach (m. 1750): domínio público. Versão sem letra.",
  key: "C",
  time: "3/4",
  voices: {
    S: "r:h C5:q | C5:h B4:q | A4:h G4:q | C5:h D5:q | E5:h E5:q | E5:h E5:q | D5:h C5:q | F5:h E5:q | D5:h C5:q | D5:h E5:q | D5:h C5:q | A4:q B4:h | C5:h G5:q | E5:q. D5:8 C5:q | D5:q. E5:8 F5:q | E5:q D5:h | C5:h r:q",
    A: "r:h G4:q | G4:h G4:8 F4:8 | E4:q. F4:8 G4:q | E4:q C5:q B4:q | G4:h G4:q | G4:h G4:q | F4:q E4:q E4:q | A4:q G4:8 F4:8 C5:q | B4:h E4:8 F#4:8 | G4:h G4:q | G#4:h A4:q | A4:q G4:8 F4:8 G4:q | G4:h G4:q | G4:q. F4:8 G4:q | A4:q G4:q C5:q | C5:q B4:8 A4:8 G4:q | G4:h r:q",
    T: "r:h E4:q | E4:h D4:q | C4:h C4:q | C4:q G3:q G4:q | E4:h C4:q | C4:h B3:8 A3:8 | B3:h C4:q | C4:q. B3:8 G4:q | G4:h C4:q | B3:h C4:q | B3:h C4:q | C4:q B3:8 C4:8 D4:q | E4:h D4:q | C4:q G3:q C4:q | C4:q B3:q A3:q | G3:q G4:q. F4:8 | E4:h r:q",
    B: "r:h C3:q | C3:8 D3:8 E3:8 F3:8 G3:q | A2:8 B2:8 C3:8 D3:8 E3:q | A3:q E3:q G3:q | C3:h C3:q | C3:8 D3:8 E3:8 F3:8 G3:8 A3:8 | G#3:8 F#3:8 G#3:8 E3:8 A3:8 G3:8 | F3:q E3:8 D3:8 C3:q | G3:h A3:q | G3:8 F3:8 E3:8 D3:8 C3:8 D3:8 | E3:8 D3:8 C3:8 B2:8 A2:q | F3:q D3:q G3:q | C3:h B2:q | C3:8 B2:8 C3:8 D3:8 E3:8 C3:8 | F3:8 E3:8 F3:8 G3:8 A3:8 B3:8 | C4:q G3:h | C3:h r:q",
  },
});

export const SANTO_SANTO_SANTO = peca({
  id: "santo-santo-santo",
  analise: "Homofonia de hino: as quatro vozes mudam de acorde juntas, quase sempre em semínimas e mínimas, e o texto se entende em todas elas. A melodia começa subindo pelo acorde de Ré maior (Ré – Fá♯ – Lá) e cada frase termina numa nota longa. É um ótimo modelo de harmonização a quatro vozes para coro amador.",
  titulo: "Santo! Santo! Santo! (Nicaea)",
  conhecidoComo: "cantado em português como “Santo! Santo! Santo!”",
  autoria: "Melodia e harmonização: John Bacchus Dykes (1861). Texto: Reginald Heber (1826).",
  fonte: { descricao: "Partitura SATB de Dykes transcrita na Wikipédia (Holy, Holy, Holy! Lord God Almighty); os valores foram reescritos de 4/2 para 4/4 (cada compasso vira dois)", url: "https://en.wikipedia.org/wiki/Holy,_Holy,_Holy!_Lord_God_Almighty" },
  dominioPublico: "Dykes morreu em 1876 e Heber em 1826: melodia, harmonização e texto inglês estão em domínio público. A tradução portuguesa não foi usada.",
  key: "D",
  time: "4/4",
  voices: {
    S: "D4:q\"Ho- D4:q\"ly, F#4:q\"ho- F#4:q\"ly, | A4:h\"ho- A4:h\"ly! | B4:h\"Lord B4:q\"God B4:q\"Al- | A4:h\"migh- F#4:h\"ty! | A4:q.\"Ear- A4:8\"ly A4:q\"in A4:q\"the | D5:h\"mor- C#5:q\"ning A4:q\"our | E4:q\"song A4:q\"shall B4:q.\"rise A4:8\"to | A4:w\"thee; | D4:q\"Ho- D4:q\"ly, F#4:q\"ho- F#4:q\"ly, | A4:h\"ho- A4:h\"ly! | B4:q.\"Mer- B4:8\"ci- B4:q\"ful B4:q\"and | A4:h\"migh- A4:h\"ty! | D5:h\"God A4:q\"in A4:q\"three | B4:h\"Per- F#4:h\"sons, | G4:q\"bles- E4:q\"sed E4:q.\"Tri- D4:8\"ni- | D4:w\"ty!",
    A: "A3:q A3:q D4:q D4:q | C#4:q E4:q D4:q C#4:q | B3:q C#4:q D4:q E4:q | F#4:h D4:h | E4:q E4:q F#4:q E4:q | D4:q E4:q E4:q F#4:q | E4:q C#4:q D4:q. C#4:8 | C#4:w | A3:q A3:q D4:q D4:q | C#4:q E4:q D4:q C#4:q | B3:q C#4:q D4:q E4:q | F#4:h D4:h | D4:h D4:q D4:q | D4:h D4:q C4:q | B3:q B3:q C#4:q. D4:8 | D4:w",
    T: "F#3:q F#3:q D3:q D3:q | E3:q G3:q F#3:q A3:q | G3:q A3:q B3:q C#4:q | D4:q A3:q A3:h | A3:q A3:q A3:q A3:q | F#3:q G#3:q A3:q A3:q | C#4:q A3:q G#3:q. A3:8 | A3:h G3:h | F#3:q F#3:q D3:q D3:q | E3:q G3:q F#3:q A3:q | G3:q A3:q B3:q C#4:q | D4:q A3:q F#3:h | F#3:q G3:q A3:q C4:q | B3:h A3:h | G3:q G3:q G3:q. F#3:8 | F#3:w",
    B: "D3:q D3:q B2:q B2:q | A2:h D3:h | G2:h G3:q G3:q | D3:h D3:h | C#3:q C#3:q D3:q C#3:q | B2:h C#3:q D3:q | E3:q E3:q E3:q. A2:8 | A2:w | D3:q D3:q B2:q B2:q | A2:h D3:h | G2:q. G2:8 G3:q G3:q | D3:h D3:h | B2:h F#2:q F#2:q | G2:h D3:h | G2:q G2:q A2:q. D3:8 | D3:w",
  },
});

export const NOITE_FELIZ = peca({
  id: "noite-feliz",
  analise: "Na primeira versão, Noite Feliz era um dueto: a segunda voz acompanha a melodia quase sempre uma terça ou uma sexta abaixo, no mesmo ritmo. É a textura de duas vozes paralelas mais conhecida do repertório. Cante as duas linhas e repare que elas só se separam no fim de cada frase.",
  titulo: "Noite Feliz (Stille Nacht), versão de 1818",
  conhecidoComo: "“Noite Feliz”, o cântico de Natal mais conhecido do mundo",
  autoria: "Melodia: Franz Xaver Gruber (1818). Texto: Joseph Mohr (1816). Duas vozes, como na primeira versão (o tenor e o baixo ficam em pausa).",
  fonte: { descricao: "Primeira edição transcrita na Wikipédia (Silent Night), com a segunda voz original", url: "https://en.wikipedia.org/wiki/Silent_Night" },
  dominioPublico: "Gruber (m. 1863) e Mohr (m. 1848): domínio público. Texto alemão original.",
  key: "D",
  time: "6/8",
  voices: {
    S: "A4:8.\"Stil- B4:16\"le A4:8\"Nacht! F#4:q r:8 | A4:8.\"Hei- B4:16\"li- A4:8\"ge F#4:q\"Nacht! r:8 | E5:8.\"Al- D#5:16\"les E5:8\"schläft; C#5:q r:8 | D5:8.\"ein- C#5:16\"sam D5:8\"wacht A4:q r:8 | B4:q\"Nur B4:8\"das D5:8.\"trau- C#5:16\"te B4:8\"hei- | A4:8.\"li- B4:16\"ge A4:8\"Paar. F#4:q r:8 | B4:q\"Hol- B4:8\"der D5:8.\"Knab' C#5:16\"im B4:8\"lok- | A4:8.\"kig- B4:16\"ten A4:8\"Haar, F#4:q r:8 | C#5:8.\"Schla- C#5:16\"fe C#5:8\"in E5:8.\"himm- D5:16\"li- C#5:8\"scher | D5:q.\"Ruh! F#5:q r:8 | D5:8.\"Schla- A4:16\"fe F#4:8\"in A4:8.\"himm- G4:16\"li- E4:8\"scher | D4:q.~\"Ruh! D4:q r:8",
    A: "F#4:8. G4:16 F#4:8 D4:q r:8 | F#4:8. G4:16 F#4:8 D4:q r:8 | G4:8. F#4:16 G4:8 E4:q r:8 | F#4:8. E4:16 F#4:8 F#4:q r:8 | G4:q G4:8 B4:8. A4:16 G4:8 | F#4:8. G4:16 F#4:8 D4:q r:8 | G4:q G4:8 B4:8. A4:16 G4:8 | F#4:8. G4:16 F#4:8 D4:q r:8 | E4:8. E4:16 E4:8 G4:8. F#4:16 E4:8 | F#4:q. A4:q r:8 | F#4:8. F#4:16 D4:8 F#4:8. E4:16 C#4:8 | D4:q.~ D4:q r:8",
    T: "r:h. | r:h. | r:h. | r:h. | r:h. | r:h. | r:h. | r:h. | r:h. | r:h. | r:h. | r:h.",
    B: "r:h. | r:h. | r:h. | r:h. | r:h. | r:h. | r:h. | r:h. | r:h. | r:h. | r:h. | r:h.",
  },
});

export const REPERTORIO: readonly PecaDoRepertorio[] = [CASTELO_FORTE, FRONTE_ENSANGUENTADA, NUN_DANKET, WACHET_AUF, DOXOLOGIA, SANTO_SANTO_SANTO, NOITE_FELIZ];
