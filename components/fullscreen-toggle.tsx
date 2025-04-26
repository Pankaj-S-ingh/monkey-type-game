"use client"
import { Button } from "@/components/ui/button"
import { Maximize2, Minimize2 } from "lucide-react"

interface FullScreenToggleProps {
  isFullScreen: boolean
  toggleFullScreen: () => void
}

export default function FullScreenToggle({ isFullScreen, toggleFullScreen }: FullScreenToggleProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleFullScreen}
      className="h-9 w-9"
      title={isFullScreen ? "Exit full screen" : "Enter full screen"}
    >
      {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
      <span className="sr-only">{isFullScreen ? "Exit full screen" : "Enter full screen"}</span>
    </Button>
  )
}
