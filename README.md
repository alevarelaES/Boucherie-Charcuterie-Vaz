
  # Boucherie-Charcuterie Vaz — Site vitrine (Vite + React + Tailwind)

Ce projet est la refonte du site vitrine pour remplacer l'installation WordPress existante. Il utilise Vite, React et Tailwind CSS (v4) avec une structure simple, des bonnes pratiques SEO et accessibilité.

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+ installé
- npm ou yarn

### Installation

1. **Installer les dépendances:**
   ```bash
   npm install
   ```

2. **Lancer le serveur de développement:**
   ```bash
   npm run dev
   ```
   Le site sera accessible sur `http://localhost:5173/`

3. **Construire le site pour la production:**
   ```bash
   npm run build
   npm run preview # pour vérifier le build localement
   ```
   Les fichiers optimisés sont dans `dist/`.

## 📁 Structure du projet

```
├── public/
│   ├── images/          # Toutes les images (logo, produits)
│   ├── favicon.svg      # Favicon du site
│   ├── robots.txt       # Instructions pour les moteurs de recherche
│   └── sitemap.xml      # Plan du site pour le SEO
├── src/
│   ├── app/
│   │   ├── components/  # Tous les composants React
│   │   └── App.tsx      # Composant principal
│   ├── styles/          # Fichiers CSS et thème
│   └── main.tsx         # Point d'entrée React
├── index.html           # HTML principal avec SEO
└── vite.config.ts       # Configuration Vite
```

## 🎨 Images

Les images sont stockées dans `public/images/` :
- **Logo:** `public/images/logo/Boucherie Charcuterie Vaz sans fond.png`
- **Photos produits:** Toutes les vraies photos de la boucherie
- Voir `public/images/README.md` pour la liste complète

## 🔍 SEO et accessibilité

✅ **Déjà configuré:**
- Métadonnées complètes (titre, description, Open Graph, Twitter Card)
- JSON-LD LocalBusiness pour Google Rich Results
- Fichiers SEO: `robots.txt`, `sitemap.xml`, `site.webmanifest`
- Formulaire de contact avec validation
- Images optimisées avec lazy loading
- Structure sémantique HTML5

## 🚢 Déploiement sur Infomaniak

### Méthode 1: Via FTP
1. Générez le build de production:
   ```bash
   npm run build
   ```

2. Connectez-vous via FTP à votre hébergement Infomaniak
   - Hôte: `ftp.votredomaine.ch`
   - Utilisateur/mot de passe: fournis par Infomaniak

3. Uploadez **tout le contenu** du dossier `dist/` vers le répertoire `web/` de votre hébergement
   - ⚠️ Attention: uploadez le **contenu** de `dist/`, pas le dossier lui-même
   - Vérifiez que `index.html` est à la racine de `web/`

4. Vérifications:
   - SSL actif (https://)
   - Toutes les images s'affichent correctement
   - Les liens de navigation fonctionnent

### Méthode 2: Via le Manager Infomaniak
1. Build: `npm run build`
2. Connectez-vous au Manager Infomaniak > Hébergement Web
3. Utilisez le gestionnaire de fichiers pour uploader le contenu de `dist/`

### Notes importantes:
- Le site est monopage (SPA) avec navigation par ancres, pas besoin de configuration `.htaccess` spéciale
- Les images dans `public/` sont automatiquement copiées dans `dist/` lors du build
- Pensez à vider le cache de votre navigateur après déploiement

## 🛠️ Configuration

- **Tailwind CSS v4:** Configuration dans `src/styles/tailwind.css`
- **Thème personnalisé:** `src/styles/theme.css` (couleurs, fonts)
- **Fonts:** Playfair Display (serif) + Montserrat (sans-serif)
- **Couleurs principales:**
  - Primary: `#8B1538` (bordeaux)
  - Background: `#FAF7F2` (crème)

## 📝 Maintenance

### Modifier les contenus
Les textes et informations se trouvent dans `src/app/components/`:
- `Hero.tsx` - Page d'accueil
- `MetiersSection.tsx` - Métiers
- `ProduitsSection.tsx` - Produits (modifier le tableau `produits`)
- `ValeursSection.tsx` - À propos
- `ContactSection.tsx` - Formulaire et horaires
- `Footer.tsx` - Pied de page

### Mettre à jour les informations d'entreprise
1. Modifier `index.html` - Section JSON-LD (horaires, adresse, téléphone)
2. Modifier les composants concernés
3. Mettre à jour `sitemap.xml` si nécessaire

## 🐛 Résolution de problèmes

### PowerShell bloque l'exécution de npm
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### Les images ne s'affichent pas
- Vérifiez que les fichiers sont dans `public/images/`
- Vérifiez que les chemins commencent par `/images/` (pas `/Images/`)
- Reconstruisez avec `npm run build`

### Erreurs de compilation
```bash
npm run build
```
Si erreurs, vérifiez le terminal pour les détails

## 📞 Support

Pour toute question sur le code ou le déploiement, consultez:
- [Documentation Vite](https://vitejs.dev/)
- [Documentation React](https://react.dev/)
- [Support Infomaniak](https://www.infomaniak.com/fr/support)


  