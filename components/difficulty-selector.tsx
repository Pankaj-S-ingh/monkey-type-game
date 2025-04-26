"use client"

import type { Difficulty } from "@/hooks/use-typing-game"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DifficultySelectorProps {
  difficulty: Difficulty
  setDifficulty: (difficulty: Difficulty) => void
  disabled: boolean
}

export default function DifficultySelector({ difficulty, setDifficulty, disabled }: DifficultySelectorProps) {
  return (
    <Select value={difficulty} onValueChange={(value) => setDifficulty(value as Difficulty)} disabled={disabled}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Difficulty" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="easy">Easy</SelectItem>
        <SelectItem value="medium">Medium</SelectItem>
        <SelectItem value="hard">Hard</SelectItem>
      </SelectContent>
    </Select>
  )
}
