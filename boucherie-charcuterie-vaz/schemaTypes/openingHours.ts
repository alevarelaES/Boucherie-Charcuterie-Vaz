import { defineField, defineType } from 'sanity'

export const openingHours = defineType({
    name: 'openingHours',
    title: '🕒 Horaires d\'Ouverture',
    type: 'document',
    icon: () => '🕐',
    fields: [
        defineField({
            name: 'monday',
            title: 'Lundi',
            type: 'object',
            fields: [
                { name: 'closed', type: 'boolean', title: 'Fermé' },
                { name: 'morning', type: 'string', title: 'Matin', placeholder: '08:00 - 12:00' },
                { name: 'afternoon', type: 'string', title: 'Après-midi', placeholder: '14:00 - 18:00' },
            ]
        }),
        defineField({
            name: 'tuesday',
            title: 'Mardi',
            type: 'object',
            fields: [
                { name: 'closed', type: 'boolean', title: 'Fermé' },
                { name: 'morning', type: 'string', title: 'Matin' },
                { name: 'afternoon', type: 'string', title: 'Après-midi' },
            ]
        }),
        defineField({
            name: 'wednesday',
            title: 'Mercredi',
            type: 'object',
            fields: [
                { name: 'closed', type: 'boolean', title: 'Fermé' },
                { name: 'morning', type: 'string', title: 'Matin' },
                { name: 'afternoon', type: 'string', title: 'Après-midi' },
            ]
        }),
        defineField({
            name: 'thursday',
            title: 'Jeudi',
            type: 'object',
            fields: [
                { name: 'closed', type: 'boolean', title: 'Fermé' },
                { name: 'morning', type: 'string', title: 'Matin' },
                { name: 'afternoon', type: 'string', title: 'Après-midi' },
            ]
        }),
        defineField({
            name: 'friday',
            title: 'Vendredi',
            type: 'object',
            fields: [
                { name: 'closed', type: 'boolean', title: 'Fermé' },
                { name: 'morning', type: 'string', title: 'Matin' },
                { name: 'afternoon', type: 'string', title: 'Après-midi' },
            ]
        }),
        defineField({
            name: 'saturday',
            title: 'Samedi',
            type: 'object',
            fields: [
                { name: 'closed', type: 'boolean', title: 'Fermé' },
                { name: 'morning', type: 'string', title: 'Matin' },
                { name: 'afternoon', type: 'string', title: 'Après-midi' },
            ]
        }),
        defineField({
            name: 'sunday',
            title: 'Dimanche',
            type: 'object',
            fields: [
                { name: 'closed', type: 'boolean', title: 'Fermé' },
                { name: 'morning', type: 'string', title: 'Matin' },
                { name: 'afternoon', type: 'string', title: 'Après-midi' },
            ]
        }),
        defineField({
            name: 'specialMessage',
            title: 'Message Spécial',
            type: 'object',
            description: 'Afficher un message temporaire (vacances, jours fériés)',
            fields: [
                { name: 'fr', type: 'text', title: 'Français' },
                { name: 'de', type: 'text', title: 'Deutsch' },
            ]
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Horaires d\'Ouverture',
                subtitle: 'Gestion de l\'emploi du temps'
            }
        }
    }
})
