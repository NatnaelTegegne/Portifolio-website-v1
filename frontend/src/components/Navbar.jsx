import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { HiOutlineExternalLink } from 'react-icons/hi';
import '../styles/Navbar.css';

const navLinks = [
    { to: '/#about',      label: 'about'      },
    { to: '/#projects',   label: 'projects'   },
    { to: '/#experience', label: 'experience' },
    { to: '/blog',        label: 'blog'       },
    { to: '/#contact',    label: 'contact'    },
];

const Navbar = ({ theme, toggleTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const { pathname } = useLocation();

    const isHome = pathname === '/';

    const toggleMenu = () => setIsOpen(prev => !prev);
    const closeMenu = () => setIsOpen(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Section tracking only means anything on the one-page home route.
            if (!isHome) return;
            const sections = ['home', 'about', 'projects', 'experience', 'contact'];
            let current = 'home';
            for (const id of sections) {
                const el = document.getElementById(id);
                if (el && window.scrollY >= el.offsetTop - 100) current = id;
            }
            setActiveSection(current);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHome]);

    // Close the mobile menu whenever navigation actually happens.
    useEffect(() => { setIsOpen(false); }, [pathname]);

    const isActive = (to) => {
        if (to.startsWith('/#')) return isHome && activeSection === to.slice(2);
        return pathname === to || pathname.startsWith(`${to}/`);
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-inner">

                {/* Left — code bracket logo */}
                <Link to="/" className="navbar-logo" onClick={closeMenu}>
                    <span className="logo-bracket">&lt;</span>
                    NT
                    <span className="logo-bracket">/&gt;</span>
                </Link>

                {/* Center — nav links (desktop) */}
                <ul className="nav-links-desktop">
                    {navLinks.map(link => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
                            >
                                {link.label}
                            </Link>
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
                        <li key={link.to}>
                            <Link to={link.to} className="mobile-nav-link" onClick={closeMenu}>
                                {link.label}
                            </Link>
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
