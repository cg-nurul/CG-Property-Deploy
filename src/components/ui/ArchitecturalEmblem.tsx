import React from 'react';

interface ArchitecturalEmblemProps {
  className?: string;
  size?: number;
}

/**
 * ArchitecturalEmblem
 * 
 * Vector architectural watermark for negative space.
 * Features an eight-point celestial compass & concentric precision rings
 * rendered with subtle stroke weights using the new brand palette.
 */
export const ArchitecturalEmblem: React.FC<ArchitecturalEmblemProps> = ({
  className = '',
  size = 180
}) => {
  return (
    <div 
      className={`pointer-events-none select-none z-0 ${className}`} 
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer Concentric Precision Rings */}
        <circle cx="100" cy="100" r="95" stroke="#042F61" strokeWidth="0.75" strokeDasharray="2 4" opacity="0.4" />
        <circle cx="100" cy="100" r="82" stroke="#588BC7" strokeWidth="0.5" opacity="0.3" />
        <circle cx="100" cy="100" r="68" stroke="#DFB85A" strokeWidth="0.75" opacity="0.45" />
        
        {/* Inner Geometric Star / Compass */}
        <path
          d="M100 20 L104 88 L172 92 L108 104 L114 172 L96 112 L28 108 L92 96 Z"
          fill="none"
          stroke="#BA994A"
          strokeWidth="0.75"
          opacity="0.35"
        />

        {/* Diagonal Crosshair Guidelines */}
        <line x1="35" y1="35" x2="165" y2="165" stroke="#044561" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.25" />
        <line x1="165" y1="35" x2="35" y2="165" stroke="#044561" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.25" />

        {/* Center Point */}
        <circle cx="100" cy="100" r="3" fill="#DFB85A" opacity="0.6" />
        <circle cx="100" cy="100" r="8" stroke="#042F61" strokeWidth="0.75" opacity="0.5" />
      </svg>
    </div>
  );
};
