"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Plus, Users, Trash2, Calendar } from "lucide-react";
import { Button } from "@components/primitives/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/primitives/Dialog";
import { Input } from "@components/primitives/Input";
import { Label } from "@components/primitives/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/primitives/Select";
import { useStableStore } from "@stores/stableStore";
import { cn } from "@lib/utils";

interface DayDetailModalProps {
  open: boolean;
  onClose: () => void;
  date: Date | null;
}

export function DayDetailModal({ open, onClose, date }: DayDetailModalProps) {
  const { shiftTypes, shiftAssignments, addShiftAssignment, removeShiftAssignment } = useStableStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    shiftTypeId: "",
    personName: "",
    isRecurring: false,
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!date) return null;

  const dayOfWeek = date.getDay();
  const formattedDate = date.toLocaleDateString("fi-FI", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Get assignments for this specific day
  const getAssignmentsForDay = () => {
    return shiftAssignments.filter((a) => {
      // Match by day of week for recurring assignments
      if (a.isRecurring && a.dayOfWeek === dayOfWeek) return true;
      // Match by specific date for non-recurring assignments
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

  const dayAssignments = getAssignmentsForDay();

  // Group assignments by shift type
  const assignmentsByShift = shiftTypes.map((shift) => ({
    shift,
    assignments: dayAssignments.filter((a) => a.shiftTypeId === shift.id),
  }));

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.shiftTypeId) {
      newErrors["shiftType"] = "Valitse vuoro";
    }
    if (!formData.personName.trim()) {
      newErrors["personName"] = "Syötä nimi";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addShiftAssignment({
      shiftTypeId: formData.shiftTypeId,
      personName: formData.personName.trim(),
      dayOfWeek: dayOfWeek,
      isRecurring: formData.isRecurring,
      weekDate: formData.isRecurring ? undefined : date.toISOString().split("T")[0],
      notes: formData.notes,
    });

    // Reset form
    setFormData({
      shiftTypeId: "",
      personName: "",
      isRecurring: false,
      notes: "",
    });
    setErrors({});
    setShowAddForm(false);
  };

  const handleRemove = (id: string) => {
    if (confirm("Poista tämä tallivuoro?")) {
      removeShiftAssignment(id);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {formattedDate}
          </DialogTitle>
          <DialogDescription>
            {dayAssignments.length === 0 
              ? "Ei vuoroja tälle päivälle" 
              : `${dayAssignments.length} vuoro${dayAssignments.length === 1 ? "" : "a"} tälle päivälle`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Shift Types with Assignments */}
          <div className="space-y-3">
            {assignmentsByShift.map(({ shift, assignments }) => (
              <div key={shift.id} className="border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: shift.color }}
                  />
                  <span className="font-semibold">{shift.name}</span>
                  <span className="text-sm text-muted-foreground">
                    ({shift.startTime} - {shift.endTime})
                  </span>
                </div>

                {assignments.length > 0 ? (
                  <div className="space-y-1">
                    {assignments.map((a) => (
                      <motion.div
                        key={a.id}
                        className="flex items-center justify-between gap-2 bg-muted/50 rounded px-2 py-1.5"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{a.personName}</span>
                          {a.isRecurring && (
                            <span className="text-xs text-muted-foreground bg-background px-1.5 py-0.5 rounded">
                              Toistuva
                            </span>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemove(a.id)}
                          className="h-7 w-7 p-0"
                        >
                          <Trash2 className="h-4 w-4 text-error" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    Ei henkilöitä vuorossa
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Add Assignment Form */}
          {showAddForm ? (
            <motion.div
              className="border rounded-lg p-4 space-y-3 bg-muted/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <h4 className="font-medium">Lisää vuoro</h4>

              {/* Shift Type */}
              <div className="space-y-2">
                <Label>Vuoro</Label>
                <Select
                  value={formData.shiftTypeId}
                  onValueChange={(value: string) => {
                    setFormData({ ...formData, shiftTypeId: value });
                    if (errors["shiftType"]) {
                      setErrors({ ...errors, shiftType: "" });
                    }
                  }}
                >
                  <SelectTrigger className={cn(errors["shiftType"] && "border-error")}>
                    <SelectValue placeholder="Valitse vuoro" />
                  </SelectTrigger>
                  <SelectContent>
                    {shiftTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: type.color }}
                          />
                          {type.name} ({type.startTime}-{type.endTime})
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Person Name */}
              <div className="space-y-2">
                <Label>Henkilö</Label>
                <Input
                  placeholder="Esim. Matti Meikäläinen"
                  value={formData.personName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormData({ ...formData, personName: e.target.value });
                    if (errors["personName"]) {
                      setErrors({ ...errors, personName: "" });
                    }
                  }}
                  className={cn(errors["personName"] && "border-error")}
                />
              </div>

              {/* Recurring Toggle */}
              <div className="space-y-2">
                <Label>Toistuvuus</Label>
                <div className="flex gap-2">
                  <motion.button
                    type="button"
                    className={cn(
                      "flex-1 py-2 px-3 rounded-md border text-sm font-medium transition-colors",
                      formData.isRecurring
                        ? "bg-primary-500 text-white border-primary-500"
                        : "bg-background border-input hover:bg-muted"
                    )}
                    onClick={() => setFormData({ ...formData, isRecurring: true })}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Joka viikko
                  </motion.button>
                  <motion.button
                    type="button"
                    className={cn(
                      "flex-1 py-2 px-3 rounded-md border text-sm font-medium transition-colors",
                      !formData.isRecurring
                        ? "bg-primary-500 text-white border-primary-500"
                        : "bg-background border-input hover:bg-muted"
                    )}
                    onClick={() => setFormData({ ...formData, isRecurring: false })}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Vain tälle päivälle
                  </motion.button>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label>Lisätiedot (valinnainen)</Label>
                <Input
                  placeholder="Esim. Varhainen aamu"
                  value={formData.notes}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                />
              </div>

              {/* Form Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowAddForm(false);
                    setFormData({ shiftTypeId: "", personName: "", isRecurring: false, notes: "" });
                    setErrors({});
                  }}
                  className="flex-1"
                >
                  Peruuta
                </Button>
                <Button size="sm" onClick={handleSubmit} className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  Lisää
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button onClick={() => setShowAddForm(true)} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Lisää vuoro tälle päivälle
              </Button>
            </motion.div>
          )}
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Sulje
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
