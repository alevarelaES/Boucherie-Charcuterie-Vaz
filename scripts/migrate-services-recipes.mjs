import 'dotenv/config'
import { createClient } from '@sanity/client'

// Configuration Sanity
const client = createClient({
    projectId: 'czmblby4',
    dataset: 'production',
    apiVersion: '2024-01-20',
    token: process.env.SANITY_WRITE_TOKEN || '',
    useCdn: false,
})

const servicesData = [
    {
        _type: 'service',
        name: { fr: 'Buffets Froids', de: 'Kalte Buffets' },
        shortDescription: {
            fr: 'Une sélection de nos meilleures charcuteries artisanales, salades fraîches et terrines maison.',
            de: 'Eine Auswahl unserer besten handwerklichen Wurstwaren, frischen Salate und hausgemachten Terrinen.'
        },
        price: { fr: 'Dès 25.- / pers.', de: 'Ab 25.- / Pers.' },
        features: {
            fr: ['Planchettes de viande séchée', 'Pâtés croûte maison', 'Salades de saison'],
            de: ['Trockenfleischplatten', 'Hausgemachte Pasteten', 'Saisonale Salate']
        },
        order: 1
    },
    {
        _type: 'service',
        name: { fr: 'Banquet & Mariage', de: 'Bankett & Hochzeit' },
        shortDescription: {
            fr: 'Un service complet pour vos événements les plus importants avec découpe sur place possible.',
            de: 'Ein kompletter Service für Ihre wichtigsten Veranstaltungen mit Vor-Ort-Schneiden möglich.'
        },
        price: { fr: 'Sur devis', de: 'Auf Anfrage' },
        features: {
            fr: ['Viandes nobles au grill', 'Accompagnements variés', 'Service professionnel'],
            de: ['Edles Fleisch vom Grill', 'Vielfältige Beilagen', 'Professioneller Service']
        },
        order: 2
    },
    {
        _type: 'service',
        name: { fr: 'Aperitifs de Bureau', de: 'Büro-Aperitifs' },
        shortDescription: {
            fr: 'Des mini-portions et mignardises salées prêtes à déguster pour vos réunions.',
            de: 'Mini-Portionen und salzige Leckereien bereit zum Genießen für Ihre Meetings.'
        },
        price: { fr: 'Dès 15.- / pers.', de: 'Ab 15.- / Pers.' },
        features: {
            fr: ['Mini-burgers', 'Verrines gourmandes', 'Canapés assortis'],
            de: ['Mini-Burger', 'Gourmet-Gläser', 'Sortierte Canapés']
        },
        order: 3
    }
];

const recipesData = [
    {
        _type: 'recipe',
        title: 'Côte de Bœuf Maturée aux Herbes',
        category: 'beef',
        time: '45 min',
        servings: '2-4 pers.',
        difficulty: 'Medium',
        // Note: Images need manual upload or advanced asset handling. 
        // For now we create the document, user can attach images in Studio.
    },
    {
        _type: 'recipe',
        title: 'Poulet Fermier aux Morilles',
        category: 'poultry',
        time: '1h 15',
        servings: '4 pers.',
        difficulty: 'Advanced',
    },
    {
        _type: 'recipe',
        title: 'Carré d\'Agneau en Croûte d\'Herbes',
        category: 'lamb',
        time: '50 min',
        servings: '2 pers.',
        difficulty: 'Easy',
    }
];

async function migrate() {
    console.log('🚀 Démarrage de la migration Services & Recettes...\n')

    try {
        console.log('🍽️ Migration des services...')
        for (const service of servicesData) {
            const result = await client.create(service)
            console.log(`  ✓ Service créé: ${service.name.fr}`)
        }
        console.log('✅ Services migrés\n')

        console.log('👨‍🍳 Migration des recettes...')
        for (const recipe of recipesData) {
            const result = await client.create(recipe)
            console.log(`  ✓ Recette créée: ${recipe.title}`)
        }
        console.log('✅ Recettes migrées\n')

        console.log('🎉 Terminé ! N\'oubliez pas d\'ajouter les images dans le Studio Sanity.')

    } catch (error) {
        console.error('❌ Erreur:', error)
        process.exit(1)
    }
}

migrate()
