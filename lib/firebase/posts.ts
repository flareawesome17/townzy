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
import type { Post } from "@/types/post"

// Get all posts with pagination
export const getPosts = async (lastVisible: QueryDocumentSnapshot | null = null, limitCount = 10) => {
  try {
    let postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(limitCount))

    if (lastVisible) {
      postsQuery = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(limitCount),
      )
    }

    const postsSnapshot = await getDocs(postsQuery)
    const lastVisibleDoc = postsSnapshot.docs[postsSnapshot.docs.length - 1]
    const posts = postsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[]

    return { posts, lastVisible: lastVisibleDoc }
  } catch (error) {
    console.error("Error getting posts:", error)
    throw error
  }
}

// Get post by ID
export const getPostById = async (id: string) => {
  try {
    const postDoc = await getDoc(doc(db, "posts", id))
    if (postDoc.exists()) {
      return { id: postDoc.id, ...postDoc.data() } as Post
    }
    return null
  } catch (error) {
    console.error("Error getting post:", error)
    throw error
  }
}

// Get posts by author ID
export const getPostsByAuthor = async (authorId: string) => {
  try {
    const postsQuery = query(collection(db, "posts"), where("author.id", "==", authorId), orderBy("createdAt", "desc"))

    const postsSnapshot = await getDocs(postsQuery)
    const posts = postsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[]

    return posts
  } catch (error) {
    console.error("Error getting posts by author:", error)
    throw error
  }
}

// Create a new post
export const createPost = async (postData: Omit<Post, "id">, imageFile?: File) => {
  try {
    let imageUrl = postData.image

    // Upload image if provided
    if (imageFile) {
      const storageRef = ref(storage, `posts/${Date.now()}_${imageFile.name}`)
      await uploadBytes(storageRef, imageFile)
      imageUrl = await getDownloadURL(storageRef)
    }

    const postWithTimestamp = {
      ...postData,
      image: imageUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, "posts"), postWithTimestamp)
    return { id: docRef.id, ...postWithTimestamp }
  } catch (error) {
    console.error("Error creating post:", error)
    throw error
  }
}

// Update a post
export const updatePost = async (id: string, postData: Partial<Post>, imageFile?: File) => {
  try {
    let imageUrl = postData.image

    // Upload image if provided
    if (imageFile) {
      const storageRef = ref(storage, `posts/${Date.now()}_${imageFile.name}`)
      await uploadBytes(storageRef, imageFile)
      imageUrl = await getDownloadURL(storageRef)
    }

    const postWithTimestamp = {
      ...postData,
      ...(imageFile ? { image: imageUrl } : {}),
      updatedAt: serverTimestamp(),
    }

    await updateDoc(doc(db, "posts", id), postWithTimestamp)
    return { id, ...postWithTimestamp }
  } catch (error) {
    console.error("Error updating post:", error)
    throw error
  }
}

// Delete a post
export const deletePost = async (id: string) => {
  try {
    await deleteDoc(doc(db, "posts", id))
    return id
  } catch (error) {
    console.error("Error deleting post:", error)
    throw error
  }
}

// Search posts
export const searchPosts = async (searchTerm: string) => {
  try {
    // Note: Firestore doesn't support full-text search natively
    // This is a simple implementation that searches by content
    // For production, consider using Algolia or similar
    const postsQuery = query(
      collection(db, "posts"),
      where("content", ">=", searchTerm),
      where("content", "<=", searchTerm + "\uf8ff"),
    )

    const postsSnapshot = await getDocs(postsQuery)
    const posts = postsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[]

    return posts
  } catch (error) {
    console.error("Error searching posts:", error)
    throw error
  }
}
