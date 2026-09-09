import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TileTransitionImageProps {
  src: string;
  alt: string;
  className?: string;
  columns?: number;
  rows?: number;
}

/**
 * TileTransitionImage
 * Premium architectural blue-glass mosaic reveal.
 * The underlying image stays continuous and intact (eliminating all black seams),
 * while a high-density grid of sapphire glass tiles sweeps across in a staggered wave.
 */
export const TileTransitionImage: React.FC<TileTransitionImageProps> = ({
  src,
  alt,
  className = '',
  columns = 8,
  rows = 6
}) => {
  const totalTiles = columns * rows;
  const tiles = Array.from({ length: totalTiles }, (_, index) => {
    const col = index % columns;
    const row = Math.floor(index / columns);
    return { index, col, row };
  });

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Base Continuous Image with Smooth Transition (Zero Black Seams) */}
      <AnimatePresence mode="popLayout">
        <motion.img
          key={src}
          src={src}
          alt={alt}
          initial={{ opacity: 0.3, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* High-Density Blue Glass Overlay Tiles (Staggered Wave Reveal) */}
      <div
        key={`tiles-${src}`}
        className="absolute inset-0 w-full h-full grid pointer-events-none z-10"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`
        }}
      >
        {tiles.map(({ index, col, row }) => {
          // Dynamic diagonal wavefront delay
          const delay = (col + row) * 0.028;

          return (
            <motion.div
              key={index}
              initial={{
                opacity: 0.85,
                scale: 0.96,
                backgroundColor: 'rgba(4, 47, 97, 0.55)',
                borderColor: 'rgba(88, 139, 199, 0.45)'
              }}
              animate={{
                opacity: 0,
                scale: 1,
                backgroundColor: 'rgba(214, 233, 255, 0)',
                borderColor: 'rgba(214, 233, 255, 0)'
              }}
              transition={{
                duration: 0.7,
                delay,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="w-full h-full border border-[#588BC7]/30 backdrop-blur-[2px]"
            />
          );
        })}
      </div>
    </div>
  );
};

