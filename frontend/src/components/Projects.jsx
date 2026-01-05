import '../styles/Projects.css';
import React, { useState, useEffect } from 'react';

const Projects = () => {
    // const projects = [
    //     {
    //         title: "Uniwise Academy",
    //         description: "An online learning platform I founded in Ethiopia.",
    //         tags: ["HTML", "CSS", "JS", "React" ],
    //         codeLink: "#",
    //         supportLink: "#",
    //         demoLink: "#"
    //     },
    //     {
    //         title: "Uniwise Academy",
    //         description: "An online learning platform I founded in Ethiopia.",
    //         tags: ["HTML", "CSS", "JS", "React" ],
    //         codeLink: "#",
    //         supportLink: "#",
    //         demoLink: "#"
    //     },
    //     {
    //         title: "Uniwise Academy",
    //         description: "An online learning platform I founded in Ethiopia.",
    //         tags: ["HTML", "CSS", "JS", "React" ],
    //         codeLink: "#",
    //         supportLink: "#",
    //         demoLink: "#"
    //     }
    // ]

    //1. state to hold the projects from the database
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true); // To show a "Loading..." message to the user

    //2. Fetch data when the component mounts
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/projects`)
            .then(response => response.json()) //Convert text to JSON
            .then(data => {
                setProjects(data);
                setLoading(false); //stop the "loading..." message
            })
            .catch(error => console.error("Error fetching projects:", error));
    }, []); //Empty array means "run only once"

    if (loading) return <h2 className='loading-message'>Loading projects...</h2>;

    return(
        <section id="projects" className="featured-projects">
            <div className="projects-container">
                <div className="paragraph-wrapper">
                  <p className="projects-intro">Some of my recent work</p>  
                </div>
                
                {/* <h2 className="section-title">Featured Projects</h2> */}
                <div className="projects-grid">
                    {projects?.map((project, index) => (
                        <div key={index} className="project-card">
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-description">{project.description}</p>
                            <div className="project-tags">
                                {project.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className="project-tag">{tag}</span>
                                ))}
                            </div>
                            <div className="project-links">
                                {projects.codeLink && project.codeLink !== "#" && (
                                    <a href={project.codeLink} className="project-link" target="_blank" rel="noopener noreferrer">Code</a>
                                )}
                                {projects.supportLink && project.supportLink !== "#" && (
                                    <a href={project.supportLink} className="project-link" target="_blank" rel="noopener noreferrer">Support</a>
                                )}
                                {projects.demoLink && project.demoLink !== "#" && (
                                    <a href={project.demoLink} className="project-link" target="_blank" rel="noopener noreferrer">Demo</a>
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