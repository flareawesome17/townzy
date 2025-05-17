"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Calendar, CheckCircle, Flag, Users, XCircle } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the Townzy admin dashboard.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">324</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+4% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports</CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">-2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Overview of recent platform activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-md border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">New user registered</p>
                    <p className="text-xs text-muted-foreground">John Doe (john@example.com)</p>
                  </div>
                  <div className="text-xs text-muted-foreground">2 hours ago</div>
                </div>
                <div className="flex items-center gap-4 rounded-md border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">New event created</p>
                    <p className="text-xs text-muted-foreground">Summer Music Festival</p>
                  </div>
                  <div className="text-xs text-muted-foreground">5 hours ago</div>
                </div>
                <div className="flex items-center gap-4 rounded-md border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                    <Flag className="h-5 w-5 text-destructive" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Event reported</p>
                    <p className="text-xs text-muted-foreground">Tech Conference 2023</p>
                  </div>
                  <div className="text-xs text-muted-foreground">1 day ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>Monthly user registration statistics</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <BarChart className="h-16 w-16 text-muted-foreground" />
              <p className="ml-4 text-muted-foreground">Analytics charts will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Reports submitted by users in the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-md border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                    <XCircle className="h-5 w-5 text-destructive" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Inappropriate content</p>
                    <p className="text-xs text-muted-foreground">Event: Tech Conference 2023</p>
                  </div>
                  <div className="text-xs text-muted-foreground">1 day ago</div>
                </div>
                <div className="flex items-center gap-4 rounded-md border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                    <XCircle className="h-5 w-5 text-destructive" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Scam event</p>
                    <p className="text-xs text-muted-foreground">Event: Free iPhone Giveaway</p>
                  </div>
                  <div className="text-xs text-muted-foreground">3 days ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
