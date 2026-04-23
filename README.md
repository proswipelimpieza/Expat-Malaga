# Expat Málaga — expat-malaga.com

Blog et guide SEO-optimisé destiné aux expatriés français installés en Andalousie. Construit avec **Next.js 14 (App Router)**, **MDX**, **Tailwind CSS** et **TypeScript**. Prêt pour déploiement **Vercel**.

## Stack

- Next.js 14 (App Router, React Server Components)
- MDX via `next-mdx-remote/rsc` + `gray-matter`
- Tailwind CSS 3.4 (design éditorial cream / forest / terracotta)
- TypeScript strict
- `next-sitemap` pour le sitemap automatique
- JSON-LD Article schema, OpenGraph, robots.txt

## Setup local

Prérequis : Node 18+.

```bash
npm install
npm run dev
```

Le site tourne sur [http://localhost:3000](http://localhost:3000).

Build production :

```bash
npm run build
npm run start
```

Le postbuild (`next-sitemap`) génère automatiquement `public/sitemap.xml`.

## Structure du projet

```
app/                         # Routes Next.js
  layout.tsx                 # Layout + metadata globale
  page.tsx                   # Accueil
  [category]/[slug]/page.tsx # Page article (5 catégories × N articles)
  categorie/[category]/page.tsx
  a-propos/page.tsx
  contact/page.tsx
  globals.css

components/
  AffiliateCard.tsx          # Carte affiliée réutilisable
  ArticleCard.tsx            # Vignette d'article
  CategoryNav.tsx            # Grille des 5 catégories
  Navbar.tsx
  Footer.tsx
  Sidebar.tsx                # Sidebar articles (partenaires, liens)

content/                     # 15 articles MDX (800+ mots chacun)
  s-installer/
  vie-pratique/
  villes/
  padel/
  travail-visa/

lib/
  articles.ts                # Parsing MDX, filtres par catégorie
  mdx.tsx                    # Rendu MDX + composants personnalisés

public/
  robots.txt
  og-default.svg             # OG image placeholder (gradient)
```

## Ajouter un nouvel article

1. Créez un fichier MDX dans le sous-dossier de la catégorie cible, par exemple :
   `content/vie-pratique/transports-en-commun-malaga.mdx`

2. Copiez-collez ce **frontmatter** au début du fichier :

```mdx
---
title: "Titre SEO de l'article (60-70 caractères)"
description: "Meta description 150-160 caractères, va sur Google."
category: "vie-pratique"
slug: "transports-en-commun-malaga"
date: "2025-05-01"
readTime: "7 min"
affiliateLinks:
  - name: "Nom partenaire"
    url: "https://lien-affilié.com/?ref=xxx"
    commission: "Description courte de ce que fait le partenaire"
    description: "Phrase utilisée dans la sidebar"
---

## Titre H2

Votre contenu en markdown ici. Vous pouvez utiliser `<AffiliateCard>` dans le corps :

<AffiliateCard
  name="N26"
  url="https://n26.com/fr-es/r/"
  description="Banque en ligne avec IBAN espagnol, carte Mastercard virtuelle immédiate."
  cta="Ouvrir un N26"
  tag="Banque"
/>
```

3. Le slug doit correspondre au nom du fichier (sans `.mdx`).
4. Les **5 catégories valides** sont : `s-installer`, `vie-pratique`, `villes`, `padel`, `travail-visa`.
5. L'article apparaîtra automatiquement sur l'accueil, dans sa catégorie, et sur le sitemap au prochain build.

## Utiliser le composant AffiliateCard

Le composant `AffiliateCard` est disponible **automatiquement** dans tous les fichiers MDX (sans import).

```mdx
<AffiliateCard
  name="Wise"
  url="https://wise.com/invite/u/"
  description="Compte multi-devises, transferts au taux réel."
  cta="Ouvrir un compte Wise"
  tag="Transfert d'argent"
/>
```

Props :

- `name` (obligatoire) — nom du partenaire.
- `url` (obligatoire) — URL affiliée avec votre tracking.
- `description` (obligatoire) — 1 à 2 phrases expliquant le service.
- `cta` (optionnel, défaut "En savoir plus") — texte du bouton.
- `tag` (optionnel) — petit badge catégorie (ex : "Banque", "Padel").

Le composant affiche automatiquement :

- Un badge **"Lien affilié"** (obligation légale).
- Un attribut `data-affiliate-click` pour mesurer les clics via GA / Plausible.
- Les attributs `rel="sponsored noopener noreferrer"` et `target="_blank"`.

Les liens affiliés listés dans le frontmatter apparaissent **aussi** automatiquement dans la sidebar et en bas d'article.

## Déployer sur Vercel (gratuit)

1. Poussez le repo sur GitHub.
2. Allez sur [vercel.com/new](https://vercel.com/new), connectez votre compte GitHub.
3. Importez le repo. Vercel détecte automatiquement Next.js.
4. Cliquez **Deploy** — aucun environnement à configurer pour commencer.
5. Une fois en ligne, connectez votre domaine `expat-malaga.com` :
   - Onglet **Domains** du projet Vercel.
   - Ajoutez `expat-malaga.com` et `www.expat-malaga.com`.
   - Mettez à jour les NS ou CNAME chez votre registrar selon les instructions affichées.
6. Activez **Vercel Analytics** (gratuit sur Hobby) pour suivre le trafic.

La variable d'environnement utile :

- `SITE_URL` — URL publique, utilisée par `next-sitemap`. Défaut : `https://expat-malaga.com`.

## Formulaire de contact

La page `/contact` utilise un formulaire compatible :

- **Formspree** — créez un formulaire sur [formspree.io](https://formspree.io), remplacez l'URL `https://formspree.io/f/REPLACE_ME` dans `app/contact/page.tsx`.
- **Netlify Forms** — si vous déployez sur Netlify, le formulaire est détecté automatiquement grâce à l'attribut `data-netlify="true"`.

## SEO

Tout est configuré :

- **Sitemap automatique** (`public/sitemap.xml` généré après chaque build).
- **robots.txt** dans `public/`.
- **OpenGraph** et Twitter cards sur chaque page (via `metadata` Next.js).
- **JSON-LD Article schema** sur chaque page d'article.
- **URLs propres** : `/s-installer/nie-espagne-guide-2025` (pas de `/article/123`).
- **Balises canoniques** sur chaque page.
- **Image OG** : remplacer `public/og-default.svg` par un PNG 1200×630 pour un rendu optimal sur LinkedIn/Twitter.

## Charte liens affiliés

Deux niveaux de transparence, discrets mais conformes :

1. Badge "Lien affilié" sur chaque `AffiliateCard` (petit, haut de carte).
2. Page dédiée `/mentions-legales` détaillant la politique de partenariats, liée depuis le footer.

Ce niveau de transparence est **conforme aux recommandations DGCCRF** (France) et à la réglementation espagnole sans rendre la mention envahissante.

## Image d'en-tête des articles (heroImage)

Chaque article MDX peut définir trois champs optionnels :

```yaml
heroImage: "https://exemple.com/photo.jpg"
heroImageAlt: "Description de l'image"
heroImageCredit: "Wikimedia Commons"
```

Si `heroImage` est présent, il est utilisé tel quel dans la bannière de l'article et la vignette sur l'accueil. Sinon, le site retombe automatiquement sur une image Unsplash générée depuis les mots-clés (catégorie + slug).

Sources recommandées pour `heroImage` :

- **Wikimedia Commons** via `Special:FilePath` : URL stable, droits libres.
  ```
  https://commons.wikimedia.org/wiki/Special:FilePath/<NOM_DU_FICHIER>?width=1920
  ```
- **Unsplash** direct CDN (`https://images.unsplash.com/photo-...?w=1920`).
- **Votre propre CDN** (Vercel Blob, Cloudinary, Bunny, …) pour photos originales.

En cas d'erreur de chargement, un dégradé thématique prend automatiquement le relais (pas d'image cassée visible).

## Agent contenu hebdomadaire

Le site inclut un agent Claude Code dédié à la rubrique **Actualités**, qui génère un nouvel article chaque semaine.

### Fichiers concernés

- `.claude/agents/content-writer.md` — brief complet de l'agent (sujets, ton, template, règles qualité).
- `scripts/weekly-content.sh` — script local qui invoque l'agent, enregistre l'article et crée une branche Git.
- `.github/workflows/weekly-content.yml` — GitHub Action planifiée (chaque lundi 08:00 UTC) qui exécute l'agent, commite dans une branche `content/actualites-<WEEK>` et ouvre une PR pour relecture humaine.
- `content/actualites/` — les articles générés.

### Usage manuel

```bash
# Une exécution ad hoc depuis votre machine
./scripts/weekly-content.sh
```

Prérequis : `claude` CLI installé (`npm i -g @anthropic-ai/claude-code`) et authentifié, ou `ANTHROPIC_API_KEY` exporté.

### Usage automatique (GitHub Action)

1. Ajoutez le secret `ANTHROPIC_API_KEY` dans les settings du repo GitHub (`Settings > Secrets and variables > Actions`).
2. La workflow `weekly-content.yml` s'exécute automatiquement chaque lundi matin.
3. Elle crée une branche `content/actualites-<YYYY-WXX>` avec le nouvel article et ouvre une **Pull Request** pour relecture.
4. Relisez, ajustez si besoin, mergez → déploiement automatique sur Vercel.

### Déclenchement manuel via l'UI GitHub

Onglet **Actions > Article Actualités hebdomadaire > Run workflow**. Vous pouvez passer un `topic_hint` optionnel pour orienter l'agent.

### Ajuster le brief

Modifiez `.claude/agents/content-writer.md` : ton, sources prioritaires, longueur, template, taboos. L'agent lit ce brief à chaque invocation, aucune modification de code n'est nécessaire.

## Programmes d'affiliation à rejoindre

Voici les programmes que vous pouvez activer directement. Taux observés en 2024-2025, à vérifier lors de l'inscription.

### Finance / Banque / Transferts

- **Wise** — [wise.com/referral](https://wise.com/) — 50-75 £ par nouveau client qui dépasse 200 £ transférés.
- **N26** — [n26.com/partners](https://n26.com/en-de/partners) — 10-40 € par nouveau compte validé.
- **Revolut** — [revolut.com/referrals](https://www.revolut.com/) — 10-25 € selon pays.
- **Openbank** (filiale Santander) — via réseau Awin — variable.

### Assurance expat

- **April International** — [april-international.com/fr/partenaires](https://www.april-international.com/fr) — 30-80 € par souscription, selon formule.
- **ACS Expat (AMI)** — [acs-ami.com](https://www.acs-ami.com/) — réseau Affilae, 40-100 € par souscription.
- **Cigna Global** — via Awin ou Effiliation.
- **Allianz Worldwide Care** — via Effiliation.

### Logement et voyage

- **Idealista** — pas de programme affilié direct, mais programme via **Partnerize** pour certains segments.
- **Airbnb** — [airbnb.fr/referral](https://www.airbnb.fr/) — 20-40 € par nouvel hôte.
- **Booking.com** — [partner.booking.com](https://partner.booking.com) — 25 à 40 % de la commission Booking.

### E-commerce

- **Amazon ES** — [afiliados.amazon.es](https://afiliados.amazon.es) — 1 à 10 % selon catégorie (sport 3 %, livres 5 %, mode 7 %).
- **Decathlon Espagne** — via Awin — 5-8 % sur articles sport.
- **Padel Nuestro** — via Tradedoubler — 6-10 % commission.

### Formation / Langue

- **Babbel** — [babbel.com/partners](https://www.babbel.com/) — 40-60 € par nouveau souscripteur, via réseau Awin.
- **Rosetta Stone, Lingoda, Preply** — programmes dispos via Awin, Impact, CJ.

### Outils nomades / Tech

- **Notion, Miro, Todoist, Monday** — programmes via PartnerStack ou propres.
- **NordVPN, Surfshark** — commissions élevées (40-70 % de la première mensualité).
- **Deel, Remote, Oyster** (EOR pour le visa nomade digital) — 500-1 500 € par conversion entreprise.

### Plateformes généralistes pour s'inscrire

- **Awin** — [awin.com/fr](https://www.awin.com/fr) — inscription plateforme 5 €, accès à 16 000+ marques.
- **Effiliation** — réseau français historique, spécialisé finance et assurance.
- **Tradedoubler** — orienté retail et voyages.
- **PartnerStack** — SaaS, idéal pour promouvoir Notion, Webflow, Typeform, etc.
- **Impact** — orienté gros e-commerce.

Notre recommandation : ouvrez un compte **Awin** en premier (couvre la majorité des programmes cités), puis les programmes propriétaires (Amazon, Airbnb, Wise) séparément.

## License

Tous droits réservés — contenu propriétaire. Le code source (Next.js, Tailwind) peut être réutilisé librement.

## Contact

Voir `/contact` sur le site pour les retours éditoriaux ou propositions de partenariat.
