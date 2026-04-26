import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@components/primitives/Button";
import { cn } from "@lib/utils";

interface CalendarPickerProps {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
  onClose: () => void;
}

const weekDays = ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"];

const monthNames = [
  "Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu",
  "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"
];

export function CalendarPicker({ selectedDate, onSelect, onClose }: CalendarPickerProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    // Convert to Finnish format (Monday = 0)
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateSelect = (day: number) => {
    const selected = new Date(currentYear, currentMonth, day);
    onSelect(selected);
    onClose();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const isSelectedDate = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  const isToday = (day: number) => {
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear
    );
  };

  // Quick select buttons for next 7 days
  const getNextDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const formatQuickDate = (date: Date) => {
    const dayNames = ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"];
    const dayName = dayNames[date.getDay()];
    const dayNum = date.getDate();
    const monthNum = date.getMonth() + 1;
    return `${dayName} ${dayNum}.${monthNum}.`;
  };

  const nextDays = getNextDays();

  return (
    <div className="bg-background rounded-lg shadow-lg border p-4 w-[320px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-1 hover:bg-muted rounded-md transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="font-semibold text-lg">
          {monthNames[currentMonth]} {currentYear}
        </span>
        <button
          onClick={handleNextMonth}
          className="p-1 hover:bg-muted rounded-md transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-muted-foreground py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {emptyDays.map((i) => (
          <div key={`empty-${i}`} className="h-9" />
        ))}
        {days.map((day) => (
          <button
            key={day}
            onClick={() => handleDateSelect(day)}
            className={cn(
              "h-9 w-9 rounded-md text-sm font-medium transition-colors",
              "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring",
              isSelectedDate(day) && "bg-primary-500 text-white hover:bg-primary-600",
              isToday(day) && !isSelectedDate(day) && "border-2 border-primary-500 text-primary-600",
              !isSelectedDate(day) && !isToday(day) && "text-foreground"
            )}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Quick select section */}
      <div className="mt-4 pt-4 border-t">
        <p className="text-xs text-muted-foreground mb-2">Pikavalinta:</p>
        <div className="flex flex-wrap gap-2">
          {nextDays.map((date, index) => (
            <button
              key={index}
              onClick={() => {
                onSelect(date);
                onClose();
              }}
              className={cn(
                "px-2 py-1 text-xs rounded-md border transition-colors",
                "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring",
                selectedDate &&
                  selectedDate.toDateString() === date.toDateString()
                  ? "bg-primary-500 text-white border-primary-500"
                  : "bg-background"
              )}
            >
              {formatQuickDate(date)}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex gap-2">
        <Button variant="outline" size="sm" onClick={onClose} className="flex-1">
          Peruuta
        </Button>
        <Button
          size="sm"
          onClick={() => {
            onSelect(today);
            onClose();
          }}
          className="flex-1"
        >
          Tänään
        </Button>
      </div>
    </div>
  );
}
