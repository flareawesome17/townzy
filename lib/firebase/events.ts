import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  type QueryDocumentSnapshot,
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "./firebase"
import type { Event } from "@/types/event"

// Get all events with pagination
export const getEvents = async (lastVisible: QueryDocumentSnapshot | null = null, limitCount = 10) => {
  try {
    let eventsQuery = query(collection(db, "events"), orderBy("createdAt", "desc"), limit(limitCount))

    if (lastVisible) {
      eventsQuery = query(
        collection(db, "events"),
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(limitCount),
      )
    }

    const eventsSnapshot = await getDocs(eventsQuery)
    const lastVisibleDoc = eventsSnapshot.docs[eventsSnapshot.docs.length - 1]
    const events = eventsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Event[]

    return { events, lastVisible: lastVisibleDoc }
  } catch (error) {
    console.error("Error getting events:", error)
    throw error
  }
}

// Get event by ID
export const getEventById = async (id: string) => {
  try {
    const eventDoc = await getDoc(doc(db, "events", id))
    if (eventDoc.exists()) {
      return { id: eventDoc.id, ...eventDoc.data() } as Event
    }
    return null
  } catch (error) {
    console.error("Error getting event:", error)
    throw error
  }
}

// Get events by organizer ID
export const getEventsByOrganizer = async (organizerId: string) => {
  try {
    const eventsQuery = query(
      collection(db, "events"),
      where("organizerId", "==", organizerId),
      orderBy("date", "desc"),
    )

    const eventsSnapshot = await getDocs(eventsQuery)
    const events = eventsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Event[]

    return events
  } catch (error) {
    console.error("Error getting events by organizer:", error)
    throw error
  }
}

// Create a new event
export const createEvent = async (eventData: Omit<Event, "id">, imageFile?: File) => {
  try {
    let imageUrl = eventData.image

    // Upload image if provided
    if (imageFile) {
      const storageRef = ref(storage, `events/${Date.now()}_${imageFile.name}`)
      await uploadBytes(storageRef, imageFile)
      imageUrl = await getDownloadURL(storageRef)
    }

    const eventWithTimestamp = {
      ...eventData,
      image: imageUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, "events"), eventWithTimestamp)
    return { id: docRef.id, ...eventWithTimestamp }
  } catch (error) {
    console.error("Error creating event:", error)
    throw error
  }
}

// Update an event
export const updateEvent = async (id: string, eventData: Partial<Event>, imageFile?: File) => {
  try {
    let imageUrl = eventData.image

    // Upload image if provided
    if (imageFile) {
      const storageRef = ref(storage, `events/${Date.now()}_${imageFile.name}`)
      await uploadBytes(storageRef, imageFile)
      imageUrl = await getDownloadURL(storageRef)
    }

    const eventWithTimestamp = {
      ...eventData,
      ...(imageFile ? { image: imageUrl } : {}),
      updatedAt: serverTimestamp(),
    }

    await updateDoc(doc(db, "events", id), eventWithTimestamp)
    return { id, ...eventWithTimestamp }
  } catch (error) {
    console.error("Error updating event:", error)
    throw error
  }
}

// Delete an event
export const deleteEvent = async (id: string) => {
  try {
    await deleteDoc(doc(db, "events", id))
    return id
  } catch (error) {
    console.error("Error deleting event:", error)
    throw error
  }
}

// Search events
export const searchEvents = async (searchTerm: string) => {
  try {
    // Note: Firestore doesn't support full-text search natively
    // This is a simple implementation that searches by title
    // For production, consider using Algolia or similar
    const eventsQuery = query(
      collection(db, "events"),
      where("title", ">=", searchTerm),
      where("title", "<=", searchTerm + "\uf8ff"),
    )

    const eventsSnapshot = await getDocs(eventsQuery)
    const events = eventsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Event[]

    return events
  } catch (error) {
    console.error("Error searching events:", error)
    throw error
  }
}
