"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useHabitStore } from "@/store/useHabitStore";
import { HabitDuration } from "@/types/habit";
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
import { motion, AnimatePresence } from "framer-motion";

export function AddHabit() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState<HabitDuration>(21);
    const addHabit = useHabitStore((state) => state.addHabit);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.error("Habit name is required");
            return;
        }
        addHabit(name, duration, description);
        setName("");
        setDescription("");
        setDuration(21);
        setOpen(false);
        toast.success("Habit added successfully!");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                    <Plus className="mr-2 h-5 w-5 stroke-[3px]" /> New Challenge
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] glass border-white/20 shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black tracking-tight text-gradient">Start New Habit</DialogTitle>
                    <DialogDescription className="font-medium text-muted-foreground/70 italic">
                        The journey of a thousand miles begins with a single step.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                            What is your goal?
                        </Label>
                        <Input
                            id="name"
                            placeholder="e.g. Morning Meditation"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="bg-background/50 border-white/10 focus:border-primary/50 transition-colors font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                            Description (Optional)
                        </Label>
                        <Input
                            id="description"
                            placeholder="Small details help..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-background/50 border-white/10 focus:border-primary/50 transition-colors font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                            Challenge Duration
                        </Label>
                        <Select
                            value={duration.toString()}
                            onValueChange={(v: string) => setDuration(Number(v) as HabitDuration)}
                        >
                            <SelectTrigger className="bg-background/50 border-white/10 focus:border-primary/50 font-bold">
                                <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent className="glass border-white/10">
                                <SelectItem value="21" className="font-bold focus:bg-primary/10">21 Days (Sprint)</SelectItem>
                                <SelectItem value="30" className="font-bold focus:bg-primary/10">30 Days (Growth)</SelectItem>
                                <SelectItem value="90" className="font-bold focus:bg-primary/10">90 Days (Mastery)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter className="pt-4">
                        <Button type="submit" className="w-full rounded-xl bg-primary font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                            Ignite Habit
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
