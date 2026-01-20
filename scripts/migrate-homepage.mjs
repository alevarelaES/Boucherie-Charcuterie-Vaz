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

const homepageData = {
    _type: 'homepage',
    _id: 'homepage', // Singleton ID

    // Valeurs & Terroir
    valuesSection: {
        badge: { fr: 'Notre histoire', de: 'Unsere Geschichte' },
        title: { fr: 'Valeurs & Terroir', de: 'Werte & Terroir' },
        intro: {
            fr: "La Boucherie Vaz est née en 2025 avec une idée claire : prêcher avant tout la qualité. Chaque viande que nous proposons est issue d'un savoir-faire artisanal et choisie avec exigence.",
            de: "Die Metzgerei Vaz wurde 2025 mit einer klaren Idee gegründet: Qualität über alles. Jedes Fleisch, das wir anbieten, stammt aus handwerklichem Können und wurde mit Sorgfalt ausgewählt."
        },
        promiseTitle: { fr: 'Notre Promesse', de: 'Unser Versprechen' },
        promiseText: {
            fr: "Située au cœur de la tradition bouchère, notre boutique est votre nouvelle adresse gourmande à Vallorbe. Nous sélectionnons nos viandes avec le plus grand soin afin de garantir fraîcheur, goût et tendreté.",
            de: "Im Herzen der Metzgertradition gelegen, ist unser Geschäft Ihre neue Gourmet-Adresse in Vallorbe. Wir wählen unser Fleisch mit größter Sorgfalt aus, um Frische, Geschmack und Zartheit zu garantieren."
        },
        valuesList: {
            fr: [
                'Poulet tendre et savoureux',
                'Génisse maturée raffinée',
                'Agneau aux saveurs délicates',
                'Porc de qualité supérieure',
                'Viande de cheval riche en goût',
                'Viandes sur commande'
            ],
            de: [
                'Zartes und schmackhaftes Hähnchen',
                'Raffinierte gereifte Färse',
                'Lamm mit feinen Aromen',
                'Schweinefleisch von höchster Qualität',
                'Pferdefleisch reich an Geschmack',
                'Fleisch auf Bestellung'
            ]
        },
        engagementText: {
            fr: "Plus qu'une simple boucherie, nous sommes un lieu de confiance, où l'on vient autant pour la qualité exceptionnelle de nos produits que pour partager notre passion de la viande.",
            de: "Mehr als nur eine Metzgerei, sind wir ein Ort des Vertrauens, an den man ebenso wegen der außergewöhnlichen Qualität unserer Produkte kommt wie um unsere Leidenschaft für Fleisch zu teilen."
        }
    },

    // Produits
    productsSection: {
        title: { fr: 'Produits phares', de: 'Flaggschiff-Produkte' },
        description: {
            fr: 'Découvrez des viandes fraîches et savoureuses, préparées chaque jour pour garantir goût et qualité.',
            de: 'Entdecken Sie frisches und schmackhaftes Fleisch, das jeden Tag zubereitet wird, um Geschmack und Qualität zu garantieren.'
        }
    },

    // Contact
    contactSection: {
        subtitle: { fr: 'Parlons ensemble', de: 'Lassen Sie uns reden' },
        title: { fr: 'Contactez-nous', de: 'Kontaktieren Sie uns' }
    }
}

async function migrateHomepage() {
    console.log('🚀 Démarrage de la migration de la page d\'accueil...\n')

    try {
        console.log('Creates homepage document...')
        await client.createOrReplace(homepageData)
        console.log('✅ Page d\'accueil migrée avec succès ! (ID: homepage)')

    } catch (error) {
        console.error('❌ Erreur lors de la migration:', error)
        process.exit(1)
    }
}

migrateHomepage()
