"use client"

import { useState, useEffect } from "react"
import type { Difficulty } from "@/hooks/use-typing-game"
import type { BestScores } from "@/lib/local-storage"
import { Trophy, Award, TrendingUp, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

interface ResultsProps {
  wpm: number
  accuracy: number
  difficulty: Difficulty
  bestScores: BestScores
  resetGame: () => void
}

export default function Results({ wpm, accuracy, difficulty, bestScores, resetGame }: ResultsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isNewBest, setIsNewBest] = useState(false)

  useEffect(() => {
    // Check if current score is a new best
    const currentBest = bestScores[difficulty]?.wpm || 0
    if (wpm > currentBest) {
      setIsNewBest(true)
    }

    // Show results dialog
    setIsOpen(true)
  }, [wpm, difficulty, bestScores])

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Typing Speed Challenge Result",
        text: `I just scored ${wpm.toFixed(0)} WPM with ${accuracy.toFixed(0)}% accuracy on ${difficulty} difficulty in the Typing Speed Challenge!`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `I just scored ${wpm.toFixed(0)} WPM with ${accuracy.toFixed(0)}% accuracy on ${difficulty} difficulty in the Typing Speed Challenge!`,
      )
      alert("Result copied to clipboard!")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isNewBest ? (
              <>
                <Trophy className="h-5 w-5 text-yellow-500" />
                New Personal Best!
              </>
            ) : (
              <>
                <Award className="h-5 w-5 text-blue-500" />
                Challenge Results
              </>
            )}
          </DialogTitle>
          <DialogDescription>Here's how you performed on {difficulty} difficulty</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Your Speed</p>
            <p className="text-3xl font-bold">{wpm.toFixed(0)}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">WPM</p>
          </div>

          <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Accuracy</p>
            <p className="text-3xl font-bold">{accuracy.toFixed(0)}%</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Correct</p>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <p className="text-sm font-medium">Your Best Scores</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Easy</p>
              <p className="font-mono">{bestScores.easy?.wpm.toFixed(0) || "--"} WPM</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Medium</p>
              <p className="font-mono">{bestScores.medium?.wpm.toFixed(0) || "--"} WPM</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Hard</p>
              <p className="font-mono">{bestScores.hard?.wpm.toFixed(0) || "--"} WPM</p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleShare} className="w-full sm:w-auto">
            <Share2 className="mr-2 h-4 w-4" />
            Share Result
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false)
              resetGame()
            }}
            className="w-full sm:w-auto"
          >
            Try Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
