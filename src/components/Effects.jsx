import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Effects.css';

export default function Effects() {
    const { theme, isTransitioning, isBatman } = useTheme();
    const canvasRef = useRef(null);
    const rainRef = useRef([]);
    const animationRef = useRef(null);
    const [showFlash, setShowFlash] = useState(false);
    const [flyingBats, setFlyingBats] = useState([]);

    // Setup canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    // Rain effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Initialize rain drops
        if (isBatman && rainRef.current.length === 0) {
            rainRef.current = Array.from({ length: 250 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                length: Math.random() * 20 + 10,
                speed: Math.random() * 15 + 10
            }));
        }
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            if (isBatman) {
                ctx.strokeStyle = 'rgba(174, 194, 224, 0.5)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                
                rainRef.current.forEach(drop => {
                    drop.y += drop.speed;
                    if (drop.y > canvas.height) {
                        drop.y = -drop.length;
                        drop.x = Math.random() * canvas.width;
                    }
                    ctx.moveTo(drop.x, drop.y);
                    ctx.lineTo(drop.x + 0.5, drop.y + drop.length);
                });
                
                ctx.stroke();
            }
            
            animationRef.current = requestAnimationFrame(animate);
        };
        
        animate();
        
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isBatman]);

    // Lightning effect
    useEffect(() => {
        if (!isBatman) return;
        
        const flash = () => {
            if (!isBatman) return;
            
            setShowFlash(true);
            setTimeout(() => setShowFlash(false), 100);
            setTimeout(() => {
                setShowFlash(true);
                setTimeout(() => setShowFlash(false), 80);
            }, 150);
            
            // Schedule next flash
            setTimeout(flash, Math.random() * 10000 + 5000);
        };
        
        const timeout = setTimeout(flash, 3000);
        return () => clearTimeout(timeout);
    }, [isBatman]);

    // Periodic flying bats
    useEffect(() => {
        if (!isBatman) {
            setFlyingBats([]);
            return;
        }
        
        const spawnBat = () => {
            if (!isBatman) return;
            
            const id = Date.now();
            const bat = {
                id,
                top: Math.random() * 60 + 10,
                duration: Math.random() * 2 + 3
            };
            
            setFlyingBats(prev => [...prev, bat]);
            
            // Remove after animation
            setTimeout(() => {
                setFlyingBats(prev => prev.filter(b => b.id !== id));
            }, bat.duration * 1000 + 500);
            
            // Schedule next bat
            setTimeout(spawnBat, Math.random() * 8000 + 4000);
        };
        
        const timeout = setTimeout(spawnBat, 2000);
        return () => clearTimeout(timeout);
    }, [isBatman]);

    // Transition bats (when switching to Batman)
    const [transitionBats, setTransitionBats] = useState([]);
    
    useEffect(() => {
        if (isTransitioning && theme === 'spidey') {
            // Spawning bats for transition TO batman
            const bats = Array.from({ length: 40 }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                delay: i * 20,
                size: Math.random() * 30 + 15
            }));
            setTransitionBats(bats);
            
            setTimeout(() => setTransitionBats([]), 1500);
        }
    }, [isTransitioning]);

    return (
        <>
            {/* Rain Canvas */}
            <canvas ref={canvasRef} className="effects-canvas" />
            
            {/* Lightning Flash */}
            <div className={`lightning-flash ${showFlash ? 'active' : ''}`} />
            
            {/* Flying Bats (Periodic) */}
            <div className="flying-bats-container">
                {flyingBats.map(bat => (
                    <div 
                        key={bat.id}
                        className="flying-bat"
                        style={{
                            top: `${bat.top}%`,
                            animationDuration: `${bat.duration}s`
                        }}
                    >
                        🦇
                    </div>
                ))}
            </div>
            
            {/* Transition Bats */}
            <div className="transition-overlay">
                {transitionBats.map(bat => (
                    <div
                        key={bat.id}
                        className="transition-bat"
                        style={{
                            left: `${bat.left}%`,
                            animationDelay: `${bat.delay}ms`,
                            fontSize: `${bat.size}px`
                        }}
                    >
                        🦇
                    </div>
                ))}
            </div>
            
            {/* Spider Webs (Spidey mode) */}
            <svg className="web-corner web-top-left" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <g stroke="currentColor" strokeWidth="1" fill="none">
                    <path d="M0,0 Q100,50 200,0"/>
                    <path d="M0,0 Q50,100 0,200"/>
                    <path d="M0,0 L200,200"/>
                    <path d="M0,0 Q80,80 160,160"/>
                    <path d="M0,0 Q40,80 80,160"/>
                    <path d="M0,0 Q80,40 160,80"/>
                    <ellipse cx="30" cy="30" rx="25" ry="25"/>
                    <ellipse cx="50" cy="50" rx="45" ry="45"/>
                    <ellipse cx="75" cy="75" rx="70" ry="70"/>
                    <ellipse cx="100" cy="100" rx="95" ry="95"/>
                </g>
            </svg>
            
            <svg className="web-corner web-top-right" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <g stroke="currentColor" strokeWidth="1" fill="none">
                    <path d="M200,0 Q100,50 0,0"/>
                    <path d="M200,0 Q150,100 200,200"/>
                    <path d="M200,0 L0,200"/>
                    <ellipse cx="170" cy="30" rx="25" ry="25"/>
                    <ellipse cx="150" cy="50" rx="45" ry="45"/>
                    <ellipse cx="125" cy="75" rx="70" ry="70"/>
                </g>
            </svg>
        </>
    );
}
