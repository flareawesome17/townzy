import { FileQuestion } from "lucide-react"

interface SearchEmptyStateProps {
  type: "results" | "events" | "posts" | "organizers"
  query: string
}

export function SearchEmptyState({ type, query }: SearchEmptyStateProps) {
  return (
    <div className="py-12 text-center">
      <div className="flex justify-center mb-4">
        <FileQuestion className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">No {type} found</h3>
      <p className="text-muted-foreground mt-2">
        {type === "results"
          ? `We couldn't find any results matching "${query}"`
          : `We couldn't find any ${type} matching "${query}"`}
      </p>
      <p className="text-sm text-muted-foreground mt-4">
        Try adjusting your search terms or explore our featured content
      </p>
    </div>
  )
}
