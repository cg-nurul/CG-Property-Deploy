import React, { useState, useRef, useCallback } from 'react';

interface SpecularButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  variant?: 'white' | 'primary';
}

export const SpecularButton: React.FC<SpecularButtonProps> = ({
  children,
  className = '',
  innerClassName = '',
  variant = 'white',
  onClick,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 60, y: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const isWhite = variant === 'white';
  const isFullWidth = className.includes('w-full');

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`,
      } as React.CSSProperties}
      className={`group relative inline-flex items-center justify-center ${className}`}
    >
      {/* 1. Luminous Outer Specular Bloom / Halo:
          Radiates onto dark backgrounds (#042F61) for high-contrast visibility */}
      <span
        className="pointer-events-none absolute -inset-[3px] rounded-full blur-[5px] transition-opacity duration-300 ease-out"
        style={{
          opacity: isHovered ? 0.95 : 0.4,
          background: isWhite
            ? 'radial-gradient(110px circle at var(--mouse-x) var(--mouse-y), rgba(214, 233, 255, 0.95) 0%, rgba(160, 202, 250, 0.75) 35%, rgba(88, 139, 199, 0.45) 65%, transparent 100%)'
            : 'radial-gradient(110px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.9) 0%, rgba(160, 202, 250, 0.7) 40%, transparent 80%)',
        }}
      />

      {/* 2. Interactive Button Container with 2.5px High-Contrast Specular Border */}
      <button
        onClick={onClick}
        className={`
          ${isFullWidth ? 'w-full' : ''}
          relative inline-flex items-center justify-center
          p-[2px] sm:p-[2.5px] rounded-full overflow-hidden
          transition-transform duration-200 ease-out cursor-pointer select-none
          active:scale-[0.97]
          shadow-md
        `}
        {...props}
      >
        {/* 2a. Resting Static Border: High contrast against dark background */}
        <span
          className={`pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300 ${
            isWhite ? 'bg-gradient-to-r from-[#A0CAFA]/60 via-white/70 to-[#588BC7]/60' : 'bg-white/40'
          }`}
        />

        {/* 2b. High-Intensity Cursor-Tracking Specular Border Glare (Brand Color Spectrum) */}
        <span
          className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-150 ease-out"
          style={{
            opacity: isHovered ? 1 : 0.6,
            background: isWhite
              ? 'radial-gradient(110px circle at var(--mouse-x) var(--mouse-y), #FFFFFF 0%, #D6E9FF 22%, #A0CAFA 45%, #588BC7 70%, transparent 100%)'
              : 'radial-gradient(110px circle at var(--mouse-x) var(--mouse-y), #FFFFFF 0%, #D6E9FF 30%, #A0CAFA 60%, transparent 100%)',
          }}
        />

        {/* 2c. Ambient Rotating Specular Laser Beam along the rim */}
        <span
          className="pointer-events-none absolute -inset-[100%] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-specular-spin"
          style={{
            background: isWhite
              ? 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 240deg, #588BC7 280deg, #A0CAFA 320deg, #FFFFFF 350deg, #D6E9FF 360deg)'
              : 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 240deg, #588BC7 280deg, #A0CAFA 320deg, #FFFFFF 360deg)',
          }}
        />

        {/* 2d. Solid Opaque Inner Button Face: Pure porcelain white, zero glare on text */}
        <span
          className={`
            relative z-10 w-full h-full rounded-full
            inline-flex items-center justify-center gap-2
            px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold tracking-wide
            transition-colors duration-200 pointer-events-none
            ${isWhite
              ? 'bg-white group-hover:bg-[#F8FAFC] text-[#042F61]'
              : 'bg-[#042F61] group-hover:bg-[#073872] text-white'
            }
            ${innerClassName}
          `}
        >
          {children}
        </span>
      </button>
    </div>
  );
};


