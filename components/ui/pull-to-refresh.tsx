"use client"

import { RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface PullToRefreshProps {
  isPulling: boolean
  pullDistance: number
  isRefreshing: boolean
  progress: number
}

export function PullToRefresh({ isPulling, pullDistance, isRefreshing, progress }: PullToRefreshProps) {
  if (!isPulling && !isRefreshing) return null

  return (
    <div
      className={cn(
        "absolute left-0 right-0 flex justify-center transition-transform duration-200 z-10",
        isPulling ? "ease-out" : "ease-in",
      )}
      style={{
        transform: `translateY(${pullDistance}px)`,
        top: 0,
      }}
    >
      <div className="bg-primary/10 backdrop-blur-sm rounded-full p-3 shadow-md">
        <RefreshCw
          className={cn(
            "text-primary h-6 w-6 transition-all",
            isRefreshing ? "animate-spin" : "transform",
            !isRefreshing && `rotate-${Math.floor(progress * 360)}deg`,
          )}
        />
      </div>
    </div>
  )
}
