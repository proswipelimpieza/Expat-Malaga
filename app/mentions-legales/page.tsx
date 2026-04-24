import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales & affiliation",
  description:
    "Mentions légales, politique de liens affiliés et conditions d'utilisation d'Expat Málaga.",
  alternates: { canonical: "https://expatmalaga.org/mentions-legales" },
  robots: { index: true, follow: true },
};

export default function LegalPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 prose-editorial">
      <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-forest leading-tight">
        Mentions légales
      </h1>

      <h2 className="font-display text-2xl mt-10 text-forest">Éditeur</h2>
      <p>
        Site édité par une petite équipe d'expatriés français installés en
        Andalousie. Pour toute question légale, éditoriale ou de droit à
        l'image, contactez-nous via la{" "}
        <Link href="/contact" className="text-terracotta-dark underline">
          page contact
        </Link>
        .
      </p>

      <h2 className="font-display text-2xl mt-10 text-forest">Hébergement</h2>
      <p>
        Site hébergé par <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133,
        Walnut, CA 91789, USA.
      </p>

      <h2 className="font-display text-2xl mt-10 text-forest">
        Liens affiliés
      </h2>
      <p>
        Certains liens présents sur Expat Málaga sont des <em>liens
        d'affiliation</em>. Concrètement, si vous cliquez sur un lien portant
        la mention « Lien affilié » et que vous effectuez un achat ou une
        inscription sur le site partenaire, nous pouvons percevoir une
        commission. Cette commission n'entraîne <strong>aucun coût
        supplémentaire</strong> pour vous.
      </p>
      <p>
        Nous ne recommandons que des services que nous utilisons nous-mêmes
        ou que nous estimons utiles pour un expatrié en Andalousie. La
        rémunération ne conditionne jamais notre opinion éditoriale : nous
        refusons régulièrement des partenariats qui ne correspondent pas à
        notre ligne.
      </p>

      <h2 className="font-display text-2xl mt-10 text-forest">
        Propriété intellectuelle
      </h2>
      <p>
        Les articles, textes, et éléments graphiques originaux sont protégés
        par le droit d'auteur. Reproduction partielle autorisée avec citation
        de la source et lien vers la page concernée.
      </p>
      <p>
        Les photographies illustrant les articles proviennent majoritairement
        de banques d'images sous licence libre (Unsplash, Wikimedia Commons) ou
        de partenaires. Signalez-nous toute utilisation inappropriée.
      </p>

      <h2 className="font-display text-2xl mt-10 text-forest">
        Données personnelles
      </h2>
      <p>
        Le site ne collecte pas de données personnelles sans votre
        consentement explicite. Le formulaire de contact est traité via
        Formspree (ou équivalent), conformément au RGPD. Aucune newsletter
        automatique ni traceur publicitaire n'est activé par défaut.
      </p>

      <h2 className="font-display text-2xl mt-10 text-forest">Avertissement</h2>
      <p>
        Les informations publiées sur ce site sont données à titre indicatif,
        basées sur notre expérience personnelle et l'état de la réglementation
        au moment de la publication. Elles ne se substituent pas aux conseils
        d'un avocat, d'une gestoría ou d'un expert-comptable. Vérifiez toujours
        auprès des administrations officielles avant d'engager une démarche
        importante.
      </p>
    </section>
  );
}
