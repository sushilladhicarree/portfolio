import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { BufferGeometry, CatmullRomCurve3, DoubleSide, Float32BufferAttribute, Shape, ShapeGeometry, TubeGeometry, Vector3 } from 'three';
import { useTheme } from '../context/theme-state';

function surfacePoint(x, y) {
    const distance = x * x + (y / 1.32) ** 2;
    return new Vector3(x, y, 0.64 * Math.sqrt(Math.max(0.01, 1 - distance)) + 0.018);
}

function Webbing() {
    const geometries = useMemo(() => {
        const curves = [];
        for (let i = 0; i < 9; i++) {
            const angle = Math.PI / 2 + i * Math.PI / 8;
            const points = Array.from({ length: 30 }, (_, j) => {
                const r = j / 29 * 0.94;
                return surfacePoint(-0.06 + Math.cos(angle) * r, 0.1 + Math.sin(angle) * r * 1.2);
            });
            curves.push(new TubeGeometry(new CatmullRomCurve3(points), 30, 0.009, 3, false));
        }
        for (let ring = 1; ring <= 5; ring++) {
            const points = Array.from({ length: 41 }, (_, j) => {
                const angle = Math.PI / 2 + j / 40 * Math.PI;
                const r = ring * 0.175;
                return surfacePoint(-0.06 + Math.cos(angle) * r, 0.1 + Math.sin(angle) * r * 1.2);
            });
            curves.push(new TubeGeometry(new CatmullRomCurve3(points), 40, 0.011, 3, false));
        }
        return curves;
    }, []);
    useEffect(() => () => geometries.forEach(g => g.dispose()), [geometries]);
    return <group>{geometries.map((geometry, i) => <mesh key={i} geometry={geometry}><meshStandardMaterial color="#260b0c" roughness={0.9}/></mesh>)}</group>;
}

function Eye({ side }) {
    const geometries = useMemo(() => {
        const shape = new Shape();
        shape.moveTo(0, 0.1);
        shape.lineTo(side * 0.59, 0.32);
        shape.quadraticCurveTo(side * 0.54, -0.16, side * 0.26, -0.18);
        shape.quadraticCurveTo(side * 0.06, -0.13, 0, 0.1);
        const white = new ShapeGeometry(shape, 16);
        const border = new ShapeGeometry(shape, 16);
        const mapToSurface = (geometry, scale, depth) => {
            const vertices = geometry.attributes.position;
            for (let i = 0; i < vertices.count; i++) {
                const x = vertices.getX(i) * scale + side * 0.075;
                const y = vertices.getY(i) * scale + 0.1;
                vertices.setXYZ(i, x, y, 0.7 + depth);
            }
            geometry.computeVertexNormals();
        };
        mapToSurface(white, 1, 0.035);
        mapToSurface(border, 1.17, 0.016);
        return [white, border];
    }, [side]);
    useEffect(() => () => geometries.forEach(g => g.dispose()), [geometries]);
    return <group>
        <mesh geometry={geometries[1]}><meshBasicMaterial color="#07080b" side={DoubleSide}/></mesh>
        <mesh geometry={geometries[0]}><meshStandardMaterial color="#f9f0dc" emissive="#fff0d5" emissiveIntensity={0.25} roughness={0.3} side={DoubleSide}/></mesh>
    </group>;
}

function Mask({ reducedMotion }) {
    const ref = useRef();
    useFrame(({ clock, pointer }, delta) => {
        if (reducedMotion || !ref.current) return;
        const object = ref.current;
        const damp = 1 - Math.exp(-delta * 4);
        object.rotation.y += (pointer.x * 0.32 - object.rotation.y) * damp;
        object.rotation.x += (-pointer.y * 0.13 - object.rotation.x) * damp;
        object.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.05;
    });
    return <group ref={ref}>
        <group position={[0, 0.3, 0]}>
            <mesh scale={[1, 1.32, 0.64]}><sphereGeometry args={[1, 48, 40, -Math.PI / 2, Math.PI]}/><meshStandardMaterial color="#e42c26" metalness={0.12} roughness={0.55}/></mesh>
            <mesh scale={[1, 1.32, 0.64]}><sphereGeometry args={[1, 48, 40, Math.PI / 2, Math.PI]}/><meshStandardMaterial color="#141820" metalness={0.55} roughness={0.37}/></mesh>
            <mesh position={[0.69, 1.13, -0.03]} rotation={[0, 0, -0.15]} scale={[1, 1.7, 0.7]}><coneGeometry args={[0.23, 0.7, 4]}/><meshStandardMaterial color="#151923" metalness={0.5} roughness={0.4}/></mesh>
            <mesh position={[0.15, -0.22, 0.61]} rotation={[0, 0, Math.PI]} scale={[0.5, 1, 0.8]}><coneGeometry args={[0.16, 0.5, 3]}/><meshStandardMaterial color="#202532" metalness={0.4} roughness={0.5}/></mesh>
            <Webbing/><Eye side={-1}/><Eye side={1}/>
        </group>
        <mesh position={[0, -1.03, -0.05]}><cylinderGeometry args={[0.4, 0.48, 0.55, 32]}/><meshStandardMaterial color="#151923" roughness={0.6}/></mesh>
        <mesh position={[0, -1.45, -0.1]} scale={[1.5, 0.54, 0.8]}><sphereGeometry args={[1, 40, 24, -Math.PI / 2, Math.PI]}/><meshStandardMaterial color="#bb2426" roughness={0.55}/></mesh>
        <mesh position={[0, -1.45, -0.1]} scale={[1.5, 0.54, 0.8]}><sphereGeometry args={[1, 40, 24, Math.PI / 2, Math.PI]}/><meshStandardMaterial color="#12151c" metalness={0.4} roughness={0.55}/></mesh>
        <mesh position={[0, -1.85, 0]}><cylinderGeometry args={[1.22, 1.29, 0.13, 64]}/><meshStandardMaterial color="#1b1b24" metalness={0.6} roughness={0.45}/></mesh>
    </group>;
}

function Orbit({ reducedMotion }) {
    const ref = useRef();
    const geometry = useMemo(() => {
        const points = Array.from({ length: 60 }, (_, i) => {
            const angle = i * 2.39996;
            const radius = 2.3 + (i % 5) / 7;
            return [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.75, -1.5 + i % 4 / 5];
        }).flat();
        const result = new BufferGeometry();
        result.setAttribute('position', new Float32BufferAttribute(points, 3));
        return result;
    }, []);
    useEffect(() => () => geometry.dispose(), [geometry]);
    useFrame((state, delta) => { if (!reducedMotion && ref.current) ref.current.rotation.z += delta * 0.035; });
    return <points ref={ref} geometry={geometry}><pointsMaterial size={0.033} color="#f9da60" transparent opacity={0.7}/></points>;
}

export default function ThreeDScene({ reducedMotion }) {
    const { isSpidey } = useTheme();
    const container = useRef();
    const [inView, setInView] = useState(true);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '60px' });
        observer.observe(container.current);
        return () => observer.disconnect();
    }, []);
    return <div ref={container} className="canvas-wrap"><Canvas dpr={[1, 1.5]} frameloop={reducedMotion || !inView ? 'demand' : 'always'} camera={{ position: [0, 0.1, 7], fov: 39 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.6}/><directionalLight position={[-3, 5, 5]} intensity={3} color="#fff0d5"/><pointLight position={[3, 0, 3]} intensity={30} color={isSpidey ? '#6a83df' : '#f3d356'}/><pointLight position={[-3, -1, 2]} intensity={10} color="#ef3832"/>
        <Mask reducedMotion={reducedMotion}/><Orbit reducedMotion={reducedMotion}/>
    </Canvas></div>;
}
