"use client"

import { useState, useEffect, useCallback, type RefObject } from "react"

interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void>
  pullDownThreshold?: number
  maxPullDownDistance?: number
  containerRef: RefObject<HTMLElement>
}

export function usePullToRefresh({
  onRefresh,
  pullDownThreshold = 80,
  maxPullDownDistance = 120,
  containerRef,
}: UsePullToRefreshOptions) {
  const [isPulling, setIsPulling] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Track touch position
  const [touchStartY, setTouchStartY] = useState(0)
  const [touchCurrentY, setTouchCurrentY] = useState(0)

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      // Only enable pull-to-refresh when at the top of the container
      if (containerRef.current && containerRef.current.scrollTop <= 0) {
        setTouchStartY(e.touches[0].clientY)
        setTouchCurrentY(e.touches[0].clientY)
        setIsPulling(true)
      }
    },
    [containerRef],
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isPulling) return

      setTouchCurrentY(e.touches[0].clientY)

      const distance = Math.max(0, touchCurrentY - touchStartY)

      // Apply resistance to make the pull feel more natural
      const resistedDistance = Math.min(maxPullDownDistance, distance * 0.4)

      setPullDistance(resistedDistance)

      // Prevent default scrolling when pulling
      if (resistedDistance > 0) {
        e.preventDefault()
      }
    },
    [isPulling, touchStartY, touchCurrentY, maxPullDownDistance],
  )

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling) return

    if (pullDistance >= pullDownThreshold) {
      // Trigger refresh
      setIsRefreshing(true)

      try {
        await onRefresh()
      } catch (error) {
        console.error("Refresh failed:", error)
      } finally {
        setIsRefreshing(false)
      }
    }

    // Reset
    setIsPulling(false)
    setPullDistance(0)
  }, [isPulling, pullDistance, pullDownThreshold, onRefresh])

  useEffect(() => {
    const currentRef = containerRef.current

    if (!currentRef) return

    currentRef.addEventListener("touchstart", handleTouchStart, { passive: false })
    currentRef.addEventListener("touchmove", handleTouchMove, { passive: false })
    currentRef.addEventListener("touchend", handleTouchEnd)

    return () => {
      currentRef.removeEventListener("touchstart", handleTouchStart)
      currentRef.removeEventListener("touchmove", handleTouchMove)
      currentRef.removeEventListener("touchend", handleTouchEnd)
    }
  }, [containerRef, handleTouchStart, handleTouchMove, handleTouchEnd])

  return {
    isPulling,
    pullDistance,
    isRefreshing,
    progress: Math.min(1, pullDistance / pullDownThreshold),
  }
}
