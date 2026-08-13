import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSanityQuery } from '../hooks/useSanityQuery';
import { postsQuery, categoriesQuery } from '../sanity/queries';
import { imageUrl } from '../sanity/image';
import { formatDate, isoDate, readingTime } from '../utils/format';
import '../styles/Blog.css';

const PostCard = ({ post, featured }) => {
    const cover = imageUrl(post.coverImage, featured ? 1200 : 700);

    return (
        <article className={`post-card ${featured ? 'featured' : ''}`}>
            <Link to={`/blog/${post.slug}`} className="post-card-link">
                {cover && (
                    <div className="post-card-media">
                        <img src={cover} alt={post.coverImage?.alt || ''} loading="lazy" />
                    </div>
                )}

                <div className="post-card-body">
                    <div className="post-card-meta">
                        <time dateTime={isoDate(post.publishedAt)}>{formatDate(post.publishedAt)}</time>
                        <span className="meta-dot">·</span>
                        <span>{readingTime(post.bodyLength)} min read</span>
                    </div>

                    <h3 className="post-card-title">{post.title}</h3>

                    {post.excerpt && <p className="post-card-excerpt">{post.excerpt}</p>}

                    {post.categories?.length > 0 && (
                        <div className="post-card-tags">
                            {post.categories.map((cat) => (
                                <span key={cat._id} className="tag">{cat.title}</span>
                            ))}
                        </div>
                    )}
                </div>
            </Link>
        </article>
    );
};

const BlogList = () => {
    const { data: posts, loading, error } = useSanityQuery(postsQuery);
    const { data: categories } = useSanityQuery(categoriesQuery);
    const [activeCategory, setActiveCategory] = useState(null);

    const visiblePosts = useMemo(() => {
        if (!posts) return [];
        if (!activeCategory) return posts;
        return posts.filter((post) =>
            post.categories?.some((cat) => cat.slug === activeCategory)
        );
    }, [posts, activeCategory]);

    return (
        <main className="blog-page">
            <div className="blog-container">
                <header className="section-header">
                    <div className="section-num-header">
                        <span className="section-sym">§</span>
                        <span className="section-num">05</span>
                        <span className="section-label">Blog</span>
                    </div>
                    <h1 className="section-title">Writing</h1>
                    <p className="section-subtitle">
                        Notes on what I'm building and learning — AI systems, full-stack
                        engineering, and the math underneath it all.
                    </p>
                </header>

                {categories?.length > 0 && (
                    <div className="blog-filters" role="group" aria-label="Filter posts by category">
                        <button
                            type="button"
                            className={`filter-pill ${!activeCategory ? 'active' : ''}`}
                            onClick={() => setActiveCategory(null)}
                            aria-pressed={!activeCategory}
                        >
                            All <span className="filter-count">{posts?.length ?? 0}</span>
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat._id}
                                type="button"
                                className={`filter-pill ${activeCategory === cat.slug ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.slug)}
                                aria-pressed={activeCategory === cat.slug}
                            >
                                {cat.title} <span className="filter-count">{cat.count}</span>
                            </button>
                        ))}
                    </div>
                )}

                {loading && (
                    <div className="blog-grid">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="post-card skeleton" aria-hidden="true">
                                <div className="skeleton-media" />
                                <div className="skeleton-lines">
                                    <span /><span /><span />
                                </div>
                            </div>
                        ))}
                        <p className="visually-hidden" role="status">Loading posts…</p>
                    </div>
                )}

                {error && (
                    <p className="blog-empty">
                        Couldn't load posts right now. Please try again in a moment.
                    </p>
                )}

                {!loading && !error && visiblePosts.length === 0 && (
                    <p className="blog-empty">
                        {activeCategory
                            ? 'No posts in this category yet.'
                            : 'No posts published yet — check back soon.'}
                    </p>
                )}

                {!loading && visiblePosts.length > 0 && (
                    <div className="blog-grid">
                        {visiblePosts.map((post, index) => (
                            <PostCard
                                key={post._id}
                                post={post}
                                // Only the first post gets the wide treatment, and only
                                // in the unfiltered view where "featured" is meaningful.
                                featured={index === 0 && post.featured && !activeCategory}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default BlogList;
