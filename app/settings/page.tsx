"use client"

import { useAuth } from "@/context/auth-context"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { redirect } from "next/navigation"
import { AlertCircle, Camera, Check, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SettingsPage() {
  const { user, isOrganizer } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Redirect to login if not authenticated
  if (!user) {
    redirect("/login")
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="container px-4 py-6 md:py-8 max-w-7xl">
      <PageHeader title="Settings" description="Manage your account settings and preferences" />

      <div className="mt-8">
        <Tabs defaultValue="profile" className="w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64 flex-shrink-0">
              <div className="space-y-1 sticky top-20">
                <TabsList className="flex flex-col h-auto p-0 bg-transparent">
                  <TabsTrigger value="profile" className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted">
                    Profile Information
                  </TabsTrigger>
                  <TabsTrigger value="account" className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted">
                    Account Settings
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted"
                  >
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="privacy" className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted">
                    Privacy & Security
                  </TabsTrigger>
                  {isOrganizer && (
                    <TabsTrigger
                      value="organizer"
                      className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted"
                    >
                      Organizer Settings
                    </TabsTrigger>
                  )}
                </TabsList>
              </div>
            </div>

            <div className="flex-1">
              {saveSuccess && (
                <Alert className="mb-6 bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-50">
                  <Check className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>Your settings have been saved successfully.</AlertDescription>
                </Alert>
              )}

              <TabsContent value="profile" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your profile information visible to other users</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage
                            src={user.photoURL || "/placeholder-user.jpg"}
                            alt={user.displayName || "User"}
                          />
                          <AvatarFallback>{user.displayName?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                        <Button
                          size="icon"
                          variant="outline"
                          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                        >
                          <Camera className="h-4 w-4" />
                          <span className="sr-only">Change profile picture</span>
                        </Button>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="displayName">Display Name</Label>
                            <Input id="displayName" defaultValue={user.displayName || ""} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" defaultValue={user.username || ""} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea id="bio" rows={4} defaultValue={user.bio || ""} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input id="location" defaultValue={user.location || ""} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="account" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account details and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={user.email || ""} />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Password</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input id="currentPassword" type="password" />
                        </div>
                        <div></div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input id="confirmPassword" type="password" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Danger Zone</h3>
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Deactivate Account</AlertTitle>
                        <AlertDescription>
                          Deactivating your account will hide your profile and content from other users. You can
                          reactivate your account at any time by logging back in.
                        </AlertDescription>
                      </Alert>
                      <Button variant="destructive">Deactivate Account</Button>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Control how and when you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Email Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-events">Event Updates</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive updates about events you're attending
                            </p>
                          </div>
                          <Switch id="email-events" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-organizers">Organizer Updates</Label>
                            <p className="text-sm text-muted-foreground">Receive updates from organizers you follow</p>
                          </div>
                          <Switch id="email-organizers" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-marketing">Marketing</Label>
                            <p className="text-sm text-muted-foreground">Receive promotional emails and newsletters</p>
                          </div>
                          <Switch id="email-marketing" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Push Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="push-events">Event Reminders</Label>
                            <p className="text-sm text-muted-foreground">Receive reminders about upcoming events</p>
                          </div>
                          <Switch id="push-events" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="push-messages">Messages</Label>
                            <p className="text-sm text-muted-foreground">Receive notifications for new messages</p>
                          </div>
                          <Switch id="push-messages" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="push-follows">New Followers</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications when someone follows you
                            </p>
                          </div>
                          <Switch id="push-follows" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy & Security</CardTitle>
                    <CardDescription>Manage your privacy settings and account security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Privacy Settings</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="privacy-profile">Public Profile</Label>
                            <p className="text-sm text-muted-foreground">Allow others to view your profile</p>
                          </div>
                          <Switch id="privacy-profile" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="privacy-events">Show Events</Label>
                            <p className="text-sm text-muted-foreground">
                              Show events you're attending on your profile
                            </p>
                          </div>
                          <Switch id="privacy-events" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="privacy-location">Show Location</Label>
                            <p className="text-sm text-muted-foreground">Show your location on your profile</p>
                          </div>
                          <Switch id="privacy-location" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Security</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="security-2fa">Two-Factor Authentication</Label>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Switch id="security-2fa" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="security-sessions">Active Sessions</Label>
                            <p className="text-sm text-muted-foreground">
                              Manage devices where you're currently logged in
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Data & Privacy</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Download Your Data</Label>
                            <p className="text-sm text-muted-foreground">Get a copy of your personal data</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Request Data
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Delete Your Data</Label>
                            <p className="text-sm text-muted-foreground">Permanently delete your account and data</p>
                          </div>
                          <Button variant="destructive" size="sm">
                            Delete Data
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {isOrganizer && (
                <TabsContent value="organizer" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Organizer Settings</CardTitle>
                      <CardDescription>Manage your organizer profile and event settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="organizerName">Organization Name</Label>
                        <Input id="organizerName" defaultValue="Downtown Events Co." />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="organizerBio">Organization Bio</Label>
                        <Textarea
                          id="organizerBio"
                          rows={4}
                          defaultValue="We organize the best events in the downtown area. From music festivals to art exhibitions, we've got you covered."
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="organizerWebsite">Website</Label>
                        <Input id="organizerWebsite" defaultValue="https://downtownevents.com" />
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Event Settings</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="event-comments">Allow Comments</Label>
                              <p className="text-sm text-muted-foreground">Allow users to comment on your events</p>
                            </div>
                            <Switch id="event-comments" defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="event-public">Public Events</Label>
                              <p className="text-sm text-muted-foreground">
                                Make your events visible to everyone by default
                              </p>
                            </div>
                            <Switch id="event-public" defaultChecked />
                          </div>
                        </div>
                      </div>

                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Organizer Dashboard</AlertTitle>
                        <AlertDescription>
                          For more detailed event management, analytics, and attendee information, visit your
                          <Button variant="link" className="h-auto p-0 ml-1">
                            Organizer Dashboard
                          </Button>
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              )}
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
