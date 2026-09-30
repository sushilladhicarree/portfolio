import { motion as Motion } from 'framer-motion';
import { useTheme } from '../context/theme-state';
import { SpiderMark, BatMark } from './Icons';
export function Reveal({ children, className = '', delay = 0 }) {
    const { reducedMotion } = useTheme();
    return <Motion.div className={className} initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: reducedMotion ? 0 : 0.6, delay }}>{children}</Motion.div>;
}
export function Secret({ id, className = '' }) {
    const { collected, collect, isSpidey } = useTheme();
    const found = collected.includes(id);
    return <button className={'secret ' + (found ? 'found ' : '') + className} onClick={() => collect(id)} aria-label={(found ? 'Collected' : 'Collect') + ' secret ' + id + ' emblem'} title={found ? 'Secret collected' : 'Your spider-sense is tingling…'}>{isSpidey ? <SpiderMark /> : <BatMark />}</button>;
}
export function SectionHeading({ number, eyebrow, title, accent, children }) {
    return <Reveal className="section-heading"><div className="chapter"><span>{number}</span><span>{eyebrow}</span></div><div className="heading-row"><h2>{title} <span>{accent}</span></h2>{children}</div></Reveal>;
}
