import React from 'react';
import { PageRoute } from '../types';
import { MapPin } from 'lucide-react';
import { RealInteractiveMap } from './RealInteractiveMap';

interface LocationSectionProps {
  onNavigate: (route: PageRoute) => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onNavigate }) => {
  return (
    <section id="location-context" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE8E1] text-[#042F61] text-xs font-semibold uppercase tracking-widest">
          <MapPin className="w-3.5 h-3.5 text-[#DFB85A]" />
          <span>Find Us</span>
        </div>
      </div>

      <RealInteractiveMap onNavigate={onNavigate} />
    </section>
  );
};

