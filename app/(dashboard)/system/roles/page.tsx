"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Shield, Users } from "lucide-react"
import { useMemo } from "react"
import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RolesPage() {
  // TODO: Fetch real data from API
  const roles = [
    {
      id: "1",
      name: "Super Admin",
      description: "Full system access with all permissions",
      userCount: 2,
      permissions: ["all"],
    },
    {
      id: "2",
      name: "Admin",
      description: "Standard admin access with limited permissions",
      userCount: 5,
      permissions: ["users.view", "users.edit", "transactions.view", "support.manage"],
    },
  ]

  const rolesColumns: ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Role Name",
        cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
      },
      {
        accessorKey: "description",
        header: "Description",
      },
      {
        accessorKey: "userCount",
        header: "Users",
      },
      {
        accessorKey: "permissions",
        header: "Permissions",
        cell: ({ row }) => {
          const permissions = row.getValue("permissions") as string[]
          return permissions.includes("all") ? (
            <Badge>All Permissions</Badge>
          ) : (
            <Badge variant="secondary">{permissions.length} permissions</Badge>
          )
        },
      },
      {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: () => (
          <div className="text-right">
            <Button variant="ghost" size="sm">
              Edit
            </Button>
          </div>
        ),
      },
    ],
    [],
  )

  const permissions = [
    { id: "1", name: "users.view", description: "View user information" },
    { id: "2", name: "users.edit", description: "Edit user information" },
    { id: "3", name: "users.suspend", description: "Suspend/activate users" },
    { id: "4", name: "transactions.view", description: "View transactions" },
    { id: "5", name: "transactions.approve", description: "Approve/reject transactions" },
    { id: "6", name: "transactions.refund", description: "Process refunds" },
    { id: "7", name: "support.view", description: "View support tickets" },
    { id: "8", name: "support.manage", description: "Manage support tickets" },
    { id: "9", name: "settings.view", description: "View system settings" },
    { id: "10", name: "settings.edit", description: "Edit system settings" },
  ]

  const permissionsColumns: ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Permission",
        cell: ({ row }) => <code className="text-sm">{row.getValue("name")}</code>,
      },
      {
        accessorKey: "description",
        header: "Description",
      },
    ],
    [],
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Roles & Permissions</h1>
        <p className="text-muted-foreground">Manage admin roles and access permissions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.length}</div>
            <p className="text-xs text-muted-foreground">Defined in the system</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {roles.reduce((sum, role) => sum + role.userCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all roles</p>
          </CardContent>
        </Card>
      </div>

      {/* Roles */}
      <Card>
        <CardHeader>
          <CardTitle>Roles</CardTitle>
          <CardDescription>Admin roles and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={rolesColumns} data={roles} pageSize={10} />
        </CardContent>
      </Card>

      {/* Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Available Permissions</CardTitle>
          <CardDescription>All permissions that can be assigned to roles</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={permissionsColumns} data={permissions} pageSize={10} />
        </CardContent>
      </Card>
    </div>
  )
}
