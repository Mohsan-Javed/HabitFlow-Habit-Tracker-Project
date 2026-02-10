"use client";

import { useHabitStore } from "@/store/useHabitStore";
import { AddHabit } from "@/components/AddHabit";
import { HabitCard } from "@/components/HabitCard";
import { StatsHeader } from "@/components/StatsHeader";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "framer-motion";

export default function Home() {
  const habits = useHabitStore((state) => state.habits);

  return (
    <div className="min-h-screen bg-background transition-colors duration-500 relative overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{ backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`, backgroundSize: '32px 32px' }}>
      </div>

      <main className="container mx-auto max-w-5xl px-4 py-8 md:py-16 relative z-10">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center"
        >
          <div>
            <h1 className="text-5xl font-black tracking-tight lg:text-6xl text-gradient">
              HabitFlow
            </h1>
            <p className="mt-3 text-lg text-muted-foreground/80 font-medium">
              Precision tracking for personal excellence.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <AddHabit />
          </div>
        </motion.header>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <StatsHeader />
        </motion.div>

        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-gradient">
              Your Challenges
            </h2>
            {habits.length > 0 && (
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                {habits.length} Active
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
