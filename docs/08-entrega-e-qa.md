# 08. Entrega e QA

Nada é "pronto" antes de passar por aqui inteiro. Um item reprovado bloqueia a entrega.

## 8.1 Build e código

- [ ] `npm run build` sem erro e sem warning novo
- [ ] `npx tsc --noEmit` limpo
- [ ] `npm run lint` limpo
- [ ] Nenhum `any`, nenhum `// TODO`, nenhum `console.log` sobrando
- [ ] Nenhum telefone, endereço ou horário escrito direto no JSX
- [ ] Nenhum `wa.me` montado à mão
- [ ] `grep -rn "lorem\|Lorem\|placeholder" src/` vazio

## 8.2 Linguagem

- [ ] `grep -rn "—" src/` vazio
- [ ] Nenhuma palavra da lista de proibidos do doc 04 seção 4.2
- [ ] Nenhum número sem origem confirmada
- [ ] Nenhuma promessa não aprovada pelo dono
- [ ] Todo botão diz o que faz
- [ ] Leitura em voz alta feita, em pelo menos a home e as duas páginas de serviço principais

## 8.3 Mobile

Testar em cada largura, não só no responsive mode do desktop. Se possível, no celular de verdade.

- [ ] 320px, 360px, 390px, 414px, 768px, 1024px, 1440px
- [ ] Sem rolagem horizontal em nenhuma delas
- [ ] Alvos de toque de 44px ou mais
- [ ] Barra fixa de WhatsApp não cobre conteúdo nem o rodapé
- [ ] Menu mobile abre, fecha por Escape, fecha ao tocar fora e não deixa a página rolar por baixo
- [ ] Painel de diagnóstico usável com uma mão só
- [ ] Formulário de orçamento: teclado do celular não cobre o campo em foco
- [ ] Testado no Chrome Android e no Safari iOS, os dois

## 8.4 Acessibilidade

- [ ] Um `<h1>` por página, hierarquia sem pulo
- [ ] Navegação completa por teclado, foco sempre visível
- [ ] Contraste conforme a tabela do doc 02 seção 2.2
- [ ] Todo `alt` preenchido de forma útil, decorativo com `alt=""`
- [ ] Todo campo com `<label>` associado
- [ ] `aria-label` em botão só de ícone
- [ ] `aria-pressed` correto nos itens de sintoma
- [ ] Lighthouse Accessibility em 95 ou mais

## 8.5 SEO

- [ ] 20 páginas com title e description únicos, dentro dos limites
- [ ] Canonical absoluto e autorreferente em todas
- [ ] `/robots.txt` acessível e correto
- [ ] `/sitemap.xml` com as 20 URLs, todas com status 200 e sem redirecionamento
- [ ] `/llms.txt` acessível
- [ ] JSON-LD de `AutoRepair` validado sem erro no Rich Results Test e no Schema Markup Validator
- [ ] `Service` e `BreadcrumbList` nas páginas internas
- [ ] Nenhum `aggregateRating` autodeclarado
- [ ] NAP idêntico ao canônico em site, Google e Instagram
- [ ] Nenhum link interno quebrado
- [ ] OG conferido colando o link no WhatsApp de verdade

## 8.6 Performance

- [ ] PageSpeed Insights mobile em 90 ou mais em Performance
- [ ] LCP abaixo de 2,5s, INP abaixo de 200ms, CLS abaixo de 0,1
- [ ] JavaScript da home abaixo de 120KB comprimido
- [ ] Nenhum script de terceiro
- [ ] Mapa e vídeo carregando só sob clique
- [ ] Teste com rede lenta simulada, Slow 4G no DevTools

## 8.7 Conversão

Se um destes falhar, o site não cumpre a função para a qual foi feito.

- [ ] CTA de WhatsApp visível sem rolar, em mobile
- [ ] Todo `wa.me` abre o app com a mensagem já escrita
- [ ] A mensagem carrega a marcação de origem, `[site: ...]`
- [ ] Botão de ligar funciona com `tel:` no celular
- [ ] Endereço abre o Google Maps em um toque
- [ ] Painel de diagnóstico chega até a mensagem montada, com os sintomas listados
- [ ] Teste ponta a ponta: entrar por uma página de sintoma, usar o painel, cair no WhatsApp com a mensagem certa

## 8.8 Imagens

- [ ] Nenhuma foto de banco de imagens fingindo ser a equipe, a fachada ou o interior da oficina
- [ ] `public/fotos/temporarias/CREDITOS.md` completo, se ainda houver imagem temporária
- [ ] Nenhuma imagem puxada de fonte sem licença clara
- [ ] Nenhuma marca de terceiro visível
- [ ] Placa de veículo de cliente desfocada
- [ ] Todo caminho de imagem centralizado em `src/content`, para a troca ser mecânica

## 8.9 O que entregar ao cliente

Um documento de uma página, em linguagem de dono de oficina, sem jargão:

1. Endereço do site
2. Lista das páginas
3. O que ele controla: domínio, conta da Vercel, Search Console, Google Business Profile, todos no nome dele
4. Como pedir mudança de texto ou de foto
5. As três recomendações de avaliação do doc 06 seção 6.4, que é o que mais vai mexer no resultado dele
6. O que foi prometido e o que não foi. Deixe por escrito que posição no Google leva de 4 a 12 semanas e depende de fatores fora do site

## 8.10 Transferência de acessos

- [ ] Domínio no CPF ou CNPJ do cliente
- [ ] Projeto na Vercel na conta dele, ou você como colaborador convidado
- [ ] Search Console com ele como proprietário e você como usuário
- [ ] Google Business Profile com ele como proprietário
- [ ] Repositório entregue ou arquivado, conforme o que foi combinado na venda

Cliente que é dono dos próprios acessos volta a contratar. Cliente que se sente refém não volta.

## 8.11 Antes de mandar a proposta

Checagem final da versão de apresentação, aquela que vai ao cliente antes do pagamento:

- [ ] Site no ar em URL de preview da Vercel, abrindo no celular
- [ ] Home, uma página de serviço e uma de sintoma completas. Não precisa das 20 para vender
- [ ] Painel de diagnóstico funcionando de ponta a ponta, porque é ele que fecha a venda
- [ ] Nome, telefone, endereço e horário corretos. Erro de telefone na demonstração derruba a credibilidade na hora
- [ ] Abrir o preview no celular do dono, na frente dele, e clicar no botão de WhatsApp. O celular dele apita. É a demonstração mais eficiente que existe
