"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"
import type { Post } from "@/types/post"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes || 0)

  // Handle missing data gracefully
  const authorName = post.author?.name || "Unknown User"
  const authorImage = post.author?.photoURL || "/placeholder.svg"
  const authorInitial = authorName.charAt(0) || "U"

  // Format the timestamp safely
  const timestamp = post.createdAt
    ? formatDistanceToNow(new Date(post.createdAt.seconds * 1000), { addSuffix: true })
    : "recently"

  const handleLike = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to like posts",
      })
      return
    }

    setLiked(!liked)
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))

    // In a real app, we would update Firestore here
    // For now, we'll just show a toast
    toast({
      title: liked ? "Post unliked" : "Post liked",
      description: liked ? "You have unliked this post" : "You have liked this post",
    })
  }

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={authorImage || "/placeholder.svg"} />
              <AvatarFallback>{authorInitial}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <Link href={`/profile/${post.authorId || "#"}`} className="font-medium hover:underline">
                  {authorName}
                </Link>
                {post.author?.role === "organizer" && (
                  <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">Organizer</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{timestamp}</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Copy link</DropdownMenuItem>
              <DropdownMenuItem>Share post</DropdownMenuItem>
              {user && user.uid === post.authorId && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Edit post</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete post</DropdownMenuItem>
                </>
              )}
              {user && user.uid !== post.authorId && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Report post</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <p>{post.content}</p>
        </div>

        {post.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-md">
            <Image src={post.image || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="flex items-center gap-1" onClick={handleLike}>
            <Heart className={`h-4 w-4 ${liked ? "fill-destructive text-destructive" : ""}`} />
            <span>{likeCount}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1" asChild>
            <Link href={`/post/${post.id}`}>
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments || 0}</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
