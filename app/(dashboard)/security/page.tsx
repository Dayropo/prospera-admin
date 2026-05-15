"use client"

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
import { Shield, Lock, AlertTriangle } from "lucide-react"

export default function SecurityPage() {
  // TODO: Fetch real data from API
  const lockedAccounts = [
    {
      id: "1",
      user: "John Doe",
      email: "john@example.com",
      failedAttempts: 5,
      lockedAt: "2024-03-10 14:30",
    },
    {
      id: "2",
      user: "Jane Smith",
      email: "jane@example.com",
      failedAttempts: 5,
      lockedAt: "2024-03-09 10:15",
    },
  ]

  const suspiciousActivities = [
    {
      id: "1",
      user: "Mike Johnson",
      activity: "Multiple failed login attempts",
      ipAddress: "192.168.1.100",
      timestamp: "2024-03-10 15:45",
      severity: "high",
    },
    {
      id: "2",
      user: "Sarah Williams",
      activity: "Login from new device",
      ipAddress: "192.168.1.101",
      timestamp: "2024-03-10 12:30",
      severity: "medium",
    },
  ]

  const getSeverityBadge = (severity: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      high: "destructive",
      medium: "secondary",
      low: "default",
    }
    return <Badge variant={variants[severity] || "default"}>{severity}</Badge>
  }

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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Failed Attempts</TableHead>
                  <TableHead>Locked At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lockedAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.user}</TableCell>
                    <TableCell>{account.email}</TableCell>
                    <TableCell>{account.failedAttempts}/5</TableCell>
                    <TableCell>{account.lockedAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Suspicious Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Suspicious Activities</CardTitle>
          <CardDescription>Recent security events requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suspiciousActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">{activity.user}</TableCell>
                    <TableCell>{activity.activity}</TableCell>
                    <TableCell>{activity.ipAddress}</TableCell>
                    <TableCell>{activity.timestamp}</TableCell>
                    <TableCell>{getSeverityBadge(activity.severity)}</TableCell>
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
