import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
    name: 'siteSettings',
    title: 'Infos Entreprise & Réseaux',
    type: 'document',
    icon: () => '⚙️',
    fields: [
        defineField({
            name: 'logo',
            title: 'Logo Principal',
            type: 'image',
            description: 'Logo affiché dans le header',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Texte alternatif',
                    description: 'Pour le SEO et l\'accessibilité',
                }
            ]
        }),
        defineField({
            name: 'siteName',
            title: 'Nom du Site',
            type: 'object',
            fields: [
                { name: 'fr', type: 'string', title: 'Français' },
                { name: 'de', type: 'string', title: 'Deutsch' },
            ]
        }),
        defineField({
            name: 'contact',
            title: 'Informations de Contact',
            type: 'object',
            fields: [
                {
                    name: 'phone',
                    title: 'Téléphone',
                    type: 'string',
                    validation: (Rule) => Rule.required()
                },
                {
                    name: 'email',
                    title: 'Email',
                    type: 'string',
                    validation: (Rule) => Rule.email()
                },
                {
                    name: 'address',
                    title: 'Adresse',
                    type: 'object',
                    fields: [
                        { name: 'street', type: 'string', title: 'Rue' },
                        { name: 'city', type: 'string', title: 'Ville' },
                        { name: 'postalCode', type: 'string', title: 'Code postal' },
                        { name: 'country', type: 'string', title: 'Pays' },
                    ]
                }
            ]
        }),
        defineField({
            name: 'socialMedia',
            title: 'Réseaux Sociaux',
            type: 'object',
            fields: [
                { name: 'facebook', type: 'url', title: 'Facebook' },
                { name: 'instagram', type: 'url', title: 'Instagram' },
                { name: 'twitter', type: 'url', title: 'Twitter/X' },
                { name: 'linkedin', type: 'url', title: 'LinkedIn' },
            ]
        }),
        defineField({
            name: 'footer',
            title: 'Footer',
            type: 'object',
            fields: [
                {
                    name: 'text',
                    title: 'Texte du footer',
                    type: 'object',
                    fields: [
                        { name: 'fr', type: 'text', title: 'Français' },
                        { name: 'de', type: 'text', title: 'Deutsch' },
                    ]
                },
                {
                    name: 'copyright',
                    title: 'Copyright',
                    type: 'string',
                    placeholder: '© 2024 Boucherie Vaz. Tous droits réservés.'
                }
            ]
        }),
        defineField({
            name: 'seo',
            title: 'SEO par Défaut',
            type: 'object',
            description: 'Paramètres SEO utilisés par défaut sur toutes les pages',
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
                {
                    name: 'ogImage',
                    title: 'Image de partage (Open Graph)',
                    type: 'image',
                    description: 'Image utilisée lors du partage sur les réseaux sociaux'
                }
            ]
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Paramètres du Site',
                subtitle: 'Configuration globale'
            }
        }
    }
})
