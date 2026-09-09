import React from 'react';
import { motion } from 'motion/react';
import { PageRoute } from '../../types';
import { 
  FilledHome, 
  FilledBuilding, 
  FilledMapPin, 
  FilledInfo, 
  FilledPhone 
} from './FilledIcons';

interface DockItemProps {
  label: string;
  route: PageRoute;
  active: boolean;
  onClick: () => void;
}

const getNavIcon = (route: PageRoute) => {
  if (route === '/') return <FilledHome className="w-3.5 h-3.5 shrink-0 fill-current" />;
  if (route.startsWith('/properties')) return <FilledBuilding className="w-3.5 h-3.5 shrink-0 fill-current" />;
  if (route.startsWith('/destinations')) return <FilledMapPin className="w-3.5 h-3.5 shrink-0 fill-current" />;
  if (route === '/about') return <FilledInfo className="w-3.5 h-3.5 shrink-0 fill-current" />;
  if (route === '/contact') return <FilledPhone className="w-3.5 h-3.5 shrink-0 fill-current" />;
  return null;
};

const DockItem: React.FC<DockItemProps> = ({ label, route, active, onClick }) => {
  const icon = getNavIcon(route);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer select-none focus:outline-hidden flex items-center gap-1.5 ${
        active
          ? 'text-white shadow-xs'
          : 'text-[#4A453E] hover:text-[#042F61] hover:bg-[#D6E9FF] hover:border-[#588BC7]/50 border border-transparent'
      }`}
    >
      {/* Active pill background indicator with spring layout motion */}
      {active && (
        <motion.div
          layoutId="dock-active-indicator"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="absolute inset-0 bg-gradient-to-r from-[#042F61] via-[#235894] to-[#044561] rounded-full shadow-xs -z-10"
        />
      )}

      {/* Filled Icon with identical color to text */}
      <span className="shrink-0 flex items-center text-current">
        {icon}
      </span>

      {/* Label */}
      <span>{label}</span>
    </motion.button>
  );
};

interface DockProps {
  items: { label: string; route: PageRoute; active: boolean }[];
  onSelect: (route: PageRoute) => void;
  className?: string;
}

/**
 * Dock Navigation Component
 * Stabilized and isolated hover animation with icons and high-contrast hover highlighting.
 */
export const Dock: React.FC<DockProps> = ({ items, onSelect, className = '' }) => {
  return (
    <nav
      id="desktop-nav-dock"
      className={`pointer-events-auto hidden md:flex items-center gap-1 bg-[#EDE8E1]/90 backdrop-blur-lg p-1.5 rounded-full border border-[#DFD8CE] shadow-xs ${className}`}
    >
      {items.map((item) => (
        <DockItem
          key={item.route}
          label={item.label}
          route={item.route}
          active={item.active}
          onClick={() => onSelect(item.route)}
        />
      ))}
    </nav>
  );
};

