"use client";

import { useHabitStore } from "@/store/useHabitStore";
import { AddHabit } from "@/components/AddHabit";
import { HabitCard } from "@/components/HabitCard";
import { StatsHeader } from "@/components/StatsHeader";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const habits = useHabitStore((state) => state.habits);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <main className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
        <header className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              HabitFlow
            </h1>
            <p className="mt-2 text-muted-foreground">
              Small steps, giant leaps. Track your journey to excellence.
            </p>
          </div>
          <AddHabit />
        </header>

        <StatsHeader />

        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Your Habits</h2>
            {habits.length > 0 && (
              <span className="text-sm text-muted-foreground">
                {habits.length} Active Challenges
              </span>
            )}
          </div>

          <Separator className="mb-8" />

          {habits.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 p-12 text-center dark:border-zinc-800">
              <div className="rounded-full bg-zinc-100 p-4 dark:bg-zinc-900">
                <TrendingUp className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">No habits yet</h3>
              <p className="mt-2 text-muted-foreground">
                Start your first habit challenge to see it here.
              </p>
              <div className="mt-6">
                <AddHabit />
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {habits.map((habit) => (
                <HabitCard key={habit.id} habit={habit} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

import { TrendingUp } from "lucide-react";
