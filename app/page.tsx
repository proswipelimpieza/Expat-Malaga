import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

const LIFESTYLE_PILLS = [
  "☀️ 300 jours de soleil",
  "🌊 Plages à 15 min",
  "⛰️ Sierra Nevada proche",
  "🏃 Padel toute l'année",
];

const BAND_STATS = [
  { n: "40+", label: "Guides détaillés", sub: "Mis à jour régulièrement", color: "#0096c7" },
  { n: "5",   label: "Grandes rubriques", sub: "Installation, villes, sport…", color: "#e8703a" },
  { n: "300", label: "jours de soleil / an", sub: "La Costa del Sol en chiffres", color: "#f4a623" },
];

export default function HomePage() {
  const featured = getFeaturedArticles(12)
    .filter((a) => a.frontmatter.category !== "actualites")
    .slice(0, 6);

  return (
    <>
      {/* ── HERO ─────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ borderBottom: "1px solid rgba(0,150,199,0.12)" }}
      >
        {/* Beach photo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero/plage.jpg')",
            filter: "brightness(1.05) saturate(0.95)",
          }}
          aria-hidden
        />
        {/* Sky gradient overlay — semi-transparent so the photo shows through */}
        <div className="absolute inset-0 gradient-hero" style={{ opacity: 0.55 }} aria-hidden />
        {/* Bottom wave strip */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1.5"
          style={{
            background: "linear-gradient(90deg, #0096c7 0%, #ceeaf8 50%, #0096c7 100%)",
            opacity: 0.35,
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* ── Left column ── */}
          <div>
            {/* Badge */}
            <span
              className="inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur-sm border px-3.5 py-1.5 text-xs font-medium text-sea mb-6"
              style={{
                borderColor: "rgba(0,150,199,0.20)",
                boxShadow: "0 2px 8px rgba(0,150,199,0.10)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-coral"
                style={{ animation: "pulse 2s infinite" }}
              />
              Guide indépendant · 2025
            </span>

            {/* Headline */}
            <h1
              className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-bold leading-[1.1] text-forest mb-5"
              style={{ letterSpacing: "-0.025em" }}
            >
              S'installer en{" "}
              <span
                className="animate-shimmer"
                style={{
                  color: "transparent",
                  backgroundImage: "linear-gradient(90deg, #0096c7, #00b8e0, #0096c7)",
                  backgroundSize: "200% auto",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                }}
              >
                Andalousie
              </span>
              ,<br className="hidden sm:block" />
              sans se tromper.
            </h1>

            <p className="text-lg text-ink-soft leading-relaxed mb-8 max-w-lg">
              NIE, logement à Málaga, compte bancaire, santé, padel,
              télétravail : des expats partagent leur expérience de terrain
              pour vous aider à franchir le pas.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href="/categorie/s-installer"
                className="inline-flex items-center gap-2 rounded-full bg-sea hover:bg-sea-dark px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-px shadow-md"
              >
                Commencer les démarches <ArrowRight size={13} />
              </Link>
              <Link
                href="/categorie/villes"
                className="inline-flex items-center rounded-full border border-sea text-sea px-6 py-3 text-sm font-medium transition-colors hover:bg-sky/50"
              >
                Découvrir les villes
              </Link>
            </div>

            {/* Lifestyle pills */}
            <div className="flex flex-wrap gap-2">
              {LIFESTYLE_PILLS.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full bg-white/75 backdrop-blur-sm border border-sea/15 px-3 py-1 text-xs text-ink-soft"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right column — Starter kit ── */}
          <div>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                boxShadow: "0 24px 60px rgba(0,150,199,0.14), 0 4px 16px rgba(28,26,23,0.08)",
                border: "1px solid rgba(0,150,199,0.12)",
              }}
            >
              {/* Card header */}
              <div
                className="px-6 py-5"
                style={{ background: "linear-gradient(135deg, #0096c7 0%, #00aadf 100%)" }}
              >
                <div
                  className="text-xs font-medium uppercase text-white/80 mb-1.5"
                  style={{ letterSpacing: ".14em" }}
                >
                  Kit de démarrage
                </div>
                <h2 className="font-display text-2xl font-semibold text-white leading-snug mb-1">
                  Les 4 étapes incontournables
                </h2>
                <p className="text-sm text-white/70">Dans l'ordre où on les fait vraiment.</p>
              </div>

              {/* Steps list */}
              <ol className="bg-white divide-y divide-black/[0.06]">
                {STARTER_STEPS.map((step) => (
                  <li key={step.n}>
                    <Link
                      href={step.href}
                      className="group flex items-center gap-4 px-6 py-4 hover:bg-sky/40 transition-colors"
                    >
                      <span className="h-9 w-9 shrink-0 flex items-center justify-center rounded-full bg-sea/10 font-display font-bold text-sm text-sea">
                        {step.n}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-ink">{step.title}</div>
                        <div className="text-xs text-ink-soft truncate">{step.desc}</div>
                      </div>
                      <span className="text-sea text-xl shrink-0">›</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATÉGORIES ──────────────────────── */}
      <CategoryNav />

      {/* ── FEATURE BAND ────────────────────── */}
      <section
        className="gradient-band py-20 border-y"
        style={{ borderColor: "rgba(0,150,199,0.12)" }}
      >
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-center">
          {/* Left */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sea mb-5">
              La vie sous le soleil
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forest leading-[1.12] mb-5"
              style={{ letterSpacing: "-0.025em" }}
            >
              Vivre en{" "}
              <em className="not-italic text-sea">Andalousie</em>{" "}
              comme un local.
            </h2>
            <p className="text-lg text-ink-soft leading-relaxed mb-8 max-w-md">
              Récits de terrain, démarches expliquées simplement, bonnes
              adresses : tout ce que les forums ne vous diront pas.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/categorie/s-installer"
                className="inline-flex items-center gap-2 rounded-full bg-sea hover:bg-sea-dark px-5 py-2.5 text-sm font-medium text-white transition-colors"
              >
                Découvrir les guides <ArrowRight size={13} />
              </Link>
              <Link
                href="/a-propos"
                className="inline-flex items-center rounded-full border border-sea text-sea px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/60"
              >
                À propos du site
              </Link>
            </div>
          </div>

          {/* Right — stats */}
          <div className="flex flex-col gap-4">
            {BAND_STATS.map((s) => (
              <div
                key={s.n}
                className="flex items-center gap-5 rounded-2xl border border-white/80 px-5 py-4"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(6px)",
                  boxShadow: "0 2px 12px rgba(0,150,199,0.08)",
                }}
              >
                <span
                  className="font-display text-4xl font-bold leading-none min-w-[5rem]"
                  style={{ color: s.color }}
                >
                  {s.n}
                </span>
                <div>
                  <div className="font-medium text-forest mb-0.5">{s.label}</div>
                  <div className="text-sm text-ink-soft">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTICLES ────────────────────────── */}
      <section className="py-14 bg-sand">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
            <div>
              <h2
                className="font-display text-3xl sm:text-4xl font-semibold text-ink"
                style={{ letterSpacing: "-0.015em" }}
              >
                Derniers articles
              </h2>
              <div
                className="mt-2 h-[3px] w-12 rounded-full origin-left animate-line-grow"
                style={{ background: "linear-gradient(90deg, #0096c7, #e8703a)" }}
              />
            </div>
            <Link
              href="/categorie/s-installer"
              className="flex items-center gap-1.5 text-sm font-medium text-sea hover:underline underline-offset-2 transition-colors"
            >
              Voir tous les articles <ArrowRight size={13} />
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
