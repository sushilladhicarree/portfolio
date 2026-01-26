import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Cursor.css';

export default function Cursor() {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (cursor) {
                cursor.style.left = mouseX + 'px';
                cursor.style.top = mouseY + 'px';
            }
        };

        const animateFollower = () => {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            if (follower) {
                follower.style.left = followerX + 'px';
                follower.style.top = followerY + 'px';
            }
            
            requestAnimationFrame(animateFollower);
        };

        document.addEventListener('mousemove', handleMouseMove);
        animateFollower();

        // Hover effects
        const handleMouseEnter = () => {
            cursor?.classList.add('hover');
            follower?.classList.add('hover');
        };
        
        const handleMouseLeave = () => {
            cursor?.classList.remove('hover');
            follower?.classList.remove('hover');
        };

        const interactives = document.querySelectorAll('a, button, .interactive');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            interactives.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className={`cursor cursor-${theme}`} />
            <div ref={followerRef} className={`cursor-follower follower-${theme}`} />
        </>
    );
}
