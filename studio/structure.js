/**
 * Sidebar layout for the Studio. Without this, Sanity lists every document
 * type flat; this groups the writing surface apart from the taxonomy.
 */
export const structure = (S) =>
    S.list()
        .title('Content')
        .items([
            S.listItem()
                .title('Blog Posts')
                .child(
                    S.documentTypeList('post')
                        .title('Blog Posts')
                        .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
            S.listItem()
                .title('Projects')
                .child(
                    S.documentTypeList('project')
                        .title('Projects')
                        .defaultOrdering([
                            { field: 'order', direction: 'asc' },
                            { field: 'publishedAt', direction: 'desc' },
                        ])
                ),
            S.divider(),
            S.documentTypeListItem('category').title('Categories'),
            S.documentTypeListItem('author').title('Authors'),
        ]);
