"use client"

import { useAuth } from "@/context/auth-context"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Heart, MapPin, Ticket, User } from "lucide-react"
import Link from "next/link"
import { EventCard } from "@/components/event/event-card"
import { OrganizerCard } from "@/components/organizer/organizer-card"
import { DUMMY_EVENTS, DUMMY_ORGANIZERS } from "@/lib/dummy-data"
import { redirect } from "next/navigation"

export default function ProfilePage() {
  const { user, isOrganizer } = useAuth()

  // Redirect to login if not authenticated
  if (!user) {
    redirect("/login")
  }

  return (
    <div className="container px-4 py-6 md:py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <PageHeader title="My Profile" description="View and manage your profile information" />
        <Button asChild variant="outline" className="gap-2">
          <Link href="/settings">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.photoURL || "/placeholder-user.jpg"} alt={user.displayName || "User"} />
                  <AvatarFallback>{user.displayName?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{user.displayName}</h2>
                <p className="text-muted-foreground">@{user.username}</p>

                {isOrganizer && <Badge className="mt-2 bg-primary/10 text-primary">Organizer</Badge>}

                <div className="flex justify-between w-full mt-6">
                  <div className="text-center">
                    <p className="text-xl font-bold">12</p>
                    <p className="text-xs text-muted-foreground">Events</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold">48</p>
                    <p className="text-xs text-muted-foreground">Following</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold">156</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {user.bio && <p className="text-center">{user.bio}</p>}

                {user.location && (
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                )}

                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(user.createdAt || Date.now()).toLocaleDateString()}</span>
                </div>
              </div>

              {isOrganizer ? (
                <Button className="w-full mt-6 gradient-btn" asChild>
                  <Link href="/organizer-dashboard">Go to Organizer Dashboard</Link>
                </Button>
              ) : (
                <Button className="w-full mt-6" variant="outline" asChild>
                  <Link href="/apply-organizer">Apply to Become an Organizer</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="saved" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="saved">Saved</TabsTrigger>
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="saved" className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Saved Events</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DUMMY_EVENTS.slice(0, 2).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              {DUMMY_EVENTS.length > 0 && (
                <div className="mt-4 text-center">
                  <Button asChild variant="outline">
                    <Link href="/saved">View All Saved Events</Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="tickets" className="mt-6">
              <h3 className="text-lg font-semibold mb-4">My Tickets</h3>
              <div className="space-y-4">
                {DUMMY_EVENTS.slice(0, 2).map((event) => (
                  <Card key={event.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                          <Ticket className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                          <p className="text-sm text-muted-foreground">{event.location}</p>
                        </div>
                        <Button size="sm" asChild>
                          <Link href={`/tickets`}>View</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {DUMMY_EVENTS.length > 0 && (
                <div className="mt-4 text-center">
                  <Button asChild variant="outline">
                    <Link href="/tickets">View All Tickets</Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="following" className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Following</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DUMMY_ORGANIZERS.slice(0, 2).map((organizer) => (
                  <OrganizerCard key={organizer.id} organizer={organizer} />
                ))}
              </div>

              {DUMMY_ORGANIZERS.length > 0 && (
                <div className="mt-4 text-center">
                  <Button asChild variant="outline">
                    <Link href="/saved">View All Following</Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Heart className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm">
                          You saved <span className="font-medium">Downtown Music Festival</span>
                        </p>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm">
                          You followed <span className="font-medium">Downtown Events Co.</span>
                        </p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                        <Ticket className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm">
                          You got a ticket for <span className="font-medium">Art Exhibition</span>
                        </p>
                        <p className="text-xs text-muted-foreground">1 week ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
