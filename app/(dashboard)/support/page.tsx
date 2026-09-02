"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Eye, MessageSquare, Search } from "lucide-react"
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

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // TODO: Fetch real data from API
  const tickets = [
    {
      id: "TICK001",
      user: "John Doe",
      subject: "Unable to withdraw funds",
      status: "open",
      priority: "high",
      createdAt: "2024-03-10 10:30",
      assignedTo: "Admin User",
    },
    {
      id: "TICK002",
      user: "Jane Smith",
      subject: "KYC verification issue",
      status: "in_progress",
      priority: "medium",
      createdAt: "2024-03-10 09:15",
      assignedTo: "Admin User",
    },
    {
      id: "TICK003",
      user: "Mike Johnson",
      subject: "Transaction not reflecting",
      status: "resolved",
      priority: "low",
      createdAt: "2024-03-09 14:20",
      assignedTo: "Support Team",
    },
  ]

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Ticket ID",
        cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
      },
      {
        accessorKey: "user",
        header: "User",
      },
      {
        accessorKey: "subject",
        header: "Subject",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string
          const variants: Record<string, "default" | "secondary" | "destructive"> = {
            open: "destructive",
            in_progress: "secondary",
            resolved: "default",
          }
          return <Badge variant={variants[status] || "secondary"}>{status.replace("_", " ")}</Badge>
        },
      },
      {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => {
          const priority = row.getValue("priority") as string
          const variants: Record<string, "default" | "secondary" | "destructive"> = {
            high: "destructive",
            medium: "secondary",
            low: "default",
          }
          return <Badge variant={variants[priority] || "default"}>{priority}</Badge>
        },
      },
      {
        accessorKey: "assignedTo",
        header: "Assigned To",
      },
      {
        accessorKey: "createdAt",
        header: "Created",
      },
      {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => (
          <div className="text-right">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/support/ticket/${row.original.id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        ),
      },
    ],
    [],
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
          <p className="text-muted-foreground">Manage user support requests and issues</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tickets.filter(t => t.status === "open").length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tickets.filter(t => t.status === "in_progress").length}
            </div>
            <p className="text-xs text-muted-foreground">Being handled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tickets.filter(t => t.status === "resolved").length}
            </div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tickets</CardTitle>
          <CardDescription>Complete list of support tickets</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ticket ID, user, or subject..."
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
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DataTable columns={columns} data={tickets} pageSize={10} />
        </CardContent>
      </Card>
    </div>
  )
}
