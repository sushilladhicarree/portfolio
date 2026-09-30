import { useEffect, useRef } from 'react';
import { useTheme } from '../context/theme-state';
export default function Effects() {
    const { isSpidey, reducedMotion } = useTheme();
    const ref = useRef();
    useEffect(() => {
        if (isSpidey || reducedMotion) return;
        const canvas = ref.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let frame, last = 0;
        let visible = !document.hidden;
        const drops = Array.from({length:50},(_,i)=>({x:(i*317)%window.innerWidth,y:(i*173)%window.innerHeight,speed:80+(i%7)*20}));
        const resize = () => { canvas.width=window.innerWidth; canvas.height=window.innerHeight; };
        const animate = (now) => {
            const delta = Math.min((now-last)/1000,0.03); last=now;
            ctx.clearRect(0,0,canvas.width,canvas.height);
            if (visible) {
                ctx.strokeStyle='rgba(173,184,204,0.09)';ctx.lineWidth=1;ctx.beginPath();
                drops.forEach(drop=>{drop.y+=delta*drop.speed;if(drop.y>canvas.height)drop.y=-20;ctx.moveTo(drop.x,drop.y);ctx.lineTo(drop.x-3,drop.y+16);});ctx.stroke();
            }
            frame=requestAnimationFrame(animate);
        };
        const visibility = () => { visible=!document.hidden; };
        resize();window.addEventListener('resize',resize);document.addEventListener('visibilitychange',visibility);
        frame=requestAnimationFrame(animate);
        return ()=>{cancelAnimationFrame(frame);ctx.clearRect(0,0,canvas.width,canvas.height);window.removeEventListener('resize',resize);document.removeEventListener('visibilitychange',visibility);};
    }, [isSpidey,reducedMotion]);
    return <canvas ref={ref} className="rain-canvas" aria-hidden="true"/>;
}
