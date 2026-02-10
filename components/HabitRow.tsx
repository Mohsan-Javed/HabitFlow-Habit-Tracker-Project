"use client";

import { Habit } from "@/types/habit";
import { useHabitStore } from "@/store/useHabitStore";
import { format, isToday, parseISO } from "date-fns";
import { Check, Trash2, Calendar as CalendarIcon, Zap, MoreVertical, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { calculateStreak } from "@/lib/streak";
import { motion } from "framer-motion";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { EditHabit } from "./EditHabit";

interface HabitRowProps {
    habit: Habit;
}

export function HabitRow({ habit }: HabitRowProps) {
    const toggleHabitDate = useHabitStore((state) => state.toggleHabitDate);
    const deleteHabit = useHabitStore((state) => state.deleteHabit);

    const today = new Date().toISOString().split("T")[0];
    const isCompletedToday = habit.completedDates.includes(today);

    const { currentStreak } = calculateStreak(habit.completedDates);
    const progress = Math.min((habit.completedDates.length / habit.duration) * 100, 100);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10"
        >
            <div className="flex-shrink-0">
                <Button
                    onClick={() => toggleHabitDate(habit.id, today)}
                    size="icon"
                    className={`h-12 w-12 rounded-xl transition-all duration-500 shadow-lg ${isCompletedToday
                        ? "bg-green-500 text-white shadow-green-500/20 scale-95"
                        : "bg-white/10 text-muted-foreground hover:bg-white/20 hover:scale-105"
                        }`}
                >
                    <Check className={`h-6 w-6 transition-transform duration-500 ${isCompletedToday ? "scale-110" : "scale-100"}`} />
                </Button>
            </div>

            <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-bold truncate transition-colors ${isCompletedToday ? "text-green-500/80 line-through" : "text-foreground"}`}>
                        {habit.name}
                    </h3>
                    {currentStreak > 0 && (
                        <Badge variant="secondary" className="bg-orange-500/10 text-orange-500 border-none font-black text-[10px] py-0 px-2">
                            <Zap className="h-3 w-3 mr-1 fill-current" /> {currentStreak}D
                        </Badge>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex-grow max-w-[150px]">
                        <Progress value={progress} className="h-1.5 bg-white/5" />
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter">
                        {Math.round(progress)}% • {habit.completedDates.length}/{habit.duration}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass border-white/10">
                        <EditHabit habit={habit}>
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="flex items-center gap-2 font-bold cursor-pointer"
                            >
                                <Edit2 className="h-4 w-4" /> Edit
                            </DropdownMenuItem>
                        </EditHabit>
                        <DropdownMenuItem
                            className="flex items-center gap-2 font-bold text-destructive cursor-pointer focus:bg-destructive/10"
                            onClick={() => deleteHabit(habit.id)}
                        >
                            <Trash2 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </motion.div>
    );
}
