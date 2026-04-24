import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Une question, une correction, une bonne adresse à partager ? Écrivez-nous.",
  alternates: { canonical: "https://expatmalaga.org/contact" },
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-display text-4xl md:text-5xl text-forest">
        Nous écrire
      </h1>
      <p className="mt-4 text-ink/80 leading-relaxed">
        Une question sur une démarche, une correction à suggérer, une bonne
        adresse à partager ? Le formulaire ci-dessous fonctionne avec
        Formspree ou Netlify Forms (voir README). Pensez à renseigner l'URL de
        destination dans l'attribut <code>action</code>.
      </p>

      <form
        className="mt-8 space-y-5 rounded-xl border border-forest/15 bg-white p-6"
        action="https://formspree.io/f/REPLACE_ME"
        method="POST"
        name="contact"
        data-netlify="true"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p className="hidden">
          <label>
            Ne pas remplir : <input name="bot-field" />
          </label>
        </p>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-forest mb-1"
          >
            Votre prénom
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded-md border border-forest/20 bg-cream/50 px-3 py-2 focus:outline-none focus:border-terracotta"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-forest mb-1"
          >
            Votre email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-forest/20 bg-cream/50 px-3 py-2 focus:outline-none focus:border-terracotta"
          />
        </div>

        <div>
          <label
            htmlFor="topic"
            className="block text-sm font-semibold text-forest mb-1"
          >
            Sujet
          </label>
          <select
            id="topic"
            name="topic"
            className="w-full rounded-md border border-forest/20 bg-cream/50 px-3 py-2 focus:outline-none focus:border-terracotta"
          >
            <option>Question sur une démarche</option>
            <option>Correction / mise à jour d'article</option>
            <option>Proposition de collaboration</option>
            <option>Autre</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-forest mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="w-full rounded-md border border-forest/20 bg-cream/50 px-3 py-2 focus:outline-none focus:border-terracotta"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center rounded-lg bg-forest px-5 py-3 text-sm font-semibold text-cream hover:bg-forest-light"
        >
          Envoyer →
        </button>
      </form>

      <p className="mt-6 text-xs text-muted leading-relaxed">
        Nous ne stockons aucune donnée en dehors du service de formulaire
        choisi. Vos messages servent exclusivement à vous répondre.
      </p>
    </section>
  );
}
