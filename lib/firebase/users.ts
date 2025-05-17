import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "./firebase"
import type { Organizer } from "@/types/organizer"

// Get user data
export const getUserData = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid))
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() }
    }
    return null
  } catch (error) {
    console.error("Error getting user data:", error)
    throw error
  }
}

// Update user profile
export const updateUserProfile = async (uid: string, userData: any, photoFile?: File) => {
  try {
    let photoURL = userData.photoURL

    // Upload photo if provided
    if (photoFile) {
      const storageRef = ref(storage, `users/${uid}/${Date.now()}_${photoFile.name}`)
      await uploadBytes(storageRef, photoFile)
      photoURL = await getDownloadURL(storageRef)
    }

    const userWithTimestamp = {
      ...userData,
      ...(photoFile ? { photoURL } : {}),
      updatedAt: serverTimestamp(),
    }

    await updateDoc(doc(db, "users", uid), userWithTimestamp)
    return { id: uid, ...userWithTimestamp }
  } catch (error) {
    console.error("Error updating user profile:", error)
    throw error
  }
}

// Apply to become an organizer
export const applyForOrganizerRole = async (uid: string, applicationData: any) => {
  try {
    // Create application document
    await updateDoc(doc(db, "users", uid), {
      organizerApplication: {
        ...applicationData,
        status: "pending",
        appliedAt: serverTimestamp(),
      },
      updatedAt: serverTimestamp(),
    })

    return true
  } catch (error) {
    console.error("Error applying for organizer role:", error)
    throw error
  }
}

// Get all organizers
export const getOrganizers = async (limitCount = 10) => {
  try {
    const organizersQuery = query(
      collection(db, "users"),
      where("role", "==", "organizer"),
      orderBy("createdAt", "desc"),
      limit(limitCount),
    )

    const organizersSnapshot = await getDocs(organizersQuery)
    const organizers = organizersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Organizer[]

    return organizers
  } catch (error) {
    console.error("Error getting organizers:", error)
    throw error
  }
}

// Get organizer by ID
export const getOrganizerById = async (id: string) => {
  try {
    const organizerDoc = await getDoc(doc(db, "users", id))
    if (organizerDoc.exists() && organizerDoc.data().role === "organizer") {
      return { id: organizerDoc.id, ...organizerDoc.data() } as Organizer
    }
    return null
  } catch (error) {
    console.error("Error getting organizer:", error)
    throw error
  }
}

// Search organizers
export const searchOrganizers = async (searchTerm: string) => {
  try {
    // Note: Firestore doesn't support full-text search natively
    // This is a simple implementation that searches by name
    // For production, consider using Algolia or similar
    const organizersQuery = query(
      collection(db, "users"),
      where("role", "==", "organizer"),
      where("displayName", ">=", searchTerm),
      where("displayName", "<=", searchTerm + "\uf8ff"),
    )

    const organizersSnapshot = await getDocs(organizersQuery)
    const organizers = organizersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Organizer[]

    return organizers
  } catch (error) {
    console.error("Error searching organizers:", error)
    throw error
  }
}
