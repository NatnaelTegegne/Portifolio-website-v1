/**
 * Permissions policy for embedded demos. YouTube's player needs these
 * delegated to the iframe or the play button silently does nothing —
 * `encrypted-media` in particular, since the player probes for it on load.
 */
export const EMBED_ALLOW =
    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen';
