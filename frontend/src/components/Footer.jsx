import { FaGithub, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <p className="footer-name">Natnael-Dev</p>
                    </div>
                    <div className="footer-links">
                        <a href="https://github.com/NatnaelTegegne" target="_blank" rel="noopener noreferrer" className="footer-link">
                            <FaGithub size={30} />
                        </a>
                        <a href="https://www.linkedin.com/in/natnael-tegegne-063204200" target="_blank" rel="noopener noreferrer" className="footer-link">
                            <FaLinkedin size={30} />
                        </a>
                        <a href="mailto:nat205@pitt.edu" target="_blank" rel="noopener noreferrer" className="footer-link">
                            <FaEnvelope size={30} />
                        </a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {currentYear} Natnael Tegegne. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};


export default Footer;