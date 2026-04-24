import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import SmartImage from "@/components/SmartImage";
import { renderMDX } from "@/lib/mdx";
import {
  CATEGORIES,
  type Category,
  getAllArticles,
  getArticle,
  getRelatedArticles,
} from "@/lib/articles";

const CATEGORY_KEYWORDS: Record<string, string> = {
  "s-installer": "malaga,architecture,house",
  "vie-pratique": "spain,market,fruits",
  villes: "andalusia,old-town,plaza",
  sport: "sport,running,mediterranean",
  padel: "sport,running,mediterranean",
  "travail-visa": "workspace,coworking,laptop",
};

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

function getHeroKeywords(category: string, slug: string): string {
  const base =
    CATEGORY_KEYWORDS[category] || CATEGORY_KEYWORDS["s-installer"];
  const extra = SLUG_KEYWORDS.find((s) => s.match.test(slug));
  return extra ? `${extra.keywords},${base}` : base;
}

type PageProps = { params: { category: string; slug: string } };

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({
    category: a.frontmatter.category,
    slug: a.frontmatter.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  if (!(params.category in CATEGORIES)) return {};
  const article = getArticle(params.category as Category, params.slug);
  if (!article) return {};
  const { title, description, date } = article.frontmatter;
  const url = `https://expatmalaga.org/${params.category}/${params.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: date,
      locale: "fr_FR",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  if (!(params.category in CATEGORIES)) notFound();
  const category = params.category as Category;
  const article = getArticle(category, params.slug);
  if (!article) notFound();

  const related = getRelatedArticles(article);
  const cat = CATEGORIES[category];
  const heroKeywords = getHeroKeywords(category, article.frontmatter.slug);
  const content = await renderMDX(article.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.frontmatter.title,
    description: article.frontmatter.description,
    datePublished: article.frontmatter.date,
    dateModified: article.frontmatter.date,
    author: {
      "@type": "Organization",
      name: "Expat Málaga",
      url: "https://expatmalaga.org",
    },
    publisher: {
      "@type": "Organization",
      name: "Expat Málaga",
      url: "https://expatmalaga.org",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://expatmalaga.org/${category}/${article.frontmatter.slug}`,
    },
    articleSection: cat.label,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="relative text-white overflow-hidden">
        {/* Hero photo: explicit heroImage (frontmatter) or keyword-based fallback */}
        <div className="absolute inset-0">
          <SmartImage
            src={article.frontmatter.heroImage}
            keywords={heroKeywords}
            category={category}
            width={1920}
            height={900}
            alt={article.frontmatter.heroImageAlt || article.frontmatter.title}
            sig={article.frontmatter.slug}
            loading="eager"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Dark forest overlay for text legibility */}
        <div className="absolute inset-0 bg-forest/70" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-forest/40 via-forest/60 to-forest/80"
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 md:py-20">
          <nav className="text-xs text-white/80 mb-4 flex gap-2 items-center">
            <Link href="/" className="hover:underline">
              Accueil
            </Link>
            <span aria-hidden>/</span>
            <Link
              href={`/categorie/${category}`}
              className="hover:underline"
            >
              {cat.label}
            </Link>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl leading-tight max-w-3xl">
            {article.frontmatter.title}
          </h1>
          <p className="mt-4 text-white/90 max-w-2xl leading-relaxed">
            {article.frontmatter.description}
          </p>
          <div className="mt-5 flex items-center gap-3 text-xs text-white/80">
            <time dateTime={article.frontmatter.date}>
              {new Date(article.frontmatter.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span aria-hidden>·</span>
            <span>{article.readingMinutes} min de lecture</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12 grid lg:grid-cols-[1fr_320px] gap-10">
        <div className="min-w-0">
          <div className="prose-editorial max-w-prose text-[17px]">
            {content}
          </div>

        </div>

        <Sidebar related={related} current={article} />
      </div>
    </article>
  );
}
