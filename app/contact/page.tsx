import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Une question, une correction, une bonne adresse ? Écrivez-nous.",
  alternates: { canonical: "https://expatmalaga.org/contact" },
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-xl px-4 py-16">
      <h1 className="font-display text-3xl sm:text-4xl text-forest mb-8">
        Nous écrire
      </h1>

      <form
        className="space-y-5 rounded-xl border border-forest/15 bg-white p-5 sm:p-7"
        action="https://formsubmit.co/proswipe.limpieza@gmail.com"
        method="POST"
      >
        <input type="hidden" name="_subject" value="Nouveau message — Expat Málaga" />
        <input type="hidden" name="_next" value="https://expatmalaga.org/contact?sent=1" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="text" name="_honey" className="hidden" />

        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-forest mb-1.5">
            Prénom
          </label>
          <input
            id="name" name="name" required
            className="w-full rounded-lg border border-forest/20 bg-cream/50 px-3 py-2.5 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/15 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-forest mb-1.5">
            Email
          </label>
          <input
            id="email" name="email" type="email" required
            className="w-full rounded-lg border border-forest/20 bg-cream/50 px-3 py-2.5 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/15 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="topic" className="block text-sm font-semibold text-forest mb-1.5">
            Sujet
          </label>
          <select
            id="topic" name="topic"
            className="w-full rounded-lg border border-forest/20 bg-cream/50 px-3 py-2.5 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/15 transition-colors"
          >
            <option>Question sur une démarche</option>
            <option>Correction / mise à jour d'article</option>
            <option>Proposition de collaboration</option>
            <option>Autre</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-forest mb-1.5">
            Message
          </label>
          <textarea
            id="message" name="message" required rows={5}
            className="w-full rounded-lg border border-forest/20 bg-cream/50 px-3 py-2.5 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/15 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-forest px-5 py-3 text-sm font-semibold text-cream hover:bg-forest-light transition-colors shadow-sm"
        >
          Envoyer <ArrowRight size={16} />
        </button>
      </form>
    </section>
  );
}
