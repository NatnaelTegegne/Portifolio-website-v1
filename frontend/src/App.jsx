import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

/**
 * Handles scrolling across route changes. Navigating to `/#projects` from
 * another page needs an explicit scroll — the browser only honours a hash on a
 * full page load, not on a client-side navigation.
 */
function useScrollBehaviour() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (!hash) {
            // `behavior: 'instant'` is required here. index.css sets a global
            // `scroll-behavior: smooth`, which turns this into an animation that
            // the route's own re-render then interrupts — leaving the new page
            // scrolled to wherever the previous one was.
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            return;
        }

        // Sections fetch their content from Sanity after mounting, so the
        // target's offset keeps moving while images and cards fill in. One
        // scroll isn't enough on a cold load; re-correct as the layout settles.
        const id = hash.slice(1);
        let cancelled = false;
        const cancel = () => { cancelled = true; };

        // Respect the user: if they start scrolling, stop yanking the page.
        window.addEventListener('wheel', cancel, { passive: true, once: true });
        window.addEventListener('touchmove', cancel, { passive: true, once: true });

        const timers = [0, 150, 400].map((delay) =>
            setTimeout(() => {
                if (cancelled) return;
                document.getElementById(id)?.scrollIntoView({
                    // Animate the first hop (nice for in-page nav clicks), then
                    // snap for the corrections so they aren't visibly jumpy.
                    behavior: delay === 0 ? 'smooth' : 'instant',
                });
            }, delay)
        );

        return () => {
            timers.forEach(clearTimeout);
            window.removeEventListener('wheel', cancel);
            window.removeEventListener('touchmove', cancel);
        };
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
