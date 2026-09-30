import { Component, lazy, Suspense } from 'react';
import { useTheme } from '../context/theme-state';
import { Icon, SplitMask } from './Icons';
import { Secret } from './Shared';
const ThreeDScene = lazy(() => import('./ThreeDScene'));
class SceneBoundary extends Component {
    state = { failed: false };
    static getDerivedStateFromError() { return { failed: true }; }
    render() { return this.state.failed ? this.props.fallback : this.props.children; }
}
export default function Hero() {
    const { isSpidey, reducedMotion } = useTheme();
    const fallback = <SplitMask className="mask-fallback" />;
    return <section id="hero" className="hero container">
        <div className="hero-meta"><span>THE PORTFOLIO OF SUSHIL ADHIKARI</span><span><span className="status-dot"/> BASED IN POKHARA, NEPAL</span></div>
        <div className="hero-grid">
            <div className="hero-copy">
                <div className="issue-tag"><span>ISSUE No. 001</span><span>{isSpidey ? 'YOUR FRIENDLY NEIGHBORHOOD' : 'FROM THE SHADOWS OF GOTHAM'}</span></div>
                <h1><span>{isSpidey ? 'CREATIVE' : 'DARK KNIGHT'}</span><span className="hero-accent">FRONTEND</span><span className="outline-type">DEVELOPER<span className="title-dot">.</span></span></h1>
                <div className="hero-description"><span className="red-rule"/><p>I’m <strong>Sushil Adhikari</strong>. I turn ideas into interfaces that feel as good as they look. Flutter apps, thoughtful websites, and a little superhero energy.</p></div>
                <div className="hero-actions"><a className="button primary" href="#work">Explore my universe <Icon/></a><a className="text-link" href="#about">Meet the human <Icon name="down" size={16}/></a></div>
                <a className="employer" href="https://yarsahimalaya.com/" target="_blank" rel="noreferrer"><span className="employer-avatar">YH</span><span>Currently building at<strong>Yarsa Himalaya <Icon size={12}/></strong></span><span className="employer-badge">FIRST HIRE</span></a>
            </div>
            <div className="hero-art">
                <div className="art-frame"><div className="art-halftone"/><div className="art-sun"/><div className="art-topline"><span>ONE HUMAN. TWO UNIVERSES.</span><span>SA—01</span></div>
                    <div className="three-scene" role="img" aria-label="Interactive 3D mask combining a red webbed Spider-Man side and a black Batman cowl"><SceneBoundary fallback={fallback}><Suspense fallback={fallback}><ThreeDScene reducedMotion={reducedMotion}/></Suspense></SceneBoundary></div>
                    <div className="art-grid"/><div className="art-caption"><span>DRAW. DESIGN. DEVELOP.</span><span>EST. IN NEPAL</span></div>
                </div>
                <div className="sticker sticker-yellow">GREAT POWER.<br/>GREAT FRONTEND.</div>
                <div className="art-speech">{isSpidey ? 'THWIP!' : 'I AM THE UI.'}<span/></div>
                <div className="art-label"><span className="crosshair">+</span> MOVE YOUR CURSOR. MEET THE MULTIVERSE.</div>
                <Secret id="hero" className="hero-secret" />
            </div>
        </div>
        <div className="hero-bottom"><a href="#about"><span className="scroll-circle"><Icon name="down" size={17}/></span> SCROLL TO THE NEXT CHAPTER</a><span>DESIGNED WITH INTENTION. BUILT WITH RESPONSIBILITY.</span><span className="hero-page">01 / 05</span></div>
        <div className="ticker" aria-hidden="true"><div>{[0, 1].map(i => <span key={i}>FLUTTER <i>✳</i> FRONTEND <i>✳</i> UI DESIGN <i>✳</i> CREATIVE DEVELOPMENT <i>✳</i> WITH GREAT POWER <i>✳</i> </span>)}</div></div>
    </section>;
}
