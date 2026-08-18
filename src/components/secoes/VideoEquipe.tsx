import { MessageCircle } from "lucide-react";
import { LazyLoopVideo } from "@/components/ui/LazyLoopVideo";
import { Button } from "@/components/ui/button";
import { IMAGENS } from "@/content/imagens";
import { linkWhatsApp } from "@/lib/whatsapp";

export function VideoEquipe() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 py-16 md:py-24">
      <div className="grid items-center gap-10 md:grid-cols-[320px_1fr] md:gap-16">
        <div className="mx-auto w-full max-w-[280px] md:mx-0">
          <div className="relative overflow-hidden rounded-[1.5rem] border-4 border-vermelho bg-preto-oficina shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
            <LazyLoopVideo
              src={IMAGENS.videoEquipe}
              poster={IMAGENS.videoEquipePoster}
              className="aspect-[4/5] w-full object-cover"
              aria-label="Vídeo da equipe da Central Direções na oficina"
            />
          </div>
        </div>

        <div className="text-center md:text-left">
          <p className="etiqueta text-amarelo">A equipe no dia a dia</p>
          <h2 className="mt-3 font-display text-h2 uppercase leading-none text-branco">
            Quem cuida do seu carro
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-corpo-lg leading-[1.65] text-aco md:mx-0">
            A mesma equipe que testa, desmonta e recupera cada peça aqui dentro, todos os dias.
          </p>
          <div className="mt-8 flex justify-center md:justify-start">
            <Button size="lg" asChild>
              <a href={linkWhatsApp("video-equipe")}>
                <MessageCircle aria-hidden="true" />
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
