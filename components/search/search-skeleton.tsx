import { Skeleton } from "@/components/ui/skeleton"

export function SearchSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="space-y-4">
          <Skeleton className="h-[120px] w-full rounded-lg" />
          <Skeleton className="h-[120px] w-full rounded-lg" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Skeleton className="h-[150px] w-full rounded-lg" />
          <Skeleton className="h-[150px] w-full rounded-lg" />
          <Skeleton className="h-[150px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
