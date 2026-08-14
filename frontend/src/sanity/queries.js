/**
 * Identity template tag. Purely a marker so editors and the Sanity VS Code
 * extension syntax-highlight these strings as GROQ.
 */
const groq = (strings, ...values) =>
    strings.reduce((acc, str, i) => acc + str + (values[i] ?? ''), '');

/**
 * `!(_id in path("drafts.**"))` keeps unpublished drafts off the site.
 * `publishedAt <= now()` lets you schedule a post by dating it forward.
 */
const PUBLISHED_POST = `_type == "post" && !(_id in path("drafts.**")) && publishedAt <= now()`;

const POST_CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  featured,
  coverImage,
  "author": author->{name, image},
  "categories": categories[]->{_id, title, "slug": slug.current},
  // Character count of the body, flattened to plain text. Turned into a
  // reading estimate on the client so the body itself stays off the list query.
  "bodyLength": length(pt::text(body))
`;

/** Every published post, featured ones first, then newest first. */
export const postsQuery = groq`
  *[${PUBLISHED_POST}] | order(featured desc, publishedAt desc) {
    ${POST_CARD_FIELDS}
  }
`;

/** One post by slug, with body and neighbours for prev/next navigation. */
export const postBySlugQuery = groq`
  *[${PUBLISHED_POST} && slug.current == $slug][0] {
    ${POST_CARD_FIELDS},
    seoTitle,
    seoDescription,
    body[] {
      ...,
      _type == "image" => { ..., asset-> },
      markDefs[] { ... }
    },
    "previous": *[${PUBLISHED_POST} && publishedAt < ^.publishedAt]
      | order(publishedAt desc)[0] { title, "slug": slug.current },
    "next": *[${PUBLISHED_POST} && publishedAt > ^.publishedAt]
      | order(publishedAt asc)[0] { title, "slug": slug.current }
  }
`;

/** All categories that have at least one published post attached. */
export const categoriesQuery = groq`
  *[_type == "category" && count(*[${PUBLISHED_POST} && references(^._id)]) > 0]
    | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      "count": count(*[${PUBLISHED_POST} && references(^._id)])
    }
`;

const VISIBLE_PROJECT = `_type == "project" && !(_id in path("drafts.**")) && hidden != true`;

/** Portfolio projects, in display order. */
export const projectsQuery = groq`
  *[${VISIBLE_PROJECT}] | order(order asc, publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    tags,
    codeLink,
    demoLink,
    staticDemo,
    featured,
    // Only projects with a written case study get a link to one.
    "hasCaseStudy": defined(body) && count(body) > 0
  }
`;

/** One project's full case study, with neighbours for prev/next navigation. */
export const projectBySlugQuery = groq`
  *[${VISIBLE_PROJECT} && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    tags,
    codeLink,
    demoLink,
    staticDemo,
    coverImage,
    role,
    timeline,
    team,
    status,
    highlights,
    metrics,
    techStack,
    publishedAt,
    body[] {
      ...,
      _type == "image" => { ..., asset-> },
      markDefs[] { ... }
    },
    // The grid is ordered by \`order\` ascending, so "previous" is the
    // project above this one in that list and "next" is the one below.
    "previous": *[${VISIBLE_PROJECT} && defined(body) && order < ^.order]
      | order(order desc)[0] { title, "slug": slug.current },
    "next": *[${VISIBLE_PROJECT} && defined(body) && order > ^.order]
      | order(order asc)[0] { title, "slug": slug.current }
  }
`;
