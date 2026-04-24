import Link from "next/link";
import type { Article } from "@/lib/articles";
import { CATEGORIES } from "@/lib/articles";

type Props = {
  related: Article[];
  current: Article;
};

export default function Sidebar({ related, current }: Props) {
  const cat = CATEGORIES[current.frontmatter.category];

  return (
    <aside className="space-y-8 lg:sticky lg:top-24">
      <div className="rounded-xl border border-forest/15 bg-white p-5">
        <div className="text-xs uppercase tracking-wide text-muted mb-1">
          Catégorie
        </div>
        <Link
          href={`/categorie/${current.frontmatter.category}`}
          className="font-display text-xl text-forest hover:text-terracotta-dark"
        >
          {cat.emoji} {cat.label}
        </Link>
        <p className="mt-2 text-sm text-ink/70 leading-relaxed">
          {cat.description}
        </p>
      </div>

      {related.length > 0 && (
        <div className="rounded-xl border border-forest/15 bg-white p-5">
          <div className="font-display text-lg text-forest mb-3">
            À lire aussi
          </div>
          <ul className="space-y-3">
            {related.map((r) => (
              <li key={r.frontmatter.slug}>
                <Link
                  href={`/${r.frontmatter.category}/${r.frontmatter.slug}`}
                  className="text-sm text-ink/80 hover:text-terracotta-dark leading-snug block"
                >
                  {r.frontmatter.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
