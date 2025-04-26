"use client"

import { useMemo } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartTooltip } from "@/components/ui/chart"
import type { WpmDataPoint } from "@/hooks/use-typing-game"

interface WpmGraphProps {
  wpmHistory: WpmDataPoint[]
  gameState: string
}

export default function WpmGraph({ wpmHistory, gameState }: WpmGraphProps) {
  // Format data for the chart
  const chartData = useMemo(() => {
    if (wpmHistory.length === 0) {
      return [{ time: 0, wpm: 0 }]
    }
    return wpmHistory
  }, [wpmHistory])

  // Calculate max WPM for y-axis domain
  const maxWpm = useMemo(() => {
    if (wpmHistory.length === 0) return 100
    const max = Math.max(...wpmHistory.map((point) => point.wpm))
    return Math.max(Math.ceil(max * 1.2), 100) // Add 20% padding, minimum 100
  }, [wpmHistory])

  return (
    <Card className="w-full mb-6">
      <CardHeader className="pb-2">
        <CardTitle>WPM Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          {gameState === "not-started" ? (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              Start typing to see your WPM progress
            </div>
          ) : (
            <div className="w-full h-full overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis
                    dataKey="time"
                    name="Time"
                    allowDataOverflow={false}
                    domain={[0, "dataMax"]}
                    tickFormatter={(value) => `${value}s`}
                  />
                  <YAxis name="WPM" domain={[0, maxWpm]} allowDataOverflow={false} />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 rounded shadow-md">
                            <p className="font-medium">{`Time: ${payload[0].payload.time}s`}</p>
                            <p className="text-[var(--color-wpm)]">{`WPM: ${payload[0].value?.toFixed(1)}`}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="wpm"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    dot={{ r: 2 }}
                    activeDot={{ r: 4 }}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
