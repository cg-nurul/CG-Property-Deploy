import React, { useMemo, useState } from 'react';
import { Calendar, Clock, Moon, LogOut, ChevronDown, Check } from 'lucide-react';

interface CheckOutMenuProps {
  checkInDate: string; // YYYY-MM-DD
  checkOutDate: string; // YYYY-MM-DD
  onSelectCheckOutDate: (date: string) => void;
  checkOutTime: string; // e.g. "12:00 PM"
  onSelectCheckOutTime: (time: string) => void;
}

const CHECKOUT_TIME_OPTIONS = [
  { value: '10:00 AM', label: '10:00 AM', tag: 'Early Departure' },
  { value: '11:00 AM', label: '11:00 AM', tag: 'Standard' },
  { value: '12:00 PM', label: '12:00 PM', tag: 'Recommended' },
  { value: '01:00 PM', label: '01:00 PM', tag: 'Late Check-out' },
  { value: '02:00 PM', label: '02:00 PM', tag: 'Executive Late' },
];

export const CheckOutMenu: React.FC<CheckOutMenuProps> = ({
  checkInDate,
  checkOutDate,
  onSelectCheckOutDate,
  checkOutTime,
  onSelectCheckOutTime,
}) => {
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState<boolean>(false);

  // Calculate minimum checkout date (checkInDate + 1 day)
  const minCheckOutDate = useMemo(() => {
    if (!checkInDate) return '';
    try {
      const [y, m, d] = checkInDate.split('-').map(Number);
      const inDate = new Date(y, m - 1, d);
      inDate.setDate(inDate.getDate() + 1);
      const yr = inDate.getFullYear();
      const mo = String(inDate.getMonth() + 1).padStart(2, '0');
      const da = String(inDate.getDate()).padStart(2, '0');
      return `${yr}-${mo}-${da}`;
    } catch {
      return '';
    }
  }, [checkInDate]);

  // Calculate nights
  const nightsCount = useMemo(() => {
    if (!checkInDate || !checkOutDate) return 1;
    try {
      const [y1, m1, d1] = checkInDate.split('-').map(Number);
      const [y2, m2, d2] = checkOutDate.split('-').map(Number);
      const t1 = new Date(y1, m1 - 1, d1).getTime();
      const t2 = new Date(y2, m2 - 1, d2).getTime();
      const diff = Math.round((t2 - t1) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 1;
    } catch {
      return 1;
    }
  }, [checkInDate, checkOutDate]);

  // Quick preset helper
  const handleSelectPresetNights = (nights: number) => {
    if (!checkInDate) return;
    try {
      const [y, m, d] = checkInDate.split('-').map(Number);
      const target = new Date(y, m - 1, d);
      target.setDate(target.getDate() + nights);
      const yr = target.getFullYear();
      const mo = String(target.getMonth() + 1).padStart(2, '0');
      const da = String(target.getDate()).padStart(2, '0');
      onSelectCheckOutDate(`${yr}-${mo}-${da}`);
    } catch {
      // noop
    }
  };

  const formattedCheckOut = useMemo(() => {
    if (!checkOutDate) return '';
    try {
      const [y, m, d] = checkOutDate.split('-').map(Number);
      return new Date(y, m - 1, d).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return checkOutDate;
    }
  }, [checkOutDate]);

  return (
    <div className="space-y-3.5 bg-[#FAF8F5] p-3.5 sm:p-4 rounded-2xl border border-[#E6E0D8]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#042F61] text-white flex items-center justify-center">
            <LogOut className="w-3.5 h-3.5 text-[#DFB85A]" />
          </div>
          <span className="text-xs font-bold text-[#042F61] tracking-tight">
            Check-out Details
          </span>
        </div>

        {/* Night Count Pill */}
        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#DFB85A] text-[11px] font-bold text-[#042F61]">
          <Moon className="w-3 h-3 text-[#9D7C38]" />
          <span>{nightsCount} {nightsCount === 1 ? 'Night' : 'Nights'} Stay</span>
        </div>
      </div>

      {/* Quick Stay Length Presets */}
      <div>
        <label className="block text-[11px] font-semibold text-[#8A8175] mb-1.5">
          Quick Stay Duration
        </label>
        <div className="flex flex-wrap gap-1.5">
          {[
            { nights: 1, label: '1 Night' },
            { nights: 2, label: '2 Nights' },
            { nights: 3, label: '3 Nights' },
            { nights: 5, label: '5 Nights' },
            { nights: 7, label: '1 Week' },
            { nights: 14, label: '2 Weeks' },
          ].map((preset) => {
            const isSelected = nightsCount === preset.nights;
            return (
              <button
                key={preset.nights}
                type="button"
                onClick={() => handleSelectPresetNights(preset.nights)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#042F61] text-white shadow-xs'
                    : 'bg-white hover:bg-[#EDE8E1] text-[#5E574E] border border-[#E6E0D8]'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Check-out Date & Check-out Time Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* Check-out Date */}
        <div>
          <label className="block text-xs font-semibold text-[#042F61] mb-1">
            Check-out Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A8175]">
              <Calendar className="w-4 h-4" />
            </div>
            <input
              type="date"
              min={minCheckOutDate}
              value={checkOutDate}
              onChange={(e) => onSelectCheckOutDate(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-white border border-[#E6E0D8] text-[#14171A] font-medium focus:outline-none focus:border-[#DFB85A] focus:ring-1 focus:ring-[#DFB85A] transition-all cursor-pointer"
            />
          </div>
          <span className="text-[10px] text-[#8A8175] mt-1 block">
            {formattedCheckOut}
          </span>
        </div>

        {/* Check-out Time Menu */}
        <div className="relative">
          <label className="block text-xs font-semibold text-[#042F61] mb-1">
            Check-out Time
          </label>
          <button
            type="button"
            onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
            className="w-full pl-3 pr-2.5 py-2 rounded-xl text-xs bg-white border border-[#E6E0D8] text-[#14171A] font-medium flex items-center justify-between focus:outline-none focus:border-[#DFB85A] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2 truncate">
              <Clock className="w-4 h-4 text-[#9D7C38] shrink-0" />
              <span className="truncate">{checkOutTime || '12:00 PM'}</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-[#8A8175] transition-transform ${isTimeDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Time Menu Dropdown */}
          {isTimeDropdownOpen && (
            <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-[#E6E0D8] rounded-xl shadow-lg p-1 space-y-0.5 animate-fadeIn">
              {CHECKOUT_TIME_OPTIONS.map((opt) => {
                const isSelected = checkOutTime === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onSelectCheckOutTime(opt.value);
                      setIsTimeDropdownOpen(false);
                    }}
                    className={`w-full px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#FAF8F5] text-[#042F61] font-bold'
                        : 'hover:bg-[#FAF8F5] text-[#5E574E]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isSelected && <Check className="w-3 h-3 text-[#9D7C38]" />}
                      <span>{opt.label}</span>
                    </div>
                    <span className="text-[10px] text-[#8A8175] bg-[#FAF8F5] px-1.5 py-0.5 rounded">
                      {opt.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
          <span className="text-[10px] text-[#8A8175] mt-1 block">
            Flexible handover by concierge
          </span>
        </div>
      </div>
    </div>
  );
};
