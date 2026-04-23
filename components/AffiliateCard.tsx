import Link from "next/link";

type Props = {
  name: string;
  url: string;
  description: string;
  cta?: string;
  tag?: string;
};

export default function AffiliateCard({
  name,
  url,
  description,
  cta = "En savoir plus",
  tag,
}: Props) {
  return (
    <aside
      className="my-8 rounded-xl border border-terracotta/30 bg-gradient-to-br from-cream to-terracotta/10 p-6 shadow-sm not-prose"
      data-affiliate={name}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-flex items-center rounded-full bg-forest/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-forest">
          Lien affilié
        </span>
        {tag && (
          <span className="inline-flex items-center rounded-full bg-terracotta/20 px-2.5 py-0.5 text-xs font-medium text-terracotta-dark">
            {tag}
          </span>
        )}
      </div>
      <h4 className="font-display text-xl text-forest mb-1">{name}</h4>
      <p className="text-sm text-ink/80 mb-4 leading-relaxed">{description}</p>
      <Link
        href={url}
        target="_blank"
        rel="sponsored noopener noreferrer"
        data-affiliate-click={name}
        className="inline-flex items-center gap-2 rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-cream hover:bg-forest-light transition-colors"
      >
        {cta}
        <span aria-hidden>→</span>
      </Link>
    </aside>
  );
}
