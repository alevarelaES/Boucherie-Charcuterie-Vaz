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

const openingHoursData = {
    _type: 'openingHours',
    _id: 'openingHours', // Singleton ID

    // Lundi
    monday: { closed: false, morning: '07:00 - 12:00', afternoon: '13:30 - 18:00' },
    // Mardi
    tuesday: { closed: false, morning: '07:00 - 12:00', afternoon: '13:30 - 18:00' },
    // Mercredi
    wednesday: { closed: false, morning: '07:00 - 12:00', afternoon: null },
    // Jeudi
    thursday: { closed: false, morning: '08:00 - 12:00', afternoon: '13:30 - 18:00' },
    // Vendredi
    friday: { closed: false, morning: '07:00 - 12:00', afternoon: '13:30 - 18:00' },
    // Samedi
    saturday: { closed: false, morning: '07:00 - 13:00', afternoon: null },
    // Dimanche
    sunday: { closed: true },

    specialMessage: {
        fr: '',
        de: ''
    }
}

async function migrateOpeningHours() {
    console.log('🚀 Démarrage de la migration des horaires...\n')

    try {
        console.log('Creating openingHours document...')
        await client.createOrReplace(openingHoursData)
        console.log('✅ Horaires migrés avec succès ! (ID: openingHours)')

    } catch (error) {
        console.error('❌ Erreur lors de la migration:', error)
        process.exit(1)
    }
}

migrateOpeningHours()
