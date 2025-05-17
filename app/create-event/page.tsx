"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FileUpload } from "@/components/ui/file-upload"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"
import { createEvent } from "@/lib/firebase/events"
import { cn } from "@/lib/utils"

// Define form schema with Zod
const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.date({
    required_error: "Event date is required",
  }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Please enter a valid time (HH:MM)"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  category: z.string().min(1, "Please select a category"),
  price: z.string().optional(),
  capacity: z.string().optional(),
})

type EventFormValues = z.infer<typeof eventFormSchema>

const categories = [
  { id: "music", name: "Music" },
  { id: "sports", name: "Sports" },
  { id: "food", name: "Food & Drink" },
  { id: "arts", name: "Arts & Culture" },
  { id: "networking", name: "Networking" },
  { id: "education", name: "Education" },
  { id: "charity", name: "Charity" },
  { id: "other", name: "Other" },
]

export default function CreateEventPage() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, userData, isOrganizer } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  // Initialize form with default values
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      time: "18:00",
      location: "",
      category: "",
      price: "",
      capacity: "",
    },
  })

  // Handle form submission
  const onSubmit = async (data: EventFormValues) => {
    if (!user || !userData) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create an event",
        variant: "destructive",
      })
      return
    }

    if (!isOrganizer) {
      toast({
        title: "Permission denied",
        description: "Only organizers can create events",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Combine date and time
      const eventDate = new Date(data.date)
      const [hours, minutes] = data.time.split(":").map(Number)
      eventDate.setHours(hours, minutes)

      // Create event object
      const eventData = {
        title: data.title,
        description: data.description,
        date: eventDate,
        location: data.location,
        category: data.category,
        price: data.price || "Free",
        capacity: data.capacity ? Number.parseInt(data.capacity) : null,
        organizerId: user.uid,
        organizer: {
          id: user.uid,
          name: userData.displayName || "Unknown",
          photoURL: userData.photoURL || null,
        },
        attendees: 0,
        interested: 0,
        image: null, // Will be updated by the createEvent function if imageFile is provided
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      // Create event in Firestore
      await createEvent(eventData, imageFile)

      toast({
        title: "Event created",
        description: "Your event has been created successfully",
      })

      router.push("/create-event/success")
    } catch (error) {
      console.error("Error creating event:", error)
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create Event</h1>
        <p className="text-muted-foreground mt-2">Fill out the form below to create a new event</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event title" {...field} />
                </FormControl>
                <FormDescription>Choose a clear and descriptive title for your event</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your event" className="min-h-32" {...field} />
                </FormControl>
                <FormDescription>Provide details about what attendees can expect</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Event location" {...field} />
                </FormControl>
                <FormDescription>Enter the address or venue name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Free or ticket price" {...field} />
                  </FormControl>
                  <FormDescription>Leave blank for free events</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Maximum attendees" {...field} />
                  </FormControl>
                  <FormDescription>Leave blank for unlimited capacity</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FileUpload onFileChange={setImageFile} label="Event Image" accept="image/*" maxSize={2} />

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Event"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
