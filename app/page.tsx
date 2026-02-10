"use client";

import { useHabitStore } from "@/store/useHabitStore";
import { AddHabit } from "@/components/AddHabit";
import { StatsHeader } from "@/components/StatsHeader";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "framer-motion";
import { HabitList } from "@/components/HabitList";

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

        <StatsHeader />

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <HabitList />
        </motion.section>
      </main>
    </div>
  );
}
