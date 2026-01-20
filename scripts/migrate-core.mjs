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

const siteSettings = {
    _type: 'siteSettings',
    _id: 'siteSettings',
    siteName: {
        fr: 'Boucherie Charcuterie Vaz',
        de: 'Metzgerei Charcuterie Vaz'
    },
    contact: {
        phone: '+41 21 843 11 09',
        email: 'boucherievaz@gmail.com',
        address: {
            street: 'Rue du faubourg 5',
            city: 'Vallorbe',
            postalCode: '1337',
            country: 'Suisse'
        }
    },
    socialMedia: {
        facebook: 'https://www.facebook.com/people/Boucherie-Charcuterie-Vaz/61579169247905/',
        instagram: 'https://www.instagram.com/boucherievaz/'
    },
    footer: {
        text: {
            fr: 'Excellence artisanale depuis des générations. Viandes fraîches et charcuterie de qualité à Vallorbe.',
            de: 'Handwerkliche Exzellenz seit Generationen. Frisches Fleisch und hochwertige Wurstwaren in Vallorbe.'
        },
        copyright: '© 2024 Boucherie Charcuterie Vaz. Tous droits réservés.'
    }
}

const hero = {
    _type: 'hero',
    _id: 'hero',
    titleMain: {
        fr: 'La boucherie',
        de: 'Die Metzgerei'
    },
    titleHighlight: {
        fr: 'proche de vous',
        de: 'in Ihrer Nähe'
    },
    description: {
        fr: 'Excellence artisanale et viandes d\'exception à',
        de: 'Handwerkliche Exzellenz und ausgezeichnetes Fleisch in'
    },
    highlightedCity: 'Vallorbe',
    cta1: {
        text: {
            fr: 'Découvrir nos produits',
            de: 'Entdecken Sie unsere Produkte'
        },
        link: '#produits'
    },
    cta2: {
        text: {
            fr: 'Nous contacter',
            de: 'Kontakt aufnehmen'
        },
        link: '#contact'
    },
    scrollText: {
        fr: 'Découvrir',
        de: 'Entdecken'
    }
}

async function migrate() {
    console.log('🚀 Migration des données principales (Settings & Hero)...')

    try {
        await client.createOrReplace(siteSettings)
        console.log('✅ Site Settings migrés')

        await client.createOrReplace(hero)
        console.log('✅ Hero Section migrée')

    } catch (error) {
        console.error('❌ Erreur:', error)
        process.exit(1)
    }
}

migrate()
