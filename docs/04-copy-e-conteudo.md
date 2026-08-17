# 04. Copy e conteúdo

Copy ruim entrega o site como gerado por IA mais rápido que qualquer detalhe visual. Este documento é obrigatório antes de escrever qualquer texto.

## 4.1 Voz

Fala de quem entende de carro e explica para quem não entende, sem tratar o outro como leigo bobo. Direta, mineira, sem cerimônia e sem gíria forçada. Frase curta. Verbo no presente. Segunda pessoa do singular na forma "você".

Como soa certo:

> Volante pesado quase sempre é bomba ou caixa de direção. A gente testa antes de mexer e te fala o que achou.

Como soa errado:

> Não é apenas um reparo, é a segurança da sua família. Nossas soluções em direção automotiva combinam excelência técnica e inovação para transformar a sua experiência ao volante.

## 4.2 Vocabulário proibido

Palavra ou construção desta lista no site é bug.

**Substantivo vazio:** soluções, excelência, inovação, expertise, know-how, diferencial, comprometimento, sinergia, jornada, experiência (no sentido de "a sua experiência"), universo, mundo.

**Verbo de folder:** transformar, elevar, potencializar, revolucionar, alavancar, descomplicar, otimizar (só use em contexto técnico real), impulsionar.

**Frase feita:** "não é apenas X, é Y", "mais que uma oficina", "descubra o poder de", "no mundo de hoje", "seja você mesmo", "a gente vai além", "pensado nos mínimos detalhes", "sua segurança é a nossa prioridade", "atendimento humanizado", "profissionais altamente qualificados", "tecnologia de ponta", "vamos juntos", "conte com a gente".

**Vício de estrutura:** travessão (—) em qualquer lugar; três adjetivos em série ("rápido, seguro e eficiente"); pergunta retórica abrindo seção ("Já parou para pensar?"); frase de uma linha isolada em itálico como conclusão dramática; emoji em título ou botão; caixa alta para dar ênfase no meio da frase.

**Número inventado:** qualquer estatística que não esteja em `dados/negocio.json`.

## 4.3 O que substitui isso

Especificidade. Toda afirmação vaga tem uma versão concreta.

| Vago | Concreto |
|---|---|
| Profissionais qualificados | Setor próprio de direção hidráulica dentro da oficina |
| Atendimento diferenciado | Você fala com o mecânico que vai mexer no seu carro |
| Preço justo | A peça remanufaturada custa menos que a nova e sai com garantia |
| Agilidade | Reparo de direção hidráulica costuma ficar pronto no mesmo dia |
| Confiança | Peça trocada devolvida na sua mão |
| Estrutura completa | Alinhamento, balanceamento, suspensão, freio e direção no mesmo lugar |

A coluna da direita depende de confirmação do dono, ver pendências em `docs/01-briefing.md`. Sem confirmação, não publique.

## 4.4 Copy por seção da home

Rascunho aprovado, ajuste fino permitido, mudança de tom não.

### Hero

Eyebrow em mono, caixa alta: `SÃO BENEDITO, SANTA LUZIA, MG`

H1, caixa alta, display:
```
DIREÇÃO PESADA
NÃO É MANIA
DO SEU CARRO
```

Subtítulo:
```
Somos especialistas em direção hidráulica e direção mecânica. Recuperamos a caixa de
direção aqui dentro, com peça remanufaturada, por menos do que custa uma nova.
```

CTA primário: `Falar no WhatsApp`. Secundário: `Ligar (31) 3637-0491`.

Abaixo, em mono, três dados verificáveis: `4,3 NO GOOGLE` · `215 AVALIAÇÕES` · `SEG A SEX, 8H ÀS 18H`

O H1 não é um slogan sobre a empresa, é o problema do visitante escrito na parede. Ele reconhece o próprio carro na primeira linha.

### Prova social

Título: `O que dizem os clientes`

Três avaliações reais do Google, com nome, nota e trecho curto. Trecho fiel, sem retoque de gramática além de pontuação. Abaixo, o link para o perfil no Google, com o texto `Ver as 215 avaliações no Google`.

Não invente depoimento. Não use foto de banco de imagens ao lado de nome de cliente.

### Serviços

Título: `O que a gente faz`

Sem card de ícone genérico com título de duas palavras. Cada serviço é uma linha da lista com o nome, uma frase concreta do que resolve e o link. Exemplo:

```
Direção hidráulica
Volante pesado, barulho ao virar, vazamento de óleo. Testamos bomba, caixa e mangueira
antes de trocar qualquer coisa.
```

### Painel de Diagnóstico

Título: `O que seu carro está tentando dizer`

Linha de apoio:
```
Marque o que você sente ao dirigir. A gente mostra qual setor costuma ser o responsável
e você já chega no WhatsApp com o problema descrito.
```

Aviso de honestidade, obrigatório, em bloco amarelo:
```
Isso é uma orientação, não um laudo. Só com o carro no elevador dá para fechar o
diagnóstico.
```

### Como funciona

Aqui a numeração 01, 02, 03 é permitida, porque é sequência real de processo:

```
01  Você chega ou manda mensagem
02  A gente inspeciona e mostra o que achou
03  Orçamento por escrito antes de começar
04  Serviço feito e peça velha devolvida na sua mão
```

O passo 3 e o passo 4 atacam a objeção principal do setor. Não corte.

### Localização

Título: `Onde a gente fica`

Endereço completo, horário, dois telefones, e mapa. Mapa não é iframe do Google carregado de imediato, isso destrói o LCP. Use imagem estática do mapa com link para o Google Maps, ou iframe com carregamento sob clique.

Frase de referência local, que ajuda tanto o visitante quanto a busca:
```
Rua Olegário Maciel, 541, São Benedito. Perto do Terminal São Benedito e a poucos
minutos da Estação Vilarinho.
```

### Rodapé

NAP completo, links das redes, horário, e a lista de bairros e cidades atendidas em texto corrido, não em nuvem de palavra-chave: Santa Luzia, São Benedito, Vilarinho, Venda Nova, Justinópolis, Ribeirão das Neves e região norte de Belo Horizonte.

## 4.5 Estrutura de cada página de serviço

Ordem fixa. Serve ao leitor e à indexação ao mesmo tempo.

1. H1 com o serviço e a cidade
2. Resposta direta em 3 a 4 frases, entre 130 e 170 palavras no bloco todo. Este parágrafo precisa responder a pergunta sozinho, porque é ele que a busca com IA tem chance de citar
3. `Como saber se o seu carro precisa`, lista dos sintomas com link para as páginas de sintoma
4. `Como a gente faz`, o processo real de inspeção e reparo
5. `Quanto custa`, faixa de preço se o cliente autorizar, ou o que determina o preço se não autorizar. Nunca prometa preço sem autorização
6. `Perguntas frequentes`, 3 a 5 perguntas específicas do serviço
7. CTA de WhatsApp com mensagem pré-montada com o nome do serviço

Cada H2 é uma pergunta ou uma frase que alguém digitaria na busca. Nada de H2 decorativo tipo "Excelência em cada detalhe".

## 4.6 Checagem antes de commitar texto

Rode mentalmente, ou com grep, nesta ordem:

1. `grep -rn "—" src/` retorna vazio
2. Nenhuma palavra da lista 4.2 aparece
3. Nenhum número sem origem em `dados/negocio.json`
4. Nenhuma promessa sem confirmação do dono
5. Leia em voz alta. Se você não falaria isso no balcão da oficina, reescreva
6. Cada botão diz o que acontece ao ser clicado. `Falar no WhatsApp`, não `Saiba mais`
7. Estado de erro explica o que fazer, não pede desculpa
