# Motor de validação musical

Regras determinísticas, independentes de IA (`src/domain/validation`). Mesma partitura + mesma configuração ⇒ mesmos diagnósticos, com IDs estáveis (`regra@onset:vozes`). Uma regra que falhe internamente é reportada em `ruleFailures`, nunca silenciada.

## Cada diagnóstico contém
localização exata (compasso, tempo, onset, vozes, IDs de eventos) · mensagem com notas e intervalos concretos · explicação da regra · sugestões de correção · exceções pertinentes · **categoria** (erro objetivo, convenção estilística, recomendação, escolha estética) · **gravidade** conforme o estilo (erro, alerta, sugestão, observação) · evidências.

## Estilos
`coral-tradicional` (prática comum), `coral-contemporaneo`, `popular-a-cappella`. O estilo altera a gravidade — ou desliga a regra —, nunca a detecção do fato musical.

## Regras (v0.2.0)
| ID | Categoria | Notas |
|---|---|---|
| estrutura.duracao-da-voz | erro objetivo | |
| estrutura.nota-atravessa-barra | erro objetivo | |
| extensao.fora-da-extensao | erro objetivo (relativo à extensão configurada) | |
| extensao.fora-da-tessitura | recomendação | agrupa notas consecutivas |
| vozes.cruzamento | convenção | info no popular |
| vozes.sobreposicao | convenção | desligada no popular |
| vozes.espacamento | convenção | limites por formação (8ª, 8ª, 12ª) |
| vozes.limite-grave-de-intervalo | recomendação | crucial no TTBB |
| conducao.paralelas | convenção | 5ªs/8ªs/uníssonos, inclusive compostos |
| conducao.paralelas-por-movimento-contrario | convenção | exceção: cadência final nas vozes extremas |
| conducao.quintas-desiguais | convenção | só d5→J5 com o baixo; J5→d5 é aceito |
| conducao.quintas-oitavas-diretas | convenção | só vozes extremas; exceções: soprano por grau, mesmo acorde |
| melodia.intervalo-aumentado | convenção | |
| melodia.salto-grande | convenção | >8ª alerta; 7ª sugestão |
| melodia.compensacao-de-salto | recomendação | exceção: 8ª no baixo |
| melodia.saltos-consecutivos | recomendação | arpejos consonantes não são apontados |
| harmonia.sensivel-dobrada | convenção | só em função dominante |
| harmonia.resolucao-da-sensivel | convenção | exceção reconhecida: sensível frustrada em voz interna |
| harmonia.resolucao-da-setima | convenção | exceção reconhecida: V⁴₃ → I⁶ |
| harmonia.notas-estranhas | escolha estética (classificação) / convenção (sem tratamento) | passagem, bordadura, retardo (com cifra 4–3, 7–6, 9–8), retardo ascendente, apojatura, escapada, antecipação; dissonância sem preparação/resolução → alerta no tradicional |
| harmonia.sonoridade-nao-terciana | recomendação (observação) | só quando nem a redução harmônica encontra acorde |
| vozes.duplicacao | recomendação | terça dobrada em tríade no estado fundamental (exceção: vi após V); acorde sem terça no meio da frase |
| harmonia.seis-quatro | convenção | aceita ⁶₄ cadencial, de passagem, de pedal e arpejado |
| harmonia.retrogressao | convenção | D → S; ignora funções secundárias |
| harmonia.sincope-harmonica | recomendação | mesma harmonia e inversão do tempo fraco para o forte |
| conducao.paralelas-em-tempos-fortes | convenção | só vozes extremas e só quando o que separa os tempos fortes são notas estranhas |
| escrita.respiracao | recomendação | mais de 15 s de canto contínuo (heurística) |
| harmonia.acorde-final | escolha estética | |

## Redução harmônica (v0.2.0)
Quando as notas soando não formam acorde, o motor procura o acorde subjacente removendo uma ou duas notas candidatas a estranhas (`reduction.ts`). Considera também a nota de **resolução** (retardo 4–3, em que a terça só soa depois) e a **persistência** da harmonia anterior quando nenhuma nota do acorde foi rearticulada (antecipação, escapada). As regras de sensível, sétima e cifragem usam esse acorde reduzido. A cifragem romana reconhece **dominantes secundárias** (V/x, V⁷/x, vii°/x, viiø7/x).

## Limitações conhecidas
- Paralelas diretas são avaliadas entre sonoridades consecutivas; as "estruturais" só entre tempos fortes das vozes extremas.
- A redução considera no máximo duas notas estranhas simultâneas; notas pedais longas e dupla bordadura (cambiata) ainda não são classificadas.
- Acordes com notas acrescentadas (add9, sus) e harmonia quartal aparecem como não tercianos.
- Modulações não são detectadas: a cifragem usa sempre a tonalidade da partitura (tonicizações aparecem como funções secundárias).
- Prosódia (sílaba tônica × tempo forte) exige marcação de acento nas sílabas e entra junto com o trabalho de texto.
