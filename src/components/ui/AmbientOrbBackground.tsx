import React from 'react';

interface AmbientOrbBackgroundProps {
  variant?: 'subtle-gold' | 'ocean-teal' | 'balanced';
  className?: string;
}

/**
 * AmbientOrbBackground
 * 
 * Inspired by modern visual effects (ReactBits / Animate UI).
 * Floats gently in empty background space using the new brand palette
 * (Ice Wash #D6E9FF, Ocean Teal #044561, Sky Glow #A0CAFA, and Amber Topaz #DEA659).
 */
export const AmbientOrbBackground: React.FC<AmbientOrbBackgroundProps> = ({
  variant = 'balanced',
  className = ''
}) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none -z-10 ${className}`}
      aria-hidden="true"
    >
      {/* Orb 1: Upper right ocean teal / ice wash blend */}
      <div 
        className="absolute -top-24 -right-24 w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] rounded-full blur-3xl opacity-[0.07] animate-ambient-slow"
        style={{
          background: variant === 'ocean-teal'
            ? 'radial-gradient(circle, #044561 0%, #588BC7 50%, transparent 70%)'
            : 'radial-gradient(circle, #A0CAFA 0%, #D6E9FF 60%, transparent 80%)'
        }}
      />

      {/* Orb 2: Lower left warm amber / radiant gold wash */}
      <div 
        className="absolute -bottom-24 -left-20 w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] rounded-full blur-3xl opacity-[0.06] animate-ambient-reverse"
        style={{
          background: variant === 'subtle-gold'
            ? 'radial-gradient(circle, #DFB85A 0%, #DEA659 50%, transparent 75%)'
            : 'radial-gradient(circle, #BA994A 0%, #DEC659 60%, transparent 80%)'
        }}
      />

      {/* Orb 3: Center-offset subtle steel blue breath for balanced depth */}
      {variant === 'balanced' && (
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[100px] opacity-[0.04] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, #044561 0%, #D6E9FF 70%, transparent 100%)'
          }}
        />
      )}
    </div>
  );
};
