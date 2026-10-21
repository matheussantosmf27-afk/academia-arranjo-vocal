# Motor de validação musical

Regras determinísticas, independentes de IA (`src/domain/validation`). Mesma partitura + mesma configuração ⇒ mesmos diagnósticos, com IDs estáveis (`regra@onset:vozes`). Uma regra que falhe internamente é reportada em `ruleFailures`, nunca silenciada.

## Cada diagnóstico contém
localização exata (compasso, tempo, onset, vozes, IDs de eventos) · mensagem com notas e intervalos concretos · explicação da regra · sugestões de correção · exceções pertinentes · **categoria** (erro objetivo, convenção estilística, recomendação, escolha estética) · **gravidade** conforme o estilo (erro, alerta, sugestão, observação) · evidências.

## Estilos
`coral-tradicional` (prática comum), `coral-contemporaneo`, `popular-a-cappella`. O estilo altera a gravidade — ou desliga a regra —, nunca a detecção do fato musical.

## Regras (v0.1.0)
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
| harmonia.sonoridade-nao-terciana | recomendação (observação) | não "adivinha" acordes |
| harmonia.acorde-final | escolha estética | |

## Limitações conhecidas
- Paralelismos são avaliados entre sonoridades **consecutivas**; paralelas "atravessando" notas de passagem ou entre tempos fortes ainda não são detectadas (etapa 6).
- Notas estranhas não são classificadas ainda: uma sonoridade não terciana no tempo forte gera apenas observação.
- Identificação de acordes cobre tríades e tétrades tercianas; acordes com notas acrescentadas (add9, sus) aparecem como não tercianos.
- Análise romana não reconhece dominantes secundárias nem modulações.
