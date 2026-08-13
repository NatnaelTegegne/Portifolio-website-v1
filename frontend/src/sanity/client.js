import { createClient } from '@sanity/client';

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

/**
 * True once VITE_SANITY_PROJECT_ID is set. Components check this so the site
 * still renders (with empty states) before Sanity is wired up.
 */
export const isSanityConfigured = Boolean(projectId);

export const client = isSanityConfigured
    ? createClient({
          projectId,
          dataset,
          // Pin the API version. Bumping this opts into newer GROQ behaviour.
          apiVersion: '2026-01-01',
          // Served from Sanity's CDN: cheaper and faster, ~seconds behind edits.
          useCdn: true,
          perspective: 'published',
      })
    : null;
