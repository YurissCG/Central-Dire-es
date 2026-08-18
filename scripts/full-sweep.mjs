import { chromium } from "playwright";

const routes = [
  "/",
  "/servicos",
  "/sintomas",
  "/sobre",
  "/duvidas",
  "/contato",
  "/orcamento",
  "/servicos/direcao-hidraulica",
  "/servicos/caixa-de-direcao-remanufaturada",
  "/servicos/direcao-mecanica",
  "/servicos/suspensao",
  "/servicos/alinhamento-e-balanceamento",
  "/servicos/freios",
  "/servicos/revisao-preventiva",
  "/sintomas/volante-pesado",
  "/sintomas/barulho-ao-virar-o-volante",
  "/sintomas/carro-puxando-para-um-lado",
  "/sintomas/volante-vibrando",
  "/sintomas/carro-pulando-nos-buracos",
  "/sintomas/vazamento-de-oleo-na-direcao",
  "/sintomas/pneu-gastando-torto",
  "/sintomas/freio-rangendo",
  "/sintomas/folga-no-volante",
  "/sintomas/barulho-em-buraco",
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 360, height: 640 } });

let failures = 0;
for (const route of routes) {
  await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle" });
  const overflow = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  const status = overflow.overflow ? "FAIL" : "ok";
  if (overflow.overflow) failures++;
  console.log(`${status}  ${route}  (scrollWidth=${overflow.scrollWidth} clientWidth=${overflow.clientWidth})`);
}

console.log(`\n${routes.length - failures}/${routes.length} passed, ${failures} failures`);
await browser.close();
process.exit(failures > 0 ? 1 : 0);
