"use client"

import { Activity, AlertCircle, ArrowLeftRight, TrendingUp, Users, Wallet } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency } from "@/lib/utils"
import { useMetricsQuery } from "@/utils/api/metrics"

const metricCards = [
  {
    key: "totalUsers" as const,
    label: "Total Users",
    icon: Users,
    // sub: "+12% from last month",
    format: (v: number) => v.toLocaleString(),
  },
  {
    key: "activeUsers" as const,
    label: "Active Users",
    icon: Activity,
    // sub: "+8% from last month",
    format: (v: number) => v.toLocaleString(),
  },
  {
    key: "totalTransactions" as const,
    label: "Total Transactions",
    icon: ArrowLeftRight,
    // sub: "+23% from last month",
    format: (v: number) => v.toLocaleString(),
  },
  {
    key: "transactionVolume" as const,
    label: "Transaction Volume",
    icon: TrendingUp,
    // sub: "+15% from last month",
    format: (v: number) => formatCurrency(v),
  },
  {
    key: "totalWalletBalance" as const,
    label: "Total Wallet Balance",
    icon: Wallet,
    // sub: "Across all user wallets",
    format: (v: number) => formatCurrency(v),
  },
  {
    key: "pendingTransactions" as const,
    label: "Pending Transactions",
    icon: AlertCircle,
    // sub: "Requires attention",
    format: (v: number) => v.toLocaleString(),
  },
]

function MetricCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-4 rounded" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-24 mb-1" />
        <Skeleton className="h-3 w-36" />
      </CardContent>
    </Card>
  )
}

function ActivityRowSkeleton() {
  return (
    <div className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
      <div className="space-y-1.5">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
      </div>
      <Skeleton className="h-3 w-20" />
    </div>
  )
}

export default function DashboardPage() {
  const { data, status } = useMetricsQuery()
  const metrics = data?.data

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of key metrics and system activity</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {status === "pending"
          ? Array.from({ length: 6 }, (_, i) => `metric-skeleton-${i}`).map(k => (
              <MetricCardSkeleton key={k} />
            ))
          : metricCards.map(({ key, label, icon: Icon, format }) => (
              <Card key={key}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{label}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics ? format(metrics[key]) : "—"}</div>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <p className="text-sm text-muted-foreground">Latest system activities and user actions</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {status === "pending"
              ? Array.from({ length: 4 }, (_, i) => `activity-skeleton-${i}`).map(k => (
                  <ActivityRowSkeleton key={k} />
                ))
              : null}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
