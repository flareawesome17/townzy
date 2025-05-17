"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PostCard } from "@/components/post/post-card"
import { EventCard } from "@/components/event/event-card"
import { OrganizerCard } from "@/components/organizer/organizer-card"
import { PostSkeleton } from "@/components/post/post-skeleton"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { collection, query, where, orderBy, limit, getDocs, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase/firebase"
import type { Post } from "@/types/post"
import type { Event } from "@/types/event"
import type { Organizer } from "@/types/organizer"

export function HomeFeed() {
  const [activeTab, setActiveTab] = useState("for-you")
  const [posts, setPosts] = useState<Post[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [organizers, setOrganizers] = useState<Organizer[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  // Fetch data when component mounts or tab changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch posts
        const postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(10))

        const postsSnapshot = await getDocs(postsQuery)
        const postsData = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[]
        setPosts(postsData)

        // Fetch events
        const now = Timestamp.now()
        const eventsQuery = query(collection(db, "events"), where("date", ">=", now), orderBy("date", "asc"), limit(4))

        const eventsSnapshot = await getDocs(eventsQuery)
        const eventsData = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Event[]
        setEvents(eventsData)

        // Fetch organizers
        const organizersQuery = query(collection(db, "users"), where("role", "==", "organizer"), limit(3))

        const organizersSnapshot = await getDocs(organizersQuery)
        const organizersData = organizersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Organizer[]
        setOrganizers(organizersData)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "Failed to load content. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [activeTab, toast])

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      <div className="sticky top-[64px] z-10 bg-background pt-2 pb-4">
        <h1 className="text-2xl font-bold">Feed</h1>
      </div>

      <Tabs defaultValue="for-you" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="for-you">For You</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>

        <TabsContent value="for-you" className="space-y-6 mt-2">
          {loading ? (
            <div className="space-y-6">
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No posts yet</h3>
              <p className="text-muted-foreground mt-2">Be the first to create a post</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post, index) => {
                // Add events and organizers after certain posts
                if (index === 1 && events.length > 0) {
                  return (
                    <div key={post.id} className="space-y-6">
                      <PostCard post={post} />

                      <div className="rounded-lg border bg-card shadow-sm p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-lg font-semibold">Upcoming Events</h2>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href="/events">View All</Link>
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {events.slice(0, 2).map((event) => (
                            <EventCard key={event.id} event={event} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                }

                if (index === 3 && organizers.length > 0) {
                  return (
                    <div key={post.id} className="space-y-6">
                      <PostCard post={post} />

                      <div className="rounded-lg border bg-card shadow-sm p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-lg font-semibold">Popular Organizers</h2>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href="/organizers">View All</Link>
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {organizers.map((organizer) => (
                            <OrganizerCard key={organizer.id} organizer={organizer} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                }

                return <PostCard key={post.id} post={post} />
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="following" className="space-y-6 mt-2">
          {!user ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">Sign in to see posts from people you follow</h3>
              <Button className="mt-4" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">Follow organizers to see their posts</h3>
              <p className="text-muted-foreground mt-2">When you follow organizers, their posts will appear here</p>
              <Button className="mt-4" asChild>
                <Link href="/organizers">Discover Organizers</Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
