import { useState } from "react";
import { User, Mail, Phone, ChevronDown } from "lucide-react";
import { Button } from "@components/primitives/Button";
import { cn } from "@lib/utils";
import { BookingFormData } from "../types";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  experienceLevel?: string;
}

interface Step2DetailsProps {
  formData: BookingFormData;
  onUpdate: (data: Partial<BookingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step2Details({ formData, onUpdate, onNext, onBack }: Step2DetailsProps) {
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nimi on pakollinen";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Sähköposti on pakollinen";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Anna kelvollinen sähköpostiosoite";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Puhelinnumero on pakollinen";
    }

    if (!formData.experienceLevel) {
      newErrors.experienceLevel = "Valitse kokemustaso";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Osallistujan tiedot</h3>
        <p className="text-sm text-muted-foreground">
          Täytä tiedot varsinaista varausta varten
        </p>
      </div>

      <div className="space-y-4">
        {/* Name field */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Nimi <span className="text-error">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              placeholder="Etunimi Sukunimi"
              className={cn(
                "w-full h-10 pl-10 pr-4 rounded-md border bg-background text-sm",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                errors.name ? "border-error" : "border-input"
              )}
            />
          </div>
          {errors.name && (
            <p className="text-sm text-error">{errors.name}</p>
          )}
        </div>

        {/* Email field */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Sähköposti <span className="text-error">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => onUpdate({ email: e.target.value })}
              placeholder="nimi@esimerkki.fi"
              className={cn(
                "w-full h-10 pl-10 pr-4 rounded-md border bg-background text-sm",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                errors.email ? "border-error" : "border-input"
              )}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-error">{errors.email}</p>
          )}
        </div>

        {/* Phone field */}
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Puhelinnumero <span className="text-error">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => onUpdate({ phone: e.target.value })}
              placeholder="+358 50 123 4567"
              className={cn(
                "w-full h-10 pl-10 pr-4 rounded-md border bg-background text-sm",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                errors.phone ? "border-error" : "border-input"
              )}
            />
          </div>
          {errors.phone && (
            <p className="text-sm text-error">{errors.phone}</p>
          )}
        </div>

        {/* Experience level */}
        <div className="space-y-2">
          <label htmlFor="experience" className="text-sm font-medium">
            Ratsastuskokemus <span className="text-error">*</span>
          </label>
          <div className="relative">
            <select
              id="experience"
              value={formData.experienceLevel}
              onChange={(e) => onUpdate({ experienceLevel: e.target.value as any })}
              className={cn(
                "w-full h-10 pl-4 pr-10 rounded-md border bg-background text-sm appearance-none",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                errors.experienceLevel ? "border-error" : "border-input"
              )}
            >
              <option value="">Valitse kokemustaso</option>
              <option value="beginner">Aloittelija (0-5 kertaa)</option>
              <option value="intermediate">Keskitaso (säännöllisesti)</option>
              <option value="advanced">Kokenut (pitkään ratsastanut)</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
          {errors.experienceLevel && (
            <p className="text-sm text-error">{errors.experienceLevel}</p>
          )}
        </div>

        {/* Special requests */}
        <div className="space-y-2">
          <label htmlFor="requests" className="text-sm font-medium">
            Erikoistoiveet (valinnainen)
          </label>
          <textarea
            id="requests"
            value={formData.specialRequests}
            onChange={(e) => onUpdate({ specialRequests: e.target.value })}
            placeholder="Esimerkiksi: tarvitsen lainaratsun, olen allerginen..."
            rows={3}
            className={cn(
              "w-full p-3 rounded-md border bg-background text-sm resize-none",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "border-input"
            )}
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Takaisin
        </Button>
        <Button onClick={handleNext} className="flex-1">
          Jatka
        </Button>
      </div>
    </div>
  );
}
