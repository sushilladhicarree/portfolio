import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/theme-state';
import { BatMark, Icon, SpiderMark, SplitMask } from './Icons';
import { Reveal, Secret, SectionHeading } from './Shared';

export default function Playground() {
    const { isSpidey, reducedMotion, notify, playSound } = useTheme();
    const [webPower, setWebPower] = useState(64);
    const [webShot, setWebShot] = useState(false);
    const [signalOn, setSignalOn] = useState(false);
    const [activeSkill, setActiveSkill] = useState('Flutter');
    const [angle, setAngle] = useState({x:0,y:0});
    const timer = useRef();
    const canvas = useRef();
    const shotCount = useRef(0);
    useEffect(() => () => clearTimeout(timer.current), []);
    useEffect(() => {
        const ctx = canvas.current.getContext('2d');
        if (!ctx) return;
        const width = canvas.current.width;
        const height = canvas.current.height;
        ctx.clearRect(0, 0, width, height);
        if (!webShot) return;
        ctx.strokeStyle = isSpidey ? '#f2eadd' : '#f7cd56';
        ctx.lineWidth = 1.5 + webPower / 80;
        const spokes = 10 + Math.round(webPower / 10);
        for (let i = 0; i < spokes; i++) {
            const theta = i / spokes * Math.PI * 2;
            ctx.beginPath(); ctx.moveTo(width/2, height/2); ctx.lineTo(width/2+Math.cos(theta)*width, height/2+Math.sin(theta)*height); ctx.stroke();
        }
        for (let ring = 1; ring <= 6; ring++) {
            ctx.beginPath();
            for (let i = 0; i <= spokes; i++) {
                const theta = i / spokes * Math.PI * 2;
                const radius = ring * 25;
                const x = width/2+Math.cos(theta)*radius, y=height/2+Math.sin(theta)*radius;
                if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
            }
            ctx.stroke();
        }
    }, [isSpidey, webPower, webShot]);
    const shoot = () => {
        clearTimeout(timer.current);
        setWebShot(true); playSound(900); shotCount.current++;
        if (shotCount.current===3) notify('Triple THWIP! Try typing “thwip” anywhere outside an input.');
        timer.current = setTimeout(() => setWebShot(false), 2200);
    };
    const skillDetails = {
        Flutter: ['Mobile, with intention.', 'Building app interfaces and interactions across mobile screens.'],
        Websites: ['From idea to browser.', 'Responsive frontend experiences with thoughtful structure and UI.'],
        'UI design': ['Details do the heavy lifting.', 'Layout, typography, components, and interaction design.'],
    };
    return <section id="playground" className="playground section">
        <div className="container"><SectionHeading number="04" eyebrow="R&D / AFTER HOURS" title={isSpidey ? 'Peter’s' : 'The Bat'} accent="lab."><p>A little playground for the curious.<br/>Go ahead. Push a button.</p></SectionHeading>
        <div className="lab-grid">
            <Reveal className="lab-card web-lab"><div className="lab-card-top"><span>01 / WEB-SHOOTER</span><Icon name="code" size={19}/></div><div className={'web-target ' + (webShot?'fired':'')}><canvas ref={canvas} width="500" height="320" aria-hidden="true"/>{!webShot && <><SpiderMark/><span>POINT. CLICK. THWIP.</span></>}<strong className="thwip-text">{webShot ? 'THWIP!' : ''}</strong><span className="target-corner tl"/><span className="target-corner br"/></div><div className="web-controls"><label htmlFor="web-power">WEB STRENGTH <strong>{webPower}%</strong></label><input id="web-power" type="range" min="10" max="100" value={webPower} onChange={e=>setWebPower(Number(e.target.value))}/><button className="button primary" onClick={shoot}>Fire the web <Icon name="arrow" size={16}/></button></div></Reveal>
            <Reveal className={'lab-card signal-lab ' + (signalOn?'signal-on':'')} delay={0.08}><div className="lab-card-top"><span>02 / THE BAT-SIGNAL</span><button className="switch" role="switch" aria-checked={signalOn} aria-label="Activate Bat-Signal" onClick={()=>{setSignalOn(!signalOn);playSound(220);}}><span/></button></div><div className="signal-sky"><div className="signal-beam"/><div className="signal-moon"><BatMark/></div><div className="skyline" aria-hidden="true">{Array.from({length:12},(_,i)=><i key={i} style={{height:(25+(i*17)%65)+'%'}}/>)}</div></div><div className="signal-caption"><h3>{signalOn ? 'Gotham is listening.' : 'The city needs a signal.'}</h3><p>Flip the switch. Bring a little light to the dark.</p></div><Secret id="lab"/></Reveal>
            <Reveal className="lab-card skill-lab" delay={0.12}><div className="lab-card-top"><span>03 / THE UTILITY BELT</span><Icon name="check" size={18}/></div><div className="skill-tabs" role="group" aria-label="Explore frontend skills">{Object.keys(skillDetails).map(skill=><button key={skill} aria-pressed={activeSkill===skill} className={activeSkill===skill?'active':''} onClick={()=>setActiveSkill(skill)}>{skill}</button>)}</div><div className="skill-detail"><span className="code-brackets">{activeSkill==='Flutter'?'✦':activeSkill==='Websites'?'</>':'Aa'}</span><h3>{skillDetails[activeSkill][0]}</h3><p>{skillDetails[activeSkill][1]}</p></div></Reveal>
            <Reveal className="lab-card tilt-lab" delay={0.16}><div className="lab-card-top"><span>04 / MULTIVERSE ID</span><span className="live-tag">INTERACTIVE</span></div><div className="tilt-area" onPointerMove={e=>{if(reducedMotion||e.pointerType==='touch')return;const rect=e.currentTarget.getBoundingClientRect();setAngle({x:-(e.clientY-rect.top-rect.height/2)/14,y:(e.clientX-rect.left-rect.width/2)/14});}} onPointerLeave={()=>setAngle({x:0,y:0})}><div className="identity-card" style={{transform:'rotateX('+angle.x+'deg) rotateY('+angle.y+'deg)'}}><div className="identity-header">SUSHI’S UNIVERSE <span>№ 001</span></div><SplitMask/><div className="identity-footer"><strong>SUSHIL ADHIKARI</strong><span>FRONTEND DEVELOPER / EARTH–NP</span><div className="barcode"/></div></div></div><p className="tilt-hint">HOVER TO SHIFT YOUR PERSPECTIVE</p></Reveal>
        </div><div className="lab-note"><span>CURIOUS MINDS FIND THE BEST EASTER EGGS.</span><span>Hint: five little emblems are hiding in plain sight.</span></div></div>
    </section>;
}
