import "../styles/WorkExperience.css";

const WorkExperience = () => {
    const experiences = [
        {
            title: "Software Engineer Intern",
            company: "Greater Hazelwood Community Collaborative",
            description: "Partnering with a cross-functional team to build a comprehensive website supporting GHCC's community-led initiatives, handling full-stack development, design, and deployment.",
            period: "May 2026",
            current: true,
            year: "2026",
        },
        {
            title: "Director of Technology",
            company: "Panther AI Club — University of Pittsburgh",
            description: "Built and maintain the club's website and technical infrastructure. Oversee social media presence, plan the technical aspects of workshops and events, and collaborate across teams to optimize club operations.",
            period: "Oct 2025",
            current: true,
            year: "2025",
        },
        {
            title: "Software Development & Research Intern",
            company: "EthioCo Consulting",
            description: "Designed and built the company website using HTML, CSS, JavaScript, and WordPress. Conducted competitor analysis and contributed go-to-market strategy proposals for new product lines.",
            period: "Sep – Nov 2024",
            current: false,
            year: "2024",
        },
        // {
        //     title: "Founder",
        //     company: "UniWise Academy",
        //     description: "Started a free online tutoring platform that grew to serve 600+ students across Ethiopian universities. Led a volunteer team, built the web platform, and improved student exam outcomes by 30%.",
        //     period: "Jul 2024",
        //     current: true,
        //     year: "2024",
        // },
    ];

    return (
        <section id="experience" className="experience-section">
            <div className="experience-container">

                {/* Header */}
                <div className="exp-header-block">
                    <div className="section-num-header">
                        <span className="section-sym">§</span>
                        <span className="section-num">03</span>
                        <span className="section-label">Experience</span>
                    </div>
                    <h2 className="section-title">Experience</h2>
                </div>

                {/* Entry list */}
                <div className="exp-list">
                    {experiences.map((exp, index) => (
                        <div key={index} className="exp-entry">
                            {/* Year column */}
                            <div className="exp-year-col">
                                <span className="exp-year">{exp.year}</span>
                            </div>

                            {/* Divider */}
                            <div className="exp-mid-col">
                                <div className="exp-line-top" />
                                <div className={`exp-circle ${exp.current ? 'current' : ''}`} />
                                <div className="exp-line-bottom" />
                            </div>

                            {/* Content */}
                            <div className="exp-content-col" data-year={exp.year}>
                                <div className="exp-top-row">
                                    <div>
                                        <h3 className="exp-role">{exp.title}</h3>
                                        <p className="exp-company">{exp.company}</p>
                                    </div>
                                    <div className="exp-period-wrap">
                                        {exp.current && <span className="exp-now-pill">Now</span>}
                                        <span className="exp-period">{exp.period}</span>
                                    </div>
                                </div>
                                <p className="exp-desc">{exp.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkExperience;
