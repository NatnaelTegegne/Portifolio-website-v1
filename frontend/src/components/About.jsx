import '../styles/About.css';
import {
    SiPython, SiJavascript, SiCplusplus, SiMysql,
    SiReact, SiNodedotjs, SiExpress, SiFlask, SiFastapi, SiNextdotjs,
    SiPytorch, SiPandas, SiPlotly, SiLangchain,
    SiGit, SiMongodb, SiPostgresql, SiDocker, SiVite, SiWordpress, SiSpringboot,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

// map skill name to icons
const SKILL_ICON_MAP = {
    /* ── Languages ── */
    'Python':       { Icon: SiPython,      label: 'Python',     color: '#3776AB' },
    'JavaScript':   { Icon: SiJavascript,  label: 'JavaScript', color: '#F7DF1E' },
    'Java':         { Icon: FaJava,        label: 'Java',       color: '#007396' },
    // 'C / C++':      { Icon: SiCplusplus,   label: 'C / C++',   color: '#00599C' },
    'SQL':          { Icon: SiMysql,       label: 'SQL',        color: '#4479A1' },

    /* ── Frameworks ── */
    'React':        { Icon: SiReact,       label: 'React',      color: '#61DAFB' },
    'Node.js':      { Icon: SiNodedotjs,   label: 'Node.js',    color: '#339933' },
    'Express':      { Icon: SiExpress,     label: 'Express',    color: '#888888' },
    'Flask':        { Icon: SiFlask,       label: 'Flask',      color: '#888888' },
    'FastAPI':      { Icon: SiFastapi,     label: 'FastAPI',    color: '#009688' },
    'Next.js':      { Icon: SiNextdotjs,   label: 'Next.js',    color: '#888888' },
    'Spring Boot':  { Icon: SiSpringboot, label: 'Spring Boot', color: '#6DB33F' },

    /* ── Data & AI ── */
    'PyTorch':      { Icon: SiPytorch,     label: 'PyTorch',    color: '#EE4C2C' },
    'Pandas':       { Icon: SiPandas,      label: 'Pandas',     color: '#150458' },
    'Matplotlib':   { Icon: SiPlotly,      label: 'Matplotlib', color: '#3F4F75' },
    'LangChain':    { Icon: SiLangchain,   label: 'LangChain',  color: '#1C3C3C' },

    /* ── Tools ── */
    'Git':          { Icon: SiGit,         label: 'Git',        color: '#F05032' },
    'MongoDB':      { Icon: SiMongodb,     label: 'MongoDB',    color: '#47A248' },
    'PostgreSQL':   { Icon: SiPostgresql,  label: 'PostgreSQL', color: '#4169E1' },
    'Docker':       { Icon: SiDocker,      label: 'Docker',     color: '#2496ED' },
    'Vite':         { Icon: SiVite,        label: 'Vite',       color: '#646CFF' },
    'WordPress':    { Icon: SiWordpress,   label: 'WordPress',  color: '#21759B' },
};

const SkillTag = ({ skill }) => {
    const entry = SKILL_ICON_MAP[skill];
    if (!entry) return <span className="tag">{skill}</span>;

    const { Icon, label, color } = entry;
    return (
        <span className="tag tag-icon" title={label}>
            <Icon className="skill-icon" style={{ color }} />
            <span className="skill-label">{label}</span>
        </span>
    );
};

const About = () => {
    const skills = [
        { category: 'Languages',  items: ['Python', 'JavaScript', 'Java', 'SQL'] },
        { category: 'Frameworks', items: ['React', 'Node.js', 'Next.js', 'Spring Boot'] },
        { category: 'Data & AI',  items: [ 'Pandas', 'Matplotlib'] },
        { category: 'Tools',      items: ['Git', 'MongoDB', 'PostgreSQL', 'Docker', 'Vite', 'WordPress'] },
    ];

    return (
        <section id="about" className="about-section">
            <div className="about-container">

                {/* § header */}
                <div className="section-num-header">
                    <span className="section-sym">§</span>
                    <span className="section-num">01</span>
                    <span className="section-label">About</span>
                </div>

                <div className="about-grid">
                    {/* Left — bio */}
                    <div className="about-bio">
                        <h2 className="section-title">A bit about me</h2>

                        <p className="about-para">
                            I'm a third-year CS &amp; Mathematics student at the{' '}
                            <span className="chip chip-dark">University of Pittsburgh</span>. My focus is
                            building systems that solve real problems for real people, mostly on the
                            backend and infrastructure side. AI runs through most of that work, both as a
                            tool that makes systems smarter and as something I want to understand deeply.
                            Now I want to do that kind of work alongside people who care about doing it well.
                        </p>
                        <p className="about-para">
                            So far I've built everything from AI-powered compliance systems to workflow
                            automation tools. Right now I'm looking for{' '}
                            <span className="chip chip-accent">internships</span>{' '}
                            where I can work on hard problems across technology, data, and finance.
                        </p>

                    

                        {/* Education card */}
                        <div className="edu-card">
                            <div className="edu-icon">🎓</div>
                            <div>
                                <p className="edu-school">University of Pittsburgh</p>
                                <p className="edu-degree">
                                    B.S. Computer Science &amp; Mathematics
                                </p>
                                <p className="edu-period">Expected May 2028</p>
                            </div>
                        </div>
                    </div>

                    {/* Right — skills */}
                    <div className="about-skills">
                        {skills.map((group) => (
                            <div key={group.category} className="skill-group">
                                <p className="skill-category">{group.category}</p>
                                <div className="skill-tags">
                                    {group.items.map((skill) => (
                                        <SkillTag key={skill} skill={skill} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;
