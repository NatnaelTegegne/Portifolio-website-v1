import "../styles/WorkExperience.css";
import { useSanityQuery } from "../hooks/useSanityQuery";
import { experienceQuery } from "../sanity/queries";
import { formatPeriod } from "../utils/format";

const WorkExperience = () => {
    const { data, loading, error } = useSanityQuery(experienceQuery);

    const experiences = (data ?? []).map((exp) => ({
        ...exp,
        period: formatPeriod(exp.startDate, exp.endDate),
        year: exp.startDate?.slice(0, 4),
    }));

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

                {loading && <p className="visually-hidden" role="status">Loading experience…</p>}

                {error && (
                    <p className="exp-empty">
                        Couldn't load experience right now. Please try again in a moment.
                    </p>
                )}

                {!loading && !error && experiences.length === 0 && (
                    <p className="exp-empty">No experience published yet.</p>
                )}

                {/* Entry list */}
                {!loading && experiences.length > 0 && (
                    <div className="exp-list">
                        {experiences.map((exp) => (
                            <div key={exp._id} className="exp-entry">
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
                )}
            </div>
        </section>
    );
};

export default WorkExperience;
