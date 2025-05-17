"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface UseInfiniteScrollOptions {
  threshold?: number
  rootMargin?: string
  initialPage?: number
}

export function useInfiniteScroll({
  threshold = 0.5,
  rootMargin = "0px",
  initialPage = 1,
}: UseInfiniteScrollOptions = {}) {
  const [page, setPage] = useState(initialPage)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setIsLoading(true)
      // Simulate network request
      setTimeout(() => {
        setPage((prevPage) => prevPage + 1)
        setIsLoading(false)
      }, 800)
    }
  }, [isLoading, hasMore])

  const setEnd = useCallback(() => {
    setHasMore(false)
  }, [])

  useEffect(() => {
    const currentLoadMoreRef = loadMoreRef.current

    if (!currentLoadMoreRef) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && hasMore && !isLoading) {
          loadMore()
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    observerRef.current.observe(currentLoadMoreRef)

    return () => {
      if (observerRef.current && currentLoadMoreRef) {
        observerRef.current.unobserve(currentLoadMoreRef)
      }
    }
  }, [loadMore, hasMore, isLoading, threshold, rootMargin])

  return {
    page,
    isLoading,
    hasMore,
    loadMoreRef,
    setEnd,
  }
}
