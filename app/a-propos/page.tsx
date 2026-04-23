import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Expat Málaga est un site indépendant tenu par des expatriés français installés en Andalousie qui partagent leur expérience de terrain.",
  alternates: { canonical: "https://expat-malaga.com/a-propos" },
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 prose-editorial">
      <div className="gradient-tile-3 rounded-2xl p-10 text-white mb-10">
        <h1 className="font-display text-4xl md:text-5xl leading-tight">
          Des expats qui partagent <br />
          leur expérience.
        </h1>
      </div>

      <p className="text-lg leading-relaxed">
        Expat Málaga est un site <strong>indépendant</strong>, tenu par une
        petite équipe de Français installés en Andalousie — certains depuis
        deux ans, d'autres depuis presque dix. Nous avons tous fait les
        démarches nous-mêmes : NIE, empadronamiento, ouverture de compte,
        recherche d'appartement, inscription à la sécurité sociale espagnole.
      </p>

      <p>
        Ce que vous lisez ici, ce sont nos notes de terrain. Pas des articles
        recopiés depuis des sites officiels, pas des contenus rédigés par des
        IA à la chaîne : des retours d'expérience réels, vérifiés, mis à jour
        régulièrement. Nous gardons l'anonymat pour protéger nos vies privées
        et parler librement des administrations, des bailleurs, des clubs.
      </p>

      <h2 className="font-display text-3xl mt-10">Notre ligne éditoriale</h2>
      <ul>
        <li>
          <strong>Utile avant d'être beau.</strong> Un article = une démarche
          qu'on peut accomplir après l'avoir lu.
        </li>
        <li>
          <strong>Local, pas généraliste.</strong> Nous parlons de ce que
          nous connaissons : Málaga en priorité, Séville, Grenade, Cordoue.
        </li>
        <li>
          <strong>Recommandations honnêtes.</strong> Nous citons N26 et
          d'autres outils parce que nous les utilisons nous-mêmes. Détails
          sur notre politique de partenariats dans les{" "}
          <Link href="/mentions-legales" className="text-terracotta-dark underline">
            mentions légales
          </Link>
          .
        </li>
      </ul>

      <h2 className="font-display text-3xl mt-10">Ce que nous ne faisons pas</h2>
      <ul>
        <li>Nous ne sommes pas un cabinet d'avocats ni une gestoría.</li>
        <li>Nous ne faisons pas vos démarches à votre place.</li>
        <li>
          Nous n'avons aucun lien avec l'administration espagnole, le consulat
          de France ou les réseaux institutionnels.
        </li>
      </ul>

      <h2 className="font-display text-3xl mt-10">Contact</h2>
      <p>
        Une correction à suggérer ? Une expérience à partager ? Écrivez-nous
        via la{" "}
        <Link href="/contact" className="text-terracotta-dark underline">
          page contact
        </Link>
        .
      </p>
    </section>
  );
}
