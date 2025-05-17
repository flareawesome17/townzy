"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import type { Organizer } from "@/types/organizer"

interface OrganizerCardProps {
  organizer: Organizer
}

export function OrganizerCard({ organizer }: OrganizerCardProps) {
  const [following, setFollowing] = useState(false)

  return (
    <Card className="overflow-hidden card-hover">
      <div className="relative h-24 bg-gradient-to-r from-primary/20 to-secondary/20">
        {organizer.banner && (
          <Image
            src={organizer.banner || "/placeholder.svg"}
            alt={`${organizer.name} banner`}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute -bottom-10 left-4">
          <Avatar className="h-20 w-20 border-4 border-background">
            <AvatarImage src={organizer.avatar || "/placeholder.svg"} alt={organizer.name} />
            <AvatarFallback>{organizer.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <CardContent className="pt-12 p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">
                <Link href={`/organizer/${organizer.id}`} className="hover:underline">
                  {organizer.name}
                </Link>
              </h3>
              {organizer.verified && (
                <Badge variant="secondary" className="bg-secondary/10">
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">@{organizer.username}</p>
          </div>

          <Button
            size="sm"
            variant={following ? "outline" : "default"}
            className={following ? "" : "gradient-btn"}
            onClick={() => setFollowing(!following)}
          >
            {following ? "Following" : "Follow"}
          </Button>
        </div>

        <p className="text-sm mt-3 line-clamp-2">{organizer.bio}</p>

        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="font-medium">{organizer.followers}</span>
            <span className="text-muted-foreground">followers</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{organizer.eventCount} events</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
