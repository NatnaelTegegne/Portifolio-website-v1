import { defineType, defineArrayMember, defineField } from 'sanity';

/**
 * The rich-text field used by blog post bodies.
 * Anything added here must have a matching renderer in
 * frontend/src/components/PortableText.jsx
 */
export const blockContent = defineType({
    title: 'Block Content',
    name: 'blockContent',
    type: 'array',
    of: [
        defineArrayMember({
            type: 'block',
            styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'Heading 2', value: 'h2' },
                { title: 'Heading 3', value: 'h3' },
                { title: 'Heading 4', value: 'h4' },
                { title: 'Quote', value: 'blockquote' },
            ],
            lists: [
                { title: 'Bullet', value: 'bullet' },
                { title: 'Numbered', value: 'number' },
            ],
            marks: {
                decorators: [
                    { title: 'Bold', value: 'strong' },
                    { title: 'Italic', value: 'em' },
                    { title: 'Code', value: 'code' },
                    { title: 'Strike', value: 'strike-through' },
                ],
                annotations: [
                    defineArrayMember({
                        title: 'Link',
                        name: 'link',
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'href',
                                title: 'URL',
                                type: 'url',
                                validation: (Rule) =>
                                    Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
                            }),
                        ],
                    }),
                ],
            },
        }),

        defineArrayMember({
            type: 'image',
            name: 'image',
            options: { hotspot: true },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alt text',
                    type: 'string',
                    description: 'Describes the image for screen readers and search engines.',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'caption',
                    title: 'Caption',
                    type: 'string',
                }),
            ],
        }),

        defineArrayMember({
            type: 'object',
            name: 'codeBlock',
            title: 'Code Block',
            fields: [
                defineField({
                    name: 'language',
                    title: 'Language',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Plain text', value: 'text' },
                            { title: 'JavaScript', value: 'javascript' },
                            { title: 'TypeScript', value: 'typescript' },
                            { title: 'JSX', value: 'jsx' },
                            { title: 'Python', value: 'python' },
                            { title: 'Java', value: 'java' },
                            { title: 'Bash', value: 'bash' },
                            { title: 'JSON', value: 'json' },
                            { title: 'SQL', value: 'sql' },
                            { title: 'HTML', value: 'html' },
                            { title: 'CSS', value: 'css' },
                        ],
                    },
                    initialValue: 'text',
                }),
                defineField({
                    name: 'filename',
                    title: 'Filename (optional)',
                    type: 'string',
                }),
                defineField({
                    name: 'code',
                    title: 'Code',
                    type: 'text',
                    rows: 12,
                    validation: (Rule) => Rule.required(),
                }),
            ],
            preview: {
                select: { language: 'language', filename: 'filename', code: 'code' },
                prepare({ language, filename, code }) {
                    return {
                        title: filename || `${language || 'text'} snippet`,
                        subtitle: (code || '').split('\n')[0]?.slice(0, 60),
                    };
                },
            },
        }),
    ],
});
