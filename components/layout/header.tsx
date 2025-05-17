"use client"
import type { AutocompleteSuggestion } from "@/components/ui/autocomplete"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Menu, X, Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/context/auth-context"
import { Autocomplete } from "@/components/ui/autocomplete"
import { useSearchSuggestions } from "@/hooks/use-search-suggestions"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isOrganizer, isAdmin, logout } = useAuth()
  const { query, setQuery, suggestions, isLoading } = useSearchSuggestions()

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setQuery("")
    }
  }

  const handleSelectSuggestion = (suggestion: AutocompleteSuggestion) => {
    switch (suggestion.type) {
      case "event":
        // Extract event ID from the suggestion ID
        const eventId = suggestion.id.replace("event-", "")
        router.push(`/event/${eventId}`)
        break
      case "post":
        // For posts, we'll just search for the content
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
        handleSearch(suggestion.value)
        break
      default:
        handleSearch(suggestion.value)
    }
    setQuery("")
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">Townzy</span>
          </Link>
          <div className="hidden md:flex md:gap-4">
            <Link href="/events" className="text-sm font-medium hover:underline">
              Events
            </Link>
            <Link href="/discover" className="text-sm font-medium hover:underline">
              Discover
            </Link>
            <Link href="/organizers" className="text-sm font-medium hover:underline">
              Organizers
            </Link>
            <Link href="/community" className="text-sm font-medium hover:underline">
              Community
            </Link>
          </div>
        </div>
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:gap-4">
          <div className="relative w-full max-w-sm">
            <Autocomplete
              placeholder="Search events, posts, organizers..."
              suggestions={suggestions}
              isLoading={isLoading}
              value={query}
              onChange={setQuery}
              onSelect={handleSelectSuggestion}
              onSubmit={handleSearch}
              className="w-full"
              inputClassName="w-full bg-background md:w-[300px] lg:w-[400px]"
              maxSuggestions={10}
            />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary"></span>
            <span className="sr-only">Notifications</span>
          </Button>
          <ModeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/tickets">My Tickets</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/saved">Saved Events</Link>
                </DropdownMenuItem>
                {isOrganizer && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/organizer-dashboard">Organizer Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/create-event">Create Event</Link>
                    </DropdownMenuItem>
                  </>
                )}
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="icon" onClick={() => router.push("/search")}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <button
            className="flex items-center justify-center rounded-md p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container border-t py-4 md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link href="/events" className="text-sm font-medium hover:underline" onClick={() => setIsMenuOpen(false)}>
              Events
            </Link>
            <Link href="/discover" className="text-sm font-medium hover:underline" onClick={() => setIsMenuOpen(false)}>
              Discover
            </Link>
            <Link
              href="/organizers"
              className="text-sm font-medium hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Organizers
            </Link>
            <Link
              href="/community"
              className="text-sm font-medium hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <div className="pt-4">
              <Autocomplete
                placeholder="Search events, posts, organizers..."
                suggestions={suggestions}
                isLoading={isLoading}
                value={query}
                onChange={setQuery}
                onSelect={handleSelectSuggestion}
                onSubmit={handleSearch}
                className="w-full"
                inputClassName="w-full bg-background"
                maxSuggestions={5}
              />
            </div>
            {!user && (
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="outline" asChild>
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    Log in
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                    Sign up
                  </Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
