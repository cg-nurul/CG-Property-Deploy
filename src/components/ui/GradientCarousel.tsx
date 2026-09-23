import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselCardItem {
  id: string;
  category?: string;
  title: string;
  tag?: string;
  image: string;
  icon?: React.FC<{ className?: string }>;
}

interface GradientCarouselProps {
  items: CarouselCardItem[];
  initialIndex?: number;
  targetIndex?: { index: number; timestamp: number } | null;
  className?: string;
  onActiveIndexChange?: (index: number, item: CarouselCardItem) => void;
}

export const GradientCarousel: React.FC<GradientCarouselProps> = ({
  items,
  initialIndex,
  targetIndex,
  className = '',
  onActiveIndexChange,
}) => {
  // Center index calculation: starts from center card of the card array so cards can be scrolled in both directions
  const getInitialCenter = (len: number, customIdx?: number) => {
    if (len <= 0) return 0;
    if (customIdx !== undefined) return Math.max(0, Math.min(len - 1, customIdx));
    return Math.floor((len - 1) / 2);
  };

  const initialCenter = getInitialCenter(items.length, initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(initialCenter);
  const [activeIdx, setActiveIdx] = useState(initialCenter);
  const currentProgressRef = useRef(initialCenter);
  const targetProgressRef = useRef(initialCenter);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartProgressRef = useRef(0);
  const isUserInteractingRef = useRef(false);
  const lastReportedIdxRef = useRef(initialCenter);
  const onActiveIndexChangeRef = useRef(onActiveIndexChange);
  onActiveIndexChangeRef.current = onActiveIndexChange;

  // Clamp target progress to valid item bounds
  const maxProgress = Math.max(0, items.length - 1);

  const jumpTo = useCallback((index: number) => {
    targetProgressRef.current = Math.max(0, Math.min(maxProgress, index));
  }, [maxProgress]);

  // Programmatic jump when filter pills are clicked
  useEffect(() => {
    if (targetIndex && targetIndex.index >= 0 && targetIndex.index <= maxProgress) {
      isUserInteractingRef.current = false;
      lastReportedIdxRef.current = targetIndex.index;
      jumpTo(targetIndex.index);
    }
  }, [targetIndex, jumpTo, maxProgress]);

  const prev = useCallback(() => {
    isUserInteractingRef.current = true;
    jumpTo(Math.round(targetProgressRef.current) - 1);
  }, [jumpTo]);

  const next = useCallback(() => {
    isUserInteractingRef.current = true;
    jumpTo(Math.round(targetProgressRef.current) + 1);
  }, [jumpTo]);

  // Isolate horizontal wheel and touch scroll strictly to the carousel cards
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Isolate scroll: prevent outer page vertical/horizontal scrolling while interacting with cards
      e.preventDefault();
      e.stopPropagation();

      isUserInteractingRef.current = true;

      // Translate vertical wheel or horizontal swipe into horizontal carousel progression
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const sensitivity = 0.0022;
      const nextP = targetProgressRef.current + delta * sensitivity;
      targetProgressRef.current = Math.max(0, Math.min(maxProgress, nextP));
    };

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const deltaX = touchStartX - currentX;
      const deltaY = touchStartY - currentY;

      // Prioritize horizontal touch gestures
      if (Math.abs(deltaX) > Math.abs(deltaY) || Math.abs(deltaX) > 6) {
        e.preventDefault();
        e.stopPropagation();
        isUserInteractingRef.current = true;
        touchStartX = currentX;
        touchStartY = currentY;

        const nextP = targetProgressRef.current + deltaX * 0.0035;
        targetProgressRef.current = Math.max(0, Math.min(maxProgress, nextP));
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    // 60fps buttery smooth lerping
    let animId: number;
    const animate = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0006) {
        currentProgressRef.current += diff * 0.12;
        const p = currentProgressRef.current;
        setProgress(p);
        const rounded = Math.round(p);
        setActiveIdx(rounded);

        // Report active card change to parent to dynamically switch filter pills
        if (isUserInteractingRef.current && rounded !== lastReportedIdxRef.current) {
          lastReportedIdxRef.current = rounded;
          if (items[rounded]) {
            onActiveIndexChangeRef.current?.(rounded, items[rounded]);
          }
        }
      } else if (currentProgressRef.current !== targetProgressRef.current) {
        currentProgressRef.current = targetProgressRef.current;
        const p = targetProgressRef.current;
        setProgress(p);
        const rounded = Math.round(p);
        setActiveIdx(rounded);

        if (isUserInteractingRef.current && rounded !== lastReportedIdxRef.current) {
          lastReportedIdxRef.current = rounded;
          if (items[rounded]) {
            onActiveIndexChangeRef.current?.(rounded, items[rounded]);
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animId);
    };
  }, [maxProgress, items]);

  // Pointer drag events for desktop mouse scrub
  const handlePointerDown = (e: React.PointerEvent) => {
    isUserInteractingRef.current = true;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartProgressRef.current = targetProgressRef.current;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = dragStartXRef.current - e.clientX;
    const cardStep = 320;
    const nextP = dragStartProgressRef.current + deltaX / cardStep;
    targetProgressRef.current = Math.max(0, Math.min(maxProgress, nextP));
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
    // Snap to closest card on drag release
    targetProgressRef.current = Math.round(targetProgressRef.current);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      isUserInteractingRef.current = true;
      prev();
    } else if (e.key === 'ArrowRight') {
      isUserInteractingRef.current = true;
      next();
    }
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`relative w-full select-none outline-none ${className}`}
    >
      {/* Symmetrical Geometric Editorial Gradient Backdrop (Theme Colors: #042F61, #DFB85A, #EDE8E1) */}
      <div 
        className="pointer-events-none absolute inset-0 -top-8 -bottom-8 rounded-3xl overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse 75% 65% at 50% 50%, rgba(4, 47, 97, 0.045) 0%, rgba(223, 184, 90, 0.03) 45%, transparent 72%)',
        }}
      />

      {/* 3D Perspective Stage Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full h-[370px] sm:h-[400px] flex items-center justify-center cursor-grab overflow-hidden"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}
      >
        {items.map((item, index) => {
          const Icon = item.icon;
          const diff = index - progress;
          const absDiff = Math.abs(diff);

          // Horizontal spacing step
          const stepX = 330;
          const translateX = diff * stepX;
          const translateZ = -Math.min(220, absDiff * 95);
          const rotateY = Math.max(-24, Math.min(24, -diff * 14));
          const scale = Math.max(0.78, 1 - absDiff * 0.12);
          const opacity = Math.max(0.2, 1 - absDiff * 0.45);
          const zIndex = Math.round(50 - absDiff * 10);
          const isCenter = absDiff < 0.45;

          return (
            <div
              key={item.id}
              id={`featured-amenity-${item.id}`}
              onClick={() => {
                if (!isCenter) {
                  isUserInteractingRef.current = true;
                  jumpTo(index);
                }
              }}
              style={{
                transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
              }}
              className={`
                absolute w-[280px] sm:w-[330px] h-[320px] sm:h-[340px]
                bg-white rounded-2xl border border-[#E6E0D8]
                overflow-hidden will-change-transform transition-[box-shadow,border-color] duration-300
                flex flex-col group
                ${isCenter 
                  ? 'shadow-[0_18px_38px_-12px_rgba(4,47,97,0.18)] border-[#042F61]/25 cursor-default' 
                  : 'shadow-sm hover:border-[#042F61]/35 cursor-pointer hover:opacity-90'
                }
              `}
            >
              {/* Photo Container with Top Badge */}
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  draggable={false}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Badge */}
                {item.tag && (
                  <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-white/20">
                    {Icon && <Icon className="w-3.5 h-3.5 text-[#DFB85A] fill-current" />}
                    <span>{item.tag}</span>
                  </div>
                )}
              </div>

              {/* Clean Title Only */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center bg-white">
                <h3 className="text-sm sm:text-base font-bold text-[#042F61] leading-snug group-hover:text-[#235894] transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Symmetrical Navigation & Editorial Progress Bar */}
      <div className="relative z-20 flex items-center justify-between max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto mt-5 px-4 w-full">
        {/* Left Arrow */}
        <button
          onClick={prev}
          disabled={progress <= 0.05}
          aria-label="Previous card"
          className="w-9 h-9 shrink-0 rounded-full bg-white border border-[#E6E0D8] text-[#042F61] shadow-xs flex items-center justify-center transition-all hover:bg-[#FAF8F5] hover:border-[#042F61]/30 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Minimal Editorial Segment Progress Indicator */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 flex-nowrap overflow-x-auto no-scrollbar mx-2 sm:mx-4">
          {items.map((_, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  isUserInteractingRef.current = true;
                  jumpTo(idx);
                }}
                aria-label={`Jump to amenity ${idx + 1}`}
                className="group py-2 px-0.5 shrink-0 cursor-pointer"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-5 sm:w-6 bg-[#042F61]'
                      : 'w-1.5 sm:w-2 bg-[#E6E0D8] group-hover:bg-[#042F61]/40'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          disabled={progress >= maxProgress - 0.05}
          aria-label="Next card"
          className="w-9 h-9 shrink-0 rounded-full bg-white border border-[#E6E0D8] text-[#042F61] shadow-xs flex items-center justify-center transition-all hover:bg-[#FAF8F5] hover:border-[#042F61]/30 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
