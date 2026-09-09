import React from 'react';

/**
 * EditorialHeadingAccent
 * Elegant multi-color architectural flourish line with diamond nodes for editorial headings.
 * Utilizes the complementary palette: #042F61 -> #588BC7 -> #DFB85A -> #DEA659
 */
export const EditorialHeadingAccent: React.FC<{ className?: string; centered?: boolean }> = ({
  className = '',
  centered = false
}) => {
  return (
    <div className={`flex items-center gap-2 py-1.5 ${centered ? 'justify-center' : 'justify-start'} ${className}`} aria-hidden="true">
      <span className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-[#042F61] via-[#588BC7] to-[#A0CAFA] rounded-full" />
      <span className="w-1.5 h-1.5 rotate-45 bg-[#DFB85A] shadow-[0_0_8px_rgba(223,184,90,0.6)]" />
      <span className="w-2.5 h-2.5 rotate-45 border border-[#DEA659] bg-white" />
      <span className="w-1.5 h-1.5 rotate-45 bg-[#DFB85A] shadow-[0_0_8px_rgba(223,184,90,0.6)]" />
      <span className="w-12 sm:w-20 h-0.5 bg-gradient-to-r from-[#A0CAFA] via-[#DEC659] to-transparent rounded-full" />
    </div>
  );
};

/**
 * CornerRegistrationBracket
 * Architectural drafting crop marks for empty section corners.
 * 100% Pure vector graphics (no artificial text).
 */
export const CornerRegistrationBracket: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position = 'top-left', className = '' }) => {
  const getPosClass = () => {
    switch (position) {
      case 'top-left': return 'top-6 left-6';
      case 'top-right': return 'top-6 right-6';
      case 'bottom-left': return 'bottom-6 left-6';
      case 'bottom-right': return 'bottom-6 right-6';
    }
  };

  return (
    <div className={`absolute pointer-events-none select-none z-0 hidden lg:block ${getPosClass()} ${className}`} aria-hidden="true">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="opacity-35">
        <path d="M 0 20 L 0 0 L 20 0" stroke="#042F61" strokeWidth="1" />
        <circle cx="0" cy="0" r="2.5" fill="#BA994A" />
        <line x1="8" y1="8" x2="28" y2="8" stroke="#588BC7" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="8" y1="8" x2="8" y2="28" stroke="#588BC7" strokeWidth="0.5" strokeDasharray="2 2" />
        <circle cx="8" cy="8" r="1.5" fill="#588BC7" />
      </svg>
    </div>
  );
};

/**
 * ArchitecturalCadDecor
 * Geometric CAD floorplan & elevation linework placed purposefully in section empty spaces.
 * 100% Pure vector graphics (zero artificial text).
 */
export const ArchitecturalCadDecor: React.FC<{
  className?: string;
  variant?: 'compass' | 'elevation' | 'geometric';
}> = ({ className = '', variant = 'compass' }) => {
  if (variant === 'elevation') {
    return (
      <div className={`pointer-events-none select-none z-0 ${className}`} aria-hidden="true">
        <svg width="280" height="220" viewBox="0 0 280 220" fill="none" className="w-full h-auto opacity-30">
          <defs>
            <linearGradient id="cadGrad" x1="0" y1="0" x2="280" y2="220" gradientUnits="userSpaceOnUse">
              <stop stopColor="#044561" />
              <stop offset="0.5" stopColor="#588BC7" />
              <stop offset="1" stopColor="#DFB85A" />
            </linearGradient>
          </defs>
          {/* Elevation Horizontal Ticks */}
          {[20, 60, 100, 140, 180].map((y, i) => (
            <g key={y}>
              <line x1="10" y1={y} x2="270" y2={y} stroke="url(#cadGrad)" strokeWidth="0.75" strokeDasharray={i % 2 === 0 ? "4 4" : "1 3"} />
              <polygon points={`274,${y - 2} 278,${y} 274,${y + 2}`} fill="#042F61" opacity="0.6" />
            </g>
          ))}
          {/* Vertical Architectural Axis */}
          <line x1="80" y1="10" x2="80" y2="200" stroke="#042F61" strokeWidth="1" strokeDasharray="6 3" opacity="0.4" />
          <line x1="200" y1="10" x2="200" y2="200" stroke="#042F61" strokeWidth="1" strokeDasharray="6 3" opacity="0.4" />
          <circle cx="80" cy="100" r="4" stroke="#DFB85A" strokeWidth="1" fill="#FFF" />
          <circle cx="200" cy="100" r="4" stroke="#DFB85A" strokeWidth="1" fill="#FFF" />
          <polygon points="76,212 84,212 80,218" fill="#588BC7" opacity="0.6" />
          <polygon points="196,212 204,212 200,218" fill="#588BC7" opacity="0.6" />
        </svg>
      </div>
    );
  }

  if (variant === 'geometric') {
    return (
      <div className={`pointer-events-none select-none z-0 ${className}`} aria-hidden="true">
        <svg width="320" height="320" viewBox="0 0 320 320" fill="none" className="w-full h-auto opacity-25">
          <circle cx="160" cy="160" r="140" stroke="#044561" strokeWidth="0.75" strokeDasharray="4 4" />
          <circle cx="160" cy="160" r="110" stroke="#588BC7" strokeWidth="1" />
          <circle cx="160" cy="160" r="80" stroke="#DFB85A" strokeWidth="0.75" strokeDasharray="2 4" />
          <polygon points="160,50 255,215 65,215" stroke="#BA994A" strokeWidth="0.75" fill="none" opacity="0.4" />
          <polygon points="160,270 65,105 255,105" stroke="#042F61" strokeWidth="0.75" fill="none" opacity="0.3" />
          <line x1="20" y1="160" x2="300" y2="160" stroke="#588BC7" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="160" y1="20" x2="160" y2="300" stroke="#588BC7" strokeWidth="0.5" strokeDasharray="3 3" />
          <circle cx="160" cy="160" r="3" fill="#DFB85A" />
        </svg>
      </div>
    );
  }

  // Default: Pure Geometric Compass Rose drafting motif
  return (
    <div className={`pointer-events-none select-none z-0 ${className}`} aria-hidden="true">
      <svg width="240" height="240" viewBox="0 0 240 240" fill="none" className="w-full h-auto opacity-30">
        <circle cx="120" cy="120" r="110" stroke="#042F61" strokeWidth="0.75" strokeDasharray="2 4" />
        <circle cx="120" cy="120" r="95" stroke="#DFB85A" strokeWidth="0.75" />
        <circle cx="120" cy="120" r="80" stroke="#588BC7" strokeWidth="0.5" />
        
        {/* Ray Lines & Geometric Diamonds */}
        <path d="M 120 10 L 124 110 L 224 116 L 126 124 L 120 224 L 114 126 L 16 116 L 116 110 Z" fill="none" stroke="#BA994A" strokeWidth="0.8" />
        
        {/* Cardinal Geometric Markers */}
        <polygon points="120,18 123,26 117,26" fill="#042F61" />
        <polygon points="222,120 214,123 214,117" fill="#042F61" />
        <polygon points="120,222 117,214 123,214" fill="#042F61" />
        <polygon points="18,120 26,117 26,123" fill="#042F61" />
        
        <circle cx="120" cy="120" r="4" fill="#DFB85A" />
      </svg>
    </div>
  );
};
