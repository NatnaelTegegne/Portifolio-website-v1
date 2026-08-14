import '../styles/Projects.css';
import '../styles/ProjectDetail.css';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useSanityQuery } from '../hooks/useSanityQuery';
import { featuredProjectsQuery } from '../sanity/queries';
import ProjectCard, { ProjectCardSkeleton } from './ProjectCard.jsx';

const Projects = () => {
    const { data, loading, error } = useSanityQuery(featuredProjectsQuery);

    const projects = data?.projects ?? [];
    const total = data?.total ?? 0;
    // Nothing to browse to if the home page already shows everything.
    const showViewAll = total > projects.length;

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
                        {[0, 1].map((i) => <ProjectCardSkeleton key={i} />)}
                        <p className="visually-hidden" role="status">Loading projects…</p>
                    </div>
                )}

                {error && (
                    <p className="projects-empty">
                        Couldn't load projects right now. Please try again in a moment.
                    </p>
                )}

                {/* No featured projects is a content problem, not an error — point
                    at the full index rather than showing an empty section. */}
                {!loading && !error && projects.length === 0 && (
                    <p className="projects-empty">
                        {total > 0 ? (
                            <>
                                No featured projects yet.{' '}
                                <Link to="/projects" className="pt-link">See all {total} projects</Link>.
                            </>
                        ) : (
                            'No projects published yet.'
                        )}
                    </p>
                )}

                {/* Grid */}
                {!loading && projects.length > 0 && (
                    <div className="projects-grid">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project._id}
                                project={project}
                                // Only the first card gets the full-width treatment.
                                // Every card here is featured, so keying off
                                // project.featured would make them all wide.
                                wide={index === 0 && projects.length % 2 === 1}
                            />
                        ))}
                    </div>
                )}

                {!loading && !error && showViewAll && (
                    <div className="projects-view-all">
                        <Link to="/projects" className="btn-secondary">
                            View all {total} projects <FaArrowRight size={12} />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
