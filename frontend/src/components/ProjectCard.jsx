import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import { EMBED_ALLOW } from '../utils/embed';

/**
 * One project card. Shared by the home page's featured section and the full
 * /projects index so the two can't drift apart.
 *
 * `wide` controls the full-width treatment. It's passed in rather than read
 * from project.featured because on the home page every card is featured, and
 * making them all full-width would flatten the layout.
 */
const ProjectCard = ({ project, wide = false }) => {
    /* A staticDemo is a video walkthrough, so it has to stay clickable — the
       viewer needs the play button. A demoLink is a live site embedded as a
       preview, which we cover with a transparent overlay so clicking and
       scrolling the card doesn't get hijacked by the site inside it. */
    const embedSrc = project.staticDemo || project.demoLink;
    const isVideo = Boolean(project.staticDemo);

    return (
        <article className={`project-card ${wide ? 'featured' : ''}`}>
            {/* Embed preview */}
            {embedSrc && (
                <div className={`project-embed ${isVideo ? 'is-video' : ''}`}>
                    <iframe
                        src={embedSrc}
                        title={project.title}
                        loading="lazy"
                        frameBorder="0"
                        allow={EMBED_ALLOW}
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                    {!isVideo && <div className="embed-overlay" />}
                </div>
            )}

            {/* Card body */}
            <div className="project-body">
                <div className="project-meta">
                    {/* The card can't be one big link — it already contains anchors
                        and an iframe. The title and the footer link carry the
                        navigation instead. */}
                    <h3 className="project-title">
                        {project.hasCaseStudy ? (
                            <Link to={`/projects/${project.slug}`} className="project-title-link">
                                {project.title}
                            </Link>
                        ) : (
                            project.title
                        )}
                    </h3>
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

                {project.hasCaseStudy && (
                    <Link to={`/projects/${project.slug}`} className="project-case-link">
                        Read more about this project <FaArrowRight size={12} />
                    </Link>
                )}
            </div>
        </article>
    );
};

/** Placeholder cards shown while the query is in flight. */
export const ProjectCardSkeleton = () => (
    <div className="project-card skeleton" aria-hidden="true">
        <div className="skeleton-media" />
        <div className="skeleton-lines">
            <span /><span /><span />
        </div>
    </div>
);

export default ProjectCard;
