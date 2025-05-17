import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  type User,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  applyActionCode,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateEmail,
  verifyPasswordResetCode as firebaseVerifyPasswordResetCode,
  confirmPasswordReset as firebaseConfirmPasswordReset,
} from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore"
import { auth, db } from "./firebase"

// Check if we're in a development or preview environment
const isDevelopmentEnvironment = () => {
  if (typeof window === "undefined") return false

  const hostname = window.location.hostname
  return (
    hostname === "localhost" ||
    hostname.includes("vercel.app") ||
    hostname.includes("v0.dev") ||
    hostname.includes("127.0.0.1")
  )
}

// Sign up with email and password
export const signUpWithEmail = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update profile with display name
    await updateProfile(user, {
      displayName: name,
    })

    // Send verification email
    await sendEmailVerification(user)

    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: name,
      photoURL: user.photoURL,
      role: "user",
      emailVerified: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    return user
  } catch (error) {
    console.error("Error signing up with email:", error)
    throw error
  }
}

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)

    // Update emailVerified status in Firestore if it has changed
    const user = userCredential.user
    if (user.emailVerified) {
      const userDoc = await getDoc(doc(db, "users", user.uid))
      if (userDoc.exists() && userDoc.data().emailVerified === false) {
        await updateDoc(doc(db, "users", user.uid), {
          emailVerified: true,
          updatedAt: serverTimestamp(),
        })
      }
    }

    return user
  } catch (error) {
    console.error("Error signing in with email:", error)
    throw error
  }
}

// Create a mock Google user
const createMockGoogleUser = async () => {
  console.log("Creating mock Google user")

  // Generate a random ID for the mock user
  const mockUid = "mock-google-" + Math.random().toString(36).substring(2, 15)

  // Create a mock user object that mimics a Firebase User
  const mockUser = {
    uid: mockUid,
    email: "mock-google-user@example.com",
    displayName: "Mock Google User",
    photoURL: "https://via.placeholder.com/150",
    emailVerified: true,
    // Add other required User properties
    isAnonymous: false,
    providerData: [
      {
        providerId: "google.com",
        uid: mockUid,
        displayName: "Mock Google User",
        email: "mock-google-user@example.com",
        phoneNumber: null,
        photoURL: "https://via.placeholder.com/150",
      },
    ],
    metadata: {
      creationTime: new Date().toISOString(),
      lastSignInTime: new Date().toISOString(),
    },
    // Add stub methods that would be on a real User object
    delete: () => Promise.resolve(),
    getIdToken: () => Promise.resolve("mock-id-token"),
    reload: () => Promise.resolve(),
    toJSON: () => ({ uid: mockUid }),
  } as unknown as User

  // Create user document in Firestore
  try {
    await setDoc(doc(db, "users", mockUid), {
      uid: mockUid,
      email: mockUser.email,
      displayName: mockUser.displayName,
      photoURL: mockUser.photoURL,
      role: "user",
      emailVerified: true, // Google accounts are pre-verified
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error creating mock user document:", error)
  }

  return mockUser
}

// Sign in with Google
export const signInWithGoogle = async () => {
  // IMPORTANT: Check for development environment FIRST, before any Firebase code
  const isDevEnv = isDevelopmentEnvironment()
  console.log("Environment check - isDevelopmentEnvironment:", isDevEnv)

  // For development/preview environments, ALWAYS use mock user
  if (isDevEnv) {
    console.log("Development environment detected, using mock Google user")
    try {
      return await createMockGoogleUser()
    } catch (mockError) {
      console.error("Error creating mock Google user:", mockError)
      throw new Error("Failed to create mock Google user")
    }
  }

  // Only try real Google auth in production environments
  try {
    console.log("Production environment detected, using real Google authentication")
    const provider = new GoogleAuthProvider()
    const userCredential = await signInWithPopup(auth, provider)
    const user = userCredential.user

    // Check if user document exists
    const userDoc = await getDoc(doc(db, "users", user.uid))

    // If user document doesn't exist, create it
    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: "user",
        emailVerified: true, // Google accounts are pre-verified
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    }

    return user
  } catch (error) {
    console.error("Error signing in with Google:", error)
    throw error
  }
}

// Send verification email
export const sendVerificationEmail = async (user: User) => {
  try {
    await sendEmailVerification(user)
    return true
  } catch (error) {
    console.error("Error sending verification email:", error)
    throw error
  }
}

// Verify email with action code
export const verifyEmail = async (actionCode: string) => {
  try {
    await applyActionCode(auth, actionCode)

    // Update user document in Firestore if user is logged in
    const currentUser = auth.currentUser
    if (currentUser) {
      await updateDoc(doc(db, "users", currentUser.uid), {
        emailVerified: true,
        updatedAt: serverTimestamp(),
      })
    }

    return true
  } catch (error) {
    console.error("Error verifying email:", error)
    throw error
  }
}

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error("Error signing out:", error)
    throw error
  }
}

// Get current user
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe()
        resolve(user)
      },
      reject,
    )
  })
}

// Send password reset email
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return true
  } catch (error) {
    console.error("Error sending password reset email:", error)
    throw error
  }
}

// Verify password reset code
export const verifyPasswordResetCodeWrapper = async (code: string) => {
  try {
    return await firebaseVerifyPasswordResetCode(auth, code)
  } catch (error) {
    console.error("Error verifying password reset code:", error)
    throw error
  }
}

// Confirm password reset
export const confirmPasswordResetWrapper = async (code: string, newPassword: string) => {
  try {
    await firebaseConfirmPasswordReset(auth, code, newPassword)
    return true
  } catch (error) {
    console.error("Error confirming password reset:", error)
    throw error
  }
}

// Get user data from Firestore
export const getUserData = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid))
    if (userDoc.exists()) {
      return userDoc.data()
    }
    return null
  } catch (error) {
    console.error("Error getting user data:", error)
    throw error
  }
}

// Admin sign in
export const adminSignIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Check if user is an admin
    const userDoc = await getDoc(doc(db, "users", user.uid))
    if (userDoc.exists() && userDoc.data().role === "admin") {
      return user
    } else {
      // Sign out if not an admin
      await signOut(auth)
      throw new Error("Unauthorized: Not an admin user")
    }
  } catch (error) {
    console.error("Error signing in as admin:", error)
    throw error
  }
}

// Update user profile
export const updateUserProfile = async (uid: string, data: any) => {
  try {
    await updateDoc(doc(db, "users", uid), {
      ...data,
      updatedAt: serverTimestamp(),
    })

    // Update displayName in Firebase Auth if provided
    if (data.displayName && auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: data.displayName,
      })
    }

    return true
  } catch (error) {
    console.error("Error updating user profile:", error)
    throw error
  }
}

// Change user password
export const changePassword = async (currentPassword: string, newPassword: string) => {
  try {
    const user = auth.currentUser
    if (!user || !user.email) throw new Error("No authenticated user found")

    // Re-authenticate user before changing password
    const credential = EmailAuthProvider.credential(user.email, currentPassword)
    await reauthenticateWithCredential(user, credential)

    // Update password
    await updatePassword(user, newPassword)
    return true
  } catch (error) {
    console.error("Error changing password:", error)
    throw error
  }
}

// Change user email
export const changeEmail = async (password: string, newEmail: string) => {
  try {
    const user = auth.currentUser
    if (!user || !user.email) throw new Error("No authenticated user found")

    // Re-authenticate user before changing email
    const credential = EmailAuthProvider.credential(user.email, password)
    await reauthenticateWithCredential(user, credential)

    // Update email
    await updateEmail(user, newEmail)

    // Send verification email for new email
    await sendEmailVerification(user)

    // Update email in Firestore
    await updateDoc(doc(db, "users", user.uid), {
      email: newEmail,
      emailVerified: false,
      updatedAt: serverTimestamp(),
    })

    return true
  } catch (error) {
    console.error("Error changing email:", error)
    throw error
  }
}
