"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import type { GameState } from "@/hooks/use-typing-game"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

interface TypingInputProps {
  userInput: string
  setUserInput: (input: string) => void
  gameState: GameState
  startGame: () => void
}

export default function TypingInput({ userInput, setUserInput, gameState, startGame }: TypingInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [shake, setShake] = useState(false)

  // Focus input on mount and when game resets
  useEffect(() => {
    if (gameState !== "completed" && gameState !== "stopped" && inputRef.current) {
      inputRef.current.focus()
    }
  }, [gameState])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameState === "not-started") {
      startGame()
    }

    if (gameState !== "completed" && gameState !== "stopped") {
      setUserInput(e.target.value)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent tab from changing focus
    if (e.key === "Tab") {
      e.preventDefault()
    }

    // Add shake animation on backspace for fun
    if (e.key === "Backspace" && userInput.length > 0) {
      setShake(true)
      setTimeout(() => setShake(false), 300)
    }
  }

  const placeholders = [
    "Start typing here...",
    "Ready, set, type!",
    "Show us your typing skills!",
    "Fingers on keyboard, GO!",
    "Let's see how fast you can type!",
  ]

  const randomPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)]

  return (
    <div>
      <motion.div animate={shake ? { x: [0, -5, 5, -5, 5, 0] } : {}} transition={{ duration: 0.3 }}>
        <Input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={randomPlaceholder}
          disabled={gameState === "completed" || gameState === "stopped"}
          className="w-full p-4 text-xl md:text-2xl font-mono"
          aria-label="Typing input"
        />
      </motion.div>
      <motion.p
        className="mt-3 text-sm text-gray-500 dark:text-gray-400 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {gameState === "not-started"
          ? "Start typing to begin the challenge! Let's see how fast you can go! 🚀"
          : gameState === "completed"
            ? "Challenge completed! You're amazing! Check your results below. 🎉"
            : gameState === "stopped"
              ? "Game stopped. How did you do? Check your results below. 👇"
              : "Keep going! You're doing great! 💪"}
      </motion.p>
    </div>
  )
}
