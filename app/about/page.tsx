import { PageHeader } from "@/components/page-header"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Sarah founded Townzy with a vision to connect communities through local events.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Michael leads our technical team and ensures Townzy stays at the cutting edge.",
    },
    {
      name: "Aisha Patel",
      role: "Head of Community",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Aisha works directly with organizers and attendees to build vibrant local communities.",
    },
  ]

  return (
    <div className="container px-4 py-6 md:py-8 max-w-7xl">
      <PageHeader title="About Townzy" description="Our mission, story, and the team behind the platform" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Townzy was founded with a simple but powerful mission: to bring communities together through local events
            and experiences.
          </p>
          <p className="text-lg text-muted-foreground mb-6">
            We believe that vibrant communities are built on meaningful in-person connections, and our platform makes it
            easier than ever to discover, create, and participate in local events.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Connect Communities</h3>
                <p className="text-muted-foreground">Bringing people together through shared experiences</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Empower Organizers</h3>
                <p className="text-muted-foreground">Providing tools for event creators to reach their audience</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Celebrate Local</h3>
                <p className="text-muted-foreground">Highlighting the unique character of every town and city</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative aspect-square rounded-2xl overflow-hidden">
          <Image
            src="/placeholder.svg?height=600&width=600"
            alt="Townzy community event"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
        <div className="max-w-3xl mx-auto space-y-6 text-lg">
          <p>
            Townzy began in 2020 when our founder, Sarah, found herself struggling to discover local events after moving
            to a new city. Despite living in a vibrant community, she felt disconnected and isolated.
          </p>
          <p>
            She realized that while social media connected people digitally, there was no dedicated platform that made
            it easy to find and engage with events happening right in your neighborhood.
          </p>
          <p>
            With a small team of passionate developers and community builders, Townzy was born – a platform that
            combines the best of social media with local event discovery, designed to strengthen community bonds and
            support local organizers.
          </p>
          <p>
            Today, Townzy helps thousands of people discover events in their communities, and enables organizers to
            reach engaged local audiences who are eager to participate.
          </p>
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="overflow-hidden">
              <div className="relative h-64 w-full">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-24 text-center">
        <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Whether you're looking to attend events, organize them, or just connect with your local community, Townzy is
          the platform for you.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary text-white px-8">
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="px-8">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
