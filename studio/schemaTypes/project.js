import { defineType, defineField } from 'sanity';

export const project = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 5,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Tech stack shown as pills on the card, e.g. React, FastAPI.',
            options: { layout: 'tags' },
        }),
        defineField({
            name: 'codeLink',
            title: 'Source code URL',
            type: 'url',
            validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
            name: 'demoLink',
            title: 'Live demo URL',
            type: 'url',
            description: 'Embedded as a live preview on the card unless a static demo is set.',
            validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
            name: 'staticDemo',
            title: 'Static demo embed URL',
            type: 'url',
            description:
                'Use for a video walkthrough instead of a live site. Must be an embeddable URL, e.g. https://www.youtube.com/embed/VIDEO_ID',
            validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            description: 'Featured projects render as a wide card at the top of the grid.',
            initialValue: false,
        }),
        defineField({
            name: 'order',
            title: 'Display order',
            type: 'number',
            description: 'Lower numbers appear first. Ties fall back to newest first.',
            initialValue: 0,
        }),
        defineField({
            name: 'publishedAt',
            title: 'Date',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'hidden',
            title: 'Hide from site',
            type: 'boolean',
            description: 'Keep the project in the Studio but stop showing it on the portfolio.',
            initialValue: false,
        }),
    ],

    orderings: [
        {
            title: 'Display order',
            name: 'displayOrder',
            by: [
                { field: 'order', direction: 'asc' },
                { field: 'publishedAt', direction: 'desc' },
            ],
        },
    ],

    preview: {
        select: { title: 'title', subtitle: 'description', featured: 'featured', hidden: 'hidden' },
        prepare({ title, subtitle, featured, hidden }) {
            const flags = [featured && '★ Featured', hidden && 'Hidden'].filter(Boolean);
            return {
                title: flags.length ? `${title} (${flags.join(', ')})` : title,
                subtitle: (subtitle || '').slice(0, 80),
            };
        },
    },
});
