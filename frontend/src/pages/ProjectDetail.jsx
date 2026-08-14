import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useSanityQuery } from '../hooks/useSanityQuery';
import { projectBySlugQuery } from '../sanity/queries';
import { imageUrl } from '../sanity/image';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import PortableText from '../components/PortableText.jsx';
import '../styles/Blog.css';
import '../styles/ProjectDetail.css';

const STATUS_LABELS = {
    shipped: 'Shipped',
    'in-progress': 'In progress',
    prototype: 'Prototype',
    archived: 'Archived',
};

const ProjectDetail = () => {
    const { slug } = useParams();
    const { data: project, loading, error } = useSanityQuery(projectBySlugQuery, { slug });

    useDocumentMeta(
        project ? `${project.title} — Natnael Tegegne` : null,
        project ? project.description : null
    );

    if (loading) {
        return (
            <main className="blog-page">
                <div className="case-container">
                    <div className="post-skeleton" aria-hidden="true">
                        <span className="skeleton-line short" />
                        <span className="skeleton-line title" />
                        <span className="skeleton-line" />
                        <span className="skeleton-line" />
                    </div>
                    <p className="visually-hidden" role="status">Loading project…</p>
                </div>
            </main>
        );
    }

    if (error || !project) {
        return (
            <main className="blog-page">
                <div className="case-container post-missing">
                    <h1 className="section-title">Project not found</h1>
                    <p className="section-subtitle">
                        {error
                            ? 'Something went wrong loading this project.'
                            : "This project doesn't exist, or it hasn't been published yet."}
                    </p>
                    <Link to="/#projects" className="btn-secondary post-back-btn">
                        <FaArrowLeft size={12} /> Back to all projects
                    </Link>
                </div>
            </main>
        );
    }

    const cover = imageUrl(project.coverImage, 1600);
    const hasFacts = project.role || project.timeline || project.team || project.status;

    return (
        <main className="blog-page">
            <article className="case-container">
                <Link to="/#projects" className="post-back">
                    <FaArrowLeft size={11} /> all projects
                </Link>

                <header className="case-header">
                    <h1 className="post-title">{project.title}</h1>
                    <p className="post-lede">{project.description}</p>

                    {project.tags?.length > 0 && (
                        <div className="post-tags">
                            {project.tags.map((tag, i) => (
                                <span key={i} className="tag">{tag}</span>
                            ))}
                        </div>
                    )}

                    {(project.codeLink || project.demoLink) && (
                        <div className="case-actions">
                            {project.demoLink && (
                                <a
                                    href={project.demoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                >
                                    <FaExternalLinkAlt size={13} /> Live demo
                                </a>
                            )}
                            {project.codeLink && (
                                <a
                                    href={project.codeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary"
                                >
                                    <FaGithub size={15} /> Source code
                                </a>
                            )}
                        </div>
                    )}
                </header>

                {cover && (
                    <figure className="post-cover">
                        <img src={cover} alt={project.coverImage?.alt || ''} />
                    </figure>
                )}

                {hasFacts && (
                    <dl className="case-facts">
                        {project.role && (
                            <div className="case-fact">
                                <dt>Role</dt>
                                <dd>{project.role}</dd>
                            </div>
                        )}
                        {project.timeline && (
                            <div className="case-fact">
                                <dt>Timeline</dt>
                                <dd>{project.timeline}</dd>
                            </div>
                        )}
                        {project.team && (
                            <div className="case-fact">
                                <dt>Team</dt>
                                <dd>{project.team}</dd>
                            </div>
                        )}
                        {project.status && (
                            <div className="case-fact">
                                <dt>Status</dt>
                                <dd>
                                    <span className={`status-pill status-${project.status}`}>
                                        {STATUS_LABELS[project.status] || project.status}
                                    </span>
                                </dd>
                            </div>
                        )}
                    </dl>
                )}

                {project.metrics?.length > 0 && (
                    <div className="case-metrics">
                        {project.metrics.map((metric, i) => (
                            <div key={i} className="metric-tile">
                                <span className="metric-value">{metric.value}</span>
                                <span className="metric-label">{metric.label}</span>
                            </div>
                        ))}
                    </div>
                )}

                {project.highlights?.length > 0 && (
                    <section className="case-highlights">
                        <h2 className="case-section-title">Highlights</h2>
                        <ul>
                            {project.highlights.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {project.techStack?.length > 0 && (
                    <section className="case-stack">
                        <h2 className="case-section-title">Stack</h2>
                        <div className="stack-groups">
                            {project.techStack.map((group, i) => (
                                <div key={i} className="stack-group">
                                    <h3 className="stack-category">{group.category}</h3>
                                    <div className="stack-items">
                                        {group.items?.map((item, j) => (
                                            <span key={j} className="tag">{item}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {project.body?.length > 0 && (
                    <div className="post-body case-body">
                        <PortableText value={project.body} />
                    </div>
                )}

                {project.staticDemo && (
                    <figure className="case-demo">
                        <iframe
                            src={project.staticDemo}
                            title={`${project.title} walkthrough`}
                            loading="lazy"
                            allowFullScreen
                        />
                    </figure>
                )}

                {(project.previous || project.next) && (
                    <nav className="post-nav" aria-label="More projects">
                        {project.previous ? (
                            <Link to={`/projects/${project.previous.slug}`} className="post-nav-link prev">
                                <span className="post-nav-label"><FaArrowLeft size={10} /> Previous</span>
                                <span className="post-nav-title">{project.previous.title}</span>
                            </Link>
                        ) : <span />}

                        {project.next && (
                            <Link to={`/projects/${project.next.slug}`} className="post-nav-link next">
                                <span className="post-nav-label">Next <FaArrowRight size={10} /></span>
                                <span className="post-nav-title">{project.next.title}</span>
                            </Link>
                        )}
                    </nav>
                )}
            </article>
        </main>
    );
};

export default ProjectDetail;
