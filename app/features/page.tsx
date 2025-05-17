import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Users, MessageSquare, Bell, Map, Search, Heart, Ticket, BarChart3, Shield } from "lucide-react"

export default function FeaturesPage() {
  const features = [
    {
      title: "Social Media Feed",
      description: "Browse a personalized feed of events, updates, and posts from organizers you follow.",
      icon: <Calendar className="h-10 w-10 text-primary" />,
      color: "bg-primary/10",
    },
    {
      title: "Organizer Profiles",
      description: "Follow your favorite event organizers and stay updated on their upcoming events.",
      icon: <Users className="h-10 w-10 text-secondary" />,
      color: "bg-secondary/10",
    },
    {
      title: "Direct Messaging",
      description: "Connect directly with event organizers and other attendees.",
      icon: <MessageSquare className="h-10 w-10 text-accent" />,
      color: "bg-accent/10",
    },
    {
      title: "Real-time Notifications",
      description: "Get notified about event updates, new posts, and messages.",
      icon: <Bell className="h-10 w-10 text-primary" />,
      color: "bg-primary/10",
    },
    {
      title: "Interactive Maps",
      description: "Find events near you with our interactive map feature.",
      icon: <Map className="h-10 w-10 text-secondary" />,
      color: "bg-secondary/10",
    },
    {
      title: "Advanced Search",
      description: "Filter events by date, category, location, and more.",
      icon: <Search className="h-10 w-10 text-accent" />,
      color: "bg-accent/10",
    },
    {
      title: "Save & Bookmark",
      description: "Save events and organizers to your personal collection.",
      icon: <Heart className="h-10 w-10 text-primary" />,
      color: "bg-primary/10",
    },
    {
      title: "Digital Tickets",
      description: "Manage your event tickets directly within the platform.",
      icon: <Ticket className="h-10 w-10 text-secondary" />,
      color: "bg-secondary/10",
    },
    {
      title: "Organizer Analytics",
      description: "Event organizers can track attendance, engagement, and more.",
      icon: <BarChart3 className="h-10 w-10 text-accent" />,
      color: "bg-accent/10",
    },
    {
      title: "Verified Organizers",
      description: "Trust badge system ensures legitimacy of event organizers.",
      icon: <Shield className="h-10 w-10 text-primary" />,
      color: "bg-primary/10",
    },
  ]

  return (
    <div className="container px-4 py-6 md:py-8 max-w-7xl">
      <PageHeader title="Features" description="Discover what makes Townzy the best platform for local events" />

      <div className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`${feature.color} p-3 rounded-full w-fit mb-4`}>{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-24 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to experience Townzy?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who are discovering and participating in local events every day.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary text-white px-8">
              <Link href="/signup">Sign Up Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8">
              <Link href="/organizers">For Organizers</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
