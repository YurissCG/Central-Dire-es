"use client";

import { useEffect, useRef, useState } from "react";

interface LazyLoopVideoProps {
  src: string;
  poster: string;
  className?: string;
  "aria-label": string;
}

// Video autoplay so baixa/toca quando entra perto da viewport (IntersectionObserver).
// Um <video autoPlay> comum, ou até um <video poster> sem essa checagem, comeca a
// baixar assim que entra no DOM, competindo por banda com a foto do Hero e
// estourando o orcamento de LCP (ver docs/03-arquitetura.md 3.6) — por isso o poster
// só entra no elemento quando a secao realmente se aproxima da viewport, igual o video.
export function LazyLoopVideo({ src, poster, className, "aria-label": ariaLabel }: LazyLoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [posterPronto, setPosterPronto] = useState<string | undefined>(undefined);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setPosterPronto(poster);
        video.src = src;
        video.load();
        if (!reduzido) {
          video.play().catch(() => {});
        }
        observer.disconnect();
      },
      { rootMargin: "400px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src, poster]);

  return (
    <video
      ref={videoRef}
      className={className}
      poster={posterPronto}
      preload="none"
      muted
      loop
      playsInline
      controls
      aria-label={ariaLabel}
    />
  );
}
