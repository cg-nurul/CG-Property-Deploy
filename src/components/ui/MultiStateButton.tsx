import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Loader2 } from 'lucide-react';

export type ButtonStatus = 'idle' | 'loading' | 'success';

interface MultiStateButtonProps {
  status?: ButtonStatus;
  idleText: string;
  loadingText?: string;
  successText?: string;
  idleIcon?: React.ReactNode;
  variant?: 'primary' | 'gold' | 'outline';
  className?: string;
  onClick?: () => Promise<void> | void;
}

/**
 * MultiStateButton
 * Inspired by https://motion.dev/examples/react-multi-state-badge
 * Seamless layout and status transitions between idle, loading, and success.
 */
export const MultiStateButton: React.FC<MultiStateButtonProps> = ({
  status: controlledStatus,
  idleText,
  loadingText = 'Processing...',
  successText = 'Confirmed',
  idleIcon,
  variant = 'primary',
  className = '',
  onClick
}) => {
  const [internalStatus, setInternalStatus] = useState<ButtonStatus>('idle');
  const currentStatus = controlledStatus !== undefined ? controlledStatus : internalStatus;

  const handleClick = async () => {
    if (currentStatus !== 'idle') return;
    if (onClick) {
      if (controlledStatus === undefined) {
        setInternalStatus('loading');
        try {
          await onClick();
          setInternalStatus('success');
          setTimeout(() => setInternalStatus('idle'), 2500);
        } catch {
          setInternalStatus('idle');
        }
      } else {
        onClick();
      }
    }
  };

  const bgStyles = {
    primary:
      currentStatus === 'success'
        ? 'bg-[#04615F] text-white border-[#04615F]'
        : 'bg-[#042F61] text-white hover:bg-[#235894] active:bg-[#044561] border-[#235894]/40',
    gold:
      currentStatus === 'success'
        ? 'bg-[#04615F] text-white border-[#04615F]'
        : 'btn-gold-shine text-[#14171A]',
    outline:
      currentStatus === 'success'
        ? 'bg-[#D6E9FF] text-[#042F61] border-[#588BC7]'
        : 'bg-white text-[#042F61] border-[#E6E0D8] hover:border-[#588BC7]'
  };

  return (
    <motion.button
      layout
      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      disabled={currentStatus === 'loading'}
      className={`relative inline-flex items-center justify-center rounded-xl font-semibold text-xs transition-colors select-none cursor-pointer border ${bgStyles[variant]} ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {currentStatus === 'idle' && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5"
          >
            <span>{idleText}</span>
            {idleIcon}
          </motion.span>
        )}

        {currentStatus === 'loading' && (
          <motion.span
            key="loading"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5"
          >
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>{loadingText}</span>
          </motion.span>
        )}

        {currentStatus === 'success' && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{successText}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
