"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Mail, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function VerifyEmailPage() {
  const { user, isEmailVerified, sendVerificationEmail, loading } = useAuth()
  const [resendDisabled, setResendDisabled] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const router = useRouter()

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user && !loading) {
      router.push("/login")
    }
  }, [user, loading, router])

  // Redirect if email is already verified
  useEffect(() => {
    if (isEmailVerified && !loading) {
      router.push("/")
    }
  }, [isEmailVerified, loading, router])

  // Handle countdown for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false)
    }
  }, [countdown, resendDisabled])

  const handleResendVerification = async () => {
    try {
      await sendVerificationEmail()
      setResendDisabled(true)
      setCountdown(60) // 60 seconds cooldown
    } catch (error) {
      console.error("Error resending verification email:", error)
    }
  }

  if (loading) {
    return (
      <div className="container flex items-center justify-center min-h-[80vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Verify Your Email</CardTitle>
          <CardDescription className="text-center">
            Please verify your email address to access all features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center py-4">
            <Mail className="h-16 w-16 text-primary" />
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Verification Required</AlertTitle>
            <AlertDescription>
              We've sent a verification email to <strong>{user.email}</strong>. Please check your inbox and click the
              verification link.
            </AlertDescription>
          </Alert>

          <div className="text-center text-sm text-muted-foreground">
            <p>Didn't receive the email? Check your spam folder or click the button below to resend.</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={handleResendVerification}
            disabled={resendDisabled || loading}
            className="w-full"
            variant="outline"
          >
            {resendDisabled ? (
              <>Resend in {countdown}s</>
            ) : loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>Resend Verification Email</>
            )}
          </Button>

          <Link href="/" className="w-full">
            <Button variant="ghost" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
