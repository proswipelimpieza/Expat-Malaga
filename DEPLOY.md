# Mettre Expat Málaga en ligne

Guide condensé : du code sur votre disque → site public sur `expat-malaga.com`.

---

## TL;DR

| Étape | Où | Temps |
|---|---|---|
| 1. Tester en local | Double-clic sur `start.bat` | 1 min |
| 2. Pousser sur GitHub | Ligne de commande | 2 min |
| 3. Importer sur Vercel | [vercel.com/new](https://vercel.com/new) | 3 min |
| 4. Brancher le domaine | Vercel + registrar | 10 min |
| 5. Activer Lola (chatbot) | Vercel env vars | 2 min |
| 6. (Optionnel) Agent contenu auto | GitHub secrets | 2 min |

**Total : ~20 min pour un site public sur un domaine personnalisé.**

---

## 1. Tester en local avant publication

Double-cliquez sur **`start.bat`** à la racine du projet.

Le script :
1. Vérifie que Node.js est installé (sinon → [nodejs.org](https://nodejs.org/)).
2. Lance `npm install` si c'est le premier démarrage.
3. Démarre le serveur Next.js.
4. Ouvre automatiquement [http://localhost:3000](http://localhost:3000) dans votre navigateur.

Pour arrêter : `Ctrl+C` dans la fenêtre, puis fermez-la.

> Équivalent en ligne de commande : `npm install` puis `npm run dev`.

---

## 2. Pousser le code sur GitHub

Si ce n'est pas déjà fait :

```bash
git init
git add .
git commit -m "Initial commit"

# Créez un repo vide sur github.com/new (sans README ni gitignore),
# puis :
git remote add origin https://github.com/VOTRE-USER/expat-malaga.git
git branch -M main
git push -u origin main
```

**Important** : vérifiez que `node_modules/` est bien ignoré (il l'est déjà via `.gitignore`).

---

## 3. Déployer sur Vercel (gratuit, ~3 min)

1. Allez sur **[vercel.com/new](https://vercel.com/new)**.
2. Connectez votre compte GitHub si ce n'est pas fait.
3. **Import** le repo `expat-malaga`.
4. Vercel détecte Next.js automatiquement — **aucune config à toucher**.
5. Cliquez **Deploy**.

Après ~2 min, vous obtenez une URL temporaire du type :
`https://expat-malaga-xxxx.vercel.app`

**Chaque push sur `main`** déclenche automatiquement un nouveau déploiement.

---

## 4. Brancher le domaine `expat-malaga.com`

### Sur Vercel
1. Projet → onglet **Settings → Domains**.
2. Ajoutez `expat-malaga.com` **et** `www.expat-malaga.com`.
3. Vercel affiche les enregistrements DNS à créer.

### Sur votre registrar (OVH, Gandi, Namecheap, Google Domains…)
Ajoutez **un** des deux setups selon ce que Vercel vous indique :

**Option A — Nameservers Vercel (le plus simple)**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Option B — Enregistrements A / CNAME (si vous gardez votre DNS actuel)**
```
A      @       76.76.21.21
CNAME  www     cname.vercel-dns.com
```

Délai de propagation : **5 min à 24 h**. Vercel affiche ✅ dès que c'est actif. HTTPS est automatique (Let's Encrypt).

### Variable d'environnement recommandée

Dans Vercel → **Settings → Environment Variables** :
```
SITE_URL = https://expat-malaga.com
```
Utilisée par `next-sitemap` pour générer `sitemap.xml` avec les bonnes URLs.

---

## 5. Activer Lola, l'assistante chat du site

**Lola** est le chatbot intégré en bas à droite de chaque page. Elle répond aux questions des visiteurs (NIE, logement, budget, quartier…) et renvoie vers les bons articles du site.

Pour qu'elle fonctionne en prod, il faut lui donner une clé API Anthropic :

1. Récupérez une clé sur **[console.anthropic.com](https://console.anthropic.com/)** → *API Keys* → *Create Key*.
2. Sur Vercel → projet → **Settings → Environment Variables**, ajoutez :
   ```
   ANTHROPIC_API_KEY = sk-ant-...
   ```
   Cochez les 3 environnements (Production, Preview, Development).
3. Redéployez (onglet **Deployments → ⋯ → Redeploy**) pour que la nouvelle variable soit prise en compte.

Sans cette clé, la bulle Lola reste visible mais répond « Le chatbot n'est pas configuré ».

> **Coût** : le modèle utilisé est `claude-haiku-4-5`, le plus économique. Compter quelques centimes pour 100 conversations.

---

## 6. Activer Carmen, l'agent contenu hebdomadaire (optionnel)

**Carmen** (l'agent `content-writer`) publie un article Actualités chaque lundi via GitHub Actions.

1. GitHub → repo → **Settings → Secrets and variables → Actions → New repository secret**.
2. Ajoutez : `ANTHROPIC_API_KEY = sk-ant-...` (la même clé que pour Lola, ou une clé dédiée).
3. C'est tout — le workflow `.github/workflows/weekly-content.yml` tourne automatiquement chaque lundi 8h UTC et ouvre une PR pour relecture.

Pour tester tout de suite : onglet **Actions → Article Actualités hebdomadaire → Run workflow**.

---

## Qui est qui ? Les agents du projet

Trois agents Claude Code vous aident à maintenir le site. Ils vivent dans `.claude/agents/` :

| Prénom | Rôle | Quand l'invoquer |
|---|---|---|
| **Carmen** | Rédactrice Actualités | Chaque semaine, pour publier un article d'actu |
| **Diego** | Gardien technique | Avant chaque mise en prod, pour un audit complet du site |
| **Pablo** | Directeur artistique | Quand une image manque ou qu'un visuel jure (clin d'œil à Picasso, né à Málaga) |

Diego délègue automatiquement à Pablo tout ce qui relève du visuel.

---

## Commandes utiles après mise en ligne

| Action | Commande |
|---|---|
| Lancer le dev local | `start.bat` ou `npm run dev` |
| Build de production local | `npm run build && npm run start` |
| Re-télécharger les photos des villes | `npm run fetch-images:force` |
| Publier un nouvel article | Créer un `.mdx` dans `content/<categorie>/` puis `git push` |
| Vérifier les erreurs TypeScript | `npx tsc --noEmit` |

---

## En cas de souci

- **Build échoue sur Vercel** : ouvrez l'onglet **Deployments** → cliquez le déploiement rouge → lisez les logs. 90 % du temps c'est une erreur TypeScript visible en local via `npx tsc --noEmit`.
- **Domaine non vérifié après 24 h** : vérifiez les DNS avec `nslookup expat-malaga.com`. Si c'est encore votre ancien hébergeur, attendez encore ou contactez le support du registrar.
- **Article pas visible après push** : confirmez que le fichier est bien dans `content/<categorie>/<slug>.mdx`, que `category` dans le frontmatter correspond au dossier, et que le push a bien été suivi d'un build vert sur Vercel.
- **Photo de ville cassée** : relancez `npm run fetch-images:force` en local et commitez les fichiers dans `public/images/villes/`.

---

**Site live checklist**

- [ ] `start.bat` fonctionne en local, la home s'affiche sans erreur
- [ ] `npx tsc --noEmit` passe sans warning
- [ ] Repo poussé sur GitHub
- [ ] Projet importé sur Vercel, déploiement vert
- [ ] Domaine `expat-malaga.com` branché (HTTPS actif)
- [ ] `SITE_URL` configurée dans les env vars Vercel
- [ ] `ANTHROPIC_API_KEY` configurée dans les env vars Vercel (pour Lola)
- [ ] Lola répond bien depuis la page live (bulle en bas à droite)
- [ ] `ANTHROPIC_API_KEY` ajoutée dans les secrets GitHub (pour Carmen, l'agent hebdo)
- [ ] Un premier push test pour confirmer le déploiement automatique
