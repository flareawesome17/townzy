import { HomeFeed } from "@/components/home/home-feed"
import { HomeSidebar } from "@/components/home/home-sidebar"
import { MobileNavigation } from "@/components/layout/mobile-navigation"

export default function Home() {
  return (
    <div className="container px-4 py-6 md:py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="hidden md:block md:w-[300px] lg:w-[300px] flex-shrink-0">
          <HomeSidebar />
        </div>
        <div className="flex-1 min-w-0">
          <HomeFeed />
        </div>
      </div>
      <MobileNavigation className="md:hidden fixed bottom-0 left-0 right-0 z-50" />
    </div>
  )
}
