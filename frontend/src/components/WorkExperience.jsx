import "../styles/WorkExperience.css";

const WorkExperience = () => {
    const experiences = [
        {
            title: "VP of Infrastructure",
            company: "Panther AI Club, University of Pittsburgh",
            description: `Built and maintain the club’s website and technical infrastructure.

                        Manage social media and online presence to improve engagement.

                        Assist in planning and executing technical aspects of events and workshops.

                        Collaborate with team members to optimize club operations and resources.`,
            period: "Oct 2025 – Present",
        },
        {
            title: "Software Development & Research Intern",
            company: "EthioCo Consulting (Startup)",
            description: `Built and designed a website using HTML, CSS, JavaScript, and WordPress.

                        Conducted competitor analysis and proposed go-to-market strategies for new products.

                        Documented workflows and testing results to support team collaboration.`,
            period: "Sep 2024 – Nov 2024",
        },
        {
            title: "Founder of Uniwise Academy",
            company: "UniWise Academy",
            description: `Founded a free online tutoring platform providing lectures, notes, and exam prep for students across universities in Ethiopia.

                        Developed a website using HTML, CSS, and JavaScript to transition from Telegram to a web-based platform, expanding accessibility.

                        Led a volunteer team and provided scholarships to 600+ underprivileged students, improving exam outcomes by 30%.

                        Conducted user surveys and analyzed feedback to enhance platform effectiveness.`,
            period: "July 2024 – Present",
        },
        {
            title: "Physics Instructor (Volunteer)",
            company: "St. Amanuel Orthodox Church",
            description: `Taught Physics to students in grades 7–11, improving conceptual understanding and academic performance.

                        Developed structured learning materials and mock exams to assess progress and boost confidence.`,
            period: "2022 – 2023",
        },
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
