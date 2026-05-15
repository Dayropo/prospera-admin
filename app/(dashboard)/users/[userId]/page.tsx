"use client"

import { use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Ban, CheckCircle2, Shield } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function UserDetailPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params)

  // TODO: Fetch real user data from API
  const user = {
    id: userId,
    name: "John Doe",
    email: "john@example.com",
    phone: "+234 801 234 5678",
    status: "active",
    kycStatus: "verified",
    registeredAt: "2024-01-15",
    lastLogin: "2024-03-10 14:30",
    wallets: {
      main: "₦125,000",
      escrow: "₦50,000",
      repayment: "₦25,000",
      platform: "₦10,000",
    },
    pinStatus: {
      hasPin: true,
      isLocked: false,
      failedAttempts: 0,
    },
  }

  const transactions = [
    {
      id: "1",
      type: "Transfer",
      amount: "₦50,000",
      status: "completed",
      date: "2024-03-10 10:30",
    },
    {
      id: "2",
      type: "Withdrawal",
      amount: "₦25,000",
      status: "completed",
      date: "2024-03-09 15:20",
    },
  ]

  const handleSuspendUser = () => {
    // TODO: Implement suspend user API call
    console.log("Suspend user:", userId)
  }

  const handleActivateUser = () => {
    // TODO: Implement activate user API call
    console.log("Activate user:", userId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/users">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
        <div className="flex gap-2">
          {user.status === "active" ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Ban className="mr-2 h-4 w-4" />
                  Suspend User
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Suspend User</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to suspend this user? They will not be able to access their account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSuspendUser}>Suspend</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button onClick={handleActivateUser}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Activate User
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge variant={user.status === "active" ? "default" : "destructive"}>
                    {user.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">KYC Status:</span>
                  <Badge variant={user.kycStatus === "verified" ? "default" : "secondary"}>
                    {user.kycStatus}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Phone:</span>
                  <span className="text-sm">{user.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Registered:</span>
                  <span className="text-sm">{user.registeredAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Last Login:</span>
                  <span className="text-sm">{user.lastLogin}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wallet Balances</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Main Balance:</span>
                  <span className="text-sm font-semibold">{user.wallets.main}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Escrow Balance:</span>
                  <span className="text-sm font-semibold">{user.wallets.escrow}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Repayment Balance:</span>
                  <span className="text-sm font-semibold">{user.wallets.repayment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Platform Balance:</span>
                  <span className="text-sm font-semibold">{user.wallets.platform}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Recent transactions for this user</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>
                        <Badge variant="default">{transaction.status}</Badge>
                      </TableCell>
                      <TableCell>{transaction.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <span className="font-medium">PIN Status</span>
                </div>
                <Badge variant={user.pinStatus.hasPin ? "default" : "secondary"}>
                  {user.pinStatus.hasPin ? "Set" : "Not Set"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">PIN Locked:</span>
                <span className="text-sm">{user.pinStatus.isLocked ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Failed Attempts:</span>
                <span className="text-sm">{user.pinStatus.failedAttempts}/5</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
