"use client"

import { format } from "date-fns"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { use } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useLogQuery } from "@/utils/api/logs"

export default function LogDetailPage({ params }: { params: Promise<{ logId: string }> }) {
  const { logId } = use(params)

  const { data: logData, isLoading: logLoading } = useLogQuery(logId)

  const log = logData?.data as ILog

  if (logLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (!log) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Log not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/activity-log">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Activity Log Details</h1>
          <p className="text-muted-foreground">Transaction ID: {log.transactionId}</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Log Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Log ID</p>
              <p className="text-sm font-mono">{log.id}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Transaction ID</p>
              <p className="text-sm font-mono">{log.transactionId}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Validator</p>
              <Badge variant="secondary">{log.validator}</Badge>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Verified</p>
              <Badge variant={log.isVerified ? "default" : "destructive"}>
                {log.isVerified ? "Verified" : "Unverified"}
              </Badge>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Data Hash</p>
              <p className="text-sm font-mono break-all">{log.dataHash}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Previous Hash</p>
              <p className="text-sm font-mono break-all">{log.previousHash}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Created At</p>
              <p className="text-sm">{format(new Date(log.createdAt), "PPP p")}</p>
            </div>

            {log.createdBy && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Created By</p>
                <p className="text-sm">{log.createdBy}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Transaction Type</p>
              <Badge variant="secondary">{log.transaction.transactionType}</Badge>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge
                variant={
                  log.transaction.status === "COMPLETED"
                    ? "default"
                    : log.transaction.status === "FAILED"
                      ? "destructive"
                      : "secondary"
                }
              >
                {log.transaction.status}
              </Badge>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Amount</p>
              <p className="text-sm">
                {log.transaction.currency} {parseFloat(log.transaction.amount).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Product Line</p>
              <Badge variant="outline">{log.transaction.productLine}</Badge>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Reference ID</p>
              <p className="text-sm font-mono">{log.transaction.referenceId}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Description</p>
              <p className="text-sm">{log.transaction.description || "N/A"}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Initiated By</p>
              <p className="text-sm">{log.transaction.initiatedBy}</p>
            </div>

            {log.transaction.approvedBy && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved By</p>
                <p className="text-sm">{log.transaction.approvedBy}</p>
              </div>
            )}

            {log.transaction.completedAt && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed At</p>
                <p className="text-sm">{format(new Date(log.transaction.completedAt), "PPP p")}</p>
              </div>
            )}

            {log.transaction.failureReason && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Failure Reason</p>
                <p className="text-sm text-destructive">{log.transaction.failureReason}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Timestamp</p>
              <p className="text-sm">{format(new Date(log.snapshot.timestamp), "PPP p")}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Transaction Snapshot</p>
              <div className="mt-2 space-y-2 rounded-lg border p-3">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">ID:</span>
                  <span className="text-xs font-mono">{log.snapshot.transaction.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Type:</span>
                  <Badge variant="secondary" className="text-xs">
                    {log.snapshot.transaction.type}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Amount:</span>
                  <span className="text-xs">{log.snapshot.transaction.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">Status:</span>
                  <Badge
                    variant={
                      log.snapshot.transaction.status === "COMPLETED"
                        ? "default"
                        : log.snapshot.transaction.status === "FAILED"
                          ? "destructive"
                          : "secondary"
                    }
                    className="text-xs"
                  >
                    {log.snapshot.transaction.status}
                  </Badge>
                </div>
              </div>
            </div>

            {log.snapshot.entries && log.snapshot.entries.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Ledger Entries</p>
                <div className="space-y-2">
                  {log.snapshot.entries.map((entry, index) => (
                    <div key={entry.id} className="rounded-lg border p-3 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs font-medium">Entry {index + 1}</span>
                        <Badge variant="outline" className="text-xs">
                          {entry.entryType}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Wallet ID:</span>
                          <p className="font-mono">{entry.walletId.substring(0, 8)}...</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Pocket:</span>
                          <p>{entry.pocketType}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Amount:</span>
                          <p>{entry.amount}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Balance After:</span>
                          <p>{entry.balanceAfter}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
