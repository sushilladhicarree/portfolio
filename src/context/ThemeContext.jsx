import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

export const THEMES = {
    SPIDEY: 'spidey',
    BATMAN: 'batman'
};

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(THEMES.SPIDEY);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        document.body.className = `theme-${theme}`;
    }, [theme]);

    // Sound effect function (optional, plays if audio files exist)
    const playSound = useCallback((soundType) => {
        try {
            const sounds = {
                toSpidey: '/sounds/thwip.mp3',
                toBatman: '/sounds/bat-screech.mp3'
            };
            
            const audio = new Audio(sounds[soundType]);
            audio.volume = 0.3;
            audio.play().catch(() => {
                // Silently fail if sound doesn't exist
            });
        } catch {
            // Sound not available
        }
    }, []);

    const toggleTheme = useCallback(() => {
        if (isTransitioning) return;
        
        setIsTransitioning(true);
        
        const newTheme = theme === THEMES.SPIDEY ? THEMES.BATMAN : THEMES.SPIDEY;
        
        // Play sound
        playSound(newTheme === THEMES.SPIDEY ? 'toSpidey' : 'toBatman');
        
        // After transition animation
        setTimeout(() => {
            setTheme(newTheme);
            setIsTransitioning(false);
        }, 800);
    }, [isTransitioning, theme, playSound]);

    return (
        <ThemeContext.Provider value={{ 
            theme, 
            toggleTheme, 
            isTransitioning,
            isSpidey: theme === THEMES.SPIDEY,
            isBatman: theme === THEMES.BATMAN
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}
