"use client"
import type { AutocompleteSuggestion } from "@/components/ui/autocomplete"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PostCard } from "@/components/post/post-card"
import { EventCard } from "@/components/event/event-card"
import { OrganizerCard } from "@/components/organizer/organizer-card"
import { X } from "lucide-react"
import { DUMMY_POSTS, DUMMY_EVENTS, DUMMY_ORGANIZERS } from "@/lib/dummy-data"
import { SearchSkeleton } from "@/components/search/search-skeleton"
import { SearchEmptyState } from "@/components/search/search-empty-state"
import { SearchHistory } from "@/components/search/search-history"
import { Autocomplete } from "@/components/ui/autocomplete"
import { useSearchSuggestions } from "@/hooks/use-search-suggestions"

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const { query, setQuery, suggestions, isLoading: isSuggestionsLoading } = useSearchSuggestions(initialQuery)
  const [isSearching, setIsSearching] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")

  // Search results
  const [filteredPosts, setFilteredPosts] = useState(DUMMY_POSTS)
  const [filteredEvents, setFilteredEvents] = useState(DUMMY_EVENTS)
  const [filteredOrganizers, setFilteredOrganizers] = useState(DUMMY_ORGANIZERS)

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory")
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error("Failed to parse search history", e)
      }
    }
  }, [])

  // Save search history to localStorage
  const saveSearchHistory = (searchQuery: string) => {
    if (!searchQuery.trim()) return

    const newHistory = [searchQuery, ...searchHistory.filter((item) => item !== searchQuery)].slice(0, 5)

    setSearchHistory(newHistory)
    localStorage.setItem("searchHistory", JSON.stringify(newHistory))
  }

  // Clear search history
  const clearSearchHistory = () => {
    setSearchHistory([])
    localStorage.removeItem("searchHistory")
  }

  // Handle search
  const handleSearch = (searchQuery: string = query) => {
    if (!searchQuery.trim()) {
      setFilteredPosts(DUMMY_POSTS)
      setFilteredEvents(DUMMY_EVENTS)
      setFilteredOrganizers(DUMMY_ORGANIZERS)
      return
    }

    // Update URL with search query
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`, { scroll: false })

    setIsSearching(true)

    // Simulate search delay
    setTimeout(() => {
      const lowerQuery = searchQuery.toLowerCase()

      // Filter posts
      const posts = DUMMY_POSTS.filter(
        (post) =>
          post.content.toLowerCase().includes(lowerQuery) ||
          post.author.name.toLowerCase().includes(lowerQuery) ||
          (post.hashtags?.some((tag) => tag.toLowerCase().includes(lowerQuery)) ?? false),
      )

      // Filter events
      const events = DUMMY_EVENTS.filter(
        (event) =>
          event.title.toLowerCase().includes(lowerQuery) ||
          event.description.toLowerCase().includes(lowerQuery) ||
          event.location.toLowerCase().includes(lowerQuery) ||
          (event.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)) ?? false) ||
          (event.category?.toLowerCase().includes(lowerQuery) ?? false),
      )

      // Filter organizers
      const organizers = DUMMY_ORGANIZERS.filter(
        (organizer) =>
          organizer.name.toLowerCase().includes(lowerQuery) ||
          (organizer.description?.toLowerCase().includes(lowerQuery) ?? false) ||
          (organizer.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)) ?? false),
      )

      setFilteredPosts(posts)
      setFilteredEvents(events)
      setFilteredOrganizers(organizers)
      setIsSearching(false)

      // Save to search history
      if (searchQuery.trim()) {
        saveSearchHistory(searchQuery)
      }
    }, 500)
  }

  // Handle search on page load if query exists
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery)
      handleSearch(initialQuery)
    }
  }, [initialQuery, setQuery])

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion: AutocompleteSuggestion) => {
    switch (suggestion.type) {
      case "event":
        // Extract event ID from the suggestion ID
        const eventId = suggestion.id.replace("event-", "")
        router.push(`/event/${eventId}`)
        break
      case "post":
        // For posts, we'll just search for the content
        setQuery(suggestion.value)
        handleSearch(suggestion.value)
        break
      case "organizer":
        // Extract organizer ID from the suggestion ID
        const organizerId = suggestion.id.replace("organizer-", "")
        router.push(`/organizer/${organizerId}`)
        break
      case "tag":
      case "location":
      case "category":
        // For tags, locations, and categories, we'll search for them
        setQuery(suggestion.value)
        handleSearch(suggestion.value)
        break
      default:
        setQuery(suggestion.value)
        handleSearch(suggestion.value)
    }
  }

  // Clear search
  const clearSearch = () => {
    setQuery("")
    setFilteredPosts(DUMMY_POSTS)
    setFilteredEvents(DUMMY_EVENTS)
    setFilteredOrganizers(DUMMY_ORGANIZERS)
    router.push("/search", { scroll: false })
  }

  // Get total results count
  const totalResults = filteredPosts.length + filteredEvents.length + filteredOrganizers.length

  return (
    <div className="container px-4 py-6 md:py-8 max-w-7xl">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Search</h1>

        <div className="relative">
          <Autocomplete
            placeholder="Search events, posts, organizers..."
            suggestions={suggestions}
            isLoading={isSuggestionsLoading}
            value={query}
            onChange={setQuery}
            onSelect={handleSelectSuggestion}
            onSubmit={handleSearch}
            className="w-full"
            inputClassName="w-full"
            maxSuggestions={10}
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-8 w-8"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>

        {!query && searchHistory.length > 0 && (
          <SearchHistory
            history={searchHistory}
            onSelect={(historyQuery) => {
              setQuery(historyQuery)
              handleSearch(historyQuery)
            }}
            onClear={clearSearchHistory}
          />
        )}

        {query ? (
          <>
            {isSearching ? (
              <SearchSkeleton />
            ) : totalResults > 0 ? (
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  Found {totalResults} results for &quot;{query}&quot;
                </p>

                <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All ({totalResults})</TabsTrigger>
                    <TabsTrigger value="events">Events ({filteredEvents.length})</TabsTrigger>
                    <TabsTrigger value="posts">Posts ({filteredPosts.length})</TabsTrigger>
                    <TabsTrigger value="organizers">Organizers ({filteredOrganizers.length})</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-8 mt-6">
                    {filteredEvents.length > 0 && (
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Events</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {filteredEvents.slice(0, 4).map((event) => (
                            <EventCard key={event.id} event={event} />
                          ))}
                        </div>
                        {filteredEvents.length > 4 && (
                          <div className="text-center">
                            <Button variant="outline" onClick={() => setActiveTab("events")}>
                              View all {filteredEvents.length} events
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    {filteredPosts.length > 0 && (
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Posts</h2>
                        <div className="space-y-6">
                          {filteredPosts.slice(0, 3).map((post) => (
                            <PostCard key={post.id} post={post} />
                          ))}
                        </div>
                        {filteredPosts.length > 3 && (
                          <div className="text-center">
                            <Button variant="outline" onClick={() => setActiveTab("posts")}>
                              View all {filteredPosts.length} posts
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    {filteredOrganizers.length > 0 && (
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Organizers</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {filteredOrganizers.slice(0, 3).map((organizer) => (
                            <OrganizerCard key={organizer.id} organizer={organizer} />
                          ))}
                        </div>
                        {filteredOrganizers.length > 3 && (
                          <div className="text-center">
                            <Button variant="outline" onClick={() => setActiveTab("organizers")}>
                              View all {filteredOrganizers.length} organizers
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="events" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                    {filteredEvents.length === 0 && <SearchEmptyState type="events" query={query} />}
                  </TabsContent>

                  <TabsContent value="posts" className="space-y-6 mt-6">
                    {filteredPosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                    {filteredPosts.length === 0 && <SearchEmptyState type="posts" query={query} />}
                  </TabsContent>

                  <TabsContent value="organizers" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {filteredOrganizers.map((organizer) => (
                        <OrganizerCard key={organizer.id} organizer={organizer} />
                      ))}
                    </div>
                    {filteredOrganizers.length === 0 && <SearchEmptyState type="organizers" query={query} />}
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <SearchEmptyState type="results" query={query} />
            )}
          </>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">Enter a search term to find events, posts, and organizers</p>
          </div>
        )}
      </div>
    </div>
  )
}
