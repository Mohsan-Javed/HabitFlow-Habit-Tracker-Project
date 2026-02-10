export type HabitDuration = 21 | 30 | 90;

export interface Habit {
  id: string;
  name: string;
  description?: string;
  duration: HabitDuration;
  createdAt: string; // ISO date string
  completedDates: string[]; // Array of ISO date strings (just the YYYY-MM-DD part)
}

export interface HabitStats {
  totalHabits: number;
  completionRate: number;
  averageStreak: number;
}
