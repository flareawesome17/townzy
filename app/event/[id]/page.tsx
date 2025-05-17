"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { CalendarDays, Clock, MapPin, Users, Heart, Share2, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useFirestoreDocument } from "@/hooks/use-firestore-document"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { doc, updateDoc, increment } from "firebase/firestore"
import { db } from "@/lib/firebase/firebase"
import type { Event } from "@/types/event"

export default function EventPage() {
  const { id } = useParams() as { id: string }
  const { user } = useAuth()
  const { toast } = useToast()
  const [isInterested, setIsInterested] = useState(false)
  const [isAttending, setIsAttending] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch event data with real-time updates
  const {
    data: event,
    loading,
    error,
  } = useFirestoreDocument<Event>({
    collectionName: "events",
    documentId: id,
  })

  const handleInterested = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to mark events as interested",
      })
      return
    }

    setIsSubmitting(true)
    try {
      // Toggle interested status
      const newStatus = !isInterested
      setIsInterested(newStatus)

      // Update event in Firestore
      const eventRef = doc(db, "events", id)
      await updateDoc(eventRef, {
        interested: increment(newStatus ? 1 : -1),
      })

      // Update user's interested events
      const userRef = doc(db, "users", user.uid)
      if (newStatus) {
        // Add to interested events
        await updateDoc(userRef, {
          interestedEvents: [...(user.interestedEvents || []), id],
        })
      } else {
        // Remove from interested events
        await updateDoc(userRef, {
          interestedEvents: (user.interestedEvents || []).filter((eventId) => eventId !== id),
        })
      }

      toast({
        title: newStatus ? "Added to interested" : "Removed from interested",
        description: newStatus
          ? "This event has been added to your interested events"
          : "This event has been removed from your interested events",
      })
    } catch (error) {
      console.error("Error updating interested status:", error)
      setIsInterested(!isInterested) // Revert UI state on error
      toast({
        title: "Error",
        description: "Failed to update interested status",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAttend = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to attend events",
      })
      return
    }

    setIsSubmitting(true)
    try {
      // Toggle attending status
      const newStatus = !isAttending
      setIsAttending(newStatus)

      // Update event in Firestore
      const eventRef = doc(db, "events", id)
      await updateDoc(eventRef, {
        attendees: increment(newStatus ? 1 : -1),
      })

      // Update user's attending events
      const userRef = doc(db, "users", user.uid)
      if (newStatus) {
        // Add to attending events
        await updateDoc(userRef, {
          attendingEvents: [...(user.attendingEvents || []), id],
        })
      } else {
        // Remove from attending events
        await updateDoc(userRef, {
          attendingEvents: (user.attendingEvents || []).filter((eventId) => eventId !== id),
        })
      }

      toast({
        title: newStatus ? "You're attending!" : "You're no longer attending",
        description: newStatus
          ? "You have been added to the attendee list"
          : "You have been removed from the attendee list",
      })
    } catch (error) {
      console.error("Error updating attendance status:", error)
      setIsAttending(!isAttending) // Revert UI state on error
      toast({
        title: "Error",
        description: "Failed to update attendance status",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container py-10 flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading event details...</p>
        </div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="container py-10">
        <div className="flex flex-col items-center gap-4 py-10">
          <h2 className="text-2xl font-bold">Event not found</h2>
          <p className="text-muted-foreground">The event you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link href="/events">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/events">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="relative aspect-video overflow-hidden rounded-lg border">
            {event.image ? (
              <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" priority />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <p className="text-muted-foreground">No image available</p>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">{event.category}</Badge>
              <Badge variant="secondary">{event.price}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-muted-foreground" />
              <span>{format(new Date(event.date.seconds * 1000), "EEEE, MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>{format(new Date(event.date.seconds * 1000), "h:mm a")}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span>
                {event.attendees} {event.attendees === 1 ? "person" : "people"} attending
              </span>
            </div>
          </div>

          <Separator />

          <Tabs defaultValue="about">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="space-y-4 py-4">
              <div className="prose dark:prose-invert max-w-none">
                <p>{event.description}</p>
              </div>
            </TabsContent>
            <TabsContent value="discussion" className="py-4">
              <div className="text-center py-8">
                <p className="text-muted-foreground">Join the conversation about this event</p>
                <Button className="mt-4">Sign in to comment</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border p-4 space-y-4">
            <h3 className="font-semibold text-lg">Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant={isInterested ? "default" : "outline"} onClick={handleInterested} disabled={isSubmitting}>
                <Heart className="mr-2 h-4 w-4" fill={isInterested ? "currentColor" : "none"} />
                {isInterested ? "Interested" : "Interest"}
              </Button>
              <Button variant={isAttending ? "default" : "outline"} onClick={handleAttend} disabled={isSubmitting}>
                {isAttending ? "Attending" : "Attend"}
              </Button>
              <Button variant="outline" className="col-span-2">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <div className="rounded-lg border p-4 space-y-4">
            <h3 className="font-semibold text-lg">Organizer</h3>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={event.organizer?.photoURL || ""} />
                <AvatarFallback>{event.organizer?.name?.charAt(0) || "O"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{event.organizer?.name}</p>
                <p className="text-sm text-muted-foreground">Event Organizer</p>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild className="w-full">
              <Link href={`/organizer/${event.organizerId}`}>View Profile</Link>
            </Button>
          </div>

          {event.capacity && (
            <div className="rounded-lg border p-4 space-y-2">
              <h3 className="font-semibold text-lg">Capacity</h3>
              <div className="flex items-center justify-between">
                <span>
                  {event.attendees} / {event.capacity}
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.max(0, event.capacity - event.attendees)} spots left
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{
                    width: `${Math.min(100, (event.attendees / event.capacity) * 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
