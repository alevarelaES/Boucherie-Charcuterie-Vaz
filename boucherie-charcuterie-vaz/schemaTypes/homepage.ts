import { defineField, defineType } from 'sanity'

export const homepage = defineType({
    name: 'homepage',
    title: 'Contenu Page d\'Accueil',
    type: 'document',
    icon: () => '🏠',
    fields: [
        // Section: Valeurs & Terroir
        defineField({
            name: 'valuesSection',
            title: 'Section Valeurs & Terroir',
            type: 'object',
            groups: [{ name: 'values', title: 'Valeurs' }],
            fields: [
                defineField({
                    name: 'badge',
                    title: 'Badge (ex: Notre histoire)',
                    type: 'object', // multilingual
                    fields: [
                        { name: 'fr', type: 'string', title: 'Français' },
                        { name: 'de', type: 'string', title: 'Deutsch' },
                    ]
                }),
                defineField({
                    name: 'title',
                    title: 'Titre Principal',
                    type: 'object',
                    fields: [
                        { name: 'fr', type: 'string', title: 'Français' },
                        { name: 'de', type: 'string', title: 'Deutsch' },
                    ]
                }),
                defineField({
                    name: 'intro',
                    title: 'Texte d\'Introduction',
                    type: 'object',
                    fields: [
                        { name: 'fr', type: 'text', title: 'Français' },
                        { name: 'de', type: 'text', title: 'Deutsch' },
                    ]
                }),
                defineField({
                    name: 'image',
                    title: 'Image Principale',
                    type: 'image',
                    options: { hotspot: true }
                }),
                defineField({
                    name: 'promiseTitle',
                    title: 'Titre "Notre Promesse"',
                    type: 'object',
                    fields: [
                        { name: 'fr', type: 'string', title: 'Français' },
                        { name: 'de', type: 'string', title: 'Deutsch' },
                    ]
                }),
                defineField({
                    name: 'promiseText',
                    title: 'Texte "Notre Promesse"',
                    type: 'object',
                    fields: [
                        { name: 'fr', type: 'text', title: 'Français' },
                        { name: 'de', type: 'text', title: 'Deutsch' },
                    ]
                }),
                defineField({
                    name: 'valuesList',
                    title: 'Liste des valeurs (Vous trouverez chez nous)',
                    type: 'object',
                    fields: [
                        {
                            name: 'fr',
                            type: 'array',
                            title: 'Français',
                            of: [{ type: 'string' }]
                        },
                        {
                            name: 'de',
                            type: 'array',
                            title: 'Deutsch',
                            of: [{ type: 'string' }]
                        },
                    ]
                }),
                defineField({
                    name: 'engagementText',
                    title: 'Texte d\'Engagement (Bas de section)',
                    type: 'object',
                    fields: [
                        { name: 'fr', type: 'text', title: 'Français' },
                        { name: 'de', type: 'text', title: 'Deutsch' },
                    ]
                }),
            ]
        }),

        // Section: Produits
        defineField({
            name: 'productsSection',
            title: 'Section Produits',
            type: 'object',
            groups: [{ name: 'products', title: 'Produits' }],
            fields: [
                defineField({
                    name: 'title',
                    title: 'Titre',
                    type: 'object',
                    fields: [
                        { name: 'fr', type: 'string', title: 'Français' },
                        { name: 'de', type: 'string', title: 'Deutsch' },
                    ]
                }),
                defineField({
                    name: 'description',
                    title: 'Description',
                    type: 'object',
                    fields: [
                        { name: 'fr', type: 'text', title: 'Français' },
                        { name: 'de', type: 'text', title: 'Deutsch' },
                    ]
                }),
            ]
        }),

        // Section: Contact
        defineField({
            name: 'contactSection',
            title: 'Section Contact',
            type: 'object',
            groups: [{ name: 'contact', title: 'Contact' }],
            fields: [
                defineField({
                    name: 'title',
                    title: 'Titre',
                    type: 'object',
                    fields: [
                        { name: 'fr', type: 'string', title: 'Français' },
                        { name: 'de', type: 'string', title: 'Deutsch' },
                    ]
                }),
                defineField({
                    name: 'subtitle',
                    title: 'Sous-titre (Badge)',
                    type: 'object',
                    fields: [
                        { name: 'fr', type: 'string', title: 'Français' },
                        { name: 'de', type: 'string', title: 'Deutsch' },
                    ]
                }),
            ]
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Contenu Page d\'Accueil',
                subtitle: 'Valeurs, Textes divers'
            }
        }
    }
})
