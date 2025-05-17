"use client"

import { Button } from "@/components/ui/button"
import { Clock, Trash2, Search } from "lucide-react"

interface SearchHistoryProps {
  history: string[]
  onSelect: (query: string) => void
  onClear: () => void
}

export function SearchHistory({ history, onSelect, onClear }: SearchHistoryProps) {
  if (history.length === 0) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          Recent searches
        </h3>
        <Button variant="ghost" size="sm" onClick={onClear} className="h-8 text-xs">
          <Trash2 className="h-3.5 w-3.5 mr-1" />
          Clear
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {history.map((query, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="h-8 text-xs flex items-center gap-1.5"
            onClick={() => onSelect(query)}
          >
            <Search className="h-3 w-3" />
            {query}
          </Button>
        ))}
      </div>
    </div>
  )
}
