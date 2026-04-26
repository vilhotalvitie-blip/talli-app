import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@components/primitives/Button";
import { cn } from "@lib/utils";
import { Lesson } from "@components/booking/types";

interface LessonCalendarProps {
  lessons: Lesson[];
  onSelectDate?: (date: Date) => void;
  onSelectLesson?: (lesson: Lesson) => void;
}

const weekDays = ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"];

const monthNames = [
  "Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu",
  "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu",
];

export function LessonCalendar({ lessons, onSelectDate, onSelectLesson }: LessonCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month and adjust for Monday start
  const firstDayOfMonth = new Date(year, month, 1);
  let startingDay = firstDayOfMonth.getDay(); // 0 = Sunday
  startingDay = startingDay === 0 ? 6 : startingDay - 1; // 0 = Monday

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Parse lesson dates to find which days have lessons
  const lessonsByDate = new Map<string, Lesson[]>();
  lessons.forEach((lesson) => {
    // Parse Finnish date format "Ma 27.4." or "Ti 28.4."
    const dateMatch = lesson.date.match(/\d{1,2}\.\d{1,2}\./);
    if (dateMatch) {
      const [day, monthNum] = dateMatch[0].split(".").map(Number);
      const key = `${year}-${String(monthNum).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      if (!lessonsByDate.has(key)) {
        lessonsByDate.set(key, []);
      }
      lessonsByDate.get(key)!.push(lesson);
    }
  });

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
    setSelectedDate(null);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const handleDateClick = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return;
    const date = new Date(year, month, day);
    setSelectedDate(date);
    onSelectDate?.(date);
  };

  // Generate calendar days
  const days: Array<{ day: number; isCurrentMonth: boolean; key?: string }> = [];

  // Previous month days
  for (let i = startingDay - 1; i >= 0; i--) {
    days.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
  }

  // Current month days
  const today = new Date();
  const isThisMonth = today.getMonth() === month && today.getFullYear() === year;

  for (let day = 1; day <= daysInMonth; day++) {
    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    days.push({ day, isCurrentMonth: true, key });
  }

  // Next month days to fill the grid (42 cells = 6 rows)
  const remainingCells = 42 - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    days.push({ day: i, isCurrentMonth: false });
  }

  const getSelectedDateKey = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const selectedLessons = selectedDate
    ? lessonsByDate.get(getSelectedDateKey(selectedDate)) || []
    : [];

  // Get formatted selected date for display
  const selectedDay = selectedDate ? selectedDate.getDate() : null;
  const selectedMonthIndex = selectedDate ? selectedDate.getMonth() : -1;
  const selectedMonth = selectedMonthIndex >= 0 ? monthNames[selectedMonthIndex].toLowerCase() : "";

  return (
    <div className="bg-background rounded-lg border shadow-sm">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-primary-500" />
          <h3 className="text-lg font-semibold">
            {monthNames[month]} {year}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            Tänään
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 border-b bg-muted/30">
        {weekDays.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {days.map((dayInfo, index) => {
          const { day, isCurrentMonth, key } = dayInfo;
          const dayLessons = key ? lessonsByDate.get(key) || [] : [];
          const hasLessons = dayLessons.length > 0;
          const isToday = dayInfo.isCurrentMonth && isThisMonth && day === today.getDate();
          const isSelected = selectedDate && dayInfo.isCurrentMonth && day === selectedDate.getDate();

          return (
            <button
              key={index}
              onClick={() => handleDateClick(day, isCurrentMonth)}
              disabled={!isCurrentMonth}
              className={cn(
                "min-h-[80px] p-2 border-r border-b last:border-r-0 text-left transition-colors relative",
                !isCurrentMonth && "bg-muted/20 text-muted-foreground",
                isCurrentMonth && "hover:bg-muted/50",
                isToday && "bg-primary-50 dark:bg-primary-950/30",
                isSelected && "bg-primary-100 dark:bg-primary-900/50 ring-2 ring-inset ring-primary-500"
              )}
            >
              <span
                className={cn(
                  "text-sm font-medium inline-flex items-center justify-center w-7 h-7 rounded-full",
                  isToday
                    ? "bg-primary-500 text-white"
                    : isSelected
                    ? "text-primary-700 dark:text-primary-300"
                    : "text-foreground"
                )}
              >
                {day}
              </span>

              {/* Lesson indicators */}
              {hasLessons && (
                <div className="mt-1 space-y-1">
                  {dayLessons.slice(0, 2).map((lesson, i) => (
                    <div
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectLesson?.(lesson);
                      }}
                      className={cn(
                        "text-xs px-1.5 py-0.5 rounded truncate cursor-pointer",
                        "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                      )}
                    >
                      {lesson.time.split(" - ")[0]} {lesson.title.slice(0, 15)}
                      {lesson.title.length > 15 && "..."}
                    </div>
                  ))}
                  {dayLessons.length > 2 && (
                    <div className="text-xs text-muted-foreground px-1.5">
                      +{dayLessons.length - 2} lisää
                    </div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Date Lessons */}
      {selectedDate && (
        <div className="p-4 border-t bg-muted/20">
          <h4 className="font-medium mb-3">
            {selectedDay}. {selectedMonth} - Tunnit
          </h4>
          {selectedLessons.length > 0 ? (
            <div className="space-y-2">
              {selectedLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  onClick={() => onSelectLesson?.(lesson)}
                  className={cn(
                    "flex items-center justify-between p-3 bg-background rounded-lg border",
                    "hover:border-primary-500 cursor-pointer transition-colors"
                  )}
                >
                  <div>
                    <p className="font-medium">{lesson.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {lesson.time} • {lesson.stable}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary-600">{lesson.price}</p>
                    <p className="text-xs text-muted-foreground">
                      {lesson.spots} paikkaa
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">Ei tunteja tälle päivälle</p>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="p-3 border-t bg-muted/30 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary-500" />
          <span>Tänään</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary-100 dark:bg-primary-900" />
          <span>Tunteja saatavilla</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-primary-500" />
          <span>Valittu päivä</span>
        </div>
      </div>
    </div>
  );
}
