import React from 'react';
import { PageRoute } from '../types';
import { MapPin } from 'lucide-react';
import { RealInteractiveMap } from './RealInteractiveMap';

interface LocationSectionProps {
  onNavigate: (route: PageRoute) => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onNavigate }) => {
  return (
    <section id="location-context" className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-10 sm:pb-12 md:pb-14 lg:pb-16 px-[14px] w-full max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE8E1] text-[#042F61] text-xs font-semibold uppercase tracking-widest">
          <MapPin className="w-3.5 h-3.5 text-[#9D7C38]" />
          <span>Find Us</span>
        </div>
      </div>

      <RealInteractiveMap onNavigate={onNavigate} />
    </section>
  );
};

