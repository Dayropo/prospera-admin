"use client"

import { use, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Send } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function TicketDetailPage({
  params,
}: {
  params: Promise<{ ticketId: string }>
}) {
  const { ticketId } = use(params)
  const [reply, setReply] = useState("")
  const [status, setStatus] = useState("open")

  // TODO: Fetch real ticket data from API
  const ticket = {
    id: ticketId,
    user: {
      name: "John Doe",
      email: "john@example.com",
      id: "1",
    },
    subject: "Unable to withdraw funds",
    status: "open",
    priority: "high",
    createdAt: "2024-03-10 10:30",
    assignedTo: "Admin User",
    messages: [
      {
        id: "1",
        sender: "John Doe",
        message: "I'm unable to withdraw my funds. The transaction keeps failing.",
        timestamp: "2024-03-10 10:30",
        isAdmin: false,
      },
      {
        id: "2",
        sender: "Admin User",
        message: "We're looking into this issue. Can you provide the transaction reference?",
        timestamp: "2024-03-10 11:00",
        isAdmin: true,
      },
    ],
  }

  const handleSendReply = () => {
    // TODO: Implement send reply API call
    console.log("Send reply:", reply)
    setReply("")
  }

  const handleUpdateStatus = (newStatus: string) => {
    // TODO: Implement update status API call
    console.log("Update status:", newStatus)
    setStatus(newStatus)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/support">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{ticket.subject}</h1>
          <p className="text-muted-foreground">Ticket #{ticket.id}</p>
        </div>
        <Select value={status} onValueChange={handleUpdateStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {ticket.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isAdmin ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.isAdmin ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm font-medium mb-1">{message.sender}</p>
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs mt-2 opacity-70">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reply</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Type your reply..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows={4}
                />
                <Button onClick={handleSendReply} disabled={!reply.trim()}>
                  <Send className="mr-2 h-4 w-4" />
                  Send Reply
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Status:</span>
                <Badge>{ticket.status}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Priority:</span>
                <Badge variant="destructive">{ticket.priority}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Created:</span>
                <span className="text-sm">{ticket.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Assigned To:</span>
                <span className="text-sm">{ticket.assignedTo}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Name:</span>
                <Link
                  href={`/users/${ticket.user.id}`}
                  className="text-sm text-primary hover:underline"
                >
                  {ticket.user.name}
                </Link>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Email:</span>
                <span className="text-sm">{ticket.user.email}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
