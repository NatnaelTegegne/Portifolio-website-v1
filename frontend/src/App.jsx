import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

/**
 * Restores scroll position across route changes. Navigating to `/#projects`
 * from another page needs an explicit scroll — the browser only honours a hash
 * on a full page load, not on a client-side navigation.
 */
function useScrollBehaviour() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // The target section may not be mounted yet on a fresh navigation.
            const id = hash.slice(1);
            const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            scroll();
            const retry = setTimeout(scroll, 100);
            return () => clearTimeout(retry);
        }
        window.scrollTo(0, 0);
    }, [pathname, hash]);
}

function App() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    useScrollBehaviour();

    return (
        <>
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <Outlet />
            <Footer />
        </>
    );
}

export default App;
