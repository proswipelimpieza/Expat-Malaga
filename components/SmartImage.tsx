"use client";

import { useState } from "react";

type SmartImageProps = {
  /** If provided, used as-is. */
  src?: string;
  /** Kept for backward-compat but unused since the Unsplash Source API is deprecated. */
  keywords?: string;
  category?: string;
  width?: number;
  height?: number;
  alt: string;
  className?: string;
  sig?: string | number;
  loading?: "lazy" | "eager";
};

/**
 * Image locale par catégorie utilisée quand un article n'a pas de heroImage.
 * Ces fichiers sont téléchargés par scripts/fetch-site-assets.mjs.
 */
const CATEGORY_FALLBACK: Record<string, string> = {
  "s-installer": "/images/categories/s-installer.jpg",
  "vie-pratique": "/images/categories/vie-pratique.jpg",
  villes: "/images/categories/villes.jpg",
  sport: "/images/categories/sport.jpg",
  "travail-visa": "/images/categories/travail-visa.jpg",
};

const ULTIMATE_FALLBACK = "/images/hero/malaga-beach.jpg";

/**
 * SmartImage — affiche la heroImage explicite si fournie, sinon l'image
 * de la catégorie, sinon la photo hero générique. Jamais de rectangle gris.
 */
export default function SmartImage({
  src: explicitSrc,
  category,
  width = 1200,
  height = 630,
  alt,
  className = "",
  loading = "lazy",
}: SmartImageProps) {
  const categorySrc =
    (category && CATEGORY_FALLBACK[category]) || ULTIMATE_FALLBACK;

  const [currentSrc, setCurrentSrc] = useState(explicitSrc || categorySrc);

  return (
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      onError={() => {
        // si la heroImage explicite casse, retombe sur la catégorie
        if (currentSrc !== categorySrc) setCurrentSrc(categorySrc);
        else if (currentSrc !== ULTIMATE_FALLBACK)
          setCurrentSrc(ULTIMATE_FALLBACK);
      }}
      className={`object-cover w-full h-full ${className}`}
    />
  );
}
