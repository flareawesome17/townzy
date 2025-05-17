"use client"

import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventCard } from "@/components/event/event-card"
import { OrganizerCard } from "@/components/organizer/organizer-card"
import { DUMMY_EVENTS, DUMMY_ORGANIZERS } from "@/lib/dummy-data"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { BookmarkIcon } from "lucide-react"
import Link from "next/link"

export default function SavedPage() {
  const { user } = useAuth()

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <div className="container px-4 py-6 md:py-8 max-w-7xl">
        <PageHeader title="Saved Items" description="Your bookmarked events and followed organizers" />

        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-muted rounded-full p-6 mb-4">
            <BookmarkIcon className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Sign in to see your saved items</h2>
          <p className="text-muted-foreground max-w-md mb-6">
            Create an account or sign in to save events and follow organizers you're interested in.
          </p>
          <div className="flex gap-4">
            <Button asChild variant="outline">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-primary to-secondary text-white">
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-6 md:py-8 max-w-7xl">
      <PageHeader title="Saved Items" description="Your bookmarked events and followed organizers" />

      <Tabs defaultValue="events" className="w-full mt-8">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
          <TabsTrigger value="events">Saved Events</TabsTrigger>
          <TabsTrigger value="organizers">Following</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="mt-0">
          {/* For demo purposes, show some events */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DUMMY_EVENTS.slice(0, 2).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}

            {/* Empty state if no saved events */}
            {DUMMY_EVENTS.length <= 2 && (
              <div className="col-span-full flex flex-col items-center justify-center py-10 text-center">
                <div className="bg-muted rounded-full p-4 mb-4">
                  <BookmarkIcon className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No more saved events</h3>
                <p className="text-muted-foreground max-w-md mb-4">
                  Discover more events and save them to view them here.
                </p>
                <Button asChild>
                  <Link href="/discover">Discover Events</Link>
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="organizers" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DUMMY_ORGANIZERS.slice(0, 2).map((organizer) => (
              <OrganizerCard key={organizer.id} organizer={organizer} />
            ))}

            {/* Empty state if not following any organizers */}
            {DUMMY_ORGANIZERS.length <= 2 && (
              <div className="col-span-full flex flex-col items-center justify-center py-10 text-center">
                <div className="bg-muted rounded-full p-4 mb-4">
                  <BookmarkIcon className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Not following any more organizers</h3>
                <p className="text-muted-foreground max-w-md mb-4">
                  Discover organizers and follow them to see their events and updates.
                </p>
                <Button asChild>
                  <Link href="/discover">Discover Organizers</Link>
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
