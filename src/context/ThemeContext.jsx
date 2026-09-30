import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ThemeContext } from './theme-state';

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const subscribeMotion = (callback) => {
    motionQuery.addEventListener('change', callback);
    return () => motionQuery.removeEventListener('change', callback);
};

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        try { return localStorage.getItem('sushi-theme') === 'batman' ? 'batman' : 'spidey'; }
        catch { return 'spidey'; }
    });
    const [motionPaused, setMotionPaused] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [collected, setCollected] = useState([]);
    const [toast, setToast] = useState('');
    const timer = useRef();
    const audio = useRef();
    const prefersReducedMotion = useSyncExternalStore(subscribeMotion, () => motionQuery.matches);
    const reducedMotion = prefersReducedMotion || motionPaused;

    const notify = useCallback((message) => {
        clearTimeout(timer.current);
        setToast(message);
        timer.current = setTimeout(() => setToast(''), 4000);
    }, []);

    const playSound = useCallback((frequency = 440) => {
        if (!soundEnabled) return;
        try {
            const AudioEngine = window.AudioContext || window.webkitAudioContext;
            audio.current ??= new AudioEngine();
            void audio.current.resume().catch(() => {});
            const oscillator = audio.current.createOscillator();
            const gain = audio.current.createGain();
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(frequency, audio.current.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(frequency / 3, audio.current.currentTime + 0.16);
            gain.gain.setValueAtTime(0.055, audio.current.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audio.current.currentTime + 0.2);
            oscillator.connect(gain).connect(audio.current.destination);
            oscillator.start();
            oscillator.stop(audio.current.currentTime + 0.21);
        } catch { /* Sound is an optional enhancement. */ }
    }, [soundEnabled]);

    const toggleTheme = useCallback(() => {
        setTheme((current) => current === 'spidey' ? 'batman' : 'spidey');
        playSound(660);
    }, [playSound]);

    const collect = (id) => {
        if (collected.includes(id)) { notify('Already collected. Keep exploring.'); return; }
        const next = [...collected, id];
        setCollected(next);
        playSound(880);
        notify(next.length === 5 ? '5/5 · Multiverse unlocked. Great power. Great frontend.' : next.length + '/5 · Secret found. Your spider-sense is working.');
    };

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        try { localStorage.setItem('sushi-theme', theme); } catch { /* Storage may be unavailable. */ }
    }, [theme]);

    useEffect(() => {
        let typed = '';
        let sequence = [];
        const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        const handleKey = (event) => {
            if (event.target.closest('input, textarea, select, [contenteditable="true"]') || event.ctrlKey || event.metaKey || event.altKey) return;
            const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
            if (key === 'g') toggleTheme();
            typed = (typed + key).slice(-5);
            if (typed === 'thwip') { notify('THWIP! Friendly neighborhood developer, reporting for duty.'); playSound(1000); }
            sequence = [...sequence, key].slice(-10);
            if (sequence.join(',') === konami.join(',')) {
                setCollected(['hero', 'about', 'work', 'lab', 'contact']);
                notify('Secret code accepted. Welcome to the multiverse.');
                playSound(1200);
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [notify, playSound, toggleTheme]);

    useEffect(() => () => {
        clearTimeout(timer.current);
        if (audio.current) void audio.current.close().catch(() => {});
    }, []);

    return <ThemeContext.Provider value={{ theme, toggleTheme, isSpidey: theme === 'spidey', reducedMotion, motionPaused, setMotionPaused, soundEnabled, setSoundEnabled, collected, collect, toast, notify, playSound }}>{children}</ThemeContext.Provider>;
}
