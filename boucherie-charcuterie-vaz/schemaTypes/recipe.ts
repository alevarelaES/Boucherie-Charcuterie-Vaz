import { defineField, defineType } from 'sanity'

export const recipe = defineType({
    name: 'recipe',
    title: 'Nos Recettes',
    type: 'document',
    icon: () => '👨‍🍳',
    fields: [
        defineField({
            name: 'title',
            title: 'Titre de la Recette',
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
                source: 'title.fr',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required()
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
            ],
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'prepTime',
            title: 'Temps de Préparation',
            type: 'number',
            description: 'En minutes'
        }),
        defineField({
            name: 'cookTime',
            title: 'Temps de Cuisson',
            type: 'number',
            description: 'En minutes'
        }),
        defineField({
            name: 'servings',
            title: 'Nombre de Personnes',
            type: 'number',
            initialValue: 4
        }),
        defineField({
            name: 'difficulty',
            title: 'Difficulté',
            type: 'string',
            options: {
                list: [
                    { title: 'Facile', value: 'easy' },
                    { title: 'Moyen', value: 'medium' },
                    { title: 'Difficile', value: 'hard' },
                ]
            }
        }),
        defineField({
            name: 'category',
            title: 'Catégorie',
            type: 'string',
            options: {
                list: [
                    { title: 'Viande Rouge', value: 'red_meat' },
                    { title: 'Volaille', value: 'poultry' },
                    { title: 'Charcuterie', value: 'deli' },
                    { title: 'Accompagnement', value: 'side' },
                ]
            }
        }),
        defineField({
            name: 'ingredients',
            title: 'Ingrédients',
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
            name: 'instructions',
            title: 'Étapes de Préparation',
            type: 'object',
            fields: [
                {
                    name: 'fr',
                    title: 'Français',
                    type: 'array',
                    of: [{ type: 'block' }]
                },
                {
                    name: 'de',
                    title: 'Deutsch',
                    type: 'array',
                    of: [{ type: 'block' }]
                },
            ]
        }),
        defineField({
            name: 'tips',
            title: 'Conseils du Chef',
            type: 'object',
            fields: [
                { name: 'fr', type: 'text', title: 'Français' },
                { name: 'de', type: 'text', title: 'Deutsch' },
            ]
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
            title: 'title.fr',
            subtitle: 'category',
            media: 'image'
        },
        prepare({ title, subtitle, media }) {
            const categoryMap: Record<string, string> = {
                'red_meat': 'Viande Rouge',
                'poultry': 'Volaille',
                'deli': 'Charcuterie',
                'side': 'Accompagnement'
            }
            return {
                title,
                subtitle: categoryMap[subtitle] || 'Non catégorisé',
                media
            }
        }
    }
})
