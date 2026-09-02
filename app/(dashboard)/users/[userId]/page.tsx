"use client"

import { format } from "date-fns"
import { ArrowLeft, Pencil, User } from "lucide-react"
import Link from "next/link"
import { use, useState } from "react"
import { toast } from "sonner"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { useUpdateUserMutation, useUserQuery } from "@/utils/api/users"

export default function UserDetailPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const { data: userData, isLoading: userLoading, refetch } = useUserQuery(userId)
  const updateUserMutation = useUpdateUserMutation()

  const user = userData?.data

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    updateUserMutation.mutate(
      {
        id: userId,
        data: {
          fullName: formData.get("fullName") as string,
          phoneNumber: formData.get("phoneNumber") as string,
          residentialAddress: formData.get("residentialAddress") as string,
        },
      },
      {
        onSuccess: () => {
          toast.success("User details updated successfully")
          setIsEditOpen(false)
          refetch()
        },
        onError: () => {
          toast.error("Failed to update user details")
        },
      },
    )
  }

  if (userLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">User not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/users">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Back</h1>
      </div>

      <Card className="border-none outline-none shadow-none p-0">
        <CardHeader className="p-0 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="size-24">
                <AvatarFallback>
                  <User className="size-12" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{user.fullName}</CardTitle>
                <p className="text-sm text-muted-foreground capitalize">{user.userType}</p>
              </div>
            </div>
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Details
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleUpdateUser}>
                  <DialogHeader>
                    <DialogTitle>Edit User Details</DialogTitle>
                    <DialogDescription>Update the user&apos;s information below.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" name="fullName" defaultValue={user.fullName} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        defaultValue={user.phoneNumber || ""}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="residentialAddress">Residential Address</Label>
                      <Input
                        id="residentialAddress"
                        name="residentialAddress"
                        defaultValue={user.residentialAddress || ""}
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={updateUserMutation.isPending}>
                      {updateUserMutation.isPending ? "Saving..." : "Save Changes"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 p-0 border-none">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="text-sm">{user.email}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
            <p className="text-sm">{user.phoneNumber || "N/A"}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Residential Address</p>
            <p className="text-sm">{user.residentialAddress || "N/A"}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">User Type</p>
            <p className="text-sm capitalize">{user.userType}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Email Verified</p>
            <Badge variant={user.isEmailVerified ? "default" : "secondary"}>
              {user.isEmailVerified ? "Yes" : "No"}
            </Badge>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Onboarding Complete</p>
            <Badge variant={user.isOnboardingComplete ? "default" : "secondary"}>
              {user.isOnboardingComplete ? "Yes" : "No"}
            </Badge>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Date Onboarded</p>
            <p className="text-sm">{format(new Date(user.createdAt), "PPP p")}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
