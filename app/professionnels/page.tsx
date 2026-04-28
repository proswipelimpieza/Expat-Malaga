import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rejoindre le réseau de professionnels",
  description:
    "Vous êtes professionnel à Málaga ou en Andalousie et souhaitez proposer vos services aux expatriés francophones ? Rejoignez notre réseau.",
  alternates: { canonical: "https://expatmalaga.org/professionnels" },
};

const PROFIL_TYPES: {
  titre: string;
  desc: string;
  partner?: { nom: string; url: string };
}[] = [
  {
    titre: "Déménageurs & logistique",
    desc: "Transport international, dédouanement, stockage.",
    partner: { nom: "The Smooth Mover", url: "https://the-smooth-mover.com/fr/" },
  },
  {
    titre: "Agents immobiliers",
    desc: "Location, achat, gestion locative — accompagnement en français.",
  },
  {
    titre: "Comptables & gestionnaires",
    desc: "Déclarations fiscales, statut autónomo, Modèle 720, loi Beckham.",
  },
  {
    titre: "Médecins & praticiens",
    desc: "Généralistes, dentistes, psy, kiné francophones à Málaga et sur la Costa del Sol.",
  },
  {
    titre: "Cours de langue",
    desc: "Cours d'espagnol pour francophones, tous niveaux — du débutant au courant.",
  },
];

const AVANTAGES = [
  { n: "01", titre: "Visibilité ciblée", desc: "Vos coordonnées accessibles aux expats qui cherchent exactement votre expertise." },
  { n: "02", titre: "Audience qualifiée", desc: "Des lecteurs en cours d'installation, avec des besoins concrets et immédiats." },
  { n: "03", titre: "Mentions éditoriales", desc: "Quand un article traite de votre domaine, nous pouvons vous citer en bonne source." },
  { n: "04", titre: "Sans engagement", desc: "Pas de contrat, pas d'exclusivité. Vous restez libre de partir à tout moment." },
];

export default function ProfessionnelsPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative border-b border-forest/10 text-cream overflow-hidden"
        style={{
          backgroundImage: "url('/images/categories/Professionnels.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-forest/85" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-20">
          <span className="inline-block rounded-full bg-terracotta/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-terracotta mb-5">
            Réseau professionnel
          </span>
          <h1 className="font-display text-4xl md:text-5xl leading-tight max-w-3xl">
            Vous accompagnez les expats.{" "}
            <span className="text-terracotta">Faites-vous connaître.</span>
          </h1>
          <p className="mt-5 text-cream/80 max-w-2xl leading-relaxed text-lg">
            Chaque semaine, des centaines de francophones cherchent sur ce site un
            comptable, un agent immobilier, un médecin ou un artisan francophone
            à Málaga. Rejoignez notre réseau et soyez la référence qu&apos;ils
            trouvent.
          </p>
        </div>
      </section>

      {/* Profils recherchés */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl text-forest mb-3">
            Quels profils sont les bienvenus ?
          </h2>
          <p className="text-ink/70 mb-10 max-w-2xl">
            Tout professionnel basé en Andalousie, capable d&apos;accompagner des
            clients francophones dans son domaine.
          </p>

          {/* Artisans & travaux — section mise en avant */}
          <div className="mb-6 rounded-2xl border-2 border-terracotta/25 bg-terracotta/5 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <span className="inline-block rounded-full bg-terracotta/15 px-3 py-0.5 text-xs font-semibold uppercase tracking-widest text-terracotta mb-3">
                  Secteur prioritaire
                </span>
                <h3 className="font-display text-2xl text-forest mb-2">
                  Artisans & travaux
                </h3>
                <p className="text-ink/70 leading-relaxed max-w-lg">
                  Electriciens, plombiers, architectes, menuisiers, rénovation —
                  c&apos;est l&apos;une des demandes les plus fréquentes des expatriés qui
                  s&apos;installent. Les artisans sérieux et francophones sont rares et
                  très recherchés.
                </p>
              </div>

              {/* Partenaire */}
              <div className="md:w-60 shrink-0 rounded-xl border border-forest/15 bg-white p-5 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-widest text-ink/45 mb-2">
                  Partenaire
                </div>
                <div className="font-semibold text-forest mb-1">
                  Vincent Demonchaux
                </div>
                <p className="text-sm text-ink/65 leading-relaxed mb-3">
                  Menuisier et création bois — artisan francophone à Málaga.
                </p>
                <a
                  href="https://vincentdemonchaux.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-terracotta hover:underline underline-offset-2"
                >
                  Voir le site →
                </a>
              </div>
            </div>
          </div>

          {/* Autres profils */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROFIL_TYPES.map((p) => (
              <div
                key={p.titre}
                className="rounded-xl border border-forest/10 bg-white p-5 hover:border-terracotta/40 hover:shadow-sm transition"
              >
                <div className="font-semibold text-forest mb-1.5">{p.titre}</div>
                <p className="text-sm text-ink/65 leading-relaxed">{p.desc}</p>
                {p.partner && (
                  <div className="mt-3 pt-3 border-t border-forest/10">
                    <div className="text-xs font-semibold uppercase tracking-wide text-ink/40 mb-1">
                      Partenaire
                    </div>
                    <a
                      href={p.partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-terracotta hover:underline underline-offset-2"
                    >
                      {p.partner.nom} →
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-12 bg-forest/5 border-y border-forest/10">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl text-forest mb-10">
            Pourquoi rejoindre le réseau ?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AVANTAGES.map((a) => (
              <div key={a.n} className="flex gap-4">
                <span className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-terracotta/15 text-terracotta font-display font-bold text-sm">
                  {a.n}
                </span>
                <div>
                  <div className="font-semibold text-forest mb-1">{a.titre}</div>
                  <p className="text-sm text-ink/70 leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section className="py-16">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="font-display text-3xl text-forest mb-3">
            Candidatez en 2 minutes
          </h2>
          <p className="text-ink/70 mb-8 leading-relaxed">
            Remplissez ce formulaire. On revient vers vous sous 48 h pour
            discuter de la meilleure façon de vous mettre en avant.
          </p>

          <form
            className="space-y-5 rounded-xl border border-forest/15 bg-white p-6 md:p-8"
            action="https://formspree.io/f/REPLACE_ME"
            method="POST"
            name="professionnels"
            data-netlify="true"
          >
            <input type="hidden" name="form-name" value="professionnels" />
            <input type="hidden" name="form-type" value="professionnel" />
            <p className="hidden">
              <label>Ne pas remplir : <input name="bot-field" /></label>
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="pro-name" className="block text-sm font-semibold text-forest mb-1.5">
                  Prénom & nom <span className="text-terracotta">*</span>
                </label>
                <input
                  id="pro-name" name="name" required placeholder="Jean Dupont"
                  className="w-full rounded-md border border-forest/20 bg-cream/50 px-3 py-2.5 focus:outline-none focus:border-terracotta text-sm"
                />
              </div>
              <div>
                <label htmlFor="pro-profession" className="block text-sm font-semibold text-forest mb-1.5">
                  Profession / spécialité <span className="text-terracotta">*</span>
                </label>
                <input
                  id="pro-profession" name="profession" required placeholder="Menuisier, électricien, agent immo…"
                  className="w-full rounded-md border border-forest/20 bg-cream/50 px-3 py-2.5 focus:outline-none focus:border-terracotta text-sm"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="pro-email" className="block text-sm font-semibold text-forest mb-1.5">
                  Email professionnel <span className="text-terracotta">*</span>
                </label>
                <input
                  id="pro-email" name="email" type="email" required placeholder="jean@monactivite.es"
                  className="w-full rounded-md border border-forest/20 bg-cream/50 px-3 py-2.5 focus:outline-none focus:border-terracotta text-sm"
                />
              </div>
              <div>
                <label htmlFor="pro-city" className="block text-sm font-semibold text-forest mb-1.5">
                  Ville(s) d&apos;intervention
                </label>
                <input
                  id="pro-city" name="city" placeholder="Málaga, Marbella, toute la province…"
                  className="w-full rounded-md border border-forest/20 bg-cream/50 px-3 py-2.5 focus:outline-none focus:border-terracotta text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="pro-website" className="block text-sm font-semibold text-forest mb-1.5">
                Site web ou LinkedIn
              </label>
              <input
                id="pro-website" name="website" type="url" placeholder="https://..."
                className="w-full rounded-md border border-forest/20 bg-cream/50 px-3 py-2.5 focus:outline-none focus:border-terracotta text-sm"
              />
            </div>

            <div>
              <label htmlFor="pro-message" className="block text-sm font-semibold text-forest mb-1.5">
                Décrivez votre offre en 2-3 phrases <span className="text-terracotta">*</span>
              </label>
              <textarea
                id="pro-message" name="message" required rows={4}
                placeholder="Ce que vous proposez, votre langue de travail, vos tarifs indicatifs…"
                className="w-full rounded-md border border-forest/20 bg-cream/50 px-3 py-2.5 focus:outline-none focus:border-terracotta text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-terracotta px-6 py-3 text-sm font-semibold text-white hover:bg-terracotta-dark transition-colors shadow-sm"
            >
              Envoyer ma candidature →
            </button>
          </form>

          <p className="mt-5 text-xs text-ink/50 leading-relaxed">
            Vos informations servent exclusivement à traiter votre candidature.
            Aucune revente, aucun spam. Réponse sous 48 h en semaine.
          </p>
        </div>
      </section>
    </>
  );
}
