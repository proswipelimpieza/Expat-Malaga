import Link from "next/link";
import SmartImage from "@/components/SmartImage";
import type { Article } from "@/lib/articles";
import { CATEGORIES } from "@/lib/articles";
import { CATEGORY_ICONS } from "@/lib/category-icons";

const CATEGORY_KEYWORDS: Record<string, string> = {
  "s-installer": "malaga,architecture,house",
  "vie-pratique": "spain,market,fruits",
  villes: "andalusia,old-town,plaza",
  sport: "sport,running,mediterranean",
  padel: "sport,running,mediterranean",
  "travail-visa": "workspace,coworking,laptop",
};

// Extra keywords derived from article slugs for more specific imagery.
const SLUG_KEYWORDS: { match: RegExp; keywords: string }[] = [
  // Cities & neighboring towns — most specific first
  { match: /benalmadena/i, keywords: "benalmadena,marina,mediterranean" },
  { match: /torremolinos/i, keywords: "torremolinos,beach,costa-del-sol" },
  { match: /rincon-de-la-victoria|rincon/i, keywords: "rincon-de-la-victoria,costa-del-sol,beach" },
  { match: /fuengirola/i, keywords: "fuengirola,castle,beach,spain" },
  { match: /nerja/i, keywords: "nerja,balcon-de-europa,cliffs" },
  { match: /marbella/i, keywords: "marbella,puerto-banus,marina" },
  { match: /seville|sevilla/i, keywords: "seville,andalusia,cathedral" },
  { match: /grenade|granada|alhambra/i, keywords: "granada,alhambra,andalusia" },
  { match: /cordoue|cordoba/i, keywords: "cordoba,andalusia,mezquita" },
  { match: /malaga/i, keywords: "malaga,port,mediterranean" },
  // Topics
  { match: /nie|tie|visa|papiers|documents/i, keywords: "passport,documents" },
  { match: /banque|compte|bancaire/i, keywords: "bank,spain,euro" },
  { match: /logement|location|appartement|immobilier/i, keywords: "apartment,balcony,mediterranean" },
  { match: /sante|assurance|medecin/i, keywords: "hospital,health,spain" },
  { match: /ecole|enfant|famille/i, keywords: "school,children,spain" },
  { match: /transport|voiture|train|metro/i, keywords: "train,spain,transport" },
  { match: /padel|tennis/i, keywords: "padel,tennis,racket" },
  { match: /surf|kitesurf|windsurf/i, keywords: "surfing,tarifa,waves" },
  { match: /golf/i, keywords: "golf-course,spain,andalusia" },
  { match: /running|trail|marathon/i, keywords: "running,trail,mountain" },
  { match: /rando|sierra/i, keywords: "hiking,sierra-nevada,andalusia" },
  { match: /escalade|grimpe/i, keywords: "climbing,el-chorro,cliff" },
  { match: /yoga|pilates|fitness/i, keywords: "yoga,pilates,studio" },
  { match: /nomade|remote|teletravail|coworking/i, keywords: "coworking,laptop,cafe" },
  { match: /autonomo|freelance/i, keywords: "workspace,desk,laptop" },
  { match: /impot|fiscal/i, keywords: "documents,paperwork,office" },
  { match: /budget|cout|prix/i, keywords: "euro,spain,market" },
];

function getKeywords(category: string, slug: string): string {
  const base =
    CATEGORY_KEYWORDS[category] || CATEGORY_KEYWORDS["s-installer"];
  const extra = SLUG_KEYWORDS.find((s) => s.match.test(slug));
  return extra ? `${extra.keywords},${base}` : base;
}

export default function ArticleCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  const { title, description, category, slug, date } = article.frontmatter;
  const cat = CATEGORIES[category];
  const cfg = CATEGORY_ICONS[category];
  const CatIcon = cfg?.icon;
  const keywords = getKeywords(category, slug);

  return (
    <Link
      href={`/${category}/${slug}`}
      className="group block overflow-hidden rounded-xl border border-ink/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-sea/25"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <SmartImage
          src={article.frontmatter.heroImage}
          keywords={keywords}
          category={category}
          width={1200}
          height={675}
          alt={article.frontmatter.heroImageAlt || title}
          sig={slug}
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/50 via-forest/10 to-transparent" />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-forest shadow-sm backdrop-blur">
          {CatIcon && <CatIcon size={11} strokeWidth={2.5} className="shrink-0" />}
          {cat.label}
        </span>
      </div>
      <div className="p-4 sm:p-5">
        <h3
          className={`font-display text-forest leading-tight ${
            featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
          } group-hover:text-sea transition-colors`}
        >
          {title}
        </h3>
        <p className="mt-2 text-sm text-ink/70 leading-relaxed line-clamp-2">
          {description}
        </p>
        <div className="mt-4 flex items-center gap-3 text-xs text-muted">
          <time dateTime={date}>
            {new Date(date).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <span aria-hidden>·</span>
          <span>{article.readingMinutes} min de lecture</span>
        </div>
      </div>
    </Link>
  );
}
