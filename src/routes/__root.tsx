import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import type { QueryClient } from '@tanstack/react-query'
import Header from '@/components/Header.tsx'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: () => (
      <>
        <Header />

        <Outlet />
        <TanStackRouterDevtools />
      </>
    ),
  },
)
