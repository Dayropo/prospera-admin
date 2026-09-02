"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUserStore } from "@/store/userStore"
import { useLoginMutation, useVerifyTwoFactorLoginMutation } from "@/utils/api"
import { setAuthToken } from "@/utils/authUtils"

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
})

const verify2faSchema = z.object({
  token: z.string().length(6, { message: "Code must be 6 digits" }),
  tempAuthToken: z.string(),
})

type LoginValues = z.infer<typeof loginSchema>
type Verify2faValues = z.infer<typeof verify2faSchema>

interface ApiResponse {
  message: string
  data: {
    twoFactorRequired?: boolean
    tempAuthToken?: string
    token?: string
    authToken?: string
    user: IUser
  }
}

interface ApiError {
  response?: { data?: { message?: string } }
}

export default function LoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<0 | 1>(0)
  const [showPassword, setShowPassword] = useState(false)

  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const verify2faForm = useForm<Verify2faValues>({
    resolver: zodResolver(verify2faSchema),
    defaultValues: { token: "", tempAuthToken: "" },
  })

  const loginMutation = useLoginMutation()
  const verify2faMutation = useVerifyTwoFactorLoginMutation()

  const onLoginSubmit = (values: LoginValues) => {
    loginMutation.mutate(values, {
      onSuccess: (data: ApiResponse) => {
        if (data?.data?.twoFactorRequired) {
          verify2faForm.setValue("tempAuthToken", data.data.tempAuthToken ?? "")
          setStep(1)
        } else {
          setAuthToken(data.data.token ?? "")
          useUserStore.getState().setUser(data.data.user)
          toast.success(data.message || "Login successful")
          router.push("/")
        }
      },
      onError: (error: ApiError) => {
        toast.error(error?.response?.data?.message || "Login failed")
      },
    })
  }

  const onVerifySubmit = (values: Verify2faValues) => {
    verify2faMutation.mutate(
      { token: values.token, tempAuthToken: values.tempAuthToken },
      {
        onSuccess: (data: ApiResponse) => {
          setAuthToken(data.data.authToken ?? "")
          useUserStore.getState().setUser(data.data.user)
          toast.success(data.message || "Login successful")
          router.push("/")
        },
        onError: (error: ApiError) => {
          toast.error(error?.response?.data?.message || "Verification failed")
        },
      },
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/10 via-background to-secondary/10 p-4">
      {step === 0 && (
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Prospera Admin</CardTitle>
            <CardDescription className="text-center">
              Sign in to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@prospera.com"
                  {...loginForm.register("email")}
                />
                {loginForm.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {loginForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    {...loginForm.register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {step === 1 && (
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Two-Factor Auth</CardTitle>
            <CardDescription className="text-center">
              Enter the 6-digit code from your authenticator app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={verify2faForm.handleSubmit(onVerifySubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="token">Authentication Code</Label>
                <Input
                  id="token"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="000000"
                  className="text-center text-2xl font-mono tracking-[0.5em]"
                  {...verify2faForm.register("token")}
                />
                {verify2faForm.formState.errors.token && (
                  <p className="text-sm text-destructive">
                    {verify2faForm.formState.errors.token.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={verify2faMutation.isPending}>
                {verify2faMutation.isPending ? "Verifying..." : "Verify"}
              </Button>

              <button
                type="button"
                onClick={() => setStep(0)}
                className="w-full text-sm text-muted-foreground hover:text-foreground text-center"
              >
                Back to login
              </button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
