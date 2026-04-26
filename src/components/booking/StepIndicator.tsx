import { cn } from "@lib/utils";
import { BookingStep, stepLabels } from "./types";

interface StepIndicatorProps {
  currentStep: BookingStep;
}

const steps: BookingStep[] = [1, 2, 3];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="px-6 py-4 border-b bg-muted/30">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            {/* Step indicator */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  currentStep >= step
                    ? "bg-primary-500 text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {currentStep > step ? (
                  <svg
                    className="w-5 h-5"
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
                ) : (
                  step
                )}
              </div>
              <span
                className={cn(
                  "text-xs mt-1 font-medium",
                  currentStep >= step
                    ? "text-primary-600"
                    : "text-muted-foreground"
                )}
              >
                {stepLabels[step]}
              </span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-16 md:w-24 h-0.5 mx-2 transition-colors",
                  currentStep > step ? "bg-primary-500" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
