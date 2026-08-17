# 01. Briefing do negócio

## 1.1 A empresa

**Central Direções, Peças Remanufaturadas Automotivas.** Oficina especializada em direção hidráulica e direção mecânica, com serviços de suspensão, alinhamento, balanceamento e freios. Fica em São Benedito, Santa Luzia (MG), colada na divisa norte de Belo Horizonte, a poucos minutos da Estação Vilarinho e do Terminal São Benedito.

O diferencial declarado nas redes: **setor próprio de direção hidráulica com peças remanufaturadas**, ou seja, a oficina não só troca, ela recupera a caixa de direção. Isso muda o preço para o cliente e é o argumento comercial mais forte do site.

## 1.2 NAP confirmado

Todos estes dados vêm do perfil do Google e do Instagram da empresa e batem entre si. Estão em `dados/negocio.json`, que é a única fonte para o código.

| Campo | Valor |
|---|---|
| Nome | Central Direções |
| Nome longo no Google | Central Direções, Peças Remanufaturadas Automotivos, Direção Mecânica, Direções Hidráulicas em São Benedito, Santa Luzia |
| Endereço | Rua Olegário Maciel, 541, São Benedito, Santa Luzia, MG |
| CEP | 33125-010 (confere: o CEP 33125-010 cobre a Olegário Maciel de 401/402 ao fim) |
| Coordenadas | -19.794761, -43.941558 |
| Telefone fixo | (31) 3637-0491 |
| Segundo fixo | (31) 3637-6477 |
| WhatsApp | (31) 98988-3036 |
| E-mail | centraldirecoes1@gmail.com |
| Horário | segunda a sexta, 08:00 às 18:00. Sábado e domingo fechado |
| Google | 4,3 estrelas, 215 avaliações |
| Instagram | @centraldirecoes1 |

Redes sociais, incluindo as que estão inconsistentes ou quebradas (manter no `sameAs` do schema mesmo assim, o cliente pode corrigir depois):

- Instagram: https://www.instagram.com/centraldirecoes1
- X: https://x.com/centraldirecoe
- YouTube: https://www.youtube.com/@CentralDireesPeasRemanufatu
- TikTok: https://www.tiktok.com/@user5736036161810langp

## 1.3 Serviços

Lista extraída dos posts "Nossos Serviços" do Instagram. Estrutura completa em `dados/servicos.json`.

1. Direção hidráulica, reparo e remanufatura de caixa de direção
2. Direção mecânica
3. Suspensão
4. Alinhamento
5. Balanceamento
6. Freios
7. Revisão preventiva

## 1.4 Quem é o cliente da oficina

Três perfis, em ordem de volume:

**O dono de carro popular com sintoma.** Gol, Uno, Palio, Onix, HB20, Sandero, com 8 anos ou mais de uso. Ele não pesquisa "caixa de direção hidráulica". Ele pesquisa **o barulho**: "carro puxando pra um lado", "direção pesada", "barulho ao virar o volante", "carro pulando muito". Está no celular, com pressa, e vai falar com a primeira oficina que parecer competente e explicar o problema sem enrolar. É para ele que o site é feito.

**O cliente de manutenção programada.** Quer alinhamento, balanceamento, revisão antes de viagem. Decide por proximidade, horário e confiança. Precisa de endereço, horário e mapa em dois toques.

**O motorista de aplicativo e o pequeno frotista.** Carro é ferramenta de trabalho, parado é prejuízo. Decide por prazo e preço. Argumento certo: remanufatura sai mais barato que peça nova e o carro volta a rodar no mesmo dia.

## 1.5 O que as avaliações do Google revelam

Ler as avaliações reais antes de escrever a copy foi o passo mais útil deste briefing. Nota 4,3 com 215 avaliações.

**Elogios recorrentes:** orçamento com valor melhor que a concorrência, explicação clara do problema antes do serviço, prazo cumprido, recepção atenciosa, oficina limpa e agradável.

**Reclamações recorrentes:** sensação de venda de serviço desnecessário, cobrança acima do combinado em retorno, atendimento ruim da gerência em caso de reclamação.

Isso não é detalhe, é a estratégia do site. A objeção número um do setor de oficina mecânica é **medo de ser enganado**. O site precisa atacar isso de frente, com promessas verificáveis:

- Diagnóstico e orçamento antes de qualquer serviço, sem compromisso
- Peça trocada devolvida ao cliente
- Só trocamos o que precisa ser trocado, e mostramos o motivo
- Orçamento fechado por escrito antes de começar

Toda promessa dessas precisa de aprovação verbal do dono antes de subir. Sem aprovação, ela não entra. Está na lista de pendências.

## 1.6 Concorrência local

O concorrente direto mais visível na busca é uma oficina de direções hidráulicas no Centro de Santa Luzia, com nota 4,5 e cerca de 64 avaliações. Central Direções tem mais que o triplo de avaliações, então o volume de prova social é vantagem nossa. O que falta é site: hoje o único ponto de conversão fora do Google é uma página de links do Beacons.

Consequência: **qualquer site decente já ganha terreno.** O objetivo não é competir com portal grande de peça, é dominar a busca de bairro. São Benedito, Santa Luzia, Vilarinho, Venda Nova, Justinópolis, Ribeirão das Neves, norte de Belo Horizonte.

## 1.7 O que existe hoje de material da marca

- Logo em PNG com fundo branco, círculo preto com volante, chave de boca cruzada, "CENTRAL" em vermelho e "DIREÇÕES" em branco, com efeito 3D e brilho
- Instagram com 145 posts, padrão visual preto, vermelho e branco, títulos em caixa alta pesada
- Fotos e vídeos da equipe real, do galpão e de peças
- Não existe manual de marca, não existe paleta oficial, não existe tipografia oficial. A identidade do site foi derivada do logo e do Instagram, e está fixada em `docs/02-identidade-visual.md`

## 1.8 Pendências com o cliente

Confirmar antes da entrega final. Nada disso entra no site sem resposta.

- [ ] Ano de fundação e tempo de mercado
- [ ] Razão social e CNPJ, para o rodapé e para o schema
- [ ] Nome e função das pessoas que aparecem no site, com autorização de imagem
- [ ] Prazo de garantia dos serviços de direção, em meses ou quilômetros
- [ ] Aceita as promessas de transparência da seção 1.5
- [ ] Formas de pagamento e número de parcelas. PIX pela Stone já está confirmado
- [ ] Atende sábado sob agendamento ou não
- [ ] Marcas e modelos que a oficina não atende
- [ ] Faz remanufatura para outras oficinas, ou seja, existe venda B2B de peça
- [ ] Domínio: já tem, ou precisa registrar. Sugestões: centraldirecoes.com.br, centraldirecoes.com
- [ ] Acesso ao Google Business Profile, obrigatório para a fase de SEO local
- [ ] Fotos oficiais em alta resolução, ver `docs/09-imagens-e-midia.md`
- [ ] 3 avaliações reais do Google para citar na seção Prova Social (nome como aparece publicamente, nota, trecho fiel). O conteúdo de avaliação do Google não é acessível por scraping automatizado, então isso não pode ser resolvido sem o cliente. Até lá, `src/content/depoimentos.ts` fica vazio e a seção mostra só a nota agregada (4,3, 215 avaliações), que já é dado confirmado
