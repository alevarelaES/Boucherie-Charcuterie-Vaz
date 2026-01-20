import { defineField, defineType } from 'sanity'

export const service = defineType({
    name: 'service',
    title: 'Service Traiteur',
    type: 'document',
    icon: () => '🍽️',
    fields: [
        defineField({
            name: 'name',
            title: 'Nom du Service',
            type: 'object',
            validation: (Rule) => Rule.required(),
            fields: [
                { name: 'fr', type: 'string', title: 'Français' },
                { name: 'de', type: 'string', title: 'Deutsch' },
            ]
        }),
        defineField({
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: {
                source: 'name.fr',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'shortDescription',
            title: 'Description Courte',
            type: 'object',
            description: 'Affichée sur la carte du service',
            fields: [
                { name: 'fr', type: 'text', title: 'Français', validation: (Rule) => Rule.max(150) },
                { name: 'de', type: 'text', title: 'Deutsch', validation: (Rule) => Rule.max(150) },
            ]
        }),
        defineField({
            name: 'longDescription',
            title: 'Description Longue',
            type: 'object',
            description: 'Description détaillée avec formatage',
            fields: [
                { name: 'fr', type: 'array', of: [{ type: 'block' }], title: 'Français' },
                { name: 'de', type: 'array', of: [{ type: 'block' }], title: 'Deutsch' },
            ]
        }),
        defineField({
            name: 'price',
            title: 'Prix / Tarif',
            type: 'object',
            fields: [
                { name: 'fr', type: 'string', title: 'Français' },
                { name: 'de', type: 'string', title: 'Deutsch' },
            ]
        }),
        defineField({
            name: 'features',
            title: 'Caractéristiques / Inclus',
            type: 'object',
            fields: [
                {
                    name: 'fr',
                    title: 'Français',
                    type: 'array',
                    of: [{ type: 'string' }]
                },
                {
                    name: 'de',
                    title: 'Deutsch',
                    type: 'array',
                    of: [{ type: 'string' }]
                },
            ]
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Texte alternatif',
                }
            ]
        }),
        defineField({
            name: 'icon',
            title: 'Icône',
            type: 'string',
            description: 'Nom de l\'icône (ex: UtensilsCrossed, CheckCircle2, etc.)',
            placeholder: 'CheckCircle2'
        }),
        defineField({
            name: 'cta',
            title: 'Bouton d\'Action',
            type: 'object',
            fields: [
                {
                    name: 'text',
                    title: 'Texte du bouton',
                    type: 'object',
                    fields: [
                        { name: 'fr', type: 'string', title: 'Français' },
                        { name: 'de', type: 'string', title: 'Deutsch' },
                    ]
                },
                {
                    name: 'link',
                    title: 'Lien',
                    type: 'string',
                }
            ]
        }),
        defineField({
            name: 'order',
            title: 'Ordre d\'affichage',
            type: 'number',
            initialValue: 0
        }),
    ],
    preview: {
        select: {
            title: 'name.fr',
            media: 'image'
        }
    },
    orderings: [
        {
            title: 'Ordre personnalisé',
            name: 'customOrder',
            by: [{ field: 'order', direction: 'asc' }]
        }
    ]
})
