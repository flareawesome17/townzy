"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CalendarDays, MapPin, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import type { Event } from "@/types/event"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Handle missing data gracefully
  const eventDate = event.date ? new Date(event.date.seconds * 1000) : new Date()
  const formattedDate = formatDate(eventDate)
  const location = event.location || "Location TBD"
  const attendees = event.attendees || 0

  return (
    <Card
      className="overflow-hidden transition-all duration-200 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[2/1] w-full">
        <Image
          src={event.image || "/placeholder.svg?height=200&width=400"}
          alt={event.title}
          fill
          className={`object-cover transition-transform duration-300 ${isHovered ? "scale-105" : "scale-100"}`}
        />
        {event.featured && <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">Featured</Badge>}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold line-clamp-1 mb-2">
          <Link href={`/event/${event.id}`} className="hover:text-primary">
            {event.title}
          </Link>
        </h3>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{attendees} attending</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button size="sm" className="w-full" asChild>
          <Link href={`/event/${event.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
