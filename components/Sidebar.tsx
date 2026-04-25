import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Article } from "@/lib/articles";
import { CATEGORIES } from "@/lib/articles";
import { CATEGORY_ICONS } from "@/lib/category-icons";

type Props = {
  related: Article[];
  current: Article;
};

export default function Sidebar({ related, current }: Props) {
  const cat = CATEGORIES[current.frontmatter.category];
  const cfg = CATEGORY_ICONS[current.frontmatter.category];
  const CatIcon = cfg?.icon;

  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      <div className="rounded-xl border border-forest/15 bg-white p-5 shadow-sm">
        <div className="text-xs uppercase tracking-wide text-muted mb-2">
          Catégorie
        </div>
        <Link
          href={`/categorie/${current.frontmatter.category}`}
          className="inline-flex items-center gap-2 font-display text-xl text-forest hover:text-terracotta-dark transition-colors"
        >
          {CatIcon && <CatIcon size={18} strokeWidth={1.75} />}
          {cat.label}
        </Link>
        <p className="mt-2 text-sm text-ink/65 leading-relaxed">
          {cat.description}
        </p>
        <Link
          href={`/categorie/${current.frontmatter.category}`}
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-terracotta-dark hover:underline"
        >
          Tous les articles <ChevronRight size={13} />
        </Link>
      </div>

      {related.length > 0 && (
        <div className="rounded-xl border border-forest/15 bg-white p-5 shadow-sm">
          <div className="font-display text-lg text-forest mb-4">
            À lire aussi
          </div>
          <ul className="divide-y divide-forest/8">
            {related.map((r) => (
              <li key={r.frontmatter.slug}>
                <Link
                  href={`/${r.frontmatter.category}/${r.frontmatter.slug}`}
                  className="group flex items-start gap-2 py-3 text-sm text-ink/80 hover:text-terracotta-dark leading-snug transition-colors"
                >
                  <ChevronRight
                    size={14}
                    className="mt-0.5 shrink-0 text-terracotta/60 group-hover:text-terracotta transition-colors"
                  />
                  <span className="flex-1">
                    {r.frontmatter.title}
                    <span className="block text-xs text-muted mt-0.5">
                      {r.readingMinutes} min de lecture
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
