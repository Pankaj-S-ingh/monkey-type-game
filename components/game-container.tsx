"use client"

import { useState, useEffect } from "react"
import TextDisplay from "./text-display"
import TypingInput from "./typing-input"
import StatsDisplay from "./stats-display"
import Results from "./results"
import DifficultySelector from "./difficulty-selector"
import WpmGraph from "./wpm-graph"
import FullScreenToggle from "./fullscreen-toggle"
import TypingAchievement from "./typing-achievement"
import { useTypingGame } from "@/hooks/use-typing-game"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ModeToggle } from "./mode-toggle"
import { Play, Square, RefreshCw, Rocket } from "lucide-react"
import { motion } from "framer-motion"

export default function GameContainer() {
  const {
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
    setDifficulty,
  } = useTypingGame()

  const [isFullScreen, setIsFullScreen] = useState(false)
  const [funFact, setFunFact] = useState<string | null>(null)

  const funFacts = [
    "The QWERTY keyboard layout was designed to slow typists down to prevent typewriter jams!",
    "The fastest typist ever recorded reached 216 words per minute!",
    "The average typing speed is only 40 words per minute.",
    "The space bar is hit about 600 million times per day worldwide!",
    "The longest word you can type using only your left hand is 'stewardesses'.",
    "The home row keys (ASDF JKL;) are designed to be your default finger positions.",
    "Typing 8 hours a day, your fingers travel about 12.6 miles!",
    "The world's first typing competition was held in 1888.",
    "Most people are only using 70% of their keyboard's potential speed.",
    "Typing was originally considered 'women's work' in the early 20th century.",
  ]

  useEffect(() => {
    // Show a random fun fact when the game starts
    if (gameState === "not-started") {
      const randomIndex = Math.floor(Math.random() * funFacts.length)
      setFunFact(funFacts[randomIndex])
    }
  }, [gameState])

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  return (
    <div className={`w-full mx-auto transition-all duration-300 ${isFullScreen ? "max-w-full p-4" : "max-w-4xl"}`}>
      <div className="flex justify-between items-center mb-6">
        <motion.h1
          className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-gray-100"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Typing Speed Challenge
        </motion.h1>
        <div className="flex items-center gap-2">
          <FullScreenToggle isFullScreen={isFullScreen} toggleFullScreen={toggleFullScreen} />
          <ModeToggle />
        </div>
      </div>

      {funFact && gameState === "not-started" && (
        <motion.div
          className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start gap-3">
            <Rocket className="h-6 w-6 text-blue-500 dark:text-blue-400 mt-1 flex-shrink-0" />
            <p className="text-blue-800 dark:text-blue-200">
              <span className="font-bold">Fun Fact:</span> {funFact}
            </p>
          </div>
        </motion.div>
      )}

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Game Settings</CardTitle>
            <DifficultySelector
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              disabled={gameState === "in-progress"}
            />
          </div>
        </CardHeader>
        <CardContent>
          <StatsDisplay timer={timer} wpm={wpm} accuracy={accuracy} gameState={gameState} />
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className={`${isFullScreen ? "pt-8 pb-8" : "pt-6"}`}>
          <TextDisplay text={text} userInput={userInput} gameState={gameState} isFullScreen={isFullScreen} />
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <TypingInput userInput={userInput} setUserInput={setUserInput} gameState={gameState} startGame={startGame} />
        </CardContent>
      </Card>

      {/* WPM Progress Graph */}
      <WpmGraph wpmHistory={wpmHistory} gameState={gameState} />

      <div className="flex justify-center gap-4">
        {gameState === "in-progress" ? (
          <Button onClick={stopGame} size="lg" variant="destructive" className="px-8">
            <Square className="mr-2 h-4 w-4" />
            Stop
          </Button>
        ) : (
          <Button onClick={resetGame} size="lg" className="px-8">
            {gameState === "not-started" ? (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start New Game
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Restart Game
              </>
            )}
          </Button>
        )}
      </div>

      {/* Achievement notifications */}
      <TypingAchievement wpm={wpm} accuracy={accuracy} gameState={gameState} />

      {(gameState === "completed" || gameState === "stopped") && (
        <Results wpm={wpm} accuracy={accuracy} difficulty={difficulty} bestScores={bestScores} resetGame={resetGame} />
      )}
    </div>
  )
}
