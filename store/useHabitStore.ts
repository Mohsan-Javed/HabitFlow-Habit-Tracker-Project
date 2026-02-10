import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Habit, HabitDuration } from '@/types/habit';
import { format } from 'date-fns';

interface HabitState {
    habits: Habit[];
    addHabit: (name: string, duration: HabitDuration, description?: string) => void;
    toggleHabitDate: (id: string, date: string) => void;
    deleteHabit: (id: string) => void;
    updateHabit: (id: string, updates: Partial<Habit>) => void;
    bulkAddHabits: (habits: Array<{ name: string; duration: HabitDuration; description?: string }>) => void;
}

export const useHabitStore = create<HabitState>()(
    persist(
        (set) => ({
            habits: [],

            addHabit: (name, duration, description) => {
                const newHabit: Habit = {
                    id: crypto.randomUUID(),
                    name,
                    description,
                    duration,
                    createdAt: new Date().toISOString(),
                    completedDates: [],
                };
                set((state) => ({ habits: [...state.habits, newHabit] }));
            },

            toggleHabitDate: (id, date) => {
                set((state) => ({
                    habits: state.habits.map((habit) => {
                        if (habit.id !== id) return habit;

                        const isCompleted = habit.completedDates.includes(date);
                        const updatedDates = isCompleted
                            ? habit.completedDates.filter((d) => d !== date)
                            : [...habit.completedDates, date];

                        return { ...habit, completedDates: updatedDates };
                    }),
                }));
            },

            deleteHabit: (id) => {
                set((state) => ({
                    habits: state.habits.filter((habit) => habit.id !== id),
                }));
            },

            updateHabit: (id, updates) => {
                set((state) => ({
                    habits: state.habits.map((habit) =>
                        habit.id === id ? { ...habit, ...updates } : habit
                    ),
                }));
            },

            bulkAddHabits: (newHabits) => {
                set((state) => ({
                    habits: [
                        ...state.habits,
                        ...newHabits.map((h) => ({
                            id: crypto.randomUUID(),
                            name: h.name,
                            description: h.description || "",
                            duration: h.duration,
                            completedDates: [],
                            createdAt: new Date().toISOString(),
                        })),
                    ],
                }));
            },
        }),
        {
            name: 'habit-storage',
        }
    )
);
