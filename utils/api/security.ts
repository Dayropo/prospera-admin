import { useMutation, useQuery } from "@tanstack/react-query"
import axiosInstance from "../axiosInstance"

// GET /admin/security/locked-accounts
export const useLockedAccountsQuery = () => {
  return useQuery({
    queryKey: ["locked-accounts"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IApiResponse<any>>("/admin/security/locked-accounts")
      return data
    },
  })
}

// GET /admin/security/users/:userId/status
export const useUserSecurityStatusQuery = (userId: string) => {
  return useQuery({
    queryKey: ["user-security-status", userId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IApiResponse<any>>(
        `/admin/security/users/${userId}/status`,
      )
      return data
    },
  })
}

// POST /admin/security/users/:userId/unlock-pin
export const useUnlockPinMutation = (userId: string) => {
  return useMutation({
    mutationKey: ["unlock-pin", userId],
    mutationFn: async () => {
      const { data } = await axiosInstance.post<IApiResponse<any>>(
        `/admin/security/users/${userId}/unlock-pin`,
      )
      return data
    },
  })
}

// POST /admin/security/users/:userId/reset-attempts
export const useResetAttemptsMutation = (userId: string) => {
  return useMutation({
    mutationKey: ["reset-attempts", userId],
    mutationFn: async () => {
      const { data } = await axiosInstance.post<IApiResponse<any>>(
        `/admin/security/users/${userId}/reset-attempts`,
      )
      return data
    },
  })
}
