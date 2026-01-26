import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

export default function Navbar() {
    const { theme, toggleTheme, isSpidey } = useTheme();

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <a href="#" className="logo">
                    SUSHI<span className="logo-dot">.</span>
                </a>

                <div className="nav-links">
                    <a onClick={() => scrollTo('about')}>About</a>
                    <a onClick={() => scrollTo('work')}>Work</a>
                    <a onClick={() => scrollTo('playground')}>Lab</a>
                    <a onClick={() => scrollTo('contact')}>Contact</a>
                </div>

                <button className="theme-toggle interactive" onClick={toggleTheme}>
                    <div className="toggle-track">
                        <span className="toggle-icon">🕷️</span>
                        <span className="toggle-icon">🦇</span>
                        <div className="toggle-thumb"></div>
                    </div>
                </button>
            </div>
        </nav>
    );
}
