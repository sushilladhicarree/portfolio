import { useTheme } from '../context/ThemeContext';
import './Contact.css';

export default function Contact() {
    const { isSpidey } = useTheme();

    return (
        <section id="contact" className="contact section">
            <div className="container contact-container">
                <h2 className="section-title">
                    {isSpidey ? 'Send a Web Signal' : 'Light the Signal'}
                </h2>
                
                <p className="contact-text">
                    {isSpidey 
                        ? "Got a mission? Let's team up and save the web together!"
                        : "Gotham needs saving. Your project needs designing. Let's talk."}
                </p>
                
                <a href="mailto:sushilforwork@gmail.com" className="contact-email interactive">
                    sushilforwork@gmail.com
                </a>
                
                <div className="social-links">
                    <a href="#" className="social-link interactive">Dribbble</a>
                    <a href="#" className="social-link interactive">LinkedIn</a>
                    <a href="#" className="social-link interactive">Twitter</a>
                </div>
            </div>
        </section>
    );
}
