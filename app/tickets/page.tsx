"use client"

import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DUMMY_EVENTS } from "@/lib/dummy-data"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Ticket } from "lucide-react"
import Link from "next/link"
import { TicketCard } from "@/components/ticket/ticket-card"

export default function TicketsPage() {
  const { user } = useAuth()

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <div className="container px-4 py-6 md:py-8 max-w-7xl">
        <PageHeader title="My Tickets" description="View and manage your event tickets" />

        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-muted rounded-full p-6 mb-4">
            <Ticket className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Sign in to see your tickets</h2>
          <p className="text-muted-foreground max-w-md mb-6">
            Create an account or sign in to view and manage your event tickets.
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
      <PageHeader title="My Tickets" description="View and manage your event tickets" />

      <Tabs defaultValue="upcoming" className="w-full mt-8">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="all">All Tickets</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* For demo purposes, show some tickets */}
            {DUMMY_EVENTS.slice(0, 2).map((event) => (
              <TicketCard key={event.id} event={event} status="upcoming" />
            ))}

            {/* Empty state if no upcoming tickets */}
            {DUMMY_EVENTS.length <= 2 && (
              <div className="col-span-full flex flex-col items-center justify-center py-10 text-center">
                <div className="bg-muted rounded-full p-4 mb-4">
                  <Ticket className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No more upcoming tickets</h3>
                <p className="text-muted-foreground max-w-md mb-4">Browse events and get tickets to see them here.</p>
                <Button asChild>
                  <Link href="/events">Browse Events</Link>
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="past" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DUMMY_EVENTS.slice(2, 3).map((event) => (
              <TicketCard key={event.id} event={event} status="past" />
            ))}

            {/* Empty state if no past tickets */}
            {DUMMY_EVENTS.length <= 3 && (
              <div className="col-span-full flex flex-col items-center justify-center py-10 text-center">
                <div className="bg-muted rounded-full p-4 mb-4">
                  <Ticket className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No more past tickets</h3>
                <p className="text-muted-foreground max-w-md mb-4">
                  Your attended events will appear here after they've ended.
                </p>
                <Button asChild>
                  <Link href="/events">Browse Events</Link>
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DUMMY_EVENTS.slice(0, 3).map((event, index) => (
              <TicketCard key={event.id} event={event} status={index < 2 ? "upcoming" : "past"} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
