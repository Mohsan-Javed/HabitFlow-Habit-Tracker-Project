import { format, subDays, isSameDay, parseISO, startOfDay } from 'date-fns';

export function calculateStreak(completedDates: string[]): {
    currentStreak: number;
    longestStreak: number;
} {
    if (completedDates.length === 0) {
        return { currentStreak: 0, longestStreak: 0 };
    }

    // Sort dates in descending order
    const sortedDates = [...completedDates]
        .map((d) => startOfDay(parseISO(d)))
        .sort((a, b) => b.getTime() - a.getTime());

    // Calculate current streak
    let currentStreak = 0;
    const today = startOfDay(new Date());
    const yesterday = subDays(today, 1);

    let checkDate = today;

    // If not completed today, check if completed yesterday to continue streak
    if (!isSameDay(sortedDates[0], today)) {
        if (isSameDay(sortedDates[0], yesterday)) {
            checkDate = yesterday;
        } else {
            // Streak broken
            currentStreak = 0;
        }
    }

    if (isSameDay(sortedDates[0], today) || isSameDay(sortedDates[0], yesterday)) {
        let lastDate = checkDate;
        for (const date of sortedDates) {
            if (isSameDay(date, lastDate)) {
                currentStreak++;
                lastDate = subDays(lastDate, 1);
            } else if (date < lastDate) {
                break;
            }
        }
    }

    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 0;

    // Sort ascending for longest streak calculation
    const ascDates = [...sortedDates].sort((a, b) => a.getTime() - b.getTime());

    if (ascDates.length > 0) {
        tempStreak = 1;
        longestStreak = 1;

        for (let i = 1; i < ascDates.length; i++) {
            const prevDate = ascDates[i - 1];
            const currDate = ascDates[i];
            const diff = (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);

            if (diff === 1) {
                tempStreak++;
            } else if (diff > 1) {
                tempStreak = 1;
            }

            if (tempStreak > longestStreak) {
                longestStreak = tempStreak;
            }
        }
    }

    return { currentStreak, longestStreak };
}
