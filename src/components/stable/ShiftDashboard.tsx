"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Users, Clock, CalendarDays, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@components/primitives/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/primitives/Card";
import { useState } from "react";
import { useStableStore } from "@stores/stableStore";
import { cn } from "@lib/utils";
import { AddShiftModal } from "./AddShiftModal";
import { DayDetailModal } from "./DayDetailModal";
import { CountUp } from "@components/animation/CountUp";
import { StaggerContainer, StaggerItem } from "@components/animation/StaggerContainer";

interface ShiftDashboardProps {
  onBack: () => void;
}

const dayNames = ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"];

export function ShiftDashboard({ onBack }: ShiftDashboardProps) {
  const { shiftTypes, shiftAssignments, removeShiftAssignment } = useStableStore();
  const [addShiftOpen, setAddShiftOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ day: number; shiftTypeId: string } | null>(null);
  const [viewMode, setViewMode] = useState<"weekly" | "monthly">("weekly");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dayDetailOpen, setDayDetailOpen] = useState(false);

  // Get current week's assignments
  const getAssignmentsForSlot = (dayOfWeek: number, shiftTypeId: string) => {
    return shiftAssignments.filter(
      (a) => a.dayOfWeek === dayOfWeek && a.shiftTypeId === shiftTypeId && a.isRecurring
    );
  };

  // Get assignments for a specific date
  const getAssignmentsForDate = (date: Date) => {
    const dayOfWeek = date.getDay();
    return shiftAssignments.filter((a) => {
      if (a.isRecurring && a.dayOfWeek === dayOfWeek) return true;
      if (!a.isRecurring && a.weekDate) {
        const assignmentDate = new Date(a.weekDate);
        return (
          assignmentDate.getDate() === date.getDate() &&
          assignmentDate.getMonth() === date.getMonth() &&
          assignmentDate.getFullYear() === date.getFullYear()
        );
      }
      return false;
    });
  };

  // Get unique people count this week
  const uniquePeopleThisWeek = new Set(shiftAssignments.map((a) => a.personName)).size;

  // Calendar generation
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const handleSlotClick = (day: number, shiftTypeId: string) => {
    setSelectedSlot({ day, shiftTypeId });
    setAddShiftOpen(true);
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setDayDetailOpen(true);
  };

  const handleRemoveAssignment = (id: string) => {
    if (confirm("Poista tämä tallivuoro?")) {
      removeShiftAssignment(id);
    }
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1));
      return newMonth;
    });
  };

  const calendarDays = getCalendarDays();
  const monthTitle = currentMonth.toLocaleDateString("fi-FI", { month: "long", year: "numeric" });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Takaisin
        </Button>
        <h1 className="text-2xl font-bold">Tallivuorot</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                <Users className="h-4 w-4 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Henkilöitä vuorossa</p>
                <p className="text-2xl font-bold">
                  <CountUp end={uniquePeopleThisWeek} duration={1} />
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-secondary-100 dark:bg-secondary-900 rounded-lg">
                <Clock className="h-4 w-4 text-secondary-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vuorot viikossa</p>
                <p className="text-2xl font-bold">
                  <CountUp end={shiftAssignments.length} duration={1} />
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-warning/20 rounded-lg">
                <CalendarDays className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vuorotyypit</p>
                <p className="text-2xl font-bold">{shiftTypes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-success/20 rounded-lg">
                <Clock className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vuoroja päivässä</p>
                <p className="text-2xl font-bold">{shiftTypes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shift Types Info */}
      <Card>
        <CardHeader>
          <CardTitle>Vuorotyypit</CardTitle>
          <CardDescription>Tallin oletusvuorojen ajat</CardDescription>
        </CardHeader>
        <CardContent>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {shiftTypes.map((shift) => (
              <StaggerItem key={shift.id}>
                <motion.div
                  className="p-4 rounded-lg border-2"
                  style={{ borderColor: shift.color }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: shift.color }}
                    />
                    <span className="font-semibold">{shift.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {shift.startTime} - {shift.endTime}
                  </p>
                  {shift.description && (
                    <p className="text-xs text-muted-foreground mt-1">{shift.description}</p>
                  )}
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </CardContent>
      </Card>

      {/* Schedule View with Toggle */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>
                {viewMode === "weekly" ? "Viikon vuorot" : "Kuukauden vuorot"}
              </CardTitle>
              <CardDescription>
                {viewMode === "weekly" 
                  ? "Klikkaa solua lisätäksesi vuoron" 
                  : monthTitle}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {/* View Toggle */}
              <div className="flex bg-muted rounded-lg p-1">
                <motion.button
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                    viewMode === "weekly"
                      ? "bg-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setViewMode("weekly")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Viikko
                </motion.button>
                <motion.button
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                    viewMode === "monthly"
                      ? "bg-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setViewMode("monthly")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Kuukausi
                </motion.button>
              </div>
              
              {/* Month Navigation (only in monthly view) */}
              {viewMode === "monthly" && (
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="sm" onClick={() => setAddShiftOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Lisää vuoro
                </Button>
              </motion.div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {viewMode === "weekly" ? (
              <motion.div
                key="weekly"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {shiftAssignments.length === 0 ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    </motion.div>
                    <p className="text-muted-foreground font-medium">Ei tallivuoroja vielä</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Lisää ensimmäinen vuoro aloittaaksesi
                    </p>
                    <motion.div className="mt-4" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button onClick={() => setAddShiftOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Lisää vuoro
                      </Button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {/* Day headers */}
                    <div className="grid grid-cols-8 gap-2 text-sm font-medium text-muted-foreground">
                      <div className="text-center py-2">Vuoro</div>
                      {dayNames.map((day, index) => (
                        <div key={index} className="text-center py-2 bg-muted rounded">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Shift rows */}
                    <StaggerContainer className="space-y-2">
                      {shiftTypes.map((shift) => (
                        <StaggerItem key={shift.id}>
                          <motion.div
                            className="grid grid-cols-8 gap-2"
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                          >
                            {/* Shift type label */}
                            <div
                              className="flex items-center gap-2 p-2 rounded-l-lg"
                              style={{ backgroundColor: `${shift.color}20` }}
                            >
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: shift.color }}
                              />
                              <span className="text-xs font-medium truncate">{shift.name}</span>
                            </div>

                            {/* Days */}
                            {Array.from({ length: 7 }, (_, dayIndex) => {
                              const assignments = getAssignmentsForSlot(dayIndex, shift.id);
                              return (
                                <motion.div
                                  key={dayIndex}
                                  className={cn(
                                    "min-h-[60px] p-2 rounded border-2 border-dashed cursor-pointer transition-all",
                                    assignments.length > 0
                                      ? "border-solid bg-muted/30"
                                      : "border-muted hover:border-primary-300 hover:bg-muted/10"
                                  )}
                                  onClick={() => handleSlotClick(dayIndex, shift.id)}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  {assignments.length > 0 ? (
                                    <div className="space-y-1">
                                      {assignments.map((a) => (
                                        <motion.div
                                          key={a.id}
                                          className="flex items-center justify-between gap-1 bg-background rounded px-1 py-0.5 text-xs shadow-sm"
                                          whileHover={{ scale: 1.05 }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveAssignment(a.id);
                                          }}
                                        >
                                          <span className="truncate font-medium">{a.personName}</span>
                                          <Trash2 className="h-3 w-3 text-error opacity-0 group-hover:opacity-100" />
                                        </motion.div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="h-full flex items-center justify-center">
                                      <Plus className="h-4 w-4 text-muted-foreground opacity-50" />
                                    </div>
                                  )}
                                </motion.div>
                              );
                            })}
                          </motion.div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="monthly"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Monthly Calendar Grid */}
                <div className="space-y-2">
                  {/* Day headers */}
                  <div className="grid grid-cols-7 gap-1">
                    {dayNames.map((day) => (
                      <div key={day} className="text-center py-2 text-sm font-medium text-muted-foreground">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar days */}
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((date, index) => {
                      const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                      const isToday = new Date().toDateString() === date.toDateString();
                      const dayAssignments = getAssignmentsForDate(date);
                      const hasAssignments = dayAssignments.length > 0;

                      return (
                        <motion.div
                          key={index}
                          className={cn(
                            "min-h-[100px] p-2 border rounded-lg cursor-pointer transition-all",
                            isCurrentMonth ? "bg-background" : "bg-muted/30 text-muted-foreground",
                            isToday && "ring-2 ring-primary-500",
                            hasAssignments ? "border-primary-200" : "border-transparent hover:border-muted"
                          )}
                          onClick={() => handleDayClick(date)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className={cn(
                            "text-sm font-medium mb-1",
                            isToday && "text-primary-600"
                          )}>
                            {date.getDate()}
                          </div>
                          
                          {hasAssignments && (
                            <div className="space-y-1">
                              {shiftTypes.map((shift) => {
                                const shiftDayAssignments = dayAssignments.filter(a => a.shiftTypeId === shift.id);
                                if (shiftDayAssignments.length === 0) return null;
                                
                                return (
                                  <div key={shift.id} className="flex items-center gap-1">
                                    <div
                                      className="w-2 h-2 rounded-full flex-shrink-0"
                                      style={{ backgroundColor: shift.color }}
                                    />
                                    <span className="text-xs truncate">
                                      {shiftDayAssignments.map(a => a.personName).join(", ")}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Add Shift Modal */}
      <AddShiftModal
        open={addShiftOpen}
        onClose={() => {
          setAddShiftOpen(false);
          setSelectedSlot(null);
        }}
        preselectedSlot={selectedSlot}
      />

      {/* Day Detail Modal */}
      <DayDetailModal
        open={dayDetailOpen}
        onClose={() => {
          setDayDetailOpen(false);
          setSelectedDate(null);
        }}
        date={selectedDate}
      />
    </div>
  );
}
