"use client";

import { useMemo } from "react";
import { format, subDays, eachDayOfInterval, isSameDay, startOfToday } from "date-fns";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface HeatmapProps {
    completedDates: string[];
}

export function Heatmap({ completedDates }: HeatmapProps) {
    const today = startOfToday();
    const daysToShow = 7 * 20; // 20 weeks

    const days = useMemo(() => {
        return eachDayOfInterval({
            start: subDays(today, daysToShow - 1),
            end: today,
        });
    }, [today, daysToShow]);

    const getColorClass = (count: number) => {
        if (count === 0) return "bg-zinc-100 dark:bg-zinc-800";
        return "bg-green-500"; // Simple for now, can be intensity-based
    };

    return (
        <TooltipProvider>
            <div className="flex flex-wrap gap-1">
                {days.map((day) => {
                    const dateStr = format(day, "yyyy-MM-dd");
                    const isCompleted = completedDates.includes(dateStr);

                    return (
                        <Tooltip key={dateStr}>
                            <TooltipTrigger asChild>
                                <div
                                    className={`h-3 w-3 rounded-sm transition-colors ${getColorClass(
                                        isCompleted ? 1 : 0
                                    )}`}
                                />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-xs">
                                    {format(day, "MMM d, yyyy")}: {isCompleted ? "Completed" : "No record"}
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </div>
        </TooltipProvider>
    );
}
