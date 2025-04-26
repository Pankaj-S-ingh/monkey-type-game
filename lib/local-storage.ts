import type { Difficulty } from "@/hooks/use-typing-game"

export interface Score {
  wpm: number
  accuracy: number
}

export interface BestScores {
  easy: Score
  medium: Score
  hard: Score
}

const STORAGE_KEY = "typing-game-best-scores"

// Save best score to localStorage
export function saveBestScore(difficulty: Difficulty, wpm: number, accuracy: number): BestScores {
  const currentScores = getBestScores()

  const newScores = {
    ...currentScores,
    [difficulty]: { wpm, accuracy },
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newScores))
  }

  return newScores
}

// Get best scores from localStorage
export function getBestScores(): BestScores {
  if (typeof window === "undefined") {
    return {
      easy: { wpm: 0, accuracy: 0 },
      medium: { wpm: 0, accuracy: 0 },
      hard: { wpm: 0, accuracy: 0 },
    }
  }

  const storedScores = localStorage.getItem(STORAGE_KEY)

  if (!storedScores) {
    return {
      easy: { wpm: 0, accuracy: 0 },
      medium: { wpm: 0, accuracy: 0 },
      hard: { wpm: 0, accuracy: 0 },
    }
  }

  return JSON.parse(storedScores)
}
