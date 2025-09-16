import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Card3D = ({ 
  children, 
  className = '', 
  style = {}, 
  tiltMaxAngle = 15,
  scale = 1.02,
  perspective = 1000,
  ...props 
}) => {
  const cardRef = useRef(null);
  const { currentTheme } = useTheme();

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / (rect.height / 2)) * tiltMaxAngle;
    const rotateY = (mouseX / (rect.width / 2)) * tiltMaxAngle;
    
    card.style.transform = `
      perspective(${perspective}px) 
      rotateX(${-rotateX}deg) 
      rotateY(${rotateY}deg) 
      scale3d(${scale}, ${scale}, ${scale})
    `;
    
    // Add shine effect
    const shine = card.querySelector('.card-shine');
    if (shine) {
      const shineX = (mouseX / rect.width) * 100;
      const shineY = (mouseY / rect.height) * 100;
      shine.style.background = `
        radial-gradient(
          circle at ${50 + shineX * 0.5}% ${50 + shineY * 0.5}%, 
          rgba(255, 255, 255, 0.1) 0%, 
          transparent 50%
        )
      `;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    cardRef.current.style.transform = `
      perspective(${perspective}px) 
      rotateX(0deg) 
      rotateY(0deg) 
      scale3d(1, 1, 1)
    `;
    
    const shine = cardRef.current.querySelector('.card-shine');
    if (shine) {
      shine.style.background = 'transparent';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`card-3d ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        background: currentTheme.colors.cardBg,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${currentTheme.colors.primary}20`,
        borderRadius: '20px',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.2s ease-out',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      {...props}
    >
      {/* Shine effect overlay */}
      <div 
        className="card-shine"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          borderRadius: '20px',
          transition: 'background 0.2s ease-out',
        }}
      />
      
      {/* Glow effect */}
      {currentTheme.effects.glow && (
        <div
          className="card-glow"
          style={{
            position: 'absolute',
            top: '-2px',
            left: '-2px',
            right: '-2px',
            bottom: '-2px',
            background: `linear-gradient(45deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
            borderRadius: '22px',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            zIndex: -1,
          }}
        />
      )}
      
      {/* Content */}
      <div 
        className="card-content"
        style={{
          position: 'relative',
          zIndex: 2,
          transform: 'translateZ(20px)',
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </div>
      
      {/* Floating particles for energetic mood */}
      {currentTheme.effects.sparkles && (
        <div className="card-particles">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                background: currentTheme.colors.accent,
                borderRadius: '50%',
                left: `${20 + i * 15}%`,
                top: `${20 + (i % 2) * 60}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .card-3d:hover .card-glow {
          opacity: 0.6;
        }
        
        .card-3d:hover {
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.3),
            0 0 0 1px ${currentTheme.colors.primary}40;
        }
      `}</style>
    </motion.div>
  );
};

export default Card3D;