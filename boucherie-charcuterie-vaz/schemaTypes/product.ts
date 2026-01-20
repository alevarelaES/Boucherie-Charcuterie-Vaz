import { defineField, defineType } from 'sanity'

export const product = defineType({
    name: 'product',
    title: 'Viandes & Produits',
    type: 'document',
    icon: () => '🥩',
    fields: [
        defineField({
            name: 'name',
            title: 'Nom du Produit',
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
            name: 'description',
            title: 'Description',
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
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Texte alternatif',
                }
            ],
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'gallery',
            title: 'Galerie d\'Images',
            type: 'array',
            of: [{
                type: 'image',
                options: { hotspot: true },
                fields: [
                    { name: 'alt', type: 'string', title: 'Texte alternatif' }
                ]
            }]
        }),
        defineField({
            name: 'tag',
            title: 'Catégorie / Tag',
            type: 'string',
            options: {
                list: [
                    { title: 'Premium', value: 'premium' },
                    { title: 'Spécialité', value: 'specialty' },
                    { title: 'Fait Maison', value: 'homemade' },
                    { title: 'Nouveauté', value: 'new' },
                ]
            }
        }),
        defineField({
            name: 'price',
            title: 'Prix (optionnel)',
            type: 'number',
            description: 'Prix en CHF'
        }),
        defineField({
            name: 'availability',
            title: 'Disponibilité',
            type: 'string',
            options: {
                list: [
                    { title: 'En stock', value: 'in_stock' },
                    { title: 'Sur commande', value: 'on_order' },
                    { title: 'Rupture', value: 'out_of_stock' },
                ]
            },
            initialValue: 'in_stock'
        }),
        defineField({
            name: 'order',
            title: 'Ordre d\'affichage',
            type: 'number',
            description: 'Les produits seront triés par ordre croissant',
            initialValue: 0
        }),
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: true
            },
            fields: [
                {
                    name: 'metaTitle',
                    title: 'Titre Meta',
                    type: 'string',
                    validation: (Rule) => Rule.max(60)
                },
                {
                    name: 'metaDescription',
                    title: 'Description Meta',
                    type: 'text',
                    validation: (Rule) => Rule.max(160)
                },
            ]
        }),
    ],
    preview: {
        select: {
            title: 'name.fr',
            subtitle: 'tag',
            media: 'image'
        },
        prepare({ title, subtitle, media }) {
            return {
                title,
                subtitle: subtitle || 'Non catégorisé',
                media
            }
        }
    },
    orderings: [
        {
            title: 'Ordre personnalisé',
            name: 'customOrder',
            by: [{ field: 'order', direction: 'asc' }]
        },
        {
            title: 'Nom (A-Z)',
            name: 'nameAsc',
            by: [{ field: 'name.fr', direction: 'asc' }]
        }
    ]
})
