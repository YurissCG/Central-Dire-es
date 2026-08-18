import Image from "next/image";
import { IMAGENS } from "@/content/imagens";

export function BannerEquipe() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 py-12 md:py-16">
      <div className="superficie relative aspect-[16/9] w-full overflow-hidden sm:aspect-[16/8]">
        <Image
          src={IMAGENS.bannerEquipe}
          alt="Equipe da Central Direções, especialistas em direção hidráulica e mecânica"
          fill
          sizes="(min-width: 1200px) 1150px, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
