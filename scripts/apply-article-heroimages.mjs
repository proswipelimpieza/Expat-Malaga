#!/usr/bin/env node
/**
 * scripts/apply-article-heroimages.mjs
 *
 * Parcourt content/<categorie>/*.mdx et, pour chaque article sans heroImage,
 * injecte dans le frontmatter :
 *   heroImage: "/images/<categorie>/<slug>.jpg"
 *   heroImageAlt: "<titre de l'article>"
 * si le fichier image existe.
 *
 * Usage : node scripts/apply-article-heroimages.mjs
 */

import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CONTENT = join(ROOT, "content");

async function exists(p) {
  try { await stat(p); return true; } catch { return false; }
}

async function main() {
  const cats = await readdir(CONTENT);
  let updated = 0, skipped = 0, missing = 0;

  for (const cat of cats) {
    const catDir = join(CONTENT, cat);
    const s = await stat(catDir);
    if (!s.isDirectory()) continue;
    const files = (await readdir(catDir)).filter((f) => f.endsWith(".mdx"));

    for (const file of files) {
      const filepath = join(catDir, file);
      const slug = file.replace(/\.mdx$/, "");
      const raw = await readFile(filepath, "utf8");

      if (/^heroImage:/m.test(raw)) {
        skipped++;
        continue;
      }

      // Trouve le fichier image : priorité au dossier catégorie,
      // sinon dossier 'villes' pour les anciens articles.
      const candidates = [
        join(ROOT, "public", "images", cat, `${slug}.jpg`),
        join(ROOT, "public", "images", "villes", `${slug}.jpg`),
      ];
      let imagePath = null;
      let publicPath = null;
      for (const c of candidates) {
        if (await exists(c)) {
          imagePath = c;
          publicPath = c.replace(join(ROOT, "public"), "").replace(/\\/g, "/");
          break;
        }
      }

      if (!imagePath) {
        console.log(`⚠️  Pas d'image pour ${cat}/${slug}`);
        missing++;
        continue;
      }

      // Récupère le titre pour l'alt
      const titleMatch = raw.match(/^title:\s*"([^"]+)"/m);
      const alt = titleMatch ? titleMatch[1] : slug.replace(/-/g, " ");

      // Injecte juste après la ligne date:
      const insertion = `heroImage: "${publicPath}"\nheroImageAlt: "${alt}"\n`;
      const updatedRaw = raw.replace(
        /^(date:\s*"[^"]+"(?:\nreadTime:\s*"[^"]+")?)/m,
        `$1\n${insertion.trimEnd()}`,
      );

      if (updatedRaw === raw) {
        console.log(`⚠️  Pas pu injecter dans ${cat}/${slug} (pas de date?)`);
        missing++;
        continue;
      }

      await writeFile(filepath, updatedRaw, "utf8");
      console.log(`✓  ${cat}/${slug}  → ${publicPath}`);
      updated++;
    }
  }

  console.log(`\n✓ ${updated} mis à jour   ⏭ ${skipped} déjà OK   ⚠️  ${missing} sans image`);
}

main().catch((e) => { console.error(e); process.exit(1); });
