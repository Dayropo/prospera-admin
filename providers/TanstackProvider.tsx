"use client"

import React, { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export default function TanstackProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            retry: (failureCount, error) => {
              if (error instanceof Error && error.message.includes("Network")) {
                return failureCount < 3
              }
              return false
            },
            refetchOnWindowFocus: true,
            refetchOnMount: true,
            refetchOnReconnect: true,
            gcTime: 10 * 60 * 1000,
            throwOnError: (error: Error) => {
              return (error as any)?.response?.status >= 500
            },
          },
          mutations: {
            throwOnError: false,
            onError: (error: Error) => {
              console.error("Mutation error:", error)
            },
          },
        },
      }),
  )
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
