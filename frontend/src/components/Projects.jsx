import '../styles/Projects.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useSanityQuery } from '../hooks/useSanityQuery';
import { projectsQuery } from '../sanity/queries';

const Projects = () => {
    const { data: projects, loading, error } = useSanityQuery(projectsQuery);

    return (
        <section id="projects" className="projects-section">
            <div className="projects-container">
                {/* Header */}
                <div className="section-header">
                    <div className="section-num-header">
                        <span className="section-sym">§</span>
                        <span className="section-num">02</span>
                        <span className="section-label">Projects</span>
                    </div>
                    <h2 className="section-title">Selected Projects</h2>
                    <p className="section-subtitle">
                        A collection of things I've built, from AI systems to full-stack web apps.
                    </p>
                </div>

                {loading && (
                    <div className="projects-grid">
                        {[0, 1].map((i) => (
                            <div key={i} className="project-card skeleton" aria-hidden="true">
                                <div className="skeleton-media" />
                                <div className="skeleton-lines">
                                    <span /><span /><span />
                                </div>
                            </div>
                        ))}
                        <p className="visually-hidden" role="status">Loading projects…</p>
                    </div>
                )}

                {error && (
                    <p className="projects-empty">
                        Couldn't load projects right now. Please try again in a moment.
                    </p>
                )}

                {!loading && !error && projects?.length === 0 && (
                    <p className="projects-empty">No projects published yet.</p>
                )}

                {/* Grid */}
                {!loading && projects?.length > 0 && (
                    <div className="projects-grid">
                        {projects.map((project) => (
                            <article
                                key={project._id}
                                className={`project-card ${project.featured ? 'featured' : ''}`}
                            >
                                {/* Embed preview */}
                                {(project.demoLink || project.staticDemo) && (
                                    <div className="project-embed">
                                        <iframe
                                            src={project.staticDemo || project.demoLink}
                                            title={project.title}
                                            loading="lazy"
                                            frameBorder="0"
                                            allowFullScreen
                                        />
                                        <div className="embed-overlay" />
                                    </div>
                                )}

                                {/* Card body */}
                                <div className="project-body">
                                    <div className="project-meta">
                                        <h3 className="project-title">{project.title}</h3>
                                        <div className="project-links">
                                            {project.codeLink && (
                                                <a
                                                    href={project.codeLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="project-icon-link"
                                                    aria-label={`View ${project.title} code on GitHub`}
                                                >
                                                    <FaGithub size={17} />
                                                </a>
                                            )}
                                            {project.demoLink && (
                                                <a
                                                    href={project.demoLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="project-icon-link"
                                                    aria-label={`Visit the ${project.title} live demo`}
                                                >
                                                    <FaExternalLinkAlt size={15} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <p className="project-description">{project.description}</p>

                                    {project.tags?.length > 0 && (
                                        <div className="project-tags">
                                            {project.tags.map((tag, i) => (
                                                <span key={i} className="tag">{tag}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
