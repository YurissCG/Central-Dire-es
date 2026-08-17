"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICOS } from "@/content/servicos";
import { linkWhatsApp } from "@/lib/whatsapp";

const CAMPO =
  "min-h-11 border border-grafite-borda bg-grafite px-4 py-2 text-corpo text-branco placeholder:text-aco-fosco focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amarelo";

export function FormularioOrcamento() {
  const [enviado, setEnviado] = useState(false);

  function aoEnviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const dados = new FormData(evento.currentTarget);
    const nome = String(dados.get("nome") ?? "").trim();
    const carro = String(dados.get("carro") ?? "").trim();
    const servico = String(dados.get("servico") ?? "").trim();
    const problema = String(dados.get("problema") ?? "").trim();

    const extras = `Nome: ${nome}. Carro: ${carro}. Serviço: ${servico}. O que está acontecendo: ${problema}`;
    window.open(linkWhatsApp("orcamento", extras), "_blank", "noopener,noreferrer");
    setEnviado(true);
  }

  return (
    <form onSubmit={aoEnviar} className="mt-10 flex max-w-[560px] flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="nome" className="etiqueta text-aco-fosco">
          Seu nome
        </label>
        <input id="nome" name="nome" type="text" required className={CAMPO} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="carro" className="etiqueta text-aco-fosco">
          Carro e ano
        </label>
        <input
          id="carro"
          name="carro"
          type="text"
          required
          placeholder="Ex: Gol 2015"
          className={CAMPO}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="servico" className="etiqueta text-aco-fosco">
          Serviço desejado
        </label>
        <select id="servico" name="servico" required defaultValue="" className={CAMPO}>
          <option value="" disabled>
            Selecione
          </option>
          {SERVICOS.map((servico) => (
            <option key={servico.slug} value={servico.nome}>
              {servico.nome}
            </option>
          ))}
          <option value="Não sei, preciso de diagnóstico">Não sei, preciso de diagnóstico</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="problema" className="etiqueta text-aco-fosco">
          O que está acontecendo
        </label>
        <textarea
          id="problema"
          name="problema"
          required
          rows={4}
          placeholder="Ex: volante pesado e barulho ao virar"
          className={CAMPO}
        />
      </div>

      <Button type="submit" size="lg" className="w-fit">
        <MessageCircle aria-hidden="true" />
        Enviar pelo WhatsApp
      </Button>

      {enviado && (
        <p role="status" className="text-corpo text-aco">
          Abrimos o WhatsApp numa aba nova com sua mensagem pronta. Se não abriu, verifique o
          bloqueador de pop-up do navegador.
        </p>
      )}
    </form>
  );
}
