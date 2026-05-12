import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type Category =
  | "s-installer"
  | "vie-pratique"
  | "villes"
  | "sport"
  | "travail-visa";

export type ArticleFrontmatter = {
  title: string;
  description: string;
  category: Category;
  slug: string;
  date: string;
  readTime?: string;
  /**
   * Optional hero image URL. When provided, overrides the automatic
   * Unsplash-keyword image in article headers and cards. Use any public URL
   * (Wikimedia Commons Special:FilePath, Unsplash CDN, or your own CDN).
   */
  heroImage?: string;
  /** Optional alt text for the hero image (accessibility). */
  heroImageAlt?: string;
  /** Optional credit line shown in the corner of the hero. */
  heroImageCredit?: string;
};

export type Article = {
  frontmatter: ArticleFrontmatter;
  content: string;
  readingMinutes: number;
};

export const CATEGORIES: Record<
  Category,
  { label: string; description: string; emoji: string; image: string }
> = {
  "s-installer": {
    label: "S'installer",
    description:
      "NIE, TIE, logement, compte bancaire, empadronamiento : les démarches pour poser ses valises.",
    emoji: "🗝️",
    image: "/images/categories/s-installer.jpg",
  },
  "vie-pratique": {
    label: "Vie pratique",
    description:
      "Budget, santé, sécu sociale, transports, école : le quotidien au soleil.",
    emoji: "🌞",
    image: "/images/categories/vie-pratique.jpg",
  },
  villes: {
    label: "Villes",
    description:
      "Málaga, Séville, Grenade, Cordoue : choisir sa ville d'adoption en Andalousie.",
    emoji: "🏛️",
    image: "/images/categories/villes.jpg",
  },
  sport: {
    label: "Sport",
    description:
      "Padel, randonnée, escalade, surf, golf, running : l'Andalousie est un terrain de jeu géant.",
    emoji: "🏃",
    image: "/images/categories/sport.jpg",
  },
  "travail-visa": {
    label: "Travail & Visa",
    description:
      "Autonomo, télétravail, visa nomade digital : travailler depuis l'Espagne.",
    emoji: "💼",
    image: "/images/categories/travail-visa.jpg",
  },
};

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getAllArticles(): Article[] {
  const articles: Article[] = [];
  const categories = Object.keys(CATEGORIES) as Category[];

  for (const category of categories) {
    const dir = path.join(CONTENT_DIR, category);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const full = path.join(dir, file);
      const raw = fs.readFileSync(full, "utf8");
      const { data, content } = matter(raw);
      const stats = readingTime(content);
      articles.push({
        frontmatter: {
          ...(data as ArticleFrontmatter),
          category,
          slug: (data as ArticleFrontmatter).slug || file.replace(/\.mdx$/, ""),
        },
        content,
        readingMinutes: Math.max(1, Math.round(stats.minutes)),
      });
    }
  }

  return articles.sort((a, b) =>
    b.frontmatter.date.localeCompare(a.frontmatter.date),
  );
}

export function getArticlesByCategory(category: Category): Article[] {
  return getAllArticles().filter((a) => a.frontmatter.category === category);
}

export function getArticle(category: Category, slug: string): Article | null {
  const all = getAllArticles();
  return (
    all.find(
      (a) =>
        a.frontmatter.category === category && a.frontmatter.slug === slug,
    ) || null
  );
}

export function getFeaturedArticles(n = 6): Article[] {
  return getAllArticles().slice(0, n);
}

export function getRelatedArticles(current: Article, n = 3): Article[] {
  return getAllArticles()
    .filter(
      (a) =>
        a.frontmatter.category === current.frontmatter.category &&
        a.frontmatter.slug !== current.frontmatter.slug,
    )
    .slice(0, n);
}
