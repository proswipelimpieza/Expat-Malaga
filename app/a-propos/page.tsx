import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Expat Málaga est un site indépendant tenu par des expatriés francophones installés en Andalousie qui partagent leur expérience de terrain.",
  alternates: { canonical: "https://expatmalaga.org/a-propos" },
};

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-2xl sm:text-3xl mt-12 mb-5 text-forest pb-3 border-b border-forest/10">
    {children}
  </h2>
);

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <div className="gradient-tile-3 rounded-2xl p-6 sm:p-10 text-white mb-10">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight">
          Des expatriés qui partagent <br />
          leur expérience.
        </h1>
      </div>

      <p className="text-lg leading-[1.85] my-5">
        Expat Málaga est un site <strong className="font-semibold text-forest">indépendant</strong>, tenu par
        une petite équipe d'expatriés francophones installés en Andalousie —
        certains depuis deux ans, d'autres depuis presque dix. Nous avons tous
        fait les démarches nous-mêmes : NIE, empadronamiento, ouverture de
        compte, recherche d'appartement, inscription à la sécurité sociale
        espagnole.
      </p>

      <p className="my-5 leading-[1.85] text-ink/85">
        Ce que vous lisez ici, ce sont nos notes de terrain. Pas des articles
        recopiés depuis des sites officiels, pas des contenus rédigés par des
        IA à la chaîne : des retours d'expérience réels, vérifiés, mis à jour
        régulièrement.
      </p>

      <H2>Notre ligne éditoriale</H2>
      <ul className="space-y-3 my-5">
        <li className="flex gap-3 leading-[1.85] text-ink/85">
          <span className="mt-1 h-5 w-5 shrink-0 flex items-center justify-center rounded-full bg-terracotta/15 text-terracotta text-xs font-bold">✓</span>
          <span><strong className="font-semibold text-forest">Utile avant d'être beau.</strong> Un article = une démarche qu'on peut accomplir après l'avoir lu.</span>
        </li>
        <li className="flex gap-3 leading-[1.85] text-ink/85">
          <span className="mt-1 h-5 w-5 shrink-0 flex items-center justify-center rounded-full bg-terracotta/15 text-terracotta text-xs font-bold">✓</span>
          <span><strong className="font-semibold text-forest">Local, pas généraliste.</strong> Nous parlons de ce que nous connaissons : Málaga en priorité, Séville, Grenade, Cordoue.</span>
        </li>
        <li className="flex gap-3 leading-[1.85] text-ink/85">
          <span className="mt-1 h-5 w-5 shrink-0 flex items-center justify-center rounded-full bg-terracotta/15 text-terracotta text-xs font-bold">✓</span>
          <span><strong className="font-semibold text-forest">Recommandations honnêtes.</strong> Nous citons N26 et d'autres outils parce que nous les utilisons nous-mêmes. Détails dans les{" "}
          <Link href="/mentions-legales" className="text-terracotta-dark underline underline-offset-2">mentions légales</Link>.</span>
        </li>
      </ul>

      <H2>Ce que nous ne faisons pas</H2>
      <ul className="space-y-3 my-5">
        {[
          "Nous ne sommes pas un cabinet d'avocats ni une gestoría.",
          "Nous ne faisons pas vos démarches à votre place.",
          "Nous n'avons aucun lien avec l'administration espagnole, le consulat de France ou les réseaux institutionnels.",
        ].map((item) => (
          <li key={item} className="flex gap-3 text-ink/85 leading-[1.85]">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta/60" />
            {item}
          </li>
        ))}
      </ul>

      <H2>Contact</H2>
      <p className="my-5 leading-[1.85] text-ink/85">
        Une correction à suggérer ? Une expérience à partager ?{" "}
        <Link href="/contact" className="text-terracotta-dark underline underline-offset-2">
          Écrivez-nous
        </Link>
        .
      </p>
    </section>
  );
}
