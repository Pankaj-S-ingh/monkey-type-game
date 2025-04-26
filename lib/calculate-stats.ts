// Calculate Words Per Minute (WPM)
export function calculateWPM(input: string, startTime: number): number {
  if (!startTime || !input.length) return 0

  // Standard: 5 characters = 1 word
  const words = input.length / 5
  const minutes = (Date.now() - startTime) / 60000

  return words / minutes
}

// Calculate accuracy percentage
export function calculateAccuracy(originalText: string, userInput: string): number {
  if (!userInput.length) return 0

  let correctChars = 0
  const inputLength = Math.min(userInput.length, originalText.length)

  for (let i = 0; i < inputLength; i++) {
    if (userInput[i] === originalText[i]) {
      correctChars++
    }
  }

  return (correctChars / inputLength) * 100
}
