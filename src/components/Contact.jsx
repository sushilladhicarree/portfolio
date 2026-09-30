import { useState } from 'react';
import { useTheme } from '../context/theme-state';
import { BatMark, Icon, SpiderMark } from './Icons';
import { Reveal, Secret } from './Shared';

export default function Contact() {
    const { isSpidey } = useTheme();
    const [copied, setCopied] = useState(false);
    const [status, setStatus] = useState('');
    const copyEmail = async () => {
        try { await navigator.clipboard.writeText('sushilforwork@gmail.com'); setCopied(true); setStatus('Email address copied.'); }
        catch { setStatus('Select and copy the email address below, or use the email link.'); }
    };
    return <section id="contact" className="contact section"><div className="container">
        <Reveal className="contact-inner"><div className="chapter"><span>05</span><span>THE NEXT CHAPTER STARTS WITH YOU</span></div><div className="contact-heading"><h2>GOT A MISSION?<br/>LET’S <span>TEAM UP.</span></h2><div className="contact-emblem">{isSpidey ? <SpiderMark/> : <BatMark/>}<span>YOUR FRIENDLY<br/>NEIGHBORHOOD COLLABORATOR.</span></div></div>
        <div className="contact-bottom"><div><p>A new app, a website, or an idea that won’t leave you alone.<br/>Let’s build something worth putting into the world.</p><a className="contact-email" href="mailto:sushilforwork@gmail.com">sushilforwork@gmail.com <Icon size={27}/></a><button className="copy-email" onClick={copyEmail}><Icon name={copied?'check':'copy'} size={14}/>{copied?'Email copied':'Copy email'}</button><span className="copy-status" role="status">{status}</span></div><div className="social-links">{[['LinkedIn','https://www.linkedin.com/in/sushilladhicarree/'],['Instagram','https://www.instagram.com/sushill_adhicarree/'],['Facebook','https://www.facebook.com/sushilladhicarree/']].map(([name,url])=><a key={name} href={url} target="_blank" rel="noreferrer">{name}<Icon size={17}/></a>)}</div></div><Secret id="contact" className="contact-secret"/></Reveal>
    </div></section>;
}
