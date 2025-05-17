import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Users, Calendar, Heart, Lightbulb, HelpCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CommunityPage() {
  const communityGroups = [
    {
      name: "Music Lovers",
      members: 1250,
      events: 48,
      image: "/placeholder.svg?height=300&width=300",
      description: "Connect with fellow music enthusiasts and discover local concerts and performances.",
    },
    {
      name: "Tech Meetups",
      members: 950,
      events: 36,
      image: "/placeholder.svg?height=300&width=300",
      description: "Join discussions and events focused on technology, coding, and innovation.",
    },
    {
      name: "Foodies Club",
      members: 1800,
      events: 62,
      image: "/placeholder.svg?height=300&width=300",
      description: "Explore culinary events, restaurant openings, and food festivals in your area.",
    },
    {
      name: "Outdoor Adventures",
      members: 1100,
      events: 42,
      image: "/placeholder.svg?height=300&width=300",
      description: "Find hiking groups, camping trips, and other outdoor activities.",
    },
    {
      name: "Arts & Culture",
      members: 1400,
      events: 54,
      image: "/placeholder.svg?height=300&width=300",
      description: "Discover gallery openings, theater performances, and cultural festivals.",
    },
    {
      name: "Fitness Community",
      members: 1600,
      events: 58,
      image: "/placeholder.svg?height=300&width=300",
      description: "Connect with workout partners, find fitness classes, and join sports events.",
    },
  ]

  const upcomingEvents = [
    {
      name: "Community Meetup: Summer Edition",
      date: "July 15, 2023",
      location: "Central Park",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      name: "Townzy User Conference",
      date: "August 10-12, 2023",
      location: "Convention Center",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      name: "Organizer Workshop",
      date: "September 5, 2023",
      location: "Virtual Event",
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  return (
    <div className="container px-4 py-6 md:py-8 max-w-7xl">
      <PageHeader title="Community" description="Connect with other Townzy users and join the conversation" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
        <div>
          <h2 className="text-3xl font-bold mb-6">Join Our Vibrant Community</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Townzy is more than just an event platform—it's a community of people passionate about local experiences and
            connections.
          </p>
          <p className="text-lg text-muted-foreground mb-6">
            Whether you're an attendee looking for like-minded people or an organizer seeking to grow your network, our
            community has something for everyone.
          </p>
          <div className="space-y-4 mt-8">
            <div className="flex items-start gap-3">
              <MessageSquare className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Discussion Forums</h3>
                <p className="text-muted-foreground">Engage in conversations about events and local happenings</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Interest Groups</h3>
                <p className="text-muted-foreground">Connect with people who share your passions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Community Events</h3>
                <p className="text-muted-foreground">Participate in exclusive Townzy community gatherings</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative aspect-square rounded-2xl overflow-hidden">
          <Image
            src="/placeholder.svg?height=600&width=600"
            alt="Townzy community members"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center mb-12">Community Groups</h2>
        <Tabs defaultValue="popular" className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="all">All Groups</TabsTrigger>
          </TabsList>

          <TabsContent value="popular" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityGroups.slice(0, 6).map((group, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image src={group.image || "/placeholder.svg"} alt={group.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{group.name}</h3>
                    <p className="text-muted-foreground mb-4">{group.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{group.members} members</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{group.events} events</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4">Join Group</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityGroups.slice(3, 6).map((group, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image src={group.image || "/placeholder.svg"} alt={group.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{group.name}</h3>
                    <p className="text-muted-foreground mb-4">{group.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{group.members} members</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{group.events} events</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4">Join Group</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityGroups.map((group, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image src={group.image || "/placeholder.svg"} alt={group.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{group.name}</h3>
                    <p className="text-muted-foreground mb-4">{group.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{group.members} members</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{group.events} events</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4">Join Group</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center mb-12">Upcoming Community Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src={event.image || "/placeholder.svg"} alt={event.name} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{event.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{event.location}</span>
                </div>
                <Button className="w-full">RSVP</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center mb-12">Get Involved</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Volunteer</h3>
              <p className="text-muted-foreground mb-4">
                Help out at community events and make a difference in your local area.
              </p>
              <Button asChild variant="outline" className="mt-auto">
                <Link href="/volunteer">Learn More</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-secondary/10 p-4 rounded-full mb-4">
                <Lightbulb className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Suggest Ideas</h3>
              <p className="text-muted-foreground mb-4">
                Share your ideas for new features, events, or community initiatives.
              </p>
              <Button asChild variant="outline" className="mt-auto">
                <Link href="/ideas">Submit Idea</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-accent/10 p-4 rounded-full mb-4">
                <HelpCircle className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Become an Ambassador</h3>
              <p className="text-muted-foreground mb-4">
                Represent Townzy in your community and help grow our platform.
              </p>
              <Button asChild variant="outline" className="mt-auto">
                <Link href="/ambassador">Apply Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-24 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join the conversation</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Connect with other Townzy users, share your experiences, and be part of our growing community.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary text-white px-8">
            <Link href="/signup">Join Townzy</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
