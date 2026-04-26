export interface BookingFormData {
  lessonId: number;
  name: string;
  email: string;
  phone: string;
  experienceLevel: "beginner" | "intermediate" | "advanced" | "";
  specialRequests: string;
  acceptTerms: boolean;
}

export interface Lesson {
  id: number;
  title: string;
  stable: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  spots: number;
  type: string;
  instructor: string;
}

export type BookingStep = 1 | 2 | 3;

export const stepLabels: Record<BookingStep, string> = {
  1: "Tarkista",
  2: "Tiedot",
  3: "Vahvista",
};
