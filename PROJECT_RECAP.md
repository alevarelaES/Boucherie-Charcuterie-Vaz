# 🥩 Récapitulatif du Projet : Boucherie-Charcuterie Vaz

Ce document regroupe toutes les informations essentielles pour la gestion et le développement du projet.

## 🌍 Liens Importants
| Service | URL |
| :--- | :--- |
| **Site Web (Production)** | [https://boucherie-charcuterie-vaz.ch](https://boucherie-charcuterie-vaz.ch) |
| **Admin Sanity (CMS)** | [https://boucherie-vaz.sanity.studio](https://boucherie-vaz.sanity.studio) |
| **Console Sanity (Gestion)** | [https://www.sanity.io/manage](https://www.sanity.io/manage) |
| **Dashboard Vercel** | [https://vercel.com/dashboard](https://vercel.com/dashboard) |
| **Google Search Console** | [https://search.google.com/search-console](https://search.google.com/search-console) |

## 🛠 Architecture du Projet
- **Racine (`/`)** : Code du site web (React + Vite).
- **Dossier `/boucherie-charcuterie-vaz`** : Configuration du CMS Sanity (Schémas, Studio).

## 🔑 Configuration & Sécurité
> [!CAUTION]
> **Sécurité :** Ne mettez jamais vos clés API ou tokens dans ce fichier s'il est poussé sur GitHub.
> Ces informations doivent rester uniquement dans vos fichiers `.env` (exclus de GitHub).

### Fichiers à sauvegarder hors-ligne :
1. `.env` (à la racine) : Contient `VITE_SANITY_PROJECT_ID` et `VITE_SANITY_DATASET`.
2. `boucherie-charcuterie-vaz/.env` : Contient les informations pour le déploiement du Studio.

### Autorisations CORS (Dans Sanity Manage) :
Pour que le site puisse lire les données, ces origines doivent être autorisées (Credentials: Yes) :
- `http://localhost:5173` (Développement)
- `https://boucherie-charcuterie-vaz.ch` (Production)
- `https://www.boucherie-charcuterie-vaz.ch` (Production)
- `https://boucherie-charcuterie-vaz.vercel.app` (Vercel)

## 🚀 Commandes de Base

### Développement (Local)
- Lancer le site : `npm run dev` (à la racine)
- Lancer le CMS : `npm run dev` (dans le dossier `boucherie-charcuterie-vaz`)

### Déploiement (Mise en ligne)
- Déployer les changements du site : `npx vercel --prod`
- Déployer les changements du CMS : `npx sanity deploy` (dans le dossier `boucherie-charcuterie-vaz`)

## 📈 SEO & Google Analytics
- **Sitemap** : Généré automatiquement sur `/sitemap.xml`.
- **Google Analytics** : Le code est prêt dans `index.html`. Il faudra remplacer `G-XXXXXXXXXX` par l'ID final du client.
- **Favicon** : Utilise `/images/logo/logo-no-bg.png`.

---
*Projet réalisé en Janvier 2026.*
