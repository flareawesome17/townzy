"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect to admin login if not authenticated or not an admin
    if (!user || !isAdmin) {
      router.push("/admin-login")
    }
  }, [user, isAdmin, router])

  // Show nothing while checking authentication
  if (!user || !isAdmin) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      <AdminSidebar />
      <div className="flex-1 p-6 overflow-auto">{children}</div>
    </div>
  )
}
