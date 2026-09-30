import { useTheme } from '../context/theme-state';
import { Icon, SpiderMark, BatMark } from './Icons';
import { Reveal, Secret, SectionHeading } from './Shared';

export default function About() {
    const { isSpidey } = useTheme();
    return <section id="about" className="about section container">
        <SectionHeading number="02" eyebrow="THE ORIGIN STORY" title="Behind the" accent="mask."><p>No radioactive spiders.<br/>Just curiosity, craft, and code.</p></SectionHeading>
        <div className="about-grid">
            <Reveal className="portrait-column">
                <div className="portrait-frame"><img src="/images/sushil-reference.jpg" alt="Sushil Adhikari" width="480" height="480" loading="lazy"/><div className="portrait-red"/><span className="photo-index">FIG. 01 / THE HUMAN</span><span className="portrait-stamp">{isSpidey ? <SpiderMark/> : <BatMark/>}</span></div>
                <span className="portrait-note">Sushil, without the secret identity.</span><Secret id="about" className="about-secret"/>
            </Reveal>
            <Reveal className="about-copy" delay={0.12}>
                <div className="eyebrow">SUSHIL ADHIKARI · FRONTEND DEVELOPER</div>
                <h3>Some people wear capes.<br/>I build <em>interfaces.</em></h3>
                <p>I’m a frontend developer based in Pokhara, Nepal. I work across Flutter apps, websites, design, and UI—bringing the visual side and the technical side together.</p>
                <p>At <a href="https://yarsahimalaya.com/" target="_blank" rel="noreferrer">Yarsa Himalaya <Icon size={13}/></a>, I’m the team’s first hire. I’m also a Pokhara University graduate, with a personal creative philosophy that fits in three words:</p>
                <div className="three-words"><span>Draw.</span><span>Design.</span><span>Develop.</span></div>
                <div className="about-facts"><div><span>HOME BASE</span><strong><Icon name="pin" size={15}/> Pokhara, Nepal</strong></div><div><span>CURRENT CHAPTER</span><strong>Frontend @ Yarsa Himalaya</strong></div></div>
                <a className="text-link" href="https://www.linkedin.com/in/sushilladhicarree/" target="_blank" rel="noreferrer">More of my story on LinkedIn <Icon size={17}/></a>
            </Reveal>
        </div>
        <Reveal className="superpowers">
            {[['01', 'The builder', 'Flutter & frontend', 'Interfaces that move from a small screen to the web without losing their personality.', 'code'], ['02', 'The thinker', 'Design & UI', 'Clear visual hierarchies, purposeful interactions, and the details that make an interface feel right.', 'check'], ['03', 'The explorer', 'Creative experiments', 'A space for motion, 3D, and ideas that deserve to make it out of the sketchbook.', 'arrow']].map(([n, label, title, description, icon]) => <div className="power-card" key={n}><div><span>{n} / {label}</span><Icon name={icon}/></div><h4>{title}</h4><p>{description}</p></div>)}
        </Reveal>
    </section>;
}
