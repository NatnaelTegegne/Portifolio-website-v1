import Headshot from '../assets/Natnael_headshot.jpg';
import '../styles/Hero.css';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Hi, I'm <br />
                            <span className='hero-name'>Natnael Tegegne</span>
                        </h1>
                        <p className="hero-subtitle">
                            Computer Science & Mathematics Student | Software Developer
                        </p>
                        <p className="hero-description">
                            I’m a second-year student at the University of Pittsburgh studying Computer Science and Mathematics, 
                            interested in using technology and analytical thinking to solve real-world problems.
                        </p>
                        <div className="hero-buttons">
                            <a href="#projects" className="btn btn-primary">View Projects</a>
                            <a href="#contact" className="btn btn-secondary">Contact Me</a>
                        </div>
                    </div>
                    <div className="hero-side">
                        <div className="hero-status">
                            <div className="img-wrapper"><img src={Headshot} alt="Natnael_headshot" /></div>
                            <span className="status-indicator"></span>
                            <span className="status-indicator-text" >Available</span>
                        </div>
                        <div className="hero-symbols">
                            <span className="symbol">&lt;&gt;</span>
                            <span className="symbol">{"{ }"}</span>
                            <span className="symbol">&lt;/&gt;</span>
                            <span className="symbol">( )</span>
                        </div>
                    </div>
                </div>
                <div className="hero-social">
                    <a href="https://github.com/NatnaelTegegne" target='_blank'  rel="noopener noreferrer" className="social-link">
                        <FaGithub size={50}  className='icon' />
                    </a>
                    <a href="https://www.linkedin.com/in/natnael-tegegne-063204200" target='_blank'  rel="noopener noreferrer" className="social-link">
                        <FaLinkedin size={50}  className='icon' />
                    </a>
                    <a href="mailto:nat205@pitt.edu" target='_blank'  rel="noopener noreferrer" className="social-link">
                        <FaEnvelope size={50}  className='icon' />
                    </a>
                </div>
            </div>
        </section>
    )
};

export default Hero;