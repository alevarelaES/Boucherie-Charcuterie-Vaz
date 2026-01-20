import 'dotenv/config'
import { createClient } from '@sanity/client'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

// Configuration Sanity
const client = createClient({
    projectId: 'czmblby4',
    dataset: 'production',
    apiVersion: '2024-01-20',
    token: process.env.SANITY_WRITE_TOKEN || '', // Token à ajouter
    useCdn: false,
})

// Données de migration extraites du site actuel
const migrationData = {
    siteSettings: {
        _type: 'siteSettings',
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
        },
        seo: {
            metaTitle: 'Boucherie Charcuterie Vaz | Vallorbe | Viandes de Qualité',
            metaDescription: 'Découvrez notre boucherie familiale à Vallorbe. Viandes fraîches, charcuterie artisanale et service traiteur. Excellence et savoir-faire depuis des générations.'
        }
    },

    hero: {
        _type: 'hero',
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
    },

    products: [
        {
            _type: 'product',
            name: {
                fr: 'Entrecôte Maturée',
                de: 'Gereiftes Entrecote'
            },
            slug: {
                _type: 'slug',
                current: 'entrecote-maturee'
            },
            description: {
                fr: 'Maturé trois semaines sur l\'os.',
                de: 'Drei Wochen lang am Knochen gereift.'
            },
            tag: 'premium',
            availability: 'in_stock',
            order: 1
        },
        {
            _type: 'product',
            name: {
                fr: 'Fondue Chinoise',
                de: 'Chinesisches Fondue'
            },
            slug: {
                _type: 'slug',
                current: 'fondue-chinoise'
            },
            description: {
                fr: 'Fondue chinoise de bœuf.',
                de: 'Rindfleisch Fondue Chinoise.'
            },
            tag: 'specialty',
            availability: 'in_stock',
            order: 2
        },
        {
            _type: 'product',
            name: {
                fr: 'Terrine du Chef',
                de: 'Chefterrine'
            },
            slug: {
                _type: 'slug',
                current: 'terrine-du-chef'
            },
            description: {
                fr: 'Une création artisanale savoureuse.',
                de: 'Eine köstliche handwerkliche Kreation.'
            },
            tag: 'premium',
            availability: 'in_stock',
            order: 3
        },
        {
            _type: 'product',
            name: {
                fr: 'Lard de Jambon',
                de: 'Schinkens peck'
            },
            slug: {
                _type: 'slug',
                current: 'lard-de-jambon'
            },
            description: {
                fr: 'Notre lard de jambon sélectionné.',
                de: 'Unser ausgewählter Schinkenspeck.'
            },
            tag: 'specialty',
            availability: 'in_stock',
            order: 4
        },
        {
            _type: 'product',
            name: {
                fr: 'Terrine au Pruneaux',
                de: 'Pflaumen terrine'
            },
            slug: {
                _type: 'slug',
                current: 'terrine-au-pruneaux'
            },
            description: {
                fr: 'Fabrication maison.',
                de: 'Hausgemacht.'
            },
            tag: 'premium',
            availability: 'in_stock',
            order: 5
        },
        {
            _type: 'product',
            name: {
                fr: 'Plat Charcuterie',
                de: 'Aufschnittplatte'
            },
            slug: {
                _type: 'slug',
                current: 'plat-charcuterie'
            },
            description: {
                fr: 'Pour votre apéro.',
                de: 'Für Ihren Aperitif.'
            },
            tag: 'homemade',
            availability: 'in_stock',
            order: 6
        }
    ],

    openingHours: {
        _type: 'openingHours',
        monday: {
            closed: true,
            morning: '',
            afternoon: ''
        },
        tuesday: {
            closed: false,
            morning: '08:00 - 12:00',
            afternoon: '14:00 - 18:30'
        },
        wednesday: {
            closed: false,
            morning: '08:00 - 12:00',
            afternoon: '14:00 - 18:30'
        },
        thursday: {
            closed: false,
            morning: '08:00 - 12:00',
            afternoon: '14:00 - 18:30'
        },
        friday: {
            closed: false,
            morning: '08:00 - 12:00',
            afternoon: '14:00 - 18:30'
        },
        saturday: {
            closed: false,
            morning: '07:30 - 16:00',
            afternoon: ''
        },
        sunday: {
            closed: true,
            morning: '',
            afternoon: ''
        },
        specialMessage: {
            fr: '',
            de: ''
        }
    }
}

async function migrate() {
    console.log('🚀 Démarrage de la migration...\n')

    try {
        // 1. Migrer les paramètres du site (singleton)
        console.log('📝 Migration des paramètres du site...')
        await client.createOrReplace({
            ...migrationData.siteSettings,
            _id: 'siteSettings'
        })
        console.log('✅ Paramètres du site migrés\n')

        // 2. Migrer la section Hero (singleton)
        console.log('🎯 Migration de la section Hero...')
        await client.createOrReplace({
            ...migrationData.hero,
            _id: 'hero'
        })
        console.log('✅ Section Hero migrée\n')

        // 3. Migrer les horaires (singleton)
        console.log('🕐 Migration des horaires...')
        await client.createOrReplace({
            ...migrationData.openingHours,
            _id: 'openingHours'
        })
        console.log('✅ Horaires migrés\n')

        // 4. Migrer les produits
        console.log('🥩 Migration des produits...')
        for (const product of migrationData.products) {
            const result = await client.create(product)
            console.log(`  ✓ ${product.name.fr} créé (ID: ${result._id})`)
        }
        console.log('✅ Tous les produits migrés\n')

        console.log('🎉 Migration terminée avec succès!')
        console.log('\n📋 Prochaines étapes:')
        console.log('  1. Ajoutez les images manuellement dans le Studio')
        console.log('  2. Complétez les informations manquantes')
        console.log('  3. Créez les services et recettes')

    } catch (error) {
        console.error('❌ Erreur lors de la migration:', error)
        process.exit(1)
    }
}

// Exécution
migrate()
