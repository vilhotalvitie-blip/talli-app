import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
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
import { useStableStore, EventType } from "@stores/stableStore";

interface AddEventModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormErrors {
  horseId?: string;
  type?: string;
  title?: string;
  date?: string;
}

const eventTypeLabels: Record<EventType, string> = {
  kengitys: "Kengitys",
  hammashoito: "Hammashoito",
  elainlaakari: "Eläinlääkäri",
  kilpailu: "Kilpailu",
  valmennus: "Valmennus",
  rokotus: "Rokotus",
  muu: "Muu",
};

const eventTypeColors: Record<EventType, string> = {
  kengitys: "#f97316",
  hammashoito: "#ef4444",
  elainlaakari: "#e11d48",
  kilpailu: "#8b5cf6",
  valmennus: "#3b82f6",
  rokotus: "#22c55e",
  muu: "#6b7280",
};

export function AddEventModal({ open, onClose }: AddEventModalProps) {
  const { horses, addEvent } = useStableStore();
  const [formData, setFormData] = useState({
    horseId: "",
    type: "" as EventType | "",
    title: "",
    date: new Date().toISOString().substring(0, 10),
    time: "",
    notes: "",
    reminderDays: 1,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.horseId) newErrors["horseId"] = "Valitse hevonen";
    if (!formData.type) newErrors["type"] = "Valitse tyyppi";
    if (!formData.title.trim()) newErrors["title"] = "Otsikko on pakollinen";
    if (!formData.date) newErrors["date"] = "Päivämäärä on pakollinen";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addEvent({
      horseId: formData.horseId,
      type: formData.type as EventType,
      title: formData.title.trim(),
      date: formData.date,
      time: formData.time || undefined,
      notes: formData.notes.trim(),
      completed: false,
      reminderDays: formData.reminderDays,
    });

    // Reset and close
    setFormData({
      horseId: "",
      type: "" as EventType | "",
      title: "",
      date: new Date().toISOString().substring(0, 10),
      time: "",
      notes: "",
      reminderDays: 1,
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary-500" />
            Lisää uusi tapahtuma
          </DialogTitle>
          <DialogDescription>
            Lisää tapahtuma kalenteriin ja aseta muistutus.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Horse Selection */}
          <div className="space-y-2">
            <Label>Hevonen *</Label>
            <Select
              value={formData.horseId}
              onValueChange={(value: string) =>
                setFormData({ ...formData, horseId: value })
              }
            >
              <SelectTrigger className={errors["horseId"] ? "border-error" : ""}>
                <SelectValue placeholder="Valitse hevonen" />
              </SelectTrigger>
              <SelectContent>
                {horses.map((horse) => (
                  <SelectItem key={horse.id} value={horse.id}>
                    {horse.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors["horseId"] && (
              <p className="text-sm text-error">{errors["horseId"]}</p>
            )}
          </div>

          {/* Event Type */}
          <div className="space-y-2">
            <Label>Tapahtuman tyyppi *</Label>
            <Select
              value={formData.type}
              onValueChange={(value: string) =>
                setFormData({ ...formData, type: value as EventType })
              }
            >
              <SelectTrigger className={errors["type"] ? "border-error" : ""}>
                <SelectValue placeholder="Valitse tyyppi" />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(eventTypeLabels) as EventType[]).map((type) => (
                  <SelectItem key={type} value={type}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: eventTypeColors[type] }}
                      />
                      {eventTypeLabels[type]}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors["type"] && (
              <p className="text-sm text-error">{errors["type"]}</p>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Otsikko *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Esim. Kengitys - etukengät"
              className={errors["title"] ? "border-error" : ""}
            />
            {errors["title"] && (
              <p className="text-sm text-error">{errors["title"]}</p>
            )}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">
                <Calendar className="h-4 w-4 inline mr-1" />
                Päivämäärä *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className={errors["date"] ? "border-error" : ""}
              />
              {errors["date"] && (
                <p className="text-sm text-error">{errors["date"]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">
                <Clock className="h-4 w-4 inline mr-1" />
                Aika (valinnainen)
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Lisätiedot / Muistiinpanot</Label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Esim. Muista varata uudet kengät..."
              className="w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
            />
          </div>

          {/* Reminder */}
          <div className="space-y-2">
            <Label htmlFor="reminder">Muistutus (päivää ennen)</Label>
            <Select
              value={formData.reminderDays.toString()}
              onValueChange={(value: string) =>
                setFormData({ ...formData, reminderDays: parseInt(value) })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Ei muistutusta</SelectItem>
                <SelectItem value="1">1 päivä ennen</SelectItem>
                <SelectItem value="3">3 päivää ennen</SelectItem>
                <SelectItem value="7">Viikko ennen</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Peruuta
            </Button>
            <Button type="submit" className="flex-1">
              Lisää tapahtuma
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
