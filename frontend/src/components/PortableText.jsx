import { PortableText as BasePortableText } from '@portabletext/react';
import { useState } from 'react';
import { FaRegCopy, FaCheck } from 'react-icons/fa';
import { imageUrl } from '../sanity/image';

const CodeBlock = ({ value }) => {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value.code || '');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard is unavailable (insecure origin or denied permission).
        }
    };

    return (
        <figure className="pt-code">
            <div className="pt-code-bar">
                <span className="pt-code-label">{value.filename || value.language || 'code'}</span>
                <button
                    type="button"
                    className="pt-code-copy"
                    onClick={copy}
                    aria-label="Copy code to clipboard"
                >
                    {copied ? <FaCheck size={11} /> : <FaRegCopy size={11} />}
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
            <pre>
                <code>{value.code}</code>
            </pre>
        </figure>
    );
};

/**
 * Maps the block types defined in studio/schemaTypes/blockContent.js onto
 * markup. Adding a block type in the Studio means adding a case here.
 */
const components = {
    types: {
        image: ({ value }) => {
            const src = imageUrl(value, 1400);
            if (!src) return null;
            return (
                <figure className="pt-image">
                    <img src={src} alt={value.alt || ''} loading="lazy" />
                    {value.caption && <figcaption>{value.caption}</figcaption>}
                </figure>
            );
        },
        codeBlock: CodeBlock,
    },

    block: {
        h2: ({ children }) => <h2 className="pt-h2">{children}</h2>,
        h3: ({ children }) => <h3 className="pt-h3">{children}</h3>,
        h4: ({ children }) => <h4 className="pt-h4">{children}</h4>,
        blockquote: ({ children }) => <blockquote className="pt-quote">{children}</blockquote>,
        normal: ({ children }) => <p className="pt-p">{children}</p>,
    },

    list: {
        bullet: ({ children }) => <ul className="pt-list">{children}</ul>,
        number: ({ children }) => <ol className="pt-list pt-list-num">{children}</ol>,
    },

    marks: {
        code: ({ children }) => <code className="pt-inline-code">{children}</code>,
        link: ({ value, children }) => {
            const href = value?.href || '';
            const external = /^https?:\/\//i.test(href);
            return (
                <a
                    href={href}
                    className="pt-link"
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                    {children}
                </a>
            );
        },
    },
};

const PortableText = ({ value }) => {
    if (!value) return null;
    return <BasePortableText value={value} components={components} />;
};

export default PortableText;
