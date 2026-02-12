"use client";

import { useState, useEffect } from "react";
import { useHabitStore } from "@/store/useHabitStore";
import { CheckCircle2, Flame, Target, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateStreak } from "@/lib/streak";
import { motion } from "framer-motion";
import { Habit } from "@/types/habit";

export function StatsHeader() {
    const [mounted, setMounted] = useState(false);
    const habits = useHabitStore((state) => state.habits);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-32 rounded-3xl bg-white/5 animate-pulse border border-white/10" />
                ))}
            </div>
        );
    }

    const totalHabits = habits.length;
    const completedToday = habits.filter((h) =>
        h.completedDates.includes(new Date().toISOString().split("T")[0])
    ).length;

    const totalCompletions = habits.reduce((acc, h) => acc + h.completedDates.length, 0);
    const totalDuration = habits.reduce((acc, h) => acc + h.duration, 0);
    const averageCompletion = totalDuration > 0
        ? Math.round((totalCompletions / totalDuration) * 100)
        : 0;

    const longestStreak = habits.length > 0
        ? Math.max(...habits.map(h => calculateStreak(h.completedDates).longestStreak))
        : 0;

    const statCards = [
        { label: "Active Challenges", value: totalHabits, icon: Target, color: "text-blue-500", detail: "Total habits tracked" },
        { label: "Today's Progress", value: `${completedToday}/${totalHabits}`, icon: CheckCircle2, color: "text-green-500", detail: "Check-ins for today" },
        { label: "Avg. Completion", value: `${averageCompletion}%`, icon: TrendingUp, color: "text-purple-500", detail: "Overall success rate" },
        { label: "Personal Best", value: `${longestStreak} Days`, icon: Flame, color: "text-orange-500", detail: "Longest streak" },
    ];

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                >
                    <Card className="glass-card border-white/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                                {stat.label}
                            </CardTitle>
                            <stat.icon className={`h-5 w-5 ${stat.color} drop-shadow-sm`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black tracking-tight">{stat.value}</div>
                            <p className="mt-1 text-[10px] font-bold text-muted-foreground/50 uppercase tracking-tighter italic">
                                {stat.detail}
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
