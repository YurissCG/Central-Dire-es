# 06. SEO local e marketing

Para oficina de bairro, isto vale mais que o site em si. O site é a base, o Google Business Profile é o que traz o carro para o pátio. Vender os dois juntos é o que justifica o preço.

## 6.1 Onde o cliente da oficina realmente aparece

Ordem de impacto para negócio local com endereço físico:

1. **Pacote de mapas do Google.** As três fichas que aparecem com mapa antes dos resultados azuis. É aqui que a decisão acontece
2. **Perfil no Google com avaliação e foto.** 215 avaliações e 4,3 é um ativo forte que a oficina já tem
3. **Resultado orgânico por sintoma.** As páginas de `/sintomas`
4. **Instagram e WhatsApp.** Já funcionam, o site passa a alimentar os dois

O site entra nos três primeiros ao mesmo tempo: dá URL própria para o perfil do Google, dá conteúdo indexável por serviço e por sintoma, e dá consistência de NAP.

## 6.2 NAP, a regra que não pode ser quebrada

Nome, endereço e telefone idênticos em todo lugar. Idênticos, não parecidos.

Padrão canônico, o mesmo de `dados/negocio.json`:

```
Central Direções
Rua Olegário Maciel, 541, São Benedito, Santa Luzia, MG, 33125-010
(31) 3637-0491
```

"R." em um lugar e "Rua" em outro, ou o WhatsApp como telefone principal em um lugar e o fixo em outro, enfraquece o sinal. Escolha o fixo (31) 3637-0491 como telefone principal, porque é o que está no Google, e trate o WhatsApp como canal de contato à parte.

Auditoria de citações a fazer na entrega: Google, Instagram, X, YouTube, TikTok, Apontador, Solutudo, Guia Mais, e a página do Beacons que já existe. Onde estiver divergente, corrigir.

## 6.3 Google Business Profile, checklist

Precisa do acesso do cliente. Se ele não tiver o acesso, recuperar a ficha é a primeira tarefa e às vezes leva dias.

- [ ] Categoria principal: `Oficina mecânica` ou a categoria mais específica disponível de reparo automotivo. Uma só como principal
- [ ] Categorias secundárias: loja de autopeças, serviço de alinhamento, oficina de suspensão, conforme disponível
- [ ] Nome exatamente `Central Direções`. O nome longo atual está recheado de palavra-chave, o que viola a diretriz do Google e pode gerar suspensão. Recomendar a correção ao cliente, explicando o risco
- [ ] Endereço e pino do mapa conferidos na porta da oficina
- [ ] Horário certo, seg a sex 8h às 18h, e feriado cadastrado quando fechar
- [ ] Site apontando para o domínio novo, e o UTM `?utm_source=google&utm_medium=gbp` no link
- [ ] Telefone principal (31) 3637-0491 e WhatsApp no campo de mensagem
- [ ] 20 fotos ou mais: fachada, recepção, elevador, setor de direção, equipe trabalhando, peça remanufaturada antes e depois. Foto de dentro converte mais que foto de fora
- [ ] Serviços cadastrados um a um, com descrição, espelhando `dados/servicos.json`
- [ ] Produtos: caixa de direção remanufaturada, se a oficina vende peça
- [ ] Perguntas e respostas: publicar as 5 dúvidas mais comuns como pergunta e responder pelo perfil da empresa
- [ ] Posts semanais, o mesmo conteúdo que já vai para o Instagram
- [ ] Atributos preenchidos, principalmente acessibilidade e formas de pagamento

## 6.4 Avaliações

Este é o ponto fraco atual e a maior oportunidade. Nota 4,3 com reclamação recorrente de venda desnecessária e de tratamento em caso de conflito.

O que recomendar ao cliente, por escrito, junto com a entrega:

1. **Pedir avaliação na retirada do carro.** QR code impresso no balcão, apontando direto para o formulário de avaliação. Duas ou três avaliações novas por semana sobem a nota e renovam o perfil
2. **Responder toda avaliação em até 48 horas.** Inclusive as ruins, e principalmente as ruins. Resposta curta, sem defensiva, com o convite para resolver. Quem lê avaliação ruim está lendo a resposta, não a reclamação
3. **Nunca comprar avaliação.** Padrão detectável e a punição derruba a ficha inteira
4. **Usar as reclamações como pauta.** Se três pessoas reclamaram de sentir venda empurrada, então a página de serviço precisa dizer com clareza que orçamento vem antes e que a peça velha volta para o cliente. O site já resolve parte da objeção antes do contato

## 6.5 Funil, do clique ao carro no elevador

```
Google (mapa ou orgânico)
    ↓
Página de sintoma ou de serviço
    ↓
Painel de Diagnóstico, o visitante marca o que sente
    ↓
WhatsApp com mensagem pré-montada
    ↓
Atendimento humano, orçamento
    ↓
Carro na oficina
    ↓
Pedido de avaliação na retirada
    ↓
Nota sobe, o pacote de mapas melhora, o ciclo se fecha
```

Cada etapa tem uma tarefa técnica no site:

| Etapa | Implementação |
|---|---|
| Chegada | title, description e schema corretos |
| Convencimento | bloco de resposta direta e prova social real |
| Diagnóstico | painel interativo com resultado |
| Contato | link `wa.me` com texto montado, mais barra fixa no mobile |
| Rastreio | parâmetro na mensagem indicando a página de origem, para a oficina saber de onde veio |

Rastreio sem analytics, o truque simples: a mensagem do WhatsApp começa com uma referência curta da origem, por exemplo `[site: direção hidráulica]`. A oficina passa a saber qual página trouxe o cliente só lendo as conversas. Custa zero e dá a informação que importa.

## 6.6 Montagem do link de WhatsApp

`src/lib/whatsapp.ts`:

```ts
import { NEGOCIO } from '@/content/negocio'

export function linkWhatsApp(origem: string, extras?: string) {
  const texto = `[site: ${origem}] Oi! Vi o site da Central Direções.${extras ? ' ' + extras : ''}`
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(texto)}`
}
```

Todo CTA usa esta função e passa a própria origem. Nenhum link `wa.me` escrito à mão no JSX.

## 6.7 Conteúdo depois da entrega

Se o cliente quiser continuar (e é aqui que nasce a mensalidade):

- Uma página de sintoma nova por mês, tirada das perguntas que chegam no WhatsApp. Pergunta que o cliente faz é palavra-chave de graça
- Reaproveitar o Reel do Instagram como página, com o vídeo incorporado e a transcrição em texto. O texto é o que indexa, o vídeo é o que retém
- Post no Google Business Profile toda semana
- Página por bairro **só** se houver operação real ali. Página de bairro sem substância é doorway page e o Google pune. Limite: no máximo 3 páginas geográficas, e cada uma com conteúdo próprio de verdade

## 6.8 O que dizer ao cliente na venda

Argumento honesto, que é o que sustenta a relação depois:

> Você já tem 215 avaliações e nota 4,3, o que é difícil de construir. O que falta é um lugar seu na internet, com endereço, serviço e telefone que o Google entenda, e uma porta de entrada para quem busca "direção pesada" no celular às dez da noite. O site custa uma ordem de serviço de direção hidráulica. E ele fica no seu domínio, na sua conta do Google, com o seu nome. Se amanhã você quiser trocar de fornecedor, o ativo continua sendo seu.

O que não prometer: primeiro lugar no Google, prazo de resultado, número de clientes por mês. O que prometer: site rápido, no ar, indexado, com dados estruturados válidos e o perfil do Google organizado.
