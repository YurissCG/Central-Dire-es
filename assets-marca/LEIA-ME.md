# Assets de marca

- `logo-central-direcoes-original.png`: logo entregue pelo cliente, 1295x1214. Tem canal alfa real (conferido pixel a pixel na Tarefa 11), a impressão de fundo branco vem só de como alguns visualizadores renderizam transparência.
- `logo-central-direcoes-512.png`: versão reduzida, mesma transparência.
- `public/logo-central-direcoes.png`: círculo recortado do bounding box do conteúdo opaco, redimensionado para 800px de largura e otimizado, gerado na Tarefa 11.
- `src/app/favicon.ico`, `src/app/apple-icon.png`, `public/icon-192.png`, `public/icon-512.png`: gerados a partir do logo na Tarefa 11.

## Pendências do logo

1. ~~Fundo branco~~. Resolvido: o arquivo já tinha alfa, só precisou recortar o bounding box.
2. **Sem vetor.** Não existe SVG. Para nitidez em qualquer tamanho, vetorizar o círculo, o volante e o lettering. Pedir o arquivo original ao cliente antes de refazer do zero.
3. ~~Favicon~~. Resolvido na Tarefa 11: `favicon.ico` com 16/32/48px usa só a roda com as chaves (sem o lettering, que fica ilegível nesse tamanho); `apple-icon.png` de 180px usa o círculo completo com o texto.
