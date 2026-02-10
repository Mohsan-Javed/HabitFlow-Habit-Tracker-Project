"use client";

import { Habit } from "@/types/habit";
import { useHabitStore } from "@/store/useHabitStore";
import { format, isToday, parseISO } from "date-fns";
import { Check, Trash2, Calendar as CalendarIcon, Zap, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Heatmap } from "./Heatmap";
import { Separator } from "@/components/ui/separator";
import { calculateStreak } from "@/lib/streak";
import { motion } from "framer-motion";

interface HabitCardProps {
    habit: Habit;
}

export function HabitCard({ habit }: HabitCardProps) {
    const toggleHabitDate = useHabitStore((state) => state.toggleHabitDate);
    const deleteHabit = useHabitStore((state) => state.deleteHabit);

    const today = format(new Date(), "yyyy-MM-dd");
    const isDoneToday = habit.completedDates.includes(today);

    const { currentStreak } = calculateStreak(habit.completedDates);

    const progress = Math.min(
        Math.round((habit.completedDates.length / habit.duration) * 100),
        100
    );

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this habit?")) {
            deleteHabit(habit.id);
            toast.success("Habit deleted");
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
        >
            <Card className="overflow-hidden glass-card transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold tracking-tight">{habit.name}</CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        onClick={handleDelete}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    {habit.description && (
                        <p className="mb-6 text-sm text-muted-foreground/80 font-medium line-clamp-2 italic">
                            "{habit.description}"
                        </p>
                    )}

                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="gap-1.5 px-2 py-1 bg-orange-500/10 text-orange-600 dark:text-orange-400 border-none">
                                <Zap className={`h-3.5 w-3.5 ${currentStreak > 0 ? "fill-orange-500" : ""}`} />
                                <span className="font-bold">{currentStreak} Day Streak</span>
                            </Badge>
                            <Badge variant="outline" className="gap-1.5 px-2 py-1 border-primary/20 bg-primary/5 text-primary">
                                <CalendarIcon className="h-3.5 w-3.5" />
                                <span className="font-bold">{habit.duration} Days</span>
                            </Badge>
                        </div>
                        <Button
                            size="sm"
                            variant={isDoneToday ? "default" : "outline"}
                            className={`rounded-full shadow-sm transition-all duration-300 font-bold px-4 ${isDoneToday
                                ? "bg-green-500 hover:bg-green-600 text-white border-none scale-105"
                                : "hover:bg-primary/10 hover:text-primary border-primary/20"
                                }`}
                            onClick={() => toggleHabitDate(habit.id, today)}
                        >
                            {isDoneToday ? (
                                <Check className="mr-1.5 h-4 w-4 stroke-[3px]" />
                            ) : (
                                <Plus className="mr-1.5 h-4 w-4 stroke-[3px]" />
                            )}
                            {isDoneToday ? "Done" : "Mark Done"}
                        </Button>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between text-xs font-bold tracking-wider uppercase text-muted-foreground/70">
                            <span>Success Rate</span>
                            <span className="text-primary">{progress}%</span>
                        </div>
                        <div className="h-2.5 w-full bg-secondary/50 rounded-full overflow-hidden p-[2px]">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full shadow-[0_0_10px_rgba(var(--primary),0.3)]"
                            />
                        </div>
                        <p className="text-[10px] text-right font-medium text-muted-foreground/60 italic">
                            Completed {habit.completedDates.length} of {habit.duration} days
                        </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-4">
                            Activity Map
                        </h4>
                        <Heatmap completedDates={habit.completedDates} />
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
