import Link from "next/link";
import { CATEGORIES } from "@/lib/articles";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-forest/10 bg-forest text-cream/90">
      <div className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="font-display text-2xl text-cream">
            Expat <span className="text-terracotta">Málaga</span>
          </div>
          <p className="mt-3 text-sm text-cream/70 max-w-sm leading-relaxed">
            Le guide indépendant des expatriés français en Andalousie. Récits
            de terrain, démarches expliquées simplement, bonnes adresses.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold text-cream mb-3 uppercase tracking-wide">
            Thèmes
          </div>
          <ul className="space-y-2 text-sm">
            {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map(
              (key) => (
                <li key={key}>
                  <Link
                    href={`/categorie/${key}`}
                    className="hover:text-terracotta"
                  >
                    {CATEGORIES[key].label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-cream mb-3 uppercase tracking-wide">
            Site
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/a-propos" className="hover:text-terracotta">
                À propos
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-terracotta">
                Contact
              </Link>
            </li>
            <li>
              <a href="/sitemap.xml" className="hover:text-terracotta">
                Plan du site
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-cream/50 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <p>
            © {new Date().getFullYear()} Expat Málaga — expatmalaga.org · Site
            indépendant, sans lien avec les administrations espagnoles ou
            françaises.
          </p>
          <p>
            <Link href="/mentions-legales" className="hover:text-terracotta underline-offset-2 hover:underline">
              Mentions légales & affiliation
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
