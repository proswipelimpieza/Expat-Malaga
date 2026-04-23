import Link from "next/link";
import { CATEGORIES } from "@/lib/articles";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-cream/85 border-b border-forest/10">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-forest text-cream font-display text-lg">
            E
          </span>
          <span className="font-display text-xl text-forest leading-none">
            Expat <span className="text-terracotta-dark">Málaga</span>
          </span>
        </Link>
        <ul className="hidden md:flex items-center gap-1 text-sm">
          {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map(
            (key) => (
              <li key={key}>
                <Link
                  href={`/categorie/${key}`}
                  className="px-3 py-2 rounded-md text-ink/80 hover:text-forest hover:bg-forest/5 transition-colors"
                >
                  {CATEGORIES[key].label}
                </Link>
              </li>
            ),
          )}
          <li>
            <Link
              href="/a-propos"
              className="px-3 py-2 rounded-md text-ink/80 hover:text-forest hover:bg-forest/5"
            >
              À propos
            </Link>
          </li>
        </ul>
        <Link
          href="/contact"
          className="hidden sm:inline-flex items-center rounded-md bg-terracotta px-3.5 py-2 text-sm font-semibold text-white hover:bg-terracotta-dark transition-colors"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
