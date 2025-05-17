"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // This would be where you'd add your analytics tracking code
    // For example, Google Analytics or similar
    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
    console.log(`Page view: ${url}`)
  }, [pathname, searchParams])

  return null
}
