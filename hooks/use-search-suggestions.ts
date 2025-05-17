"use client"

import { useState, useEffect, useCallback } from "react"
import { DUMMY_POSTS, DUMMY_EVENTS, DUMMY_ORGANIZERS } from "@/lib/dummy-data"
import { Calendar, MessageSquare, Users, Tag, MapPin, Grid3X3 } from "lucide-react"
import type { AutocompleteSuggestion } from "@/components/ui/autocomplete"

// Helper function to debounce function calls
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

export function useSearchSuggestions(initialQuery = "") {
  const [query, setQuery] = useState(initialQuery)
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Extract unique tags, locations, and categories from events
  const allTags = Array.from(
    new Set(
      DUMMY_EVENTS.flatMap((event) => event.tags || []).concat(DUMMY_POSTS.flatMap((post) => post.hashtags || [])),
    ),
  )

  const allLocations = Array.from(new Set(DUMMY_EVENTS.map((event) => event.location)))
  const allCategories = Array.from(new Set(DUMMY_EVENTS.map((event) => event.category).filter(Boolean) as string[]))

  // Generate suggestions based on query
  const generateSuggestions = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setSuggestions([])
        return
      }

      setIsLoading(true)

      // Simulate network delay
      setTimeout(() => {
        const lowerQuery = searchQuery.toLowerCase()

        // Event suggestions
        const eventSuggestions: AutocompleteSuggestion[] = DUMMY_EVENTS.filter((event) =>
          event.title.toLowerCase().includes(lowerQuery),
        ).map((event) => ({
          id: `event-${event.id}`,
          value: event.title,
          label: event.title,
          type: "event",
          icon: <Calendar className="h-4 w-4 text-blue-500" />,
        }))

        // Post suggestions
        const postSuggestions: AutocompleteSuggestion[] = DUMMY_POSTS.filter((post) =>
          post.content.toLowerCase().includes(lowerQuery),
        ).map((post) => ({
          id: `post-${post.id}`,
          value: post.content.substring(0, 50) + (post.content.length > 50 ? "..." : ""),
          label: post.content.substring(0, 50) + (post.content.length > 50 ? "..." : ""),
          type: "post",
          icon: <MessageSquare className="h-4 w-4 text-green-500" />,
        }))

        // Organizer suggestions
        const organizerSuggestions: AutocompleteSuggestion[] = DUMMY_ORGANIZERS.filter((organizer) =>
          organizer.name.toLowerCase().includes(lowerQuery),
        ).map((organizer) => ({
          id: `organizer-${organizer.id}`,
          value: organizer.name,
          label: organizer.name,
          type: "organizer",
          icon: <Users className="h-4 w-4 text-purple-500" />,
        }))

        // Tag suggestions
        const tagSuggestions: AutocompleteSuggestion[] = allTags
          .filter((tag) => tag.toLowerCase().includes(lowerQuery))
          .map((tag) => ({
            id: `tag-${tag}`,
            value: `#${tag}`,
            label: `#${tag}`,
            type: "tag",
            icon: <Tag className="h-4 w-4 text-yellow-500" />,
          }))

        // Location suggestions
        const locationSuggestions: AutocompleteSuggestion[] = allLocations
          .filter((location) => location.toLowerCase().includes(lowerQuery))
          .map((location) => ({
            id: `location-${location}`,
            value: location,
            label: location,
            type: "location",
            icon: <MapPin className="h-4 w-4 text-red-500" />,
          }))

        // Category suggestions
        const categorySuggestions: AutocompleteSuggestion[] = allCategories
          .filter((category) => category.toLowerCase().includes(lowerQuery))
          .map((category) => ({
            id: `category-${category}`,
            value: category,
            label: category,
            type: "category",
            icon: <Grid3X3 className="h-4 w-4 text-orange-500" />,
          }))

        // Combine all suggestions
        const allSuggestions = [
          ...eventSuggestions,
          ...postSuggestions,
          ...organizerSuggestions,
          ...tagSuggestions,
          ...locationSuggestions,
          ...categorySuggestions,
        ]

        setSuggestions(allSuggestions)
        setIsLoading(false)
      }, 300)
    },
    [allTags, allLocations, allCategories],
  )

  // Debounced version of generateSuggestions
  const debouncedGenerateSuggestions = useCallback(debounce(generateSuggestions, 300), [generateSuggestions])

  // Update suggestions when query changes
  useEffect(() => {
    debouncedGenerateSuggestions(query)
  }, [query, debouncedGenerateSuggestions])

  return {
    query,
    setQuery,
    suggestions,
    isLoading,
  }
}
