#!/usr/bin/env node
/**
 * scripts/fetch-city-images.mjs
 *
 * Télécharge automatiquement une photo représentative pour chaque article
 * de la catégorie `villes` depuis Wikipedia.
 *
 * Stratégie :
 *   1. Pour chaque ville, liste toutes les images de sa page Wikipedia (ES).
 *   2. Filtre les drapeaux, blasons, cartes de localisation, SVG.
 *   3. Prend la PREMIÈRE photo restante (généralement la vue d'ensemble).
 *   4. Télécharge en largeur 1920px via l'API imageinfo.
 *
 * Enregistre dans public/images/villes/<slug>.jpg
 *
 * Usage :
 *   node scripts/fetch-city-images.mjs
 *   node scripts/fetch-city-images.mjs --force   # réécrit les fichiers existants
 *
 * Aucune dépendance externe (Node >= 18 natif).
 */

import { mkdir, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "images", "villes");

// slug local ↔ titre de page Wikipedia ES + mot-clé de "vue d'ensemble" à prioriser
const CITIES = [
  { slug: "benalmadena",           title: "Benalmádena",           prefer: ["puerto", "marina", "bil-bil", "castillo", "panorama", "vista"] },
  { slug: "torremolinos",          title: "Torremolinos",          prefer: ["playa", "carihuela", "panorama", "vista", "bajondillo"] },
  { slug: "marbella",              title: "Marbella",              prefer: ["casco", "plaza", "naranjos", "panorama", "vista", "puerto-banus"] },
  { slug: "nerja",                 title: "Nerja",                 prefer: ["balcon", "europa", "playa", "panorama", "vista"] },
  { slug: "fuengirola",            title: "Fuengirola",            prefer: ["playa", "castillo", "sohail", "panorama", "vista", "paseo"] },
  { slug: "rincon-de-la-victoria", title: "Rincón de la Victoria", prefer: ["playa", "cueva", "tesoro", "panorama", "vista"] },
  { slug: "malaga-guide-complet",  title: "Málaga",                prefer: ["catedral", "puerto", "gibralfaro", "alcazaba", "panorama", "vista"] },
  { slug: "seville",               title: "Sevilla",               prefer: ["catedral", "giralda", "plaza-de-espana", "panorama", "vista"] },
  { slug: "grenade",               title: "Granada",               prefer: ["alhambra", "albaicin", "panorama", "vista", "sierra-nevada"] },
];

const FORCE = process.argv.includes("--force");

// Motifs à exclure (drapeaux, blasons, cartes, schémas)
const EXCLUDE_PATTERNS = [
  /bandera/i, /flag/i,
  /escudo/i, /coat[_\s-]?of[_\s-]?arms/i, /crest/i,
  /mapa/i, /map[_\s-]/i, /location/i, /location[_\s-]map/i,
  /localizaci[oó]n/i, /situaci[oó]n/i,
  /wikidata/i, /commons[_-]logo/i, /icon/i,
  /\.svg$/i, /\.gif$/i,
];

// Préfère formats photo
const PHOTO_EXT = /\.(jpg|jpeg|png|webp)$/i;

const UA = {
  "User-Agent": "ExpatMalaga-ImageFetcher/1.0 (https://expat-malaga.com; contact@expat-malaga.com)",
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

/**
 * Récupère la liste des fichiers images liés à une page Wikipedia,
 * filtre drapeaux/blasons/cartes, puis ordonne selon les mots-clés `prefer`.
 */
async function listPhotoCandidates(title, preferKeywords) {
  const encoded = encodeURIComponent(title);
  // prop=images liste TOUS les File: utilisés sur la page, en ordre d'apparition
  const url = `https://es.wikipedia.org/w/api.php?action=query&prop=images&titles=${encoded}&imlimit=50&format=json&formatversion=2&origin=*`;
  const data = await fetchJson(url);
  const page = data?.query?.pages?.[0];
  if (!page || !page.images) throw new Error(`Pas de données images pour "${title}"`);

  // Filter out flags, coats, maps, svg
  const candidates = page.images
    .map((img) => img.title) // ex: "Archivo:Bandera_de_Benalmádena.svg"
    .filter((t) => PHOTO_EXT.test(t))
    .filter((t) => !EXCLUDE_PATTERNS.some((rx) => rx.test(t)));

  if (!candidates.length) throw new Error(`Aucune photo candidate sur la page "${title}"`);

  // Ordonne : d'abord celles contenant un mot préféré, puis le reste
  const score = (name) => {
    const lower = name.toLowerCase();
    const hitIdx = preferKeywords.findIndex((k) => lower.includes(k.toLowerCase()));
    return hitIdx === -1 ? 999 : hitIdx;
  };
  candidates.sort((a, b) => score(a) - score(b));

  return candidates;
}

/**
 * Résout le File: en URL directe (via imageinfo API) et renvoie la version redimensionnée.
 */
async function getDirectImageUrl(fileTitle, width = 1920) {
  const encoded = encodeURIComponent(fileTitle);
  const url = `https://es.wikipedia.org/w/api.php?action=query&titles=${encoded}&prop=imageinfo&iiprop=url|size&iiurlwidth=${width}&format=json&formatversion=2&origin=*`;
  const data = await fetchJson(url);
  const info = data?.query?.pages?.[0]?.imageinfo?.[0];
  if (!info) throw new Error(`Pas d'info pour ${fileTitle}`);
  return info.thumburl || info.url;
}

// ——— main

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  console.log(`▶ Téléchargement des photos de villes dans ${OUT_DIR}\n`);

  let ok = 0, skipped = 0, failed = 0;

  for (const city of CITIES) {
    const out = join(OUT_DIR, `${city.slug}.jpg`);

    if (!FORCE && (await fileExists(out))) {
      console.log(`⏭  ${city.slug.padEnd(28)} déjà présent (--force pour écraser)`);
      skipped++;
      continue;
    }

    try {
      const candidates = await listPhotoCandidates(city.title, city.prefer);
      const fileTitle = candidates[0];

      // Téléchargement progressif : commence à 1600px, redescend si > 1.5 MB
      const widths = [1600, 1280, 1024];
      let bytes = 0;
      let usedWidth = 1600;
      for (const w of widths) {
        const imgUrl = await getDirectImageUrl(fileTitle, w);
        bytes = await downloadToFile(imgUrl, out);
        usedWidth = w;
        if (bytes < 1_500_000) break;
      }

      const kb = (bytes / 1024).toFixed(0);
      const shortFile = fileTitle.replace(/^Archivo:|^File:/, "").slice(0, 45);
      console.log(`✓  ${city.slug.padEnd(28)} ${kb.padStart(5)} KB  @${usedWidth}px  ← ${shortFile}`);
      ok++;
    } catch (err) {
      console.log(`✗  ${city.slug.padEnd(28)} ${err.message}`);
      failed++;
    }
  }

  console.log(`\n✓ ${ok} téléchargées   ⏭ ${skipped} ignorées   ✗ ${failed} échouées`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error("Erreur fatale :", err);
  process.exit(1);
});
