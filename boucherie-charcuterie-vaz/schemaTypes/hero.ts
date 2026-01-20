import { defineField, defineType } from 'sanity'

export const hero = defineType({
    name: 'hero',
    title: 'Bannière Principale (Haut de page)',
    type: 'document',
    icon: () => '🎯',
    fields: [
        defineField({
            name: 'titleMain',
            title: 'Titre Principal',
            type: 'object',
            fields: [
                { name: 'fr', type: 'string', title: 'Français', placeholder: 'La boucherie' },
                { name: 'de', type: 'string', title: 'Deutsch' },
            ]
        }),
        defineField({
            name: 'titleHighlight',
            title: 'Sous-titre (doré)',
            type: 'object',
            description: 'Le texte affiché en italique doré',
            fields: [
                { name: 'fr', type: 'string', title: 'Français', placeholder: 'proche de vous' },
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
        defineField({
            name: 'highlightedCity',
            title: 'Ville mise en avant',
            type: 'string',
            description: 'La ville sera soulignée en doré',
            placeholder: 'Vallorbe'
        }),
        defineField({
            name: 'backgroundImage',
            title: 'Image de Fond',
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
            name: 'cta1',
            title: 'Bouton Principal (CTA 1)',
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
                    placeholder: '#produits'
                }
            ]
        }),
        defineField({
            name: 'cta2',
            title: 'Bouton Secondaire (CTA 2)',
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
                    placeholder: '#contact'
                }
            ]
        }),
        defineField({
            name: 'scrollText',
            title: 'Texte de l\'indicateur de scroll',
            type: 'object',
            fields: [
                { name: 'fr', type: 'string', title: 'Français', placeholder: 'Découvrir' },
                { name: 'de', type: 'string', title: 'Deutsch' },
            ]
        }),
    ],
    preview: {
        select: {
            title: 'titleMain.fr',
            media: 'backgroundImage'
        },
        prepare({ title, media }) {
            return {
                title: title || 'Section Hero',
                subtitle: 'Page d\'accueil',
                media
            }
        }
    }
})
