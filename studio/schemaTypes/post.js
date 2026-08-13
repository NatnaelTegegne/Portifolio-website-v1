import { defineType, defineField } from 'sanity';

export const post = defineType({
    name: 'post',
    title: 'Blog Post',
    type: 'document',
    groups: [
        { name: 'content', title: 'Content', default: true },
        { name: 'meta', title: 'Metadata' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            group: 'content',
            validation: (Rule) => Rule.required().max(120),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'content',
            description: 'The URL of the post: /blog/<slug>',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            group: 'content',
            description: 'Short summary shown on the blog index and in link previews.',
            validation: (Rule) => Rule.max(240).warning('Keep it under 240 characters.'),
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover image',
            type: 'image',
            group: 'content',
            options: { hotspot: true },
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
            name: 'body',
            title: 'Body',
            type: 'blockContent',
            group: 'content',
        }),

        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            group: 'meta',
            description: 'Posts with a future date are hidden from the site until then.',
            initialValue: () => new Date().toISOString(),
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            group: 'meta',
            to: [{ type: 'author' }],
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            group: 'meta',
            of: [{ type: 'reference', to: [{ type: 'category' }] }],
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            group: 'meta',
            description: 'Pin this post to the top of the blog index.',
            initialValue: false,
        }),

        defineField({
            name: 'seoTitle',
            title: 'SEO title',
            type: 'string',
            group: 'seo',
            description: 'Overrides the browser tab / search result title. Defaults to the post title.',
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO description',
            type: 'text',
            rows: 2,
            group: 'seo',
            description: 'Defaults to the excerpt if left empty.',
        }),
    ],

    orderings: [
        {
            title: 'Newest first',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
        {
            title: 'Oldest first',
            name: 'publishedAtAsc',
            by: [{ field: 'publishedAt', direction: 'asc' }],
        },
    ],

    preview: {
        select: { title: 'title', media: 'coverImage', publishedAt: 'publishedAt' },
        prepare({ title, media, publishedAt }) {
            const date = publishedAt
                ? new Date(publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                  })
                : 'No date';
            const scheduled = publishedAt && new Date(publishedAt) > new Date();
            return {
                title,
                media,
                subtitle: scheduled ? `Scheduled — ${date}` : date,
            };
        },
    },
});
