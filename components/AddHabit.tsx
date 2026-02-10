"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
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

interface HabitInput {
    name: string;
    description: string;
    duration: HabitDuration;
}

export function AddHabit() {
    const [open, setOpen] = useState(false);
    const [inputs, setInputs] = useState<HabitInput[]>([
        { name: "", description: "", duration: 21 },
    ]);
    const bulkAddHabits = useHabitStore((state) => state.bulkAddHabits);

    const handleAddRow = () => {
        setInputs([...inputs, { name: "", description: "", duration: 21 }]);
    };

    const handleRemoveRow = (index: number) => {
        if (inputs.length > 1) {
            setInputs(inputs.filter((_: HabitInput, i: number) => i !== index));
        }
    };

    const handleInputChange = (index: number, field: keyof HabitInput, value: string | number) => {
        const newInputs = [...inputs];
        newInputs[index] = { ...newInputs[index], [field]: value };
        setInputs(newInputs);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validInputs = inputs.filter(i => i.name.trim() !== "");

        if (validInputs.length === 0) {
            toast.error("At least one habit name is required");
            return;
        }

        bulkAddHabits(validInputs);
        setInputs([{ name: "", description: "", duration: 21 }]);
        setOpen(false);
        toast.success(`Started ${validInputs.length} new challenge${validInputs.length > 1 ? 's' : ''}!`);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                    <Plus className="mr-2 h-5 w-5 stroke-[3px]" /> New Challenge
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto glass border-white/20 shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-black tracking-tight text-gradient">Ignite Your Potential</DialogTitle>
                    <DialogDescription className="font-medium text-muted-foreground/70 italic">
                        Add one or more habits to start your transformation.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <AnimatePresence initial={false}>
                        {inputs.map((input, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="relative space-y-4 p-4 rounded-2xl bg-white/5 border border-white/10"
                            >
                                {inputs.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20"
                                        onClick={() => handleRemoveRow(index)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                                            Habit Name
                                        </Label>
                                        <Input
                                            placeholder="e.g. 5 AM Run"
                                            value={input.name}
                                            onChange={(e) => handleInputChange(index, "name", e.target.value)}
                                            required={index === 0}
                                            className="bg-background/50 border-white/10 focus:border-primary/50 font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                                            Challenge Duration
                                        </Label>
                                        <Select
                                            value={input.duration.toString()}
                                            onValueChange={(v) => handleInputChange(index, "duration", Number(v))}
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
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                                        Description (Optional)
                                    </Label>
                                    <Input
                                        placeholder="Add a reason or reminder..."
                                        value={input.description}
                                        onChange={(e) => handleInputChange(index, "description", e.target.value)}
                                        className="bg-background/50 border-white/10 focus:border-primary/50"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full border-dashed border-2 border-white/20 bg-white/5 hover:bg-white/10 text-muted-foreground font-bold rounded-xl"
                        onClick={handleAddRow}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Another Habit
                    </Button>

                    <DialogFooter className="pt-4">
                        <Button type="submit" className="w-full h-12 rounded-xl bg-primary font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                            Ignite All Challenges
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
