"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-10 h-10 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors overflow-hidden"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme === "light" ? "light" : "dark"}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center pt-[2px]"
                >
                    {theme === "light" ? (
                        <Sun className="h-5 w-5 text-orange-500" />
                    ) : (
                        <Moon className="h-5 w-5 text-blue-400" />
                    )}
                </motion.div>
            </AnimatePresence>
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
