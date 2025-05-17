"use client"

import { useAuth } from "@/context/auth-context"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Edit,
  Eye,
  PlusCircle,
  Settings,
  Ticket,
  Users,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import { DUMMY_EVENTS } from "@/lib/dummy-data"
import { redirect } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function OrganizerDashboardPage() {
  const { user, isOrganizer } = useAuth()

  // Redirect to login if not authenticated
  if (!user) {
    redirect("/login")
  }

  // Redirect to home if not an organizer
  if (!isOrganizer) {
    redirect("/")
  }

  return (
    <div className="container px-4 py-6 md:py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <PageHeader title="Organizer Dashboard" description="Manage your events and view analytics" />
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/settings">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </Button>
          <Button asChild className="gap-2 bg-gradient-to-r from-primary to-secondary text-white">
            <Link href="/create-event">
              <PlusCircle className="h-4 w-4" />
              Create Event
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-500">↑ 2</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Attendees</p>
                <h3 className="text-2xl font-bold">1,248</h3>
              </div>
              <div className="p-2 bg-secondary/10 rounded-full">
                <Users className="h-5 w-5 text-secondary" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-500">↑ 18%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ticket Sales</p>
                <h3 className="text-2xl font-bold">$4,320</h3>
              </div>
              <div className="p-2 bg-accent/10 rounded-full">
                <Ticket className="h-5 w-5 text-accent" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-500">↑ 24%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Followers</p>
                <h3 className="text-2xl font-bold">156</h3>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                <Users className="h-5 w-5 text-green-600 dark:text-green-300" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-500">↑ 12</span> new followers
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-0 space-y-6">
              {DUMMY_EVENTS.slice(0, 3).map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                        <Calendar className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{event.title}</h4>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            Published
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{event.attendees || 0} attendees</span>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Ticket Sales</span>
                            <span className="font-medium">75%</span>
                          </div>
                          <Progress value={75} className="h-2" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline" className="gap-1" asChild>
                          <Link href={`/event/${event.id}`}>
                            <Eye className="h-4 w-4" />
                            <span>View</span>
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1" asChild>
                          <Link href={`/edit-event/${event.id}`}>
                            <Edit className="h-4 w-4" />
                            <span>Edit</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="text-center">
                <Button asChild variant="outline">
                  <Link href="/organizer-dashboard/events">View All Events</Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="past" className="mt-0 space-y-6">
              {DUMMY_EVENTS.slice(3, 4).map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                        <Calendar className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{event.title}</h4>
                          <Badge variant="outline">Completed</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{event.attendees || 0} attendees</span>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Ticket Sales</span>
                            <span className="font-medium">100%</span>
                          </div>
                          <Progress value={100} className="h-2" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline" className="gap-1" asChild>
                          <Link href={`/event/${event.id}`}>
                            <Eye className="h-4 w-4" />
                            <span>View</span>
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1" asChild>
                          <Link href={`/organizer-dashboard/analytics/${event.id}`}>
                            <BarChart3 className="h-4 w-4" />
                            <span>Analytics</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="text-center">
                <Button asChild variant="outline">
                  <Link href="/organizer-dashboard/events">View All Events</Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="drafts" className="mt-0">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                      <Calendar className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Summer Music Festival</h4>
                        <Badge variant="outline">Draft</Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Last edited 2 days ago</span>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Completion</span>
                          <span className="font-medium">60%</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline" className="gap-1" asChild>
                        <Link href="/edit-event/draft-1">
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Eye className="h-4 w-4" />
                        <span>Preview</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center mt-6">
                <Button asChild variant="outline">
                  <Link href="/organizer-dashboard/drafts">View All Drafts</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and actions on your events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Music Festival</span> - 5 new ticket sales
                    </p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Art Exhibition</span> - 3 new attendees
                    </p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-amber-600 dark:text-amber-300" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Tech Meetup</span> - Event reminder sent to attendees
                    </p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-300" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">Fitness Workshop</span> - 1 ticket refund processed
                    </p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organizer Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src="/placeholder.svg?height=100&width=100" alt="Downtown Events Co." />
                  <AvatarFallback>DE</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">Downtown Events Co.</h3>
                <p className="text-muted-foreground text-sm">@downtownevents</p>
                <Badge className="mt-2 bg-primary/10 text-primary">Verified Organizer</Badge>

                <div className="flex justify-between w-full mt-6">
                  <div className="text-center">
                    <p className="text-xl font-bold">12</p>
                    <p className="text-xs text-muted-foreground">Events</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold">1,250</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold">4.8</p>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                </div>

                <Button className="w-full mt-6" variant="outline" asChild>
                  <Link href="/organizer/org1">View Public Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Attendees</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <span>John Doe</span>
                      </div>
                    </TableCell>
                    <TableCell>Music Festival</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Confirmed
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        <span>Jane Smith</span>
                      </div>
                    </TableCell>
                    <TableCell>Music Festival</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Confirmed
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>RJ</AvatarFallback>
                        </Avatar>
                        <span>Robert Johnson</span>
                      </div>
                    </TableCell>
                    <TableCell>Art Exhibition</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Pending
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>MP</AvatarFallback>
                        </Avatar>
                        <span>Maria Perez</span>
                      </div>
                    </TableCell>
                    <TableCell>Tech Meetup</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Confirmed
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="mt-4 text-center">
                <Button asChild variant="outline" size="sm">
                  <Link href="/organizer-dashboard/attendees">View All Attendees</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
                  <Link href="/create-event">
                    <PlusCircle className="h-5 w-5" />
                    <span>New Event</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
                  <Link href="/organizer-dashboard/analytics">
                    <BarChart3 className="h-5 w-5" />
                    <span>Analytics</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
                  <Link href="/organizer-dashboard/messages">
                    <Users className="h-5 w-5" />
                    <span>Messages</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
                  <Link href="/organizer-dashboard/settings">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
