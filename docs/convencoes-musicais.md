# Convenções musicais

## Alturas e oitavas
- Notação científica: **C4 = Dó central = MIDI 60**, A4 = 440 Hz = MIDI 69.
- A oitava acompanha a letra: B♯3 soa como C4; C♭4 soa como B3.
- Todas as alturas no modelo são **sonoras**. A notação converte em altura **escrita** pela clave:
  - `treble` (clave de sol) e `bass` (clave de fá): escrita = sonora;
  - `treble8vb` (clave de sol oitavada, tenores): escrita = sonora + 1 oitava.

## Intervalos
- Classificados pela **grafia** (número = letras; qualidade = semitons em relação ao número). 4ª aumentada ≠ 5ª diminuta.
- Compostos preservam o número (12ª, 15ª); para paralelismo, valem pela classe simples (12ª justa = 5ª justa).

## Formações e pautas
| Formação | Pauta superior | Pauta inferior |
|---|---|---|
| SATB | Soprano (hastes ↑), Contralto (↓) — clave de sol | Tenor (↑), Baixo (↓) — clave de fá |
| TTBB | Tenor I (↑), Tenor II (↓) — clave de sol oitavada | Barítono (↑), Baixo (↓) — clave de fá |

Extensões e tessituras: `src/domain/music/formations.ts` (padrões didáticos configuráveis por projeto via `rangeOverrides`).

## Durações
- `PPQ = 480` ticks por semínima. Compassos compostos (6/8, 9/8, 12/8) têm tempo = semínima pontuada.
- Acidentes valem até o fim do compasso, por linha/espaço e por pauta (vozes da mesma pauta compartilham o estado). Notas ligadas através da barra não repetem o acidente; a próxima nota não ligada repete.

## Notação textual (exemplos e testes)
`"C4:q D4:q E4:h | F4:q~ F4:q r:h"` — `altura:figura[.][~]["sílaba]`; `r` = pausa; `|` é verificado (soma do compasso).
