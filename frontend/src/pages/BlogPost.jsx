import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useSanityQuery } from '../hooks/useSanityQuery';
import { postBySlugQuery } from '../sanity/queries';
import { imageUrl } from '../sanity/image';
import { formatDate, isoDate, readingTime } from '../utils/format';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import PortableText from '../components/PortableText.jsx';
import '../styles/Blog.css';

const BlogPost = () => {
    const { slug } = useParams();
    const { data: post, loading, error } = useSanityQuery(postBySlugQuery, { slug });

    useDocumentMeta(
        post ? `${post.seoTitle || post.title} — Natnael Tegegne` : null,
        post ? post.seoDescription || post.excerpt : null
    );

    if (loading) {
        return (
            <main className="blog-page">
                <div className="post-container">
                    <div className="post-skeleton" aria-hidden="true">
                        <span className="skeleton-line short" />
                        <span className="skeleton-line title" />
                        <span className="skeleton-line" />
                        <span className="skeleton-line" />
                        <span className="skeleton-line" />
                    </div>
                    <p className="visually-hidden" role="status">Loading post…</p>
                </div>
            </main>
        );
    }

    if (error || !post) {
        return (
            <main className="blog-page">
                <div className="post-container post-missing">
                    <h1 className="section-title">Post not found</h1>
                    <p className="section-subtitle">
                        {error
                            ? "Something went wrong loading this post."
                            : "This post doesn't exist, or it hasn't been published yet."}
                    </p>
                    <Link to="/blog" className="btn-secondary post-back-btn">
                        <FaArrowLeft size={12} /> Back to all posts
                    </Link>
                </div>
            </main>
        );
    }

    const cover = imageUrl(post.coverImage, 1600);

    return (
        <main className="blog-page">
            <article className="post-container">
                <Link to="/blog" className="post-back">
                    <FaArrowLeft size={11} /> all posts
                </Link>

                <header className="post-header">
                    <div className="post-meta">
                        <time dateTime={isoDate(post.publishedAt)}>{formatDate(post.publishedAt)}</time>
                        <span className="meta-dot">·</span>
                        <span>{readingTime(post.bodyLength)} min read</span>
                        {post.author?.name && (
                            <>
                                <span className="meta-dot">·</span>
                                <span>{post.author.name}</span>
                            </>
                        )}
                    </div>

                    <h1 className="post-title">{post.title}</h1>

                    {post.excerpt && <p className="post-lede">{post.excerpt}</p>}

                    {post.categories?.length > 0 && (
                        <div className="post-tags">
                            {post.categories.map((cat) => (
                                <span key={cat._id} className="tag">{cat.title}</span>
                            ))}
                        </div>
                    )}
                </header>

                {cover && (
                    <figure className="post-cover">
                        <img src={cover} alt={post.coverImage?.alt || ''} />
                    </figure>
                )}

                <div className="post-body">
                    <PortableText value={post.body} />
                </div>

                {(post.previous || post.next) && (
                    <nav className="post-nav" aria-label="More posts">
                        {post.previous ? (
                            <Link to={`/blog/${post.previous.slug}`} className="post-nav-link prev">
                                <span className="post-nav-label"><FaArrowLeft size={10} /> Previous</span>
                                <span className="post-nav-title">{post.previous.title}</span>
                            </Link>
                        ) : <span />}

                        {post.next && (
                            <Link to={`/blog/${post.next.slug}`} className="post-nav-link next">
                                <span className="post-nav-label">Next <FaArrowRight size={10} /></span>
                                <span className="post-nav-title">{post.next.title}</span>
                            </Link>
                        )}
                    </nav>
                )}
            </article>
        </main>
    );
};

export default BlogPost;
