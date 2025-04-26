import type { Difficulty } from "@/hooks/use-typing-game"

// Sample texts for different difficulty levels - shorter for better display
const texts = {
  easy: [
    "The quick brown fox jumps over the lazy dog.",
    "Learning to type quickly is an important skill.",
    "Typing games can help improve your speed and accuracy.",
    "Focus on accuracy first, then speed will come naturally.",
    "Keep your fingers on the home row keys for better typing.",
  ],
  medium: [
    "The ability to type quickly and accurately is essential in many professions.",
    "Ergonomics is important when typing for long periods of time.",
    "Touch typing is the ability to type without looking at the keyboard.",
    "The QWERTY keyboard layout was designed for mechanical typewriters.",
    "When learning to type, start slowly and focus on accuracy first.",
  ],
  hard: [
    "The Byzantine Empire was the continuation of the Roman Empire in its eastern provinces.",
    "Quantum computing harnesses quantum states like superposition and entanglement.",
    "Photosynthesis is the process used by plants to convert sunlight into energy.",
    "Einstein's General Theory of Relativity describes gravity as a geometric property of spacetime.",
    "Neuroplasticity refers to the brain's ability to change through growth and reorganization.",
  ],
}

export function generateText(difficulty: Difficulty): string {
  const difficultyTexts = texts[difficulty]
  const randomIndex = Math.floor(Math.random() * difficultyTexts.length)
  return difficultyTexts[randomIndex]
}
