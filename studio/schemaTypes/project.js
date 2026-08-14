import { defineType, defineField, defineArrayMember } from 'sanity';

export const project = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    groups: [
        { name: 'card', title: 'Card', default: true },
        { name: 'detail', title: 'Case Study' },
        { name: 'meta', title: 'Metadata' },
    ],
    fields: [
        // ─── Shown on the project card ────────────────────────────────
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            group: 'card',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'card',
            description: 'The case study URL: /projects/<slug>',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Short description',
            type: 'text',
            rows: 5,
            group: 'card',
            description: 'The blurb on the project card and at the top of the case study.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            group: 'card',
            of: [{ type: 'string' }],
            description: 'Tech stack pills on the card, e.g. React, FastAPI.',
            options: { layout: 'tags' },
        }),
        defineField({
            name: 'codeLink',
            title: 'Source code URL',
            type: 'url',
            group: 'card',
            validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
            name: 'demoLink',
            title: 'Live demo URL',
            type: 'url',
            group: 'card',
            description: 'Embedded as a live preview on the card unless a static demo is set.',
            validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
            name: 'staticDemo',
            title: 'Static demo embed URL',
            type: 'url',
            group: 'card',
            description:
                'Use for a video walkthrough instead of a live site. Must be an embeddable URL, e.g. https://www.youtube.com/embed/VIDEO_ID',
            validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
        }),

        // ─── The /projects/<slug> case study ──────────────────────────
        // Everything here is optional. A project with no `body` shows no
        // "read more" link on its card and has no detail page.
        defineField({
            name: 'coverImage',
            title: 'Cover image',
            type: 'image',
            group: 'detail',
            options: { hotspot: true },
            description: 'Hero image at the top of the case study.',
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alt text',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                }),
            ],
        }),
        defineField({
            name: 'role',
            title: 'My role',
            type: 'string',
            group: 'detail',
            description: 'e.g. "Full-stack engineer" or "Backend & AI agents"',
        }),
        defineField({
            name: 'timeline',
            title: 'Timeline',
            type: 'string',
            group: 'detail',
            description: 'e.g. "Feb 2026 · 36-hour hackathon" or "3 months"',
        }),
        defineField({
            name: 'team',
            title: 'Team',
            type: 'string',
            group: 'detail',
            description: 'e.g. "Solo" or "Team of 4"',
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            group: 'detail',
            options: {
                list: [
                    { title: 'Shipped', value: 'shipped' },
                    { title: 'In progress', value: 'in-progress' },
                    { title: 'Prototype', value: 'prototype' },
                    { title: 'Archived', value: 'archived' },
                ],
                layout: 'radio',
            },
        }),
        defineField({
            name: 'highlights',
            title: 'Key highlights',
            type: 'array',
            group: 'detail',
            of: [{ type: 'string' }],
            description: 'Short bullet points listed near the top of the case study.',
        }),
        defineField({
            name: 'metrics',
            title: 'Outcome metrics',
            type: 'array',
            group: 'detail',
            description: 'Rendered as a row of stat tiles, e.g. "Latency" / "under 200ms".',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'metric',
                    fields: [
                        defineField({
                            name: 'value',
                            title: 'Value',
                            type: 'string',
                            description: 'The big number, e.g. "94%" or "<200ms"',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                            description: 'What it measures, e.g. "Match precision"',
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                    preview: {
                        select: { title: 'value', subtitle: 'label' },
                    },
                }),
            ],
        }),
        defineField({
            name: 'techStack',
            title: 'Tech stack breakdown',
            type: 'array',
            group: 'detail',
            description:
                'Grouped stack for the case study sidebar. The flat "Tags" field above still drives the card.',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'stackGroup',
                    fields: [
                        defineField({
                            name: 'category',
                            title: 'Category',
                            type: 'string',
                            description: 'e.g. Frontend, Backend, Infrastructure, ML',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'items',
                            title: 'Technologies',
                            type: 'array',
                            of: [{ type: 'string' }],
                            options: { layout: 'tags' },
                            validation: (Rule) => Rule.min(1),
                        }),
                    ],
                    preview: {
                        select: { title: 'category', items: 'items' },
                        prepare({ title, items }) {
                            return { title, subtitle: (items || []).join(', ') };
                        },
                    },
                }),
            ],
        }),
        defineField({
            name: 'body',
            title: 'Case study',
            type: 'blockContent',
            group: 'detail',
            description:
                'The deep dive: system design, architecture diagrams, tradeoffs, code. Adding content here is what creates the /projects/<slug> page.',
        }),

        // ─── Ordering and visibility ──────────────────────────────────
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            group: 'meta',
            description: 'Featured projects render as a wide card at the top of the grid.',
            initialValue: false,
        }),
        defineField({
            name: 'order',
            title: 'Display order',
            type: 'number',
            group: 'meta',
            description: 'Lower numbers appear first. Ties fall back to newest first.',
            initialValue: 0,
        }),
        defineField({
            name: 'publishedAt',
            title: 'Date',
            type: 'datetime',
            group: 'meta',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'hidden',
            title: 'Hide from site',
            type: 'boolean',
            group: 'meta',
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
        select: {
            title: 'title',
            subtitle: 'description',
            media: 'coverImage',
            featured: 'featured',
            hidden: 'hidden',
        },
        prepare({ title, subtitle, media, featured, hidden }) {
            const flags = [featured && '★ Featured', hidden && 'Hidden'].filter(Boolean);
            return {
                title: flags.length ? `${title} (${flags.join(', ')})` : title,
                subtitle: (subtitle || '').slice(0, 80),
                media,
            };
        },
    },
});
