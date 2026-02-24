import '../styles/Projects.css';
import React, { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';


const Projects = () => {
    const projects = [
        {
    title: "Sentinel",
    description: "An AI-powered Anti-Money Laundering (AML) compliance system that automates adverse media screening for banking customers. Built for Tartan Hacks 2026, the platform uses autonomous AI agents to retrieve customer data, search global news sources, intelligently match identities, and generate structured risk verdicts with confidence scores and citations. The project emphasizes transparency, auditability, and false-positive reduction in compliance workflows.",
    tags: ["AI Agents", "FastAPI", "Next.js", "MCP", "LLMs", "FinTech", "Compliance"],
    codeLink: "https://github.com/vijay-raghav/tart-hacks",
    supportLink: "#",
    demoLink: "https://sentinel-pi-steel.vercel.app/"
}
,
{
    title: "Panther AI Club Website",
    description: "I planned, designed, and built the official website for Panther AI Club at the University of Pittsburgh. The platform manages member data, supports registration, showcases events, blogs, and resources, and provides admin access to manage member information and club activities. This project strengthened my skills in full-stack development and building end-to-end web solutions.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    codeLink: "#",
    supportLink: "#",
    demoLink: "https://pitt-panther-ai-club.vercel.app/"
},
{
    title: "The Best Neighborhood in Pittsburgh",
    description: "A data-driven analysis to determine the best neighborhood to live in for families in Pittsburgh using datasets from WPRDC. I worked in a team of three, handling one of the datasets and contributing to the final conclusions. This project enhanced my data analysis, visualization, and collaborative research skills.",
    tags: ["Python", "Pandas", "Matplotlib"],
    codeLink: "https://github.com/NatnaelTegegne/The-best-neighborhood-in-Pittsburgh",
    supportLink: "#",
    demoLink: "#"
}
    ]

    //1. state to hold the projects from the database
    // const [projects, setProjects] = useState([]);
    // const [loading, setLoading] = useState(true); // To show a "Loading..." message to the user

    //2. Fetch data when the component mounts
    // useEffect(() => {
    //     fetch(`${import.meta.env.VITE_API_URL}/projects`)
    //         .then(response => response.json()) //Convert text to JSON
    //         .then(data => {
    //             setProjects(data);
    //             setLoading(false); //stop the "loading..." message
    //         })
    //         .catch(error => console.error("Error fetching projects:", error));
    // }, []); //Empty array means "run only once"

    // if (loading) return <h2 className='loading-message'>Loading projects...(Please wait a little bit)</h2>;

    return(
        <section id="projects" className="featured-projects">
            <div className="projects-container">
                <div className="paragraph-wrapper">
                  <p className="projects-intro">Some of my recent work</p>  
                </div>
                
                {/* <h2 className="section-title">Featured Projects</h2> */}
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card">
                            <h3 className="project-title">{project.title}</h3>
                            {project.demoLink !== "#" && (
                                <div className="project-embed">
                                    <iframe
                                        src={project.demoLink}
                                        title={project.title}
                                        width="100%"
                                        height="400px"
                                        frameBorder="0"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                            <p className="project-description">{project.description}</p>
                            <div className="project-tags">
                                {project.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className="project-tag">{tag}</span>
                                ))}
                            </div>
                            <div className="project-links">
                                {project.codeLink !== "#" && (
                                    <a href={project.codeLink} className="project-link" target="_blank" rel="noopener noreferrer">
                                        <FaGithub size={40} className='icon'/> 
                                    </a>
                                )}
                                {project.demoLink !== "#" && (
                                    <a href={project.demoLink} className="project-link button-link" target="_blank" rel="noopener noreferrer">
                                        Visit Website
                                    </a>
                                )}
                            </div>

                        </div> 
                    ))}
                </div>
                
            </div>
        </section>
    );
};

export default Projects;