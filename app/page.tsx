import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import CategoryNav from "@/components/CategoryNav";
import { getFeaturedArticles } from "@/lib/articles";

const STARTER_STEPS = [
  {
    n: "01",
    title: "Obtenir le NIE",
    desc: "Le sésame pour tout : banque, bail, santé.",
    href: "/s-installer/nie-espagne-guide-2025",
  },
  {
    n: "02",
    title: "Trouver un logement",
    desc: "Plateformes, garanties, quartiers qui valent le coup.",
    href: "/s-installer/trouver-appartement-malaga",
  },
  {
    n: "03",
    title: "Ouvrir un compte bancaire",
    desc: "Banque traditionnelle ou néo-banque ? Le match.",
    href: "/s-installer/ouvrir-compte-bancaire-espagne",
  },
  {
    n: "04",
    title: "S'inscrire à la mairie",
    desc: "L'empadronamiento, obligatoire et souvent ignoré.",
    href: "/s-installer/empadronamiento-guide",
  },
];

export default function HomePage() {
  // Exclude actualites from the main grid — the section has its own page.
  const featured = getFeaturedArticles(12).filter(
    (a) => a.frontmatter.category !== "actualites",
  ).slice(0, 6);

  return (
    <>
      <section className="relative border-b border-forest/10 overflow-hidden">
        {/* Fond : photo de plage de Málaga, légèrement assombrie */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero/malaga-beach.jpg')",
            filter: "brightness(0.65) saturate(1.1)",
          }}
          aria-hidden
        />
        {/* Voile principal — sombre à gauche (pour le texte), léger à droite */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(20,40,30,0.92) 0%, rgba(20,40,30,0.80) 35%, rgba(20,40,30,0.55) 60%, rgba(20,40,30,0.30) 100%)",
          }}
          aria-hidden
        />
        {/* Voile secondaire vertical pour adoucir bord haut/bas */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.15) 100%)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:py-16 md:py-28 grid md:grid-cols-2 gap-8 md:gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-forest shadow">
              <span className="h-2 w-2 rounded-full bg-terracotta animate-pulse" />
              Guide indépendant · 2025
            </span>
            <h1
              className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-white"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.45)" }}
            >
              S'installer en{" "}
              <span className="text-terracotta">Andalousie</span>,{" "}
              <br className="hidden md:block" />
              sans se tromper.
            </h1>
            <p
              className="mt-5 text-base sm:text-lg text-white max-w-xl leading-relaxed"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
            >
              NIE, logement à Málaga, compte bancaire, santé, padel,
              télétravail : des expats partagent leur expérience de terrain
              pour vous aider à franchir le pas.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3">
              <Link
                href="/categorie/s-installer"
                className="inline-flex justify-center items-center rounded-lg bg-terracotta px-5 py-3 text-sm font-semibold text-white hover:bg-terracotta-dark shadow-lg"
              >
                Commencer par les démarches →
              </Link>
              <Link
                href="/categorie/villes"
                className="inline-flex justify-center items-center rounded-lg border border-white/70 bg-white/15 backdrop-blur-sm px-5 py-3 text-sm font-semibold text-white hover:bg-white/25 shadow-lg"
              >
                Découvrir les villes
              </Link>
            </div>
          </div>

          {/* Kit de démarrage — evergreen */}
          <div className="relative">
            <div className="relative rounded-2xl bg-white shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-forest text-cream px-4 sm:px-6 py-4 sm:py-5">
                <div className="text-[11px] uppercase tracking-[0.2em] text-terracotta">
                  Kit de démarrage
                </div>
                <h2 className="mt-1 font-display text-2xl leading-tight">
                  Les 4 étapes incontournables
                </h2>
                <p className="mt-1 text-sm text-cream/70">
                  Dans l'ordre où on les fait vraiment.
                </p>
              </div>
              <ol className="divide-y divide-forest/10">
                {STARTER_STEPS.map((step) => (
                  <li key={step.n}>
                    <Link
                      href={step.href}
                      className="group flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 hover:bg-cream/60 transition"
                    >
                      <span className="h-9 w-9 shrink-0 flex items-center justify-center rounded-full bg-terracotta/10 text-terracotta-dark font-display font-bold text-sm">
                        {step.n}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-forest">
                          {step.title}
                        </div>
                        <div className="text-sm text-ink/60 truncate">
                          {step.desc}
                        </div>
                      </div>
                      <span className="text-terracotta-dark group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <CategoryNav />

      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-forest">
              Derniers articles
            </h2>
            <Link
              href="/categorie/s-installer"
              className="text-sm font-semibold text-terracotta-dark hover:underline"
            >
              Voir tout →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((a) => (
              <ArticleCard key={a.frontmatter.slug} article={a} />
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
