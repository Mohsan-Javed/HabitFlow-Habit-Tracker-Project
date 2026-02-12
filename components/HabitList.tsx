"use client";

import { useState, useEffect } from "react";
import { useHabitStore } from "@/store/useHabitStore";
import { HabitRow } from "./HabitRow";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

export function HabitList() {
    const [mounted, setMounted] = useState(false);
    const habits = useHabitStore((state) => state.habits);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    if (habits.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 bg-white/5 border border-dashed border-white/10 rounded-3xl"
            >
                <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <p className="text-4xl text-muted-foreground/20">🌱</p>
                </div>
                <h3 className="text-xl font-bold text-muted-foreground">No habits found</h3>
                <p className="text-sm text-muted-foreground/60">Start a new challenge to ignite your journey.</p>
            </motion.div>
        );
    }

    return (
        <div className="glass-card border-white/20 overflow-hidden">
            <div className="p-6 border-b border-white/10 bg-white/5">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-black tracking-tight text-gradient">Your Routine</h2>
                        <p className="text-xs font-medium text-muted-foreground/60">Consolidated tracking for maximum efficiency.</p>
                    </div>
                </div>
            </div>
            <ScrollArea className="max-h-[600px] p-2">
                <div className="flex flex-col gap-1">
                    <AnimatePresence mode="popLayout">
                        {habits.map((habit) => (
                            <HabitRow key={habit.id} habit={habit} />
                        ))}
                    </AnimatePresence>
                </div>
            </ScrollArea>
        </div>
    );
}
