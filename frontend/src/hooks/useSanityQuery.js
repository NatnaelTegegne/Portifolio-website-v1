import { useState, useEffect } from 'react';
import { client, isSanityConfigured } from '../sanity/client';

/**
 * Runs a GROQ query and tracks loading/error state.
 *
 * `params` is stringified for the dependency comparison so callers can pass an
 * inline object literal without re-firing the request on every render.
 */
export function useSanityQuery(query, params = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const paramsKey = JSON.stringify(params);

    useEffect(() => {
        if (!isSanityConfigured) {
            setLoading(false);
            setError(new Error('Sanity is not configured — set VITE_SANITY_PROJECT_ID.'));
            return;
        }

        const controller = new AbortController();
        let active = true;

        setLoading(true);
        setError(null);

        client
            .fetch(query, JSON.parse(paramsKey), { signal: controller.signal })
            .then((result) => {
                if (active) setData(result);
            })
            .catch((err) => {
                // An aborted request is a cleanup, not a failure.
                if (active && err.name !== 'AbortError') setError(err);
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
            controller.abort();
        };
    }, [query, paramsKey]);

    return { data, loading, error };
}
