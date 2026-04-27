import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rejoindre le réseau de professionnels",
  description:
    "Vous êtes professionnel à Málaga ou en Andalousie et souhaitez proposer vos services aux expatriés français ? Rejoignez notre réseau.",
  alternates: { canonical: "https://expatmalaga.org/professionnels" },
};

const PROFIL_TYPES = [
  { emoji: "⚖️", titre: "Avocats & juristes", desc: "Droit des étrangers, fiscalité franco-espagnole, succession, contrats de travail." },
  { emoji: "🏠", titre: "Agents immobiliers", desc: "Location, achat, gestion locative — accompagnement en français." },
  { emoji: "🧾", titre: "Comptables & gestionnaires", desc: "Déclarations fiscales, statut autónomo, Modèle 720, loi Beckham." },
  { emoji: "🩺", titre: "Médecins & praticiens", desc: "Généralistes, dentistes, psy, kiné francophones à Málaga et sur la Costa del Sol." },
  { emoji: "🔑", titre: "Gestionnaires & tramitadores", desc: "NIE, empadronamiento, TIE, permis de conduire — vous gérez les citas à la place des expats." },
  { emoji: "🏫", titre: "Écoles & cours", desc: "Cours d'espagnol, écoles bilingues, formation professionnelle." },
  { emoji: "🚚", titre: "Déménageurs & logistique", desc: "Transport international, dédouanement, stockage." },
  { emoji: "🛠️", titre: "Artisans & travaux", desc: "Electriciens, plombiers, architectes, rénovation — sérieux et francophones." },
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
      <section className="border-b border-forest/10 bg-forest text-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <span className="inline-block rounded-full bg-terracotta/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-terracotta mb-5">
            Réseau professionnel
          </span>
          <h1 className="font-display text-4xl md:text-5xl leading-tight max-w-3xl">
            Vous accompagnez les expats.{" "}
            <span className="text-terracotta">Faites-vous connaître.</span>
          </h1>
          <p className="mt-5 text-cream/80 max-w-2xl leading-relaxed text-lg">
            Chaque semaine, des centaines de Français cherchent sur ce site un
            avocat, un comptable, un agent immobilier ou un médecin francophone
            à Málaga. Rejoignez notre réseau et soyez la référence qu'ils
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
            Tout professionnel basé en Andalousie, capable d'accompagner des
            clients francophones dans son domaine.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROFIL_TYPES.map((p) => (
              <div
                key={p.titre}
                className="rounded-xl border border-forest/10 bg-white p-5 hover:border-terracotta/40 hover:shadow-sm transition"
              >
                <div className="text-3xl mb-3">{p.emoji}</div>
                <div className="font-semibold text-forest mb-1.5">{p.titre}</div>
                <p className="text-sm text-ink/65 leading-relaxed">{p.desc}</p>
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
                <span className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-terracotta/15 text-terracotta-dark font-display font-bold text-sm">
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
                  id="pro-profession" name="profession" required placeholder="Avocat en droit des étrangers"
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
                  id="pro-email" name="email" type="email" required placeholder="jean@cabinet-malaga.es"
                  className="w-full rounded-md border border-forest/20 bg-cream/50 px-3 py-2.5 focus:outline-none focus:border-terracotta text-sm"
                />
              </div>
              <div>
                <label htmlFor="pro-city" className="block text-sm font-semibold text-forest mb-1.5">
                  Ville(s) d'intervention
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
