import imageUrlBuilder from '@sanity/image-url';
import { client, isSanityConfigured } from './client';

const builder = isSanityConfigured ? imageUrlBuilder(client) : null;

/**
 * Turns a Sanity image reference into a CDN URL.
 * Chain transforms as needed: urlFor(img).width(800).url()
 */
export function urlFor(source) {
    if (!builder || !source?.asset) return null;
    return builder.image(source).auto('format').fit('max');
}

/** Convenience for the common case: a width-constrained image URL. */
export function imageUrl(source, width = 1200) {
    return urlFor(source)?.width(width).url() ?? null;
}
