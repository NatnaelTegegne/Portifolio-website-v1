import { useEffect } from 'react';

const DEFAULT_TITLE = document.title;

/**
 * Sets the tab title and meta description for a page, restoring the defaults
 * on unmount. This is a client-side render, so crawlers that don't execute JS
 * won't see these — good enough for link previews in most modern tools, but
 * true SSR/prerendering is the fix if search ranking matters.
 */
export function useDocumentMeta(title, description) {
    useEffect(() => {
        if (title) document.title = title;

        let tag = document.querySelector('meta[name="description"]');
        const previous = tag?.getAttribute('content') ?? null;

        if (description) {
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('name', 'description');
                document.head.appendChild(tag);
            }
            tag.setAttribute('content', description);
        }

        return () => {
            document.title = DEFAULT_TITLE;
            if (description && tag) {
                if (previous === null) tag.remove();
                else tag.setAttribute('content', previous);
            }
        };
    }, [title, description]);
}
