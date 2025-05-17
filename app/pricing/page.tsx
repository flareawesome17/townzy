import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      description: "For event attendees and casual users",
      price: {
        monthly: "$0",
        yearly: "$0",
      },
      features: [
        "Browse and discover events",
        "Create a user profile",
        "Follow organizers",
        "Save events",
        "Receive notifications",
        "Basic search filters",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Organizer",
      description: "For event creators and organizers",
      price: {
        monthly: "$19",
        yearly: "$190",
      },
      features: [
        "All Free features",
        "Create and publish events",
        "Organizer profile with verification",
        "Basic analytics",
        "Direct messaging",
        "Ticket management",
        "Custom event pages",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Pro",
      description: "For professional event organizers",
      price: {
        monthly: "$49",
        yearly: "$490",
      },
      features: [
        "All Organizer features",
        "Advanced analytics",
        "Priority support",
        "Featured events",
        "Custom branding",
        "API access",
        "Multiple team members",
        "Promotional tools",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <div className="container px-4 py-6 md:py-8 max-w-7xl">
      <PageHeader title="Pricing" description="Simple, transparent pricing for everyone" />

      <div className="mt-12">
        <Tabs defaultValue="monthly" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly (Save 20%)</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="monthly" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`overflow-hidden ${plan.popular ? "border-primary shadow-lg ring-2 ring-primary" : ""}`}
                >
                  {plan.popular && (
                    <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="pb-0">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{plan.price.monthly}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      className={`w-full ${plan.popular ? "bg-gradient-to-r from-primary to-secondary text-white" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      <Link href={plan.name === "Pro" ? "/contact" : "/signup"}>{plan.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="yearly" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`overflow-hidden ${plan.popular ? "border-primary shadow-lg ring-2 ring-primary" : ""}`}
                >
                  {plan.popular && (
                    <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="pb-0">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{plan.price.yearly}</span>
                      <span className="text-muted-foreground">/year</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      className={`w-full ${plan.popular ? "bg-gradient-to-r from-primary to-secondary text-white" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      <Link href={plan.name === "Pro" ? "/contact" : "/signup"}>{plan.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-bold mb-2">Can I use Townzy for free?</h3>
            <p className="text-muted-foreground">
              Yes! Townzy offers a free plan for event attendees and casual users. You can browse events, create a
              profile, and follow organizers without any cost.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">How do I become an organizer?</h3>
            <p className="text-muted-foreground">
              You can apply to become an organizer from your account settings. Once approved, you'll need to subscribe
              to our Organizer plan to publish events.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Can I cancel my subscription?</h3>
            <p className="text-muted-foreground">
              Yes, you can cancel your subscription at any time. Your benefits will continue until the end of your
              billing period.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Is there a limit to how many events I can create?</h3>
            <p className="text-muted-foreground">
              The Organizer plan allows for up to 10 active events at once. The Pro plan offers unlimited active events.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Do you offer discounts for non-profits?</h3>
            <p className="text-muted-foreground">
              Yes, we offer special pricing for non-profit organizations. Please contact our sales team for more
              information.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">How does the verification process work?</h3>
            <p className="text-muted-foreground">
              Organizer verification involves submitting documentation to prove your identity and legitimacy. This helps
              build trust with potential attendees.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-24 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Still have questions?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our team is here to help. Contact us for more information about our plans and features.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary text-white px-8">
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
