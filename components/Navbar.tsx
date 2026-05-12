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
  { href: "/professionnels", label: "Professionnels" },
];

const WA_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-4 w-4 fill-white shrink-0" aria-hidden>
    <path d="M16 2C8.28 2 2 8.28 2 16c0 2.46.67 4.77 1.83 6.76L2 30l7.45-1.8A13.92 13.92 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2Zm0 25.4c-2.14 0-4.15-.58-5.88-1.6l-.42-.25-4.42 1.07 1.1-4.3-.28-.44A11.4 11.4 0 0 1 4.6 16C4.6 9.7 9.7 4.6 16 4.6c6.3 0 11.4 5.1 11.4 11.4 0 6.3-5.1 11.4-11.4 11.4Zm6.26-8.56c-.34-.17-2.02-.99-2.33-1.1-.31-.12-.54-.17-.77.17-.23.34-.88 1.1-1.07 1.33-.2.23-.4.26-.74.09-.34-.17-1.43-.53-2.72-1.67-1.01-.9-1.69-2.01-1.88-2.35-.2-.34-.02-.52.15-.69.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.77-1.86-1.06-2.54-.28-.67-.56-.58-.77-.59h-.65c-.23 0-.6.09-.91.43-.31.34-1.18 1.15-1.18 2.81 0 1.65 1.21 3.25 1.38 3.48.17.23 2.39 3.65 5.79 5.12.81.35 1.44.56 1.93.72.81.26 1.55.22 2.13.13.65-.1 2.02-.83 2.3-1.63.29-.8.29-1.49.2-1.63-.08-.15-.31-.23-.65-.4Z" />
  </svg>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname.startsWith(href);
  }

  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{
        background: "rgba(253,250,245,0.92)",
        backdropFilter: "saturate(160%) blur(20px)",
        WebkitBackdropFilter: "saturate(160%) blur(20px)",
        borderColor: "rgba(28,26,23,0.08)",
        boxShadow: "0 1px 0 rgba(28,26,23,0.05)",
      }}
    >
      <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <span
            className="inline-flex h-9 w-9 items-center justify-center rounded-full font-display text-base text-white shadow-sm"
            style={{ background: "#2c4a1e" }}
          >
            E
          </span>
          <span className="font-display text-xl leading-none" style={{ color: "#2c4a1e" }}>
            Expat <span style={{ color: "#0096c7" }}>Málaga</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-0.5 flex-1 text-sm">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative whitespace-nowrap px-2.5 py-2 rounded-lg text-sm font-normal transition-colors ${
                    active
                      ? "text-forest bg-sea/10"
                      : "text-ink-soft hover:text-ink hover:bg-sea/8"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-sea" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden sm:flex items-center gap-2 ml-auto">
          <Link
            href="/communaute"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-2 text-sm font-medium text-white hover:bg-[#1ebe5d] transition-colors"
          >
            {WA_ICON}
            <span className="hidden md:inline">Communauté</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-white transition-colors"
            style={{ background: "#0096c7" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#007aad")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#0096c7")}
          >
            Contact
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden ml-auto flex flex-col justify-center items-center h-9 w-9 rounded-lg gap-1.5"
          style={{ color: "#2c4a1e" }}
        >
          <span className={`block h-0.5 w-5 bg-current transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-5 bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-current transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="lg:hidden border-t px-4 py-3 max-h-[calc(100vh-56px)] overflow-y-auto"
          style={{
            background: "rgba(253,250,245,0.97)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(28,26,23,0.08)",
          }}
        >
          <ul className="flex flex-col text-sm">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-3 py-3 border-b font-normal transition-colors"
                    style={{
                      borderColor: "rgba(28,26,23,0.07)",
                      color: active ? "#2c4a1e" : "#6b6358",
                    }}
                  >
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-sea shrink-0" />}
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/a-propos"
                onClick={() => setOpen(false)}
                className="flex items-center px-3 py-3 border-b font-normal"
                style={{ borderColor: "rgba(28,26,23,0.07)", color: "#6b6358" }}
              >
                À propos
              </Link>
            </li>
            <li className="mt-3 flex flex-col gap-2">
              <Link
                href="/communaute"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white"
              >
                {WA_ICON}
                Communauté WhatsApp
              </Link>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block w-full text-center rounded-full px-4 py-2.5 text-sm font-medium text-white"
                style={{ background: "#0096c7" }}
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
