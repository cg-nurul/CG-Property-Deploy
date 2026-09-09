import React from 'react';

interface FullToSemiDottedLineProps {
  className?: string;
  centered?: boolean;
}

/**
 * FullToSemiDottedLine
 * Renders an architectural separator line that starts full (solid)
 * and transitions to semi-dotted towards the end.
 */
export const FullToSemiDottedLine: React.FC<FullToSemiDottedLineProps> = ({
  className = '',
  centered = false,
}) => {
  return (
    <div
      className={`flex items-center ${centered ? 'justify-center mx-auto' : ''} ${className}`}
      aria-hidden="true"
    >
      <svg
        width="180"
        height="4"
        viewBox="0 0 180 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block"
      >
        {/* Full Solid Segment */}
        <line
          x1="0"
          y1="2"
          x2="95"
          y2="2"
          stroke="#DFB85A"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Semi-Dotted Segment */}
        <line
          x1="102"
          y1="2"
          x2="180"
          y2="2"
          stroke="#DFB85A"
          strokeWidth="2"
          strokeDasharray="4 5"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>
    </div>
  );
};
