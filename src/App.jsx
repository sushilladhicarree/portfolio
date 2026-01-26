import { ThemeProvider } from './context/ThemeContext';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Playground from './components/Playground';
import Contact from './components/Contact';
import Effects from './components/Effects';
import Footer from './components/Footer';
import './App.css';

function App() {
    return (
        <ThemeProvider>
            <div className="app">
                <Cursor />
                <Effects />
                <Navbar />
                <main>
                    <Hero />
                    <About />
                    <Work />
                    <Playground />
                    <Contact />
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default App;
