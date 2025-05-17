import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Calendar, BarChart3, Megaphone, Globe, Shield } from "lucide-react"

export default function OrganizersPage() {
  const benefits = [
    {
      title: "Reach Your Target Audience",
      description: "Connect with people in your local area who are actively looking for events like yours.",
      icon: <Users className="h-10 w-10 text-primary" />,
      color: "bg-primary/10",
    },
    {
      title: "Powerful Event Management",
      description: "Create, manage, and promote your events with our easy-to-use tools.",
      icon: <Calendar className="h-10 w-10 text-secondary" />,
      color: "bg-secondary/10",
    },
    {
      title: "Insightful Analytics",
      description: "Track attendance, engagement, and other key metrics to improve your events.",
      icon: <BarChart3 className="h-10 w-10 text-accent" />,
      color: "bg-accent/10",
    },
    {
      title: "Promotional Tools",
      description: "Leverage social sharing, featured listings, and targeted promotions.",
      icon: <Megaphone className="h-10 w-10 text-primary" />,
      color: "bg-primary/10",
    },
    {
      title: "Build Your Brand",
      description: "Create a professional organizer profile and grow your following.",
      icon: <Globe className="h-10 w-10 text-secondary" />,
      color: "bg-secondary/10",
    },
    {
      title: "Verified Status",
      description: "Earn a verification badge to build trust with potential attendees.",
      icon: <Shield className="h-10 w-10 text-accent" />,
      color: "bg-accent/10",
    },
  ]

  const testimonials = [
    {
      quote:
        "Townzy has transformed how we promote our local music events. We've seen a 40% increase in attendance since we started using the platform.",
      author: "Sarah Johnson",
      role: "Music Festival Organizer",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "The analytics tools have been invaluable for understanding our audience and improving our community workshops.",
      author: "Michael Chen",
      role: "Community Center Director",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "As a small business owner, I've been able to reach new customers through our in-store events. The ROI has been incredible.",
      author: "Aisha Patel",
      role: "Boutique Owner",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="container px-4 py-6 md:py-8 max-w-7xl">
      <PageHeader
        title="For Event Organizers"
        description="Powerful tools to create, promote, and manage your events"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
        <div>
          <h2 className="text-3xl font-bold mb-6">Grow Your Events with Townzy</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Whether you're organizing community meetups, workshops, concerts, or festivals, Townzy provides everything
            you need to succeed.
          </p>
          <p className="text-lg text-muted-foreground mb-6">
            Our platform connects you with engaged local audiences and gives you powerful tools to manage your events
            from start to finish.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary text-white px-8">
              <Link href="/apply-organizer">Apply Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
        <div className="relative aspect-square rounded-2xl overflow-hidden">
          <Image
            src="/placeholder.svg?height=600&width=600"
            alt="Event organizer using Townzy"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center mb-12">Benefits for Organizers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`${benefit.color} p-3 rounded-full w-fit mb-4`}>{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Apply to be an Organizer</h3>
            <p className="text-muted-foreground">
              Submit your application to become a verified event organizer on Townzy.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-secondary">2</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Create Your Events</h3>
            <p className="text-muted-foreground">
              Use our intuitive tools to create and customize your event listings.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-accent">3</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Grow Your Audience</h3>
            <p className="text-muted-foreground">
              Promote your events, engage with attendees, and build your following.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <p className="text-lg italic mb-6">"{testimonial.quote}"</p>
                  <div className="mt-auto flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-24 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to grow your events?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of successful event organizers on Townzy and take your events to the next level.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary text-white px-8">
            <Link href="/apply-organizer">Apply to be an Organizer</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
