import { useState } from "react";
import { Check, CreditCard, Shield, ArrowRight } from "lucide-react";
import { Button } from "@components/primitives/Button";
import { Card, CardContent } from "@components/primitives/Card";
import { cn } from "@lib/utils";
import { BookingFormData, Lesson } from "../types";

interface Step3ConfirmProps {
  lesson: Lesson;
  formData: BookingFormData;
  onConfirm: () => void;
  onBack: () => void;
}

export function Step3Confirm({ lesson, formData, onConfirm, onBack }: Step3ConfirmProps) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const canConfirm = acceptedTerms && acceptedPrivacy;

  const getExperienceLabel = (level: string) => {
    switch (level) {
      case "beginner":
        return "Aloittelija";
      case "intermediate":
        return "Keskitaso";
      case "advanced":
        return "Kokenut";
      default:
        return level;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Vahvista varaus</h3>
        <p className="text-sm text-muted-foreground">
          Tarkista tiedot ennen lopullista varausta
        </p>
      </div>

      {/* Summary Card */}
      <Card className="border-primary-200 dark:border-primary-800">
        <CardContent className="p-4 space-y-4">
          {/* Lesson summary */}
          <div className="pb-4 border-b">
            <p className="text-sm text-muted-foreground mb-1">Varattava tunti</p>
            <h4 className="font-semibold text-lg">{lesson.title}</h4>
            <p className="text-sm">{lesson.stable}</p>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <span>{lesson.date}</span>
              <span>{lesson.time}</span>
            </div>
          </div>

          {/* Participant summary */}
          <div className="pb-4 border-b">
            <p className="text-sm text-muted-foreground mb-1">Osallistuja</p>
            <p className="font-medium">{formData.name}</p>
            <p className="text-sm text-muted-foreground">{formData.email}</p>
            <p className="text-sm text-muted-foreground">{formData.phone}</p>
            <div className="mt-2">
              <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs">
                {getExperienceLabel(formData.experienceLevel)}
              </span>
            </div>
          </div>

          {/* Price summary */}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Yhteensä</span>
            <span className="text-2xl font-bold text-primary-600">{lesson.price}</span>
          </div>

          {/* Payment note */}
          <div className="bg-muted/50 rounded-lg p-3 flex items-start gap-3">
            <CreditCard className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Maksu paikan päällä</p>
              <p className="text-muted-foreground">
                Maksu suoritetaan suoraan tallille saapuessasi. Käteinen ja kortti käyvät.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms checkboxes */}
      <div className="space-y-4">
        <label
          className={cn(
            "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
            acceptedTerms
              ? "border-primary-500 bg-primary-50/50 dark:bg-primary-950/20"
              : "border-input hover:bg-muted/50"
          )}
        >
          <div
            className={cn(
              "w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors",
              acceptedTerms
                ? "bg-primary-500 border-primary-500"
                : "border-muted-foreground bg-background"
            )}
          >
            {acceptedTerms && <Check className="h-3.5 w-3.5 text-white" />}
          </div>
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="sr-only"
          />
          <div className="text-sm">
            <span className="font-medium">Hyväksyn varausehdot</span>
            <p className="text-muted-foreground">
              Peruutus on mahdollista 24h ennen tuntia. Myöhäisemmästä peruutuksesta veloitetaan täysi hinta.
            </p>
          </div>
        </label>

        <label
          className={cn(
            "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
            acceptedPrivacy
              ? "border-primary-500 bg-primary-50/50 dark:bg-primary-950/20"
              : "border-input hover:bg-muted/50"
          )}
        >
          <div
            className={cn(
              "w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors",
              acceptedPrivacy
                ? "bg-primary-500 border-primary-500"
                : "border-muted-foreground bg-background"
            )}
          >
            {acceptedPrivacy && <Check className="h-3.5 w-3.5 text-white" />}
          </div>
          <input
            type="checkbox"
            checked={acceptedPrivacy}
            onChange={(e) => setAcceptedPrivacy(e.target.checked)}
            className="sr-only"
          />
          <div className="text-sm">
            <span className="font-medium">Hyväksyn tietosuojaselosteen</span>
            <p className="text-muted-foreground">
              Tietojani käytetään varauksen käsittelyyn ja yhteydenpitoon.
            </p>
          </div>
        </label>
      </div>

      {/* Security note */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Shield className="h-4 w-4" />
        <span>Turvallinen varaus - tietosi on suojattu</span>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Takaisin
        </Button>
        <Button
          onClick={onConfirm}
          disabled={!canConfirm}
          className="flex-1 gap-2"
        >
          Vahvista varaus
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
