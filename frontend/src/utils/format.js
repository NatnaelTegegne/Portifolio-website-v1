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

/**
 * Month-precision range for a Sanity `date` ("2024-09-01"):
 * "May 2026", "Sep – Nov 2024", "Dec 2024 – Feb 2025".
 * An open-ended range shows only the start; the UI marks it "Now".
 *
 * Formatted in UTC because a bare date string parses as UTC midnight, which
 * would otherwise roll back a month for anyone west of Greenwich.
 */
export function formatPeriod(start, end) {
    if (!start) return '';
    const month = (d) => d.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
    const s = new Date(start);
    if (!end) return `${month(s)} ${s.getUTCFullYear()}`;

    const e = new Date(end);
    const sameYear = s.getUTCFullYear() === e.getUTCFullYear();
    if (sameYear && s.getUTCMonth() === e.getUTCMonth()) return `${month(s)} ${s.getUTCFullYear()}`;
    if (sameYear) return `${month(s)} – ${month(e)} ${e.getUTCFullYear()}`;
    return `${month(s)} ${s.getUTCFullYear()} – ${month(e)} ${e.getUTCFullYear()}`;
}
