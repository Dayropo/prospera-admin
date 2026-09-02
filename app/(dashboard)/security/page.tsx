"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AlertTriangle, Lock, Shield } from "lucide-react"
import { useMemo } from "react"
import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLockedAccountsQuery } from "@/utils/api"

export default function SecurityPage() {
  const { data, isLoading } = useLockedAccountsQuery()

  const lockedAccounts = data?.data || []

  const lockedAccountsColumns: ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => {
          const user = row.getValue("user") as any
          return <div className="font-medium">{user?.fullName || "N/A"}</div>
        },
      },
      {
        accessorKey: "user.email",
        header: "Email",
        cell: ({ row }) => {
          const user = row.original.user as any
          return user?.email || "N/A"
        },
      },
      {
        accessorKey: "failedAttempts",
        header: "Failed Attempts",
        cell: ({ row }) => `${row.getValue("failedAttempts")}/5`,
      },
      {
        accessorKey: "lockedAt",
        header: "Locked At",
        cell: ({ row }) => {
          const date = new Date(row.getValue("lockedAt"))
          return date.toLocaleString()
        },
      },
    ],
    [],
  )

  const suspiciousActivities: any[] = []

  const suspiciousActivitiesColumns: ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => <div className="font-medium">{row.getValue("user")}</div>,
      },
      {
        accessorKey: "activity",
        header: "Activity",
      },
      {
        accessorKey: "ipAddress",
        header: "IP Address",
      },
      {
        accessorKey: "timestamp",
        header: "Timestamp",
      },
      {
        accessorKey: "severity",
        header: "Severity",
        cell: ({ row }) => {
          const severity = row.getValue("severity") as string
          const variants: Record<string, "default" | "secondary" | "destructive"> = {
            high: "destructive",
            medium: "secondary",
            low: "default",
          }
          return <Badge variant={variants[severity] || "default"}>{severity}</Badge>
        },
      },
    ],
    [],
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Security & PIN Management</h1>
        <p className="text-muted-foreground">Monitor security events and locked accounts</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locked Accounts</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lockedAccounts.length}</div>
            <p className="text-xs text-muted-foreground">Due to failed PIN attempts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspicious Activities</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suspiciousActivities.length}</div>
            <p className="text-xs text-muted-foreground">In the last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">System security health</p>
          </CardContent>
        </Card>
      </div>

      {/* Locked Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Locked Accounts</CardTitle>
          <CardDescription>Users locked due to failed PIN attempts</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          ) : (
            <DataTable columns={lockedAccountsColumns} data={lockedAccounts} pageSize={10} />
          )}
        </CardContent>
      </Card>

      {/* Suspicious Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Suspicious Activities</CardTitle>
          <CardDescription>Recent security events requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={suspiciousActivitiesColumns}
            data={suspiciousActivities}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  )
}
