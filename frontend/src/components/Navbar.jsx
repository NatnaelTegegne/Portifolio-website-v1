import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

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