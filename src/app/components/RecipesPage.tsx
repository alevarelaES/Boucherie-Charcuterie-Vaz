import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, Clock, Users, Utensils, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { OptimizedImage } from './OptimizedImage';
import { Footer } from './Footer';
import { MetaSEO } from './MetaSEO';
import { Breadcrumbs } from './ui/Breadcrumbs';

interface Recipe {
    id: string;
    title: string;
    category: string;
    time: string;
    servings: string;
    difficulty: string;
    image: string;
}

export function RecipesPage() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', label: 'Toutes' },
        { id: 'beef', label: 'Bœuf' },
        { id: 'poultry', label: 'Volaille' },
        { id: 'pork', label: 'Porc' },
        { id: 'lamb', label: 'Agneau' }
    ];

    // Mock data for demo
    const recipes: Recipe[] = [
        {
            id: '1',
            title: 'Côte de Bœuf Maturée aux Herbes',
            category: 'beef',
            time: '45 min',
            servings: '2-4 pers.',
            difficulty: 'Moyen',
            image: '/images/products/beef.png?v=2'
        },
        {
            id: '2',
            title: 'Poulet Fermier aux Morilles',
            category: 'poultry',
            time: '1h 15',
            servings: '4 pers.',
            difficulty: 'Avancé',
            image: '/images/products/chicken.png?v=2'
        },
        {
            id: '3',
            title: 'Carré d\'Agneau en Croûte d\'Herbes',
            category: 'lamb',
            time: '50 min',
            servings: '2 pers.',
            difficulty: 'Facile',
            image: '/images/products/lamb.png?v=2'
        }
    ];

    const filteredRecipes = recipes.filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'all' || recipe.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-background pt-32"
        >
            <MetaSEO
                title="Recettes & Astuces"
                description="Découvrez les recettes exclusives de la Boucherie Vaz : bœuf maturé, agneau en croûte et conseils de préparation pour des repas d'exception."
                schema={{
                    "@context": "https://schema.org",
                    "@type": "ItemList",
                    "itemListElement": recipes.map((r, i) => ({
                        "@type": "ListItem",
                        "position": i + 1,
                        "item": {
                            "@type": "Recipe",
                            "name": r.title,
                            "image": `https://boucherie-charcuterie-vaz.ch${r.image}`,
                            "author": {
                                "@type": "Person",
                                "name": "Boucherie Vaz"
                            },
                            "cookTime": r.time.includes('h') ? `PT${r.time.replace('h', 'H').replace(' ', 'M')}` : `PT${r.time.replace(' min', 'M')}`,
                            "recipeYield": r.servings,
                            "recipeCategory": r.category
                        }
                    }))
                }}
            />
            <main className="max-w-7xl mx-auto px-6 pb-20">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="flex-grow">
                        <Breadcrumbs items={[{ label: 'Recettes' }]} />
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all mb-8 group"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            Retour
                        </button>
                        <h1 className="text-5xl md:text-8xl font-serif font-bold leading-none">
                            Recettes & <br />
                            <span className="text-gold italic">Astuces de Chef</span>
                        </h1>
                    </div>

                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Rechercher une recette..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans font-medium"
                        />
                    </div>
                </div>

                {/* Categories Bar */}
                <div className="flex flex-wrap gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-2 rounded-full font-sans font-bold text-sm transition-all ${activeCategory === cat.id
                                ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Recipes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredRecipes.map((recipe, i) => (
                        <motion.div
                            key={recipe.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-primary/10">
                                <OptimizedImage
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    priority={i < 2}
                                />

                                {/* Overlay Blur for bottom text visibility */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                {/* Badge Category */}
                                <span className="absolute top-6 left-6 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-widest border border-white/20">
                                    {recipe.category === 'beef' ? 'Bœuf' : recipe.category === 'poultry' ? 'Volaille' : recipe.category}
                                </span>

                                {/* Content */}
                                <div className="absolute bottom-10 left-8 right-8 text-white">
                                    <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 leading-tight group-hover:text-gold transition-colors">
                                        {recipe.title}
                                    </h3>

                                    <div className="flex items-center gap-6 text-xs font-sans font-bold opacity-80">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-gold" />
                                            {recipe.time}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-gold" />
                                            {recipe.servings}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Utensils className="w-4 h-4 text-gold" />
                                            {recipe.difficulty}
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Reveal Chevron */}
                                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 shadow-xl">
                                    <ChevronLeft className="w-6 h-6 rotate-180" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredRecipes.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-2xl font-serif text-muted-foreground">Aucune recette trouvée pour votre recherche.</p>
                    </div>
                )}
            </main>
            <Footer />
        </motion.div>
    );
}
