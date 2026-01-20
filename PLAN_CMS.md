# Plan d'intégration CMS - Boucherie Charcuterie Vaz

## 🎯 Objectif
Remplacer le site WordPress actuel (https://boucherie-charcuterie-vaz.ch/) par une solution moderne permettant au client de modifier le contenu du site de manière autonome.

## 🏗️ Architecture Technique

### Stack Final
- **🌐 Domaine** : Infomaniak (boucherie-charcuterie-vaz.ch)
- **🚀 Hébergement/Déploiement** : Vercel
- **📝 CMS** : Sanity Studio
- **⚛️ Application** : React + Vite + TypeScript (déjà en place)
- **🎨 Styling** : Tailwind CSS (déjà en place)

### Flux de données
```
Client (Sanity Studio) → Sanity CDN → Application React (Vercel) → Utilisateurs finaux
                                         ↑
                                    DNS Infomaniak
```

---

## 📋 Étapes d'implémentation

### ✅ Étape 1 : Installation et configuration de Sanity (TERMINÉ)

#### [x] 1.1 Installation des dépendances Sanity
#### [x] 1.2 Création du projet Sanity Studio
#### [x] 1.3 Configuration des variables d'environnement
#### [x] 1.4 Création du client Sanity


---

### ✅ Étape 2 : Création des schémas Sanity

Définir les schémas pour :
- **Produits** (`product`)
- **Services** (`service`)
- **Recettes** (`recipe`)
- **Pages** (`page`)
- **Paramètres du site** (`siteSettings`)
- **Horaires d'ouverture** (`openingHours`)
- **Informations de contact** (`contactInfo`)

Chaque schéma doit inclure :
- Support multilingue (FR/DE)
- Images optimisées
- SEO (meta title, description, etc.)
- Slug pour les URLs

---

### ✅ Étape 3 : Migration du contenu statique vers Sanity

#### 3.1 Identifier le contenu à migrer
- Textes du Hero
- Produits (actuellement en dur dans `ProductsSection.tsx`)
- Services (actuellement en dur dans `ServicesSection.tsx`)
- Recettes (actuellement en dur dans `RecipesPage.tsx`)
- Informations de contact
- Horaires d'ouverture

#### 3.2 Importer le contenu existant
Créer des scripts de migration pour importer automatiquement le contenu actuel vers Sanity.

#### 3.3 Créer des hooks React personnalisés
- `useProducts()` - Récupérer les produits
- `useServices()` - Récupérer les services
- `useRecipes()` - Récupérer les recettes
- `useSiteSettings()` - Récupérer les paramètres du site

---

### ✅ Étape 4 : Refactorisation des composants React

Modifier les composants pour récupérer les données depuis Sanity au lieu de données statiques :

#### Composants à modifier :
- ✏️ `Hero.tsx` - Données dynamiques du hero
- ✏️ `ProductsSection.tsx` - Liste des produits
- ✏️ `ServicesSection.tsx` - Liste des services
- ✏️ `RecipesPage.tsx` - Liste des recettes
- ✏️ `ContactSection.tsx` - Informations de contact et horaires
- ✏️ `Header.tsx` - Logo et navigation dynamiques
- ✏️ `Footer.tsx` - Informations dynamiques

#### Gestion du chargement
- États de chargement (loading states)
- Gestion des erreurs
- Fallbacks pour les données manquantes
- Cache et optimisation des requêtes

---

### ✅ Étape 5 : Déploiement sur Vercel

#### 5.1 Configuration Vercel
```bash
npm install -g vercel
vercel login
vercel
```

#### 5.2 Variables d'environnement Vercel
Ajouter via le dashboard Vercel :
- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`
- `VITE_SANITY_API_VERSION`
- `VITE_SANITY_TOKEN` (si nécessaire)

#### 5.3 Configuration du domaine Vercel
- Obtenir les DNS records de Vercel
- Configurer dans Infomaniak (étape suivante)

#### 5.4 Configuration du build
Vérifier `vercel.json` et les paramètres de build :
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

---

### ✅ Étape 6 : Configuration DNS Infomaniak

#### 6.1 Configuration chez Infomaniak
1. Se connecter à l'espace client Infomaniak
2. Accéder à la gestion DNS du domaine `boucherie-charcuterie-vaz.ch`
3. Supprimer/désactiver les anciens enregistrements WordPress

#### 6.2 Ajouter les enregistrements Vercel
Ajouter les enregistrements DNS fournis par Vercel :
```
Type A    @ (ou domaine principal)    → IP Vercel (76.76.21.21)
Type CNAME www → cname.vercel-dns.com
```

#### 6.3 Configuration SSL
- Activer le SSL automatique de Vercel
- Vérifier le certificat HTTPS

#### 6.4 Vérification
- Attendre la propagation DNS (jusqu'à 48h)
- Tester l'accès via https://boucherie-charcuterie-vaz.ch

---

### ✅ Étape 7 : Déploiement de Sanity Studio

#### 7.1 Options de déploiement

**Option A : Sur Vercel (recommandé)**
Déployer le Studio sur un sous-domaine :
- `studio.boucherie-charcuterie-vaz.ch`
- Configurer un CNAME dans Infomaniak

**Option B : Sanity hosting**
```bash
cd studio
sanity deploy
```
URL : `https://your-project.sanity.studio`

#### 7.2 Configuration CORS
Dans le dashboard Sanity, ajouter les origines autorisées :
- `https://boucherie-charcuterie-vaz.ch`
- `https://www.boucherie-charcuterie-vaz.ch`
- `http://localhost:5173` (développement)

#### 7.3 Gestion des utilisateurs
- Créer un compte pour le client
- Configurer les permissions appropriées
- Préparer la documentation utilisateur

---

### ✅ Étape 8 : Optimisations et tests

#### 8.1 Performance
- ✅ Vérifier les temps de chargement
- ✅ Optimiser les images via Sanity Image API
- ✅ Mettre en cache les requêtes Sanity
- ✅ Utiliser ISR (Incremental Static Regeneration) si nécessaire

#### 8.2 SEO
- ✅ Vérifier le sitemap.xml
- ✅ Tester le robots.txt
- ✅ Valider les meta tags dynamiques
- ✅ Structured data (JSON-LD)

#### 8.3 Tests
- ✅ Tests de navigation
- ✅ Tests multilingues (FR/DE)
- ✅ Tests sur mobile
- ✅ Tests de compatibilité navigateur

#### 8.4 Scripts existants
Vérifier que les scripts fonctionnent avec le nouveau contenu :
- `npm run check:mobile`
- `npm run check:seo`
- `npm run check:i18n`

---

### ✅ Étape 9 : Formation du client

#### 9.1 Documentation
Créer un guide utilisateur pour :
- Se connecter au Sanity Studio
- Ajouter/modifier des produits
- Gérer les recettes
- Mettre à jour les horaires
- Modifier les images

#### 9.2 Formation pratique
- Session de démonstration
- Exercices pratiques
- Support post-lancement

---

### ✅ Étape 10 : Mise en production finale

#### 10.1 Checklist pré-lancement
- [ ] Toutes les données migrées
- [ ] DNS configuré et propagé
- [ ] SSL actif
- [ ] Studio accessible et fonctionnel
- [ ] Tests passés
- [ ] Backup du site WordPress (au cas où)

#### 10.2 Lancement
- Basculer définitivement vers le nouveau site
- Monitorer les métriques (erreurs, performances)
- Support réactif pendant 48h

#### 10.3 Post-lancement
- Configurer les webhooks Sanity → Vercel (redéploiement automatique)
- Configurer les alertes d'erreur (Sentry, etc.)
- Documentation technique finale

---

## 📦 Dépendances à installer

```json
{
  "dependencies": {
    "@sanity/client": "^6.x",
    "@sanity/image-url": "^1.x"
  },
  "devDependencies": {
    "@sanity/cli": "^3.x"
  }
}
```

---

## 🔗 Ressources utiles

- [Sanity Documentation](https://www.sanity.io/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Infomaniak DNS Guide](https://www.infomaniak.com/fr/support)
- [Sanity + React Guide](https://www.sanity.io/guides/sanity-and-react)

---

## ⚠️ Points d'attention

1. **Migration progressive** : Migrer le contenu section par section
2. **Backup** : Conserver le site WordPress actuel jusqu'à validation complète
3. **DNS TTL** : Réduire le TTL DNS avant la migration pour faciliter le rollback si nécessaire
4. **Cache** : Bien configurer le cache pour éviter les requêtes excessives à Sanity
5. **Coûts** : Vérifier les limites du plan gratuit Sanity (10k documents, 1GB assets)

---

## 📊 Timeline estimé

| Étape | Durée estimée |
|-------|---------------|
| 1. Installation Sanity | 1-2h |
| 2. Création des schémas | 3-4h |
| 3. Migration du contenu | 2-3h |
| 4. Refactorisation composants | 4-6h |
| 5. Déploiement Vercel | 1-2h |
| 6. Configuration DNS | 1h + propagation |
| 7. Déploiement Studio | 1-2h |
| 8. Optimisations et tests | 3-4h |
| 9. Formation client | 2-3h |
| 10. Mise en production | 2h + monitoring |
| **TOTAL** | **20-30h + propagation DNS** |

---

**Dernière mise à jour** : 20 janvier 2026
