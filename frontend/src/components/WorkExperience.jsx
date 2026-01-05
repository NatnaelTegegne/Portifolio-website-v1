import '../styles/WorkExperience.css';

const WorkExperience = () => {
    const experiences = [
        {
            title: "Founder of Uniwise Academy",
            company: "#",
            description: "Founded and led an online learning platform in Ethiopia",
            period: "2024 - present"
        },
        {
            title: "Founder of Uniwise Academy",
            company: "#",
            description: "Founded and led an online learning platform in Ethiopia",
            period: "2024 - present"
        }
    ];
    
    return (
        <section id="experience" className="work-experience">
            <div className="experience-container">
                <h2 className="section-title">Work Experience</h2>
                <div className="experience-timeline">
                    {experiences.map((exp, index) => (
                        <div key={index} className="experience-item">
                            <div className="experience-header">
                                <div>
                                    <h3 className="experience-title">{exp.title}</h3>
                                    <p className="experience-company">{exp.company}</p>
                                </div>
                                <span className="experience-period">{exp.period}</span>
                            </div>
                            <p className="experience-description">{exp.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section> 
    );
};

export default WorkExperience;