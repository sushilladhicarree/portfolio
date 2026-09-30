import { useState } from 'react';
import { useTheme } from '../context/theme-state';
import { Icon, SpiderMark, BatMark } from './Icons';
export default function Navbar() {
    const { isSpidey, toggleTheme, soundEnabled, setSoundEnabled, motionPaused, setMotionPaused } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    return <header className="navbar"><div className="nav-inner">
        <a href="#hero" className="brand" aria-label="Sushil Adhikari, home"><span className="brand-symbol">{isSpidey ? <SpiderMark /> : <BatMark />}</span><span>SUSHI<span className="brand-period">.</span><small>DRAW / DESIGN / DEVELOP</small></span></a>
        <nav aria-label="Main navigation" id="main-nav" className={'nav-links ' + (menuOpen ? 'open' : '')}>
            {[['about', 'Origin story'], ['work', 'The work'], ['playground', 'The lab']].map(([id, label]) => <a key={id} href={'#' + id} onClick={() => setMenuOpen(false)}>{label}</a>)}
            <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <Icon size={14}/></a>
        </nav>
        <div className="nav-controls">
            <button className="icon-button desktop-control" aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'} aria-pressed={soundEnabled} onClick={() => setSoundEnabled(!soundEnabled)}><Icon name={soundEnabled ? 'sound' : 'mute'} size={17}/></button>
            <button className="icon-button desktop-control" aria-label={motionPaused ? 'Resume animations' : 'Pause animations'} aria-pressed={motionPaused} onClick={() => setMotionPaused(!motionPaused)}><Icon name={motionPaused ? 'play' : 'pause'} size={16}/></button>
            <button className="theme-toggle" onClick={toggleTheme} aria-label={'Switch to ' + (isSpidey ? 'Batman' : 'Spider-Man') + ' theme'} title="Switch universe · G"><span className={isSpidey ? 'active' : ''}><SpiderMark/></span><span className={!isSpidey ? 'active' : ''}><BatMark/></span></button>
            <button className="icon-button mobile-menu" aria-expanded={menuOpen} aria-controls="main-nav" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'}/></button>
        </div>
    </div></header>;
}
