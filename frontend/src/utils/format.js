/** "March 4, 2026" */
export function formatDate(value) {
    if (!value) return '';
    return new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/** ISO date for <time dateTime="..."> */
export function isoDate(value) {
    if (!value) return undefined;
    return new Date(value).toISOString();
}

/**
 * Reading estimate from a plain-text character count.
 * ~5 characters per word, 200 words per minute, never below 1 minute.
 */
export function readingTime(bodyLength) {
    if (!bodyLength) return 1;
    return Math.max(1, Math.round(bodyLength / 5 / 200));
}
