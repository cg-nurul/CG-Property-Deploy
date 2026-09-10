import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from 'react';

export interface ScrollStackItem {
  eyebrow?: string;
  title?: string;
  body?: string;
  image?: string;
  accent?: string;
}

export interface ScrollStackProps {
  header?: ReactNode;
  items?: ScrollStackItem[];
  children?: ReactNode;
  variant?: 'stack' | 'deck' | 'fade' | 'flip' | 'zoom' | 'reveal';
  scrollLength?: number;
  holdStart?: number;
  holdEnd?: number;
  peek?: number;
  scaleStep?: number;
  blur?: number;
  dim?: number;
  smooth?: number;
  depth?: number;
  cardWidth?: number;
  cardHeight?: number | string;
  borderRadius?: number;
  perspective?: number;
  showProgress?: boolean;
  showCounter?: boolean;
  onIndexChange?: (index: number) => void;
  className?: string;
}

const clamp = (val: number, min: number, max: number) =>
  Math.min(max, Math.max(min, val));

const smoothstep = (val: number) => val * val * (3 - 2 * val);

const getFilter = (factor: number, dim: number, blur: number) => {
  const filters: string[] = [];
  if (blur > 0.01) filters.push(`blur(${(factor * blur).toFixed(2)}px)`);
  if (dim > 0.001) filters.push(`brightness(${(1 - factor * dim).toFixed(3)})`);
  return filters.length ? filters.join(' ') : 'none';
};

const getTransform = (
  variant: string,
  progress: number,
  index: number,
  config: {
    peek: number;
    scaleStep: number;
    blur: number;
    dim: number;
    radius: number;
    enter: number;
  }
) => {
  const clip = `inset(0 0 0 0 round ${config.radius}px)`;
  const parity = index % 2 === 0 ? 1 : -1;

  if (progress < 0) {
    const p = clamp(progress + 1, 0, 1);
    const eased = smoothstep(p);
    switch (variant) {
      case 'fade':
        return {
          transform: `translate3d(0,0,0) scale(${(1.06 - 0.06 * eased).toFixed(4)})`,
          opacity: eased,
          filter: 'none',
          clip,
        };
      case 'flip':
        return {
          transform: `translate3d(0,${((1 - eased) * 26).toFixed(2)}%,0) rotateX(${(-((1 - eased) * 72)).toFixed(2)}deg)`,
          opacity: clamp(1.6 * eased, 0, 1),
          filter: 'none',
          clip,
        };
      case 'zoom':
        return {
          transform: `translate3d(0,0,0) scale(${(0.52 + 0.48 * eased).toFixed(4)})`,
          opacity: clamp(1.4 * eased, 0, 1),
          filter:
            config.blur > 0.01
              ? `blur(${((1 - eased) * config.blur).toFixed(2)}px)`
              : 'none',
          clip,
        };
      case 'reveal':
        return {
          transform: 'translate3d(0,0,0)',
          opacity: 1,
          filter: 'none',
          clip: `inset(${((1 - p) * 100).toFixed(2)}% 0 0 0 round ${config.radius}px)`,
        };
      case 'deck':
        return {
          transform: `translate3d(0,${((1 - p) * (config.enter + 6)).toFixed(2)}%,0) rotate(${((1 - eased) * 4 * parity).toFixed(2)}deg)`,
          opacity: 1,
          filter: 'none',
          clip,
        };
      default: // 'stack'
        return {
          transform: `translate3d(0,${((1 - p) * config.enter).toFixed(2)}%,0)`,
          opacity: 1,
          filter: 'none',
          clip,
        };
    }
  }

  const eased = smoothstep(clamp(progress, 0, 1));
  switch (variant) {
    case 'fade':
      return {
        transform: `translate3d(0,0,0) scale(${(1 - 0.06 * eased).toFixed(4)})`,
        opacity: 1 - eased,
        filter: getFilter(eased, config.dim, config.blur),
        clip,
      };
    case 'flip':
      return {
        transform: `translate3d(0,${(-(26 * eased)).toFixed(2)}%,0) rotateX(${(72 * eased).toFixed(2)}deg)`,
        opacity: 1 - eased,
        filter: getFilter(eased, config.dim, 0),
        clip,
      };
    case 'zoom':
      return {
        transform: `translate3d(0,0,0) scale(${(1 + 0.42 * eased).toFixed(4)})`,
        opacity: 1 - eased,
        filter:
          config.blur > 0.01
            ? `blur(${(eased * config.blur * 1.4).toFixed(2)}px)`
            : 'none',
        clip,
      };
    case 'reveal':
      return {
        transform: `translate3d(0,${(-progress * config.peek * 0.5).toFixed(2)}px,0) scale(${(1 - progress * config.scaleStep * 0.7).toFixed(4)})`,
        opacity: 1,
        filter: getFilter(progress, config.dim, config.blur),
        clip,
      };
    case 'deck':
      return {
        transform: `translate3d(0,${(-progress * config.peek * 0.75).toFixed(2)}px,0) rotate(${(4.5 * progress * parity).toFixed(2)}deg) scale(${(1 - progress * config.scaleStep * 0.85).toFixed(4)})`,
        opacity: 1,
        filter: getFilter(progress, config.dim, config.blur),
        clip,
      };
    default: // 'stack'
      return {
        transform: `translate3d(0,${(-progress * config.peek).toFixed(2)}px,0) scale(${(1 - progress * config.scaleStep).toFixed(4)})`,
        opacity: 1,
        filter: getFilter(progress, config.dim, config.blur),
        clip,
      };
  }
};

const DefaultCard: React.FC<{
  item: ScrollStackItem;
  index: number;
  total: number;
  radius: number;
}> = ({ item, index, total, radius }) => (
  <article
    className="relative flex h-full w-full flex-col justify-end overflow-hidden border border-[#E6E0D8] bg-[#FAF8F5] shadow-[0_24px_60px_-24px_rgba(4,47,97,0.3)]"
    style={{ borderRadius: `${radius}px` }}
  >
    {item.image && (
      <>
        <img
          src={item.image}
          alt={item.title || ''}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
      </>
    )}
    <span
      className={`absolute right-5 top-5 text-[11px] font-medium tabular-nums tracking-widest sm:right-7 sm:top-7 ${
        item.image ? 'text-white/70' : 'text-[#8A8175]'
      }`}
    >
      {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
    </span>
    <div className="relative flex flex-col gap-3 p-6 sm:gap-4 sm:p-9">
      {item.eyebrow && (
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#DFB85A]"
          style={item.accent ? { color: item.accent } : undefined}
        >
          {item.eyebrow}
        </span>
      )}
      {item.title && (
        <h3
          className={`max-w-[24ch] text-2xl font-bold leading-[1.15] tracking-tight sm:text-3xl md:text-4xl ${
            item.image ? 'text-white' : 'text-[#042F61]'
          }`}
        >
          {item.title}
        </h3>
      )}
      {item.body && (
        <p
          className={`max-w-[48ch] text-sm leading-relaxed sm:text-base ${
            item.image ? 'text-white/80' : 'text-[#5E574E]'
          }`}
        >
          {item.body}
        </p>
      )}
    </div>
  </article>
);

export const ScrollStack: React.FC<ScrollStackProps> = ({
  header,
  items = [],
  children,
  variant = 'stack',
  scrollLength = 1.3,
  holdStart = 0.35,
  holdEnd = 1.3,
  peek = 26,
  scaleStep = 0.07,
  blur = 4,
  dim = 0.28,
  smooth = 0.16,
  depth = 3,
  cardWidth = 880,
  cardHeight = 0.68,
  borderRadius = 22,
  perspective = 1400,
  showProgress = true,
  showCounter = true,
  onIndexChange,
  className = '',
}) => {
  const customChildren = useMemo(
    () => React.Children.toArray(children).filter((c) => React.isValidElement(c)),
    [children]
  );
  const cards = customChildren.length > 0 ? customChildren : items;
  const total = cards.length;

  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLSpanElement>(null);
  const currentProgress = useRef(0);
  const lastFrameTime = useRef(0);
  const animFrameId = useRef(0);
  const isTicking = useRef(false);
  const lastIndex = useRef(-1);
  const onIndexChangeRef = useRef(onIndexChange);

  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    onIndexChangeRef.current = onIndexChange;
  }, [onIndexChange]);

  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setPrefersReducedMotion(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const config = useMemo(() => {
    const numericHeight = typeof cardHeight === 'number' ? cardHeight : 0.68;
    return {
      peek: Math.max(0, peek),
      scaleStep: clamp(scaleStep, 0, 0.4),
      blur: prefersReducedMotion ? 0 : Math.max(0, blur),
      dim: clamp(dim, 0, 1),
      radius: Math.max(0, borderRadius),
      enter: ((1 + 1 / clamp(numericHeight, 0.2, 0.95)) / 2) * 100 + 3,
    };
  }, [peek, scaleStep, blur, dim, borderRadius, prefersReducedMotion, cardHeight]);

  const applyStyles = useCallback(
    (progress: number) => {
      const maxDepth = Math.max(1, Math.round(depth));
      for (let i = 0; i < total; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const diff = progress - i;
        if (diff < -1.0005 || diff > maxDepth) {
          if (el.style.visibility !== 'hidden') {
            el.style.visibility = 'hidden';
          }
          continue;
        }
        if (el.style.visibility === 'hidden') {
          el.style.visibility = '';
        }
        const style = getTransform(variant, diff, i, config);
        el.style.transform = style.transform;
        el.style.opacity = style.opacity.toFixed(4);
        el.style.filter = style.filter;
        el.style.clipPath = style.clip;
      }

      if (progressRef.current && total > 1) {
        const p = clamp(progress / (total - 1), 0, 1);
        progressRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
      }

      const roundedIndex = clamp(Math.round(progress), 0, total - 1);
      if (roundedIndex !== lastIndex.current) {
        lastIndex.current = roundedIndex;
        setActiveIndex(roundedIndex);
        onIndexChangeRef.current?.(roundedIndex);
      }
    },
    [total, depth, config, variant]
  );

  const effectiveHoldStart = Math.max(0.1, holdStart);
  const effectiveTransition = Math.max(0.3, scrollLength) * Math.max(1, total - 1);
  const effectiveHoldEnd = Math.max(0.2, holdEnd);
  const totalScrollBudget = effectiveHoldStart + effectiveTransition + effectiveHoldEnd;
  const totalScrollHeight = 100 + totalScrollBudget * 100;

  const getProgress = useCallback(() => {
    const container = containerRef.current;
    if (!container || total < 1) return 0;
    const view = container.ownerDocument.defaultView;
    const innerHeight = view ? view.innerHeight : 0;
    const rect = container.getBoundingClientRect();
    const scrollableDistance = rect.height - innerHeight;
    if (scrollableDistance <= 0) return 0;

    const s = clamp(-rect.top / scrollableDistance, 0, 1);
    const fStart = effectiveHoldStart / totalScrollBudget;
    const fTrans = effectiveTransition / totalScrollBudget;

    if (s <= fStart) {
      return 0;
    }
    if (s >= fStart + fTrans) {
      return total - 1;
    }
    const ratio = (s - fStart) / fTrans;
    return ratio * (total - 1);
  }, [total, effectiveHoldStart, effectiveTransition, totalScrollBudget]);

  const scrollToCard = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container || total <= 1) return;
    const win = container.ownerDocument.defaultView;
    if (!win) return;
    const innerHeight = win.innerHeight;
    const rect = container.getBoundingClientRect();
    const containerTop = win.scrollY + rect.top;
    const scrollableDistance = rect.height - innerHeight;
    if (scrollableDistance <= 0) return;

    const fStart = effectiveHoldStart / totalScrollBudget;
    const fTrans = effectiveTransition / totalScrollBudget;
    const fEnd = effectiveHoldEnd / totalScrollBudget;

    let targetRatio = 0;
    if (index === 0) {
      targetRatio = fStart * 0.5;
    } else if (index === total - 1) {
      targetRatio = fStart + fTrans + fEnd * 0.35;
    } else {
      const step = fTrans / (total - 1);
      targetRatio = fStart + (index - 0.5) * step;
    }

    win.scrollTo({
      top: containerTop + targetRatio * scrollableDistance,
      behavior: 'smooth',
    });
  }, [total, effectiveHoldStart, effectiveTransition, effectiveHoldEnd, totalScrollBudget]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const doc = container.ownerDocument;
    const win = doc.defaultView;
    if (!win) return;

    const damping = prefersReducedMotion ? 0 : clamp(smooth, 0, 0.95);

    const tick = (now: number) => {
      const lastTime = lastFrameTime.current || now;
      const dt = Math.min(0.05, Math.max(0, (now - lastTime) / 1000));
      lastFrameTime.current = now;

      const target = getProgress();
      const current = currentProgress.current;
      const next =
        current + (target - current) * (damping > 0 ? 1 - Math.pow(1 - damping, 60 * dt) : 1);
      currentProgress.current = next;
      applyStyles(next);

      if (Math.abs(target - next) > 0.0004) {
        animFrameId.current = win.requestAnimationFrame(tick);
      } else {
        currentProgress.current = target;
        applyStyles(target);
        isTicking.current = false;
      }
    };

    const onScrollOrResize = () => {
      if (!isTicking.current) {
        isTicking.current = true;
        lastFrameTime.current = 0;
        animFrameId.current = win.requestAnimationFrame(tick);
      }
    };

    currentProgress.current = getProgress();
    applyStyles(currentProgress.current);

    win.addEventListener('scroll', onScrollOrResize, { passive: true });
    doc.addEventListener('scroll', onScrollOrResize, { passive: true, capture: true });
    win.addEventListener('resize', onScrollOrResize);
    const ro = new ResizeObserver(onScrollOrResize);
    ro.observe(container);

    return () => {
      win.cancelAnimationFrame(animFrameId.current);
      isTicking.current = false;
      win.removeEventListener('scroll', onScrollOrResize);
      doc.removeEventListener('scroll', onScrollOrResize, { capture: true });
      win.removeEventListener('resize', onScrollOrResize);
      ro.disconnect();
    };
  }, [getProgress, applyStyles, smooth, prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      aria-label="Scrolling card stack"
      className={`relative w-full ${className}`}
      style={{ height: `${totalScrollHeight}vh` }}
    >
      <div
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-3 sm:py-5"
        style={{ perspective: `${Math.max(200, perspective)}px` }}
      >
        {header && (
          <div className="w-full max-w-7xl mx-auto mb-2 sm:mb-3.5 shrink-0 z-20">
            {header}
          </div>
        )}

        <div
          className="relative w-full"
          style={{
            maxWidth: `${Math.max(200, cardWidth)}px`,
            height:
              typeof cardHeight === 'number'
                ? `${100 * clamp(cardHeight, 0.2, 0.95)}vh`
                : cardHeight,
            maxHeight: header ? 'calc(100vh - 165px)' : 'calc(100vh - 80px)',
          }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="absolute inset-0 [backface-visibility:hidden] [transform-style:preserve-3d] [will-change:transform,opacity]"
              style={{ zIndex: index }}
            >
              {customChildren.length > 0 ? (
                card
              ) : (
                <DefaultCard
                  item={card as ScrollStackItem}
                  index={index}
                  total={total}
                  radius={config.radius}
                />
              )}
            </div>
          ))}
        </div>

        {(showProgress || showCounter) && total > 1 && (
          <div className="pointer-events-auto mt-3 sm:mt-4 flex items-center justify-center gap-3 z-30 shrink-0">
            <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E6E0D8] shadow-md">
              {showCounter && (
                <div className="flex items-center gap-1.5 mr-1">
                  {Array.from({ length: total }).map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => scrollToCard(idx)}
                      aria-label={`Switch to residence ${idx + 1}`}
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                        activeIndex === idx
                          ? 'bg-[#042F61] text-white shadow-xs'
                          : 'bg-transparent text-[#5E574E] hover:text-[#042F61] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      0{idx + 1}
                    </button>
                  ))}
                </div>
              )}
              {showProgress && (
                <span className="relative h-1.5 w-20 sm:w-28 overflow-hidden rounded-full bg-[#042F61]/15">
                  <span
                    ref={progressRef}
                    className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-[#DFB85A] to-[#9D7C38] transition-transform duration-75"
                    style={{ transform: 'scaleX(0)' }}
                  />
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
