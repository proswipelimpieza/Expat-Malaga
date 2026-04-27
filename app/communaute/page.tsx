import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Communauté — Rejoindre le groupe WhatsApp",
  description:
    "Rejoignez la communauté WhatsApp des expatriés français à Málaga. Questions, bons plans, rencontres — entre expats qui se comprennent.",
  alternates: { canonical: "https://expatmalaga.org/communaute" },
};

// ─── À PERSONNALISER ────────────────────────────────────────────────────────
// Pour créer un lien d'invitation de groupe WhatsApp :
//   1. Ouvrez le groupe dans WhatsApp
//   2. Appuyez sur le nom du groupe → "Ajouter des membres" → "Lien d'invitation"
//   3. "Copier le lien" — il ressemble à https://chat.whatsapp.com/XXXXXXXXXX
//   4. Collez-le ici à la place du placeholder.
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/VOTRE_LIEN_ICI";
// ────────────────────────────────────────────────────────────────────────────

const REGLES = [
  "Français uniquement — on s'entraide en langue commune.",
  "Questions, bons plans, alertes pratiques : bienvenu.",
  "Pas de démarchage commercial ni de pub non sollicitée.",
  "Respect et bienveillance — on est tous passés par là.",
];

const AUTRES_RESSOURCES = [
  {
    nom: "Groupe Facebook « Français à Málaga »",
    url: "https://www.facebook.com/groups/francaisamalaga",
    desc: "Communauté Facebook historique, très active.",
    emoji: "👥",
  },
  {
    nom: "r/expats — subreddit",
    url: "https://www.reddit.com/r/expats/",
    desc: "Forum international des expatriés, section Espagne active.",
    emoji: "💬",
  },
  {
    nom: "UFE Málaga (Union des Français de l'Étranger)",
    url: "https://www.ufe.org/",
    desc: "Association officielle : événements, aide consulaire.",
    emoji: "🇫🇷",
  },
];

const WA_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className="h-6 w-6 fill-white"
    aria-hidden
  >
    <path d="M16 2C8.28 2 2 8.28 2 16c0 2.46.67 4.77 1.83 6.76L2 30l7.45-1.8A13.92 13.92 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2Zm0 25.4c-2.14 0-4.15-.58-5.88-1.6l-.42-.25-4.42 1.07 1.1-4.3-.28-.44A11.4 11.4 0 0 1 4.6 16C4.6 9.7 9.7 4.6 16 4.6c6.3 0 11.4 5.1 11.4 11.4 0 6.3-5.1 11.4-11.4 11.4Zm6.26-8.56c-.34-.17-2.02-.99-2.33-1.1-.31-.12-.54-.17-.77.17-.23.34-.88 1.1-1.07 1.33-.2.23-.4.26-.74.09-.34-.17-1.43-.53-2.72-1.67-1.01-.9-1.69-2.01-1.88-2.35-.2-.34-.02-.52.15-.69.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.77-1.86-1.06-2.54-.28-.67-.56-.58-.77-.59h-.65c-.23 0-.6.09-.91.43-.31.34-1.18 1.15-1.18 2.81 0 1.65 1.21 3.25 1.38 3.48.17.23 2.39 3.65 5.79 5.12.81.35 1.44.56 1.93.72.81.26 1.55.22 2.13.13.65-.1 2.02-.83 2.3-1.63.29-.8.29-1.49.2-1.63-.08-.15-.31-.23-.65-.4Z" />
  </svg>
);

export default function CommunautePage() {
  const isPlaceholder = WHATSAPP_GROUP_URL.includes("VOTRE_LIEN_ICI");

  return (
    <>
      {/* Hero */}
      <section className="border-b border-forest/10">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block rounded-full bg-[#25D366]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#128C7E] mb-5">
              Communauté
            </span>
            <h1 className="font-display text-4xl md:text-5xl leading-tight text-forest">
              Entre expats,{" "}
              <span className="text-terracotta">on se comprend.</span>
            </h1>
            <p className="mt-5 text-ink/75 max-w-lg leading-relaxed text-lg">
              Le groupe WhatsApp des Français à Málaga : questions de terrain,
              alertes pratiques, bons plans de la semaine. Sans prise de tête,
              entre gens qui ont vécu les mêmes galères.
            </p>

            {isPlaceholder ? (
              <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
                <strong>⚙️ Lien à configurer</strong>
                <br />
                Remplacez{" "}
                <code className="bg-amber-100 px-1 rounded">
                  VOTRE_LIEN_ICI
                </code>{" "}
                dans{" "}
                <code className="bg-amber-100 px-1 rounded">
                  app/communaute/page.tsx
                </code>{" "}
                par le vrai lien d'invitation de votre groupe WhatsApp.
              </div>
            ) : (
              <a
                href={WHATSAPP_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#25D366] px-6 py-4 text-white font-semibold text-base shadow-lg hover:bg-[#1ebe5d] transition-colors"
              >
                {WA_ICON}
                Rejoindre le groupe WhatsApp
              </a>
            )}
          </div>

          {/* Règles */}
          <div className="rounded-2xl border border-forest/10 bg-white p-7 shadow-sm">
            <div className="font-semibold text-forest mb-5 flex items-center gap-2">
              <span className="h-8 w-8 flex items-center justify-center rounded-full bg-forest/10 text-forest text-sm">
                📋
              </span>
              L'esprit du groupe
            </div>
            <ul className="space-y-4">
              {REGLES.map((r, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm text-ink/80 leading-relaxed"
                >
                  <span className="mt-0.5 h-5 w-5 shrink-0 flex items-center justify-center rounded-full bg-[#25D366]/15 text-[#128C7E] text-xs font-bold">
                    {i + 1}
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Ce qu'on partage */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl text-forest mb-10">
            Ce qu'on y partage
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                emoji: "🗂️",
                titre: "Démarches en cours",
                desc: "NIE, TIE, empadronamiento : retours d'expérience en temps réel.",
              },
              {
                emoji: "🏠",
                titre: "Logement & arnaques",
                desc: "Alertes faux proprio, recommandations d'agences, questions de bail.",
              },
              {
                emoji: "📍",
                titre: "Bonnes adresses",
                desc: "Médecin francophone, plombier fiable, épicerie française — le vrai bouche-à-oreille.",
              },
              {
                emoji: "📰",
                titre: "Actualités pratiques",
                desc: "Changements de loi, grèves, fermetures de services — avant que ça arrive dans les médias.",
              },
              {
                emoji: "🤝",
                titre: "Événements & rencontres",
                desc: "Afterworks d'expats, tournois de padel, barbecues — pour tisser un réseau local.",
              },
              {
                emoji: "❓",
                titre: "Questions sans filtre",
                desc: "Les questions qu'on ose pas poser ailleurs. La communauté répond sans jugement.",
              },
            ].map((item) => (
              <div
                key={item.titre}
                className="rounded-xl border border-forest/10 bg-white p-5 hover:border-terracotta/30 hover:shadow-sm transition"
              >
                <div className="text-2xl mb-3">{item.emoji}</div>
                <div className="font-semibold text-forest mb-2">
                  {item.titre}
                </div>
                <p className="text-sm text-ink/65 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Autres ressources */}
      <section className="py-12 border-t border-forest/10">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-2xl text-forest mb-8">
            Autres ressources communautaires
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {AUTRES_RESSOURCES.map((r) => (
              <a
                key={r.nom}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 rounded-xl border border-forest/10 bg-white p-5 hover:border-terracotta/30 hover:shadow-sm transition group"
              >
                <span className="text-2xl mt-0.5">{r.emoji}</span>
                <div>
                  <div className="font-semibold text-forest text-sm group-hover:text-terracotta-dark transition-colors mb-1">
                    {r.nom} ↗
                  </div>
                  <p className="text-xs text-ink/60 leading-relaxed">{r.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA professionnel */}
      <section className="py-12 bg-forest/5 border-t border-forest/10">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-display text-xl text-forest">
              Vous êtes professionnel à Málaga ?
            </div>
            <p className="mt-1 text-ink/65 text-sm max-w-lg">
              Avocat, comptable, médecin, agent immobilier… rejoignez notre
              réseau et soyez visible auprès des expats.
            </p>
          </div>
          <Link
            href="/professionnels"
            className="shrink-0 inline-flex items-center rounded-lg border-2 border-forest px-5 py-3 text-sm font-semibold text-forest hover:bg-forest hover:text-cream transition-colors"
          >
            Rejoindre le réseau →
          </Link>
        </div>
      </section>
    </>
  );
}
