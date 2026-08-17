import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const FOCO =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amarelo";

interface ItemSintomaProps {
  rotulo: string;
  Icone: LucideIcon;
  marcado: boolean;
  onToggle: () => void;
}

export function ItemSintoma({ rotulo, Icone, marcado, onToggle }: ItemSintomaProps) {
  return (
    <button
      type="button"
      aria-pressed={marcado}
      onClick={onToggle}
      className={cn(
        "flex min-h-[96px] flex-col items-center justify-center gap-2 border bg-grafite p-3 text-center transition-colors duration-[120ms]",
        marcado ? "border-vermelho" : "border-grafite-borda",
        FOCO,
      )}
    >
      <Icone
        aria-hidden="true"
        className={cn("size-6 transition-colors duration-[120ms]", marcado ? "text-amarelo" : "text-aco")}
      />
      <span className="text-corpo text-branco">{rotulo}</span>
    </button>
  );
}
