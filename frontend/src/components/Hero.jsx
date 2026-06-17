import Headshot from "../assets/Natnael_headshot.jpg";
import "../styles/Hero.css";
import { FaLinkedin, FaGithub, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const Hero = () => {
  return (
    <section id="home" className="hero">
      {/* Hairline rules */}
      <div className="hero-lines" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="hero-line" />
        ))}
      </div>

      <div className="hero-container">
        {/* Left — text */}
        <div className="hero-left">
          <h1 className="hero-heading">
            Natnael
            <br />
            <span className="hero-name-accent">Tegegne</span>
            <span className="cursor-blink">|</span>
          </h1>

          {/* Key info lines — matching the reference style */}
          <div className="hero-meta">
            <p className="hero-meta-line">
              CS &amp; Mathematics <span className="meta-sep">@</span>{" "}
              <span className="chip chip-dark">University of Pittsburgh</span>
            </p>
            <p className="hero-meta-line meta-muted">
              // Pittsburgh, PA &nbsp;&nbsp; // open to Internships
            </p>
            <p className="hero-meta-line meta-muted">
              // building at the intersection of{" "}
              <span className="chip chip-accent">math, tech &amp; AI</span>
            </p>
          </div>

          {/* CTA buttons */}
          <div className="hero-actions">
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn-secondary">
              Get in touch
            </a>
          </div>

          {/* Social icons */}
          <div className="hero-socials">
            <a
              href="https://github.com/NatnaelTegegne"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/natnael-tegegne"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://www.instagram.com/nattynatharious/"
              className="footer-social-link"
              aria-label="Email"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.tiktok.com/@nattynatharious"
              className="footer-social-link"
              aria-label="Email"
            >
              <FaTiktok size={20} />
            </a>
            <a
              href="https://www.youtube.com/@nattyNatharious"
              className="footer-social-link"
              aria-label="Email"
            >
              <FaYoutube size={20} />
            </a>
            <a
              href="mailto:natnaelbereta@gmail.com"
              className="social-icon"
              aria-label="Email"
            >
              <HiOutlineMail size={20} />
            </a>
          </div>
        </div>

        {/* Right — photo with floating cards */}
        <div className="hero-right">
          <div className="hero-photo-wrapper">
            <img src={Headshot} alt="Natnael Tegegne" className="hero-photo" />
            {/* Floating decorative cards */}
            <div className="hero-card card-top">
              <span className="card-icon">{}</span>
              <span>Full-Stack Dev</span>
            </div>
            <div className="hero-card card-bottom">
              <span className="card-icon">∑</span>
              <span>CS &times; Math</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="hero-divider" />
    </section>
  );
};

export default Hero;
