import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle2, Share2 } from "lucide-react"

export default function EventCreationSuccessPage() {
  return (
    <div className="container px-4 py-6 md:py-8 max-w-7xl">
      <PageHeader title="Event Published" description="Your event has been successfully created" />

      <div className="max-w-md mx-auto mt-12">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-300" />
              </div>
            </div>
            <CardTitle className="text-center">Event Published Successfully!</CardTitle>
            <CardDescription className="text-center">Your event is now live and visible to the public.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-center">
              <p className="text-muted-foreground">
                You can now share your event with your audience, manage attendees, and track ticket sales from your
                organizer dashboard.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button asChild className="w-full">
              <Link href="/organizer-dashboard">Go to Dashboard</Link>
            </Button>
            <Button asChild variant="outline" className="w-full gap-2">
              <Link href="/event/new-event">
                <Share2 className="h-4 w-4" />
                Share Event
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
