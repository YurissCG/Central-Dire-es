"use client";

import { useEffect, useRef, useState } from "react";

interface ContadorNumeroProps {
  valor: number;
  className?: string;
  decimalSeparator?: string;
  duracaoMs?: number;
}

export function ContadorNumero({
  valor,
  className,
  decimalSeparator = ".",
  duracaoMs = 1200,
}: ContadorNumeroProps) {
  const [exibido, setExibido] = useState(valor);
  const refSpan = useRef<HTMLSpanElement>(null);
  const jaAnimouRef = useRef(false);

  useEffect(() => {
    const elemento = refSpan.current;
    if (!elemento || jaAnimouRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting || jaAnimouRef.current) return;
        jaAnimouRef.current = true;
        observer.disconnect();

        const inicio = performance.now();
        setExibido(0);

        function passo(agora: number) {
          const progresso = Math.min((agora - inicio) / duracaoMs, 1);
          setExibido(valor * progresso);
          if (progresso < 1) requestAnimationFrame(passo);
        }
        requestAnimationFrame(passo);
      },
      { threshold: 0.3 },
    );
    observer.observe(elemento);
    return () => observer.disconnect();
  }, [valor, duracaoMs]);

  const decimais = valor % 1 !== 0 ? 1 : 0;
  const texto = exibido.toFixed(decimais).replace(".", decimalSeparator);

  return (
    <span ref={refSpan} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {texto}
    </span>
  );
}
