"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Filter, X } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function EventFilters() {
  const [date, setDate] = useState<Date>()
  const [distance, setDistance] = useState([10])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isFiltersApplied, setIsFiltersApplied] = useState(false)

  const categories = [
    "Music",
    "Arts",
    "Food",
    "Sports",
    "Technology",
    "Education",
    "Networking",
    "Community",
    "Charity",
    "Outdoors",
  ]

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const clearFilters = () => {
    setDate(undefined)
    setDistance([10])
    setSelectedCategories([])
    setIsFiltersApplied(false)
  }

  const applyFilters = () => {
    setIsFiltersApplied(true)
  }

  const FiltersContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Filters</h3>
        {isFiltersApplied && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2">
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Date</h4>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium">Distance</h4>
          <span className="text-sm text-muted-foreground">{distance[0]} miles</span>
        </div>
        <Slider defaultValue={[10]} max={50} step={1} value={distance} onValueChange={setDistance} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Categories</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategories.includes(category) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {isFiltersApplied ? "Filters applied" : "No filters applied"}
        </div>
        <Button onClick={applyFilters}>Apply Filters</Button>
      </div>
    </div>
  )

  // Mobile version uses a sheet
  const MobileFilters = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 px-2">
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {isFiltersApplied && (
            <Badge variant="secondary" className="ml-2 rounded-full">
              {selectedCategories.length + (date ? 1 : 0) + (distance[0] !== 10 ? 1 : 0)}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <FiltersContent />
      </SheetContent>
    </Sheet>
  )

  // Desktop version
  const DesktopFilters = () => (
    <div className="bg-card rounded-lg border p-4">
      <FiltersContent />
    </div>
  )

  // Render mobile or desktop version based on screen size
  return (
    <>
      <div className="md:hidden">
        <MobileFilters />
      </div>
      <div className="hidden md:block">
        <DesktopFilters />
      </div>
    </>
  )
}
