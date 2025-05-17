"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Compass, Ticket, User, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/auth-context"

export function MobileNavigation() {
  const pathname = usePathname()
  const { user, isOrganizer } = useAuth()

  // Don't show mobile navigation on these paths
  const excludedPaths = ["/login", "/signup", "/admin", "/admin-login"]
  if (excludedPaths.some((path) => pathname.startsWith(path))) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background md:hidden">
      <div className="grid h-16 grid-cols-5">
        <Link href="/" className={cn("flex flex-col items-center justify-center", pathname === "/" && "text-primary")}>
          <Home className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          href="/discover"
          className={cn("flex flex-col items-center justify-center", pathname === "/discover" && "text-primary")}
        >
          <Compass className="h-5 w-5" />
          <span className="text-xs">Discover</span>
        </Link>
        {isOrganizer ? (
          <Link
            href="/create-event"
            className={cn("flex flex-col items-center justify-center", pathname === "/create-event" && "text-primary")}
          >
            <Plus className="h-5 w-5" />
            <span className="text-xs">Create</span>
          </Link>
        ) : (
          <Link
            href="/apply-organizer"
            className={cn(
              "flex flex-col items-center justify-center",
              pathname === "/apply-organizer" && "text-primary",
            )}
          >
            <Plus className="h-5 w-5" />
            <span className="text-xs">Apply</span>
          </Link>
        )}
        <Link
          href="/tickets"
          className={cn("flex flex-col items-center justify-center", pathname === "/tickets" && "text-primary")}
        >
          <Ticket className="h-5 w-5" />
          <span className="text-xs">Tickets</span>
        </Link>
        <Link
          href={user ? "/profile" : "/login"}
          className={cn(
            "flex flex-col items-center justify-center",
            (pathname === "/profile" || pathname === "/login") && "text-primary",
          )}
        >
          <User className="h-5 w-5" />
          <span className="text-xs">{user ? "Profile" : "Login"}</span>
        </Link>
      </div>
    </div>
  )
}
