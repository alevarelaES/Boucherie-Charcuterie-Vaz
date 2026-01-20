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
        name: { fr: 'Buffets Froids', de: 'Kaltes Buffet' },
        shortDescription: {
            fr: 'Une sélection de nos meilleures charcuteries artisanales, salades fraîches et terrines maison.',
            de: 'Eine Auswahl unserer besten handwerklichen Wurstwaren, frischen Salate und hausgemachten Terrinen.'
        },
        price: { fr: 'Dès 25.- / pers.', de: 'Ab 25.- / Pers.' },
        features: {
            fr: ['Planchettes de viande séchée', 'Pâtés croûte maison', 'Salades de saison'],
            de: ['Trockenfleischplatten', 'Hausgemachte Pasteten', 'Saisonale Salate']
        },
        order: 1,
        icon: 'UtensilsCrossed'
    },
    {
        name: { fr: 'Banquet & Mariage', de: 'Bankett & Hochzeit' },
        shortDescription: {
            fr: 'Un service complet pour vos événements les plus importants avec découpe sur place possible.',
            de: 'Ein kompletter Service für Ihre wichtigsten Veranstaltungen mit möglichem Zuschnitt vor Ort.'
        },
        price: { fr: 'Sur devis', de: 'Auf Anfrage' },
        features: {
            fr: ['Viandes nobles au grill', 'Accompagnements variés', 'Service professionnel'],
            de: ['Edles Fleisch vom Grill', 'Vielfältige Beilagen', 'Professioneller Service']
        },
        order: 2,
        icon: 'ChefHat'
    },
    {
        name: { fr: 'Aperitifs de Bureau', de: 'Büro-Aperitifs' },
        shortDescription: {
            fr: 'Des mini-portions et mignardises salées prêtes à déguster pour vos réunions.',
            de: 'Salzige Mini-Portionen und Leckereien, bereit zum Genießen für Ihre Meetings.'
        },
        price: { fr: 'Dès 15.- / pers.', de: 'Ab 15.- / Pers.' },
        features: {
            fr: ['Mini-burgers', 'Verrines gourmandes', 'Canapés assortis'],
            de: ['Mini-Burger', 'Gourmet-Gläser', 'Gemischte Canapés']
        },
        order: 3,
        icon: 'Fingerprint' // Placeholder icon
    }
];

async function migrateServices() {
    console.log('🚀 Démarrage de la migration des services...\n')

    try {
        for (const service of servicesData) {
            // Check if service already exists to avoid duplicates (based on name.fr)
            const existing = await client.fetch(`*[_type == "service" && name.fr == $name][0]`, { name: service.name.fr });

            if (existing) {
                console.log(`⚠️ Le service "${service.name.fr}" existe déjà (ID: ${existing._id}). Ignoré.`)
                continue;
            }

            const doc = {
                _type: 'service',
                name: service.name,
                slug: { _type: 'slug', current: service.name.fr.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, 'et') },
                shortDescription: service.shortDescription,
                price: service.price,
                features: service.features,
                order: service.order,
                icon: service.icon
            }

            const result = await client.create(doc)
            console.log(`  ✓ ${service.name.fr} créé (ID: ${result._id})`)
        }
        console.log('\n✅ Migration des services terminée !')

    } catch (error) {
        console.error('❌ Erreur lors de la migration:', error)
        process.exit(1)
    }
}

migrateServices()
