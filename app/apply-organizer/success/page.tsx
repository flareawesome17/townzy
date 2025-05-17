import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

export default function ApplicationSuccessPage() {
  return (
    <div className="container px-4 py-6 md:py-8 max-w-7xl">
      <PageHeader title="Application Submitted" description="Your organizer application has been received" />

      <div className="max-w-md mx-auto mt-12">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-300" />
              </div>
            </div>
            <CardTitle className="text-center">Application Submitted Successfully!</CardTitle>
            <CardDescription className="text-center">
              Thank you for applying to become an organizer on Townzy.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-center">
              <p className="text-muted-foreground">
                Our team will review your application within 1-3 business days. We'll notify you via email once a
                decision has been made.
              </p>
              <p className="text-muted-foreground">
                In the meantime, you can continue to explore events and connect with organizers on Townzy.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button asChild className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/events">Explore Events</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
