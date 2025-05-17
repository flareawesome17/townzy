"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Mail, X } from "lucide-react"
import Link from "next/link"

export function VerificationBanner() {
  const { user, isEmailVerified, loading } = useAuth()
  const [dismissed, setDismissed] = useState(false)

  // Don't show if:
  // - User is not logged in
  // - Email is already verified
  // - Banner was dismissed
  // - Still loading
  if (!user || isEmailVerified || dismissed || loading) {
    return null
  }

  return (
    <Alert className="bg-amber-50 border-amber-200 text-amber-800 relative">
      <Mail className="h-4 w-4 text-amber-800" />
      <AlertDescription className="flex items-center justify-between">
        <span>
          Please verify your email address to access all features.{" "}
          <Link href="/verify-email" className="font-medium underline underline-offset-4">
            Verify now
          </Link>
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-amber-800 hover:bg-amber-100 absolute top-1 right-1"
          onClick={() => setDismissed(true)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </AlertDescription>
    </Alert>
  )
}
