#!/usr/bin/env node
/**
 * scripts/fetch-article-images.mjs
 *
 * Télécharge une photo spécifique par article (hors villes, déjà gérées
 * par fetch-city-images.mjs) depuis Wikipedia ES.
 *
 * Chaque article a :
 *   - un slug et une catégorie (= dossier de sortie dans public/images/)
 *   - une page Wikipedia source
 *   - des mots-clés pour sélectionner la photo la plus pertinente
 *
 * Après exécution, lance `node scripts/apply-article-heroimages.mjs`
 * pour mettre à jour le frontmatter des MDX.
 *
 * Usage : node scripts/fetch-article-images.mjs [--force]
 */

import { mkdir, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const ARTICLES = [
  // --- s-installer ----------------------------------------------------
  {
    category: "s-installer",
    slug: "empadronamiento-guide",
    title: "Ayuntamiento de Málaga",
    prefer: ["ayuntamiento", "fachada", "casa-consistorial", "palacio"],
  },
  {
    category: "s-installer",
    slug: "nie-espagne-guide-2025",
    title: "Pasaporte español",
    prefer: ["pasaporte", "espanol", "documento", "tapa"],
  },
  {
    category: "s-installer",
    slug: "ouvrir-compte-bancaire-espagne",
    title: "CaixaBank",
    prefer: ["torre", "edificio", "sede", "barcelona", "oficina"],
  },
  {
    category: "s-installer",
    slug: "trouver-appartement-malaga",
    title: "Málaga",
    prefer: ["barrio", "calle", "edificio", "residencial", "balcon"],
  },
  // --- vie-pratique ---------------------------------------------------
  {
    category: "vie-pratique",
    slug: "assurance-sante-espagne",
    title: "Hospital Universitario Virgen Macarena",
    prefer: ["hospital", "fachada", "entrada", "edificio"],
  },
  {
    category: "vie-pratique",
    slug: "budget-mensuel-malaga-2025",
    title: "Euro",
    prefer: ["billete", "moneda", "euro", "monedas"],
  },
  {
    category: "vie-pratique",
    slug: "medecin-urgences-espagne",
    title: "Hospital Universitario Virgen de las Nieves",
    prefer: ["hospital", "fachada", "entrada", "urgencias"],
  },
  // --- sport ----------------------------------------------------------
  {
    category: "sport",
    slug: "apprendre-padel-malaga",
    title: "Pádel",
    prefer: ["clase", "entrenamiento", "pista", "escuela"],
  },
  {
    category: "sport",
    slug: "choisir-raquette-padel-debutant",
    title: "Pádel",
    prefer: ["pala", "raqueta", "equipamiento", "bola"],
  },
  {
    category: "sport",
    slug: "escalade-el-chorro-andalousie",
    title: "Caminito del Rey",
    prefer: ["caminito", "desfiladero", "gaitanes", "pasarela", "gorge"],
  },
  {
    category: "sport",
    slug: "golf-costa-del-sol-parcours",
    title: "Golf",
    prefer: ["campo", "hoyo", "green", "putter", "bandera"],
  },
  {
    category: "sport",
    slug: "meilleurs-clubs-padel-malaga",
    title: "Pádel",
    prefer: ["club", "pista", "partido", "instalaciones"],
  },
  {
    category: "sport",
    slug: "randonnee-andalousie-sierras",
    title: "Sierra Nevada (España)",
    prefer: ["mulhacen", "cumbre", "sierra", "nevada", "veleta"],
  },
  {
    category: "sport",
    slug: "running-trails-malaga",
    title: "Parque nacional de la Sierra de las Nieves",
    prefer: ["sendero", "pinsapo", "bosque", "valle", "vista", "cumbre"],
  },
  {
    category: "sport",
    slug: "surf-kitesurf-costa-del-sol",
    title: "Kitesurf",
    prefer: ["kite", "cometa", "saltando", "salto", "ola", "viento"],
  },
  {
    category: "sport",
    slug: "yoga-pilates-fitness-malaga",
    title: "Pilates",
    prefer: ["ejercicio", "practica", "clase", "movimiento", "reformer"],
  },
  // --- travail-visa ---------------------------------------------------
  {
    category: "travail-visa",
    slug: "devenir-autonomo-espagne",
    title: "Madrid",
    prefer: ["gran-via", "callao", "metropolis", "cibeles", "skyline"],
  },
  {
    category: "travail-visa",
    slug: "visa-nomade-digital-espagne",
    title: "Málaga",
    prefer: ["puerto", "muelle", "moderno", "torre", "marina"],
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
    "ExpatMalaga-ArticleFetcher/1.0 (https://expat-malaga.com; contact@expat-malaga.com)",
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
async function fileExists(p) {
  try { await stat(p); return true; } catch { return false; }
}

async function listPhotoCandidates(title, preferKeywords) {
  const encoded = encodeURIComponent(title);
  const url = `https://es.wikipedia.org/w/api.php?action=query&prop=images&titles=${encoded}&imlimit=80&format=json&formatversion=2&origin=*`;
  const data = await fetchJson(url);
  const page = data?.query?.pages?.[0];
  if (!page || !page.images) throw new Error(`Pas d'images pour "${title}"`);

  const candidates = page.images
    .map((img) => img.title)
    .filter((t) => PHOTO_EXT.test(t))
    .filter((t) => !EXCLUDE_PATTERNS.some((rx) => rx.test(t)));
  if (!candidates.length) throw new Error(`Aucune photo candidate sur "${title}"`);

  const score = (name) => {
    const lower = name.toLowerCase();
    const hitIdx = preferKeywords.findIndex((k) => lower.includes(k.toLowerCase()));
    return hitIdx === -1 ? 999 : hitIdx;
  };
  candidates.sort((a, b) => score(a) - score(b));
  return candidates;
}

async function getDirectImageUrl(fileTitle, width = 1280) {
  const encoded = encodeURIComponent(fileTitle);
  const url = `https://es.wikipedia.org/w/api.php?action=query&titles=${encoded}&prop=imageinfo&iiprop=url|size&iiurlwidth=${width}&format=json&formatversion=2&origin=*`;
  const data = await fetchJson(url);
  const info = data?.query?.pages?.[0]?.imageinfo?.[0];
  if (!info) throw new Error(`Pas d'info pour ${fileTitle}`);
  return info.thumburl || info.url;
}

async function main() {
  console.log(`▶ Téléchargement des photos d'articles\n`);
  let ok = 0, skipped = 0, failed = 0;

  for (const art of ARTICLES) {
    const outDir = join(ROOT, "public", "images", art.category);
    await mkdir(outDir, { recursive: true });
    const out = join(outDir, `${art.slug}.jpg`);
    const label = `${art.category}/${art.slug}`.padEnd(45);

    if (!FORCE && (await fileExists(out))) {
      console.log(`⏭  ${label} déjà présent`);
      skipped++;
      continue;
    }

    try {
      const candidates = await listPhotoCandidates(art.title, art.prefer);
      const fileTitle = candidates[0];

      const widths = [1280, 1024, 800];
      let bytes = 0, usedWidth = widths[0];
      for (const w of widths) {
        const imgUrl = await getDirectImageUrl(fileTitle, w);
        bytes = await downloadToFile(imgUrl, out);
        usedWidth = w;
        if (bytes < 1_000_000) break;
      }

      const kb = (bytes / 1024).toFixed(0);
      const shortFile = fileTitle.replace(/^Archivo:|^File:/, "").slice(0, 40);
      console.log(`✓  ${label} ${kb.padStart(5)} KB @${usedWidth}px ← ${shortFile}`);
      ok++;
    } catch (err) {
      console.log(`✗  ${label} ${err.message}`);
      failed++;
    }
  }

  console.log(`\n✓ ${ok} téléchargées   ⏭ ${skipped} ignorées   ✗ ${failed} échouées`);
}

main().catch((e) => { console.error("Erreur fatale :", e); process.exit(1); });
