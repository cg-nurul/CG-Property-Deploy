import React from 'react';

interface ArchitecturalGridProps {
  className?: string;
  crosshairs?: boolean;
  theme?: 'light' | 'dark';
}

/**
 * ArchitecturalGrid
 * 
 * Delicate SVG background pattern for empty/whitespace areas.
 * Provides architectural depth with fine blueprint geometry,
 * subtle crosshairs, and radial fade-out masks using the new brand palette.
 */
export const ArchitecturalGrid: React.FC<ArchitecturalGridProps> = ({ 
  className = '',
  crosshairs = true,
  theme = 'light'
}) => {
  const isDark = theme === 'dark';
  const gridStroke = isDark ? '#DFB85A' : '#042F61';
  const macroStroke = isDark ? '#588BC7' : '#588BC7';
  const crosshairStroke = isDark ? '#DFB85A' : '#BA994A';
  const opacity = isDark ? 'opacity-[0.07]' : 'opacity-[0.045]';

  return (
    <div 
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      style={{
        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 80%)'
      }}
      aria-hidden="true"
    >
      <svg
        className={`w-full h-full ${opacity}`}
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id={`arch-grid-pattern-${theme}`}
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            {/* Fine architectural grid lines */}
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke={gridStroke}
              strokeWidth="0.75"
              strokeDasharray="1 3"
            />
            {/* Micro accent corner dot */}
            <circle cx="48" cy="0" r="1" fill="#DFB85A" />
          </pattern>

          {/* Secondary larger 192px module pattern */}
          <pattern
            id={`arch-macro-pattern-${theme}`}
            width="192"
            height="192"
            patternUnits="userSpaceOnUse"
          >
            <rect width="192" height="192" fill={`url(#arch-grid-pattern-${theme})`} />
            <path
              d="M 192 0 L 0 0 0 192"
              fill="none"
              stroke={macroStroke}
              strokeWidth="1"
            />
            {crosshairs && (
              <>
                {/* Architectural Alignment Crosshair */}
                <path
                  d="M 184 192 L 200 192 M 192 184 L 192 200"
                  stroke={crosshairStroke}
                  strokeWidth="1.2"
                />
              </>
            )}
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill={`url(#arch-macro-pattern-${theme})`} />
      </svg>
    </div>
  );
};
