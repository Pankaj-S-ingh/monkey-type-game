"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award } from "lucide-react"

interface TypingAchievementProps {
  wpm: number
  accuracy: number
  gameState: string
}

export default function TypingAchievement({ wpm, accuracy, gameState }: TypingAchievementProps) {
  const [achievement, setAchievement] = useState<string | null>(null)
  const [showAchievement, setShowAchievement] = useState(false)

  useEffect(() => {
    if (gameState === "in-progress") {
      // Check for achievements based on WPM
      if (wpm >= 100 && !achievement) {
        setAchievement("Speed Demon! 🔥")
        setShowAchievement(true)
      } else if (wpm >= 70 && achievement !== "Speed Demon! 🔥" && !achievement) {
        setAchievement("Fast Fingers! ⚡")
        setShowAchievement(true)
      } else if (wpm >= 50 && !achievement && achievement !== "Fast Fingers! ⚡" && achievement !== "Speed Demon! 🔥") {
        setAchievement("Getting Speedy! 🚀")
        setShowAchievement(true)
      }

      // Check for achievements based on accuracy
      if (accuracy >= 98 && wpm >= 30 && !achievement) {
        setAchievement("Precision Master! 🎯")
        setShowAchievement(true)
      }
    }

    // Hide achievement after 3 seconds
    if (showAchievement) {
      const timer = setTimeout(() => {
        setShowAchievement(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [wpm, accuracy, gameState, achievement, showAchievement])

  // Reset achievement when game resets
  useEffect(() => {
    if (gameState === "not-started") {
      setAchievement(null)
    }
  }, [gameState])

  return (
    <AnimatePresence>
      {showAchievement && achievement && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
            <Award className="h-5 w-5" />
            <span className="font-bold text-lg">{achievement}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
