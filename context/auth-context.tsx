"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signOutUser,
  getCurrentUser,
  getUserData,
  adminSignIn,
  sendVerificationEmail,
  verifyEmail,
} from "@/lib/firebase/auth"
import { applyForOrganizerRole } from "@/lib/firebase/users"

type UserRole = "user" | "organizer" | "admin"

type UserData = {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  role: UserRole
  emailVerified?: boolean
  username?: string
  bio?: string
  location?: string
  isVerified?: boolean
  createdAt?: any
}

interface AuthContextType {
  user: User | null
  userData: UserData | null
  loading: boolean
  signUp: (email: string, password: string, name: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  adminSignIn: (email: string, password: string) => Promise<void>
  applyForOrganizerRole: (data: any) => Promise<void>
  sendVerificationEmail: () => Promise<void>
  verifyEmail: (actionCode: string) => Promise<void>
  isOrganizer: boolean
  isAdmin: boolean
  isOrganizerApplied: boolean
  isEmailVerified: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isOrganizerApplied, setIsOrganizerApplied] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Check if user is authenticated on mount
  useEffect(() => {
    const unsubscribe = async () => {
      try {
        setLoading(true)
        const currentUser = await getCurrentUser()
        setUser(currentUser)

        if (currentUser) {
          const userDataResult = await getUserData(currentUser.uid)
          if (userDataResult) {
            setUserData(userDataResult as UserData)
            setIsOrganizerApplied(!!userDataResult.organizerApplication)
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
      } finally {
        setLoading(false)
      }
    }

    unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true)
      const newUser = await signUpWithEmail(email, password, name)
      setUser(newUser)

      const userDataResult = await getUserData(newUser.uid)
      setUserData(userDataResult as UserData)

      toast({
        title: "Account created",
        description: "Welcome to Townzy! Please check your email to verify your account.",
      })

      router.push("/verify-email")
    } catch (error: any) {
      console.error("Sign up error:", error)
      toast({
        title: "Sign up failed",
        description: error.message || "There was an error creating your account.",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const signedInUser = await signInWithEmail(email, password)
      setUser(signedInUser)

      const userDataResult = await getUserData(signedInUser.uid)
      setUserData(userDataResult as UserData)
      setIsOrganizerApplied(!!userDataResult?.organizerApplication)

      toast({
        title: "Login successful",
        description: "Welcome back to Townzy!",
      })

      // If email is not verified, redirect to verification page
      if (!signedInUser.emailVerified && userDataResult?.role !== "admin") {
        router.push("/verify-email")
      } else {
        router.push("/")
      }
    } catch (error: any) {
      console.error("Sign in error:", error)
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleSignInWithGoogle = async () => {
    try {
      setLoading(true)
      const googleUser = await signInWithGoogle()
      setUser(googleUser)

      const userDataResult = await getUserData(googleUser.uid)
      setUserData(userDataResult as UserData)
      setIsOrganizerApplied(!!userDataResult?.organizerApplication)

      toast({
        title: "Login successful",
        description: "Welcome to Townzy!",
      })

      router.push("/")
    } catch (error: any) {
      console.error("Google sign in error:", error)
      toast({
        title: "Login failed",
        description: error.message || "There was an error signing in with Google.",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleAdminSignIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const adminUser = await adminSignIn(email, password)
      setUser(adminUser)

      const userDataResult = await getUserData(adminUser.uid)
      setUserData(userDataResult as UserData)

      toast({
        title: "Admin login successful",
        description: "Welcome to the admin dashboard!",
      })

      router.push("/admin")
    } catch (error: any) {
      console.error("Admin sign in error:", error)
      toast({
        title: "Admin login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      setLoading(true)
      await signOutUser()
      setUser(null)
      setUserData(null)
      setIsOrganizerApplied(false)

      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      })

      router.push("/")
    } catch (error: any) {
      console.error("Sign out error:", error)
      toast({
        title: "Sign out failed",
        description: error.message || "There was an error signing out.",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleApplyForOrganizerRole = async (data: any) => {
    try {
      setLoading(true)
      if (!user) throw new Error("You must be logged in to apply")

      // Check if email is verified
      if (!user.emailVerified) {
        toast({
          title: "Email verification required",
          description: "Please verify your email before applying to become an organizer.",
          variant: "destructive",
        })
        router.push("/verify-email")
        return
      }

      await applyForOrganizerRole(user.uid, data)
      setIsOrganizerApplied(true)

      toast({
        title: "Application submitted",
        description: "Your application to become an organizer is under review.",
      })

      router.push("/apply-organizer/success")
    } catch (error: any) {
      console.error("Apply for organizer error:", error)
      toast({
        title: "Application failed",
        description: error.message || "There was an error submitting your application.",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleSendVerificationEmail = async () => {
    try {
      setLoading(true)
      if (!user) throw new Error("No authenticated user found")

      await sendVerificationEmail(user)

      toast({
        title: "Verification email sent",
        description: "Please check your inbox and click the verification link.",
      })
    } catch (error: any) {
      console.error("Send verification email error:", error)
      toast({
        title: "Failed to send verification email",
        description: error.message || "There was an error sending the verification email.",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyEmail = async (actionCode: string) => {
    try {
      setLoading(true)
      await verifyEmail(actionCode)

      // Refresh user data
      if (user) {
        const userDataResult = await getUserData(user.uid)
        setUserData(userDataResult as UserData)
      }

      toast({
        title: "Email verified",
        description: "Your email has been successfully verified.",
      })

      router.push("/")
    } catch (error: any) {
      console.error("Verify email error:", error)
      toast({
        title: "Email verification failed",
        description: error.message || "There was an error verifying your email.",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const isOrganizer = userData?.role === "organizer"
  const isAdmin = userData?.role === "admin"
  const isEmailVerified = user?.emailVerified || false

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        signUp,
        signIn,
        signOut: handleSignOut,
        signInWithGoogle: handleSignInWithGoogle,
        adminSignIn: handleAdminSignIn,
        applyForOrganizerRole: handleApplyForOrganizerRole,
        sendVerificationEmail: handleSendVerificationEmail,
        verifyEmail: handleVerifyEmail,
        isOrganizer,
        isAdmin,
        isOrganizerApplied,
        isEmailVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
