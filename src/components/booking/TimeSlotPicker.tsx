import React from 'react';
import { BookingSlot } from '../../types';
import { Clock, Check } from 'lucide-react';

interface TimeSlotPickerProps {
  slots: BookingSlot[];
  selectedSlot: string; // e.g. "10:00 AM"
  onSelectSlot: (slotTime: string) => void;
  isLoading?: boolean;
  dateFormatted?: string;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  slots,
  selectedSlot,
  onSelectSlot,
  isLoading = false,
  dateFormatted,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-[#8A8175]">
          <Clock className="w-3.5 h-3.5 text-[#9D7C38] animate-spin" />
          <span>Checking available appointments...</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-10 rounded-xl bg-[#EDE8E1]/60 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E6E0D8] text-center text-xs text-[#8A8175]">
        No appointments available on this date. Please select another day on the calendar.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-[#042F61] flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#9D7C38]" />
          <span>Select Time Slot</span>
        </span>
        {dateFormatted && (
          <span className="text-[#8A8175] text-[11px]">{dateFormatted}</span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {slots.map((slot) => {
          const isSelected = selectedSlot === slot.time;
          const isDisabled = !slot.available;

          return (
            <button
              key={slot.id || slot.time}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelectSlot(slot.time)}
              className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#042F61] text-white shadow-xs ring-2 ring-[#DFB85A]/40'
                  : isDisabled
                  ? 'bg-[#F2EFEA] text-[#B5AEA4] border border-[#E6E0D8]/40 cursor-not-allowed line-through opacity-50'
                  : 'bg-white text-[#14171A] border border-[#E6E0D8] hover:border-[#DFB85A] hover:bg-[#FAF8F5] active:scale-98'
              }`}
            >
              <span>{slot.time}</span>
              {isSelected && <Check className="w-3.5 h-3.5 text-[#DFB85A]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
