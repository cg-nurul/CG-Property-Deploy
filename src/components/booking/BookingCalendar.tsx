import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BookingCalendarProps {
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (date: string) => void;
  blockedDates?: string[];
  minDate?: string; // YYYY-MM-DD, defaults to today
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  selectedDate,
  onSelectDate,
  blockedDates = [],
  minDate,
}) => {
  const today = useMemo(() => new Date(), []);
  const todayFormatted = useMemo(() => {
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, [today]);

  const effectiveMinDate = minDate || todayFormatted;

  // Viewing month & year
  const initialViewing = useMemo(() => {
    if (selectedDate) {
      const [y, m] = selectedDate.split('-').map(Number);
      return new Date(y, m - 1, 1);
    }
    return new Date(today.getFullYear(), today.getMonth(), 1);
  }, [selectedDate, today]);

  const [currentMonth, setCurrentMonth] = useState<Date>(initialViewing);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  // Calendar cells generation (Monday-first)
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // First day of month
    const firstDay = new Date(year, month, 1);
    // Day of week: Sunday is 0, convert to Monday = 0 ... Sunday = 6
    let startDayOfWeek = firstDay.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    // Total days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Days in previous month
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const cells: {
      dateString: string;
      dayNum: number;
      isCurrentMonth: boolean;
      isToday: boolean;
      isSelected: boolean;
      isDisabled: boolean;
    }[] = [];

    // Prev month padding
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      cells.push({
        dateString: dateStr,
        dayNum,
        isCurrentMonth: false,
        isToday: dateStr === todayFormatted,
        isSelected: dateStr === selectedDate,
        isDisabled: true, // Pad days disabled
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isPast = dateStr < effectiveMinDate;
      const isBlocked = blockedDates.includes(dateStr);
      cells.push({
        dateString: dateStr,
        dayNum: d,
        isCurrentMonth: true,
        isToday: dateStr === todayFormatted,
        isSelected: dateStr === selectedDate,
        isDisabled: isPast || isBlocked,
      });
    }

    // Next month padding to fill grid
    const remaining = 42 - cells.length; // 6 rows * 7
    if (remaining < 7) {
      for (let n = 1; n <= remaining; n++) {
        const nextMonth = month === 11 ? 0 : month + 1;
        const nextYear = month === 11 ? year + 1 : year;
        const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(n).padStart(2, '0')}`;
        cells.push({
          dateString: dateStr,
          dayNum: n,
          isCurrentMonth: false,
          isToday: dateStr === todayFormatted,
          isSelected: dateStr === selectedDate,
          isDisabled: true,
        });
      }
    }

    return cells;
  }, [currentMonth, selectedDate, todayFormatted, effectiveMinDate, blockedDates]);

  // Disable back navigation if on or before current month
  const isPrevMonthDisabled = useMemo(() => {
    const minM = new Date(today.getFullYear(), today.getMonth(), 1);
    return currentMonth <= minM;
  }, [currentMonth, today]);

  const handlePrevMonth = () => {
    if (isPrevMonthDisabled) return;
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div className="w-full bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-[#E6E0D8]">
      {/* Month Navigation Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-sm font-bold text-[#042F61] tracking-tight">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            disabled={isPrevMonthDisabled}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isPrevMonthDisabled
                ? 'border-transparent text-[#B5AEA4] cursor-not-allowed opacity-40'
                : 'border-[#E6E0D8] bg-white text-[#042F61] hover:bg-[#EDE8E1] active:scale-95'
            }`}
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-1.5 rounded-lg border border-[#E6E0D8] bg-white text-[#042F61] hover:bg-[#EDE8E1] transition-colors cursor-pointer active:scale-95"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {daysOfWeek.map((day) => (
          <span
            key={day}
            className="text-[11px] font-semibold text-[#8A8175] uppercase tracking-wider py-1"
          >
            {day}
          </span>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((cell, index) => {
          if (!cell.isCurrentMonth) {
            return (
              <div
                key={`pad-${index}`}
                className="h-9 sm:h-10 flex items-center justify-center text-xs text-[#C8C2BA] select-none"
              >
                {cell.dayNum}
              </div>
            );
          }

          return (
            <button
              key={cell.dateString}
              type="button"
              disabled={cell.isDisabled}
              onClick={() => onSelectDate(cell.dateString)}
              className={`relative h-9 sm:h-10 rounded-xl flex items-center justify-center text-xs font-semibold transition-all select-none cursor-pointer ${
                cell.isSelected
                  ? 'bg-[#042F61] text-white shadow-xs scale-102 ring-2 ring-[#DFB85A]/40'
                  : cell.isDisabled
                  ? 'text-[#BDB6AC] cursor-not-allowed opacity-45 line-through'
                  : 'text-[#14171A] hover:bg-[#EDE8E1] hover:text-[#042F61] active:scale-95'
              }`}
            >
              <span>{cell.dayNum}</span>

              {/* Today indicator dot */}
              {cell.isToday && !cell.isSelected && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#9D7C38]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Helper Legend */}
      <div className="flex items-center justify-between text-[11px] text-[#8A8175] mt-3 pt-3 border-t border-[#E6E0D8]/70">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#9D7C38]" />
          <span>Today</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#042F61]" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#C8C2BA] opacity-50" />
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  );
};
