import { useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import './Playground.css';

export default function Playground() {
    const { isSpidey } = useTheme();
    const [toggleOn, setToggleOn] = useState(false);
    const [sliderValue, setSliderValue] = useState(50);
    const [progressValue, setProgressValue] = useState(0);
    const [showTooltip, setShowTooltip] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#E23636');
    const [isLoading, setIsLoading] = useState(false);
    const [ripples, setRipples] = useState([]);

    // Simulate loading
    const handleLoadingDemo = () => {
        setIsLoading(true);
        setProgressValue(0);
        const interval = setInterval(() => {
            setProgressValue(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsLoading(false);
                    return 0;
                }
                return prev + 10;
            });
        }, 200);
    };

    // Ripple effect
    const addRipple = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const ripple = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            id: Date.now()
        };
        setRipples(prev => [...prev, ripple]);
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== ripple.id));
        }, 600);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const colors = ['#E23636', '#1E3A8A', '#FFD93D', '#10B981', '#8B5CF6', '#EC4899'];

    return (
        <section id="playground" className="playground section">
            <div className="container">
                <motion.h2 
                    className="section-title"
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                >
                    {isSpidey ? "Peter's Lab" : 'R&D Department'}
                </motion.h2>
                <motion.p 
                    className="section-subtitle"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.7 }}
                    viewport={{ once: true }}
                >
                    {isSpidey 
                        ? 'Experimental web fluids and gadgets'
                        : 'Prototype gadgets and tactical equipment'}
                </motion.p>
                
                <motion.div 
                    className="playground-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {/* Buttons with Ripple */}
                    <motion.div className="play-card" variants={itemVariants}>
                        <h4>Buttons</h4>
                        <div className="play-demo">
                            <motion.button 
                                className="demo-btn spidey-btn interactive ripple-btn"
                                onClick={addRipple}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Thwip!
                                {ripples.map(ripple => (
                                    <span 
                                        key={ripple.id}
                                        className="ripple"
                                        style={{ left: ripple.x, top: ripple.y }}
                                    />
                                ))}
                            </motion.button>
                            <motion.button 
                                className="demo-btn bat-btn interactive"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Engage
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Toggle with Animation */}
                    <motion.div className="play-card" variants={itemVariants}>
                        <h4>Toggle</h4>
                        <div className="play-demo">
                            <motion.label 
                                className="demo-toggle interactive"
                                whileTap={{ scale: 0.95 }}
                            >
                                <input 
                                    type="checkbox" 
                                    checked={toggleOn}
                                    onChange={() => setToggleOn(!toggleOn)}
                                />
                                <motion.span 
                                    className="toggle-slider"
                                    animate={{
                                        backgroundColor: toggleOn 
                                            ? (isSpidey ? '#E23636' : '#FFE600')
                                            : (isSpidey ? '#1E3A8A' : '#333')
                                    }}
                                />
                            </motion.label>
                            <span className="toggle-label">{toggleOn ? 'ON' : 'OFF'}</span>
                        </div>
                    </motion.div>

                    {/* Slider */}
                    <motion.div className="play-card" variants={itemVariants}>
                        <h4>Slider</h4>
                        <div className="play-demo slider-demo">
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={sliderValue}
                                onChange={(e) => setSliderValue(e.target.value)}
                                className="demo-slider"
                            />
                            <motion.span 
                                className="slider-value"
                                key={sliderValue}
                                initial={{ scale: 1.3 }}
                                animate={{ scale: 1 }}
                            >
                                {sliderValue}%
                            </motion.span>
                        </div>
                    </motion.div>

                    {/* Color Picker */}
                    <motion.div className="play-card" variants={itemVariants}>
                        <h4>Color Picker</h4>
                        <div className="play-demo color-demo">
                            {colors.map(color => (
                                <motion.button
                                    key={color}
                                    className={`color-swatch ${selectedColor === color ? 'active' : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setSelectedColor(color)}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    animate={{
                                        boxShadow: selectedColor === color 
                                            ? `0 0 0 3px ${color}40`
                                            : 'none'
                                    }}
                                />
                            ))}
                        </div>
                        <div 
                            className="color-preview"
                            style={{ backgroundColor: selectedColor }}
                        />
                    </motion.div>

                    {/* Loading Spinner & Progress */}
                    <motion.div className="play-card" variants={itemVariants}>
                        <h4>Loading</h4>
                        <div className="play-demo loading-demo">
                            <motion.button
                                className="demo-btn load-btn"
                                onClick={handleLoadingDemo}
                                disabled={isLoading}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isLoading ? 'Loading...' : 'Start'}
                            </motion.button>
                            
                            <AnimatePresence>
                                {isLoading && (
                                    <motion.div 
                                        className="spinner"
                                        initial={{ opacity: 0, rotate: 0 }}
                                        animate={{ opacity: 1, rotate: 360 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ 
                                            rotate: { duration: 1, repeat: Infinity, ease: 'linear' }
                                        }}
                                    />
                                )}
                            </AnimatePresence>
                            
                            <div className="progress-bar">
                                <motion.div 
                                    className="progress-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressValue}%` }}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Tooltip */}
                    <motion.div className="play-card" variants={itemVariants}>
                        <h4>Tooltip</h4>
                        <div className="play-demo tooltip-demo">
                            <motion.div 
                                className="tooltip-trigger interactive"
                                onHoverStart={() => setShowTooltip(true)}
                                onHoverEnd={() => setShowTooltip(false)}
                                whileHover={{ scale: 1.05 }}
                            >
                                Hover Me
                                <AnimatePresence>
                                    {showTooltip && (
                                        <motion.div 
                                            className="tooltip"
                                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                                        >
                                            {isSpidey ? '🕷️ Spidey-sense!' : '🦇 I am Batman'}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* 3D Card */}
                    <motion.div className="play-card card-3d-demo" variants={itemVariants}>
                        <h4>3D Card</h4>
                        <div className="play-demo">
                            <motion.div 
                                className="demo-card-3d interactive"
                                whileHover={{ 
                                    rotateY: 15,
                                    rotateX: -10,
                                    scale: 1.05
                                }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <div className="card-3d-content">
                                    {isSpidey ? '🕸️' : '🦇'}
                                    <span>Hover for 3D</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Input */}
                    <motion.div className="play-card" variants={itemVariants}>
                        <h4>Input</h4>
                        <div className="play-demo">
                            <motion.input 
                                type="text" 
                                className="demo-input" 
                                placeholder="Type something..."
                                whileFocus={{ scale: 1.02 }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
