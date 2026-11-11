"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Search } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"
import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useUsersQuery } from "@/utils/api"

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(1)
  const limit = 20
  const { data, status, isLoading } = useUsersQuery({ page, limit })

  const columns: ColumnDef<IUser>[] = useMemo(
    () => [
      {
        accessorKey: "fullName",
        header: "Name",
        cell: ({ row }) => <div className="font-medium">{row.getValue("fullName")}</div>,
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "phoneNumber",
        header: "Phone",
      },
      {
        accessorKey: "userType",
        header: "User Type",
        cell: ({ row }) => {
          const userType = row.getValue("userType") as string
          return (
            <Badge variant={userType === "lender" ? "default" : "secondary"}>
              {userType || "N/A"}
            </Badge>
          )
        },
      },
      {
        accessorKey: "isVerified",
        header: "Verified",
        cell: ({ row }) => {
          const isVerified = row.getValue("isVerified") as boolean
          return (
            <Badge variant={isVerified ? "default" : "secondary"}>
              {isVerified ? "Verified" : "Unverified"}
            </Badge>
          )
        },
      },
      {
        accessorKey: "isOnboardingComplete",
        header: "Onboarding",
        cell: ({ row }) => {
          const isComplete = row.getValue("isOnboardingComplete") as boolean
          return (
            <Badge variant={isComplete ? "default" : "secondary"}>
              {isComplete ? "Complete" : "Incomplete"}
            </Badge>
          )
        },
      },
      {
        accessorKey: "createdAt",
        header: "Registered",
        cell: ({ row }) => {
          const date = new Date(row.getValue("createdAt"))
          return date.toLocaleDateString()
        },
      },
      {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => (
          <div className="text-right">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/users/${row.original.id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        ),
      },
    ],
    [],
  )

  const users = data?.data?.data || []
  const total = data?.data?.meta?.total ?? 0
  const pageCount = Math.max(1, Math.ceil(total / limit))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">View and manage all registered users</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>A list of all users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={users}
              pageSize={20}
              manualPagination={{ page, pageCount, onPageChange: setPage }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
