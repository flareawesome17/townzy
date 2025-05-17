import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventCard } from "@/components/event/event-card"
import { DUMMY_EVENTS } from "@/lib/dummy-data"
import { PageHeader } from "@/components/page-header"
import { EventFilters } from "@/components/event/event-filters"
import { EventsEmptyState } from "@/components/event/events-empty-state"

export default function EventsPage() {
  return (
    <div className="container px-4 py-6 md:py-8 max-w-7xl">
      <PageHeader title="Events" description="Discover and join exciting events happening in your area" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="hidden md:block">
          <EventFilters />
        </div>

        <div className="md:col-span-3">
          <Tabs defaultValue="upcoming" className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="weekend">This Weekend</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
              </TabsList>

              <div className="md:hidden">
                <EventFilters />
              </div>
            </div>

            <TabsContent value="upcoming" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DUMMY_EVENTS.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="today" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DUMMY_EVENTS.slice(0, 1).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
                {DUMMY_EVENTS.length <= 1 && <EventsEmptyState message="No more events happening today" />}
              </div>
            </TabsContent>

            <TabsContent value="weekend" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DUMMY_EVENTS.slice(0, 2).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="saved" className="mt-0">
              <EventsEmptyState message="You haven't saved any events yet" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
