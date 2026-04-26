import { useState } from "react";
import { SlideOver } from "@components/ui/SlideOver";
import { StepIndicator } from "./StepIndicator";
import { Step1Review } from "./steps/Step1Review";
import { Step2Details } from "./steps/Step2Details";
import { Step3Confirm } from "./steps/Step3Confirm";
import { BookingFormData, BookingStep, Lesson } from "./types";

interface BookingWizardProps {
  lesson: Lesson | null;
  open: boolean;
  onClose: () => void;
}

const initialFormData: BookingFormData = {
  lessonId: 0,
  name: "",
  email: "",
  phone: "",
  experienceLevel: "",
  specialRequests: "",
  acceptTerms: false,
};

export function BookingWizard({ lesson, open, onClose }: BookingWizardProps) {
  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleClose = () => {
    onClose();
    // Reset state after animation
    setTimeout(() => {
      setCurrentStep(1);
      setFormData(initialFormData);
      setIsCompleted(false);
    }, 300);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as BookingStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as BookingStep);
    }
  };

  const handleUpdateForm = (data: Partial<BookingFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleConfirm = () => {
    // Simulate booking confirmation
    setIsCompleted(true);
    // Close after showing success briefly
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  if (!lesson) return null;

  return (
    <SlideOver
      open={open}
      onClose={handleClose}
      title={isCompleted ? "Varaus vahvistettu!" : "Varaa tunti"}
      description={isCompleted ? undefined : lesson.title}
    >
      {isCompleted ? (
        <div className="p-6 flex flex-col items-center justify-center h-full text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Kiitos varauksestasi!</h3>
            <p className="text-muted-foreground mt-2">
              Vahvistus on lähetetty sähköpostiisi.
            </p>
          </div>
          <div className="bg-muted rounded-lg p-4 w-full text-left text-sm space-y-2">
            <p><strong>{lesson.title}</strong></p>
            <p className="text-muted-foreground">{lesson.date} klo {lesson.time}</p>
            <p className="text-muted-foreground">{lesson.stable}</p>
          </div>
        </div>
      ) : (
        <>
          <StepIndicator currentStep={currentStep} />

          {currentStep === 1 && (
            <Step1Review
              lesson={lesson}
              onNext={handleNext}
              onCancel={handleClose}
            />
          )}

          {currentStep === 2 && (
            <Step2Details
              formData={formData}
              onUpdate={handleUpdateForm}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && (
            <Step3Confirm
              lesson={lesson}
              formData={formData}
              onConfirm={handleConfirm}
              onBack={handleBack}
            />
          )}
        </>
      )}
    </SlideOver>
  );
}
