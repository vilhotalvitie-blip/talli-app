import { useState } from "react";
import { Euro, Calendar } from "lucide-react";
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

interface AddExpenseModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormErrors {
  horseId?: string;
  categoryId?: string;
  amount?: string;
  date?: string;
  description?: string;
}

export function AddExpenseModal({ open, onClose }: AddExpenseModalProps) {
  const { horses, budgetCategories, addExpense } = useStableStore();
  const [formData, setFormData] = useState({
    horseId: "",
    categoryId: "",
    amount: "",
    date: new Date().toISOString().substring(0, 10),
    description: "",
    isRecurring: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.horseId) newErrors["horseId"] = "Valitse hevonen";
    if (!formData.categoryId) newErrors["categoryId"] = "Valitse kategoria";
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors["amount"] = "Summa on pakollinen";
    }
    if (!formData.date) newErrors["date"] = "Päivämäärä on pakollinen";
    if (!formData.description.trim()) newErrors["description"] = "Kuvaus on pakollinen";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addExpense({
      horseId: formData.horseId,
      categoryId: formData.categoryId,
      amount: parseFloat(formData.amount),
      date: formData.date,
      description: formData.description.trim(),
      isRecurring: formData.isRecurring,
    });

    // Reset and close
    setFormData({
      horseId: "",
      categoryId: "",
      amount: "",
      date: new Date().toISOString().substring(0, 10),
      description: "",
      isRecurring: false,
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Euro className="h-5 w-5 text-warning" />
            Lisää uusi kulu
          </DialogTitle>
          <DialogDescription>
            Kirjaa uusi tallikulu valitsemalle hevoselle ja kategorialle.
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
                    {horse.name} ({horse.breed})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors["horseId"] && (
              <p className="text-sm text-error">{errors["horseId"]}</p>
            )}
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <Label>Kategoria *</Label>
            <Select
              value={formData.categoryId}
              onValueChange={(value: string) =>
                setFormData({ ...formData, categoryId: value })
              }
            >
              <SelectTrigger className={errors["categoryId"] ? "border-error" : ""}>
                <SelectValue placeholder="Valitse kategoria" />
              </SelectTrigger>
              <SelectContent>
                {budgetCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      {cat.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors["categoryId"] && (
              <p className="text-sm text-error">{errors["categoryId"]}</p>
            )}
          </div>

          {/* Amount & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Summa (€) *</Label>
              <Input
                id="amount"
                type="number"
                min={0}
                step={0.01}
                value={formData.amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                placeholder="Esim. 85"
                className={errors["amount"] ? "border-error" : ""}
              />
              {errors["amount"] && (
                <p className="text-sm text-error">{errors["amount"]}</p>
              )}
            </div>

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
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Kuvaus *</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Esim. Takakenkien vaihto"
              className={errors["description"] ? "border-error" : ""}
            />
            {errors["description"] && (
              <p className="text-sm text-error">{errors["description"]}</p>
            )}
          </div>

          {/* Recurring Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isRecurring"
              checked={formData.isRecurring}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, isRecurring: e.target.checked })
              }
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="isRecurring" className="mb-0">
              Toistuva kulu (kuukausittainen)
            </Label>
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
              Lisää kulu
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
