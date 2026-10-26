import { defineType, defineField } from 'sanity';

export const experience = defineType({
    name: 'experience',
    title: 'Experience',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Role',
            type: 'string',
            description: 'e.g. "Software Engineer Intern"',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'company',
            title: 'Organization',
            type: 'string',
            description: 'Shown under the role, e.g. "Panther AI Club — University of Pittsburgh"',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'highlights',
            title: 'Description',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'One point per item. Each renders as its own bullet, in this order.',
            validation: (Rule) =>
                Rule.custom((highlights, { document }) => {
                    // Older entries may still carry the paragraph field below.
                    if (highlights?.length || document?.description) return true;
                    return 'Add at least one point.';
                }),
        }),
        // Superseded by `highlights`. Kept so entries written before the switch
        // don't lose their text; the site shows it only when there are no points.
        defineField({
            name: 'description',
            title: 'Description (old paragraph)',
            type: 'text',
            rows: 4,
            deprecated: {
                reason: 'Move this text into the bulleted Description above, then clear this field.',
            },
            hidden: ({ value }) => value === undefined,
            initialValue: undefined,
        }),

        // Only the month and year are shown on the site; the day is ignored.
        defineField({
            name: 'startDate',
            title: 'Start date',
            type: 'date',
            options: { dateFormat: 'MMMM YYYY' },
            description: 'Also sets the year in the timeline and the sort order.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'endDate',
            title: 'End date',
            type: 'date',
            options: { dateFormat: 'MMMM YYYY' },
            description: 'Leave empty for a role you still hold. It gets the "Now" marker.',
            validation: (Rule) =>
                Rule.custom((endDate, { document }) => {
                    if (!endDate || !document?.startDate) return true;
                    return endDate >= document.startDate || 'End date must be after the start date.';
                }),
        }),

        defineField({
            name: 'hidden',
            title: 'Hide from site',
            type: 'boolean',
            description: 'Keep the role in the Studio but stop showing it on the portfolio.',
            initialValue: false,
        }),
    ],

    orderings: [
        {
            title: 'Start date, newest first',
            name: 'startDateDesc',
            by: [{ field: 'startDate', direction: 'desc' }],
        },
    ],

    preview: {
        select: {
            title: 'title',
            company: 'company',
            endDate: 'endDate',
            hidden: 'hidden',
        },
        prepare({ title, company, endDate, hidden }) {
            const flags = [!endDate && 'Current', hidden && 'Hidden'].filter(Boolean);
            return {
                title: flags.length ? `${title} (${flags.join(', ')})` : title,
                subtitle: company,
            };
        },
    },
});
