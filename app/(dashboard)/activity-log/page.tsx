"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLogsQuery } from "@/utils/api"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"

export default function ActivityLogPage() {
  const { data, isLoading } = useLogsQuery()

  const columns: ColumnDef<ILog>[] = useMemo(
    () => [
      // {
      //   accessorKey: "validator",
      //   header: "Validator",
      //   cell: ({ row }) => <div className="font-medium">{row.getValue("validator")}</div>,
      // },
      {
        accessorKey: "transaction.transactionType",
        header: "Action",
        cell: ({ row }) => {
          const type = row.original.transaction?.transactionType || "N/A"
          return <Badge variant="secondary">{type}</Badge>
        },
      },
      {
        accessorKey: "transactionId",
        header: "Transaction ID",
        cell: ({ row }) => (
          <code className="text-xs">
            {row.getValue("transactionId")?.toString()?.substring(0, 8)}...
          </code>
        ),
      },
      {
        accessorKey: "isVerified",
        header: "Verified",
        cell: ({ row }) => {
          const isVerified = row.getValue("isVerified") as boolean
          return (
            <Badge variant={isVerified ? "default" : "destructive"}>
              {isVerified ? "Verified" : "Unverified"}
            </Badge>
          )
        },
      },
      {
        accessorKey: "createdAt",
        header: "Timestamp",
        cell: ({ row }) => {
          const date = new Date(row.getValue("createdAt"))
          return date.toLocaleString()
        },
      },
      {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => (
          <div className="text-right">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/activity-log/${row.original.id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        ),
      },
    ],
    [],
  )

  console.log(data?.data)
  const activities = data?.data?.data || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Activity Logs</h1>
        <p className="text-muted-foreground">Track all admin actions and system activities</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Activities</CardTitle>
          <CardDescription>Complete audit trail of admin actions</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          ) : activities.length === 0 ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">No activity logs found</p>
            </div>
          ) : (
            <DataTable columns={columns} data={activities} pageSize={20} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
