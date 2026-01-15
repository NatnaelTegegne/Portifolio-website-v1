import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}> {/*if the page is scrolled the class name is "navbar scrolled", if not "navbar" */}
            <div className="navbar-container">
                <a href="#home" className='navbar-logo'>Natnael-Dev</a>
                {/* Hamburger Menu*/}
                <div className="menu-icon" onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>

                <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
                    <li className='nav-item'><a href="#about" className="nav-link" onClick={toggleMenu}>About</a></li>
                    <li className='nav-item'><a href="#projects" className="nav-link" onClick={toggleMenu}>Projects</a></li>
                    <li className='nav-item'><a href="#experience" className="nav-link" onClick={toggleMenu}>Experience</a></li>
                    {/* <li className='nav-item'><a href="#blogs" className="nav-link" onClick={toggleMenu}>Blogs</a></li> */}
                    <li className='nav-item'><a href="#contact" className="nav-link" onClick={toggleMenu}>Contact</a></li>
                </ul>

                {/* Desktop nav-bar */}
                <ul className="navbar-menu">
                    <li><a href="#about">About</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#experience">Experience</a></li>
                    {/* <li><a href="#blogs">Blogs</a></li> */}
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;