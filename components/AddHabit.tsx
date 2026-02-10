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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

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
                <Button className="rounded-full shadow-lg transition-all hover:scale-105">
                    <Plus className="mr-2 h-4 w-4" /> Add Habit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add New Habit</DialogTitle>
                        <DialogDescription>
                            Start a new habit challenge and track your progress daily.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Habit Name</Label>
                            <Input
                                id="name"
                                placeholder="e.g., Read for 30 mins"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Input
                                id="description"
                                placeholder="Why do you want to do this?"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Duration</Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start">
                                        {duration} days challenge
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[375px]">
                                    <DropdownMenuItem onClick={() => setDuration(21)}>
                                        21 days challenge (Build momentum)
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setDuration(30)}>
                                        30 days challenge (Standard)
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setDuration(90)}>
                                        90 days challenge (Lifestyle change)
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Create Habit</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
