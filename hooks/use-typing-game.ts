"use client"

import { useState, useEffect, useCallback } from "react"
import { generateText } from "@/lib/text-generator"
import { calculateWPM, calculateAccuracy } from "@/lib/calculate-stats"
import { saveBestScore, getBestScores, type BestScores } from "@/lib/local-storage"

export type GameState = "not-started" | "in-progress" | "completed" | "stopped"
export type Difficulty = "easy" | "medium" | "hard"

export interface WpmDataPoint {
  time: number // seconds elapsed
  wpm: number
}

export function useTypingGame() {
  const [text, setText] = useState("")
  const [userInput, setUserInput] = useState("")
  const [gameState, setGameState] = useState<GameState>("not-started")
  const [startTime, setStartTime] = useState(0)
  const [timer, setTimer] = useState(0)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(0)
  const [difficulty, setDifficulty] = useState<Difficulty>("medium")
  const [bestScores, setBestScores] = useState<BestScores>({
    easy: { wpm: 0, accuracy: 0 },
    medium: { wpm: 0, accuracy: 0 },
    hard: { wpm: 0, accuracy: 0 },
  })
  const [wpmHistory, setWpmHistory] = useState<WpmDataPoint[]>([])

  // Initialize text and best scores
  useEffect(() => {
    setText(generateText(difficulty))
    setBestScores(getBestScores())
  }, [difficulty])

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (gameState === "in-progress") {
      interval = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000)
        setTimer(elapsedSeconds)

        // Calculate current WPM and accuracy
        const currentWpm = calculateWPM(userInput, startTime)
        const currentAccuracy = calculateAccuracy(text, userInput)

        setWpm(currentWpm)
        setAccuracy(currentAccuracy)

        // Add data point to WPM history every 2 seconds
        if (elapsedSeconds % 2 === 0) {
          setWpmHistory((prev) => [...prev, { time: elapsedSeconds, wpm: currentWpm }])
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [gameState, startTime, userInput, text])

  // Check if typing is complete
  useEffect(() => {
    if (gameState === "in-progress" && userInput.length >= text.length) {
      completeGame()
    }
  }, [userInput, text, gameState])

  // Start game
  const startGame = useCallback(() => {
    setGameState("in-progress")
    setStartTime(Date.now())
    setTimer(0)
    setWpmHistory([])
  }, [])

  // Stop game
  const stopGame = useCallback(() => {
    setGameState("stopped")

    // Calculate final stats
    const finalWpm = calculateWPM(userInput, startTime)
    const finalAccuracy = calculateAccuracy(text, userInput)

    setWpm(finalWpm)
    setAccuracy(finalAccuracy)
  }, [userInput, startTime, text])

  // Complete game
  const completeGame = useCallback(() => {
    setGameState("completed")

    // Calculate final stats
    const finalWpm = calculateWPM(userInput, startTime)
    const finalAccuracy = calculateAccuracy(text, userInput)

    setWpm(finalWpm)
    setAccuracy(finalAccuracy)

    // Save best score if better than previous
    const currentBest = bestScores[difficulty]?.wpm || 0
    if (finalWpm > currentBest) {
      const newBestScores = saveBestScore(difficulty, finalWpm, finalAccuracy)
      setBestScores(newBestScores)
    }
  }, [userInput, startTime, text, difficulty, bestScores])

  // Reset game
  const resetGame = useCallback(() => {
    setText(generateText(difficulty))
    setUserInput("")
    setGameState("not-started")
    setTimer(0)
    setWpm(0)
    setAccuracy(0)
    setWpmHistory([])
  }, [difficulty])

  // Handle difficulty change
  const handleSetDifficulty = useCallback(
    (newDifficulty: Difficulty) => {
      setDifficulty(newDifficulty)
      setText(generateText(newDifficulty))

      if (gameState !== "not-started") {
        setUserInput("")
        setGameState("not-started")
        setTimer(0)
        setWpm(0)
        setAccuracy(0)
        setWpmHistory([])
      }
    },
    [gameState],
  )

  return {
    text,
    userInput,
    gameState,
    timer,
    wpm,
    accuracy,
    difficulty,
    bestScores,
    wpmHistory,
    setUserInput,
    startGame,
    stopGame,
    resetGame,
    setDifficulty: handleSetDifficulty,
  }
}
