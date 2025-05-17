import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import Link from "next/link"

interface EventsEmptyStateProps {
  message: string
}

export function EventsEmptyState({ message }: EventsEmptyStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted rounded-full p-4 mb-4">
        <Calendar className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-2">{message}</h3>
      <p className="text-muted-foreground max-w-md mb-4">Discover more events happening in your area.</p>
      <Button asChild>
        <Link href="/discover">Discover Events</Link>
      </Button>
    </div>
  )
}
