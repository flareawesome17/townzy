"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { CalendarPlus, MoreHorizontal, Search } from "lucide-react"

// Mock data for events
const events = [
  {
    id: "e1",
    title: "Summer Music Festival",
    organizer: "Music Events Inc.",
    date: "2023-07-15",
    location: "Downtown Park",
    status: "upcoming",
    attendees: 1250,
  },
  {
    id: "e2",
    title: "Tech Conference 2023",
    organizer: "Tech Community",
    date: "2023-08-20",
    location: "Convention Center",
    status: "upcoming",
    attendees: 850,
  },
  {
    id: "e3",
    title: "Food & Wine Expo",
    organizer: "Culinary Arts Association",
    date: "2023-06-10",
    location: "Exhibition Hall",
    status: "completed",
    attendees: 1500,
  },
  {
    id: "e4",
    title: "Startup Pitch Night",
    organizer: "Venture Capital Group",
    date: "2023-07-05",
    location: "Innovation Hub",
    status: "upcoming",
    attendees: 300,
  },
  {
    id: "e5",
    title: "Art Gallery Opening",
    organizer: "City Arts Council",
    date: "2023-05-18",
    location: "Modern Art Museum",
    status: "completed",
    attendees: 450,
  },
]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">Manage events across the platform</p>
        </div>
        <Button>
          <CalendarPlus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search events..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Organizer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Attendees</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  <div className="font-medium">{event.title}</div>
                </TableCell>
                <TableCell>{event.organizer}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      event.status === "upcoming" ? "outline" : event.status === "completed" ? "secondary" : "default"
                    }
                  >
                    {event.status}
                  </Badge>
                </TableCell>
                <TableCell>{event.attendees}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit event</DropdownMenuItem>
                      <DropdownMenuItem>View attendees</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Cancel event</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
