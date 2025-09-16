import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';
import * as random from 'maath/random/dist/maath-random.esm';

function StarField() {
  const ref = useRef();
  const { currentTheme } = useTheme();
  
  const sphere = useMemo(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }), []);
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={currentTheme.colors.primary}
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function FloatingGeometry() {
  const meshRef = useRef();
  const { currentTheme } = useTheme();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[2, 0, -2]}>
      <icosahedronGeometry args={[0.3, 1]} />
      <meshStandardMaterial
        color={currentTheme.colors.accent}
        transparent
        opacity={0.6}
        wireframe
      />
    </mesh>
  );
}

function ParticleSystem() {
  const particlesRef = useRef();
  const { currentTheme } = useTheme();
  
  const particleCount = currentTheme.particles.count;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05;
      
      // Animate particles based on mood effects
      if (currentTheme.effects.bounce) {
        particlesRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
    }
  });

  return (
    <Points ref={particlesRef} positions={positions}>
      <PointMaterial
        color={currentTheme.particles.color}
        size={0.01}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </Points>
  );
}

const Background3D = () => {
  const { currentTheme, isTransitioning } = useTheme();

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        background: currentTheme.colors.background,
        transition: isTransitioning ? 'background 0.6s ease' : 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ 
          background: 'transparent',
          opacity: isTransitioning ? 0.5 : 1,
          transition: 'opacity 0.6s ease'
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <StarField />
        <ParticleSystem />
        <FloatingGeometry />
      </Canvas>
      
      {/* Overlay effects based on mood */}
      {currentTheme.effects.glow && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `radial-gradient(circle at center, 
              ${currentTheme.colors.primary}20 0%, 
              transparent 70%)`,
            animation: 'pulse 4s ease-in-out infinite',
          }}
        />
      )}
      
      {currentTheme.effects.sparkles && (
        <div className="sparkles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="sparkle"
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '4px',
                height: '4px',
                background: currentTheme.colors.accent,
                borderRadius: '50%',
                animation: `sparkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}
      
      <style jsx>{`
        @keyframes sparkle {
          0%, 100% { 
            opacity: 0; 
            transform: scale(0); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
      `}</style>
    </div>
  );
};

export default Background3D;