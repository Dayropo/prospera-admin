"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Download, Eye, Search } from "lucide-react"
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
import { useTransactionsQuery } from "@/utils/api"

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(1)
  const limit = 25

  const { data, isLoading } = useTransactionsQuery({
    page,
    limit,
    status: statusFilter !== "all" ? statusFilter : undefined,
  })

  const columns: ColumnDef<ITransaction>[] = useMemo(
    () => [
      {
        accessorKey: "referenceId",
        header: "Reference",
        cell: ({ row }) => <div className="font-medium">{row.getValue("referenceId")}</div>,
      },
      {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => {
          const user = row.getValue("user") as IUser
          return user?.fullName || "N/A"
        },
      },
      {
        accessorKey: "transactionType",
        header: "Type",
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("amount"))
          const currency = row.original.currency
          return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: currency || "NGN",
          }).format(amount)
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string
          const variants: Record<string, "default" | "secondary" | "destructive"> = {
            COMPLETED: "default",
            PENDING: "secondary",
            FAILED: "destructive",
            PROCESSING: "secondary",
          }
          return <Badge variant={variants[status] || "secondary"}>{status}</Badge>
        },
      },
      {
        accessorKey: "createdAt",
        header: "Date",
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
              <Link href={`/transactions/${row.original.id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        ),
      },
    ],
    [],
  )

  const transactions = data?.data?.data || []
  const total = data?.data?.meta?.total ?? 0
  const pageCount = Math.max(1, Math.ceil(total / limit))

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Exporting transactions...")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">View and manage all transactions</p>
        </div>
        <Button onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>Complete list of transactions in the system</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by reference, user, or amount..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="repayment">Repayment</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={statusFilter}
              onValueChange={value => {
                setStatusFilter(value)
                setPage(1)
              }}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
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
              data={transactions}
              pageSize={25}
              manualPagination={{ page, pageCount, onPageChange: setPage }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
