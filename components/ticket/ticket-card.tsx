import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Calendar, Clock, Download, MapPin, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Event } from "@/types/event"

interface TicketCardProps {
  event: Event
  status: "upcoming" | "past"
}

export function TicketCard({ event, status }: TicketCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <div className="relative h-40 w-full">
          <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        <div className="absolute top-4 right-4">
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              status === "upcoming"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
            }`}
          >
            {status === "upcoming" ? "Upcoming" : "Past"}
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg font-bold text-white">{event.title}</h3>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{event.time || "All day"}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{event.location}</span>
          </div>
        </div>

        <div className="mt-4 p-3 border rounded-lg bg-muted/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Ticket #</p>
              <p className="font-mono font-medium">
                TZ-
                {Math.floor(Math.random() * 10000)
                  .toString()
                  .padStart(4, "0")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Ticket Type</p>
              <p className="font-medium">{event.ticketPrice ? "Paid" : "Free"}</p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" className="gap-1">
          <Download className="h-4 w-4" />
          <span>Ticket</span>
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
        <Button size="sm" asChild>
          <Link href={`/event/${event.id}`}>View Event</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
