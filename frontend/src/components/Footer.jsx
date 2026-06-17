import { FaGithub, FaLinkedin, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

import '../styles/Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-left">
                    <a href="#home" className="footer-logo">
                        <span className="logo-bracket">&lt;</span>NT<span className="logo-bracket">/&gt;</span>
                    </a>
                    <p className="footer-tagline">Building at the intersection of CS & Mathematics.</p>
                </div>

                <div className="footer-socials">
                    <a href="https://github.com/NatnaelTegegne" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="GitHub">
                        <FaGithub size={18} />
                    </a>
                    <a href="https://www.linkedin.com/in/natnael-tegegne" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
                        <FaLinkedin size={18} />
                    </a>
                    <a href="https://www.instagram.com/nattynatharious/" target="_blank" className="footer-social-link" aria-label="Email">
                        <FaInstagram size={20} />
                    </a>
                    <a href="https://www.tiktok.com/@nattynatharious" target="_blank" className="footer-social-link" aria-label="Email">
                        <FaTiktok size={20} />
                    </a>
                    <a href="https://www.youtube.com/@nattyNatharious" target="_blank" className="footer-social-link" aria-label="Email">
                        <FaYoutube size={20} />
                    </a>
                    <a href="mailto:natnaelbereta@gmail.com" target="_blank" className="footer-social-link" aria-label="Email">
                        <HiOutlineMail size={20} />
                    </a>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© {currentYear} Natnael Tegegne. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;