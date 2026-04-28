"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Plus, Users, Clock, CalendarDays, Trash2 } from "lucide-react";
import { Button } from "@components/primitives/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/primitives/Card";
import { useState } from "react";
import { useStableStore } from "@stores/stableStore";
import { cn } from "@lib/utils";
import { AddShiftModal } from "./AddShiftModal";
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

  // Get current week's assignments
  const getAssignmentsForSlot = (dayOfWeek: number, shiftTypeId: string) => {
    return shiftAssignments.filter(
      (a) => a.dayOfWeek === dayOfWeek && a.shiftTypeId === shiftTypeId && a.isRecurring
    );
  };

  // Get unique people count this week
  const uniquePeopleThisWeek = new Set(shiftAssignments.map((a) => a.personName)).size;

  const handleSlotClick = (day: number, shiftTypeId: string) => {
    setSelectedSlot({ day, shiftTypeId });
    setAddShiftOpen(true);
  };

  const handleRemoveAssignment = (id: string) => {
    if (confirm("Poista tämä tallivuoro?")) {
      removeShiftAssignment(id);
    }
  };

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

      {/* Weekly Schedule */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Viikon vuorot</CardTitle>
              <CardDescription>Klikkaa solua lisätäksesi vuoron</CardDescription>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="sm" onClick={() => setAddShiftOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Lisää vuoro
              </Button>
            </motion.div>
          </div>
        </CardHeader>
        <CardContent>
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
    </div>
  );
}
