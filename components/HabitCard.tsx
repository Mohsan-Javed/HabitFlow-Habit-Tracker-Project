"use client";

import { Habit } from "@/types/habit";
import { useHabitStore } from "@/store/useHabitStore";
import { format, isToday, parseISO } from "date-fns";
import { Check, Trash2, Calendar as CalendarIcon, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface HabitCardProps {
    habit: Habit;
}

export function HabitCard({ habit }: HabitCardProps) {
    const toggleHabitDate = useHabitStore((state) => state.toggleHabitDate);
    const deleteHabit = useHabitStore((state) => state.deleteHabit);

    const today = format(new Date(), "yyyy-MM-dd");
    const isDoneToday = habit.completedDates.includes(today);

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
        <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-bold">{habit.name}</CardTitle>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={handleDelete}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                {habit.description && (
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-1">
                        {habit.description}
                    </p>
                )}

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="gap-1">
                            <Zap className="h-3 w-3 fill-orange-500 text-orange-500" />
                            <span>Streak coming soon</span>
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            <span>{habit.duration} Days</span>
                        </Badge>
                    </div>
                    <Button
                        size="sm"
                        variant={isDoneToday ? "default" : "outline"}
                        className={`rounded-full transition-all ${isDoneToday ? "bg-green-500 hover:bg-green-600" : ""
                            }`}
                        onClick={() => toggleHabitDate(habit.id, today)}
                    >
                        {isDoneToday ? (
                            <Check className="mr-1 h-4 w-4" />
                        ) : (
                            <Check className="mr-1 h-4 w-4" />
                        )}
                        {isDoneToday ? "Done" : "Mark Done"}
                    </Button>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-[10px] text-right text-muted-foreground">
                        {habit.completedDates.length} / {habit.duration} days completed
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
