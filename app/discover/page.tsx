import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrganizerCard } from "@/components/organizer/organizer-card"
import { EventCard } from "@/components/event/event-card"
import { DUMMY_ORGANIZERS, DUMMY_EVENTS } from "@/lib/dummy-data"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function DiscoverPage() {
  const categories = [
    "Music",
    "Arts",
    "Food",
    "Sports",
    "Technology",
    "Education",
    "Networking",
    "Community",
    "Charity",
    "Outdoors",
  ]

  return (
    <div className="container px-4 py-6 md:py-8 max-w-7xl">
      <PageHeader title="Discover" description="Explore events, organizers, and activities in your area" />

      <div className="relative max-w-xl mx-auto mt-8 mb-10">
        <div className="flex w-full items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search events, organizers, or categories..."
              className="pl-10 pr-4 py-6 text-base rounded-full border-muted bg-background"
            />
          </div>
          <Button size="lg" className="rounded-full px-6 bg-gradient-to-r from-primary to-secondary text-white">
            Search
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Popular Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="px-4 py-2 text-sm rounded-full hover:bg-primary hover:text-white cursor-pointer transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <Tabs defaultValue="events" className="w-full">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="organizers">Organizers</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DUMMY_EVENTS.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="organizers" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DUMMY_ORGANIZERS.map((organizer) => (
              <OrganizerCard key={organizer.id} organizer={organizer} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DUMMY_EVENTS.slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
            {DUMMY_ORGANIZERS.slice(0, 3).map((organizer) => (
              <OrganizerCard key={organizer.id} organizer={organizer} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
