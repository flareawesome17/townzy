import { Skeleton } from "@/components/ui/skeleton"

export default function SearchLoading() {
  return (
    <div className="container px-4 py-6 md:py-8 max-w-7xl">
      <div className="space-y-6">
        <Skeleton className="h-8 w-32" />

        <Skeleton className="h-10 w-full" />

        <div className="space-y-8 mt-6">
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
      </div>
    </div>
  )
}
