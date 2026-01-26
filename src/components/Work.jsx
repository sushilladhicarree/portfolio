import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import './Work.css';

const projects = [
    {
        id: 1,
        title: 'Project Venom',
        description: 'A dark mode dashboard that bites back. Complex data, simple interface.',
        tags: ['Dashboard', 'Dark UI']
    },
    {
        id: 2,
        title: 'Gotham Transit',
        description: 'Reimagining urban mobility for nocturnal citizens.',
        tags: ['Mobile App', 'Maps']
    },
    {
        id: 3,
        title: 'Daily Bugle Redesign',
        description: 'News platform for the modern age. Fast, responsive, trustworthy.',
        tags: ['Web Design', 'News']
    }
];

export default function Work() {
    const { isSpidey } = useTheme();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { y: 80, opacity: 0, rotateX: 15 },
        visible: {
            y: 0,
            opacity: 1,
            rotateX: 0,
            transition: {
                type: 'spring',
                stiffness: 80,
                damping: 15
            }
        }
    };

    return (
        <section id="work" className="work section">
            <div className="container">
                <motion.h2 
                    className="section-title"
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {isSpidey ? 'Web-Slinging Action' : 'Case Files'}
                </motion.h2>
                
                <motion.div 
                    className="project-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {projects.map((project, index) => (
                        <motion.article 
                            key={project.id} 
                            className="project-card interactive"
                            variants={cardVariants}
                            whileHover={{ 
                                scale: 1.03,
                                rotateY: isSpidey ? (index % 2 ? 5 : -5) : 0,
                                rotateX: isSpidey ? -5 : 0,
                                y: -15,
                                transition: { type: 'spring', stiffness: 300 }
                            }}
                            whileTap={{ scale: 0.98 }}
                            style={{ perspective: 1000 }}
                        >
                            <motion.div 
                                className="project-image"
                                whileHover={{
                                    boxShadow: isSpidey 
                                        ? '12px 12px 0 #1A1A2E'
                                        : '0 30px 60px rgba(255, 230, 0, 0.15)'
                                }}
                            >
                                <div className="project-overlay">
                                    <motion.span 
                                        className="project-number"
                                        initial={{ scale: 0.5, opacity: 0.3 }}
                                        whileHover={{ scale: 1.2, opacity: 0.9 }}
                                    >
                                        0{index + 1}
                                    </motion.span>
                                </div>
                            </motion.div>
                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-desc">{project.description}</p>
                                <div className="project-tags">
                                    {project.tags.map(tag => (
                                        <motion.span 
                                            key={tag}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
