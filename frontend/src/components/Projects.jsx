import '../styles/Projects.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
    const projects = [
        {
            title: "Sentinel",
            description: "An AI-powered Anti-Money Laundering (AML) compliance system that automates adverse media screening for banking customers. Built for Tartan Hacks 2026, the platform uses autonomous AI agents to retrieve customer data, search global news sources, intelligently match identities, and generate structured risk verdicts with confidence scores and citations.",
            tags: ["AI Agents", "FastAPI", "Next.js", "MCP", "LLMs", "FinTech"],
            codeLink: "https://github.com/vijay-raghav/tart-hacks",
            demoLink: "https://sentinel-pi-steel.vercel.app/",
            staticDemo: null,
            featured: true,
        },
        {
            title: "Panther AI Club Website",
            description: "Planned, designed, and built the official website for Panther AI Club at the University of Pittsburgh. The platform manages member data, supports registration, showcases events, blogs, and resources, and provides admin access for club activities.",
            tags: ["MongoDB", "Express", "React", "Node.js"],
            codeLink: null,
            demoLink: "https://pitt-panther-ai-club.vercel.app/",
            staticDemo: null,
        },
        {
            title: "Piky-Park",
            description: "Real-time parking spot detection system built for NexHacks 2026. Uses PyTorch (ResNet50) for computer vision, Flask for the backend, and React (Vite) for the admin dashboard.",
            tags: ["PyTorch", "Flask", "React", "Node.js"],
            codeLink: "https://github.com/NatnaelTegegne/piky-park",
            demoLink: null,
            staticDemo: "https://www.youtube.com/embed/Lu5FTQa-pDQ?si=nmSQLnEAtO4rwwsJ&start=18",
        },
        {
            title: "Best Neighborhood in Pittsburgh",
            description: "A data-driven analysis to determine the best neighborhood for families in Pittsburgh using datasets from WPRDC. Worked in a team of three, handling data analysis, visualization, and collaborative research.",
            tags: ["Python", "Pandas", "Matplotlib"],
            codeLink: "https://github.com/NatnaelTegegne/The-best-neighborhood-in-Pittsburgh",
            demoLink: null,
            staticDemo: null,
        },
    ];

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

                {/* Grid */}
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <article key={index} className={`project-card ${project.featured ? 'featured' : ''}`}>
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
                                                aria-label="View code on GitHub"
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
                                                aria-label="Visit live demo"
                                            >
                                                <FaExternalLinkAlt size={15} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <p className="project-description">{project.description}</p>

                                <div className="project-tags">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;