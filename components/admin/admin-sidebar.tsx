"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { BarChart3, Calendar, Flag, Home, LogOut, Settings, Users } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export function AdminSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = "/admin-login"
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Events",
      href: "/admin/events",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Reports",
      href: "/admin/reports",
      icon: <Flag className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="hidden md:flex flex-col w-64 border-r bg-background">
      <div className="p-6">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="font-logo text-2xl text-primary">Townzy</span>
          <span className="font-medium text-sm bg-primary/10 text-primary px-2 py-0.5 rounded">Admin</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-3">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn("justify-start", pathname === item.href && "bg-secondary")}
              asChild
            >
              <Link href={item.href}>
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </ScrollArea>
      <div className="p-6 border-t">
        <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}
