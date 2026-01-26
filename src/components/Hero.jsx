import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import './Hero.css';

export default function Hero() {
    const { isSpidey } = useTheme();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 60, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12
            }
        }
    };

    const titleVariants = {
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 80,
                damping: 15
            }
        }
    };

    return (
        <section className="hero" id="hero">
            <div className="hero-bg-glow"></div>
            
            <motion.div 
                className="container hero-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.p 
                    className="hero-tagline"
                    variants={itemVariants}
                >
                    {isSpidey 
                        ? 'Friendly Neighborhood Designer' 
                        : 'The Dark Knight of UX'}
                </motion.p>
                
                <motion.h1 
                    className="hero-title"
                    variants={titleVariants}
                >
                    <motion.span 
                        className="title-line glitch-text" 
                        data-text="SUSHIL"
                        whileHover={{ 
                            scale: 1.02,
                            textShadow: isSpidey 
                                ? '6px 6px 0 #E23636, 12px 12px 0 #1E3A8A'
                                : '0 0 60px rgba(255, 230, 0, 0.3)'
                        }}
                    >
                        SUSHIL
                    </motion.span>
                    <motion.span 
                        className="title-line glitch-text" 
                        data-text="ADHIKARI"
                        whileHover={{ 
                            scale: 1.02,
                            x: isSpidey ? [0, -5, 5, -5, 0] : 0
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        ADHIKARI
                    </motion.span>
                </motion.h1>
                
                <motion.p 
                    className="hero-description"
                    variants={itemVariants}
                >
                    {isSpidey 
                        ? 'Swinging through pixels, building webs of user delight. With great power comes great user experiences.'
                        : 'I am the night. I am the UX. Crafting interfaces from the shadows to bring light to the user journey.'}
                </motion.p>
                
                <motion.div 
                    className="hero-cta"
                    variants={itemVariants}
                >
                    <motion.a 
                        href="#work" 
                        className="btn btn-primary interactive"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isSpidey ? 'Swing Into Action' : 'Investigate Cases'}
                    </motion.a>
                    <motion.a 
                        href="#contact" 
                        className="btn btn-secondary interactive"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isSpidey ? 'Web Me' : 'Signal Me'}
                    </motion.a>
                </motion.div>
            </motion.div>
            
            {/* Bat Signal (Batman mode) */}
            <motion.div 
                className="hero-visual"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                    opacity: isSpidey ? 0 : 1, 
                    scale: isSpidey ? 0.8 : 1 
                }}
                transition={{ duration: 0.8 }}
            >
                <div className="bat-signal">
                    <div className="signal-glow"></div>
                </div>
            </motion.div>
        </section>
    );
}
