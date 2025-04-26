"use client"

import type { GameState } from "@/hooks/use-typing-game"
import { Clock, Gauge, BarChart2 } from "lucide-react"
import { motion } from "framer-motion"

interface StatsDisplayProps {
  timer: number
  wpm: number
  accuracy: number
  gameState: GameState
}

export default function StatsDisplay({ timer, wpm, accuracy, gameState }: StatsDisplayProps) {
  // Format timer as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Determine color based on WPM
  const getWpmColor = () => {
    if (wpm >= 80) return "text-green-500 dark:text-green-400"
    if (wpm >= 60) return "text-blue-500 dark:text-blue-400"
    if (wpm >= 40) return "text-yellow-500 dark:text-yellow-400"
    return "text-gray-700 dark:text-gray-300"
  }

  // Determine color based on accuracy
  const getAccuracyColor = () => {
    if (accuracy >= 98) return "text-green-500 dark:text-green-400"
    if (accuracy >= 95) return "text-blue-500 dark:text-blue-400"
    if (accuracy >= 90) return "text-yellow-500 dark:text-yellow-400"
    return "text-red-500 dark:text-red-400"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <motion.div
        className="flex items-center space-x-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
          <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
          <p className="text-2xl font-mono font-bold">{formatTime(timer)}</p>
        </div>
      </motion.div>

      <motion.div
        className="flex items-center space-x-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
          <Gauge className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">WPM</p>
          <p className={`text-2xl font-mono font-bold ${gameState !== "not-started" ? getWpmColor() : ""}`}>
            {gameState === "not-started" ? "--" : wpm.toFixed(0)}
          </p>
        </div>
      </motion.div>

      <motion.div
        className="flex items-center space-x-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
          <BarChart2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Accuracy</p>
          <p className={`text-2xl font-mono font-bold ${gameState !== "not-started" ? getAccuracyColor() : ""}`}>
            {gameState === "not-started" ? "--" : `${accuracy.toFixed(0)}%`}
          </p>
        </div>
      </motion.div>
    </div>
  )
}
