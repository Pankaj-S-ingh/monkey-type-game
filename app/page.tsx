import type { Metadata } from "next"
import GameContainer from "@/components/game-container"

export const metadata: Metadata = {
  title: "Typing Speed Challenge Game",
  description: "Test and improve your typing speed with this interactive typing challenge game",
  openGraph: {
    title: "Typing Speed Challenge Game",
    description: "Test and improve your typing speed with this interactive typing challenge game",
    type: "website",
    locale: "en_US",
    url: "https://typing-speed-challenge.vercel.app",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Typing Speed Challenge Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Typing Speed Challenge Game",
    description: "Test and improve your typing speed with this interactive typing challenge game",
    images: ["/og-image.png"],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <GameContainer />
    </main>
  )
}
