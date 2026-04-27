import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types
export type Gender = "tamma" | "ruuna" | "ori";

export interface Horse {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: Gender;
  color: string;
  height: number; // cm
  weight: number; // kg
  acquisitionDate?: string;
  notes: string;
  image?: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  color: string;
  budgetLimit?: number;
  isDefault: boolean;
}

export interface Expense {
  id: string;
  horseId: string;
  categoryId: string;
  amount: number;
  date: string;
  description: string;
  isRecurring: boolean;
}

export type EventType = 
  | "kengitys" 
  | "hammashoito" 
  | "elainlaakari" 
  | "kilpailu" 
  | "valmennus" 
  | "rokotus" 
  | "muu";

export interface CalendarEvent {
  id: string;
  horseId: string;
  type: EventType;
  title: string;
  date: string;
  time?: string;
  notes: string;
  completed: boolean;
  reminderDays: number;
}

export interface StableSettings {
  id: string;
  name: string;
  isPublic: boolean;
  createdAt: string;
}

export interface StableState {
  // Stable settings
  stable: StableSettings;
  
  // Data
  horses: Horse[];
  budgetCategories: BudgetCategory[];
  expenses: Expense[];
  events: CalendarEvent[];
  
  // Actions - Stable
  renameStable: (name: string) => void;
  togglePrivacy: () => void;
  
  // Actions - Horses
  addHorse: (horse: Omit<Horse, "id">) => void;
  updateHorse: (id: string, updates: Partial<Horse>) => void;
  removeHorse: (id: string) => void;
  
  // Actions - Budget Categories
  addBudgetCategory: (category: Omit<BudgetCategory, "id">) => void;
  updateBudgetCategory: (id: string, updates: Partial<BudgetCategory>) => void;
  removeBudgetCategory: (id: string) => void;
  
  // Actions - Expenses
  addExpense: (expense: Omit<Expense, "id">) => void;
  removeExpense: (id: string) => void;
  
  // Actions - Events
  addEvent: (event: Omit<CalendarEvent, "id">) => void;
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  removeEvent: (id: string) => void;
  completeEvent: (id: string) => void;
}

// Default budget categories
const defaultCategories: BudgetCategory[] = [
  { id: "cat-1", name: "Eläinlääkäri", color: "#ef4444", isDefault: true },
  { id: "cat-2", name: "Kengitys", color: "#f97316", isDefault: true },
  { id: "cat-3", name: "Rehu", color: "#22c55e", isDefault: true },
  { id: "cat-4", name: "Varusteet", color: "#3b82f6", isDefault: true },
  { id: "cat-5", name: "Vakuutus", color: "#8b5cf6", isDefault: true },
];

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 15);

export const useStableStore = create<StableState>()(
  persist(
    (set, get) => ({
      // Initial state
      stable: {
        id: generateId(),
        name: "Minun Talli",
        isPublic: false,
        createdAt: new Date().toISOString(),
      },
      horses: [],
      budgetCategories: defaultCategories,
      expenses: [],
      events: [],

      // Stable actions
      renameStable: (name) =>
        set((state) => ({
          stable: { ...state.stable, name },
        })),

      togglePrivacy: () =>
        set((state) => ({
          stable: { ...state.stable, isPublic: !state.stable.isPublic },
        })),

      // Horse actions
      addHorse: (horse) =>
        set((state) => ({
          horses: [...state.horses, { ...horse, id: generateId() }],
        })),

      updateHorse: (id, updates) =>
        set((state) => ({
          horses: state.horses.map((h) =>
            h.id === id ? { ...h, ...updates } : h
          ),
        })),

      removeHorse: (id) =>
        set((state) => ({
          horses: state.horses.filter((h) => h.id !== id),
          // Also remove related expenses and events
          expenses: state.expenses.filter((e) => e.horseId !== id),
          events: state.events.filter((e) => e.horseId !== id),
        })),

      // Budget category actions
      addBudgetCategory: (category) =>
        set((state) => ({
          budgetCategories: [
            ...state.budgetCategories,
            { ...category, id: generateId() },
          ],
        })),

      updateBudgetCategory: (id, updates) =>
        set((state) => ({
          budgetCategories: state.budgetCategories.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        })),

      removeBudgetCategory: (id) =>
        set((state) => ({
          budgetCategories: state.budgetCategories.filter((c) => c.id !== id),
        })),

      // Expense actions
      addExpense: (expense) =>
        set((state) => ({
          expenses: [...state.expenses, { ...expense, id: generateId() }],
        })),

      removeExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),

      // Event actions
      addEvent: (event) =>
        set((state) => ({
          events: [...state.events, { ...event, id: generateId() }],
        })),

      updateEvent: (id, updates) =>
        set((state) => ({
          events: state.events.map((e) =>
            e.id === id ? { ...e, ...updates } : e
          ),
        })),

      removeEvent: (id) =>
        set((state) => ({
          events: state.events.filter((e) => e.id !== id),
        })),

      completeEvent: (id) =>
        set((state) => ({
          events: state.events.map((e) =>
            e.id === id ? { ...e, completed: true } : e
          ),
        })),
    }),
    {
      name: "talli-stable-storage",
    }
  )
);

// Demo data helper
export const seedDemoData = () => {
  const store = useStableStore.getState();
  
  // Only seed if no horses exist
  if (store.horses.length > 0) return;

  // Add demo horses
  const horse1: Horse = { 
    id: generateId(),
    name: "Mansikki", 
    breed: "Suomenpienhevonen", 
    age: 8, 
    gender: "tamma",
    color: "Rautias",
    height: 148,
    weight: 420,
    acquisitionDate: "2022-03-15",
    notes: "Rauhallinen ja kiltti ratsu. Sopii aloittelijoille.",
  };
  
  const horse2: Horse = { 
    id: generateId(),
    name: "Mustangi", 
    breed: "Englantilainen täysiverinen", 
    age: 5, 
    gender: "ruuna",
    color: "Musta",
    height: 165,
    weight: 520,
    acquisitionDate: "2023-01-10",
    notes: "Energiaa täynnä, vaatii kokeneen ratsastajan.",
  };

  store.horses.push(horse1, horse2);

  // Add demo expenses
  const expense1: Expense = {
    id: generateId(),
    horseId: horse1.id,
    categoryId: "cat-2", // Kengitys
    amount: 85,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
    description: "Takakenkien vaihto",
    isRecurring: false,
  };

  const expense2: Expense = {
    id: generateId(),
    horseId: horse2.id,
    categoryId: "cat-1", // Eläinlääkäri
    amount: 120,
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
    description: "Vuosittainen rokotus",
    isRecurring: false,
  };

  store.expenses.push(expense1, expense2);

  // Add demo events
  const event1: CalendarEvent = {
    id: generateId(),
    horseId: horse1.id,
    type: "kengitys",
    title: "Kengitys",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
    notes: "Etukengät vaihdettava",
    completed: false,
    reminderDays: 1,
  };

  const event2: CalendarEvent = {
    id: generateId(),
    horseId: horse2.id,
    type: "valmennus",
    title: "Estevalmennus",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
    time: "17:00",
    notes: "Kalle Kouluttajan tunti",
    completed: false,
    reminderDays: 1,
  };

  store.events.push(event1, event2);
};
