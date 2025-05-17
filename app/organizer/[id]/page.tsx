"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Calendar, Globe, Instagram, Mail, MapPin, MessageSquare, Twitter, Users } from "lucide-react"
import { PostCard } from "@/components/post/post-card"
import { EventCard } from "@/components/event/event-card"
import { DUMMY_ORGANIZERS, DUMMY_EVENTS, DUMMY_POSTS } from "@/lib/dummy-data"

export default function OrganizerPage({ params }: { params: { id: string } }) {
  const [following, setFollowing] = useState(false)

  // Find the organizer by ID
  const organizer = DUMMY_ORGANIZERS.find((org) => org.id === params.id) || DUMMY_ORGANIZERS[0]

  // Filter events by this organizer
  const organizerEvents = DUMMY_EVENTS.filter((event) => event.organizer.id === params.id)

  // Filter posts by this organizer
  const organizerPosts = DUMMY_POSTS.filter((post) => post.author.id === params.id)

  return (
    <div className="container px-4 py-6 md:py-8 max-w-7xl">
      <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden mb-6">
        {organizer.banner ? (
          <Image
            src={organizer.banner || "/placeholder.svg"}
            alt={`${organizer.name} banner`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary/20 to-secondary/20"></div>
        )}
        <div className="absolute -bottom-16 left-6">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src={organizer.avatar || "/placeholder.svg"} alt={organizer.name} />
            <AvatarFallback>{organizer.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="mt-20 md:flex md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold">{organizer.name}</h1>
            {organizer.verified && (
              <Badge variant="secondary" className="bg-secondary/10">
                Verified
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">@{organizer.username}</p>

          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{organizer.followers} followers</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{organizer.eventCount} events</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Message
          </Button>
          <Button
            size="sm"
            className={following ? "" : "gradient-btn"}
            variant={following ? "outline" : "default"}
            onClick={() => setFollowing(!following)}
          >
            {following ? "Following" : "Follow"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="about">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="mt-6 space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">About</h2>
                    <p className="text-muted-foreground">{organizer.bio}</p>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold">Contact Information</h2>

                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <a href={`mailto:${organizer.email}`} className="text-sm hover:underline">
                        {organizer.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-primary" />
                      <a
                        href={organizer.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:underline"
                      >
                        {organizer.website?.replace(/^https?:\/\//, "")}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm">{organizer.location}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold">Social Media</h2>

                    <div className="flex items-center gap-4">
                      <a href="#" className="text-muted-foreground hover:text-primary">
                        <Twitter className="h-5 w-5" />
                        <span className="sr-only">Twitter</span>
                      </a>
                      <a href="#" className="text-muted-foreground hover:text-primary">
                        <Instagram className="h-5 w-5" />
                        <span className="sr-only">Instagram</span>
                      </a>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="events" className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Events</h2>
                    <Button size="sm" asChild>
                      <Link href="/events">View All</Link>
                    </Button>
                  </div>

                  {organizerEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {organizerEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <h3 className="text-lg font-medium">No events yet</h3>
                      <p className="text-muted-foreground mt-2">This organizer hasn't created any events yet</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="posts" className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Posts</h2>
                  </div>

                  {organizerPosts.length > 0 ? (
                    <div className="space-y-4">
                      {organizerPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <h3 className="text-lg font-medium">No posts yet</h3>
                      <p className="text-muted-foreground mt-2">This organizer hasn't posted anything yet</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Upcoming Events</h3>
              {organizerEvents.length > 0 ? (
                <div className="space-y-4">
                  {organizerEvents.slice(0, 3).map((event) => (
                    <Link key={event.id} href={`/event/${event.id}`}>
                      <div className="flex items-start gap-3 group">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium group-hover:text-primary transition-colors">{event.title}</h4>
                          <p className="text-xs text-muted-foreground">{event.date}</p>
                          <p className="text-xs text-muted-foreground">{event.location}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No upcoming events</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Similar Organizers</h3>
              <div className="space-y-4">
                {DUMMY_ORGANIZERS.filter((org) => org.id !== params.id)
                  .slice(0, 3)
                  .map((similarOrg) => (
                    <Link key={similarOrg.id} href={`/organizer/${similarOrg.id}`}>
                      <div className="flex items-center gap-3 group">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={similarOrg.avatar || "/placeholder.svg"} alt={similarOrg.name} />
                          <AvatarFallback>{similarOrg.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium group-hover:text-primary transition-colors">{similarOrg.name}</h4>
                          <p className="text-xs text-muted-foreground">{similarOrg.eventCount} events</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
