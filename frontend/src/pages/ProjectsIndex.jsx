import { useSanityQuery } from '../hooks/useSanityQuery';
import { projectsQuery } from '../sanity/queries';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import ProjectCard, { ProjectCardSkeleton } from '../components/ProjectCard.jsx';
import '../styles/Blog.css';
import '../styles/Projects.css';
import '../styles/ProjectDetail.css';

const ProjectsIndex = () => {
    const { data: projects, loading, error } = useSanityQuery(projectsQuery);

    useDocumentMeta(
        'Projects — Natnael Tegegne',
        'Everything I have built, from AI systems to full-stack web apps and data analysis.'
    );

    return (
        <main className="blog-page">
            <div className="projects-container">
                <header className="section-header">
                    <div className="section-num-header">
                        <span className="section-sym">§</span>
                        <span className="section-num">02</span>
                        <span className="section-label">Projects</span>
                    </div>
                    <h1 className="section-title">All Projects</h1>
                    <p className="section-subtitle">
                        Everything I've built — AI systems, full-stack web apps, and data
                        analysis. Projects with a write-up link through to a full case study.
                    </p>
                </header>

                {loading && (
                    <div className="projects-grid">
                        {[0, 1, 2, 3].map((i) => <ProjectCardSkeleton key={i} />)}
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

                {!loading && projects?.length > 0 && (
                    <div className="projects-grid">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project._id}
                                project={project}
                                // Here `featured` keeps its original meaning: a wide
                                // card that leads the grid.
                                wide={project.featured}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default ProjectsIndex;
