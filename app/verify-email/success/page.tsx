"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function VerifyEmailSuccessPage() {
  const { verifyEmail, loading, user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const oobCode = searchParams.get("oobCode")

  useEffect(() => {
    const verifyUserEmail = async () => {
      if (oobCode) {
        try {
          await verifyEmail(oobCode)
        } catch (error) {
          console.error("Error verifying email:", error)
          router.push("/verify-email")
        }
      } else {
        // No verification code provided
        router.push("/verify-email")
      }
    }

    verifyUserEmail()
  }, [oobCode, verifyEmail, router])

  if (loading || !oobCode) {
    return (
      <div className="container flex items-center justify-center min-h-[80vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Email Verified!</CardTitle>
          <CardDescription className="text-center">Your email has been successfully verified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center py-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>

          <p className="text-center">
            Thank you for verifying your email address. You now have full access to all features of Townzy.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button>Continue to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
