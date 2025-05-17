"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export type AutocompleteSuggestion = {
  id: string
  value: string
  label: string
  type: "event" | "post" | "organizer" | "tag" | "location" | "category"
  icon?: React.ReactNode
}

interface AutocompleteProps {
  placeholder?: string
  suggestions: AutocompleteSuggestion[]
  isLoading?: boolean
  value: string
  onChange: (value: string) => void
  onSelect: (suggestion: AutocompleteSuggestion) => void
  onSubmit?: (value: string) => void
  className?: string
  inputClassName?: string
  maxSuggestions?: number
}

export function Autocomplete({
  placeholder = "Search...",
  suggestions,
  isLoading = false,
  value,
  onChange,
  onSelect,
  onSubmit,
  className,
  inputClassName,
  maxSuggestions = 10,
}: AutocompleteProps) {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Show dropdown when typing
  useEffect(() => {
    if (value.length > 0) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [value])

  // Handle form submission
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && onSubmit) {
      e.preventDefault()
      onSubmit(value)
      setOpen(false)
    }
  }

  // Limit the number of suggestions shown
  const limitedSuggestions = suggestions.slice(0, maxSuggestions)

  return (
    <div className={cn("relative", className)} ref={inputRef}>
      <Command onKeyDown={handleKeyDown} className="rounded-lg border shadow-md">
        <CommandInput
          placeholder={placeholder}
          value={value}
          onValueChange={onChange}
          className={cn("", inputClassName)}
        />
        {open && (value.length > 0 || isLoading) && (
          <CommandList className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-popover p-1 shadow-md">
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                {limitedSuggestions.length === 0 ? (
                  <CommandEmpty>No results found.</CommandEmpty>
                ) : (
                  <>
                    <CommandGroup heading="Events">
                      {limitedSuggestions
                        .filter((suggestion) => suggestion.type === "event")
                        .map((suggestion) => (
                          <CommandItem
                            key={suggestion.id}
                            value={suggestion.value}
                            onSelect={() => {
                              onSelect(suggestion)
                              setOpen(false)
                            }}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            {suggestion.icon}
                            <span>{suggestion.label}</span>
                          </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandGroup heading="Posts">
                      {limitedSuggestions
                        .filter((suggestion) => suggestion.type === "post")
                        .map((suggestion) => (
                          <CommandItem
                            key={suggestion.id}
                            value={suggestion.value}
                            onSelect={() => {
                              onSelect(suggestion)
                              setOpen(false)
                            }}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            {suggestion.icon}
                            <span>{suggestion.label}</span>
                          </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandGroup heading="Organizers">
                      {limitedSuggestions
                        .filter((suggestion) => suggestion.type === "organizer")
                        .map((suggestion) => (
                          <CommandItem
                            key={suggestion.id}
                            value={suggestion.value}
                            onSelect={() => {
                              onSelect(suggestion)
                              setOpen(false)
                            }}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            {suggestion.icon}
                            <span>{suggestion.label}</span>
                          </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandGroup heading="Tags">
                      {limitedSuggestions
                        .filter((suggestion) => suggestion.type === "tag")
                        .map((suggestion) => (
                          <CommandItem
                            key={suggestion.id}
                            value={suggestion.value}
                            onSelect={() => {
                              onSelect(suggestion)
                              setOpen(false)
                            }}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            {suggestion.icon}
                            <span>{suggestion.label}</span>
                          </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandGroup heading="Locations">
                      {limitedSuggestions
                        .filter((suggestion) => suggestion.type === "location")
                        .map((suggestion) => (
                          <CommandItem
                            key={suggestion.id}
                            value={suggestion.value}
                            onSelect={() => {
                              onSelect(suggestion)
                              setOpen(false)
                            }}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            {suggestion.icon}
                            <span>{suggestion.label}</span>
                          </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandGroup heading="Categories">
                      {limitedSuggestions
                        .filter((suggestion) => suggestion.type === "category")
                        .map((suggestion) => (
                          <CommandItem
                            key={suggestion.id}
                            value={suggestion.value}
                            onSelect={() => {
                              onSelect(suggestion)
                              setOpen(false)
                            }}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            {suggestion.icon}
                            <span>{suggestion.label}</span>
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </>
                )}
              </>
            )}
          </CommandList>
        )}
      </Command>
    </div>
  )
}
