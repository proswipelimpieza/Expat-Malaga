# Photos des villes (héros d'article)

Ce dossier contient les images d'en-tête des articles de la catégorie **Villes**. Chaque article MDX référence son image via `heroImage: "/images/villes/<slug>.jpg"`.

## Fichiers attendus

Sauvegardez chaque photo partagée aux chemins suivants (le nom du fichier doit correspondre **exactement**) :

| Article MDX | Fichier à créer | Sujet |
|---|---|---|
| `vivre-a-benalmadena.mdx` | `benalmadena.jpg` | Castillo Bil-Bil sur la promenade au coucher du soleil |
| `vivre-a-torremolinos.mdx` | `torremolinos.jpg` | Baie de Torremolinos avec palmiers et montagnes |
| `vivre-a-marbella.mdx` | `marbella.jpg` | Plaza de la Iglesia de la Encarnación (Casco Antiguo) |
| `vivre-a-nerja.mdx` | `nerja.jpg` | Balcón de Europa vu du ciel |
| `vivre-a-fuengirola.mdx` | `fuengirola.jpg` | Paseo Marítimo au coucher du soleil |

## Recommandations techniques

- **Format** : JPG ou WebP (WebP préféré pour le poids).
- **Dimensions conseillées** : 1920 × 1080 (ou 16/9 équivalent), mais le site s'adapte à n'importe quel ratio.
- **Poids cible** : < 300 KB par image après compression. Utilisez [Squoosh](https://squoosh.app/) ou [TinyPNG](https://tinypng.com/) avant de les déposer ici.
- **Droits** : assurez-vous que chaque photo est libre de droits, sous licence Creative Commons compatible, ou votre propre cliché. Pour Wikimedia, l'attribution se fait via le champ `heroImageCredit` du frontmatter.

## Ajouter une nouvelle ville

1. Créer l'article MDX dans `content/villes/vivre-a-<slug>.mdx`.
2. Dans le frontmatter, ajouter :
   ```yaml
   heroImage: "/images/villes/<slug>.jpg"
   heroImageAlt: "Description courte de l'image"
   heroImageCredit: "Source ou auteur"  # optionnel
   ```
3. Déposer le fichier `<slug>.jpg` dans ce dossier.

## Fallback

Si l'image n'est pas trouvée (fichier manquant, URL cassée), le composant `SmartImage` bascule automatiquement sur un dégradé thématique aux couleurs du site (pas d'image cassée visible).
