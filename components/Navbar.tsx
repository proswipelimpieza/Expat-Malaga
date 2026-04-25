"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/categorie/s-installer", label: "S'installer" },
  { href: "/categorie/vie-pratique", label: "Vie pratique" },
  { href: "/categorie/villes", label: "Villes" },
  { href: "/categorie/sport", label: "Sport" },
  { href: "/categorie/travail-visa", label: "Travail & Visa" },
  { href: "/categorie/actualites", label: "Actualités" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-cream/88 border-b border-forest/10 shadow-sm">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-forest to-forest-light text-cream font-display text-lg shadow-sm">
            E
          </span>
          <span className="font-display text-xl text-forest leading-none">
            Expat <span className="text-terracotta-dark">Málaga</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-0.5 text-sm">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative px-3 py-2 rounded-md font-medium transition-colors ${
                    active
                      ? "text-forest bg-forest/10"
                      : "text-ink/70 hover:text-forest hover:bg-forest/5"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-terracotta" />
                  )}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/a-propos"
              className={`px-3 py-2 rounded-md font-medium transition-colors ${
                pathname === "/a-propos"
                  ? "text-forest bg-forest/10"
                  : "text-ink/70 hover:text-forest hover:bg-forest/5"
              }`}
            >
              À propos
            </Link>
          </li>
        </ul>

        {/* Desktop contact button */}
        <Link
          href="/contact"
          className="hidden sm:inline-flex items-center rounded-md bg-terracotta px-3.5 py-2 text-sm font-semibold text-white hover:bg-terracotta-dark transition-colors shadow-sm"
        >
          Contact
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center items-center h-9 w-9 rounded-md text-forest hover:bg-forest/5 transition-colors gap-1.5"
        >
          <span className={`block h-0.5 w-5 bg-current transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-5 bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-current transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-forest/10 bg-cream/95 backdrop-blur-md px-4 py-3 max-h-[calc(100vh-56px)] overflow-y-auto">
          <ul className="flex flex-col gap-1 text-sm">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-md font-medium transition-colors ${
                      active
                        ? "text-forest bg-forest/10"
                        : "text-ink/80 hover:text-forest hover:bg-forest/5"
                    }`}
                  >
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-terracotta shrink-0" />}
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/a-propos"
                onClick={() => setOpen(false)}
                className={`block px-3 py-2.5 rounded-md font-medium transition-colors ${
                  pathname === "/a-propos"
                    ? "text-forest bg-forest/10"
                    : "text-ink/80 hover:text-forest hover:bg-forest/5"
                }`}
              >
                À propos
              </Link>
            </li>
            <li className="mt-2 pt-2 border-t border-forest/10">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block w-full text-center rounded-md bg-terracotta px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-terracotta-dark transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
