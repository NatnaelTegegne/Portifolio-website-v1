import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { HiOutlineExternalLink } from 'react-icons/hi';
import '../styles/Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const toggleMenu = () => setIsOpen(prev => !prev);
    const closeMenu = () => setIsOpen(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
            const sections = ['home', 'about', 'projects', 'experience', 'contact'];
            let current = 'home';
            for (const id of sections) {
                const el = document.getElementById(id);
                if (el && window.scrollY >= el.offsetTop - 100) current = id;
            }
            setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '#about',      label: 'about'      },
        { href: '#projects',   label: 'projects'   },
        { href: '#experience', label: 'experience' },
        { href: '#contact',    label: 'contact'    },
    ];

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-inner">

                {/* Left — code bracket logo */}
                <a href="#home" className="navbar-logo" onClick={closeMenu}>
                    <span className="logo-bracket">&lt;</span>
                    NT
                    <span className="logo-bracket">/&gt;</span>
                </a>

                {/* Center — nav links (desktop) */}
                <ul className="nav-links-desktop">
                    {navLinks.map(link => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Right — resume + theme + hamburger */}
                <div className="nav-controls">
                    <a
                        href=""
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-btn"
                        aria-label="Open resume"
                    >
                        resume <HiOutlineExternalLink size={13} />
                    </a>
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? <FaMoon size={14} /> : <FaSun size={14} />}
                    </button>
                    <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
                        {isOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                <ul className="mobile-nav-links">
                    {navLinks.map(link => (
                        <li key={link.href}>
                            <a href={link.href} className="mobile-nav-link" onClick={closeMenu}>
                                {link.label}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a href="https://drive.google.com/your-resume-link" target="_blank" rel="noopener noreferrer" className="mobile-nav-link" onClick={closeMenu}>
                            resume ↗
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;