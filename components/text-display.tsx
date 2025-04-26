"use client"

import { useRef, useEffect, useState } from "react"
import type { GameState } from "@/hooks/use-typing-game"
import { motion } from "framer-motion"

interface TextDisplayProps {
  text: string
  userInput: string
  gameState: GameState
  isFullScreen: boolean
}

export default function TextDisplay({ text, userInput, gameState, isFullScreen }: TextDisplayProps) {
  // Split text into characters to apply styling
  const characters = text.split("")
  const containerRef = useRef<HTMLDivElement>(null)
  const [encouragement, setEncouragement] = useState<string | null>(null)

  // Fun encouragement messages
  const encouragements = [
    "You're on fire! 🔥",
    "Wow, those fingers are flying! ✈️",
    "Keyboard warrior mode: ACTIVATED! ⚔️",
    "You're typing faster than my thoughts! 🧠",
    "Are you a robot? Because that's FAST! 🤖",
    "Keep it up, speed demon! 😈",
    "Your keyboard might need a cooldown! 🧊",
    "Typing like a boss! 😎",
    "You're making that keyboard sing! 🎵",
    "Fingers doing the happy dance! 💃",
  ]

  // Show random encouragement messages during typing
  useEffect(() => {
    if (gameState === "in-progress" && userInput.length > 0) {
      // Show encouragement every ~20 characters typed
      if (userInput.length % 20 === 0) {
        const randomIndex = Math.floor(Math.random() * encouragements.length)
        setEncouragement(encouragements[randomIndex])

        // Hide after 2 seconds
        const timer = setTimeout(() => {
          setEncouragement(null)
        }, 2000)

        return () => clearTimeout(timer)
      }
    } else {
      setEncouragement(null)
    }
  }, [userInput, gameState])

  return (
    <div
      ref={containerRef}
      className={`relative p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 font-mono text-xl md:text-2xl leading-relaxed ${
        isFullScreen ? "h-[40vh] flex items-center justify-center" : "min-h-[200px]"
      }`}
    >
      {/* {gameState === "not-started" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-lg">
          <p className="text-center text-gray-600 dark:text-gray-300 text-xl">
            Type in the box below to start the challenge
          </p>
        </div>
      )} */}

      {encouragement && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute top-2 right-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-4 py-2 rounded-full font-bold text-lg shadow-lg"
        >
          {encouragement}
        </motion.div>
      )}

      <div aria-live="polite" className="sr-only">
        {gameState === "in-progress"
          ? "Game in progress"
          : gameState === "completed"
            ? "Game completed"
            : "Game ready to start"}
      </div>

      <div className="relative max-w-3xl mx-auto overflow-hidden text-clip">
        <div className="whitespace-pre-wrap break-words">
          {characters.map((char, index) => {
        let className = ""

        if (index < userInput.length) {
          // Character has been typed
          if (userInput[index] === char) {
            className = "text-green-600 dark:text-green-400" // Correct
          } else {
            className = "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30" // Incorrect
          }
        } else if (index === userInput.length && gameState === "in-progress") {
          className = "text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 animate-pulse" // Current character
        } else {
          className = "text-gray-600 dark:text-gray-400" // Not typed yet
        }

        return (
          <span key={index} className={className}>
            {char === " " ? "\u00A0" : char}
          </span>
        )
          })}
        </div>
      </div>
    </div>
  )
}
