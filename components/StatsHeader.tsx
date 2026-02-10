"use client";

import { useHabitStore } from "@/store/useHabitStore";
import { CheckCircle2, Flame, Target, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateStreak } from "@/lib/streak";

export function StatsHeader() {
    const habits = useHabitStore((state) => state.habits);

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

    return (
        <div className="grid gap-4 md:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Habits</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalHabits}</div>
                    <p className="text-xs text-muted-foreground">Active challenges</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{completedToday}</div>
                    <p className="text-xs text-muted-foreground">
                        {totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0}% success rate
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{averageCompletion}%</div>
                    <p className="text-xs text-muted-foreground">Across all habits</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Longest Streak</CardTitle>
                    <Flame className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{longestStreak} days</div>
                    <p className="text-xs text-muted-foreground">Personal best</p>
                </CardContent>
            </Card>
        </div>
    );
}
