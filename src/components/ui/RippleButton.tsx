import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'gold' | 'outline';
  className?: string;
}

/**
 * RippleButton
 * Inspired by https://motion.dev/examples/react-material-design-ripple
 * Fluid expanding ripple geometry with motion/react.
 * For primary blue buttons: DOES NOT use dark background on hover. Instead uses
 * luminous brand tones (#235894 / #044561) with subtle glow and spring feedback.
 */
export const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  onClick,
  ...props
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;

    const newRipple: Ripple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size
    };

    setRipples((prev) => [...prev, newRipple]);
  };

  const removeRipple = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  const variantStyles = {
    primary:
      'bg-[#042F61] text-white active:bg-[#044561] shadow-xs hover:shadow-[0_8px_24px_rgba(4,69,97,0.3)] border border-[#235894]/40',
    gold:
      'btn-gold-shine text-[#14171A] font-bold shadow-xs hover:shadow-[0_8px_20px_rgba(223,184,90,0.35)]',
    outline:
      'bg-white/80 text-[#042F61] border border-[#E6E0D8] hover:border-[#588BC7]'
  };

  const rippleColor = variant === 'gold' 
    ? 'rgba(255, 255, 255, 0.45)' 
    : variant === 'outline'
    ? 'rgba(4, 47, 97, 0.15)'
    : 'rgba(214, 233, 255, 0.45)'; // Luminous Sky Glow #D6E9FF

  return (
    <motion.button
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      onPointerDown={handlePointerDown}
      onClick={onClick}
      className={`group relative overflow-hidden inline-flex items-center justify-center transition-all duration-300 cursor-pointer select-none ${variantStyles[variant]} ${className}`}
      {...(props as any)}
    >
      {/* Smooth spreading hover background fill */}
      {variant === 'primary' && (
        <motion.span
          variants={{
            hover: { scale: 1.5, opacity: 1 },
          }}
          initial={{ scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-gradient-to-r from-[#044561] via-[#235894] to-[#588BC7] rounded-full pointer-events-none -z-0"
        />
      )}

      {variant === 'outline' && (
        <motion.span
          variants={{
            hover: { scale: 1.4, opacity: 1 },
          }}
          initial={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-[#D6E9FF]/40 rounded-full pointer-events-none -z-0"
        />
      )}

      {/* Expanding Ripple Rings */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.85 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => removeRipple(ripple.id)}
            className="absolute rounded-full pointer-events-none -z-0"
            style={{
              left: ripple.x - ripple.size / 2,
              top: ripple.y - ripple.size / 2,
              width: ripple.size,
              height: ripple.size,
              backgroundColor: rippleColor
            }}
          />
        ))}
      </AnimatePresence>

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};
