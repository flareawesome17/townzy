"use client"

import type React from "react"

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/context/auth-context"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, Info } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ApplyOrganizerPage() {
  const { user, applyForOrganizerRole, isOrganizerApplied, isOrganizer } = useAuth()
  const [formData, setFormData] = useState({
    organizationName: "",
    website: "",
    eventTypes: "",
    experience: "",
    reason: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, eventTypes: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await applyForOrganizerRole()
      // In a real app, you would also submit the form data to your backend
      router.push("/apply-organizer/success")
    } catch (error) {
      console.error("Error applying for organizer role:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // If user is already an organizer
  if (isOrganizer) {
    return (
      <div className="container px-4 py-6 md:py-8 max-w-7xl">
        <PageHeader title="Organizer Status" description="Your organizer account information" />

        <div className="max-w-md mx-auto mt-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                <CardTitle>You're an Organizer!</CardTitle>
              </div>
              <CardDescription>You already have organizer privileges on Townzy.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                You can create and manage events, build your organizer profile, and connect with attendees.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button asChild variant="outline">
                <Link href="/profile">View Profile</Link>
              </Button>
              <Button asChild>
                <Link href="/create-event">Create Event</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  // If user has already applied
  if (isOrganizerApplied) {
    return (
      <div className="container px-4 py-6 md:py-8 max-w-7xl">
        <PageHeader title="Application Status" description="Your organizer application status" />

        <div className="max-w-md mx-auto mt-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Info className="h-6 w-6 text-amber-500" />
                <CardTitle>Application Under Review</CardTitle>
              </div>
              <CardDescription>Your application to become an organizer is being reviewed.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We're currently reviewing your application. This process typically takes 1-3 business days. We'll notify
                you once a decision has been made.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/">Return to Home</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  // If user is not logged in
  if (!user) {
    return (
      <div className="container px-4 py-6 md:py-8 max-w-7xl">
        <PageHeader title="Become an Organizer" description="Apply to create and manage events on Townzy" />

        <div className="max-w-md mx-auto mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Sign in Required</CardTitle>
              <CardDescription>You need to be signed in to apply as an organizer.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Please sign in or create an account to continue with your application.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button asChild variant="outline">
                <Link href="/signup">Sign Up</Link>
              </Button>
              <Button asChild>
                <Link href="/login">Log In</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  // Application form for logged in users
  return (
    <div className="container px-4 py-6 md:py-8 max-w-7xl">
      <PageHeader title="Become an Organizer" description="Apply to create and manage events on Townzy" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Organizer Application</CardTitle>
              <CardDescription>Tell us about yourself and why you want to become an organizer.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization or Business Name</Label>
                  <Input
                    id="organizationName"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="https://"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventTypes">What types of events do you plan to organize?</Label>
                  <Select onValueChange={handleSelectChange} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="music">Music & Concerts</SelectItem>
                      <SelectItem value="arts">Arts & Culture</SelectItem>
                      <SelectItem value="food">Food & Drink</SelectItem>
                      <SelectItem value="sports">Sports & Fitness</SelectItem>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="community">Community</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Tell us about your experience organizing events</Label>
                  <Textarea
                    id="experience"
                    name="experience"
                    rows={4}
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Why do you want to become an organizer on Townzy?</Label>
                  <Textarea
                    id="reason"
                    name="reason"
                    rows={4}
                    value={formData.reason}
                    onChange={handleChange}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Benefits of Being an Organizer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-sm">Create and publish events on Townzy</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-sm">Build a following and grow your audience</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-sm">Access to powerful event management tools</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-sm">Insightful analytics and attendee data</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-sm">Opportunity to earn verified status</p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Application Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                After submitting your application, our team will review it within 1-3 business days. We'll notify you
                via email once a decision has been made.
              </p>
              <p className="text-sm text-muted-foreground">
                If approved, you'll gain access to organizer features and will be able to create your first event right
                away.
              </p>
              <p className="text-sm text-muted-foreground">
                Note that organizer accounts are subject to our{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/community-guidelines" className="text-primary hover:underline">
                  Community Guidelines
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
