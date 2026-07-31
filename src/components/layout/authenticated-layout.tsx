import { Outlet } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { SkipToMain } from '@/components/skip-to-main'

type AuthenticatedLayoutProps = {
  children?: React.ReactNode
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <SearchProvider>
      <div className={cn('@container/content flex min-h-svh w-full flex-col')}>
        <SkipToMain />
        <TooltipProvider delayDuration={200}>
          {children ?? <Outlet />}
        </TooltipProvider>
      </div>
    </SearchProvider>
  )
}
