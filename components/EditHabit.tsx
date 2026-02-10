"use client";

import { useState } from "react";
import { useHabitStore } from "@/store/useHabitStore";
import { Habit, HabitDuration } from "@/types/habit";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Edit2 } from "lucide-react";

interface EditHabitProps {
    habit: Habit;
    children?: React.ReactNode;
}

export function EditHabit({ habit, children }: EditHabitProps) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(habit.name);
    const [description, setDescription] = useState(habit.description || "");
    const [duration, setDuration] = useState<HabitDuration>(habit.duration);
    const updateHabit = useHabitStore((state) => state.updateHabit);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.error("Habit name is required");
            return;
        }
        updateHabit(habit.id, {
            name,
            description,
            duration,
        });
        setOpen(false);
        toast.success("Habit updated successfully!");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground">
                        <Edit2 className="h-4 w-4" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] glass border-white/20 shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black tracking-tight text-gradient">Modify Habit</DialogTitle>
                    <DialogDescription className="font-medium text-muted-foreground/70 italic">
                        Keep your goals aligned with your progress.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="edit-name" className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                            Habit Name
                        </Label>
                        <Input
                            id="edit-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="bg-background/50 border-white/10 focus:border-primary/50 transition-colors font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="edit-description" className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                            Description
                        </Label>
                        <Input
                            id="edit-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-background/50 border-white/10 focus:border-primary/50 transition-colors font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                            Duration
                        </Label>
                        <Select
                            value={duration.toString()}
                            onValueChange={(v: string) => setDuration(Number(v) as HabitDuration)}
                        >
                            <SelectTrigger className="bg-background/50 border-white/10 focus:border-primary/50 font-bold">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="glass border-white/10">
                                <SelectItem value="21" className="font-bold">21 Days</SelectItem>
                                <SelectItem value="30" className="font-bold">30 Days</SelectItem>
                                <SelectItem value="90" className="font-bold">90 Days</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter className="pt-4">
                        <Button type="submit" className="w-full rounded-xl bg-primary font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
