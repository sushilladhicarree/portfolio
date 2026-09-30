import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/theme-state';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Playground from './components/Playground';
import Contact from './components/Contact';
import Effects from './components/Effects';
import Footer from './components/Footer';
import './App.css';
function Portfolio() {
    const { theme, reducedMotion, collected, toast } = useTheme();
    return <div className={'app theme-' + theme + (reducedMotion ? ' motion-paused' : '') + (collected.length === 5 ? ' multiverse' : '')}>
        <a className="skip-link" href="#main">Skip to content</a><Navbar />
        <main id="main"><Hero /><About /><Work /><Playground /><Contact /></main>
        <Footer /><Effects />
        <div className={'toast ' + (toast ? 'visible' : '')} role="status" aria-live="polite">{toast}</div>
    </div>;
}
export default function App() { return <ThemeProvider><Portfolio /></ThemeProvider>; }
