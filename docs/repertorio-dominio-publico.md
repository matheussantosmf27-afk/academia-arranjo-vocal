# Repertório real em domínio público

Antes desta mudança, o curso usava como fio condutor várias melodias inventadas e com nome próprio: "Canção do Caminho", "Luz da manhã", "Rio de Paz" e outras. Elas foram substituídas por músicas que existem e estão em domínio público. Também entrou no curso uma antologia de hinos e corais reais, na página **Repertório** (`/repertorio`).

## Base legal e um cuidado importante

- **Prazo de proteção** (Lei 9.610/98, art. 41): os direitos patrimoniais duram 70 anos, contados de 1º de janeiro do ano seguinte à morte do autor. Toda peça usada aqui tem melodia, harmonização e texto de autores mortos há mais de 70 anos.
- **Obras de autor desconhecido** (art. 45, II) também estão em domínio público, com a ressalva dos conhecimentos étnicos e tradicionais.
- **Arranjos e traduções** de obras em domínio público são protegidos (art. 14). Por isso:
  - nenhuma tradução portuguesa de hinário foi usada; as letras estão no idioma original, que está em domínio público;
  - nenhum arranjo moderno foi copiado. As harmonizações são as históricas (Bach, Dykes) ou foram escritas para o curso.
- **Nem todo o Hinário Adventista está em domínio público.** Ao contrário do que se costuma supor, o hinário reúne hinos antigos (domínio público) com hinos, traduções e arranjos recentes, que estão protegidos. Usamos apenas melodias antigas de autores falecidos há mais de 70 anos, como as de "Santo! Santo! Santo!" e "Castelo Forte". Os textos portugueses e as harmonizações do hinário ficaram de fora.

## A antologia (página Repertório)

| Peça | Autoria | Fonte das notas |
|---|---|---|
| Castelo Forte (Ein feste Burg) | Lutero (c. 1529); harmonização de Bach, BWV 302 | corpus de corais de Bach do music21 (MusicXML) |
| Ó Fronte Ensanguentada (O Haupt voll Blut und Wunden) | Hassler (1601), Gerhardt (1656); Bach, BWV 244.62 | corpus do music21 |
| Nun danket alle Gott | Crüger (1647), Rinkart (1636); Bach, BWV 386 | corpus do music21 |
| Wachet auf | Nicolai (1599); Bach, BWV 140.7 | corpus do music21 |
| Doxologia (Old 100th) | Bourgeois, Saltério de Genebra (1551); Bach, BWV 130.6 | corpus do music21; melodia conferida na Wikipédia |
| Santo! Santo! Santo! (Nicaea) | Dykes (1861), Heber (1826) | partitura SATB de Dykes transcrita na Wikipédia, reescrita de 4/2 para 4/4 |
| Noite Feliz (Stille Nacht), versão de 1818 | Gruber (1818), Mohr (1816) | primeira edição transcrita na Wikipédia, com a segunda voz original |

Como as partituras foram produzidas:

- **Corais de Bach:** convertidos automaticamente do MusicXML para a notação do curso. A conversão foi conferida inteira: a sequência de alturas e durações de cada voz é idêntica à do arquivo-fonte (só as pausas de completar o compasso de anacruse foram acrescentadas).
- **Nicaea e Noite Feliz:** convertidos do LilyPond da Wikipédia, com as alturas relativas passadas para absolutas pela ferramenta python-ly.
- **Repetições:** foram escritas uma vez só.

Cada peça aparece no site com:

- a partitura, o áudio e os diagnósticos do motor;
- um comentário de análise;
- a fonte, com link, e a justificativa de domínio público;
- um botão para abri-la no laboratório de escrita.

**O que o motor aponta em Bach.** Os corais de Bach recebem muitos alertas do motor, como cruzamentos, sobreposições, sensível dobrada e sétimas resolvidas de modo não escolar. Esses alertas vêm da própria escrita de Bach, não da conversão, que preserva as alturas e as durações do arquivo (as sequências completas de alturas e durações das quatro vozes dos cinco corais foram comparadas com o arquivo do corpus e são idênticas). Eles mostram o que as regras escolares não preveem. O curso usa isso como material: "o motor aponta; ouça e decida se o desvio é intencional".

**Onde o repertório entrou nas aulas.** Seis aulas ganharam exemplos "para observar" com essas peças:

| Aula | Peças |
|---|---|
| Cadências | Doxologia e Ó Fronte |
| Duplicações | Nun danket |
| Harmonização SATB | Santo! Santo! Santo! |
| Duas vozes | Noite Feliz |
| Contraponto a quatro vozes | Castelo Forte |
| Análise estilística | Wachet auf |

## O que foi trocado

| Antes (inventado) | Agora (real, domínio público) | Onde |
|---|---|---|
| "Canção do Caminho" | 2ª frase do "Hino à Alegria" (Beethoven, 1824; texto de Schiller), em Sol maior | aulas de arranjo, texturas, forma, contracanto, exercícios independentes, itens auditivos |
| "Luz da manhã" | 1ª frase de "Santo! Santo! Santo!" (Nicaea, Dykes), em Sol maior (Lá♭ maior no SSAA) | disciplina inteira de rearmonização (17 versões), vozes iguais, descant, itens auditivos |
| "Rio de Paz" (lead TTBB) | "Hino à Alegria" no Tenor II, em Fá maior | quarteto masculino |
| "Cante o povo" (cânone) | "Frère Jacques" (cânone tradicional francês) | contraponto: imitação |
| "Eu sei bem que sim, Senhor" | "Santo! Santo! Santo!" com contracanto | contraponto: contracanto |
| "Canta o coro na luz da manhã" | Doxologia (Old 100th), frases 1 e 2, em Lá maior | regência: respiração |
| "Vem cantar comigo" (3/4 com anacruse) | "Amazing Grace" (New Britain, 1829; texto de Newton, 1779), em Lá maior | regência: gesto |
| "Passarinho canta" | "Ah! vous dirai-je, maman" ("Brilha, brilha, estrelinha"), texto francês do séc. XVIII | coro infantil |
| "Mar sereno" | renomeada "frase de exercício": é uma linha de exercício, não uma canção | rearmonização, SSA |
| Quodlibet "Luz da manhã + Sol vai nascer" | explicação com um quodlibet histórico: a Variação 30 das *Variações Goldberg*, de Bach | contraponto: quodlibet |
| Melodias "originais" dos trabalhos práticos | Doxologia (frases 3 e 4), "Ah! vous dirai-je, maman", "Hino à Alegria", "Santo! Santo! Santo!" | trabalhos práticos |

**Como as novas harmonizações foram feitas.** Todas foram refeitas sobre as melodias reais e conferidas pelo motor:

- Cada exemplo mantém o veredito que a aula declara: correto, com problema ou para observar.
- Para chegar às vozes, usei uma busca automática que testa contralto, tenor e baixo usando o próprio motor como juiz.
- Em seguida, revisei uma a uma as cifras resultantes. Por exemplo, corrigi uma falsa relação Dó/Dó♯ entre o tenor e o baixo nas dominantes secundárias; o cromatismo agora fica na mesma voz.

**Uma combinação que não deu certo.** Testei um quodlibet com duas melodias verificadas, "Hino à Alegria" e "Ah! vous dirai-je". As duas formam quintas e oitavas paralelas entre si em qualquer harmonia. Por isso o exemplo inventado virou uma explicação com um quodlibet histórico, em vez de uma nova combinação forçada.

## Trechos de a cappella (segunda etapa)

Os dez trechos de pop/gospel a cappella que tinham melodia com letra inventada ("Canta, meu coração", "Vem, Senhor", "Eu sei meu lugar", "Não tenho nada", "Toma meu coração", "Ele vem me buscar") agora usam fragmentos de canções reais. Os acompanhamentos (riffs, "uh", "bm") são do curso.

| Exemplo | Melodia real |
|---|---|
| dueto em terças, melodia em oitavas, estrofe em uníssono, texto sobre "uh" | "Ah! vous dirai-je, maman" (Brilha, brilha, estrelinha) |
| solo do barítono, solo agudo demais | "Santo! Santo! Santo!" |
| eco, riff no barítono, riff no grave | "Frère Jacques" |
| refrão em bloco | Doxologia, última frase |

Cada exemplo continua com o veredito que a aula declara, conferido pelo motor.

## O que continua com texto do curso

- **Exercícios escritos de prosódia e respiração** com versos do curso, como "Guarda-me, Senhor". São textos para exercício, sem melodia, e não são canções.
- **Fragmentos de 2 a 4 notas** em exercícios de cadência e de ritmo, e sílabas como "uh", "bop" e "dm".

## Verificação

- `src/content/__tests__/repertorio.test.ts` confere três coisas:
  - cada peça tem fonte, justificativa, análise e partitura válida, e abre no laboratório;
  - as aulas usam o repertório;
  - os nomes das canções inventadas antigas não aparecem mais no currículo.
- O teste de integridade do currículo confere o veredito de cada exemplo no motor, incluindo as versões novas.
- Os itens auditivos de comparação que usavam as melodias antigas foram refeitos. Os testes deles continuam exigindo o fenômeno só na versão marcada e a mesma duração nas duas versões.
- No e2e, a página Repertório passa pelo teste de acessibilidade (axe, WCAG 2.1 AA) e por um fluxo que abre uma peça no laboratório.

## Limites

- **Fontes secundárias:** as fontes são edições digitais e transcrições públicas (o corpus do music21 e a Wikipédia), não fac-símiles das primeiras edições. As letras de "Noite Feliz" foram alinhadas às notas por mim, seguindo a prática usual (o último par de notas de cada verso recebe uma só sílaba).
- **Melodia isolada de Beethoven:** o "Hino à Alegria" usado é só a melodia, sem a orquestração de Beethoven, e com harmonizações do curso.
- **Revisão humana:** recomenda-se que um professor revise as novas harmonizações e os textos das aulas, em especial a disciplina de rearmonização, que foi reescrita inteira.
