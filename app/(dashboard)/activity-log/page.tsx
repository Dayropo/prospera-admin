"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"

export default function ActivityLogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [actionFilter, setActionFilter] = useState("all")

  // TODO: Fetch real data from API
  const activities = [
    {
      id: "1",
      user: "Admin User",
      action: "User Suspended",
      target: "John Doe",
      ipAddress: "192.168.1.1",
      timestamp: "2024-03-10 14:30",
      details: "Suspended user due to suspicious activity",
    },
    {
      id: "2",
      user: "Admin User",
      action: "Transaction Approved",
      target: "TXN001",
      ipAddress: "192.168.1.1",
      timestamp: "2024-03-10 13:15",
      details: "Approved repayment transaction",
    },
    {
      id: "3",
      user: "Support Team",
      action: "Ticket Resolved",
      target: "TICK002",
      ipAddress: "192.168.1.2",
      timestamp: "2024-03-10 11:45",
      details: "Resolved KYC verification issue",
    },
    {
      id: "4",
      user: "Admin User",
      action: "Settings Updated",
      target: "System Configuration",
      ipAddress: "192.168.1.1",
      timestamp: "2024-03-10 10:00",
      details: "Updated transaction fee settings",
    },
  ]

  const getActionBadge = (action: string) => {
    if (action.includes("Suspended") || action.includes("Rejected")) {
      return <Badge variant="destructive">{action}</Badge>
    }
    if (action.includes("Approved") || action.includes("Resolved")) {
      return <Badge variant="default">{action}</Badge>
    }
    return <Badge variant="secondary">{action}</Badge>
  }

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
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by user, action, or target..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="user">User Actions</SelectItem>
                <SelectItem value="transaction">Transaction Actions</SelectItem>
                <SelectItem value="settings">Settings Changes</SelectItem>
                <SelectItem value="ticket">Ticket Actions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Admin User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">{activity.user}</TableCell>
                    <TableCell>{getActionBadge(activity.action)}</TableCell>
                    <TableCell>{activity.target}</TableCell>
                    <TableCell>{activity.ipAddress}</TableCell>
                    <TableCell>{activity.timestamp}</TableCell>
                    <TableCell className="max-w-xs truncate">{activity.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
