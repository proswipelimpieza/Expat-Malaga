import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles, CATEGORIES } from "@/lib/articles";
import type { Category } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Plan du site",
  description:
    "Retrouvez l'ensemble des rubriques et articles d'Expat Málaga, le guide des expatriés francophones en Andalousie.",
  alternates: { canonical: "https://expatmalaga.org/plan-du-site" },
};

const STATIC_PAGES = [
  { label: "Accueil", href: "/" },
  { label: "Communauté WhatsApp", href: "/communaute" },
  { label: "Réseau de professionnels", href: "/professionnels" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
  { label: "Mentions légales & affiliation", href: "/mentions-legales" },
];

export default function PlanDuSitePage() {
  const articles = getAllArticles();

  const byCategory = (Object.keys(CATEGORIES) as Category[]).map((key) => ({
    key,
    meta: CATEGORIES[key],
    articles: articles.filter((a) => a.frontmatter.category === key),
  }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="font-display text-4xl text-forest mb-3">Plan du site</h1>
      <p className="text-ink/60 mb-12 max-w-xl leading-relaxed">
        L'ensemble des pages et articles d'Expat Málaga, organisés par rubrique.
      </p>

      {/* Pages statiques */}
      <section className="mb-12">
        <h2 className="font-display text-xl text-forest mb-4 flex items-center gap-2">
          <span className="h-1 w-6 rounded-full bg-sea inline-block" />
          Pages du site
        </h2>
        <ul className="grid sm:grid-cols-2 gap-2">
          {STATIC_PAGES.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="flex items-center gap-2 text-sm text-ink/70 hover:text-sea transition-colors py-1"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-sea/40 shrink-0" />
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Rubriques & articles */}
      <div className="space-y-10">
        {byCategory.map(({ key, meta, articles: catArticles }) => (
          <section key={key}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl">{meta.emoji}</span>
              <Link
                href={`/categorie/${key}`}
                className="font-display text-xl text-forest hover:text-sea transition-colors"
              >
                {meta.label}
              </Link>
              <span className="text-xs text-ink/40 font-medium">
                {catArticles.length} article{catArticles.length > 1 ? "s" : ""}
              </span>
            </div>

            {catArticles.length === 0 ? (
              <p className="text-sm text-ink/40 italic pl-9">Aucun article pour l'instant.</p>
            ) : (
              <ul className="pl-9 space-y-1.5">
                {catArticles.map((a) => (
                  <li key={a.frontmatter.slug}>
                    <Link
                      href={`/${a.frontmatter.category}/${a.frontmatter.slug}`}
                      className="flex items-start gap-2 text-sm text-ink/70 hover:text-sea transition-colors group"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-sea/30 mt-[7px] shrink-0 group-hover:bg-sea transition-colors" />
                      <span className="leading-snug">{a.frontmatter.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {/* Lien XML pour les robots */}
      <div className="mt-14 rounded-xl border border-forest/10 bg-forest/5 px-5 py-4 text-sm text-ink/60 leading-relaxed">
        <strong className="text-forest">Pour les robots</strong> : le fichier sitemap XML à destination
        des moteurs de recherche est disponible à l'adresse{" "}
        <a
          href="/sitemap.xml"
          className="font-medium text-sea hover:underline underline-offset-2"
        >
          /sitemap.xml
        </a>
        .
      </div>
    </div>
  );
}
