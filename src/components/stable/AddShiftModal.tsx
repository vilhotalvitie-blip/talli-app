"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Plus, Users, Calendar, Repeat } from "lucide-react";
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

interface AddShiftModalProps {
  open: boolean;
  onClose: () => void;
  preselectedSlot?: { day: number; shiftTypeId: string } | null;
}

const dayNames = [
  "Sunnuntai",
  "Maanantai",
  "Tiistai",
  "Keskiviikko",
  "Torstai",
  "Perjantai",
  "Lauantai",
];

export function AddShiftModal({ open, onClose, preselectedSlot }: AddShiftModalProps) {
  const { shiftTypes, addShiftAssignment } = useStableStore();

  const [formData, setFormData] = useState({
    shiftTypeId: preselectedSlot?.shiftTypeId || "",
    dayOfWeek: preselectedSlot?.day !== undefined ? String(preselectedSlot.day) : "1",
    personName: "",
    isRecurring: true,
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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
      dayOfWeek: parseInt(formData.dayOfWeek),
      isRecurring: formData.isRecurring,
      notes: formData.notes,
    });

    // Reset form
    setFormData({
      shiftTypeId: "",
      dayOfWeek: "1",
      personName: "",
      isRecurring: true,
      notes: "",
    });
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setFormData({
      shiftTypeId: "",
      dayOfWeek: "1",
      personName: "",
      isRecurring: true,
      notes: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lisää tallivuoro</DialogTitle>
          <DialogDescription>
            Määritä henkilö tallivuoroon
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Shift Type */}
          <div className="space-y-2">
            <Label htmlFor="shiftType">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Vuoro
              </div>
            </Label>
            <Select
              value={formData.shiftTypeId}
              onValueChange={(value: string) => {
                setFormData({ ...formData, shiftTypeId: value });
                if (errors["shiftType"]) {
                  setErrors({ ...errors, shiftType: "" });
                }
              }}
            >
              <SelectTrigger id="shiftType" className={cn(errors["shiftType"] && "border-error")}>
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
            {errors["shiftType"] && (
              <p className="text-sm text-error">{errors["shiftType"]}</p>
            )}
          </div>

          {/* Day of Week */}
          <div className="space-y-2">
            <Label htmlFor="dayOfWeek">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Viikonpäivä
              </div>
            </Label>
            <Select
              value={formData.dayOfWeek}
              onValueChange={(value) =>
                setFormData({ ...formData, dayOfWeek: value })
              }
            >
              <SelectTrigger id="dayOfWeek">
                <SelectValue placeholder="Valitse päivä" />
              </SelectTrigger>
              <SelectContent>
                {dayNames.map((day, index) => (
                  <SelectItem key={index} value={String(index)}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Person Name */}
          <div className="space-y-2">
            <Label htmlFor="personName">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Henkilö
              </div>
            </Label>
            <Input
              id="personName"
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
            {errors["personName"] && (
              <p className="text-sm text-error">{errors["personName"]}</p>
            )}
          </div>

          {/* Recurring Toggle */}
          <div className="space-y-2">
            <Label>
              <div className="flex items-center gap-2">
                <Repeat className="h-4 w-4" />
                Toistuvuus
              </div>
            </Label>
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
                Kerta
              </motion.button>
            </div>
            <p className="text-xs text-muted-foreground">
              {formData.isRecurring
                ? "Vuoro toistuu automaattisesti joka viikko"
                : "Vuoro vain valittuna päivänä"}
            </p>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Lisätiedot (valinnainen)</Label>
            <Input
              id="notes"
              placeholder="Esim. Varhainen aamu, tuo omat eväät"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            <X className="h-4 w-4 mr-2" />
            Peruuta
          </Button>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button onClick={handleSubmit}>
              <Plus className="h-4 w-4 mr-2" />
              Lisää vuoro
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
