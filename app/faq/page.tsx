import { PageHeader } from "@/components/page-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FAQPage() {
  const generalFaqs = [
    {
      question: "What is Townzy?",
      answer:
        "Townzy is a social media-style platform where users can discover, follow, and interact with local events and event organizers in their town or city. It's designed to help you find exciting events in your area and connect with the people who organize them.",
    },
    {
      question: "Is Townzy free to use?",
      answer:
        "Yes, Townzy is free for event attendees. You can create an account, browse events, follow organizers, and interact with content without any cost. Event organizers may need to subscribe to premium plans to access all features.",
    },
    {
      question: "How do I create an account?",
      answer:
        "You can sign up using your email address or through your Google account. Just click the 'Sign Up' button in the top right corner of the page and follow the instructions.",
    },
    {
      question: "Can I use Townzy on my mobile device?",
      answer:
        "Yes, Townzy is fully responsive and works on all devices including smartphones and tablets. We're also working on dedicated mobile apps that will be available soon.",
    },
    {
      question: "How do I find events near me?",
      answer:
        "You can use the search function or browse the 'Discover' and 'Events' pages. You can filter events by location, date, category, and more to find exactly what you're looking for.",
    },
  ]

  const attendeeFaqs = [
    {
      question: "How do I RSVP to an event?",
      answer:
        "On any event page, you'll find 'Interested' and 'Going' buttons. Click the appropriate button to indicate your attendance plans. You'll receive updates about the event if you're marked as going or interested.",
    },
    {
      question: "Can I save events for later?",
      answer:
        "Yes, you can bookmark any event by clicking the bookmark icon on the event card or page. You can view all your saved events in the 'Saved' section of your profile.",
    },
    {
      question: "How do I follow an organizer?",
      answer:
        "Visit the organizer's profile page and click the 'Follow' button. You'll then receive updates about their events and posts in your feed.",
    },
    {
      question: "Can I invite friends to events?",
      answer:
        "Yes, on any event page you'll find a 'Share' button that allows you to share the event via social media, email, or direct message to other Townzy users.",
    },
    {
      question: "How do I get a refund for a paid event?",
      answer:
        "Refund policies are set by individual event organizers. Check the event details for the specific refund policy, or contact the organizer directly through the platform.",
    },
  ]

  const organizerFaqs = [
    {
      question: "How do I become an event organizer?",
      answer:
        "You can apply to become an organizer from your account settings. Our team will review your application, and once approved, you'll be able to create and publish events.",
    },
    {
      question: "What are the fees for organizers?",
      answer:
        "We offer different subscription plans for organizers based on your needs. You can view our pricing page for detailed information about features and costs.",
    },
    {
      question: "How do I create and publish an event?",
      answer:
        "Once you're approved as an organizer, you'll have access to the event creation tools. Click on the '+' button in the navigation bar and follow the steps to create your event.",
    },
    {
      question: "Can I sell tickets through Townzy?",
      answer:
        "Yes, you can sell tickets directly through our platform. We offer tools for ticket creation, sales management, and attendee check-in.",
    },
    {
      question: "How do I get my organizer profile verified?",
      answer:
        "Verification is available to organizers who have completed their profile information and have hosted at least one successful event. You can request verification from your organizer settings.",
    },
  ]

  return (
    <div className="container px-4 py-6 md:py-8 max-w-7xl">
      <PageHeader
        title="Frequently Asked Questions"
        description="Find answers to common questions about using Townzy"
      />

      <div className="mt-12 max-w-4xl mx-auto">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-8">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="attendees">For Attendees</TabsTrigger>
            <TabsTrigger value="organizers">For Organizers</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-0">
            <Accordion type="single" collapsible className="w-full">
              {generalFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="attendees" className="mt-0">
            <Accordion type="single" collapsible className="w-full">
              {attendeeFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="organizers" className="mt-0">
            <Accordion type="single" collapsible className="w-full">
              {organizerFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-24 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Couldn't find an answer?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our support team is here to help. Contact us with any questions you may have.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary text-white px-8">
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8">
              <Link href="/community">Join Community</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
