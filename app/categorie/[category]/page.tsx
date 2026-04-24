import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import {
  CATEGORIES,
  type Category,
  getArticlesByCategory,
} from "@/lib/articles";

type PageProps = { params: { category: string } };

export function generateStaticParams() {
  return (Object.keys(CATEGORIES) as Category[]).map((c) => ({ category: c }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  if (!(params.category in CATEGORIES)) return {};
  const cat = CATEGORIES[params.category as Category];
  return {
    title: `${cat.label} — tous nos articles`,
    description: cat.description,
    alternates: {
      canonical: `https://expatmalaga.org/categorie/${params.category}`,
    },
    openGraph: {
      title: `${cat.label} — Expat Málaga`,
      description: cat.description,
      url: `https://expatmalaga.org/categorie/${params.category}`,
    },
  };
}

export default function CategoryPage({ params }: PageProps) {
  if (!(params.category in CATEGORIES)) notFound();
  const category = params.category as Category;
  const cat = CATEGORIES[category];
  const articles = getArticlesByCategory(category);

  return (
    <>
      <section className="relative border-b border-forest/10 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${cat.image}')` }}
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(26,58,42,0.85) 0%, rgba(26,58,42,0.55) 60%, rgba(26,58,42,0.3) 100%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16 md:py-24">
          <div className="text-3xl sm:text-4xl mb-2 sm:mb-3" aria-hidden>
            {cat.emoji}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-white drop-shadow">
            {cat.label}
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-cream/95 max-w-2xl drop-shadow">
            {cat.description}
          </p>
          <div className="mt-4 text-sm text-white/70">
            {articles.length} article{articles.length > 1 ? "s" : ""}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          {articles.length === 0 ? (
            <p className="text-ink/70">Aucun article pour le moment.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map((a) => (
                <ArticleCard key={a.frontmatter.slug} article={a} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
