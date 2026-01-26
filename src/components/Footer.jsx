import { useTheme } from '../context/ThemeContext';
import './Footer.css';

export default function Footer() {
    const { isSpidey } = useTheme();

    return (
        <footer className="footer">
            <div className="container footer-inner">
                <p className="footer-text">
                    © 2025 Sushil Adhikari. 
                    {isSpidey 
                        ? ' Made with great responsibility.'
                        : ' Built in the shadows.'}
                </p>
                <div className="footer-easter">
                    {isSpidey ? '🕸️' : '🦇'}
                </div>
            </div>
        </footer>
    );
}
