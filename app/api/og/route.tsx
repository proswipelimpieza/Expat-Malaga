import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const CATEGORY_LABELS: Record<string, string> = {
  "s-installer": "S'installer",
  "vie-pratique": "Vie pratique",
  villes: "Villes",
  sport: "Sport",
  "travail-visa": "Travail & Visa",
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Expat Málaga";
  const category = searchParams.get("category") ?? "";
  const categoryLabel = CATEGORY_LABELS[category] ?? "Expat Málaga";

  // Adapte la taille de la police selon la longueur du titre
  const fontSize = title.length > 60 ? 52 : title.length > 40 ? 60 : 68;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background:
            "linear-gradient(135deg, #1A3A2A 0%, #2A5540 55%, #1a3a2a 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          position: "relative",
        }}
      >
        {/* Accent décoratif terracotta */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "320px",
            height: "320px",
            background:
              "radial-gradient(circle at top right, rgba(232,145,106,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "240px",
            height: "240px",
            background:
              "radial-gradient(circle at bottom left, rgba(232,145,106,0.10) 0%, transparent 70%)",
          }}
        />

        {/* Haut : badge catégorie */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              background: "#E8916A",
              color: "#ffffff",
              padding: "10px 24px",
              borderRadius: "100px",
              fontSize: "20px",
              fontWeight: "700",
              fontFamily: "sans-serif",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {categoryLabel}
          </div>
        </div>

        {/* Milieu : titre */}
        <div
          style={{
            color: "#F5F0E8",
            fontSize: `${fontSize}px`,
            fontWeight: "700",
            lineHeight: 1.2,
            maxWidth: "980px",
            fontFamily: "Georgia, serif",
          }}
        >
          {title}
        </div>

        {/* Bas : branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            {/* Pastille terracotta */}
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#E8916A",
              }}
            />
            <span
              style={{
                color: "#F5F0E8",
                fontSize: "28px",
                fontFamily: "Georgia, serif",
                fontWeight: "700",
              }}
            >
              Expat{" "}
              <span style={{ color: "#E8916A" }}>Málaga</span>
            </span>
          </div>
          <span
            style={{
              color: "rgba(245,240,232,0.45)",
              fontSize: "20px",
              fontFamily: "sans-serif",
            }}
          >
            expatmalaga.org
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
