import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/articles";

export default function Footer() {
  return (
    <footer className="bg-navy text-white/90">
      <div className="mx-auto max-w-6xl px-4 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">

        {/* Brand */}
        <div className="md:col-span-2">
          <div className="font-display text-2xl text-white mb-4">
            Expat <span className="text-sea">Málaga</span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed max-w-xs mb-7">
            Le guide indépendant des expatriés francophones en Andalousie.
            Récits de terrain, démarches expliquées simplement, bonnes adresses.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-sky text-sea px-5 py-2 text-sm font-medium transition-colors"
          >
            Nous contacter <ArrowRight size={12} />
          </Link>
        </div>

        {/* Rubriques */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-5">
            Rubriques
          </div>
          <ul className="space-y-2.5">
            {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map((key) => (
              <li key={key}>
                <Link
                  href={`/categorie/${key}`}
                  className="text-sm text-white/60 hover:text-sea transition-colors"
                >
                  {CATEGORIES[key].label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Site */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-5">
            Site
          </div>
          <ul className="space-y-2.5">
            <li>
              <Link
                href="/communaute"
                className="text-sm text-white/60 hover:text-sea transition-colors flex items-center gap-1.5"
              >
                <span className="h-2 w-2 rounded-full bg-[#25D366]" />
                Communauté
              </Link>
            </li>
            {[
              { label: "Professionnels", href: "/professionnels" },
              { label: "À propos", href: "/a-propos" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-sm text-white/60 hover:text-sea transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="/sitemap.xml" className="text-sm text-white/60 hover:text-sea transition-colors">
                Plan du site
              </a>
            </li>
            <li>
              <a href="/rss.xml" className="text-sm text-white/60 hover:text-sea transition-colors">
                Flux RSS
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-5 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Expat Málaga — expatmalaga.org · Site indépendant, sans lien avec les administrations.
          </p>
          <Link
            href="/mentions-legales"
            className="text-xs text-white/40 hover:text-sea transition-colors underline-offset-2 hover:underline"
          >
            Mentions légales & affiliation
          </Link>
        </div>
      </div>
    </footer>
  );
}
