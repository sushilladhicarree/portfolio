import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import './About.css';

export default function About() {
    const { isSpidey } = useTheme();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const cardVariants = {
        hidden: { y: 50, opacity: 0, rotate: 0 },
        visible: {
            y: 0,
            opacity: 1,
            rotate: isSpidey ? [0, 2, -1, 0] : 0,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    return (
        <section id="about" className="about section">
            <div className="container">
                <motion.h2 
                    className="section-title"
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {isSpidey ? 'Origin Story' : 'Classified Dossier'}
                </motion.h2>
                
                <motion.div 
                    className="about-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.div 
                        className="about-panel"
                        variants={cardVariants}
                        whileHover={{ 
                            scale: 1.02,
                            boxShadow: isSpidey 
                                ? '12px 12px 0 #E23636'
                                : '0 20px 50px rgba(255, 230, 0, 0.1)'
                        }}
                    >
                        <p>
                            {isSpidey 
                                ? `It all started with a bite—a radioactive spark of curiosity for design. 
                                   Now, I swing between wireframes and prototypes, fighting the villains of bad UX. 
                                   My superpower? Seeing through the user's eyes.`
                                : `I wasn't born in the darkness. I chose it. After witnessing the chaos of unusable interfaces,
                                   I dedicated my life to a crusade against poor user experience. 
                                   I am vengeance. I am precision design.`}
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        className="about-stats"
                        variants={containerVariants}
                    >
                        {[
                            { value: '3+', label: 'Years Experience' },
                            { value: '20+', label: 'Projects' },
                            { value: '∞', label: 'Pixels Perfected' }
                        ].map((stat, index) => (
                            <motion.div 
                                key={stat.label}
                                className="stat-card interactive"
                                variants={cardVariants}
                                whileHover={{ 
                                    scale: 1.1,
                                    rotate: isSpidey ? (index % 2 ? 5 : -5) : 0,
                                    y: -10
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div 
                                    className="stat-value"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ 
                                        type: 'spring',
                                        stiffness: 200,
                                        delay: index * 0.1 
                                    }}
                                >
                                    {stat.value}
                                </motion.div>
                                <div className="stat-label">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                    
                    <motion.div 
                        className="skills-grid"
                        variants={containerVariants}
                    >
                        {['UI Design', 'UX Research', 'Prototyping', 'Design Systems', 'Figma', 'Interaction Design'].map((skill, index) => (
                            <motion.span 
                                key={skill} 
                                className="skill-tag"
                                variants={cardVariants}
                                whileHover={{ 
                                    scale: 1.1,
                                    rotate: isSpidey ? (Math.random() * 10 - 5) : 0
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
