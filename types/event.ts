export interface Event {
  id: string
  title: string
  description: string
  date: string
  time?: string
  location: string
  image?: string
  category?: string
  tags?: string[]
  attendees?: number
  month?: string
  day?: string
  featured?: boolean
  ticketPrice?: number
  ticketAvailability?: string
  organizer: {
    id: string
    name: string
    avatar?: string
  }
  organizerId?: string
  goingCount?: number
  interestedCount?: number
  banner?: string
  images?: string[]
  comments?: {
    id: string
    userId: string
    text: string
  }[]
}
