import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { structure } from './structure';

export default defineConfig({
    name: 'default',
    title: 'Natnael Tegegne — Portfolio',

    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',

    plugins: [
        structureTool({ structure }),
        visionTool({ defaultApiVersion: '2026-01-01' }),
    ],

    schema: {
        types: schemaTypes,
    },
});
