"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface EntradaAoRolarProps {
  children: ReactNode;
  className?: string;
  atraso?: number;
}

export function EntradaAoRolar({ children, className, atraso = 0 }: EntradaAoRolarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35, delay: atraso, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
