import { collection, addDoc, Timestamp } from "firebase/firestore"
import { db } from "./firebase"

// Sample data for testing
const samplePosts = [
  {
    title: "Community Cleanup Day",
    content:
      "Join us for our monthly community cleanup day! Let's make our neighborhood beautiful together. #community #cleanup",
    authorId: "user1",
    author: {
      name: "Jane Smith",
      photoURL: "/placeholder.svg",
      role: "organizer",
    },
    likes: 24,
    comments: 5,
    createdAt: Timestamp.fromDate(new Date()),
  },
  {
    title: "New Art Exhibition",
    content:
      "Excited to announce our new art exhibition featuring local artists! Opening this Friday at the community center. #art #local",
    authorId: "user2",
    author: {
      name: "Mark Johnson",
      photoURL: "/placeholder.svg",
      role: "organizer",
    },
    likes: 42,
    comments: 8,
    createdAt: Timestamp.fromDate(new Date(Date.now() - 86400000)), // 1 day ago
  },
]

const sampleEvents = [
  {
    title: "Summer Festival",
    description: "Annual summer festival with music, food, and activities for the whole family.",
    date: Timestamp.fromDate(new Date(Date.now() + 7 * 86400000)), // 7 days from now
    location: "Central Park",
    organizerId: "user1",
    organizer: {
      name: "Jane Smith",
      photoURL: "/placeholder.svg",
    },
    attendees: 120,
    capacity: 200,
    category: "Festival",
    featured: true,
  },
  {
    title: "Coding Workshop",
    description: "Learn the basics of web development in this hands-on workshop.",
    date: Timestamp.fromDate(new Date(Date.now() + 3 * 86400000)), // 3 days from now
    location: "Tech Hub",
    organizerId: "user2",
    organizer: {
      name: "Mark Johnson",
      photoURL: "/placeholder.svg",
    },
    attendees: 45,
    capacity: 50,
    category: "Workshop",
  },
]

// Function to seed the database with sample data
export async function seedDatabase() {
  try {
    // Add sample posts
    for (const post of samplePosts) {
      await addDoc(collection(db, "posts"), post)
    }

    // Add sample events
    for (const event of sampleEvents) {
      await addDoc(collection(db, "events"), event)
    }

    console.log("Database seeded successfully!")
    return true
  } catch (error) {
    console.error("Error seeding database:", error)
    return false
  }
}
