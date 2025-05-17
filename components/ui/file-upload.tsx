"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload, X } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onFileChange: (file: File | null) => void
  defaultPreview?: string
  className?: string
  accept?: string
  maxSize?: number // in MB
  label?: string
}

export function FileUpload({
  onFileChange,
  defaultPreview,
  className,
  accept = "image/*",
  maxSize = 5, // 5MB default
  label = "Upload Image",
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultPreview || null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setError(null)

    if (!file) {
      setPreview(null)
      onFileChange(null)
      return
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`)
      return
    }

    setIsLoading(true)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
      setIsLoading(false)
      onFileChange(file)
    }
    reader.onerror = () => {
      setError("Failed to read file")
      setIsLoading(false)
    }
    reader.readAsDataURL(file)
  }

  const handleRemove = () => {
    setPreview(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
    onFileChange(null)
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor="file-upload">{label}</Label>

      {!preview ? (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 transition-colors hover:border-gray-400">
          <Input
            id="file-upload"
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => inputRef.current?.click()}
            disabled={isLoading}
            className="mb-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Choose File
              </>
            )}
          </Button>
          <p className="text-sm text-muted-foreground">
            {accept === "image/*" ? "PNG, JPG or GIF" : accept} up to {maxSize}MB
          </p>
          {error && <p className="text-sm text-destructive mt-2">{error}</p>}
        </div>
      ) : (
        <div className="relative">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-200">
            <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
