import { scoreFromText } from "@/domain/music/text-notation";

/**
 * Exemplos musicais das lições (originais). O veredito de cada uso é conferido
 * pelo motor de validação no teste de integridade do currículo.
 */
const satb = (id: string, title: string, voices: Record<"S" | "A" | "T" | "B", string>, opts: { key?: string; time?: string; tempo?: number; style?: "coral-tradicional" | "coral-contemporaneo" | "popular-a-cappella" } = {}) =>
  scoreFromText({ id, title, formation: "SATB", key: opts.key ?? "C", time: opts.time ?? "4/4", voices, ...(opts.tempo ? { tempo: opts.tempo } : {}), ...(opts.style ? { style: opts.style } : {}) });
const ttbb = (id: string, title: string, voices: Record<"T1" | "T2" | "B1" | "B2", string>, opts: { key?: string; time?: string } = {}) =>
  scoreFromText({ id, title, formation: "TTBB", key: opts.key ?? "G", time: opts.time ?? "4/4", voices });

const REST2 = "r:w | r:w";

export const EX = {
  menorMelodica: satb("ex-menor-melodica", "Contralto em lá menor (forma melódica ascendente)", { S: REST2, A: "A3:q B3:q C4:q D4:q | E4:q F#4:q G#4:q A4:q", T: REST2, B: REST2 }, { key: "Am" }),
  segundaAumentada: satb("ex-segunda-aumentada", "Contralto em lá menor com 2ª aumentada", { S: "r:h r:h", A: "F4:h G#4:h", T: "r:h r:h", B: "r:h r:h" }, { key: "Am" }),

  ritmoComLetra: satb(
    "ex-ritmo-letra",
    "Melodia em 3/4 com letra (sílabas tônicas nos tempos fortes)",
    { S: 'G4:h"CAN- A4:q"ta | B4:h"CO- A4:q"ro | G4:h."JÁ', A: "r:h. | r:h. | r:h.", T: "r:h. | r:h. | r:h.", B: "r:h. | r:h. | r:h." },
    { time: "3/4" },
  ),
  ritmoAtravessaBarra: satb("ex-ritmo-barra", "Mínima pontuada atravessando a barra (erro de escrita)", { S: "C5:q C5:h. G4:h. G4:h", A: "r:w r:w", T: "r:w r:w", B: "r:w r:w" }),

  // V7 completo → I incompleto: sétima (A, F4) desce, sensível (T, B3) sobe.
  v7I: satb("ex-v7-i", "V7 → I: a sétima desce, a sensível sobe", { S: "D5:h C5:h", A: "F4:h E4:h", T: "B3:h C4:h", B: "G2:h C3:h" }),
  v43I6: satb("ex-v43-i6", "V⁴₃ → I⁶: a sétima sobe com o baixo (exceção)", { S: "B4:h C5:h", A: "F4:h G4:h", T: "G3:h C4:h", B: "D3:h E3:h" }),
  setimaSobe: satb("ex-setima-sobe", "V7 → I com a sétima subindo (incorreto)", { S: "F4:h G4:h", A: "D4:h E4:h", T: "B3:h C4:h", B: "G2:h C3:h" }),

  // V → IV: retrogressão (observação no estilo tradicional)
  retrogressao: satb("ex-retrogressao", "V → IV (retrogressão)", { S: "B4:h C5:h", A: "G4:h A4:h", T: "D4:h F4:h", B: "G3:h F3:h" }),

  cadAutentica: satb("ex-cad-autentica", "Cadência autêntica perfeita", { S: "B4:h C5:h", A: "G4:h G4:h", T: "D4:h E4:h", B: "G2:h C3:h" }),
  cadPlagal: satb("ex-cad-plagal", "Cadência plagal", { S: "C5:h C5:h", A: "F4:h E4:h", T: "A3:h G3:h", B: "F3:h C3:h" }),
  cadSemi: satb("ex-cad-semi", "Semicadência", { S: "C5:h B4:h", A: "E4:h D4:h", T: "G3:h G3:h", B: "C3:h G2:h" }),
  cadEngano: satb("ex-cad-engano", "Cadência de engano (terça dobrada no vi)", { S: "B4:h C5:h", A: "D4:h C4:h", T: "G3:h E3:h", B: "G2:h A2:h" }),
  sensivelNaoResolve: satb("ex-sensivel-nao-resolve", "V → I com a sensível do soprano descendo", { S: "B4:h G4:h", A: "G4:h E4:h", T: "D4:h C4:h", B: "G2:h C3:h" }),

  paralelas: satb("ex-paralelas", "I → ii com 5ªs e 8ªs paralelas", { S: "G4:h A4:h", A: "E4:h F4:h", T: "C4:h D4:h", B: "C3:h D3:h" }),
  paralelasCorrigidas: satb("ex-paralelas-corrigidas", "I → ii⁶ com movimento contrário", { S: "G4:h F4:h", A: "E4:h D4:h", T: "C4:h A3:h", B: "C3:h F3:h" }),
  paralelasPopular: satb("ex-paralelas-popular", "I → ii em paralelo, avaliado no estilo popular", { S: "G4:h A4:h", A: "E4:h F4:h", T: "C4:h D4:h", B: "C3:h D3:h" }, { style: "popular-a-cappella" }),
  diretas: satb("ex-diretas", "Oitavas diretas com salto no soprano", { S: "E5:h G4:h", A: "G4:h G4:h", T: "E4:h B3:h", B: "C3:h G2:h" }),

  cruzamento: satb("ex-cruzamento", "Soprano abaixo do contralto", { S: "E4:w", A: "G4:w", T: "C4:w", B: "C3:w" }),
  espacamento: satb("ex-espacamento", "Mais de uma oitava entre soprano e contralto", { S: "E5:w", A: "C4:w", T: "G3:w", B: "C3:w" }),
  ttbbGrave: ttbb("ex-ttbb-grave", "TTBB com terça maior no grave", { T1: "D4:w", T2: "G3:w", B1: "B2:w", B2: "G2:w" }),
  ttbbGraveCorrigido: ttbb("ex-ttbb-grave-corrigido", "TTBB com quinta no grave e terça nos tenores", { T1: "D4:w", T2: "B3:w", B1: "D3:w", B2: "G2:w" }),
  ttbbBaixoFora: ttbb("ex-ttbb-baixo-fora", "Baixo abaixo da extensão (D2)", { T1: "D4:w", T2: "B3:w", B1: "G3:w", B2: "D2:w" }),

  sensivelDobrada: satb("ex-sensivel-dobrada", "V com a sensível dobrada", { S: "B4:w", A: "G4:w", T: "B3:w", B: "G2:w" }),
  tercaDobrada: satb("ex-terca-dobrada", "I com a terça dobrada", { S: "E5:w", A: "G4:w", T: "E4:w", B: "C3:w" }),

  passagem: satb("ex-passagem", "Duas notas de passagem no soprano (G–A–B–C sobre I)", { S: "G4:q A4:q B4:q C5:q", A: "E4:w", T: "G3:w", B: "C3:w" }),
  bordadura: satb("ex-bordadura", "Bordadura no soprano", { S: "C5:q D5:q C5:h", A: "E4:w", T: "G3:w", B: "C3:w" }),
  retardo: satb("ex-retardo", "Retardo 9–8 preparado e resolvido", { S: "D5:h~ D5:q C5:q", A: "G4:h E4:h", T: "B3:h C4:h", B: "G2:h C3:h" }),
  apojatura: satb("ex-apojatura", "Apojatura em tempo forte", { S: "G4:h D5:q C5:q", A: "G4:w", T: "E4:w", B: "C3:w" }),
  dissonanciaLivre: satb("ex-dissonancia-livre", "Dissonância atingida e abandonada por salto", { S: "C5:h F5:q C5:q", A: "G4:w", T: "E4:w", B: "C3:w" }),

  melodiaFrase: satb("ex-melodia-frase", "Melodia em duas frases com respiração", { S: "E4:q G4:q C5:q B4:q | A4:h G4:q r:q | A4:q B4:q C5:q D5:q | C5:w", A: "r:w | r:w | r:w | r:w", T: "r:w | r:w | r:w | r:w", B: "r:w | r:w | r:w | r:w" }),
  melodiaSalto: satb("ex-melodia-salto", "Salto de 6ª sem compensação", { S: "C4:q A4:q B4:q C5:q | C5:w", A: "r:w | r:w", T: "r:w | r:w", B: "r:w | r:w" }),

  // Duas vozes (soprano e baixo): consonâncias imperfeitas e movimento contrário
  duasVozes: satb("ex-duas-vozes", "Soprano e baixo independentes", { S: "C5:h D5:h | E5:h D5:h | C5:w", A: "r:w | r:w | r:w", T: "r:w | r:w | r:w", B: "C3:h B2:h | C3:h G2:h | C3:w" }),
  duasVozesParalelas: satb("ex-duas-vozes-paralelas", "Soprano e baixo em quintas paralelas", { S: "G4:h A4:h | B4:w", A: "r:w | r:w", T: "r:w | r:w", B: "C3:h D3:h | E3:w" }),
  semRespiracao: satb("ex-sem-respiracao", "Linha de 20 s sem pausa (♩ = 60)", { S: "C5:w | D5:w | E5:w | D5:w | C5:w", A: "r:w | r:w | r:w | r:w | r:w", T: "r:w | r:w | r:w | r:w | r:w", B: "r:w | r:w | r:w | r:w | r:w" }, { tempo: 60 }),

  // I – V7/V – V – I: tonicização da dominante
  tonicizacao: satb("ex-tonicizacao", "I – V⁷/V – V – I (tonicização da dominante)", { S: "E5:h D5:h | D5:h C5:h", A: "G4:h F#4:h | G4:h E4:h", T: "C4:h C4:h | B3:h C4:h", B: "C3:h D3:h | G2:h C3:h" }),
} as const;
