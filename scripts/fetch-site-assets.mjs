#!/usr/bin/env node
/**
 * scripts/fetch-site-assets.mjs
 *
 * Télécharge depuis Wikipedia ES :
 *   1. Une photo de fond pour la home (plage de Málaga, paysage).
 *   2. Une photo représentative pour chaque catégorie du site.
 *
 * Stratégie identique à fetch-city-images.mjs : liste toutes les images
 * liées à la page Wikipedia, filtre drapeaux/blasons/cartes/SVG, privilégie
 * les fichiers dont le nom contient un mot-clé.
 *
 * Usage :
 *   node scripts/fetch-site-assets.mjs
 *   node scripts/fetch-site-assets.mjs --force
 */

import { mkdir, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// Cibles à télécharger.
// Chaque entrée : { source Wikipedia, mots-clés préférés, chemin de sortie }.
const ASSETS = [
  {
    kind: "hero",
    title: "La Malagueta",
    prefer: ["playa", "malagueta", "paseo", "panorama", "puerto"],
    out: "public/images/hero/malaga-beach.jpg",
    label: "hero:malaga-beach",
  },
  {
    kind: "category",
    slug: "s-installer",
    title: "Málaga",
    prefer: ["aduana", "ayuntamiento", "palacio", "centro", "calle", "larios"],
    out: "public/images/categories/s-installer.jpg",
    label: "cat:s-installer",
  },
  {
    kind: "category",
    slug: "vie-pratique",
    title: "Mercado de Atarazanas",
    prefer: ["atarazanas", "mercado", "interior", "fachada"],
    out: "public/images/categories/vie-pratique.jpg",
    label: "cat:vie-pratique",
  },
  {
    kind: "category",
    slug: "villes",
    title: "Alcazaba de Málaga",
    prefer: ["alcazaba", "gibralfaro", "torre", "patio", "muralla"],
    out: "public/images/categories/villes.jpg",
    label: "cat:villes",
  },
  {
    kind: "category",
    slug: "sport",
    title: "Estadio La Rosaleda",
    prefer: ["rosaleda", "estadio", "malaga", "fachada", "tribuna"],
    out: "public/images/categories/sport.jpg",
    label: "cat:sport",
  },
  {
    kind: "category",
    slug: "travail-visa",
    title: "Málaga",
    prefer: ["puerto", "muelle", "marina", "torre-banco", "calle-larios"],
    out: "public/images/categories/travail-visa.jpg",
    label: "cat:travail-visa",
  },
  {
    kind: "category",
    slug: "actualites",
    title: "Plaza de la Constitución (Málaga)",
    prefer: ["plaza", "constitucion", "fuente", "genova"],
    out: "public/images/categories/actualites.jpg",
    label: "cat:actualites",
  },
];

const FORCE = process.argv.includes("--force");

const EXCLUDE_PATTERNS = [
  /bandera/i, /flag/i,
  /escudo/i, /coat[_\s-]?of[_\s-]?arms/i, /crest/i,
  /mapa/i, /map[_\s-]/i, /location/i, /localizaci[oó]n/i, /situaci[oó]n/i,
  /wikidata/i, /commons[_-]logo/i, /icon/i,
  /\.svg$/i, /\.gif$/i,
];

const PHOTO_EXT = /\.(jpg|jpeg|png|webp)$/i;

const UA = {
  "User-Agent":
    "ExpatMalaga-AssetFetcher/1.0 (https://expat-malaga.com; contact@expat-malaga.com)",
};

async function fetchJson(url) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`HTTP ${res.status} on ${url}`);
  return res.json();
}

async function downloadToFile(url, filepath) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`HTTP ${res.status} downloading ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await writeFile(filepath, buffer);
  return buffer.length;
}

async function fileExists(filepath) {
  try {
    await stat(filepath);
    return true;
  } catch {
    return false;
  }
}

async function listPhotoCandidates(title, preferKeywords) {
  const encoded = encodeURIComponent(title);
  const url = `https://es.wikipedia.org/w/api.php?action=query&prop=images&titles=${encoded}&imlimit=50&format=json&formatversion=2&origin=*`;
  const data = await fetchJson(url);
  const page = data?.query?.pages?.[0];
  if (!page || !page.images) throw new Error(`Pas d'images pour "${title}"`);

  const candidates = page.images
    .map((img) => img.title)
    .filter((t) => PHOTO_EXT.test(t))
    .filter((t) => !EXCLUDE_PATTERNS.some((rx) => rx.test(t)));

  if (!candidates.length)
    throw new Error(`Aucune photo candidate sur la page "${title}"`);

  const score = (name) => {
    const lower = name.toLowerCase();
    const hitIdx = preferKeywords.findIndex((k) =>
      lower.includes(k.toLowerCase()),
    );
    return hitIdx === -1 ? 999 : hitIdx;
  };
  candidates.sort((a, b) => score(a) - score(b));
  return candidates;
}

async function getDirectImageUrl(fileTitle, width = 1920) {
  const encoded = encodeURIComponent(fileTitle);
  const url = `https://es.wikipedia.org/w/api.php?action=query&titles=${encoded}&prop=imageinfo&iiprop=url|size&iiurlwidth=${width}&format=json&formatversion=2&origin=*`;
  const data = await fetchJson(url);
  const info = data?.query?.pages?.[0]?.imageinfo?.[0];
  if (!info) throw new Error(`Pas d'info pour ${fileTitle}`);
  return info.thumburl || info.url;
}

async function main() {
  console.log(`▶ Téléchargement des assets du site\n`);

  let ok = 0, skipped = 0, failed = 0;

  for (const asset of ASSETS) {
    const out = join(ROOT, asset.out);
    await mkdir(dirname(out), { recursive: true });

    if (!FORCE && (await fileExists(out))) {
      console.log(`⏭  ${asset.label.padEnd(24)} déjà présent`);
      skipped++;
      continue;
    }

    try {
      const candidates = await listPhotoCandidates(asset.title, asset.prefer);
      const fileTitle = candidates[0];

      // hero = plus large (2000px), catégorie = 1280px
      const widths = asset.kind === "hero" ? [2000, 1600, 1280] : [1280, 1024, 800];
      let bytes = 0;
      let usedWidth = widths[0];
      for (const w of widths) {
        const imgUrl = await getDirectImageUrl(fileTitle, w);
        bytes = await downloadToFile(imgUrl, out);
        usedWidth = w;
        const maxBytes = asset.kind === "hero" ? 2_000_000 : 1_200_000;
        if (bytes < maxBytes) break;
      }

      const kb = (bytes / 1024).toFixed(0);
      const shortFile = fileTitle.replace(/^Archivo:|^File:/, "").slice(0, 45);
      console.log(
        `✓  ${asset.label.padEnd(24)} ${kb.padStart(5)} KB @${usedWidth}px ← ${shortFile}`,
      );
      ok++;
    } catch (err) {
      console.log(`✗  ${asset.label.padEnd(24)} ${err.message}`);
      failed++;
    }
  }

  console.log(
    `\n✓ ${ok} téléchargées   ⏭ ${skipped} ignorées   ✗ ${failed} échouées`,
  );
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error("Erreur fatale :", err);
  process.exit(1);
});
