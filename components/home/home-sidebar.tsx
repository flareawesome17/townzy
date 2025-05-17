"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/context/auth-context"
import { DUMMY_EVENTS } from "@/lib/dummy-data"
import { Calendar, Clock, MapPin, Users, Star, Bookmark, LogOut, Settings, UserIcon, Plus, Ticket } from "lucide-react"

export function HomeSidebar() {
  const pathname = usePathname()
  const { user, userData, isOrganizer, signOut } = useAuth()

  // Get upcoming events (first 3)
  const upcomingEvents = DUMMY_EVENTS.slice(0, 3)

  // Get user display name and initial safely
  const displayName = userData?.displayName || user?.email?.split("@")[0] || "User"
  const userInitial = displayName.charAt(0) || "U"

  return (
    <div className="sticky top-[80px] h-[calc(100vh-100px)] overflow-y-auto pr-2 pb-8 flex flex-col gap-6 hide-scrollbar">
      {user ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 px-2 py-1.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              {userInitial}
            </span>
            <div className="flex flex-col">
              <span className="font-medium">{displayName}</span>
              <span className="text-xs text-muted-foreground">{userData?.email || user?.email || "No email"}</span>
            </div>
          </div>
          <Separator className="my-1" />
          <Link href="/profile">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <UserIcon className="h-4 w-4" />
              Profile
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </Link>
          {isOrganizer ? (
            <Link href="/create-event">
              <Button className="mt-1 w-full justify-start gap-2">
                <Plus className="h-4 w-4" />
                Create Event
              </Button>
            </Link>
          ) : (
            <Link href="/apply-organizer">
              <Button className="mt-1 w-full justify-start gap-2">
                <Plus className="h-4 w-4" />
                Become an Organizer
              </Button>
            </Link>
          )}
          <Button
            variant="ghost"
            className="mt-1 w-full justify-start gap-2 text-destructive hover:text-destructive"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2 rounded-lg border p-4 bg-card shadow-sm">
          <h3 className="font-semibold">Join Townzy today</h3>
          <p className="text-sm text-muted-foreground">
            Sign up to discover local events, connect with organizers, and more.
          </p>
          <div className="mt-2 flex flex-col gap-2">
            <Button asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h3 className="px-2 font-semibold">Upcoming Events</h3>
        <div className="space-y-2">
          {upcomingEvents.map((event) => (
            <Link key={event.id} href={`/event/${event.id}`}>
              <div className="group rounded-md p-2 hover:bg-muted border border-transparent hover:border-border transition-colors">
                <h4 className="line-clamp-1 font-medium group-hover:text-primary">{event.title}</h4>
                <div className="mt-1 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Button variant="ghost" className="mt-1 justify-start text-sm" asChild>
          <Link href="/events">View all events</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="px-2 font-semibold">Popular Categories</h3>
        <div className="flex flex-wrap gap-2 px-2">
          <Button variant="outline" size="sm" className="rounded-full">
            Music
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Food & Drink
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Arts
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Sports
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Technology
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="px-2 font-semibold">Quick Links</h3>
        <div className="flex flex-col">
          <Button variant="ghost" className="justify-start gap-2" asChild>
            <Link href="/saved">
              <Bookmark className="h-4 w-4" />
              Saved Events
            </Link>
          </Button>
          <Button variant="ghost" className="justify-start gap-2" asChild>
            <Link href="/tickets">
              <Ticket className="h-4 w-4" />
              My Tickets
            </Link>
          </Button>
          <Button variant="ghost" className="justify-start gap-2" asChild>
            <Link href="/organizers">
              <Users className="h-4 w-4" />
              Find Organizers
            </Link>
          </Button>
          <Button variant="ghost" className="justify-start gap-2" asChild>
            <Link href="/community">
              <Star className="h-4 w-4" />
              Community
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
