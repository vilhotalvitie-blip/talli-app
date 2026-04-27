import { useState } from "react";
import { Heart } from "lucide-react";
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
import { useStableStore, Gender } from "@stores/stableStore";

interface AddHorseModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormErrors {
  name?: string;
  breed?: string;
  age?: string;
  gender?: string;
  height?: string;
  weight?: string;
}

export function AddHorseModal({ open, onClose }: AddHorseModalProps) {
  const { addHorse } = useStableStore();
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "" as Gender | "",
    color: "",
    height: "",
    weight: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors["name"] = "Nimi on pakollinen";
    if (!formData.breed.trim()) newErrors["breed"] = "Rotu on pakollinen";
    if (!formData.age || parseInt(formData.age) < 0) newErrors["age"] = "Ikä on pakollinen";
    if (!formData.gender) newErrors["gender"] = "Sukupuoli on pakollinen";
    if (!formData.height || parseInt(formData.height) < 50) newErrors["height"] = "Säkäkorkeus on pakollinen";
    if (!formData.weight || parseInt(formData.weight) < 100) newErrors["weight"] = "Paino on pakollinen";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addHorse({
      name: formData.name.trim(),
      breed: formData.breed.trim(),
      age: parseInt(formData.age),
      gender: formData.gender as Gender,
      color: formData.color.trim() || "Ei määritelty",
      height: parseInt(formData.height),
      weight: parseInt(formData.weight),
      notes: formData.notes.trim(),
    });

    // Reset and close
    setFormData({
      name: "",
      breed: "",
      age: "",
      gender: "",
      color: "",
      height: "",
      weight: "",
      notes: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary-500" />
            Lisää uusi hevonen
          </DialogTitle>
          <DialogDescription>
            Täytä hevosen perustiedot. Voit lisätä lisätietoja myöhemmin.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Nimi *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Esim. Mansikki"
              className={errors["name"] ? "border-error" : ""}
            />
            {errors["name"] && <p className="text-sm text-error">{errors["name"]}</p>}
          </div>

          {/* Breed & Gender */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="breed">Rotu *</Label>
              <Input
                id="breed"
                value={formData.breed}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, breed: e.target.value })}
                placeholder="Esim. Suomenpienhevonen"
                className={errors["breed"] ? "border-error" : ""}
              />
              {errors["breed"] && <p className="text-sm text-error">{errors["breed"]}</p>}
            </div>

            <div className="space-y-2">
              <Label>Sukupuoli *</Label>
              <Select
                value={formData.gender}
                onValueChange={(value: string) => setFormData({ ...formData, gender: value as Gender })}
              >
                <SelectTrigger className={errors["gender"] ? "border-error" : ""}>
                  <SelectValue placeholder="Valitse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tamma">Tamma</SelectItem>
                  <SelectItem value="ruuna">Ruuna</SelectItem>
                  <SelectItem value="ori">Ori</SelectItem>
                </SelectContent>
              </Select>
              {errors["gender"] && <p className="text-sm text-error">{errors["gender"]}</p>}
            </div>
          </div>

          {/* Age */}
          <div className="space-y-2">
            <Label htmlFor="age">Ikä (vuotta) *</Label>
            <Input
              id="age"
              type="number"
              min={0}
              max={40}
              value={formData.age}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, age: e.target.value })}
              placeholder="Esim. 8"
              className={errors["age"] ? "border-error" : ""}
            />
            {errors["age"] && <p className="text-sm text-error">{errors["age"]}</p>}
          </div>

          {/* Color */}
          <div className="space-y-2">
            <Label htmlFor="color">Väri</Label>
            <Input
              id="color"
              value={formData.color}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, color: e.target.value })}
              placeholder="Esim. Rautias"
            />
          </div>

          {/* Height & Weight */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Säkäkorkeus (cm) *</Label>
              <Input
                id="height"
                type="number"
                min={50}
                max={200}
                value={formData.height}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, height: e.target.value })}
                placeholder="Esim. 148"
                className={errors["height"] ? "border-error" : ""}
              />
              {errors["height"] && <p className="text-sm text-error">{errors["height"]}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Paino (kg) *</Label>
              <Input
                id="weight"
                type="number"
                min={100}
                max={1000}
                value={formData.weight}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="Esim. 420"
                className={errors["weight"] ? "border-error" : ""}
              />
              {errors["weight"] && <p className="text-sm text-error">{errors["weight"]}</p>}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Lisätiedot</Label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Esim. Rauhallinen luonne, sopii aloittelijoille..."
              className="w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Peruuta
            </Button>
            <Button type="submit" className="flex-1">
              Lisää hevonen
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
