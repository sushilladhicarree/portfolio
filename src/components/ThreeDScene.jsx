import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import './ThreeDScene.css';

// Rotating Symbol Component
function RotatingSymbol({ isSpidey }) {
    const meshRef = useRef();
    
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.5;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <mesh ref={meshRef}>
            <torusKnotGeometry args={[1, 0.3, 100, 16]} />
            <meshStandardMaterial 
                color={isSpidey ? '#E23636' : '#FFE600'} 
                metalness={0.8}
                roughness={0.2}
                emissive={isSpidey ? '#E23636' : '#FFE600'}
                emissiveIntensity={0.3}
            />
        </mesh>
    );
}

// Floating Particles
function Particles({ count = 50, isSpidey }) {
    const meshRef = useRef();
    const positions = useRef(
        Float32Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 10)
    );

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions.current}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial 
                size={0.05} 
                color={isSpidey ? '#1E3A8A' : '#FFE600'} 
                transparent
                opacity={0.6}
            />
        </points>
    );
}

export default function ThreeDScene() {
    const { isSpidey } = useTheme();

    return (
        <motion.div 
            className="three-d-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
        >
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight 
                    position={[-10, -10, -10]} 
                    color={isSpidey ? '#1E3A8A' : '#FFE600'} 
                    intensity={0.5} 
                />
                <RotatingSymbol isSpidey={isSpidey} />
                <Particles isSpidey={isSpidey} />
            </Canvas>
        </motion.div>
    );
}
