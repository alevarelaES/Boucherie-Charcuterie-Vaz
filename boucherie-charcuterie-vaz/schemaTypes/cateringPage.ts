import { defineField, defineType } from 'sanity'

const multilingual = (name: string, title: string, type: 'string' | 'text' = 'string') =>
    defineField({
        name,
        title,
        type: 'object',
        fields: [
            { name: 'fr', type, title: 'Français' },
            { name: 'de', type, title: 'Deutsch' },
        ]
    })

export const cateringPage = defineType({
    name: 'cateringPage',
    title: 'Page Traiteur',
    type: 'document',
    icon: () => '🍽️',
    fields: [
        // Section intro
        multilingual('introTitle', 'Titre intro (ex: Qualité Bouchère…)'),
        multilingual('introParagraph', 'Paragraphe intro', 'text'),
        defineField({
            name: 'statsLabel',
            title: 'Label stats (ex: Événements réussis)',
            type: 'object',
            fields: [
                { name: 'fr', type: 'string', title: 'Français' },
                { name: 'de', type: 'string', title: 'Deutsch' },
            ]
        }),

        // Témoignage
        multilingual('testimonialQuote', 'Citation client', 'text'),
        defineField({
            name: 'testimonialAuthor',
            title: 'Auteur témoignage (ex: Marie & Jean, Mariage 2025)',
            type: 'string',
        }),

        // CTA bas de page
        multilingual('ctaTitle', 'Titre CTA (ex: Prêt à régaler vos convives ?)'),
        multilingual('ctaParagraph', 'Paragraphe CTA', 'text'),
        multilingual('ctaButtonText', 'Texte bouton CTA (ex: Réserver une date)'),
    ],
    preview: {
        prepare() {
            return { title: 'Page Traiteur', subtitle: 'Contenu éditorial' }
        }
    }
})
