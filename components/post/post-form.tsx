"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FileUpload } from "@/components/ui/file-upload"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"
import { createPost } from "@/lib/firebase/posts"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const postSchema = z.object({
  content: z.string().min(1, "Post content cannot be empty").max(500, "Post content is too long"),
})

type PostFormValues = z.infer<typeof postSchema>

export function PostForm({ onSuccess }: { onSuccess?: () => void }) {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, userData } = useAuth()
  const { toast } = useToast()

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
    },
  })

  const onSubmit = async (data: PostFormValues) => {
    if (!user || !userData) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create a post",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Extract hashtags from content
      const hashtagRegex = /#[a-zA-Z0-9_]+/g
      const hashtags = data.content.match(hashtagRegex) || []

      // Create post object
      const postData = {
        content: data.content,
        authorId: user.uid,
        author: {
          id: user.uid,
          name: userData.displayName || "Unknown",
          photoURL: userData.photoURL || null,
          role: userData.role,
        },
        likes: 0,
        comments: 0,
        hashtags: hashtags.map((tag) => tag.substring(1)), // Remove # from hashtags
        image: null, // Will be updated by the createPost function if imageFile is provided
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      // Create post in Firestore
      await createPost(postData, imageFile)

      toast({
        title: "Post created",
        description: "Your post has been published successfully",
      })

      // Reset form
      form.reset()
      setImageFile(null)
      setShowImageUpload(false)

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error("Error creating post:", error)
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div className="rounded-lg border p-4 text-center">
        <p className="text-muted-foreground mb-2">Sign in to create a post</p>
        <Button size="sm">Sign In</Button>
      </div>
    )
  }

  return (
    <div className="rounded-lg border p-4 space-y-4">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={userData?.photoURL || ""} />
          <AvatarFallback>{userData?.displayName?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <span className="font-medium">{userData?.displayName}</span>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Textarea placeholder="What's happening?" className="min-h-24 resize-none" {...form.register("content")} />
        {form.formState.errors.content && (
          <p className="text-sm text-destructive">{form.formState.errors.content.message}</p>
        )}

        {showImageUpload && <FileUpload onFileChange={setImageFile} label="Add Image" accept="image/*" maxSize={2} />}

        <div className="flex items-center justify-between">
          <Button type="button" variant="ghost" size="sm" onClick={() => setShowImageUpload(!showImageUpload)}>
            <ImageIcon className="h-4 w-4 mr-2" />
            {showImageUpload ? "Remove Image" : "Add Image"}
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting...
              </>
            ) : (
              "Post"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
