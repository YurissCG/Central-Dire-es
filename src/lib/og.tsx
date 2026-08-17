import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 } as const;
export const ogContentType = "image/png";

const barlowCondensedBold = readFileSync(
  join(process.cwd(), "src/assets/fontes/barlow-condensed-bold.ttf"),
);
const ibmPlexMonoMedium = readFileSync(
  join(process.cwd(), "src/assets/fontes/ibm-plex-mono-medium.ttf"),
);

export function gerarImagemOg(titulo: string, eyebrow?: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0b0b0c",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "IBM Plex Mono",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#f2b705",
          }}
        >
          {eyebrow ?? "Central Direções"}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Barlow Condensed",
            fontWeight: 700,
            fontSize: 92,
            textTransform: "uppercase",
            color: "#f5f6f7",
            lineHeight: 1,
            letterSpacing: -2,
            maxWidth: 980,
          }}
        >
          {titulo}
        </div>
        <div style={{ display: "flex", height: 16, width: "100%", backgroundColor: "#f2b705" }} />
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Barlow Condensed", data: barlowCondensedBold, weight: 700, style: "normal" },
        { name: "IBM Plex Mono", data: ibmPlexMonoMedium, weight: 500, style: "normal" },
      ],
    },
  );
}
